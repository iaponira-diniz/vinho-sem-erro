# content/

Dados do domínio "Vinho Sem Erro" — os 11 perfis de vinho. Esta pasta **não
tem lógica nem UI**, só dados e o schema que os descreve. É consumida tanto
pela interface (`src/`) quanto, no futuro, pelo motor de recomendação
(`rules/`) e pelo Worker (`worker/`).

## Arquivos

- `types.ts` — schema TypeScript (`WineProfile`, `WineCategory`,
  `WineClue`). Define a forma dos dados, não o conteúdo.
- `profiles/*.json` — um arquivo por perfil, com `id`, `version`, `category`
  e `name` sempre preenchidos. Os demais campos (`customerSummary`,
  `internalCharacteristics`, `mainClues`, `additionalClues`,
  `internalLibrary`, `labelClues`, `avoid`, `backupProfileId`, `askPhrase`,
  `whyThisRoute`) ficam `null`/`[]` até que o conteúdo real do perfil seja
  definido. Os 11 perfis já têm esse conteúdo preenchido.
- `profiles/index.ts` — agrega os 11 JSONs em `wineProfiles` e expõe
  `getWineProfileById`.

## Regras

- **ID nunca muda.** Se um perfil for descontinuado, ele não é apagado nem
  reaproveitado por outro — vira um registro histórico.
- **`version` é string (ex.: `"0.1"`), não número.** Toda mudança de
  conteúdo do perfil deve atualizar essa versão. Isso permite rastrear qual
  versão de um perfil foi mostrada a um usuário em um dado momento
  (importante quando o feedback pós-compra for implementado).
- Nenhum valor de conteúdo (`customerSummary`, `mainClues`, `askPhrase` etc.)
  deve ser escrito por engenharia sem vir de uma definição de produto
  explícita — esta pasta só guarda o que já foi decidido, não decide
  sozinha.

## Regra conceitual — pistas vs. garantias

A característica sensorial é mais importante do que a uva, região ou
denominação.

Uvas, regiões e denominações (`mainClues`, `additionalClues`,
`internalLibrary`, `labelClues`) funcionam como pistas, não como garantias
absolutas do estilo. Nenhuma pista deve ser tratada como regra
determinística — isso é responsabilidade do motor de recomendação
(`rules/`), quando ele existir, não desta pasta.

## Regra conceitual — rosé não é sinônimo de doce

Rosé não significa doce.

A cor do rosé não determina sozinha o nível de açúcar, a qualidade ou o
corpo do vinho.

Um rosé mais escuro pode continuar sendo seco, fresco e gastronômico.

Assim como na regra acima, esta é uma observação de conteúdo — não vira
lógica de recomendação nesta pasta.

## Regras conceituais — espumantes

Frutado não significa doce.

Rosé não significa doce.

Extra Dry não significa mais seco que Brut.

Se a cliente gosta de espumante doce, o produto deve ajudá-la a escolher
melhor dentro dessa preferência, e não tentar conduzi-la automaticamente
para um estilo seco.

Moscato d'Asti não deve ser tratado simplesmente como espumante no banco de
conhecimento.

Assim como as regras acima, estas são observações de conteúdo — não viram
lógica de recomendação nesta pasta.
