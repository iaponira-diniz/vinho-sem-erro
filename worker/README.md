# worker/

Código que roda no Cloudflare Worker (edge), fora do bundle React. Hoje faz
só uma coisa: servir os Static Assets do build (`dist/`, gerado por
`npm run build`) e responder `/api/health`.

## O que vai entrar aqui depois (nenhum implementado ainda)

- Rotas `/api/*` para registrar feedback (imediato e pós-compra/prova).
- Leitura/escrita no Cloudflare D1, quando o banco existir.
- Registro de eventos de analytics.

Este arquivo é intencionalmente fino: regra de negócio fica em `rules/` e
`content/`, não aqui. O worker só expõe essas camadas via HTTP quando
precisar.
