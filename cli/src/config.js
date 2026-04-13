/**
 * Stack configurations derived from smit-tasks/*.md
 *
 * Each stack defines:
 * - source/target paths
 * - OS variants
 * - expected files per OS directory
 * - validation checks
 * - README table metadata
 *
 * Agents are AUTO-DETECTED from base-profiles directories.
 * When team lead adds a new agent folder (e.g. base-profiles/nodejs-react/ubuntu/cline/),
 * the CLI picks it up automatically — no config changes needed.
 */

const fs = require('fs');
const path = require('path');

// Base paths (relative to repo root)
const REPO_ROOT = path.resolve(__dirname, '..', '..');
const SUBMODULE_ROOT = path.resolve(REPO_ROOT, '..', 'coding-agent-mcp-tools-submodule');

const OS_VARIANTS = ['ubuntu', 'mac', 'windows'];

// All known agents in the ecosystem (for README table row ordering)
const ALL_AGENTS = ['claude', 'codex', 'cursor', 'windsor', 'opencode', 'cline', 'roo', 'kilocode'];

// Display names for agents
const AGENT_DISPLAY_NAMES = {
  claude: 'Claude',
  codex: 'Codex',
  cursor: 'Cursor',
  windsor: 'Windsor',
  opencode: 'OpenCode',
  cline: 'Cline',
  roo: 'Roo Code',
  kilocode: 'Kilo Code',
};

// 9 files expected in each OS directory
const EXPECTED_FILES = [
  'agent-environment-profiles.md',
  'system-setup.md',
  'docker-setup.md',
  'project-memory.md',
  'debug-automation.md',
  'curated-profiles.md',
  'optimize-tokens.md',
  'customer-support.md',
  'fully-local.md',
];

/**
 * Auto-detect which agents have profiles in base-profiles for a given stack.
 * Scans all OS directories and returns agents that exist in ALL OS variants.
 */
function detectAgents(stackKey) {
  const stackSourceBase = path.join(SUBMODULE_ROOT, 'base-profiles', stackKey);
  if (!fs.existsSync(stackSourceBase)) return [];

  // Collect agents per OS
  const agentsPerOS = {};
  for (const os of OS_VARIANTS) {
    const osDir = path.join(stackSourceBase, os);
    if (!fs.existsSync(osDir)) continue;
    try {
      agentsPerOS[os] = fs.readdirSync(osDir).filter((entry) => {
        return fs.statSync(path.join(osDir, entry)).isDirectory();
      });
    } catch {
      agentsPerOS[os] = [];
    }
  }

  // Find agents present in ALL OS variants
  const osKeys = Object.keys(agentsPerOS);
  if (osKeys.length === 0) return [];

  let commonAgents = agentsPerOS[osKeys[0]] || [];
  for (let i = 1; i < osKeys.length; i++) {
    commonAgents = commonAgents.filter((a) => (agentsPerOS[osKeys[i]] || []).includes(a));
  }

  return commonAgents.sort();
}

// Common validation rules shared by all stacks (base checks)
const BASE_VALIDATION_RULES = {
  'agent-environment-profiles.md': {
    mustContain: ['Choose Your Setup', 'system-setup.md', 'docker-setup.md'],
    description: 'Entry point — title, intro, 2 setup links, 5 advanced buttons',
  },
  'system-setup.md': {
    mustContainByOS: {
      ubuntu: ['bash', 'mcp.json'],
      mac: ['brew', '.zshrc', 'mcp.json'],
      windows: ['PowerShell', 'winget', 'mcp.json'],
    },
    description: 'OS-specific setup script with mcp.json structure',
  },
  'project-memory.md': {
    mustContain: ['memory', 'amnesia'],
    description: 'AI Amnesia deep-dive — pain-point H1 present',
  },
  'debug-automation.md': {
    mustContain: ['debug', 'Day 2'],
    description: 'Day 2 Problem deep-dive — pain-point H1 present',
  },
  'curated-profiles.md': {
    mustContain: ['profile'],
    description: '5 curated workflow profiles listed',
  },
  'optimize-tokens.md': {
    mustContain: ['token'],
    description: 'Token optimization for large codebases',
  },
  'fully-local.md': {
    mustContain: ['local'],
    description: 'Fully local setup — no external API calls',
  },
};

// Stack-specific validation overrides
const STACK_VALIDATION_OVERRIDES = {
  'nodejs-react': {
    'docker-setup.md': {
      mustContain: ['docker', 'golang:1.23-bookworm', 'python:3.12-slim', 'alpine'],
      description: '4 Docker services with correct images',
    },
    'customer-support.md': {
      mustContain: ['Figma'],
      description: 'Design-to-code + Figma workflow',
    },
  },
  'php-laravel': {
    'docker-setup.md': {
      mustContain: ['docker', 'phpactor'],
      description: 'PHP + phpactor language server, optional tools disabled by default',
    },
    'customer-support.md': {
      mustContain: ['Laravel'],
      description: 'Laravel Boost + WordPress MCP Adapter workflows',
    },
  },
};

const STACKS = {
  'nodejs-react': {
    name: 'Node.js + React/Next.js',
    sourceBase: path.join(SUBMODULE_ROOT, 'base-profiles', 'nodejs-react'),
    targetBase: path.join(REPO_ROOT, 'profiles', 'nodejs-react'),
    osVariants: OS_VARIANTS,
    expectedFiles: EXPECTED_FILES,
    readmeHeader: 'AI Vibe Coding Setup',
    readmeColumnKey: 'nodejs-react',

    get agents() { return detectAgents('nodejs-react'); },

    validationRules: {
      ...BASE_VALIDATION_RULES,
      ...STACK_VALIDATION_OVERRIDES['nodejs-react'],
    },

    keyDecisions: {
      slot1: { tool: 'mcp-language-server', reason: 'Go binary, no Neo4j, TypeScript LSP' },
      slot2: { tool: 'Semgrep', reason: 'Best free static analysis for Node.js/TypeScript' },
      slot3: { tool: 'Basic Memory', reason: 'AGPL free, local-first persistent memory' },
      slot4: { tool: 'Figma Context MCP', reason: 'Design-to-code, optional, disabled:true in Docker' },
    },
  },

  'php-laravel': {
    name: 'PHP + Laravel/WP',
    sourceBase: path.join(SUBMODULE_ROOT, 'base-profiles', 'php-laravel'),
    targetBase: path.join(REPO_ROOT, 'profiles', 'php-laravel'),
    osVariants: OS_VARIANTS,
    expectedFiles: EXPECTED_FILES,
    readmeHeader: 'PHP + Laravel/WP — AI Vibe Coding Setup',
    readmeColumnKey: 'php-laravel',

    get agents() { return detectAgents('php-laravel'); },

    validationRules: {
      ...BASE_VALIDATION_RULES,
      ...STACK_VALIDATION_OVERRIDES['php-laravel'],
    },

    keyDecisions: {
      slot1: { tool: 'mcp-language-server + phpactor', reason: 'MIT open-source PHP LSP' },
      slot2: { tool: 'Semgrep', reason: 'PHP security rules included' },
      slot3: { tool: 'Basic Memory', reason: 'AGPL free, local-first' },
      slot4: { tool: 'laravel/boost', reason: 'Official Laravel MCP, opt-in only' },
      slot5: { tool: 'WordPress/mcp-adapter', reason: 'WP MCP, opt-in only' },
    },
  },
};

module.exports = {
  STACKS, OS_VARIANTS, EXPECTED_FILES, ALL_AGENTS,
  AGENT_DISPLAY_NAMES, REPO_ROOT, SUBMODULE_ROOT, detectAgents,
};
