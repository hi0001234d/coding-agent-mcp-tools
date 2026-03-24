## 🐳 Run in Docker (Clean & Isolated Environment)

Docker provides a fully isolated environment where you can run your coding agent and MCP tools without affecting your system.

### ✅ Use it if you want:

- A clean setup  
- To test multiple profiles  
- A disposable environment  

---

## ⚙️ Docker Setup

### Step 1: Install Docker

If Docker is not installed on your system, install it using the following commands:

```bash
sudo apt update
```

```bash
sudo apt install docker.io -y
```

```bash
sudo systemctl start docker
```

```bash
sudo systemctl enable docker
```

---

### Step 2: Run Docker Container

Open your terminal inside your project folder, then run:

```bash
docker run -it --name kilocode-container \
  -v $(pwd):/your-project-root \
  -w /your-project-root \
  node:20 \
  bash
```

---

### 🔍 What this does

- `-v $(pwd):/your-project-root` → Your current project folder is mounted inside the container    
- `-w /your-project-root` → Container starts inside your project folder  
- `node:20` → Official Node.js v20 environment (required to run KiloCode and MCP tools)  

---

### Step 3: Add MCP Configuration

#### 3.1 Create MCP File

```
mcp.json
```

- Create a file named `mcp.json`  
- Make sure it is in your project root  

---

#### 3.2 Add MCP Configuration (Using Editor)

Now edit the file using any editor you prefer.

👉 **Using terminal (vi editor):**

```bash
vi mcp.json
```

👉 **Or open using GUI editor (example: gedit):**

```bash
gedit mcp.json
```

---

Paste the following content inside the file:

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

💡 Save the file after pasting.

---

## 🚀 Inside Docker (Complete Flow)

Now you are inside a clean container.

### Step 4: Verify Project

```bash
ls
```

You should see your project files (including `mcp.json`).

---

### Step 5: Install KiloCode CLI

```bash
npm install -g kilocode
```

---

### Step 6: Start KiloCode

```bash
kilocode
```

---

### Step 7: MCP Auto Loads

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

<p align="center">
  <strong>
    <a href="">
      Looking for curated profiles for advanced use cases and real-world workflows?
    </a>
  </strong>
</p>