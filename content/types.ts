/**
 * Tipos do domínio "perfil de vinho". Este arquivo define apenas a FORMA dos
 * dados — nenhum conteúdo é inventado aqui. Esses valores são preenchidos em
 * cada arquivo content/profiles/*.json, por quem define o conteúdo real do
 * produto.
 */

export type WineCategory = "red" | "white" | "rose" | "sparkling";

/**
 * Uma pista (uva, região, denominação, termo de rótulo) que pode indicar
 * este perfil. Pista, não garantia — ver "Regra conceitual" em
 * content/README.md.
 */
export interface WineClue {
  name: string;
  note?: string;
}

export interface WineProfile {
  /** Identificador estável, ex.: "RED_01". Nunca muda entre versões. */
  id: string;
  /** Versão do conteúdo/definição deste perfil, ex.: "0.1". */
  version: string;
  category: WineCategory;
  name: string;

  /** Resumo em linguagem simples, voltado a quem não entende de vinho. */
  customerSummary: string | null;

  /** Características sensoriais internas do perfil (corpo, acidez, taninos...). */
  internalCharacteristics: string[];

  /** Pistas principais — mais fortes/confiáveis para este perfil. */
  mainClues: WineClue[];
  /** Pistas adicionais — úteis, porém secundárias em relação às principais. */
  additionalClues: WineClue[];
  /** Pistas de referência interna, menos comuns ou mais difíceis de achar. */
  internalLibrary: WineClue[];

  /** Termos que podem aparecer no rótulo e ajudam a reconhecer o perfil. */
  labelClues: string[];

  /** O que evitar recomendar sob este perfil. */
  avoid: string[];

  /** ID de outro WineProfile a sugerir como alternativa/backup. */
  backupProfileId: string | null;

  /** Frase de "Pode pedir assim" — o que falar pro atendente/garçom. */
  askPhrase: string | null;

  /** Explicação de por que este perfil foi sugerido ("Sua Rota de Hoje"). */
  whyThisRoute: string | null;
}
