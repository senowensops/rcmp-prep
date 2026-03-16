// TODO: Test 2 questions
import type { MemoryChallenge } from '@/types';

export const memoryChallenges: MemoryChallenge[] = [
  {
    id: 'mem1',
    title: 'Busy Intersection',
    studyTime: 60,
    answerTime: 45,
    studyType: 'image',
    studyPrompt: 'Busy intersection scene with a woman wearing teal headphones and a green coat, a subway entrance showing red circles with 1, 2, and 3, and a sign reading Seventh Ave.',
    questions: [
      { id: '5-1', text: 'What was the coat colour of the woman with headphones?', opts: ['Red','Black','Green','Blue', "I don't know"], correct: 2, exp: 'The woman with teal headphones wore a green coat.' },
      { id: '5-2', text: 'Which subway line numbers were visible?', opts: ['1, 2, 3','2, 3, 4','1, 3, 5','4, 5, 6', "I don't know"], correct: 0, exp: 'Red circle numbers 1, 2, and 3 were visible on the subway entrance.' },
      { id: '5-3', text: 'What street name appeared on the sign?', opts: ['Fifth Avenue','Broadway','Seventh Avenue','Park Avenue', "I don't know"], correct: 2, exp: 'The sign read Seventh Ave above the subway line numbers.' },
    ],
  },
  {
    id: 'mem2',
    title: 'City Street Scene',
    studyTime: 60,
    answerTime: 45,
    studyType: 'image',
    studyPrompt: 'European-style city street with a green tram numbered 2, a small red Fiat parked in the foreground, and parking signs pointing to Anfos and Drachen.',
    questions: [
      { id: '5-4', text: 'What number was displayed on the tram?', opts: ['1','2','3','4', "I don't know"], correct: 1, exp: 'The green tram displayed the number 2.' },
      { id: '5-5', text: 'What colour was the small car?', opts: ['Blue','White','Silver','Red', "I don't know"], correct: 3, exp: 'A small red Fiat was parked in the right foreground.' },
      { id: '5-6', text: 'Which destinations were listed on the parking sign?', opts: ['Drachen and Pilzli','Anfos and Drachen','Anfos and Coiffeur','Nord and Sud', "I don't know"], correct: 1, exp: 'The white arrow signs pointed to Anfos and Drachen parking.' },
    ],
  },
  {
    id: 'mem3',
    title: 'Incident Report',
    studyTime: 60,
    answerTime: 45,
    studyType: 'text',
    studyContent: 'On Thursday evening at 19:42, Constable Pelletier responded to a disturbance at 88 Harbour Drive. Upon arrival she observed two males arguing outside a grey pickup truck bearing New Brunswick plate KMX-447. The registered owner, Brian Fossett, age 31, stated his wallet containing $280 cash and two credit cards had been stolen. A witness, Carol Ng, reported seeing a heavyset male in a dark hoodie flee northbound on foot at approximately 19:35. EMS was not required. The scene was cleared at 20:17.',
    questions: [
      { id: '5-7', text: 'What was the licence plate?', opts: ['KMX-474','KXM-447','KMX-447','MKX-447', "I don't know"], correct: 2, exp: 'The pickup truck bore New Brunswick plate KMX-447.' },
      { id: '5-8', text: 'How much cash was stolen?', opts: ['$240','$280','$320','$380', "I don't know"], correct: 1, exp: 'Brian Fossett reported that $280 cash was in the stolen wallet.' },
      { id: '5-9', text: 'What time was the scene cleared?', opts: ['19:42','19:55','20:07','20:17', "I don't know"], correct: 3, exp: 'The report states the scene was cleared at 20:17.' },
    ],
  },
  {
    id: 'mem4',
    title: 'Licence Plates',
    studyTime: 45,
    answerTime: 45,
    studyType: 'table',
    studyRows: [
      ['Ontario', 'BKX 291'],
      ['Quebec', 'T44-829'],
      ['Nova Scotia', 'DPR 067'],
      ['Alberta', 'XWQ 554'],
      ['Manitoba', 'LNZ 183'],
    ],
    questions: [
      { id: '5-10', text: 'Which was the Alberta plate?', opts: ['BKX 291','XWQ 554','LNZ 183','T44-829', "I don't know"], correct: 1, exp: 'The Alberta row showed XWQ 554.' },
      { id: '5-11', text: 'Which province matched DPR 067?', opts: ['Ontario','Quebec','Nova Scotia','Alberta', "I don't know"], correct: 2, exp: 'DPR 067 appeared beside Nova Scotia.' },
      { id: '5-12', text: 'Which was the Manitoba plate?', opts: ['T44-829','BKX 291','XWQ 554','LNZ 183', "I don't know"], correct: 3, exp: 'The Manitoba row showed LNZ 183.' },
    ],
  },
];
