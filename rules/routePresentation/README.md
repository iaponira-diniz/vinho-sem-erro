# rules/routePresentation/

Segunda camada determinística do produto. Contextualiza a "Sua Rota de
Hoje" com `reason` (o momento) e `budget` (a faixa de preço) — **nunca**
escolhe nem troca o perfil sensorial. Isso continua sendo responsabilidade
exclusiva de `rules/recommendation`.

```text
wineType + palateOptionId → resolveProfile() → profileId → WineProfile

reason + budget + WineProfile → buildRoutePresentation() → RoutePresentation
```

A tela de Resultado recebe `WineProfile` + `RoutePresentation` e só
renderiza — nenhuma condicional de `reason`/`budget` sobrevive até o JSX.

## Arquivos

- `types.ts` — `ReasonId`, `BudgetId` (movidos de `src/journey/types.ts`:
  são identificadores de resposta, não conteúdo de UI — mesmo motivo pelo
  qual `WineTypeId`/`PalateOptionId` vivem em `rules/recommendation`),
  `RouteContext`, `RoutePresentation`.
- `reasonPresentation.ts` — `REASON_LABELS`, `REASON_MESSAGES`,
  `REASON_FLAGS`: tabelas fixas por `reason`.
- `budgetPresentation.ts` — a composição de `contextualAskPhrase`. Não
  existe mais um "budgetLabel" de apresentação: o orçamento nesta versão é
  complemento opcional só dentro da frase de pedir ajuda, nunca mostrado
  como propriedade do perfil.
- `buildRoutePresentation.ts` — a função pura que junta tudo.
- `index.ts` — API pública.
- `buildRoutePresentation.test.ts` — testes pela API pública.

## Assinatura

```ts
function buildRoutePresentation(
  profile: WineProfile,
  context: RouteContext,
): RoutePresentation;
```

## `contextualAskPhrase` — composição, nunca edição

O `askPhrase` armazenado em `content/profiles/*.json` nunca é lido palavra
por palavra nem editado, e nenhum parsing é feito sobre ele. Quando
`budget !== "open"`, uma cláusula de orçamento fixa (uma por faixa) é
anteposta como frase própria:

```text
"Quero gastar até R$50. " + askPhrase original
```

Para `budget === "open"`, `contextualAskPhrase` é exatamente igual ao
`askPhrase` original — sem frase adicional. Se `profile.askPhrase` for
`null`, `contextualAskPhrase` é `null` — nunca string vazia.

## `discoveryOptions` — só em `explore`

```ts
reason === "explore" ? profile.internalLibrary.slice(0, 2) : []
```

Os 2 primeiros itens na ordem em que já estão no JSON — nenhum critério de
prioridade novo, nenhuma ordenação alfabética, nenhuma tentativa de inferir
disponibilidade.

## O que esta camada nunca faz

Não muda `profileId`, não reordena nem remove `mainClues` / `additionalClues`
/ `avoid` / `labelClues`, não edita os JSONs de `content/`, não infere
preço real nem disponibilidade. Só decide *como* apresentar o `WineProfile`
já resolvido.

## Estado ausente

Se a jornada chegar ao Resultado com `reason` ou `budget` nulos, isso é
tratado como inconsistência da jornada pela interface (fluxo `invalid` já
existente em `rules/recommendation`/`src/journey`) — esta camada nunca usa
valor padrão (`everyday`/`open`) como fallback silencioso; ela só é chamada
depois que a interface já garantiu que ambos existem.
