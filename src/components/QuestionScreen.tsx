import { useState } from "react";

import { ProgressBar } from "./ProgressBar";

export interface QuestionOption<T extends string> {
  id: T;
  label: string;
}

interface QuestionScreenProps<T extends string> {
  title: string;
  options: readonly QuestionOption<T>[];
  /** Resposta já salva na jornada, se houver — pré-seleciona ao voltar. */
  selectedId: T | null;
  onContinue: (id: T) => void;
  /** Omitido na primeira tela real da jornada — não há nada para onde voltar. */
  onBack?: () => void;
  /** Progresso numérico (jornada principal). */
  step?: { index: number; total: number };
  /** Progresso qualitativo (microdiagnóstico) — mutuamente exclusivo com `step`. */
  qualitativeProgress?: string;
}

/**
 * Layout genérico de pergunta: uma decisão por tela, seleção grande,
 * confirmação explícita em "Continuar" (sem avançar automaticamente ao
 * tocar numa opção).
 */
export function QuestionScreen<T extends string>({
  title,
  options,
  selectedId,
  onContinue,
  onBack,
  step,
  qualitativeProgress,
}: QuestionScreenProps<T>) {
  const [pending, setPending] = useState<T | null>(selectedId);

  return (
    <section className="screen question-screen">
      {onBack && (
        <button type="button" className="back-link" onClick={onBack}>
          ← Voltar
        </button>
      )}

      {step && <ProgressBar index={step.index} total={step.total} />}
      {qualitativeProgress && <p className="qualitative-progress">{qualitativeProgress}</p>}

      <h1 className="screen-question">{title}</h1>

      <div className="option-list" role="group" aria-label={title}>
        {options.map((option) => (
          <button
            key={option.id}
            type="button"
            className="option-button"
            aria-pressed={pending === option.id}
            onClick={() => setPending(option.id)}
          >
            {option.label}
          </button>
        ))}
      </div>

      <button
        type="button"
        className="cta-primary"
        disabled={pending === null}
        onClick={() => {
          if (pending !== null) onContinue(pending);
        }}
      >
        Continuar
      </button>
    </section>
  );
}
