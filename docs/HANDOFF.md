# Vinho Sem Erro — Project Handoff

**Produto:** Vinho Sem Erro
**Marca:** SaporeDiVino
**Documento:** Estado atual e continuidade do projeto
**Status:** MVP em desenvolvimento
**Objetivo:** permitir que outra IA ou desenvolvedor continue o projeto sem depender do histórico das conversas anteriores.
**Última auditoria de código:** feita por leitura direta do working tree (`git diff`, `npm test`, `npm run build`) — não por suposição a partir deste documento.
**Último commit conhecido antes desta atualização documental:** `20c60cf` (`feat: rework sparkling wine profiles (Método Charmat vs Tradicional split, new SPARK_04 rosé profile)`) — publicado em `origin/main`. Commit anterior relevante: `912d372` (`feat: refine MVP journey and purchase guidance`).

---

# 1. LEIA ISTO ANTES DE FAZER QUALQUER ALTERAÇÃO

Antes de modificar código:

1. Leia `docs/PRODUCT_SPEC.md`
2. Leia `docs/TECH_SPEC.md`
3. Leia este `docs/HANDOFF.md`
4. Rode:

```bash
git status
```

5. Rode:

```bash
git log -3 --oneline
```

6. Compare o código real com este documento.

IMPORTANTE:

Não assuma que decisões de produto já foram implementadas — e também não assuma o contrário. Este documento foi atualizado após uma auditoria real de código (diff, testes, build), mas o working tree pode mudar depois desta auditoria. Confirme sempre.

Este projeto possui cinco estados diferentes:

* ✅ implementado e commitado/publicado;
* 🟠 implementado no working tree local, ainda não commitado;
* 🟡 pendente de conteúdo ou de decisão técnica menor;
* 🔴 pendente de decisão funcional/enológica maior;
* 🟣 nova frente estratégica registrada em documentação, ainda sem nenhuma implementação técnica iniciada.

---

# 2. RESUMO EXECUTIVO DO ESTADO ATUAL

O Vinho Sem Erro já possui um MVP funcional em React/Vite com:

* banco de 12 perfis de vinho;
* motor determinístico de recomendação;
* apresentação contextual por ocasião;
* microdiagnóstico;
* tela de resultado;
* feedback de clareza;
* Home;
* `/app`;
* deploy no Vercel;
* GitHub configurado;
* testes automatizados.

A reestruturação de jornada conhecida como "Fase 14" — remoção da tela de intenção, reordenação da jornada, preço como complemento opcional pós-resolução, resolução direta do rosé, remoção de `rose_sweet`/`unsupported`, correção do bug vertical da Home, refinamento visual (Fraunces/Manrope/paleta) — e, junto com ela, a correção dos 11 `askPhrase` (remoção da redundância com "nessa faixa de preço") **já estão implementadas, testadas, commitadas e enviadas para `origin/main`** no commit `912d372` (`feat: refine MVP journey and purchase guidance`).

A decisão funcional/enológica dos espumantes, que ficou pendente por várias rodadas de análise, **foi tomada, implementada, testada e enviada** no commit `20c60cf` (`feat: rework sparkling wine profiles`). Detalhes completos na seção "ESPUMANTES" abaixo. Não existe mais nenhuma pendência funcional/enológica em aberto.

Existe uma nova frente estratégica registrada nesta atualização documental, ainda **sem nenhuma implementação técnica**:

* 🟣 **"Encontrar vinhos para comprar"** — funcionalidade planejada para, depois do diagnóstico e da resolução do perfil, mostrar opções reais de vinhos compatíveis e links para lojas. Ver seção "NOVA FRENTE ESTRATÉGICA" mais abaixo, e as seções correspondentes em `docs/PRODUCT_SPEC.md` e `docs/TECH_SPEC.md`.

---

==================================================
ESTADO IMPLEMENTADO, COMMITADO E ENVIADO (commit 912d372)
==================================================

# 3. FASE 14 — ✅ IMPLEMENTADO, COMMITADO E ENVIADO PARA ORIGIN/MAIN

Confirmado por auditoria direta do `git diff`/`git log` no momento do commit `912d372`. Tudo abaixo já está no código, commitado e publicado — não é mais "decidido, não implementado" nem "implementado localmente, não commitado":

* remoção de `IntentStep` (`src/journey/steps/IntentStep.tsx` deletado, `case "intent"` removido de `WineJourney.tsx`);
* `/app` começa diretamente em `reason` / momento (`INITIAL_NAV.currentStep = "reason"`);
* botão Voltar não aparece na primeira tela (`QuestionScreen.onBack` agora é opcional; a tela `reason` é chamada sem essa prop);
* jornada atual real:

```text
reason
↓
wineType
↓
palate (ou microDiagnosis quando necessário)
↓
budget
↓
result
```

* rosé pula `palate` e resolve diretamente para `ROSE_01` (`ANSWER_WINE_TYPE` seta `palateOptionId = "rose_dry_refreshing"` e vai direto para `"budget"` quando `wineType === "rose"`);
* preço só aparece depois que o perfil já está resolvido (`resolveCurrentProfile()` é chamado antes de exibir a pergunta de orçamento, tanto vindo de `palate` quanto de `microDiagnosis`);
* pergunta de preço com o texto exato:

> Quer incluir uma faixa de preço na hora de pedir ajuda?

* etapa de preço fora da progressão diagnóstica (nenhuma das duas telas de budget recebe `step={...}`, ou seja, sem numeração de progresso);
* "Seu orçamento" removido do topo do resultado (`ResultStep.tsx` só mostra "Seu momento" no `route-context`);
* novos prefixos de preço em "Pode pedir assim":
  * "Quero gastar até R$50."
  * "Quero gastar entre R$50 e R$80."
  * "Quero gastar entre R$80 e R$120."
  * "Quero gastar entre R$120 e R$200."
  * "Quero gastar mais de R$200."
  * (para "Prefiro não definir": nenhum prefixo)
* `RoutePresentation.budgetLabel` removido completamente (não existe mais em `types.ts`, `buildRoutePresentation.ts` nem `budgetPresentation.ts`; `BUDGET_LABELS` também foi apagado);
* `rose_sweet` removido — zero ocorrências em código-fonte (só aparece em documentação, como registro histórico);
* status `unsupported` removido — `MicroDiagnosisResolution` não tem mais essa variante; o próprio compilador impede um nó `unsupported` de existir na árvore;
* `MicroDiagnosisUnsupportedStep.tsx` removido (deletado do working tree, import removido de `WineJourney.tsx`);
* correção de espaçamento vertical da Home implementada (`.brand-mark-large` perdeu `margin: auto 0 32px`, agora é só `margin-bottom: 32px`);
* refinamento visual presente:
  * Fraunces (display/headings) + Manrope (corpo/UI), carregadas via `<link>` no `index.html`;
  * nova paleta (`--accent: #7d1f3d`, `--gold: #b8935a`, `--bg: #faf6f0`, etc.);
  * cards (`.option-button`) com sombra e hover mais sutis;
  * CTA (`.cta-primary`) com `box-shadow` e estado hover;
  * seções "Se quiser sair do óbvio" e "Por que esta é sua Rota?" viraram `<details>`;
  * feedback de clareza com bloco visual próprio (`.feedback-block`);
  * fundo com gradiente radial sutil em desktop (`@media (min-width: 960px)`).

IMPORTANTE — o que isso significa na prática:

Nada da lista acima precisa ser reimplementado nem recommitado. O commit `912d372` já está em `origin/main`. O push deve disparar automaticamente um novo deploy no Vercel (não verificado manualmente nesta atualização documental — confirmar no painel do Vercel ou visitando o site publicado antes de assumir que já está no ar). Ver seção "GITHUB / DEPLOY" mais abaixo.

---

# 4. ESTADO DO GITHUB

Ver seção "GITHUB / DEPLOY" mais abaixo para o estado real. Resumo: `origin/main` está em `912d372`, mesmo commit do working tree local no momento desta atualização documental.

Repositório:

```text
vinho-sem-erro
```

Branch:

```text
main
```

Remote:

```text
origin
```

O repositório está conectado ao GitHub.

---

# 5. ESTADO DO VERCEL

✅ CONECTADO AO GITHUB — deploy do commit `912d372` presumivelmente disparado automaticamente pelo push, mas **não confirmado manualmente** nesta atualização documental. Confirmar no painel do Vercel ou visitando o site publicado antes de assumir que a Fase 14 já está no ar.

O projeto está conectado ao GitHub e publicado no Vercel.

Configuração conhecida:

```text
Framework: Vite
Build: npm run build
Output: dist
```

O deploy inicial apresentava erro em `/app`. Foi criado `vercel.json` com rewrite de SPA. Depois disso foi confirmado manualmente que `/` e `/app` funcionam, inclusive refresh/acesso direto em `/app`.

---

# 6. SUPABASE

✅ PROJETO CRIADO

Existe um projeto Supabase chamado:

```text
SaporeDiVino Digital
```

As API Keys foram localizadas no painel.

IMPORTANTE:

Nenhuma Secret Key foi colocada no código. Nenhuma chave secreta deve ser compartilhada ou commitada.

---

# 7. INTEGRAÇÃO SUPABASE

🟡 AINDA NÃO IMPLEMENTADA

Não existe atualmente:

* conexão do frontend com Supabase;
* função Vercel conectada ao Supabase;
* schema do banco;
* migrations;
* tabelas;
* persistência de feedback;
* persistência de sessão.

Não iniciar essa etapa antes de validar a nova frente "Encontrar vinhos para comprar" (ver seção correspondente mais abaixo). A jornada funcional (Fase 14 + correção dos askPhrases) e a decisão dos espumantes já estão commitadas e publicadas — não são mais o bloqueio.

---

# 8. CLOUDFLARE

🟡 INFRAESTRUTURA LEGADA AINDA PRESENTE

O projeto foi originalmente criado considerando:

```text
Cloudflare Worker
Cloudflare Static Assets
Cloudflare D1
```

Por isso ainda existem `worker/`, `wrangler.toml`, `tsconfig.worker.json`. D1 nunca chegou a ser implementado. Não há dados para migrar. A arquitetura pretendida mudou para `Vercel + Supabase`.

Não remover os arquivos antigos automaticamente. Fazer a retirada em etapa controlada no futuro.

---

# 9. PERFIS DE VINHO

✅ IMPLEMENTADO

Existem **12 perfis** em `content/profiles/`:

```text
RED_01 — Tinto Leve e Vivo
RED_02 — Tinto Macio e Frutado
RED_03 — Tinto Médio e Equilibrado
RED_04 — Tinto Intenso e Estruturado

WHITE_01 — Branco Leve e Refrescante
WHITE_02 — Branco Aromático e Frutado
WHITE_03 — Branco Cremoso e Estruturado

ROSE_01 — Rosé Seco e Refrescante

SPARK_01 — Espumante Seco e Refrescante            (version 0.2)
SPARK_02 — Espumante Estruturado (Mais Presença à Mesa)  (version 0.2)
SPARK_03 — Espumante Suave e Doce                  (version 0.2)
SPARK_04 — Espumante Rosé e Frutado                (version 0.1, novo)
```

Os perfis de tinto, branco e rosé continuam na versão `"0.1"`. Os três perfis de espumante existentes subiram para `"0.2"` na decisão dos espumantes (commit `20c60cf`), e SPARK_04 nasceu em `"0.1"`.

Nenhum dos JSONs de perfil foi alterado durante a Fase 14 propriamente dita. Em etapa separada e posterior, os `askPhrase` foram corrigidos para remover a redundância com "nessa faixa de preço" — ver seção "ASKPHRASES — PENDÊNCIA RESOLVIDA". Depois disso, apenas os quatro perfis de espumante foram alterados, na decisão descrita na seção "ESPUMANTES".

Não reescrever os perfis automaticamente para encaixar alterações de interface.

---

# 10. MOTOR DE RECOMENDAÇÃO

✅ IMPLEMENTADO — NÃO ALTERADO NA FASE 14

Local: `rules/recommendation/`

Função principal: `resolveProfile(...)`

O motor é determinístico, testável, sem IA, sem banco remoto, independente da UI. Não foi tocado durante a Fase 14 (nenhum arquivo em `rules/recommendation/` aparece no diff).

Regra arquitetural importante: não criar uma segunda fonte de verdade armazenando `profileId` separadamente das respostas. A Fase 14 reforçou essa regra: tanto a tela de orçamento quanto a tela de resultado agora chamam o mesmo helper `resolveCurrentProfile()` dentro de `WineJourney.tsx`, que deriva o perfil sob demanda via `resolveProfile()` ou `evaluateMicroDiagnosis()`.

---

# 11. ROUTE PRESENTATION

✅ IMPLEMENTADO — ATUALIZADO NA FASE 14

Local: `rules/routePresentation/`

Contextualiza a apresentação de acordo com `reason` e `budget`. Motivos existentes: `everyday`, `relax`, `guests`, `special`, `explore`.

Mudanças da Fase 14 já aplicadas:

* `BUDGET_LABELS` e `RoutePresentation.budgetLabel` removidos (não há mais "propriedade de orçamento" mostrada como atributo do perfil);
* cláusulas de orçamento (`BUDGET_CLAUSES`) reescritas para "Quero gastar...", antepostas ao `askPhrase` original sem nenhum parsing de texto.

---

# 12. MICRODIAGNÓSTICO

✅ IMPLEMENTADO — LIMPO NA FASE 14

Local: `rules/microDiagnosis/`

Função: `evaluateMicroDiagnosis(...)`

O motor possui árvore de perguntas orientada a dados (`QUESTION_TREE`) e resolve perfis. Na Fase 14, o status `unsupported` e o nó de rosé doce foram removidos por completo — hoje só existem os estados `"question"` e `"resolved"`.

A lógica de espumante dentro dessa árvore foi atualizada na decisão dos espumantes (commit `20c60cf`): `sparklingSweetness` virou `sparklingOccasion` (eixo ocasião/uso, não mais açúcar) e `aromaticStyleAnyBubbles` passou a apontar para SPARK_04. Ver seção "ESPUMANTES" abaixo.

---

# 13. FEEDBACK DE CLAREZA

✅ IMPLEMENTADO NO FRONTEND — NÃO ALTERADO NA FASE 14

Local: `rules/feedback/`, `src/feedback/`

Estados: `clear`, `partial`, `lost`. Razões: `wanted_examples`, `hard_terms`, `taste_mismatch`, `situation_mismatch`, `other`. Comentário opcional.

A Fase 14 mudou apenas o CSS do bloco (`.feedback-block` deixou de reutilizar `.result-block`, ganhou estilo próprio) — a lógica em `rules/feedback/` não mudou.

O feedback ainda vive somente em memória. Não existe persistência.

---

==================================================
TESTES
==================================================

# 14. TESTES — ESTADO ATUAL CONFIRMADO POR EXECUÇÃO REAL

Resultado da última execução (`npm test -- --run`), após a decisão dos espumantes:

```text
Test Files  4 passed (4)
     Tests  118 passed (118)
```

Histórico da contagem, para não assustar quem comparar com documentos antigos:

* **123** — antes da Fase 14;
* **113** — após a Fase 14, queda esperada pela remoção dos testes de `rose_sweet`/`unsupported` e do bloco `describe("buildRoutePresentation — budgetLabel")` (o campo foi removido, então o teste foi removido junto, não deixado quebrado);
* **118** — após a decisão dos espumantes (commit `20c60cf`), pelas novas ramificações de espumante (SPARK_04 e as opções extras de `sparklingOccasion`).

Não é necessário "recuperar" nenhum número anterior. Cobertura coerente importa mais que quantidade fixa.

Build atual (`npm run build`), no estado do commit `20c60cf`:

```text
✓ 55 modules transformed.
dist/index.html                   0.77 kB │ gzip:  0.41 kB
dist/assets/index-B5ZfiXoS.css    9.17 kB │ gzip:  2.44 kB
dist/assets/index-DSvxVsI2.js   250.90 kB │ gzip: 76.04 kB
✓ built in 1.00s
```

`tsc -b && vite build` sem erros. Baseline anterior (Fase 14, commit `912d372`): 54 módulos, JS 249.52 kB / gzip 75.56 kB, CSS 9.17 kB. O crescimento do JS vem do SPARK_04 e das novas opções de espumante. O hash do arquivo JS muda a cada build de conteúdo — comparar tamanho, não nome.

---

# 15. REFINAMENTO VISUAL LOCAL

✅ IMPLEMENTADO, COMMITADO E ENVIADO (commit 912d372)

Já descrito em detalhe na seção 3. Arquivos afetados: `index.html`, `src/index.css`, `src/journey/steps/ResultStep.tsx`, `src/feedback/ClarityFeedbackBlock.tsx`.

Testes (113/113) e build passaram após essa rodada — ver seção TESTES.

---

# 16. BUG VISUAL DA HOME

✅ IMPLEMENTADO, COMMITADO E ENVIADO (commit 912d372)

Causa identificada originalmente:

```css
.brand-mark-large {
  margin: auto 0 32px;
}
```

O `margin-top: auto` consumia o espaço livre do flex container e empurrava o conteúdo. Correção aplicada: removido o comportamento de `margin-top: auto`, mantendo só `margin-bottom: 32px`. Cores, fontes, CTA e identidade preservadas — a Home não foi redesenhada, só corrigida.

---

==================================================
ASKPHRASES — PENDÊNCIA RESOLVIDA
==================================================

# 17. ASKPHRASES — ✅ RESOLVIDO, COMMITADO E ENVIADO (commit 912d372)

Pendência original: os 11 perfis tinham `askPhrase` terminando com uma variação de "...O que você recomenda nessa faixa de preço?", redundante com os novos prefixos de orçamento ("Quero gastar..."). Exemplo do problema original — RED_01 com `budget = under_50` produzia:

> "Quero gastar até R$50. Estou procurando um tinto mais leve e fresco [...]. O que você recomenda **nessa faixa de preço**?"

A faixa de preço era mencionada duas vezes na mesma frase.

**Correção aplicada e confirmada por auditoria de código:**

* nos 11 perfis (RED_01, RED_02, RED_03, RED_04, WHITE_01, WHITE_02, WHITE_03, ROSE_01, SPARK_01, SPARK_02, SPARK_03), a referência a "nessa faixa de preço" (ou equivalente, como em RED_04: "Quero algo marcante nessa faixa de preço.") foi removida do `askPhrase`;
* nenhuma outra informação enológica foi alterada em nenhum perfil — `customerSummary`, `internalCharacteristics`, `mainClues`, `additionalClues`, `internalLibrary`, `labelClues`, `avoid`, `backupProfileId`, `whyThisRoute`, `id`, `name`, `version` e `category` permanecem idênticos em todos os 11 arquivos (confirmado por `git diff` linha a linha: exatamente uma linha alterada por arquivo, o campo `askPhrase`);
* os três perfis de espumante (SPARK_01, SPARK_02, SPARK_03) tiveram **somente essa mesma correção textual genérica** — nenhum termo como "Brut", "Moscatel", "pouca sensação de doçura" ou "sem ser muito doce" foi tocado, e nenhuma outra parte do conteúdo desses três perfis mudou;
* busca por "nessa faixa de preço" em `content/profiles/*.json` após a correção: **zero ocorrências**;
* testes após a correção: **113/113 passando** (nenhum teste cobria o texto literal do `askPhrase`, então a contagem não mudou);
* build após a correção: **sucesso**, sem erros;
* commitado junto com a Fase 14 no commit `912d372` (`feat: refine MVP journey and purchase guidance`) e enviado para `origin/main`.

IMPORTANTE:

Esta correção foi puramente textual/genérica e **não representou nenhuma decisão conceitual sobre espumantes** — a decisão conceitual veio depois, em etapa própria e isolada (commit `20c60cf`, ver seção "ESPUMANTES"). Os `askPhrase` dos quatro perfis de espumante foram reescritos naquela etapa, e nenhum deles contém mais "nessa faixa de preço".

---

==================================================
ESPUMANTES
==================================================

# 18. ESPUMANTES — ✅ DECIDIDO, IMPLEMENTADO, COMMITADO E ENVIADO (commit 20c60cf)

A decisão funcional/enológica dos espumantes foi tomada e aplicada. **O bloqueio anterior sobre `src/journey/journeyOptions.ts`, `rules/microDiagnosis/questionTree.ts` e `content/profiles/SPARK_02.json` não existe mais** — esses arquivos podem ser alterados normalmente, seguindo apenas as regras gerais de alteração controlada deste documento (analisar, reportar impacto, obter aprovação, escopo pequeno).

## Os 4 perfis de espumante, como ficaram

* **SPARK_01 — "Espumante Seco e Refrescante"** (`version 0.2`): seco e refrescante, para brindar/dias de calor. Pistas de **Método Charmat**: Espumante brasileiro, Prosecco, e o próprio termo "Método Charmat" no rótulo. Cava, Champagne, Franciacorta e Trento DOC saíram daqui (foram para SPARK_02). `backupProfileId: null` — **sem fallback**.
* **SPARK_02 — "Espumante Estruturado (Mais Presença à Mesa)"** (`version 0.2`): **reescrito por completo**. Método tradicional, com corpo para acompanhar pratos de mais sabor (inclusive carnes e feijoada). Pistas: Champagne, Cava, Franciacorta, Trento DOC e espumante brasileiro de método tradicional (denominações Vale dos Vinhedos e Pinto Bandeira). `backupProfileId: "SPARK_01"`. O conteúdo antigo (rosé/frutado/morango) **não pertence mais a este ID** — migrou para SPARK_04.
* **SPARK_03 — "Espumante Suave e Doce"** (`version 0.2`): apenas **renomeado** (era "Espumante Doce e Aromático"). Conteúdo, pistas e askPhrase preservados. `backupProfileId: null` — **sem fallback**, porque doce não aceita substituto de outro estilo; se não encontrar, a orientação é procurar outra opção dentro do próprio estilo Moscatel/Asti.
* **SPARK_04 — "Espumante Rosé e Frutado"** (`version 0.1`, **perfil novo**): fresco, perfumado, cheio de fruta, fácil de beber — **sempre seco**, sem sensação de doçura. Pistas: Espumante Rosé, Prosecco Rosé, Cava Rosado. `backupProfileId: "SPARK_01"`.

## Linha de corte editorial

**Tudo a partir de Demi-Sec pertence ao SPARK_03** — nunca ao SPARK_04 nem a nenhum outro perfil de espumante. Registrado no campo `avoid` do SPARK_04.

## Pergunta da jornada

Passou de 3 para **4 opções** (mais "Não sei"), sob o novo título "Como você quer aproveitar esse espumante?":

```text
1. Leve e fresco, ótimo pra brindar ou dias de calor   → SPARK_01
2. Mais estruturado, com corpo e presença à mesa       → SPARK_02
3. Rosé, frutado e fácil de beber, sempre seco         → SPARK_04
4. Doce, perfumado e bem frutado                       → SPARK_03
5. Não sei                                             → microdiagnóstico
```

O eixo deixou de ser doçura e passou a ser **ocasião/uso**, conforme os princípios já decididos (frutado não significa doce; aromático não significa doce; açúcar não é o eixo para diferenciar estilos não-doces; doce continua sendo escolha legítima e separada).

## Microdiagnóstico ("Não sei")

O nó `sparklingSweetness` foi renomeado para `sparklingOccasion` e reescrito — não pergunta mais sobre açúcar. As opções são: brindar/sem compromisso → SPARK_01; acompanhar refeição robusta → SPARK_02; fruta e leveza tipo rosé → SPARK_04; mais doce → SPARK_03; "ainda não sei" → SPARK_01 (fallback mais seguro/genérico). O nó `aromaticStyleAnyBubbles` também foi corrigido: a opção de espumante frutado agora aponta para SPARK_04, não mais para SPARK_02.

## Arquivos alterados nesta decisão (commit 20c60cf)

```text
content/profiles/SPARK_01.json
content/profiles/SPARK_02.json
content/profiles/SPARK_03.json
content/profiles/SPARK_04.json   (novo)
content/profiles/index.ts
rules/recommendation/types.ts
rules/recommendation/palateOptions.ts
rules/recommendation/resolveProfile.ts
rules/recommendation/resolveProfile.test.ts
rules/recommendation/README.md
rules/microDiagnosis/types.ts
rules/microDiagnosis/questionTree.ts
rules/microDiagnosis/evaluateMicroDiagnosis.test.ts
rules/microDiagnosis/README.md
src/journey/journeyOptions.ts
```

`PalateOptionId` perdeu `sparkling_fruity_aromatic` e ganhou `sparkling_structured_traditional` e `sparkling_rose_fruity`. Testes: **118/118 passando**. Build: sucesso.

---

==================================================
GITHUB / DEPLOY
==================================================

# 19. GITHUB / DEPLOY — RELAÇÃO ENTRE LOCAL E REMOTO

Último commit publicado conhecido no remoto (`origin/main`) no momento desta atualização documental:

```text
20c60cf feat: rework sparkling wine profiles (Método Charmat vs Tradicional split, new SPARK_04 rosé profile)
```

Commits anteriores:

```text
6a1be6b docs: add OFFER_REFERENCE.md and reference it in TECH_SPEC
2c7853b docs: plan wine purchase recommendations
912d372 feat: refine MVP journey and purchase guidance
0f05e4b docs: add product technical and handoff specifications
ba5726e fix: add Vercel SPA rewrite
16583f8 feat: establish Vinho Sem Erro MVP foundation
```

IMPORTANTE — este é o ponto central desta seção:

* **GitHub já contém a Fase 14, a correção dos askPhrases e a decisão dos espumantes.** O commit `20c60cf` foi enviado com sucesso para `origin/main` (`6a1be6b..20c60cf  main -> main`), e o working tree ficou clean logo em seguida.
* Esta atualização documental (a que você está lendo agora) é **posterior** ao commit `20c60cf` e **ainda não foi commitada** — ela existe apenas no arquivo `docs/HANDOFF.md` do working tree local. Rodar `git status` deve mostrar só esse arquivo como `modified`, sem nenhuma outra alteração.
* **Os deploys no Vercel a partir desses commits não foram confirmados manualmente** em nenhuma destas atualizações documentais. Presume-se que os pushes dispararam deploys automáticos, mas isso deve ser verificado antes de comunicar qualquer mudança como "no ar" para pessoas fora da equipe técnica.
* Antes de trabalhar, sempre confirmar via `git status` e `git log -3 --oneline` se existem commits posteriores a este documento.

---

# 20. O QUE NÃO DEVE SER FEITO AGORA

Não implementar ainda:

* Supabase;
* API;
* banco;
* autenticação;
* analytics;
* pagamentos;
* scanner;
* IA;
* banco de rótulos;
* preços reais;
* geolocalização;
* a funcionalidade "Encontrar vinhos para comprar" (nenhum conector, integração com Awin/Amazon/Mercado Livre, endpoint `/api`, Product Matching Engine ou schema de `ProductSource` — está só documentada, ver seção correspondente mais abaixo).

---

# 21. ORDEM RECOMENDADA PARA A PRÓXIMA IA

Após ler os três documentos:

## Etapa 1 — Inspeção

```bash
git status
git log -3 --oneline
npm test -- --run
npm run build
```

Não alterar nada. Confirmar que o estado bate com este documento (Fase 14 e correção dos askPhrases em `912d372`; decisão dos espumantes em `20c60cf`; "Encontrar vinhos para comprar" apenas documentada, sem código).

**A decisão dos espumantes está concluída** — não é mais o próximo passo. O próximo passo é a validação de fontes reais para "Encontrar vinhos para comprar".

## Etapa 2 — Validar fontes reais para "Encontrar vinhos para comprar"

Não implementar a funcionalidade ainda. Seguir a investigação descrita na seção "PRÓXIMO EXPERIMENTO" mais abaixo antes de desenhar qualquer integração técnica.

## Etapa 3 — Só depois da jornada, conteúdo e fontes de produto validadas: Supabase

---

# 22. NÃO MISTURAR ESPUMANTES COM AS OUTRAS PENDÊNCIAS

> **Seção histórica — concluída.** Esta regra foi escrita quando a decisão dos espumantes ainda estava pendente e valia como restrição ativa. Ela foi cumprida: os espumantes saíram em etapa própria e isolada, no commit `20c60cf`, separado da Fase 14 (`912d372`). O texto original fica preservado abaixo como registro de como a separação foi conduzida. Generalizar esta regra para outras pendências seria uma mudança de processo do projeto — decisão da Iaponira, não efeito colateral de atualização de documentação.

A revisão dos espumantes não bloqueia o commit da Fase 14 (Home, intent, preço, rosé, unsupported, visual) nem a correção dos askPhrases — são independentes. Mas nenhuma alteração de espumantes deve ser feita "junto" silenciosamente com outro commit. Criar etapa separada.

---

# 23. VALIDAÇÃO APÓS CADA ALTERAÇÃO

Executar:

```bash
npm test -- --run
npm run build
```

Depois:

```bash
git diff
git status
```

Testar manualmente em 375px e desktop.

---

# 24. TESTE MANUAL MÍNIMO

Verificar: `/`; `/app`; refresh `/app`; primeira pergunta (sem botão Voltar); voltar; tinto; branco; rosé (deve ir direto para orçamento, sem pergunta de paladar); **espumante nas 4 novas opções (leve e fresco → SPARK_01; presença à mesa → SPARK_02; rosé frutado → SPARK_04; doce → SPARK_03)**; **"Não sei" de espumante (as 5 opções de `sparklingOccasion`, incluindo "Ainda não sei" → SPARK_01)**; complemento de orçamento (sem numeração de progresso); resultado (sem "Seu orçamento" no topo); "Pode pedir assim" (prefixo "Quero gastar..."); feedback; recomeçar.

Pendência conhecida: a jornada de espumante pós-`20c60cf` foi validada por testes automatizados e build, **mas ainda não foi testada manualmente em navegador**.

---

# 25. REGRA PARA COMMITS

Não fazer um commit enorme contendo UX + Supabase + Cloudflare + banco + conteúdo enológico + CSS ao mesmo tempo. Preferir commits pequenos e temáticos, como os que já estão no histórico:

```text
feat: refine MVP journey and purchase guidance
docs: plan wine purchase recommendations
feat: rework sparkling wine profiles (...)
```

Commit só acontece com pedido explícito do responsável pelo produto.

---

# 26. ESTADO DE DEPLOY VERSUS ESTADO LOCAL

Ver seção "GITHUB / DEPLOY" acima. O GitHub está em dia com o código local (`20c60cf`), mas **nenhum deploy do Vercel foi confirmado manualmente** ao longo destas etapas. Git local e `origin/main` são a fonte imediata de verdade; a interface do Vercel não foi verificada.

---

# 27. DOCUMENTAÇÃO AINDA NÃO É PROVA DE IMPLEMENTAÇÃO

Mesmo este HANDOFF, atualizado após auditoria real, pode ficar desatualizado assim que o código mudar de novo. Sempre verificar código + HANDOFF antes de agir, nunca só um dos dois. Se este documento e o `git diff` divergirem, o `git diff` é a fonte da verdade.

---

# 28. PRÓXIMO MARCO TÉCNICO

A jornada funcional V1 está implementada, testada, commitada e enviada (Fase 14 + correção dos askPhrases em `912d372`), e a decisão dos espumantes também (`20c60cf`). O que falta antes do próximo marco:

* confirmar o deploy no Vercel a partir de `20c60cf`;
* testar manualmente a nova jornada de espumante (4 opções + "Não sei") em 375px e desktop — nenhuma validação em navegador foi feita para a mudança dos espumantes, só testes automatizados e build;
* validar pelo menos uma fonte real de produtos antes de prometer "Encontrar vinhos para comprar" comercialmente (ver seção correspondente).

---

# 29. PRÓXIMO MARCO DE INFRAESTRUTURA

Depois da jornada estabilizada e commitada: Vercel Functions + Supabase/Postgres. Objetivo inicial: persistir feedback de clareza. Não começar construindo uma infraestrutura grande.

---

# 30. SEGURANÇA

Antes de trabalhar com Supabase: nunca pedir ao usuário para colar Secret Key em conversa. Secret deve ser configurada diretamente em Vercel Environment Variables e ambiente local protegido. Nunca em Git.

---

# 31. REGRA FINAL PARA A PRÓXIMA IA

Não "melhore" o Vinho Sem Erro por conta própria. Antes de alterar comportamento: identificar o problema; explicar impacto; separar produto de código; obter aprovação; implementar somente o escopo aprovado.

Quando houver dúvida entre adicionar complexidade e simplificar a decisão do usuário, priorizar **simplificar a decisão**.

---

==================================================
NOVA FRENTE ESTRATÉGICA — ENCONTRAR VINHOS PARA COMPRAR
==================================================

# 32. "ENCONTRAR VINHOS PARA COMPRAR" — 🟣 PLANEJADO, NÃO IMPLEMENTADO

Registrado nesta atualização documental como nova decisão de produto. Detalhamento completo em `docs/PRODUCT_SPEC.md` (seções sobre a nova funcionalidade, princípio de segurança/credibilidade, UX planejada, modelo de afiliados e responsabilidade sobre álcool) e `docs/TECH_SPEC.md` (arquitetura planejada, fontes de produtos candidatas, matching/inteligência).

Resumo do que foi decidido:

* depois que o diagnóstico resolve o perfil e mostra "Pode pedir assim", o produto poderá **opcionalmente** oferecer "Encontrar vinhos para comprar" — opções reais de vinhos compatíveis e links para lojas;
* essa funcionalidade **não substitui** o diagnóstico nem `resolveProfile()` — acontece só depois que o perfil já foi definido;
* **regra central inegociável:** comissão de afiliado nunca pode ser critério de compatibilidade ou ranking enológico; se a confiança nos dados for baixa, o sistema deve preferir não recomendar nenhum vinho a recomendar um inadequado;
* fontes de produto são tratadas como **candidatas a validar**, não integrações confirmadas: Awin (com Decanter, Wine, Evino, Descorcha/Concha y Toro, Divvino e Zé Delivery identificados na pesquisa inicial como programas/lojas), Amazon (Associados/Product Advertising API) e Mercado Livre (APIs oficiais) — nada disso foi validado na conta real de nenhuma plataforma ainda;
* existe interesse em possivelmente lançar o produto já com essa funcionalidade, mas isso é **condicional**: exige comprovar antes que pelo menos uma fonte real entrega dados suficientes para matching seguro.

Nenhum código foi escrito para esta frente. Nenhum arquivo de `rules/`, `src/` ou `content/` foi tocado.

---

# 33. PRÓXIMO EXPERIMENTO — VALIDAR UMA FONTE REAL ANTES DE IMPLEMENTAR

NÃO desenvolver a funcionalidade "Encontrar vinhos para comprar" ainda. Primeiro, validar uma fonte real de produtos.

Primeira investigação sugerida:

1. criar/acessar conta de publisher na Awin;
2. verificar quais programas de lojas de vinho estão disponíveis;
3. investigar Decanter como primeira candidata (identificada na pesquisa inicial como programa da Awin e possível porta de entrada para uma prova de conceito — mas isso **não está confirmado**, precisa ser verificado na conta real);
4. verificar se existe Product Feed acessível para essa loja;
5. inspecionar quais campos reais o feed fornece (nome, preço, imagem, disponibilidade, deep link, descrição, uva, região etc.);
6. descobrir se os dados são suficientes para fazer matching seguro com um `WineProfile`;
7. somente depois desenhar a integração técnica (módulo de Product Sources, normalização, Product Matching Engine — ver `docs/TECH_SPEC.md`).

Pergunta que precisa ser respondida antes de qualquer implementação:

> "Com os dados reais fornecidos pelo catálogo, conseguimos afirmar com segurança que determinado vinho corresponde a um WineProfile?"

Se a resposta for não, ou se a confiança for baixa, não implementar a funcionalidade com essa fonte — voltar à pesquisa de outra fonte candidata.

Antes de revisar regras brasileiras de publicidade de bebidas alcoólicas, políticas das plataformas parceiras e disclosures necessários (ver `docs/PRODUCT_SPEC.md`, seção "Álcool / Responsabilidade"), esta funcionalidade não deve ser comunicada como pronta para lançamento.

---

==================================================
RESUMO FINAL
==================================================

# 34. RESUMO FINAL DE STATUS

## ✅ Implementado, testado, commitado e enviado

Base e Fase 14 (commit `912d372`):

* React + TypeScript + Vite
* Git
* GitHub
* Vercel
* SPA rewrite
* motor de recomendação
* feedback de clareza V1
* refinamento visual (Fraunces, Manrope, nova paleta, ajustes da tela de resultado, feedback visual)
* Fase 14 completa (jornada nova, remoção de IntentStep, botão Voltar corrigido)
* preço como complemento opcional pós-resolução, fora da progressão diagnóstica
* rosé direto para ROSE_01
* remoção de `rose_sweet` e do status `unsupported` (incluindo `MicroDiagnosisUnsupportedStep.tsx`)
* remoção de `RoutePresentation.budgetLabel` e de "Seu orçamento" do resultado
* novos prefixos "Quero gastar..."
* correção do bug vertical da Home
* correção dos `askPhrase` (remoção da redundância com "nessa faixa de preço")

Decisão dos espumantes (commit `20c60cf`):

* 12 perfis no total — SPARK_04 ("Espumante Rosé e Frutado") criado
* SPARK_01 reposicionado em Método Charmat (Espumante brasileiro, Prosecco), sem fallback
* SPARK_02 reescrito como "Espumante Estruturado (Mais Presença à Mesa)", método tradicional, fallback SPARK_01
* SPARK_03 renomeado para "Espumante Suave e Doce", sem fallback
* pergunta da jornada de espumante com 4 opções + "Não sei", eixo ocasião/uso em vez de açúcar
* microdiagnóstico `sparklingSweetness` → `sparklingOccasion`, sem eixo de açúcar
* linha de corte editorial: a partir de Demi-Sec é sempre SPARK_03
* 118/118 testes passando, build aprovado, working tree clean após o commit

## 🟣 Nova frente estratégica (documentada, sem código)

* "Encontrar vinhos para comprar" — funcionalidade planejada para depois do diagnóstico
* princípio central: afiliado nunca é critério enológico; baixa confiança = não recomendar
* fontes candidatas a validar: Awin (Decanter, Wine, Evino, Descorcha/Concha y Toro, Divvino, Zé Delivery), Amazon, Mercado Livre — nenhuma confirmada
* arquitetura (Product Sources, Product Matching Engine, schema `ProductSource`) apenas conceitual em `docs/TECH_SPEC.md`

## ⏳ Futuro

* testar manualmente em navegador a nova jornada de espumante (`20c60cf`)
* confirmar o deploy no Vercel
* validar pelo menos uma fonte real de produtos antes de assumir "Encontrar vinhos para comprar" como promessa comercial de lançamento
* Supabase integrado
* Vercel Functions
* banco
* persistência
* feedback B/C
* analytics
* pagamentos
* domínio final

---

# 35. PRIMEIRA FRASE PARA UMA NOVA IA

Ao iniciar uma nova sessão com outro agente, usar:

> Antes de fazer qualquer alteração, leia integralmente `docs/PRODUCT_SPEC.md`, `docs/TECH_SPEC.md` e `docs/HANDOFF.md`. Depois rode `git status`, `git log -3 --oneline`, `npm test -- --run` e `npm run build`. Quero que você me diga em que estado real o projeto está e quais diferenças existem entre o código atual e o HANDOFF. Não altere nenhum arquivo ainda.

Esse deve ser sempre o primeiro passo.
