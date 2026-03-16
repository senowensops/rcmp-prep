import type { Question } from "@/types";
import { FlagButton } from "@/components/ui/FlagButton";

export function MemoryQuestionCard({ question, answer, flagged, onAnswer, onFlag }: { question: Question; answer?: number; flagged: boolean; onAnswer: (value: number) => void; onFlag: () => void }) {
  return (
    <div className="surface-card p-6">
      <div className="mb-2 font-head text-xs font-bold uppercase tracking-[0.2em] text-[var(--muted)]">{question.id}</div>
      <p className="mb-5 text-lg leading-8">{question.text}</p>
      <div className="space-y-3">
        {question.opts.map((opt, index) => {
          const value = opt === "I don't know" ? -1 : index;
          const selected = answer === value;
          return (
            <button key={`${question.id}-${index}`} onClick={() => onAnswer(value)} className={`flex w-full items-center gap-3 rounded-2xl border p-4 text-left transition ${selected ? "border-[var(--blue)] bg-[var(--blue-bg)]" : "border-[var(--border)] bg-[var(--surface2)]"}`}>
              <span className="font-head text-sm font-bold uppercase tracking-[0.1em] text-[var(--muted)]">{index < 4 ? String.fromCharCode(65 + index) : "IDK"}</span>
              <span>{opt}</span>
            </button>
          );
        })}
      </div>
      <div className="mt-5"><FlagButton flagged={flagged} onToggle={onFlag} /></div>
    </div>
  );
}
