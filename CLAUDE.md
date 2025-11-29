# workflow-worlds

Repository for building custom World implementations for the Workflow DevKit.

## For AI Agents

### Quick Start
1. User wants to build a new World → Copy `packages/starter/`
2. User has a failing test → Check `docs/04-patterns-and-practices.md`
3. User wants an example → Reference `packages/mongodb/` (if exists)

### Critical Files to Read First
- `docs/04-patterns-and-practices.md` - Must-know patterns (deep cloning, TTL idempotency)
- `packages/starter/src/storage.ts` - Storage implementation
- `packages/starter/src/queue.ts` - Queue with TTL-based idempotency

### Common Tasks

| Task | Action |
|------|--------|
| "Build a Redis world" | Copy starter, implement with ioredis + BullMQ |
| "Debug failing tests" | Check docs/05-testing.md, look at Common Errors table |
| "Fix idempotency deadlock" | Use TTL-based dedup, not inflight tracking |

### Key Gotchas
1. **Deep cloning**: Use `structuredClone()`, not JSON.parse/stringify
2. **Idempotency**: Use TTL-based deduplication, NOT inflight tracking
3. **Event order**: Always return events in ascending order (oldest first)
4. **Export**: `export default createWorld` (function), not `createWorld()`
5. **Error handling**: Use `WorkflowAPIError` from `@workflow/errors` with proper status codes (404, 409)

## Development

```bash
# Install dependencies
pnpm install

# Build all packages
pnpm build

# Run tests
pnpm test
```

## Repository Structure

```
workflow-worlds/
├── docs/                    # Building worlds documentation
├── llm/                     # AI/LLM-specific guides
└── packages/
    └── starter/             # Working in-memory World template
```

## More Documentation

- `llm/AGENTS.md` - Agent-specific instructions for building Worlds
- `llm/PROMPTS.md` - Ready-to-use prompts for common tasks
- `llm/world-builder-agent.md` - Comprehensive world builder guide
