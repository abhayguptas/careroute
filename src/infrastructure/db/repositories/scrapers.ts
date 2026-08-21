import db from '../connection';
import { RegisteredScraper } from '@/types/db';
import { randomUUID } from 'crypto';

export class ScraperRepository {
  static create(
    data: Omit<RegisteredScraper, 'id' | 'createdAt' | 'lastHealthy'>
  ): RegisteredScraper {
    const id = randomUUID();
    const createdAt = new Date().toISOString();

    db.prepare(
      `
      INSERT INTO registered_scrapers 
      (id, collectorId, name, targetUrl, description, status, requiredFields, lastHealthy, createdAt, generationStatus, webhookSecret, schemaVersion)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `
    ).run(
      id,
      data.collectorId,
      data.name,
      data.targetUrl,
      data.description,
      data.status,
      data.requiredFields,
      1,
      createdAt,
      data.generationStatus || 'queued',
      data.webhookSecret || null,
      data.schemaVersion || null
    );

    const scraper = this.findById(data.collectorId);
    if (!scraper) throw new Error('Failed to insert and retrieve scraper');
    return scraper;
  }

  static findById(collectorId: string): RegisteredScraper | null {
    const scraper = db
      .prepare('SELECT * FROM registered_scrapers WHERE collectorId = ?')
      .get(collectorId) as RegisteredScraper;
    return scraper || null;
  }

  static findByTargetUrl(targetUrl: string): RegisteredScraper | null {
    const scraper = db
      .prepare('SELECT * FROM registered_scrapers WHERE targetUrl = ?')
      .get(targetUrl) as RegisteredScraper;
    return scraper || null;
  }

  static findByDbId(id: string): RegisteredScraper | null {
    const scraper = db
      .prepare('SELECT * FROM registered_scrapers WHERE id = ?')
      .get(id) as RegisteredScraper;
    return scraper || null;
  }

  static updateStatus(collectorId: string, status: RegisteredScraper['status']): void {
    db.prepare('UPDATE registered_scrapers SET status = ? WHERE collectorId = ?').run(
      status,
      collectorId
    );
  }

  /**
   * Atmoic compare-and-swap update to acquire the lock for a collection run
   */
  static acquireLockForRun(collectorId: string): boolean {
    const result = db
      .prepare("UPDATE registered_scrapers SET status = 'running' WHERE collectorId = ? AND status = 'ready'")
      .run(collectorId);
    return result.changes > 0;
  }

  static acquireLockForHealing(collectorId: string): boolean {
    const result = db
      .prepare("UPDATE registered_scrapers SET status = 'healing', generationStatus = 'generating' WHERE collectorId = ? AND (status = 'failed' OR status = 'needs_attention')")
      .run(collectorId);
    return result.changes > 0;
  }

  static updateGenerationStatus(collectorId: string, generationStatus: string): void {
    db.prepare('UPDATE registered_scrapers SET generationStatus = ? WHERE collectorId = ?').run(
      generationStatus,
      collectorId
    );
  }

  static findAll(): RegisteredScraper[] {
    return db
      .prepare('SELECT * FROM registered_scrapers ORDER BY createdAt DESC')
      .all() as RegisteredScraper[];
  }
}
