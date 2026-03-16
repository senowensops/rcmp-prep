export function ProgressBar({ value }: { value: number }) {
  return (
    <div className="h-2.5 overflow-hidden rounded-full bg-white/10">
      <div className="h-full rounded-full bg-gradient-to-r from-[var(--red)] to-[var(--gold)] transition-all duration-300" style={{ width: `${value}%` }} />
    </div>
  );
}
