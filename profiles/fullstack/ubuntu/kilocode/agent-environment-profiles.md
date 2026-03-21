# 🚀 Full-stack Dev Stack (Ubuntu + VS Code + KiloCode)

This profile provides a ready-to-use **full-stack development environment** for coding agents using MCP tools.

Instead of installing tools one by one, just copy the MCP configuration and start working.

---

## ⚡ What You Get

- **Pre-configured MCP tools** for full-stack workflows  
- **Works seamlessly with VS Code + KiloCode extension**  
- **Quick setup** — copy, paste, and start  
- **Optional:** You can also run this setup inside Docker for a clean and isolated environment  

---

<h2 align="center">🧭 Choose Your Environment</h2>

<p align="center">
Select how you want to run this development environment:
</p>

<p align="center">

<a href="./system-setup.md">
  <img src="https://img.shields.io/badge/🖥️%20RUN%20ON%20YOUR%20SYSTEM-6C63FF?style=for-the-badge" />
</a>

<a href="./docker-setup.md">
  <img src="https://img.shields.io/badge/🐳%20RUN%20IN%20DOCKER-2496ED?style=for-the-badge&logo=docker&logoColor=white" />
</a>

</p>

### Which should you choose?

- **Run on Your System** — Simple and quick setup directly on your computer, best for beginners and daily development 
- **Run in Docker** — Runs in an isolated container on your system, ideal for clean environments, testing, and experimentation

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
