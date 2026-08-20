# rules/feedback/

Domínio do sistema de feedback. Nesta V1, só o **Momento A — Clareza
imediata** está implementado. Sem D1, sem API, sem Analytics Engine, sem
persistência — o feedback vive só em memória React durante a sessão atual.

## O que está implementado

- `types.ts` — `ClarityId`, `ClarityReasonId`, `ClarityFeedbackState`.
- `clarityFeedbackState.ts` — funções puras de transição de estado
  (`selectClarity`, `selectClarityReason`, `setComment`,
  `canSubmitClarityFeedback`, `submitClarityFeedback`,
  `reopenClarityFeedback`). Nenhuma delas toca React, D1 ou rede — só
  transformam um `ClarityFeedbackState` no próximo, testável com Vitest
  puro.

`clarity = "clear"` não tem formulário adicional — `selectClarity` já
marca `submitted: true` na hora. `clarity = "partial"`/`"lost"` exigem
`clarityReason` antes de poder enviar (`canSubmitClarityFeedback`); o
comentário nunca é obrigatório.

## Onde isso é usado

`src/feedback/ClarityFeedbackBlock.tsx`, incluído por `ResultStep` entre
"Por que esta é sua Rota?" e "Recomeçar". O feedback não influencia
`profileId`, `WineProfile` nem `RoutePresentation` — é só leitura da
percepção da pessoa.

---

## Decisões já fechadas para etapas futuras (documentadas aqui, não implementadas)

### Momento B — resultado no mundo real

Pergunta: "O que aconteceu quando você foi escolher?"

| Resposta | id |
|---|---|
| Consegui escolher usando a Rota | `chose_with_route` |
| Consegui escolher com ajuda usando a orientação | `chose_with_help` |
| Não encontrei uma opção parecida | `couldnt_find_match` |
| Acabei escolhendo outra coisa | `chose_something_else` |
| Ainda não escolhi | `not_yet` |

### Momento C — aderência depois da prova

Pergunta: "Depois de provar, combinou com você?"

| Resposta | id |
|---|---|
| Adorei | `loved` |
| Gostei | `liked` |
| Mais ou menos | `okay` |
| Não era meu estilo | `not_my_style` |
| Ainda não provei | `not_tasted` |

### `routeVersion` / `profileVersion`

`routeVersion` descreverá a versão da jornada/motores/apresentação (uma
constante central, ainda a criar). `profileVersion` virá diretamente de
`profile.version` (já existe, `content/types.ts`). Os dois serão
persistidos junto de cada `route_sessions` quando essa tabela existir —
nenhuma das duas está implementada nesta etapa.

### D1 — modelo de tabelas aprovado (não criado)

Quatro tabelas, não uma tabela genérica com colunas nulas por momento:

```text
route_sessions
route_clarity_feedback
route_outcomes
route_taste_feedback
```

### Reentrada futura (beta)

Primeiro mecanismo: `localStorage` + `routeId`, para reencontrar uma Rota
no mesmo navegador. Sem login, sem e-mail, sem push, sem autenticação
nesta fase.
