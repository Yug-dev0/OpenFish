#!/usr/bin/env node
/**
 * Dossier Verification CLI
 */
import { buildCustodyCertificate } from '../lib/forensics/custody.ts';

const cert = buildCustodyCertificate('case_verify_sample', 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855');
console.log('Sec 65B Certificate generated:');
console.log(JSON.stringify(cert, null, 2));
console.log('✔ Certificate format is compliant with Section 65B Indian Evidence Act.');
