# 💡 Optimize Token Usage — Large Next.js Codebases

Large Next.js apps hit context limits fast — especially with App Router, where a single
feature spans server components, client components, API routes, and data fetching layers.

These patterns extract maximum value from the 4 MCP tools without dumping entire files
into context.

---

## 🔍 Language Server: Targeted Navigation over Full-File Reads

Instead of asking the agent to read entire files, use Language Server queries:

**Slow (burns tokens):**
```
Read the entire /app/dashboard/ directory and tell me how it works
```

**Fast (targeted):**
```
Find all references to the useUser hook across the project
Show me the definition of the DashboardLayout component
List all TypeScript diagnostics in /app/dashboard/page.tsx
```

Language Server answers these with minimal context — no full-file reads needed.

---

## 🧠 Basic Memory: Search over Build Context

For large knowledge graphs, prefer `search` over `build_context`:

**Heavier (loads full graph):**
```
build_context("memory://")
```

**Lighter (targeted retrieval):**
```
search("auth implementation decision")
search("known bug patterns")
recent_activity(type="decisions", timeframe="7d")
```

Use `build_context` only at session start for initial orientation. Use `search` for
mid-session lookups.

---

## 🔒 Semgrep: Scan Changed Files Only

Instead of scanning the full project every time:

```
Run Semgrep only on the files changed in this session
```

Or target specific directories:
```
Run Semgrep on /app/api/ with the nodejs security ruleset
```

---

## 📁 docs/ Folder: Summaries over Raw Code

The `docs/` folder feeds Basic Memory. Keep docs concise:

- ✅ Architecture decision records (1-2 paragraphs each)
- ✅ API contract summaries (input/output shapes, not implementation)
- ✅ Component purpose notes (what it does, not how)
- ❌ Raw source code copies
- ❌ Full file dumps

One focused doc is worth more than ten raw files.

---

## 📝 Notes

- mcp.json stays the same for this workflow — no tool changes needed
- These are prompt patterns, not configuration changes
- Apply them progressively as the codebase grows

<p align="center">
  <strong><a href="./agent-environment-profiles.md">← Back to Profile Overview</a></strong>
</p>
