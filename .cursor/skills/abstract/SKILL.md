---
name: abstract
description: Splits TypeScript and TSX files over 300 lines into smaller modules while preserving behavior. Use when the user invokes /abstract or when working on files exceeding 300 lines.
disable-model-invocation: true
---

# Abstract

Break up `.ts` / `.tsx` files **>300 lines** into focused modules. Target: **≤300 lines per file**
after split.

## Workflow

### 1. Find candidates

```bash
# Files over 300 lines (exclude generated, node_modules, dist)
```

Prioritize application `src/` directories and shared packages.

### 2. Analyze the file

Classify contents:

| Kind            | Extract to                    |
| --------------- | ----------------------------- |
| Types/constants | `types.ts`, `constants.ts`    |
| Pure helpers    | `utils.ts` or `lib/<name>.ts` |
| Hooks           | `use<Feature>.ts`             |
| Sub-components  | `components/<Name>.tsx`       |
| Route handlers  | `handlers/<action>.ts`        |
| Data logic      | `lib/<domain>/`               |

### 3. Split strategy (match existing repo patterns)

- **Thin entrypoint** — `index.ts` re-exports and wires pieces (~50–100 lines)
- **Feature folder** — e.g. `Feature/auth.ts`, `Feature/join.ts`
- **Barrel** — `index.ts` only when it reduces import churn

Follow neighboring files' conventions before inventing new structure.

### 4. Split rules

- One primary concern per file
- Pass dependencies explicitly; avoid hidden singletons
- Keep shared types in the workspace shared package only if used across apps
- Don't split a 320-line file into 8 files of 40 lines — 2–4 files is usually enough
- Preserve git blame where practical (move blocks, don't rewrite)

### 5. Update imports

- Fix all importers
- Run the project's lint/typecheck command

### 6. Verify

Run the project's lint/typecheck and test commands.

## Anti-patterns

- Splitting purely to hit line count while harming readability
- Circular imports between new modules
- Moving unrelated code "while we're here"
- Touching generated files

## Output

```markdown
## File: [path] ([before] → [after] lines)

### New modules

- `path` — responsibility

### Import changes

- [callers updated]

### Verification

- lint/typecheck: pass
```
