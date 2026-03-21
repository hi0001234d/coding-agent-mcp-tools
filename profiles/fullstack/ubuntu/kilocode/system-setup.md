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

### Step 3: Start Your Agent

Start KiloCode inside VS Code — it will automatically load MCP tools from `mcp.json`.

**For Beginner Only**

- Open your project in VS Code  
- Make sure `mcp.json` file is present  
- Open KiloCode extension  
- Start or reload the agent  
- The agent will read `mcp.json` and connect all tools  

---

## ✅ Start Using

Now you can start using prompts like:

- Analyze this codebase  
- Fix bugs  
- Generate APIs  

<p align="center">
  <strong>
    <a href="./curated-profiles.md">
      Looking for curated profiles for advanced use cases and real-world workflows?
    </a>
  </strong>
</p>