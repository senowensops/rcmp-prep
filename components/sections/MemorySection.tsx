import type { MemoryChallenge, SectionRendererProps } from "@/types";
import { MemoryQuestionCard } from "@/components/ui/MemoryQuestionCard";

export function MemorySection(props: SectionRendererProps & { challenge?: MemoryChallenge; studying?: boolean; studyRemaining?: number | null; onBeginStudy?: () => void; onSkipStudy?: () => void }) {
  const { challenge, studying, studyRemaining, onBeginStudy, onSkipStudy, locked } = props;
  if (!challenge) return null;

  return (
    <div className="space-y-4">
      <div className="surface-card p-6">
        <div className="mb-2 font-head text-xs font-bold uppercase tracking-[0.2em] text-[var(--red)]">Memory Challenge</div>
        <h3 className="font-head text-2xl font-extrabold uppercase">{challenge.title}</h3>
        <p className="mt-2 text-sm text-[var(--muted)]">Study the scene, then answer from memory.</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '0.75rem' }}>
          {studying ? (
            <p className="font-mono text-3xl text-[var(--gold)]">{studyRemaining}s</p>
          ) : (
            <button onClick={onBeginStudy} className="rounded-2xl bg-[var(--red)] px-5 py-3 font-head text-lg font-bold uppercase tracking-[0.08em] text-white">Start Timer</button>
          )}
          <button onClick={onSkipStudy} className="rounded-xl border border-white/20 px-4 py-2 font-head text-sm font-bold uppercase tracking-[0.08em] text-white/70 hover:border-white/40 hover:text-white transition">
            I&apos;m Ready →
          </button>
        </div>
        <div className="mt-5 rounded-2xl border border-[var(--border)] bg-[var(--surface2)] p-4">
          {challenge.studyType === "text" ? <p className="leading-8">{challenge.studyContent}</p> : null}
          {challenge.studyType === "table" ? (
            <table className="w-full text-left text-sm">
              <tbody>
                {challenge.studyRows?.map((row) => (
                  <tr key={row.join("-")} className="border-b border-[var(--border)] last:border-0">
                    <td className="py-2 font-medium">{row[0]}</td>
                    <td className="py-2 font-mono">{row[1]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : null}
          {challenge.studyType === 'svg' && challenge.studySvg ? (
            <div style={{ width: '100%', borderRadius: '12px', overflow: 'hidden' }} dangerouslySetInnerHTML={{ __html: challenge.studySvg }} />
          ) : null}
        </div>
      </div>
      {!studying ? <MemoryQuestionCard question={props.question} answer={props.answer} flagged={props.flagged} onAnswer={props.onAnswer} onFlag={props.onFlag} /> : null}
      {locked ? <p className="text-sm text-[var(--muted)]">This memory challenge is locked. Move to the next challenge.</p> : null}
    </div>
  );
}
