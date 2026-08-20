import type { BudgetId } from "./types";

export const BUDGET_LABELS: Record<BudgetId, string> = {
  under_50: "Até R$50",
  "50_80": "R$50 a R$80",
  "80_120": "R$80 a R$120",
  "120_200": "R$120 a R$200",
  over_200: "Mais de R$200",
  open: "Sem faixa definida",
};

const BUDGET_CLAUSES: Record<Exclude<BudgetId, "open">, string> = {
  under_50: "Meu orçamento hoje é até R$50.",
  "50_80": "Meu orçamento hoje é entre R$50 e R$80.",
  "80_120": "Meu orçamento hoje é entre R$80 e R$120.",
  "120_200": "Meu orçamento hoje é entre R$120 e R$200.",
  over_200: "Meu orçamento hoje é acima de R$200.",
};

/** Cláusula a antepor ao askPhrase original. null para "open" (sem frase adicional). */
function budgetClause(budget: BudgetId): string | null {
  if (budget === "open") return null;
  return BUDGET_CLAUSES[budget];
}

/**
 * Nunca lê nem edita o texto de askPhrase — só antepõe uma cláusula fixa,
 * própria, de orçamento. askPhrase null permanece null (nunca "").
 */
export function buildContextualAskPhrase(askPhrase: string | null, budget: BudgetId): string | null {
  if (askPhrase === null) return null;
  const clause = budgetClause(budget);
  return clause ? `${clause} ${askPhrase}` : askPhrase;
}
