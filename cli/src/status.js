/**
 * Status command — shows publish status of all stacks and all agents.
 */

const fs = require('fs');
const path = require('path');
const { STACKS, ALL_AGENTS, AGENT_DISPLAY_NAMES } = require('./config');
const { log, logSuccess, logError, logWarn, logInfo, logBold } = require('./utils');

function status() {
  log('\nProfile Publish Status\n');
  log('='.repeat(70));

  for (const [key, stack] of Object.entries(STACKS)) {
    logBold(`\n  Stack: ${stack.name}`);
    log(`  Key:   ${key}`);

    const detectedAgents = stack.agents;
    logInfo(`  Detected agents in base-profiles: ${detectedAgents.length > 0 ? detectedAgents.join(', ') : '(none)'}`);
    log('  ' + '-'.repeat(50));

    // Check source
    const sourceExists = fs.existsSync(stack.sourceBase);
    if (sourceExists) {
      logSuccess(`  Source: EXISTS`);
    } else {
      logError(`  Source: MISSING`);
    }

    // Show status per agent
    for (const agent of detectedAgents) {
      const displayName = AGENT_DISPLAY_NAMES[agent] || agent;
      logBold(`\n    ${displayName} (${agent}):`);

      for (const os of stack.osVariants) {
        const sourceDir = path.join(stack.sourceBase, os, agent);
        const targetDir = path.join(stack.targetBase, os, agent);

        const sourceCount = countFiles(sourceDir);
        const targetCount = countFiles(targetDir);
        const expected = stack.expectedFiles.length;

        let targetStatus;
        let icon;

        if (targetCount === 0) {
          targetStatus = 'NOT PUBLISHED';
          icon = 'TODO';
        } else if (targetCount < expected) {
          targetStatus = `PARTIAL (${targetCount}/${expected})`;
          icon = 'PART';
        } else {
          // All files present — now check if any content differs from source
          const outOfSync = stack.expectedFiles.some((file) => {
            const src = path.join(sourceDir, file);
            const dest = path.join(targetDir, file);
            if (!fs.existsSync(src) || !fs.existsSync(dest)) return false;
            return fs.readFileSync(src, 'utf8') !== fs.readFileSync(dest, 'utf8');
          });
          targetStatus = outOfSync ? 'OUT OF SYNC' : 'PUBLISHED';
          icon = outOfSync ? 'SYNC' : 'DONE';
        }

        log(`      ${icon}  [${os.padEnd(7)}] Source: ${sourceCount}/${expected} | Target: ${targetStatus}`);
      }
    }

    // Show agents NOT yet in base-profiles
    const missingAgents = ALL_AGENTS.filter((a) => !detectedAgents.includes(a));
    if (missingAgents.length > 0) {
      log('');
      logWarn(`    Agents not yet in base-profiles: ${missingAgents.map((a) => AGENT_DISPLAY_NAMES[a] || a).join(', ')}`);
    }

    // Check README column
    const readmePath = path.join(path.resolve(stack.targetBase, '..', '..'), 'README.md');
    if (fs.existsSync(readmePath)) {
      const readme = fs.readFileSync(readmePath, 'utf8');
      const hasColumn = readme.includes(stack.readmeHeader);
      if (hasColumn) {
        logSuccess(`\n    README: Column "${stack.readmeHeader}" present`);
      } else {
        logWarn(`\n    README: Column "${stack.readmeHeader}" missing`);
      }
    }
  }

  log('\n' + '='.repeat(70));
  log('');
}

function countFiles(dir) {
  if (!fs.existsSync(dir)) return 0;
  try {
    return fs.readdirSync(dir).filter((f) => f.endsWith('.md')).length;
  } catch {
    return 0;
  }
}

module.exports = { status };
