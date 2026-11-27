/**
 * Decoy Dialogue State Machine
 * Orchestrates multi-turn conversation pacing to draw out scammer payment rails.
 */

export type DialogueState =
  | 'INITIAL_INQUIRY'
  | 'EXPRESS_CONFUSION'
  | 'REQUEST_PAYMENT_LINK'
  | 'PAYMENT_FAILED_PROMPT'
  | 'COMPLETE_EXTRACTION';

export interface DialogueTurn {
  currentState: DialogueState;
  decoyReply: string;
  nextState: DialogueState;
}

export function getNextBaitMessage(state: DialogueState): DialogueTurn {
  switch (state) {
    case 'INITIAL_INQUIRY':
      return {
        currentState: state,
        decoyReply: 'Sir I received this message regarding my account. Please tell me how to prevent disconnection?',
        nextState: 'EXPRESS_CONFUSION',
      };
    case 'EXPRESS_CONFUSION':
      return {
        currentState: state,
        decoyReply: 'I am opening the link but payment page is showing error. Do you have any direct UPI QR or ID to pay directly?',
        nextState: 'REQUEST_PAYMENT_LINK',
      };
    case 'REQUEST_PAYMENT_LINK':
      return {
        currentState: state,
        decoyReply: 'Okay I sent to that UPI but transaction pending. Is there any alternate number or GPay handle?',
        nextState: 'PAYMENT_FAILED_PROMPT',
      };
    default:
      return {
        currentState: state,
        decoyReply: 'Thank you, I will confirm with my branch manager now.',
        nextState: 'COMPLETE_EXTRACTION',
      };
  }
}
