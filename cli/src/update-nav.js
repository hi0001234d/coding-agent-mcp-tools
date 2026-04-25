/**
 * Update navigation.md — adds profile entry for the stack.
 */

const fs = require('fs');
const path = require('path');
const { REPO_ROOT } = require('./config');
const { log, logSuccess, logError, logInfo } = require('./utils');

function updateNav(stack) {
  const navPath = path.join(REPO_ROOT, 'navigation.md');
  log(`\nUpdating navigation.md for ${stack.name}...\n`);

  if (!fs.existsSync(navPath)) {
    logError('navigation.md not found — create it first.');
    return { success: false };
  }

  let content = fs.readFileSync(navPath, 'utf8');
  const profilePath = `profiles/${stack.readmeColumnKey}`;

  // Check if entry already exists
  if (content.includes(profilePath)) {
    logInfo(`Navigation entry for ${stack.readmeColumnKey} already exists.`);
    return { success: true, alreadyExists: true };
  }

  // Add entry before closing </p> or at end
  const navEntry = buildNavBadge(stack);

  // Find the last badge/link block and add after it
  const lastBadgeIdx = content.lastIndexOf('</a>');
  if (lastBadgeIdx !== -1) {
    const insertAt = lastBadgeIdx + '</a>'.length;
    content = content.substring(0, insertAt) + '\n\n' + navEntry + content.substring(insertAt);
  } else {
    // Append at end
    content += '\n\n' + navEntry;
  }

  fs.writeFileSync(navPath, content, 'utf8');
  logSuccess(`Added ${stack.name} entry to navigation.md.`);

  return { success: true };
}

function buildNavBadge(stack) {
  const profilePath = `profiles/${stack.readmeColumnKey}`;
  const badgeColor = stack.readmeColumnKey === 'nodejs-react' ? '38BDF8' : '8B5CF6';
  const emoji = stack.readmeColumnKey === 'nodejs-react' ? '⚛️' : '🐘';
  const label = encodeURIComponent(`${emoji} ${stack.readmeHeader}`);

  // Link to the first detected agent's ubuntu profile, or the stack directory if none detected
  const agents = stack.agents;
  const href = agents.length > 0
    ? `./${profilePath}/ubuntu/${agents[0]}/agent-environment-profiles.md`
    : `./${profilePath}/`;

  return [
    `<a href="${href}">`,
    `  <img src="https://img.shields.io/badge/${label}-${badgeColor}?style=for-the-badge&logoColor=white">`,
    `</a>`,
  ].join('\n');
}

module.exports = { updateNav };
