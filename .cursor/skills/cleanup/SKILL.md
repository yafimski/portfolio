---
name: cleanup
description: Removes unused files, packages, exports, and trims excessive comments or verbose code across the repo. Use when the user invokes /cleanup or asks to dead-code eliminate and reduce noise.
disable-model-invocation: true
---

# Cleanup

Remove dead weight repo-wide. **Minimize comments** — delete obvious ones; keep only non-obvious
business logic notes.

## Workflow

### 1. Inventory (run commands)

```bash
# Unused exports (if tooling available)
# Run project's lint/typecheck command

# Find orphan files — cross-check imports before deleting
# ripgrep for filename stem across repo
```

Per area:

| Area       | How to detect unused                                     |
| ---------- | -------------------------------------------------------- |
| npm deps   | `package.json` dep not imported anywhere in that package |
| Files      | No importers; not entrypoint/script/config               |
| Exports    | Only used internally — consider non-export               |
| Functions  | Zero references after ripgrep                            |
| Components | Not in any route/parent JSX tree                         |
| Env vars   | Not read in env config or code                           |

### 2. Safe removal order

1. Unused imports and variables (let lint/typecheck guide)
2. Unreachable functions and private dead code
3. Unused exports → delete or stop exporting
4. Unused files (confirm not referenced by dynamic import, script, or deploy config)
5. Unused dependencies (reinstall after `package.json` edit)
6. Comment blocks that restate the code
7. Verbose logging left from debugging (keep structured request logs)

### 3. Comment policy

**Remove:**

- `// increment i`
- Section banners that duplicate file structure
- Commented-out code (delete — git has history)
- JSDoc on obvious one-liners

**Keep:**

- Why a workaround exists
- Non-obvious database index/query constraints
- Security-sensitive edge cases
- Public API docs on shared package exports

### 4. Do not delete without checking

- `deploy/`, `scripts/`, deploy config files, `.env.example`
- Generated code directories
- Static assets referenced by build or runtime
- Data paths referenced by scripts or tooling

### 5. Verify

Run the project's lint/typecheck, test, and build commands (especially if deps or entrypoints changed).

## Output format

```markdown
## Removed

- [files / deps / exports]

## Trimmed

- [comments / verbose blocks]

## Skipped (needs confirmation)

- [item] — [reason]

## Verification

- lint/typecheck: [pass/fail]
- tests: [pass/fail]
```

## Rules

- Prefer small focused commits of cleanup
- When unsure if code is used dynamically, list under **Skipped** and ask
- Don't strip README/docs content — those are docs, not noise
