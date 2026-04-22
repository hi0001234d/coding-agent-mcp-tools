# 🐳 Run in Docker (Windows - Clean & Isolated Environment)

Docker provides a fully isolated environment on Windows where you can run your coding agent and MCP tools without affecting your host system.

---

## ✅ Use it if you want:
- A clean setup on Windows  
- To test multiple profiles  
- A disposable environment  

---

## ⚙️ Docker Setup

### Step 1: Install Docker Desktop

If Docker is not installed on your system:

1. Download and install [**Docker Desktop for Windows**](https://www.docker.com/products/docker-desktop/):  
2. During installation, ensure the **WSL 2 backend** option is selected.
3. Restart your computer if prompted and ensure Docker Desktop is running.

---

### Step 2: Run Docker Container

Open **PowerShell** inside your project folder, then run:

```powershell
docker run -it --name kilocode-container `
  -v ${PWD}:/your-project-root `
  -w /your-project-root `
  node:20 `
  bash
```

---

### 🔍 What this does

- `-v $(pwd):/your-project-root` → Your current project folder is mounted inside the container    
- `-w /your-project-root` → Container starts inside your project folder  
- `node:20` → Official Node.js v20 environment (required to run KiloCode and MCP tools)  

---

### Step 3: Setup MCP (One Command - Recommended)

Inside the container terminal (which is now a bash shell), paste and run this command:

```powershell
$composeContent = @"
services:
  mcp_setup:
    container_name: mcp_setup
    image: alpine
    volumes:
      - .:/project
    command: >
      sh -c '
        mkdir -p /project/.kilocode /project/docs &&
        printf "{\"mcpServers\":{\"codebase-memory\":{\"command\":\"docker\",\"args\":[\"exec\",\"-i\",\"mcp_codebase_memory\",\"codebase-memory-mcp\"],\"disabled\":false,\"alwaysAllow\":[]},\"basic-memory\":{\"command\":\"docker\",\"args\":[\"exec\",\"-i\",\"mcp_basic_memory\",\"basic-memory\",\"mcp\",\"--path\",\"/data/docs\"],\"disabled\":false,\"alwaysAllow\":[]}}}" > /project/.kilocode/mcp.json &&
        echo \"mcp.json generated!\"
      '
    restart: "no"

  mcp_codebase_memory:
    container_name: mcp_codebase_memory
    build:
      context: .
      dockerfile_inline: |
        FROM ubuntu:24.04
        ENV DEBIAN_FRONTEND=noninteractive
        RUN apt update && apt install -y curl tar && rm -rf /var/lib/apt/lists/*
        RUN curl -fsSL https://github.com/DeusData/codebase-memory-mcp/releases/latest/download/codebase-memory-mcp-linux-amd64.tar.gz \
            | tar xz && \
            mv codebase-memory-mcp /usr/local/bin/ && \
            chmod +x /usr/local/bin/codebase-memory-mcp
        WORKDIR /project
        ENTRYPOINT ["codebase-memory-mcp"]
    volumes:
      - .:/project
    stdin_open: true
    restart: unless-stopped

  mcp_basic_memory:
    container_name: mcp_basic_memory
    build:
      context: .
      dockerfile_inline: |
        FROM python:3.12-slim
        RUN pip install --no-cache-dir uv && uv tool install basic-memory
        ENV PATH="/root/.local/bin:`$PATH"
        ENV TMPDIR=/tmp
        RUN mkdir -p /data/docs
        WORKDIR /data
        ENTRYPOINT ["basic-memory"]
        CMD ["mcp", "--path", "/data/docs"]
    volumes:
      - ./docs:/data/docs
    stdin_open: true
    restart: unless-stopped
"@

$composeContent | Out-File -FilePath docker-compose.yml -Encoding utf8
Write-Host "docker-compose.yml generated successfully!"
```

👉 This will automatically create the **`docker-compose.yml`** file inside your project.

## 🚀 Run Docker Services

After creating the file, run:

```bash
docker compose up -d --build
```

👉 This command will build and start all the required containers.

---

## 🚀 Inside Docker (Complete Flow)

Now you are inside a clean container.

### Step 4: Verify Project

```bash
ls
```

You should see your project files like this.

```
your-project/
├── .kilocode/ -> #folder will be created
│   └── mcp.json -> #file will be generated (MCP configuration)
├── docs/ -> #folder will be created (used by basic-memory)
├── docker-compose.yml
```

---

### Step 5: Install KiloCode CLI

```bash
npm install -g @kilocode/cli
```

---

### Step 6: Start KiloCode

```bash
kilocode
```

After starting KiloCode, run the following command inside the CLI:

```bash 
/status
```

You should see MCP servers listed like:

* codebase-memory
* basic-memory

👉 This confirms that both MCP services are successfully installed and connected.

---

## 📝 Note

- After running the `kilocode` command(Step 6), MCP tools will start when you give your first prompt (e.g., `"Give me a broad overview of my project code"`)  
- KiloCode reads `mcp.json` and loads the tools based on your configuration    
- Everything runs inside Docker only  
- It may take a few minutes on first run, as MCP tools need to initialize 

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

---

## 🧹 Cleanup

### Exit container

```powershell
exit
```

### Remove container

💡 This will completely remove this setup.  
Use this when you no longer need this profile, as it cleans up everything created for this environment.

```powershell
docker rm -f kilocode-container
```
---

## ✅ Result

- Clean isolated environment on Windows 
- No impact on your system  
- Easy to test and remove 