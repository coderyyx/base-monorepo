#!/usr/bin/env node
import fs from 'fs';
import path from 'path';

import { program } from 'commander';

import { commandOne } from './commands/command-one.js';
import { commandTwo } from './commands/command-two.js';

// Read package.json to get the version
const packageJsonPath = path.resolve(__dirname, '../package.json');
const pkg = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

// Set the version from package.json
program.version(pkg.version);

// Command 1
program
  .command('command-one')
  .description('A placeholder for the first command.')
  .action(commandOne);

// Command 2
program
  .command('command-two <name>')
  .description('A placeholder for the second command.')
  .option('-f, --force', 'Enable force mode', false)
  .action(commandTwo);

program.parse();
