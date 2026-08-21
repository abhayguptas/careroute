import { FacilityRepository } from '../infrastructure/db/repositories/facilities';
import { CoverageRepository } from '../infrastructure/db/repositories/coverage';
import { latLngToCell } from '../lib/geo/h3';
import { Facility } from '@/types/db';
import crypto from 'crypto';
import { validateExtractionQuality } from '../domain/validation';

export class IngestCollectorResult {
  /**
   * Validates, normalizes, and idempotently ingests raw scraper output.
   * Updates geographic coverage counts along the way.
   */
   
  static execute(rawResults: Record<string, unknown>[], scraperId: string, requiredFields: string[] = []) {
    let newCount = 0;
    let updateCount = 0;
    const cellsAffected = new Set<string>();
    const allFieldHealths = [];
    let brokenCount = 0;

    for (const raw of rawResults) {
      // Use validation domain logic
      const healthStatus = validateExtractionQuality(raw, requiredFields);
      allFieldHealths.push(healthStatus);

      if (healthStatus.overallHealth === 'broken') {
        brokenCount++;
        continue;
      }

      // Safe Extraction & Normalization
      const name = String(raw.facility_name || '').trim();
      const lat = parseFloat(raw.latitude as string);
      const lng = parseFloat(raw.longitude as string);

      if (!name || isNaN(lat) || isNaN(lng)) {
        continue;
      }

      const h3Cell = latLngToCell(lat, lng);
      
      const sourceUrl = Array.isArray(raw.source_urls) ? raw.source_urls[0] : (raw.url || raw.sourceUrl || 'Unknown');
      const evidence = [{
        sourceUrl: sourceUrl,
        extractedAt: new Date().toISOString(),
        provenance: 'Autonomous Bright Data Discovery'
      }];

      const facility: Facility = {
        id: crypto.randomUUID(),
        name,
        type: String(raw.facility_type || 'hospital').trim(),
        city: String(raw.city || 'Lucknow').trim(),
        address: raw.address ? String(raw.address).trim() : null,
        latitude: lat,
        longitude: lng,
        h3Cell,
        phone: raw.phone ? String(raw.phone).trim() : null,
        emergencyPhone: raw.emergencyPhone ? String(raw.emergencyPhone).trim() : null,
        emergencyAvailable: raw.emergency_available === true || raw.emergency_available === 'true',
        emergencyHours: raw.emergency_hours ? String(raw.emergency_hours).trim() : null,
        services: JSON.stringify(Array.isArray(raw.services) ? raw.services : []),
        departments: JSON.stringify(Array.isArray(raw.departments) ? raw.departments : []),
        sourceUrl: String(sourceUrl),
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
    for (const cellId of cellsAffected) {
      const actualCount = FacilityRepository.countByCell(cellId);
      CoverageRepository.upsert({
        cellId,
        facilityCount: actualCount,
        lastDiscoveryAt: new Date().toISOString(),
        state: 'sufficient', 
        expansionJobId: null,
        updatedAt: new Date().toISOString()
      });
    }

    // Calculate overall quality
    const overallQuality = rawResults.length > 0 
      ? (rawResults.length - brokenCount) / rawResults.length 
      : 0;

    return {
      processed: rawResults.length,
      newFacilities: newCount,
      updatedFacilities: updateCount,
      cellsImproved: cellsAffected.size,
      overallQuality,
      brokenCount
    };
  }
}
