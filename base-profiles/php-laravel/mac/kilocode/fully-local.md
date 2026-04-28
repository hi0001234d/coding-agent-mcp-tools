# 🔒 Fully Local Setup — No External API Calls

Working with a sensitive codebase? No Laravel or WordPress project yet? Prefer nothing leaving your machine?

The three base MCP tools in this profile are fully local by default.
Laravel Boost and WordPress MCP Adapter are disabled unless you explicitly enable them — and both are project-local (they call your own PHP installation, not any external API).

---

## ✅ Which Tools Are Fully Local

| Tool | Local? | Notes |
|---|---|---|
| mcp-language-server + phpactor | ✅ Yes | LSP runs entirely on your machine |
| Semgrep | ✅ Yes | Scans locally, no data sent externally (without `semgrep login`) |
| Basic Memory | ✅ Yes | Notes stored as local markdown in `~/basic-memory/` |
| Laravel Boost | ✅ Yes | Calls your local `php artisan` — no external API |
| WordPress MCP Adapter | ✅ Yes | Calls your local `wp` CLI — no external API |

**All 5 tools are fully local.** This profile makes no external API calls from any MCP tool.

---

## 🔧 Verify Fully Local Setup

Open KiloCode and run:

```
/status
```

You should see:
- `language-server` ✅ connected
- `semgrep` ✅ connected
- `basic-memory` ✅ connected
- `laravel-boost` — not listed or `disabled: true` (unless you enabled it)
- `wordpress-mcp` — not listed or `disabled: true` (unless you enabled it)

---

## 📝 Semgrep Privacy Note

By default (without `semgrep login`), Semgrep runs fully offline using open-source rules.

Running `semgrep login` enables Pro rules — this does send scan metadata to Semgrep's
servers. For fully local operation, do not run `semgrep login`.

Free offline rules still cover all 4 security risks in the `security.md` rules file.

---

## 📝 Basic Memory Privacy Note

All notes are stored as plain markdown files in `~/basic-memory/` on your local machine.
The optional cloud sync (basicmachines.co) is disabled unless you explicitly configure it.

<p align="center">
  <strong><a href="./agent-environment-profiles.md">← Back to Profile Overview</a></strong>
</p>
