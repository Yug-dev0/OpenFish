import test from 'node:test';
import assert from 'node:assert/strict';
import { buildComplaintText } from '../lib/complaint.ts';

test('buildComplaintText populates mandatory Section 66D statutory clauses', () => {
  const mockCase = {
    id: 'case_test_101',
    target: 'https://fake-kyc-update.live',
    impersonating: 'HDFC Bank',
    verdict: 'scam',
    extracted: {
      upis: ['mulepay@okaxis'],
      phones: ['+91 98765 43210'],
      accounts: ['50100489128 (IFSC: HDFC0001234)'],
    },
    events: [],
    createdAt: new Date().toISOString(),
  };

  const complaint = buildComplaintText(mockCase);
  assert.ok(complaint.includes('SECTION 66D OF THE INFORMATION TECHNOLOGY ACT'));
  assert.ok(complaint.includes('mulepay@okaxis'));
  assert.ok(complaint.includes('HDFC Bank'));
});
