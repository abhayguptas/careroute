export const LUCKNOW_CENTER = { lat: 26.8467, lng: 80.9462 };
export const DEFAULT_CITY = 'Lucknow';

// Pre-defined mapping of known Lucknow localities to coordinates for the hackathon demo.
// In a full application, this would use a real Geocoding API.
const LUCKNOW_LOCALITIES: Record<string, { lat: number; lng: number; label: string }> = {
  'alambagh': { lat: 26.8041, lng: 80.9000, label: 'Alambagh, Lucknow' },
  'aliganj': { lat: 26.8856, lng: 80.9435, label: 'Aliganj, Lucknow' },
  'gomti nagar': { lat: 26.8528, lng: 81.0022, label: 'Gomti Nagar, Lucknow' },
  'hazratganj': { lat: 26.8504, lng: 80.9400, label: 'Hazratganj, Lucknow' },
  'indira nagar': { lat: 26.8837, lng: 80.9944, label: 'Indira Nagar, Lucknow' },
  'chowk': { lat: 26.8659, lng: 80.9029, label: 'Chowk, Lucknow' },
  'ashiyana': { lat: 26.7844, lng: 80.9161, label: 'Ashiyana, Lucknow' },
  'vikas nagar': { lat: 26.8974, lng: 80.9538, label: 'Vikas Nagar, Lucknow' },
  'aminabad': { lat: 26.8447, lng: 80.9255, label: 'Aminabad, Lucknow' },
  'home': { lat: 26.8041, lng: 80.9000, label: 'Home (Alambagh)' }, // Mock Home
  'work': { lat: 26.8528, lng: 81.0022, label: 'Work (Gomti Nagar)' }, // Mock Work
};

export interface ParsedLocation {
  lat: number;
  lng: number;
  label: string;
}

/**
 * Parses a user's location input into lat/lng coordinates.
 * Falls back to Lucknow center if not found.
 */
export function parseUserLocation(input: string | null): ParsedLocation {
  if (!input) {
    return { ...LUCKNOW_CENTER, label: DEFAULT_CITY };
  }

  const normalized = input.toLowerCase().trim();
  
  // Direct locality match
  if (LUCKNOW_LOCALITIES[normalized]) {
    return LUCKNOW_LOCALITIES[normalized];
  }

  // Check if it's a known locality within a longer string (e.g. "hospitals in gomti nagar")
  for (const [key, value] of Object.entries(LUCKNOW_LOCALITIES)) {
    if (normalized.includes(key)) {
      return value;
    }
  }

  // Fallback
  return { ...LUCKNOW_CENTER, label: DEFAULT_CITY };
}
