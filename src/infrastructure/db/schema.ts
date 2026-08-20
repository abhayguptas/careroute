import db from './connection';

export function initializeDatabase() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS facilities (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      type TEXT NOT NULL,
      city TEXT NOT NULL,
      address TEXT NOT NULL,
      latitude REAL NOT NULL,
      longitude REAL NOT NULL,
      phone TEXT,
      emergencyPhone TEXT,
      emergencyAvailable BOOLEAN,
      emergencyHours TEXT,
      services TEXT NOT NULL, -- JSON array
      departments TEXT NOT NULL, -- JSON array
      sourceUrl TEXT NOT NULL,
      lastScrapedAt TEXT NOT NULL,
      scraperId TEXT NOT NULL,
      evidence TEXT NOT NULL -- JSON array of Evidence objects
    );

    CREATE TABLE IF NOT EXISTS registered_scrapers (
      id TEXT PRIMARY KEY,
      collectorId TEXT NOT NULL,
      name TEXT NOT NULL,
      targetUrl TEXT NOT NULL,
      description TEXT NOT NULL,
      status TEXT NOT NULL,
      requiredFields TEXT NOT NULL, -- JSON array
      lastRunAt TEXT,
      lastHealthy BOOLEAN,
      createdAt TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS scrape_runs (
      id TEXT PRIMARY KEY,
      scraperId TEXT NOT NULL,
      snapshotId TEXT NOT NULL,
      status TEXT NOT NULL,
      recordCount INTEGER NOT NULL,
      healthStatus TEXT NOT NULL,
      missingFields TEXT NOT NULL, -- JSON array
      startedAt TEXT NOT NULL,
      completedAt TEXT
    );

    CREATE TABLE IF NOT EXISTS healing_attempts (
      id TEXT PRIMARY KEY,
      scraperId TEXT NOT NULL,
      prompt TEXT NOT NULL,
      status TEXT NOT NULL,
      fieldsBeforeHeal TEXT NOT NULL, -- JSON object
      fieldsAfterHeal TEXT NOT NULL, -- JSON object
      attempt INTEGER NOT NULL,
      triggeredAt TEXT NOT NULL,
      resolvedAt TEXT
    );
  `);
}

// Ensure tables exist on load
initializeDatabase();
