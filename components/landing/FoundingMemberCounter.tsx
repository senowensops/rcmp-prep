export function FoundingMemberCounter() {
  // TODO Phase 2: fetch from /api/founding-count
  const claimed = 8;
  const total = 10;
  const remaining = Math.max(total - claimed, 0);
  const progress = Math.min((claimed / total) * 100, 100);
  const highlightClass = remaining <= 3 ? "text-[var(--gold)]" : "text-white/78";

  return (
    <div className="mt-6 rounded-2xl border border-white/8 bg-black/25 p-4">
      <p className="text-sm text-white/60">{claimed} of {total} founding members have joined.</p>
      <div className="founding-bar mt-3 overflow-hidden">
        <div className="founding-fill" style={{ width: `${progress}%` }} />
      </div>
      <p className={`mt-3 text-sm leading-6 ${highlightClass}`}>
        {remaining} spots remaining at $29 CAD — price increases to $39 when filled.
      </p>
    </div>
  );
}
