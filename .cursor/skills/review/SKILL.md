---
name: review
description: Reviews code changes with emphasis on vertical end-to-end functionality testing and security. Use when the user invokes /review, asks for a code review, or before merging substantive changes.
disable-model-invocation: true
---

# Review

Review the requested diff, files, or PR with **vertical slices** (full request path) and
**security** as top priorities.

## Workflow

### 1. Establish scope

- What changed? (`git diff`, stated files, or PR)
- What user-facing behavior should differ?

### 2. Vertical functionality pass

Trace each feature **top to bottom** and verify logic at every hop:

| Layer            | Check                                         |
| ---------------- | --------------------------------------------- |
| UI               | Triggers, loading/error states, auth gating   |
| Client API calls | Correct URL, auth headers, payload shape      |
| Gateway / proxy  | Route proxied, auth enforced (if applicable)  |
| Server route     | Validation, auth, status codes, error bodies  |
| Realtime / WS    | Message handlers, state mutations, edge cases   |
| Database / ORM   | Queries, indexes, owner checks, idempotency     |
| External APIs    | Input validation, timeouts, error handling      |
| Shared types     | Client/server agree on shapes                 |

For each flow, ask:

- Happy path works?
- Unauthorized user blocked?
- Missing/invalid input handled?
- Race conditions (concurrent requests, double-submit)?
- Errors surfaced to user vs swallowed?

**Run tests when feasible:** project's test and lint/typecheck commands.

**Manual smoke** (note in review if not run): login → action → verify UI + network tab.

### 3. Security pass

| Area         | Look for                                                     |
| ------------ | ------------------------------------------------------------ |
| Auth         | Tokens verified on protected routes; no auth bypass        |
| Input        | Body/param validation; size limits on uploads                |
| Injection    | SQL/NoSQL, command injection, XSS in rendered content        |
| Secrets      | No keys in code, logs, or client bundles                     |
| IDOR         | User can only read/write own resources                       |
| Rate limits  | Auth brute-force, expensive endpoints                        |
| CORS / proxy | Gateway only exposes intended prefixes                       |
| External AI  | User content can't exfiltrate system prompts or env          |

Flag severity:

- **Critical** — must fix before merge
- **Warning** — should fix
- **Note** — optional improvement

### 4. Report format

```markdown
## Summary

[1–2 sentences]

## Vertical flows tested

- [flow]: [pass / fail / not verified] — [notes]

## Security findings

- [severity] [issue] — [file/location] — [recommendation]

## Other issues

- ...

## Verdict

[Approve / Approve with nits / Request changes]
```

## Hotspots to check

Identify sensitive areas in the repo before reviewing:

- Gateway / proxy entrypoints — auth and route prefixes
- Server routes — REST auth boundaries
- Realtime handlers — message validation and state mutations
- Data layer — mutations, owner checks, indexes
- External service routes — input validation and logging
- Client auth — token storage and refresh handling

## Rules

- Don't nitpick style if lint/typecheck passes — focus on behavior and security
- Cite file paths for every finding
- Prefer verifying with tests/commands over speculation
