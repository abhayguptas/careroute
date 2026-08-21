import { CoverageRepository } from '../infrastructure/db/repositories/coverage';
import { getNearbyCells, latLngToCell } from '../lib/geo/h3';
import { COVERAGE_CONFIG } from '../lib/geo/coverage-config';
import { evaluateCoverage, CoverageState } from '../domain/coverage';

export class CheckCoverage {
  static execute(lat: number, lng: number) {
    const originCell = latLngToCell(lat, lng);
    
    // Get the center cell and its immediate neighbors (k-ring 1)
    const relevantCells = getNearbyCells(originCell, COVERAGE_CONFIG.coverageRingSize);
    
    const coverageRecords = CoverageRepository.findByCells(relevantCells);
    
    // Map existing records by cellId for easy lookup
    const coverageMap = new Map(coverageRecords.map(r => [r.cellId, r]));
    
    let totalSufficient = 0;
    
    const details = relevantCells.map(cellId => {
      const record = coverageMap.get(cellId);
      let state: CoverageState = 'undiscovered';
      
      if (record) {
        state = evaluateCoverage(record.facilityCount, record.lastDiscoveryAt);
        // We could optionally update the DB here if the state transitioned to 'partial' due to staleness
      }
      
      if (state === 'sufficient') {
        totalSufficient++;
      }
      
      return {
        cellId,
        state,
        isCenter: cellId === originCell,
        record: record || null
      };
    });

    // Overall heuristic: if the center and at least half the neighbors are sufficient, we're good
    const threshold = Math.ceil(relevantCells.length / 2);
    
    let overallState: CoverageState = 'partial';
    if (totalSufficient === 0) overallState = 'undiscovered';
    else if (totalSufficient >= threshold) overallState = 'sufficient';

    return {
      overallState,
      originCell,
      details,
    };
  }
}
