/**
 * OpenFish URL Sanitizer & Domain Intelligence Utility
 */

const HIGH_RISK_TLDS = new Set([
  'online', 'site', 'live', 'xyz', 'top', 'club', 'work', 'bid', 'loan', 'cfd'
]);

export interface UrlForensicSummary {
  original: string;
  sanitized: string;
  hostname: string;
  tld: string;
  isSuspiciousTLD: boolean;
  hasBankingKeyword: boolean;
}

export function sanitizeAndInspectUrl(rawUrl: string): UrlForensicSummary {
  let urlStr = rawUrl.trim();
  if (!/^https?:\/\//i.test(urlStr)) {
    urlStr = `https://${urlStr}`;
  }

  try {
    const parsed = new URL(urlStr);
    const hostname = parsed.hostname.toLowerCase();
    const parts = hostname.split('.');
    const tld = parts.length > 1 ? parts[parts.length - 1] : '';

    const bankingTerms = ['hdfc', 'sbi', 'icici', 'axis', 'kyc', 'bill', 'discom', 'refund', 'banking'];
    const hasBankingKeyword = bankingTerms.some(term => hostname.includes(term));
    const isSuspiciousTLD = HIGH_RISK_TLDS.has(tld);

    return {
      original: rawUrl,
      sanitized: parsed.toString(),
      hostname,
      tld,
      isSuspiciousTLD,
      hasBankingKeyword,
    };
  } catch {
    return {
      original: rawUrl,
      sanitized: rawUrl,
      hostname: '',
      tld: '',
      isSuspiciousTLD: false,
      hasBankingKeyword: false,
    };
  }
}
