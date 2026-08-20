import type { ReasonId } from "./types";

export const REASON_LABELS: Record<ReasonId, string> = {
  everyday: "Dia a dia",
  relax: "Relaxar e tomar uma taça",
  guests: "Receber pessoas",
  special: "Ocasião especial",
  explore: "Experimentar algo diferente",
};

export const REASON_MESSAGES: Record<ReasonId, string> = {
  everyday:
    "Para o dia a dia, comece pelas Boas Pistas e escolha a opção que encontrar dentro do seu orçamento. Você não precisa achar exatamente todas as pistas da lista.",
  relax:
    "Para esse momento, simplifique a escolha: use as Boas Pistas como direção e escolha dentro do seu orçamento sem tentar decifrar a garrafa inteira.",
  guests:
    "Como você vai receber pessoas, use sua Rota como ponto de partida e, se precisar, mostre a frase abaixo a quem estiver atendendo para encontrar uma opção desse perfil dentro do seu orçamento.",
  special:
    "Como é uma ocasião especial, vale explorar também as Mais opções da sua Rota, sem sair do perfil que combina com o que você quer beber hoje.",
  explore:
    "Como você quer experimentar algo diferente, use as Boas Pistas como base e explore também duas opções menos óbvias dentro do mesmo perfil.",
};

export interface ReasonFlags {
  emphasizeAskPhrase: boolean;
  expandAdditionalClues: boolean;
  showDiscoveryOptions: boolean;
}

export const REASON_FLAGS: Record<ReasonId, ReasonFlags> = {
  everyday: { emphasizeAskPhrase: false, expandAdditionalClues: false, showDiscoveryOptions: false },
  relax: { emphasizeAskPhrase: false, expandAdditionalClues: false, showDiscoveryOptions: false },
  guests: { emphasizeAskPhrase: true, expandAdditionalClues: false, showDiscoveryOptions: false },
  special: { emphasizeAskPhrase: false, expandAdditionalClues: true, showDiscoveryOptions: false },
  explore: { emphasizeAskPhrase: false, expandAdditionalClues: false, showDiscoveryOptions: true },
};
