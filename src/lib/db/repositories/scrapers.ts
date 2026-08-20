import db from '../connection';
import { RegisteredScraper } from '@/types/db';
import { randomUUID } from 'crypto';

export class ScraperRepository {
  static create(data: Omit<RegisteredScraper, 'id' | 'createdAt' | 'lastHealthy'>): RegisteredScraper {
    const id = randomUUID();
    const createdAt = new Date().toISOString();
    
    db.prepare(`
      INSERT INTO registered_scrapers 
      (id, collectorId, name, targetUrl, description, status, requiredFields, lastHealthy, createdAt)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      id, 
      data.collectorId, 
      data.name, 
      data.targetUrl, 
      data.description, 
      data.status, 
      data.requiredFields, 
      1, 
      createdAt
    );

    return this.findById(data.collectorId)!;
  }

  static findById(collectorId: string): RegisteredScraper | null {
    const scraper = db.prepare('SELECT * FROM registered_scrapers WHERE collectorId = ?').get(collectorId) as RegisteredScraper;
    return scraper || null;
  }

  static findByDbId(id: string): RegisteredScraper | null {
    const scraper = db.prepare('SELECT * FROM registered_scrapers WHERE id = ?').get(id) as RegisteredScraper;
    return scraper || null;
  }

  static updateStatus(collectorId: string, status: RegisteredScraper['status']): void {
    db.prepare('UPDATE registered_scrapers SET status = ? WHERE collectorId = ?').run(status, collectorId);
  }

  static findAll(): RegisteredScraper[] {
    return db.prepare('SELECT * FROM registered_scrapers ORDER BY createdAt DESC').all() as RegisteredScraper[];
  }
}
