import { BrightDataAdapter } from '../infrastructure/brightdata/adapter';
import { ScraperRepository } from '../infrastructure/db/repositories/scrapers';
import { ScrapeRunRepository } from '../infrastructure/db/repositories/healing';
import { NotFoundError, DomainStateError } from '../domain/errors';
import { ScraperStatus } from '../domain/scraper';

export class TriggerCollector {
  /**
   * Triggers a live collection run for an existing, ready scraper.
   */
  static async execute(collectorId: string) {
    const scraper = ScraperRepository.findById(collectorId);

    if (!scraper) {
      throw new NotFoundError(`Scraper ${collectorId} not found`);
    }

    if (scraper.status !== 'ready') {
      throw new DomainStateError(
        `Cannot trigger collection. Scraper is in state: ${scraper.status}. Expected 'ready'.`
      );
    }

    // Update status to running in DB
    ScraperRepository.updateStatus(collectorId, 'running');

    // Trigger external infrastructure
    const snapshotId = await BrightDataAdapter.triggerCollection(collectorId, scraper.targetUrl);

    // Persist the ScrapeRun tracking record
    const run = ScrapeRunRepository.create({
      scraperId: scraper.id,
      snapshotId,
      status: 'running',
      recordCount: 0,
      healthStatus: 'unknown',
      missingFields: '[]',
    });

    return {
      snapshotId,
      runId: run.id,
    };
  }
}
