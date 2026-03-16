export function FlagButton({ flagged, onToggle }: { flagged: boolean; onToggle: () => void }) {
  return (
    <button onClick={onToggle} className={`rounded-xl border px-3 py-2 text-sm font-medium transition ${flagged ? "border-[var(--gold)] bg-[var(--gold)]/10 text-[var(--gold)]" : "border-[var(--border)] bg-[var(--surface2)] text-[var(--muted)]"}`}>
      {flagged ? "Flagged" : "Flag question"}
    </button>
  );
}
