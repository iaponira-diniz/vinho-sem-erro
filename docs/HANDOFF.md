# Vinho Sem Erro — Project Handoff

**Produto:** Vinho Sem Erro
**Marca:** SaporeDiVino
**Documento:** Estado atual e continuidade do projeto
**Status:** MVP em desenvolvimento
**Objetivo:** permitir que outra IA ou desenvolvedor continue o projeto sem depender do histórico das conversas anteriores.
**Última auditoria de código:** feita por leitura direta do working tree (`git diff`, `npm test`, `npm run build`) — não por suposição a partir deste documento.
**Último commit conhecido antes desta atualização documental:** `912d372` (`feat: refine MVP journey and purchase guidance`) — publicado em `origin/main`.

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

* banco de 11 perfis de vinho;
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

A reestruturação de jornada conhecida como "Fase 14" — remoção da tela de intenção, reordenação da jornada, preço como complemento opcional pós-resolução, resolução direta do rosé, remoção de `rose_sweet`/`unsupported`, correção do bug vertical da Home, refinamento visual (Fraunces/Manrope/paleta) — e, junto com ela, a correção dos 11 `askPhrase` (remoção da redundância com "nessa faixa de preço") **já estão implementadas, testadas, commitadas e enviadas para `origin/main`** no commit `912d372` (`feat: refine MVP journey and purchase guidance`). O working tree ficou limpo (`working tree clean`) logo após esse commit e esse push.

Existe uma pendência real, não implementada:

* Uma pendência de **decisão funcional**: a revisão da lógica de espumantes (pergunta e possivelmente SPARK_02) segue em aberto, sem nenhuma alteração de código feita.

Além disso, existe uma nova frente estratégica registrada nesta atualização documental, ainda **sem nenhuma implementação técnica**:

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

Não iniciar essa etapa antes de resolver a decisão dos espumantes e validar a nova frente "Encontrar vinhos para comprar" (ver seções correspondentes mais abaixo). A jornada funcional (Fase 14 + correção dos askPhrases) já está commitada e publicada — isso não é mais o bloqueio.

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

Existem 11 perfis em `content/profiles/`:

```text
RED_01 — Tinto Leve e Vivo
RED_02 — Tinto Macio e Frutado
RED_03 — Tinto Médio e Equilibrado
RED_04 — Tinto Intenso e Estruturado

WHITE_01 — Branco Leve e Refrescante
WHITE_02 — Branco Aromático e Frutado
WHITE_03 — Branco Cremoso e Estruturado

ROSE_01 — Rosé Seco e Refrescante

SPARK_01 — Espumante Seco e Refrescante
SPARK_02 — Espumante Frutado e Aromático
SPARK_03 — Espumante Doce e Aromático
```

Todos utilizam versão `"0.1"`.

Nenhum dos 11 arquivos JSON de perfil foi alterado durante a Fase 14 propriamente dita (confirmado por `git diff --stat` no momento da Fase 14 — `content/profiles/` não aparecia na lista). Em etapa separada e posterior, os 11 `askPhrase` foram corrigidos para remover a redundância com "nessa faixa de preço" — ver seção "ASKPHRASES — PENDÊNCIA RESOLVIDA". Nenhum outro campo dos 11 perfis foi tocado nessa correção.

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

A lógica de espumante dentro dessa árvore (`sparklingSweetness`, `aromaticStyleAnyBubbles`, opção `sparkling_dry` em `styleAnyBubbles`) **não foi alterada** — segue com o eixo de doçura considerado inadequado. Ver seção "ESPUMANTES" abaixo antes de mexer nesses nós.

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

Resultado da última execução (`npm test -- --run`):

```text
Test Files  4 passed (4)
     Tests  113 passed (113)
```

A queda de **123 para 113 testes é esperada** e não é um problema — decorre da remoção de:

* testes de `rose_sweet` e do status `unsupported` no microdiagnóstico (nó que deixou de existir);
* o bloco `describe("buildRoutePresentation — budgetLabel")` inteiro em `buildRoutePresentation.test.ts` (o campo `budgetLabel` foi removido, então o teste que o cobria também foi removido, não deixado quebrado).

Não é necessário "recuperar" o número 123 — o Handoff anterior já previa essa queda e instruía a não mantê-la artificialmente.

Build atual (`npm run build`):

```text
✓ built in 522ms
```

`tsc -b && vite build` sem erros. Saída: `dist/index.html` (0.77 kB), `dist/assets/index-*.css` (9.17 kB), `dist/assets/index-*.js` (249.52 kB).

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

Esta correção é puramente textual/genérica em todos os 11 perfis, incluindo os três de espumante. Ela **não representa nenhuma decisão conceitual sobre espumantes** — a revisão da pergunta/eixo de diferenciação dos espumantes continua **🔴 PENDENTE**, exatamente como antes. Ver seção "ESPUMANTES" abaixo.

---

==================================================
ESPUMANTES
==================================================

# 18. ESPUMANTES — STATUS GERAL

🔴 PENDENTE DE DECISÃO FUNCIONAL/ENOLÓGICA

Confirmado por auditoria: **nenhuma lógica de espumantes foi alterada durante a Fase 14, nem durante a correção dos askPhrases.** `content/profiles/SPARK_01.json`, `SPARK_02.json` e `SPARK_03.json` só receberam a correção textual genérica do `askPhrase` descrita na seção "ASKPHRASES — PENDÊNCIA RESOLVIDA" — nenhum outro campo mudou. Em `src/journey/journeyOptions.ts`, `PALATE_TITLES.sparkling` e as 4 opções de `PALATE_OPTIONS_BY_WINE_TYPE.sparkling` seguem idênticas ao estado anterior (o único diff nesse arquivo é a remoção de `rose` do tipo `PalateAskedWineTypeId`). Em `rules/microDiagnosis/questionTree.ts`, os nós `sparklingSweetness` e `aromaticStyleAnyBubbles` seguem com prompt e opções idênticos.

NÃO IMPLEMENTAR NOVA LÓGICA DE ESPUMANTES AUTOMATICAMENTE.

## Pergunta atual dos espumantes

A jornada atual possui pergunta equivalente a "Que tipo de espumante parece mais gostoso?", com opções girando em torno de seco / frutado / doce / não sei. O microdiagnóstico também usa doçura como eixo em `sparklingSweetness` e `aromaticStyleAnyBubbles`. Essa abordagem foi considerada inadequada.

## Princípio já decidido conceitualmente

* frutado NÃO significa doce;
* aromático NÃO significa doce;
* açúcar não deve ser o principal eixo para diferenciar estilos não-doces;
* evitar "pouca sensação de açúcar";
* evitar "mais forte" quando a intenção é estrutura/corpo;
* doce continua sendo escolha legítima e separada.

## Direção em estudo (NÃO aprovada para implementação)

> Como você quer aproveitar esse espumante?

Com conceitos como: leve e fresco (brindar/aperitivo/beliscar) / mais presença à mesa (acompanhar pratos com mais sabor) / doce e aromático (sobremesa ou preferência deliberada) / não sei.

## Conclusões já documentadas da análise (preservadas, ainda válidas)

* **SPARK_01** ("Espumante Seco e Refrescante") sustenta majoritariamente uma experiência leve/fresca/aperitivo/brindar/beliscar. Ressalva: algumas pistas adicionais (Champagne Brut, Franciacorta Brut, Trento DOC Brut) têm leitura mais gastronômica — considerar na revisão futura.
* **SPARK_02** ("Espumante Frutado e Aromático") **NÃO sustenta automaticamente** "mais encorpado e gastronômico". O perfil é hoje construído em torno de espumante rosé, frutas vermelhas, floral, morango, framboesa, cereja, "fácil de beber", "descontraído" — nada sobre corpo, estrutura ou harmonização com pratos de mais presença. Não mapear uma nova opção gastronômica para esse perfil sem revisão enológica explícita.
* **SPARK_03** ("Espumante Doce e Aromático") continua conceitualmente coerente com doce/aromático/sobremesa/preferência deliberada por doce.
* O fallback "Não sei" dos espumantes ainda usa o mesmo eixo de doçura (`sparklingSweetness`) e ainda precisa ser redesenhado em torno de sensação/ocasião/forma de consumo — não implementar até a decisão sobre os perfis estar concluída.

## Arquivos potencialmente impactados (nenhum alterado até agora)

```text
src/journey/journeyOptions.ts
rules/microDiagnosis/questionTree.ts
rules/microDiagnosis/types.ts
rules/microDiagnosis/evaluateMicroDiagnosis.test.ts
rules/recommendation/palateOptions.ts
rules/recommendation/resolveProfile.ts
content/profiles/SPARK_02.json
```

NÃO alterar esses arquivos por causa dos espumantes sem aprovação funcional explícita. A nova frente "Encontrar vinhos para comprar" (ver seção correspondente mais abaixo) **não deve ser misturada** com a decisão pendente dos espumantes — são pendências independentes.

---

==================================================
GITHUB / DEPLOY
==================================================

# 19. GITHUB / DEPLOY — RELAÇÃO ENTRE LOCAL E REMOTO

Último commit publicado conhecido no remoto (`origin/main`) no momento desta atualização documental:

```text
912d372 feat: refine MVP journey and purchase guidance
```

Commits anteriores:

```text
0f05e4b docs: add product technical and handoff specifications
ba5726e fix: add Vercel SPA rewrite
16583f8 feat: establish Vinho Sem Erro MVP foundation
```

IMPORTANTE — este é o ponto central desta seção:

* **GitHub já contém a Fase 14 e a correção dos askPhrases.** O commit `912d372` foi enviado com sucesso para `origin/main` (`0f05e4b..912d372  main -> main`), e o working tree ficou clean logo em seguida.
* Esta atualização documental (a que você está lendo agora) é **posterior** ao commit `912d372` e **ainda não foi commitada** — ela existe apenas nos arquivos `docs/PRODUCT_SPEC.md`, `docs/TECH_SPEC.md` e `docs/HANDOFF.md` do working tree local. Rodar `git status` deve mostrar esses três arquivos como `modified`, sem nenhuma outra alteração.
* **O deploy no Vercel a partir do commit `912d372` não foi confirmado manualmente** nesta atualização documental. Presume-se que o push disparou o deploy automático, mas isso deve ser verificado antes de comunicar a Fase 14 como "no ar" para qualquer pessoa fora da equipe técnica.
* Antes de trabalhar, sempre confirmar via `git status` e `git log -3 --oneline` se existem commits posteriores a este documento.

---

# 20. O QUE NÃO DEVE SER FEITO AGORA

Não implementar ainda:

* nova lógica de espumantes;
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

Não alterar nada. Confirmar que o estado bate com este documento (Fase 14 e correção dos askPhrases já commitadas e enviadas como `912d372`; espumantes pendente; "Encontrar vinhos para comprar" apenas documentada).

## Etapa 2 — Espumantes

Resolver a decisão funcional/enológica dos espumantes (pergunta + eventual revisão de SPARK_02), como etapa própria e isolada.

## Etapa 3 — Validar fontes reais para "Encontrar vinhos para comprar"

Não implementar a funcionalidade ainda. Seguir a investigação descrita na seção "PRÓXIMO EXPERIMENTO" mais abaixo antes de desenhar qualquer integração técnica.

## Etapa 4 — Só depois da jornada, conteúdo e fontes de produto validadas: Supabase

---

# 22. NÃO MISTURAR ESPUMANTES COM AS OUTRAS PENDÊNCIAS

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

Verificar: `/`; `/app`; refresh `/app`; primeira pergunta (sem botão Voltar); voltar; tinto; branco; rosé (deve ir direto para orçamento, sem pergunta de paladar); espumante atual; "Não sei"; complemento de orçamento (sem numeração de progresso); resultado (sem "Seu orçamento" no topo); "Pode pedir assim" (prefixo "Quero gastar..."); feedback; recomeçar.

---

# 25. REGRA PARA COMMITS

Não fazer um commit enorme contendo UX + Supabase + Cloudflare + banco + espumantes + CSS ao mesmo tempo. Preferir commits pequenos e temáticos. Como a Fase 14 já está pronta no working tree como um bloco coeso, uma divisão razoável seria algo como:

```text
fix: correct home vertical alignment
refactor: simplify rose journey and remove unsupported path
refactor: reorder journey and move budget after profile resolution
style: apply visual refinement (Fraunces, Manrope, new palette)
```

Isso é uma sugestão de organização, não uma instrução para commitar agora — commit só acontece com pedido explícito.

---

# 26. ESTADO DE DEPLOY VERSUS ESTADO LOCAL

Ver seção "GITHUB / DEPLOY" acima — é o ponto mais importante deste documento no momento: o Vercel está atrás do working tree local. Git local é a fonte imediata de verdade, não a interface do Vercel.

---

# 27. DOCUMENTAÇÃO AINDA NÃO É PROVA DE IMPLEMENTAÇÃO

Mesmo este HANDOFF, atualizado após auditoria real, pode ficar desatualizado assim que o código mudar de novo. Sempre verificar código + HANDOFF antes de agir, nunca só um dos dois. Se este documento e o `git diff` divergirem, o `git diff` é a fonte da verdade.

---

# 28. PRÓXIMO MARCO TÉCNICO

A jornada funcional V1 já está implementada, testada, commitada e enviada (Fase 14 completa, com a correção dos askPhrases, no commit `912d372`). O que falta antes do próximo marco:

* confirmar o deploy no Vercel a partir de `912d372`;
* resolver a decisão dos espumantes (antes do beta amplo);
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

## ✅ Implementado, testado, commitado e enviado (`912d372`)

* React + TypeScript + Vite
* Git
* GitHub
* Vercel
* SPA rewrite
* motor de recomendação original
* 11 perfis
* feedback de clareza V1
* refinamento visual (Fraunces, Manrope, nova paleta, ajustes da tela de resultado, feedback visual)
* Fase 14 completa (jornada nova, remoção de IntentStep, botão Voltar corrigido)
* preço como complemento opcional pós-resolução, fora da progressão diagnóstica
* rosé direto para ROSE_01
* remoção de `rose_sweet` e do status `unsupported` (incluindo `MicroDiagnosisUnsupportedStep.tsx`)
* remoção de `RoutePresentation.budgetLabel` e de "Seu orçamento" do resultado
* novos prefixos "Quero gastar..."
* correção do bug vertical da Home
* correção dos 11 `askPhrase` (remoção da redundância com "nessa faixa de preço", sem tocar em nenhum outro campo)
* 113/113 testes passando
* build aprovado (`npm run build` sem erros)
* working tree clean confirmado logo após o commit `912d372`

## 🔴 Pendente de decisão funcional/enológica

* nova lógica dos espumantes (pergunta e eixo de diferenciação)
* papel real de SPARK_02 (não é automaticamente "mais encorpado e gastronômico")
* eventual segundo estilo não-doce de espumante
* novo fallback "Não sei" dos espumantes, sem eixo de açúcar

## 🟣 Nova frente estratégica (documentada, sem código)

* "Encontrar vinhos para comprar" — funcionalidade planejada para depois do diagnóstico
* princípio central: afiliado nunca é critério enológico; baixa confiança = não recomendar
* fontes candidatas a validar: Awin (Decanter, Wine, Evino, Descorcha/Concha y Toro, Divvino, Zé Delivery), Amazon, Mercado Livre — nenhuma confirmada
* arquitetura (Product Sources, Product Matching Engine, schema `ProductSource`) apenas conceitual em `docs/TECH_SPEC.md`

## ⏳ Futuro

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
