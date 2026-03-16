import { workstyleStatements } from '@/data/test1/workstyle';
import { languageAnalogies, languageSynonyms } from '@/data/test1/language';
import { numericalBasic, numericalBedmas } from '@/data/test1/numerical';
import { spatialQuestions } from '@/data/test1/spatial';
import { memoryChallenges } from '@/data/test1/memory';
import { businessLogic, businessMath } from '@/data/test1/business';
import type { Question, ResultsSection, ResultsSummary, SectionDefinition } from '@/types';

export function getSectionsForTest(testId: string): SectionDefinition[] {
  const sections: SectionDefinition[] = [
    { id: 'workstyle', label: 'Workstyle', type: 'workstyle', questions: workstyleStatements.map((item) => ({ id: item.id, text: item.text, opts: ['Strongly Disagree','Disagree','Neutral','Agree','Strongly Agree'], correct: 4, exp: 'Preference-style section completed.' })) },
    {
      id: 'language',
      label: 'Language',
      type: 'language',
      questions: [...languageSynonyms, ...languageAnalogies],
      subsections: [
        { id: 'language-2a', label: 'Synonyms', timerSeconds: undefined, questionIds: languageSynonyms.map((q) => q.id) },
        { id: 'language-2b', label: 'Analogies', timerSeconds: undefined, questionIds: languageAnalogies.map((q) => q.id) },
      ],
    },
    {
      id: 'numerical',
      label: 'Numerical',
      type: 'numerical',
      questions: [...numericalBasic.map((q) => ({ ...q, subsectionId: 'numerical-3a' })), ...numericalBedmas.map((q) => ({ ...q, subsectionId: 'numerical-3b' }))],
      subsections: [
        { id: 'numerical-3a', label: 'Numerical Level 1', timerSeconds: 180, questionIds: numericalBasic.map((q) => q.id) },
        { id: 'numerical-3b', label: 'Numerical Level 2', timerSeconds: 180, questionIds: numericalBedmas.map((q) => q.id) },
      ],
    },
    {
      id: 'spatial',
      label: 'Spatial',
      type: 'spatial',
      questions: spatialQuestions,
      subsections: [
        { id: 'spatial-2d', label: 'Spatial 2D Rotation', timerSeconds: 180, questionIds: spatialQuestions.filter((q) => q.subsectionId === 'spatial-2d').map((q) => q.id) },
        { id: 'spatial-3d', label: 'Spatial 3D Shapes', timerSeconds: 180, questionIds: spatialQuestions.filter((q) => q.subsectionId === 'spatial-3d').map((q) => q.id) },
        { id: 'spatial-mech', label: 'Spatial Mechanical', timerSeconds: 240, questionIds: spatialQuestions.filter((q) => q.subsectionId === 'spatial-mech').map((q) => q.id) },
        { id: 'spatial-cubes', label: 'Spatial Cubes', timerSeconds: 300, questionIds: spatialQuestions.filter((q) => q.subsectionId === 'spatial-cubes').map((q) => q.id) },
      ],
    },
    {
      id: 'memory',
      label: 'Memory',
      type: 'memory',
      questions: memoryChallenges.flatMap((challenge) => challenge.questions),
      challengeMap: Object.fromEntries(memoryChallenges.flatMap((challenge) => challenge.questions.map((q) => [q.id, { ...challenge, answerTime: 45 }]))) as SectionDefinition['challengeMap'],
    },
    {
      id: 'business',
      label: 'Verbal Reasoning',
      type: 'business',
      bannerNote: 'This section includes both analogy-style and logical reasoning questions to prepare you for the full range of verbal content on the real assessment.',
      questions: [...businessLogic, ...businessMath],
    },
  ];

  return sections.map((section) => testId === 'sample' ? ({ ...section, questions: section.questions.slice(0, Math.min(3, section.questions.length)) }) : section);
}

export function getResults(testId: string, answers: Record<string, number>): ResultsSummary {
  const sections = getSectionsForTest(testId);
  const scoredSections: ResultsSection[] = [];
  const review: { question: Question; selected?: number; isCorrect: boolean }[] = [];
  let overallCorrect = 0;
  let totalScored = 0;
  for (const section of sections) {
    if (section.id === 'workstyle') {
      scoredSections.push({ label: section.label, total: section.questions.length, correct: section.questions.length, pct: 100 });
      continue;
    }
    let correct = 0;
    for (const question of section.questions) {
      const selected = answers[question.id];
      const isCorrect = selected !== -1 && selected === question.correct;
      if (isCorrect) correct += 1;
      review.push({ question, selected, isCorrect });
    }
    const total = section.questions.length;
    overallCorrect += correct;
    totalScored += total;
    scoredSections.push({ label: section.label, total, correct, pct: total ? Math.round((correct / total) * 100) : 0 });
  }
  return { overallPct: totalScored ? Math.round((overallCorrect / totalScored) * 100) : 0, overallCorrect, totalScored, sections: scoredSections, review };
}
