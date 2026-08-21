import db from '../connection';
import { GeoCoverageRecord } from '@/types/db';

export class CoverageRepository {
  static findByCell(cellId: string): GeoCoverageRecord | null {
    const coverage = db.prepare('SELECT * FROM geo_coverage WHERE cellId = ?').get(cellId) as GeoCoverageRecord;
    return coverage || null;
  }

  static findByCells(cellIds: string[]): GeoCoverageRecord[] {
    if (cellIds.length === 0) return [];
    const placeholders = cellIds.map(() => '?').join(',');
    return db.prepare(`SELECT * FROM geo_coverage WHERE cellId IN (${placeholders})`).all(...cellIds) as GeoCoverageRecord[];
  }

  static upsert(coverage: GeoCoverageRecord): void {
    db.prepare(`
      INSERT INTO geo_coverage (cellId, facilityCount, lastDiscoveryAt, state, expansionJobId, updatedAt)
      VALUES (@cellId, @facilityCount, @lastDiscoveryAt, @state, @expansionJobId, @updatedAt)
      ON CONFLICT(cellId) DO UPDATE SET
        facilityCount = excluded.facilityCount,
        lastDiscoveryAt = excluded.lastDiscoveryAt,
        state = excluded.state,
        expansionJobId = excluded.expansionJobId,
        updatedAt = excluded.updatedAt
    `).run(coverage as any);
  }

  static updateState(cellId: string, state: string, expansionJobId: string | null = null): void {
    db.prepare(`
      UPDATE geo_coverage 
      SET state = ?, expansionJobId = ?, updatedAt = datetime('now')
      WHERE cellId = ?
    `).run(state, expansionJobId, cellId);
  }

  static incrementFacilityCount(cellId: string, delta: number): void {
    db.prepare(`
      UPDATE geo_coverage
      SET facilityCount = facilityCount + ?, updatedAt = datetime('now')
      WHERE cellId = ?
    `).run(delta, cellId);
  }
}
