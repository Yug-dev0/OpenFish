/**
 * Synthetic OTP & Human Keystroke Timing Simulator
 */

export function generateSyntheticOtp(): string {
  return String(Math.floor(100000 + Math.random() * 900000));
}

export function calculateHumanDelay(stepIndex: number): number {
  // Simulates realistic typing and SMS delivery latency (1.2s to 3.8s)
  const jitter = Math.sin(stepIndex) * 500;
  return Math.max(1200, Math.floor(2500 + jitter));
}
