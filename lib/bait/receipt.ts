/**
 * Synthetic UTR Transaction Generator
 * Provides realistic fake transaction references when baiting scam operators.
 */

export function generateSyntheticUtr(): string {
  const yearDigit = '6'; // 2026
  const dayOfYear = String(Math.floor(100 + Math.random() * 265));
  const randomSerial = String(Math.floor(10000000 + Math.random() * 90000000));
  return `${yearDigit}${dayOfYear}${randomSerial}`;
}

export function generatePaymentFailurePayload(upiId: string) {
  return {
    status: 'FAILED',
    errorCode: 'U19_INTENT_TIMEOUT',
    message: 'Beneficiary bank not responding or transaction declined by risk policy.',
    targetUpi: upiId,
    suggestedRemedy: 'Request alternative VPA from payee.',
  };
}
