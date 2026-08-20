import { BrandMark } from "../../components/BrandMark";
import { useJourney } from "../JourneyProvider";

export function IntentStep() {
  const { answerIntent } = useJourney();

  return (
    <section className="screen intent-screen">
      <BrandMark />

      <h1 className="screen-question">O que você precisa escolher hoje?</h1>

      <button type="button" className="cta-primary" onClick={() => answerIntent("for_me")}>
        Quero escolher um vinho para mim
      </button>

      <p className="intent-note">Outras formas de escolher chegam depois.</p>
    </section>
  );
}
