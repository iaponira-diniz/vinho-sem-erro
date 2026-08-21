import { createContext, useContext, useMemo, useReducer } from "react";
import type { ReactNode } from "react";

import type { PalateOptionId, WineTypeId } from "../../rules/recommendation";
import type { MicroDiagnosisAnswer, MicroDiagnosisState } from "../../rules/microDiagnosis";
import type { BudgetId, JourneyState, JourneyStepId, ReasonId } from "./types";

interface NavState {
  currentStep: JourneyStepId;
  history: JourneyStepId[];
}

interface FullState {
  journey: JourneyState;
  nav: NavState;
  /** Não é conteúdo de vinho — só o histórico de respostas do "Me ajude a decidir" em andamento. */
  microDiagnosis: MicroDiagnosisState | null;
}

type Action =
  | { type: "ANSWER_REASON"; value: ReasonId }
  | { type: "ANSWER_WINE_TYPE"; value: WineTypeId }
  | { type: "ANSWER_PALATE"; value: PalateOptionId }
  | { type: "ANSWER_MICRO_DIAGNOSIS"; answer: MicroDiagnosisAnswer }
  | { type: "ANSWER_BUDGET"; value: BudgetId }
  | { type: "BACK" }
  | { type: "BACK_MICRO_DIAGNOSIS" }
  | { type: "RESTART" };

const INITIAL_JOURNEY: JourneyState = {
  intent: "for_me",
  reason: null,
  budget: null,
  wineType: null,
  palateOptionId: null,
};

const INITIAL_NAV: NavState = {
  currentStep: "reason",
  history: [],
};

const INITIAL_STATE: FullState = { journey: INITIAL_JOURNEY, nav: INITIAL_NAV, microDiagnosis: null };

function advance(state: FullState, patch: Partial<JourneyState>, nextStep: JourneyStepId): FullState {
  return {
    journey: { ...state.journey, ...patch },
    nav: { currentStep: nextStep, history: [...state.nav.history, state.nav.currentStep] },
    // Preservado por padrão — ANSWER_WINE_TYPE sobrescreve explicitamente
    // quando precisa iniciar ou encerrar um diagnóstico.
    microDiagnosis: state.microDiagnosis,
  };
}

function reducer(state: FullState, action: Action): FullState {
  switch (action.type) {
    case "ANSWER_REASON":
      return advance(state, { reason: action.value }, "wineType");

    case "ANSWER_WINE_TYPE": {
      // Regra de invalidação: mudar wineType invalida a resposta de
      // paladar, porque ela dependia do tipo anterior. reason e budget
      // nunca são tocados aqui.
      const previousWineType = state.journey.wineType;
      const wineTypeChanged = previousWineType !== null && previousWineType !== action.value;
      const patch: Partial<JourneyState> = { wineType: action.value };
      if (wineTypeChanged) {
        patch.palateOptionId = null;
      }

      let nextStep: JourneyStepId;
      let microDiagnosis: MicroDiagnosisState | null = null;

      if (action.value === "unknown") {
        nextStep = "microDiagnosis";
        microDiagnosis = { entry: { kind: "wineTypeUnknown" }, answers: [] };
      } else if (action.value === "rose") {
        // Só existe ROSE_01 nesta versão — nenhuma pergunta de paladar
        // teria função diagnóstica real, então resolve direto via
        // resolveProfile() (mesma derivação já existente, sem inventar
        // um caminho novo): "rose_dry_refreshing" e "rose_fruity_refreshing"
        // já mapeiam para o mesmo profileId.
        patch.palateOptionId = "rose_dry_refreshing";
        nextStep = "budget";
      } else {
        nextStep = "palate";
      }

      return { ...advance(state, patch, nextStep), microDiagnosis };
    }

    case "ANSWER_PALATE": {
      const isUnknownAnswer = action.value.endsWith("_unknown");
      const wineType = state.journey.wineType;
      const nextStep: JourneyStepId = isUnknownAnswer ? "microDiagnosis" : "budget";
      const microDiagnosis: MicroDiagnosisState | null =
        isUnknownAnswer && wineType && wineType !== "unknown"
          ? { entry: { kind: "palateUnknown", wineType }, answers: [] }
          : null;
      return { ...advance(state, { palateOptionId: action.value }, nextStep), microDiagnosis };
    }

    case "ANSWER_MICRO_DIAGNOSIS": {
      if (!state.microDiagnosis) return state;
      const microDiagnosis: MicroDiagnosisState = {
        ...state.microDiagnosis,
        answers: [...state.microDiagnosis.answers, action.answer],
      };
      // Fica em "microDiagnosis" — é o WineJourney quem decide, chamando
      // evaluateMicroDiagnosis(), se mostra a próxima pergunta ou o
      // complemento de orçamento. Nenhum motor é chamado aqui.
      return { ...state, microDiagnosis };
    }

    case "ANSWER_BUDGET":
      return advance(state, { budget: action.value }, "result");

    case "BACK": {
      if (state.nav.history.length === 0) return state;
      const history = state.nav.history.slice(0, -1);
      const currentStep = state.nav.history[state.nav.history.length - 1];
      // Sair de "microDiagnosis" por completo (não só desfazer uma
      // resposta interna) reseta o diagnóstico — reentrar nele recomeça do
      // zero, nunca com respostas de uma tentativa anterior.
      const microDiagnosis = state.nav.currentStep === "microDiagnosis" ? null : state.microDiagnosis;
      return { ...state, microDiagnosis, nav: { currentStep, history } };
    }

    case "BACK_MICRO_DIAGNOSIS": {
      // Dentro do diagnóstico, "answers" é o próprio histórico: voltar
      // remove a última resposta e deixa evaluateMicroDiagnosis recalcular.
      if (state.microDiagnosis && state.microDiagnosis.answers.length > 0) {
        const microDiagnosis: MicroDiagnosisState = {
          ...state.microDiagnosis,
          answers: state.microDiagnosis.answers.slice(0, -1),
        };
        return { ...state, microDiagnosis };
      }
      // Nada para desfazer dentro do diagnóstico — sai dele inteiramente,
      // delegando para a navegação normal (volta pra Tipo).
      if (state.nav.history.length === 0) return state;
      const history = state.nav.history.slice(0, -1);
      const currentStep = state.nav.history[state.nav.history.length - 1];
      return { ...state, microDiagnosis: null, nav: { currentStep, history } };
    }

    case "RESTART":
      return INITIAL_STATE;

    default:
      return state;
  }
}

interface JourneyContextValue {
  journey: JourneyState;
  currentStep: JourneyStepId;
  microDiagnosis: MicroDiagnosisState | null;
  answerReason: (value: ReasonId) => void;
  answerWineType: (value: WineTypeId) => void;
  answerPalate: (value: PalateOptionId) => void;
  answerMicroDiagnosis: (answer: MicroDiagnosisAnswer) => void;
  answerBudget: (value: BudgetId) => void;
  back: () => void;
  backMicroDiagnosis: () => void;
  restart: () => void;
}

const JourneyContext = createContext<JourneyContextValue | null>(null);

export function JourneyProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  const value = useMemo<JourneyContextValue>(
    () => ({
      journey: state.journey,
      currentStep: state.nav.currentStep,
      microDiagnosis: state.microDiagnosis,
      answerReason: (value) => dispatch({ type: "ANSWER_REASON", value }),
      answerWineType: (value) => dispatch({ type: "ANSWER_WINE_TYPE", value }),
      answerPalate: (value) => dispatch({ type: "ANSWER_PALATE", value }),
      answerMicroDiagnosis: (answer) => dispatch({ type: "ANSWER_MICRO_DIAGNOSIS", answer }),
      answerBudget: (value) => dispatch({ type: "ANSWER_BUDGET", value }),
      back: () => dispatch({ type: "BACK" }),
      backMicroDiagnosis: () => dispatch({ type: "BACK_MICRO_DIAGNOSIS" }),
      restart: () => dispatch({ type: "RESTART" }),
    }),
    [state],
  );

  return <JourneyContext.Provider value={value}>{children}</JourneyContext.Provider>;
}

/**
 * Reexportado do mesmo arquivo do Provider (em vez de um useJourney.ts
 * separado) — ajuste técnico pequeno para não fragmentar um hook de poucas
 * linhas em outro arquivo.
 */
export function useJourney(): JourneyContextValue {
  const ctx = useContext(JourneyContext);
  if (!ctx) {
    throw new Error("useJourney must be used within JourneyProvider");
  }
  return ctx;
}
