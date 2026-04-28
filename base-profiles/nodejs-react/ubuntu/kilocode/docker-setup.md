# 🐳 Run in Docker (Clean & Isolated Environment)

## ⚡ One-Command Setup

Run all four MCP tools in isolated Docker containers — no system-level installs, no dependency conflicts.

---

## ⚡ Quick Setup (Copy & Run)

### 🚀 Step 1: Go to Your Project Directory

Open a terminal and navigate to your existing project folder (or create one):

```bash
cd ~/your-project
```

(If your project doesn't exist yet)

```bash
mkdir -p ~/your-project
cd ~/your-project
```

---

### 🚀 Step 2: Create Docker Compose File

Create a new file named `docker-compose.yml` in your project root.

```bash
nano docker-compose.yml
```

---

### 📋 Step 3: Add Docker Compose Configuration

Copy the full configuration below, paste it into the file, and save it.

```yaml
services:

  # ── Slot 0: Setup — writes .kilocode/mcp.json ──────────────────────────────
  mcp_setup:
    container_name: mcp_setup
    image: alpine
    volumes:
      - .:/project
    command: >
      sh -c '
        mkdir -p /project/.kilocode /project/.kilocode/rules /project/docs &&
        printf "{\"mcpServers\":{\
          \"language-server\":{\"command\":\"mcp-language-server\",\"args\":[\"--workspace\",\"/project/\",\"--lsp\",\"typescript-language-server\",\"--\",\"--stdio\"]},\
          \"semgrep\":{\"command\":\"semgrep\",\"args\":[\"mcp\"]},\
          \"basic-memory\":{\"command\":\"docker\",\"args\":[\"exec\",\"-i\",\"mcp_basic_memory\",\"basic-memory\",\"mcp\",\"--path\",\"/data/docs\"]},\
          \"figma-developer-mcp\":{\"command\":\"npx\",\"args\":[\"-y\",\"figma-developer-mcp\",\"--stdio\"],\"env\":{\"FIGMA_API_KEY\":\"YOUR-FIGMA-API-KEY\"},\"disabled\":true}\
        }}" > /project/.kilocode/mcp.json &&
        echo "mcp.json generated!"
      '
    restart: "no"

  # ── Slot 1: Language Server — Go + TypeScript LSP ──────────────────────────
  mcp_language_server:
    container_name: mcp_language_server
    build:
      context: .
      dockerfile_inline: |
        FROM golang:1.23-bookworm
        RUN apt-get update && apt-get install -y nodejs npm && rm -rf /var/lib/apt/lists/*
        RUN go install github.com/isaacphi/mcp-language-server@latest
        RUN npm install -g typescript typescript-language-server
        ENV PATH="/root/go/bin:$PATH"
        WORKDIR /project
        ENTRYPOINT ["mcp-language-server"]
        CMD ["--workspace", "/project/", "--lsp", "typescript-language-server", "--", "--stdio"]
    volumes:
      - .:/project
    stdin_open: true
    restart: unless-stopped

  # ── Slot 2: Semgrep — static analysis + security scanning ──────────────────
  mcp_semgrep:
    container_name: mcp_semgrep
    build:
      context: .
      dockerfile_inline: |
        FROM python:3.12-slim
        RUN pip install --no-cache-dir semgrep
        WORKDIR /project
        ENTRYPOINT ["semgrep"]
        CMD ["mcp"]
    volumes:
      - .:/project
    stdin_open: true
    restart: unless-stopped

  # ── Slot 3: Basic Memory — persistent agent memory ─────────────────────────
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
```

> ⚠️ **Figma (Slot 4) is disabled by default in Docker.** To enable it, open `.kilocode/mcp.json` after setup, add your Figma API key to `figma-developer-mcp → env → FIGMA_API_KEY`, and remove the `"disabled": true` line.

---

### 🚀 Step 4: Run Docker Setup

```bash
docker compose run --rm mcp_setup
```

This creates `.kilocode/mcp.json` and the `docs/` directory in your project.

> ⚠️ **Security:** Your `.kilocode/rules/security.md` is active every session.
> It enforces 3 rules: no hardcoded secrets, parameterized DB queries only,
> no direct `req.body` merges. See `.kilocode/rules/security.md` for details.

---

### 🚀 Step 5: Start MCP Services

```bash
docker compose up -d mcp_language_server mcp_semgrep mcp_basic_memory
```

Verify all services are running:

```bash
docker compose ps
```

---

### 🚀 Step 6: Add Rules Files

After setup, copy the rules files from the templates into your project:

```bash
mkdir -p .kilocode/rules
```

Copy the contents from the 4 rule templates into `.kilocode/rules/`:
- `stack.md` — TypeScript + Next.js conventions
- `security.md` — 3 security rules enforced every session
- `ai-amnesia.md` — Basic Memory session workflow
- `code-review.md` — Lint, type-check, and code quality checklist

---

## 📁 Project Structure After Setup

```
your-project/
├── docker-compose.yml    ← Docker services config
├── .kilocode/
│   ├── mcp.json          ← MCP config (4 tools, Figma disabled by default)
│   └── rules/
│       ├── stack.md
│       ├── security.md
│       ├── ai-amnesia.md
│       └── code-review.md
├── docs/                 ← Basic Memory knowledge base
└── your project files...
```

---

## 🚀 Next Steps

1. Open this project folder in VS Code / KiloCode
2. Create `AGENTS.md` in your project root (describe your project, tech stack, and conventions)
3. Add your project docs to: `docs/`
4. To enable Figma: add your API key to `.kilocode/mcp.json` under `figma-developer-mcp → env → FIGMA_API_KEY` and remove `"disabled": true`
5. MCP servers auto-connect on first prompt!

---

## 📝 Notes

- `mcp_setup` runs once and exits — it only writes the config files
- `mcp_language_server` builds on first run — subsequent starts are instant
- Basic Memory notes persist in `./docs/` — they survive container restarts
- Figma Context MCP calls the Figma API — it is intentionally disabled by default for privacy and simplicity

<p align="center">
  <strong><a href="./curated-profiles.md">→ Explore Curated Profiles for your workflow</a></strong>
</p>
