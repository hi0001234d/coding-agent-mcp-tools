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

#### Add user to Docker group (IMPORTANT)

```bash
sudo usermod -aG docker $USER
```
    - **Note:** After this, logout and login again to apply changes.

---

### Step 2: Install Docker Compose (v2)

```bash
sudo mkdir -p /usr/local/lib/docker/cli-plugins
```

```bash
sudo curl -SL https://github.com/docker/compose/releases/latest/download/docker-compose-linux-x86_64 \
-o /usr/local/lib/docker/cli-plugins/docker-compose
```

```bash
sudo chmod +x /usr/local/lib/docker/cli-plugins/docker-compose
```

---

### Verify

```bash
docker compose version
```

---

### Step 3: Create required folders

#### Add files from this repository

Place files like this:

```
docker_proj/
├── docker-compose.yml
├── mcp/
│   ├── codebase-memory/
│   │   └── Dockerfile
│   └── basic-memory/
│       └── Dockerfile
├── docs/
```

```bash
mkdir -p mcp/codebase-memory
mkdir -p mcp/basic-memory
mkdir docs
```

#### Add Dockerfiles

Create a Dockerfile inside each folder:

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

        RUN codebase-memory-mcp --version

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

        RUN basic-memory --version

        CMD ["basic-memory", "mcp", "--path", "/data/docs"]
```

        - **3. Add docker-compose.yml**

        Create a `docker-compose.yml` file in your main project root directory:

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

### Step 4: Add Sample Data

```bash
echo "this is example file." > docs/test.md
```

---

### Step 5: Start MCP Servers

```bash
docker compose up -d --build
```

---

### Step 6: Verify Containers

```bash
docker ps
```

You should see:

* `mcp_codebase_memory`
* `mcp_basic_memory`

---

### Step 7: Check Logs

```bash
docker logs mcp_codebase_memory
docker logs mcp_basic_memory
```

---

### Step 8: Add MCP Configuration

#### 8.1 Add MCP Configuration (Using Text Editor)

        - **! If Kilo Code is not installed, follow the steps below:**

        1. Install the Kilo Code extension in VS Code and open its Settings

        2. Go to Agent Behaviour → MCP Server

        3. Click Edit Project MCP and add the provided MCP configuration

        4. Save and verify the status turns green (connected successfully)

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

```bash
docker compose up -d
```

#### Stop containers

```bash
docker compose down
```

#### Restart containers

```bash
docker compose down && docker compose up -d
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