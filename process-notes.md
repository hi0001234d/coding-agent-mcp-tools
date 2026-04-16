# Process Notes

## /onboard

- **Learner:** Hiren — Repo owner, Team Lead, Founder/Owner of CLI Tools project (coding-agent-mcp-tools).
- **Technical experience:** Experienced developer and project founder; comfortable with multi-module architectures, MCP servers, CLI tooling, and public/private submodule repo setups. Has used Claude Code and the hackathon-in-a-plugin SDD workflow.
- **Learning goals:** Run the full SDD chain on a real shippable project; write planning docs rich enough for an agent to execute without hand-holding; build a reusable process for future CLI Tools work.
- **Creative sensibility:** Clean, developer-focused tooling — CLI aesthetics, minimal/functional UI, clear hierarchy, well-documented.
- **Prior SDD experience:** Already familiar; has run scope/PRD/spec passes before. /reflect should skip intro-level and focus on trade-offs and process refinement.
- **Energy/style:** Direct and efficient — prefers Gujarati (Roman script) explanations, concrete examples, and concise output.
- **Folder note:** Curriculum is running inside the existing `coding-agent-mcp-tools` repo (not a fresh empty folder) — planning docs live alongside existing CLI tool code.

## /scope

- **Idea evolution:** Hiren came in with a clear, existing project — no brainstorming needed. The CLI tool already exists in `cli/` with core modules built. Scope was about articulating what it does and framing it for hackathon submission.
- **Key framing decision:** Positioned as "automating the profile lifecycle at scale" rather than just "a publishing script." The scaling problem (agents x OS x stacks matrix) is the compelling why.
- **What's cut:** No web UI, no auto-git, no profile content generation, no npm publish. Clean boundaries.
- **References that shaped the doc:** Repo README (profile matrix, curated tools list), CLI package.json (commands, scripts), index.js (full command router and pipeline).
- **Deepening rounds:** 0 — learner requested direct doc generation from existing repo context. Had clear vision, no ambiguity to resolve.
- **Active shaping:** Learner drove direction fully — specified the format, level of detail, and asked for a submission-quality doc rather than conversational exploration. Efficient and decisive.
