# coding-agent-mcp-tools — Claude Code Instructions

This repo is a curated list of coding agents and MCP tools.
It has TWO special workflows: **Idea Validation** and **Auto Research**.

---

## TOOL 1: Idea Validation (via idea-reality-mcp + README scan)

When someone says "validate idea: X" or "is X worth building?", run this flow:

### Step 1 — idea_check via MCP
Call the `idea_check` MCP tool with the idea description.
Use `depth="deep"` for thorough validation.

### Step 2 — Scan THIS repo's list (THE MOST IMPORTANT STEP)
Go through the README.md of THIS repo (coding-agent-mcp-tools).
For EVERY repo listed, do:
1. Fetch its GitHub URL (listed in README)
2. Read its README content (use WebFetch tool)
3. Check if the idea overlaps with what that repo does

### Step 3 — Decision Logic

**NEGATIVE (not worth building):**
- If 2+ repos in our list already cover the idea's core capability
- State which repos cover it and why
- Format: "NEGATIVE — Already covered by [repo-name]: [reason from their README]"

**POSITIVE (worth building):**
- If NO repo in our list covers this specific angle
- Format: "POSITIVE — Gap identified: [reason]. Closest existing: [repo] but differs because [difference]"

**PARTIAL (niche opportunity):**
- Core idea exists but this specific angle is unique
- Format: "PARTIAL — Core exists in [repo], but [specific angle] is not covered"

### Step 4 — Final Report Format
```
IDEA: [idea name]
DECISION: [POSITIVE / NEGATIVE / PARTIAL]

MCP Signal: [reality_signal]/100 — [duplicate_likelihood]
Top Similar (from MCP): [list top_similars]

Internal Repo Scan:
- [repo-name] ([link]): [relevant/not-relevant] — [one line reason]

REASONING:
[2-3 sentences explaining the decision]

VERDICT:
[Final recommendation]
```

---

## TOOL 2: Auto Research (via autoresearch skill)

When someone says "research: X" or "find repos for: X", use the `/autoresearch` skill.

### Research Pattern Examples:

RAG with vision support:
```
/autoresearch
Goal: Find repos in our list that support RAG with BOTH text AND vision/image documents
Scope: README.md (read-only, do not modify)
Metric: count of repos found matching criteria (higher is better)
Verify: node -e "const r=require('./research-results.json');console.log('SCORE: '+r.length)"
```

Context/memory persistence with recent activity:
```
/autoresearch
Goal: Find repos focused on context and memory persistence with commits in past 1 day
Scope: README.md (read-only)
Metric: count of active repos found (higher is better)
```

---

## Important Notes
- NEVER modify the README.md repo list without explicit instruction
- Always cite the specific repo README content when making decisions
- For idea validation, internal repo scan is more important than MCP signal
- Recent activity = commits within last 1 day (check GitHub last commit date)
