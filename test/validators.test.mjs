import test from 'node:test';
import assert from 'node:assert/strict';
import { validateUPI, extractUpiHandles } from '../lib/validators/upi.ts';
import { validateIFSC } from '../lib/validators/ifsc.ts';

test('UPI Validator recognizes legitimate VPA formats', () => {
  const result = validateUPI('merchant@okaxis');
  assert.equal(result.isValid, true);
  assert.equal(result.username, 'merchant');
  assert.equal(result.handle, 'okaxis');
  assert.equal(result.isKnownHandle, true);
});

test('UPI Validator rejects malformed strings', () => {
  const result = validateUPI('invalid-vpa-without-at');
  assert.equal(result.isValid, false);
});

test('UPI Handle Extractor pulls multiple VPAs from text', () => {
  const sample = 'Please send refund to support@ybl or alt discom@paytm immediately';
  const extracted = extractUpiHandles(sample);
  assert.deepEqual(extracted, ['support@ybl', 'discom@paytm']);
});

test('IFSC Validator resolves bank codes accurately', () => {
  const hdfc = validateIFSC('HDFC0001234');
  assert.equal(hdfc.isValid, true);
  assert.equal(hdfc.bankCode, 'HDFC');
  assert.equal(hdfc.bankName, 'HDFC Bank Ltd');
});
