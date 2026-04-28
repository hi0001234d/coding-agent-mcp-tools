# 🐳 Run in Docker (Clean & Isolated Environment)

## ⚡ One-Command Setup

Run all MCP tools in isolated Docker containers — no system-level installs, no dependency conflicts.

---

## ⚡ Quick Setup (Copy & Run)

### 🚀 Step 1: Go to Your Project Directory

```bash
cd ~/your-project
```

---

### 🚀 Step 2: Create Docker Compose File

```bash
nano docker-compose.yml
```

---

### 📋 Step 3: Add Docker Compose Configuration

```yaml
services:

  # ── Setup — writes .kilocode/mcp.json ──────────────────────────────────────
  mcp_setup:
    container_name: mcp_setup
    image: alpine
    volumes:
      - .:/project
    command: >
      sh -c '
        mkdir -p /project/.kilocode /project/.kilocode/rules /project/docs &&
        printf "{\"mcpServers\":{\
          \"language-server\":{\"command\":\"mcp-language-server\",\"args\":[\"--workspace\",\"/project/\",\"--lsp\",\"phpactor\",\"--\",\"language-server\"]},\
          \"semgrep\":{\"command\":\"semgrep\",\"args\":[\"mcp\"]},\
          \"basic-memory\":{\"command\":\"docker\",\"args\":[\"exec\",\"-i\",\"mcp_basic_memory\",\"basic-memory\",\"mcp\",\"--path\",\"/data/docs\"]},\
          \"laravel-boost\":{\"command\":\"php\",\"args\":[\"artisan\",\"boost:mcp\"],\"disabled\":true},\
          \"wordpress-mcp\":{\"command\":\"wp\",\"args\":[\"--path=/project\",\"mcp-adapter\",\"serve\",\"--server=mcp-adapter-default-server\",\"--user=admin\"],\"disabled\":true}\
        }}" > /project/.kilocode/mcp.json &&
        echo "mcp.json generated!"
      '
    restart: "no"

  # ── Slot 1: Language Server — Go + phpactor (PHP LSP) ──────────────────────
  mcp_language_server:
    container_name: mcp_language_server
    build:
      context: .
      dockerfile_inline: |
        FROM golang:1.23-bookworm
        RUN apt-get update && apt-get install -y php-cli php8.2-mbstring php8.2-xml composer nodejs npm && rm -rf /var/lib/apt/lists/*
        RUN go install github.com/isaacphi/mcp-language-server@latest
        RUN composer global require phpactor/phpactor
        ENV PATH="/root/go/bin:/root/.config/composer/vendor/bin:$PATH"
        WORKDIR /project
        ENTRYPOINT ["mcp-language-server"]
        CMD ["--workspace", "/project/", "--lsp", "phpactor", "--", "language-server"]
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

> ⚠️ **Laravel Boost and WordPress MCP are disabled by default in Docker.** Both tools run as project-level processes (`php artisan` / `wp` commands) and require your application to be running. Enable them by editing `.kilocode/mcp.json` after setup and setting `"disabled": false`.

---

### 🚀 Step 4: Run Docker Setup

```bash
docker compose run --rm mcp_setup
```

This creates `.kilocode/mcp.json` and the `docs/` directory.

> ⚠️ **Security:** Your `.kilocode/rules/security.md` is active every session.
> It enforces 4 rules: no mass assignment, parameterized DB queries only,
> no hardcoded secrets, no user-controlled file includes.
> See `.kilocode/rules/security.md` for details.

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

```bash
mkdir -p .kilocode/rules
```

Copy the contents from the 4 rule templates into `.kilocode/rules/`:
- `stack.md` — PHP 8.2+, Laravel conventions, Eloquent ORM
- `security.md` — 4 security rules (mass assignment, SQL injection, secrets, file inclusion)
- `ai-amnesia.md` — Basic Memory session workflow
- `code-review.md` — Pint, PHPStan, and code quality checklist

---

## 📁 Project Structure After Setup

```
your-project/
├── docker-compose.yml    ← Docker services config
├── .kilocode/
│   ├── mcp.json          ← MCP config (5 entries, Laravel+WP disabled by default)
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
4. To enable Laravel Boost: set `"disabled": false` for `laravel-boost` in `.kilocode/mcp.json`
5. To enable WordPress MCP: set `"disabled": false` for `wordpress-mcp` in `.kilocode/mcp.json`
6. MCP servers auto-connect on first prompt!

---

## 📝 Notes

- `mcp_setup` runs once and exits — it only writes the config files
- `mcp_language_server` builds on first run (installs Go + PHP + phpactor) — subsequent starts are instant
- Basic Memory notes persist in `./docs/` — they survive container restarts
- Laravel Boost and WordPress MCP require your application stack — not suitable for pure Docker isolation

<p align="center">
  <strong><a href="./curated-profiles.md">→ Explore Curated Profiles for your workflow</a></strong>
</p>
