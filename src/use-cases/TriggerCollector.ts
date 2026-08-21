import { BrightDataAdapter } from '../infrastructure/brightdata/adapter';
import { ScraperRepository } from '../infrastructure/db/repositories/scrapers';
import { ScrapeRunRepository } from '../infrastructure/db/repositories/healing';
import { NotFoundError, DomainStateError } from '../domain/errors';

import { randomUUID } from 'crypto';

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

    // Atomic update to acquire the lock and prevent concurrent runs
    const lockAcquired = ScraperRepository.acquireLockForRun(collectorId);
    if (!lockAcquired) {
      throw new DomainStateError(
        `Failed to acquire lock for scraper ${collectorId}. Another collection may be running or state changed.`
      );
    }

    // Generate run ID early so we can pass it to the webhook
    const runId = randomUUID();

    // Trigger external infrastructure
    let webhookUrl: string | undefined;
    if (process.env.WEBHOOK_BASE_URL) {
      webhookUrl = `${process.env.WEBHOOK_BASE_URL}/api/webhooks/brightdata?collector_id=${collectorId}&secret=${scraper.webhookSecret}&run_id=${runId}`;
    }
    const snapshotId = await BrightDataAdapter.triggerCollection(collectorId, scraper.targetUrl, webhookUrl);

    // Persist the ScrapeRun tracking record
    const run = ScrapeRunRepository.create({
      id: runId,
      scraperId: scraper.id,
      snapshotId,
      status: 'running',
      recordCount: 0,
      healthStatus: 'unknown',
      missingFields: '[]',
      completedAt: null,
      webhookDeliveryId: null,
      extractionQuality: null,
    });

    return {
      snapshotId,
      runId: run.id,
    };
  }
}
