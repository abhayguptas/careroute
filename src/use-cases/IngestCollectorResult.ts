import { FacilityRepository } from '../infrastructure/db/repositories/facilities';
import { CoverageRepository } from '../infrastructure/db/repositories/coverage';
import { latLngToCell } from '../lib/geo/h3';
import { Facility } from '@/types/db';
import crypto from 'crypto';

export class IngestCollectorResult {
  /**
   * Validates, normalizes, and idempotently ingests raw scraper output.
   * Updates geographic coverage counts along the way.
   */
  static execute(rawResults: any[], scraperId: string, jobId?: string) {
    let newCount = 0;
    let updateCount = 0;
    const cellsAffected = new Set<string>();

    for (const raw of rawResults) {
      // 1. Minimal Validation (skip completely broken records)
      if (!raw.facility_name || !raw.latitude || !raw.longitude) {
        continue;
      }

      // 2. Normalize to Domain
      const h3Cell = latLngToCell(raw.latitude, raw.longitude);
      
      const evidence = [{
        sourceUrl: raw.source_urls?.[0] || 'Unknown',
        extractedAt: new Date().toISOString(),
        provenance: 'Autonomous Bright Data Discovery'
      }];

      const facility: Facility = {
        id: crypto.randomUUID(),
        name: raw.facility_name,
        type: raw.facility_type || 'hospital',
        city: raw.city || 'Lucknow',
        address: raw.address || null,
        latitude: parseFloat(raw.latitude),
        longitude: parseFloat(raw.longitude),
        h3Cell,
        phone: raw.phone || null,
        emergencyPhone: raw.emergencyPhone || null,
        emergencyAvailable: raw.emergency_available === true || raw.emergency_available === 'true',
        emergencyHours: raw.emergency_hours || null,
        services: JSON.stringify(raw.services || []),
        departments: JSON.stringify(raw.departments || []),
        sourceUrl: raw.source_urls?.[0] || 'Unknown',
        lastScrapedAt: new Date().toISOString(),
        scraperId,
        evidence: JSON.stringify(evidence),
      };

      // 3. Idempotent Ingest
      const isNew = FacilityRepository.upsertFromDiscovery(facility);
      
      if (isNew) {
        newCount++;
        cellsAffected.add(h3Cell);
      } else {
        updateCount++;
      }
    }

    // 4. Update Geographic Coverage
    // For every cell that got NEW facilities, increment its count
    for (const cellId of cellsAffected) {
      // We need to know exactly how many new ones were added to this specific cell
      // The easiest way is just to recount the cell
      const actualCount = FacilityRepository.countByCell(cellId);
      
      CoverageRepository.upsert({
        cellId,
        facilityCount: actualCount,
        lastDiscoveryAt: new Date().toISOString(),
        state: 'sufficient', // We assume discovery brought it up to par
        expansionJobId: null,
        updatedAt: new Date().toISOString()
      });
    }

    return {
      processed: rawResults.length,
      newFacilities: newCount,
      updatedFacilities: updateCount,
      cellsImproved: cellsAffected.size
    };
  }
}
