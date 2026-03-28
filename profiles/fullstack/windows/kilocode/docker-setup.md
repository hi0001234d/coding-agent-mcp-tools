# 🐳 Run in Docker (Windows - Clean & Isolated Environment)

Docker provides a fully isolated environment on Windows where you can run your coding agent and MCP tools without cluttering your system with Linux-based dependencies.

---

### ✅ Use it if you want:

- A clean setup  
- To test multiple profiles  
- A disposable environment  

---

## ⚙️ Docker Setup for Windows

### Step 1: Install Docker Desktop

- Download [**Docker Desktop for Windows**](https://www.docker.com/products/docker-desktop/)  
- Run the installer  
- Ensure **"Use WSL 2 instead of Hyper-V"** is checked (Recommended)  
- Restart your system after installation  
- Launch Docker Desktop and wait for **Engine Running (Green icon)**  

---

### Step 2: Verify Installation

Open PowerShell or Command Prompt:

```powershell
docker compose version
```

---

### Step 3: Create Required Folders

Place files like this:

```
mcp-project/
├── docker-compose.yml
├── mcp/
│   ├── codebase-memory/
│   │   └── Dockerfile
│   └── basic-memory/
│       └── Dockerfile
├── docs/
```

Create folders using PowerShell:

```powershell
mkdir mcp/codebase-memory, mcp/basic-memory, docs
```

---

### Step 4: Add Dockerfiles

Create the following files using VS Code.

        - **1. Codebase Memory MCP (`mcp/codebase-memory/Dockerfile`)**

```dockerfile
        FROM ubuntu:22.04

        WORKDIR /app

        RUN apt update && apt install -y \
            git \
            gcc \
            libglib2.0-dev \
            build-essential

        RUN git clone https://github.com/DeusData/codebase-memory-mcp.git

        WORKDIR /app/codebase-memory-mcp

        RUN chmod +x scripts/build.sh && scripts/build.sh

        RUN find . -type f -name "codebase-memory-mcp" -exec mv {} /usr/local/bin/codebase-memory-mcp \;

        CMD ["codebase-memory-mcp"]
```


        - **2. Basic Memory MCP (`mcp/basic-memory/Dockerfile`)**

```dockerfile
        FROM python:3.11

        WORKDIR /app

        RUN apt update && apt install -y curl

        RUN curl -LsSf https://astral.sh/uv/install.sh | sh

        ENV PATH="/root/.local/bin:$PATH"

        RUN uv tool install basic-memory

        CMD ["basic-memory", "mcp", "--path", "/data/docs"]
```


        - **3. Add docker-compose.yml**

        Create a **`docker-compose.yml`** file in your main project root directory:

```yaml
        services:
          codebase-memory:
            build: ./mcp/codebase-memory
            container_name: mcp_codebase_memory
            stdin_open: true
            tty: true

          basic-memory:
            build: ./mcp/basic-memory
            container_name: mcp_basic_memory
            volumes:
              - ./docs:/data/docs
            stdin_open: true
            tty: true
```

---

### Step 5: Start MCP Servers

Open PowerShell inside your project folder:

```powershell
docker compose up -d --build
```

---

### Step 6: Verify Containers

```powershell
docker ps
```

You should see:

- `mcp_codebase_memory`  
- `mcp_basic_memory`  

---

### Step 7: Check Logs

```bash
docker logs mcp_codebase_memory
docker logs mcp_basic_memory
```
---

### Step 8: Add MCP Configuration

#### 8.1 Add MCP Configuration (Using Text Editor)

        - **⚠️ If Kilo Code is not installed, follow the steps below:**

        - 1. Install the Kilo Code extension in VS Code and open its Settings

        - 2. Go to Agent Behaviour → MCP Server

        - 3. Click Edit Project MCP and add the provided MCP configuration

        - 4. Save and verify the status turns green (connected successfully) 

---

Paste the following content inside the file:

```json
{
  "mcpServers": {
    "codebase-memory": {
      "command": "docker",
      "args": ["exec", "-i", "mcp_codebase_memory", "codebase-memory-mcp"]
    },
    "basic-memory": {
      "command": "docker",
      "args": ["exec", "-i", "mcp_basic_memory", "basic-memory", "mcp", "--path", "/data/docs"]
    }
  }
}
```

👉 Save the file after pasting.

---
### Useful Commands

#### Start containers

```powershell
docker compose up -d
```

#### Stop containers:

```powershell
docker compose down
```

#### Restart containers

```powershell
docker compose restart
```

#### Remove containers completely:

```powershell
docker compose down -v
```

---

## ✅ Result

- Clean isolated environment  
- No impact on your system  
- Easy to test and remove  