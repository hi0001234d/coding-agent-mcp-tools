# 🖥️ Run on Your System (Direct Setup)

## ⚡ One-Command Setup

We've simplified the entire setup into a single PowerShell script.

---

## ⚡ Quick Setup (Copy & Run)

### 🚀 Step 1: Open PowerShell as Administrator

Right-click PowerShell → Run as Administrator.

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

---

### 🚀 Step 2: Create Setup Script File

```powershell
New-Item -ItemType Directory -Force -Path "$HOME\setup-scripts"
cd "$HOME\setup-scripts"
notepad setup-mcp-tools.ps1
```

---

### 📋 Step 3: Add Setup Script Code

```powershell
# ============================================================
#  MCP Tools Installer + KiloCode Project-Level MCP Setup
#  PHP + Laravel/WP Profile — Windows
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
Write-Host "  PHP + Laravel/WP Profile — Windows"       -ForegroundColor Cyan
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
    Log-Ask "Use -ProjectRoot argument:"
    Write-Host "  .\setup-mcp-tools.ps1 -ProjectRoot `"C:\Users\$env:USERNAME\projects\my-app`""
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
    $createDir = Read-Host "  '$ProjectRoot' does not exist. Create it? (y/n)"
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
# 1. Install Go + mcp-language-server (Slot 1 — part A)
# --------------------------------------------------
Write-Host ""
Write-Host "--------------------------------------------"
Write-Host "  Step 1: Installing mcp-language-server"
Write-Host "--------------------------------------------"

if (-not (Get-Command go -ErrorAction SilentlyContinue)) {
    Log-Info "Installing Go via winget..."
    winget install -e --id GoLang.Go --silent
    $env:PATH = "C:\Program Files\Go\bin;$UserHome\go\bin;$env:PATH"
    Log-Info "Go installed"
} else {
    Log-Info "Go already installed: $(go version)"
}

Log-Info "Installing mcp-language-server..."
go install github.com/isaacphi/mcp-language-server@latest
$MlsPath = "$UserHome\go\bin\mcp-language-server.exe"
if (-not (Test-Path $MlsPath)) {
    Log-Error "mcp-language-server install failed!"
    $MlsPath = "mcp-language-server"
} else {
    Log-Info "mcp-language-server installed: $MlsPath"
}

# --------------------------------------------------
# 2. Install phpactor (Slot 1 — part B)
# --------------------------------------------------
Write-Host ""
Write-Host "--------------------------------------------"
Write-Host "  Step 2: Installing phpactor (PHP LSP)"
Write-Host "--------------------------------------------"

if (-not (Get-Command composer -ErrorAction SilentlyContinue)) {
    Log-Error "Composer not found. Install Composer first: https://getcomposer.org/Composer-Setup.exe"
    exit 1
}

if (-not (Get-Command php -ErrorAction SilentlyContinue)) {
    Log-Info "Installing PHP via winget..."
    winget install -e --id PHP.PHP --silent
    $env:PATH = "C:\php;$env:PATH"
}

Log-Info "PHP version: $(php -r 'echo PHP_VERSION;')"
Log-Info "Installing phpactor globally via Composer..."
composer global require phpactor/phpactor --quiet

$ComposerBin = (composer global config bin-dir --absolute 2>$null).Trim()
$PhpactorPath = ""

if ($ComposerBin -and (Test-Path "$ComposerBin\phpactor")) {
    $PhpactorPath = "$ComposerBin\phpactor"
    Log-Info "Found phpactor: $PhpactorPath"
}

if (-not $PhpactorPath) {
    $candidate = (Get-Command phpactor -ErrorAction SilentlyContinue)?.Source
    if ($candidate) { $PhpactorPath = $candidate }
}

if (-not $PhpactorPath) {
    Log-Warn "Could not find phpactor binary — using 'phpactor' in PATH"
    $PhpactorPath = "phpactor"
} else {
    Log-Info "phpactor ready: $PhpactorPath"
}

# --------------------------------------------------
# 3. Install Semgrep (Slot 2)
# --------------------------------------------------
Write-Host ""
Write-Host "--------------------------------------------"
Write-Host "  Step 3: Installing semgrep"
Write-Host "--------------------------------------------"

if (-not (Get-Command pip -ErrorAction SilentlyContinue)) {
    Log-Error "pip not found. Install Python: winget install -e --id Python.Python.3"
    exit 1
}

Log-Info "Installing semgrep..."
pip install semgrep --quiet
$SemgrepPath = (Get-Command semgrep -ErrorAction SilentlyContinue)?.Source
if ($SemgrepPath) {
    Log-Info "semgrep installed: $SemgrepPath"
} else {
    $SemgrepPath = "semgrep"
}

# --------------------------------------------------
# 4. Install Basic Memory (Slot 3)
# --------------------------------------------------
Write-Host ""
Write-Host "--------------------------------------------"
Write-Host "  Step 4: Installing basic-memory"
Write-Host "--------------------------------------------"

if (-not (Get-Command uv -ErrorAction SilentlyContinue)) {
    Log-Info "Installing uv via winget..."
    winget install -e --id astral-sh.uv --silent
    $env:PATH = "$UserHome\.local\bin;$env:PATH"
} else {
    Log-Info "uv already installed"
}

Log-Info "Installing basic-memory via uv..."
uv tool install --force basic-memory 2>&1 | Select-Object -Last 5

$BasicMemoryPath = ""
$uvToolDir = uv tool dir 2>$null
if ($uvToolDir -and (Test-Path "$uvToolDir\basic-memory\Scripts\basic-memory.exe")) {
    $BasicMemoryPath = "$uvToolDir\basic-memory\Scripts\basic-memory.exe"
}
if (-not $BasicMemoryPath) {
    $candidate = "$UserHome\.local\share\uv\tools\basic-memory\Scripts\basic-memory.exe"
    if (Test-Path $candidate) { $BasicMemoryPath = $candidate }
}
if (-not $BasicMemoryPath) {
    $candidate = (Get-Command basic-memory -ErrorAction SilentlyContinue)?.Source
    if ($candidate) { $BasicMemoryPath = $candidate }
}
if (-not $BasicMemoryPath) {
    $BasicMemoryPath = "$UserHome\.local\share\uv\tools\basic-memory\Scripts\basic-memory.exe"
}
Log-Info "basic-memory ready: $BasicMemoryPath"

# --------------------------------------------------
# 5. Laravel Boost (Optional)
# --------------------------------------------------
Write-Host ""
Write-Host "--------------------------------------------"
Write-Host "  Step 5: Laravel Boost (Optional)"
Write-Host "--------------------------------------------"
Write-Host ""
Log-Ask "Are you setting this up for a Laravel project?"
Log-Warn "Press Enter to skip. You can enable this manually later in .kilocode\mcp.json"
Write-Host ""
$LaravelAnswer = Read-Host "  Laravel project? (y/n)"
if ($LaravelAnswer -match "^[Yy]$") {
    if (-not (Test-Path "$ProjectRoot\artisan")) {
        Log-Warn "artisan not found — Laravel Boost will be disabled in mcp.json"
        $LaravelDisabled = "true"
    } else {
        Set-Location $ProjectRoot
        composer require laravel/boost --dev --quiet
        php artisan boost:install
        Set-Location -
        $LaravelDisabled = "false"
        Log-Info "Laravel Boost installed"
    }
} else {
    Log-Warn "Skipping Laravel Boost"
    $LaravelDisabled = "true"
}

# --------------------------------------------------
# 6. WordPress MCP Adapter (Optional)
# --------------------------------------------------
Write-Host ""
Write-Host "--------------------------------------------"
Write-Host "  Step 6: WordPress MCP Adapter (Optional)"
Write-Host "--------------------------------------------"
Write-Host ""
Log-Ask "Are you setting this up for a WordPress project?"
Log-Warn "Press Enter to skip. You can enable this manually later in .kilocode\mcp.json"
Write-Host ""
$WpAnswer = Read-Host "  WordPress project? (y/n)"
if ($WpAnswer -match "^[Yy]$") {
    $WpUser = Read-Host "  WordPress admin user (default: admin)"
    if ($WpUser -eq "") { $WpUser = "admin" }
    Set-Location $ProjectRoot
    composer require wordpress/abilities-api wordpress/mcp-adapter --quiet
    Set-Location -
    if (-not (Get-Command wp -ErrorAction SilentlyContinue)) {
        Log-Info "Installing WP-CLI..."
        $wpCliUrl = "https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar"
        Invoke-WebRequest -Uri $wpCliUrl -OutFile "$UserHome\wp-cli.phar"
        # Create wp.bat wrapper
        Set-Content -Path "C:\Windows\wp.bat" -Value "@php `"$UserHome\wp-cli.phar`" %*" -Encoding ASCII
        Log-Info "WP-CLI installed"
    }
    $WpDisabled = "false"
    Log-Info "WordPress MCP Adapter installed (user: $WpUser)"
} else {
    Log-Warn "Skipping WordPress MCP Adapter"
    $WpUser = "admin"
    $WpDisabled = "true"
}

# --------------------------------------------------
# 7. Configure mcp.json
# --------------------------------------------------
Write-Host ""
Write-Host "--------------------------------------------"
Write-Host "  Step 7: Project-Level KiloCode mcp.json"
Write-Host "--------------------------------------------"

$KilocodeDir = "$ProjectRoot\.kilocode"
$McpJsonPath = "$KilocodeDir\mcp.json"
New-Item -ItemType Directory -Force -Path $KilocodeDir | Out-Null

if (Test-Path $McpJsonPath) {
    $ts = Get-Date -Format "yyyyMMdd_HHmmss"
    Copy-Item $McpJsonPath "$McpJsonPath.backup.$ts"
    Log-Warn "Backup created"
}

$MlsPathJson = $MlsPath -replace '\\', '\\'
$PhpactorPathJson = $PhpactorPath -replace '\\', '\\'
$BasicMemoryPathJson = $BasicMemoryPath -replace '\\', '\\'
$DocsPathJson = $DocsPath -replace '\\', '\\'
$ProjectRootJson = $ProjectRoot -replace '\\', '\\'

$mcpJson = @"
{
  "mcpServers": {
    "language-server": {
      "command": "$MlsPathJson",
      "args": [
        "--workspace", "$ProjectRootJson\\",
        "--lsp", "$PhpactorPathJson",
        "--", "language-server"
      ]
    },
    "semgrep": {
      "command": "$SemgrepPath",
      "args": ["mcp"]
    },
    "basic-memory": {
      "command": "$BasicMemoryPathJson",
      "args": ["mcp", "--path", "$DocsPathJson"]
    },
    "laravel-boost": {
      "command": "php",
      "args": ["artisan", "boost:mcp"],
      "disabled": $LaravelDisabled
    },
    "wordpress-mcp": {
      "command": "wp",
      "args": [
        "--path=$ProjectRootJson",
        "mcp-adapter",
        "serve",
        "--server=mcp-adapter-default-server",
        "--user=$WpUser"
      ],
      "disabled": $WpDisabled
    }
  }
}
"@

Set-Content -Path $McpJsonPath -Value $mcpJson -Encoding UTF8
Log-Info "Written: $McpJsonPath"

# --------------------------------------------------
# 8. Create .kilocode\rules\ files
# --------------------------------------------------
Write-Host ""
Write-Host "--------------------------------------------"
Write-Host "  Step 8: Creating .kilocode\rules\"
Write-Host "--------------------------------------------"

$RulesDir = "$KilocodeDir\rules"
New-Item -ItemType Directory -Force -Path $RulesDir | Out-Null

$stackMd = @'
# Stack Rules — PHP + Laravel

## Language
- Always use PHP 8.2+ syntax. Use typed properties, match expressions, and named arguments.
- Use strict types: add `declare(strict_types=1);` at the top of every PHP file.

## Framework
<!-- CUSTOMIZE: set to "Laravel" or "WordPress" based on this project -->
- Default: **Laravel**

## Routing (Laravel)
- Web routes in `routes/web.php`. API routes in `routes/api.php`.
- Never define routes inside controllers.

## ORM / Database
- Always use **Eloquent**. No raw SQL unless using `DB::select()` with bound parameters.
- Use `$fillable` on every model. Never use `$guarded = []`.

## Templates
- Blade for all views. Use `{{ }}` not `{!! !!}` for user data.

## Package Manager
- Composer for PHP. Never commit `vendor/`.
'@

$securityMd = @'
# Security Rules — PHP + Laravel

## 1. No mass assignment with unfiltered request data
Bad:  User::create($request->all());
Good: User::create($request->validated());

## 2. No variable interpolation in raw DB queries
Bad:  DB::select("SELECT * FROM users WHERE id = $id");
Good: DB::select("SELECT * FROM users WHERE id = ?", [$id]);

## 3. No hardcoded secrets
Bad:  new OpenAI(['api_key' => 'sk-proj-abc123...']);
Good: new OpenAI(['api_key' => env('OPENAI_API_KEY')]);

## 4. No user input in file paths for include/require
Bad:  include 'templates/' . $_GET['page'] . '.php';
Good: Whitelist allowed values first, then include.
WordPress plugin code is especially prone to this.
'@

$aiAmnesiaMd = @'
# AI Amnesia Rules — Persistent Context via Basic Memory

**Dependency**: Basic Memory MCP must be configured in mcp.json.

## At the START of every session
build_context("memory://")

## During the session
write_note(title, content, folder="decisions"|"conventions"|"known-bad-patterns")

## At the END of every session
write_note(title="Session: [date] — [feature]", content="...", folder="sessions")
'@

$codeReviewMd = @'
# Code Review Rules — PHP + Laravel

## Required checks
1. .\vendor\bin\pint          — zero style violations
2. .\vendor\bin\phpstan analyse  — zero static analysis errors
3. No var_dump(), dd(), dump(), or ray() in production paths
4. No unused `use` statements

## When to run tests
php artisan test
'@

Set-Content -Path "$RulesDir\stack.md"       -Value $stackMd      -Encoding UTF8
Set-Content -Path "$RulesDir\security.md"    -Value $securityMd   -Encoding UTF8
Set-Content -Path "$RulesDir\ai-amnesia.md"  -Value $aiAmnesiaMd  -Encoding UTF8
Set-Content -Path "$RulesDir\code-review.md" -Value $codeReviewMd -Encoding UTF8
Log-Info "Created .kilocode\rules\ (4 files)"

# --------------------------------------------------
# 9. Create AGENTS.md
# --------------------------------------------------
Write-Host ""
Write-Host "--------------------------------------------"
Write-Host "  Step 9: Creating AGENTS.md"
Write-Host "--------------------------------------------"

$AgentsMdPath = "$ProjectRoot\AGENTS.md"
$agentsMdContent = @'
# AGENTS.md — [Project Name]

## Stack

- **Framework**: Laravel (update version — e.g., 12.x)
- **PHP version**: 8.2+
- **Language**: PHP (strict_types=1 in all files)
- **ORM**: Eloquent
- **Templates**: Blade
- **Package manager**: Composer
- **Node.js version**: 22.x LTS (if using frontend assets)
- **Auth**: [e.g., Laravel Breeze | Laravel Sanctum | none]

## Commands

```bash
php artisan serve
php artisan test
.\vendor\bin\phpstan analyse
.\vendor\bin\pint
php artisan migrate
```

## Architecture

**Routing**: web.php for web routes, api.php for API routes
**State management**: [e.g., Livewire | Inertia.js | Blade only]
**Database**: [e.g., MySQL via Eloquent]

## What Not to Touch

- `.env` — never read or modify; use `config()` in code only
- `database\migrations\` — never edit existing migrations

## Known Conventions in This Codebase

<!-- Start empty. Fill in as the project evolves. Also store in Basic Memory. -->
'@

if (Test-Path $AgentsMdPath) {
    $overwrite = Read-Host "  AGENTS.md already exists. Overwrite? (y/n)"
    if ($overwrite -match "^[Yy]$") {
        $ts = Get-Date -Format "yyyyMMdd_HHmmss"
        Copy-Item $AgentsMdPath "$AgentsMdPath.backup.$ts"
        Set-Content -Path $AgentsMdPath -Value $agentsMdContent -Encoding UTF8
        Log-Info "Overwritten: $AgentsMdPath"
    } else {
        Log-Info "Skipping — existing AGENTS.md kept"
    }
} else {
    Set-Content -Path $AgentsMdPath -Value $agentsMdContent -Encoding UTF8
    Log-Info "Created: $AgentsMdPath"
}

# --------------------------------------------------
# 10. Show results
# --------------------------------------------------
Write-Host ""
Write-Host "============================================" -ForegroundColor Green
Write-Host "  Setup Complete!" -ForegroundColor Green
Write-Host "============================================" -ForegroundColor Green
Write-Host ""
Write-Host "  Next Steps:"
Write-Host "    1. Restart PowerShell (or open a new terminal)"
Write-Host "    2. Open this project in VS Code / KiloCode"
Write-Host "    3. Edit AGENTS.md — fill in your framework version and architecture"
Write-Host "    4. Add your project docs to: $DocsPath"
if ($LaravelDisabled -eq "true") {
    Write-Host "    5. Optional: enable Laravel Boost in .kilocode\mcp.json"
}
if ($WpDisabled -eq "true") {
    Write-Host "    6. Optional: enable WordPress MCP in .kilocode\mcp.json"
}
Write-Host "    7. MCP servers auto-connect on first prompt!"
Write-Host ""
```

> ⚠️ Security: Your `.kilocode\rules\security.md` is active every session.
> It enforces 4 rules: no mass assignment, parameterized DB queries only,
> no hardcoded secrets, no user-controlled file includes.

---

### ▶️ Step 4: Run Script

```powershell
cd C:\path\to\your\project
.\setup-mcp-tools.ps1
```

Or with path argument:

```powershell
.\setup-mcp-tools.ps1 -ProjectRoot "C:\path\to\your\project"
```

---

## 📁 Project Structure After Setup

```
your-project\
├── .kilocode\
│   ├── mcp.json          ← MCP config (5 entries, 2 optional)
│   └── rules\
│       ├── stack.md
│       ├── security.md
│       ├── ai-amnesia.md
│       └── code-review.md
├── docs\
├── AGENTS.md
└── your project files...
```

---

## ✅ Start Using

- Add docs to `docs\` for RAG-based workflows
- Give prompts like "analyze this codebase" or "fix this bug"

## Notes

- Edit `.kilocode\rules\stack.md` to switch between Laravel and WordPress conventions
- Enable Laravel Boost: set `disabled: false` for `laravel-boost` in `.kilocode\mcp.json`
- Enable WordPress MCP: set `disabled: false` for `wordpress-mcp` in `.kilocode\mcp.json`

<p align="center">
  <strong>
    <a href="./curated-profiles.md">
      Looking for curated profiles for advanced use cases and real-world workflows?
    </a>
  </strong>
</p>
