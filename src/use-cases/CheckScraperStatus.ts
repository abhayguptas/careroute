import { BrightDataAdapter } from '../infrastructure/brightdata/adapter';
import { ScraperRepository } from '../infrastructure/db/repositories/scrapers';
import { isValidStateTransition, ScraperStatus } from '../domain/scraper';
import { DomainStateError, NotFoundError } from '../domain/errors';

export class CheckScraperStatus {
  /**
   * Polls the infrastructure for AI Code Generation progress.
   * Enforces domain invariants on state transitions.
   */
  static async execute(collectorId: string) {
    const scraper = ScraperRepository.findById(collectorId);
    if (!scraper) {
      throw new NotFoundError(`Scraper with collectorId ${collectorId} not found`);
    }

    const currentDomainState = scraper.status as ScraperStatus;
    const progress = await BrightDataAdapter.pollAIProgress(collectorId);

    // Map Bright Data status to internal Domain status
    let nextDomainState = currentDomainState;
    if (progress.status === 'completed') {
      nextDomainState = 'ready';
    } else if (progress.status === 'failed') {
      nextDomainState = 'broken';
    }

    // Only update DB if state actually changed and is valid
    if (nextDomainState !== currentDomainState) {
      if (!isValidStateTransition(currentDomainState, nextDomainState)) {
        throw new DomainStateError(
          `Invalid scraper lifecycle transition from ${currentDomainState} to ${nextDomainState}`
        );
      }
      ScraperRepository.updateStatus(collectorId, nextDomainState);
    }

    return {
      status: nextDomainState,
      isFinished: nextDomainState === 'ready' || nextDomainState === 'broken',
    };
  }
}
