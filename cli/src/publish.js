/**
 * Publish command — copies profile files from base-profiles (submodule)
 * to the public profiles/ directory.
 *
 * Auto-detects all agents in base-profiles and publishes all of them.
 * Does NOT modify source files. Read-only from base-profiles.
 */

const fs = require('fs');
const path = require('path');
const { log, logSuccess, logError, logWarn, logInfo, logBold } = require('./utils');
const { getExpectedFiles } = require('./config');

function publish(stack, filterAgent) {
  const agents = filterAgent ? [filterAgent] : stack.agents;

  if (agents.length === 0) {
    logError(`No agents found in base-profiles for ${stack.name}.`);
    logError(`Expected folders at: ${stack.sourceBase}/{os}/{agent}/`);
    return { success: false, copied: 0, errors: ['No agents detected'] };
  }

  log(`\nPublishing ${stack.name} profiles...`);
  logInfo(`Detected agents: ${agents.join(', ')}\n`);

  let totalCopied = 0;
  let totalSkipped = 0;
  const errors = [];

  // Verify source exists
  if (!fs.existsSync(stack.sourceBase)) {
    logError(`Source not found: ${stack.sourceBase}`);
    logError('Make sure the submodule is cloned and base-profiles exist.');
    return { success: false, copied: 0, errors: ['Source directory missing'] };
  }

  for (const agent of agents) {
    logBold(`\n  Agent: ${agent}`);

    for (const os of stack.osVariants) {
      const sourceDir = path.join(stack.sourceBase, os, agent);
      const targetDir = path.join(stack.targetBase, os, agent);

      // Check source OS directory exists
      if (!fs.existsSync(sourceDir)) {
        logWarn(`    [${os}] Source missing — skipping`);
        continue;
      }

      // Create target directory
      fs.mkdirSync(targetDir, { recursive: true });
      logInfo(`    [${os}] → ${path.relative(process.cwd(), targetDir)}`);

      // Copy each expected file (OS-aware filenames)
      for (const file of getExpectedFiles(os)) {
        const src = path.join(sourceDir, file);
        const dest = path.join(targetDir, file);

        if (!fs.existsSync(src)) {
          logWarn(`      MISSING: ${file} (not in source)`);
          errors.push(`Missing file: ${agent}/${os}/${file}`);
          continue;
        }

        // Check if target already exists and is identical
        if (fs.existsSync(dest)) {
          const srcContent = fs.readFileSync(src, 'utf8');
          const destContent = fs.readFileSync(dest, 'utf8');
          if (srcContent === destContent) {
            logInfo(`      SKIP (unchanged): ${file}`);
            totalSkipped++;
            continue;
          }
          logWarn(`      UPDATE: ${file} (content changed)`);
        } else {
          log(`      COPY: ${file}`);
        }

        fs.copyFileSync(src, dest);
        totalCopied++;
      }
    }
  }

  // Summary
  log('');
  const agentCount = agents.length;
  const totalExpected = agentCount * stack.osVariants.length * stack.expectedFiles.length; // base count for reference
  if (errors.length === 0) {
    logSuccess(`Published ${stack.name}: ${agentCount} agent(s), ${totalCopied} files copied, ${totalSkipped} unchanged.`);
  } else {
    logWarn(`Published with ${errors.length} issue(s): ${totalCopied} copied, ${totalSkipped} unchanged.`);
    errors.forEach((e) => logError(`  - ${e}`));
  }

  return { success: errors.length === 0, copied: totalCopied, skipped: totalSkipped, agents, errors };
}

module.exports = { publish };
