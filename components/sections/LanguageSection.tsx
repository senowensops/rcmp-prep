import type { SectionRendererProps } from "@/types";
import { QuestionCard } from "@/components/ui/QuestionCard";
export function LanguageSection(props: SectionRendererProps) { return <QuestionCard {...props} showDontKnow />; }
