import type { ClarityFeedbackState, ClarityId, ClarityReasonId } from "./types";

export const COMMENT_MAX_LENGTH = 500;

export const INITIAL_CLARITY_FEEDBACK_STATE: ClarityFeedbackState = {
  clarity: null,
  clarityReason: null,
  comment: "",
  submitted: false,
};

/**
 * "clear" não tem formulário adicional — escolher já é o envio (item 4).
 * Trocar para "clear" sempre limpa o motivo, mesmo vindo de uma edição
 * (item 8). Trocar entre "partial"/"lost" preserva o motivo já escolhido.
 */
export function selectClarity(state: ClarityFeedbackState, clarity: ClarityId): ClarityFeedbackState {
  const next: ClarityFeedbackState = {
    ...state,
    clarity,
    clarityReason: clarity === "clear" ? null : state.clarityReason,
  };
  return clarity === "clear" ? { ...next, submitted: true } : next;
}

export function selectClarityReason(
  state: ClarityFeedbackState,
  clarityReason: ClarityReasonId,
): ClarityFeedbackState {
  return { ...state, clarityReason };
}

export function setComment(state: ClarityFeedbackState, comment: string): ClarityFeedbackState {
  return { ...state, comment: comment.slice(0, COMMENT_MAX_LENGTH) };
}

/** clarityReason é obrigatório fora de "clear"; comentário nunca é obrigatório. */
export function canSubmitClarityFeedback(state: ClarityFeedbackState): boolean {
  if (state.clarity === null) return false;
  if (state.clarity !== "clear" && state.clarityReason === null) return false;
  return true;
}

export function submitClarityFeedback(state: ClarityFeedbackState): ClarityFeedbackState {
  return { ...state, submitted: true };
}

/** "Alterar resposta": reabre para edição mantendo tudo pré-selecionado. */
export function reopenClarityFeedback(state: ClarityFeedbackState): ClarityFeedbackState {
  return { ...state, submitted: false };
}
