import { BrightDataAdapter } from '../infrastructure/brightdata/adapter';
import { ScraperRepository } from '../infrastructure/db/repositories/scrapers';
import { HealingRepository } from '../infrastructure/db/repositories/healing';
import { DomainStateError, NotFoundError } from '../domain/errors';

export class HealScraper {
  static async trigger(scraperId: string, prompt: string, url: string) {
    const scraper = ScraperRepository.findByDbId(scraperId);
    if (!scraper) {
      throw new NotFoundError(`Scraper ${scraperId} not found`);
    }

    if (scraper.status !== 'broken') {
      throw new DomainStateError(
        `Cannot heal scraper in state ${scraper.status}. Must be 'broken'.`
      );
    }

    // Trigger AI Flow again on the same collector to remap the schema
    await BrightDataAdapter.triggerAIGeneration(scraper.collectorId, url, prompt);

    ScraperRepository.updateStatus(scraper.collectorId, 'healing');

    const attempt = HealingRepository.create({
      scraperId: scraper.id,
      prompt,
      status: 'in_progress',
      fieldsBeforeHeal: scraper.requiredFields,
      fieldsAfterHeal: '[]',
      attempt: 1,
    });

    return attempt.id;
  }

  static async poll(scraperId: string) {
    const scraper = ScraperRepository.findByDbId(scraperId);
    if (!scraper) {
      throw new NotFoundError(`Scraper ${scraperId} not found`);
    }

    // Use standard AI progress polling
    return await BrightDataAdapter.pollAIProgress(scraper.collectorId);
  }

  static async approve(scraperId: string) {
    const scraper = ScraperRepository.findByDbId(scraperId);
    if (!scraper) {
      throw new NotFoundError(`Scraper ${scraperId} not found`);
    }

    // Usually BrightData auto-applies, or we can consider it ready once completed.
    // For this flow, we mark our domain state back to ready.
    ScraperRepository.updateStatus(scraper.collectorId, 'ready');
  }
}
