interface InvalidStepProps {
  onBack: () => void;
  onRestart: () => void;
}

export function InvalidStep({ onBack, onRestart }: InvalidStepProps) {
  return (
    <section className="screen message-screen">
      <h1>Algo saiu do caminho.</h1>
      <p>Volte uma etapa e tente novamente.</p>
      <div className="message-actions">
        <button type="button" className="cta-primary" onClick={onBack}>
          Voltar
        </button>
        <button type="button" className="cta-secondary" onClick={onRestart}>
          Recomeçar
        </button>
      </div>
    </section>
  );
}
