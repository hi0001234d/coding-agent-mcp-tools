# 🖥️ Run on Your System (Windows Direct Setup)

## ⚡ One-Command Setup

We’ve simplified the entire setup into a single PowerShell script.

---

## ⚡ Quick Setup (Copy & Run)

### 🚀 Step 1: Go to Setup Directory (NOT Project Root)

Go to your home directory or a setup folder (NOT your project folder).  
This script is for development environment setup.

```powershell
cd ~

# (Optional – Recommended)
mkdir setup-scripts
cd setup-scripts
```

---

### 🚀 Step 2: Create Setup Script File

Create a new file named `setup-mcp-tools.ps1` in this folder.

```powershell
notepad setup-mcp-tools.ps1
```

---

### 🚀 Step 3: Add Setup Script Code

Copy the full script below, paste it into the file, save, and close it.

```powershell
# ============================================================
#  MCP Tools Installer + KiloCode Project-Level MCP Setup (WINDOWS)
#
#  Installs: codebase-memory-mcp, basic-memory
#  Configures: <project-root>\.kilocode\mcp.json
#  Creates:    <project-root>\agent.md
# ============================================================

$ErrorActionPreference = "Continue"

# Colors for output
function Log-Info($msg)  { Write-Host "[✔] $msg" -ForegroundColor Green }
function Log-Warn($msg)  { Write-Host "[⚠] $msg" -ForegroundColor Yellow }
function Log-Error($msg) { Write-Host "[✘] $msg" -ForegroundColor Red }

Write-Host "`n============================================"
Write-Host "  MCP Tools Installer + KiloCode Setup"
Write-Host "============================================`n"

# --------------------------------------------------
# 0. Detect paths
# --------------------------------------------------
$USER_HOME = $HOME
$PROJECT_ROOT = if ($args[0]) { Resolve-Path $args[0] } else { Get-Location }

Write-Host "[->] Project Path: $PROJECT_ROOT" -ForegroundColor Cyan
$confirm = Read-Host "  Is this your project root? (y/n)"
if ($confirm -ne 'y') {
    $PROJECT_ROOT = Read-Host "  Enter full project path"
}

if (!(Test-Path $PROJECT_ROOT)) {
    $create = Read-Host "  '$PROJECT_ROOT' does not exist. Create it? (y/n)"
    if ($create -eq 'y') {
        New-Item -ItemType Directory -Path $PROJECT_ROOT -Force | Out-Null
        Log-Info "Created: $PROJECT_ROOT"
    } else {
        Log-Error "Project root does not exist. Exiting."
        exit
    }
}

$DOCS_PATH = Join-Path $PROJECT_ROOT "docs"
if (!(Test-Path $DOCS_PATH)) { New-Item -ItemType Directory -Path $DOCS_PATH | Out-Null }
Log-Info "Docs directory: $DOCS_PATH"

# --------------------------------------------------
# 1. Install codebase-memory-mcp
# --------------------------------------------------
Write-Host "`n--------------------------------------------"
Write-Host "  Step 1: Installing codebase-memory-mcp"
Write-Host "--------------------------------------------"

$LOCAL_BIN = Join-Path $USER_HOME ".local\bin"
if (!(Test-Path $LOCAL_BIN)) { New-Item -ItemType Directory -Path $LOCAL_BIN | Out-Null }

$CM_EXE_PATH = Join-Path $LOCAL_BIN "codebase-memory-mcp.exe"
$SKIP_CM = $false

if (Test-Path $CM_EXE_PATH) {
    Log-Warn "codebase-memory-mcp already installed"
    $reinstall = Read-Host "  Reinstall? (y/n)"
    if ($reinstall -ne 'y') {
        Log-Info "Skipping — using existing binary"
        $SKIP_CM = $true
    }
}

if (-not $SKIP_CM) {
    # Check for Git
    if (!(Get-Command git -ErrorAction SilentlyContinue)) {
        Log-Error "Git is not installed. Please install Git first."
        $CODEBASE_MEMORY_PATH = ""
    } else {
        $TEMP_DIR = Join-Path $env:TEMP ([Guid]::NewGuid().ToString())
        New-Item -ItemType Directory -Path $TEMP_DIR | Out-Null
        
        Log-Info "Cloning codebase-memory-mcp..."
        git clone --depth=1 https://github.com/DeusData/codebase-memory-mcp.git "$TEMP_DIR\codebase-memory-mcp"
        
        # Note: Windows build requires MSVC/Visual Studio Build Tools. 
        # If 'cmake' and 'cl.exe' are not found, we warn the user.
        if (Get-Command cmake -ErrorAction SilentlyContinue) {
            Log-Info "Building with CMake..."
            Push-Location "$TEMP_DIR\codebase-memory-mcp"
            # Windows build steps (Assuming standard CMake workflow)
            if (!(Test-Path "build")) { New-Item -ItemType Directory -Path "build" | Out-Null }
            cd build
            cmake ..
            cmake --build . --config Release
            if (Test-Path "Release\codebase-memory-mcp.exe") {
                Move-Item "Release\codebase-memory-mcp.exe" $CM_EXE_PATH -Force
                Log-Info "Installed: $CM_EXE_PATH"
                $CODEBASE_MEMORY_PATH = $CM_EXE_PATH
            } else {
                Log-Error "Build failed (Executable not found)."
                $CODEBASE_MEMORY_PATH = ""
            }
            Pop-Location
        } else {
            Log-Warn "CMake not found. Skipping build. Please download pre-built binary if available."
            $CODEBASE_MEMORY_PATH = ""
        }
    }
} else {
    $CODEBASE_MEMORY_PATH = $CM_EXE_PATH
}

# --------------------------------------------------
# 2. Install basic-memory
# --------------------------------------------------
Write-Host "`n--------------------------------------------"
Write-Host "  Step 2: Installing basic-memory"
Write-Host "--------------------------------------------"

if (!(Get-Command uv -ErrorAction SilentlyContinue)) {
    Log-Info "Installing uv..."
    powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"
    $env:Path += ";$USER_HOME\.local\bin"
}

Log-Info "Installing basic-memory via uv..."
& uv tool install --force basic-memory

# Reliable path detection
$BASIC_MEMORY_PATH = "$USER_HOME\AppData\Roaming\uv\tools\basic-memory\Scripts\basic-memory.exe"
if (!(Test-Path $BASIC_MEMORY_PATH)) {
    $BASIC_MEMORY_PATH = (Get-Command basic-memory -ErrorAction SilentlyContinue).Source
}

if (-not $BASIC_MEMORY_PATH) {
    Log-Error "Could not find basic-memory binary!"
    $BASIC_MEMORY_PATH = "basic-memory.exe"
} else {
    Log-Info "basic-memory ready: $BASIC_MEMORY_PATH"
}

# --------------------------------------------------
# 3. Configure Project-Level KiloCode mcp.json
# --------------------------------------------------
Write-Host "`n--------------------------------------------"
Write-Host "  Step 3: Project-Level KiloCode mcp.json"
Write-Host "--------------------------------------------"

$KILOCODE_DIR = Join-Path $PROJECT_ROOT ".kilocode"
if (!(Test-Path $KILOCODE_DIR)) { New-Item -ItemType Directory -Path $KILOCODE_DIR | Out-Null }

$MCP_JSON = Join-Path $KILOCODE_DIR "mcp.json"

$CM_BLOCK = if ($CODEBASE_MEMORY_PATH) {
    "    `"codebase-memory`": { `"command`": `"$($CODEBASE_MEMORY_PATH -replace '\\', '\\')`", `"args`": [] },"
} else {
    "    // codebase-memory-mcp: install failed or skipped"
}

$JSON_CONTENT = @"
{
  "mcpServers": {
$CM_BLOCK
    "basic-memory": {
      "command": "$($BASIC_MEMORY_PATH -replace '\\', '\\')",
      "args": [
        "mcp",
        "--path",
        "$($DOCS_PATH -replace '\\', '\\')"
      ]
    }
  }
}
"@

$JSON_CONTENT | Out-File -FilePath $MCP_JSON -Encoding utf8
Log-Info "Written: $MCP_JSON"

# --------------------------------------------------
# 4. Create agent.md
# --------------------------------------------------
Write-Host "`n--------------------------------------------"
Write-Host "  Step 4: Creating agent.md"
Write-Host "--------------------------------------------"

$AGENT_MD_PATH = Join-Path $PROJECT_ROOT "agent.md"
$AGENT_CONTENT = @"
# Knowledge & Memory Configuration

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
"@

if (Test-Path $AGENT_MD_PATH) {
    $overwrite = Read-Host "  agent.md already exists. Overwrite? (y/n)"
    if ($overwrite -eq 'y') {
        $AGENT_CONTENT | Out-File -FilePath $AGENT_MD_PATH -Encoding utf8
        Log-Info "Overwritten: $AGENT_MD_PATH"
    }
} else {
    $AGENT_CONTENT | Out-File -FilePath $AGENT_MD_PATH -Encoding utf8
    Log-Info "Created: $AGENT_MD_PATH"
}

Write-Host "`n============================================"
Write-Host "  Setup Complete! (Windows)" -ForegroundColor Green
Write-Host "============================================`n"
Log-Info "Project Structure: $PROJECT_ROOT"
Log-Info "MCP Config: $MCP_JSON"
```

---

### 🚀 Step 4: Run Script

Open PowerShell and run (replace with your project path):

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope Process

.\setup-mcp-tools.ps1 "C:\path\to\your\project"
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

- Use the `docs/` folder to enable RAG by adding documentation and references  
- Do not store strict architectural rules or constraints inside `docs/`  
- Always define important rules and constraints, and decisions inside `agent.md` 
- Use the **User-Defined Constraints** section in `agent.md` to control agent behavior when needed.  