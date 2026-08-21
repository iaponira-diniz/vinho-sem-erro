# Vinho Sem Erro — Project Handoff

**Produto:** Vinho Sem Erro
**Marca:** SaporeDiVino
**Documento:** Estado atual e continuidade do projeto
**Status:** MVP em desenvolvimento
**Objetivo:** permitir que outra IA ou desenvolvedor continue o projeto sem depender do histórico das conversas anteriores.
**Última auditoria de código:** feita por leitura direta do working tree (`git diff`, `npm test`, `npm run build`) — não por suposição a partir deste documento.

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

Este projeto possui quatro estados diferentes:

* ✅ implementado e commitado/publicado;
* 🟠 implementado no working tree local, ainda não commitado;
* 🟡 pendente de conteúdo ou de decisão técnica menor;
* 🔴 pendente de decisão funcional/enológica maior.

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

A reestruturação de jornada conhecida como "Fase 14" — remoção da tela de intenção, reordenação da jornada, preço como complemento opcional pós-resolução, resolução direta do rosé, remoção de `rose_sweet`/`unsupported`, correção do bug vertical da Home, refinamento visual (Fraunces/Manrope/paleta) — **já está implementada no working tree local**, com testes e build passando. A pendência de conteúdo dos 11 `askPhrase` (redundância com "nessa faixa de preço") também **já foi corrigida no working tree local**. **Nada disso foi commitado ou publicado ainda.**

Existe uma pendência real, não implementada:

* Uma pendência de **decisão funcional**: a revisão da lógica de espumantes (pergunta e possivelmente SPARK_02) segue em aberto, sem nenhuma alteração de código feita.

---

==================================================
ESTADO IMPLEMENTADO LOCALMENTE, NÃO COMMITADO
==================================================

# 3. FASE 14 — 🟠 IMPLEMENTADO LOCALMENTE, AINDA NÃO COMMITADO

Confirmado por auditoria direta do `git diff` do working tree atual. Tudo abaixo já está no código, não é mais "decidido, não implementado":

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

Nada da lista acima precisa ser reimplementado. O que falta é **decisão de commit/push**, não decisão de produto. Antes de commitar, ver a seção "GITHUB / DEPLOY" e "REGRA PARA COMMITS" mais abaixo.

---

# 4. ESTADO DO GITHUB

Ver seção "GITHUB / DEPLOY" mais abaixo para o estado real e a relação com o working tree local.

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

✅ IMPLEMENTADO (na versão publicada — que está atrás do working tree local, ver seção GITHUB / DEPLOY)

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

Não iniciar essa etapa antes de estabilizar e commitar a jornada funcional (Fase 14 já está pronta localmente — falta só formalizar o commit/push, ver seções acima).

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

🟠 IMPLEMENTADO LOCALMENTE, AINDA NÃO COMMITADO

Já descrito em detalhe na seção 3. Arquivos afetados: `index.html`, `src/index.css`, `src/journey/steps/ResultStep.tsx`, `src/feedback/ClarityFeedbackBlock.tsx`.

Testes (113/113) e build passaram após essa rodada — ver seção TESTES.

---

# 16. BUG VISUAL DA HOME

🟠 IMPLEMENTADO LOCALMENTE, AINDA NÃO COMMITADO

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

# 17. ASKPHRASES — 🟠 IMPLEMENTADO LOCALMENTE / RESOLVIDO NESTA FASE

Pendência original: os 11 perfis tinham `askPhrase` terminando com uma variação de "...O que você recomenda nessa faixa de preço?", redundante com os novos prefixos de orçamento ("Quero gastar..."). Exemplo do problema original — RED_01 com `budget = under_50` produzia:

> "Quero gastar até R$50. Estou procurando um tinto mais leve e fresco [...]. O que você recomenda **nessa faixa de preço**?"

A faixa de preço era mencionada duas vezes na mesma frase.

**Correção aplicada e confirmada por auditoria de código:**

* nos 11 perfis (RED_01, RED_02, RED_03, RED_04, WHITE_01, WHITE_02, WHITE_03, ROSE_01, SPARK_01, SPARK_02, SPARK_03), a referência a "nessa faixa de preço" (ou equivalente, como em RED_04: "Quero algo marcante nessa faixa de preço.") foi removida do `askPhrase`;
* nenhuma outra informação enológica foi alterada em nenhum perfil — `customerSummary`, `internalCharacteristics`, `mainClues`, `additionalClues`, `internalLibrary`, `labelClues`, `avoid`, `backupProfileId`, `whyThisRoute`, `id`, `name`, `version` e `category` permanecem idênticos em todos os 11 arquivos (confirmado por `git diff` linha a linha: exatamente uma linha alterada por arquivo, o campo `askPhrase`);
* os três perfis de espumante (SPARK_01, SPARK_02, SPARK_03) tiveram **somente essa mesma correção textual genérica** — nenhum termo como "Brut", "Moscatel", "pouca sensação de doçura" ou "sem ser muito doce" foi tocado, e nenhuma outra parte do conteúdo desses três perfis mudou;
* busca por "nessa faixa de preço" em `content/profiles/*.json` após a correção: **zero ocorrências**;
* testes após a correção: **113/113 passando** (nenhum teste cobria o texto literal do `askPhrase`, então a contagem não mudou);
* build após a correção: **sucesso**, sem erros.

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

NÃO alterar esses arquivos por causa dos espumantes sem aprovação funcional explícita.

---

==================================================
GITHUB / DEPLOY
==================================================

# 19. GITHUB / DEPLOY — RELAÇÃO ENTRE LOCAL E REMOTO

Último commit publicado conhecido no remoto (`origin/main`):

```text
ba5726e fix: add Vercel SPA rewrite
```

Commit anterior:

```text
16583f8 feat: establish Vinho Sem Erro MVP foundation
```

IMPORTANTE — este é o ponto central desta seção:

* **GitHub e Vercel ainda NÃO contêm a Fase 14.** Tudo listado na seção 3 (jornada nova, preço como complemento, rosé direto, remoção de unsupported, refinamento visual, correção da Home) existe **somente no working tree local**.
* O working tree local está **à frente** do remoto — não o contrário.
* **Não considerar a versão publicada no Vercel como representação do estado local atual.** Se alguém abrir o site publicado hoje, verá o fluxo antigo (com IntentStep, orçamento antes do tipo de vinho, "Seu orçamento" no resultado, rosé com opção docinho/unsupported). Isso é esperado e não indica regressão — é só o remoto desatualizado.
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
* geolocalização.

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

Não alterar nada. Confirmar que o estado bate com este documento (Fase 14 e correção dos askPhrases implementadas localmente, não commitadas; espumantes pendente).

## Etapa 2 — Decidir estratégia de commit

A Fase 14 e a correção dos askPhrases já estão prontas e validadas (testes + build passando). Falta decidir como dividir os commits — ver "REGRA PARA COMMITS" abaixo. Não commitar sem confirmação explícita do responsável pelo produto.

## Etapa 3 — Só depois: espumantes

Resolver a decisão funcional/enológica dos espumantes (pergunta + eventual revisão de SPARK_02), como etapa própria e isolada.

## Etapa 4 — Só depois da jornada e conteúdo estáveis: Supabase

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

A jornada funcional V1 já está implementada e testada localmente (Fase 14 completa, com a correção dos askPhrases). O que falta antes do próximo marco:

* decidir e executar o commit/push da Fase 14 e da correção dos askPhrases;
* resolver a decisão dos espumantes (antes do beta amplo, não necessariamente antes desse commit).

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
RESUMO FINAL
==================================================

# 32. RESUMO FINAL DE STATUS

## ✅ Implementado e publicado

* React + TypeScript + Vite
* Git
* GitHub
* Vercel
* SPA rewrite
* motor de recomendação original
* 11 perfis
* feedback de clareza V1

## 🟠 Implementado localmente, não commitado

* refinamento visual (Fraunces, Manrope, nova paleta, ajustes da tela de resultado, feedback visual)
* Fase 14 completa (jornada nova, remoção de IntentStep, botão Voltar corrigido)
* preço como complemento opcional pós-resolução, fora da progressão diagnóstica
* rosé direto para ROSE_01
* remoção de `rose_sweet` e do status `unsupported` (incluindo `MicroDiagnosisUnsupportedStep.tsx`)
* remoção de `RoutePresentation.budgetLabel` e de "Seu orçamento" do resultado
* novos prefixos "Quero gastar..."
* correção do bug vertical da Home
* correção dos 11 `askPhrase` (remoção da redundância com "nessa faixa de preço", sem tocar em nenhum outro campo)

## 🔴 Pendente de decisão funcional/enológica

* nova lógica dos espumantes (pergunta e eixo de diferenciação)
* papel real de SPARK_02 (não é automaticamente "mais encorpado e gastronômico")
* eventual segundo estilo não-doce de espumante
* novo fallback "Não sei" dos espumantes, sem eixo de açúcar

## ⏳ Futuro

* Supabase integrado
* Vercel Functions
* banco
* persistência
* feedback B/C
* analytics
* pagamentos
* domínio final

---

# 33. PRIMEIRA FRASE PARA UMA NOVA IA

Ao iniciar uma nova sessão com outro agente, usar:

> Antes de fazer qualquer alteração, leia integralmente `docs/PRODUCT_SPEC.md`, `docs/TECH_SPEC.md` e `docs/HANDOFF.md`. Depois rode `git status`, `git log -3 --oneline`, `npm test -- --run` e `npm run build`. Quero que você me diga em que estado real o projeto está e quais diferenças existem entre o código atual e o HANDOFF. Não altere nenhum arquivo ainda.

Esse deve ser sempre o primeiro passo.
