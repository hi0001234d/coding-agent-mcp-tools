# Process Notes

## /onboard

- **Learner:** Hiren — Repo owner, Team Lead, Founder/Owner of CLI Tools project (coding-agent-mcp-tools).
- **Technical experience:** Experienced developer and project founder; comfortable with multi-module architectures, MCP servers, CLI tooling, and public/private submodule repo setups. Has used Claude Code and the hackathon-in-a-plugin SDD workflow.
- **Learning goals:** Run the full SDD chain on a real shippable project; write planning docs rich enough for an agent to execute without hand-holding; build a reusable process for future CLI Tools work.
- **Creative sensibility:** Clean, developer-focused tooling — CLI aesthetics, minimal/functional UI, clear hierarchy, well-documented.
- **Prior SDD experience:** Already familiar; has run scope/PRD/spec passes before. /reflect should skip intro-level and focus on trade-offs and process refinement.
- **Energy/style:** Direct and efficient — prefers Gujarati (Roman script) explanations, concrete examples, and concise output.
- **Folder note:** Curriculum is running inside the existing `coding-agent-mcp-tools` repo (not a fresh empty folder) — planning docs live alongside existing CLI tool code.

## /prd

- **Run mode:** Review pass — PRD already existed from a prior session. No new interview conducted.
- **Fixes applied:** Corrected `SSS#` typo on line 1; corrected pipeline order in Full Pipeline epic from `validate → readme → nav → publish` to `validate → publish → readme → nav` (readme/nav must reflect published state and must run after publish — consistent with spec.md and resolved open question).
- **PRD quality:** Comprehensive. All 5 epics have user stories, acceptance criteria, and testable acceptance checks. Non-goals are explicit and correctly scoped. Open questions are tracked with resolution status.
- **Deepening rounds:** 0 — no new gaps surfaced. Existing PRD was built from a rich prior session.
- **Next:** CLI code already exists in `cli/src/`. Next step is `/checklist` to produce the build checklist before starting `/build`.

## /build

- **Build mode:** Autonomous — single invocation, all items dispatched and verified.
- **Items completed:** 5 of 6 pre-Devpost items verified and committed. Item 6 (Devpost submission) is the remaining manual step.
- **Checklist revised:** No — all items were already in a state where the implementation matched or the fixes were straightforward.
- **Key finding that changed the plan:** The spec described `agent/os` path hierarchy, but the actual filesystem (and config.js) uses `os/agent` hierarchy via a sibling submodule (`coding-agent-mcp-tools-submodule`). validate.js was already using the correct `sourceBase` and path order. Items 1 and 3 were effectively done; item 5 had two real bugs.
- **Item 5 fix (the only real code change):** `index.js` was not calling `validateAgent()` before `validate()`, so unknown `--agent` names produced exit 0 instead of exit 2. Also, `process.exit(1)` was missing when validate failed standalone, so failures silently exited 0.
- **Verification summary:**
  - validate nodejs-react: 27/27 checks pass
  - publish gate: blocks with exit 1 without prior validate ✓
  - full pipeline (all nodejs-react --agent kilocode): all 4 steps pass ✓
  - status: kilocode PUBLISHED for ubuntu/mac/windows ✓
  - error paths: unknown-stack exits 2, unknown-agent exits 2, publish-without-validate exits 1 ✓
- **No checkpoint issues:** Learner did not flag any problems. Build ran clean.
- **Next:** Item 6 — Devpost submission (manual, content drafted below in submission artifact).

## /scope

- **Idea evolution:** Hiren came in with a clear, existing project — no brainstorming needed. The CLI tool already exists in `cli/` with core modules built. Scope was about articulating what it does and framing it for hackathon submission.
- **Key framing decision:** Positioned as "automating the profile lifecycle at scale" rather than just "a publishing script." The scaling problem (agents x OS x stacks matrix) is the compelling why.
- **What's cut:** No web UI, no auto-git, no profile content generation, no npm publish. Clean boundaries.
- **References that shaped the doc:** Repo README (profile matrix, curated tools list), CLI package.json (commands, scripts), index.js (full command router and pipeline).
- **Deepening rounds:** 0 — learner requested direct doc generation from existing repo context. Had clear vision, no ambiguity to resolve.
- **Active shaping:** Learner drove direction fully — specified the format, level of detail, and asked for a submission-quality doc rather than conversational exploration. Efficient and decisive.

## /iterate

- **Entry state:** All 7 checklist items complete including Devpost submission. Full build done.
- **Iteration started:** 2026-04-28
- **Working style shift:** Learner is now in free-form mode — no structured interview, direct collaboration.
- *(Details to be filled as the iteration unfolds.)*
