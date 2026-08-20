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
import { IntentStep } from "./steps/IntentStep";
import { InvalidStep } from "./steps/InvalidStep";
import { MicroDiagnosisUnsupportedStep } from "./steps/MicroDiagnosisUnsupportedStep";
import { NeedsHelpStep } from "./steps/NeedsHelpStep";
import { ResultStep } from "./steps/ResultStep";

const MICRO_DIAGNOSIS_PROGRESS_DEFAULT = "Vamos por uma pista de cada vez.";
const MICRO_DIAGNOSIS_PROGRESS_FINAL = "Só mais uma pista.";

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
    answerBudget,
    answerWineType,
    answerPalate,
    answerMicroDiagnosis,
    back,
    backMicroDiagnosis,
    restart,
  } = useJourney();

  switch (currentStep) {
    case "intent":
      return <IntentStep />;

    case "reason":
      return (
        <QuestionScreen
          key="reason"
          title="Qual é o momento?"
          options={REASON_OPTIONS}
          selectedId={journey.reason}
          onContinue={answerReason}
          onBack={back}
          step={{ index: 1, total: 4 }}
        />
      );

    case "budget":
      return (
        <QuestionScreen
          key="budget"
          title="Quanto você quer gastar?"
          options={BUDGET_OPTIONS}
          selectedId={journey.budget}
          onContinue={answerBudget}
          onBack={back}
          step={{ index: 2, total: 4 }}
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
          step={{ index: 3, total: 4 }}
        />
      );

    case "palate": {
      const wineType = journey.wineType;
      if (wineType === null || wineType === "unknown") {
        // Defensivo: o reducer nunca leva a "palate" com wineType
        // desconhecido (vai para "microDiagnosis"). Não deveria acontecer.
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
          step={{ index: 4, total: 4 }}
        />
      );
    }

    case "microDiagnosis": {
      const { reason, budget } = journey;

      if (!microDiagnosis || reason === null || budget === null) {
        // Defensivo: mesma regra do passo "result" — sem valor padrão.
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

      if (resolution.status === "unsupported") {
        return <MicroDiagnosisUnsupportedStep message={resolution.message} onBack={back} />;
      }

      return (
        <ResultStep
          profileId={resolution.profileId}
          routeContext={{ reason, budget }}
          onBack={backMicroDiagnosis}
          onRestart={restart}
        />
      );
    }

    case "result": {
      const { wineType, palateOptionId, reason, budget } = journey;

      // reason/budget são respondidos antes de wineType/palate nesta
      // jornada, então nunca deveriam estar nulos aqui — se estiverem, é
      // inconsistência da jornada, não um caso de negócio a resolver com
      // valor padrão.
      if (reason === null || budget === null) {
        return <InvalidStep onBack={back} onRestart={restart} />;
      }

      const resolution = wineType ? resolveProfile(wineType, palateOptionId) : null;

      // Defensivo: com o microdiagnóstico tratando wineType=unknown e todo
      // *_unknown, resolveProfile não deveria mais devolver needs_help por
      // um caminho normal da UI — mas o motor original continua intacto.
      if (!resolution || resolution.status === "needs_help") {
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
