# Vinho Sem Erro

MVP mobile-first para ajudar quem gosta de vinho, mas não sabe escolher, a
descobrir qual perfil de vinho procurar. Recomendação determinística, sem
IA, sem integração com lojas, sem preços em tempo real.

Decisões de arquitetura e princípios do projeto estão em [CLAUDE.md](./CLAUDE.md).

## Rodando localmente

```bash
npm install
npm run dev
```

## Rodando com o Worker (Cloudflare local)

```bash
npm run cf:dev
```

## Build e deploy

```bash
npm run build
npm run cf:deploy
```
