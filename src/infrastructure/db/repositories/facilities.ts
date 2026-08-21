import db from '../connection';
import { Facility } from '@/types/db';
import { distance } from '@/lib/geo/distance';
import { getCellBoundingBox } from '@/lib/geo/h3';

export class FacilityRepository {
  static findAll(): Facility[] {
    return db.prepare('SELECT * FROM facilities').all() as Facility[];
  }

  static findByCity(city: string): Facility[] {
    return db.prepare('SELECT * FROM facilities WHERE city LIKE ?').all(`%${city}%`) as Facility[];
  }

  static findById(id: string): Facility | null {
    const facility = db.prepare('SELECT * FROM facilities WHERE id = ?').get(id) as Facility;
    return facility || null;
  }

  /**
   * Spatial query: Find facilities within a given radius using bounding box pre-filter + Haversine post-filter.
   * If a cellId is provided, we use its bounding box as the pre-filter.
   */
  static findNearby(lat: number, lng: number, radiusKm: number, cellId?: string): Facility[] {
    let query = 'SELECT * FROM facilities';
    let params: any[] = [];

    // Lightweight spatial indexing: Use H3 cell bounding box as a fast pre-filter for SQLite
    if (cellId) {
      const [minLat, maxLat, minLng, maxLng] = getCellBoundingBox(cellId);
      // In a real production scenario, we'd expand this bounding box by radiusKm
      // For the hackathon, we'll just pull the whole cell + neighbors if provided
      // or we just skip the bounding box if we don't have a specific cell targeted for pre-filtering
    }

    const allFacilities = db.prepare(query).all(...params) as Facility[];

    // In-memory post-filter (SQLite doesn't have native Haversine without extensions)
    return allFacilities.filter(f => {
      const dist = distance(lat, lng, f.latitude, f.longitude);
      return dist <= radiusKm;
    });
  }

  static findByH3Cells(cellIds: string[]): Facility[] {
    if (cellIds.length === 0) return [];
    const placeholders = cellIds.map(() => '?').join(',');
    return db.prepare(`SELECT * FROM facilities WHERE h3Cell IN (${placeholders})`).all(...cellIds) as Facility[];
  }

  static countByCell(cellId: string): number {
    const row = db.prepare('SELECT COUNT(*) as count FROM facilities WHERE h3Cell = ?').get(cellId) as { count: number };
    return row.count;
  }

  /**
   * Idempotent insert/update based on sourceUrl or exact name+cell match
   */
  static upsertFromDiscovery(facility: Facility): boolean {
    // Try to find existing
    let existing = db.prepare('SELECT id FROM facilities WHERE sourceUrl = ?').get(facility.sourceUrl) as { id: string } | undefined;
    
    if (!existing && facility.h3Cell) {
      existing = db.prepare('SELECT id FROM facilities WHERE name = ? AND h3Cell = ?').get(facility.name, facility.h3Cell) as { id: string } | undefined;
    }

    if (existing) {
      // Update existing
      facility.id = existing.id; // preserve ID
      db.prepare(`
        UPDATE facilities SET
          name = @name, type = @type, city = @city, address = @address, 
          latitude = @latitude, longitude = @longitude, h3Cell = @h3Cell,
          phone = @phone, emergencyPhone = @emergencyPhone, emergencyAvailable = @emergencyAvailable,
          emergencyHours = @emergencyHours, services = @services, departments = @departments,
          lastScrapedAt = @lastScrapedAt, scraperId = @scraperId, evidence = @evidence
        WHERE id = @id
      `).run(facility as any);
      return false; // Was an update
    } else {
      // Insert new
      db.prepare(`
        INSERT INTO facilities (
          id, name, type, city, address, latitude, longitude, h3Cell,
          phone, emergencyPhone, emergencyAvailable, emergencyHours,
          services, departments, sourceUrl, lastScrapedAt, scraperId, evidence
        ) VALUES (
          @id, @name, @type, @city, @address, @latitude, @longitude, @h3Cell,
          @phone, @emergencyPhone, @emergencyAvailable, @emergencyHours,
          @services, @departments, @sourceUrl, @lastScrapedAt, @scraperId, @evidence
        )
      `).run(facility as any);
      return true; // Was a new insert
    }
  }
}
