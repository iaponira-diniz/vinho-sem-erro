import { useState } from "react";

import {
  COMMENT_MAX_LENGTH,
  INITIAL_CLARITY_FEEDBACK_STATE,
  canSubmitClarityFeedback,
  reopenClarityFeedback,
  selectClarity,
  selectClarityReason,
  setComment,
  submitClarityFeedback,
} from "../../rules/feedback";
import { CLARITY_CONFIRMATION_MESSAGE, CLARITY_OPTIONS, CLARITY_REASON_OPTIONS } from "./clarityOptions";

/**
 * Momento A do feedback — clareza imediata. Vive só em memória local desta
 * tela: sem D1, sem API, sem localStorage. Não influencia profileId,
 * WineProfile nem RoutePresentation, só registra a percepção da pessoa.
 */
export function ClarityFeedbackBlock() {
  const [state, setState] = useState(INITIAL_CLARITY_FEEDBACK_STATE);

  if (state.submitted && state.clarity) {
    return (
      <section className="feedback-block">
        <p className="feedback-confirmation">{CLARITY_CONFIRMATION_MESSAGE[state.clarity]}</p>
        <button
          type="button"
          className="feedback-change-link"
          onClick={() => setState(reopenClarityFeedback(state))}
        >
          Alterar resposta
        </button>
      </section>
    );
  }

  return (
    <section className="feedback-block">
      <h3>Essa Rota ajudou você a saber o que procurar?</h3>
      <div className="option-list" role="group" aria-label="Essa Rota ajudou você a saber o que procurar?">
        {CLARITY_OPTIONS.map((option) => (
          <button
            key={option.id}
            type="button"
            className="option-button"
            aria-pressed={state.clarity === option.id}
            onClick={() => setState(selectClarity(state, option.id))}
          >
            {option.label}
          </button>
        ))}
      </div>

      {state.clarity !== null && state.clarity !== "clear" && (
        <div className="feedback-reason">
          <h4>O que faltou?</h4>
          <div className="option-list" role="group" aria-label="O que faltou?">
            {CLARITY_REASON_OPTIONS.map((option) => (
              <button
                key={option.id}
                type="button"
                className="option-button"
                aria-pressed={state.clarityReason === option.id}
                onClick={() => setState(selectClarityReason(state, option.id))}
              >
                {option.label}
              </button>
            ))}
          </div>

          <label className="feedback-comment-label" htmlFor="clarity-feedback-comment">
            Quer me contar mais?
          </label>
          <textarea
            id="clarity-feedback-comment"
            className="feedback-comment-input"
            value={state.comment}
            maxLength={COMMENT_MAX_LENGTH}
            onChange={(event) => setState(setComment(state, event.target.value))}
          />
          <p className="feedback-comment-helper">
            Opcional. Não inclua dados pessoais. ({state.comment.length}/{COMMENT_MAX_LENGTH})
          </p>

          <button
            type="button"
            className="cta-secondary"
            disabled={!canSubmitClarityFeedback(state)}
            onClick={() => setState(submitClarityFeedback(state))}
          >
            Enviar feedback
          </button>
        </div>
      )}
    </section>
  );
}
