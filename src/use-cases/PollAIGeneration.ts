import { BrightDataAdapter } from '../infrastructure/brightdata/adapter';
import { ScraperRepository } from '../infrastructure/db/repositories/scrapers';
import { NotFoundError } from '../domain/errors';

export class PollAIGeneration {
  /**
   * Polls the infrastructure for AI Code Generation progress.
   * Enforces domain invariants on state transitions.
   */
  static async execute(collectorId: string) {
    const scraper = ScraperRepository.findById(collectorId);
    if (!scraper) {
      throw new NotFoundError(`Scraper with collectorId ${collectorId} not found`);
    }

    const currentDomainState = scraper.generationStatus;
    const progress = await BrightDataAdapter.pollAIProgress(collectorId);

    let nextDomainState = currentDomainState;

    // Security & Reliability: Prevent infinite polling deadlocks by enforcing a 5-minute timeout
    const createdAtTime = new Date(scraper.createdAt).getTime();
    const now = Date.now();
    const timeoutMs = 5 * 60 * 1000; // 5 minutes

    if (now - createdAtTime > timeoutMs && currentDomainState !== 'ready' && currentDomainState !== 'failed') {
      nextDomainState = 'failed';
    } else if (progress.status === 'completed') {
      nextDomainState = 'ready';
    } else if (progress.status === 'failed') {
      nextDomainState = 'failed';
    } else if (progress.status === 'running') {
      nextDomainState = 'generating';
    }

    // Update DB if generation status changed
    if (nextDomainState !== currentDomainState) {
      ScraperRepository.updateGenerationStatus(collectorId, nextDomainState);
      
      // If generation is complete and scraper is queued, set it to ready
      if (nextDomainState === 'ready' && scraper.status === 'queued') {
         ScraperRepository.updateStatus(collectorId, 'ready');
      } else if (nextDomainState === 'failed' && scraper.status === 'queued') {
         ScraperRepository.updateStatus(collectorId, 'failed');
      }
    }

    return {
      generationStatus: nextDomainState,
      isFinished: nextDomainState === 'ready' || nextDomainState === 'failed',
    };
  }
}
