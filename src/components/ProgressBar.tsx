interface ProgressBarProps {
  index: number;
  total: number;
}

export function ProgressBar({ index, total }: ProgressBarProps) {
  const percent = Math.round((index / total) * 100);

  return (
    <div
      className="progress"
      role="progressbar"
      aria-valuenow={index}
      aria-valuemin={1}
      aria-valuemax={total}
    >
      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${percent}%` }} />
      </div>
      <span className="progress-label">
        {index} de {total}
      </span>
    </div>
  );
}
