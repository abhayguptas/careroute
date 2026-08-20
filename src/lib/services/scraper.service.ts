import { createScraperTemplate, triggerAIGeneration, pollAIGenerationProgress } from '../brightdata/ai-flow';
import { triggerCollection } from '../brightdata/collector';
import { ScraperRepository } from '../db/repositories/scrapers';
import { ScrapeRunRepository } from '../db/repositories/healing';
import { CARE_ROUTE_AI_PROMPT } from '../constants';

export class ScraperService {
  /**
   * Orchestrates the creation of a new AI scraper.
   * Calls Bright Data to create the collector, triggers AI Flow, and persists to DB.
   */
  static async onboardFacility(url: string, name: string) {
    const collectorId = await createScraperTemplate();

    await triggerAIGeneration(collectorId, url, CARE_ROUTE_AI_PROMPT);

    const scraper = ScraperRepository.create({
      collectorId,
      name,
      targetUrl: url,
      description: CARE_ROUTE_AI_PROMPT,
      status: 'creating',
      requiredFields: JSON.stringify(['facility_name', 'address', 'departments', 'emergency_available'])
    });

    return { id: scraper.id, collectorId };
  }

  /**
   * Polls Bright Data for the AI generation progress and updates the DB state.
   */
  static async checkStatusAndUpdate(collectorId: string) {
    const progress = await pollAIGenerationProgress(collectorId);

    if (progress.status === 'completed') {
      ScraperRepository.updateStatus(collectorId, 'ready');
    } else if (progress.status === 'failed') {
      ScraperRepository.updateStatus(collectorId, 'broken');
    }

    return progress;
  }

  /**
   * Triggers the collection process for a finished scraper.
   */
  static async runScraper(collectorId: string) {
    const scraper = ScraperRepository.findById(collectorId);
    if (!scraper) {
      throw new Error('Scraper not registered in CareRoute DB');
    }

    const snapshotId = await triggerCollection(collectorId, [{ url: scraper.targetUrl }]);

    const run = ScrapeRunRepository.create({
      scraperId: scraper.id,
      snapshotId,
      status: 'running',
      recordCount: 0,
      healthStatus: 'unknown',
      missingFields: '[]'
    });

    return { snapshotId, runId: run.id };
  }
}
