# 🖥️ Run on Your System (Direct Setup)

## ⚡ One-Command Setup

We've simplified the entire setup into a single PowerShell script.

---

## ⚡ Quick Setup (Copy & Run)

### 🚀 Step 1: Go to Setup Directory (NOT Project Root)

- Open **PowerShell as Administrator** (right-click → Run as Administrator).
- Go to your home directory or a setup folder (NOT your project folder).

```powershell
cd ~
```

(Optional – Recommended)

```powershell
New-Item -ItemType Directory -Force -Path "$HOME\setup-scripts"
cd "$HOME\setup-scripts"
```

---

### 🚀 Step 2: Allow Script Execution

PowerShell requires execution policy to run scripts. Run this once:

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

---

### 🚀 Step 3: Create Setup Script File

Create a new file named `setup-mcp-tools.ps1` in this folder.

```powershell
notepad setup-mcp-tools.ps1
```

---

### 📋 Step 4: Add Setup Script Code

Copy the full script from below, paste it into the file, and save it.

```powershell
# ============================================================
#  MCP Tools Installer + KiloCode Project-Level MCP Setup
#  Node.js + React/Next.js Profile — Windows
#
#  Installs: mcp-language-server, semgrep, basic-memory,
#            figma-developer-mcp (optional)
#  Configures: <project-root>\.kilocode\mcp.json
#              <project-root>\.kilocode\rules\ (4 files)
#  Creates:    <project-root>\AGENTS.md
#
#  Usage:
#    cd C:\path\to\your\project
#    .\setup-mcp-tools.ps1
#
#  OR with project path argument:
#    .\setup-mcp-tools.ps1 -ProjectRoot "C:\path\to\your\project"
# ============================================================

param(
    [string]$ProjectRoot = ""
)

function Log-Info  { param($msg) Write-Host "[OK] $msg" -ForegroundColor Green }
function Log-Warn  { param($msg) Write-Host "[!!] $msg" -ForegroundColor Yellow }
function Log-Error { param($msg) Write-Host "[XX] $msg" -ForegroundColor Red }
function Log-Ask   { param($msg) Write-Host "[??] $msg" -ForegroundColor Cyan }

Write-Host ""
Write-Host "============================================" -ForegroundColor Cyan
Write-Host "  MCP Tools Installer + KiloCode Setup"     -ForegroundColor Cyan
Write-Host "  Node.js + React/Next.js Profile — Windows" -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""

# --------------------------------------------------
# 0. Detect paths
# --------------------------------------------------
$UserHome = $env:USERPROFILE

if ($ProjectRoot -eq "") {
    $ProjectRoot = Get-Location | Select-Object -ExpandProperty Path
}

if ($ProjectRoot -eq $UserHome -or $ProjectRoot -eq "C:\") {
    Log-Error "Don't run this from your home or root directory!"
    Log-Ask "Either cd into your project folder first, or use -ProjectRoot argument:"
    Write-Host ""
    Write-Host "  .\setup-mcp-tools.ps1 -ProjectRoot `"C:\Users\$env:USERNAME\projects\my-app`""
    Write-Host ""
    exit 1
}

Log-Info "User:     $env:USERNAME"
Log-Info "Home:     $UserHome"
Write-Host "[->] Project: $ProjectRoot" -ForegroundColor Cyan
Write-Host ""

$confirm = Read-Host "  Is this your project root? (y/n)"
if ($confirm -notmatch "^[Yy]$") {
    $ProjectRoot = Read-Host "  Enter your project root path"
}

if (-not (Test-Path $ProjectRoot)) {
    Log-Warn "'$ProjectRoot' does not exist."
    $createDir = Read-Host "  Create it? (y/n)"
    if ($createDir -match "^[Yy]$") {
        New-Item -ItemType Directory -Force -Path $ProjectRoot | Out-Null
        Log-Info "Created: $ProjectRoot"
    } else {
        Log-Error "Project root does not exist. Exiting."
        exit 1
    }
}

$DocsPath = "$ProjectRoot\docs"
New-Item -ItemType Directory -Force -Path $DocsPath | Out-Null
Log-Info "Docs directory: $DocsPath"

# --------------------------------------------------
# 1. Install Go + mcp-language-server (Slot 1)
# --------------------------------------------------
Write-Host ""
Write-Host "--------------------------------------------"
Write-Host "  Step 1: Installing mcp-language-server"
Write-Host "--------------------------------------------"

if (-not (Get-Command go -ErrorAction SilentlyContinue)) {
    Log-Info "Installing Go via winget..."
    winget install -e --id GoLang.Go --silent
    $env:PATH = "$env:USERPROFILE\go\bin;$env:PATH"
    $env:PATH = "C:\Program Files\Go\bin;$env:PATH"
    Log-Info "Go installed — you may need to restart PowerShell if go is not found"
} else {
    Log-Info "Go already installed: $(go version)"
}

Log-Info "Installing mcp-language-server..."
go install github.com/isaacphi/mcp-language-server@latest
$MlsPath = "$UserHome\go\bin\mcp-language-server.exe"
if (-not (Test-Path $MlsPath)) {
    Log-Error "mcp-language-server install failed!"
    Log-Warn "Continuing — fix manually: go install github.com/isaacphi/mcp-language-server@latest"
    $MlsPath = "mcp-language-server"
} else {
    Log-Info "mcp-language-server installed: $MlsPath"
}

Log-Info "Installing typescript-language-server (npm)..."
npm install -g typescript typescript-language-server --quiet
Log-Info "typescript-language-server ready"

# --------------------------------------------------
# 2. Install Semgrep (Slot 2)
# --------------------------------------------------
Write-Host ""
Write-Host "--------------------------------------------"
Write-Host "  Step 2: Installing semgrep"
Write-Host "--------------------------------------------"

if (-not (Get-Command pip -ErrorAction SilentlyContinue)) {
    Log-Error "pip not found. Install Python first: winget install -e --id Python.Python.3"
    exit 1
}

Log-Info "Installing semgrep..."
pip install semgrep --quiet
$SemgrepPath = (Get-Command semgrep -ErrorAction SilentlyContinue)?.Source
if ($SemgrepPath) {
    Log-Info "semgrep installed: $SemgrepPath"
} else {
    Log-Error "semgrep install failed — check Python/pip"
    $SemgrepPath = "semgrep"
}

# --------------------------------------------------
# 3. Install Basic Memory (Slot 3)
# --------------------------------------------------
Write-Host ""
Write-Host "--------------------------------------------"
Write-Host "  Step 3: Installing basic-memory"
Write-Host "--------------------------------------------"

if (-not (Get-Command uv -ErrorAction SilentlyContinue)) {
    Log-Info "Installing uv via winget..."
    winget install -e --id astral-sh.uv --silent
    $env:PATH = "$UserHome\.local\bin;$env:PATH"
    Log-Info "uv installed"
} else {
    Log-Info "uv already installed"
}

$env:TEMP = $env:TEMP
Log-Info "Installing basic-memory via uv..."
uv tool install --force basic-memory 2>&1 | Select-Object -Last 5

$BasicMemoryPath = ""

$uvToolDir = uv tool dir 2>$null
if ($uvToolDir -and (Test-Path "$uvToolDir\basic-memory\Scripts\basic-memory.exe")) {
    $BasicMemoryPath = "$uvToolDir\basic-memory\Scripts\basic-memory.exe"
    Log-Info "Found via uv tool dir: $BasicMemoryPath"
}

if (-not $BasicMemoryPath) {
    $candidate = "$UserHome\.local\share\uv\tools\basic-memory\Scripts\basic-memory.exe"
    if (Test-Path $candidate) {
        $BasicMemoryPath = $candidate
        Log-Info "Found at standard path: $BasicMemoryPath"
    }
}

if (-not $BasicMemoryPath) {
    $candidate = (Get-Command basic-memory -ErrorAction SilentlyContinue)?.Source
    if ($candidate) {
        $BasicMemoryPath = $candidate
        Log-Info "Found via Get-Command: $BasicMemoryPath"
    }
}

if (-not $BasicMemoryPath) {
    Log-Error "Could not find basic-memory binary after install!"
    Log-Warn "Using default path — fix manually in mcp.json if needed"
    $BasicMemoryPath = "$UserHome\.local\share\uv\tools\basic-memory\Scripts\basic-memory.exe"
} else {
    Log-Info "basic-memory ready: $BasicMemoryPath"
}

# --------------------------------------------------
# 4. Figma Context MCP (Slot 4 — Optional)
# --------------------------------------------------
Write-Host ""
Write-Host "--------------------------------------------"
Write-Host "  Step 4: Figma Context MCP (Optional)"
Write-Host "--------------------------------------------"
Write-Host ""
Log-Ask "Figma API key — enables design-to-code workflow (Slot 4)"
Log-Warn "Press Enter to skip. You can add your key to .kilocode\mcp.json later."
Write-Host ""
$FigmaApiKey = Read-Host "  Figma API Key (optional)"
if ($FigmaApiKey -ne "") {
    Log-Info "Figma API key recorded — will be added to mcp.json"
    $FigmaDisabled = "false"
} else {
    Log-Warn "Skipping Figma — setup continues normally without it"
    $FigmaApiKey = "YOUR-FIGMA-API-KEY"
    $FigmaDisabled = "true"
}

# --------------------------------------------------
# 5. Configure Project-Level KiloCode MCP
# --------------------------------------------------
Write-Host ""
Write-Host "--------------------------------------------"
Write-Host "  Step 5: Project-Level KiloCode mcp.json"
Write-Host "--------------------------------------------"

$KilocodeDir = "$ProjectRoot\.kilocode"
$McpJsonPath = "$KilocodeDir\mcp.json"
New-Item -ItemType Directory -Force -Path $KilocodeDir | Out-Null

if (Test-Path $McpJsonPath) {
    $timestamp = Get-Date -Format "yyyyMMdd_HHmmss"
    $backup = "$McpJsonPath.backup.$timestamp"
    Copy-Item $McpJsonPath $backup
    Log-Warn "Backup: $backup"
}

$MlsPathForJson = $MlsPath -replace '\\', '\\'
$BasicMemoryPathForJson = $BasicMemoryPath -replace '\\', '\\'
$DocsPathForJson = $DocsPath -replace '\\', '\\'
$ProjectRootForJson = $ProjectRoot -replace '\\', '\\'

$mcpJson = @"
{
  "mcpServers": {
    "language-server": {
      "command": "$MlsPathForJson",
      "args": [
        "--workspace", "$ProjectRootForJson\\",
        "--lsp", "typescript-language-server",
        "--", "--stdio"
      ]
    },
    "semgrep": {
      "command": "$SemgrepPath",
      "args": ["mcp"]
    },
    "basic-memory": {
      "command": "$BasicMemoryPathForJson",
      "args": [
        "mcp",
        "--path",
        "$DocsPathForJson"
      ]
    },
    "figma-developer-mcp": {
      "command": "cmd",
      "args": ["/c", "npx", "-y", "figma-developer-mcp", "--stdio"],
      "env": {
        "FIGMA_API_KEY": "$FigmaApiKey"
      },
      "disabled": $FigmaDisabled
    }
  }
}
"@

Set-Content -Path $McpJsonPath -Value $mcpJson -Encoding UTF8
Log-Info "Written: $McpJsonPath"

# --------------------------------------------------
# 6. Create .kilocode\rules\ files
# --------------------------------------------------
Write-Host ""
Write-Host "--------------------------------------------"
Write-Host "  Step 6: Creating .kilocode\rules\"
Write-Host "--------------------------------------------"

$RulesDir = "$KilocodeDir\rules"
New-Item -ItemType Directory -Force -Path "$KilocodeDir\rules" | Out-Null
$RulesDir = "$KilocodeDir\rules"

$stackMd = @'
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
'@

$securityMd = @'
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
'@

$aiAmnesiaMd = @'
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
'@

$codeReviewMd = @'
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
'@

Set-Content -Path "$RulesDir\stack.md" -Value $stackMd -Encoding UTF8
Set-Content -Path "$RulesDir\security.md" -Value $securityMd -Encoding UTF8
Set-Content -Path "$RulesDir\ai-amnesia.md" -Value $aiAmnesiaMd -Encoding UTF8
Set-Content -Path "$RulesDir\code-review.md" -Value $codeReviewMd -Encoding UTF8

Log-Info "Created .kilocode\rules\ (4 files: stack.md, security.md, ai-amnesia.md, code-review.md)"

# --------------------------------------------------
# 7. Create AGENTS.md
# --------------------------------------------------
Write-Host ""
Write-Host "--------------------------------------------"
Write-Host "  Step 7: Creating AGENTS.md"
Write-Host "--------------------------------------------"

$AgentsMdPath = "$ProjectRoot\AGENTS.md"
$agentsMdContent = @'
# AGENTS.md — [Project Name]

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
'@

if (Test-Path $AgentsMdPath) {
    Log-Warn "AGENTS.md already exists at: $AgentsMdPath"
    $overwrite = Read-Host "  Overwrite it? (y=overwrite / n=skip)"
    if ($overwrite -match "^[Yy]$") {
        $timestamp = Get-Date -Format "yyyyMMdd_HHmmss"
        $backupAgents = "$AgentsMdPath.backup.$timestamp"
        Copy-Item $AgentsMdPath $backupAgents
        Log-Warn "Backup: $backupAgents"
        Set-Content -Path $AgentsMdPath -Value $agentsMdContent -Encoding UTF8
        Log-Info "Overwritten: $AgentsMdPath"
    } else {
        Log-Info "Skipping — existing AGENTS.md kept as-is"
    }
} else {
    Set-Content -Path $AgentsMdPath -Value $agentsMdContent -Encoding UTF8
    Log-Info "Created: $AgentsMdPath"
}

# --------------------------------------------------
# 8. Show results
# --------------------------------------------------
Write-Host ""
Write-Host "--------------------------------------------"
Write-Host "  Generated: $McpJsonPath" -ForegroundColor Cyan
Write-Host "--------------------------------------------"
Write-Host ""
Get-Content $McpJsonPath

Write-Host ""
Write-Host "============================================" -ForegroundColor Green
Write-Host "  Setup Complete!" -ForegroundColor Green
Write-Host "============================================" -ForegroundColor Green
Write-Host ""
Write-Host "  Project Structure:"
Write-Host "    $ProjectRoot\"
Write-Host "    +-- .kilocode\"
Write-Host "    |   +-- mcp.json         <- MCP config (4 tools)"
Write-Host "    |   +-- rules\"
Write-Host "    |       +-- stack.md"
Write-Host "    |       +-- security.md"
Write-Host "    |       +-- ai-amnesia.md"
Write-Host "    |       +-- code-review.md"
Write-Host "    +-- docs\                 <- Your project docs go here"
Write-Host "    +-- AGENTS.md             <- Agent behavior config (edit this!)"
Write-Host "    +-- ...                   <- Your project files"
Write-Host ""
Write-Host "  Binaries:"
Write-Host "    * mcp-language-server -> $MlsPath"
Write-Host "    * semgrep             -> $SemgrepPath"
Write-Host "    * basic-memory        -> $BasicMemoryPath"
if ($FigmaDisabled -eq "false") {
    Write-Host "    * figma-developer-mcp -> cmd /c npx (API key configured)"
} else {
    Write-Host "    * figma-developer-mcp -> disabled (add API key to mcp.json to enable)"
}
Write-Host ""
Write-Host "  Next Steps:"
Write-Host "    1. Restart PowerShell (or open a new terminal)"
Write-Host "    2. Open this project folder in VS Code / KiloCode"
Write-Host "    3. Edit AGENTS.md — fill in your Next.js version, routing, state management"
Write-Host "    4. Add your project docs to: $DocsPath"
if ($FigmaDisabled -eq "true") {
    Write-Host "    5. Optional: add Figma API key to .kilocode\mcp.json to enable Figma MCP"
}
Write-Host "    6. MCP servers auto-connect on first prompt!"
Write-Host ""
```

> ⚠️ Security: Your `.kilocode\rules\security.md` is active every session.
> It enforces 3 rules: no hardcoded secrets, parameterized DB queries only,
> no direct `req.body` merges. See `.kilocode\rules\security.md` for details.

---

### ▶️ Step 5: Run Script

```powershell
cd C:\path\to\your\project
.\setup-mcp-tools.ps1
```

👉 Or pass your project path directly:

```powershell
.\setup-mcp-tools.ps1 -ProjectRoot "C:\path\to\your\project"
```

---

## 📁 Project Structure After Setup

```
your-project\
├── .kilocode\
│   ├── mcp.json          ← MCP config (4 tools)
│   └── rules\
│       ├── stack.md
│       ├── security.md
│       ├── ai-amnesia.md
│       └── code-review.md
├── docs\
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
Add your documentation, project notes, architecture details inside the `docs\` folder so the agent can read and use them while answering queries or modifying code.

  - You can include architecture explanations, system flows, and feature-level details in text format.
  - If you have diagrams (flowcharts, architecture diagrams, etc.), convert them into text (Markdown) before adding them. You can use AI tools like ChatGPT or Gemini — upload your diagram image and use the prompt provided below.
  ```text
  Convert this diagram into a clear Markdown explanation with step-by-step flow and components.
  ```

- **Agent-driven development**  
Give prompts like "analyze this codebase", "fix this bug", or "add a new feature". The agent will use MCP tools automatically to understand your project, maintain context, and assist you during development.

## Notes

- Use the `docs\` folder to enable RAG by adding documentation and references
- Do not store strict architectural rules or constraints inside `docs\`
- Always define important rules, constraints, and decisions inside `AGENTS.md`
- Edit `.kilocode\rules\stack.md` to set your routing approach (App Router vs Pages Router)
- If you skipped Figma during setup, add your API key to `.kilocode\mcp.json` under `figma-developer-mcp → env → FIGMA_API_KEY`

<p align="center">
  <strong>
    <a href="./curated-profiles.md">
      Looking for curated profiles for advanced use cases and real-world workflows?
    </a>
  </strong>
</p>
