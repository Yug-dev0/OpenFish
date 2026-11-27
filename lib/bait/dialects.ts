/**
 * OpenFish Vernacular Smishing Dictionary
 * Recognizes common regional fraud triggers across Indian languages.
 */

export const SMISHING_TRIGGERS = {
  electricity: ['bijli', 'power cut', 'electricity bill', 'meter disconnect', 'light bill'],
  banking: ['kyc update', 'account block', 'pan link', 'netbanking suspend', 'credit card reward'],
  lottery_task: ['youtube like', 'telegram task', 'work from home', 'daily earn 3000', 'part time job'],
  customs: ['parcel seized', 'narcotics parcel', 'customs clearance', 'fedex police'],
};

export function detectScamTheme(message: string): string {
  const text = message.toLowerCase();
  for (const [theme, keywords] of Object.entries(SMISHING_TRIGGERS)) {
    if (keywords.some(k => text.includes(k))) {
      return theme.toUpperCase();
    }
  }
  return 'GENERIC_PHISHING';
}
