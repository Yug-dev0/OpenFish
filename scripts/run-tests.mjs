#!/usr/bin/env node
import { readdirSync } from 'node:fs';
import { spawn } from 'node:child_process';
import path from 'node:path';

const testDir = path.resolve('test');
const files = readdirSync(testDir).filter(f => f.endsWith('.test.mjs'));

console.log(`\x1b[1m\x1b[36m🐟 Running OpenFish Forensic Verification Test Suite (${files.length} test files)...\x1b[0m\n`);

const child = spawn('node', ['--test', ...files.map(f => path.join('test', f))], {
  stdio: 'inherit',
});

child.on('exit', code => {
  if (code === 0) {
    console.log(`\n\x1b[1m\x1b[32m✔ All OpenFish forensic test assertions passed successfully.\x1b[0m\n`);
  } else {
    console.error(`\n\x1b[1m\x1b[31m✖ Test suite failed with exit code ${code}\x1b[0m\n`);
  }
  process.exit(code ?? 0);
});
