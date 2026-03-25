# 🖥️ Run on Your System (Direct Setup)

## ⚙️ Setup

### Step 1: Install Coding Agent

Install **KiloCode extension for Visual Studio Code.**

---

### Step 2: Add MCP Configuration

### 2.1 Install Required MCP Tools

#### Install Codebase Memory MCP

Run the following commands in your terminal:

```
git clone https://github.com/DeusData/codebase-memory-mcp.git
cd codebase-memory-mcp

scripts/build.sh

mv build/c/codebase-memory-mcp ~/.local/bin/
chmod +x ~/.local/bin/codebase-memory-mcp

codebase-memory-mcp --version
```

---

#### Install Basic Memory MCP

Run the following commands in your terminal:

```
curl -LsSf https://astral.sh/uv/install.sh | sh

echo 'export TMPDIR=/tmp' >> ~/.bashrc
source ~/.bashrc

uv tool install basic-memory

basic-memory --version
```

---

#### 2.2 Create MCP File (Create a file in your project)

```
mcp.json
```

**For Beginner Only**

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
      "command": "/home/your-user/.local/bin/codebase-memory-mcp"
    },
    "basic-memory": {
      "command": "/home/your-user/.local/share/uv/tools/basic-memory/bin/basic-memory",
      "args": [
        "mcp",
        "--path",
        "/path/to/your/data"
      ]
    }
  }
}
```

**For Beginner Only**

- Open the **`mcp.json`** file in VS Code  
- Paste the above code inside it  
- Press **`Ctrl + S`** to save  
- Ensure the file is inside your project folder  

---

### Step 3: Create or Modify Agent Configuration

Create or update `agent.md` in your project root.

- If the file already exists → modify it  
- If not → create a new file named `agent.md`  

#### Add the following content to your agent.md:

```md
# Knowledge & Memory Configuration

## Documentation Retrieval & Context Building

Use MCP tools to retrieve, process, and build context from project-specific data.

- Always check the `docs/` directory before answering or making changes.
- **codebase-memory MCP** → Understand and recall codebase structure, files, and relationships.
- **basic-memory MCP** →  
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

## Rules & Constraints (Strict Instructions)

- Use the `docs/` folder only for documentation, flows, and reference material.
- Do NOT store strict architectural rules or critical constraints inside `docs/`.
- All important rules, architecture decisions, and constraints MUST be defined in this `agent.md`.
- Follow `agent.md` as the source of truth for behavior and decision-making.
```

---

### Step 4: Start Your Agent

Start KiloCode inside VS Code — it will automatically load MCP tools from `mcp.json`.

**For Beginner Only**

- Open your project in VS Code  
- Make sure `mcp.json` file is present  
- Open KiloCode extension  
- Start or reload the agent  
- The agent will read `mcp.json` and connect all tools  

---

## ✅ Start Using

Now you can start using your setup with:

- **RAG-based workflows**  
Upload your documentation, project notes, or references and let the agent retrieve and use them intelligently while answering or modifying code.

- **Agent-driven development**  
Give prompts like “analyze this codebase”, “fix this bug”, or “add a new feature”. The agent will use MCP tools automatically to understand your project, maintain context, and assist you during development.

## Notes

- Use the `docs/` folder to enable RAG by adding documentation and references  
- Do not store strict architectural rules or constraints inside `docs/`  
- Always define important rules and constraints inside `agent.md`  

<p align="center">
  <strong>
    <a href="./curated-profiles.md">
      Looking for curated profiles for advanced use cases and real-world workflows?
    </a>
  </strong>
</p>