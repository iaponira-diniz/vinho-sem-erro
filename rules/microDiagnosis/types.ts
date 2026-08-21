/**
 * Motor puro e determinístico do "Me ajude a decidir". Nunca decide sozinho
 * com reason/budget, nunca usa IA, nunca cria um perfil além dos 11 já
 * existentes em content/profiles.
 */

export type MicroDiagnosisEntry =
  | { kind: "wineTypeUnknown" }
  | { kind: "palateUnknown"; wineType: "red" | "white" | "rose" | "sparkling" };

export type MicroDiagnosisQuestionId =
  | "bubbles"
  | "sparklingOccasion"
  | "sensationNoBubbles"
  | "sensationAnyBubbles"
  | "styleNoBubbles"
  | "styleAnyBubbles"
  | "bodyStyle"
  | "aromaticStyleAnyBubbles"
  | "redWeight"
  | "redLightRefine"
  | "redFullRefine"
  | "whiteStyle";

export interface MicroDiagnosisAnswer {
  questionId: MicroDiagnosisQuestionId;
  answerId: string;
}

export interface MicroDiagnosisQuestionOption {
  id: string;
  label: string;
}

export interface MicroDiagnosisQuestion {
  id: MicroDiagnosisQuestionId;
  prompt: string;
  options: MicroDiagnosisQuestionOption[];
  /** true quando, não importa a resposta escolhida, a próxima tela já é o resultado. */
  isFinal: boolean;
}

/** entry + answers é todo o estado — a função sempre recalcula a partir daqui. */
export interface MicroDiagnosisState {
  entry: MicroDiagnosisEntry;
  answers: MicroDiagnosisAnswer[];
}

export type MicroDiagnosisResolution =
  | { status: "question"; question: MicroDiagnosisQuestion }
  | { status: "resolved"; profileId: string };
