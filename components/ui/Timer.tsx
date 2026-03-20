export function Timer({ label, secondsLeft }: { label: string; secondsLeft: number | null }) {
  if (secondsLeft === null) return null;
  const mins = Math.floor(secondsLeft / 60).toString().padStart(2, "0");
  const secs = (secondsLeft % 60).toString().padStart(2, "0");
  const warn = secondsLeft <= 30;
  return (
    <div role="timer" aria-live="polite" aria-label={label} className="surface-card mb-4 border-2 border-[var(--gold)] bg-[var(--dark)] p-5 text-center text-white">
      <div className="font-head text-xs font-bold uppercase tracking-[0.2em] text-[var(--gold)]">{label}</div>
      <div className={`mt-2 font-mono text-4xl font-bold ${warn ? "text-[var(--red)]" : "text-[var(--gold)]"}`}>
        {warn && <span className="sr-only">Warning: low time remaining. </span>}
        {mins}:{secs}
      </div>
    </div>
  );
}
