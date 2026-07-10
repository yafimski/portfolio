---
name: refactor
description: Refactors code by simplifying names while keeping them descriptive, and removing duplicate or repetitive functions and components. Use when the user invokes /refactor or asks to clean up code structure without changing behavior.
disable-model-invocation: true
---

# Refactor

Improve structure and naming **without changing behavior**. Tests and the project's quality gate must pass after.

## Goals

1. **Names** — shorter when safe, still specific enough to grep and understand
2. **Dedup** — one implementation for repeated logic
3. **Components** — merge near-identical UI; extract only when reused ≥2 times

## Workflow

### 1. Read before writing

- Understand callers and exports
- Identify the smallest diff that achieves the goal

### 2. Naming pass

| Before                          | After                                         |
| ------------------------------- | --------------------------------------------- |
| `getUserDataFromServerAndCache` | `fetchUser` (if cache is obvious from module) |
| `handleClickButtonSubmit`       | `submitForm`                                  |
| `data` / `item` / `temp`        | domain term from the project                  |

Rules:

- Prefer the project's domain vocabulary over generic names
- Verbs for functions, nouns for types
- Booleans: `is*`, `has*`, `should*`
- Don't rename public API routes or database table names in a refactor pass unless explicitly scoped

### 3. Dedup pass

Look for:

- Copy-pasted fetch/error-handling blocks → shared helper in same feature folder
- Repeated JSX chunks → small component in same directory
- Same validation in client + server → prefer shared package type/guard if trivial

**Do not** extract one-liner wrappers or create `utils.ts` dumping grounds.

### 4. Component pass

- Split only when a component mixes unrelated concerns
- Keep co-located: `Feature/index.tsx` + `Feature/useFeature.ts` + `Feature/types.ts`
- Preserve existing import paths when possible (re-export from barrel if moving)

### 5. Verify

Run the project's lint/typecheck and test commands.

## Anti-patterns

- Drive-by feature additions
- Renaming across the entire monorepo in one PR
- Abstract factories for a single call site
- Changing formatting unrelated to touched lines

## Output

Brief summary:

- What was renamed/consolidated
- Files touched
- Behavior intentionally unchanged
