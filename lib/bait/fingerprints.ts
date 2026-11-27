/**
 * Device Fingerprint Matrix
 * Emulates common Android handset profiles in India to avoid anti-bot cloaking on scam sites.
 */

export interface DeviceProfile {
  name: string;
  userAgent: string;
  viewport: { width: number; height: number };
  deviceScaleFactor: number;
}

export const INDIAN_MOBILE_PROFILES: DeviceProfile[] = [
  {
    name: 'Redmi Note 12 Pro',
    userAgent: 'Mozilla/5.0 (Linux; Android 13; 22101316I) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Mobile Safari/537.36',
    viewport: { width: 393, height: 873 },
    deviceScaleFactor: 2.75,
  },
  {
    name: 'Samsung Galaxy M34 5G',
    userAgent: 'Mozilla/5.0 (Linux; Android 14; SM-M346B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Mobile Safari/537.36',
    viewport: { width: 412, height: 915 },
    deviceScaleFactor: 2.625,
  },
];

export function getRandomDeviceProfile(): DeviceProfile {
  return INDIAN_MOBILE_PROFILES[Math.floor(Math.random() * INDIAN_MOBILE_PROFILES.length)];
}
