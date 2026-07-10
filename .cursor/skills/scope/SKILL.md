---
name: scope
description: >-
  Restricts edits to only the scoped components or description-related elements
  named in the instruction. Use when the user invokes /scope or asks to stay
  within a narrow domain without touching unrelated files or systems.
disable-model-invocation: true
---

# Scope

Modification only of scoped components or description-related elements in the codebase from the instruction. Do not modify any other files, and keep implementation as minimal as possible with particular focus on specific of the instruction code and scope of domain. For example, if you want to iterate on how a single UI element looks, you don't want unrelated systems to change.

## Before editing

1. **Parse scope** from the instruction: named files, folders, components, experiments, or domain.
2. **List allowed targets** — only files that directly implement the scoped behavior or its description/copy.
3. **List forbidden** — everything else: unrelated features, shared infra, backend, data layer, unless explicitly in scope.

## Rules

- **Files**: Touch only scoped files. Do not "drive-by" refactors, formatting, or fixes elsewhere.
- **Diff size**: Smallest change that satisfies the instruction. No new abstractions unless required.
- **Imports**: Do not add cross-boundary dependencies outside scope.
- **Tests / config**: Skip unless the instruction names them.
- **Blocked dependency**: If the task truly needs an out-of-scope file, stop and ask — do not expand silently.

## Scoped vs out-of-scope (example)

| In scope (single component look)     | Out of scope                          |
| ------------------------------------ | ------------------------------------- |
| Target component file                | Parent page layout and controls       |
| Styles/materials in the component    | Shared scene, grid, or camera setup   |
| Component description in registry    | Other features, API plugins, config   |

## Workflow

1. State scope in one line before editing.
2. Implement only within that scope.
3. Before finishing, confirm no other files were modified.

## Output format

```markdown
## Scope

[what was in / out]

## Changed

- [file] — [minimal what/why]

## Not touched

- [relevant areas left alone]
```
