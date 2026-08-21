import db from '../connection';
import { DiscoveryJobRecord } from '@/types/db';
import crypto from 'crypto';

export class DiscoveryRepository {
  static create(job: Omit<DiscoveryJobRecord, 'id' | 'createdAt' | 'updatedAt'>): DiscoveryJobRecord {
    const id = crypto.randomUUID();
    const now = new Date().toISOString();
    const newJob = { ...job, id, createdAt: now, updatedAt: now };

    db.prepare(`
      INSERT INTO discovery_jobs (id, cellId, state, collectorId, collectionRunId, facilitiesDiscovered, searchContext, errorMessage, createdAt, updatedAt)
      VALUES (@id, @cellId, @state, @collectorId, @collectionRunId, @facilitiesDiscovered, @searchContext, @errorMessage, @createdAt, @updatedAt)
    `).run(newJob as any);

    return newJob as DiscoveryJobRecord;
  }

  static findById(id: string): DiscoveryJobRecord | null {
    const job = db.prepare('SELECT * FROM discovery_jobs WHERE id = ?').get(id) as DiscoveryJobRecord;
    return job || null;
  }

  static findPendingForCell(cellId: string): DiscoveryJobRecord | null {
    // A job is pending if it's not completed and not failed
    const job = db.prepare(`
      SELECT * FROM discovery_jobs 
      WHERE cellId = ? AND state NOT IN ('completed', 'failed')
      ORDER BY createdAt DESC LIMIT 1
    `).get(cellId) as DiscoveryJobRecord;
    return job || null;
  }

  static updateState(id: string, state: string, metadata: Partial<DiscoveryJobRecord> = {}): void {
    const sets = ['state = @state', "updatedAt = datetime('now')"];
    const params: any = { id, state };

    for (const [key, value] of Object.entries(metadata)) {
      if (['collectorId', 'collectionRunId', 'facilitiesDiscovered', 'errorMessage'].includes(key)) {
        sets.push(`${key} = @${key}`);
        params[key] = value;
      }
    }

    db.prepare(`UPDATE discovery_jobs SET ${sets.join(', ')} WHERE id = @id`).run(params);
  }

  static findByState(state: string): DiscoveryJobRecord[] {
    return db.prepare('SELECT * FROM discovery_jobs WHERE state = ?').all(state) as DiscoveryJobRecord[];
  }
}
