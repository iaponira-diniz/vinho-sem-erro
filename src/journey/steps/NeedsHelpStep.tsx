interface NeedsHelpStepProps {
  onBack: () => void;
  onRestart: () => void;
}

export function NeedsHelpStep({ onBack, onRestart }: NeedsHelpStepProps) {
  return (
    <section className="screen message-screen">
      <h1>Quero te orientar sem adivinhar.</h1>
      <p>
        Para continuar nesta primeira versão, volte e escolha a opção que
        mais se aproxima do que parece gostoso hoje.
      </p>
      <div className="message-actions">
        <button type="button" className="cta-primary" onClick={onBack}>
          Voltar e escolher
        </button>
        <button type="button" className="cta-secondary" onClick={onRestart}>
          Recomeçar
        </button>
      </div>
    </section>
  );
}
