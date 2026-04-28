# 🧠 Stop AI Amnesia — Persistent Memory Setup

Does your agent keep re-proposing patterns you already rejected?
Re-implementing the same service layer you refactored last week?

AI agents have no memory between sessions. Every time you open KiloCode, it starts fresh — with no knowledge of your architecture decisions, your naming conventions, or the bugs you already fixed.

**Basic Memory (Slot 3) solves this.** It stores your project context as local markdown files that your agent reads at the start of every session.

---

## ✅ Prerequisites

Basic Memory must be active. Check:

```
/status
```

You should see `basic-memory` listed as connected.

---

## 🧠 Session Workflow

### Start of every session
Before writing any code, run:

```
build_context("memory://")
```

This loads your architecture decisions, known-bad patterns, and recent work into the agent's context. Your agent starts informed, not blank.

### During the session
Write to memory when you:

- Make an architectural decision:
  ```
  write_note("Used Repository pattern for UserService — keeps controllers thin", folder="decisions")
  ```
- Discover a codebase convention:
  ```
  write_note("All API responses wrapped in JsonResource — never return raw arrays", folder="conventions")
  ```
- Hit a bug pattern:
  ```
  write_note("Never use $request->all() with User::create() — use validated() only", folder="known-bad-patterns")
  ```

### End of every session
```
write_note(
  title="Session: [date] — [feature]",
  content="What changed, why, and what to watch next session.",
  folder="sessions"
)
```

---

## 📁 What to Store in `docs/` vs Basic Memory

| Store in `docs/` | Store in Basic Memory |
|---|---|
| Architecture overview (static) | Decisions made this week |
| API contract reference | Patterns that caused bugs |
| Data model diagrams | Session summaries |
| Onboarding notes | Evolving conventions |

`docs/` = stable reference. Basic Memory = living project knowledge.

---

## 📝 Notes

- All notes are stored as local markdown in `~/basic-memory/` — nothing leaves your machine
- Optional cloud sync (basicmachines.co) is disabled unless you explicitly configure it
- The `ai-amnesia.md` rules file enforces this workflow every session automatically

<p align="center">
  <strong><a href="./agent-environment-profiles.md">← Back to Profile Overview</a></strong>
</p>
