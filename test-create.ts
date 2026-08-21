import { OnboardFacility } from './src/use-cases/OnboardFacility';
import { initializeDatabase } from './src/infrastructure/db/schema';
import db from './src/infrastructure/db/connection';

async function run() {
  console.log('Initializing DB...');
  initializeDatabase();
  
  // Clear any existing test row to avoid idempotency block
  db.prepare('DELETE FROM registered_scrapers WHERE targetUrl = ?').run('https://mytesturl.com');

  console.log('Testing OnboardFacility...');
  try {
    const result = await OnboardFacility.execute('https://mytesturl.com', 'Test Facility');
    console.log('Success! Scraper onboarded:', result);
  } catch (err) {
    console.error('Error:', err);
  }
}

run();
