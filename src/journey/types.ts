import type { PalateOptionId, WineTypeId } from "../../rules/recommendation";
import type { BudgetId, ReasonId } from "../../rules/routePresentation";

/**
 * Reexportados (não redeclarados) de rules/routePresentation — mesmo
 * padrão já usado para WineTypeId/PalateOptionId (rules/recommendation).
 * src/ nunca é dono desses aliases, só os repassa.
 */
export type { BudgetId, ReasonId };

/**
 * Única intenção ativa nesta versão — assumida como padrão interno, sem
 * tela própria. O tipo continua existindo para não fechar a possibilidade
 * arquitetural de outras intenções no futuro (ex.: presente, restaurante).
 */
export type IntentId = "for_me";

export type JourneyStepId = "reason" | "wineType" | "palate" | "microDiagnosis" | "budget" | "result";

/**
 * Estado de produto da jornada — só respostas da pessoa. `profileId` não
 * mora aqui: é derivado deterministicamente de wineType + palateOptionId
 * por resolveProfile() (rules/recommendation), num único ponto
 * arquitetural (WineJourney), nunca guardado como segunda fonte de verdade.
 */
export interface JourneyState {
  /** Sempre "for_me" nesta versão — não há tela para escolher outra coisa. */
  intent: IntentId;
  reason: ReasonId | null;
  budget: BudgetId | null;
  wineType: WineTypeId | null;
  palateOptionId: PalateOptionId | null;
}
