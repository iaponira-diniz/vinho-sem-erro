import { useState } from "react";

import { getWineProfileById } from "../../../content/profiles";
import { buildRoutePresentation } from "../../../rules/routePresentation";
import type { RouteContext } from "../../../rules/routePresentation";
import { ClarityFeedbackBlock } from "../../feedback/ClarityFeedbackBlock";
import { InvalidStep } from "./InvalidStep";

interface ResultStepProps {
  profileId: string;
  routeContext: RouteContext;
  onBack: () => void;
  onRestart: () => void;
}

export function ResultStep({ profileId, routeContext, onBack, onRestart }: ResultStepProps) {
  const profile = getWineProfileById(profileId);
  const [copyState, setCopyState] = useState<"idle" | "copied" | "failed">("idle");

  if (!profile) {
    // Defensivo: profileId veio do motor já testado (rules/recommendation),
    // então isto não deveria acontecer na prática.
    return <InvalidStep onBack={onBack} onRestart={onRestart} />;
  }

  // Único ponto de chamada: reason/budget nunca são lidos de novo abaixo.
  const presentation = buildRoutePresentation(profile, routeContext);

  async function handleCopyPhrase() {
    if (!presentation.contextualAskPhrase) return;
    try {
      if (!navigator.clipboard) throw new Error("Clipboard API indisponível");
      await navigator.clipboard.writeText(presentation.contextualAskPhrase);
      setCopyState("copied");
    } catch {
      // Clipboard indisponível ou a operação falhou (permissão, contexto
      // não seguro, navegador antigo etc.) — sem biblioteca de fallback,
      // só orientamos a pessoa a selecionar o texto manualmente.
      setCopyState("failed");
    }
    window.setTimeout(() => setCopyState("idle"), 2500);
  }

  return (
    <section className="screen result-screen">
      <h1 className="result-title">SUA ROTA DE HOJE</h1>
      <h2 className="result-name">{profile.name}</h2>
      {profile.customerSummary && <p className="result-summary">{profile.customerSummary}</p>}

      <div className="route-context">
        <div className="route-context-item">
          <span className="route-context-label">SEU MOMENTO</span>
          <span className="route-context-value">{presentation.reasonLabel}</span>
        </div>
      </div>

      {profile.mainClues.length > 0 && (
        <section className="result-block">
          <h3>Boas pistas</h3>
          <ul className="clue-list">
            {profile.mainClues.map((clue) => (
              <li key={clue.name}>
                <strong>{clue.name}</strong>
                {clue.note && <p>{clue.note}</p>}
              </li>
            ))}
          </ul>
        </section>
      )}

      {profile.additionalClues.length > 0 && (
        <details className="result-block" open={presentation.expandAdditionalClues}>
          <summary>Mais opções</summary>
          <ul className="clue-list">
            {profile.additionalClues.map((clue) => (
              <li key={clue.name}>
                <strong>{clue.name}</strong>
                {clue.note && <p>{clue.note}</p>}
              </li>
            ))}
          </ul>
        </details>
      )}

      {profile.labelClues.length > 0 && (
        <section className="result-block">
          <h3>No rótulo, procure pistas como</h3>
          <ul className="chip-list">
            {profile.labelClues.map((term) => (
              <li key={term} className="chip">
                {term}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/*
        `profile.avoid` existe nos JSONs como nota interna de curadoria
        (ex.: linha de corte do Demi-Sec no SPARK_04) e não é exibido:
        é instrução para o sistema, não texto para a cliente.
      */}

      {presentation.discoveryOptions.length > 0 && (
        <details className="result-block">
          <summary>Se quiser sair do óbvio</summary>
          <ul className="clue-list">
            {presentation.discoveryOptions.map((clue) => (
              <li key={clue.name}>
                <strong>{clue.name}</strong>
                {clue.note && <p>{clue.note}</p>}
              </li>
            ))}
          </ul>
        </details>
      )}

      {presentation.contextualAskPhrase && (
        <section
          className={`result-block ask-phrase-block${
            presentation.emphasizeAskPhrase ? " ask-phrase-block--emphasized" : ""
          }`}
        >
          <h3>Pode pedir assim</h3>
          <p className="ask-phrase-text">&ldquo;{presentation.contextualAskPhrase}&rdquo;</p>
          <button type="button" className="copy-button" onClick={handleCopyPhrase}>
            Copiar frase
          </button>
          {copyState === "copied" && (
            <span className="copy-feedback" role="status">
              Frase copiada
            </span>
          )}
          {copyState === "failed" && (
            <span className="copy-feedback" role="status">
              Não foi possível copiar automaticamente. Selecione a frase para copiar.
            </span>
          )}
        </section>
      )}

      {profile.whyThisRoute && (
        <details className="result-block">
          <summary>Por que esta é sua Rota?</summary>
          <p>{profile.whyThisRoute}</p>
        </details>
      )}

      <ClarityFeedbackBlock />

      <button type="button" className="restart-button" onClick={onRestart}>
        Recomeçar
      </button>
    </section>
  );
}
