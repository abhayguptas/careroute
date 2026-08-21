import { DiscoveryRepository } from '../infrastructure/db/repositories/discovery';
import { CoverageRepository } from '../infrastructure/db/repositories/coverage';
import { BrightDataAdapter } from '../infrastructure/brightdata/adapter';
import { cellToLatLng } from '../lib/geo/h3';

export class ProcessDiscoveryJob {
  /**
   * Processes a queued discovery job.
   * In a real system, this would be picked up by a background worker.
   */
  static async execute(jobId: string) {
    const job = DiscoveryRepository.findById(jobId);
    if (!job) throw new Error(`Discovery job ${jobId} not found`);
    if (job.state !== 'queued' && job.state !== 'retryable') {
      throw new Error(`Job ${jobId} is not in a processable state (${job.state})`);
    }

    try {
      // 1. Move to discovering state
      DiscoveryRepository.updateState(jobId, 'discovering');
      
      const { lat, lng } = cellToLatLng(job.cellId);
      
      // 2. In a full system, we would query Bright Data or our internal ScraperRepository
      // to see if we ALREADY have a collector suitable for this region (e.g. Google Maps scraper for Lucknow).
      // For this hackathon, we simulate triggering a new generic discovery process.
      
      DiscoveryRepository.updateState(jobId, 'collector_generation');
      
      // Simulate BrightData Agent creation (normally we'd pass a Google Maps or directory URL)
      // const collectorId = await BrightDataAdapter.createCollector();
      const mockCollectorId = `c_disc_${job.cellId.substring(0, 8)}`;
      
      DiscoveryRepository.updateState(jobId, 'collecting', { collectorId: mockCollectorId });
      
      // Simulate triggering the collection run
      // const runId = await BrightDataAdapter.triggerCollection(mockCollectorId, `https://maps.google.com/?q=hospitals+near+${lat},${lng}`);
      const mockRunId = `r_disc_${Date.now()}`;
      
      DiscoveryRepository.updateState(jobId, 'validating', { collectionRunId: mockRunId });
      
      // Normally we would STOP here and wait for a webhook or poll.
      // For the hackathon, we simulate instant completion and ingestion.
      
      DiscoveryRepository.updateState(jobId, 'completed', { facilitiesDiscovered: 0 }); // IngestCollectorResult would update this count
      
      // Update coverage back to a normal state (In reality, IngestCollectorResult does this)
      CoverageRepository.updateState(job.cellId, 'sufficient', null);
      CoverageRepository.upsert({
        cellId: job.cellId,
        facilityCount: 5, // Mock found facilities
        lastDiscoveryAt: new Date().toISOString(),
        state: 'sufficient',
        expansionJobId: null,
        updatedAt: new Date().toISOString()
      });

      return { success: true, jobId, mockCollectorId, mockRunId };

    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error);
      DiscoveryRepository.updateState(jobId, 'failed', { errorMessage: msg });
      CoverageRepository.updateState(job.cellId, 'failed');
      throw error;
    }
  }
}
