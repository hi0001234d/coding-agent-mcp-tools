# 🖥️ Run on Your macOS (Direct Setup)

## ⚙️ Setup

### Step 1: Install Coding Agent

Install **KiloCode extension for Visual Studio Code.**

---

### Step 2: Add MCP Configuration

### 2.1 Install Required MCP Tools

#### Install Codebase Memory MCP

        - **2.1.1: Install Required Dependencies (If Not Installed)**

        If your system does not have required build tools, install them using:

```bash
        # Install Xcode Command Line Tools (required for gcc, git, make)
        xcode-select --install

        > A popup will appear — click "Install" and wait for it to finish.
        > If already installed, you will see: "command line tools are already installed"

        # Install Homebrew (if not installed)
        brew -v
        # If "command not found", install Homebrew:
        /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

        > Apple Silicon Mac (M1/M2/M3) only** — after Homebrew install, run:
        > echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zshrc
        > source ~/.zshrc
        > Intel Mac users can skip this.
        # Install required build tools (using Homebrew recommended)
        brew install gcc zlib git
```

        > If already installed, you can skip this step.


        - **2.1.2: Clone and Build the Tool**

        Run the following commands:

```bash
        git clone https://github.com/DeusData/codebase-memory-mcp.git
        cd codebase-memory-mcp

        scripts/build.sh
```

        - **2.1.3: Move Binary to System Path**

```bash
        mkdir -p ~/.local/bin

        mv build/c/codebase-memory-mcp ~/.local/bin/
        chmod +x ~/.local/bin/codebase-memory-mcp
```

        - **2.1.4: Verify Installation**

```bash
        codebase-memory-mcp --version
```

        - **⚠️ If You Face `.local/bin` Issues**

        If `.local/bin` directory does not exist or command is not found, follow these steps:

```bash
        mkdir -p ~/.local/bin

        mv build/c/codebase-memory-mcp ~/.local/bin/
        chmod +x ~/.local/bin/codebase-memory-mcp

        # For macOS (Zsh is default terminal)
        echo 'export PATH=$HOME/.local/bin:$PATH' >> ~/.zshrc
        source ~/.zshrc

        codebase-memory-mcp --version
```

        This ensures:

        - Binary is stored in correct location

        - Path is properly set

        - Command works globally

---

#### Install Basic Memory MCP

        - **Run the following commands in your terminal:**

```bash
        curl -LsSf https://astral.sh/uv/install.sh | sh

        echo 'export TMPDIR=/tmp' >> ~/.zshrc
        source ~/.zshrc

        uv tool install basic-memory

        basic-memory --version
```

        - **Find Basic Memory MCP Path**

```bash
        which basic-memory
```

        Use this path directly in your `mcp.json` configuration.

---

#### 2.2 Create MCP File (Create a file in your project)

```
.kilocode/mcp.json
```

        - **For Beginner Only**

          - Open your project folder in VS Code  

          - In the file explorer, click **New File**  

          - Name the file exactly: `mcp.json`  

          - Make sure it is created in the **root of your project**  

---

#### 2.3 Copy MCP Configuration (Copy and paste the following configuration)

```json
{
  "mcpServers": {
    "codebase-memory": {
      "command": "/Users/your-user-dir/.local/bin/codebase-memory-mcp"
    },
    "basic-memory": {
      "command": "/Users/your-user-dir/.local/bin/basic-memory",
      "args": [
        "mcp",
        "--path",
        "your-project-root/docs"
      ]
    }
  }
}
```

        - **For Beginner Only**

          - Open the **`.kilocode/mcp.json`** file in VS Code  

          - Paste the above code inside it  

          - Press **`Cmd + S`** to save  

          - Ensure the file is inside your project `.kilocode/` folder  

---

### Step 3: Create or Modify Agent Configuration

Create or update `agent.md` in your project root.

- If the file already exists → modify it  
- If not → create a new file named `agent.md`  

---

#### Add the following content to your `agent.md`:

```md
# Knowledge & Memory Configuration

## Documentation Retrieval & Context Building

Use MCP tools to retrieve, process, and build context from project-specific data.

- Always check the `docs/` directory before answering or making changes.
- codebase-memory MCP → Understand and recall codebase structure, files, and relationships.
- basic-memory MCP →  
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
```

---

### Step 4: Start Your Agent

Start KiloCode inside VS Code — it will automatically load MCP tools from `.kilocode/mcp.json`.

        - **For Beginner Only**

          - Open your project in VS Code  

          - Make sure `.kilocode/mcp.json` file is present  

          - Open KiloCode extension  

          - Start or reload the agent

          - The agent will read `mcp.json` and connect all tools  

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