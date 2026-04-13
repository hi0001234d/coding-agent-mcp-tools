/**
 * Profile Publisher CLI — Main entry point
 *
 * Routes commands to their handlers.
 * Agents are AUTO-DETECTED from base-profiles.
 * When team lead adds new agent folders, CLI picks them up automatically.
 *
 * Commands:
 *   publish <stack> [--agent <name>]   Copy profiles to public
 *   validate <stack> [--agent <name>]  Run content validation
 *   update-readme <stack>              Add/update README table column
 *   update-nav <stack>                 Add profile entry to navigation.md
 *   all <stack> [--agent <name>]       Full pipeline
 *   status                             Show publish status of all stacks
 *   list                               List available stacks + detected agents
 */

const { STACKS, AGENT_DISPLAY_NAMES } = require('./config');
const { publish } = require('./publish');
const { validate } = require('./validate');
const { updateReadme } = require('./update-readme');
const { updateNav } = require('./update-nav');
const { status } = require('./status');
const { log, logError, logBold, logSuccess, logInfo, COLORS } = require('./utils');

const USAGE = `
${COLORS.bold}Profile Publisher CLI${COLORS.reset}
Publish, validate, and manage Agent Environment Profiles.
Agents are auto-detected from base-profiles — no config changes needed.

${COLORS.cyan}Usage:${COLORS.reset}
  profile-cli <command> [stack] [--agent <name>]

${COLORS.cyan}Commands:${COLORS.reset}
  publish <stack>        Copy profiles from base-profiles to public profiles/
  validate <stack>       Validate published profile files
  update-readme <stack>  Update README.md profile table with stack column
  update-nav <stack>     Update navigation.md with profile entry
  all <stack>            Run full pipeline (publish → validate → readme → nav)
  status                 Show publish status of all stacks + all agents
  list                   List available stacks with detected agents
  help                   Show this help message

${COLORS.cyan}Options:${COLORS.reset}
  --agent <name>         Only process a specific agent (e.g., --agent kilocode)
                         Without this flag, ALL detected agents are processed.

${COLORS.cyan}Available Stacks:${COLORS.reset}
  nodejs-react           Node.js + React/Next.js
  php-laravel            PHP + Laravel/WP

${COLORS.cyan}Examples:${COLORS.reset}
  profile-cli publish nodejs-react              # Publish ALL agents
  profile-cli publish nodejs-react --agent cline  # Publish only cline
  profile-cli all php-laravel                   # Full pipeline, all agents
  profile-cli status                            # See what's published
`;

function parseArgs(args) {
  const result = { command: args[0], stack: args[1], agent: null };
  const agentIdx = args.indexOf('--agent');
  if (agentIdx !== -1 && args[agentIdx + 1]) {
    result.agent = args[agentIdx + 1];
  }
  return result;
}

function getStack(stackName) {
  if (!stackName) {
    logError('Stack name required. Available: ' + Object.keys(STACKS).join(', '));
    return null;
  }
  const stack = STACKS[stackName];
  if (!stack) {
    logError(`Unknown stack: "${stackName}". Available: ${Object.keys(STACKS).join(', ')}`);
    return null;
  }
  return stack;
}

function listStacks() {
  log('\nAvailable Stacks:\n');
  for (const [key, stack] of Object.entries(STACKS)) {
    const agents = stack.agents;
    logBold(`  ${key}`);
    log(`    Name:    ${stack.name}`);
    log(`    Header:  "${stack.readmeHeader}"`);
    log(`    Agents:  ${agents.length > 0 ? agents.map((a) => `${AGENT_DISPLAY_NAMES[a] || a}`).join(', ') : '(none detected)'}`);
    log(`    Files:   ${stack.expectedFiles.length} per OS × ${stack.osVariants.length} OS × ${agents.length} agent(s) = ${stack.expectedFiles.length * stack.osVariants.length * agents.length} total`);
    log(`    Tools:`);
    for (const [slot, decision] of Object.entries(stack.keyDecisions)) {
      log(`      ${slot}: ${decision.tool} — ${decision.reason}`);
    }
    log('');
  }
}

function runAll(stack, filterAgent) {
  const agents = filterAgent ? [filterAgent] : stack.agents;
  const agentLabel = filterAgent || `all (${agents.join(', ')})`;

  logBold(`\n${'='.repeat(60)}`);
  logBold(`  Full Pipeline: ${stack.name}`);
  logBold(`  Agents: ${agentLabel}`);
  logBold(`${'='.repeat(60)}`);

  // Step 1: Publish
  logBold('\n--- Step 1/4: Publish ---');
  const pubResult = publish(stack, filterAgent);
  if (!pubResult.success) {
    logError('\nPublish failed. Stopping pipeline.');
    return false;
  }

  // Step 2: Validate
  logBold('\n--- Step 2/4: Validate ---');
  const valResult = validate(stack, filterAgent);
  if (!valResult.success) {
    logError('\nValidation failed. Fix issues before continuing.');
    return false;
  }

  // Step 3: Update README
  logBold('\n--- Step 3/4: Update README ---');
  const readmeResult = updateReadme(stack);
  if (!readmeResult.success) {
    logError('\nREADME update failed.');
    return false;
  }

  // Step 4: Update Navigation
  logBold('\n--- Step 4/4: Update Navigation ---');
  const navResult = updateNav(stack);
  if (!navResult.success) {
    logError('\nNavigation update failed.');
    return false;
  }

  // Final summary
  const totalFiles = pubResult.copied + pubResult.skipped;
  logBold(`\n${'='.repeat(60)}`);
  logSuccess(`Pipeline complete for ${stack.name}!`);
  log(`  Agents: ${agents.join(', ')}`);
  log(`  Files:  ${pubResult.copied} copied, ${pubResult.skipped} unchanged`);
  log('');
  logInfo('Next steps:');
  log(`  1. Review changed files manually`);
  log(`  2. git add profiles/${stack.readmeColumnKey}/ README.md navigation.md`);
  log(`  3. git commit -m "publish ${stack.readmeColumnKey} profiles (${agents.join(' + ')})"`);
  logBold(`${'='.repeat(60)}\n`);

  return true;
}

function run(args) {
  const { command, stack: stackName, agent } = parseArgs(args);

  if (!command || command === 'help' || command === '--help' || command === '-h') {
    log(USAGE);
    return;
  }

  switch (command) {
    case 'publish': {
      const stack = getStack(stackName);
      if (stack) publish(stack, agent);
      break;
    }
    case 'validate': {
      const stack = getStack(stackName);
      if (stack) validate(stack, agent);
      break;
    }
    case 'update-readme': {
      const stack = getStack(stackName);
      if (stack) updateReadme(stack);
      break;
    }
    case 'update-nav': {
      const stack = getStack(stackName);
      if (stack) updateNav(stack);
      break;
    }
    case 'all': {
      const stack = getStack(stackName);
      if (stack) runAll(stack, agent);
      break;
    }
    case 'status':
      status();
      break;
    case 'list':
      listStacks();
      break;
    default:
      logError(`Unknown command: "${command}"`);
      log(USAGE);
  }
}

module.exports = { run };
