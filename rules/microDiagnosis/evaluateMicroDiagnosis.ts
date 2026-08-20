import {
  PALATE_UNKNOWN_ENTRY_NODE,
  QUESTION_TREE,
  WINE_TYPE_UNKNOWN_ENTRY_NODE,
} from "./questionTree";
import type { QuestionTreeNode, TreeNodeId } from "./questionTree";
import type { MicroDiagnosisQuestion, MicroDiagnosisResolution, MicroDiagnosisState } from "./types";

function entryNodeId(state: MicroDiagnosisState): TreeNodeId {
  if (state.entry.kind === "wineTypeUnknown") {
    return WINE_TYPE_UNKNOWN_ENTRY_NODE;
  }
  return PALATE_UNKNOWN_ENTRY_NODE[state.entry.wineType];
}

/** true quando nenhuma resposta possível a partir deste nó leva a outra pergunta. */
function isFinalQuestion(node: QuestionTreeNode): boolean {
  return Object.values(node.next).every((nextId) => QUESTION_TREE[nextId].type !== "question");
}

/**
 * Sempre recalcula do zero a partir de entry + answers — sem estado
 * guardado, sem cache. Percorre QUESTION_TREE respondendo na ordem em que
 * as respostas foram dadas; nenhuma regra fica codificada aqui, só o
 * caminhar pelos dados.
 */
export function evaluateMicroDiagnosis(state: MicroDiagnosisState): MicroDiagnosisResolution {
  let nodeId = entryNodeId(state);

  for (const answer of state.answers) {
    const node = QUESTION_TREE[nodeId];
    if (node.type !== "question") break;
    const nextId = node.next[answer.answerId];
    if (!nextId) break;
    nodeId = nextId;
  }

  const node = QUESTION_TREE[nodeId];

  if (node.type === "question") {
    const question: MicroDiagnosisQuestion = {
      id: node.id,
      prompt: node.prompt,
      options: node.options,
      isFinal: isFinalQuestion(node),
    };
    return { status: "question", question };
  }

  if (node.type === "resolved") {
    return { status: "resolved", profileId: node.profileId };
  }

  return { status: "unsupported", reason: node.reason, message: node.message };
}
