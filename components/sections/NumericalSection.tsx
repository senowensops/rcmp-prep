import type { SectionRendererProps } from "@/types";
import { QuestionCard } from "@/components/ui/QuestionCard";
export function NumericalSection(props: SectionRendererProps) { return <QuestionCard {...props} showDontKnow />; }
