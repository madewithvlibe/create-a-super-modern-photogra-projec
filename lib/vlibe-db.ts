import { VlibeBaseDatabase } from '@withvlibe/base-sdk';

// Singleton database instance
let db: VlibeBaseDatabase | null = null;

export function getDatabase(): VlibeBaseDatabase {
  if (!db) {
    db = new VlibeBaseDatabase({
      projectId: process.env.VLIBE_PROJECT_ID || process.env.NEXT_PUBLIC_VLIBE_PROJECT_ID!,
      databaseToken: process.env.VLIBE_DB_TOKEN || process.env.NEXT_PUBLIC_VLIBE_DB_TOKEN!,
      baseUrl: process.env.VLIBE_BASE_URL || process.env.NEXT_PUBLIC_VLIBE_BASE_URL,
    });
  }
  return db;
}

export { db };
