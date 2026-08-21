import { describe, expect, it } from "vitest";

import type { WineProfile } from "../../content/types";
import { buildRoutePresentation } from "./index";
import type { BudgetId, ReasonId } from "./types";

function makeProfile(overrides: Partial<WineProfile> = {}): WineProfile {
  return {
    id: "TEST_01",
    version: "0.1",
    category: "red",
    name: "Perfil de Teste",
    customerSummary: "Resumo de teste.",
    internalCharacteristics: [],
    mainClues: [{ name: "Uva Teste", note: "Nota de teste." }],
    additionalClues: [],
    internalLibrary: [
      { name: "Item 1", note: "Nota 1" },
      { name: "Item 2", note: "Nota 2" },
      { name: "Item 3", note: "Nota 3" },
    ],
    labelClues: [],
    avoid: [],
    backupProfileId: null,
    askPhrase: "Pergunta de teste. O que você recomenda?",
    whyThisRoute: "Motivo de teste.",
    ...overrides,
  };
}

describe("buildRoutePresentation — reasonLabel", () => {
  it.each([
    ["everyday", "Dia a dia"],
    ["relax", "Relaxar e tomar uma taça"],
    ["guests", "Receber pessoas"],
    ["special", "Ocasião especial"],
    ["explore", "Experimentar algo diferente"],
  ] as const)("%s -> %s", (reason, expectedLabel) => {
    const result = buildRoutePresentation(makeProfile(), { reason, budget: "open" });
    expect(result.reasonLabel).toBe(expectedLabel);
  });
});

describe("buildRoutePresentation — reasonMessage (texto oficial)", () => {
  it.each([
    [
      "everyday",
      "Para o dia a dia, comece pelas Boas Pistas e escolha a opção que encontrar dentro do seu orçamento. Você não precisa achar exatamente todas as pistas da lista.",
    ],
    [
      "relax",
      "Para esse momento, simplifique a escolha: use as Boas Pistas como direção e escolha dentro do seu orçamento sem tentar decifrar a garrafa inteira.",
    ],
    [
      "guests",
      "Como você vai receber pessoas, use sua Rota como ponto de partida e, se precisar, mostre a frase abaixo a quem estiver atendendo para encontrar uma opção desse perfil dentro do seu orçamento.",
    ],
    [
      "special",
      "Como é uma ocasião especial, vale explorar também as Mais opções da sua Rota, sem sair do perfil que combina com o que você quer beber hoje.",
    ],
    [
      "explore",
      "Como você quer experimentar algo diferente, use as Boas Pistas como base e explore também duas opções menos óbvias dentro do mesmo perfil.",
    ],
  ] as const)("%s", (reason, expectedMessage) => {
    const result = buildRoutePresentation(makeProfile(), { reason, budget: "open" });
    expect(result.reasonMessage).toBe(expectedMessage);
  });
});

describe("buildRoutePresentation — flags por reason (exclusividade)", () => {
  it.each([
    ["everyday", false, false],
    ["relax", false, false],
    ["guests", true, false],
    ["special", false, true],
    ["explore", false, false],
  ] as const)("%s -> emphasizeAskPhrase=%s expandAdditionalClues=%s", (reason, emphasize, expand) => {
    const result = buildRoutePresentation(makeProfile(), { reason, budget: "open" });
    expect(result.emphasizeAskPhrase).toBe(emphasize);
    expect(result.expandAdditionalClues).toBe(expand);
  });
});

describe("buildRoutePresentation — contextualAskPhrase", () => {
  const askPhrase = "Pergunta de teste. O que você recomenda?";

  it.each([
    ["under_50", "Quero gastar até R$50. " + askPhrase],
    ["50_80", "Quero gastar entre R$50 e R$80. " + askPhrase],
    ["80_120", "Quero gastar entre R$80 e R$120. " + askPhrase],
    ["120_200", "Quero gastar entre R$120 e R$200. " + askPhrase],
    ["over_200", "Quero gastar mais de R$200. " + askPhrase],
  ] as const)("%s antepõe a cláusula de orçamento, askPhrase original intacto", (budget, expected) => {
    const result = buildRoutePresentation(makeProfile({ askPhrase }), { reason: "everyday", budget });
    expect(result.contextualAskPhrase).toBe(expected);
  });

  it("open mantém o askPhrase original, sem cláusula adicional", () => {
    const result = buildRoutePresentation(makeProfile({ askPhrase }), { reason: "everyday", budget: "open" });
    expect(result.contextualAskPhrase).toBe(askPhrase);
  });

  it("askPhrase null permanece null, nunca string vazia", () => {
    const result = buildRoutePresentation(makeProfile({ askPhrase: null }), {
      reason: "everyday",
      budget: "under_50",
    });
    expect(result.contextualAskPhrase).toBeNull();
  });
});

describe("buildRoutePresentation — discoveryOptions (só em explore)", () => {
  it("0 itens em internalLibrary -> discoveryOptions vazio", () => {
    const result = buildRoutePresentation(makeProfile({ internalLibrary: [] }), {
      reason: "explore",
      budget: "open",
    });
    expect(result.discoveryOptions).toEqual([]);
  });

  it("1 item em internalLibrary -> discoveryOptions com esse 1 item", () => {
    const internalLibrary = [{ name: "Único", note: "Nota" }];
    const result = buildRoutePresentation(makeProfile({ internalLibrary }), {
      reason: "explore",
      budget: "open",
    });
    expect(result.discoveryOptions).toEqual(internalLibrary);
  });

  it("3+ itens em internalLibrary -> no máximo os 2 primeiros, na ordem original", () => {
    const internalLibrary = [
      { name: "A", note: "1" },
      { name: "B", note: "2" },
      { name: "C", note: "3" },
    ];
    const result = buildRoutePresentation(makeProfile({ internalLibrary }), {
      reason: "explore",
      budget: "open",
    });
    expect(result.discoveryOptions).toEqual([internalLibrary[0], internalLibrary[1]]);
  });

  it.each(["everyday", "relax", "guests", "special"] satisfies ReasonId[])(
    "%s nunca recebe discoveryOptions, mesmo com internalLibrary preenchido",
    (reason) => {
      const internalLibrary = [
        { name: "A", note: "1" },
        { name: "B", note: "2" },
        { name: "C", note: "3" },
      ];
      const result = buildRoutePresentation(makeProfile({ internalLibrary }), {
        reason,
        budget: "open",
      });
      expect(result.discoveryOptions).toEqual([]);
    },
  );
});

describe("buildRoutePresentation — não interfere no conteúdo do perfil", () => {
  it("mainClues, additionalClues, avoid e labelClues chegam intactos junto ao WineProfile original", () => {
    const profile = makeProfile({
      mainClues: [{ name: "X", note: "n" }],
      additionalClues: [{ name: "Y", note: "n" }],
      avoid: ["evitar Z"],
      labelClues: ["termo"],
    });
    buildRoutePresentation(profile, { reason: "special", budget: "80_120" } as { reason: ReasonId; budget: BudgetId });

    // RoutePresentation não modifica o objeto profile de entrada.
    expect(profile.mainClues).toEqual([{ name: "X", note: "n" }]);
    expect(profile.additionalClues).toEqual([{ name: "Y", note: "n" }]);
    expect(profile.avoid).toEqual(["evitar Z"]);
    expect(profile.labelClues).toEqual(["termo"]);
  });
});
