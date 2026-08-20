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
  | "UNSUPPORTED_ROSE_SWEET";

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

interface UnsupportedTreeNode {
  type: "unsupported";
  reason: "rose_sweet";
  message: string;
}

export type TreeNode = QuestionTreeNode | ResolvedTreeNode | UnsupportedTreeNode;

const UNSUPPORTED_ROSE_SWEET_MESSAGE =
  "Hoje nossa Rota de rosés está focada nos estilos secos e refrescantes.";

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
    next: { yes: "sparklingSweetness", no: "sensationNoBubbles", any: "sensationAnyBubbles" },
  },

  sparklingSweetness: {
    type: "question",
    id: "sparklingSweetness",
    prompt: "Pensando em doçura, o que combina mais com você agora?",
    options: [
      { id: "dry", label: "Bem sequinho, quase sem doçura" },
      { id: "fruity", label: "Frutado e perfumado, mas sem ser doce" },
      { id: "sweet", label: "Docinho mesmo, com bastante perfume" },
    ],
    next: { dry: "SPARK_01", fruity: "SPARK_02", sweet: "SPARK_03" },
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
      { id: "rose_sweet", label: "Rosé mais docinho" },
    ],
    next: {
      red_light: "RED_01",
      white_light: "WHITE_01",
      rose_dry: "ROSE_01",
      rose_sweet: "UNSUPPORTED_ROSE_SWEET",
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
      { id: "rose_sweet", label: "Rosé mais docinho" },
      { id: "sparkling_dry", label: "Espumante seco e refrescante" },
    ],
    next: {
      red_light: "RED_01",
      white_light: "WHITE_01",
      rose_dry: "ROSE_01",
      rose_sweet: "UNSUPPORTED_ROSE_SWEET",
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
      { id: "sparkling_fruity", label: "Espumante frutado e aromático" },
      { id: "sparkling_sweet", label: "Espumante docinho e perfumado" },
    ],
    next: {
      white_aromatic: "WHITE_02",
      sparkling_fruity: "SPARK_02",
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
  roseSweetness: {
    type: "question",
    id: "roseSweetness",
    prompt: "Você imagina um rosé mais seco e refrescante, ou mais docinho?",
    options: [
      { id: "dry", label: "Seco e refrescante" },
      { id: "sweet", label: "Mais docinho" },
    ],
    next: { dry: "ROSE_01", sweet: "UNSUPPORTED_ROSE_SWEET" },
  },

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

  // --- folha: unsupported ----------------------------------------------------
  UNSUPPORTED_ROSE_SWEET: {
    type: "unsupported",
    reason: "rose_sweet",
    message: UNSUPPORTED_ROSE_SWEET_MESSAGE,
  },
};

/** Nó de entrada quando o tipo de vinho ainda não é conhecido. */
export const WINE_TYPE_UNKNOWN_ENTRY_NODE: MicroDiagnosisQuestionId = "bubbles";

/** Nó de entrada quando o tipo já é conhecido, só o paladar ficou "não sei". */
export const PALATE_UNKNOWN_ENTRY_NODE: Record<
  "red" | "white" | "rose" | "sparkling",
  MicroDiagnosisQuestionId
> = {
  red: "redWeight",
  white: "whiteStyle",
  rose: "roseSweetness",
  sparkling: "sparklingSweetness",
};
