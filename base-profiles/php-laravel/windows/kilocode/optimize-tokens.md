# 💡 Optimize Token Usage — Large PHP Codebases

Large PHP apps hit context limits fast — especially with Laravel, where a single
feature spans controllers, services, models, migrations, Blade views, and route files.

These patterns extract maximum value from the 4 MCP tools without dumping entire files
into context.

---

## 🔍 Language Server: Targeted Navigation over Full-File Reads

Instead of asking the agent to read entire files, use Language Server queries:

**Slow (burns tokens):**
```
Read the entire /app/Http/Controllers/ directory and tell me how it works
```

**Fast (targeted):**
```
Find all references to the OrderService class across the project
Show me the definition of the UserRepository interface
List all PHP diagnostics in app/Http/Controllers/CheckoutController.php
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
Run Semgrep on /app/Http/ with the PHP security ruleset
```

---

## 📁 docs/ Folder: Summaries over Raw Code

The `docs/` folder feeds Basic Memory. Keep docs concise:

- ✅ Architecture decision records (1-2 paragraphs each)
- ✅ API contract summaries (input/output shapes, not implementation)
- ✅ Service purpose notes (what it does, not how)
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
