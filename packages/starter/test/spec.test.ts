/**
 * Test Suite for Starter World
 *
 * This file uses @workflow/world-testing to run the standard test suite
 * against the starter world implementation.
 *
 * To run tests:
 *   pnpm build
 *   pnpm test
 *
 * When building your own world:
 * 1. Copy this test file to your project
 * 2. Update the path in createTestSuite() to point to your world
 * 3. Add any setup/teardown for your infrastructure (database, etc.)
 */

import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createTestSuite } from '@workflow/world-testing';

// Get the absolute path to the built world module
// This ensures the path resolves correctly regardless of cwd
const __dirname = dirname(fileURLToPath(import.meta.url));
const worldPath = join(__dirname, '..', 'dist', 'index.js');

// Run the full test suite against the starter world
createTestSuite(worldPath);

/**
 * Example: Testing with a database
 *
 * If your world uses a database, you'll want to set up test containers:
 *
 * ```typescript
 * import { PostgreSqlContainer } from '@testcontainers/postgresql';
 * import { createTestSuite } from '@workflow/world-testing';
 * import { execSync } from 'node:child_process';
 * import { afterAll, beforeAll } from 'vitest';
 *
 * let container: Awaited<ReturnType<PostgreSqlContainer['start']>>;
 *
 * beforeAll(async () => {
 *   // Start database container
 *   container = await new PostgreSqlContainer('postgres:15-alpine').start();
 *
 *   // Set connection string
 *   process.env.DATABASE_URL = container.getConnectionUri();
 *
 *   // Run migrations
 *   execSync('pnpm db:migrate', { stdio: 'inherit' });
 * }, 120_000);
 *
 * afterAll(async () => {
 *   if (container) {
 *     await container.stop();
 *   }
 * });
 *
 * createTestSuite('./dist/index.js');
 * ```
 */
