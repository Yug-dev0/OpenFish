/**
 * OpenFish Scam Risk Scoring Engine
 */

export interface RiskEvaluation {
  score: number; // 0 to 100
  tier: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW' | 'CLEARED';
  reasons: string[];
}

export function calculateScamRiskScore(data: {
  upis?: string[];
  phones?: string[];
  accounts?: string[];
  isLegitimateDomain?: boolean;
}): RiskEvaluation {
  if (data.isLegitimateDomain) {
    return {
      score: 5,
      tier: 'CLEARED',
      reasons: ['Target resolves to an officially verified commercial brand or government domain.'],
    };
  }

  let score = 20; // Baseline suspicion for unverified target
  const reasons: string[] = [];

  const upiCount = data.upis?.length || 0;
  if (upiCount > 0) {
    score += Math.min(upiCount * 25, 45);
    reasons.push(`Extracted ${upiCount} suspicious UPI virtual payment addresses.`);
  }

  const phoneCount = data.phones?.length || 0;
  if (phoneCount > 0) {
    score += Math.min(phoneCount * 15, 30);
    reasons.push(`Extracted ${phoneCount} unmasked contact phone numbers.`);
  }

  const accountCount = data.accounts?.length || 0;
  if (accountCount > 0) {
    score += 25;
    reasons.push(`Unmasked ${accountCount} bank account and IFSC combinations.`);
  }

  score = Math.min(score, 100);

  let tier: RiskEvaluation['tier'] = 'MEDIUM';
  if (score >= 80) tier = 'CRITICAL';
  else if (score >= 60) tier = 'HIGH';
  else if (score >= 30) tier = 'MEDIUM';
  else tier = 'LOW';

  return { score, tier, reasons };
}
