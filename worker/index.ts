/**
 * Entry point do Cloudflare Worker. Hoje só serve os Static Assets (o build
 * do Vite) e responde a um health check. Rotas de API (jornada, feedback,
 * D1) entram aqui quando existirem — nenhuma foi implementada ainda.
 */

export interface Env {
  ASSETS: Fetcher;
}

export default {
  async fetch(request, env): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/api/health") {
      return Response.json({ ok: true });
    }

    if (url.pathname.startsWith("/api/")) {
      return Response.json({ error: "not implemented" }, { status: 501 });
    }

    return env.ASSETS.fetch(request);
  },
} satisfies ExportedHandler<Env>;
