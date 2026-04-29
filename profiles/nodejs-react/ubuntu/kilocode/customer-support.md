# 🎧 Customer Support Workflows — Design to Code

Building customer-facing features means translating designs and requirements into
production-ready Next.js components — fast, accurately, and without losing context
between sessions.

This workflow uses Figma Context MCP (Slot 4) + Basic Memory (Slot 3) together.

---

## ✅ Prerequisites

Figma Context MCP must be active. Check:

```
/status
```

You should see `figma-developer-mcp` listed. If it shows `disabled: true`, add your
Figma API key to `.kilocode/mcp.json` under `figma-developer-mcp → env → FIGMA_API_KEY`.

Get a Figma API token: https://help.figma.com/hc/en-us/articles/8085703771159-Manage-personal-access-tokens

---

## 🎨 Design-to-Code Workflow

### Step 1: Share the Figma frame URL with your agent
```
Build this component from the Figma design: [paste Figma frame URL]
```

The agent reads layout dimensions, spacing, typography, and component hierarchy
directly from Figma — no manual spec copying.

### Step 2: Let the agent generate the component
The agent translates Figma auto-layout → Tailwind/CSS Flexbox/Grid.
Review the output for accuracy before moving on.

### Step 3: Store the design decision in Basic Memory
```
Write a note: this component uses [design token / spacing convention] from the Figma system
```

Next session, the agent won't re-ask about the design system — it already knows.

---

## 📋 Handling Support Tickets as Features

When a customer support ticket becomes a feature:

1. Paste the ticket description into your agent chat
2. Ask: "What files in this project would need to change to implement this?"
3. Language Server finds the relevant code via references and definitions
4. Agent implements the change with Semgrep scan before marking done
5. Store the decision in Basic Memory: "Ticket #123 — implemented by changing X"

---

## 📝 Notes

- Figma Context MCP requires a Figma account — it calls the Figma API
- Store your API key in `.kilocode/mcp.json` env block, not in source code
- For fully local work (no Figma): see [fully-local.md](./fully-local.md)

<p align="center">
  <strong><a href="./agent-environment-profiles.md">← Back to Profile Overview</a></strong>
</p>
