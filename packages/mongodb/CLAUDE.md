# MongoDB World

MongoDB-backed World implementation for the Workflow DevKit.

## Commands

```bash
pnpm build          # Build TypeScript
pnpm test           # Run tests (requires Docker)
pnpm test:only      # Run tests without rebuilding
pnpm typecheck      # Type check only
```

## Environment Variables

All options are configurable via `WORKFLOW_` prefixed environment variables:

| Variable | Description | Default |
|----------|-------------|---------|
| `WORKFLOW_MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017` |
| `WORKFLOW_MONGODB_DATABASE_NAME` | Database name | `workflow` |
| `WORKFLOW_MONGODB_CHANGE_STREAMS` | Enable change streams | `true` |
| `WORKFLOW_SERVICE_URL` | Base URL for HTTP callbacks | `http://localhost:{PORT}` |
| `WORKFLOW_CONCURRENCY` | Max concurrent message processing | `20` |

## Architecture

```
src/
├── index.ts      # Main entry, createWorld factory
├── storage.ts    # Runs, steps, events, hooks collections
├── queue.ts      # TTL-based idempotency queue
└── streamer.ts   # Change streams for real-time output
```

## Key Implementation Details

### MongoDB-Specific Patterns

1. **Null to Undefined Conversion**: MongoDB stores `undefined` as `null`. Use `cleanMongoDoc()` to convert back.

2. **Upsert for Idempotent Steps**: Steps use `findOneAndUpdate` with `$setOnInsert` to handle duplicate step creation.

3. **Change Streams**: Requires MongoDB replica set. Falls back gracefully to in-process events.

4. **TTL Indexes**: Idempotency keys auto-expire after 60 seconds via MongoDB TTL index.

### Collections

- `runs` - Workflow run records
- `steps` - Step execution records
- `events` - Event log for replay
- `hooks` - Hook registrations
- `stream_chunks` - Stream output
- `idempotency_keys` - TTL-based dedup (auto-expires)

### Testing

Tests use `@testcontainers/mongodb` to spin up MongoDB 7:

```typescript
const container = await new MongoDBContainer('mongo:7').start();
process.env.WORKFLOW_MONGODB_URI = container.getConnectionString() + '?directConnection=true';
```

## Common Issues

| Issue | Solution |
|-------|----------|
| `expected undefined, received null` | Ensure `cleanMongoDoc()` is called on all returned documents |
| Duplicate key error on steps | Use upsert pattern with `$setOnInsert` |
| Change stream errors | Set `WORKFLOW_MONGODB_CHANGE_STREAMS=false` or use replica set |
| Connection issues in tests | Ensure Docker/OrbStack is running |

## Error Handling

Use `WorkflowAPIError` from `@workflow/errors`:

```typescript
import { WorkflowAPIError } from '@workflow/errors';

throw new WorkflowAPIError(`Run not found: ${id}`, { status: 404 });
throw new WorkflowAPIError(`Duplicate token`, { status: 409 });
```
