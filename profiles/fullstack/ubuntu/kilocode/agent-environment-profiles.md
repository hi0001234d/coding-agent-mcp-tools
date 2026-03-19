# 🚀 Full-stack Dev Stack (Ubuntu + VS Code + KiloCode)

This profile provides a ready-to-use full-stack development environment for coding agents using MCP tools.

Instead of installing tools one by one, just copy the MCP configuration and start working.

---

## ⚡ What You Get

- Pre-configured MCP tools for full-stack workflows  
- Works seamlessly with VS Code + KiloCode extension  
- Quick setup — copy, paste, and start  
- Optional: You can also run this setup inside Docker for a clean and isolated environment  

---

## ⚙️ Setup

### Step 1: Install Coding Agent

Install KiloCode extension for Visual Studio Code.

---

### Step 2: Add MCP Configuration

#### 2.1 Create MCP File

Create a file in your project:

```
mcp.json
```

**For Beginner Only**

- Open your project folder in VS Code  
- In the file explorer, click **New File**  
- Name the file exactly: `mcp.json`  
- Make sure it is created in the root of your project  

---

#### 2.2 Copy MCP Configuration

Copy and paste the following configuration:

```json
{
  "mcpServers": {
    "raygun": {
      "command": "npx",
      "args": ["raygun-mcp"]
    },
    "continue": {
      "command": "npx",
      "args": ["continue-mcp"]
    },
    "figma-context": {
      "command": "npx",
      "args": ["figma-context-mcp"]
    },
    "lldb": {
      "command": "npx",
      "args": ["lldb-mcp"]
    },
    "code-assistant": {
      "command": "npx",
      "args": ["code-assistant"]
    }
  }
}
```

**For Beginner Only**

- Open the `mcp.json` file in VS Code  
- Paste the above code inside it  
- Press `Ctrl + S` to save  
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

## 🚀 Start Using

Now you can start using prompts like:

- Analyze this codebase  
- Fix bugs  
- Generate APIs  

---

## 🐳 Optional: Docker (Clean Environment)

Use Docker if you want a separate and clean environment.

### When to Use

* You don’t want to install tools locally
* You are testing multiple stacks
* You want an isolated setup

---

### Basic Steps

1. Install Docker
2. Run a container
3. Mount your project
4. Add the same `mcp.json`
5. Run your coding agent inside the container

---

### Example

```bash
docker run -it \
  -v $(pwd):/workspace \
  ubuntu:latest \
  bash
```

---

## 💡 Notes

* MCP configuration is the main part
* Docker is optional
* Easy to test and remove
* Works best for quick experimentation

---

## 🔥 Idea Behind This

Part of **Agent Environment Profiles**

Goal:

* Reduce setup time
* Enable quick experimentation
* Make environments disposable
