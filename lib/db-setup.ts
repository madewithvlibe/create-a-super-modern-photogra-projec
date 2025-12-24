import { getDatabase } from './vlibe-db';

let isInitialized = false;

// Read category from environment (set in .env)
const APP_CATEGORY = process.env.VLIBE_APP_CATEGORY || 'website';

async function initWebsiteTables() {
  const db = getDatabase();

  // Create contacts table (for contact forms)
  await db.createTable('contacts', {
    columns: [
      { name: 'name', type: 'string', required: true },
      { name: 'email', type: 'string', required: true },
      { name: 'message', type: 'string', required: true },
      { name: 'status', type: 'string', required: false },
      { name: 'createdAt', type: 'number', required: true },
    ],
  });

  // Create subscribers table (for newsletters)
  await db.createTable('subscribers', {
    columns: [
      { name: 'email', type: 'string', required: true },
      { name: 'name', type: 'string', required: false },
      { name: 'subscribedAt', type: 'number', required: true },
    ],
  });
}

export async function initializeDatabase() {
  if (isInitialized) return;

  try {
    console.log(`[Vlibe Base] Initializing ${APP_CATEGORY} database tables...`);

    // Initialize category-specific tables
    if (APP_CATEGORY === 'website') {
      await initWebsiteTables();
    }

    isInitialized = true;
    console.log('[Vlibe Base] Database tables ready');
  } catch (error) {
    // Tables may already exist, that's OK
    console.log('[Vlibe Base] Database setup complete');
    isInitialized = true;
  }
}
