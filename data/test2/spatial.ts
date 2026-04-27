import type { Question } from '@/types';
import { gearSVG, cubeNetSVG } from '@/data/shared/svgHelpers';

// ─── SVG helpers ───────────────────────────────────────────────────────────────

const qSvg = (inner: string) =>
  `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><rect x="1" y="1" width="98" height="98" rx="8" fill="#fff" stroke="#d1d5db" strokeWidth="1.5"/>${inner}</svg>`;

const oSvg = (inner: string) =>
  `<svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"><rect x="1" y="1" width="58" height="58" rx="6" fill="#fff" stroke="#d1d5db" strokeWidth="1.2"/>${inner}</svg>`;

const F = '#f0fdf4';
const S = '#16a34a';

// Rotate at correct pivot for 100×100 question SVG
const rotQ = (d: string, deg: number) =>
  `<path d="${d}" fill="${F}" stroke="${S}" strokeWidth="2.2" strokeLinejoin="round" strokeLinecap="round" transform="rotate(${deg},50,50)"/>`;

// Rotate at correct pivot for 60×60 option SVG
const rotO = (d: string, deg: number) =>
  `<path d="${d}" fill="#fefce8" stroke="#ca8a04" strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round" transform="rotate(${deg},30,30)"/>`;

// ─── Shape paths (centred at 50,50 for Q, at 30,30 for O) ─────────────────────

// Chevron pointing RIGHT, centred at 50,50
const CHEV_Q = 'M22,38 L54,38 L72,50 L54,62 L22,62 L40,50 Z';
const CHEV_O  = 'M8,22 L32,22 L44,30 L32,38 L8,38 L20,30 Z';

// Flag shape (rectangle + triangle) pointing RIGHT, centred at 50,50
const FLAG_Q = 'M22,30 L22,70 L36,70 L36,58 L72,50 L36,42 L36,30 Z';
const FLAG_O  = 'M8,14 L8,46 L18,46 L18,37 L50,30 L18,23 L18,14 Z';

// C-shape (open on right), centred at 50,50
const C_Q = 'M68,28 L38,28 L38,38 L56,38 L56,62 L38,62 L38,72 L68,72 L68,62 L50,62 L50,38 L68,38 Z';
const C_O  = 'M46,12 L22,12 L22,20 L36,20 L36,40 L22,40 L22,48 L46,48 L46,40 L32,40 L32,20 L46,20 Z';

// Isosceles triangle pointing UP, centred at 50,50
const TRI_Q = 'M50,22 L76,74 L24,74 Z';
const TRI_O  = 'M30,10 L52,52 L8,52 Z';

// Key shape (circle + stem), centred at 50,50
// Represented as an irregular polygon approximating a key
const KEY_Q = 'M32,32 L32,45 L38,45 L38,68 L50,68 L50,62 L58,62 L58,55 L50,55 L50,45 L62,45 L62,32 L32,32 Z';
const KEY_O  = 'M14,14 L14,24 L20,24 L20,44 L28,44 L28,40 L34,40 L34,34 L28,34 L28,24 L38,24 L38,14 Z';

// Arrow with forked tail pointing LEFT, centred at 50,50
const FORK_Q = 'M78,44 L55,44 L55,34 L22,50 L55,66 L55,56 L72,56 L72,64 L82,64 L82,44 Z';
const FORK_O  = 'M50,26 L34,26 L34,18 L10,30 L34,42 L34,34 L46,34 L46,40 L52,40 L52,26 Z';

// Hexagon, centred at 50,50
const HEX_Q = 'M50,22 L70,32 L70,62 L50,72 L30,62 L30,32 Z';
const HEX_O  = 'M30,10 L46,18 L46,42 L30,50 L14,42 L14,18 Z';

// Cross/plus with one arm longer (pointing DOWN), centred at 50,50
const ASYM_CROSS_Q = 'M38,22 L62,22 L62,42 L76,42 L76,56 L62,56 L62,78 L38,78 L38,56 L24,56 L24,42 L38,42 Z';
const ASYM_CROSS_O  = 'M20,10 L40,10 L40,25 L50,25 L50,36 L40,36 L40,52 L20,52 L20,36 L10,36 L10,25 L20,25 Z';

// ─── isoCube helper ────────────────────────────────────────────────────────────

const isoCube = (x: number, y: number, top = '#f8fafc', left = '#e2e8f0', right = '#cbd5e1') => {
  const topPts  = `${x},${y-10} ${x+10},${y-16} ${x+20},${y-10} ${x+10},${y-4}`;
  const leftPts = `${x},${y-10} ${x},${y+6} ${x+10},${y+12} ${x+10},${y-4}`;
  const rightPts= `${x+10},${y-4} ${x+20},${y-10} ${x+20},${y+6} ${x+10},${y+12}`;
  return `<polygon points="${topPts}" fill="${top}" stroke="#333" strokeWidth="1.6"/>
          <polygon points="${leftPts}" fill="${left}" stroke="#333" strokeWidth="1.6"/>
          <polygon points="${rightPts}" fill="${right}" stroke="#333" strokeWidth="1.6"/>`;
};

const cubeRow = (coords: Array<[number,number]>, ox: number, oy: number, scale = 1) =>
  coords.map(([cx,cy]) => isoCube(ox+cx*20*scale, oy+cy*16*scale, '#fef9c3','#fde047','#ca8a04')).join('');

const mechSvg = (inner: string) =>
  `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><rect x="1" y="1" width="98" height="98" rx="8" fill="#fff" stroke="#d1d5db" strokeWidth="1.5"/>${inner}</svg>`;

const gearDiag = (items: Array<{cx:number;cy:number;r:number;teeth:number;label:string;sub?:string}>) =>
  mechSvg(items.map(g => gearSVG(g.cx,g.cy,g.r,g.teeth,'#16a34a',g.label,g.sub)).join(''));

const leverSvg = (fulcrumX: number, leftX: number, rightX: number, leftW: string, rightW: string) =>
  mechSvg(`
    <line x1="12" y1="62" x2="88" y2="62" stroke="#555" strokeWidth="3" strokeLinecap="round"/>
    <polygon points="${fulcrumX},62 ${fulcrumX-5},76 ${fulcrumX+5},76" fill="#9ca3af" stroke="#555" strokeWidth="1.2"/>
    <rect x="${leftX-10}" y="43" width="20" height="14" rx="3" fill="#fee2e2" stroke="#c8102e" strokeWidth="1.5"/>
    <text x="${leftX}" y="53" textAnchor="middle" fontSize="7" fontWeight="700" fill="#111">${leftW}</text>
    <rect x="${rightX-10}" y="43" width="20" height="14" rx="3" fill="#dbeafe" stroke="#2563eb" strokeWidth="1.5" strokeDasharray="2.5 1.5"/>
    <text x="${rightX}" y="53" textAnchor="middle" fontSize="7" fontWeight="700" fill="#2563eb">${rightW}</text>
  `);

// Inclined plane / wedge SVG
const inclinedSvg = mechSvg(`
  <polygon points="15,80 85,80 85,30" fill="#f3f4f6" stroke="#555" strokeWidth="2"/>
  <rect x="60" y="20" width="20" height="16" rx="2" fill="#fee2e2" stroke="#c8102e" strokeWidth="1.5"/>
  <text x="70" y="31" textAnchor="middle" fontSize="6" fontWeight="700" fill="#111">40kg</text>
  <text x="50" y="72" textAnchor="middle" fontSize="7" fontWeight="700" fill="#555">30°</text>
  <text x="30" y="55" textAnchor="middle" fontSize="7" fontWeight="700" fill="#2563eb">? N</text>
`);

// Three-pulley compound SVG
const compoundPulleySvg = mechSvg(`
  <rect x="30" y="6" width="40" height="5" rx="2" fill="#9ca3af"/>
  <circle cx="50" cy="22" r="10" fill="#f3f4f6" stroke="#555" strokeWidth="2"/>
  <circle cx="50" cy="22" r="2.5" fill="#6b7280"/>
  <circle cx="50" cy="50" r="10" fill="#f3f4f6" stroke="#555" strokeWidth="2"/>
  <circle cx="50" cy="50" r="2.5" fill="#6b7280"/>
  <line x1="40" y1="22" x2="40" y2="50" stroke="#555" strokeWidth="1.8"/>
  <line x1="60" y1="22" x2="60" y2="50" stroke="#555" strokeWidth="1.8"/>
  <rect x="34" y="62" width="32" height="14" fill="#fee2e2" stroke="#c8102e" strokeWidth="1.5"/>
  <text x="50" y="58" textAnchor="middle" fontSize="7" fontWeight="700" fill="#c8102e">120 kg</text>
  <line x1="60" y1="50" x2="78" y2="78" stroke="#2563eb" strokeWidth="1.8"/>
  <path d="M73,73 L79,81 L85,73" fill="none" stroke="#2563eb" strokeWidth="1.8"/>
  <text x="82" y="84" fontSize="7" fontWeight="700" fill="#2563eb">?</text>
`);

// Gear chain with idler
const idlerGearSvg = gearDiag([
  {cx:18,cy:50,r:13,teeth:10,label:'A',sub:'CW'},
  {cx:44,cy:50,r:10,teeth:8,label:'B'},
  {cx:67,cy:50,r:12,teeth:9,label:'C',sub:'?'},
]);

// Wheel and axle
const wheelAxleSvg = mechSvg(`
  <circle cx="50" cy="50" r="30" fill="#f3f4f6" stroke="#555" strokeWidth="2"/>
  <circle cx="50" cy="50" r="10" fill="#e2e8f0" stroke="#555" strokeWidth="2"/>
  <text x="50" y="26" textAnchor="middle" fontSize="6" fontWeight="700" fill="#555">Wheel r=30</text>
  <text x="50" y="54" textAnchor="middle" fontSize="6" fontWeight="700" fill="#555">Axle r=10</text>
  <path d="M80,50 L90,50" stroke="#c8102e" strokeWidth="2"/>
  <text x="88" y="48" fontSize="6" fill="#c8102e" fontWeight="700">F?</text>
  <path d="M20,50 L10,50" stroke="#2563eb" strokeWidth="2"/>
  <text x="5" y="48" fontSize="6" fill="#2563eb" fontWeight="700">60N</text>
`);

// ─── Cube net data ────────────────────────────────────────────────────────────

// Face colours for NET_C
const NC = { top:'#c8102e', left:'#2563eb', center:'#111827', right:'#d97706', below:'#15803d', bottom:'#7c3aed' };
const NET_C = {
  top:    { symbol: '', color: NC.top    },   // Red
  left:   { symbol: '', color: NC.left   },   // Blue
  center: { symbol: '', color: NC.center },   // Black
  right:  { symbol: '', color: NC.right  },   // Orange
  below:  { symbol: '', color: NC.below  },   // Green
  bottom: { symbol: '', color: NC.bottom },   // Purple
};

// NET_D uses a different colour palette for variety
const ND = { top:'#0891b2', left:'#16a34a', center:'#dc2626', right:'#7c3aed', below:'#d97706', bottom:'#374151' };
const NET_D = {
  top:    { symbol: '', color: ND.top    },   // Teal
  left:   { symbol: '', color: ND.left   },   // Green
  center: { symbol: '', color: ND.center },   // Red
  right:  { symbol: '', color: ND.right  },   // Purple
  below:  { symbol: '', color: ND.below  },   // Gold
  bottom: { symbol: '', color: ND.bottom },   // Dark grey
};

const netPromptC = qSvg(`<g transform="translate(6,2) scale(0.29)">${cubeNetSVG(NET_C, 55)}</g>`);
const netPromptD = qSvg(`<g transform="translate(6,2) scale(0.29)">${cubeNetSVG(NET_D, 55)}</g>`);

// netOption: pass hex colour strings for each visible face
const netOption = (topCol: string, frontCol: string, rightCol: string) =>
  oSvg(`
    <polygon points="10,28 30,16 50,28 30,40" fill="${topCol}" stroke="#333" strokeWidth="1.5"/>
    <polygon points="10,28 10,48 30,56 30,40" fill="${frontCol}" stroke="#333" strokeWidth="1.5"/>
    <polygon points="30,40 50,28 50,48 30,56" fill="${rightCol}" stroke="#333" strokeWidth="1.5"/>
  `);

// ─── Part A: 2D Rotations ─────────────────────────────────────────────────────

const partA: Question[] = [
  {
    id: 'T2-A-1',
    subsectionId: 'spatial-2d',
    text: 'The <strong>chevron</strong> points right. Which option shows it after a <strong>90° clockwise</strong> rotation, then another <strong>90° clockwise</strong> rotation, then another <strong>90° clockwise</strong> rotation?',
    opts: ['A','B','C','D'],
    correct: 3,
    // 0 + 90 + 90 + 90 = 270°
    exp: 'Step-by-step: 0° → +90° = 90° → +90° = 180° → +90° = 270°. The chevron ends pointing up. Option D is correct.',
    promptSvg: qSvg(rotQ(CHEV_Q, 0)),
    choicesSvg: [
      oSvg(rotO(CHEV_O, 90)),   // A: after step 1
      oSvg(rotO(CHEV_O, 180)),  // B: after step 2
      oSvg(rotO(CHEV_O, 0)),    // C: unchanged
      oSvg(rotO(CHEV_O, 270)),  // D: final (270°) ✓
    ],
  },
  {
    id: 'T2-A-2',
    subsectionId: 'spatial-2d',
    text: 'Which option shows the <strong>flag shape</strong> after a <strong>90° counter-clockwise</strong> rotation, then a <strong>180° clockwise</strong> rotation, then a <strong>90° counter-clockwise</strong> rotation?',
    opts: ['A','B','C','D'],
    correct: 3,
    // 0 - 90 + 180 - 90 = 0°
    exp: 'Step-by-step: 0° → −90° = 270° → +180° = 90° → −90° = 0°. The flag returns to its original position. Option D is correct.',
    promptSvg: qSvg(rotQ(FLAG_Q, 0)),
    choicesSvg: [
      oSvg(rotO(FLAG_O, 270)),  // A: after step 1
      oSvg(rotO(FLAG_O, 90)),   // B: after step 2
      oSvg(rotO(FLAG_O, 180)),  // C: 180°
      oSvg(rotO(FLAG_O, 0)),    // D: final (0° — unchanged!) ✓
    ],
  },
  {
    id: 'T2-A-3',
    subsectionId: 'spatial-2d',
    text: 'Which option shows the <strong>C-shape</strong> after a <strong>90° clockwise</strong> rotation, then a <strong>180° counter-clockwise</strong> rotation, then a <strong>90° clockwise</strong> rotation, then a <strong>90° counter-clockwise</strong> rotation?',
    opts: ['A','B','C','D'],
    correct: 3,
    // 0 + 90 - 180 + 90 - 90 = -90 → 270°
    exp: 'Step-by-step: 0° → +90° = 90° → −180° = −90° (270°) → +90° = 0° → −90° = 270°. Option D is correct.',
    promptSvg: qSvg(rotQ(C_Q, 0)),
    choicesSvg: [
      oSvg(rotO(C_O, 90)),   // A: after step 1
      oSvg(rotO(C_O, 0)),    // B: after step 3
      oSvg(rotO(C_O, 180)),  // C: 180°
      oSvg(rotO(C_O, 270)),  // D: final (270°) ✓
    ],
  },
  {
    id: 'T2-A-4',
    subsectionId: 'spatial-2d',
    text: 'Which option shows the <strong>triangle</strong> after a <strong>90° clockwise</strong> rotation, then a <strong>180° clockwise</strong> rotation, then a <strong>90° counter-clockwise</strong> rotation?',
    opts: ['A','B','C','D'],
    correct: 1,
    // 0 + 90 + 180 - 90 = 180°
    exp: 'Step-by-step: 0° → +90° CW = 90° → +180° CW = 270° → −90° CCW = 180°. The triangle points down. Option B is correct.',
    promptSvg: qSvg(rotQ(TRI_Q, 0)),
    choicesSvg: [
      oSvg(rotO(TRI_O, 90)),   // A: after step 1
      oSvg(rotO(TRI_O, 180)),  // B: final (180°) ✓
      oSvg(rotO(TRI_O, 270)),  // C: after step 2
      oSvg(rotO(TRI_O, 0)),    // D: unchanged
    ],
  },
  {
    id: 'T2-A-5',
    subsectionId: 'spatial-2d',
    text: 'Which option shows the <strong>key shape</strong> after a <strong>90° clockwise</strong> rotation, then a <strong>180° clockwise</strong> rotation, then a <strong>180° counter-clockwise</strong> rotation?',
    opts: ['A','B','C','D'],
    correct: 0,
    // 0 + 90 + 180 - 180 = 90°
    exp: 'Step-by-step: 0° → +90° = 90° → +180° = 270° → −180° = 90°. The key ends at 90° CW. Option A is correct.',
    promptSvg: qSvg(rotQ(KEY_Q, 0)),
    choicesSvg: [
      oSvg(rotO(KEY_O, 90)),   // A: final (90°) ✓
      oSvg(rotO(KEY_O, 0)),    // B: unchanged
      oSvg(rotO(KEY_O, 270)),  // C: after step 2
      oSvg(rotO(KEY_O, 180)),  // D: 180°
    ],
  },
  {
    id: 'T2-A-6',
    subsectionId: 'spatial-2d',
    text: 'Which option shows the <strong>forked arrow</strong> after a <strong>90° clockwise</strong> rotation, then a <strong>180° clockwise</strong> rotation?',
    opts: ['A','B','C','D'],
    correct: 3,
    // 0 + 90 + 180 = 270°
    exp: 'Step-by-step: 0° → +90° CW = 90° → +180° CW = 270°. The forked arrow ends pointing up. Option D is correct.',
    promptSvg: qSvg(rotQ(FORK_Q, 0)),
    choicesSvg: [
      oSvg(rotO(FORK_O, 90)),   // A: after step 1
      oSvg(rotO(FORK_O, 0)),    // B: unchanged
      oSvg(rotO(FORK_O, 180)),  // C: 180°
      oSvg(rotO(FORK_O, 270)),  // D: final (270°) ✓
    ],
  },
  {
    id: 'T2-A-7',
    subsectionId: 'spatial-2d',
    text: 'Which option shows the <strong>hexagon</strong> after a <strong>180° clockwise</strong> rotation, then a <strong>90° counter-clockwise</strong> rotation?',
    opts: ['A','B','C','D'],
    correct: 1,
    // 0 + 180 - 90 = 90°
    exp: 'Step-by-step: 0° → +180° = 180° → −90° CCW = 90°. The hexagon ends with a pointed top. Option B is correct.',
    promptSvg: qSvg(rotQ(HEX_Q, 0)),
    choicesSvg: [
      oSvg(rotO(HEX_O, 180)),  // A: after step 1
      oSvg(rotO(HEX_O, 90)),   // B: final (90°) ✓
      oSvg(rotO(HEX_O, 0)),    // C: unchanged
      oSvg(rotO(HEX_O, 270)),  // D: 270°
    ],
  },
  {
    id: 'T2-A-8',
    subsectionId: 'spatial-2d',
    text: 'Which option shows the <strong>asymmetric cross</strong> after a <strong>90° counter-clockwise</strong> rotation, then a <strong>90° clockwise</strong> rotation, then a <strong>180° clockwise</strong> rotation?',
    opts: ['A','B','C','D'],
    correct: 3,
    // 0 - 90 + 90 + 180 = 180°
    exp: 'Step-by-step: 0° → −90° = 270° → +90° = 0° → +180° = 180°. The longer arm ends at the top. Option D is correct.',
    promptSvg: qSvg(rotQ(ASYM_CROSS_Q, 0)),
    choicesSvg: [
      oSvg(rotO(ASYM_CROSS_O, 270)),  // A: after step 1
      oSvg(rotO(ASYM_CROSS_O, 0)),    // B: after step 2 (back to start)
      oSvg(rotO(ASYM_CROSS_O, 90)),   // C: 90°
      oSvg(rotO(ASYM_CROSS_O, 180)),  // D: final (180°) ✓
    ],
  },
];

// ─── Part B: Reflection / mirror questions ───────────────────────────────────

const flipH_O = (d: string) =>
  oSvg(`<path d="${d}" fill="#eff6ff" stroke="#2563eb" strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round" transform="scale(-1,1) translate(-60,0)"/>`);

const flipV_O = (d: string) =>
  oSvg(`<path d="${d}" fill="#eff6ff" stroke="#2563eb" strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round" transform="scale(1,-1) translate(0,-60)"/>`);

const partB: Question[] = [
  {
    id: 'T2-B-1',
    subsectionId: 'spatial-2d',
    text: 'Which option shows the <strong>chevron</strong> reflected across the <strong>vertical axis</strong> (flipped left-right)?',
    opts: ['A','B','C','D'],
    correct: 0,
    exp: 'Flipping the chevron left-right reverses its direction — it now points left. Option A is correct.',
    promptSvg: qSvg(rotQ(CHEV_Q, 0)),
    choicesSvg: [
      flipH_O(CHEV_O),           // A: horizontal flip ✓
      oSvg(rotO(CHEV_O, 180)),   // B: 180° rotation
      oSvg(rotO(CHEV_O, 90)),    // C: 90° rotation
      oSvg(rotO(CHEV_O, 270)),   // D: 270° rotation
    ],
  },
  {
    id: 'T2-B-2',
    subsectionId: 'spatial-2d',
    text: 'Which option shows the <strong>flag shape</strong> reflected across the <strong>horizontal axis</strong> (flipped top-bottom)?',
    opts: ['A','B','C','D'],
    correct: 3,
    exp: 'Flipping the flag top-to-bottom mirrors it vertically — the pole and flag flip upside-down. Option D is correct.',
    promptSvg: qSvg(rotQ(FLAG_Q, 0)),
    choicesSvg: [
      oSvg(rotO(FLAG_O, 90)),    // A: 90° rotation
      oSvg(rotO(FLAG_O, 180)),   // B: 180° rotation
      oSvg(rotO(FLAG_O, 270)),   // C: 270° rotation
      flipV_O(FLAG_O),           // D: vertical flip ✓
    ],
  },
  {
    id: 'T2-B-3',
    subsectionId: 'spatial-2d',
    text: 'Which option shows the <strong>key shape</strong> reflected across the <strong>vertical axis</strong> (flipped left-right)?',
    opts: ['A','B','C','D'],
    correct: 2,
    exp: 'Flipping the key left-right mirrors it horizontally. Option C is correct.',
    promptSvg: qSvg(rotQ(KEY_Q, 0)),
    choicesSvg: [
      oSvg(rotO(KEY_O, 90)),    // A: 90° rotation
      oSvg(rotO(KEY_O, 180)),   // B: 180° rotation
      flipH_O(KEY_O),           // C: horizontal flip ✓
      oSvg(rotO(KEY_O, 270)),   // D: 270° rotation
    ],
  },
  {
    id: 'T2-B-4',
    subsectionId: 'spatial-2d',
    text: 'Which option shows the <strong>fork shape</strong> reflected across the <strong>horizontal axis</strong> (flipped top-bottom)?',
    opts: ['A','B','C','D'],
    correct: 1,
    exp: 'Flipping the fork top-to-bottom mirrors it vertically. Option B is correct.',
    promptSvg: qSvg(rotQ(FORK_Q, 0)),
    choicesSvg: [
      oSvg(rotO(FORK_O, 90)),    // A: 90° rotation
      flipV_O(FORK_O),           // B: vertical flip ✓
      oSvg(rotO(FORK_O, 180)),   // C: 180° rotation
      oSvg(rotO(FORK_O, 270)),   // D: 270° rotation
    ],
  },
  {
    id: 'T2-B-5',
    subsectionId: 'spatial-2d',
    text: 'Which option shows the <strong>asymmetric cross</strong> reflected across the <strong>vertical axis</strong> (flipped left-right)?',
    opts: ['A','B','C','D'],
    correct: 3,
    exp: 'The asymmetric cross has wider arms on one side. Flipping it left-right swaps which side is wider. Option D is correct.',
    promptSvg: qSvg(rotQ(ASYM_CROSS_Q, 0)),
    choicesSvg: [
      oSvg(rotO(ASYM_CROSS_O, 90)),    // A: 90° rotation
      oSvg(rotO(ASYM_CROSS_O, 180)),   // B: 180° rotation
      oSvg(rotO(ASYM_CROSS_O, 270)),   // C: 270° rotation
      flipH_O(ASYM_CROSS_O),           // D: horizontal flip ✓
    ],
  },
  {
    id: 'T2-B-6',
    subsectionId: 'spatial-2d',
    text: 'Which option shows the <strong>C-shape</strong> reflected across the <strong>horizontal axis</strong> (flipped top-bottom)?',
    opts: ['A','B','C','D'],
    correct: 0,
    exp: 'The C-shape is symmetric top-to-bottom, so a vertical flip looks identical. Option A (the flip) is correct.',
    promptSvg: qSvg(rotQ(C_Q, 0)),
    choicesSvg: [
      flipV_O(C_O),           // A: vertical flip ✓ (same as original for symmetric C)
      oSvg(rotO(C_O, 90)),    // B: 90° rotation
      oSvg(rotO(C_O, 180)),   // C: 180° rotation
      oSvg(rotO(C_O, 270)),   // D: 270° rotation
    ],
  },
];

// ─── Part C: Mechanical reasoning ────────────────────────────────────────────

const partC: Question[] = [
  {
    id: 'T2-C-1',
    subsectionId: 'spatial-mech',
    text: 'An idler gear B sits between gears A and C. A turns <strong>CW</strong>. Which way does C turn?',
    opts: ['Clockwise','Counter-clockwise','Same as B','Depends on tooth count'],
    correct: 0,
    exp: 'A→B reverses direction. B→C reverses again. Two reversals restore the original direction: C turns clockwise, same as A.',
    promptSvg: idlerGearSvg,
  },
  {
    id: 'T2-C-2',
    subsectionId: 'spatial-mech',
    text: 'Gear A has <strong>20 teeth at 60 RPM</strong>. Gear B has <strong>60 teeth</strong>. How fast does B turn?',
    opts: ['180 RPM','60 RPM','20 RPM','10 RPM'],
    correct: 2,
    exp: 'Speed ratio = 20/60 = 1/3. B turns at 60 × (1/3) = 20 RPM. Larger gear turns slower.',
    promptSvg: gearDiag([
      {cx:22,cy:50,r:11,teeth:8,label:'A',sub:'20T·60RPM'},
      {cx:60,cy:50,r:22,teeth:14,label:'B',sub:'60T·?'},
    ]),
  },
  {
    id: 'T2-C-3',
    subsectionId: 'spatial-mech',
    text: 'A <strong>wheel and axle</strong>: the wheel radius is 30 cm, the axle radius is 10 cm. A 60 N load is on the axle. How much force on the wheel lifts it?',
    opts: ['60 N','20 N','180 N','30 N'],
    correct: 1,
    exp: 'Mechanical advantage = wheel radius / axle radius = 30/10 = 3. Force = 60/3 = 20 N.',
    promptSvg: wheelAxleSvg,
  },
  {
    id: 'T2-C-4',
    subsectionId: 'spatial-mech',
    text: 'A lever\'s fulcrum is <strong>25 cm from the left</strong> and 75 cm from the right. A 30 kg weight is on the left. What weight on the right balances it?',
    opts: ['30 kg','15 kg','10 kg','90 kg'],
    correct: 2,
    exp: 'Torque: 30×25 = ?×75 → ? = 750/75 = 10 kg. Longer side needs less weight.',
    promptSvg: leverSvg(38, 18, 78, '30kg', '?'),
  },
  {
    id: 'T2-C-5',
    subsectionId: 'spatial-mech',
    text: 'A compound pulley has <strong>2 rope sections</strong> supporting a movable block holding 120 kg. How much force is needed?',
    opts: ['120 kg','60 kg','40 kg','30 kg'],
    correct: 1,
    exp: 'With 2 supporting rope sections, mechanical advantage = 2. Force = 120/2 = 60 kg.',
    promptSvg: compoundPulleySvg,
  },
  {
    id: 'T2-C-6',
    subsectionId: 'spatial-mech',
    text: 'A 40 kg box sits on a <strong>frictionless 30° inclined plane</strong>. Which force component acts along the slope?',
    opts: ['40 kg (full weight)','20 kg (half weight)','about 20 kg (sin 30°)','about 35 kg (cos 30°)'],
    correct: 2,
    exp: 'The component of gravity along the slope = mass × sin(angle). Sin(30°) = 0.5, so 40 × 0.5 = 20 kg-force acts along the slope.',
    promptSvg: inclinedSvg,
  },
  {
    id: 'T2-C-7',
    subsectionId: 'spatial-mech',
    text: 'Two gears mesh. Gear X has 24 teeth at 45 RPM; Gear Y has 8 teeth. What speed does Y turn?',
    opts: ['15 RPM','45 RPM','90 RPM','135 RPM'],
    correct: 3,
    exp: 'Speed ratio = 24/8 = 3. Y turns at 45 × 3 = 135 RPM. Smaller gear spins faster.',
    promptSvg: gearDiag([
      {cx:28,cy:50,r:16,teeth:12,label:'X',sub:'24T·45RPM'},
      {cx:57,cy:50,r:8,teeth:6,label:'Y',sub:'8T·?'},
    ]),
  },
  {
    id: 'T2-C-8',
    subsectionId: 'spatial-mech',
    text: 'Two gears with identical tooth counts mesh. Left turns CCW at 50 RPM. The right gear turns:',
    opts: ['CW at 50 RPM','CCW at 50 RPM','CW at 100 RPM','CCW at 25 RPM'],
    correct: 0,
    exp: 'Equal tooth count means equal speed. Meshing gears reverse direction: left CCW → right CW at 50 RPM.',
    promptSvg: gearDiag([
      {cx:28,cy:50,r:14,teeth:10,label:'L',sub:'CCW·50'},
      {cx:58,cy:50,r:14,teeth:10,label:'R',sub:'?'},
    ]),
  },
];

// ─── Part D: Cube nets ────────────────────────────────────────────────────────

const partD: Question[] = [
  {
    id: 'T2-D-1',
    subsectionId: 'spatial-cubes',
    text: 'When this net is folded, which face is <strong>opposite the red face</strong>?',
    opts: ['Purple','Blue','Orange','Green'],
    correct: 0,
    exp: 'In a vertical cross net, the red face (top) is opposite the purple face (bottom). They are at opposite ends of the centre strip.',
    promptSvg: netPromptC,
  },
  {
    id: 'T2-D-2',
    subsectionId: 'spatial-cubes',
    text: 'When this net is folded, which face is <strong>opposite the blue face</strong>?',
    opts: ['Red','Black','Orange','Purple'],
    correct: 2,
    exp: 'The blue face is on the left arm and the orange face is on the right arm of the cross. They fold to opposite sides.',
    promptSvg: netPromptC,
  },
  {
    id: 'T2-D-3',
    subsectionId: 'spatial-cubes',
    text: 'Which cube could be folded from this net?',
    opts: ['A','B','C','D'],
    correct: 2,
    exp: 'Option C shows red (top), black (front), and orange (right) at a corner — red is above black in the strip, orange is to the right of black. All three are adjacent.',
    promptSvg: netPromptC,
    choicesSvg: [
      netOption(NC.top, NC.bottom, NC.left),    // A: red + purple + blue — top & bottom opposite, invalid
      netOption(NC.left, NC.right, NC.center),  // B: blue + orange + black — left & right opposite, invalid
      netOption(NC.top, NC.center, NC.right),   // C: red + black + orange ✓
      netOption(NC.below, NC.bottom, NC.left),  // D: green + purple + blue — invalid
    ],
  },
  {
    id: 'T2-D-4',
    subsectionId: 'spatial-cubes',
    text: 'When this second net is folded, which face is <strong>opposite the teal face</strong>?',
    opts: ['Dark grey','Green','Red','Gold'],
    correct: 0,
    exp: 'In a vertical cross net, the teal face (top) and the dark grey face (bottom) are at opposite ends of the strip — they become opposite faces.',
    promptSvg: netPromptD,
  },
  {
    id: 'T2-D-5',
    subsectionId: 'spatial-cubes',
    text: 'When this second net is folded, which face is <strong>opposite the green face</strong>?',
    opts: ['Teal','Red','Purple','Gold'],
    correct: 2,
    exp: 'The green face is on the left arm and the purple face is on the right arm. Left and right faces of a cross net always become opposite.',
    promptSvg: netPromptD,
  },
  {
    id: 'T2-D-6',
    subsectionId: 'spatial-cubes',
    text: 'Which cube could be folded from the second net?',
    opts: ['A','B','C','D'],
    correct: 1,
    exp: 'Option B shows teal (top), red (front), and green (left) at one corner — teal is above red in the strip, green is to the left of red. All three are adjacent.',
    promptSvg: netPromptD,
    choicesSvg: [
      netOption(ND.top, ND.bottom, ND.left),    // A: teal + dark grey + green — top & bottom opposite, invalid
      netOption(ND.top, ND.center, ND.left),    // B: teal + red + green ✓
      netOption(ND.left, ND.right, ND.below),   // C: green + purple + gold — left & right opposite, invalid
      netOption(ND.below, ND.bottom, ND.right), // D: gold + dark grey + purple — invalid
    ],
  },
];

export const spatialQuestions: Question[] = [...partA, ...partB, ...partC, ...partD];
