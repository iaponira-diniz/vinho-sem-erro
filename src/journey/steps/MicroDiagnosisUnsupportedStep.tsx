interface MicroDiagnosisUnsupportedStepProps {
  message: string;
  onBack: () => void;
}

/**
 * Único caso unsupported da V1 (rosé mais doce). Não é uma Rota: sem
 * WineProfile, sem RoutePresentation, sem reason/budget envolvidos.
 */
export function MicroDiagnosisUnsupportedStep({ message, onBack }: MicroDiagnosisUnsupportedStepProps) {
  return (
    <section className="screen message-screen">
      <h1>{message}</h1>
      <div className="message-actions">
        <button type="button" className="cta-primary" onClick={onBack}>
          Voltar e escolher outro tipo
        </button>
      </div>
    </section>
  );
}
