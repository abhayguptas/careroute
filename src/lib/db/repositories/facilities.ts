import db from '../connection';
import { Facility } from '@/types/db';

export class FacilityRepository {
  static findAll(): Facility[] {
    return db.prepare('SELECT * FROM facilities').all() as Facility[];
  }

  static findByCity(city: string): Facility[] {
    // Basic LIKE query for demo purposes. In production this would use geospatial indexing.
    return db.prepare('SELECT * FROM facilities WHERE city LIKE ?').all(`%${city}%`) as Facility[];
  }

  static findById(id: string): Facility | null {
    const facility = db.prepare('SELECT * FROM facilities WHERE id = ?').get(id) as Facility;
    return facility || null;
  }
}
