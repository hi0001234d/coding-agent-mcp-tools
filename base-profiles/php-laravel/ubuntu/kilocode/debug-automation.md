# 🐛 Fix the Day 2 Problem — Debug + Review Workflow

Vibe-coded PHP apps are fast to build and painful to maintain.

Your agent introduced a mass assignment vulnerability. Hardcoded a database password. Broke a route it didn't mean to touch. This is the Day 2 Problem — and it gets worse the longer a project runs without automated checks.

**Semgrep (Slot 2) catches these before they ship.**

---

## ✅ Prerequisites

Semgrep must be active. Check:

```
/status
```

You should see `semgrep` listed as connected.

---

## 🔒 Using Semgrep in Your Workflow

### Scan changed files
```
Run Semgrep on the files changed in this session
```

### Scan a specific directory
```
Run Semgrep on /app/Http/Controllers/ with the PHP security ruleset
```

### Scan with PHP-specific rules
```bash
semgrep --config=p/php
```

PHP community rules cover: SQL injection, XSS, command injection, insecure deserialization — the patterns AI most commonly generates wrong.

---

## 🧭 Debugging with Language Server (Slot 1)

When Semgrep surfaces an issue, use phpactor via the Language Server to navigate to the root cause:

```
Find all references to UserController::store() across the project
Show me the definition of the OrderService class
List all PHP diagnostics in app/Http/Controllers/UserController.php
```

Language Server gives you go-to-definition and find-references without reading entire files — targeted navigation, not full-file dumps.

---

## ✅ Code Review Checklist

Before marking any task done, the `code-review.md` rules file enforces:

1. `./vendor/bin/pint` — zero style violations
2. `./vendor/bin/phpstan analyse` — zero static analysis errors
3. No `dd()`, `var_dump()`, or `dump()` in production paths
4. No unused `use` statements

These run automatically because `code-review.md` is active in every session.

---

## 📝 Notes

- Semgrep runs locally — no data sent externally without `semgrep login`
- `semgrep login` enables Pro rules; skip it for fully local operation
- The `security.md` rules file enforces 4 PHP-specific checks every session automatically

<p align="center">
  <strong><a href="./agent-environment-profiles.md">← Back to Profile Overview</a></strong>
</p>
