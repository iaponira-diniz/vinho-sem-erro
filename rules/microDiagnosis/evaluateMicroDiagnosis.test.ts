import { describe, expect, it } from "vitest";

import { wineProfiles } from "../../content/profiles";
import { PALATE_UNKNOWN_ENTRY_NODE, QUESTION_TREE } from "./questionTree";
import type { TreeNode, TreeNodeId } from "./questionTree";
import { evaluateMicroDiagnosis } from "./index";
import type { MicroDiagnosisAnswer, MicroDiagnosisEntry } from "./types";

const WINE_TYPE_UNKNOWN: MicroDiagnosisEntry = { kind: "wineTypeUnknown" };

function palateUnknown(wineType: "red" | "white" | "rose" | "sparkling"): MicroDiagnosisEntry {
  return { kind: "palateUnknown", wineType };
}

function answer(questionId: MicroDiagnosisAnswer["questionId"], answerId: string): MicroDiagnosisAnswer {
  return { questionId, answerId };
}

function resolveProfileId(entry: MicroDiagnosisEntry, answers: MicroDiagnosisAnswer[]): string {
  const resolution = evaluateMicroDiagnosis({ entry, answers });
  if (resolution.status !== "resolved") {
    throw new Error(`esperava resolved, veio ${resolution.status}`);
  }
  return resolution.profileId;
}

describe("evaluateMicroDiagnosis — wineType unknown — bubbles = Sim", () => {
  it.each([
    ["dry", "SPARK_01"],
    ["fruity", "SPARK_02"],
    ["sweet", "SPARK_03"],
  ] as const)("Sim + %s -> %s", (sweetnessId, expectedProfileId) => {
    const profileId = resolveProfileId(WINE_TYPE_UNKNOWN, [
      answer("bubbles", "yes"),
      answer("sparklingSweetness", sweetnessId),
    ]);
    expect(profileId).toBe(expectedProfileId);
  });
});

describe("evaluateMicroDiagnosis — wineType unknown — bubbles = Não", () => {
  it.each([
    ["red_light", "RED_01"],
    ["white_light", "WHITE_01"],
    ["rose_dry", "ROSE_01"],
  ] as const)("Não + leve/refrescante + %s -> %s", (styleId, expectedProfileId) => {
    const profileId = resolveProfileId(WINE_TYPE_UNKNOWN, [
      answer("bubbles", "no"),
      answer("sensationNoBubbles", "light"),
      answer("styleNoBubbles", styleId),
    ]);
    expect(profileId).toBe(expectedProfileId);
  });

  it("Não + macio e bem frutado resolve direto RED_02 (2 perguntas)", () => {
    const profileId = resolveProfileId(WINE_TYPE_UNKNOWN, [
      answer("bubbles", "no"),
      answer("sensationNoBubbles", "soft_fruity"),
    ]);
    expect(profileId).toBe("RED_02");
  });

  it("Não + bem perfumado resolve direto WHITE_02 (2 perguntas)", () => {
    const profileId = resolveProfileId(WINE_TYPE_UNKNOWN, [
      answer("bubbles", "no"),
      answer("sensationNoBubbles", "aromatic"),
    ]);
    expect(profileId).toBe("WHITE_02");
  });

  it.each([
    ["red", "RED_03"],
    ["white", "WHITE_03"],
  ] as const)("Não + corpo/presença + %s -> %s", (bodyId, expectedProfileId) => {
    const profileId = resolveProfileId(WINE_TYPE_UNKNOWN, [
      answer("bubbles", "no"),
      answer("sensationNoBubbles", "full_body"),
      answer("bodyStyle", bodyId),
    ]);
    expect(profileId).toBe(expectedProfileId);
  });

  it("Não + intenso e marcante resolve direto RED_04 (2 perguntas)", () => {
    const profileId = resolveProfileId(WINE_TYPE_UNKNOWN, [
      answer("bubbles", "no"),
      answer("sensationNoBubbles", "intense"),
    ]);
    expect(profileId).toBe("RED_04");
  });
});

describe("evaluateMicroDiagnosis — wineType unknown — bubbles = Tanto faz", () => {
  it.each([
    ["red_light", "RED_01"],
    ["white_light", "WHITE_01"],
    ["rose_dry", "ROSE_01"],
    ["sparkling_dry", "SPARK_01"],
  ] as const)("Tanto faz + leve/refrescante + %s -> %s", (styleId, expectedProfileId) => {
    const profileId = resolveProfileId(WINE_TYPE_UNKNOWN, [
      answer("bubbles", "any"),
      answer("sensationAnyBubbles", "light"),
      answer("styleAnyBubbles", styleId),
    ]);
    expect(profileId).toBe(expectedProfileId);
  });

  it("Tanto faz + macio e bem frutado resolve direto RED_02", () => {
    const profileId = resolveProfileId(WINE_TYPE_UNKNOWN, [
      answer("bubbles", "any"),
      answer("sensationAnyBubbles", "soft_fruity"),
    ]);
    expect(profileId).toBe("RED_02");
  });

  it.each([
    ["white_aromatic", "WHITE_02"],
    ["sparkling_fruity", "SPARK_02"],
    ["sparkling_sweet", "SPARK_03"],
  ] as const)("Tanto faz + perfumado + %s -> %s", (styleId, expectedProfileId) => {
    const profileId = resolveProfileId(WINE_TYPE_UNKNOWN, [
      answer("bubbles", "any"),
      answer("sensationAnyBubbles", "aromatic"),
      answer("aromaticStyleAnyBubbles", styleId),
    ]);
    expect(profileId).toBe(expectedProfileId);
  });

  it.each([
    ["red", "RED_03"],
    ["white", "WHITE_03"],
  ] as const)("Tanto faz + corpo/presença + %s -> %s", (bodyId, expectedProfileId) => {
    const profileId = resolveProfileId(WINE_TYPE_UNKNOWN, [
      answer("bubbles", "any"),
      answer("sensationAnyBubbles", "full_body"),
      answer("bodyStyle", bodyId),
    ]);
    expect(profileId).toBe(expectedProfileId);
  });

  it("Tanto faz + intenso e marcante resolve direto RED_04", () => {
    const profileId = resolveProfileId(WINE_TYPE_UNKNOWN, [
      answer("bubbles", "any"),
      answer("sensationAnyBubbles", "intense"),
    ]);
    expect(profileId).toBe("RED_04");
  });
});

describe("evaluateMicroDiagnosis — palateUnknown: red", () => {
  it.each([
    [["light", "fresh"], "RED_01"],
    [["light", "fruity"], "RED_02"],
    [["full", "balanced"], "RED_03"],
    [["full", "intense"], "RED_04"],
  ] as const)("%s -> %s", (path, expectedProfileId) => {
    const [weightId, refineId] = path;
    const refineQuestionId = weightId === "light" ? "redLightRefine" : "redFullRefine";
    const profileId = resolveProfileId(palateUnknown("red"), [
      answer("redWeight", weightId),
      answer(refineQuestionId, refineId),
    ]);
    expect(profileId).toBe(expectedProfileId);
  });
});

describe("evaluateMicroDiagnosis — palateUnknown: white", () => {
  it.each([
    ["light", "WHITE_01"],
    ["aromatic", "WHITE_02"],
    ["full", "WHITE_03"],
  ] as const)("%s -> %s", (styleId, expectedProfileId) => {
    const profileId = resolveProfileId(palateUnknown("white"), [answer("whiteStyle", styleId)]);
    expect(profileId).toBe(expectedProfileId);
  });
});

describe("evaluateMicroDiagnosis — palateUnknown: rose", () => {
  it("resolve direto para ROSE_01, sem nenhuma pergunta (só existe um perfil de rosé)", () => {
    const resolution = evaluateMicroDiagnosis({ entry: palateUnknown("rose"), answers: [] });
    expect(resolution).toEqual({ status: "resolved", profileId: "ROSE_01" });
  });
});

describe("evaluateMicroDiagnosis — palateUnknown: sparkling", () => {
  it.each([
    ["dry", "SPARK_01"],
    ["fruity", "SPARK_02"],
    ["sweet", "SPARK_03"],
  ] as const)("%s -> %s", (sweetnessId, expectedProfileId) => {
    const profileId = resolveProfileId(palateUnknown("sparkling"), [
      answer("sparklingSweetness", sweetnessId),
    ]);
    expect(profileId).toBe(expectedProfileId);
  });
});

describe("evaluateMicroDiagnosis — pergunta inicial e isFinal", () => {
  it("wineType unknown começa em 'bubbles', não final", () => {
    const resolution = evaluateMicroDiagnosis({ entry: WINE_TYPE_UNKNOWN, answers: [] });
    expect(resolution).toEqual({
      status: "question",
      question: expect.objectContaining({ id: "bubbles", isFinal: false }),
    });
  });

  it("sparklingSweetness é sempre a última pergunta (isFinal = true)", () => {
    const resolution = evaluateMicroDiagnosis({
      entry: WINE_TYPE_UNKNOWN,
      answers: [answer("bubbles", "yes")],
    });
    expect(resolution).toEqual({
      status: "question",
      question: expect.objectContaining({ id: "sparklingSweetness", isFinal: true }),
    });
  });

  it("sensationNoBubbles não é final (algumas respostas levam a outra pergunta)", () => {
    const resolution = evaluateMicroDiagnosis({
      entry: WINE_TYPE_UNKNOWN,
      answers: [answer("bubbles", "no")],
    });
    expect(resolution).toEqual({
      status: "question",
      question: expect.objectContaining({ id: "sensationNoBubbles", isFinal: false }),
    });
  });
});

// --- Testes estruturais -----------------------------------------------

const KNOWN_PROFILE_IDS = new Set(wineProfiles.map((profile) => profile.id));

describe("QUESTION_TREE — invariantes estruturais", () => {
  it("todo next de toda pergunta aponta para um NodeId existente na árvore", () => {
    for (const [nodeId, node] of Object.entries(QUESTION_TREE) as [TreeNodeId, TreeNode][]) {
      if (node.type !== "question") continue;
      for (const [answerId, targetId] of Object.entries(node.next)) {
        expect(QUESTION_TREE, `nó "${nodeId}" resposta "${answerId}" aponta pra "${targetId}"`).toHaveProperty(
          targetId,
        );
      }
    }
  });

  it("toda opção de toda pergunta tem uma entrada correspondente em next", () => {
    for (const [nodeId, node] of Object.entries(QUESTION_TREE) as [TreeNodeId, TreeNode][]) {
      if (node.type !== "question") continue;
      for (const option of node.options) {
        expect(node.next, `nó "${nodeId}" opção "${option.id}" sem next`).toHaveProperty(option.id);
      }
    }
  });

  it("toda folha resolved usa um dos 11 profileId reais de content/profiles", () => {
    for (const node of Object.values(QUESTION_TREE) as TreeNode[]) {
      if (node.type !== "resolved") continue;
      expect(KNOWN_PROFILE_IDS.has(node.profileId), `profileId desconhecido: ${node.profileId}`).toBe(true);
    }
  });

  it("nenhum profileId fora dos 11 conhecidos aparece na árvore (sem 12º perfil)", () => {
    const profileIdsInTree = Object.values(QUESTION_TREE)
      .filter((node): node is Extract<TreeNode, { type: "resolved" }> => node.type === "resolved")
      .map((node) => node.profileId);
    const uniqueProfileIds = new Set(profileIdsInTree);
    expect(uniqueProfileIds.size).toBe(11);
    for (const id of uniqueProfileIds) {
      expect(KNOWN_PROFILE_IDS.has(id)).toBe(true);
    }
  });

  // Não há teste de "nenhum nó é unsupported" aqui porque não é mais
  // necessário: TreeNode = QuestionTreeNode | ResolvedTreeNode, então o
  // próprio compilador já impede um nó "unsupported" de existir.
});

function maxDepth(nodeId: TreeNodeId, visited: Set<TreeNodeId> = new Set()): number {
  const node = QUESTION_TREE[nodeId];
  if (node.type !== "question") return 0;
  if (visited.has(nodeId)) throw new Error(`ciclo detectado em ${nodeId}`);
  const nextVisited = new Set(visited).add(nodeId);
  const childDepths = Object.values(node.next).map((childId) => maxDepth(childId, nextVisited));
  return 1 + Math.max(0, ...childDepths);
}

describe("QUESTION_TREE — limites de perguntas por cenário", () => {
  it("wineType unknown (a partir de 'bubbles') nunca ultrapassa 3 perguntas", () => {
    expect(maxDepth("bubbles")).toBeLessThanOrEqual(3);
  });

  it("red_unknown (a partir de 'redWeight') nunca ultrapassa 2 perguntas", () => {
    expect(maxDepth("redWeight")).toBeLessThanOrEqual(2);
  });

  it("white_unknown (a partir de 'whiteStyle') nunca ultrapassa 1 pergunta", () => {
    expect(maxDepth("whiteStyle")).toBeLessThanOrEqual(1);
  });

  it("rose_unknown resolve imediatamente, sem nenhuma pergunta", () => {
    expect(maxDepth(PALATE_UNKNOWN_ENTRY_NODE.rose)).toBe(0);
  });

  it("sparkling_unknown (a partir de 'sparklingSweetness') nunca ultrapassa 1 pergunta", () => {
    expect(maxDepth("sparklingSweetness")).toBeLessThanOrEqual(1);
  });
});
