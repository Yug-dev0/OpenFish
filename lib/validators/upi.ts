/**
 * OpenFish UPI Virtual Payment Address (VPA) Validator & Normalizer
 * Compliant with NPCI Unified Payments Interface specifications.
 */

// Common legitimate and scam-frequent UPI handles in India
export const KNOWN_UPI_HANDLES = new Set([
  'okaxis', 'okhdfcbank', 'okicici', 'oksbi',
  'ybl', 'ibl', 'axl', 'paytm',
  'upi', 'apl', 'federal', 'aubank',
  'idfcbank', 'kotak', 'indus', 'yesbank',
  'barodampay', 'cnrb', 'pnb'
]);

const UPI_REGEX = /^[a-zA-Z0-9.\-_]{2,256}@[a-zA-Z]{2,64}$/;

export interface UpiValidationResult {
  isValid: boolean;
  username: string;
  handle: string;
  normalized: string;
  isKnownHandle: boolean;
}

export function validateUPI(vpa: string): UpiValidationResult {
  const cleaned = vpa.trim().toLowerCase();
  if (!UPI_REGEX.test(cleaned)) {
    return {
      isValid: false,
      username: '',
      handle: '',
      normalized: cleaned,
      isKnownHandle: false,
    };
  }

  const [username, handle] = cleaned.split('@');
  return {
    isValid: true,
    username,
    handle,
    normalized: `${username}@${handle}`,
    isKnownHandle: KNOWN_UPI_HANDLES.has(handle),
  };
}

export function extractUpiHandles(text: string): string[] {
  const words = text.split(/\s+|,|;|"|'|\(|\)|\[|\]/);
  const found: string[] = [];
  for (const word of words) {
    const res = validateUPI(word);
    if (res.isValid && !found.includes(res.normalized)) {
      found.push(res.normalized);
    }
  }
  return found;
}
