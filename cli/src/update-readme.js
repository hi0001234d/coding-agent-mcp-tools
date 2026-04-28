/**
 * Update README command — adds/updates the profile table column
 * in the main public README.md.
 *
 * Only writes links for agents whose profiles are actually published.
 * Agents not yet published get a '-' placeholder.
 */

const fs = require('fs');
const path = require('path');
const { REPO_ROOT, AGENT_DISPLAY_NAMES } = require('./config');
const { log, logSuccess, logError, logInfo, logWarn } = require('./utils');

function updateReadme(stack) {
  const readmePath = path.join(REPO_ROOT, 'README.md');
  log(`\nUpdating README table for ${stack.name}...\n`);

  if (!fs.existsSync(readmePath)) {
    logError('README.md not found at repo root.');
    return { success: false };
  }

  const agents = stack.agents;

  // Normalize line endings before any processing — prevents \r from being
  // embedded mid-row when README.md uses Windows CRLF line endings
  let content = fs.readFileSync(readmePath, 'utf8').replace(/\r\n/g, '\n').replace(/\r/g, '\n');

  // Find the profile table
  const tableStart = content.indexOf('| Profile →');
  if (tableStart === -1) {
    logError('Could not find profile table in README.md (looking for "| Profile →")');
    return { success: false };
  }

  // Split into before-table, table lines, after-table
  const beforeTable = content.substring(0, tableStart);
  const tableSection = content.substring(tableStart);
  const lines = tableSection.split('\n');

  // Find end of table — first line after row 1 that doesn't start with '|'
  let tableEndIdx = lines.length;
  for (let i = 2; i < lines.length; i++) {
    if (!lines[i].trim().startsWith('|')) {
      tableEndIdx = i;
      break;
    }
  }

  const tableLines = lines.slice(0, tableEndIdx);
  // Preserve whatever separator exists between table and next section
  const afterTable = '\n' + lines.slice(tableEndIdx).join('\n');

  const columnExists = tableLines[0].includes(stack.readmeHeader);

  // If no agents and column doesn't exist yet, nothing useful to do
  if (agents.length === 0 && !columnExists) {
    logWarn('No agents detected. Nothing to add to README.');
    return { success: true };
  }

  // Check if column already exists
  if (columnExists) {
    logInfo(`Column "${stack.readmeHeader}" already exists. Updating agent cells...`);
    updateExistingColumn(tableLines, stack, agents);
  } else {
    addNewColumn(tableLines, stack, agents);
  }

  const newContent = beforeTable + tableLines.join('\n') + afterTable;
  fs.writeFileSync(readmePath, newContent, 'utf8');

  logSuccess(`README table updated for ${stack.name}.`);
  logInfo(`  Agents with links: ${agents.filter((a) => isPublished(stack, a)).join(', ') || '(none published yet)'}`);

  return { success: true };
}

/**
 * Returns true only if the agent's profiles are actually published (all 3 OS).
 * Prevents writing dead links for unpublished agents.
 */
function isPublished(stack, agent) {
  return stack.osVariants.every((os) => {
    const dest = path.join(stack.targetBase, os, agent, 'agent-environment-profiles.md');
    return fs.existsSync(dest);
  });
}

function buildCellContent(stack, agent) {
  const profilePath = `profiles/${stack.readmeColumnKey}`;
  return [
    `<div align="center">`,
    `[Ubuntu](./${profilePath}/ubuntu/${agent}/agent-environment-profiles.md)<br>`,
    `[Windows](./${profilePath}/windows/${agent}/agent-environment-profiles.md)<br>`,
    `[Mac](./${profilePath}/mac/${agent}/agent-environment-profiles.md)`,
    `</div>`,
  ].join('');
}

function buildCell(stack, agentKey, agents) {
  if (agentKey && agents.includes(agentKey) && isPublished(stack, agentKey)) {
    return ` ${buildCellContent(stack, agentKey)} `;
  }
  return ' - ';
}

function findAgentInRow(row) {
  const displayNames = Object.entries(AGENT_DISPLAY_NAMES);
  for (const [key, name] of displayNames) {
    const firstCell = row.split('|')[1] || '';
    if (firstCell.trim().toLowerCase().includes(name.toLowerCase())) {
      return key;
    }
  }
  return null;
}

function addNewColumn(tableLines, stack, agents) {
  // Add column header
  tableLines[0] = tableLines[0].replace(/\s*\|$/, '') + ` | ${stack.readmeHeader} |`;

  // Add separator
  const sepIdx = tableLines.findIndex((l, i) => i > 0 && l.includes('|---'));
  if (sepIdx !== -1) {
    tableLines[sepIdx] = tableLines[sepIdx].replace(/\s*\|$/, '') + '-------------|';
  }

  // Fill each agent row
  for (let i = (sepIdx !== -1 ? sepIdx + 1 : 2); i < tableLines.length; i++) {
    const row = tableLines[i];
    if (!row.trim().startsWith('|')) break;

    const agentKey = findAgentInRow(row);
    const cell = buildCell(stack, agentKey, agents);
    tableLines[i] = row.replace(/\s*\|$/, '') + `|${cell}|`;
  }
}

function updateExistingColumn(tableLines, stack, agents) {
  // Find column index from header
  const headers = tableLines[0].split('|').map((h) => h.trim());
  const colIdx = headers.findIndex((h) => h.includes(stack.readmeHeader));
  if (colIdx === -1) return;

  const sepIdx = tableLines.findIndex((l, i) => i > 0 && l.includes('|---'));
  const startRow = sepIdx !== -1 ? sepIdx + 1 : 2;

  for (let i = startRow; i < tableLines.length; i++) {
    const row = tableLines[i];
    if (!row.trim().startsWith('|')) break;

    const agentKey = findAgentInRow(row);
    const cells = row.split('|');
    if (cells[colIdx] !== undefined) {
      cells[colIdx] = buildCell(stack, agentKey, agents);
      tableLines[i] = cells.join('|');
    }
  }
}

module.exports = { updateReadme };
