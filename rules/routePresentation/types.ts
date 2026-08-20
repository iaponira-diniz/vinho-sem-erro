import type { WineClue } from "../../content/types";

/**
 * Identificadores de resposta de "momento" e "orçamento" — não são
 * conteúdo de UI, por isso moram aqui (mesma lógica de WineTypeId /
 * PalateOptionId em rules/recommendation): src/journey importa daqui,
 * nunca o contrário.
 */
export type ReasonId = "everyday" | "relax" | "guests" | "special" | "explore";

export type BudgetId =
  | "under_50"
  | "50_80"
  | "80_120"
  | "120_200"
  | "over_200"
  | "open";

export interface RouteContext {
  reason: ReasonId;
  budget: BudgetId;
}

export interface RoutePresentation {
  reasonLabel: string;
  reasonMessage: string;

  budgetLabel: string;

  /** null quando profile.askPhrase é null — nunca string vazia. */
  contextualAskPhrase: string | null;

  emphasizeAskPhrase: boolean;
  expandAdditionalClues: boolean;

  /** Só não-vazio quando reason === "explore"; no máximo 2 itens. */
  discoveryOptions: WineClue[];
}
