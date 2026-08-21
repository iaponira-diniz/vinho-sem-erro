import type { WineProfile } from "../../content/types";
import { buildContextualAskPhrase } from "./budgetPresentation";
import { REASON_FLAGS, REASON_LABELS, REASON_MESSAGES } from "./reasonPresentation";
import type { RouteContext, RoutePresentation } from "./types";

/**
 * Única função responsável por transformar reason + budget + WineProfile
 * (já resolvido por resolveProfile()) em diretivas de apresentação. Nunca
 * decide profileId, nunca reordena/remove/altera conteúdo do perfil.
 */
export function buildRoutePresentation(profile: WineProfile, context: RouteContext): RoutePresentation {
  const flags = REASON_FLAGS[context.reason];

  return {
    reasonLabel: REASON_LABELS[context.reason],
    reasonMessage: REASON_MESSAGES[context.reason],
    contextualAskPhrase: buildContextualAskPhrase(profile.askPhrase, context.budget),
    emphasizeAskPhrase: flags.emphasizeAskPhrase,
    expandAdditionalClues: flags.expandAdditionalClues,
    discoveryOptions: flags.showDiscoveryOptions ? profile.internalLibrary.slice(0, 2) : [],
  };
}
