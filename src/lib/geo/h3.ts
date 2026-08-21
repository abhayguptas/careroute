import * as h3 from 'h3-js';

// Resolution 7 is approximately a 5.1km edge length hexagon (area ~5.1 sq km)
// This is a good size for neighborhood-level coverage tracking.
export const COVERAGE_RESOLUTION = 7;

/**
 * Converts latitude and longitude to an H3 cell index string.
 */
export function latLngToCell(lat: number, lng: number, resolution = COVERAGE_RESOLUTION): string {
  return h3.latLngToCell(lat, lng, resolution);
}

/**
 * Gets the center coordinates of an H3 cell.
 */
export function cellToLatLng(cellId: string): { lat: number; lng: number } {
  const [lat, lng] = h3.cellToLatLng(cellId);
  return { lat, lng };
}

/**
 * Gets the surrounding H3 cells up to a given radius (k-ring).
 * @param cellId The origin cell ID
 * @param ringSize The k-ring radius (1 = cell + immediate neighbors)
 */
export function getNearbyCells(cellId: string, ringSize: number = 1): string[] {
  return h3.gridDisk(cellId, ringSize);
}

/**
 * Gets a bounding box for an H3 cell to use in SQL spatial pre-filtering.
 * Returns [minLat, maxLat, minLng, maxLng]
 */
export function getCellBoundingBox(cellId: string): [number, number, number, number] {
  const boundary = h3.cellToBoundary(cellId);
  let minLat = 90;
  let maxLat = -90;
  let minLng = 180;
  let maxLng = -180;

  for (const [lat, lng] of boundary) {
    if (lat < minLat) minLat = lat;
    if (lat > maxLat) maxLat = lat;
    if (lng < minLng) minLng = lng;
    if (lng > maxLng) maxLng = lng;
  }

  // Add a small buffer (~1km) to ensure points right on the edge are included
  const buffer = 0.01; 
  return [minLat - buffer, maxLat + buffer, minLng - buffer, maxLng + buffer];
}
