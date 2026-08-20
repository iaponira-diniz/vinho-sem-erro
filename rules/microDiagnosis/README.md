# rules/microDiagnosis/

Motor determinístico do "Me ajude a decidir" — substitui o beco sem saída
de `wineType = unknown` / `*_unknown` por uma jornada curta (1 a 3
perguntas) que termina em um dos 11 perfis existentes, ou num estado
`unsupported` explícito. Nunca usa IA, nunca cria um 12º perfil, nunca lê
`reason`/`budget`.

## Arquitetura

```
JourneyState (fora daqui)
        │
        ▼
MicroDiagnosisState { entry, answers }
        │
        ▼
evaluateMicroDiagnosis()  ← percorre QUESTION_TREE (dado, não código)
        │
        ▼
MicroDiagnosisResolution: question | resolved | unsupported
```

Igual a `resolveProfile` e `buildRoutePresentation`: **função pura, sem
estado interno**. `evaluateMicroDiagnosis` sempre recalcula do zero a
partir de `entry` + `answers`; quem guarda `answers` é a interface
(`src/journey/`), não esta pasta.

## Arquivos

- `types.ts` — `MicroDiagnosisEntry`, `MicroDiagnosisAnswer`,
  `MicroDiagnosisQuestion`, `MicroDiagnosisState`,
  `MicroDiagnosisResolution`.
- `questionTree.ts` — a árvore inteira como dado (`QUESTION_TREE: Record<NodeId, TreeNode>`),
  mais os nós de entrada por cenário.
- `evaluateMicroDiagnosis.ts` — percorre a árvore; nenhuma regra de
  produto vive aqui, só o algoritmo de travessia.
- `index.ts` — API pública.

## Assinatura

```ts
function evaluateMicroDiagnosis(state: MicroDiagnosisState): MicroDiagnosisResolution;
```

## Entrada

```ts
type MicroDiagnosisEntry =
  | { kind: "wineTypeUnknown" }
  | { kind: "palateUnknown"; wineType: "red" | "white" | "rose" | "sparkling" };
```

`wineTypeUnknown` entra em `bubbles` (até 3 perguntas). `palateUnknown` já
sabe a cor e entra direto na árvore daquela cor (`red`: até 2 perguntas;
`white`/`rose`/`sparkling`: 1 pergunta) — nunca pergunta o tipo de novo.

## Por que a árvore é dado, não `if/else`

Cada nó (`QuestionTreeNode`, `ResolvedTreeNode` ou `UnsupportedTreeNode`)
mora num `Record<NodeId, TreeNode>`. `evaluateMicroDiagnosis` só percorre
`next[answerId]` na ordem das respostas — trocar uma pergunta, uma opção
ou o mapeamento de saída é editar o dado, nunca reescrever o algoritmo de
travessia. Isso também é o que torna os testes estruturais possíveis (ver
`evaluateMicroDiagnosis.test.ts`): dá para varrer `QUESTION_TREE`
inteiro e verificar invariantes (todo `next` aponta pra um nó que existe,
toda folha resolvida usa um dos 11 IDs reais, profundidade máxima por
cenário) sem simular cada caminho manualmente.

## `unsupported` — único caso da V1

`reason: "rose_sweet"` — alcançado quando a pessoa indica explicitamente
que queria um rosé mais doce, algo que não existe no catálogo de 11
perfis. Mensagem fixa, sem sugestão automática de perfil alternativo
(`SPARK_03` não é oferecido nesta V1).

## Progresso

`MicroDiagnosisQuestion.isFinal` indica se, **para qualquer resposta**
dada àquela pergunta, o próximo passo já é uma folha (resolvido ou
unsupported) — não se a resposta específica que a pessoa vai dar chega
lá. É calculado varrendo `next` do nó, não guardado manualmente por
pergunta. A interface usa isso só para a microcopy qualitativa ("Vamos
por uma pista de cada vez." / "Só mais uma pista.") — nunca para
número/porcentagem.

## O que esta camada nunca faz

Não lê `reason` nem `budget`. Não busca `WineProfile`. Não gera texto de
apresentação (isso é `rules/routePresentation`, chamado depois, já com o
`profileId` resolvido). Não usa IA generativa nem qualquer heurística não
determinística.
