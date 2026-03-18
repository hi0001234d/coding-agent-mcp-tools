# 🚀 Full Stack Dev Stack (Ubuntu + KiloCode)

This profile provides a ready-to-use full stack development environment using coding agents.

Instead of installing tools one by one, just copy the MCP configuration and start working.

---

## ⚡ What You Get

* Pre-configured MCP tools for full stack workflows
* Works with KiloCode agent
* Quick setup (copy-paste based)
* Optional clean environment using Docker

---

## ⚙️ Setup

### Step 1: Install Coding Agent

Install your coding agent (KiloCode) on your system.

---

### Step 2: Add MCP Configuration

Create a file in your project:

```
mcp.json
```

Copy and paste the following:

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["@modelcontextprotocol/server-filesystem"]
    },
    "git": {
      "command": "npx",
      "args": ["@modelcontextprotocol/server-git"]
    },
    "http": {
      "command": "npx",
      "args": ["@modelcontextprotocol/server-fetch"]
    }
  }
}
```

> You can modify or extend tools based on your needs.

---

### Step 3: Start Your Agent

Run your coding agent.

It will automatically load all MCP tools from `mcp.json`.

---

## 🧪 How to Use

Open your project and use prompts like:

* Analyze this codebase
* Fix this issue
* Generate API
* Improve performance
* Debug errors

---

## 🧹 Cleanup

If you don’t want this setup:

* Remove `mcp.json`
* Or delete MCP entries

This setup is temporary and disposable.

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
