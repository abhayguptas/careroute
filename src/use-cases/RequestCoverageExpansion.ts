import { CoverageRepository } from '../infrastructure/db/repositories/coverage';
import { DiscoveryRepository } from '../infrastructure/db/repositories/discovery';
import { evaluateCoverage } from '../domain/coverage';

export class RequestCoverageExpansion {
  /**
   * Requests a discovery job to expand coverage for a specific H3 cell.
   * This is deduplicated: if a job is already pending for this cell, it returns the existing ID.
   */
  static async execute(cellId: string, searchContext: Record<string, any> = {}): Promise<string> {
    
    // 1. Check current coverage to ensure we actually need this
    const coverage = CoverageRepository.findByCell(cellId);
    if (coverage) {
      const state = evaluateCoverage(coverage.facilityCount, coverage.lastDiscoveryAt);
      if (state === 'sufficient') {
        return 'already_sufficient';
      }
    }

    // 2. Deduplication check: is a job already pending?
    const pendingJob = DiscoveryRepository.findPendingForCell(cellId);
    if (pendingJob) {
      return pendingJob.id;
    }

    // 3. Create a new DiscoveryJob
    const job = DiscoveryRepository.create({
      cellId,
      state: 'queued',
      collectorId: null,
      collectionRunId: null,
      facilitiesDiscovered: 0,
      searchContext: JSON.stringify(searchContext),
      errorMessage: null,
    });

    // 4. Update the coverage record to reflect the 'discovering' state
    if (coverage) {
      CoverageRepository.updateState(cellId, 'discovering', job.id);
    } else {
      CoverageRepository.upsert({
        cellId,
        facilityCount: 0,
        lastDiscoveryAt: null,
        state: 'discovering',
        expansionJobId: job.id,
        updatedAt: new Date().toISOString()
      });
    }

    return job.id;
  }
}
