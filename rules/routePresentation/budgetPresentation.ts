import type { BudgetId } from "./types";

/**
 * Cláusula a antepor ao askPhrase original — a única função pública desta
 * faixa. Não existe mais um "budgetLabel" de apresentação: nesta versão o
 * orçamento é complemento opcional de "Pode pedir assim", não um dado
 * mostrado como propriedade do perfil.
 */
const BUDGET_CLAUSES: Record<Exclude<BudgetId, "open">, string> = {
  under_50: "Quero gastar até R$50.",
  "50_80": "Quero gastar entre R$50 e R$80.",
  "80_120": "Quero gastar entre R$80 e R$120.",
  "120_200": "Quero gastar entre R$120 e R$200.",
  over_200: "Quero gastar mais de R$200.",
};

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
