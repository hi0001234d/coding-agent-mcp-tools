/**
 * Update README command — adds/updates the profile table column
 * in the main public README.md.
 *
 * Handles multiple agents — fills in the cell for each agent row
 * that has a published profile in this stack.
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
  if (agents.length === 0) {
    logWarn('No agents detected. Nothing to add to README.');
    return { success: true };
  }

  let content = fs.readFileSync(readmePath, 'utf8');

  // Find the profile table
  const tableStart = content.indexOf('| Profile →');
  if (tableStart === -1) {
    logError('Could not find profile table in README.md (looking for "| Profile →")');
    return { success: false };
  }

  // Extract table section (until next --- or non-table line)
  const beforeTable = content.substring(0, tableStart);
  const tableSection = content.substring(tableStart);
  const lines = tableSection.split('\n');

  // Find end of table
  let tableEndIdx = lines.length;
  for (let i = 2; i < lines.length; i++) {
    if (!lines[i].trim().startsWith('|')) {
      tableEndIdx = i;
      break;
    }
  }

  const tableLines = lines.slice(0, tableEndIdx);
  const afterTable = lines.slice(tableEndIdx).join('\n');

  // Check if column already exists
  if (tableLines[0].includes(stack.readmeHeader)) {
    logInfo(`Column "${stack.readmeHeader}" already exists. Updating agent cells...`);
    // Update cells for each agent row
    updateExistingColumn(tableLines, stack, agents);
  } else {
    // Add new column
    addNewColumn(tableLines, stack, agents);
  }

  // Reconstruct
  const newContent = beforeTable + tableLines.join('\n') + afterTable;
  fs.writeFileSync(readmePath, newContent, 'utf8');

  logSuccess(`README table updated for ${stack.name}.`);
  logInfo(`  Agents with links: ${agents.join(', ')}`);

  return { success: true };
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

function findAgentInRow(row) {
  const displayNames = Object.entries(AGENT_DISPLAY_NAMES);
  for (const [key, name] of displayNames) {
    // Match against first column content
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
    if (agentKey && agents.includes(agentKey)) {
      const cell = buildCellContent(stack, agentKey);
      tableLines[i] = row.replace(/\s*\|$/, '') + ` ${cell} |`;
    } else {
      tableLines[i] = row.replace(/\s*\|$/, '') + ' - |';
    }
  }
}

function updateExistingColumn(tableLines, stack, agents) {
  // Find column index
  const headers = tableLines[0].split('|').map((h) => h.trim());
  const colIdx = headers.findIndex((h) => h.includes(stack.readmeHeader));
  if (colIdx === -1) return;

  const sepIdx = tableLines.findIndex((l, i) => i > 0 && l.includes('|---'));
  const startRow = sepIdx !== -1 ? sepIdx + 1 : 2;

  for (let i = startRow; i < tableLines.length; i++) {
    const row = tableLines[i];
    if (!row.trim().startsWith('|')) break;

    const agentKey = findAgentInRow(row);
    if (agentKey && agents.includes(agentKey)) {
      const cells = row.split('|');
      if (cells[colIdx] !== undefined) {
        cells[colIdx] = ` ${buildCellContent(stack, agentKey)} `;
        tableLines[i] = cells.join('|');
      }
    }
  }
}

module.exports = { updateReadme };
