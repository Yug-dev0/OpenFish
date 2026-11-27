import test from 'node:test';
import assert from 'node:assert/strict';
import { sha256, generateChainOfCustodyHash } from '../lib/crypto/hasher.ts';

test('SHA-256 produces consistent 64-char hex digests', async () => {
  const hash1 = await sha256('OpenFish Forensics');
  const hash2 = await sha256('OpenFish Forensics');
  assert.equal(hash1, hash2);
  assert.equal(hash1.length, 64);
});

test('Chain of custody hash rolls sequentially over event steps', async () => {
  const events = [
    { action: 'NAVIGATE', timestamp: '2026-11-27T10:00:00Z', details: { url: 'https://suspect.site' } },
    { action: 'EXTRACT', timestamp: '2026-11-27T10:00:05Z', details: { upi: 'fraud@ybl' } },
  ];

  const chainHash = await generateChainOfCustodyHash(events);
  assert.ok(chainHash);
  assert.equal(typeof chainHash, 'string');
  assert.equal(chainHash.length, 64);
});
