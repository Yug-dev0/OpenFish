import test from 'node:test';
import assert from 'node:assert/strict';
import { exportCaseToJson } from '../lib/export/json.ts';
import { exportCaseToMarkdown } from '../lib/export/markdown.ts';

test('exportCaseToJson yields valid parseable JSON envelope', () => {
  const sample = { id: 'case_1', target: 'http://example.com', verdict: 'scam', extracted: {} };
  const jsonStr = exportCaseToJson(sample);
  const parsed = JSON.parse(jsonStr);
  assert.equal(parsed.schemaVersion, 'openfish-forensics-v1');
  assert.equal(parsed.case.id, 'case_1');
});

test('exportCaseToMarkdown contains markdown headers and case id', () => {
  const sample = { id: 'case_1', target: 'http://example.com', verdict: 'scam', extracted: {} };
  const md = exportCaseToMarkdown(sample);
  assert.ok(md.includes('# OPENFISH CYBER FORENSIC DOSSIER'));
  assert.ok(md.includes('#case_1'));
});
