/**
 * Validate command — checks published profile files for correctness.
 *
 * Validates ALL agents detected in the stack.
 * Runs content checks defined in each stack's validationRules:
 * - File existence
 * - Required content strings per file
 * - OS-specific content checks
 * - Link resolution (relative links within profiles)
 */

const fs = require('fs');
const path = require('path');
const { log, logSuccess, logError, logWarn, logInfo, logBold } = require('./utils');
const { getExpectedFiles } = require('./config');

function validate(stack, filterAgent) {
  const agents = filterAgent ? [filterAgent] : stack.agents;

  if (agents.length === 0) {
    logError(`No agents found for ${stack.name}. Nothing to validate.`);
    return { success: false, passed: 0, failed: 0, failures: [] };
  }

  log(`\nValidating ${stack.name} profiles...`);
  logInfo(`Agents: ${agents.join(', ')}\n`);

  let totalChecks = 0;
  let passed = 0;
  let failed = 0;
  const failures = [];

  for (const agent of agents) {
    logBold(`  Agent: ${agent}`);

    for (const os of stack.osVariants) {
      const sourceDir = path.join(stack.sourceBase, os, agent);
      log(`    [${os}]`);

      // Check directory exists
      if (!fs.existsSync(sourceDir)) {
        logError(`      Directory missing: ${sourceDir}`);
        failures.push({ agent, os, file: '*', reason: 'Source directory does not exist' });
        failed++;
        totalChecks++;
        continue;
      }

      for (const file of getExpectedFiles(os)) {
        const filePath = path.join(sourceDir, file);
        totalChecks++;

        // File existence check
        if (!fs.existsSync(filePath)) {
          logError(`      FAIL: ${file} — file missing`);
          failures.push({ agent, os, file, reason: 'File does not exist' });
          failed++;
          continue;
        }

        const content = fs.readFileSync(filePath, 'utf8');
        const ruleKey = (file === 'macos-setup.md' || file === 'windows-setup.md') ? 'system-setup.md' : file;
        const rules = stack.validationRules[ruleKey];

        if (!rules) {
          logWarn(`      SKIP: ${file} — no validation rules defined`);
          continue;
        }

        let fileOk = true;

        // Check mustContain (common across all OS)
        if (rules.mustContain) {
          for (const keyword of rules.mustContain) {
            if (!content.toLowerCase().includes(keyword.toLowerCase())) {
              logError(`      FAIL: ${file} — missing "${keyword}"`);
              failures.push({ agent, os, file, reason: `Missing content: "${keyword}"` });
              fileOk = false;
            }
          }
        }

        // Check mustContainByOS (OS-specific checks)
        if (rules.mustContainByOS && rules.mustContainByOS[os]) {
          for (const keyword of rules.mustContainByOS[os]) {
            if (!content.toLowerCase().includes(keyword.toLowerCase())) {
              logError(`      FAIL: ${file} [${os}] — missing "${keyword}"`);
              failures.push({ agent, os, file, reason: `Missing OS-specific content: "${keyword}"` });
              fileOk = false;
            }
          }
        }

        // Check relative links resolve
        const linkPattern = /\[.*?\]\(\.\/([\w.-]+)\)/g;
        let match;
        while ((match = linkPattern.exec(content)) !== null) {
          const linkedFile = match[1];
          const linkedPath = path.join(sourceDir, linkedFile);
          if (!fs.existsSync(linkedPath)) {
            logError(`      FAIL: ${file} — broken link to ./${linkedFile}`);
            failures.push({ agent, os, file, reason: `Broken relative link: ./${linkedFile}` });
            fileOk = false;
          }
        }

        // Check file is not empty
        if (content.trim().length === 0) {
          logError(`      FAIL: ${file} — file is empty`);
          failures.push({ agent, os, file, reason: 'File is empty' });
          fileOk = false;
        }

        if (fileOk) {
          logSuccess(`      PASS: ${file}`);
          passed++;
        } else {
          failed++;
        }
      }
    }
  }

  // Summary
  log('');
  log(`  Checks: ${totalChecks} total, ${passed} passed, ${failed} failed`);
  log(`  Agents: ${agents.length} | OS: ${stack.osVariants.length} | Files: ${stack.expectedFiles.length} per OS`);

  if (failures.length > 0) {
    log('');
    logWarn('  Failures:');
    failures.forEach((f) => {
      logError(`    [${f.agent}/${f.os}] ${f.file}: ${f.reason}`);
    });
  }

  if (failed === 0) {
    logSuccess(`\nAll validations passed for ${stack.name} (${agents.length} agent(s)).`);
  } else {
    logError(`\n${failed} validation(s) failed for ${stack.name}. Fix before committing.`);
  }

  return { success: failed === 0, passed, failed, failures };
}

module.exports = { validate };
