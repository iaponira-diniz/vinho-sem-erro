import type { PalateOptionId, WineTypeId } from "./types";

/**
 * Quais PalateOptionId pertencem a cada WineTypeId conhecido. É a única
 * fonte de verdade sobre "essa resposta de paladar é compatível com esse
 * tipo de vinho" — usada por resolveProfile() para detectar combinações
 * inválidas (ex.: red + white_aromatic_fruity) sem tentar adivinhar nada.
 */
export const PALATE_OPTIONS_BY_WINE_TYPE: Record<
  Exclude<WineTypeId, "unknown">,
  readonly PalateOptionId[]
> = {
  red: ["red_light", "red_soft_fruity", "red_balanced", "red_intense", "red_unknown"],
  white: [
    "white_light_refreshing",
    "white_aromatic_fruity",
    "white_creamy_structured",
    "white_unknown",
  ],
  rose: ["rose_dry_refreshing", "rose_fruity_refreshing", "rose_unknown"],
  sparkling: [
    "sparkling_dry_refreshing",
    "sparkling_fruity_aromatic",
    "sparkling_sweet_aromatic",
    "sparkling_unknown",
  ],
};
