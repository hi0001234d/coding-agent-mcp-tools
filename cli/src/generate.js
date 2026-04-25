'use strict';

const fs   = require('fs');
const path = require('path');
const { parseYaml }          = require('./parse-yaml');
const { REPO_ROOT, AGENT_DISPLAY_NAMES } = require('./config');
const { log, logSuccess, logError, logWarn, logInfo, logBold, COLORS } = require('./utils');

// ─── Agent config-directory mapping ──────────────────────────────────────────
const AGENT_DIRS = {
  kilocode:  '.kilocode',
  cline:     '.cline',
  cursor:    '.cursor',
  claude:    '.claude',
  roo:       '.roo',
  codex:     '.codex',
  opencode:  '.opencode',
  windsor:   '.windsurf',
};

// ─── OS-specific setup file names ────────────────────────────────────────────
const OS_SETUP_FILES = {
  ubuntu:  'system-setup.md',
  mac:     'macos-setup.md',
  windows: 'windows-setup.md',
};

// ─── Tool purpose descriptions ────────────────────────────────────────────────
const TOOL_PURPOSES = {
  'mcp-language-server':            'TypeScript/JS code navigation — go-to-definition, find references, diagnostics',
  'mcp-language-server + phpactor': 'PHP code navigation via phpactor — completions, go-to-definition, diagnostics',
  'Semgrep':                        'Automated security + code quality scanning every session',
  'Basic Memory':                   'Persistent project memory — agent remembers decisions across sessions',
  'Figma Context MCP':              'Design-to-code: read Figma layouts directly in your agent (optional)',
  'laravel/boost':                  'Official Laravel MCP — artisan commands, routes, models (optional)',
  'WordPress/mcp-adapter':          'WordPress MCP adapter — posts, users, plugins (optional)',
};

// ─── Helpers ──────────────────────────────────────────────────────────────────
function getAgentDir(agentName)     { return AGENT_DIRS[agentName] || `.${agentName}`; }
function getAgentDisplay(agentName) { return AGENT_DISPLAY_NAMES[agentName] || agentName; }
function toolPurpose(toolName)      { return TOOL_PURPOSES[toolName] || toolName; }

function getSectionFilename(section, os) {
  if (section === 'system-setup') return OS_SETUP_FILES[os] || 'system-setup.md';
  return `${section}.md`;
}

function readInstructions(stackKey) {
  const p = path.join(REPO_ROOT, 'base-profiles', stackKey, 'instructions.yaml');
  if (!fs.existsSync(p)) {
    logError(`instructions.yaml not found: ${p}`);
    return null;
  }
  return parseYaml(fs.readFileSync(p, 'utf8'));
}

function writeFile(filePath, content) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content, 'utf8');
}

// ─── Section 1: agent-environment-profiles.md ────────────────────────────────
function genAgentEnvironmentProfiles(stackKey, agentName, aDir, os, cfg) {
  const display  = getAgentDisplay(agentName);
  const isNode   = stackKey === 'nodejs-react';
  const slotCount = Object.keys(cfg.tool_slots).length;

  const intro = isNode
    ? `Tired of your AI agent repeating the same mistakes every session?\nHit the Day 2 wall — maintaining, debugging, or scaling your vibe-coded Next.js app?\n\nThis profile fixes both. It sets up ${slotCount} MCP tools that give your ${display} agent\npersistent memory, automated code review, and deep TypeScript/Next.js understanding\n— so you stop re-explaining your project and start shipping.`
    : `Tired of your AI agent repeating the same mistakes every session?\nHit the Day 2 wall — maintaining, debugging, or scaling your vibe-coded PHP/Laravel app?\n\nThis profile fixes both. It sets up ${slotCount} MCP tools that give your ${display} agent\npersistent memory, automated code review, and deep PHP/Laravel understanding\n— so you stop re-explaining your project and start shipping.`;

  const toolRows = Object.entries(cfg.tool_slots)
    .map(([, info], i) => `| ${i + 1} | ${info.tool} | ${toolPurpose(info.tool)} |`)
    .join('\n');

  const setupFile = OS_SETUP_FILES[os] || 'system-setup.md';
  const setupBadge = os === 'mac'
    ? `<a href="./${setupFile}">\n  <img src="https://img.shields.io/badge/🍎%20RUN%20ON%20MACOS-000000?style=for-the-badge&logo=apple&logoColor=white" />\n</a>`
    : os === 'windows'
    ? `<a href="./${setupFile}">\n  <img src="https://img.shields.io/badge/🖥️%20RUN%20ON%20WINDOWS-0078D4?style=for-the-badge&logo=windows&logoColor=white" />\n</a>`
    : `<a href="./${setupFile}">\n  <img src="https://img.shields.io/badge/🖥️%20RUN%20ON%20YOUR%20SYSTEM-6C63FF?style=for-the-badge" />\n</a>`;
  const setupDesc = os === 'mac'
    ? `<b>Run on macOS</b> — Optimized setup for Mac (Intel or Apple Silicon), best for native performance and daily development`
    : os === 'windows'
    ? `<b>Run on Windows</b> — Simple and quick setup directly on your PC, best for beginners and daily development using PowerShell/CMD`
    : `<b>Run on Your System</b> — Simple and quick setup directly on your computer, best for beginners and daily development`;

  return `# ${cfg.name} — AI Vibe Coding Setup

${intro}

---

<h2 align="center">🧭 Choose Your Environment</h2>

<p align="center">
Select how you want to run this development environment
</p>

<p align="center">

${setupBadge}

<a href="./docker-setup.md">
  <img src="https://img.shields.io/badge/🐳%20RUN%20IN%20DOCKER-2496ED?style=for-the-badge&logo=docker&logoColor=white" />
</a>

</p>

<h3 align="center">Which should you choose?</h3>

<p align="center">
${setupDesc}
</p>

<p align="center">
<b>Run in Docker</b> — Still runs on your system, but inside an isolated container, making it ideal for clean environments, testing, and experimentation
</p>

---

## 🔧 What Gets Installed

| Slot | Tool | Purpose |
|---|---|---|
${toolRows}

---

## 🚀 Advanced Workflows

<p align="center">
  <strong><a href="./project-memory.md">🧠 Stop AI Amnesia — Persistent Memory Setup</a></strong>
</p>

<p align="center">
  <strong><a href="./debug-automation.md">🐛 Fix the Day 2 Problem — Debug + Review Workflow</a></strong>
</p>

<p align="center">
  <strong><a href="./curated-profiles.md">⚡ Curated Profiles for Real-World Workflows</a></strong>
</p>

<p align="center">
  <strong><a href="./optimize-tokens.md">💡 Optimize Token Usage for Large Codebases</a></strong>
</p>

<p align="center">
  <strong><a href="./fully-local.md">🔒 Fully Local Setup — No API Calls, Privacy-First</a></strong>
</p>
`;
}

// ─── Section 2: system-setup.md ──────────────────────────────────────────────

function systemSetupScript_Ubuntu_Node(aDir, display) {
  return `#!/bin/bash

# ============================================================
#  MCP Tools Installer + ${display} Project-Level MCP Setup
#  Node.js + React/Next.js Profile
#
#  Installs: mcp-language-server, semgrep, basic-memory,
#            figma-developer-mcp (optional)
#  Configures: <project-root>/${aDir}/mcp.json
#              <project-root>/${aDir}/rules/ (4 files)
#  Creates:    <project-root>/AGENTS.md
#
#  Usage:
#    cd /path/to/your/project && bash setup-mcp-tools.sh
#    bash setup-mcp-tools.sh /path/to/your/project
# ============================================================

GREEN='\\033[0;32m'; YELLOW='\\033[1;33m'; RED='\\033[0;31m'; CYAN='\\033[0;36m'; BOLD='\\033[1m'; NC='\\033[0m'
log_info()  { echo -e "\${GREEN}[✔] \$1\${NC}"; }
log_warn()  { echo -e "\${YELLOW}[⚠] \$1\${NC}"; }
log_error() { echo -e "\${RED}[✘] \$1\${NC}"; }
log_ask()   { echo -e "\${CYAN}[?] \$1\${NC}"; }

echo ""; echo "============================================"
echo "  MCP Tools Installer + ${display} Setup"
echo "  Node.js + React/Next.js Profile"
echo "============================================"; echo ""

USER_HOME="\$HOME"; USERNAME="\$(whoami)"
[ -n "\$1" ] && PROJECT_ROOT="\${1/#~/$USER_HOME}" || PROJECT_ROOT="\$(pwd)"

if [ "\$PROJECT_ROOT" = "\$USER_HOME" ] || [ "\$PROJECT_ROOT" = "/" ]; then
  log_error "Don't run from home (~) or root (/)."
  echo "  bash setup-mcp-tools.sh /home/\$USERNAME/projects/my-app"; exit 1
fi

log_info "User:    \$USERNAME"; log_info "Home:    \$USER_HOME"
echo -e "\${BOLD}\${CYAN}[->] Project: \$PROJECT_ROOT\${NC}"; echo ""
read -p "  Is this your project root? (y/n): " CONFIRM
if [[ ! "\$CONFIRM" =~ ^[Yy]\$ ]]; then
  log_ask "Enter project root:"; read -p "  Path: " PROJECT_ROOT
  PROJECT_ROOT="\${PROJECT_ROOT/#~/$USER_HOME}"
fi

if [ ! -d "\$PROJECT_ROOT" ]; then
  log_warn "'\$PROJECT_ROOT' does not exist."
  read -p "  Create it? (y/n): " CD
  [[ "\$CD" =~ ^[Yy]\$ ]] && mkdir -p "\$PROJECT_ROOT" && log_info "Created" || { log_error "Exiting."; exit 1; }
fi
DOCS_PATH="\$PROJECT_ROOT/docs"; mkdir -p "\$DOCS_PATH"

# PATH setup
mkdir -p "\$USER_HOME/.local/bin"
[[ ":\$PATH:" != *":\$USER_HOME/.local/bin:"* ]] && echo 'export PATH=\$HOME/.local/bin:\$PATH' >> "\$USER_HOME/.bashrc" && export PATH="\$USER_HOME/.local/bin:\$PATH"

# ── Step 1: Go + mcp-language-server + TypeScript LSP ────────────────────────
echo ""; echo "--------------------------------------------"; echo "  Step 1: mcp-language-server"; echo "--------------------------------------------"
GO_VERSION="1.23.0"
if ! command -v go &> /dev/null; then
  log_info "Installing Go \$GO_VERSION..."
  wget -q "https://go.dev/dl/go\${GO_VERSION}.linux-amd64.tar.gz" -O /tmp/go.tar.gz
  sudo rm -rf /usr/local/go && sudo tar -C /usr/local -xzf /tmp/go.tar.gz && rm /tmp/go.tar.gz
  echo 'export PATH=\$PATH:/usr/local/go/bin:\$HOME/go/bin' >> "\$USER_HOME/.bashrc"
  export PATH=\$PATH:/usr/local/go/bin:\$USER_HOME/go/bin
  log_info "Go \$GO_VERSION installed"
else
  log_info "Go already installed: \$(go version)"
  [[ ":\$PATH:" != *":\$USER_HOME/go/bin:"* ]] && export PATH=\$PATH:\$USER_HOME/go/bin
fi

log_info "Installing mcp-language-server..."
go install github.com/isaacphi/mcp-language-server@latest
MLS_PATH="\$USER_HOME/go/bin/mcp-language-server"
[ ! -f "\$MLS_PATH" ] && { log_error "mcp-language-server install failed"; MLS_PATH="mcp-language-server"; } || log_info "mcp-language-server: \$MLS_PATH"

log_info "Installing typescript-language-server..."
npm install -g typescript typescript-language-server --quiet && log_info "typescript-language-server ready"

# ── Step 2: Semgrep ──────────────────────────────────────────────────────────
echo ""; echo "--------------------------------------------"; echo "  Step 2: Semgrep"; echo "--------------------------------------------"
! command -v pip3 &> /dev/null && { sudo apt update -qq; sudo apt install -y -qq python3-pip > /dev/null 2>&1; }
pip3 install semgrep --quiet
SEMGREP_PATH=\$(which semgrep 2>/dev/null || echo "semgrep")
command -v semgrep &> /dev/null && log_info "semgrep: \$SEMGREP_PATH" || { log_error "semgrep install failed"; SEMGREP_PATH="semgrep"; }

# ── Step 3: Basic Memory ─────────────────────────────────────────────────────
echo ""; echo "--------------------------------------------"; echo "  Step 3: basic-memory"; echo "--------------------------------------------"
if ! command -v uv &> /dev/null; then
  log_info "Installing uv..."; curl -LsSf https://astral.sh/uv/install.sh | sh
  [ -f "\$USER_HOME/.local/bin/env" ] && source "\$USER_HOME/.local/bin/env"
  export PATH="\$USER_HOME/.local/bin:\$PATH"
fi
grep -q 'export TMPDIR=/tmp' "\$USER_HOME/.bashrc" 2>/dev/null || echo 'export TMPDIR=/tmp' >> "\$USER_HOME/.bashrc"
export TMPDIR=/tmp
uv tool install --force basic-memory 2>&1 | tail -5
BASIC_MEMORY_PATH=""
UV_DIR=\$(uv tool dir 2>/dev/null)
[ -n "\$UV_DIR" ] && [ -f "\$UV_DIR/basic-memory/bin/basic-memory" ] && BASIC_MEMORY_PATH="\$UV_DIR/basic-memory/bin/basic-memory"
[ -z "\$BASIC_MEMORY_PATH" ] && { C="\$USER_HOME/.local/share/uv/tools/basic-memory/bin/basic-memory"; [ -f "\$C" ] && BASIC_MEMORY_PATH="\$C"; }
[ -z "\$BASIC_MEMORY_PATH" ] && BASIC_MEMORY_PATH=\$(which basic-memory 2>/dev/null || echo "")
[ -z "\$BASIC_MEMORY_PATH" ] && BASIC_MEMORY_PATH=\$(find "\$USER_HOME/.local" -name "basic-memory" -type f 2>/dev/null | head -1)
[ -z "\$BASIC_MEMORY_PATH" ] && { log_error "basic-memory not found"; BASIC_MEMORY_PATH="\$USER_HOME/.local/share/uv/tools/basic-memory/bin/basic-memory"; } || log_info "basic-memory: \$BASIC_MEMORY_PATH"

# ── Step 4: Figma Context MCP (optional) ─────────────────────────────────────
echo ""; echo "--------------------------------------------"; echo "  Step 4: Figma Context MCP (Optional)"; echo "--------------------------------------------"; echo ""
log_ask "Figma API key — enables design-to-code (Slot 4)"
log_warn "Press Enter to skip. Add key to ${aDir}/mcp.json later."; echo ""
read -p "  Figma API Key (optional): " FIGMA_API_KEY
if [ -n "\$FIGMA_API_KEY" ]; then log_info "Figma key recorded"; FIGMA_DISABLED="false"
else log_warn "Skipping Figma"; FIGMA_API_KEY="YOUR-FIGMA-API-KEY"; FIGMA_DISABLED="true"; fi

# ── Step 5: Write ${aDir}/mcp.json ──────────────────────────────────────────
echo ""; echo "--------------------------------------------"; echo "  Step 5: ${display} mcp.json"; echo "--------------------------------------------"
PROJECT_AGENT_DIR="\$PROJECT_ROOT/${aDir}"; PROJECT_MCP_JSON="\$PROJECT_AGENT_DIR/mcp.json"
mkdir -p "\$PROJECT_AGENT_DIR"
[ -f "\$PROJECT_MCP_JSON" ] && cp "\$PROJECT_MCP_JSON" "\$PROJECT_MCP_JSON.backup.\$(date +%Y%m%d_%H%M%S)" && log_warn "Backup created"

cat > "\$PROJECT_MCP_JSON" << MCPEOF
{
  "mcpServers": {
    "language-server": {
      "command": "\$MLS_PATH",
      "args": ["--workspace", "\$PROJECT_ROOT/", "--lsp", "typescript-language-server", "--", "--stdio"]
    },
    "semgrep": { "command": "\$SEMGREP_PATH", "args": ["mcp"] },
    "basic-memory": { "command": "\$BASIC_MEMORY_PATH", "args": ["mcp", "--path", "\$DOCS_PATH"] },
    "figma-developer-mcp": {
      "command": "npx", "args": ["-y", "figma-developer-mcp", "--stdio"],
      "env": { "FIGMA_API_KEY": "\$FIGMA_API_KEY" }, "disabled": \$FIGMA_DISABLED
    }
  }
}
MCPEOF
log_info "Written: \$PROJECT_MCP_JSON"

echo ""; echo -e "\${YELLOW}⚠️  Security: ${aDir}/rules/security.md enforces no hardcoded secrets | parameterized queries | no req.body spread\${NC}"

# ── Step 6: Create ${aDir}/rules/ ───────────────────────────────────────────
echo ""; echo "--------------------------------------------"; echo "  Step 6: ${display} rules/"; echo "--------------------------------------------"
RULES_DIR="\$PROJECT_AGENT_DIR/rules"; mkdir -p "\$RULES_DIR"

cat > "\$RULES_DIR/stack.md" << 'STACKEOF'
# Stack Rules — Node.js + React/Next.js
## Language
- Always use TypeScript. Never create plain .js files in a TypeScript project.
- Use .tsx for React components, .ts for utilities and API routes.
## Routing
<!-- CUSTOMIZE: App Router or Pages Router -->
- Default: App Router (Next.js 13+, /app directory)
## Imports
- Always use absolute imports via tsconfig paths (@/components/, @/lib/).
- Never use relative imports going up more than one level (../../).
## Package Manager
<!-- CUSTOMIZE: npm / pnpm / yarn based on project lockfile -->
- Default: npm
## Server vs Client Components (App Router)
- Default to Server Components. Add "use client" only for browser APIs, event listeners, or React hooks.
STACKEOF

cat > "\$RULES_DIR/security.md" << 'SECEOF'
# Security Rules — Node.js + React/Next.js
## 1. Never hardcode secrets
Bad:  const client = new OpenAI({ apiKey: "sk-proj-abc123" })
Good: const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
All secrets in .env.local (never committed). Never log process.env values.
## 2. Parameterize database queries
Bad:  db.query(\`SELECT * FROM users WHERE id = \${req.params.id}\`)
Good: db.query("SELECT * FROM users WHERE id = \$1", [req.params.id])
## 3. Never spread req.body into objects
Bad:  const config = Object.assign({}, defaults, req.body)
Good: const { name, email } = req.body; const config = { ...defaults, name, email }
SECEOF

cat > "\$RULES_DIR/ai-amnesia.md" << 'AMNESIAEOF'
# AI Amnesia Rules — Persistent Context via Basic Memory
Dependency: Basic Memory MCP must be configured in mcp.json.
## Start of every session
Run before writing any code: build_context("memory://")
## During session — write to memory when you:
- Make an architectural decision
- Discover a codebase convention
- Hit a pattern that caused a bug
- Complete a significant feature
Use: write_note(title, content, folder="decisions"|"conventions"|"known-bad-patterns")
## End of session
write_note("Session: [date] — [feature]", "What changed, decisions made, what to watch next session.", folder="sessions")
AMNESIAEOF

cat > "\$RULES_DIR/code-review.md" << 'REVIEWEOF'
# Code Review Rules — Node.js + React/Next.js
Task is not complete until all checks pass with zero errors.
## Required checks
1. Lint:       npm run lint              — zero ESLint errors. Fix, do not suppress.
2. Type check: npx tsc --noEmit          — zero TypeScript errors. Never use any as a fix.
3. No debug:   no console.log, debugger in production code paths.
4. No unused:  remove all unreferenced imports.
## Tests (when test suite exists)
Run: npm test — when modifying logic that has existing coverage. Do not skip tests.
REVIEWEOF

log_info "Created ${aDir}/rules/ (4 files)"

# ── Step 7: AGENTS.md ────────────────────────────────────────────────────────
echo ""; echo "--------------------------------------------"; echo "  Step 7: AGENTS.md"; echo "--------------------------------------------"
AGENTS_MD="\$PROJECT_ROOT/AGENTS.md"
AGENTS_CONTENT='# AGENTS.md — [Project Name]
## Stack
- Framework: Next.js (fill in version, e.g. 15.1.0)
- React: (fill in version, e.g. 19.0.0)
- Language: TypeScript
- Routing: App Router  <!-- change to Pages Router if using /pages -->
- Package manager: npm
- Node.js: 22.x LTS
## Commands
\`\`\`
npm run dev        # development server
npm run build      # production build
npm run type-check # or npx tsc --noEmit
npm run lint
npm test
\`\`\`
## Architecture
- Routing: App Router (/app directory)
- State:   [e.g., Zustand | none]
- Styling: [e.g., Tailwind CSS]
- Auth:    [e.g., NextAuth.js | none]
- DB/ORM:  [e.g., Prisma + PostgreSQL | none]
## What Not to Touch
- .env.local — never read or modify
## Known Conventions
<!-- Start empty. Fill as project evolves. Also store in Basic Memory. -->
'
if [ -f "\$AGENTS_MD" ]; then
  read -p "  AGENTS.md exists. Overwrite? (y/n): " OV
  if [[ "\$OV" =~ ^[Yy]\$ ]]; then
    cp "\$AGENTS_MD" "\$AGENTS_MD.backup.\$(date +%Y%m%d_%H%M%S)"
    printf '%s' "\$AGENTS_CONTENT" > "\$AGENTS_MD" && log_info "Overwritten: AGENTS.md"
  else log_info "Kept existing AGENTS.md"; fi
else printf '%s' "\$AGENTS_CONTENT" > "\$AGENTS_MD" && log_info "Created: AGENTS.md"; fi

# ── Done ─────────────────────────────────────────────────────────────────────
echo ""; echo "============================================"; echo -e "  \${GREEN}\${BOLD}Setup Complete!\${NC}"; echo "============================================"
echo ""; echo "  \$PROJECT_ROOT/"
echo "    ├── ${aDir}/mcp.json       ← MCP config (4 tools)"
echo "    ├── ${aDir}/rules/         ← 4 rules files"
echo "    ├── docs/                  ← Add your project docs here"
echo "    └── AGENTS.md             ← Edit this!"
echo ""; echo "  Binaries:"
echo "    mcp-language-server → \$MLS_PATH"
echo "    semgrep             → \$SEMGREP_PATH"
echo "    basic-memory        → \$BASIC_MEMORY_PATH"
[ "\$FIGMA_DISABLED" = "false" ] && echo "    figma-developer-mcp → npx (key configured)" || echo "    figma-developer-mcp → disabled (add key to ${aDir}/mcp.json)"
echo ""; echo "  Next Steps:"
echo "    1. source ~/.bashrc"
echo "    2. Open project in VS Code / ${display}"
echo "    3. Edit AGENTS.md — fill in your Next.js version, routing, state management"
echo "    4. Add project docs to: \$DOCS_PATH"
[ "\$FIGMA_DISABLED" = "true" ] && echo "    5. Optional: add Figma API key to ${aDir}/mcp.json"
echo "    6. MCP servers auto-connect on first prompt!"`;
}

function systemSetupScript_Ubuntu_PHP(aDir, display) {
  return `#!/bin/bash

# ============================================================
#  MCP Tools Installer + ${display} Project-Level MCP Setup
#  PHP + Laravel/WP Profile
#
#  Installs: mcp-language-server + phpactor, semgrep, basic-memory
#            laravel/boost & wordpress-mcp-adapter (disabled by default)
#  Configures: <project-root>/${aDir}/mcp.json
#              <project-root>/${aDir}/rules/ (4 files)
#  Creates:    <project-root>/AGENTS.md
#
#  Usage:
#    cd /path/to/your/project && bash setup-mcp-tools.sh
#    bash setup-mcp-tools.sh /path/to/your/project
# ============================================================

GREEN='\\033[0;32m'; YELLOW='\\033[1;33m'; RED='\\033[0;31m'; CYAN='\\033[0;36m'; BOLD='\\033[1m'; NC='\\033[0m'
log_info()  { echo -e "\${GREEN}[✔] \$1\${NC}"; }
log_warn()  { echo -e "\${YELLOW}[⚠] \$1\${NC}"; }
log_error() { echo -e "\${RED}[✘] \$1\${NC}"; }
log_ask()   { echo -e "\${CYAN}[?] \$1\${NC}"; }

echo ""; echo "============================================"
echo "  MCP Tools Installer + ${display} Setup"
echo "  PHP + Laravel/WP Profile"
echo "============================================"; echo ""

USER_HOME="\$HOME"; USERNAME="\$(whoami)"
[ -n "\$1" ] && PROJECT_ROOT="\${1/#~/$USER_HOME}" || PROJECT_ROOT="\$(pwd)"

if [ "\$PROJECT_ROOT" = "\$USER_HOME" ] || [ "\$PROJECT_ROOT" = "/" ]; then
  log_error "Don't run from home (~) or root (/)."; exit 1
fi

log_info "User:    \$USERNAME"; log_info "Home:    \$USER_HOME"
echo -e "\${BOLD}\${CYAN}[->] Project: \$PROJECT_ROOT\${NC}"; echo ""
read -p "  Is this your project root? (y/n): " CONFIRM
if [[ ! "\$CONFIRM" =~ ^[Yy]\$ ]]; then
  read -p "  Path: " PROJECT_ROOT; PROJECT_ROOT="\${PROJECT_ROOT/#~/$USER_HOME}"
fi
if [ ! -d "\$PROJECT_ROOT" ]; then
  read -p "  Create it? (y/n): " CD
  [[ "\$CD" =~ ^[Yy]\$ ]] && mkdir -p "\$PROJECT_ROOT" || { log_error "Exiting."; exit 1; }
fi
DOCS_PATH="\$PROJECT_ROOT/docs"; mkdir -p "\$DOCS_PATH"

mkdir -p "\$USER_HOME/.local/bin"
[[ ":\$PATH:" != *":\$USER_HOME/.local/bin:"* ]] && echo 'export PATH=\$HOME/.local/bin:\$PATH' >> "\$USER_HOME/.bashrc" && export PATH="\$USER_HOME/.local/bin:\$PATH"

# ── Step 1: Go + mcp-language-server + phpactor ──────────────────────────────
echo ""; echo "--------------------------------------------"; echo "  Step 1: mcp-language-server + phpactor"; echo "--------------------------------------------"
if ! command -v go &> /dev/null; then
  log_info "Installing Go 1.23.0..."
  wget -q "https://go.dev/dl/go1.23.0.linux-amd64.tar.gz" -O /tmp/go.tar.gz
  sudo rm -rf /usr/local/go && sudo tar -C /usr/local -xzf /tmp/go.tar.gz && rm /tmp/go.tar.gz
  echo 'export PATH=\$PATH:/usr/local/go/bin:\$HOME/go/bin' >> "\$USER_HOME/.bashrc"
  export PATH=\$PATH:/usr/local/go/bin:\$USER_HOME/go/bin
else
  log_info "Go already installed: \$(go version)"
  [[ ":\$PATH:" != *":\$USER_HOME/go/bin:"* ]] && export PATH=\$PATH:\$USER_HOME/go/bin
fi
go install github.com/isaacphi/mcp-language-server@latest
MLS_PATH="\$USER_HOME/go/bin/mcp-language-server"
[ ! -f "\$MLS_PATH" ] && { log_error "mcp-language-server failed"; MLS_PATH="mcp-language-server"; } || log_info "mcp-language-server: \$MLS_PATH"

# Install phpactor via composer
if ! command -v composer &> /dev/null; then
  log_info "Installing Composer..."
  curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
fi
log_info "Installing phpactor via composer..."
composer global require phpactor/phpactor --quiet
PHPACTOR_PATH="\$(composer global config home 2>/dev/null)/vendor/bin/phpactor"
[ -z "\$PHPACTOR_PATH" ] && PHPACTOR_PATH="\$USER_HOME/.composer/vendor/bin/phpactor"
[ -f "\$PHPACTOR_PATH" ] && log_info "phpactor: \$PHPACTOR_PATH" || { log_error "phpactor not found"; PHPACTOR_PATH="phpactor"; }

# ── Step 2: Semgrep ──────────────────────────────────────────────────────────
echo ""; echo "--------------------------------------------"; echo "  Step 2: Semgrep"; echo "--------------------------------------------"
! command -v pip3 &> /dev/null && { sudo apt update -qq; sudo apt install -y -qq python3-pip > /dev/null 2>&1; }
pip3 install semgrep --quiet
SEMGREP_PATH=\$(which semgrep 2>/dev/null || echo "semgrep")
command -v semgrep &> /dev/null && log_info "semgrep: \$SEMGREP_PATH" || { log_error "semgrep failed"; SEMGREP_PATH="semgrep"; }

# ── Step 3: Basic Memory ─────────────────────────────────────────────────────
echo ""; echo "--------------------------------------------"; echo "  Step 3: basic-memory"; echo "--------------------------------------------"
if ! command -v uv &> /dev/null; then
  curl -LsSf https://astral.sh/uv/install.sh | sh
  [ -f "\$USER_HOME/.local/bin/env" ] && source "\$USER_HOME/.local/bin/env"
  export PATH="\$USER_HOME/.local/bin:\$PATH"
fi
grep -q 'export TMPDIR=/tmp' "\$USER_HOME/.bashrc" 2>/dev/null || echo 'export TMPDIR=/tmp' >> "\$USER_HOME/.bashrc"
export TMPDIR=/tmp
uv tool install --force basic-memory 2>&1 | tail -5
BASIC_MEMORY_PATH=""
UV_DIR=\$(uv tool dir 2>/dev/null)
[ -n "\$UV_DIR" ] && [ -f "\$UV_DIR/basic-memory/bin/basic-memory" ] && BASIC_MEMORY_PATH="\$UV_DIR/basic-memory/bin/basic-memory"
[ -z "\$BASIC_MEMORY_PATH" ] && { C="\$USER_HOME/.local/share/uv/tools/basic-memory/bin/basic-memory"; [ -f "\$C" ] && BASIC_MEMORY_PATH="\$C"; }
[ -z "\$BASIC_MEMORY_PATH" ] && BASIC_MEMORY_PATH=\$(which basic-memory 2>/dev/null || find "\$USER_HOME/.local" -name "basic-memory" -type f 2>/dev/null | head -1)
[ -z "\$BASIC_MEMORY_PATH" ] && { log_error "basic-memory not found"; BASIC_MEMORY_PATH="\$USER_HOME/.local/share/uv/tools/basic-memory/bin/basic-memory"; } || log_info "basic-memory: \$BASIC_MEMORY_PATH"

# ── Step 4: Write ${aDir}/mcp.json ──────────────────────────────────────────
echo ""; echo "--------------------------------------------"; echo "  Step 4: ${display} mcp.json"; echo "--------------------------------------------"
PROJECT_AGENT_DIR="\$PROJECT_ROOT/${aDir}"; PROJECT_MCP_JSON="\$PROJECT_AGENT_DIR/mcp.json"
mkdir -p "\$PROJECT_AGENT_DIR"
[ -f "\$PROJECT_MCP_JSON" ] && cp "\$PROJECT_MCP_JSON" "\$PROJECT_MCP_JSON.backup.\$(date +%Y%m%d_%H%M%S)"

cat > "\$PROJECT_MCP_JSON" << MCPEOF
{
  "mcpServers": {
    "language-server": {
      "command": "\$MLS_PATH",
      "args": ["--workspace", "\$PROJECT_ROOT/", "--lsp", "\$PHPACTOR_PATH", "--lsp-args", "--tcp=0", "--", "--stdio"]
    },
    "semgrep": { "command": "\$SEMGREP_PATH", "args": ["mcp"] },
    "basic-memory": { "command": "\$BASIC_MEMORY_PATH", "args": ["mcp", "--path", "\$DOCS_PATH"] },
    "laravel-boost": {
      "command": "php", "args": ["artisan", "mcp:serve"],
      "disabled": true
    },
    "wordpress-mcp-adapter": {
      "command": "npx", "args": ["-y", "@wordpress/mcp-adapter", "--stdio"],
      "disabled": true
    }
  }
}
MCPEOF
log_info "Written: \$PROJECT_MCP_JSON"

echo ""; echo -e "\${YELLOW}⚠️  Security: ${aDir}/rules/security.md enforces no hardcoded secrets | parameterized queries\${NC}"
echo "    Enable laravel-boost or wordpress-mcp-adapter in mcp.json when needed."

# ── Step 5: Create ${aDir}/rules/ ───────────────────────────────────────────
echo ""; echo "--------------------------------------------"; echo "  Step 5: ${display} rules/"; echo "--------------------------------------------"
RULES_DIR="\$PROJECT_AGENT_DIR/rules"; mkdir -p "\$RULES_DIR"

cat > "\$RULES_DIR/stack.md" << 'STACKEOF'
# Stack Rules — PHP + Laravel/WP
## Language
- PHP 8.x with declare(strict_types=1) in all files.
- Use typed properties, match expressions, nullsafe operator (?->).
- Follow PSR-12 coding standard.
## Laravel Conventions
- Use Eloquent ORM — no raw DB queries unless truly necessary.
- Use Artisan commands for code generation (make:model, make:controller, etc).
- Fat models, thin controllers.
- Use Form Requests for input validation.
## Package Manager
- Composer for PHP. npm/pnpm for frontend assets.
## WordPress (if applicable)
- Use WP_Query, get_posts() — never raw $wpdb unless required.
- Sanitize inputs: sanitize_text_field(), esc_html(), etc.
STACKEOF

cat > "\$RULES_DIR/security.md" << 'SECEOF'
# Security Rules — PHP + Laravel/WP
## 1. Never hardcode credentials
Bad:  $db = new PDO("mysql:host=localhost", "root", "password123")
Good: $db = new PDO(env('DB_HOST'), env('DB_USER'), env('DB_PASS'))
All credentials in .env (never committed). Never log env values.
## 2. Parameterize all queries
Bad:  DB::select("SELECT * FROM users WHERE id = " . $id)
Good: DB::select("SELECT * FROM users WHERE id = ?", [$id])
Use Eloquent or parameterized query builders always.
## 3. Validate and sanitize all input
Bad:  $name = $_POST['name']
Good: $name = $request->validated()['name']
Use Laravel Form Request validation or WordPress sanitize_* helpers.
SECEOF

cat > "\$RULES_DIR/ai-amnesia.md" << 'AMNESIAEOF'
# AI Amnesia Rules — Persistent Context via Basic Memory
Dependency: Basic Memory MCP must be configured in mcp.json.
## Start of every session
Run before writing any code: build_context("memory://")
## During session — write to memory when you:
- Make an architectural decision (e.g., "using Repository pattern because...")
- Discover a convention (e.g., "controllers return Resource objects here")
- Hit a bug pattern — write it as known-bad with the fix
- Complete a feature — note decisions made
Use: write_note(title, content, folder="decisions"|"conventions"|"known-bad-patterns")
## End of session
write_note("Session: [date] — [feature]", "What changed and what to watch next session.", folder="sessions")
AMNESIAEOF

cat > "\$RULES_DIR/code-review.md" << 'REVIEWEOF'
# Code Review Rules — PHP + Laravel/WP
Task is not complete until all checks pass.
## Required checks
1. Static analysis: ./vendor/bin/phpstan analyse — zero errors (level 5+).
2. Code style:      ./vendor/bin/pint (Laravel Pint) or phpcs — PSR-12 compliant.
3. Tests:           php artisan test — all existing tests pass.
4. No debug:        no dd(), dump(), var_dump() in production paths.
5. No unused:       remove all unused use statements and variables.
REVIEWEOF

log_info "Created ${aDir}/rules/ (4 files)"

# ── Step 6: AGENTS.md ────────────────────────────────────────────────────────
echo ""; echo "--------------------------------------------"; echo "  Step 6: AGENTS.md"; echo "--------------------------------------------"
AGENTS_MD="\$PROJECT_ROOT/AGENTS.md"
AGENTS_CONTENT='# AGENTS.md — [Project Name]
## Stack
- Framework: Laravel (fill in version, e.g. 11.x)
- PHP: (fill in version, e.g. 8.3)
- Package manager: Composer + npm
- Database: [e.g., MySQL 8 | PostgreSQL]
## Commands
\`\`\`
php artisan serve          # development server
php artisan test           # run tests
./vendor/bin/phpstan analyse
./vendor/bin/pint          # code style fix
composer install
npm run dev
\`\`\`
## Architecture
- Pattern: MVC (fat models, thin controllers)
- ORM: Eloquent
- API: [e.g., REST with Resources | none]
- Auth: [e.g., Laravel Sanctum | Breeze | none]
- Queue: [e.g., Redis | database | none]
## What Not to Touch
- .env — never read or modify directly
## Known Conventions
<!-- Start empty. Fill as project evolves. Also store in Basic Memory. -->
'
if [ -f "\$AGENTS_MD" ]; then
  read -p "  AGENTS.md exists. Overwrite? (y/n): " OV
  if [[ "\$OV" =~ ^[Yy]\$ ]]; then
    cp "\$AGENTS_MD" "\$AGENTS_MD.backup.\$(date +%Y%m%d_%H%M%S)"
    printf '%s' "\$AGENTS_CONTENT" > "\$AGENTS_MD" && log_info "Overwritten: AGENTS.md"
  fi
else printf '%s' "\$AGENTS_CONTENT" > "\$AGENTS_MD" && log_info "Created: AGENTS.md"; fi

echo ""; echo "============================================"; echo -e "  \${GREEN}\${BOLD}Setup Complete!\${NC}"; echo "============================================"
echo ""; echo "  \$PROJECT_ROOT/"
echo "    ├── ${aDir}/mcp.json  ← MCP config"
echo "    ├── ${aDir}/rules/    ← 4 rules files"
echo "    ├── docs/             ← Add project docs here"
echo "    └── AGENTS.md        ← Edit this!"
echo ""; echo "  Binaries:"
echo "    mcp-language-server → \$MLS_PATH"
echo "    phpactor             → \$PHPACTOR_PATH"
echo "    semgrep              → \$SEMGREP_PATH"
echo "    basic-memory         → \$BASIC_MEMORY_PATH"
echo ""; echo "  Next Steps:"
echo "    1. source ~/.bashrc"
echo "    2. Open project in VS Code / ${display}"
echo "    3. Edit AGENTS.md — fill in your Laravel version, DB, auth"
echo "    4. Enable laravel-boost in ${aDir}/mcp.json when ready"
echo "    5. MCP servers auto-connect on first prompt!"`;
}

function systemSetupScript_Mac_Node(aDir, display) {
  return `#!/bin/bash

# ============================================================
#  MCP Tools Installer + ${display} — macOS
#  Node.js + React/Next.js Profile
# ============================================================

GREEN='\\033[0;32m'; YELLOW='\\033[1;33m'; RED='\\033[0;31m'; CYAN='\\033[0;36m'; BOLD='\\033[1m'; NC='\\033[0m'
log_info()  { echo -e "\${GREEN}[✔] \$1\${NC}"; }
log_warn()  { echo -e "\${YELLOW}[⚠] \$1\${NC}"; }
log_error() { echo -e "\${RED}[✘] \$1\${NC}"; }

echo ""; echo "============================================"
echo "  MCP Tools Installer + ${display} Setup"
echo "  Node.js + React/Next.js Profile (macOS)"
echo "============================================"; echo ""

USER_HOME="\$HOME"; USERNAME="\$(whoami)"
[ -n "\$1" ] && PROJECT_ROOT="\${1/#~/$USER_HOME}" || PROJECT_ROOT="\$(pwd)"

log_info "User:    \$USERNAME"
echo -e "\${BOLD}\${CYAN}[->] Project: \$PROJECT_ROOT\${NC}"; echo ""
read -p "  Is this your project root? (y/n): " CONFIRM
[[ ! "\$CONFIRM" =~ ^[Yy]\$ ]] && read -p "  Path: " PROJECT_ROOT

if [ ! -d "\$PROJECT_ROOT" ]; then
  read -p "  Create it? (y/n): " CD
  [[ "\$CD" =~ ^[Yy]\$ ]] && mkdir -p "\$PROJECT_ROOT" || { log_error "Exiting."; exit 1; }
fi
DOCS_PATH="\$PROJECT_ROOT/docs"; mkdir -p "\$DOCS_PATH"

SHELL_RC="\$USER_HOME/.zshrc"
[ -n "\$BASH_VERSION" ] && SHELL_RC="\$USER_HOME/.bashrc"

# ── Step 1: Go + mcp-language-server + TypeScript LSP ────────────────────────
echo ""; echo "--------------------------------------------"; echo "  Step 1: mcp-language-server"; echo "--------------------------------------------"
if ! command -v go &> /dev/null; then
  if command -v brew &> /dev/null; then
    log_info "Installing Go via Homebrew..."; brew install go --quiet
  else
    log_info "Installing Go 1.23.0 (direct download)..."
    curl -sSL "https://go.dev/dl/go1.23.0.darwin-amd64.tar.gz" -o /tmp/go.tar.gz
    sudo rm -rf /usr/local/go && sudo tar -C /usr/local -xzf /tmp/go.tar.gz && rm /tmp/go.tar.gz
    echo 'export PATH=\$PATH:/usr/local/go/bin' >> "\$SHELL_RC"
    export PATH=\$PATH:/usr/local/go/bin
  fi
else log_info "Go already installed: \$(go version)"; fi

[[ ":\$PATH:" != *":\$USER_HOME/go/bin:"* ]] && echo 'export PATH=\$PATH:\$HOME/go/bin' >> "\$SHELL_RC" && export PATH=\$PATH:\$USER_HOME/go/bin
go install github.com/isaacphi/mcp-language-server@latest
MLS_PATH="\$USER_HOME/go/bin/mcp-language-server"
[ ! -f "\$MLS_PATH" ] && { log_error "mcp-language-server failed"; MLS_PATH="mcp-language-server"; } || log_info "mcp-language-server: \$MLS_PATH"

npm install -g typescript typescript-language-server --quiet && log_info "typescript-language-server ready"

# ── Step 2: Semgrep ──────────────────────────────────────────────────────────
echo ""; echo "--------------------------------------------"; echo "  Step 2: Semgrep"; echo "--------------------------------------------"
if command -v brew &> /dev/null && ! command -v semgrep &> /dev/null; then
  brew install semgrep --quiet
elif ! command -v semgrep &> /dev/null; then
  pip3 install semgrep --quiet
fi
SEMGREP_PATH=\$(which semgrep 2>/dev/null || echo "semgrep"); log_info "semgrep: \$SEMGREP_PATH"

# ── Step 3: Basic Memory ─────────────────────────────────────────────────────
echo ""; echo "--------------------------------------------"; echo "  Step 3: basic-memory"; echo "--------------------------------------------"
if ! command -v uv &> /dev/null; then
  command -v brew &> /dev/null && brew install uv --quiet || curl -LsSf https://astral.sh/uv/install.sh | sh
  export PATH="\$USER_HOME/.local/bin:\$PATH"
fi
export TMPDIR=/tmp
uv tool install --force basic-memory 2>&1 | tail -3
BASIC_MEMORY_PATH=\$(which basic-memory 2>/dev/null || find "\$USER_HOME/.local" -name "basic-memory" -type f 2>/dev/null | head -1)
UV_DIR=\$(uv tool dir 2>/dev/null)
[ -z "\$BASIC_MEMORY_PATH" ] && [ -n "\$UV_DIR" ] && [ -f "\$UV_DIR/basic-memory/bin/basic-memory" ] && BASIC_MEMORY_PATH="\$UV_DIR/basic-memory/bin/basic-memory"
[ -z "\$BASIC_MEMORY_PATH" ] && BASIC_MEMORY_PATH="\$USER_HOME/.local/share/uv/tools/basic-memory/bin/basic-memory"
log_info "basic-memory: \$BASIC_MEMORY_PATH"

# ── Step 4: Figma (optional) ─────────────────────────────────────────────────
echo ""; read -p "  Figma API Key (optional, press Enter to skip): " FIGMA_API_KEY
[ -n "\$FIGMA_API_KEY" ] && FIGMA_DISABLED="false" || { FIGMA_API_KEY="YOUR-FIGMA-API-KEY"; FIGMA_DISABLED="true"; }

# ── Step 5: Write ${aDir}/mcp.json ──────────────────────────────────────────
PROJECT_AGENT_DIR="\$PROJECT_ROOT/${aDir}"; PROJECT_MCP_JSON="\$PROJECT_AGENT_DIR/mcp.json"
mkdir -p "\$PROJECT_AGENT_DIR"
[ -f "\$PROJECT_MCP_JSON" ] && cp "\$PROJECT_MCP_JSON" "\$PROJECT_MCP_JSON.backup.\$(date +%Y%m%d_%H%M%S)"

cat > "\$PROJECT_MCP_JSON" << MCPEOF
{
  "mcpServers": {
    "language-server": {
      "command": "\$MLS_PATH",
      "args": ["--workspace", "\$PROJECT_ROOT/", "--lsp", "typescript-language-server", "--", "--stdio"]
    },
    "semgrep": { "command": "\$SEMGREP_PATH", "args": ["mcp"] },
    "basic-memory": { "command": "\$BASIC_MEMORY_PATH", "args": ["mcp", "--path", "\$DOCS_PATH"] },
    "figma-developer-mcp": {
      "command": "npx", "args": ["-y", "figma-developer-mcp", "--stdio"],
      "env": { "FIGMA_API_KEY": "\$FIGMA_API_KEY" }, "disabled": \$FIGMA_DISABLED
    }
  }
}
MCPEOF
log_info "Written: \$PROJECT_MCP_JSON"

# ── Steps 6-7: rules/ and AGENTS.md (same content as Ubuntu) ─────────────────
RULES_DIR="\$PROJECT_AGENT_DIR/rules"; mkdir -p "\$RULES_DIR"
cat > "\$RULES_DIR/stack.md" << 'STACKEOF'
# Stack Rules — Node.js + React/Next.js
- TypeScript always. .tsx for React, .ts for everything else.
- App Router (Next.js 13+) by default. Change if project uses /pages.
- Absolute imports via tsconfig paths (@/components/, @/lib/).
- Default package manager: npm.
- Server Components by default. "use client" only when strictly needed.
STACKEOF
cat > "\$RULES_DIR/security.md" << 'SECEOF'
# Security Rules — Node.js + React/Next.js
1. No hardcoded secrets — use process.env.VAR_NAME.
2. Parameterize DB queries — never interpolate user input.
3. Never spread req.body — extract only required fields.
SECEOF
cat > "\$RULES_DIR/ai-amnesia.md" << 'AMNESIAEOF'
# AI Amnesia Rules
Start of session: build_context("memory://")
During session: write_note(title, content, folder="decisions"|"conventions"|"known-bad-patterns")
End of session: write_note("Session: [date]", "What changed, decisions made.", folder="sessions")
AMNESIAEOF
cat > "\$RULES_DIR/code-review.md" << 'REVIEWEOF'
# Code Review Rules — Node.js + React/Next.js
1. npm run lint — zero ESLint errors.
2. npx tsc --noEmit — zero TypeScript errors.
3. No console.log or debugger in production paths.
4. No unused imports.
REVIEWEOF
log_info "Created ${aDir}/rules/ (4 files)"

AGENTS_MD="\$PROJECT_ROOT/AGENTS.md"
if [ ! -f "\$AGENTS_MD" ]; then
cat > "\$AGENTS_MD" << 'AGENTSEOF'
# AGENTS.md — [Project Name]
## Stack
- Framework: Next.js (fill in version)
- Language: TypeScript
- Routing: App Router
- Package manager: npm
## Commands
npm run dev | npm run build | npm run type-check | npm run lint | npm test
## Architecture
- State: [Zustand | none]
- Styling: [Tailwind CSS]
- Auth: [NextAuth.js | none]
- DB: [Prisma + PostgreSQL | none]
AGENTSEOF
log_info "Created: AGENTS.md"
fi

echo ""; echo -e "  \${GREEN}\${BOLD}Setup Complete!\${NC}"
echo "  source \$SHELL_RC && open project in ${display}"
echo "  MCP servers auto-connect on first prompt!"`;
}

function systemSetupScript_Mac_PHP(aDir, display) {
  return `#!/bin/bash

# ============================================================
#  MCP Tools Installer + ${display} — macOS
#  PHP + Laravel/WP Profile
# ============================================================

GREEN='\\033[0;32m'; YELLOW='\\033[1;33m'; RED='\\033[0;31m'; NC='\\033[0m'
log_info()  { echo -e "\${GREEN}[✔] \$1\${NC}"; }
log_warn()  { echo -e "\${YELLOW}[⚠] \$1\${NC}"; }
log_error() { echo -e "\${RED}[✘] \$1\${NC}"; }

echo "  MCP Tools Installer + ${display} (macOS) — PHP + Laravel/WP"; echo ""
[ -n "\$1" ] && PROJECT_ROOT="\$1" || PROJECT_ROOT="\$(pwd)"
DOCS_PATH="\$PROJECT_ROOT/docs"; mkdir -p "\$DOCS_PATH"
SHELL_RC="\$HOME/.zshrc"

# Go + mcp-language-server
if ! command -v go &> /dev/null; then
  command -v brew &> /dev/null && brew install go --quiet || { log_error "Install Go from https://go.dev/dl/"; exit 1; }
fi
[[ ":\$PATH:" != *":\$HOME/go/bin:"* ]] && echo 'export PATH=\$PATH:\$HOME/go/bin' >> "\$SHELL_RC" && export PATH=\$PATH:\$HOME/go/bin
go install github.com/isaacphi/mcp-language-server@latest
MLS_PATH="\$HOME/go/bin/mcp-language-server"

# phpactor
! command -v composer &> /dev/null && brew install composer --quiet
composer global require phpactor/phpactor --quiet
PHPACTOR_PATH="\$(composer global config home 2>/dev/null)/vendor/bin/phpactor"
[ -z "\$PHPACTOR_PATH" ] && PHPACTOR_PATH="\$HOME/.composer/vendor/bin/phpactor"
log_info "phpactor: \$PHPACTOR_PATH"

# Semgrep
! command -v semgrep &> /dev/null && (command -v brew &> /dev/null && brew install semgrep --quiet || pip3 install semgrep --quiet)
SEMGREP_PATH=\$(which semgrep || echo "semgrep")

# Basic Memory
! command -v uv &> /dev/null && (command -v brew &> /dev/null && brew install uv --quiet || curl -LsSf https://astral.sh/uv/install.sh | sh)
uv tool install --force basic-memory 2>&1 | tail -3
BASIC_MEMORY_PATH=\$(which basic-memory 2>/dev/null || echo "\$HOME/.local/share/uv/tools/basic-memory/bin/basic-memory")

# mcp.json
PROJECT_AGENT_DIR="\$PROJECT_ROOT/${aDir}"; mkdir -p "\$PROJECT_AGENT_DIR"
cat > "\$PROJECT_AGENT_DIR/mcp.json" << MCPEOF
{
  "mcpServers": {
    "language-server": {
      "command": "\$MLS_PATH",
      "args": ["--workspace", "\$PROJECT_ROOT/", "--lsp", "\$PHPACTOR_PATH", "--lsp-args", "--tcp=0", "--", "--stdio"]
    },
    "semgrep": { "command": "\$SEMGREP_PATH", "args": ["mcp"] },
    "basic-memory": { "command": "\$BASIC_MEMORY_PATH", "args": ["mcp", "--path", "\$DOCS_PATH"] },
    "laravel-boost": { "command": "php", "args": ["artisan", "mcp:serve"], "disabled": true },
    "wordpress-mcp-adapter": { "command": "npx", "args": ["-y", "@wordpress/mcp-adapter", "--stdio"], "disabled": true }
  }
}
MCPEOF
log_info "Written: ${aDir}/mcp.json"

RULES_DIR="\$PROJECT_AGENT_DIR/rules"; mkdir -p "\$RULES_DIR"
echo "# Stack: PHP 8.x, declare(strict_types=1), PSR-12, Eloquent ORM, Artisan commands." > "\$RULES_DIR/stack.md"
echo "# Security: No hardcoded credentials. Parameterize all queries. Use Form Requests." > "\$RULES_DIR/security.md"
echo "# AI Amnesia: build_context('memory://') at start. write_note() for decisions/conventions." > "\$RULES_DIR/ai-amnesia.md"
echo "# Code Review: phpstan analyse | pint | php artisan test | no dd()/dump()." > "\$RULES_DIR/code-review.md"
log_info "Created ${aDir}/rules/"

echo -e "  \${GREEN}Setup Complete! source \$SHELL_RC && open project in ${display}\${NC}"`;
}

function systemSetupScript_Windows_Node(aDir, display) {
  return `# ============================================================
#  MCP Tools Installer + ${display} — Windows (PowerShell)
#  Node.js + React/Next.js Profile
#
#  Run as: Set-ExecutionPolicy -Scope Process Bypass; .\\setup-mcp-tools.ps1
# ============================================================

$ErrorActionPreference = "Stop"
function log_info  { param($m); Write-Host "[OK] $m" -ForegroundColor Green }
function log_warn  { param($m); Write-Host "[!!] $m" -ForegroundColor Yellow }
function log_error { param($m); Write-Host "[XX] $m" -ForegroundColor Red }

Write-Host ""; Write-Host "============================================"
Write-Host "  MCP Tools Installer + ${display}"
Write-Host "  Node.js + React/Next.js Profile (Windows)"
Write-Host "============================================"; Write-Host ""

$PROJECT_ROOT = if ($args[0]) { $args[0] } else { Get-Location }
log_info "Project: $PROJECT_ROOT"
$DOCS_PATH = Join-Path $PROJECT_ROOT "docs"
New-Item -ItemType Directory -Force -Path $DOCS_PATH | Out-Null

# ── Step 1: Go + mcp-language-server + TypeScript LSP ────────────────────────
Write-Host ""; Write-Host "  Step 1: mcp-language-server"
if (-not (Get-Command go -ErrorAction SilentlyContinue)) {
  log_info "Installing Go via winget..."
  winget install --id GoLang.Go --silent --accept-source-agreements
  $env:PATH += ";C:\\Program Files\\Go\\bin;$env:USERPROFILE\\go\\bin"
  [System.Environment]::SetEnvironmentVariable("PATH", $env:PATH, "User")
} else { log_info "Go: $(go version)" }

$env:PATH += ";$env:USERPROFILE\\go\\bin"
go install github.com/isaacphi/mcp-language-server@latest
$MLS_PATH = Join-Path $env:USERPROFILE "go\\bin\\mcp-language-server.exe"
if (Test-Path $MLS_PATH) { log_info "mcp-language-server: $MLS_PATH" } else { log_error "mcp-language-server install failed"; $MLS_PATH = "mcp-language-server" }

npm install -g typescript typescript-language-server --quiet
log_info "typescript-language-server ready"

# ── Step 2: Semgrep ──────────────────────────────────────────────────────────
Write-Host ""; Write-Host "  Step 2: Semgrep"
pip install semgrep --quiet 2>&1 | Out-Null
$SEMGREP_PATH = (Get-Command semgrep -ErrorAction SilentlyContinue)?.Source ?? "semgrep"
log_info "semgrep: $SEMGREP_PATH"

# ── Step 3: Basic Memory ─────────────────────────────────────────────────────
Write-Host ""; Write-Host "  Step 3: basic-memory"
if (-not (Get-Command uv -ErrorAction SilentlyContinue)) {
  log_info "Installing uv via winget..."
  winget install --id astral-sh.uv --silent --accept-source-agreements
  $env:PATH += ";$env:USERPROFILE\\.local\\bin"
}
uv tool install --force basic-memory 2>&1 | Select-Object -Last 3
$BASIC_MEMORY_PATH = (Get-Command basic-memory -ErrorAction SilentlyContinue)?.Source
if (-not $BASIC_MEMORY_PATH) {
  $BASIC_MEMORY_PATH = (uv tool dir) + "\\basic-memory\\Scripts\\basic-memory.exe"
}
log_info "basic-memory: $BASIC_MEMORY_PATH"

# ── Step 4: Figma (optional) ─────────────────────────────────────────────────
Write-Host ""; $FIGMA_API_KEY = Read-Host "  Figma API Key (optional, press Enter to skip)"
$FIGMA_DISABLED = if ($FIGMA_API_KEY) { "false" } else { $FIGMA_API_KEY = "YOUR-FIGMA-API-KEY"; "true" }

# ── Step 5: Write ${aDir}\\mcp.json ─────────────────────────────────────────
$AGENT_DIR = Join-Path $PROJECT_ROOT "${aDir}"
$MCP_JSON  = Join-Path $AGENT_DIR "mcp.json"
New-Item -ItemType Directory -Force -Path (Join-Path $AGENT_DIR "rules") | Out-Null

$mcpContent = @"
{
  "mcpServers": {
    "language-server": {
      "command": "$MLS_PATH",
      "args": ["--workspace", "$PROJECT_ROOT\\", "--lsp", "typescript-language-server", "--", "--stdio"]
    },
    "semgrep": { "command": "$SEMGREP_PATH", "args": ["mcp"] },
    "basic-memory": { "command": "$BASIC_MEMORY_PATH", "args": ["mcp", "--path", "$DOCS_PATH"] },
    "figma-developer-mcp": {
      "command": "cmd", "args": ["/c", "npx", "-y", "figma-developer-mcp", "--stdio"],
      "env": { "FIGMA_API_KEY": "$FIGMA_API_KEY" }, "disabled": $FIGMA_DISABLED
    }
  }
}
"@
$mcpContent | Out-File -FilePath $MCP_JSON -Encoding utf8
log_info "Written: $MCP_JSON"

# ── Step 6: rules/ ──────────────────────────────────────────────────────────
$RULES = Join-Path $AGENT_DIR "rules"
"# Stack: TypeScript, App Router, absolute imports, npm by default." | Out-File "$RULES\\stack.md" -Encoding utf8
"# Security: No hardcoded secrets. Parameterize DB queries. No req.body spread." | Out-File "$RULES\\security.md" -Encoding utf8
"# AI Amnesia: build_context('memory://') at start. write_note() for decisions." | Out-File "$RULES\\ai-amnesia.md" -Encoding utf8
"# Code Review: npm run lint | tsc --noEmit | no console.log | no unused imports." | Out-File "$RULES\\code-review.md" -Encoding utf8
log_info "Created ${aDir}\\rules\\ (4 files)"

# ── Step 7: AGENTS.md ────────────────────────────────────────────────────────
$AGENTS_MD = Join-Path $PROJECT_ROOT "AGENTS.md"
if (-not (Test-Path $AGENTS_MD)) {
  @"
# AGENTS.md — [Project Name]
## Stack
- Framework: Next.js (fill in version)
- Language: TypeScript
- Routing: App Router
- Package manager: npm
## Commands: npm run dev | npm run build | npm run type-check | npm run lint
## Architecture
- State: [Zustand | none]
- Styling: [Tailwind CSS]
- Auth: [NextAuth.js | none]
- DB: [Prisma + PostgreSQL | none]
"@ | Out-File $AGENTS_MD -Encoding utf8
  log_info "Created: AGENTS.md"
}

Write-Host ""; Write-Host "Setup Complete!" -ForegroundColor Green
Write-Host "  Restart terminal, open project in ${display}, MCP servers connect on first prompt!"`;
}

function systemSetupScript_Windows_PHP(aDir, display) {
  return `# ============================================================
#  MCP Tools Installer + ${display} — Windows (PowerShell)
#  PHP + Laravel/WP Profile
# ============================================================

$ErrorActionPreference = "Stop"
function log_info { param($m); Write-Host "[OK] $m" -ForegroundColor Green }

Write-Host "  MCP Tools Installer + ${display} — PHP + Laravel/WP (Windows)"; Write-Host ""
$PROJECT_ROOT = if ($args[0]) { $args[0] } else { Get-Location }
$DOCS_PATH = Join-Path $PROJECT_ROOT "docs"; New-Item -ItemType Directory -Force -Path $DOCS_PATH | Out-Null

# Go + mcp-language-server
if (-not (Get-Command go -ErrorAction SilentlyContinue)) { winget install --id GoLang.Go --silent --accept-source-agreements }
$env:PATH += ";$env:USERPROFILE\\go\\bin"
go install github.com/isaacphi/mcp-language-server@latest
$MLS_PATH = "$env:USERPROFILE\\go\\bin\\mcp-language-server.exe"

# phpactor (via Composer)
if (-not (Get-Command composer -ErrorAction SilentlyContinue)) { winget install --id Composer.Composer --silent }
composer global require phpactor/phpactor --quiet
$PHPACTOR_PATH = "$env:APPDATA\\Composer\\vendor\\bin\\phpactor"

# Semgrep
pip install semgrep --quiet 2>&1 | Out-Null
$SEMGREP_PATH = (Get-Command semgrep -ErrorAction SilentlyContinue)?.Source ?? "semgrep"

# Basic Memory
if (-not (Get-Command uv -ErrorAction SilentlyContinue)) { winget install --id astral-sh.uv --silent }
uv tool install --force basic-memory 2>&1 | Select-Object -Last 3
$BASIC_MEMORY_PATH = (Get-Command basic-memory -ErrorAction SilentlyContinue)?.Source ?? ((uv tool dir) + "\\basic-memory\\Scripts\\basic-memory.exe")

# mcp.json
$AGENT_DIR = Join-Path $PROJECT_ROOT "${aDir}"; New-Item -ItemType Directory -Force -Path (Join-Path $AGENT_DIR "rules") | Out-Null
@"
{
  "mcpServers": {
    "language-server": {
      "command": "$MLS_PATH",
      "args": ["--workspace", "$PROJECT_ROOT\\\\", "--lsp", "$PHPACTOR_PATH", "--lsp-args", "--tcp=0", "--", "--stdio"]
    },
    "semgrep": { "command": "$SEMGREP_PATH", "args": ["mcp"] },
    "basic-memory": { "command": "$BASIC_MEMORY_PATH", "args": ["mcp", "--path", "$DOCS_PATH"] },
    "laravel-boost": { "command": "php", "args": ["artisan", "mcp:serve"], "disabled": true },
    "wordpress-mcp-adapter": { "command": "cmd", "args": ["/c", "npx", "-y", "@wordpress/mcp-adapter", "--stdio"], "disabled": true }
  }
}
"@ | Out-File -FilePath (Join-Path $AGENT_DIR "mcp.json") -Encoding utf8
log_info "Written: ${aDir}\\mcp.json"

$RULES = Join-Path $AGENT_DIR "rules"
"# Stack: PHP 8.x strict_types, PSR-12, Eloquent ORM, Artisan commands." | Out-File "$RULES\\stack.md" -Encoding utf8
"# Security: No hardcoded credentials. Parameterize queries. Use Form Requests." | Out-File "$RULES\\security.md" -Encoding utf8
"# AI Amnesia: build_context('memory://') at start. write_note() for decisions." | Out-File "$RULES\\ai-amnesia.md" -Encoding utf8
"# Code Review: phpstan | pint | php artisan test | no dd()/dump()." | Out-File "$RULES\\code-review.md" -Encoding utf8
log_info "Created ${aDir}\\rules\\"

Write-Host "Setup Complete!" -ForegroundColor Green
Write-Host "  Restart terminal, open project in ${display}, enable laravel-boost in mcp.json when needed."`;
}

function genSystemSetup(stackKey, agentName, aDir, os, cfg) {
  const display = getAgentDisplay(agentName);
  const isNode  = stackKey === 'nodejs-react';
  let scriptContent, scriptFile, runCmd, osLabel;

  if (os === 'ubuntu') {
    scriptContent = isNode
      ? systemSetupScript_Ubuntu_Node(aDir, display)
      : systemSetupScript_Ubuntu_PHP(aDir, display);
    scriptFile = 'setup-mcp-tools.sh';
    runCmd     = 'bash setup-mcp-tools.sh';
    osLabel    = 'Ubuntu / Debian';
  } else if (os === 'mac') {
    scriptContent = isNode
      ? systemSetupScript_Mac_Node(aDir, display)
      : systemSetupScript_Mac_PHP(aDir, display);
    scriptFile = 'setup-mcp-tools.sh';
    runCmd     = 'bash setup-mcp-tools.sh';
    osLabel    = 'macOS';
  } else {
    scriptContent = isNode
      ? systemSetupScript_Windows_Node(aDir, display)
      : systemSetupScript_Windows_PHP(aDir, display);
    scriptFile = 'setup-mcp-tools.ps1';
    runCmd     = 'Set-ExecutionPolicy -Scope Process Bypass; .\\setup-mcp-tools.ps1';
    osLabel    = 'Windows (PowerShell)';
  }

  return `# 🖥️ Run on Your System (Direct Setup) — ${osLabel}

## ⚡ One-Command Setup

All four MCP tools installed and configured in a single script run.

---

## ⚡ Quick Setup (Copy & Run)

### 🚀 Step 1: Go to Setup Directory

Open a terminal and navigate to a setup folder (not your project root yet):

\`\`\`${os === 'windows' ? 'powershell' : 'bash'}
${os === 'windows' ? 'New-Item -ItemType Directory -Force "\\setup-scripts"; Set-Location "\\setup-scripts"' : 'mkdir -p ~/setup-scripts && cd ~/setup-scripts'}
\`\`\`

---

### 🚀 Step 2: Create Setup Script File

\`\`\`${os === 'windows' ? 'powershell' : 'bash'}
${os === 'windows' ? `New-Item -Name "${scriptFile}" -ItemType File` : `nano ${scriptFile}`}
\`\`\`

---

### 📋 Step 3: Add Script Code

Copy the full script below, paste into the file, and save.

\`\`\`${os === 'windows' ? 'powershell' : 'bash'}
${scriptContent}
\`\`\`

---

### ▶️ Step 4: Run Script

\`\`\`${os === 'windows' ? 'powershell' : 'bash'}
${os !== 'windows' ? `cd /path/to/your/project\n${runCmd}` : runCmd}
\`\`\`

---

## 📁 Project Structure After Setup

\`\`\`
your-project/
├── ${aDir}/
│   ├── mcp.json          ← MCP config
│   └── rules/
│       ├── stack.md
│       ├── security.md
│       ├── ai-amnesia.md
│       └── code-review.md
├── docs/
├── AGENTS.md             ← Edit this with your project details
└── your project files...
\`\`\`

---

## 🚀 Start Your Agent

Open your project in ${display} — MCP tools connect automatically on first prompt.

---

## ✅ Start Using

- **RAG**: Add architecture docs, flow diagrams (as text), and feature notes to \`docs/\` for the agent to reference.
- **Memory**: Basic Memory stores your session decisions persistently — no more re-explaining context.
- **Code review**: Semgrep scans run automatically on every session.

## Notes

- Edit \`${aDir}/rules/stack.md\` to set your routing approach and package manager.
- Edit \`AGENTS.md\` to describe your project architecture.
- Re-run the script at any time — it backs up existing mcp.json before overwriting.

<p align="center">
  <strong>
    <a href="./curated-profiles.md">Looking for curated profiles for advanced use cases?</a>
  </strong>
</p>
`;
}

// ─── Section 3: docker-setup.md ──────────────────────────────────────────────

function genDockerSetup(stackKey, agentName, aDir, os, cfg) {
  const display = getAgentDisplay(agentName);
  const isNode  = stackKey === 'nodejs-react';

  const langServerService = isNode
    ? `  # ── Slot 1: Language Server — Go + TypeScript LSP ──────────────────────────
  mcp_language_server:
    container_name: mcp_language_server
    build:
      context: .
      dockerfile_inline: |
        FROM golang:1.23-bookworm
        RUN apt-get update && apt-get install -y nodejs npm && rm -rf /var/lib/apt/lists/*
        RUN go install github.com/isaacphi/mcp-language-server@latest
        RUN npm install -g typescript typescript-language-server
        ENV PATH="/root/go/bin:$PATH"
        WORKDIR /project
        ENTRYPOINT ["mcp-language-server"]
        CMD ["--workspace", "/project/", "--lsp", "typescript-language-server", "--", "--stdio"]
    volumes:
      - .:/project
    stdin_open: true
    restart: unless-stopped`
    : `  # ── Slot 1: Language Server — Go + phpactor ──────────────────────────────────
  mcp_language_server:
    container_name: mcp_language_server
    build:
      context: .
      dockerfile_inline: |
        FROM golang:1.23-bookworm
        RUN apt-get update && apt-get install -y php-cli composer && rm -rf /var/lib/apt/lists/*
        RUN composer global require phpactor/phpactor
        RUN go install github.com/isaacphi/mcp-language-server@latest
        ENV PATH="/root/go/bin:/root/.composer/vendor/bin:$PATH"
        WORKDIR /project
        ENTRYPOINT ["mcp-language-server"]
        CMD ["--workspace", "/project/", "--lsp", "phpactor", "--lsp-args", "--tcp=0", "--", "--stdio"]
    volumes:
      - .:/project
    stdin_open: true
    restart: unless-stopped`;

  const mcpJsonSetup = isNode
    ? `        printf '{"mcpServers":{"language-server":{"command":"mcp-language-server","args":["--workspace","/project/","--lsp","typescript-language-server","--","--stdio"]},"semgrep":{"command":"semgrep","args":["mcp"]},"basic-memory":{"command":"docker","args":["exec","-i","mcp_basic_memory","basic-memory","mcp","--path","/data/docs"]},"figma-developer-mcp":{"command":"npx","args":["-y","figma-developer-mcp","--stdio"],"env":{"FIGMA_API_KEY":"YOUR-FIGMA-API-KEY"},"disabled":true}}}' > /project/${aDir}/mcp.json`
    : `        printf '{"mcpServers":{"language-server":{"command":"mcp-language-server","args":["--workspace","/project/","--lsp","phpactor","--lsp-args","--tcp=0","--","--stdio"]},"semgrep":{"command":"semgrep","args":["mcp"]},"basic-memory":{"command":"docker","args":["exec","-i","mcp_basic_memory","basic-memory","mcp","--path","/data/docs"]},"laravel-boost":{"command":"php","args":["artisan","mcp:serve"],"disabled":true},"wordpress-mcp-adapter":{"command":"npx","args":["-y","@wordpress/mcp-adapter","--stdio"],"disabled":true}}}' > /project/${aDir}/mcp.json`;

  const optionalNote = isNode
    ? '> **Figma**: `disabled: true` by default in Docker. Add your API key to `' + aDir + '/mcp.json` to enable.'
    : '> **laravel/boost** and **wordpress-mcp-adapter**: both `disabled: true` by default. Enable in `' + aDir + '/mcp.json` when ready.';

  return `# 🐳 Run in Docker (Clean & Isolated Environment)

## ⚡ One-Command Setup

Run all MCP tools in isolated Docker containers — no system-level installs, no conflicts.

---

## ⚡ Quick Setup (Copy & Run)

### 🚀 Step 1: Go to Your Project Directory

\`\`\`bash
cd ~/your-project
\`\`\`

---

### 🚀 Step 2: Create Docker Compose File

\`\`\`bash
nano docker-compose.yml
\`\`\`

---

### 📋 Step 3: Add Docker Compose Configuration

\`\`\`yaml
services:

  # ── Slot 0: Setup — writes ${aDir}/mcp.json ──────────────────────────────────
  mcp_setup:
    container_name: mcp_setup
    image: alpine
    volumes:
      - .:/project
    command: >
      sh -c '
        mkdir -p /project/${aDir} /project/${aDir}/rules /project/docs &&
${mcpJsonSetup} &&
        echo "${aDir}/mcp.json written!"
      '
    restart: "no"

${langServerService}

  # ── Slot 2: Semgrep ──────────────────────────────────────────────────────────
  mcp_semgrep:
    container_name: mcp_semgrep
    build:
      context: .
      dockerfile_inline: |
        FROM python:3.12-slim
        RUN pip install --no-cache-dir semgrep
        WORKDIR /project
        ENTRYPOINT ["semgrep"]
        CMD ["mcp"]
    volumes:
      - .:/project
    stdin_open: true
    restart: unless-stopped

  # ── Slot 3: Basic Memory ─────────────────────────────────────────────────────
  mcp_basic_memory:
    container_name: mcp_basic_memory
    build:
      context: .
      dockerfile_inline: |
        FROM python:3.12-slim
        RUN pip install --no-cache-dir uv && uv tool install basic-memory
        ENV PATH="/root/.local/bin:$PATH"
        ENV TMPDIR=/tmp
        RUN mkdir -p /data/docs
        WORKDIR /data
        ENTRYPOINT ["basic-memory"]
        CMD ["mcp", "--path", "/data/docs"]
    volumes:
      - ./docs:/data/docs
    stdin_open: true
    restart: unless-stopped
\`\`\`

---

### ▶️ Step 4: Start Containers

\`\`\`bash
docker compose up -d
\`\`\`

First run builds images — takes 2–5 minutes. Subsequent starts are instant.

---

## 📁 Project Structure After Setup

\`\`\`
your-project/
├── ${aDir}/
│   ├── mcp.json          ← MCP config (auto-written by mcp_setup)
│   └── rules/            ← Add rules files here
├── docs/                 ← Your project docs go here (used by Basic Memory)
├── docker-compose.yml    ← Container definitions
└── your project files...
\`\`\`

---

## ⚠️ Security Note

> Your \`${aDir}/rules/security.md\` is active every session. It enforces: no hardcoded secrets, parameterized DB queries, no direct input spreading.

${optionalNote}

---

## 🚀 Start Your Agent

Open your project in ${display}. The MCP tools (running in Docker) connect automatically via \`${aDir}/mcp.json\`.

---

## ✅ Start Using

- Drop project docs into \`docs/\` — Basic Memory indexes them for the agent.
- Run \`docker compose logs -f\` to monitor container health.
- Run \`docker compose down\` to stop all containers cleanly.

## Notes

- Run \`docker compose up mcp_setup\` to regenerate \`${aDir}/mcp.json\` at any time.
- The \`docs/\` volume is mounted into \`mcp_basic_memory\` — changes are live.
- Docker containers are restarted on system reboot (\`restart: unless-stopped\`).

<p align="center">
  <strong>
    <a href="./curated-profiles.md">Looking for curated profiles for advanced use cases?</a>
  </strong>
</p>
`;
}

// ─── Section 4: project-memory.md ────────────────────────────────────────────
function genProjectMemory(stackKey, agentName, aDir, os, cfg) {
  const display = getAgentDisplay(agentName);
  const isNode  = stackKey === 'nodejs-react';
  const context = isNode ? 'Next.js' : 'PHP/Laravel';

  return `# 🧠 Stop AI Amnesia — Persistent Memory Setup

**The problem**: Your AI agent starts every session with zero memory. It re-introduces patterns you already fixed. It asks about architecture decisions you made last week. It loses context between work sessions.

**This profile fixes it.** Basic Memory MCP (Slot 3) gives your ${display} agent persistent storage — so decisions, conventions, and known-bad patterns survive across sessions.

---

## ✅ Verify Basic Memory is Running

In ${display}, type:

\`\`\`
/status
\`\`\`

You should see \`basic-memory\` listed as **connected**. If not, check \`${aDir}/mcp.json\` paths.

---

## 🔁 The Session Workflow

### At the START of every session

Before writing any code:

\`\`\`
build_context("memory://")
\`\`\`

This loads all stored decisions, conventions, and known-bad patterns into the agent's context. Without this, every session starts blind.

### During the session

Every time you make a decision or discover a convention, store it:

\`\`\`
write_note(
  title="Decision: Using Repository Pattern for User service",
  content="Chose Repository over direct Eloquent calls because we need testability. All User DB operations go through UserRepository.",
  folder="decisions"
)
\`\`\`

Folders to use:
- \`decisions\` — architectural or approach choices
- \`conventions\` — patterns discovered in this codebase
- \`known-bad-patterns\` — things that caused bugs (with the fix)
- \`sessions\` — end-of-session summaries

### At the END of every session

\`\`\`
write_note(
  title="Session: ${new Date().toISOString().slice(0,10)} — [feature name]",
  content="What changed, key decisions made, what to watch for next session.",
  folder="sessions"
)
\`\`\`

---

## 📂 docs/ vs Basic Memory — What Goes Where

| Content | Where |
|---|---|
| API docs, architecture diagrams (as text), onboarding guides | \`docs/\` folder |
| Architectural decisions made during development | Basic Memory \`decisions\` |
| Bugs fixed and their root causes | Basic Memory \`known-bad-patterns\` |
| ${context}-specific conventions discovered | Basic Memory \`conventions\` |
| Work summaries per session | Basic Memory \`sessions\` |

**Rule of thumb**: \`docs/\` is for static reference knowledge. Basic Memory is for evolving project-specific decisions.

---

## 🔍 Searching Memory

Instead of loading everything with \`build_context\`, search for specific context:

\`\`\`
search_notes("authentication pattern")
search_notes("database migration")
\`\`\`

This saves tokens on large projects.

---

<p align="center">
  <strong>
    <a href="./agent-environment-profiles.md">← Back to profile overview</a>
  </strong>
</p>
`;
}

// ─── Section 5: debug-automation.md ──────────────────────────────────────────
function genDebugAutomation(stackKey, agentName, aDir, os, cfg) {
  const display   = getAgentDisplay(agentName);
  const isNode    = stackKey === 'nodejs-react';
  const lintCmd   = isNode ? 'npm run lint' : './vendor/bin/phpstan analyse';
  const typeCheck = isNode ? 'npx tsc --noEmit' : './vendor/bin/pint --test';
  const testCmd   = isNode ? 'npm test' : 'php artisan test';
  const semgrepConfig = isNode ? 'p/typescript' : 'p/php';
  const context   = isNode ? 'TypeScript/Next.js' : 'PHP/Laravel';

  return `# 🐛 Fix the Day 2 Problem — Debug + Review Workflow

**The Day 2 Problem**: Your vibe-coded app works. Then you add a feature and something else breaks. Your AI agent introduces a regression, doesn't catch type errors, or silently skips your project conventions.

**This profile fixes it.** Semgrep MCP (Slot 2) + Language Server (Slot 1) give your ${display} agent automated code review on every session — catching issues before they ship.

---

## ✅ Verify Semgrep is Running

In ${display}:

\`\`\`
/status
\`\`\`

Confirm \`semgrep\` is **connected**. If not, check \`${aDir}/mcp.json\`.

---

## 🔍 Run a Semgrep Scan

Ask your agent directly:

\`\`\`
Run a Semgrep scan on the current changes
\`\`\`

Or for a full scan:

\`\`\`
Run: semgrep --config=${semgrepConfig} --json
\`\`\`

Semgrep surfaces security issues, bad patterns, and ${context}-specific anti-patterns before they reach production.

---

## 🛡️ The code-review.md Checklist

Your \`${aDir}/rules/code-review.md\` enforces these checks on every task completion:

| Check | Command |
|---|---|
| Static analysis | \`${lintCmd}\` |
| Type safety | \`${typeCheck}\` |
| Tests | \`${testCmd}\` |
| No debug artifacts | No \`${isNode ? 'console.log' : 'dd()'}\`, no \`${isNode ? 'debugger' : 'dump()'}\` |
| No unused imports | Remove all unreferenced imports |

The agent will not mark a task complete until all pass.

---

## 🗺️ Language Server for Root Cause Navigation

When debugging, use the Language Server (Slot 1) to navigate to root causes:

\`\`\`
Find all usages of the UserService class
Go to definition of processPayment()
Find all files that import from @/lib/auth
\`\`\`

The Language Server gives the agent deep code navigation without dumping entire files into context — saving tokens and improving accuracy.

---

## 🔁 Debug Workflow Pattern

1. **Semgrep scan** — catch obvious issues first
2. **Reproduce** — isolate the failing case
3. **Navigate** — use Language Server to trace the call stack
4. **Fix** — apply targeted change
5. **Verify** — re-run checks from code-review.md
6. **Store** — write the root cause to Basic Memory as a \`known-bad-patterns\` note

---

<p align="center">
  <strong>
    <a href="./agent-environment-profiles.md">← Back to profile overview</a>
  </strong>
</p>
`;
}

// ─── Section 6: curated-profiles.md ──────────────────────────────────────────
function genCuratedProfiles(stackKey, agentName, aDir, os, cfg) {
  const display = getAgentDisplay(agentName);
  return `# ⚡ Curated Profiles — ${cfg.name}

Pre-configured workflows for the most common real-world scenarios.
Each profile is a deep-dive into one specific use case using the tools already installed.

---

<h2 align="center">🧩 Curated Agent Environment Profiles for Specific Use Cases</h2>

<p align="center">

<a href="./optimize-tokens.md">
  <img src="https://img.shields.io/badge/⚡%20OPTIMIZE%20TOKENS%20%26%20COST-4CAF50?style=for-the-badge" />
</a>

<a href="./project-memory.md">
  <img src="https://img.shields.io/badge/🧠%20PROJECT%20CONTEXT%20%26%20MEMORY-2196F3?style=for-the-badge" />
</a>

<a href="./debug-automation.md">
  <img src="https://img.shields.io/badge/🐞%20TEST%20%26%20DEBUG%20AUTOMATION-1E3A8A?style=for-the-badge" />
</a>

</p>

<p align="center">

<a href="./customer-support.md">
  <img src="https://img.shields.io/badge/💬%20CUSTOMER%20SUPPORT%20OPTIMIZATION-9C27B0?style=for-the-badge" />
</a>

<a href="./fully-local.md">
  <img src="https://img.shields.io/badge/🔒%20FULLY%20LOCAL-FF5722?style=for-the-badge" />
</a>

</p>

<p align="center">
  <strong>
    <a href="./agent-environment-profiles.md">← Back to profile overview</a>
  </strong>
</p>
`;
}

// ─── Section 7: optimize-tokens.md ───────────────────────────────────────────
function genOptimizeTokens(stackKey, agentName, aDir, os, cfg) {
  const display = getAgentDisplay(agentName);
  const isNode  = stackKey === 'nodejs-react';
  const context = isNode ? 'Next.js' : 'PHP/Laravel';
  const examples = isNode
    ? `\`\`\`
Find all files that use the useAuth hook
Go to definition of fetchUserProfile
Find references to the AuthContext provider
\`\`\``
    : `\`\`\`
Find all classes that implement UserRepositoryInterface
Go to definition of processPayment method
Find all files that use App\\Models\\User
\`\`\``;

  return `# ⚡ Optimize Token Usage for Large Codebases

**The problem**: Large ${context} codebases hit token limits fast. Dumping full files into context wastes tokens and produces vague answers.

**The solution**: Use the tools already installed to load precise context instead of everything.

---

## 🗺️ Language Server — Surgical Context Loading

Instead of asking the agent to "read this file" (expensive), ask it to navigate:

${examples}

The Language Server (Slot 1) gives targeted answers using go-to-definition and find-references — loading only what's needed.

---

## 📂 docs/ — Structured Knowledge Base

Organize \`docs/\` with concise, purpose-built files:

\`\`\`
docs/
├── architecture.md     ← High-level system design (not raw code)
├── api-contracts.md    ← Endpoint signatures and response shapes
├── conventions.md      ← Project-specific patterns (summary form)
└── decisions/          ← Why major choices were made
\`\`\`

**Rule**: Never put raw source code in \`docs/\`. Summarize the design instead.

---

## 🧠 Basic Memory — Targeted Retrieval

Instead of loading all memory with \`build_context("memory://")\` on large projects:

\`\`\`
search_notes("authentication")
search_notes("database migration pattern")
read_note("decisions/payment-service-design")
\`\`\`

Search retrieves only the relevant notes — not the full memory graph.

---

## 🔍 Semgrep — Scoped Scans

Run Semgrep on specific directories instead of the full repo:

\`\`\`
Run Semgrep on src/auth/ only
Run Semgrep security rules on app/Http/Controllers/
\`\`\`

Scoped scans surface issues faster with fewer tokens.

---

## 📋 Workflow: Token-Efficient Task Completion

1. \`search_notes("relevant topic")\` — load specific context from memory
2. Language Server navigation — find the code to change
3. Apply targeted change (not full-file rewrites)
4. Semgrep scan on changed directory only
5. \`write_note()\` to store the decision made

---

<p align="center">
  <strong>
    <a href="./agent-environment-profiles.md">← Back to profile overview</a>
  </strong>
</p>
`;
}

// ─── Section 8: customer-support.md ──────────────────────────────────────────
function genCustomerSupport(stackKey, agentName, aDir, os, cfg) {
  const display = getAgentDisplay(agentName);
  const isNode  = stackKey === 'nodejs-react';

  if (isNode) {
    return `# 💬 Customer Support Optimization — Design-to-Code Workflow

**Use case**: Translating customer mockups, design tickets, or Figma layouts directly into working Next.js components — without losing fidelity or context.

---

## 🎨 Figma Context MCP (Slot 4)

Figma Context MCP lets ${display} read your Figma designs directly, so you can say:

\`\`\`
Read the layout from Figma frame "User Dashboard" and implement it as a Next.js component
\`\`\`

### Enable Figma MCP

Add your Figma API key to \`${aDir}/mcp.json\`:

\`\`\`json
"figma-developer-mcp": {
  "command": "npx",
  "args": ["-y", "figma-developer-mcp", "--stdio"],
  "env": { "FIGMA_API_KEY": "your-actual-api-key-here" },
  "disabled": false
}
\`\`\`

Get your API key: Figma → Account Settings → Personal Access Tokens

---

## 🔁 Customer Request → Shipped Feature Workflow

1. **Read the design**: Agent reads Figma frame via Figma Context MCP
2. **Load context**: \`build_context("memory://")\` — load component conventions
3. **Implement**: Agent generates component matching design + TypeScript conventions
4. **Review**: Semgrep scan + type check + lint
5. **Store**: Write component decisions to Basic Memory for future sessions

---

## 🧠 Storing Customer Requirements

Use Basic Memory to persist customer requirements across sessions:

\`\`\`
write_note(
  title="Feature: Dashboard redesign — customer requirements",
  content="Customer wants real-time data, mobile-first layout, dark mode toggle. Priority: mobile layout first.",
  folder="decisions"
)
\`\`\`

Next session, start with \`search_notes("dashboard")\` to pick up exactly where you left off.

---

## 🛡️ Security for Customer-Facing Code

Customer-facing endpoints get extra Semgrep attention:

\`\`\`
Run Semgrep security scan on app/api/customer/ with p/owasp-top-ten rules
\`\`\`

The \`${aDir}/rules/security.md\` rules are active on every session — no SQL injection, no secret leaks, no prototype pollution.

---

<p align="center">
  <strong>
    <a href="./agent-environment-profiles.md">← Back to profile overview</a>
  </strong>
</p>
`;
  } else {
    return `# 💬 Customer Support Optimization — Laravel + WordPress Workflow

**Use case**: Rapidly delivering customer-facing features in Laravel or WordPress — from requirement to shipped code — with AI assistance that understands your stack deeply.

---

## 🚀 Laravel Boost (Slot 4)

Laravel Boost gives ${display} direct access to your Laravel application context — models, routes, Artisan commands, and more.

### Enable Laravel Boost

In \`${aDir}/mcp.json\`, change \`"disabled": true\` to \`"disabled": false\`:

\`\`\`json
"laravel-boost": {
  "command": "php",
  "args": ["artisan", "mcp:serve"],
  "disabled": false
}
\`\`\`

Then install in your Laravel project:

\`\`\`bash
composer require laravel/boost
php artisan vendor:publish --provider="Laravel\\\\Boost\\\\BoostServiceProvider"
\`\`\`

---

## 🔌 WordPress MCP Adapter (Slot 5)

For WordPress sites, the WP MCP Adapter gives the agent access to posts, users, and plugins.

### Enable WordPress MCP

\`\`\`json
"wordpress-mcp-adapter": {
  "command": "npx",
  "args": ["-y", "@wordpress/mcp-adapter", "--stdio"],
  "disabled": false
}
\`\`\`

---

## 🔁 Customer Request → Shipped Feature Workflow

1. **Load context**: \`build_context("memory://")\` — load existing conventions
2. **Describe the requirement**: Give the customer request to the agent in plain language
3. **Laravel Boost navigation**: Agent queries models, routes, and controllers
4. **Implement**: Agent generates code following your \`${aDir}/rules/stack.md\` conventions
5. **Review**: phpstan + pint + \`php artisan test\`
6. **Store**: Write the feature decision to Basic Memory

---

## 🧠 Storing Customer Requirements

\`\`\`
write_note(
  title="Feature: Customer portal — requirements",
  content="Customer needs invoice history, PDF download, and status filter. API endpoint: GET /api/invoices. Uses existing InvoiceResource.",
  folder="decisions"
)
\`\`\`

---

## 🛡️ Security for Customer-Facing Code

Run targeted Semgrep scans on customer-facing controllers:

\`\`\`
Run Semgrep PHP security scan on app/Http/Controllers/CustomerController.php
\`\`\`

The \`${aDir}/rules/security.md\` enforces parameterized queries, input validation via Form Requests, and no hardcoded credentials.

---

<p align="center">
  <strong>
    <a href="./agent-environment-profiles.md">← Back to profile overview</a>
  </strong>
</p>
`;
  }
}

// ─── Section 9: fully-local.md ────────────────────────────────────────────────
function genFullyLocal(stackKey, agentName, aDir, os, cfg) {
  const display    = getAgentDisplay(agentName);
  const isNode     = stackKey === 'nodejs-react';
  const optSlot4   = isNode ? 'Figma Context MCP' : 'laravel/boost + WordPress MCP Adapter';
  const optSlotKey = isNode ? 'figma-developer-mcp' : 'laravel-boost';

  return `# 🔒 Fully Local Setup — No API Calls, Privacy-First

**Use case**: Privacy-sensitive projects, air-gapped environments, or teams that require zero external API calls from agent tools.

---

## ✅ What Runs 100% Locally

| Tool | Local? | Notes |
|---|---|---|
| mcp-language-server | ✅ Yes | Runs entirely on your machine |
| Semgrep | ✅ Yes | Runs locally against your code |
| Basic Memory | ✅ Yes | Stores notes as local markdown files |
| ${optSlot4} | ❌ External | Disabled in this profile |

---

## 🔧 Disable External Tools in mcp.json

Open \`${aDir}/mcp.json\` and ensure external tools are disabled:

\`\`\`json
{
  "mcpServers": {
    "language-server": { ... },
    "semgrep": { ... },
    "basic-memory": { ... },
    "${optSlotKey}": {
      "disabled": true
    }${isNode ? '' : `,
    "wordpress-mcp-adapter": {
      "disabled": true
    }`}
  }
}
\`\`\`

The three core tools (language-server, semgrep, basic-memory) make **no external network calls**.

---

## 🔒 Basic Memory — Fully Local Storage

Basic Memory stores all notes as plain markdown files at:

- **Direct install**: \`~/basic-memory/\` (or the path configured in \`mcp.json\`)
- **Docker**: \`./docs/\` (mounted volume — stays on your machine)

Notes never leave your machine. No cloud sync. No external service.

---

## 🛡️ Privacy Checklist

- [ ] \`${optSlotKey}\` is \`"disabled": true\` in \`${aDir}/mcp.json\`${isNode ? '' : '\n- [ ] `wordpress-mcp-adapter` is `"disabled": true`'}
- [ ] \`.env\` / \`.env.local\` is in \`.gitignore\` (checked by security.md rules)
- [ ] No API keys in \`${aDir}/mcp.json\` (only \`YOUR-KEY-HERE\` placeholders)
- [ ] Basic Memory path is a local directory, not a network share

---

## 🚀 What You Still Get (Without External APIs)

- **Go-to-definition, find-references, diagnostics** via Language Server
- **Security + code quality scanning** via Semgrep (local rulesets)
- **Cross-session memory** via Basic Memory (local markdown files)
- All \`${aDir}/rules/\` files active every session

The fully local setup gives you 3 out of ${Object.keys(cfg.tool_slots).length} tools — the most privacy-sensitive workflows are fully covered.

---

<p align="center">
  <strong>
    <a href="./agent-environment-profiles.md">← Back to profile overview</a>
  </strong>
</p>
`;
}

// ─── Generator map ────────────────────────────────────────────────────────────
const GENERATORS = {
  'agent-environment-profiles': genAgentEnvironmentProfiles,
  'system-setup':               genSystemSetup,
  'docker-setup':               genDockerSetup,
  'project-memory':             genProjectMemory,
  'debug-automation':           genDebugAutomation,
  'curated-profiles':           genCuratedProfiles,
  'optimize-tokens':            genOptimizeTokens,
  'customer-support':           genCustomerSupport,
  'fully-local':                genFullyLocal,
};

// ─── Main generate function ───────────────────────────────────────────────────
function generate(stack, filterAgent) {
  const cfg = readInstructions(stack.readmeColumnKey);
  if (!cfg) return { success: false };

  const osVariants = cfg.os_variants || stack.osVariants;
  const sections   = cfg.sections || stack.expectedFiles.map(f => f.replace('.md', ''));
  const agents     = filterAgent ? [filterAgent] : stack.agents;

  if (agents.length === 0) {
    logWarn('No agents detected. Pass --agent <name> to generate for a specific agent.');
    logInfo('Example: profile-cli generate nodejs-react --agent kilocode');
    return { success: false };
  }

  const agentLabel = filterAgent || `all (${agents.join(', ')})`;
  logBold(`\n${'='.repeat(60)}`);
  logBold(`  Generate Profiles: ${cfg.name}`);
  logBold(`  Agent(s): ${agentLabel}`);
  logBold(`  OS: ${osVariants.join(', ')}`);
  logBold(`${'='.repeat(60)}`);

  let totalWritten = 0;
  let totalSkipped = 0;
  const errors = [];

  for (const agentName of agents) {
    const aDir = getAgentDir(agentName);

    for (const os of osVariants) {
      const targetDir = path.join(REPO_ROOT, 'base-profiles', stack.readmeColumnKey, os, agentName);
      log(`\n  [${os}] → base-profiles/${stack.readmeColumnKey}/${os}/${agentName}/`);

      for (const section of sections) {
        const generator = GENERATORS[section];
        if (!generator) {
          logWarn(`    No generator for section: ${section}`);
          continue;
        }

        const sectionFile = getSectionFilename(section, os);
        const filePath = path.join(targetDir, sectionFile);
        try {
          const content = generator(stack.readmeColumnKey, agentName, aDir, os, cfg);
          const existed = fs.existsSync(filePath);
          writeFile(filePath, content);
          if (existed) {
            log(`    ${COLORS.cyan}UPDATE${COLORS.reset}: ${sectionFile}`);
          } else {
            log(`    ${COLORS.green}✓${COLORS.reset} ${sectionFile}`);
          }
          totalWritten++;
        } catch (err) {
          logError(`    FAIL: ${section}.md — ${err.message}`);
          errors.push({ os, agentName, section, error: err.message });
        }
      }
    }
  }

  logBold(`\n${'='.repeat(60)}`);
  if (errors.length === 0) {
    logSuccess(`Generated ${totalWritten} files for ${agentLabel}`);
  } else {
    logWarn(`Generated ${totalWritten} files, ${errors.length} error(s)`);
    errors.forEach(e => logError(`  ${e.os}/${e.agentName}/${e.section}.md — ${e.error}`));
  }
  log('');
  logInfo(`Next: run 'profile-cli all ${stack.readmeColumnKey}${filterAgent ? ` --agent ${filterAgent}` : ''}' to validate + publish`);
  logBold(`${'='.repeat(60)}\n`);

  return { success: errors.length === 0, written: totalWritten, errors };
}

module.exports = { generate };
