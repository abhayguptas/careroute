import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

const dbPath = path.join(process.cwd(), 'data', 'careroute.db');

// Ensure data dir exists
const dataDir = path.dirname(dbPath);
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Singleton connection
const db = new Database(dbPath, { timeout: 5000 });
try {
  db.pragma('journal_mode = WAL');
} catch (e) {
  // Ignore SQLITE_BUSY errors during next.js concurrent build
}
export default db;
