# Vinho Sem Erro — Technical Specification

**Produto:** Vinho Sem Erro
**Marca:** SaporeDiVino
**Documento:** Especificação Técnica
**Status:** MVP em desenvolvimento
**Frontend:** React + TypeScript + Vite
**Hospedagem atual:** Vercel
**Backend/Banco planejado:** Vercel Functions + Supabase/PostgreSQL

---

# 1. OBJETIVO DESTE DOCUMENTO

Este documento registra a arquitetura técnica, estrutura do código, regras de implementação, decisões de infraestrutura e restrições do projeto Vinho Sem Erro.

Ele existe para permitir que qualquer desenvolvedor ou agente de IA consiga continuar o projeto sem depender do histórico de uma conversa anterior.

Este documento NÃO indica sozinho o que já foi implementado.

Para saber o estado real do projeto, consultar:

`docs/HANDOFF.md`

Para entender decisões funcionais e de produto, consultar:

`docs/PRODUCT_SPEC.md`

---

# 2. ORDEM OBRIGATÓRIA PARA QUALQUER NOVA IA OU DESENVOLVEDOR

Antes de alterar qualquer código:

1. Ler `docs/PRODUCT_SPEC.md`
2. Ler `docs/TECH_SPEC.md`
3. Ler `docs/HANDOFF.md`
4. Executar `git status`
5. Verificar o último commit
6. Verificar alterações locais ainda não commitadas
7. Separar claramente:

   * implementado;
   * decidido, mas ainda não implementado;
   * pendente de decisão.

Nunca assumir que algo descrito no Product Spec já está no código.

O `HANDOFF.md` é a fonte principal para saber onde o desenvolvimento parou.

---

# 3. STACK PRINCIPAL

## Frontend

* React
* TypeScript
* Vite

## Gerenciamento de pacotes

* npm

## Testes

* Vitest

## Versionamento

* Git
* GitHub

## Hospedagem

* Vercel

## Backend planejado

* Vercel Functions

## Banco planejado

* Supabase
* PostgreSQL

---

# 4. ARQUITETURA ALVO

A arquitetura desejada para o MVP é:

```text
React + TypeScript + Vite
          ↓
        Vercel
          ↓
        /api/*
          ↓
Supabase / PostgreSQL
```

O navegador deve consumir o frontend normalmente.

Quando persistência for necessária, operações sensíveis devem passar por funções server-side.

---

# 5. ARQUITETURA ORIGINAL LEGADA

O projeto foi inicialmente criado considerando:

```text
React/Vite
↓
Cloudflare Static Assets
↓
Cloudflare Worker
↓
Cloudflare D1
```

Por isso ainda existem arquivos relacionados à Cloudflare.

Exemplos:

```text
worker/
wrangler.toml
tsconfig.worker.json
```

O banco D1 NÃO chegou a ser implementado.

Não existe base de dados D1 com informações reais que precise ser migrada.

---

# 6. REGRA SOBRE CLOUDFLARE

Não apagar automaticamente os arquivos da arquitetura original.

A remoção deve acontecer em uma etapa específica e controlada.

Antes de remover Cloudflare:

1. confirmar Vercel estável;
2. configurar backend Vercel;
3. conectar Supabase;
4. confirmar que nenhum código depende do Worker;
5. executar testes;
6. executar build;
7. revisar diff.

Cloudflare poderá continuar sendo utilizada somente como DNS futuramente.

---

# 7. REPOSITÓRIO

Repositório GitHub:

```text
vinho-sem-erro
```

Branch principal:

```text
main
```

Remote:

```text
origin
```

---

# 8. COMMITS DE REFERÊNCIA

Primeiro commit estrutural conhecido:

```text
16583f8 feat: establish Vinho Sem Erro MVP foundation
```

Commit que corrigiu SPA no Vercel:

```text
ba5726e fix: add Vercel SPA rewrite
```

Esses commits são referências históricas.

Sempre consultar Git e `HANDOFF.md` para saber se existem commits posteriores.

---

# 9. VERCEL

O projeto está conectado ao GitHub.

Fluxo de deploy:

```text
GitHub main
↓
Vercel
↓
Build automático
↓
Deployment
```

Framework:

```text
Vite
```

Build:

```bash
npm run build
```

Output:

```text
dist
```

---

# 10. SPA E ROTA /APP

O primeiro deploy funcionava em:

```text
/
```

mas `/app` retornava erro porque o Vite gera uma SPA.

Foi criado:

```text
vercel.json
```

com configuração:

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

Depois disso:

* `/` funciona;
* `/app` funciona;
* refresh em `/app` funciona.

---

# 11. FUTURAS FUNÇÕES /API E VERCEL.JSON

Quando forem adicionadas funções:

```text
/api/*
```

é obrigatório verificar se o rewrite da SPA não interfere nessas funções.

Não alterar `vercel.json` silenciosamente.

Validar explicitamente:

```text
/
/app
/api/*
```

---

# 12. ROTEAMENTO FRONTEND

O projeto atualmente NÃO usa React Router.

O roteamento é simples e baseado em:

```ts
window.location.pathname
```

Comportamento conceitual:

```text
/      → HomePage
/app   → AppPage
```

Existe tratamento para:

```text
/app/
```

Não instalar React Router sem necessidade concreta.

---

# 13. ESTRUTURA DO PROJETO

Estrutura aproximada:

```text
/
├── content/
│   ├── profiles/
│   ├── README.md
│   ├── index.ts
│   └── types.ts
│
├── rules/
│   ├── recommendation/
│   ├── routePresentation/
│   ├── microDiagnosis/
│   ├── feedback/
│   └── README.md
│
├── src/
│   ├── components/
│   ├── config/
│   ├── feedback/
│   ├── journey/
│   ├── pages/
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
│
├── public/
├── worker/
├── index.html
├── package.json
├── package-lock.json
├── vite.config.ts
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
├── tsconfig.worker.json
├── wrangler.toml
├── vercel.json
├── CLAUDE.md
└── README.md
```

Documentação desejada:

```text
docs/
├── PRODUCT_SPEC.md
├── TECH_SPEC.md
└── HANDOFF.md
```

---

# 14. SEPARAÇÃO DE RESPONSABILIDADES

## `content/`

Conteúdo enológico.

## `rules/`

Lógica determinística do produto.

## `src/`

Interface React.

## Infraestrutura futura

Backend, API, banco e persistência.

Regra:

Não colocar lógica central de recomendação dentro de componentes React se ela puder ser implementada como função pura.

---

# 15. BANCO DE CONHECIMENTO

Os perfis vivem em:

```text
content/profiles/
```

Existem atualmente 11 perfis.

Estrutura aproximada:

```ts
WineProfile {
  id
  version
  category
  name
  customerSummary
  internalCharacteristics
  mainClues
  additionalClues
  internalLibrary
  labelClues
  avoid
  backupProfileId
  askPhrase
  whyThisRoute
}
```

Tipo auxiliar:

```ts
WineClue {
  name
  note?
}
```

Versão conhecida:

```text
"0.1"
```

---

# 16. PERFIS EXISTENTES

## Tintos

```text
RED_01 — Tinto Leve e Vivo
RED_02 — Tinto Macio e Frutado
RED_03 — Tinto Médio e Equilibrado
RED_04 — Tinto Intenso e Estruturado
```

## Brancos

```text
WHITE_01 — Branco Leve e Refrescante
WHITE_02 — Branco Aromático e Frutado
WHITE_03 — Branco Cremoso e Estruturado
```

## Rosé

```text
ROSE_01 — Rosé Seco e Refrescante
```

## Espumantes

```text
SPARK_01 — Espumante Seco e Refrescante
SPARK_02 — Espumante Frutado e Aromático
SPARK_03 — Espumante Doce e Aromático
```

Os JSONs são a fonte de verdade do conteúdo completo.

---

# 17. MOTOR DE RECOMENDAÇÃO

Local:

```text
rules/recommendation/
```

Arquivos principais:

```text
types.ts
palateOptions.ts
resolveProfile.ts
resolveProfile.test.ts
index.ts
README.md
```

Função central:

```ts
resolveProfile(...)
```

Características:

* determinístico;
* testável;
* sem IA;
* sem APIs;
* sem banco;
* independente do React.

---

# 18. MAPEAMENTO ATUAL DE PERFIS

Mapeamento conhecido:

```text
red_light → RED_01
red_soft_fruity → RED_02
red_balanced → RED_03
red_intense → RED_04

white_light_refreshing → WHITE_01
white_aromatic_fruity → WHITE_02
white_creamy_structured → WHITE_03

rose_dry_refreshing → ROSE_01
rose_fruity_refreshing → ROSE_01

sparkling_dry_refreshing → SPARK_01
sparkling_fruity_aromatic → SPARK_02
sparkling_sweet_aromatic → SPARK_03
```

Existem também opções equivalentes a `unknown`.

---

# 19. REGRA DE FONTE ÚNICA DE VERDADE

O perfil recomendado deve ser derivado das respostas.

Não criar um campo persistente intermediário de `profileId` apenas para armazenar o resultado.

Usar:

```ts
resolveProfile(...)
```

ou:

```ts
evaluateMicroDiagnosis(...)
```

As respostas são a fonte principal.

O perfil é consequência.

---

# 20. ROUTE PRESENTATION

Local:

```text
rules/routePresentation/
```

Responsável por adaptar a apresentação da recomendação sem alterar arbitrariamente o perfil.

Arquivos principais:

```text
types.ts
reasonPresentation.ts
budgetPresentation.ts
buildRoutePresentation.ts
buildRoutePresentation.test.ts
index.ts
README.md
```

---

# 21. REASONS

Tipos conhecidos:

```text
everyday
relax
guests
special
explore
```

Eles influenciam apresentação.

Não devem mudar silenciosamente o perfil enológico.

---

# 22. BUDGET IDS

Faixas conhecidas:

```text
under_50
50_80
80_120
120_200
over_200
open
```

Esses ids podem continuar existindo mesmo com a mudança de papel do preço.

---

# 23. NOVA REGRA TÉCNICA PARA PREÇO

Preço NÃO determina o perfil.

Arquitetura correta:

```text
respostas sensoriais
↓
perfil resolvido
↓
faixa opcional
↓
frase de compra
```

Não:

```text
faixa
↓
perfil
```

---

# 24. PERGUNTA DE PREÇO

A experiência desejada é:

```text
Quer incluir uma faixa de preço na hora de pedir ajuda?
```

Opções:

```text
Até R$50
R$50 a R$80
R$80 a R$120
R$120 a R$200
Mais de R$200
Prefiro não definir
```

Essa etapa é complementar.

Não faz parte do diagnóstico sensorial.

---

# 25. ASK PHRASE

Cada perfil possui:

```text
askPhrase
```

A faixa de preço deve ser adicionada por composição.

Não fazer parsing do `askPhrase`.

Não inserir texto no meio da frase.

Arquitetura:

```text
pricePrefix + askPhrase
```

---

# 26. PREFIXOS DE PREÇO APROVADOS

```text
Quero gastar até R$50.

Quero gastar entre R$50 e R$80.

Quero gastar entre R$80 e R$120.

Quero gastar entre R$120 e R$200.

Quero gastar mais de R$200.
```

Para `open`:

não adicionar prefixo.

---

# 27. PENDÊNCIA NAS ASKPHRASES

Verificar se algum `askPhrase` atual já contém expressão equivalente a:

```text
nessa faixa de preço
```

Se existir redundância:

NÃO alterar automaticamente o conteúdo do perfil.

Informar quais perfis são afetados e aguardar revisão.

---

# 28. BUDGETLABEL

Se, após a nova implementação, o campo:

```ts
RoutePresentation.budgetLabel
```

ficar sem uso, ele deve ser removido da estrutura pública.

Não manter campo morto sem justificativa.

---

# 29. MICRODIAGNÓSTICO

Local:

```text
rules/microDiagnosis/
```

Arquivos principais:

```text
types.ts
questionTree.ts
evaluateMicroDiagnosis.ts
evaluateMicroDiagnosis.test.ts
index.ts
README.md
```

Função central:

```ts
evaluateMicroDiagnosis(state)
```

Características:

* data-driven;
* determinístico;
* poucas perguntas;
* sem IA;
* sem chamadas externas.

---

# 30. ENTRADAS DO MICRODIAGNÓSTICO

Existem fluxos equivalentes a:

```text
wineTypeUnknown
palateUnknown
```

Ele serve para ajudar quem não consegue responder diretamente.

Não deve virar chatbot.

---

# 31. ROSÉ — DECISÃO TÉCNICA APROVADA

Como há apenas:

```text
ROSE_01
```

a jornada desejada é:

```text
wineType = rose
↓
ROSE_01
```

Sem pergunta artificial de paladar.

---

# 32. ROSE_SWEET

Existe/existia lógica:

```text
rose_sweet
```

que levava a:

```text
unsupported
```

Decisão:

remover.

Se for o único caso `unsupported`, remover também:

* tipo;
* nó;
* branch;
* componente;
* testes;
* documentação.

Consultar `HANDOFF.md` para confirmar se já foi implementado.

---

# 33. ESPUMANTES — ESTADO TÉCNICO ATUAL

A análise identificou múltiplos pontos de entrada para espumantes.

## Jornada principal

Arquivo:

```text
src/journey/journeyOptions.ts
```

A lógica atual trabalha aproximadamente com:

```text
dry
fruity
sweet
unknown
```

## Microdiagnóstico

Existem ramos como:

```text
sparklingSweetness
aromaticStyleAnyBubbles
styleAnyBubbles
```

---

# 34. PROBLEMA ATUAL DOS ESPUMANTES

A lógica converge excessivamente para:

```text
seco
frutado
doce
```

Isso utiliza doçura como eixo mais do que o desejado.

Decisão funcional ainda pendente.

---

# 35. SPARK_01

O conteúdo atual sustenta majoritariamente:

* leve;
* fresco;
* aperitivo;
* brindar;
* petiscar.

Algumas referências adicionais têm potencial mais gastronômico.

Não alterar automaticamente até revisão final.

---

# 36. SPARK_02

SPARK_02 atual é construído principalmente em torno de:

* espumante rosé;
* fruta;
* flores;
* frutas vermelhas;
* estilo fácil de beber;
* estilo descontraído.

Ele NÃO sustenta automaticamente:

```text
mais encorpado e gastronômico
```

Portanto:

NÃO remapear uma opção gastronômica para SPARK_02 sem revisão enológica explícita.

---

# 37. SPARK_03

SPARK_03 atual continua coerente com:

* doce;
* aromático;
* sobremesa;
* preferência deliberada por estilo doce.

---

# 38. REGRA PARA ALTERAÇÃO DOS ESPUMANTES

Até decisão funcional final:

NÃO alterar automaticamente:

```text
PalateOptionId
resolveProfile
questionTree
SPARK_02.json
```

Uma IA deve parar e pedir aprovação antes de modificar esses conceitos.

---

# 39. JOURNEY

Local:

```text
src/journey/
```

Arquivos principais:

```text
JourneyProvider.tsx
WineJourney.tsx
journeyOptions.ts
types.ts
steps/
```

---

# 40. STEPS HISTORICAMENTE EXISTENTES

Exemplos:

```text
IntentStep
ResultStep
NeedsHelpStep
InvalidStep
MicroDiagnosisUnsupportedStep
```

Alguns devem desaparecer depois das mudanças funcionais aprovadas.

---

# 41. JOURNEY STATE

O estado contém informações equivalentes a:

```text
intent
reason
budget
wineType
palateOptionId
```

Existe também histórico de navegação.

O estado do microdiagnóstico é separado.

Não adicionar campos redundantes.

---

# 42. JORNADA FUNCIONAL ALVO

A arquitetura funcional desejada é:

```text
/app
↓
reason
↓
wineType
↓
palate ou microDiagnosis quando realmente necessário
↓
perfil resolvido
↓
price opcional
↓
result
```

A intenção `for_me` pode ser assumida internamente.

---

# 43. REMOÇÃO DA INTENTSTEP

A tela de intenção deve ser removida do MVP atual.

A entrada em `/app` deve ir para:

```text
reason
```

Não necessariamente eliminar toda possibilidade futura de intent.

Eliminar apenas código visual/morto que não seja necessário.

---

# 44. BOTÃO VOLTAR

Ao tornar `reason` a primeira tela:

não deixar um botão:

```text
← Voltar
```

visível e sem ação.

Tratar explicitamente.

---

# 45. PROGRESSO

A barra de progresso deve representar apenas perguntas necessárias para encontrar a Rota.

A etapa opcional de preço não deve parecer parte do cálculo do perfil.

Quando preço aparece:

```text
perfil já resolvido
```

---

# 46. RESULTSTEP

Local:

```text
src/journey/steps/ResultStep.tsx
```

Responsabilidades:

* mostrar perfil;
* mostrar contexto;
* mostrar pistas;
* mostrar label clues;
* mostrar avoid;
* mostrar askPhrase;
* mostrar whyThisRoute;
* integrar feedback.

Não transformar ResultStep em motor de negócio.

---

# 47. PREÇO NO RESULTADO

A faixa de preço não deve aparecer como atributo do perfil.

Remover apresentação equivalente a:

```text
Seu orçamento: R$50 a R$80
```

O preço deve aparecer principalmente dentro de:

```text
Pode pedir assim
```

---

# 48. FEEDBACK

Lógica:

```text
rules/feedback/
```

Interface:

```text
src/feedback/
```

Feedback V1 de clareza já existe.

Estados:

```text
clear
partial
lost
```

Razões:

```text
wanted_examples
hard_terms
taste_mismatch
situation_mismatch
other
```

---

# 49. FEEDBACK STATE

Estrutura conceitual:

```ts
{
  clarity,
  clarityReason,
  comment,
  submitted
}
```

Existem funções puras para manipular esse estado.

---

# 50. PERSISTÊNCIA DO FEEDBACK

Ainda não existe persistência remota.

O feedback atualmente vive apenas no frontend/memória.

Refresh pode perder informações.

Não existe ainda:

* Supabase integrado;
* endpoint persistente;
* login;
* histórico remoto.

---

# 51. MOMENTOS FUTUROS DE FEEDBACK

Já existem conceitos para:

## Momento B

Resultado da escolha.

## Momento C

Resultado após provar o vinho.

Não considerar esses fluxos implementados.

---

# 52. SUPABASE

Existe projeto Supabase criado:

```text
SaporeDiVino Digital
```

Objetivo:

infraestrutura de produtos digitais da marca.

---

# 53. SEGURANÇA SUPABASE

Secret key é:

```text
SERVER ONLY
```

Nunca colocar secret em:

```text
src/
VITE_*
Git
README
docs
logs
frontend
```

---

# 54. VARIÁVEIS FUTURAS

Conceitualmente:

```text
SUPABASE_URL
SUPABASE_SECRET_KEY
```

Confirmar nomes no momento da implementação.

Não usar prefixo `VITE_` para segredo.

---

# 55. BACKEND PLANEJADO

Fluxo:

```text
Browser
↓
Vercel Function
↓
Supabase
```

A função server-side deverá:

* validar método HTTP;
* validar payload;
* limitar texto;
* validar ids;
* não confiar no browser;
* não expor secrets;
* retornar JSON controlado.

---

# 56. MODELO DE DADOS FUTURO

Tabelas conceitualmente consideradas:

```text
route_sessions
route_clarity_feedback
route_outcomes
route_taste_feedback
```

Esses nomes ainda são hipóteses.

Não assumir que tabelas existem.

---

# 57. MIGRATIONS

Quando Supabase for conectado:

preferir migration SQL versionada no Git.

Estrutura possível:

```text
supabase/
└── migrations/
    └── YYYYMMDDHHMM_initial.sql
```

Mesmo que SQL Editor seja usado inicialmente, manter migration local.

---

# 58. ORDEM RECOMENDADA PARA SUPABASE

Somente depois de estabilizar a jornada funcional:

1. analisar retirada de Cloudflare;
2. desenhar schema;
3. criar migration;
4. aplicar no Supabase;
5. criar funções server-side;
6. configurar env vars;
7. persistir primeiro feedback de clareza;
8. testar;
9. expandir depois.

---

# 59. PRIVACIDADE

Coletar o mínimo necessário.

Evitar armazenar:

* CPF;
* endereço;
* telefone;
* geolocalização precisa;
* dados pessoais desnecessários.

Comentários de feedback são opcionais.

---

# 60. LIMITE DE COMENTÁRIO

O feedback utiliza limite aproximado de:

```text
500 caracteres
```

Esse limite deve ser validado também no backend futuramente.

Não confiar somente no `maxLength` do navegador.

---

# 61. `.GITIGNORE`

Proteções relevantes:

```text
.env
.env.*
!.env.example
.vercel
node_modules
dist
.wrangler
.dev.vars
```

Não remover essas proteções sem necessidade.

---

# 62. SEGURANÇA DO REPOSITÓRIO

Antes do primeiro commit foi realizada busca por:

* env files;
* secrets;
* service_role;
* private keys;
* tokens;
* credenciais hardcoded.

Nenhum segredo foi encontrado.

Repetir inspeção antes de commits que introduzam infraestrutura.

---

# 63. TESTES

Framework:

```text
Vitest
```

Último estado conhecido antes das mudanças funcionais pendentes:

```text
4 test files passed
123 tests passed
```

Esse número pode mudar.

Não preservar “123” artificialmente.

Cobertura coerente é mais importante que quantidade fixa.

---

# 64. ÁREAS TESTADAS

Principais suítes:

```text
recommendation
routePresentation
microDiagnosis
feedback
```

A lógica central utiliza funções puras, o que facilita testes determinísticos.

---

# 65. TESTES DA JORNADA

Atualmente não existe uma suíte robusta de testes React/E2E para:

* JourneyProvider;
* WineJourney;
* navegação completa;
* fluxo de telas.

Mudanças grandes na jornada devem ser validadas manualmente.

---

# 66. BUILD

Comando:

```bash
npm run build
```

Inclui:

```text
tsc -b
vite build
```

Antes de qualquer commit funcional:

```bash
npm test
npm run build
```

---

# 67. REFINAMENTO VISUAL

Uma rodada de refinamento visual foi realizada localmente.

Arquivos reportados:

```text
index.html
src/index.css
src/journey/steps/ResultStep.tsx
src/feedback/ClarityFeedbackBlock.tsx
```

Essa rodada passou:

```text
123/123 testes
npm run build
```

No último estado conhecido:

a alteração ainda não tinha sido commitada.

Confirmar com:

```bash
git status
```

---

# 68. TIPOGRAFIA

Fontes:

```text
Fraunces
Manrope
```

Carregadas por Google Fonts via:

```text
index.html
```

Sem pacote npm específico.

Manter fallback de sistema.

---

# 69. CSS

Principal arquivo:

```text
src/index.css
```

Direção visual:

* fundo crème;
* bordô profundo;
* dourado dessaturado;
* poucas bordas;
* sombras sutis;
* mobile-first;
* resultado hierarquizado.

---

# 70. BUG VISUAL DA HOME

Foi identificado comportamento equivalente a:

```css
.brand-mark-large {
  margin: auto 0 32px;
}
```

O `margin-top: auto` empurra o conteúdo para baixo.

Correção aprovada:

remover esse comportamento.

Confirmar no HANDOFF se já foi implementado.

---

# 71. MOBILE FIRST

Viewport de referência:

aproximadamente:

```text
375px
```

Também testar desktop.

Não transformar desktop em dashboard.

---

# 72. ACESSIBILIDADE BÁSICA

Preservar:

* foco visível;
* contraste;
* botões acessíveis;
* estado selecionado;
* labels compreensíveis;
* feedback além de cor.

---

# 73. DEPENDÊNCIAS

Antes de instalar pacote:

explicar:

1. por que é necessário;
2. qual problema resolve;
3. alternativa sem pacote;
4. impacto no bundle;
5. manutenção futura.

Evitar bibliotecas pesadas no MVP.

---

# 74. NÃO MODERNIZAR SEM NECESSIDADE

Não trocar automaticamente:

* Vite;
* React;
* TypeScript;
* CSS próprio.

Não converter para:

* Next.js;
* framework maior;
* arquitetura complexa;

sem necessidade de produto.

---

# 75. AUTENTICAÇÃO

Não implementada.

Não necessária para o beta inicial.

Não obrigar cadastro para experimentar a Rota.

---

# 76. PAGAMENTO

Não implementado no app.

Plataformas futuras possíveis:

* Hotmart;
* Kiwify;
* Eduzz.

Não adicionar plataforma estrangeira automaticamente.

---

# 77. ANALYTICS

Cloudflare Analytics Engine pertence à arquitetura original.

Não assumir que será utilizado.

Analytics deverá ser redesenhado após estabilização da nova arquitetura.

---

# 78. BACKUP PROFILE

Os perfis possuem:

```text
backupProfileId
```

Mas não existe ainda uma experiência completa de Plano B.

Não tratar esse campo como funcionalidade pronta.

---

# 79. BRAND CONFIG

Existe:

```text
src/config/brand.ts
```

Usar configuração central quando possível.

Evitar duplicar marca/tagline em múltiplos arquivos.

---

# 80. LOGO SAPOREDIVINO

Existe logo oficial.

Não criar logo alternativo.

Até integração do asset oficial:

preservar:

```text
por SaporeDiVino
```

---

# 81. REGRA DE ALTERAÇÃO CONTROLADA

Fluxo recomendado:

```text
analisar
↓
não alterar ainda
↓
reportar impacto
↓
aprovar
↓
implementar escopo pequeno
↓
npm test
↓
npm run build
↓
git diff
↓
teste manual
↓
commit
↓
push
```

---

# 82. CHECKLIST ANTES DE COMMIT

Executar:

```bash
git status
npm test
npm run build
git diff
```

Verificar:

* arquivos corretos;
* escopo;
* testes;
* secrets;
* alterações inesperadas.

---

# 83. CHECKLIST ANTES DE PUSH

Executar:

```bash
git log -1 --oneline
git status
```

Depois:

```bash
git push origin main
```

---

# 84. CHECKLIST PÓS-DEPLOY

No Vercel testar:

```text
/
```

```text
/app
```

Refresh em:

```text
/app
```

Depois testar:

* jornada;
* microdiagnóstico;
* resultado;
* “Pode pedir assim”;
* feedback.

Quando `/api` existir:

testar API separadamente.

---

# 85. DOCUMENTAÇÃO

Documentos obrigatórios:

```text
docs/PRODUCT_SPEC.md
docs/TECH_SPEC.md
docs/HANDOFF.md
```

Função:

```text
PRODUCT_SPEC
→ o produto e suas decisões

TECH_SPEC
→ arquitetura e regras técnicas

HANDOFF
→ estado real atual

Git
→ histórico
```

---

# 86. CLAUDE.MD / AGENT INSTRUCTIONS

Recomendação:

adicionar ao `CLAUDE.md`:

```text
Antes de alterar qualquer código, leia:

- docs/PRODUCT_SPEC.md
- docs/TECH_SPEC.md
- docs/HANDOFF.md

Não assuma que decisões documentadas já foram implementadas.

Verifique HANDOFF, git status e último commit antes de trabalhar.
```

---

# 87. HIERARQUIA DE FONTES DE VERDADE

## Conteúdo enológico

```text
content/profiles/*.json
```

## Regras

```text
rules/
```

## Produto

```text
docs/PRODUCT_SPEC.md
```

## Arquitetura

```text
docs/TECH_SPEC.md
```

## Estado atual

```text
docs/HANDOFF.md
```

## Histórico

```text
Git
```

---

# 88. PRINCIPAIS MUDANÇAS FUNCIONAIS AINDA A VERIFICAR NO HANDOFF

Antes de avançar para Supabase, verificar estado real de:

* remoção da tela de intenção;
* nova posição/papel da faixa de preço;
* remoção de orçamento do topo do resultado;
* rosé direto para ROSE_01;
* remoção de `rose_sweet`;
* remoção de `unsupported`;
* correção vertical da Home;
* refinamento visual local;
* revisão dos espumantes.

---

# 89. PENDÊNCIA CRÍTICA: ESPUMANTES

A nova experiência dos espumantes ainda depende de decisão funcional/enológica.

Não implementar automaticamente.

Em particular:

```text
SPARK_02
```

não pode ser transformado silenciosamente em:

```text
mais encorpado e gastronômico
```

A próxima IA deve parar e solicitar decisão antes de alterar esse conceito.

---

# 90. REGRA FINAL TÉCNICA

Quando houver conflito entre:

**sofisticação técnica**

e

**capacidade de validar o MVP com segurança**

priorizar:

**a menor solução técnica confiável.**

O código deve servir à experiência do usuário.

O produto não deve ser alterado apenas para justificar uma arquitetura mais sofisticada.

---

# 91. NOVA FRENTE — "ENCONTRAR VINHOS PARA COMPRAR" (🟣 PLANEJADO, NÃO IMPLEMENTADO)

Decisão de produto correspondente em `docs/PRODUCT_SPEC.md`, seções 50–56. Esta seção e as seguintes (92–95) registram apenas a arquitetura e a estratégia técnica planejadas — **nada abaixo está implementado**. Nenhum arquivo em `rules/`, `src/` ou `content/` foi tocado para esta frente.

---

# 92. FONTES DE PRODUTOS — ESTRATÉGIA

A prioridade **NÃO é** fazer scraping indiscriminado de sites.

Preferência técnica, em ordem:

1. APIs oficiais;
2. feeds de produtos;
3. plataformas de afiliados;
4. catálogos autorizados de parceiros;
5. integrações diretas com lojas.

Evitar depender de scraping de páginas públicas como base estrutural do produto.

Motivos:

* preço pode ficar desatualizado;
* estoque pode mudar;
* estrutura do site pode quebrar;
* informações podem estar incompletas;
* questões de autorização/termos de uso.

---

# 93. PESQUISA INICIAL DE FONTES (CANDIDATOS A VALIDAR — NÃO INTEGRAÇÕES CONFIRMADAS)

IMPORTANTE: tudo nesta seção é **pesquisa preliminar**, não integração confirmada. Termos, comissões, aceitação de Pessoa Física/Pessoa Jurídica, feeds disponíveis e permissões podem mudar e devem ser revalidados diretamente na plataforma antes de qualquer integração.

## AWIN

* plataforma de afiliados;
* possui recursos de product feed para publishers;
* feeds podem incluir, conforme o anunciante: nome, descrição, preço, imagem, disponibilidade, deep link;
* pode permitir que várias lojas sejam acessadas por uma mesma infraestrutura.

Lojas/programas encontrados na pesquisa inicial:

* Decanter;
* Wine;
* Evino;
* Descorcha / Concha y Toro;
* Divvino;
* Zé Delivery.

Decanter foi identificada como candidata especialmente interessante para uma primeira prova de conceito, por ter aparecido na pesquisa como programa da Awin e potencial porta de entrada para teste. **NÃO afirmar ainda que temos acesso ao feed** — isso precisa ser verificado na conta real da Awin.

## AMAZON

Candidata a validar:

* Programa de Associados;
* Product Advertising API;
* precisa verificar elegibilidade, regras e disponibilidade de catálogo de vinhos no Brasil.

## MERCADO LIVRE

Candidata a validar:

* possui APIs oficiais;
* precisa investigar se o modelo de uso atende ao caso de recomendação ao consumidor e quais permissões serão necessárias.

## OUTRAS LOJAS

Wine, Evino, Grand Cru, Mistral, Decanter e outras podem futuramente ser integradas por API, feed, plataforma de afiliados ou parceria direta.

**Não presumir API pública sem confirmação.**

---

# 94. ARQUITETURA PLANEJADA — PRODUCT SOURCES (FUTURA / NÃO IMPLEMENTADA)

Fluxo conceitual:

```text
React/Vite
→ endpoint server-side em /api
→ módulo de Product Sources
→ conectores por fonte autorizada
→ normalização dos produtos
→ Product Matching Engine
→ WineProfile atual
→ filtro/score de compatibilidade
→ resultado para o cliente
```

Estrutura conceitual (schema NÃO definitivo):

```ts
ProductSource {
  sourceId
  sourceName
  sourceType
  productId
  productName
  producer
  url
  affiliateUrl?
  imageUrl?
  price?
  currency?
  availability?
  description?
  grape?
  region?
  country?
  style?
  updatedAt
}
```

Supabase poderá futuramente armazenar:

* fontes;
* produtos normalizados;
* última atualização;
* resultados de matching;
* cliques;
* histórico de disponibilidade;
* feedback do usuário.

**Nada disso está implementado.** Não criar tabelas, migrations, endpoints `/api` ou conectores a partir apenas desta seção — é registro de arquitetura futura, não uma tarefa aprovada para execução.

---

# 95. MATCHING / INTELIGÊNCIA DE PRODUTOS (FUTURO — NÃO IMPLEMENTADO)

A futura inteligência de produtos deve utilizar o `WineProfile` como referência.

Ela **NÃO deve substituir** `resolveProfile()`.

Fluxo:

```text
resolveProfile()
→ WineProfile
→ Product Matching
```

O matching poderá considerar futuramente:

* categoria;
* estilo;
* corpo;
* acidez;
* tanino;
* fruta/aroma;
* doçura;
* madeira;
* região/uva quando forem pistas relevantes;
* descrição do produto;
* faixa de preço;
* disponibilidade.

Precisa ser definida posteriormente uma política explícita de confidence score. Regra provisória:

* **HIGH CONFIDENCE** — informação suficiente e compatibilidade clara.
* **MEDIUM CONFIDENCE** — compatibilidade provável, mas com dados incompletos.
* **LOW CONFIDENCE** — não apresentar como recomendação.

**Ainda NÃO definir thresholds matemáticos.**

Regra técnica que reforça o princípio de produto (ver `docs/PRODUCT_SPEC.md`, seção "Princípio de Segurança e Credibilidade"): a comissão de afiliado de uma fonte **nunca** pode ser usada como input do score de compatibilidade ou como critério de desempate entre candidatos — o score deve refletir só compatibilidade enológica e suficiência de dados.
