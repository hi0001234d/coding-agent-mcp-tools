# 🎧 Laravel + WordPress Workflows

Building with Laravel or WordPress means using the optional MCP tools in this profile.
This page covers how to enable and use Laravel Boost and WordPress MCP Adapter together
with the base 3-tool setup.

---

## ✅ Prerequisites

Check which optional tools are active:

```
/status
```

- If you see `laravel-boost` connected → Laravel Boost is enabled ✅
- If you see `wordpress-mcp` connected → WordPress MCP Adapter is enabled ✅
- If either shows `disabled: true` → open `.kilocode/mcp.json` and set `"disabled": false`

---

## 🏗️ Laravel Boost Workflow

Laravel Boost gives your agent live access to your application internals.

### Ask your agent directly
```
What routes are defined in this Laravel app?
Show me the database schema for the orders table
Search the Laravel docs for how to implement queued jobs
What was the last error in the application log?
```

No manual copying of route files or schema dumps — the agent reads them directly.

### Store Laravel architecture decisions in Basic Memory
```
Write a note: this project uses Repository pattern — all DB access goes through repositories in app/Repositories/
```

Next session, the agent already knows your architecture.

---

## 🌐 WordPress MCP Adapter Workflow

WordPress MCP Adapter exposes WordPress internals to your agent.

### Ask your agent directly
```
What custom post types are registered in this WordPress site?
List all registered hooks and filters in this plugin
What capabilities does the subscriber role have?
```

### Building WordPress plugins with AI
1. Ask the agent to read the existing hook registrations
2. Let Basic Memory store the plugin's action/filter conventions
3. Use Semgrep to scan for file inclusion vulnerabilities before shipping

---

## 🔧 Enabling Tools After Setup

If you skipped Laravel or WordPress during setup, enable them manually:

**Laravel Boost:**
```bash
cd /path/to/your/project
composer require laravel/boost --dev
php artisan boost:install
```
Then in `.kilocode/mcp.json`, set `laravel-boost → disabled: false`.

**WordPress MCP Adapter:**
```bash
cd /path/to/your/wordpress
composer require wordpress/abilities-api wordpress/mcp-adapter
```
Then in `.kilocode/mcp.json`, set `wordpress-mcp → disabled: false` and update `--user=` to your admin username.

---

## 📝 Notes

- Laravel Boost requires `artisan` in your project root — it must be run from a Laravel project
- WordPress MCP Adapter requires WP-CLI (`wp` command) installed globally
- Both tools are project-level — they call your local PHP/WP installation, not a remote API
- For fully local work (no optional tools): see [fully-local.md](./fully-local.md)

<p align="center">
  <strong><a href="./agent-environment-profiles.md">← Back to Profile Overview</a></strong>
</p>
