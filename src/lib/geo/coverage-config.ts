import { COVERAGE_RESOLUTION } from './h3';

export const COVERAGE_CONFIG = {
  // Minimum number of valid facilities required in a cell to consider it 'sufficiently covered'
  minFacilitiesForSufficient: 5,
  
  // If the last discovery was more than this many hours ago, we might want to re-run discovery
  // even if we have enough facilities (freshness decay)
  freshnessHours: 72, 
  
  // Default radius in km for user search
  searchRadiusKm: 8,
  
  // H3 resolution to use for the coverage grid
  h3Resolution: COVERAGE_RESOLUTION,
  
  // Number of neighboring H3 rings to consider when checking coverage for a user's point
  // (1 means the cell they are in, plus the immediate 6 neighbors)
  coverageRingSize: 1,
};
