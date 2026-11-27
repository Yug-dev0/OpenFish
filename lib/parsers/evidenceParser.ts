/**
 * Evidence Stream Normalization Parser
 */

import { extractUpiHandles } from '@/lib/validators/upi';
import { parseIndianPhoneNumber } from '@/lib/validators/phone';

export function normalizeRawEvidenceStream(rawOutputs: string[]) {
  const combinedText = rawOutputs.join(' ');
  const upis = extractUpiHandles(combinedText);

  // Extract phone numbers matching 10-digit series
  const phoneMatches = combinedText.match(/(?:\+91[\-\s]?)?[6-9]\d{9}/g) || [];
  const phones: string[] = [];
  for (const match of phoneMatches) {
    const res = parseIndianPhoneNumber(match);
    if (res.isValid && !phones.includes(res.formatted)) {
      phones.push(res.formatted);
    }
  }

  return { upis, phones };
}
