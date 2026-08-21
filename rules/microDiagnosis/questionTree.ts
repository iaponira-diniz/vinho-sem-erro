import type { MicroDiagnosisQuestionId } from "./types";

type LeafNodeId =
  | "RED_01"
  | "RED_02"
  | "RED_03"
  | "RED_04"
  | "WHITE_01"
  | "WHITE_02"
  | "WHITE_03"
  | "ROSE_01"
  | "SPARK_01"
  | "SPARK_02"
  | "SPARK_03"
  | "SPARK_04";

export type TreeNodeId = MicroDiagnosisQuestionId | LeafNodeId;

export interface QuestionTreeNode {
  type: "question";
  id: MicroDiagnosisQuestionId;
  prompt: string;
  options: { id: string; label: string }[];
  next: Record<string, TreeNodeId>;
}

interface ResolvedTreeNode {
  type: "resolved";
  profileId: string;
}

/**
 * Só "question" e "resolved" existem nesta V1 — nenhum caminho da árvore
 * leva a um estado unsupported (o único caso, rosé mais doce, foi
 * removido: ROSE_01 é o único perfil de rosé, então não há como oferecer
 * uma opção que a Rota depois recusa).
 */
export type TreeNode = QuestionTreeNode | ResolvedTreeNode;

/**
 * A árvore inteira do microdiagnóstico, como dado — evaluateMicroDiagnosis()
 * só percorre isto, nenhuma regra fica codificada como if/else/switch.
 */
export const QUESTION_TREE: Record<TreeNodeId, TreeNode> = {
  // --- wineType unknown -----------------------------------------------
  bubbles: {
    type: "question",
    id: "bubbles",
    prompt: "Você está com vontade de algo com borbulhas?",
    options: [
      { id: "yes", label: "Sim" },
      { id: "no", label: "Não" },
      { id: "any", label: "Tanto faz" },
    ],
    next: { yes: "sparklingOccasion", no: "sensationNoBubbles", any: "sensationAnyBubbles" },
  },

  sparklingOccasion: {
    type: "question",
    id: "sparklingOccasion",
    prompt: "Não sabe? Vamos simplificar.",
    options: [
      { id: "toast", label: "Quer algo pra brindar ou beber sem compromisso?" },
      { id: "meal", label: "Quer algo pra acompanhar uma refeição mais robusta?" },
      { id: "rose", label: "Prefere fruta e leveza, tipo rosé?" },
      { id: "sweet", label: "Gosta de espumante mais doce?" },
      { id: "unsure", label: "Ainda não sei" },
    ],
    // "unsure" cai no fallback mais seguro/genérico (SPARK_01) — mesma
    // regra de nunca deixar a pessoa num beco sem saída.
    next: { toast: "SPARK_01", meal: "SPARK_02", rose: "SPARK_04", sweet: "SPARK_03", unsure: "SPARK_01" },
  },

  sensationNoBubbles: {
    type: "question",
    id: "sensationNoBubbles",
    prompt: "O que parece mais gostoso pra você agora?",
    options: [
      { id: "light", label: "Leve e refrescante" },
      { id: "soft_fruity", label: "Macio e bem frutado" },
      { id: "aromatic", label: "Bem perfumado, com aromas de flores e frutas" },
      { id: "full_body", label: "Com mais corpo e presença" },
      { id: "intense", label: "Intenso e marcante" },
    ],
    next: {
      light: "styleNoBubbles",
      soft_fruity: "RED_02",
      aromatic: "WHITE_02",
      full_body: "bodyStyle",
      intense: "RED_04",
    },
  },

  sensationAnyBubbles: {
    type: "question",
    id: "sensationAnyBubbles",
    prompt: "O que parece mais gostoso pra você agora?",
    options: [
      { id: "light", label: "Leve e refrescante" },
      { id: "soft_fruity", label: "Macio e bem frutado" },
      { id: "aromatic", label: "Bem perfumado, com aromas de flores e frutas" },
      { id: "full_body", label: "Com mais corpo e presença" },
      { id: "intense", label: "Intenso e marcante" },
    ],
    next: {
      light: "styleAnyBubbles",
      soft_fruity: "RED_02",
      aromatic: "aromaticStyleAnyBubbles",
      full_body: "bodyStyle",
      intense: "RED_04",
    },
  },

  styleNoBubbles: {
    type: "question",
    id: "styleNoBubbles",
    prompt: "Qual desses parece mais com o que você quer?",
    options: [
      { id: "red_light", label: "Tinto leve" },
      { id: "white_light", label: "Branco leve e refrescante" },
      { id: "rose_dry", label: "Rosé seco e refrescante" },
    ],
    next: {
      red_light: "RED_01",
      white_light: "WHITE_01",
      rose_dry: "ROSE_01",
    },
  },

  styleAnyBubbles: {
    type: "question",
    id: "styleAnyBubbles",
    prompt: "Qual desses combina mais com o que você imaginou?",
    options: [
      { id: "red_light", label: "Tinto leve" },
      { id: "white_light", label: "Branco leve e refrescante" },
      { id: "rose_dry", label: "Rosé seco e refrescante" },
      { id: "sparkling_dry", label: "Espumante seco e refrescante" },
    ],
    next: {
      red_light: "RED_01",
      white_light: "WHITE_01",
      rose_dry: "ROSE_01",
      sparkling_dry: "SPARK_01",
    },
  },

  bodyStyle: {
    type: "question",
    id: "bodyStyle",
    prompt: "Você imagina isso mais em um tinto ou em um branco?",
    options: [
      { id: "red", label: "Tinto" },
      { id: "white", label: "Branco" },
    ],
    next: { red: "RED_03", white: "WHITE_03" },
  },

  aromaticStyleAnyBubbles: {
    type: "question",
    id: "aromaticStyleAnyBubbles",
    prompt: "Qual desses combina mais com o que você imaginou?",
    options: [
      { id: "white_aromatic", label: "Branco perfumado" },
      { id: "sparkling_rose_fruity", label: "Espumante rosé e frutado" },
      { id: "sparkling_sweet", label: "Espumante docinho e perfumado" },
    ],
    next: {
      white_aromatic: "WHITE_02",
      sparkling_rose_fruity: "SPARK_04",
      sparkling_sweet: "SPARK_03",
    },
  },

  // --- palateUnknown: red ------------------------------------------------
  redWeight: {
    type: "question",
    id: "redWeight",
    prompt: "Hoje você imagina um tinto mais leve e fácil de beber, ou mais cheio e marcante?",
    options: [
      { id: "light", label: "Mais leve e fácil" },
      { id: "full", label: "Mais cheio e marcante" },
    ],
    next: { light: "redLightRefine", full: "redFullRefine" },
  },

  redLightRefine: {
    type: "question",
    id: "redLightRefine",
    prompt: "O que parece mais gostoso?",
    options: [
      { id: "fresh", label: "Mais fresco e leve" },
      { id: "fruity", label: "Mais frutado e macio" },
    ],
    next: { fresh: "RED_01", fruity: "RED_02" },
  },

  redFullRefine: {
    type: "question",
    id: "redFullRefine",
    prompt: "O que parece mais com você hoje?",
    options: [
      { id: "balanced", label: "Com presença, mas ainda equilibrado" },
      { id: "intense", label: "Bem intenso e marcante" },
    ],
    next: { balanced: "RED_03", intense: "RED_04" },
  },

  // --- palateUnknown: white ------------------------------------------------
  whiteStyle: {
    type: "question",
    id: "whiteStyle",
    prompt: "O que mais chama sua atenção num branco?",
    options: [
      { id: "light", label: "Leve e bem refrescante" },
      { id: "aromatic", label: "Bem perfumado e cheio de fruta" },
      { id: "full", label: "Mais encorpado e envolvente" },
    ],
    next: { light: "WHITE_01", aromatic: "WHITE_02", full: "WHITE_03" },
  },

  // --- palateUnknown: rose ------------------------------------------------
  // Sem pergunta: só existe ROSE_01 nesta versão, então "Não sei" para rosé
  // não teria função diagnóstica — resolve direto (ver PALATE_UNKNOWN_ENTRY_NODE).

  // --- folhas: resolved ----------------------------------------------------
  RED_01: { type: "resolved", profileId: "RED_01" },
  RED_02: { type: "resolved", profileId: "RED_02" },
  RED_03: { type: "resolved", profileId: "RED_03" },
  RED_04: { type: "resolved", profileId: "RED_04" },
  WHITE_01: { type: "resolved", profileId: "WHITE_01" },
  WHITE_02: { type: "resolved", profileId: "WHITE_02" },
  WHITE_03: { type: "resolved", profileId: "WHITE_03" },
  ROSE_01: { type: "resolved", profileId: "ROSE_01" },
  SPARK_01: { type: "resolved", profileId: "SPARK_01" },
  SPARK_02: { type: "resolved", profileId: "SPARK_02" },
  SPARK_03: { type: "resolved", profileId: "SPARK_03" },
  SPARK_04: { type: "resolved", profileId: "SPARK_04" },
};

/** Nó de entrada quando o tipo de vinho ainda não é conhecido. */
export const WINE_TYPE_UNKNOWN_ENTRY_NODE: MicroDiagnosisQuestionId = "bubbles";

/**
 * Nó de entrada quando o tipo já é conhecido, só o paladar ficou "não
 * sei". `rose` aponta direto para a folha `ROSE_01` (não para uma
 * pergunta) — só existe um perfil de rosé nesta versão, então não há
 * nenhuma pergunta com função diagnóstica real a fazer.
 */
export const PALATE_UNKNOWN_ENTRY_NODE: Record<"red" | "white" | "rose" | "sparkling", TreeNodeId> = {
  red: "redWeight",
  white: "whiteStyle",
  rose: "ROSE_01",
  sparkling: "sparklingOccasion",
};
