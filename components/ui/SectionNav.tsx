import type { SectionDefinition } from "@/types";

export function SectionNav({ sections, currentSectionId, answeredMap, onSelect }: { sections: SectionDefinition[]; currentSectionId: string; answeredMap: Record<string, number>; onSelect: (id: string) => void }) {
  return (
    <aside className="surface-card sticky top-24 hidden w-72 self-start p-4 lg:block">
      <div className="mb-3 font-head text-xs font-bold uppercase tracking-[0.2em] text-[var(--muted)]">Sections</div>
      <div className="space-y-2">
        {sections.map((section) => {
          const answered = answeredMap[section.id] || 0;
          const active = currentSectionId === section.id;
          return (
            <button key={section.id} onClick={() => onSelect(section.id)} className={`flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left transition ${active ? "bg-[var(--surface2)] ring-2 ring-[var(--red)]" : "bg-white"}`}>
              <div>
                <div className="font-head text-sm font-bold uppercase tracking-[0.08em]">{section.label}</div>
                <div className="text-xs text-[var(--muted)]">{answered}/{section.questions.length} answered</div>
              </div>
              <div className={`h-3 w-3 rounded-full ${answered === section.questions.length ? "bg-[var(--correct)]" : active ? "bg-[var(--gold)]" : "bg-[var(--border)]"}`} />
            </button>
          );
        })}
      </div>
    </aside>
  );
}
