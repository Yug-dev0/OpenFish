/**
 * OpenFish Synthetic KYC Decoy Persona Generator
 * Generates synthetic identity artifacts to bait phishing portals without leaking real PII.
 */

export interface DecoyPersona {
  fullName: string;
  panNumber: string;
  aadhaarLastFour: string;
  simulatedAccount: string;
  city: string;
  state: string;
}

const MOCK_NAMES = [
  'Aarav Sharma', 'Rohan Verma', 'Vikramaditya Iyer',
  'Pooja Deshmukh', 'Sneha Banerjee', 'Rajesh Kulkarni',
  'Sunita Meena', 'Amitabh Sengupta'
];

export function generateBaitPersona(seedIndex = 0): DecoyPersona {
  const name = MOCK_NAMES[seedIndex % MOCK_NAMES.length];
  // Deterministic fake PAN: 5 letters, 4 digits, 1 letter
  const panLetter = String.fromCharCode(65 + (seedIndex % 26));
  const panNumber = `BNZPK${(1000 + (seedIndex * 137) % 9000)}${panLetter}`;
  const aadhaarLastFour = `${(4000 + (seedIndex * 211) % 5000)}`;
  const simulatedAccount = `501004${(100000 + seedIndex * 9871) % 900000}`;

  return {
    fullName: name,
    panNumber,
    aadhaarLastFour,
    simulatedAccount,
    city: 'New Delhi',
    state: 'Delhi',
  };
}
