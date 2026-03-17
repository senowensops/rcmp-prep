import type { MemoryChallenge } from '@/types';

export const memoryChallenges: MemoryChallenge[] = [
  {
    id: 'mem1',
    title: 'Shape Grid',
    studyTime: 60,
    answerTime: 45,
    studyType: 'svg',
    studySvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 300" style="width:100%;border-radius:12px;display:block;">
  <rect width="500" height="300" fill="#f8f9fa"/>
  <!-- Row 1 labels -->
  <text x="83" y="22" text-anchor="middle" font-family="Arial,sans-serif" font-size="12" fill="#888">Top Left</text>
  <text x="250" y="22" text-anchor="middle" font-family="Arial,sans-serif" font-size="12" fill="#888">Top Center</text>
  <text x="417" y="22" text-anchor="middle" font-family="Arial,sans-serif" font-size="12" fill="#888">Top Right</text>
  <!-- Row 2 labels -->
  <text x="83" y="182" text-anchor="middle" font-family="Arial,sans-serif" font-size="12" fill="#888">Bottom Left</text>
  <text x="250" y="182" text-anchor="middle" font-family="Arial,sans-serif" font-size="12" fill="#888">Bottom Center</text>
  <text x="417" y="182" text-anchor="middle" font-family="Arial,sans-serif" font-size="12" fill="#888">Bottom Right</text>

  <!-- Top Left: Red Circle -->
  <circle cx="83" cy="100" r="45" fill="#c8102e"/>

  <!-- Top Center: Blue Triangle -->
  <polygon points="250,32 205,138 295,138" fill="#2563eb"/>

  <!-- Top Right: Green Square -->
  <rect x="372" y="38" width="90" height="90" fill="#15803d"/>

  <!-- Bottom Left: Yellow Star (5-point) -->
  <polygon points="83,200 91,222 115,222 96,236 103,258 83,244 63,258 70,236 51,222 75,222" fill="#d97706"/>

  <!-- Bottom Center: Purple Rectangle -->
  <rect x="190" y="205" width="120" height="60" fill="#7c3aed"/>

  <!-- Bottom Right: Orange Diamond -->
  <polygon points="417,195 455,240 417,285 379,240" fill="#ea580c"/>
</svg>`,
    questions: [
      { id: 'mem1-1', text: 'What color was the triangle?', opts: ['Red', 'Blue', 'Green', 'Yellow'], correct: 1, exp: 'The triangle in the top center was blue.' },
      { id: 'mem1-2', text: 'What shape was orange?', opts: ['Circle', 'Star', 'Square', 'Diamond'], correct: 3, exp: 'The orange shape was a diamond in the bottom right.' },
      { id: 'mem1-3', text: 'Which shape was in the top left?', opts: ['Triangle', 'Square', 'Circle', 'Star'], correct: 2, exp: 'The red circle was in the top left position.' },
    ],
  },
  {
    id: 'mem2',
    title: 'Object Layout',
    studyTime: 60,
    answerTime: 45,
    studyType: 'svg',
    studySvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 300" style="width:100%;border-radius:12px;display:block;">
  <rect width="500" height="300" fill="#f0f0f0"/>
  <text x="250" y="24" text-anchor="middle" font-family="Arial,sans-serif" font-size="14" fill="#444" font-weight="bold">Study these objects and their positions</text>

  <!-- Top row -->
  <!-- Tennis Racket (teal) -->
  <rect x="20" y="45" width="130" height="80" fill="#0d9488" rx="8"/>
  <text x="85" y="85" text-anchor="middle" font-family="Arial,sans-serif" font-size="13" fill="white" font-weight="bold">Tennis Racket</text>

  <!-- Target (red) -->
  <rect x="185" y="45" width="130" height="80" fill="#dc2626" rx="8"/>
  <text x="250" y="85" text-anchor="middle" font-family="Arial,sans-serif" font-size="13" fill="white" font-weight="bold">Target</text>

  <!-- Book (blue) -->
  <rect x="350" y="45" width="130" height="80" fill="#2563eb" rx="8"/>
  <text x="415" y="85" text-anchor="middle" font-family="Arial,sans-serif" font-size="13" fill="white" font-weight="bold">Book</text>

  <!-- Bottom row -->
  <!-- Football (green) -->
  <rect x="20" y="170" width="130" height="80" fill="#16a34a" rx="8"/>
  <text x="85" y="210" text-anchor="middle" font-family="Arial,sans-serif" font-size="13" fill="white" font-weight="bold">Football</text>

  <!-- Key (yellow) -->
  <rect x="185" y="170" width="130" height="80" fill="#ca8a04" rx="8"/>
  <text x="250" y="210" text-anchor="middle" font-family="Arial,sans-serif" font-size="13" fill="white" font-weight="bold">Key</text>

  <!-- Clock (purple) -->
  <rect x="350" y="170" width="130" height="80" fill="#7c3aed" rx="8"/>
  <text x="415" y="210" text-anchor="middle" font-family="Arial,sans-serif" font-size="13" fill="white" font-weight="bold">Clock</text>

  <!-- Row labels -->
  <text x="250" y="155" text-anchor="middle" font-family="Arial,sans-serif" font-size="11" fill="#666">— Top Row —</text>
  <text x="250" y="265" text-anchor="middle" font-family="Arial,sans-serif" font-size="11" fill="#666">— Bottom Row —</text>
</svg>`,
    questions: [
      { id: 'mem2-1', text: 'Which object was beside the tennis racket?', opts: ['Key', 'Target', 'Football', 'Clock'], correct: 1, exp: 'The Target was directly beside (right of) the Tennis Racket in the top row.' },
      { id: 'mem2-2', text: 'What color was the box containing the Key?', opts: ['Red', 'Blue', 'Yellow', 'Green'], correct: 2, exp: 'The Key was in a yellow box.' },
      { id: 'mem2-3', text: 'Which object was in the bottom right?', opts: ['Football', 'Key', 'Clock', 'Target'], correct: 2, exp: 'The Clock was in the bottom right position.' },
    ],
  },
  {
    id: 'mem3',
    title: 'Colour Sequence',
    studyTime: 45,
    answerTime: 45,
    studyType: 'svg',
    studySvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 200" style="width:100%;border-radius:12px;display:block;">
  <rect width="500" height="200" fill="#f8f9fa"/>
  <text x="250" y="28" text-anchor="middle" font-family="Arial,sans-serif" font-size="14" fill="#444" font-weight="bold">Remember the colour of each numbered circle</text>

  <!-- Circle 1: Red -->
  <circle cx="50" cy="120" r="40" fill="#c8102e"/>
  <text x="50" y="36" text-anchor="middle" font-family="Arial,sans-serif" font-size="13" fill="#555" font-weight="bold">1</text>
  <text x="50" y="125" text-anchor="middle" font-family="Arial,sans-serif" font-size="15" fill="white" font-weight="bold">1</text>

  <!-- Circle 2: Blue -->
  <circle cx="150" cy="120" r="40" fill="#2563eb"/>
  <text x="150" y="36" text-anchor="middle" font-family="Arial,sans-serif" font-size="13" fill="#555" font-weight="bold">2</text>
  <text x="150" y="125" text-anchor="middle" font-family="Arial,sans-serif" font-size="15" fill="white" font-weight="bold">2</text>

  <!-- Circle 3: Yellow -->
  <circle cx="250" cy="120" r="40" fill="#d97706"/>
  <text x="250" y="36" text-anchor="middle" font-family="Arial,sans-serif" font-size="13" fill="#555" font-weight="bold">3</text>
  <text x="250" y="125" text-anchor="middle" font-family="Arial,sans-serif" font-size="15" fill="white" font-weight="bold">3</text>

  <!-- Circle 4: Green -->
  <circle cx="350" cy="120" r="40" fill="#15803d"/>
  <text x="350" y="36" text-anchor="middle" font-family="Arial,sans-serif" font-size="13" fill="#555" font-weight="bold">4</text>
  <text x="350" y="125" text-anchor="middle" font-family="Arial,sans-serif" font-size="15" fill="white" font-weight="bold">4</text>

  <!-- Circle 5: Purple -->
  <circle cx="450" cy="120" r="40" fill="#7c3aed"/>
  <text x="450" y="36" text-anchor="middle" font-family="Arial,sans-serif" font-size="13" fill="#555" font-weight="bold">5</text>
  <text x="450" y="125" text-anchor="middle" font-family="Arial,sans-serif" font-size="15" fill="white" font-weight="bold">5</text>
</svg>`,
    questions: [
      { id: 'mem3-1', text: 'What colour was circle number 3?', opts: ['Red', 'Blue', 'Yellow', 'Green'], correct: 2, exp: 'Circle 3 was yellow.' },
      { id: 'mem3-2', text: 'Which number was the green circle?', opts: ['2', '3', '4', '5'], correct: 2, exp: 'Green was circle number 4.' },
      { id: 'mem3-3', text: 'What colour was beside the yellow circle on its right?', opts: ['Red', 'Blue', 'Green', 'Purple'], correct: 2, exp: 'Circle 4 (green) was directly to the right of circle 3 (yellow).' },
    ],
  },
  {
    id: 'mem4',
    title: 'Room Layout',
    studyTime: 60,
    answerTime: 45,
    studyType: 'svg',
    studySvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 300" style="width:100%;border-radius:12px;display:block;">
  <rect width="500" height="300" fill="#e5e7eb"/>
  <!-- Room border -->
  <rect x="20" y="30" width="460" height="250" fill="#f3f4f6" stroke="#9ca3af" stroke-width="3" rx="6"/>
  <text x="250" y="22" text-anchor="middle" font-family="Arial,sans-serif" font-size="13" fill="#555" font-weight="bold">Room Layout (top-down view)</text>

  <!-- Bed (blue rect) - top left -->
  <rect x="40" y="50" width="140" height="80" fill="#2563eb" rx="6"/>
  <text x="110" y="95" text-anchor="middle" font-family="Arial,sans-serif" font-size="14" fill="white" font-weight="bold">Bed</text>

  <!-- Desk (brown rect) - top right -->
  <rect x="320" y="50" width="140" height="80" fill="#92400e" rx="6"/>
  <text x="390" y="95" text-anchor="middle" font-family="Arial,sans-serif" font-size="14" fill="white" font-weight="bold">Desk</text>

  <!-- Chair (red rect) - bottom left -->
  <rect x="40" y="185" width="100" height="75" fill="#dc2626" rx="6"/>
  <text x="90" y="227" text-anchor="middle" font-family="Arial,sans-serif" font-size="14" fill="white" font-weight="bold">Chair</text>

  <!-- Table (green rect) - bottom center -->
  <rect x="190" y="185" width="120" height="75" fill="#16a34a" rx="6"/>
  <text x="250" y="227" text-anchor="middle" font-family="Arial,sans-serif" font-size="14" fill="white" font-weight="bold">Table</text>

  <!-- Lamp (yellow circle) - bottom right -->
  <circle cx="400" cy="222" r="40" fill="#ca8a04"/>
  <text x="400" y="227" text-anchor="middle" font-family="Arial,sans-serif" font-size="14" fill="white" font-weight="bold">Lamp</text>
</svg>`,
    questions: [
      { id: 'mem4-1', text: 'What was in the top right of the room?', opts: ['Bed', 'Lamp', 'Chair', 'Desk'], correct: 3, exp: 'The Desk was in the top right corner of the room.' },
      { id: 'mem4-2', text: 'What color was the Chair?', opts: ['Blue', 'Green', 'Red', 'Yellow'], correct: 2, exp: 'The Chair was red.' },
      { id: 'mem4-3', text: 'Which furniture item was yellow?', opts: ['Table', 'Chair', 'Lamp', 'Desk'], correct: 2, exp: 'The Lamp was yellow.' },
    ],
  },
  {
    id: 'mem5',
    title: 'Number Board',
    studyTime: 45,
    answerTime: 45,
    studyType: 'svg',
    studySvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 300" style="width:100%;border-radius:12px;display:block;">
  <rect width="500" height="300" fill="#f8f9fa"/>
  <text x="250" y="24" text-anchor="middle" font-family="Arial,sans-serif" font-size="14" fill="#444" font-weight="bold">Remember which number is in each coloured box</text>

  <!-- Row 1 -->
  <!-- 1: red -->
  <rect x="30" y="45" width="120" height="70" fill="#c8102e" rx="8"/>
  <text x="90" y="90" text-anchor="middle" font-family="Arial,sans-serif" font-size="32" fill="white" font-weight="bold">1</text>

  <!-- 2: blue -->
  <rect x="190" y="45" width="120" height="70" fill="#2563eb" rx="8"/>
  <text x="250" y="90" text-anchor="middle" font-family="Arial,sans-serif" font-size="32" fill="white" font-weight="bold">2</text>

  <!-- 3: green -->
  <rect x="350" y="45" width="120" height="70" fill="#15803d" rx="8"/>
  <text x="410" y="90" text-anchor="middle" font-family="Arial,sans-serif" font-size="32" fill="white" font-weight="bold">3</text>

  <!-- Row 2 -->
  <!-- 4: yellow -->
  <rect x="30" y="130" width="120" height="70" fill="#d97706" rx="8"/>
  <text x="90" y="175" text-anchor="middle" font-family="Arial,sans-serif" font-size="32" fill="white" font-weight="bold">4</text>

  <!-- 5: purple -->
  <rect x="190" y="130" width="120" height="70" fill="#7c3aed" rx="8"/>
  <text x="250" y="175" text-anchor="middle" font-family="Arial,sans-serif" font-size="32" fill="white" font-weight="bold">5</text>

  <!-- 6: orange -->
  <rect x="350" y="130" width="120" height="70" fill="#ea580c" rx="8"/>
  <text x="410" y="175" text-anchor="middle" font-family="Arial,sans-serif" font-size="32" fill="white" font-weight="bold">6</text>

  <!-- Row 3 -->
  <!-- 7: teal -->
  <rect x="30" y="215" width="120" height="70" fill="#0d9488" rx="8"/>
  <text x="90" y="260" text-anchor="middle" font-family="Arial,sans-serif" font-size="32" fill="white" font-weight="bold">7</text>

  <!-- 8: pink -->
  <rect x="190" y="215" width="120" height="70" fill="#db2777" rx="8"/>
  <text x="250" y="260" text-anchor="middle" font-family="Arial,sans-serif" font-size="32" fill="white" font-weight="bold">8</text>

  <!-- 9: gray -->
  <rect x="350" y="215" width="120" height="70" fill="#6b7280" rx="8"/>
  <text x="410" y="260" text-anchor="middle" font-family="Arial,sans-serif" font-size="32" fill="white" font-weight="bold">9</text>
</svg>`,
    questions: [
      { id: 'mem5-1', text: 'What number was in the purple box?', opts: ['4', '5', '6', '7'], correct: 1, exp: 'The number 5 was in the purple box.' },
      { id: 'mem5-2', text: 'What color was the box containing number 7?', opts: ['Orange', 'Pink', 'Gray', 'Teal'], correct: 3, exp: 'Number 7 was in the teal box.' },
      { id: 'mem5-3', text: 'Which number was in the top right?', opts: ['1', '3', '7', '9'], correct: 1, exp: 'The number 3 was in the top right position of the grid.' },
    ],
  },
];
