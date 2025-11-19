// configs/db.ts

import { neon } from '@neondatabase/serverless';

// 🛑 INCORRECT (Often expects NeonClient): 
// import { drizzle } from 'drizzle-orm/neon-serverless';

// ✅ CORRECT: Import the function that accepts the serverless query function.
// This is often the default export from the specific client adapter path.
import { drizzle } from 'drizzle-orm/neon-http'; // Or check documentation for the correct serverless adapter path

import * as schema from './schema';

// 1. Initialize the serverless query function
const sql = neon(process.env.NEXT_PUBLIC_DRIZZLE_DATABASE_URL!); 

// 2. Use the imported drizzle function.
// Since 'sql' is the query function returned by neon, 'drizzle/neon-http' (or similar serverless adapter)
// is typically the correct wrapper to use.
export const db = drizzle(sql, { schema });