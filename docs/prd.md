# ProfileForge CLI — Product Requirements

## Problem Statement

Maintainers and contributors of `coding-agent-mcp-tools` manage an expanding matrix of Agent Environment Profiles — each combination of coding agent (Claude, Codex, Cursor, Windsor, OpenCode, Cline, Roo Code, Kilo Code), OS variant (Ubuntu, Windows, Mac), and stack (nodejs-react, php-laravel) is a discrete profile file. As this matrix grows, the manual workflow of copying files, updating the README table, and editing navigation docs becomes error-prone and unsustainable. A single missed update silently breaks the published state of the repo for every downstream user.

---

## User Stories

### Epic: Profile Validation

- As a **maintainer**, I want to validate a profile before publishing it so that I catch formatting issues before they reach the public directory.
  - [ ] Running `validate nodejs-react` checks all profiles under that stack — every agent and every OS variant
  - [ ] Running `validate nodejs-react --agent claude` checks all OS variants for the Claude agent under that stack (ubuntu, windows, mac)
  - [ ] The tool discovers profiles by traversing `base-profiles/` directory — no hardcoded list; adding a new profile file is picked up automatically
  - [ ] Each missing section (e.g., MCP configuration, environment config, setup scripts) is reported with the section name
  - [ ] Indentation errors are reported with the line number where the issue occurs
  - [ ] A profile that passes all checks prints a green success message per profile checked
  - [ ] A profile that fails prints a specific, actionable error — not a generic "invalid" message
  - [ ] Validation never modifies any file — it is always read-only
  - [ ] Validation failure blocks any further action — nothing moves forward until all checked profiles pass

- As a **contributor**, I want validation to tell me exactly what is wrong so that I can fix it without guessing.
  - [ ] Each error message names the full profile path (`base-profiles/nodejs-react/claude/ubuntu/agent-environment-profiles.md`), the section, and the specific problem
  - [ ] Multiple errors in one profile are all reported together — not just the first one
  - [ ] If a base profile is an empty file, validation reports "Empty profile — no content to validate" and exits with code 1

- As a **maintainer**, I want validation to fail loudly if the stack or agent name doesn't exist so that I catch typos immediately.
  - [ ] Running `validate unknown-stack` prints: `Unknown stack: "unknown-stack". Valid stacks: nodejs-react, php-laravel`
  - [ ] Running `validate nodejs-react --agent unknown` prints: `Unknown agent: "unknown". Known agents: claude, codex, cursor, ...`
  - [ ] Exit code is 1 for validation failures, 2 for invalid arguments

---

### Epic: Profile Publishing

- As a **maintainer**, I want to publish profiles from base-profiles to the public profiles directory so that the live repo stays in sync with the source of truth.
  - [ ] Running `publish nodejs-react` copies all profiles under that stack — every agent and every OS variant — to `profiles/`, preserving the full stack → agent → OS directory structure
  - [ ] Running `publish nodejs-react --agent claude` copies all OS variants for Claude under that stack
  - [ ] Published path mirrors source path: `base-profiles/nodejs-react/claude/ubuntu/agent-environment-profiles.md` → `profiles/nodejs-react/claude/ubuntu/agent-environment-profiles.md`
  - [ ] The tool discovers profiles to publish by traversing `base-profiles/` — no hardcoded list
  - [ ] If `profiles/` or any subdirectory in the path does not exist, the tool creates it before copying
  - [ ] If a profile already exists in `profiles/`, it is overwritten without prompting
  - [ ] Each successfully published profile prints a confirmation line with the full path: `✓ Published: profiles/nodejs-react/claude/ubuntu/agent-environment-profiles.md`

- As a **maintainer**, I want publish to stop and warn me if the source profile doesn't exist so that I don't publish a blank or missing file.
  - [ ] If the source file is missing, print: `Source not found: base-profiles/nodejs-react/claude/ubuntu/agent-environment-profiles.md`
  - [ ] Exit with code 1 — do not partially publish and silently continue

- As a **maintainer**, I want publish to block if a profile hasn't passed validation so that invalid profiles never reach the public directory.
  - [ ] If `validate` has not been run and passed in the current session, print: `✗ Profiles not validated. Run validate first.` and exit with code 1
  - [ ] Publish never proceeds on unvalidated profiles — this is a hard block, not a warning

---

### Epic: README Management

- As a **maintainer**, I want the README profile matrix table to stay accurate automatically so that contributors always see the correct publish status.
  - [ ] Running `update-readme nodejs-react` updates the README.md table rows for all nodejs-react profiles across all agents and OS variants
  - [ ] The tool discovers which profiles exist by traversing `profiles/` — no hardcoded list
  - [ ] The table update reflects the current state of `profiles/` — what's there, not what's in base-profiles
  - [ ] If a profile row already exists in the table, it is updated in place — no duplicate rows
  - [ ] If a profile row doesn't exist, it is appended to the correct section of the table
  - [ ] After update, print: `✓ README updated: X profiles synced`

- As a **maintainer**, I want update-readme to fail clearly if README.md is missing or unwritable.
  - [ ] If `README.md` does not exist: `README.md not found in repo root`
  - [ ] If `README.md` is not writable: `Cannot write to README.md — check file permissions`
  - [ ] Exit code 1 in both cases — no partial writes

---

### Epic: Navigation Management

- As a **maintainer**, I want `navigation.md` to stay in sync with published profiles so that users can find the correct profile links.
  - [ ] Running `update-nav nodejs-react` adds or updates navigation entries for all nodejs-react profiles across all agents and OS variants
  - [ ] The tool discovers entries to sync by traversing `profiles/` — no hardcoded list
  - [ ] Existing entries are updated in place — not duplicated
  - [ ] New entries are inserted in the correct section based on stack → agent → OS hierarchy
  - [ ] After update, print: `✓ navigation.md updated: X entries synced`

- As a **maintainer**, I want update-nav to fail clearly if navigation.md is missing.
  - [ ] If `navigation.md` does not exist: `navigation.md not found — create it first`
  - [ ] Exit code 1

---

### Epic: Full Pipeline

- As a **maintainer**, I want to run the full pipeline in one command so that I don't have to chain commands manually.
  - [ ] Running `all nodejs-react` executes: validate → publish → update-readme → update-nav, in that order
  - [ ] Running `all nodejs-react --agent claude` scopes the entire pipeline to that agent only
  - [ ] If `validate` fails, the pipeline stops immediately — readme, nav, and publish do not run
  - [ ] If any step after validate fails, the pipeline stops at that step with a clear error stating which step failed and why
  - [ ] On full success, print a pipeline summary: each step with a ✓ and what was done
  - [ ] On partial failure, print which steps completed (✓) and which step failed (✗) with the reason

- As a **maintainer**, I want the pipeline output to be readable at a glance so that I can confirm everything went correctly without reading wall-of-text logs.
  - [ ] Each step's output is prefixed with its step name: `[validate]`, `[readme]`, `[nav]`, `[publish]`
  - [ ] Success lines are green, warnings are yellow, errors are red
  - [ ] A final summary line always appears at the end, regardless of success or failure

---

### Epic: Status Visibility

- As a **maintainer**, I want to see the publish status of all profiles at a glance so that I know what's live and what's pending.
  - [ ] Running `status` lists every profile discovered in `base-profiles/` by traversing the full stack → agent → OS hierarchy — no hardcoded list
  - [ ] Output is grouped by stack, then agent, then OS variant
  - [ ] Each profile shows one of three states: `published`, `unpublished`, `out of sync` (base-profile is newer than published version)
  - [ ] Published profiles show the full path to the published file
  - [ ] Unpublished profiles show the base-profile path and a hint: `Run: profile-cli publish <stack> --agent <name>`
  - [ ] If base-profiles is empty, print: `No profiles found in base-profiles/`

---

## What We're Building

Everything below must be complete and working at the end of the build:

**`validate <stack> [--agent <name>]`**
- Traverses `base-profiles/` to discover all matching profiles — no hardcoded list
- Resolves full stack → agent → OS path hierarchy
- Checks for: required sections present, no indentation errors, no empty files
- Reports all errors per file, not just the first
- Failure blocks any further action — nothing proceeds on a failed validate
- Exit 0 on full pass, exit 1 on any failure, exit 2 on invalid arguments
- Never modifies any file

**`publish <stack> [--agent <name>]`**
- Blocks with exit 1 if validate has not passed in the current session
- Traverses `base-profiles/` to discover profiles — no hardcoded list
- Copies to `profiles/` preserving full stack → agent → OS directory structure
- Creates missing directories before copying
- Overwrites existing published profiles silently
- Exit 0 on success, exit 1 on blocked or missing source

**`update-readme <stack>`**
- Traverses `profiles/` to discover what's published — no hardcoded list
- Updates README.md profile matrix table for the given stack
- Updates existing rows in place, appends new rows
- Exit 0 on success, exit 1 on missing/unwritable README

**`update-nav <stack>`**
- Traverses `profiles/` to discover what's published — no hardcoded list
- Updates navigation.md entries for the given stack
- Updates in place, no duplicates
- Exit 0 on success, exit 1 on missing navigation.md

**`all <stack> [--agent <name>]`**
- Runs validate → publish → update-readme → update-nav in sequence
- Stops on first failure
- Prefixed, color-coded output per step
- Final summary line always printed

**`status`**
- Traverses `base-profiles/` to discover all profiles — no hardcoded list
- Groups output by stack → agent → OS
- Shows published / unpublished / out of sync per profile
- Actionable hints for unpublished profiles

**Console output across all commands:**
- Color-coded: green (✓ success), yellow (⚠ warning), red (✗ error)
- Actionable next-step suggestion after each run
- Clean, no-noise output — only what the user needs to act on

---

## What We'd Add With More Time

- **`diff <stack> [--agent <name>]`** — show a human-readable diff between base-profile and published profile before deciding to publish
- **`--dry-run` flag** on `all` and `publish` — preview what would change without touching the filesystem
- **Profile format versioning** — detect when a base-profile uses a deprecated section structure and suggest migration
- **Interactive mode** — step-by-step prompts for first-time contributors who don't know the stack/agent names
- **npm distribution** — `npx profile-cli` without cloning the repo

---

## Non-Goals

- **No web UI or dashboard.** This is CLI-only. The target user is a developer in a terminal.
- **No automated git commits or pushes.** The CLI publishes and validates. The human reviews and commits. The tool never touches git.
- **No profile content authoring.** The CLI manages existing profiles. It does not generate profile content from scratch.
- **No npm package publishing.** The tool runs locally from within the repo. Distribution is out of scope.
- **No real-time file watching.** The CLI is invoked manually per operation — it is not a daemon or watcher process.

---

## Open Questions

| Question | Needs answering before | Notes |
|---|---|---|
| What exactly constitutes a "required section" in a valid profile? | `/spec` | The validate command needs a concrete list of section names to check against. Pull from existing base-profiles structure. |
| How is "out of sync" determined in `status`? | `/spec` | File modification timestamp comparison, or content hash? Timestamp is simpler but fragile on git checkout. |
| What is the exact README table format being updated? | `/spec` | The updater needs to know the column order, delimiter style, and where the table begins/ends in README.md. |
| ~~Should `all` run `update-readme` and `update-nav` before or after `publish`?~~ | ~~`/spec`~~ | **Resolved:** Order is validate → publish → update-readme → update-nav. README and nav reflect published state, so they must run after publish. |
