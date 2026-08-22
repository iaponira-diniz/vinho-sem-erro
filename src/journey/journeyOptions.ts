import type { PalateOptionId, WineTypeId } from "../../rules/recommendation";
import type { QuestionOption } from "../components/QuestionScreen";
import type { BudgetId, ReasonId } from "./types";

export const REASON_OPTIONS: readonly QuestionOption<ReasonId>[] = [
  { id: "everyday", label: "Quero um vinho gostoso para o dia a dia" },
  { id: "relax", label: "Quero relaxar e tomar uma taça" },
  { id: "guests", label: "Vou receber pessoas" },
  { id: "special", label: "É uma ocasião especial" },
  { id: "explore", label: "Quero experimentar algo diferente" },
];

export const BUDGET_OPTIONS: readonly QuestionOption<BudgetId>[] = [
  { id: "under_50", label: "Até R$50" },
  { id: "50_80", label: "R$50 a R$80" },
  { id: "80_120", label: "R$80 a R$120" },
  { id: "120_200", label: "R$120 a R$200" },
  { id: "over_200", label: "Mais de R$200" },
  { id: "open", label: "Prefiro não definir" },
];

export const WINE_TYPE_OPTIONS: readonly QuestionOption<WineTypeId>[] = [
  { id: "red", label: "Tinto" },
  { id: "white", label: "Branco" },
  { id: "rose", label: "Rosé" },
  { id: "sparkling", label: "Espumante" },
  { id: "unknown", label: "Não sei, me ajude a decidir" },
];

/**
 * "rose" fica de fora: só existe ROSE_01 nesta versão, então escolher
 * "Rosé" resolve direto (ver JourneyProvider) — não há pergunta de
 * paladar com função diagnóstica real a fazer para essa cor.
 */
type PalateAskedWineTypeId = Exclude<WineTypeId, "unknown" | "rose">;

export const PALATE_TITLES: Record<PalateAskedWineTypeId, string> = {
  red: "O que parece mais gostoso hoje?",
  white: "O que parece mais gostoso hoje?",
  sparkling: "Como você quer aproveitar esse espumante?",
};

export const PALATE_OPTIONS_BY_WINE_TYPE: Record<
  PalateAskedWineTypeId,
  readonly QuestionOption<PalateOptionId>[]
> = {
  red: [
    { id: "red_light", label: "Leve, fresco e fácil de beber" },
    { id: "red_soft_fruity", label: "Macio, frutado e sem muita secura" },
    { id: "red_balanced", label: "Com mais presença, mas equilibrado" },
    { id: "red_intense", label: "Intenso, encorpado e marcante" },
    { id: "red_unknown", label: "Não sei" },
  ],
  white: [
    { id: "white_light_refreshing", label: "Leve, seco e bem refrescante" },
    { id: "white_aromatic_fruity", label: "Perfumado, aromático e cheio de fruta" },
    { id: "white_creamy_structured", label: "Mais encorpado, cremoso e envolvente" },
    { id: "white_unknown", label: "Não sei" },
  ],
  sparkling: [
    { id: "sparkling_dry_refreshing", label: "Leve e fresco, ótimo pra brindar ou dias de calor" },
    {
      id: "sparkling_structured_traditional",
      label: "Mais estruturado, com corpo e presença à mesa",
    },
    { id: "sparkling_rose_fruity", label: "Rosé, frutado e fácil de beber, sempre seco" },
    { id: "sparkling_sweet_aromatic", label: "Doce, perfumado e bem frutado" },
    { id: "sparkling_unknown", label: "Não sei" },
  ],
};
