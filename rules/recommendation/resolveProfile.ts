import { PALATE_OPTIONS_BY_WINE_TYPE } from "./palateOptions";
import type { PalateOptionId, RecommendationResolution, WineTypeId } from "./types";

/**
 * Mapeamento oficial (o único definido nesta etapa): PalateOptionId ->
 * id do WineProfile em content/profiles. Nenhuma entrada aqui foi
 * inferida — vem exatamente da especificação de produto.
 */
const PROFILE_ID_BY_PALATE_OPTION: Partial<Record<PalateOptionId, string>> = {
  red_light: "RED_01",
  red_soft_fruity: "RED_02",
  red_balanced: "RED_03",
  red_intense: "RED_04",
  white_light_refreshing: "WHITE_01",
  white_aromatic_fruity: "WHITE_02",
  white_creamy_structured: "WHITE_03",
  rose_dry_refreshing: "ROSE_01",
  rose_fruity_refreshing: "ROSE_01",
  sparkling_dry_refreshing: "SPARK_01",
  sparkling_fruity_aromatic: "SPARK_02",
  sparkling_sweet_aromatic: "SPARK_03",
};

const NEEDS_HELP: RecommendationResolution = { status: "needs_help", profileId: null };
const INVALID: RecommendationResolution = { status: "invalid", profileId: null };

/**
 * Traduz wineType + palateOptionId em um profileId, sem interpretar nenhum
 * conteúdo enológico. palateOptionId é `null` quando wineType ainda não é
 * conhecido (a tela de Paladar depende do Tipo e não existe para
 * wineType="unknown").
 */
export function resolveProfile(
  wineType: WineTypeId,
  palateOptionId: PalateOptionId | null,
): RecommendationResolution {
  if (wineType === "unknown") {
    return NEEDS_HELP;
  }

  const validOptions = PALATE_OPTIONS_BY_WINE_TYPE[wineType];
  if (palateOptionId === null || !validOptions.includes(palateOptionId)) {
    return INVALID;
  }

  if (palateOptionId.endsWith("_unknown")) {
    return NEEDS_HELP;
  }

  const profileId = PROFILE_ID_BY_PALATE_OPTION[palateOptionId];
  if (!profileId) {
    return INVALID;
  }

  return { status: "resolved", profileId };
}
