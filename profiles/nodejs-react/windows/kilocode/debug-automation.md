# 🐛 Fix the Day 2 Problem — Debug + Review Workflow

Vibe-coded apps are fast to build and painful to maintain.
The agent confidently writes code that looks right — but ships subtle bugs, security issues,
and TypeScript errors that only show up later.

This profile's Day 2 solution: **Semgrep MCP** (Slot 2) + **mcp-language-server** (Slot 1)
+ the `code-review.md` rules file, which together catch issues before they ship.

---

## ✅ Verify Semgrep is Running

Open KiloCode and run:

```
/status
```

You should see `semgrep` listed as a connected MCP server.

If it's missing, re-run the setup script from [windows-setup.md](./windows-setup.md).

---

## 🔍 Using Semgrep in Your Workflow

Ask your agent to scan before marking any task complete:

```
Run a Semgrep scan on the current changes
```

Or scan the full project:

```
Run semgrep with the TypeScript ruleset on this project
```

The agent will run:
```bash
semgrep --config=p/typescript .
semgrep --config=p/nodejs .
```

And surface issues directly in your chat — security vulnerabilities, anti-patterns,
and Node.js-specific risks before they reach production.

---

## ✅ The Code Review Checklist

Your `code-review.md` rules file (at `.kilocode/rules/code-review.md`) enforces this
checklist automatically before the agent marks any task as done:

1. `npm run lint` — zero ESLint errors
2. `npm run type-check` — zero TypeScript errors
3. No `console.log` in production code paths
4. No unused imports

The agent will not mark a task complete until all four pass.

---

## 🧭 Debugging Workflow with Language Server

When a bug is hard to trace, use mcp-language-server (Slot 1) to navigate:

```
Find all references to [function name] across the project
```

```
Go to the definition of [type or interface name]
```

```
Show me all TypeScript diagnostics in this file
```

The language server gives the agent IDE-grade navigation — the same tools a human
developer uses in VS Code, but available directly in the agent chat.

---

## 📝 Notes

- Semgrep's free tier covers all core SAST rules — no account required for basic scanning
- For deeper security coverage: `semgrep login` unlocks 600+ pro rules (free account)
- The `code-review.md` rules file lives at `.kilocode/rules/code-review.md` — edit it to add project-specific checks

<p align="center">
  <strong><a href="./agent-environment-profiles.md">← Back to Profile Overview</a></strong>
</p>
