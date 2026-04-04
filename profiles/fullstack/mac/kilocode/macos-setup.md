# 🖥️ Run on macOS (Direct Setup)

## ⚡ One-Command Setup

We’ve simplified the entire setup for macOS users into a single Bash script.

---

## ⚡ Quick Setup (Copy & Run)

### 🚀 Step 1: Go to Setup Directory (NOT Project Root)

Go to your home directory or a setup folder (NOT your project folder).  
This script is for development environment setup.

```bash
cd ~

# (Optional – Recommended)
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

### 🚀 Step 3: Add Setup Script Code

Copy the full script below, paste it into the terminal (`Cmd + V`), then save and exit (`Ctrl + O`, Enter, then `Ctrl + X`).

```bash
#!/bin/bash

# ============================================================
#  MCP Tools Installer + KiloCode Project-Level MCP Setup (macOS)
#  
#  Installs: codebase-memory-mcp, basic-memory
#  Configures: <project-root>/.kilocode/mcp.json
#  Creates:    <project-root>/agent.md
# ============================================================

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
CYAN='\033[0;36m'
BOLD='\033[1m'
NC='\033[0m'

log_info()  { echo -e "${GREEN}[✔] $1${NC}"; }
log_warn()  { echo -e "${YELLOW}[⚠] $1${NC}"; }
log_error() { echo -e "${RED}[✘] $1${NC}"; }

echo ""
echo "============================================"
echo "  MCP Tools Installer + KiloCode Setup (Mac)"
echo "============================================"
echo ""

# --------------------------------------------------
# 0. Detect paths
# --------------------------------------------------
USER_HOME="$HOME"

if [ -n "$1" ]; then
    PROJECT_ROOT="${1/#\~/$USER_HOME}"
else
    PROJECT_ROOT="$(pwd)"
fi

echo -e "${CYAN}[->] Project Path: $PROJECT_ROOT${NC}"
read -p "  Is this your project root? (y/n): " CONFIRM
if [[ ! "$CONFIRM" =~ ^[Yy]$ ]]; then
    read -p "  Enter full project path: " PROJECT_ROOT
    PROJECT_ROOT="${PROJECT_ROOT/#\~/$USER_HOME}"
fi

if [ ! -d "$PROJECT_ROOT" ]; then
    read -p "  '$PROJECT_ROOT' does not exist. Create it? (y/n): " CREATE_DIR
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
# 1. Install codebase-memory-mcp
# --------------------------------------------------
echo ""
echo "--------------------------------------------"
echo "  Step 1: Installing codebase-memory-mcp"
echo "--------------------------------------------"

LOCAL_BIN="$USER_HOME/.local/bin"
mkdir -p "$LOCAL_BIN"

# Add to PATH if not present
if [[ ":$PATH:" != *":$LOCAL_BIN:"* ]]; then
    echo 'export PATH="$HOME/.local/bin:$PATH"' >> "$USER_HOME/.zshrc"
    export PATH="$LOCAL_BIN:$PATH"
fi

CODEBASE_MEMORY_PATH="$LOCAL_BIN/codebase-memory-mcp"
SKIP_CM=false

if [ -f "$CODEBASE_MEMORY_PATH" ]; then
    log_warn "codebase-memory-mcp already installed"
    read -p "  Reinstall? (y/n): " REINSTALL_CM
    if [[ ! "$REINSTALL_CM" =~ ^[Yy]$ ]]; then
        log_info "Skipping — using existing binary"
        SKIP_CM=true
    fi
fi

if [ "$SKIP_CM" != true ]; then
    # Check for Homebrew
    if ! command -v brew &> /dev/null; then
        log_warn "Homebrew not found. Installing dependencies via Xcode Command Line Tools..."
        xcode-select --install 2>/dev/null
    else
        log_info "Installing build dependencies via Homebrew..."
        brew install cmake gcc git 2>/dev/null
    fi

    TEMP_DIR=$(mktemp -d)
    log_info "Cloning codebase-memory-mcp..."
    git clone --depth=1 https://github.com/DeusData/codebase-memory-mcp.git "$TEMP_DIR/codebase-memory-mcp"

    cd "$TEMP_DIR/codebase-memory-mcp"
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
    rm -rf "$TEMP_DIR"
fi

# --------------------------------------------------
# 2. Install basic-memory
# --------------------------------------------------
echo ""
echo "--------------------------------------------"
echo "  Step 2: Installing basic-memory"
echo "--------------------------------------------"

if ! command -v uv &> /dev/null; then
    log_info "Installing uv..."
    curl -LsSf https://astral.sh/uv/install.sh | sh
    export PATH="$USER_HOME/.local/bin:$PATH"
fi

log_info "Installing basic-memory via uv..."
uv tool install --force basic-memory

# Path detection for Mac
BASIC_MEMORY_PATH=$(which basic-memory 2>/dev/null)
if [ -z "$BASIC_MEMORY_PATH" ]; then
    BASIC_MEMORY_PATH="$USER_HOME/.local/bin/basic-memory"
fi
log_info "basic-memory ready: $BASIC_MEMORY_PATH"

# --------------------------------------------------
# 3. Configure Project-Level KiloCode mcp.json
# --------------------------------------------------
echo ""
echo "--------------------------------------------"
echo "  Step 3: Project-Level KiloCode mcp.json"
echo "--------------------------------------------"

KILOCODE_DIR="$PROJECT_ROOT/.kilocode"
mkdir -p "$KILOCODE_DIR"
MCP_JSON="$KILOCODE_DIR/mcp.json"

if [ -n "$CODEBASE_MEMORY_PATH" ]; then
    CM_BLOCK="    \"codebase-memory\": { \"command\": \"$CODEBASE_MEMORY_PATH\", \"args\": [] },"
else
    CM_BLOCK="    // codebase-memory-mcp: install failed or skipped"
fi

cat > "$MCP_JSON" << MCPJSON
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

log_info "Written: $MCP_JSON"

# --------------------------------------------------
# 4. Create agent.md
# --------------------------------------------------
echo ""
echo "--------------------------------------------"
echo "  Step 4: Creating agent.md"
echo "--------------------------------------------"

AGENT_MD="$PROJECT_ROOT/agent.md"
AGENT_CONTENT='# Knowledge & Memory Configuration

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
- Examples include API limits, architecture rules, naming conventions, and restricted changes.'

if [ -f "$AGENT_MD" ]; then
    read -p "  agent.md already exists. Overwrite? (y/n): " OVERWRITE_AGENT
    if [[ "$OVERWRITE_AGENT" =~ ^[Yy]$ ]]; then
        echo "$AGENT_CONTENT" > "$AGENT_MD"
        log_info "Overwritten: $AGENT_MD"
    fi
else
    echo "$AGENT_CONTENT" > "$AGENT_MD"
    log_info "Created: $AGENT_MD"
fi

echo ""
echo "============================================"
echo -e "  ${GREEN}${BOLD}Setup Complete! (macOS)${NC}"
echo "============================================"
echo ""
log_info "Project Structure: $PROJECT_ROOT"
log_info "MCP Config: $MCP_JSON"
```

---

### 🚀 Step 4: Run Script

Give execution permission and run the script:

```bash
chmod +x setup-mcp-tools.sh

./setup-mcp-tools.sh /path/to/your/project
```

---

## 📁 Project Structure After Setup

```plaintext
your-project/
│
├── .kilocode/
│   └── mcp.json
├── docs/
├── agent.md
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

- For Mac M1/M2/M3 users: This script builds native ARM binaries  
- Use the `docs/` folder to enable RAG by adding documentation and references  
- Do not store strict architectural rules or constraints inside `docs/`  
- Always define important rules and constraints, and decisions inside `agent.md` 
- Use the **User-Defined Constraints** section in `agent.md` to control agent behavior when needed.