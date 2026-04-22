#!/usr/bin/env node

/**
 * ProfileForge CLI
 *
 * Publishes Agent Environment Profiles from base-profiles (source of truth)
 * to the public profiles/ directory. Validates content, updates README table,
 * and manages navigation.
 *
 * Usage:
 *   profile-cli publish <stack>       Copy profiles from base-profiles to public
 *   profile-cli validate <stack>      Validate published profile files
 *   profile-cli update-readme <stack> Update README.md profile table
 *   profile-cli update-nav <stack>    Update navigation.md
 *   profile-cli all <stack>           Run full pipeline (publish → validate → readme → nav)
 *   profile-cli status                Show publish status of all stacks
 *   profile-cli list                  List available stacks
 *
 * Examples:
 *   profile-cli publish nodejs-react
 *   profile-cli all php-laravel
 *   profile-cli status
 */

const { run } = require('../src/index');

run(process.argv.slice(2));
