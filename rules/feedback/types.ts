/**
 * Domínio do feedback de clareza (Momento A). Sem D1, sem API, sem
 * persistência — só os tipos e a transição de estado, puros e testáveis.
 */

export type ClarityId = "clear" | "partial" | "lost";

export type ClarityReasonId =
  | "wanted_examples"
  | "hard_terms"
  | "taste_mismatch"
  | "situation_mismatch"
  | "other";

export interface ClarityFeedbackState {
  clarity: ClarityId | null;
  clarityReason: ClarityReasonId | null;
  comment: string;
  submitted: boolean;
}
