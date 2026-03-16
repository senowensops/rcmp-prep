import type { Question, SectionRendererProps } from "@/types";
import { QuestionCard } from "@/components/ui/QuestionCard";

export function WorkstyleSection(props: SectionRendererProps) {
  return <QuestionCard question={props.question as Question} answer={props.answer} flagged={props.flagged} onAnswer={props.onAnswer} onFlag={props.onFlag} locked={props.locked} />;
}
