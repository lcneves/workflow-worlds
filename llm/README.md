# LLM Instructions for World Building

This directory contains instructions and prompts for AI assistants helping with Workflow DevKit World implementations.

## Files

| File | Purpose |
|------|---------|
| [CLAUDE.md](./CLAUDE.md) | Instructions for Claude when helping build worlds |
| [AGENTS.md](./AGENTS.md) | Structured instructions for any AI agent |
| [world-builder-agent.md](./world-builder-agent.md) | Specialized agent prompt for world building |
| [PROMPTS.md](./PROMPTS.md) | Ready-to-use prompts for common tasks |

## Usage

### With Claude Code

Reference these files when asking Claude to help build a world:

```
@llm/CLAUDE.md Help me build a MongoDB world
```

Or use as context:

```
Read llm/CLAUDE.md then help me implement a Redis world
```

### As Slash Commands

Create a `.claude/commands/build-world.md` file in your project:

```markdown
Build a custom World implementation for the Workflow DevKit.

Backend: $ARGUMENTS

Follow the instructions at llm/world-builder-agent.md
```

Then use:
```
/build-world mongodb
```

### With Other AI Assistants

Copy the contents of `AGENTS.md` into your AI assistant's system prompt or context window.

## Quick Reference

### World Interface

```typescript
interface World extends Queue, Storage, Streamer {
  start?(): Promise<void>;
}
```

### Storage Namespaces

- `runs` - Workflow execution instances
- `steps` - Individual step executions
- `events` - Event log for replay
- `hooks` - Webhook registrations

### Implementation Order

1. Storage.runs
2. Storage.steps
3. Storage.events
4. Storage.hooks
5. Queue
6. Streamer

### Testing

```bash
pnpm build && pnpm test
```

Uses `@workflow/world-testing` with 5 test suites.
