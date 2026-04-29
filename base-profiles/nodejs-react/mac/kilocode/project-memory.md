# 🧠 Stop AI Amnesia — Persistent Memory Setup

Does your agent keep re-proposing patterns you already rejected?
Re-asking about conventions you explained three sessions ago?
Introducing bugs that were already fixed?

That's AI Amnesia — and this profile fixes it with **Basic Memory MCP** (Slot 3) and the
`ai-amnesia.md` rules file, which together give your agent persistent project context
across every session.

---

## ✅ Verify Basic Memory is Running

Open KiloCode and run:

```
/status
```

You should see `basic-memory` listed as a connected MCP server.

If it's missing, re-run the setup script from [system-setup.md](./system-setup.md).

---

## 🔄 Session Workflow

Your `ai-amnesia.md` rules file (auto-created in `.kilocode/rules/`) instructs the agent
to follow this workflow automatically.

### At the START of every session
The agent runs:
```
build_context("memory://")
```
This loads all stored decisions, conventions, and known-bad patterns before writing any code.

### During the session
The agent writes to Basic Memory whenever it:
- Makes an architectural decision
- Discovers a codebase convention
- Hits a pattern that caused a bug (stored as a known-bad pattern)
- Completes a significant feature

### At the END of every session
The agent writes a session summary note so the next session picks up exactly where this one left off.

---

## 📁 What to Store Where

| Content type | Where it goes |
|---|---|
| Architecture decisions, conventions | Basic Memory (auto — via agent) |
| Session summaries, feature notes | Basic Memory (auto — via agent) |
| Static project docs, API references | `docs/` folder |
| Project rules, constraints | `AGENTS.md` + `.kilocode/rules/` |

---

## ✏️ Customize Your Memory Setup

The `ai-amnesia.md` rules file lives at `.kilocode/rules/ai-amnesia.md` in your project.
Edit it to add project-specific instructions — for example:
- "Always load `memory://decisions/auth` at session start"
- "After any database schema change, write a note to `memory://decisions/schema`"

---

## 📝 Notes

- Basic Memory stores notes as local markdown files in `~/basic-memory/` — never leaves your machine
- Use `--project your-project-name` in the mcp.json args to keep separate knowledge graphs per project
- Cloud sync is available optionally at basicmachines.co (paid) — local-first is the default

<p align="center">
  <strong><a href="./agent-environment-profiles.md">← Back to Profile Overview</a></strong>
</p>
