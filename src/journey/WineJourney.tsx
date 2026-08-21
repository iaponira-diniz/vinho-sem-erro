import { evaluateMicroDiagnosis } from "../../rules/microDiagnosis";
import { resolveProfile } from "../../rules/recommendation";
import { QuestionScreen } from "../components/QuestionScreen";
import { useJourney } from "./JourneyProvider";
import {
  BUDGET_OPTIONS,
  PALATE_OPTIONS_BY_WINE_TYPE,
  PALATE_TITLES,
  REASON_OPTIONS,
  WINE_TYPE_OPTIONS,
} from "./journeyOptions";
import { InvalidStep } from "./steps/InvalidStep";
import { NeedsHelpStep } from "./steps/NeedsHelpStep";
import { ResultStep } from "./steps/ResultStep";

const MICRO_DIAGNOSIS_PROGRESS_DEFAULT = "Vamos por uma pista de cada vez.";
const MICRO_DIAGNOSIS_PROGRESS_FINAL = "Só mais uma pista.";

/**
 * "Quer incluir uma faixa de preço na hora de pedir ajuda?" — o perfil já
 * está resolvido quando essa pergunta aparece; ela nunca tem numeração de
 * progresso (não é mais uma etapa da recomendação, é complemento opcional
 * de "Pode pedir assim").
 */
const BUDGET_QUESTION_TITLE = "Quer incluir uma faixa de preço na hora de pedir ajuda?";

type ProfileResolution =
  | { status: "resolved"; profileId: string }
  | { status: "needs_help" }
  | { status: "invalid" };

/**
 * Único responsável por decidir qual tela renderizar a partir do
 * currentStep. Chama resolveProfile() (rules/recommendation) e
 * evaluateMicroDiagnosis() (rules/microDiagnosis) — nunca reimplementa o
 * mapeamento resposta -> perfil aqui.
 */
export function WineJourney() {
  const {
    journey,
    currentStep,
    microDiagnosis,
    answerReason,
    answerWineType,
    answerPalate,
    answerMicroDiagnosis,
    answerBudget,
    back,
    backMicroDiagnosis,
    restart,
  } = useJourney();

  /**
   * O perfil sensorial é sempre derivado sob demanda — nunca guardado como
   * uma segunda fonte de verdade. Usado tanto no complemento de orçamento
   * quanto no resultado, para não duplicar a lógica de "qual motor chamar".
   */
  function resolveCurrentProfile(): ProfileResolution {
    if (microDiagnosis) {
      const resolution = evaluateMicroDiagnosis(microDiagnosis);
      if (resolution.status === "resolved") {
        return { status: "resolved", profileId: resolution.profileId };
      }
      // Defensivo: neste ponto da jornada o diagnóstico já deveria estar
      // resolvido — "question" aqui não deveria acontecer.
      return { status: "invalid" };
    }
    const wineType = journey.wineType;
    const resolution = wineType ? resolveProfile(wineType, journey.palateOptionId) : null;
    if (!resolution) return { status: "invalid" };
    if (resolution.status === "resolved") return { status: "resolved", profileId: resolution.profileId };
    return { status: resolution.status };
  }

  switch (currentStep) {
    case "reason":
      return (
        <QuestionScreen
          key="reason"
          title="Qual é o momento?"
          options={REASON_OPTIONS}
          selectedId={journey.reason}
          onContinue={answerReason}
          step={{ index: 1, total: 3 }}
        />
      );

    case "wineType":
      return (
        <QuestionScreen
          key="wineType"
          title="O que você está com vontade de beber hoje?"
          options={WINE_TYPE_OPTIONS}
          selectedId={journey.wineType}
          onContinue={answerWineType}
          onBack={back}
          step={{ index: 2, total: 3 }}
        />
      );

    case "palate": {
      const wineType = journey.wineType;
      if (wineType === null || wineType === "unknown" || wineType === "rose") {
        // Defensivo: o reducer nunca leva a "palate" com wineType
        // desconhecido (vai para "microDiagnosis") nem com "rose" (resolve
        // direto para "budget"). Não deveria acontecer.
        return <NeedsHelpStep onBack={back} onRestart={restart} />;
      }
      return (
        <QuestionScreen
          key="palate"
          title={PALATE_TITLES[wineType]}
          options={PALATE_OPTIONS_BY_WINE_TYPE[wineType]}
          selectedId={journey.palateOptionId}
          onContinue={answerPalate}
          onBack={back}
          step={{ index: 3, total: 3 }}
        />
      );
    }

    case "microDiagnosis": {
      if (!microDiagnosis) {
        // Defensivo: não deveria acontecer.
        return <InvalidStep onBack={back} onRestart={restart} />;
      }

      const resolution = evaluateMicroDiagnosis(microDiagnosis);

      if (resolution.status === "question") {
        return (
          <QuestionScreen
            key={resolution.question.id}
            title={resolution.question.prompt}
            options={resolution.question.options}
            selectedId={null}
            onContinue={(answerId) =>
              answerMicroDiagnosis({ questionId: resolution.question.id, answerId })
            }
            onBack={backMicroDiagnosis}
            qualitativeProgress={
              resolution.question.isFinal ? MICRO_DIAGNOSIS_PROGRESS_FINAL : MICRO_DIAGNOSIS_PROGRESS_DEFAULT
            }
          />
        );
      }

      // Perfil já resolvido pelo diagnóstico — falta só o complemento
      // opcional de faixa de preço antes do resultado. Sem numeração: não
      // é mais uma etapa da recomendação.
      return (
        <QuestionScreen
          key="budget"
          title={BUDGET_QUESTION_TITLE}
          options={BUDGET_OPTIONS}
          selectedId={journey.budget}
          onContinue={answerBudget}
          onBack={backMicroDiagnosis}
        />
      );
    }

    case "budget": {
      const resolution = resolveCurrentProfile();
      if (resolution.status === "needs_help") {
        return <NeedsHelpStep onBack={back} onRestart={restart} />;
      }
      if (resolution.status === "invalid") {
        return <InvalidStep onBack={back} onRestart={restart} />;
      }
      return (
        <QuestionScreen
          key="budget"
          title={BUDGET_QUESTION_TITLE}
          options={BUDGET_OPTIONS}
          selectedId={journey.budget}
          onContinue={answerBudget}
          onBack={back}
        />
      );
    }

    case "result": {
      const { reason, budget } = journey;

      // reason/budget são respondidos antes do resultado nesta jornada,
      // então nunca deveriam estar nulos aqui — se estiverem, é
      // inconsistência da jornada, não um caso de negócio a resolver com
      // valor padrão.
      if (reason === null || budget === null) {
        return <InvalidStep onBack={back} onRestart={restart} />;
      }

      const resolution = resolveCurrentProfile();

      if (resolution.status === "needs_help") {
        return <NeedsHelpStep onBack={back} onRestart={restart} />;
      }
      if (resolution.status === "invalid") {
        return <InvalidStep onBack={back} onRestart={restart} />;
      }
      return (
        <ResultStep
          profileId={resolution.profileId}
          routeContext={{ reason, budget }}
          onBack={back}
          onRestart={restart}
        />
      );
    }

    default:
      return null;
  }
}
