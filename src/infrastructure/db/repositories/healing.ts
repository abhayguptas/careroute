import db from '../connection';
import { ScrapeRun, HealingAttempt } from '@/types/db';
import { randomUUID } from 'crypto';

export class ScrapeRunRepository {
  static create(data: Partial<Pick<ScrapeRun, 'id'>> & Omit<ScrapeRun, 'id' | 'startedAt'>): ScrapeRun {
    const id = data.id || randomUUID();
    const startedAt = new Date().toISOString();

    db.prepare(
      `
      INSERT INTO scrape_runs (id, scraperId, snapshotId, status, recordCount, healthStatus, missingFields, startedAt, completedAt, webhookDeliveryId, extractionQuality)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `
    ).run(
      id,
      data.scraperId,
      data.snapshotId,
      data.status,
      data.recordCount,
      data.healthStatus,
      data.missingFields,
      startedAt,
      data.completedAt || null,
      data.webhookDeliveryId || null,
      data.extractionQuality || null
    );

    const run = this.findById(id);
    if (!run) throw new Error('Failed to insert and retrieve scrape run');
    return run;
  }

  static findById(id: string): ScrapeRun | null {
    const run = db.prepare('SELECT * FROM scrape_runs WHERE id = ?').get(id) as ScrapeRun;
    return run || null;
  }
}

export class HealingRepository {
  static create(data: Omit<HealingAttempt, 'id' | 'triggeredAt' | 'resolvedAt'>): HealingAttempt {
    const id = randomUUID();
    const triggeredAt = new Date().toISOString();

    db.prepare(
      `
      INSERT INTO healing_attempts (id, scraperId, prompt, status, fieldsBeforeHeal, fieldsAfterHeal, attempt, triggeredAt)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `
    ).run(
      id,
      data.scraperId,
      data.prompt,
      data.status,
      data.fieldsBeforeHeal,
      data.fieldsAfterHeal,
      data.attempt,
      triggeredAt
    );

    const attempt = this.findById(id);
    if (!attempt) throw new Error('Failed to insert and retrieve attempt');
    return attempt;
  }

  static findById(id: string): HealingAttempt | null {
    const attempt = db
      .prepare('SELECT * FROM healing_attempts WHERE id = ?')
      .get(id) as HealingAttempt;
    return attempt || null;
  }
}
