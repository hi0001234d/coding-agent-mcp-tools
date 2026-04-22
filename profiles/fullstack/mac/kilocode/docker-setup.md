# 🐳 Run in Docker (macOS - Clean & Isolated Environment)

Docker provides a fully isolated environment on macOS where you can run your coding agent and MCP tools without affecting your host system.

### ✅ Use it if you want:
- A clean setup on macOS
- To test multiple profiles
- A disposable environment

---

## ⚙️ Docker Setup

### Step 1: Install Docker Desktop
If Docker is not installed on your Mac:
1. Download and install [Docker Desktop for Mac](https://www.docker.com/products/docker-desktop/) (Choose **Apple Chip** for M1/M2/M3 or **Intel Chip** depending on your Mac).
2. Drag Docker to your Applications folder and launch it.
3. Ensure the Docker icon in the menu bar shows "Docker Desktop is running".

---

### Step 2: Run Docker Container
Open your **Terminal** inside your project folder, then run:

```bash
docker run -it --name kilocode-container \
  -v $(pwd):/your-project-root \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -w /your-project-root \
  node:20 \
  bash
```

---

### 🔍 What this does

- `-v $(pwd):/your-project-root` → Your current project folder is mounted inside the container  
- `-v /var/run/docker.sock:/var/run/docker.sock` → Allows the container to communicate with the host's Docker engine (required for MCP tools to connect via `docker exec`)  
- `-w /your-project-root` → Container starts inside your project folder  
- `node:20` → Official Node.js v20 environment (required to run KiloCode and MCP tools)  

---

### Step 3: Install Docker CLI Inside Container

Inside the container terminal (bash), run:

```
apt-get update && apt-get install -y docker.io
```

> This installs the Docker CLI so the container can run `docker exec` commands to communicate with MCP containers.

---

### Step 4: Setup MCP (One Command - Recommended)

👉 Paste the below command into your project terminal and press Enter.
This will automatically create the **`docker-compose.yml`** file.

```bash
cat << 'EOF' > docker-compose.yml
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
        echo "mcp.json generated!"
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
        ENV PATH="/root/.local/bin:$PATH"
        ENV TMPDIR=/tmp
        RUN mkdir -p /data/docs
        WORKDIR /data
        ENTRYPOINT ["basic-memory"]
        CMD ["mcp", "--path", "/data/docs"]
    volumes:
      - ./docs:/data/docs
    stdin_open: true
    restart: unless-stopped
EOF

echo "docker-compose.yml has been created for Mac!"
```

## 🚀 Run Docker Services

👉 After creating the file, **exit the container first**, then run from your Mac terminal:

```
exit
```

```bash
docker compose up -d --build
```

Then re-enter the container:

```
docker start -i kilocode-container
```

👉 This command will build and start all the required containers.

---

## 🚀 Inside Docker (Complete Flow)

Now you are inside a clean container.

### Step 5: Verify Project

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

### Step 6: Install KiloCode CLI

```bash
npm install -g @kilocode/cli
```

---

### Step 7: Start KiloCode

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

- Clean isolated environment on macOS
- No impact on your system  
- Easy to test and remove 