import { describe, expect, it } from "vitest";

import {
  COMMENT_MAX_LENGTH,
  INITIAL_CLARITY_FEEDBACK_STATE,
  canSubmitClarityFeedback,
  reopenClarityFeedback,
  selectClarity,
  selectClarityReason,
  setComment,
  submitClarityFeedback,
} from "./clarityFeedbackState";

describe("selectClarity", () => {
  it("clear submete imediatamente, sem exigir motivo", () => {
    const state = selectClarity(INITIAL_CLARITY_FEEDBACK_STATE, "clear");
    expect(state).toEqual({
      clarity: "clear",
      clarityReason: null,
      comment: "",
      submitted: true,
    });
  });

  it("partial não submete sozinho", () => {
    const state = selectClarity(INITIAL_CLARITY_FEEDBACK_STATE, "partial");
    expect(state.submitted).toBe(false);
    expect(state.clarity).toBe("partial");
  });

  it("lost não submete sozinho", () => {
    const state = selectClarity(INITIAL_CLARITY_FEEDBACK_STATE, "lost");
    expect(state.submitted).toBe(false);
    expect(state.clarity).toBe("lost");
  });

  it("trocar para clear limpa clarityReason mesmo se já havia um motivo escolhido", () => {
    const withReason = selectClarityReason(selectClarity(INITIAL_CLARITY_FEEDBACK_STATE, "partial"), "hard_terms");
    const backToClear = selectClarity(withReason, "clear");
    expect(backToClear.clarityReason).toBeNull();
    expect(backToClear.submitted).toBe(true);
  });

  it("trocar entre partial e lost preserva o motivo já escolhido", () => {
    const partialWithReason = selectClarityReason(
      selectClarity(INITIAL_CLARITY_FEEDBACK_STATE, "partial"),
      "taste_mismatch",
    );
    const nowLost = selectClarity(partialWithReason, "lost");
    expect(nowLost.clarityReason).toBe("taste_mismatch");
  });
});

describe("setComment", () => {
  it("aceita comentário dentro do limite", () => {
    const state = setComment(INITIAL_CLARITY_FEEDBACK_STATE, "algo faltou");
    expect(state.comment).toBe("algo faltou");
  });

  it("trunca em 500 caracteres", () => {
    const longComment = "a".repeat(600);
    const state = setComment(INITIAL_CLARITY_FEEDBACK_STATE, longComment);
    expect(state.comment).toHaveLength(COMMENT_MAX_LENGTH);
  });
});

describe("canSubmitClarityFeedback", () => {
  it("false sem clarity selecionada", () => {
    expect(canSubmitClarityFeedback(INITIAL_CLARITY_FEEDBACK_STATE)).toBe(false);
  });

  it("true para clear sem motivo", () => {
    const state = selectClarity(INITIAL_CLARITY_FEEDBACK_STATE, "clear");
    expect(canSubmitClarityFeedback(state)).toBe(true);
  });

  it("false para partial sem motivo", () => {
    const state = selectClarity(INITIAL_CLARITY_FEEDBACK_STATE, "partial");
    expect(canSubmitClarityFeedback(state)).toBe(false);
  });

  it("true para partial com motivo", () => {
    const state = selectClarityReason(selectClarity(INITIAL_CLARITY_FEEDBACK_STATE, "partial"), "other");
    expect(canSubmitClarityFeedback(state)).toBe(true);
  });

  it("false para lost sem motivo", () => {
    const state = selectClarity(INITIAL_CLARITY_FEEDBACK_STATE, "lost");
    expect(canSubmitClarityFeedback(state)).toBe(false);
  });

  it("comentário nunca é obrigatório", () => {
    const state = selectClarityReason(selectClarity(INITIAL_CLARITY_FEEDBACK_STATE, "lost"), "hard_terms");
    expect(state.comment).toBe("");
    expect(canSubmitClarityFeedback(state)).toBe(true);
  });
});

describe("submitClarityFeedback / reopenClarityFeedback", () => {
  it("submitClarityFeedback marca submitted=true preservando o resto", () => {
    const filled = selectClarityReason(selectClarity(INITIAL_CLARITY_FEEDBACK_STATE, "partial"), "hard_terms");
    const submitted = submitClarityFeedback(filled);
    expect(submitted).toEqual({ ...filled, submitted: true });
  });

  it("reopenClarityFeedback volta submitted=false mantendo tudo pré-selecionado", () => {
    const submitted = submitClarityFeedback(
      selectClarityReason(selectClarity(INITIAL_CLARITY_FEEDBACK_STATE, "lost"), "wanted_examples"),
    );
    const reopened = reopenClarityFeedback(submitted);
    expect(reopened).toEqual({ ...submitted, submitted: false });
  });

  it("cenário completo do relatório: partial + wanted_examples -> enviar -> alterar -> clear zera clarityReason", () => {
    let state = INITIAL_CLARITY_FEEDBACK_STATE;
    state = selectClarity(state, "partial");
    state = selectClarityReason(state, "wanted_examples");
    state = submitClarityFeedback(state);
    expect(state.submitted).toBe(true);

    state = reopenClarityFeedback(state);
    expect(state.submitted).toBe(false);
    expect(state.clarityReason).toBe("wanted_examples");

    state = selectClarity(state, "clear");
    expect(state.clarity).toBe("clear");
    expect(state.clarityReason).toBeNull();
    expect(state.submitted).toBe(true);
  });
});
