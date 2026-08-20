import { BrandMark } from "../components/BrandMark";

/**
 * Placeholder mínimo de marca em "/" — não é landing page de vendas, só
 * evita expor a listagem técnica de perfis que existia antes aqui.
 */
export function HomePage() {
  return (
    <main className="screen home-screen">
      <BrandMark size="large" />
      <a className="cta-primary" href="/app">
        Abrir o Vinho Sem Erro
      </a>
    </main>
  );
}
