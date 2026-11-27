import test from 'node:test';
import assert from 'node:assert/strict';
import { generateBaitPersona } from '../lib/bait/personas.ts';

test('generateBaitPersona produces valid fake PAN and Aadhaar structures', () => {
  const persona = generateBaitPersona(1);
  assert.ok(persona.fullName);
  assert.match(persona.panNumber, /^[A-Z]{5}[0-9]{4}[A-Z]$/);
  assert.equal(persona.aadhaarLastFour.length, 4);
});
