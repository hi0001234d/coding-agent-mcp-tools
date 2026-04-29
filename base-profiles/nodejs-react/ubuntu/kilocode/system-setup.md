# 🖥️ Run on Your System (Direct Setup)

## ⚡ One-Command Setup

We've simplified the entire setup into a single script.

---

## ⚡ Quick Setup (Copy & Run)

### 🚀 Step 1: Go to Setup Directory (NOT Project Root)

- Go to your home directory or a setup folder (NOT your project folder).
- This script is for development environment setup.

```bash
cd ~
```

(Optional – Recommended)

```bash
mkdir -p ~/setup-scripts
cd ~/setup-scripts
```

---

### 🚀 Step 2: Create Setup Script File

Create a new file named `setup-mcp-tools.sh` in this folder.

```bash
nano setup-mcp-tools.sh
```

---

### 📋 Step 3: Add Setup Script Code

Copy the full script from below, paste it into the file, and save it.

````bash
#!/bin/bash

# ============================================================
#  MCP Tools Installer + KiloCode Project-Level MCP Setup
#  Node.js + React/Next.js Profile
#
#  Installs: mcp-language-server, semgrep, basic-memory,
#            figma-developer-mcp (optional)
#  Configures: <project-root>/.kilocode/mcp.json
#              <project-root>/.kilocode/rules/ (4 files)
#  Creates:    <project-root>/AGENTS.md
#
#  Usage:
#    cd /path/to/your/project
#    bash setup-mcp-tools.sh
#
#  OR with project path argument:
#    bash setup-mcp-tools.sh /path/to/your/project
# ============================================================

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
CYAN='\033[0;36m'
BOLD='\033[1m'
NC='\033[0m'

log_info()  { echo -e "${GREEN}[✔] $1${NC}"; }
log_warn()  { echo -e "${YELLOW}[⚠] $1${NC}"; }
log_error() { echo -e "${RED}[✘] $1${NC}"; }
log_ask()   { echo -e "${CYAN}[?] $1${NC}"; }

echo ""
echo "============================================"
echo "  MCP Tools Installer + KiloCode Setup"
echo "  Node.js + React/Next.js Profile"
echo "============================================"
echo ""

# --------------------------------------------------
# 0. Detect paths
# --------------------------------------------------
USER_HOME="$HOME"
USERNAME="$(whoami)"

if [ -n "$1" ]; then
    PROJECT_ROOT="${1/#\~/$USER_HOME}"
else
    PROJECT_ROOT="$(pwd)"
fi

if [ "$PROJECT_ROOT" = "$USER_HOME" ] || [ "$PROJECT_ROOT" = "/" ]; then
    log_error "Don't run this from home (~) or root (/) directory!"
    log_ask "Either cd into your project folder first, or pass project path as argument:"
    echo ""
    echo "  bash setup-mcp-tools.sh /home/$USERNAME/projects/my-app"
    echo ""
    exit 1
fi

log_info "User:         $USERNAME"
log_info "Home:         $USER_HOME"
echo -e "${BOLD}${CYAN}[->] Project:     $PROJECT_ROOT${NC}"
echo ""

read -p "  Is this your project root? (y/n): " CONFIRM
if [[ ! "$CONFIRM" =~ ^[Yy]$ ]]; then
    log_ask "Enter your project root path:"
    read -p "  Project Root: " PROJECT_ROOT
    PROJECT_ROOT="${PROJECT_ROOT/#\~/$USER_HOME}"
fi

if [ ! -d "$PROJECT_ROOT" ]; then
    log_warn "'$PROJECT_ROOT' does not exist."
    read -p "  Create it? (y/n): " CREATE_DIR
    if [[ "$CREATE_DIR" =~ ^[Yy]$ ]]; then
        mkdir -p "$PROJECT_ROOT"
        log_info "Created: $PROJECT_ROOT"
    else
        log_error "Project root does not exist. Exiting."
        exit 1
    fi
fi

DOCS_PATH="$PROJECT_ROOT/docs"
mkdir -p "$DOCS_PATH"
log_info "Docs directory: $DOCS_PATH"

# --------------------------------------------------
# 1. Ensure ~/.local/bin exists and is in PATH
# --------------------------------------------------
mkdir -p "$USER_HOME/.local/bin"

if [[ ":$PATH:" != *":$USER_HOME/.local/bin:"* ]]; then
    echo 'export PATH=$HOME/.local/bin:$PATH' >> "$USER_HOME/.bashrc"
    export PATH="$USER_HOME/.local/bin:$PATH"
    log_info "Added ~/.local/bin to PATH"
else
    log_info "~/.local/bin already in PATH"
fi

# --------------------------------------------------
# 2. Install Go + mcp-language-server (Slot 1)
# --------------------------------------------------
echo ""
echo "--------------------------------------------"
echo "  Step 1: Installing mcp-language-server"
echo "--------------------------------------------"

GO_VERSION="1.23.0"
if ! command -v go &> /dev/null; then
    log_info "Installing Go $GO_VERSION..."
    wget -q "https://go.dev/dl/go${GO_VERSION}.linux-amd64.tar.gz" -O /tmp/go.tar.gz
    sudo rm -rf /usr/local/go
    sudo tar -C /usr/local -xzf /tmp/go.tar.gz
    rm /tmp/go.tar.gz
    echo 'export PATH=$PATH:/usr/local/go/bin:$HOME/go/bin' >> "$USER_HOME/.bashrc"
    export PATH=$PATH:/usr/local/go/bin:$USER_HOME/go/bin
    log_info "Go $GO_VERSION installed"
else
    log_info "Go already installed: $(go version)"
    if [[ ":$PATH:" != *":$USER_HOME/go/bin:"* ]]; then
        echo 'export PATH=$PATH:$HOME/go/bin' >> "$USER_HOME/.bashrc"
        export PATH=$PATH:$USER_HOME/go/bin
    fi
fi

log_info "Installing mcp-language-server..."
go install github.com/isaacphi/mcp-language-server@latest
MLS_PATH="$USER_HOME/go/bin/mcp-language-server"
if [ ! -f "$MLS_PATH" ]; then
    log_error "mcp-language-server install failed!"
    log_warn "Continuing — fix manually: go install github.com/isaacphi/mcp-language-server@latest"
    MLS_PATH="mcp-language-server"
else
    log_info "mcp-language-server installed: $MLS_PATH"
fi

log_info "Installing typescript-language-server (npm)..."
npm install -g typescript typescript-language-server --quiet
log_info "typescript-language-server ready"

# --------------------------------------------------
# 3. Install Semgrep (Slot 2)
# --------------------------------------------------
echo ""
echo "--------------------------------------------"
echo "  Step 2: Installing semgrep"
echo "--------------------------------------------"

if ! command -v pip3 &> /dev/null; then
    log_info "Installing python3-pip..."
    sudo apt update -qq
    sudo apt install -y -qq python3-pip > /dev/null 2>&1
fi

log_info "Installing semgrep..."
pip3 install semgrep --quiet
SEMGREP_PATH=$(which semgrep 2>/dev/null || echo "semgrep")
if command -v semgrep &> /dev/null; then
    log_info "semgrep installed: $SEMGREP_PATH"
else
    log_error "semgrep install failed — check Python/pip"
    SEMGREP_PATH="semgrep"
fi

# --------------------------------------------------
# 4. Install Basic Memory (Slot 3)
# --------------------------------------------------
echo ""
echo "--------------------------------------------"
echo "  Step 3: Installing basic-memory"
echo "--------------------------------------------"

if ! command -v uv &> /dev/null; then
    log_info "Installing uv..."
    curl -LsSf https://astral.sh/uv/install.sh | sh
    [ -f "$USER_HOME/.local/bin/env" ] && source "$USER_HOME/.local/bin/env"
    [ -f "$USER_HOME/.cargo/env" ]     && source "$USER_HOME/.cargo/env"
    export PATH="$USER_HOME/.local/bin:$PATH"
    log_info "uv installed"
else
    log_info "uv already installed"
fi

if ! grep -q 'export TMPDIR=/tmp' "$USER_HOME/.bashrc" 2>/dev/null; then
    echo 'export TMPDIR=/tmp' >> "$USER_HOME/.bashrc"
fi
export TMPDIR=/tmp

log_info "Installing basic-memory via uv..."
uv tool install --force basic-memory 2>&1 | tail -5

BASIC_MEMORY_PATH=""

UV_TOOL_DIR=$(uv tool dir 2>/dev/null)
if [ -n "$UV_TOOL_DIR" ] && [ -f "$UV_TOOL_DIR/basic-memory/bin/basic-memory" ]; then
    BASIC_MEMORY_PATH="$UV_TOOL_DIR/basic-memory/bin/basic-memory"
    log_info "Found via uv tool dir: $BASIC_MEMORY_PATH"
fi

if [ -z "$BASIC_MEMORY_PATH" ]; then
    CANDIDATE="$USER_HOME/.local/share/uv/tools/basic-memory/bin/basic-memory"
    if [ -f "$CANDIDATE" ]; then
        BASIC_MEMORY_PATH="$CANDIDATE"
        log_info "Found at standard path: $BASIC_MEMORY_PATH"
    fi
fi

if [ -z "$BASIC_MEMORY_PATH" ]; then
    CANDIDATE=$(which basic-memory 2>/dev/null || echo "")
    if [ -n "$CANDIDATE" ]; then
        BASIC_MEMORY_PATH="$CANDIDATE"
        log_info "Found via which: $BASIC_MEMORY_PATH"
    fi
fi

if [ -z "$BASIC_MEMORY_PATH" ]; then
    CANDIDATE=$(find "$USER_HOME/.local" -name "basic-memory" -type f 2>/dev/null | head -1)
    if [ -n "$CANDIDATE" ]; then
        BASIC_MEMORY_PATH="$CANDIDATE"
        log_info "Found via find: $BASIC_MEMORY_PATH"
    fi
fi

if [ -z "$BASIC_MEMORY_PATH" ]; then
    log_error "Could not find basic-memory binary after install!"
    log_warn "Using default path — fix manually in mcp.json if needed"
    BASIC_MEMORY_PATH="$USER_HOME/.local/share/uv/tools/basic-memory/bin/basic-memory"
else
    log_info "basic-memory ready: $BASIC_MEMORY_PATH"
fi

# --------------------------------------------------
# 5. Figma Context MCP (Slot 4 — Optional)
# --------------------------------------------------
echo ""
echo "--------------------------------------------"
echo "  Step 4: Figma Context MCP (Optional)"
echo "--------------------------------------------"
echo ""
log_ask "Figma API key — enables design-to-code workflow (Slot 4)"
log_warn "Press Enter to skip. You can add your key to .kilocode/mcp.json later."
echo ""
read -p "  Figma API Key (optional): " FIGMA_API_KEY
if [ -n "$FIGMA_API_KEY" ]; then
    log_info "Figma API key recorded — will be added to mcp.json"
    FIGMA_DISABLED="false"
else
    log_warn "Skipping Figma — setup continues normally without it"
    FIGMA_API_KEY="YOUR-FIGMA-API-KEY"
    FIGMA_DISABLED="true"
fi

# --------------------------------------------------
# 6. Configure Project-Level KiloCode MCP
# --------------------------------------------------
echo ""
echo "--------------------------------------------"
echo "  Step 5: Project-Level KiloCode mcp.json"
echo "--------------------------------------------"

PROJECT_KILOCODE_DIR="$PROJECT_ROOT/.kilocode"
PROJECT_MCP_JSON="$PROJECT_KILOCODE_DIR/mcp.json"
mkdir -p "$PROJECT_KILOCODE_DIR"

if [ -f "$PROJECT_MCP_JSON" ]; then
    BACKUP="$PROJECT_MCP_JSON.backup.$(date +%Y%m%d_%H%M%S)"
    cp "$PROJECT_MCP_JSON" "$BACKUP"
    log_warn "Backup: $BACKUP"
fi

cat > "$PROJECT_MCP_JSON" << MCPJSON
{
  "mcpServers": {
    "language-server": {
      "command": "$MLS_PATH",
      "args": [
        "--workspace", "$PROJECT_ROOT/",
        "--lsp", "typescript-language-server",
        "--", "--stdio"
      ]
    },
    "semgrep": {
      "command": "$SEMGREP_PATH",
      "args": ["mcp"]
    },
    "basic-memory": {
      "command": "$BASIC_MEMORY_PATH",
      "args": [
        "mcp",
        "--path",
        "$DOCS_PATH"
      ]
    },
    "figma-developer-mcp": {
      "command": "npx",
      "args": ["-y", "figma-developer-mcp", "--stdio"],
      "env": {
        "FIGMA_API_KEY": "$FIGMA_API_KEY"
      },
      "disabled": $FIGMA_DISABLED
    }
  }
}
MCPJSON

log_info "Written: $PROJECT_MCP_JSON"

# --------------------------------------------------
# 7. Create .kilocode/rules/ files
# --------------------------------------------------
echo ""
echo "--------------------------------------------"
echo "  Step 6: Creating .kilocode/rules/"
echo "--------------------------------------------"

RULES_DIR="$PROJECT_KILOCODE_DIR/rules"
mkdir -p "$RULES_DIR"

cat > "$RULES_DIR/stack.md" << 'STACK_MD_EOF'
# Stack Rules — Node.js + React/Next.js

## Language
- Always use TypeScript for new files. Never create plain `.js` files in a TypeScript project.
- Use `.tsx` extension for React components (even if no JSX yet).
- Use `.ts` extension for utilities, API routes, hooks, and lib files.

## Routing
<!-- CUSTOMIZE: set to "App Router" or "Pages Router" based on this project -->
- Default: **App Router** (Next.js 13+, uses `/app` directory)
- If this project uses `/pages` directory, change to: **Pages Router**

## Imports
- Always use absolute imports via tsconfig paths (e.g., `@/components/`, `@/lib/`, `@/app/`).
- Never use relative imports that go up more than one level (`../../`).

## Package Manager
<!-- CUSTOMIZE: set to npm / pnpm / yarn based on this project's lockfile -->
- Default: **npm**

## API Routes
- App Router projects: use Route Handlers in `/app/api/` (not `/pages/api/`).
- Pages Router projects: use `/pages/api/` handlers.

## Server vs Client Components (App Router only)
- Default to Server Components. Only add `"use client"` when the component requires:
  - Browser APIs
  - Event listeners
  - React hooks (useState, useEffect, etc.)
- Never add `"use client"` without a concrete reason.
STACK_MD_EOF

cat > "$RULES_DIR/security.md" << 'SECURITY_MD_EOF'
# Security Rules — Node.js + React/Next.js

Three patterns where AI-generated Node.js code looks correct but introduces real vulnerabilities.

---

## 1. Never hardcode secrets or API keys

**Bad:**
```ts
const client = new OpenAI({ apiKey: "sk-proj-abc123..." });
```

**Required:**
```ts
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
```

- All secrets go in `.env.local` (never committed).
- `.env.local` must be in `.gitignore`.
- Never log `process.env` values.

---

## 2. Never interpolate user input into database queries

**Bad:**
```ts
const result = await db.query(`SELECT * FROM users WHERE id = ${req.params.id}`);
```

**Required:**
```ts
const result = await db.query(`SELECT * FROM users WHERE id = $1`, [req.params.id]);
```

This applies to all query builders, raw SQL, and ORM escape hatches.

---

## 3. Never merge user input directly into objects

**Bad:**
```ts
const config = Object.assign({}, defaults, req.body);
const obj = {}; obj[req.body.key] = req.body.value;
```

**Required:**
```ts
// Only extract the specific fields you need
const { name, email } = req.body;
const config = { ...defaults, name, email };
```

Direct spread/assign of `req.body` into objects enables prototype pollution.
SECURITY_MD_EOF

cat > "$RULES_DIR/ai-amnesia.md" << 'AI_AMNESIA_EOF'
# AI Amnesia Rules — Persistent Context via Basic Memory

**Dependency**: Basic Memory MCP must be configured in mcp.json.
If Basic Memory is not connected, this rules file has no effect.

---

## At the START of every session

Before writing any code, load project context:

```
build_context("memory://")
```

This retrieves architecture decisions, known-bad patterns, and recent work stored
from previous sessions. Do not skip this step — it prevents re-introducing patterns
that were already identified as wrong for this codebase.

---

## During the session — write to Basic Memory when you:

- Make an architectural decision (e.g., "chose Zustand over Redux because...")
- Discover a convention in this codebase (e.g., "API errors always return `{ error: string, code: number }`")
- Hit a pattern that caused a bug — write it as a known-bad pattern with the fix
- Complete a significant feature — note what was done and the key decisions made

Use:
```
write_note(title, content, folder="decisions"|"conventions"|"known-bad-patterns")
```

---

## At the END of every session

Summarize what changed in one note:

```
write_note(
  title="Session: [date] — [feature worked on]",
  content="What changed, why, and what to watch out for next session.",
  folder="sessions"
)
```
AI_AMNESIA_EOF

cat > "$RULES_DIR/code-review.md" << 'CODE_REVIEW_EOF'
# Code Review Rules — Node.js + React/Next.js

Before marking any task as done, run all of the following. A task is not complete
until all checks pass with zero errors.

---

## Required checks

**1. Lint**
```bash
npm run lint
```
Zero ESLint errors or warnings. Fix, do not suppress with `// eslint-disable`.

**2. Type check**
```bash
npm run type-check
# or if no script exists:
npx tsc --noEmit
```
Zero TypeScript errors. Never use `any` as a fix — find the correct type.

**3. No debug artifacts**
- No `console.log`, `console.error`, or `debugger` statements in production code paths.
- Exception: intentional server-side logging with a proper logger (e.g., `logger.info()`).

**4. No unused imports**
- Remove all imports that are not referenced in the file.
- TypeScript's `noUnusedLocals` will catch these — do not suppress the error.

---

## When to run tests (if test suite exists)
```bash
npm test
```
Run tests when modifying logic that has existing test coverage. Do not write new
tests unless explicitly asked — do not skip existing tests.
CODE_REVIEW_EOF

log_info "Created .kilocode/rules/ (4 files: stack.md, security.md, ai-amnesia.md, code-review.md)"

# --------------------------------------------------
# 8. Create AGENTS.md
# --------------------------------------------------
echo ""
echo "--------------------------------------------"
echo "  Step 7: Creating AGENTS.md"
echo "--------------------------------------------"

AGENTS_MD="$PROJECT_ROOT/AGENTS.md"
AGENTS_MD_CONTENT='# AGENTS.md — [Project Name]

## Stack

- **Framework**: Next.js (update version — e.g., 15.1.0)
- **React**: (update version — e.g., 19.0.0)
- **Language**: TypeScript
- **Routing**: App Router (change to "Pages Router" if using /pages directory)
- **Package manager**: npm
- **Node.js version**: 22.x LTS

## Component Pattern

- Functional components only. No class components.
- Custom hooks go in `/hooks/` or `/lib/hooks/`.

## Commands

```bash
# Development
npm run dev

# Build
npm run build

# Type check
npm run type-check

# Lint
npm run lint

# Tests (if applicable)
npm test
```

## Architecture

<!-- Fill in what makes this project different from a blank Next.js app -->

**Routing approach**: App Router (/app directory)

**State management**: [e.g., Zustand for client state | none, using Server Components only]

**Styling**: [e.g., Tailwind CSS | CSS Modules]

**Authentication**: [e.g., NextAuth.js | Clerk | none]

**Database / ORM**: [e.g., Prisma + PostgreSQL | none]

**API layer**: [e.g., Next.js Route Handlers only | tRPC]

## File Naming Conventions

- Components: PascalCase (`UserCard.tsx`)
- Utilities / hooks: camelCase (`useAuth.ts`, `formatDate.ts`)
- Route segments: kebab-case (`/app/user-profile/page.tsx`)
- Constants: UPPER_SNAKE_CASE for module-level, camelCase for local

## What Not to Touch

<!-- List files/directories the agent should never modify without explicit instruction -->
- `.env.local` — never read or modify; reference `process.env.VAR` in code only
- [Add others specific to this project]

## Known Conventions in This Codebase

<!-- Start empty. Fill in as the project evolves. Also store in Basic Memory. -->
'

if [ -f "$AGENTS_MD" ]; then
    log_warn "AGENTS.md already exists at: $AGENTS_MD"
    read -p "  Overwrite it? (y=overwrite / n=skip): " OVERWRITE_AGENTS
    if [[ "$OVERWRITE_AGENTS" =~ ^[Yy]$ ]]; then
        BACKUP_AGENTS="$AGENTS_MD.backup.$(date +%Y%m%d_%H%M%S)"
        cp "$AGENTS_MD" "$BACKUP_AGENTS"
        log_warn "Backup: $BACKUP_AGENTS"
        printf '%s' "$AGENTS_MD_CONTENT" > "$AGENTS_MD"
        log_info "Overwritten: $AGENTS_MD"
    else
        log_info "Skipping — existing AGENTS.md kept as-is"
    fi
else
    printf '%s' "$AGENTS_MD_CONTENT" > "$AGENTS_MD"
    log_info "Created: $AGENTS_MD"
fi

# --------------------------------------------------
# 9. Show results
# --------------------------------------------------
echo ""
echo "--------------------------------------------"
echo -e "  ${BOLD}Generated: $PROJECT_MCP_JSON${NC}"
echo "--------------------------------------------"
echo ""
cat "$PROJECT_MCP_JSON"

echo ""
echo "============================================"
echo -e "  ${GREEN}${BOLD}Setup Complete!${NC}"
echo "============================================"
echo ""
echo "  Project Structure:"
echo "    $PROJECT_ROOT/"
echo "    +-- .kilocode/"
echo "    |   +-- mcp.json         <- MCP config (4 tools)"
echo "    |   +-- rules/"
echo "    |       +-- stack.md"
echo "    |       +-- security.md"
echo "    |       +-- ai-amnesia.md"
echo "    |       +-- code-review.md"
echo "    +-- docs/                 <- Your project docs go here"
echo "    +-- AGENTS.md             <- Agent behavior config (edit this!)"
echo "    +-- ...                   <- Your project files"
echo ""
echo "  Binaries:"
echo "    * mcp-language-server -> $MLS_PATH"
echo "    * semgrep             -> $SEMGREP_PATH"
echo "    * basic-memory        -> $BASIC_MEMORY_PATH"
if [ "$FIGMA_DISABLED" = "false" ]; then
echo "    * figma-developer-mcp -> npx (API key configured)"
else
echo "    * figma-developer-mcp -> disabled (add API key to mcp.json to enable)"
fi
echo ""
echo "  Next Steps:"
echo "    1. source ~/.bashrc"
echo "    2. Open this project folder in VS Code / KiloCode"
echo "    3. Edit AGENTS.md — fill in your Next.js version, routing, state management"
echo "    4. Add your project docs to: $DOCS_PATH"
if [ "$FIGMA_DISABLED" = "true" ]; then
echo "    5. Optional: add Figma API key to .kilocode/mcp.json to enable Figma MCP"
fi
echo "    6. MCP servers auto-connect on first prompt!"
echo ""
````

> ⚠️ Security: Your .kilocode/rules/security.md is active every session.
> It enforces 3 rules: no hardcoded secrets, parameterized DB queries only,
> no direct req.body merges. See .kilocode/rules/security.md for details.

---

### ▶️ Step 4: Run Script

If already saved in your project:

```bash
cd /path/to/your/project
bash setup-mcp-tools.sh
```

👉 Or pass your project path directly:

```bash
bash setup-mcp-tools.sh /path/to/your/project
```

---

## 📁 Project Structure After Setup

```
your-project/
├── .kilocode/
│   ├── mcp.json          ← MCP config (4 tools)
│   └── rules/
│       ├── stack.md
│       ├── security.md
│       ├── ai-amnesia.md
│       └── code-review.md
├── docs/
├── AGENTS.md             ← Agent behavior + project context
└── your project files...
```

---

## 🚀 Start Your Agent

Open your project in VS Code and start KiloCode — everything will connect automatically.

---

## ⚙️ Agent Configuration

`AGENTS.md` is automatically created at your project root.

👉 Use this file to:

* Fill in your Next.js version and routing approach (App Router or Pages Router)
* Add your state management, styling, and auth choices
* Define project rules and what the agent should never modify

---

## ✅ Start Using

Now you can start using your setup with:

- **RAG-based workflows**  
Add your documentation, project notes, architecture details inside the `docs/` folder so the agent can read and use them while answering queries or modifying code.

  - You can include architecture explanations, system flows, and feature-level details in text format.
  - If you have diagrams (flowcharts, architecture diagrams, etc.), convert them into text (Markdown) before adding them. You can use AI tools like ChatGPT or Gemini — upload your diagram image and use the prompt provided below.
  ```text
  Convert this diagram into a clear Markdown explanation with step-by-step flow and components.
  ```

- **Agent-driven development**  
Give prompts like "analyze this codebase", "fix this bug", or "add a new feature". The agent will use MCP tools automatically to understand your project, maintain context, and assist you during development.

## Notes

- Use the `docs/` folder to enable RAG by adding documentation and references
- Do not store strict architectural rules or constraints inside `docs/`
- Always define important rules, constraints, and decisions inside `AGENTS.md`
- Edit `.kilocode/rules/stack.md` to set your routing approach (App Router vs Pages Router)
- If you skipped Figma during setup, add your API key to `.kilocode/mcp.json` under `figma-developer-mcp → env → FIGMA_API_KEY`

<p align="center">
  <strong>
    <a href="./curated-profiles.md">
      Looking for curated profiles for advanced use cases and real-world workflows?
    </a>
  </strong>
</p>
