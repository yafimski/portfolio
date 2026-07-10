---
name: architecture
description: Analyzes repo folder hierarchy and proposes structural improvements for testability and modular cohesion — file placement, naming, and import boundaries. Use when the user invokes /architecture or asks to reorganize project structure.
disable-model-invocation: true
---

# Architecture

Improve how code is **organized** so modules are testable, discoverable, and cohesive. This skill
plans and executes structural moves — not feature work.

## Principles

1. **Colocation** — code that changes together lives together
2. **Testability** — pure logic separated from I/O (easy to unit test)
3. **Clear boundaries** — client / server / shared don't leak internals
4. **Shallow trees** — prefer `feature/action.ts` over deep nesting without reason
5. **Explicit entrypoints** — `index.ts` defines public surface of a module

## Workflow

### 1. Map the tree

For the target app or package in scope:

- List top-level `src/` folders and file counts
- Flag **sparse** folders (1–2 files) that could merge with a parent feature
- Flag **god** folders (`components/` with 50+ unrelated files)

### 2. Dependency audit

- Who imports whom? Circular deps?
- Is business logic trapped inside React components?
- Are server routes fat while `lib/` is empty?
- Is database/backend logic only in the data layer or duplicated elsewhere?

### 3. Propose moves (discuss before large reshuffles)

Use this template:

```markdown
## Current pain

- ...

## Proposed structure
```

feature/
├── index.ts # public exports
├── api.ts # fetch/route calls
├── types.ts
├── lib/ # pure, testable logic
└── components/

```

## Moves
| From | To | Reason |
| ---- | -- | ------ |

## Test impact
- New unit tests possible for: ...
- Import paths to update: ...

## Risk
- [low/medium/high] — ...
```

### 4. Module boundaries

| Layer            | Should contain                  | Should not contain              |
| ---------------- | ------------------------------- | ------------------------------- |
| `shared` package | Types, schema, pure math/guards | Framework runtime, UI, I/O      |
| Client app       | UI, hooks, client-side state    | Direct privileged backend calls |
| Server app       | Routes, auth, business logic    | UI components                   |
| Gateway / proxy  | Auth + routing only             | Business logic                  |

**Feature modules** (examples of good grouping):

- `auth/` — login UI, hooks, types together
- `dashboard/` — panel, data hooks, API calls
- `settings/` — form, validation, server handlers

### 5. Testability checklist

After restructure, these should be easy to test in isolation:

- Pure business logic → `shared` or `lib/`
- Input validation and normalization → `shared` or server `lib/`
- Route handlers → thin; logic in `lib/` or service modules
- Data access → dedicated data layer, not scattered in UI

### 6. Execute incrementally

- One feature domain per PR
- Re-export from old paths temporarily if needed
- Run the project's lint/typecheck and test commands after each move

## Anti-patterns

- Big-bang rename of entire `components/`
- Creating `misc/`, `helpers/`, `common/` catch-alls
- Moving files without updating docs or skill references
- Architecture change bundled with feature work

## Output

Deliver a short **architecture note** (in chat or agreed doc path) plus implemented moves if
user approved execution.
