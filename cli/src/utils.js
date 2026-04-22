/**
 * Utility functions — logging with color, common helpers.
 */

const COLORS = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  dim: '\x1b[2m',
  bold: '\x1b[1m',
};

function log(msg) {
  console.log(msg);
}

function logSuccess(msg) {
  console.log(`${COLORS.green}✓ ${msg}${COLORS.reset}`);
}

function logError(msg) {
  console.log(`${COLORS.red}✗ ${msg}${COLORS.reset}`);
}

function logWarn(msg) {
  console.log(`${COLORS.yellow}⚠ ${msg}${COLORS.reset}`);
}

function logInfo(msg) {
  console.log(`${COLORS.cyan}ℹ ${msg}${COLORS.reset}`);
}

function logBold(msg) {
  console.log(`${COLORS.bold}${msg}${COLORS.reset}`);
}

module.exports = { log, logSuccess, logError, logWarn, logInfo, logBold, COLORS };
