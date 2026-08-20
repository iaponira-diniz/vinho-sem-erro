# rules/recommendation/

Motor de decisão determinístico da rota "Quero escolher um vinho para mim".
Traduz `wineType + palateOptionId` em um `profileId` de `content/profiles`.
**Não implementa interface React** e **não interpreta conteúdo enológico** —
só faz a tradução resposta → id.

```text
respostas do usuário
        ↓
motor determinístico (este diretório)
        ↓
profileId
        ↓
lookup do WineProfile (content/profiles)
        ↓
interface
```

## Arquivos

- `types.ts` — `WineTypeId`, `PalateOptionId` (ids semânticos da resposta de
  paladar, deliberadamente diferentes dos ids de perfil) e
  `RecommendationResolution` (o resultado com três estados).
- `palateOptions.ts` — `PALATE_OPTIONS_BY_WINE_TYPE`, única fonte de verdade
  sobre quais `PalateOptionId` pertencem a cada `WineTypeId`.
- `resolveProfile.ts` — a função `resolveProfile(wineType, palateOptionId)`
  e o mapeamento oficial `PalateOptionId -> profileId`.
- `index.ts` — reexporta os três acima.

## Assinatura

```ts
function resolveProfile(
  wineType: WineTypeId,
  palateOptionId: PalateOptionId | null,
): RecommendationResolution;

type RecommendationResolution =
  | { status: "resolved"; profileId: string }
  | { status: "needs_help"; profileId: null }
  | { status: "invalid"; profileId: null };
```

`palateOptionId` aceita `null` porque, quando `wineType === "unknown"`, a
tela de Paladar nunca existiu para essa jornada (ela depende do Tipo) — não
há resposta de paladar para passar. É o único ajuste técnico sobre a
assinatura sugerida na especificação; o conceito dos três estados
(`resolved`/`needs_help`/`invalid`) não muda.

## Mapeamento oficial (o único implementado)

| wineType | palateOptionId | profileId |
|---|---|---|
| red | `red_light` | `RED_01` |
| red | `red_soft_fruity` | `RED_02` |
| red | `red_balanced` | `RED_03` |
| red | `red_intense` | `RED_04` |
| white | `white_light_refreshing` | `WHITE_01` |
| white | `white_aromatic_fruity` | `WHITE_02` |
| white | `white_creamy_structured` | `WHITE_03` |
| rose | `rose_dry_refreshing` | `ROSE_01` |
| rose | `rose_fruity_refreshing` | `ROSE_01` |
| sparkling | `sparkling_dry_refreshing` | `SPARK_01` |
| sparkling | `sparkling_fruity_aromatic` | `SPARK_02` |
| sparkling | `sparkling_sweet_aromatic` | `SPARK_03` |

## `needs_help` — quando não escolher automaticamente

Retornado quando `wineType === "unknown"`, ou quando `palateOptionId`
termina em `_unknown`. **Nunca** resolve para um perfil intermediário
(nada de cair em `RED_02` ou `WHITE_01` como fallback automático). O
microdiagnóstico que resolve esse estado ("Me ajude a decidir") será
implementado depois, fora deste motor.

## `invalid` — combinações que não deveriam acontecer

Retornado quando `palateOptionId` não pertence ao conjunto válido para o
`wineType` informado (ex.: `red` + `white_aromatic_fruity`), ou quando
`palateOptionId` é `null` com um `wineType` conhecido. O motor não tenta
corrigir silenciosamente — apenas sinaliza que a combinação é
incompatível.

## `reason` e `budget` não entram aqui

Não são parâmetros de `resolveProfile`. Pertencem ao estado da jornada
(fora deste motor) e serão usados futuramente como modificadores de
apresentação e priorização de pistas — nunca para decidir qual perfil
sensorial é o resultado.

## Regra de navegação (jornada) — documentada, não implementada

Ainda não existe código de jornada/React neste repositório. Quando existir,
esta regra já está definida: se `wineType` for alterado depois de a pessoa
responder Paladar, `palateOptionId` e `profileId` voltam a `null` — porque a
resposta de paladar dependia do tipo anterior e ficou inválida.
`reason` e `budget` permanecem intactos, pois não dependem do tipo.

## Persistência (decisão arquitetural futura, não implementada)

`sessionStorage` poderá preservar uma jornada em andamento após um refresh
de página. `localStorage`, cookies ou qualquer banco de dados estão fora de
cogitação para esse propósito. Nada disso está implementado nesta etapa.
