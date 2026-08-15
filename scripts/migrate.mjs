#!/usr/bin/env node
import { execSync } from 'node:child_process';

// Resolve database URL with fallbacks for Vercel / Neon integrations
let dbUrl = process.env.DATABASE_URL;

if (!dbUrl) {
  dbUrl =
    process.env.POSTGRES_URL_NON_POOLING ||
    process.env.POSTGRES_PRISMA_URL ||
    process.env.POSTGRES_URL;

  if (dbUrl) {
    process.env.DATABASE_URL = dbUrl;
    console.log('[migrate] Automatically mapped DATABASE_URL from Vercel Postgres/Neon environment variables.');
  }
}

if (!process.env.DATABASE_URL || process.env.DATABASE_URL.startsWith('file:')) {
  console.warn('[migrate] No remote PostgreSQL connection string detected. Skipping prisma migration step.');
  process.exit(0);
}

try {
  console.log('[migrate] Deploying database migrations with Prisma...');
  execSync('npx prisma migrate deploy', {
    stdio: 'inherit',
    env: process.env,
  });
  console.log('[migrate] Database migrations applied successfully.');
} catch (error) {
  console.error('[migrate] Migration command encountered an issue:', error.message);
  process.exit(1);
}
