/**
 * OpenFish Cryptographic Chain of Custody Hasher
 * Compliant with Section 65B Indian Evidence Act digital record sealing.
 */

export async function sha256(message: string): Promise<string> {
  const msgUint8 = new TextEncoder().encode(message);
  if (typeof crypto !== 'undefined' && crypto.subtle) {
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }
  // Fallback for non-subtle crypto in pure Node environments
  const { createHash } = await import('node:crypto');
  return createHash('sha256').update(message).digest('hex');
}

export async function generateChainOfCustodyHash(events: Array<{ action: string; timestamp?: string; details?: any }>): Promise<string> {
  let rollingHash = '0000000000000000000000000000000000000000000000000000000000000000';
  for (const ev of events) {
    const raw = `${rollingHash}:${ev.action}:${ev.timestamp || ''}:${JSON.stringify(ev.details || {})}`;
    rollingHash = await sha256(raw);
  }
  return rollingHash;
}
