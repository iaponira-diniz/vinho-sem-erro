import { brand } from "../config/brand";

/**
 * Sem uso desde o redesign da home, que passou a ter tratamento próprio de
 * título e assinatura. Mantido de propósito, não é ponta solta de limpeza:
 * a intenção é reaproveitar no cabeçalho do /app, que hoje não tem marca
 * nenhuma. Mesmo critério aplicado a RoutePresentation.reasonMessage.
 */
interface BrandMarkProps {
  /** "large" para a página inicial; padrão é o cabeçalho discreto do /app. */
  size?: "default" | "large";
  /**
   * Logo oficial da SaporeDiVino — será fornecido posteriormente. Enquanto
   * ausente (undefined), nada é renderizado no lugar dele: sem caixa vazia,
   * sem ícone genérico, sem texto "logo". Quando o asset existir, basta
   * passar sua URL aqui.
   */
  logoSrc?: string;
}

export function BrandMark({ size = "default", logoSrc }: BrandMarkProps) {
  return (
    <div className={`brand-mark ${size === "large" ? "brand-mark-large" : ""}`}>
      {logoSrc && <img className="brand-logo" src={logoSrc} alt={`Logo ${brand.parentBrand}`} />}
      <p className="brand-product">{brand.productName}</p>
      <p className="brand-tagline">{brand.tagline}</p>
      <p className="brand-parent">por {brand.parentBrand}</p>
    </div>
  );
}
