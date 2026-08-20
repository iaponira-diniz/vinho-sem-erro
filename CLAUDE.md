# Vinho Sem Erro — CLAUDE.md

Web app mobile-first que ajuda pessoas que gostam de vinho mas não sabem
escolher a descobrir, em poucos minutos, qual **perfil** de vinho procurar.

Este documento registra decisões de arquitetura para quem (humano ou
Claude) trabalhar neste repositório depois. Estado atual: **fundação
técnica apenas** — nenhuma jornada de perguntas, nenhuma regra de
recomendação e nenhum conteúdo descritivo de perfil foram implementados
ainda. Ver "Status" no fim deste arquivo.

## Stack

- React + TypeScript + Vite
- Cloudflare Workers (compute) + Cloudflare Static Assets (hospedagem do
  build do Vite)
- Cloudflare D1 — planejado, ainda não conectado

## Princípios não negociáveis

Estes princípios vieram de decisão de produto explícita e não devem ser
revertidos sem essa mesma instância decidir de novo:

- **Mobile-first.** Layout é pensado para tela de celular primeiro; desktop
  é conforto, não o caso de uso principal.
- **Simples e modular.** MVP sem overengineering — resolver o problema com
  o mínimo de abstração que funciona hoje, não a abstração que "pode
  precisar" no futuro.
- **Sem IA no motor de recomendação.** A recomendação é uma função
  determinística (mesma entrada → mesma saída sempre), não uma chamada a
  modelo de linguagem.
- **Sem integração com lojas.** Nenhuma busca de produto, carrinho ou
  checkout nesta versão.
- **Sem banco de rótulos.** O produto não identifica marcas/rótulos
  específicos, só perfis de vinho.
- **Sem preço em tempo real.** Nenhuma integração de precificação.
- **Nenhuma regra de vinho inventada por engenharia.** Toda condição do
  motor de recomendação (`rules/`) e todo texto descritivo de perfil
  (`content/profiles/*.json`) vem de definição explícita de produto — nunca
  de suposição de código sobre o que é "correto" em vinho.
- **Conteúdo e regras separados da interface.** `content/` (dados) e
  `rules/` (lógica de decisão) não importam nada de `src/` (UI). A UI
  consome essas camadas, nunca o contrário.
- **Todo perfil tem `id` e `version`.** `id` é estável e nunca é
  reaproveitado; `version` incrementa a cada mudança de conteúdo do
  perfil.

## Árvore de diretórios

```
Vinho Sem Erro/
├── content/                  # DADOS do domínio (perfis de vinho)
│   ├── types.ts                # schema: WineProfile, WineCategory
│   ├── profiles/
│   │   ├── index.ts             # agrega os 11 perfis
│   │   └── RED_01.json ...      # um arquivo por perfil
│   └── README.md
├── rules/                    # LÓGICA de recomendação (vazio por enquanto)
│   ├── recommendation/          # respostas -> WineProfile (a implementar)
│   └── README.md
├── src/                      # INTERFACE React (mobile-first)
│   ├── main.tsx
│   ├── App.tsx
│   └── index.css
├── worker/                   # Cloudflare Worker (edge compute)
│   ├── index.ts                # serve Static Assets + stub /api
│   └── README.md
├── public/                   # assets estáticos (favicon etc.)
├── wrangler.toml              # config Cloudflare (Workers + Static Assets)
├── vite.config.ts
├── tsconfig.json / tsconfig.app.json / tsconfig.node.json / tsconfig.worker.json
├── package.json
└── index.html
```

Regra de dependência entre pastas: `src/` e `worker/` podem importar de
`content/` e `rules/`. `content/` e `rules/` nunca importam de `src/` nem de
`worker/`. `rules/` pode importar tipos de `content/`.

## Perfis de vinho (11, definidos pelo produto)

| ID | Nome |
|---|---|
| RED_01 | Tinto Leve e Vivo |
| RED_02 | Tinto Macio e Frutado |
| RED_03 | Tinto Médio e Equilibrado |
| RED_04 | Tinto Intenso e Estruturado |
| WHITE_01 | Branco Leve e Refrescante |
| WHITE_02 | Branco Aromático e Frutado |
| WHITE_03 | Branco Cremoso e Estruturado |
| ROSE_01 | Rosé Seco e Refrescante |
| SPARK_01 | Espumante Seco e Refrescante |
| SPARK_02 | Espumante Frutado e Aromático |
| SPARK_03 | Espumante Doce e Aromático |

Cada um existe em `content/profiles/<ID>.json` com `id`, `version: 1`,
`category` e `name` preenchidos. O campo `content` (descrição, frase "Pode
pedir assim", Plano B) está `null` — é conteúdo de produto que ainda não foi
definido, e não deve ser inventado ao implementar funcionalidades futuras.

## O que a arquitetura precisa suportar depois (não implementado)

Nenhum destes itens tem código ainda. Estão listados aqui para que a
estrutura atual (content/rules/src/worker separados) não precise ser
redesenhada quando forem implementados:

- Jornada de perguntas → entra em `rules/journey/` (a criar) + telas em
  `src/`.
- Geração da "Sua Rota de Hoje" → tela em `src/` que chama
  `rules/recommendation`.
- Plano B → campo `content.planBProfileId` já existe no schema, vazio.
- Frase "Pode pedir assim" → campo `content.suggestedPhrase` já existe no
  schema, vazio.
- Feedback imediato e feedback pós-compra/prova → rota(s) `/api/*` no
  `worker/`, gravando em D1.
- Cloudflare D1 → binding comentado em `wrangler.toml`, pronto para
  descomentar quando o schema do banco existir.
- Eventos de analytics → rota `/api/*` no worker, sem fornecedor externo
  definido ainda.
- Versionamento das regras → `rules/recommendation` terá seu próprio
  `rulesVersion`, independente do `version` de cada perfil.

## Comandos

```bash
npm install       # instala dependências
npm run dev       # Vite dev server (só a UI, sem worker)
npm run cf:dev     # wrangler dev (worker + static assets, ambiente Cloudflare local)
npm run build      # typecheck (src + content + rules + worker) e build de produção
npm run cf:deploy   # build + wrangler deploy
```

## Status

- ✅ Fundação técnica: Vite + React + TS, Cloudflare Worker servindo Static
  Assets, tipos e os 11 perfis (sem conteúdo descritivo).
- ⬜ Jornada de perguntas.
- ⬜ Motor de recomendação (`rules/recommendation`).
- ⬜ Conteúdo dos perfis (`content.description`, `suggestedPhrase`,
  `planBProfileId`).
- ⬜ Cloudflare D1.
- ⬜ Feedback (imediato e pós-compra) e eventos de analytics.
