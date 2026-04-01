# 🖥️ Run on Your System (Direct Setup)

## ⚡ One-Command Setup

We’ve simplified the entire setup into a single script.

---

## ⚡ Quick Setup (Copy & Run)

### 🚀 Step 1: Go to Your Project Folder

- Go to your project folder (project root).
- The script file will be created inside this folder.

```bash
cd /path/to/your/project
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
#  
#  Installs: codebase-memory-mcp, basic-memory
#  Configures: <project-root>/.kilocode/mcp.json
#  Creates:    <project-root>/agent.md
#
#  Usage:
#    cd /path/to/your/project
#    bash setup-mcp-tools.sh
#
#  OR with project path argument:
#    bash setup-mcp-tools.sh /path/to/your/project
# ============================================================

# NOTE: No "set -e" — we handle errors manually so script never dies mid-way

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
# 2. Install Codebase Memory MCP
# --------------------------------------------------
echo ""
echo "--------------------------------------------"
echo "  Step 1: Installing codebase-memory-mcp"
echo "--------------------------------------------"

SKIP_CM=false
CODEBASE_MEMORY_PATH="$USER_HOME/.local/bin/codebase-memory-mcp"

if [ -f "$CODEBASE_MEMORY_PATH" ]; then
    log_warn "codebase-memory-mcp already installed"
    read -p "  Reinstall? (y/n): " REINSTALL_CM
    if [[ ! "$REINSTALL_CM" =~ ^[Yy]$ ]]; then
        log_info "Skipping — using existing binary"
        SKIP_CM=true
    fi
fi

if [ "$SKIP_CM" != true ]; then
    log_info "Installing build dependencies (gcc-11 to avoid GCC-13 ICE bug)..."
    sudo apt update -qq
    sudo apt install -y -qq zlib1g-dev gcc-11 g++-11 git > /dev/null 2>&1
    log_info "Build dependencies installed"

    TEMP_DIR=$(mktemp -d)

    # ── Git clone with retry (shallow clone — fast & corruption-free) ──
    log_info "Cloning codebase-memory-mcp..."
    CLONE_OK=false
    for ATTEMPT in 1 2 3; do
        rm -rf "$TEMP_DIR/codebase-memory-mcp"
        git clone --depth=1 https://github.com/DeusData/codebase-memory-mcp.git "$TEMP_DIR/codebase-memory-mcp" 2>&1
        EXIT_CODE=$?
        if [ $EXIT_CODE -eq 0 ]; then
            CLONE_OK=true
            log_info "Clone successful (attempt $ATTEMPT)"
            break
        else
            log_warn "Clone attempt $ATTEMPT failed (exit $EXIT_CODE), retrying..."
        fi
        sleep 2
    done

    if [ "$CLONE_OK" != true ]; then
        log_error "Failed to clone codebase-memory-mcp after 3 attempts!"
        log_warn "Skipping codebase-memory-mcp — rest of setup will continue."
        CODEBASE_MEMORY_PATH=""
    else
        cd "$TEMP_DIR/codebase-memory-mcp"

        # ── GCC-13 ICE fix ──────────────────────────────────
        sed -i 's/\bcc=gcc\b/cc=gcc-11/g'   scripts/build.sh
        sed -i 's/\bcxx=g++\b/cxx=g++-11/g' scripts/build.sh
        log_info "Patched build.sh: gcc -> gcc-11"
        # ────────────────────────────────────────────────────

        log_info "Building..."
        if bash scripts/build.sh; then
            mv build/c/codebase-memory-mcp "$CODEBASE_MEMORY_PATH"
            chmod +x "$CODEBASE_MEMORY_PATH"
            log_info "Installed: $CODEBASE_MEMORY_PATH"
        else
            log_error "Build failed! Skipping codebase-memory-mcp."
            CODEBASE_MEMORY_PATH=""
        fi

        cd "$USER_HOME"
    fi

    rm -rf "$TEMP_DIR"
fi

# --------------------------------------------------
# 3. Install Basic Memory MCP
# --------------------------------------------------
echo ""
echo "--------------------------------------------"
echo "  Step 2: Installing basic-memory"
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

# ── Force install/reinstall basic-memory ────────────────────
log_info "Installing basic-memory via uv (force)..."
uv tool install --force basic-memory 2>&1 | tail -5

# ── Reliable path detection using uv tool dir ───────────────
BASIC_MEMORY_PATH=""

# Method 1: uv tool dir command (most reliable)
UV_TOOL_DIR=$(uv tool dir 2>/dev/null)
if [ -n "$UV_TOOL_DIR" ] && [ -f "$UV_TOOL_DIR/basic-memory/bin/basic-memory" ]; then
    BASIC_MEMORY_PATH="$UV_TOOL_DIR/basic-memory/bin/basic-memory"
    log_info "Found via uv tool dir: $BASIC_MEMORY_PATH"
fi

# Method 2: Standard uv tools path
if [ -z "$BASIC_MEMORY_PATH" ]; then
    CANDIDATE="$USER_HOME/.local/share/uv/tools/basic-memory/bin/basic-memory"
    if [ -f "$CANDIDATE" ]; then
        BASIC_MEMORY_PATH="$CANDIDATE"
        log_info "Found at standard path: $BASIC_MEMORY_PATH"
    fi
fi

# Method 3: which (if uv added it to PATH)
if [ -z "$BASIC_MEMORY_PATH" ]; then
    CANDIDATE=$(which basic-memory 2>/dev/null || echo "")
    if [ -n "$CANDIDATE" ]; then
        BASIC_MEMORY_PATH="$CANDIDATE"
        log_info "Found via which: $BASIC_MEMORY_PATH"
    fi
fi

# Method 4: find fallback
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
# 4. Configure Project-Level KiloCode MCP
# --------------------------------------------------
echo ""
echo "--------------------------------------------"
echo "  Step 3: Project-Level KiloCode mcp.json"
echo "--------------------------------------------"

PROJECT_KILOCODE_DIR="$PROJECT_ROOT/.kilocode"
PROJECT_MCP_JSON="$PROJECT_KILOCODE_DIR/mcp.json"
mkdir -p "$PROJECT_KILOCODE_DIR"

if [ -f "$PROJECT_MCP_JSON" ]; then
    BACKUP="$PROJECT_MCP_JSON.backup.$(date +%Y%m%d_%H%M%S)"
    cp "$PROJECT_MCP_JSON" "$BACKUP"
    log_warn "Backup: $BACKUP"
fi

# Build mcpServers block — skip codebase-memory if install failed
if [ -n "$CODEBASE_MEMORY_PATH" ]; then
    CM_BLOCK="    \"codebase-memory\": {
      \"command\": \"$CODEBASE_MEMORY_PATH\",
      \"args\": []
    },"
else
    CM_BLOCK="    // codebase-memory-mcp: install failed — run setup again to retry"
    log_warn "codebase-memory-mcp not added to mcp.json (install failed)"
fi

cat > "$PROJECT_MCP_JSON" << MCPJSON
{
  "mcpServers": {
$CM_BLOCK
    "basic-memory": {
      "command": "$BASIC_MEMORY_PATH",
      "args": [
        "mcp",
        "--path",
        "$DOCS_PATH"
      ]
    }
  }
}
MCPJSON

log_info "Written: $PROJECT_MCP_JSON"

# --------------------------------------------------
# 5. Create or Update agent.md
# --------------------------------------------------
echo ""
echo "--------------------------------------------"
echo "  Step 4: Creating agent.md"
echo "--------------------------------------------"

AGENT_MD="$PROJECT_ROOT/agent.md"
AGENT_MD_CONTENT='# Knowledge & Memory Configuration

## Documentation Retrieval & Context Building

Use MCP tools to retrieve, process, and build context from project-specific data.

- Always check the `docs/` directory before answering or making changes.
- **codebase-memory MCP** -> Understand and recall codebase structure, files, and relationships.
- **basic-memory MCP** ->
  - Store and recall important context across tasks.
  - Observe processed documentation and extract useful context when needed.
  - Help maintain continuity based on user prompts and previous interactions.

The `docs/` folder acts as the primary knowledge source. Documentation placed here will be processed and used to generate better, context-aware responses.


## Agent Behavior & Decision Making

- Always understand the codebase and available context before making changes.
- Combine documentation (`docs/`) + memory (MCP) to form decisions.
- Prefer safe, incremental, and explainable changes.
- Avoid assumptions when context is missing — retrieve or ask instead.
- Assist in debugging, refactoring, and extending existing systems.

## User-Defined Constraints

This section is used to define project-specific rules, constraints, and architectural decisions.

- Add any strict rules, limitations, or important instructions here.
- These constraints will be treated as the source of truth by the agent.
- The agent will read and follow all rules defined in this section during execution.
- Examples include API limits, architecture rules, naming conventions, and restricted changes.
'

if [ -f "$AGENT_MD" ]; then
    log_warn "agent.md already exists at: $AGENT_MD"
    read -p "  Overwrite it? (y=overwrite / n=skip): " OVERWRITE_AGENT
    if [[ "$OVERWRITE_AGENT" =~ ^[Yy]$ ]]; then
        BACKUP_AGENT="$AGENT_MD.backup.$(date +%Y%m%d_%H%M%S)"
        cp "$AGENT_MD" "$BACKUP_AGENT"
        log_warn "Backup: $BACKUP_AGENT"
        printf '%s' "$AGENT_MD_CONTENT" > "$AGENT_MD"
        log_info "Overwritten: $AGENT_MD"
    else
        log_info "Skipping — existing agent.md kept as-is"
    fi
else
    printf '%s' "$AGENT_MD_CONTENT" > "$AGENT_MD"
    log_info "Created: $AGENT_MD"
fi

# --------------------------------------------------
# 6. Show results
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
echo "    |   +-- mcp.json    <- MCP config (auto-generated)"
echo "    +-- docs/            <- Your project docs go here"
echo "    +-- agent.md         <- Agent behavior config (auto-generated)"
echo "    +-- ...              <- Your project files"
echo ""
echo "  Binaries:"
if [ -n "$CODEBASE_MEMORY_PATH" ]; then
echo "    * codebase-memory-mcp -> $CODEBASE_MEMORY_PATH"
else
echo "    * codebase-memory-mcp -> [FAILED — run setup again]"
fi
echo "    * basic-memory        -> $BASIC_MEMORY_PATH"
echo ""
echo "  Next Steps:"
echo "    1. source ~/.bashrc"
echo "    2. Open this project folder in VS Code / KiloCode"
echo "    3. Add your project docs to: $DOCS_PATH"
echo "    4. Edit agent.md -> 'User-Defined Constraints' section with your project rules"
echo "    5. MCP servers auto-connect!"
echo ""
```

---

### ▶️ Step 4: Run Script

If the script already exists in your project:

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

After running the setup script, your project will be structured like this:

```
your-project/
│
├── .kilocode/
│   └── mcp.json
│
├── docs/
│
├── agent.md
│
└── your project files...
```

---

## 🚀 Start Your Agent

Open your project in VS Code and start KiloCode — everything will connect automatically.

---

## ⚙️ Agent Configuration

`agent.md` file is automatically created.

👉 Use this file to:

* Define project rules
* Add constraints
* Control agent behavior

---

## ✅ Start Using

Now you can start using your setup with:

- **RAG-based workflows**  
Add your documentation, project notes, flows, and architecture details inside the `docs/` folder so the agent can read and use them while answering queries or modifying code.

  - You can include architecture explanations, system flows, and feature-level details in text format.
  - If you have diagrams (flowcharts, architecture diagrams, etc.), convert them into text (Markdown) before adding them. You can use AI tools like ChatGPT or Gemini — upload your diagram image and use the prompt provided below.
  ```text
  Convert this diagram into a clear Markdown explanation with step-by-step flow and components.
  ```

- **Agent-driven development**  
Give prompts like “analyze this codebase”, “fix this bug”, or “add a new feature”. The agent will use MCP tools automatically to understand your project, maintain context, and assist you during development.

## Notes

- Use the `docs/` folder to enable RAG by adding documentation and references  
- Do not store strict architectural rules or constraints inside `docs/`  
- Always define important rules and constraints, and decisions inside `agent.md` 
- Use the **User-Defined Constraints** section in `agent.md` to control agent behavior when needed. 

<p align="center">
  <strong>
    <a href="./curated-profiles.md">
      Looking for curated profiles for advanced use cases and real-world workflows?
    </a>
  </strong>
</p>
