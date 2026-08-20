/**
 * Tipos do motor de decisão da rota "Quero escolher um vinho para mim".
 * Entrada e saída deste motor nunca tocam o conteúdo enológico dos perfis
 * (content/) — só traduzem uma resposta de paladar num id de perfil.
 */

export type WineTypeId = "red" | "white" | "rose" | "sparkling" | "unknown";

/**
 * Id semântico da resposta de paladar. Deliberadamente diferente do id do
 * WineProfile resultante (ex.: "red_light", não "RED_01") — a tradução
 * entre os dois é responsabilidade exclusiva de resolveProfile().
 */
export type PalateOptionId =
  | "red_light"
  | "red_soft_fruity"
  | "red_balanced"
  | "red_intense"
  | "red_unknown"
  | "white_light_refreshing"
  | "white_aromatic_fruity"
  | "white_creamy_structured"
  | "white_unknown"
  | "rose_dry_refreshing"
  | "rose_fruity_refreshing"
  | "rose_unknown"
  | "sparkling_dry_refreshing"
  | "sparkling_fruity_aromatic"
  | "sparkling_sweet_aromatic"
  | "sparkling_unknown";

export type RecommendationResolution =
  | { status: "resolved"; profileId: string }
  | { status: "needs_help"; profileId: null }
  | { status: "invalid"; profileId: null };
