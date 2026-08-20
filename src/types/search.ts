export interface StructuredIntent {
  mode: 'emergency' | 'care';
  specialties: string[];
  facilityType: string | null;
  urgency: 'critical' | 'urgent' | 'routine';
  city: string;
  rawQuery: string;
}

import { Facility } from './db';

export interface SearchResult {
  facility: Facility;
  distance: number;
  matchScore: number;
  matchReasons: string[];
  missingCapabilities: string[];
  verificationLevel: 'high' | 'medium' | 'low';
}
