/**
 * OpenFish Indian Financial System Code (IFSC) Validator & Bank Directory
 */

export interface IfscDetails {
  isValid: boolean;
  bankName: string;
  bankCode: string;
  branchCode: string;
  ifsc: string;
}

const BANK_PREFIXES: Record<string, string> = {
  HDFC: 'HDFC Bank Ltd',
  SBIN: 'State Bank of India',
  ICIC: 'ICICI Bank',
  UTIB: 'Axis Bank',
  PUNB: 'Punjab National Bank',
  BARB: 'Bank of Baroda',
  CNRB: 'Canara Bank',
  KKBK: 'Kotak Mahindra Bank',
  INDB: 'IndusInd Bank',
  YESB: 'Yes Bank',
  PYTM: 'Paytm Payments Bank',
  AIRP: 'Airtel Payments Bank',
};

export function validateIFSC(code: string): IfscDetails {
  const clean = code.trim().toUpperCase();
  const ifscRegex = /^[A-Z]{4}0[A-Z0-9]{6}$/;

  if (!ifscRegex.test(clean)) {
    return {
      isValid: false,
      bankName: 'Unknown Bank',
      bankCode: '',
      branchCode: '',
      ifsc: clean,
    };
  }

  const bankCode = clean.slice(0, 4);
  const branchCode = clean.slice(5);
  const bankName = BANK_PREFIXES[bankCode] || `${bankCode} Scheduled Commercial Bank`;

  return {
    isValid: true,
    bankName,
    bankCode,
    branchCode,
    ifsc: clean,
  };
}
