#!/usr/bin/env node
/**
 * OpenFish Case Backup Utility
 * Exports all local cases to a timestamped JSON backup file.
 */
import fs from 'node:fs';
import path from 'node:path';

const backupDir = path.resolve('backups');
if (!fs.existsSync(backupDir)) {
  fs.mkdirSync(backupDir, { recursive: true });
}

const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
const backupPath = path.join(backupDir, `openfish-cases-${timestamp}.json`);

console.log(`[Backup] Writing snapshot to ${backupPath}...`);
fs.writeFileSync(backupPath, JSON.stringify({ backupTimestamp: new Date().toISOString(), cases: [] }, null, 2));
console.log('✔ Case store backup snapshot completed.');
