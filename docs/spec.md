# ProfileForge CLI — Technical Spec

## Stack

- **Runtime:** Node.js >= 18.0.0
- **Language:** JavaScript (CommonJS modules — `require`/`module.exports`)
- **Dependencies:** Zero external packages. Only Node built-ins: `fs`, `path`, `process`
- **Entry point:** `cli/bin/profile-cli.js` → delegates to `cli/src/index.js`
- **Node.js docs:** https://nodejs.org/en/docs (v18 LTS)
- **`fs` module:** https://nodejs.org/api/fs.html
- **`path` module:** https://nodejs.org/api/path.html

Rationale: Zero-dependency constraint keeps the tool portable and avoids version drift. Every target machine that runs Node >= 18 can run this tool without `npm install`.

---

## Runtime & Deployment

- **Runs:** Local CLI, invoked from the repo root via `node cli/bin/profile-cli.js` or `npm run` scripts
- **No server, no deployment, no network calls** — pure filesystem operations
- **Installation:** `npm link` inside `cli/` for global `profile-cli` command, or use `npm run` scripts from `package.json`
- **Environment requirements:** Node >= 18.0.0, access to `base-profiles/` and write access to `profiles/`, `README.md`, `navigation.md`

---

## Architecture Overview

```
User Terminal
     │
     ▼
bin/profile-cli.js          ← shebang entry, passes process.argv to index.js
     │
     ▼
src/index.js                ← parses args, routes to command handlers
     │
     ├── generate()         ← reads instructions.yaml, writes 9 files × 3 OS to base-profiles/
     ├── validate()         ← reads base-profiles/, checks content
     ├── publish()          ← copies base-profiles/ → profiles/
     ├── updateReadme()     ← updates README.md profile table
     ├── updateNav()        ← updates navigation.md entries
     ├── status()           ← compares base-profiles/ vs profiles/
     └── runAll()           ← orchestrates: validate → publish → readme → nav
           │
           ▼
     src/config.js          ← STACKS config, detectAgents(), path constants
     src/utils.js           ← logging, COLORS (shared by all handlers)
```

**Filesystem layout this tool operates on:**

```
coding-agent-mcp-tools/          ← REPO_ROOT
├── base-profiles/               ← written by generate, read by validate/publish/status
│   ├── nodejs-react/
│   │   ├── instructions.yaml   ← stack definition; source of truth for generate
│   │   ├── ubuntu/
│   │   │   └── <agent>/
│   │   │       └── (9 .md section files)
│   │   ├── mac/
│   │   │   └── <agent>/
│   │   │       └── (9 .md section files)
│   │   └── windows/
│   │       └── <agent>/
│   │           └── (9 .md section files)
│   └── php-laravel/
│       ├── instructions.yaml
│       └── <os>/
│           └── <agent>/
│               └── (9 .md section files)
├── profiles/                    ← target (written by publish, mirrors base-profiles/ structure)
│   └── <stack>/<os>/<agent>/(9 .md section files)
├── README.md                    ← updated by update-readme
└── navigation.md                ← updated by update-nav
```

**Profile path pattern:** `<root>/base-profiles/<stack>/<os>/<agent>/<section>.md`
**Published path pattern:** `<root>/profiles/<stack>/<os>/<agent>/<section>.md`

Hierarchy is: **stack → OS → agent**. Every path in the codebase follows this order.

---

## Component: bin/profile-cli.js

Entry point only — no logic here.

```js
#!/usr/bin/env node
const { run } = require('../src/index');
run(process.argv.slice(2));
```

Implements: shebang for direct execution, delegates all logic to `src/index.js`.

---

## Component: src/index.js

Command router and pipeline orchestrator.
PRD ref: all epics — this is the top-level entry for every command.

### parseArgs(args)

Input: `string[]` (raw CLI args after slicing `process.argv.slice(2)`)
Output: `{ command: string, stack: string|null, agent: string|null }`

```
args = ['publish', 'nodejs-react', '--agent', 'claude']
→ { command: 'publish', stack: 'nodejs-react', agent: 'claude' }

args = ['status']
→ { command: 'status', stack: null, agent: null }
```

### getStack(stackName)

Input: `string|null`
Output: stack config object from `STACKS`, or `null` on failure

- If `stackName` is null/undefined: `logError('Stack name required. Available: nodejs-react, php-laravel')` → return null
- If not found in STACKS: `logError('Unknown stack: "X". Available: nodejs-react, php-laravel')` → exit code 2

### runAll(stack, filterAgent)

Pipeline orchestrator. Implements `prd.md > Full Pipeline`.

**Order: validate → publish → update-readme → update-nav**

```
Step 1: validate(stack, filterAgent)
  → if result.success === false: logError, return false (stop)

Step 2: publish(stack, filterAgent)
  → if result.success === false: logError, return false (stop)

Step 3: updateReadme(stack)
  → if result.success === false: logError, return false (stop)

Step 4: updateNav(stack)
  → if result.success === false: logError, return false

Print pipeline summary on completion (success or failure):
  [validate]  ✓ / ✗
  [publish]   ✓ / ✗ / — (not reached)
  [readme]    ✓ / ✗ / —
  [nav]       ✓ / ✗ / —
```

Each step's output is prefixed with `[validate]`, `[publish]`, `[readme]`, `[nav]`.
A final summary line always prints regardless of outcome.

### run(args)

Switch on `command`:
- `generate` → `generate(stack, agent)` — no `validateAgent()` call; must be bootstrapping-safe
- `validate` → `validate(stack, agent)`
- `publish` → `publish(stack, agent)`
- `update-readme` → `updateReadme(stack)`
- `update-nav` → `updateNav(stack)`
- `all` → `runAll(stack, agent)`
- `status` → `status()`
- `help` / `--help` / `-h` / no command → print USAGE string
- unknown → `logError('Unknown command: "X"')` + print USAGE, exit code 2

---

## Component: src/config.js

Stack definitions and agent auto-detection.
PRD ref: `prd.md > Profile Validation`, `prd.md > Profile Publishing`, `prd.md > Status Visibility`

### Constants

```js
const REPO_ROOT = path.resolve(__dirname, '..', '..');
const OS_VARIANTS = ['ubuntu', 'mac', 'windows'];

// All 9 files expected in each OS directory under a profile
const EXPECTED_FILES = [
  'agent-environment-profiles.md',
  'system-setup.md',
  'docker-setup.md',
  'project-memory.md',
  'debug-automation.md',
  'curated-profiles.md',
  'optimize-tokens.md',
  'customer-support.md',
  'fully-local.md',
];
```

### STACKS

```js
const STACKS = {
  'nodejs-react': {
    name: 'Node.js + React/Next.js',
    sourceBase: path.join(REPO_ROOT, 'base-profiles', 'nodejs-react'),
    targetBase: path.join(REPO_ROOT, 'profiles', 'nodejs-react'),
    osVariants: OS_VARIANTS,
    expectedFiles: EXPECTED_FILES,
    readmeHeader: 'AI Vibe Coding Setup',
    readmeColumnKey: 'nodejs-react',
    get agents() { return detectAgents('nodejs-react'); },
    validationRules: { /* defined below */ },
    keyDecisions: {
      slot1: { tool: 'mcp-language-server', reason: 'Go binary, no Neo4j, TypeScript LSP' },
      slot2: { tool: 'Semgrep', reason: 'Best free static analysis for Node.js/TypeScript' },
      slot3: { tool: 'Basic Memory', reason: 'AGPL free, local-first persistent memory' },
      slot4: { tool: 'Figma Context MCP', reason: 'Design-to-code, optional, disabled by default' },
    },
  },
  'php-laravel': {
    name: 'PHP + Laravel/WP',
    sourceBase: path.join(REPO_ROOT, 'base-profiles', 'php-laravel'),
    targetBase: path.join(REPO_ROOT, 'profiles', 'php-laravel'),
    osVariants: OS_VARIANTS,
    expectedFiles: EXPECTED_FILES,
    readmeHeader: 'PHP + Laravel/WP — AI Vibe Coding Setup',
    readmeColumnKey: 'php-laravel',
    get agents() { return detectAgents('php-laravel'); },
    validationRules: { /* defined below */ },
    keyDecisions: {
      slot1: { tool: 'mcp-language-server + phpactor', reason: 'MIT open-source PHP LSP' },
      slot2: { tool: 'Semgrep', reason: 'PHP security rules included' },
      slot3: { tool: 'Basic Memory', reason: 'AGPL free, local-first' },
      slot4: { tool: 'laravel/boost', reason: 'Official Laravel MCP, opt-in only' },
      slot5: { tool: 'WordPress/mcp-adapter', reason: 'WP MCP, opt-in only' },
    },
  },
};
```

`agents` is a getter — evaluated at call time so it always reflects the current filesystem state.

### detectAgents(stackKey)

Traverses `base-profiles/<stack>/<os>/` for each OS variant and returns agent names present in all three.

```
base-profiles/nodejs-react/
  ubuntu/claude/  mac/claude/  windows/claude/  → 'claude' included
  ubuntu/cline/   mac/cline/                    → 'cline' excluded (missing windows)
```

Only agents present in ALL three OS variant directories are returned.

```js
function detectAgents(stackKey) {
  const stackSourceBase = path.join(REPO_ROOT, 'base-profiles', stackKey);
  if (!fs.existsSync(stackSourceBase)) return [];

  // Collect agent subdirs from each OS directory
  const agentsPerOS = {};
  for (const os of OS_VARIANTS) {
    const osDir = path.join(stackSourceBase, os);
    if (!fs.existsSync(osDir)) continue;
    agentsPerOS[os] = fs.readdirSync(osDir).filter(entry =>
      fs.statSync(path.join(osDir, entry)).isDirectory()
    );
  }

  const osKeys = Object.keys(agentsPerOS);
  if (osKeys.length === 0) return [];

  // Intersect: only agents present in ALL OS dirs
  let common = agentsPerOS[osKeys[0]];
  for (let i = 1; i < osKeys.length; i++) {
    common = common.filter(a => agentsPerOS[osKeys[i]].includes(a));
  }
  return common.sort();
}
```

### validationRules shape

Per-stack rules defining what each profile file must contain. Each key is a filename expected in every OS directory:

```js
validationRules: {
  'agent-environment-profiles.md': {
    mustContain: string[],       // keywords required across all OS variants
    description: string,         // human-readable description of the file's purpose
  },
  'system-setup.md': {
    mustContainByOS: {           // OS-specific required keywords
      ubuntu: string[],
      mac: string[],
      windows: string[],
    },
    description: string,
  },
  // ... one entry per file in EXPECTED_FILES
}
```

Stack-specific rules override or extend base rules where needed (e.g., `php-laravel` `docker-setup.md` requires `phpactor` while `nodejs-react` requires `golang:1.23-bookworm`). Base rules shared across all stacks are composed with stack-specific overrides at config definition time.

---

## Component: src/generate.js

Generates all 9 profile markdown files for a given agent from `instructions.yaml`. Writes to `base-profiles/`.
PRD ref: `prd.md > Profile Generation`

### Behavior

```
generate(stack, filterAgent)
  → cfg = readInstructions(stack.readmeColumnKey)
      reads base-profiles/<stack>/instructions.yaml
      if missing: logError, return { success: false }

  → agents = filterAgent ? [filterAgent] : stack.agents
  → if agents.length === 0:
      logWarn 'No agents detected. Pass --agent <name> to generate for a specific agent.'
      return { success: false }

  For each agent:
    aDir = AGENT_DIRS[agentName] || '.{agentName}'   ← e.g. '.kilocode', '.cline'
    For each os in cfg.os_variants:
      targetDir = base-profiles/<stack>/<os>/<agent>/
      For each section in cfg.sections:
        content = GENERATORS[section](stackKey, agentName, aDir, os, cfg)
        writeFile(targetDir/<section>.md, content)   ← mkdirSync recursive + writeFileSync
        log UPDATE if file existed, ✓ if new

  Print summary: X files written, Y errors
  Hint: 'Next: run profile-cli all <stack> [--agent <name>] to validate + publish'
  Return { success: errors.length === 0, written: int, errors: [{ os, agentName, section, error }] }
```

### Section generators

Nine generator functions, one per entry in `EXPECTED_FILES`. Each takes `(stackKey, agentName, aDir, os, cfg)` and returns the full markdown string for that file.

| Section file | Key data sourced from instructions.yaml |
|---|---|
| agent-environment-profiles.md | `cfg.name`, `cfg.tool_slots` (slot count + tool table) |
| system-setup.md | Stack-specific shell scripts, branched per OS (ubuntu/mac/windows) |
| docker-setup.md | Stack-specific Docker Compose config and service images |
| project-memory.md | Shared content — amnesia problem, Basic Memory mcp.json setup |
| debug-automation.md | Shared content — Day 2 Problem, debug workflow |
| curated-profiles.md | Shared content — 5 workflow profiles |
| optimize-tokens.md | Shared content — token optimization strategies |
| customer-support.md | Stack-specific — Figma for nodejs-react, Laravel for php-laravel |
| fully-local.md | Shared content — Ollama + local model setup |

### Bootstrapping constraint

`generate` must NOT be preceded by `validateAgent()` in `index.js`. `validateAgent` checks that the agent already exists in `stack.agents` (populated by `detectAgents` scanning the filesystem). A brand-new agent has no files yet, so `detectAgents` returns `[]` and `validateAgent` exits with code 2 before `generate` runs. `generate` handles the empty-agent case internally.

### Return contract

```js
{ success: bool, written: int, errors: [{ os, agentName, section, error }] }
```

---

## Component: src/validate.js

Pre-publish content gate. Reads `base-profiles/` (source). Never touches `profiles/`.
PRD ref: `prd.md > Profile Validation`

### Behavior

```
validate(stack, filterAgent)
  → agents = filterAgent ? [filterAgent] : stack.agents
  → if agents.length === 0: logError, return { success: false }

  For each agent:
    For each OS variant:
      filePath = base-profiles/<stack>/<os>/<agent>/<section>.md

      Check 1 — File exists
        FAIL: logError with full path, push to failures[]

      Check 2 — File is not empty
        FAIL: logError 'Empty profile — no content to validate'

      Check 3 — No indentation errors
        Scan file content line by line for malformed indentation
        FAIL: logError with file name and line number where error occurs

      Check 4 — Required sections present
        For each section in validationRules.requiredSections:
          if not found in file content: logError with section name, push failure

      Check 5 — Optional sections present
        For each section in validationRules.optionalSections:
          if not found: logWarn (non-blocking, does not increment failed count)

      All checks pass → logSuccess with full path

  Print summary: X passed, Y failed
  Return { success: failed === 0, passed, failed, failures[] }
```

- Exit 0: all profiles pass
- Exit 1: one or more failures
- Exit 2: invalid stack/agent name (handled in index.js before validate is called)
- All failures reported per file — not just the first one
- Validate is **always read-only** — no file modifications ever

### Return contract

```js
{ success: bool, passed: int, failed: int, failures: [{ agent, os, reason }] }
```

---

## Component: src/publish.js

Copies source profiles to published directory. Only runs after validate passes.
PRD ref: `prd.md > Profile Publishing`

### Session gate

`runAll()` in `index.js` calls validate first and only calls publish if `validateResult.success === true`. When publish is called standalone (not via `all`), it prints a hard block if the user hasn't validated:

```
if (calledStandalone && !validatePassedThisSession) {
  logError('Profiles not validated. Run validate first.')
  process.exit(1)
}
```

Implementation: `index.js` maintains a module-level `let validatePassedThisSession = false`. Set to `true` when `validate()` returns `{ success: true }`. Checked before standalone `publish` call.

### Behavior

```
publish(stack, filterAgent)
  → agents = filterAgent ? [filterAgent] : stack.agents
  → if agents.length === 0: logError, return { success: false }
  → if stack.sourceBase does not exist: logError with path, return { success: false }

  For each agent:
    For each OS variant:
      sourceDir = base-profiles/<stack>/<os>/<agent>/
      targetDir = profiles/<stack>/<os>/<agent>/

      if sourceDir missing: logWarn 'Source missing — skipping [os]', continue

      fs.mkdirSync(targetDir, { recursive: true })   ← creates full path

      src = sourceDir/<section>.md
      dest = targetDir/<section>.md

      if src missing: logWarn 'Source file not found', push error, continue

      if dest exists AND content is identical: logInfo 'SKIP (unchanged)', increment skipped
      else: fs.copyFileSync(src, dest), logSuccess with dest path, increment copied

  Summary: X copied, Y unchanged, Z errors
  Return { success: errors.length === 0, copied, skipped, errors[] }
```

- Creates `profiles/` and any subdirectories as needed
- Overwrites changed files silently
- Skips identical files (content comparison, not timestamp)
- Exit 0 on full success, exit 1 if any copy failed

---

## Component: src/update-readme.js

Updates the profile matrix table in `README.md`.
PRD ref: `prd.md > README Management`

### Behavior

```
updateReadme(stack)
  → if README.md does not exist: logError, return { success: false }
  → if README.md not writable: logError, return { success: false }

  Discover published profiles:
    traverse profiles/<stack>/<os>/<agent>/ via directory walk
    build list of { os, agent } pairs that are published

  Read README.md
  Locate profile matrix table (identified by stack.readmeHeader)
  For each discovered agent-os pair:
    if row exists: update in place (no duplicate)
    if row missing: append to table section

  Write README.md
  logSuccess '✓ README updated: X profiles synced'
  Return { success: true, synced: int }
```

### Table format (open issue — see Open Issues #2)

The updater needs to know the exact column order, delimiter, and table section boundaries. During build, the agent must read the actual README.md table structure before implementing the row insert/update logic.

---

## Component: src/update-nav.js

Updates `navigation.md` with profile entry links.
PRD ref: `prd.md > Navigation Management`

### Behavior

```
updateNav(stack)
  → if navigation.md does not exist: logError 'navigation.md not found — create it first', return { success: false }

  Discover published profiles:
    traverse profiles/<stack>/<os>/<agent>/

  Read navigation.md
  For each agent-os pair:
    locate correct section (stack → agent hierarchy)
    if entry exists: update in place
    if entry missing: insert in correct section

  Write navigation.md
  logSuccess '✓ navigation.md updated: X entries synced'
  Return { success: true, synced: int }
```

Entry format (open issue — see Open Issues #3): the build phase must read the existing `navigation.md` structure to determine link format and section identifiers before implementing insert logic.

---

## Component: src/status.js

Read-only status report across all stacks and agents.
PRD ref: `prd.md > Status Visibility`

### Behavior

```
status()
  For each stack in STACKS:
    detectedAgents = stack.agents  (auto-detect from base-profiles)

    For each agent:
      For each OS variant:
        sourceDir = base-profiles/<stack>/<os>/<agent>/
        targetDir = profiles/<stack>/<os>/<agent>/

        if targetDir has 0 files:              → state = 'NOT PUBLISHED'
        if targetDir has fewer than expected:  → state = 'PARTIAL'
        if any file content differs:           → state = 'OUT OF SYNC'
        if all files present and identical:    → state = 'PUBLISHED'

        Print: [os] → state (source count / expected | target status)

  Display grouping: stack → agent (outer loop) → OS (inner loop)
  Filesystem path:  stack → OS → agent
```

### Three states

- `published` — `profiles/` file exists and content matches `base-profiles/`
- `unpublished` — `profiles/` file does not exist
- `out of sync` — `profiles/` file exists but content differs from `base-profiles/` (content string comparison, not timestamp)

Hint for unpublished: `Run: profile-cli publish <stack> --agent <agent>`

---

## Component: src/utils.js

Shared logging and ANSI color helpers. No business logic.

### COLORS

```js
const COLORS = {
  reset:  '\x1b[0m',
  red:    '\x1b[31m',
  green:  '\x1b[32m',
  yellow: '\x1b[33m',
  cyan:   '\x1b[36m',
  dim:    '\x1b[2m',
  bold:   '\x1b[1m',
};
```

### Logging API

| Function | Color | Prefix | Use |
|---|---|---|---|
| `log(msg)` | none | none | neutral output |
| `logSuccess(msg)` | green | `✓` | operation passed |
| `logError(msg)` | red | `✗` | failure, block |
| `logWarn(msg)` | yellow | `⚠` | advisory, non-blocking |
| `logInfo(msg)` | cyan | `ℹ` | informational |
| `logBold(msg)` | bold | none | section headers |

All functions write to `console.log`. No `console.error` — output stays on stdout for clean piping.

---

## Data Model

### Stack config shape

```js
{
  name: string,           // display name
  sourceBase: string,     // abs path to base-profiles/<stack>/
  targetBase: string,     // abs path to profiles/<stack>/
  osVariants: string[],   // ['ubuntu', 'mac', 'windows']
  expectedFiles: string[],// files expected in each <os>/<agent>/ directory
  readmeHeader: string,   // table column header in README.md
  readmeColumnKey: string,// key for identifying this stack's table section
  agents: string[],       // getter — result of detectAgents() at call time
  validationRules: {
    [filename: string]: {
      mustContain?: string[],
      mustContainByOS?: { ubuntu: string[], mac: string[], windows: string[] },
      description: string,
    }
  },
  keyDecisions: {
    [slot: string]: { tool: string, reason: string }  // MCP tool selections
  }
}
```

### Profile path resolution

Given any (stack, os, agent, section) tuple, the path is always:

```
source: REPO_ROOT/base-profiles/<stack>/<os>/<agent>/<section>.md
target: REPO_ROOT/profiles/<stack>/<os>/<agent>/<section>.md
```

No exceptions. No alternate path formats.

### Validate result shape

```js
{ success: bool, passed: int, failed: int, failures: [{ agent: string, os: string, file: string, reason: string }] }
```

### Publish result shape

```js
{ success: bool, copied: int, skipped: int, errors: string[] }
```

---

## File Structure

```
coding-agent-mcp-tools/
├── cli/
│   ├── bin/
│   │   └── profile-cli.js        # shebang entry → calls src/index.js run()
│   ├── src/
│   │   ├── index.js              # arg parser, command router, runAll pipeline
│   │   ├── config.js             # STACKS, detectAgents(), REPO_ROOT, OS_VARIANTS
│   │   ├── generate.js           # generate command — reads instructions.yaml, writes base-profiles/
│   │   ├── validate.js           # validate command — reads base-profiles, checks content
│   │   ├── publish.js            # publish command — copies base-profiles/ → profiles/
│   │   ├── update-readme.js      # update-readme command — updates README.md table
│   │   ├── update-nav.js         # update-nav command — updates navigation.md
│   │   ├── status.js             # status command — compares source vs published
│   │   ├── parse-yaml.js         # minimal YAML parser (zero-dep) used by generate
│   │   └── utils.js              # COLORS, log/logSuccess/logError/logWarn/logInfo/logBold
│   └── package.json              # name, bin entry, engines: node>=18, zero deps
├── base-profiles/                # written by generate; read by validate, publish, status
│   ├── nodejs-react/
│   │   ├── instructions.yaml    # stack definition — source of truth for generate
│   │   ├── ubuntu/<agent>/(9 .md files)
│   │   ├── mac/<agent>/(9 .md files)
│   │   └── windows/<agent>/(9 .md files)
│   └── php-laravel/
│       ├── instructions.yaml
│       └── <os>/<agent>/(9 .md files)
├── profiles/                     # published output — written by publish, mirrors base-profiles/ structure
│   └── <stack>/<os>/<agent>/(9 .md files)
├── docs/
│   ├── learner-profile.md
│   ├── scope.md
│   ├── prd.md
│   └── spec.md
├── README.md                     # updated by update-readme
├── navigation.md                 # updated by update-nav
└── process-notes.md
```

---

## Data Flow

### generate flow

```
profile-cli generate nodejs-react --agent kilocode

index.js: parseArgs → { command: 'generate', stack: 'nodejs-react', agent: 'kilocode' }
index.js: getStack('nodejs-react') → STACKS['nodejs-react']
index.js: generate(stack, 'kilocode')   ← NO validateAgent call

generate.js:
  cfg = readInstructions('nodejs-react')
    reads base-profiles/nodejs-react/instructions.yaml
  agents = ['kilocode']
  for agent 'kilocode':
    aDir = '.kilocode'
    for os 'ubuntu':
      targetDir = base-profiles/nodejs-react/ubuntu/kilocode/
      for each of 9 sections: generate content → write <section>.md
    for os 'mac': (same)
    for os 'windows': (same)
  print summary: 27 files written
  hint: 'Next: run profile-cli all nodejs-react --agent kilocode'

index.js: process.exit(0) or process.exit(1)
```

### validate flow

```
profile-cli validate nodejs-react --agent claude

index.js: parseArgs → { command: 'validate', stack: 'nodejs-react', agent: 'claude' }
index.js: getStack('nodejs-react') → STACKS['nodejs-react']
index.js: validate(stack, 'claude')

validate.js:
  agents = ['claude']
  for agent 'claude':
    for os 'ubuntu':
      read base-profiles/nodejs-react/ubuntu/claude/<section>.md
      → check exists, not empty, required keywords present
      → log PASS/FAIL per check
    for os 'mac': (same)
    for os 'windows': (same)
  print summary
  return { success: true/false, passed, failed, failures }

index.js: process.exit(0) or process.exit(1)
```

### publish flow (standalone)

```
profile-cli publish nodejs-react

index.js: checks validatePassedThisSession === false
  → logError('Profiles not validated. Run validate first.')
  → process.exit(1)

(if validate was run first in same session:)
publish.js:
  agents = detectAgents('nodejs-react')  ← scans base-profiles/nodejs-react/<os>/ dirs
  for each agent:
    for each os:
      src  = base-profiles/nodejs-react/<os>/<agent>/<section>.md
      dest = profiles/nodejs-react/<os>/<agent>/<section>.md
      fs.mkdirSync(destDir, { recursive: true })
      if identical: skip
      else: copyFileSync
  return { success, copied, skipped, errors }
```

### all pipeline flow

```
profile-cli all nodejs-react

runAll(stack, null):

  [validate]
    validate(stack, null) → { success: false }
    logError, print step summary, return false
    ← STOP HERE if any failure

  [publish]
    publish(stack, null) → { success: true, copied: 12, skipped: 0 }

  [readme]
    updateReadme(stack) → { success: true, synced: 8 }

  [nav]
    updateNav(stack) → { success: true, synced: 8 }

  Final summary:
    [validate]  ✓
    [publish]   ✓  27 copied, 0 unchanged
    [readme]    ✓  profiles synced
    [nav]       ✓  entries synced
    Next steps: review → git add → git commit
```

---

## Key Technical Decisions

| Decision | What | Why | Tradeoff accepted |
|---|---|---|---|
| Zero external deps | Only `fs` + `path` | Portability — runs anywhere Node 18 runs, no install step | More manual implementations (color codes, arg parsing) vs. using chalk/yargs |
| Directory traversal, not config | detectAgents() reads the filesystem | Adding a new agent folder is picked up automatically — no config change needed | Slightly slower than a static list; fragile if directory naming conventions diverge |
| Validate is a pre-publish gate | validate must pass before publish runs | Invalid profiles must never reach the public directory | Requires two commands (or `all`) instead of publish-only; session state must be tracked in-process |
| Content comparison for skip/sync | `srcContent === destContent` not `mtime` | `git checkout` resets timestamps making mtime unreliable; content is the source of truth | Slightly more I/O (reads both files) — acceptable at this scale |
| CommonJS not ESM | `require`/`module.exports` | Node 18 supports both but CommonJS is simpler for a CLI tool with no bundler | Cannot use top-level `await` without workarounds |

---

## Dependencies & External Services

None. This is a fully local, offline tool.

| Dependency | Type | Notes |
|---|---|---|
| Node.js >= 18.0.0 | Runtime | `fs.mkdirSync` with `recursive: true` requires Node 10.12+; `fs.copyFileSync` requires Node 8.5+ — both well within 18 |
| `fs` (built-in) | File I/O | Read, write, copy, stat, mkdir, readdir |
| `path` (built-in) | Path resolution | `path.join`, `path.resolve`, `path.relative` |
| `process` (built-in) | CLI args, exit codes | `process.argv`, `process.exit()` |

No external APIs. No network. No database. No auth.

---

## Open Issues

| # | Issue | Status | Notes |
|---|---|---|---|
| ~~1~~ | ~~Exact required section headers in `agent-environment-profiles.md`~~ | **Resolved** | Scope defines profile contents as: MCP configuration, environment config, setup scripts (required) and Docker setup (optional). Each maps to a dedicated file in `EXPECTED_FILES`. Validation rules are defined per-file in each stack's `validationRules` object. |
| 2 | README.md table format — column order, delimiter, section boundaries | `/build` | `update-readme.js` implementation depends on how the existing table is structured. Build agent must read the actual README.md before implementing. |
| 3 | navigation.md entry format and section structure | `/build` | `update-nav.js` depends on how the existing nav file is structured. Build agent must read it before implementing. |
| 4 | Session validate state scope | `/build` | Module-level boolean in `index.js` works for the common case but resets if the user opens a new shell. This is acceptable for a CLI — document it as expected behavior. |
