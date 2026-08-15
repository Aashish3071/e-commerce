#!/usr/bin/env node
import { execSync } from 'node:child_process';

function cleanUrl(url) {
  if (!url || typeof url !== 'string') return '';
  let cleaned = url.trim();
  // Strip surrounding quotes: "...", '...'
  cleaned = cleaned.replace(/^["']+|["']+$/g, '');
  // Strip psql prefix if copied from CLI commands: psql "postgresql://..."
  cleaned = cleaned.replace(/^psql\s+["']?/, '').replace(/["']?$/, '');
  return cleaned.trim();
}

function resolvePostgresUrl() {
  const envVars = [
    { key: 'DATABASE_URL', val: process.env.DATABASE_URL },
    { key: 'POSTGRES_URL_NON_POOLING', val: process.env.POSTGRES_URL_NON_POOLING },
    { key: 'POSTGRES_PRISMA_URL', val: process.env.POSTGRES_PRISMA_URL },
    { key: 'POSTGRES_URL', val: process.env.POSTGRES_URL },
  ];

  for (const item of envVars) {
    const cleaned = cleanUrl(item.val);
    if (cleaned.startsWith('postgresql://') || cleaned.startsWith('postgres://')) {
      return { url: cleaned, source: item.key };
    }
  }

  // If none matched the protocol, check if any non-file string was supplied
  for (const item of envVars) {
    const cleaned = cleanUrl(item.val);
    if (cleaned && !cleaned.startsWith('file:')) {
      return { url: cleaned, source: item.key, invalidProtocol: true };
    }
  }

  return null;
}

const resolved = resolvePostgresUrl();

if (!resolved || !resolved.url) {
  console.warn('[migrate] No PostgreSQL connection string detected. Skipping migration.');
  process.exit(0);
}

if (resolved.invalidProtocol) {
  console.error('\n================================================================================');
  console.error(`[migrate] ERROR: Invalid database URL protocol in environment variable: ${resolved.source}`);
  console.error('The database URL must start with "postgresql://" or "postgres://".');
  console.error(`Current value starts with: "${resolved.url.substring(0, 25)}..."`);
  console.error('\nPlease check your Vercel Project Settings -> Environment Variables.');
  console.error('Make sure you did not include wrapping quotes or CLI commands like "psql".');
  console.error('Correct Format: postgresql://username:password@ep-xyz.us-east-1.aws.neon.tech/neondb?sslmode=require');
  console.error('================================================================================\n');
  process.exit(1);
}

process.env.DATABASE_URL = resolved.url;
console.log(`[migrate] Using valid database connection URL from ${resolved.source}`);

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
