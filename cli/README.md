# profile-cli

> Zero-dependency Node.js CLI that automates the full lifecycle of **Agent Environment Profiles** — validate, publish, and keep all documentation in sync across a matrix of AI coding agents, operating systems, and tech stacks.

---

## What It Does

Managing profiles for **8 coding agents × 3 operating systems × multiple stacks** produces hundreds of markdown files and a README table that goes stale the moment anyone adds a new agent.

`profile-cli` automates the full profile lifecycle in a single pipeline:

| Step | Command | What happens |
|---|---|---|
| Validate | `validate` | Pre-publish gate — checks every source profile for required files, mandatory keywords, OS-specific content, relative link resolution, and empty files. Nothing moves forward until all checks pass. |
| Publish | `publish` | Copies profiles to the public `profiles/` directory. Blocked if validate has not passed in the current session. |
| Sync README | `update-readme` | Inserts or replaces the stack column in the main README.md profile table. Reflects what is actually published. |
| Sync nav | `update-nav` | Adds or updates the shields.io badge in `navigation.md`. |
| Full pipeline | `all` | Runs all four steps in sequence: validate → publish → update-readme → update-nav. Stops on first failure. |

Agent detection is filesystem-driven — no hardcoded list. The CLI scans the source directories and picks up any agent present in **all** OS variants. Add a new agent folder and every command picks it up automatically.

---

## How We Built It

Built with **Node.js >=18** and zero external dependencies — no npm install required beyond registering the bin alias.

The architecture is a thin command router (`src/index.js`) that delegates to focused modules:

```
cli/
├── bin/
│   └── profile-cli.js      # shebang entry point
└── src/
    ├── index.js             # argument parsing + command router + pipeline
    ├── config.js            # stack definitions + agent auto-detection
    ├── publish.js           # file copy with content-diff skip logic + session gate
    ├── validate.js          # rule-based content validation (pre-publish, read-only)
    ├── update-readme.js     # README table column management
    ├── update-nav.js        # navigation.md badge management
    ├── status.js            # publish status display
    └── utils.js             # colour-coded log helpers
```

Stack definitions in `config.js` drive every other module. Each stack declares its source path, target path, OS variants, expected files, validation rules (including OS-specific keyword checks), and README/nav metadata. Everything else derives from that config — so adding a new stack is a single object.

The project was spec-driven: scope, PRD, and technical spec were written before a single line of code. Those docs live in `docs/` and were the direct input to implementation.

---

## Challenges We Ran Into

- **Validate as a hard pre-publish gate** — the spec required that publish is unconditionally blocked if validate has not passed in the current session. This meant tracking session state (`validatePassedThisSession`) as a module-level boolean in `index.js`, reset on every new shell invocation. The tradeoff is documented: users who open a new terminal must re-run validate before publish.
- **Agent detection without a hardcoded list** — agents needed to be discovered dynamically so contributors don't have to touch CLI code to add a new agent. The solution scans all OS variant directories and takes the intersection — only agents present in *all* OS dirs are considered complete and ready to process.
- **OS-specific validation** — the same profile file needs different mandatory content depending on whether it targets Ubuntu, macOS, or Windows. The `mustContainByOS` rule map in `config.js` handles this without branching in the validation logic itself.
- **Idempotent documentation updates** — `update-readme` and `update-nav` have to be safe to run repeatedly without duplicating columns or badges. Both commands scan for existing markers before inserting, and update in place when the entry already exists.
- **Content comparison for publish skip logic** — using file modification time to detect unchanged files is unreliable because git checkout resets timestamps. Content string comparison (`srcContent === destContent`) is used instead, making the publish step genuinely idempotent.

---

## Accomplishments

- Validate acts as a real gate — nothing reaches the public directory without passing content checks. Missing files, wrong OS keywords, broken relative links, and empty files are all caught before publish runs.
- The full pipeline (`all`) chains validate → publish → readme sync → nav sync in one command. What was previously a sequence of manual copy-paste steps and table edits is now a single invocation.
- `status` gives an instant read across all stacks, agents, and OS variants: published, unpublished, or out of sync — with actionable hints for anything not yet live.
- Zero dependencies. Works anywhere Node.js >=18 is installed. No setup beyond `npm link`.
- Writing scope, PRD, and spec before touching code forced every ambiguous decision to be resolved on paper first — particularly the pipeline order and what validate should block vs. warn about.

---

## What We Learned

Spec-driven development forces clarity before complexity. Writing a PRD and technical spec before touching code revealed assumptions we didn't know we were making — particularly around pipeline ordering and what "validate" should block versus warn about. The open questions section of the PRD made those decisions explicit before any implementation started.

Dynamic agent detection from the filesystem was the right call from day one. Any approach that required editing a config list every time a contributor added a new agent would have become a maintenance burden immediately.

Content-based file comparison is the correct default for any CLI that operates on files that pass through git. Mtime is unreliable and produces confusing behaviour that's hard to debug.

Keeping validate strictly read-only (it never modifies any file) made it safe to run at any point — as a pre-publish check, as a standalone audit, or as a CI step — without side effects.

---

## What's Next

- **More stack support** — Python/Django, Ruby on Rails, Go are natural next targets given the existing agent × OS matrix
- **`--dry-run` flag** — preview what publish and the full pipeline would change without touching the filesystem
- **`diff` command** — show a human-readable diff between source profile and published profile before deciding to publish
- **Interactive prompts** — guided `init` flow for contributors creating a new agent's profiles from scratch, with templating and immediate validation feedback
- **GitHub Issues integration** — auto-create issues from validation failures so missing or broken profiles become tracked work items
- **npm publish** — make `profile-cli` installable globally without cloning the repo

---

## Requirements

- Node.js >= 18.0.0
- No other dependencies

---

## Installation

```bash
cd cli
npm install   # registers the bin alias — nothing to download
npm link      # makes `profile-cli` available globally
```

Or run directly without linking:

```bash
node bin/profile-cli.js <command> [stack] [--agent <name>]
```

---

## Commands

```
profile-cli <command> [stack] [--agent <name>]
```

| Command | Stack required | Description |
|---|---|---|
| `validate` | yes | Pre-publish content gate — checks profiles for correctness. Must pass before publish runs. |
| `publish` | yes | Copy profiles to `profiles/`. Blocked if validate has not passed this session. |
| `update-readme` | yes | Add/update stack column in README.md table |
| `update-nav` | yes | Add/update profile badge in navigation.md |
| `all` | yes | Full pipeline: validate → publish → update-readme → update-nav |
| `status` | no | Show publish status across all stacks and agents |
| `list` | no | List available stacks with detected agents |
| `help` | no | Show usage information |

`--agent <name>` limits any command to a single agent (e.g. `--agent cline`).

**Exit codes:** `0` success · `1` validation or operation failure · `2` invalid arguments

---

## Available Stacks

| Stack ID | Description |
|---|---|
| `nodejs-react` | Node.js + React / Next.js |
| `php-laravel` | PHP + Laravel / WordPress |

---

## Usage Examples

```bash
# See what is and isn't published yet
profile-cli status

# Full pipeline for a stack (validate → publish → update docs)
profile-cli all nodejs-react
profile-cli all php-laravel

# Full pipeline for both stacks
npm run publish-all

# Validate all agents for a stack before publishing
profile-cli validate nodejs-react

# Validate a single agent only
profile-cli validate nodejs-react --agent cline

# Publish after validation passes
profile-cli publish nodejs-react

# Publish a single agent only
profile-cli publish nodejs-react --agent cline

# Update README table after a manual profile change
profile-cli update-readme nodejs-react

# Update navigation badges
profile-cli update-nav nodejs-react

# List stacks and auto-detected agents
profile-cli list
```

---

## npm Scripts

```bash
npm run publish:nodejs    # profile-cli publish nodejs-react
npm run publish:php       # profile-cli publish php-laravel
npm run validate:nodejs   # profile-cli validate nodejs-react
npm run validate:php      # profile-cli validate php-laravel
npm run publish-all       # all nodejs-react && all php-laravel
npm run status            # profile-cli status
```

---

## Validation Rules

Each stack defines per-file rules applied during `validate`. Validate is always **read-only** — it never modifies any file.

| Rule | What it checks |
|---|---|
| File existence | Every file in `expectedFiles` must be present |
| `mustContain` | Required keywords must appear (case-insensitive) |
| `mustContainByOS` | OS-specific keywords: Ubuntu → `bash`, macOS → `brew`, Windows → `PowerShell` |
| Link resolution | Relative `[text](./file.md)` links must point to files that exist |
| Empty file | Files with no content are rejected |

Validate runs to completion and reports **every failure** before exiting — not just the first one. Each error names the full profile path, the file, and the specific problem. In the `all` pipeline, if validate fails the pipeline stops immediately — publish, update-readme, and update-nav do not run.

---

## Pipeline Behaviour

The `all` command runs four steps in strict order:

```
[validate]  → checks all profiles — stops pipeline on any failure
[publish]   → copies profiles to profiles/ — skips identical files
[readme]    → updates README.md profile table to reflect published state
[nav]       → updates navigation.md badges
```

Each step is prefixed in output (`[validate]`, `[publish]`, `[readme]`, `[nav]`). A final summary always prints regardless of outcome. Publish and the doc sync steps only run if validate passes — invalid profiles never reach the public directory.

---

## License

MIT