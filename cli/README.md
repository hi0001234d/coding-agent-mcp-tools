# ProfileForge CLI — Command Guide

## Prerequisites

- Node.js >= 18.0.0
- Run every command from the **repo root**: `coding-agent-mcp-tools/`

---

## How the pipeline works

```
coding-agent-mcp-tools-submodule/   ← hand-crafted source files (private)
        │
        │  sync-cli  (renames system-setup.md → macos-setup.md / windows-setup.md
        │             + rewrites content links per OS)
        ▼
base-profiles/<stack>/<os>/<agent>/   ← sync output — do NOT edit manually
        │
        │  generate / publish
        ▼
profiles/<stack>/<os>/<agent>/        ← public output committed to this repo
        │
        │  update-readme / update-nav
        ▼
README.md  navigation.md              ← docs updated automatically
```

**Rule:** Never edit `base-profiles/` by hand. It is owned by sync-cli. Edit the submodule, run sync-cli, then run the main CLI.

---

## Invoke

```bash
node cli/bin/profile-cli.js <command> [stack] [--agent <name>]
```

**Global install (run once from inside `cli/`):**
```bash
cd cli && npm link && cd ..
# then use `profile-cli` instead of `node cli/bin/profile-cli.js`
```

---

## Stacks

| Key | Name |
|---|---|
| `nodejs-react` | Node.js + React/Next.js |
| `php-laravel` | PHP + Laravel/WP |

## Agents (auto-detected from `base-profiles/`)

Agents are not configured — the CLI scans `base-profiles/<stack>/<os>/` at runtime.
An agent is only detected when its folder exists in **all three** OS variants (ubuntu, mac, windows).

| Key | Display name |
|---|---|
| `kilocode` | Kilo Code |
| `cline` | Cline |
| `roo` | Roo Code |
| `claude` | Claude |
| `cursor` | Cursor |
| `codex` | Codex |
| `opencode` | OpenCode |
| `windsor` | Windsor |

## OS variants

Every command that touches files always processes all three OS variants together.
There is no flag to target a single OS.

| OS | Setup file | Shell |
|---|---|---|
| `ubuntu` | `system-setup.md` | bash, apt |
| `mac` | `macos-setup.md` | Homebrew, zsh |
| `windows` | `windows-setup.md` | PowerShell, winget |

---

## Commands

### `generate` — copy base-profiles → profiles/ (no validation gate)

Reads hand-crafted files from `base-profiles/<stack>/<os>/<agent>/` and copies them to `profiles/<stack>/<os>/<agent>/`. Skips files whose content is already identical to the destination. Does **not** run validation before copying.

One agent on one stack = **27 files** (9 files × 3 OS variants).

```bash
# One agent, one stack
node cli/bin/profile-cli.js generate nodejs-react --agent kilocode
node cli/bin/profile-cli.js generate php-laravel  --agent kilocode

# All detected agents in a stack (no --agent flag)
node cli/bin/profile-cli.js generate nodejs-react
```

**Exit codes:** `0` = success, `1` = one or more files missing in source, `2` = unknown stack or agent.

**When to use:** Quick copy when you know the source files are correct. Use `all` instead when you want the validation gate.

---

### `validate` — check base-profiles content

Reads every file in `base-profiles/<stack>/<os>/<agent>/` and checks:
- File exists and is not empty
- Required keywords are present per file (e.g. `bash`, `mcp.json` in ubuntu setup)
- OS-specific keywords fire only for the correct OS variant
- Relative links (e.g. `./docker-setup.md`) resolve to a file that actually exists

Validate is **strictly read-only** — it never modifies any file.

```bash
# One agent
node cli/bin/profile-cli.js validate nodejs-react --agent kilocode
node cli/bin/profile-cli.js validate php-laravel  --agent kilocode

# All detected agents
node cli/bin/profile-cli.js validate nodejs-react
node cli/bin/profile-cli.js validate php-laravel
```

**Exit codes:** `0` = all checks passed, `1` = one or more files failed, `2` = unknown stack or agent.

**Output:** Prints `PASS` or `FAIL` per file with a reason. Summary line: `N total, N passed, N failed`.

---

### `publish` — validate then copy base-profiles → profiles/

Runs validation internally first. If validation fails, it exits immediately without copying anything. If validation passes, copies from `base-profiles/<stack>/<os>/<agent>/` to `profiles/<stack>/<os>/<agent>/`. Skips files with identical content.

```bash
# One agent
node cli/bin/profile-cli.js publish nodejs-react --agent kilocode
node cli/bin/profile-cli.js publish php-laravel  --agent kilocode

# All detected agents
node cli/bin/profile-cli.js publish nodejs-react
```

**Exit codes:** `0` = validation passed and files copied, `1` = validation failed or copy error, `2` = unknown stack or agent.

**Difference from `generate`:** `publish` validates before copying; `generate` copies unconditionally.

---

### `all` — full pipeline: validate → publish → update-readme → update-nav

Runs all four steps in sequence. Stops at the first failure and exits `1`. Does **not** include `generate` — run `generate` (or sync-cli) before `all`.

```bash
# One agent
node cli/bin/profile-cli.js all nodejs-react --agent kilocode
node cli/bin/profile-cli.js all php-laravel  --agent kilocode

# All detected agents
node cli/bin/profile-cli.js all nodejs-react
node cli/bin/profile-cli.js all php-laravel
```

**Exit codes:** `0` = all four steps succeeded, `1` = a step failed, `2` = unknown stack or agent.

**Order of steps:**
```
Step 1/4 — validate   (reads base-profiles/)
Step 2/4 — publish    (copies base-profiles/ → profiles/)
Step 3/4 — update-readme
Step 4/4 — update-nav
```

---

### `update-readme` — update the profile table in README.md

Adds or updates the column for the given stack in the README profile matrix. Reads from `profiles/` to determine which agents are published. Does not accept `--agent`.

```bash
node cli/bin/profile-cli.js update-readme nodejs-react
node cli/bin/profile-cli.js update-readme php-laravel
```

**Exit codes:** `0` = updated (or already up to date), `1` = README.md missing or table marker absent, `2` = unknown stack.

---

### `update-nav` — update navigation.md entries

Adds or updates the badge entry for the given stack in navigation.md. Idempotent — does nothing if the entry already exists. Does not accept `--agent`.

```bash
node cli/bin/profile-cli.js update-nav nodejs-react
node cli/bin/profile-cli.js update-nav php-laravel
```

**Exit codes:** `0` = updated or already present, `1` = navigation.md missing, `2` = unknown stack.

---

### `status` — show publish state of all stacks and agents

Shows what is published vs unpublished for every detected agent across every stack and OS. Takes no arguments.

```bash
node cli/bin/profile-cli.js status
```

**Status icons:**

| Icon | Meaning |
|---|---|
| `TODO` | No files published for this OS |
| `PART` | Some files published, not all 9 |
| `DONE` | All 9 files published, content matches source |
| `SYNC` | All 9 files exist but content differs from source — run `all` again |

---

### `list` — show detected agents and tool slots per stack

Prints which agents the CLI currently detects from `base-profiles/` and the MCP tool slots configured per stack.

```bash
node cli/bin/profile-cli.js list
```

---

## `--agent` flag reference

| Command | Accepts `--agent` | Without `--agent` |
|---|---|---|
| `generate` | Yes | Processes all auto-detected agents |
| `validate` | Yes | Processes all auto-detected agents |
| `publish` | Yes | Processes all auto-detected agents |
| `all` | Yes | Processes all auto-detected agents |
| `update-readme` | No | Always processes the whole stack |
| `update-nav` | No | Always processes the whole stack |
| `status` | No | Always shows everything |
| `list` | No | Always shows everything |

---

## Workflows

### Standard: publish new or updated profiles

Use this whenever you want the validation gate before profiles go public.

```bash
# 1. Run the full safe pipeline
node cli/bin/profile-cli.js all nodejs-react --agent kilocode

# 2. Confirm published state
node cli/bin/profile-cli.js status

# 3. Commit
git add profiles/ README.md navigation.md
git commit -m "publish nodejs-react profiles (kilocode)"
```

---

### After editing submodule source files

The submodule holds the hand-crafted source. After you change files there:

```bash
# 1. Sync submodule → base-profiles (handles OS-specific renames + content links)
cd ../coding-agent-mcp-tools-submodule
node sync-cli/bin/sync.js sync

cd ../coding-agent-mcp-tools

# 2. Publish (validate → copy → update README + nav)
node cli/bin/profile-cli.js all nodejs-react --agent kilocode

# 3. Commit
git add profiles/ README.md navigation.md
git commit -m "update nodejs-react profiles (kilocode)"
```

---

### Quick copy without validation (generate)

Use `generate` only when you are certain the source files are correct — for example, immediately after a sync-cli run that you have already verified.

```bash
node cli/bin/profile-cli.js generate nodejs-react --agent kilocode
node cli/bin/profile-cli.js generate php-laravel  --agent kilocode
```

`generate` does not update README.md or navigation.md. Run `update-readme` and `update-nav` separately if needed, or just use `all` instead.

---

### Publish both stacks for one agent

```bash
node cli/bin/profile-cli.js all nodejs-react --agent kilocode
node cli/bin/profile-cli.js all php-laravel  --agent kilocode

git add profiles/ README.md navigation.md
git commit -m "publish nodejs-react + php-laravel profiles (kilocode)"
```

---

### Publish all detected agents in a stack

```bash
node cli/bin/profile-cli.js all nodejs-react

git add profiles/ README.md navigation.md
git commit -m "publish nodejs-react profiles (all agents)"
```

---

### Check what is out of sync before committing

```bash
node cli/bin/profile-cli.js status
```

If any OS shows `SYNC`, the published files differ from base-profiles. Re-run `all` for that stack/agent to bring them back in sync.

---

## Files read and written per command

| Command | Reads from | Writes to |
|---|---|---|
| `generate` | `base-profiles/<stack>/<os>/<agent>/` | `profiles/<stack>/<os>/<agent>/` |
| `validate` | `base-profiles/<stack>/<os>/<agent>/` | nothing |
| `publish` | `base-profiles/<stack>/<os>/<agent>/` | `profiles/<stack>/<os>/<agent>/` |
| `all` | `base-profiles/` + `profiles/` | `profiles/` + `README.md` + `navigation.md` |
| `update-readme` | `profiles/<stack>/` | `README.md` |
| `update-nav` | `profiles/<stack>/` | `navigation.md` |
| `status` | `base-profiles/` + `profiles/` | nothing |
| `list` | `base-profiles/` | nothing |

---

## Running the test suite

```bash
cd cli
npm install          # first time only

# All tests (sequential — required because e2e and generate tests share the filesystem)
./node_modules/.bin/jest --runInBand --verbose

# One suite only
./node_modules/.bin/jest tests/generate.test.js --verbose
./node_modules/.bin/jest tests/e2e.test.js --runInBand --verbose
./node_modules/.bin/jest tests/validate.test.js --verbose
```