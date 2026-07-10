---
name: grill-me
description: Planning alignment workflow. Asks the prompter targeted questions before implementation to maximize intent alignment. Use when the user invokes /grill-me, asks to plan a feature, or before large ambiguous tasks.
disable-model-invocation: true
---

# Grill Me — Planning Alignment

Do **not** write code yet. Your job is to interrogate the request until intent, scope, and
constraints are clear enough to start with high confidence.

## When to run

- User invokes `/grill-me`
- Task is multi-file, architectural, or ambiguous
- Requirements mix product, UX, and technical concerns
- User says "plan", "think through", or "help me scope"

## Workflow

### 1. Restate (2–3 sentences)

Summarize what you think the user wants. Mark assumptions with **(assumption)**.

### 2. Ask questions (use AskQuestion when available)

Ask **5–10** questions max per round. Prioritize blockers first.

**Intent & outcome**

- What does "done" look like? Who benefits?
- What must **not** change?
- Is this user-facing, internal tooling, or agent harness?

**Scope**

- Which apps/packages are in scope?
- MVP vs full solution — what can ship in v1?
- Any files or areas off-limits?

**Product language**

- Use the project's domain vocabulary (entities, features, user-facing terms) consistently.

**Technical**

- Breaking changes acceptable?
- Tests required? Which layer (unit, integration, manual)?
- Performance or security constraints?

**Process**

- Commit/PR expectations?
- Should other skills run after (`/review`, `/refactor`, `/architecture`)?

### 3. Propose a plan (only after answers or explicit "proceed with assumptions")

```markdown
## Agreed scope

- ...

## Out of scope

- ...

## Approach

1. ...
2. ...

## Risks

- ...

## Verification

- [ ] ...
```

### 4. Confirm before coding

Ask: **"Proceed with this plan, or adjust?"** Wait for approval unless user said to assume defaults.

## Rules

- Prefer multiple-choice (AskQuestion) over open-ended when options are known
- One round of questions is often enough — don't stall
- If the user gives a tight spec, skip to step 3 with a short plan
- Never start implementation in the same turn as the first question round unless asked

## Defaults (state if user doesn't answer)

- Quality gate: project's lint/typecheck command (e.g. `pnpm check`, `npm run lint`)
- Env secrets stay in `.env`, never committed
- Follow existing auth and API routing patterns in the repo
