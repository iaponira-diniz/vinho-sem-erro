import type { ClarityId, ClarityReasonId } from "../../rules/feedback";

export const CLARITY_OPTIONS: { id: ClarityId; label: string }[] = [
  { id: "clear", label: "Sim, agora sei o que procurar" },
  { id: "partial", label: "Mais ou menos" },
  { id: "lost", label: "Ainda estou perdida" },
];

export const CLARITY_REASON_OPTIONS: { id: ClarityReasonId; label: string }[] = [
  { id: "wanted_examples", label: "Eu queria exemplos mais concretos" },
  { id: "hard_terms", label: "Alguns termos foram difíceis" },
  { id: "taste_mismatch", label: "Não senti que considerou bem o meu gosto" },
  { id: "situation_mismatch", label: "Não senti que considerou bem a situação" },
  { id: "other", label: "Outro" },
];

export const CLARITY_CONFIRMATION_MESSAGE: Record<ClarityId, string> = {
  clear: "Ótimo. É exatamente isso que a sua Rota deve fazer: deixar mais claro o que procurar.",
  partial: "Obrigada. Esse retorno ajuda a melhorar as próximas Rotas.",
  lost: "Obrigada. Esse retorno ajuda a melhorar as próximas Rotas.",
};
