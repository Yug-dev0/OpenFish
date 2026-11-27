/**
 * OpenFish Indian Phone & Telecom Parser
 * Formats 10-digit mobile series and estimates circle origin.
 */

export interface PhoneValidationResult {
  isValid: boolean;
  formatted: string;
  nationalNumber: string;
  estimatedCircle?: string;
}

const CIRCLE_SERIES_MAP: Record<string, string> = {
  '98': 'Delhi / NCR & Mumbai Metro',
  '97': 'Maharashtra & Gujarat',
  '94': 'BSNL National Roaming',
  '93': 'Reliance Jio / Telecom National',
  '91': 'Karnataka & Tamil Nadu',
  '88': 'Uttar Pradesh (East & West)',
  '70': 'West Bengal & Kolkata',
  '62': 'Bihar & Jharkhand',
};

export function parseIndianPhoneNumber(input: string): PhoneValidationResult {
  const digitsOnly = input.replace(/\D/g, '');
  let nationalNumber = '';

  if (digitsOnly.length === 10 && /^[6-9]/.test(digitsOnly)) {
    nationalNumber = digitsOnly;
  } else if (digitsOnly.length === 12 && digitsOnly.startsWith('91')) {
    const sub = digitsOnly.slice(2);
    if (/^[6-9]/.test(sub)) nationalNumber = sub;
  } else if (digitsOnly.length === 11 && digitsOnly.startsWith('0')) {
    const sub = digitsOnly.slice(1);
    if (/^[6-9]/.test(sub)) nationalNumber = sub;
  }

  if (!nationalNumber) {
    return {
      isValid: false,
      formatted: input.trim(),
      nationalNumber: '',
    };
  }

  const prefix = nationalNumber.slice(0, 2);
  const estimatedCircle = CIRCLE_SERIES_MAP[prefix] || 'Pan-India Telecom Circle';

  return {
    isValid: true,
    formatted: `+91 ${nationalNumber.slice(0, 5)} ${nationalNumber.slice(5)}`,
    nationalNumber,
    estimatedCircle,
  };
}
