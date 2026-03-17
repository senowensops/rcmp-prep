import type { MemoryChallenge } from '@/types';

export const memoryChallenges: MemoryChallenge[] = [
  {
    id: 'mem1',
    title: 'Busy Intersection',
    studyTime: 60,
    answerTime: 45,
    studyType: 'svg',
    studySvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" style="width:100%;border-radius:12px;display:block;background:#1a1a2e">
  <!-- Sky and street background -->
  <rect width="600" height="400" fill="#1a1a2e"/>
  <!-- Sidewalk -->
  <rect x="0" y="280" width="600" height="120" fill="#3a3a3a"/>
  <!-- Road stripe -->
  <rect x="0" y="270" width="600" height="15" fill="#2a2a2a"/>
  <!-- Buildings background -->
  <rect x="0" y="50" width="180" height="230" fill="#2c2c3e"/>
  <rect x="200" y="80" width="160" height="200" fill="#252535"/>
  <rect x="380" y="40" width="220" height="240" fill="#2c2c3e"/>
  <!-- Building windows -->
  <rect x="20" y="70" width="25" height="20" fill="#ffd97020" rx="2"/>
  <rect x="60" y="70" width="25" height="20" fill="#ffd97040" rx="2"/>
  <rect x="100" y="70" width="25" height="20" fill="#ffd97020" rx="2"/>
  <rect x="20" y="110" width="25" height="20" fill="#ffd97030" rx="2"/>
  <rect x="60" y="110" width="25" height="20" fill="#ffd97020" rx="2"/>
  <rect x="100" y="110" width="25" height="20" fill="#ffd97040" rx="2"/>
  <rect x="400" y="60" width="25" height="20" fill="#ffd97020" rx="2"/>
  <rect x="445" y="60" width="25" height="20" fill="#ffd97040" rx="2"/>
  <rect x="490" y="60" width="25" height="20" fill="#ffd97020" rx="2"/>
  <rect x="535" y="60" width="25" height="20" fill="#ffd97030" rx="2"/>
  <!-- Subway entrance arch -->
  <rect x="60" y="200" width="130" height="80" fill="#222233" rx="4"/>
  <path d="M60,240 Q125,190 190,240" fill="none" stroke="#555577" stroke-width="6"/>
  <text x="125" y="215" text-anchor="middle" font-family="Arial,sans-serif" font-size="11" fill="#aaaacc" font-weight="bold">SUBWAY</text>
  <!-- Three red subway circles -->
  <circle cx="85" cy="255" r="16" fill="#cc1122"/>
  <text x="85" y="261" text-anchor="middle" font-family="Arial,sans-serif" font-size="14" fill="white" font-weight="bold">1</text>
  <circle cx="125" cy="255" r="16" fill="#cc1122"/>
  <text x="125" y="261" text-anchor="middle" font-family="Arial,sans-serif" font-size="14" fill="white" font-weight="bold">2</text>
  <circle cx="165" cy="255" r="16" fill="#cc1122"/>
  <text x="165" y="261" text-anchor="middle" font-family="Arial,sans-serif" font-size="14" fill="white" font-weight="bold">3</text>
  <!-- Seventh Ave street sign -->
  <rect x="230" y="160" width="140" height="36" fill="#1a5c1a" rx="4"/>
  <rect x="232" y="162" width="136" height="32" fill="#1a6e1a" rx="3"/>
  <text x="300" y="184" text-anchor="middle" font-family="Arial,sans-serif" font-size="15" fill="white" font-weight="bold" letter-spacing="1">Seventh Ave</text>
  <!-- Sign pole -->
  <rect x="298" y="196" width="4" height="60" fill="#888"/>
  <!-- Woman figure with green coat and teal headphones -->
  <!-- Body (green coat) -->
  <rect x="390" y="220" width="44" height="70" fill="#2a8a2a" rx="8"/>
  <!-- Head -->
  <circle cx="412" cy="210" r="18" fill="#d4956a"/>
  <!-- Teal headphones -->
  <path d="M394,205 Q412,188 430,205" fill="none" stroke="#20b2aa" stroke-width="5" stroke-linecap="round"/>
  <rect x="388" y="203" width="10" height="14" fill="#20b2aa" rx="4"/>
  <rect x="426" y="203" width="10" height="14" fill="#20b2aa" rx="4"/>
  <!-- Hair -->
  <path d="M394,208 Q412,195 430,208" fill="#3a2010" stroke="none"/>
  <!-- Legs -->
  <rect x="398" y="288" width="12" height="30" fill="#1a5a8a" rx="3"/>
  <rect x="416" y="288" width="12" height="30" fill="#1a5a8a" rx="3"/>
  <!-- Shoes -->
  <rect x="396" y="315" width="16" height="7" fill="#222" rx="2"/>
  <rect x="414" y="315" width="16" height="7" fill="#222" rx="2"/>
  <!-- Bag -->
  <rect x="430" y="240" width="22" height="28" fill="#8a5a1a" rx="4"/>
  <!-- Street lamp -->
  <rect x="510" y="100" width="6" height="180" fill="#666"/>
  <rect x="490" y="100" width="50" height="8" fill="#666" rx="2"/>
  <ellipse cx="515" cy="100" rx="12" ry="6" fill="#fff9c4" opacity="0.9"/>
  <!-- Crosswalk stripes -->
  <rect x="300" y="275" width="30" height="8" fill="#fff" opacity="0.5"/>
  <rect x="340" y="275" width="30" height="8" fill="#fff" opacity="0.5"/>
  <rect x="380" y="275" width="30" height="8" fill="#fff" opacity="0.5"/>
</svg>`,
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
    studyType: 'svg',
    studySvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" style="width:100%;border-radius:12px;display:block;background:#4a4a4a">
  <!-- Sky -->
  <rect width="600" height="200" fill="#b0c4d8"/>
  <!-- Buildings background -->
  <rect x="0" y="60" width="200" height="145" fill="#d4c4a0"/>
  <rect x="210" y="80" width="160" height="125" fill="#c8b890"/>
  <rect x="390" y="50" width="210" height="155" fill="#d4c4a0"/>
  <!-- Building windows -->
  <rect x="20" y="80" width="20" height="25" fill="#8899aa" rx="1"/>
  <rect x="55" y="80" width="20" height="25" fill="#8899aa" rx="1"/>
  <rect x="90" y="80" width="20" height="25" fill="#8899aa" rx="1"/>
  <rect x="125" y="80" width="20" height="25" fill="#7788aa" rx="1"/>
  <rect x="20" y="120" width="20" height="25" fill="#8899aa" rx="1"/>
  <rect x="55" y="120" width="20" height="25" fill="#8899aa" rx="1"/>
  <rect x="90" y="120" width="20" height="25" fill="#7788aa" rx="1"/>
  <rect x="410" y="70" width="20" height="25" fill="#8899aa" rx="1"/>
  <rect x="445" y="70" width="20" height="25" fill="#8899aa" rx="1"/>
  <rect x="480" y="70" width="20" height="25" fill="#7788aa" rx="1"/>
  <rect x="515" y="70" width="20" height="25" fill="#8899aa" rx="1"/>
  <!-- Tram tracks -->
  <rect x="0" y="195" width="600" height="5" fill="#888"/>
  <rect x="0" y="215" width="600" height="5" fill="#888"/>
  <!-- Road (grey) -->
  <rect x="0" y="200" width="600" height="200" fill="#6a6a6a"/>
  <!-- Tram rails detail -->
  <rect x="100" y="200" width="4" height="200" fill="#555"/>
  <rect x="160" y="200" width="4" height="200" fill="#555"/>
  <!-- Green tram -->
  <rect x="60" y="130" width="320" height="80" fill="#2e7d32" rx="6"/>
  <!-- Tram windows -->
  <rect x="75" y="140" width="50" height="35" fill="#b0d8f0" rx="3"/>
  <rect x="140" y="140" width="50" height="35" fill="#b0d8f0" rx="3"/>
  <rect x="205" y="140" width="50" height="35" fill="#b0d8f0" rx="3"/>
  <rect x="270" y="140" width="50" height="35" fill="#b0d8f0" rx="3"/>
  <!-- Tram number -->
  <rect x="335" y="145" width="32" height="28" fill="#fff" rx="3"/>
  <text x="351" y="164" text-anchor="middle" font-family="Arial,sans-serif" font-size="18" fill="#2e7d32" font-weight="bold">2</text>
  <!-- Tram bottom detail -->
  <rect x="60" y="205" width="320" height="10" fill="#1b5e20"/>
  <!-- Tram wheels -->
  <circle cx="110" cy="213" r="8" fill="#333"/>
  <circle cx="200" cy="213" r="8" fill="#333"/>
  <circle cx="300" cy="213" r="8" fill="#333"/>
  <!-- Tram overhead wire -->
  <line x1="0" y1="110" x2="600" y2="110" stroke="#888" stroke-width="2"/>
  <line x1="220" y1="110" x2="220" y2="133" stroke="#888" stroke-width="2"/>
  <!-- Red small car -->
  <rect x="430" y="258" width="100" height="45" fill="#cc1122" rx="6"/>
  <!-- Car windows -->
  <rect x="445" y="262" width="35" height="22" fill="#99bbcc" rx="2"/>
  <rect x="487" y="262" width="30" height="22" fill="#99bbcc" rx="2"/>
  <!-- Car wheels -->
  <circle cx="450" cy="305" r="13" fill="#222"/>
  <circle cx="450" cy="305" r="6" fill="#555"/>
  <circle cx="510" cy="305" r="13" fill="#222"/>
  <circle cx="510" cy="305" r="6" fill="#555"/>
  <!-- Car bumper/lights -->
  <rect x="428" y="268" width="6" height="10" fill="#ffee00" rx="1"/>
  <rect x="526" y="268" width="6" height="10" fill="#ff4444" rx="1"/>
  <!-- Parking signs post -->
  <rect x="28" y="240" width="5" height="130" fill="#999"/>
  <!-- Parking sign Anfos (pointing right) -->
  <rect x="30" y="245" width="80" height="28" fill="white" rx="3"/>
  <polygon points="110,259 120,248 120,270" fill="white"/>
  <text x="70" y="264" text-anchor="middle" font-family="Arial,sans-serif" font-size="13" fill="#222" font-weight="bold">Anfos</text>
  <!-- Parking sign Drachen (pointing right) -->
  <rect x="30" y="285" width="85" height="28" fill="white" rx="3"/>
  <polygon points="115,299 125,288 125,310" fill="white"/>
  <text x="72" y="304" text-anchor="middle" font-family="Arial,sans-serif" font-size="13" fill="#222" font-weight="bold">Drachen</text>
  <!-- Parking P symbol -->
  <circle cx="15" cy="270" r="14" fill="#1565c0"/>
  <text x="15" y="276" text-anchor="middle" font-family="Arial,sans-serif" font-size="14" fill="white" font-weight="bold">P</text>
</svg>`,
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
