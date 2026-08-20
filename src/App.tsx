import { AppPage } from "./pages/AppPage";
import { HomePage } from "./pages/HomePage";

/** Remove a barra final (exceto de "/"), para que "/app" e "/app/" normalizem para o mesmo valor. */
function normalizePathname(pathname: string): string {
  if (pathname.length > 1 && pathname.endsWith("/")) {
    return pathname.slice(0, -1);
  }
  return pathname;
}

/**
 * Roteamento mínimo sem React Router: "/app" (ou "/app/") abre a
 * ferramenta, qualquer outro caminho mostra o placeholder de marca em "/".
 * Navegação entre as duas é feita por link normal (<a href>), não por
 * client-side routing.
 */
function App() {
  const pathname = normalizePathname(window.location.pathname);
  return pathname === "/app" ? <AppPage /> : <HomePage />;
}

export default App;
