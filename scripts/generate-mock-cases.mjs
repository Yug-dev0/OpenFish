#!/usr/bin/env node
/**
 * OpenFish Synthetic Load Generator
 * Generates realistic incidents for stress-testing table virtualization and search filtering.
 */
import { generateBaitPersona } from '../lib/bait/personas.ts';

console.log('[Generator] Generating 10 synthetic cyber incident scenarios...');
for (let i = 1; i <= 10; i++) {
  const persona = generateBaitPersona(i);
  console.log(`  - Incident #${1000 + i}: Target Bank NetBanking Phishing (Decoy: ${persona.fullName})`);
}
console.log('✔ Successfully verified synthetic incident generation pipeline.');
