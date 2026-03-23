## 🐳 Run in Docker (Clean & Isolated Environment)

Docker provides a fully isolated environment where you can run your coding agent and MCP tools without affecting your system.

### ✅ Use it if you want:

- A clean setup  
- To test multiple profiles  
- A disposable environment  

---

## ⚙️ Docker Setup

### Step 1: Run Docker Container

Open your terminal inside your project folder, then run:

```bash
docker run -it --name kilocode-container \
  -v $(pwd):/workspace \
  -w /workspace \
  node:20 \
  bash
```

---

### 🔍 What this does

- `-v $(pwd):/workspace` → Your current project folder is mounted inside the container  
- `-w /workspace` → Container starts inside your project folder  
- `node:20` → Official Node.js v20 environment (required to run KiloCode and MCP tools)  
- `bash` → Opens terminal inside the container  

👉 **So basically:**  
You are running a temporary Node.js environment with your project inside it.

---

### Step 2: Add MCP Configuration

#### 2.1 Create MCP File

```
mcp.json
```

- Create a file named `mcp.json`  
- Make sure it is in your project root  

---

#### 2.2 Copy MCP Configuration

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

- Open `mcp.json`  
- Paste the above code  
- Save the file  

---

## 🚀 Inside Docker (Complete Flow)

Now you are inside a clean container.

### Step 3: Verify Project

```bash
ls
```

You should see your project files (including `mcp.json`).

---

### Step 4: Install KiloCode CLI

```bash
npm install -g kilocode
```

---

### Step 5: Start KiloCode

```bash
kilocode
```

---

### Step 6: MCP Auto Loads

- KiloCode reads `mcp.json` from your project  
- All MCP tools start automatically  
- Everything runs inside Docker only  

---

## 🧹 Cleanup

### Exit container

```bash
exit
```

### Remove container

💡 This will completely remove this setup.  
Use this when you no longer need this profile, as it cleans up everything created for this environment.

```bash
docker rm kilocode-container
```
---

## ✅ Result

- Clean isolated environment  
- No impact on your system  
- Easy to test and remove  