import test from 'node:test';
import assert from 'node:assert/strict';
import { buildCustodyCertificate } from '../lib/forensics/custody.ts';
import { calculateScamRiskScore } from '../lib/forensics/scoring.ts';

test('buildCustodyCertificate creates Section 65B certified evidence records', () => {
  const cert = buildCustodyCertificate('case_test_101', 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855');
  assert.equal(cert.caseId, 'case_test_101');
  assert.equal(cert.integrityVerification.tamperCheck, 'VERIFIED_PRISTINE');
  assert.ok(cert.certificateId.startsWith('SEC65B-CERT-'));
});

test('calculateScamRiskScore flags critical risk on extracted financial rails', () => {
  const risk = calculateScamRiskScore({
    upis: ['mulepay@okaxis', 'fraud@ybl'],
    phones: ['+91 98765 43210'],
    accounts: ['50100489128 (IFSC: HDFC0001234)'],
  });

  assert.equal(risk.tier, 'CRITICAL');
  assert.ok(risk.score >= 80);
  assert.ok(risk.reasons.length >= 2);
});

test('calculateScamRiskScore clears verified legitimate brand domains', () => {
  const risk = calculateScamRiskScore({
    isLegitimateDomain: true,
  });

  assert.equal(risk.tier, 'CLEARED');
  assert.equal(risk.score, 5);
});
