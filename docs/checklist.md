# Build Checklist

## Build Preferences

- **Build mode:** Autonomous
- **Comprehension checks:** N/A (autonomous mode)
- **Git:** Commit after each item with message: "fix step N: [title]"
- **Verification:** Yes — checkpoints after every 2 items
- **Check-in cadence:** N/A (autonomous mode)

## Checklist

- [x] **1. Fix validate.js — read from sourceBase (base-profiles/) not targetBase (profiles/)**
  Spec ref: `spec.md > Component: src/validate.js > Behavior`
  What to build: Change `stack.targetBase` to `stack.sourceBase` in the directory path inside validate.js. Confirm the path order (agent/os or os/agent) matches the actual filesystem structure in base-profiles/. Validate must be read-only and must read source profiles, not published ones.
  Acceptance: Running `validate nodejs-react` reads from `base-profiles/` not `profiles/`. Validation never touches the profiles/ directory.
  Verify: Run `node cli/bin/profile-cli.js validate nodejs-react` and confirm the logged paths reference `base-profiles/`, not `profiles/`.

- [x] **2. Fix index.js runAll — correct pipeline order + add standalone publish gate**
  Spec ref: `spec.md > Component: src/index.js > runAll`
  What to build: (a) Fix runAll() order from `publish → validate → readme → nav` to `validate → publish → readme → nav`. (b) Add module-level `let validatePassedThisSession = false` in index.js, set to true when validate returns success, check it before standalone publish calls.
  Acceptance: `all nodejs-react` runs in order: validate → publish → readme → nav. Running `publish nodejs-react` without a prior validate in the same session prints `✗ Profiles not validated. Run validate first.` and exits with code 1.
  Verify: Run `node cli/bin/profile-cli.js publish nodejs-react` cold (no prior validate) — must block. Then run `node cli/bin/profile-cli.js all nodejs-react --agent kilocode` — step prefixes must appear in order: [validate], [publish], [readme], [nav].

- [x] **3. Fix update-nav.js — undefined stack.agent + missing logWarn import**
  Spec ref: `spec.md > Component: src/update-nav.js > Behavior`
  What to build: (a) Remove `stack.agent` reference in buildNavBadge — it's undefined. The function should iterate over detected agents, not reference a single one. (b) Add `logWarn` to the require from utils.js. (c) Fix the nav entry format to use the actual agent list from stack.agents.
  Acceptance: `update-nav nodejs-react` completes without crashing. Navigation entries reference real agent paths, not undefined.
  Verify: Run `node cli/bin/profile-cli.js update-nav nodejs-react` — must not throw a ReferenceError or produce `undefined` in any output line.

- [x] **4. End-to-end pipeline test with kilocode**
  Spec ref: `spec.md > Data Flow > all pipeline flow`
  What to build: No new code — run the full pipeline and verify each command produces correct output. Fix any remaining issues discovered during the run.
  Acceptance: `all nodejs-react --agent kilocode` completes all 4 steps with ✓ on each. Status shows kilocode as `published` after the run. README and navigation.md are updated with correct paths.
  Verify: Run `node cli/bin/profile-cli.js all nodejs-react --agent kilocode`, then run `node cli/bin/profile-cli.js status`. Kilocode should show `published` for all 3 OS variants.

- [x] **5. Test error paths**
  Spec ref: `spec.md > Component: src/index.js`, `spec.md > Component: src/validate.js`
  What to build: No new code — run error scenarios and fix any that don't produce the correct output/exit codes.
  Acceptance: (a) `validate unknown-stack` exits 2 with correct message. (b) `validate nodejs-react --agent unknown` exits 2. (c) `publish nodejs-react` without prior validate exits 1. (d) `validate nodejs-react` on an empty profile exits 1.
  Verify: Run each error scenario above and confirm the exact error message and exit code (`echo $?`).

- [x] **6. Wire generate command in index.js**
  Spec ref: `spec.md > Component: src/generate.js`
  What was built: (a) Added `const { generate } = require('./generate')` import to index.js. (b) Added `case 'generate'` to the run() switch — calls `generate(stack, agent)` directly, with no `validateAgent()` call so it works for brand-new agents that have no files yet. (c) Updated USAGE string and examples to include the generate command.
  Acceptance: `profile-cli generate nodejs-react --agent kilocode` reads instructions.yaml and writes 27 files (9 sections × 3 OS) to base-profiles/. Works even when base-profiles/ contains only instructions.yaml.
  Verify: Run `node cli/bin/profile-cli.js generate nodejs-react --agent kilocode` — must complete with 27 files written. Run `node cli/bin/profile-cli.js status` — kilocode must show as `unpublished`. Then run `node cli/bin/profile-cli.js all nodejs-react --agent kilocode` — must complete all 4 steps.

- [x] **7. Submit to Devpost**
  Spec ref: `prd.md > What We're Building`
  What to build: Prepare the Devpost submission. Write project name ("ProfileForge CLI"), tagline, and description using scope.md and prd.md. Add built-with tags (Node.js, Markdown). Take terminal screenshots of `status`, `validate`, and `all` commands running. Link the GitHub repo. Upload planning docs as artifacts.
  Acceptance: Devpost submission is live with name, tagline, description, built-with, screenshots, and repo link. Green "Submitted" badge visible.
  Verify: Open the Devpost submission page and confirm all fields are filled and the submission badge is green.
