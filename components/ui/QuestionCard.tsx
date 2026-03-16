import type { Question } from "@/types";
import { FlagButton } from "@/components/ui/FlagButton";

export function QuestionCard({ question, answer, flagged, locked, showDontKnow, onAnswer, onFlag }: { question: Question; answer?: number; flagged: boolean; locked?: boolean; showDontKnow?: boolean; onAnswer: (value: number) => void; onFlag: () => void }) {
  const options = showDontKnow ? [...question.opts, "I don't know"] : question.opts;

  return (
    <div className="surface-card p-6">
      <div className="mb-2 font-head text-xs font-bold uppercase tracking-[0.2em] text-[var(--muted)]">{question.id}</div>
      <div className="review-html mb-5 text-lg leading-8" dangerouslySetInnerHTML={{ __html: question.text }} />
      {question.promptSvg ? <div className="mb-5 rounded-2xl bg-[var(--surface2)] p-4" dangerouslySetInnerHTML={{ __html: question.promptSvg }} /> : null}
      {question.svg ? <div className="mb-5 overflow-auto rounded-2xl bg-[var(--surface2)] p-4" dangerouslySetInnerHTML={{ __html: question.svg }} /> : null}
      <div className="mb-5 flex flex-col gap-3">
        {options.map((opt, index) => {
          const value = showDontKnow && index === options.length - 1 ? -1 : index;
          const selected = answer === value;
          const svgChoice = question.choicesSvg?.[index];
          return (
            <button key={`${question.id}-${index}`} disabled={locked} onClick={() => onAnswer(value)} className={`flex items-center gap-3 rounded-2xl border p-4 text-left transition ${selected ? "border-[var(--blue)] bg-[var(--blue-bg)]" : "border-[var(--border)] bg-[var(--surface2)] hover:border-[var(--red)]"} ${locked ? "opacity-70" : ""}`}>
              <span className={`flex h-8 w-8 items-center justify-center rounded-full border font-head text-sm font-bold ${selected ? "border-[var(--blue)] bg-[var(--blue)] text-white" : "border-[var(--border)] text-[var(--muted)]"}`}>{showDontKnow && index === options.length - 1 ? "IDK" : String.fromCharCode(65 + index)}</span>
              <div className="flex-1">
                {svgChoice ? <div dangerouslySetInnerHTML={{ __html: svgChoice }} /> : <span>{opt}</span>}
              </div>
            </button>
          );
        })}
      </div>
      <FlagButton flagged={flagged} onToggle={onFlag} />
    </div>
  );
}
