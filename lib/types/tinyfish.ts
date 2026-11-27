/**
 * TinyFish Autonomous Agent Type Contracts
 */

export type TinyFishActionType =
  | 'NAVIGATE'
  | 'CLICK'
  | 'FILL'
  | 'SCREENSHOT'
  | 'EXTRACT_DOM'
  | 'SOLVE_CAPTCHA'
  | 'TERMINATE';

export interface TinyFishStep {
  step: number;
  action: TinyFishActionType;
  selector?: string;
  value?: string;
  timestamp: string;
  status: 'SUCCESS' | 'FAILED' | 'SKIPPED';
  screenshotUrl?: string;
}

export interface TinyFishSessionSummary {
  sessionId: string;
  startedAt: string;
  completedAt: string;
  totalSteps: number;
  extractedRailsCount: number;
}
