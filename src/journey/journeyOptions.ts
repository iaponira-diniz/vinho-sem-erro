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
  { id: "unknown", label: "Não sei — me ajude a decidir" },
];

type KnownWineTypeId = Exclude<WineTypeId, "unknown">;

export const PALATE_TITLES: Record<KnownWineTypeId, string> = {
  red: "O que parece mais gostoso hoje?",
  white: "O que parece mais gostoso hoje?",
  rose: "O que parece mais gostoso hoje?",
  sparkling: "Que tipo de espumante parece mais gostoso?",
};

export const PALATE_OPTIONS_BY_WINE_TYPE: Record<
  KnownWineTypeId,
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
  rose: [
    { id: "rose_dry_refreshing", label: "Seco e bem refrescante" },
    { id: "rose_fruity_refreshing", label: "Frutado, fresco e fácil de beber" },
    { id: "rose_unknown", label: "Não sei" },
  ],
  sparkling: [
    { id: "sparkling_dry_refreshing", label: "Seco, fresco e com pouca sensação de açúcar" },
    {
      id: "sparkling_fruity_aromatic",
      label: "Bem frutado, aromático e fácil de beber, mas sem ser muito doce",
    },
    { id: "sparkling_sweet_aromatic", label: "Doce, perfumado e bem frutado" },
    { id: "sparkling_unknown", label: "Não sei" },
  ],
};
