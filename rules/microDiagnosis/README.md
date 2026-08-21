# rules/microDiagnosis/

Motor determinístico do "Me ajude a decidir" — substitui o beco sem saída
de `wineType = unknown` / `*_unknown` por uma jornada curta (0 a 3
perguntas) que sempre termina em um dos 12 perfis existentes. Nunca usa
IA, nunca inventa um perfil além dos que existem em `content/profiles`,
nunca lê `reason`/`budget`.

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
MicroDiagnosisResolution: question | resolved
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
`white`/`sparkling`: 1 pergunta; `rose`: **0 perguntas**, resolve direto
para `ROSE_01`) — nunca pergunta o tipo de novo.

## Por que a árvore é dado, não `if/else`

Cada nó (`QuestionTreeNode`, `ResolvedTreeNode` ou `UnsupportedTreeNode`)
mora num `Record<NodeId, TreeNode>`. `evaluateMicroDiagnosis` só percorre
`next[answerId]` na ordem das respostas — trocar uma pergunta, uma opção
ou o mapeamento de saída é editar o dado, nunca reescrever o algoritmo de
travessia. Isso também é o que torna os testes estruturais possíveis (ver
`evaluateMicroDiagnosis.test.ts`): dá para varrer `QUESTION_TREE`
inteiro e verificar invariantes (todo `next` aponta pra um nó que existe,
toda folha resolvida usa um dos 12 IDs reais, profundidade máxima por
cenário) sem simular cada caminho manualmente.

## Não existe mais estado `unsupported`

A V1 anterior tinha um único caso `unsupported` ("rosé mais docinho"),
alcançado quando a pessoa escolhia uma opção que a Rota depois recusava.
Isso foi removido por princípio de produto: o sistema não deve oferecer
uma opção para depois dizer que não consegue atendê-la. Como só existe
`ROSE_01` no catálogo, a opção "rosé mais docinho" foi retirada das
perguntas — nenhum caminho da árvore leva a um estado de falha. O próprio
tipo `MicroDiagnosisResolution` não tem mais a variante `unsupported`; o
compilador garante essa ausência, não é só uma convenção.

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
