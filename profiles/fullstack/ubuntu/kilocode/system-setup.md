# 🖥️ Run on Your System (Direct Setup)

## ⚙️ Setup

### Step 1: Install Coding Agent

Install **KiloCode extension for Visual Studio Code.**

---

### Step 2: Add MCP Configuration

#### 2.1 Create MCP File (Create a file in your project)

```
mcp.json
```

**For Beginner Only**

- Open your project folder in VS Code  
- In the file explorer, click **New File**  
- Name the file exactly: `mcp.json`  
- Make sure it is created in the **root of your project**  

---

#### 2.2 Copy MCP Configuration (Copy and paste the following configuration)

```json
{
  "mcpServers": {
    "llama-index": {
      "command": "npx",
      "args": ["-y", "@llamaindex/mcp-server"]
    },
    "codebase-memory": {
      "command": "npx",
      "args": ["-y", "codebase-memory-mcp"]
    },
    "basic-memory": {
      "command": "npx",
      "args": ["-y", "basic-memory-mcp"]
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
# Agent Configuration

## RAG (Retrieval-Augmented Generation)

Use the available MCP tools to enhance responses with project-specific knowledge.

- llama-index MCP → Use llama-index MCP to index and query documentation from the `docs/` folder.
- Always read and retrieve relevant context from the `docs/` directory before answering or making changes.
- codebase-memory MCP → Use codebase-memory MCP to understand and recall codebase structure and context.
- basic-memory MCP → Use basic-memory MCP for lightweight memory and quick context storage.

The `docs/` folder is the primary place for project documentation, notes, flows, and references.

## Agent Behavior

- Always try to understand the full codebase before making changes.
- Use RAG (`docs/`) + memory tools to maintain context across tasks.
- Prefer safe and explainable changes over blind code generation.
- Assist in debugging, refactoring, and extending existing systems.

## Important Guidelines

- Store documentation, flows, and reference material inside the `docs/` folder.
- Do NOT store strict rules, architectural constraints, or critical instructions inside `docs/`.
- Define all important rules and constraints inside this `agent.md` file.
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

<p align="center">
  <strong>
    <a href="./curated-profiles.md">
      Looking for curated profiles for advanced use cases and real-world workflows?
    </a>
  </strong>
</p>