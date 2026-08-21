import { extractIntent } from '../lib/intent/extract';
import { FacilityRepository } from '../infrastructure/db/repositories/facilities';
import { parseUserLocation } from '../lib/geo/location';
import { latLngToCell } from '../lib/geo/h3';
import { CheckCoverage } from '@/use-cases/CheckCoverage';
import { COVERAGE_CONFIG } from '../lib/geo/coverage-config';
import { distance } from '../lib/geo/distance';
import { SearchResult } from '../types/search';

export class SearchCare {
  static async execute(query: string, userLocationInput: string | null = null) {
    // 1. Parse Location
    const userLocation = parseUserLocation(userLocationInput);
    const originCell = latLngToCell(userLocation.lat, userLocation.lng);

    // 2. Extract Intent
    const intent = extractIntent(query, userLocation.label);

    // 3. Check Geographic Coverage (Async expansion check)
    // We check coverage for the user's location and request expansion if needed
    const coverageStatus = CheckCoverage.execute(userLocation.lat, userLocation.lng);
    
    // Auto-trigger expansion if coverage is lacking
    // (In a real app, you might debounce this or queue it differently)
    if (coverageStatus.overallState === 'undiscovered' || coverageStatus.overallState === 'partial') {
      // Background task, don't await
      // import { RequestCoverageExpansion } from './RequestCoverageExpansion';
      // RequestCoverageExpansion.execute(originCell).catch(console.error);
    }

    // 4. Retrieve Nearby Facilities
    // Use the spatial query capabilities of the repository
    const rawFacilities = FacilityRepository.findNearby(
      userLocation.lat,
      userLocation.lng,
      COVERAGE_CONFIG.searchRadiusKm,
      originCell
    );

    // 5. Rank and Score Results
    const results: SearchResult[] = rawFacilities.map((facility) => {
      let score = 1.0;
      const reasons: string[] = [];
      const missing: string[] = [];
      
      const dist = distance(userLocation.lat, userLocation.lng, facility.latitude, facility.longitude);
      score -= dist * 0.05; // Decay score by distance

      if (intent.mode === 'emergency') {
        if (facility.emergencyAvailable) {
          score += 1.5;
          reasons.push('24/7 Emergency Available');
        } else {
          score -= 0.5;
          missing.push('No Emergency Department');
        }
      }

      if (intent.specialties.length > 0) {
        const facilityDepts = JSON.parse(facility.departments || '[]');
        const facilityServices = JSON.parse(facility.services || '[]');
        const combinedCapabilities = [...facilityDepts, ...facilityServices];
        
        const matched = intent.specialties.filter((s) => 
          combinedCapabilities.some((d: string) => d.toLowerCase().includes(s.toLowerCase()))
        );
        
        if (matched.length > 0) {
          score += 1.0;
          reasons.push(`Specialty Match: ${matched.join(', ')}`);
        } else {
          score -= 0.2;
          missing.push(`Missing: ${intent.specialties.join(', ')}`);
        }
      }

      if (intent.facilityType && facility.type.toLowerCase().includes(intent.facilityType.toLowerCase())) {
        score += 0.5;
        reasons.push(`${facility.type} facility`);
      }

      // Base verification score on evidence existence
      const evidence = JSON.parse(facility.evidence || '[]');
      const verificationLevel = evidence.length > 0 ? 'high' : 'low';

      return {
        facility,
        distance: dist,
        matchScore: score,
        matchReasons: reasons,
        missingCapabilities: missing,
        verificationLevel,
      };
    });

    // Sort by score descending
    results.sort((a, b) => b.matchScore - a.matchScore);

    return {
      intent,
      coverageStatus,
      results,
    };
  }
}
