import homeFotoJpg from "../assets/home-foto.jpg";
import homeFotoWebp from "../assets/home-foto.webp";
import logoSaporeDivino from "../assets/logo-saporedivino.png";
import { brand } from "../config/brand";

/**
 * Método ROTA como infográfico conceitual. "Alimento" aparece com o mesmo
 * peso visual dos outros três por decisão de produto: harmonização ainda
 * não existe como pergunta na jornada, e esta versão vai para um público
 * de teste que sabe que é uma primeira versão. Não "corrigir" destacando
 * ou apagando o A.
 */
const ROTA_STEPS = [
  { letter: "R", label: "Razão" },
  { letter: "O", label: "Orçamento" },
  { letter: "T", label: "Tipo de paladar" },
  { letter: "A", label: "Alimento" },
] as const;

export function HomePage() {
  return (
    <main className="home">
      <div className="home-hero">
        {/* WebP (~105 KB) para quem suporta, JPG (~212 KB) como reserva. É a
            primeira coisa que carrega na página, por isso `eager`. */}
        <picture>
          <source srcSet={homeFotoWebp} type="image/webp" />
          <img
            className="home-hero-photo"
            src={homeFotoJpg}
            alt="Iaponira Diniz avaliando uma taça de vinho"
            loading="eager"
          />
        </picture>
      </div>

      <div className="home-content">
        <h1 className="home-title">{brand.productName}</h1>
        <p className="home-tagline">{brand.tagline}</p>

        <p className="home-statement">
          Você não precisa entender de vinho para escolher bem. Precisa saber o que procurar.
        </p>

        <section className="home-method" aria-labelledby="home-method-label">
          <h2 className="home-method-label" id="home-method-label">
            Método Rota do Vinho
          </h2>
          <ul className="rota-steps">
            {ROTA_STEPS.map((step) => (
              <li className="rota-step" key={step.letter}>
                {/* A letra é decorativa: o nome da etapa logo abaixo já é o texto real. */}
                <span className="rota-circle" aria-hidden="true">
                  {step.letter}
                </span>
                <span className="rota-label">{step.label}</span>
              </li>
            ))}
          </ul>
        </section>

        <a className="home-cta" href="/app">
          Descobrir minha rota
        </a>

        <hr className="home-divider" />

        {/* A frase termina em "criadora do blog" e continua no logo abaixo,
            por isso o alt do logo é o nome da marca-mãe. */}
        <p className="home-authority">
          Criado por Iaponira Diniz, sommelier internacional formada na Itália pela Fondazione
          Italiana di Sommelier, criadora do blog
        </p>

        <img className="home-logo" src={logoSaporeDivino} alt={brand.parentBrand} />
      </div>
    </main>
  );
}
