/**
 * ProfileForge CLI — Main entry point
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
const { generate } = require('./generate');

const { updateReadme } = require('./update-readme');
const { updateNav } = require('./update-nav');
const { status } = require('./status');
const { log, logError, logBold, logSuccess, logInfo, COLORS } = require('./utils');

const USAGE = `
${COLORS.bold}ProfileForge CLI${COLORS.reset}
Publish, validate, and manage Agent Environment Profiles.
Agents are auto-detected from base-profiles — no config changes needed.

${COLORS.cyan}Usage:${COLORS.reset}
  profile-cli <command> [stack] [--agent <name>]

${COLORS.cyan}Commands:${COLORS.reset}
  generate <stack>       Scaffold profile files from instructions.yaml (only for new agents without existing files)
  validate <stack>       Validate base-profiles content before publishing
  publish <stack>        Copy profiles from base-profiles to public profiles/
  update-readme <stack>  Update README.md profile table with stack column
  update-nav <stack>     Update navigation.md with profile entry
  all <stack>            Run pipeline: validate → publish → update-readme → update-nav
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
  profile-cli validate nodejs-react                   # Validate base-profiles content
  profile-cli publish nodejs-react                    # Publish ALL agents
  profile-cli publish nodejs-react --agent kilocode   # Publish only kilocode
  profile-cli all nodejs-react                        # validate → publish → readme → nav
  profile-cli all php-laravel --agent kilocode        # Same, for one agent
  profile-cli status                                  # See what's published
  profile-cli generate nodejs-react --agent cline     # Scaffold new agent from instructions.yaml
`;

function parseArgs(args) {
  const result = { command: args[0], stack: args[1], agent: null };
  const agentIdx = args.indexOf('--agent');
  if (agentIdx !== -1 && args[agentIdx + 1]) {
    result.agent = args[agentIdx + 1].toLowerCase();
  }
  return result;
}

function getStack(stackName) {
  if (!stackName) {
    logError('Stack name required. Available: ' + Object.keys(STACKS).join(', '));
    process.exit(2);
  }
  const stack = STACKS[stackName];
  if (!stack) {
    logError(`Unknown stack: "${stackName}". Available: ${Object.keys(STACKS).join(', ')}`);
    process.exit(2);
  }
  return stack;
}

function validateAgent(stack, agentName) {
  if (!agentName) return; // no filter = all agents, always valid
  const knownAgents = stack.agents;
  if (!knownAgents.includes(agentName)) {
    logError(`Unknown agent: "${agentName}". Known agents: ${knownAgents.join(', ') || '(none detected in base-profiles)'}`);
    process.exit(2);
  }
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
  logBold(`\n${'='.repeat(60)}`);
  logBold(`  Pipeline: ${stack.name}`);
  logBold(`  Agent: ${filterAgent || 'all'}`);
  logBold(`${'='.repeat(60)}`);

  if (filterAgent) validateAgent(stack, filterAgent);

  const agents = filterAgent ? [filterAgent] : stack.agents;

  // Step 1: Validate
  logBold('\n--- Step 1/4: Validate ---');
  const valResult = validate(stack, filterAgent);
  if (!valResult.success) {
    logError('\nValidation failed. Fix issues before publishing.');
    return false;
  }

  // Step 2: Publish
  logBold('\n--- Step 2/4: Publish ---');
  const pubResult = publish(stack, filterAgent);
  if (!pubResult.success) {
    logError('\nPublish failed. Stopping pipeline.');
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
    case 'generate': {
      const stack = getStack(stackName);
      const result = generate(stack, agent);
      if (!result.success) process.exit(1);
      break;
    }
    case 'publish': {
      const stack = getStack(stackName);
      validateAgent(stack, agent);
      const valResult = validate(stack, agent);
      if (!valResult.success) {
        logError('\nValidation failed. Fix issues before publishing.');
        process.exit(1);
      }
      const result = publish(stack, agent);
      if (!result.success) process.exit(1);
      break;
    }
    case 'validate': {
      const stack = getStack(stackName);
      if (stack) {
        validateAgent(stack, agent);
        const result = validate(stack, agent);
        if (!result.success) process.exit(1);
      }
      break;
    }
    case 'update-readme': {
      const stack = getStack(stackName);
      if (stack) {
        const result = updateReadme(stack);
        if (!result.success) process.exit(1);
      }
      break;
    }
    case 'update-nav': {
      const stack = getStack(stackName);
      if (stack) {
        const result = updateNav(stack);
        if (!result.success) process.exit(1);
      }
      break;
    }
    case 'all': {
      const stack = getStack(stackName);
      if (stack) {
        if (!runAll(stack, agent)) process.exit(1);
      }
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
      process.exit(2);
  }
}

module.exports = { run };
