# 🔒 Fully Local Setup — No External API Calls

Working with a sensitive codebase? No Figma account? Prefer nothing leaving your machine?

Three of the four MCP tools in this profile are fully local by default.
This page shows how to disable Figma and confirm everything runs offline.

---

## ✅ Which Tools Are Fully Local

| Tool | Local? | Notes |
|---|---|---|
| mcp-language-server | ✅ Yes | LSP runs entirely on your machine |
| Semgrep | ✅ Yes | Scans locally, no data sent externally (without `semgrep login`) |
| Basic Memory | ✅ Yes | Notes stored as local markdown in `~/basic-memory/` |
| Figma Context MCP | ❌ No | Calls Figma API — disable for fully local setup |

---

## 🔧 Disable Figma in mcp.json

Open `.kilocode/mcp.json` in your project and set `disabled: true` on the Figma entry:

```json
{
  "mcpServers": {
    "language-server": { ... },
    "semgrep": { ... },
    "basic-memory": { ... },
    "figma-developer-mcp": {
      "command": "npx",
      "args": ["-y", "figma-developer-mcp", "--stdio"],
      "env": {
        "FIGMA_API_KEY": "YOUR-FIGMA-API-KEY"
      },
      "disabled": true
    }
  }
}
```

If you skipped the Figma API key during setup, it's already disabled.

---

## ✅ Verify Fully Local Setup

Open KiloCode and run:

```
/status
```

You should see:
- `language-server` ✅ connected
- `semgrep` ✅ connected
- `basic-memory` ✅ connected
- `figma-developer-mcp` — not listed (disabled)

---

## 📝 Semgrep Privacy Note

By default (without `semgrep login`), Semgrep runs fully offline using open-source rules.

Running `semgrep login` enables Pro rules — this does send scan metadata to Semgrep's
servers. For fully local operation, do not run `semgrep login`.

Free offline rules still cover all 3 security risks in the `security.md` rules file.

---

## 📝 Basic Memory Privacy Note

All notes are stored as plain markdown files in `~/basic-memory/` on your local machine.
The optional cloud sync (basicmachines.co) is disabled unless you explicitly configure it.

<p align="center">
  <strong><a href="./agent-environment-profiles.md">← Back to Profile Overview</a></strong>
</p>
