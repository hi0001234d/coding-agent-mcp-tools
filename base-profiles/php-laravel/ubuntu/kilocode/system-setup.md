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

```bash
#!/bin/bash

# ============================================================
#  MCP Tools Installer + KiloCode Project-Level MCP Setup
#  PHP + Laravel/WP Profile
#
#  Installs: mcp-language-server + phpactor, semgrep,
#            basic-memory, laravel-boost (optional),
#            wordpress-mcp-adapter (optional)
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
echo "  PHP + Laravel/WP Profile"
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
# 2. Install Go + mcp-language-server (Slot 1 — part A)
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

# --------------------------------------------------
# 3. Install phpactor (Slot 1 — part B: PHP LSP)
# --------------------------------------------------
echo ""
echo "--------------------------------------------"
echo "  Step 2: Installing phpactor (PHP LSP)"
echo "--------------------------------------------"

if ! command -v composer &> /dev/null; then
    log_error "Composer not found. Install Composer first: https://getcomposer.org/download/"
    log_warn "Then re-run this script."
    exit 1
fi

if ! command -v php &> /dev/null; then
    log_error "PHP not found. Install PHP 8.2+: sudo apt install php8.2-cli php8.2-mbstring"
    log_warn "Then re-run this script."
    exit 1
fi

PHP_VERSION=$(php -r "echo PHP_MAJOR_VERSION . '.' . PHP_MINOR_VERSION;")
log_info "PHP version detected: $PHP_VERSION"

log_info "Installing phpactor globally via Composer..."
composer global require phpactor/phpactor --quiet

COMPOSER_BIN=$(composer global config bin-dir --absolute 2>/dev/null)
PHPACTOR_PATH=""

if [ -n "$COMPOSER_BIN" ] && [ -f "$COMPOSER_BIN/phpactor" ]; then
    PHPACTOR_PATH="$COMPOSER_BIN/phpactor"
    log_info "Found phpactor via composer bin-dir: $PHPACTOR_PATH"
fi

if [ -z "$PHPACTOR_PATH" ]; then
    for candidate in \
        "$USER_HOME/.config/composer/vendor/bin/phpactor" \
        "$USER_HOME/.composer/vendor/bin/phpactor"; do
        if [ -f "$candidate" ]; then
            PHPACTOR_PATH="$candidate"
            log_info "Found phpactor at: $PHPACTOR_PATH"
            break
        fi
    done
fi

if [ -z "$PHPACTOR_PATH" ]; then
    PHPACTOR_PATH=$(which phpactor 2>/dev/null || echo "")
    if [ -n "$PHPACTOR_PATH" ]; then
        log_info "Found phpactor via which: $PHPACTOR_PATH"
    fi
fi

if [ -z "$PHPACTOR_PATH" ]; then
    log_error "Could not find phpactor binary after install!"
    log_warn "Using default path — fix manually in mcp.json if needed"
    PHPACTOR_PATH="phpactor"
else
    # Ensure phpactor bin dir is in PATH
    PHPACTOR_DIR=$(dirname "$PHPACTOR_PATH")
    if [[ ":$PATH:" != *":$PHPACTOR_DIR:"* ]]; then
        echo "export PATH=\$PATH:$PHPACTOR_DIR" >> "$USER_HOME/.bashrc"
        export PATH=$PATH:$PHPACTOR_DIR
    fi
    log_info "phpactor ready: $PHPACTOR_PATH"
fi

# --------------------------------------------------
# 4. Install Semgrep (Slot 2)
# --------------------------------------------------
echo ""
echo "--------------------------------------------"
echo "  Step 3: Installing semgrep"
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
# 5. Install Basic Memory (Slot 3)
# --------------------------------------------------
echo ""
echo "--------------------------------------------"
echo "  Step 4: Installing basic-memory"
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
# 6. Laravel Boost (Optional)
# --------------------------------------------------
echo ""
echo "--------------------------------------------"
echo "  Step 5: Laravel Boost (Optional)"
echo "--------------------------------------------"
echo ""
log_ask "Are you setting this up for a Laravel project?"
log_warn "Press Enter to skip. You can enable this manually later in .kilocode/mcp.json"
echo ""
read -p "  Laravel project? (y/n): " LARAVEL_ANSWER
if [[ "$LARAVEL_ANSWER" =~ ^[Yy]$ ]]; then
    if [ ! -f "$PROJECT_ROOT/artisan" ]; then
        log_warn "artisan not found in $PROJECT_ROOT — not a Laravel project root?"
        log_warn "Laravel Boost will be added to mcp.json but disabled. Run from your Laravel root."
        LARAVEL_DISABLED="true"
    else
        log_info "artisan found — installing Laravel Boost..."
        cd "$PROJECT_ROOT"
        composer require laravel/boost --dev --quiet
        php artisan boost:install
        cd - > /dev/null
        LARAVEL_DISABLED="false"
        log_info "Laravel Boost installed"
    fi
else
    log_warn "Skipping Laravel Boost — setup continues normally without it"
    LARAVEL_DISABLED="true"
fi

# --------------------------------------------------
# 7. WordPress MCP Adapter (Optional)
# --------------------------------------------------
echo ""
echo "--------------------------------------------"
echo "  Step 6: WordPress MCP Adapter (Optional)"
echo "--------------------------------------------"
echo ""
log_ask "Are you setting this up for a WordPress project?"
log_warn "Press Enter to skip. You can enable this manually later in .kilocode/mcp.json"
echo ""
read -p "  WordPress project? (y/n): " WP_ANSWER
if [[ "$WP_ANSWER" =~ ^[Yy]$ ]]; then
    log_ask "WordPress admin username (used by WP-CLI):"
    read -p "  WordPress admin user (default: admin): " WP_USER
    WP_USER=${WP_USER:-admin}

    log_info "Installing WordPress MCP Adapter via Composer..."
    cd "$PROJECT_ROOT"
    composer require wordpress/abilities-api wordpress/mcp-adapter --quiet
    cd - > /dev/null

    if ! command -v wp &> /dev/null; then
        log_info "Installing WP-CLI..."
        curl -sO https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar
        chmod +x wp-cli.phar
        sudo mv wp-cli.phar /usr/local/bin/wp
        log_info "WP-CLI installed"
    else
        log_info "WP-CLI already installed"
    fi

    WP_DISABLED="false"
    log_info "WordPress MCP Adapter installed (user: $WP_USER)"
else
    log_warn "Skipping WordPress MCP Adapter — setup continues normally without it"
    WP_USER="admin"
    WP_DISABLED="true"
fi

# --------------------------------------------------
# 8. Configure Project-Level KiloCode MCP
# --------------------------------------------------
echo ""
echo "--------------------------------------------"
echo "  Step 7: Project-Level KiloCode mcp.json"
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
        "--lsp", "$PHPACTOR_PATH",
        "--", "language-server"
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
    "laravel-boost": {
      "command": "php",
      "args": ["artisan", "boost:mcp"],
      "disabled": $LARAVEL_DISABLED
    },
    "wordpress-mcp": {
      "command": "wp",
      "args": [
        "--path=$PROJECT_ROOT",
        "mcp-adapter",
        "serve",
        "--server=mcp-adapter-default-server",
        "--user=$WP_USER"
      ],
      "disabled": $WP_DISABLED
    }
  }
}
MCPJSON

log_info "Written: $PROJECT_MCP_JSON"

# --------------------------------------------------
# 9. Create .kilocode/rules/ files
# --------------------------------------------------
echo ""
echo "--------------------------------------------"
echo "  Step 8: Creating .kilocode/rules/"
echo "--------------------------------------------"

RULES_DIR="$PROJECT_KILOCODE_DIR/rules"
mkdir -p "$RULES_DIR"

cat > "$RULES_DIR/stack.md" << 'STACK_MD_EOF'
# Stack Rules — PHP + Laravel

## Language
- Always use PHP 8.2+ syntax. Use typed properties, match expressions, and named arguments where they improve clarity.
- Use strict types: add `declare(strict_types=1);` at the top of every PHP file.
- Never use `var` for property declarations — use typed properties (`private string $name`).

## Framework
<!-- CUSTOMIZE: set to "Laravel" or "WordPress" based on this project -->
- Default: **Laravel** (App-based structure, artisan commands, Eloquent ORM)
- If this project is WordPress: routes = hooks/actions, models = WP_Query/custom post types, templates = template hierarchy

## Routing (Laravel)
- Web routes go in `routes/web.php`.
- API routes go in `routes/api.php`. All API routes return JSON.
- Never define routes inside controllers or service providers.

## ORM / Database
- Always use **Eloquent** for database access. No raw SQL strings unless using `DB::select()` with bound parameters.
- Migrations for all schema changes — never modify DB schema manually.
- Use `$fillable` on every model. Never use `$guarded = []`.

## Templates
- Blade for all views. No inline PHP in Blade files beyond `@php` blocks for display logic only.
- Components go in `resources/views/components/`.
- Never echo unescaped user data — use `{{ }}` not `{!! !!}` unless explicitly needed and documented.

## Package Manager
- Composer for PHP dependencies. npm/yarn for frontend assets (if applicable).
- Never commit `vendor/` — it must be in `.gitignore`.

## Artisan Commands
- Development server: `php artisan serve`
- Run tests: `php artisan test`
- Clear caches: `php artisan optimize:clear`
- Always run `php artisan migrate` after pulling schema changes.

## Service Container
- Use constructor injection for dependencies — never `app()->make()` inline in business logic.
- Bind interfaces to implementations in a ServiceProvider, not in controllers.
STACK_MD_EOF

cat > "$RULES_DIR/security.md" << 'SECURITY_MD_EOF'
# Security Rules — PHP + Laravel

Four patterns where AI-generated PHP/Laravel code looks correct but introduces real vulnerabilities.

---

## 1. Never use mass assignment with unfiltered request data

**Bad:**
```php
User::create($request->all());
Post::update($request->all());
```

**Required:**
```php
User::create($request->validated());
// or explicitly list fields:
User::create($request->only(['name', 'email', 'password']));
```

- Every model must define `$fillable` with an explicit list of allowed fields.
- Never use `$guarded = []` — it disables mass assignment protection entirely.
- `$request->validated()` is safe only when a Form Request with rules is used.

---

## 2. Never interpolate variables into raw database queries

**Bad:**
```php
DB::select("SELECT * FROM users WHERE id = $id");
DB::statement("DELETE FROM logs WHERE user = " . $userId);
```

**Required:**
```php
DB::select("SELECT * FROM users WHERE id = ?", [$id]);
// or use Eloquent:
User::where('id', $id)->first();
```

This applies to all raw `DB::` calls. Eloquent query builder is always safe — use it by default.

---

## 3. Never hardcode secrets, API keys, or credentials

**Bad:**
```php
$client = new OpenAI(['api_key' => 'sk-proj-abc123...']);
$db = new PDO('mysql:host=localhost', 'root', 'password123');
```

**Required:**
```php
$client = new OpenAI(['api_key' => env('OPENAI_API_KEY')]);
$db = new PDO('mysql:host=' . env('DB_HOST'), env('DB_USER'), env('DB_PASSWORD'));
```

- All secrets go in `.env` (never committed — must be in `.gitignore`).
- Never log `env()` values or return them in API responses.
- Use `config()` to read env values in application code — not `env()` directly outside config files.

---

## 4. Never use user input to build file paths for include/require

**Bad:**
```php
include 'templates/' . $_GET['page'] . '.php';
require $_POST['module'];
```

**Required:**
```php
$allowed = ['home', 'about', 'contact'];
$page = in_array($_GET['page'], $allowed) ? $_GET['page'] : 'home';
include 'templates/' . $page . '.php';
```

This applies to all `include`, `require`, `include_once`, and `require_once` calls.
WordPress plugin code is especially prone to this pattern — always whitelist before including.
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

- Make an architectural decision (e.g., "using Repository pattern instead of direct Eloquent calls because...")
- Discover a convention in this codebase (e.g., "all API responses use `ResponseResource` wrapper")
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
# Code Review Rules — PHP + Laravel

Before marking any task as done, run all of the following. A task is not complete
until all checks pass with zero errors.

---

## Required checks

**1. Code style**
```bash
./vendor/bin/pint
```
Zero style violations. Fix, do not suppress with `// phpcs:ignore`.

**2. Static analysis**
```bash
./vendor/bin/phpstan analyse
```
Zero PHPStan errors. Never use `@phpstan-ignore` as a fix — find the correct type or logic.

**3. No debug artifacts**
- No `var_dump()`, `dd()`, `dump()`, or `ray()` in production code paths.
- Exception: intentional logging via `Log::info()` / `Log::error()` is allowed.

**4. No unused imports**
- Remove all `use` statements that are not referenced in the file.
- Pint/PHPStan will flag these — do not suppress the error.

---

## When to run tests (if test suite exists)
```bash
php artisan test
# or:
./vendor/bin/pest
```
Run tests when modifying logic that has existing test coverage. Do not write new
tests unless explicitly asked — do not skip existing tests.

---

## Notes

- If `pint` is not installed: `composer require laravel/pint --dev`
- If `phpstan` is not installed: `composer require phpstan/phpstan --dev`
- PHPStan level is set in `phpstan.neon` — do not lower the level to pass checks
CODE_REVIEW_EOF

log_info "Created .kilocode/rules/ (4 files: stack.md, security.md, ai-amnesia.md, code-review.md)"

# --------------------------------------------------
# 10. Create AGENTS.md
# --------------------------------------------------
echo ""
echo "--------------------------------------------"
echo "  Step 9: Creating AGENTS.md"
echo "--------------------------------------------"

AGENTS_MD="$PROJECT_ROOT/AGENTS.md"
AGENTS_MD_CONTENT='# AGENTS.md — [Project Name]

## Stack

- **Framework**: Laravel (update version — e.g., 12.x)
- **PHP version**: 8.2+
- **Language**: PHP (strict_types=1 in all files)
- **ORM**: Eloquent
- **Templates**: Blade
- **Package manager**: Composer
- **Node.js version**: 22.x LTS (if using frontend assets)
- **Frontend**: [e.g., Vite + Tailwind CSS | none]
- **Auth**: [e.g., Laravel Breeze | Laravel Sanctum | none]

## Component Pattern

- Controllers are thin — validate via Form Requests, delegate business logic to Services.
- Business logic lives in `app/Services/`, not in controllers or models.
- All models define `$fillable` explicitly.

## Commands

```bash
# Development
php artisan serve

# Build (if using Vite)
npm run dev

# Type check / static analysis
./vendor/bin/phpstan analyse

# Code style
./vendor/bin/pint

# Tests
php artisan test

# Migrations
php artisan migrate
```

## Architecture

<!-- Fill in what makes this project different from a blank Laravel app -->

**Routing approach**: web.php for web routes, api.php for API routes

**State management**: [e.g., Livewire for reactive UI | Inertia.js + Vue/React | Blade only]

**Queue driver**: [e.g., Redis | database | sync]

**Cache driver**: [e.g., Redis | file]

**Database / ORM**: [e.g., MySQL via Eloquent | PostgreSQL via Eloquent]

## File Naming Conventions

- Classes: PascalCase (`UserController.php`, `OrderService.php`)
- Blade views: kebab-case (`user-profile.blade.php`)
- Migration files: snake_case with timestamp prefix (auto-generated)
- Config files: snake_case (`config/app.php`)

## What Not to Touch

<!-- List files/directories the agent should never modify without explicit instruction -->
- `.env` — never read or modify; reference `config()` in code only
- `database/migrations/` — never edit existing migrations; create new ones instead
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
# 11. Show results
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
echo "    |   +-- mcp.json         <- MCP config (5 entries)"
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
echo "    * phpactor            -> $PHPACTOR_PATH"
echo "    * semgrep             -> $SEMGREP_PATH"
echo "    * basic-memory        -> $BASIC_MEMORY_PATH"
if [ "$LARAVEL_DISABLED" = "false" ]; then
echo "    * laravel-boost       -> php artisan boost:mcp (enabled)"
else
echo "    * laravel-boost       -> disabled (enable in .kilocode/mcp.json)"
fi
if [ "$WP_DISABLED" = "false" ]; then
echo "    * wordpress-mcp       -> wp mcp-adapter serve (enabled, user: $WP_USER)"
else
echo "    * wordpress-mcp       -> disabled (enable in .kilocode/mcp.json)"
fi
echo ""
echo "  Next Steps:"
echo "    1. source ~/.bashrc"
echo "    2. Open this project folder in VS Code / KiloCode"
echo "    3. Edit AGENTS.md — fill in your framework version, architecture details"
echo "    4. Add your project docs to: $DOCS_PATH"
if [ "$LARAVEL_DISABLED" = "true" ]; then
echo "    5. Optional: enable Laravel Boost in .kilocode/mcp.json (set disabled: false)"
fi
if [ "$WP_DISABLED" = "true" ]; then
echo "    6. Optional: enable WordPress MCP in .kilocode/mcp.json (set disabled: false)"
fi
echo "    7. MCP servers auto-connect on first prompt!"
echo ""

> ⚠️ Security: Your .kilocode/rules/security.md is active every session.
> It enforces 4 rules: no mass assignment, parameterized DB queries only,
> no hardcoded secrets, no user-controlled file includes.
> See .kilocode/rules/security.md for details.
```

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
│   ├── mcp.json          ← MCP config (5 entries, 2 optional)
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

* Fill in your Laravel version and architecture choices
* Add your queue driver, cache driver, and auth setup
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
- Edit `.kilocode/rules/stack.md` to switch between Laravel and WordPress conventions
- Enable Laravel Boost: set `disabled: false` for `laravel-boost` in `.kilocode/mcp.json`
- Enable WordPress MCP: set `disabled: false` for `wordpress-mcp` in `.kilocode/mcp.json`

<p align="center">
  <strong>
    <a href="./curated-profiles.md">
      Looking for curated profiles for advanced use cases and real-world workflows?
    </a>
  </strong>
</p>
