# Profile Publisher CLI — Scope

## Idea

A Node.js CLI tool that automates the publishing, validation, and management of Agent Environment Profiles for the [coding-agent-mcp-tools](https://github.com/hi0001234d/coding-agent-mcp-tools) repository — turning a manual, error-prone profile setup process into a single-command pipeline.

## Who It's For

- **Maintainers** who need to publish new Agent Environment Profiles (combinations of coding agents, MCP tools, and OS-specific configurations) without manually copying files, updating the README table, and editing navigation docs.
- **Contributors** who are adding new agent or OS support can use this tool to validate and integrate their additions cleanly into the existing profile structure.

## Inspiration & References

The core repo curates coding agents and MCP tools that help developers debug, understand, and maintain large codebases. As the number of supported agents (Claude, Codex, Cursor, Windsor, OpenCode, Cline, Roo Code, Kilo Code) and OS variants (Ubuntu, Windows, Mac) grows, manually managing profile files across every combination becomes unsustainable. The CLI was born from this scaling need.

- Repository: https://github.com/hi0001234d/coding-agent-mcp-tools
- Profile format: each profile is an `agent-environment-profiles.md` file containing MCP configuration, optional Docker setup, environment config, and setup scripts
- Profile matrix: agents x OS variants x stacks (currently `nodejs-react` and `php-laravel`)

## Goals

- Automate the full profile lifecycle: **Validate** profile content against a standard format — catching syntax errors, indentation issues, missing sections, and readability problems that human contributors introduce manually. If a base profile doesn't meet the standard structure, the tool surfaces a warning before anything moves forward.
- **Update README, update navigation, and publish** profiles from base-profiles to the public directory — keeping the profile matrix table and navigation guide in sync automatically.
- Auto-detect new profile from the base-profiles folder — no config changes needed when a new profile is added.
- Demonstrate spec-driven development as the build methodology, with full planning docs (scope, PRD, specification, checklist) as part of the submission.

## What "Done" Looks Like

A working CLI (`profile-cli`) with these commands fully operational:

- `validate <stack> [--agent <name>]` — checks profile content against the standard format; catches syntax errors, indentation issues, missing sections, and warns if base profile content doesn't meet the expected structure
- `update-readme <stack>` — updates the README.md profile table
- `update-nav <stack>` — updates `navigation.md` with profile entries
- `publish <stack> [--agent <name>]` — copies profiles from base-profiles to public `profiles/` directory
- `all <stack> [--agent <name>]` — runs the full pipeline (validate → readme → nav → publish)
- `status` — shows publish status across all stacks and agents

Clean console output with color-coded feedback, error handling, and actionable next-step suggestions after each pipeline run.

## What's Explicitly Cut

- **No web UI or dashboard** — this is a CLI-only tool. Keeping it terminal-native matches the developer audience.
- **No automated git commits or pushes** — the CLI publishes and validates, but the human reviews and commits. Safety first.
- **No profile content authoring** — the CLI manages existing profiles; it does not generate new profile content from scratch.
- **No package registry publishing (npm)** — the tool runs locally from the repo. Distribution is out of scope for the hackathon.

## Loose Implementation Notes

- **Runtime:** Node.js (>=18.0.0), zero external dependencies — uses only Node built-ins (`fs`, `path`).
- **Architecture:** Command router (`index.js`) dispatches to handler modules (`publish.js`, `validate.js`, `update-readme.js`, `update-nav.js`, `status.js`), with shared config (`config.js`) and utilities (`utils.js`).
- **Profile structure:** Profiles are organized stack-first — each stack (`nodejs-react`, `php-laravel`) is the top-level unit, with agents and OS variants nested within. The CLI resolves profiles by traversing this stack → agent → OS hierarchy.
- **Stack config:** Each stack defines its name, expected files, OS variants, README column key, and key tool decisions.
- **Already in progress:** Initial groundwork for the CLI exists in `cli/` and was started before the hackathon. The hackathon is the opportunity to follow a proper spec-driven process end-to-end: scope, PRD, specification, checklist, and then a clean build.