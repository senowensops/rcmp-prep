import type { MemoryChallenge, SectionRendererProps } from "@/types";
import { MemoryQuestionCard } from "@/components/ui/MemoryQuestionCard";

export function MemorySection(props: SectionRendererProps & { challenge?: MemoryChallenge; studying?: boolean; studyRemaining?: number | null; onBeginStudy?: () => void }) {
  const { challenge, studying, studyRemaining, onBeginStudy, locked } = props;
  if (!challenge) return null;

  const imageUrl = challenge.studyType === 'image'
    ? `https://picsum.photos/seed/${challenge.id}/600/400`
    : null;

  return (
    <div className="space-y-4">
      <div className="surface-card p-6">
        <div className="mb-2 font-head text-xs font-bold uppercase tracking-[0.2em] text-[var(--red)]">Memory Challenge</div>
        <h3 className="font-head text-2xl font-extrabold uppercase">{challenge.title}</h3>
        <p className="mt-2 text-sm text-[var(--muted)]">Study time: {challenge.studyTime}s</p>
        {studying ? <p className="mt-3 font-mono text-3xl text-[var(--gold)]">{studyRemaining}s</p> : <button onClick={onBeginStudy} className="mt-4 rounded-2xl bg-[var(--red)] px-5 py-3 font-head text-lg font-bold uppercase tracking-[0.08em] text-white">Start Timer</button>}
        <div className={`mt-5 rounded-2xl border border-[var(--border)] bg-[var(--surface2)] p-4 ${studying ? "" : "blur-sm"}`}>
          {challenge.studyType === "text" ? <p className="leading-8">{challenge.studyContent}</p> : null}
          {challenge.studyType === "table" ? <table className="w-full text-left text-sm"> <tbody>{challenge.studyRows?.map((row) => <tr key={row.join("-")} className="border-b border-[var(--border)] last:border-0"><td className="py-2 font-medium">{row[0]}</td><td className="py-2 font-mono">{row[1]}</td></tr>)}</tbody></table> : null}
          {challenge.studyType === "image" && imageUrl ? (
            <img
              src={imageUrl}
              alt="Study this scene carefully"
              style={{ width: '100%', borderRadius: '12px', maxHeight: '320px', objectFit: 'cover' }}
              crossOrigin="anonymous"
            />
          ) : null}
        </div>
      </div>
      {!studying ? <MemoryQuestionCard question={props.question} answer={props.answer} flagged={props.flagged} onAnswer={props.onAnswer} onFlag={props.onFlag} /> : null}
      {locked ? <p className="text-sm text-[var(--muted)]">This memory challenge is locked. Move to the next challenge.</p> : null}
    </div>
  );
}
