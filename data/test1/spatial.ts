import type { Question } from '@/types';
import { gearSVG, cubeNetSVG } from '@/data/shared/svgHelpers';

// ─── SVG helpers ───────────────────────────────────────────────────────────────

const qSvg = (inner: string) =>
  `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><rect x="1" y="1" width="98" height="98" rx="8" fill="#fff" stroke="#d1d5db" strokeWidth="1.5"/>${inner}</svg>`;

const oSvg = (inner: string) =>
  `<svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"><rect x="1" y="1" width="58" height="58" rx="6" fill="#fff" stroke="#d1d5db" strokeWidth="1.2"/>${inner}</svg>`;

// Shape fill / stroke
const F = '#fff5f5';
const S = '#c8102e';

// Rotate a group around a point in 100×100 viewBox (question) or 60×60 (option)
const rotQ = (d: string, deg: number) =>
  `<path d="${d}" fill="${F}" stroke="${S}" strokeWidth="2.2" strokeLinejoin="round" strokeLinecap="round" transform="rotate(${deg},50,50)"/>`;

const rotO = (d: string, deg: number) =>
  `<path d="${d}" fill="#eff6ff" stroke="#2563eb" strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round" transform="rotate(${deg},30,30)"/>`;

// ─── Shape path data (drawn centred at 50,50 for questions, 30,30 for options) ─

// Arrow pointing RIGHT, centred at 50,50 in 100×100
const ARR_Q = 'M20,43 L60,43 L60,34 L80,50 L60,66 L60,57 L20,57 Z';
// Arrow pointing RIGHT, centred at 30,30 in 60×60
const ARR_O = 'M8,25 L34,25 L34,18 L50,30 L34,42 L34,35 L8,35 Z';

// T-shape centred at 50,50 (100×100)
const T_Q = 'M25,35 L75,35 L75,48 L57,48 L57,68 L43,68 L43,48 L25,48 Z';
const T_O  = 'M10,18 L50,18 L50,29 L35,29 L35,47 L25,47 L25,29 L10,29 Z';

// L-shape centred at 50,50 (100×100)
const L_Q = 'M30,28 L45,28 L45,65 L70,65 L70,75 L30,75 Z';
const L_O  = 'M14,12 L24,12 L24,40 L46,40 L46,48 L14,48 Z';

// Z-shape centred at 50,50 (100×100)
const Z_Q = 'M25,28 L75,28 L75,42 L45,58 L75,58 L75,72 L25,72 L25,58 L55,42 L25,42 Z';
const Z_O  = 'M10,12 L50,12 L50,24 L26,36 L50,36 L50,48 L10,48 L10,36 L34,24 L10,24 Z';

// Plus-sign centred at 50,50 (100×100)
const PLUS_Q = 'M38,22 L62,22 L62,38 L78,38 L78,62 L62,62 L62,78 L38,78 L38,62 L22,62 L22,38 L38,38 Z';
const PLUS_O  = 'M22,10 L38,10 L38,22 L50,22 L50,38 L38,38 L38,50 L22,50 L22,38 L10,38 L10,22 L22,22 Z';

// Pentagon centred at 50,50 (100×100)
const PENT_Q = 'M50,22 L76,40 L66,70 L34,70 L24,40 Z';
const PENT_O  = 'M30,10 L50,23 L43,45 L17,45 L10,23 Z';

// Hook centred at 50,50 (100×100)
const HOOK_Q = 'M25,28 L70,28 L70,42 L52,42 L52,60 L70,60 L70,74 L38,74 L38,60 L25,60 Z';
const HOOK_O  = 'M10,12 L42,12 L42,24 L26,24 L26,38 L42,38 L42,48 L18,48 L18,38 L10,38 Z';

// Step shape centred at 50,50 (100×100)
const STEP_Q = 'M20,35 L45,35 L45,50 L60,50 L60,65 L80,65 L80,75 L50,75 L50,60 L35,60 L35,45 L20,45 Z';
const STEP_O  = 'M8,18 L26,18 L26,28 L36,28 L36,40 L50,40 L50,48 L26,48 L26,38 L16,38 L16,28 L8,28 Z';

// ─── isoCube helper (same as before) ─────────────────────────────────────────

const isoCube = (x: number, y: number, top = '#f8fafc', left = '#e2e8f0', right = '#cbd5e1') => {
  const topPts  = `${x},${y-10} ${x+10},${y-16} ${x+20},${y-10} ${x+10},${y-4}`;
  const leftPts = `${x},${y-10} ${x},${y+6} ${x+10},${y+12} ${x+10},${y-4}`;
  const rightPts= `${x+10},${y-4} ${x+20},${y-10} ${x+20},${y+6} ${x+10},${y+12}`;
  return `<polygon points="${topPts}" fill="${top}" stroke="#333" strokeWidth="1.6"/>
          <polygon points="${leftPts}" fill="${left}" stroke="#333" strokeWidth="1.6"/>
          <polygon points="${rightPts}" fill="${right}" stroke="#333" strokeWidth="1.6"/>`;
};

const cubeRow = (coords: Array<[number,number]>, ox: number, oy: number, scale = 1) =>
  coords.map(([cx,cy]) => isoCube(ox+cx*20*scale, oy+cy*16*scale, '#eef2ff','#c7d2fe','#818cf8')).join('');

const mechSvg = (inner: string) =>
  `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><rect x="1" y="1" width="98" height="98" rx="8" fill="#fff" stroke="#d1d5db" strokeWidth="1.5"/>${inner}</svg>`;

const gearDiag = (items: Array<{cx:number;cy:number;r:number;teeth:number;label:string;sub?:string}>) =>
  mechSvg(items.map(g => gearSVG(g.cx,g.cy,g.r,g.teeth,'#2563eb',g.label,g.sub)).join(''));

// Lever SVG
const leverSvg = (fulcrumX: number, leftX: number, rightX: number, leftW: string, rightW: string) =>
  mechSvg(`
    <line x1="12" y1="62" x2="88" y2="62" stroke="#555" strokeWidth="3" strokeLinecap="round"/>
    <polygon points="${fulcrumX},62 ${fulcrumX-5},76 ${fulcrumX+5},76" fill="#9ca3af" stroke="#555" strokeWidth="1.2"/>
    <rect x="${leftX-10}" y="43" width="20" height="14" rx="3" fill="#fee2e2" stroke="#c8102e" strokeWidth="1.5"/>
    <text x="${leftX}" y="53" textAnchor="middle" fontSize="7" fontWeight="700" fill="#111">${leftW}</text>
    <rect x="${rightX-10}" y="43" width="20" height="14" rx="3" fill="#dbeafe" stroke="#2563eb" strokeWidth="1.5" strokeDasharray="2.5 1.5"/>
    <text x="${rightX}" y="53" textAnchor="middle" fontSize="7" fontWeight="700" fill="#2563eb">${rightW}</text>
  `);

// Belt/chain SVG
const beltSvg = mechSvg(`
  <circle cx="28" cy="50" r="14" fill="#f3f4f6" stroke="#555" strokeWidth="2"/>
  <circle cx="72" cy="50" r="14" fill="#f3f4f6" stroke="#555" strokeWidth="2"/>
  <line x1="28" y1="36" x2="72" y2="36" stroke="#6b7280" strokeWidth="2.5"/>
  <line x1="28" y1="64" x2="72" y2="64" stroke="#6b7280" strokeWidth="2.5"/>
  <text x="28" y="53" textAnchor="middle" fontSize="7" fontWeight="700" fill="#111">CW</text>
  <text x="72" y="53" textAnchor="middle" fontSize="7" fontWeight="700" fill="#2563eb">?</text>
`);

// Fixed pulley SVG
const fixedPulleySvg = mechSvg(`
  <rect x="34" y="6" width="32" height="5" rx="2" fill="#9ca3af"/>
  <circle cx="50" cy="22" r="11" fill="#f3f4f6" stroke="#555" strokeWidth="2"/>
  <circle cx="50" cy="22" r="3" fill="#6b7280"/>
  <line x1="39" y1="22" x2="39" y2="62" stroke="#555" strokeWidth="2"/>
  <rect x="30" y="62" width="18" height="12" fill="#fee2e2" stroke="#c8102e" strokeWidth="1.5"/>
  <text x="39" y="58" textAnchor="middle" fontSize="7" fontWeight="700" fill="#c8102e">60 kg</text>
  <line x1="61" y1="22" x2="61" y2="56" stroke="#2563eb" strokeWidth="2"/>
  <path d="M56,50 L61,58 L66,50" fill="none" stroke="#2563eb" strokeWidth="1.8"/>
  <text x="74" y="46" fontSize="8" fontWeight="700" fill="#2563eb">?</text>
`);

// Movable pulley SVG (2:1 MA)
const movePulleySvg = mechSvg(`
  <rect x="28" y="6" width="44" height="5" rx="2" fill="#9ca3af"/>
  <circle cx="42" cy="22" r="9" fill="#f3f4f6" stroke="#555" strokeWidth="2"/>
  <circle cx="42" cy="22" r="2.5" fill="#6b7280"/>
  <circle cx="42" cy="50" r="9" fill="#f3f4f6" stroke="#555" strokeWidth="2"/>
  <circle cx="42" cy="50" r="2.5" fill="#6b7280"/>
  <line x1="33" y1="22" x2="33" y2="50" stroke="#555" strokeWidth="2"/>
  <line x1="51" y1="22" x2="51" y2="50" stroke="#555" strokeWidth="2"/>
  <rect x="28" y="60" width="28" height="12" fill="#fee2e2" stroke="#c8102e" strokeWidth="1.5"/>
  <text x="42" y="56" textAnchor="middle" fontSize="7" fontWeight="700" fill="#c8102e">100 kg</text>
  <line x1="51" y1="50" x2="70" y2="74" stroke="#2563eb" strokeWidth="2"/>
  <path d="M65,68 L71,76 L77,68" fill="none" stroke="#2563eb" strokeWidth="1.8"/>
  <text x="74" y="64" fontSize="8" fontWeight="700" fill="#2563eb">?</text>
`);

// ─── Cube net data ────────────────────────────────────────────────────────────

// Face colours for NET_A (used in question text & netOption lookup)
const NA = { top:'#c8102e', left:'#2563eb', center:'#111827', right:'#d97706', below:'#15803d', bottom:'#7c3aed' };
const NET_A = {
  top:    { symbol: '', color: NA.top    },   // Red
  left:   { symbol: '', color: NA.left   },   // Blue
  center: { symbol: '', color: NA.center },   // Black
  right:  { symbol: '', color: NA.right  },   // Orange
  below:  { symbol: '', color: NA.below  },   // Green
  bottom: { symbol: '', color: NA.bottom },   // Purple
};

// Face colours for NET_B
const NB = { top:'#c8102e', left:'#2563eb', center:'#111827', right:'#d97706', below:'#15803d', bottom:'#7c3aed' };
const NET_B = {
  top:    { symbol: '', color: NB.top    },   // Red
  left:   { symbol: '', color: NB.left   },   // Blue
  center: { symbol: '', color: NB.center },   // Black
  right:  { symbol: '', color: NB.right  },   // Orange
  below:  { symbol: '', color: NB.below  },   // Green
  bottom: { symbol: '', color: NB.bottom },   // Purple
};

const netPromptA = qSvg(`<g transform="translate(6,2) scale(0.29)">${cubeNetSVG(NET_A, 55)}</g>`);
const netPromptB = qSvg(`<g transform="translate(6,2) scale(0.29)">${cubeNetSVG(NET_B, 55)}</g>`);

// netOption: pass hex colours for each visible face
const netOption = (topCol: string, frontCol: string, rightCol: string) =>
  oSvg(`
    <polygon points="10,28 30,16 50,28 30,40" fill="${topCol}" stroke="#333" strokeWidth="1.5"/>
    <polygon points="10,28 10,48 30,56 30,40" fill="${frontCol}" stroke="#333" strokeWidth="1.5"/>
    <polygon points="30,40 50,28 50,48 30,56" fill="${rightCol}" stroke="#333" strokeWidth="1.5"/>
  `);

// ─── Part A: 2D rotations ─────────────────────────────────────────────────────

const partA: Question[] = [
  {
    id: 'T1-A-1',
    subsectionId: 'spatial-2d',
    text: 'The arrow points <strong>right</strong>. Which option shows it after a <strong>90° clockwise</strong> rotation, then a <strong>180° counter-clockwise</strong> rotation, then a <strong>90° counter-clockwise</strong> rotation?',
    opts: ['A','B','C','D'],
    correct: 2,
    // 0 + 90 - 180 - 90 = -180 → 180°
    exp: 'Step-by-step: 0° → +90° CW = 90° → −180° CCW = −90° (270°) → −90° CCW = −180° (180°). The arrow ends pointing left. Option C is correct.',
    promptSvg: qSvg(rotQ(ARR_Q, 0)),
    choicesSvg: [
      oSvg(rotO(ARR_O, 90)),   // A: after step 1 only
      oSvg(rotO(ARR_O, 270)),  // B: after step 2 only
      oSvg(rotO(ARR_O, 180)),  // C: final (180°) ✓
      oSvg(rotO(ARR_O, 0)),    // D: unchanged
    ],
  },
  {
    id: 'T1-A-2',
    subsectionId: 'spatial-2d',
    text: 'Which option shows the <strong>T-shape</strong> after a <strong>90° counter-clockwise</strong> rotation, then a <strong>180° clockwise</strong> rotation, then a <strong>90° clockwise</strong> rotation?',
    opts: ['A','B','C','D'],
    correct: 2,
    // 0 - 90 + 180 + 90 = 180°
    exp: 'Step-by-step: 0° → −90° CCW = 270° → +180° CW = 450° (90°) → +90° CW = 180°. The T is upside-down. Option C is correct.',
    promptSvg: qSvg(rotQ(T_Q, 0)),
    choicesSvg: [
      oSvg(rotO(T_O, 270)),  // A: after step 1 only
      oSvg(rotO(T_O, 90)),   // B: after step 2 only
      oSvg(rotO(T_O, 180)),  // C: final (180°) ✓
      oSvg(rotO(T_O, 0)),    // D: unchanged
    ],
  },
  {
    id: 'T1-A-3',
    subsectionId: 'spatial-2d',
    text: 'Which option shows the <strong>L-shape</strong> after a <strong>90° clockwise</strong> rotation, then another <strong>90° clockwise</strong> rotation, then a <strong>180° counter-clockwise</strong> rotation, then a <strong>90° clockwise</strong> rotation?',
    opts: ['A','B','C','D'],
    correct: 3,
    // 0 + 90 + 90 - 180 + 90 = 90°
    exp: 'Step-by-step: 0° → +90° = 90° → +90° = 180° → −180° = 0° → +90° = 90°. The L ends at 90° CW. Option D is correct.',
    promptSvg: qSvg(rotQ(L_Q, 0)),
    choicesSvg: [
      oSvg(rotO(L_O, 0)),    // A: after step 3 (back to start)
      oSvg(rotO(L_O, 180)),  // B: after step 2
      oSvg(rotO(L_O, 270)),  // C: 270°
      oSvg(rotO(L_O, 90)),   // D: final (90°) ✓
    ],
  },
  {
    id: 'T1-A-4',
    subsectionId: 'spatial-2d',
    text: 'Which option shows the <strong>Z-shape</strong> after a <strong>90° clockwise</strong> rotation, then a <strong>180° clockwise</strong> rotation, then a <strong>90° counter-clockwise</strong> rotation?',
    opts: ['A','B','C','D'],
    correct: 3,
    // 0 + 90 + 180 - 90 = 180°
    exp: 'Step-by-step: 0° → +90° CW = 90° → +180° CW = 270° → −90° CCW = 180°. Option D is correct.',
    promptSvg: qSvg(rotQ(Z_Q, 0)),
    choicesSvg: [
      oSvg(rotO(Z_O, 90)),   // A: after step 1
      oSvg(rotO(Z_O, 270)),  // B: after step 2
      oSvg(rotO(Z_O, 0)),    // C: unchanged
      oSvg(rotO(Z_O, 180)),  // D: final (180°) ✓
    ],
  },
  {
    id: 'T1-A-5',
    subsectionId: 'spatial-2d',
    text: 'Which option shows the <strong>plus sign</strong> after a <strong>90° clockwise</strong> rotation, then a <strong>90° counter-clockwise</strong> rotation, then a <strong>180° clockwise</strong> rotation, then a <strong>90° clockwise</strong> rotation?',
    opts: ['A','B','C','D'],
    correct: 3,
    // 0 + 90 - 90 + 180 + 90 = 270°
    exp: 'Step-by-step: 0° → +90° = 90° → −90° = 0° → +180° = 180° → +90° = 270°. Option D is correct.',
    promptSvg: qSvg(rotQ(PLUS_Q, 0)),
    choicesSvg: [
      oSvg(rotO(PLUS_O, 0)),    // A: after step 2 (back to start)
      oSvg(rotO(PLUS_O, 180)),  // B: after step 3
      oSvg(rotO(PLUS_O, 90)),   // C: after step 1
      oSvg(rotO(PLUS_O, 270)),  // D: final (270°) ✓
    ],
  },
  {
    id: 'T1-A-6',
    subsectionId: 'spatial-2d',
    text: 'Which option shows the <strong>pentagon</strong> after a <strong>90° clockwise</strong> rotation, then a <strong>180° counter-clockwise</strong> rotation?',
    opts: ['A','B','C','D'],
    correct: 2,
    // 0 + 90 - 180 = -90 → 270°
    exp: 'Step-by-step: 0° → +90° CW = 90° → −180° CCW = −90° (270°). The point ends up facing left. Option C is correct.',
    promptSvg: qSvg(rotQ(PENT_Q, 0)),
    choicesSvg: [
      oSvg(rotO(PENT_O, 90)),   // A: after step 1
      oSvg(rotO(PENT_O, 0)),    // B: unchanged
      oSvg(rotO(PENT_O, 270)),  // C: final (270°) ✓
      oSvg(rotO(PENT_O, 180)),  // D: 180°
    ],
  },
  {
    id: 'T1-A-7',
    subsectionId: 'spatial-2d',
    text: 'Which option shows the <strong>hook shape</strong> after a <strong>90° counter-clockwise</strong> rotation, then a <strong>180° clockwise</strong> rotation?',
    opts: ['A','B','C','D'],
    correct: 1,
    // 0 - 90 + 180 = 90°
    exp: 'Step-by-step: 0° → −90° CCW = 270° → +180° CW = 450° (90°). The hook ends at 90° CW. Option B is correct.',
    promptSvg: qSvg(rotQ(HOOK_Q, 0)),
    choicesSvg: [
      oSvg(rotO(HOOK_O, 270)),  // A: after step 1
      oSvg(rotO(HOOK_O, 90)),   // B: final (90°) ✓
      oSvg(rotO(HOOK_O, 0)),    // C: unchanged
      oSvg(rotO(HOOK_O, 180)),  // D: 180°
    ],
  },
  {
    id: 'T1-A-8',
    subsectionId: 'spatial-2d',
    text: 'Which option shows the <strong>staircase shape</strong> after a <strong>90° clockwise</strong> rotation, then a <strong>90° counter-clockwise</strong> rotation, then a <strong>180° clockwise</strong> rotation?',
    opts: ['A','B','C','D'],
    correct: 3,
    // 0 + 90 - 90 + 180 = 180°
    exp: 'Step-by-step: 0° → +90° CW = 90° → −90° CCW = 0° → +180° CW = 180°. Option D is correct.',
    promptSvg: qSvg(rotQ(STEP_Q, 0)),
    choicesSvg: [
      oSvg(rotO(STEP_O, 90)),   // A: after step 1
      oSvg(rotO(STEP_O, 0)),    // B: after step 2 (back to start)
      oSvg(rotO(STEP_O, 270)),  // C: 270°
      oSvg(rotO(STEP_O, 180)),  // D: final (180°) ✓
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
    id: 'T1-B-1',
    subsectionId: 'spatial-2d',
    text: 'Which option shows the <strong>arrow</strong> reflected across the <strong>vertical axis</strong> (flipped left-right)?',
    opts: ['A','B','C','D'],
    correct: 0,
    exp: 'Reflecting across the vertical axis flips left and right — the arrow now points left. Option A is correct.',
    promptSvg: qSvg(rotQ(ARR_Q, 0)),
    choicesSvg: [
      flipH_O(ARR_O),           // A: horizontal flip ✓
      oSvg(rotO(ARR_O, 180)),   // B: 180° rotation
      oSvg(rotO(ARR_O, 90)),    // C: 90° rotation
      oSvg(rotO(ARR_O, 0)),     // D: unchanged
    ],
  },
  {
    id: 'T1-B-2',
    subsectionId: 'spatial-2d',
    text: 'Which option shows the <strong>L-shape</strong> reflected across the <strong>horizontal axis</strong> (flipped top-bottom)?',
    opts: ['A','B','C','D'],
    correct: 2,
    exp: 'Reflecting across the horizontal axis flips the shape upside-down. Option C is correct.',
    promptSvg: qSvg(rotQ(L_Q, 0)),
    choicesSvg: [
      oSvg(rotO(L_O, 180)),   // A: 180° rotation
      oSvg(rotO(L_O, 90)),    // B: 90° rotation
      flipV_O(L_O),           // C: vertical flip ✓
      oSvg(rotO(L_O, 270)),   // D: 270° rotation
    ],
  },
  {
    id: 'T1-B-3',
    subsectionId: 'spatial-2d',
    text: 'Which option shows the <strong>hook shape</strong> reflected across the <strong>horizontal axis</strong> (flipped top-bottom)?',
    opts: ['A','B','C','D'],
    correct: 2,
    exp: 'Flipping the hook top-to-bottom mirrors it vertically. Option C is correct.',
    promptSvg: qSvg(rotQ(HOOK_Q, 0)),
    choicesSvg: [
      oSvg(rotO(HOOK_O, 180)),  // A: 180° rotation
      oSvg(rotO(HOOK_O, 90)),   // B: 90° rotation
      flipV_O(HOOK_O),          // C: vertical flip ✓
      oSvg(rotO(HOOK_O, 270)),  // D: 270° rotation
    ],
  },
  {
    id: 'T1-B-4',
    subsectionId: 'spatial-2d',
    text: 'Which option shows the <strong>Z-shape</strong> reflected across the <strong>vertical axis</strong> (flipped left-right)?',
    opts: ['A','B','C','D'],
    correct: 1,
    exp: 'Flipping the Z left-right produces an S-shape mirror image. Option B is correct.',
    promptSvg: qSvg(rotQ(Z_Q, 0)),
    choicesSvg: [
      oSvg(rotO(Z_O, 90)),    // A: 90° rotation
      flipH_O(Z_O),           // B: horizontal flip (S-shape) ✓
      oSvg(rotO(Z_O, 180)),   // C: 180° rotation
      oSvg(rotO(Z_O, 270)),   // D: 270° rotation
    ],
  },
  {
    id: 'T1-B-5',
    subsectionId: 'spatial-2d',
    text: 'Which option shows the <strong>staircase shape</strong> reflected across the <strong>vertical axis</strong> (flipped left-right)?',
    opts: ['A','B','C','D'],
    correct: 0,
    exp: 'The staircase going down-right becomes down-left when flipped horizontally. Option A is correct.',
    promptSvg: qSvg(rotQ(STEP_Q, 0)),
    choicesSvg: [
      flipH_O(STEP_O),          // A: horizontal flip ✓
      oSvg(rotO(STEP_O, 90)),   // B: 90° rotation
      oSvg(rotO(STEP_O, 180)),  // C: 180° rotation
      oSvg(rotO(STEP_O, 270)),  // D: 270° rotation
    ],
  },
  {
    id: 'T1-B-6',
    subsectionId: 'spatial-2d',
    text: 'Which option shows the <strong>T-shape</strong> reflected across the <strong>horizontal axis</strong> (flipped top-bottom)?',
    opts: ['A','B','C','D'],
    correct: 3,
    exp: 'Flipping the T upside-down mirrors it vertically — the crossbar moves to the bottom. Option D is correct.',
    promptSvg: qSvg(rotQ(T_Q, 0)),
    choicesSvg: [
      oSvg(rotO(T_O, 90)),    // A: 90° rotation
      oSvg(rotO(T_O, 180)),   // B: 180° rotation
      oSvg(rotO(T_O, 270)),   // C: 270° rotation
      flipV_O(T_O),           // D: vertical flip ✓
    ],
  },
];

// ─── Part C: Mechanical reasoning ────────────────────────────────────────────

const partC: Question[] = [
  {
    id: 'T1-C-1',
    subsectionId: 'spatial-mech',
    text: 'Gear A turns <strong>clockwise</strong>. Which way does meshing Gear B turn?',
    opts: ['Clockwise','Counter-clockwise','Does not move','Depends on size'],
    correct: 1,
    exp: 'Meshing gears always rotate in opposite directions — the teeth push each other. Gear B turns counter-clockwise.',
    promptSvg: gearDiag([
      {cx:30,cy:50,r:14,teeth:10,label:'A',sub:'CW'},
      {cx:60,cy:50,r:14,teeth:10,label:'B',sub:'?'},
    ]),
  },
  {
    id: 'T1-C-2',
    subsectionId: 'spatial-mech',
    text: 'Gear A has <strong>30 teeth at 20 RPM</strong>. Gear B has <strong>10 teeth</strong>. How fast does B turn?',
    opts: ['60 RPM CW','60 RPM CCW','6.7 RPM CCW','20 RPM CCW'],
    correct: 1,
    exp: 'Speed ratio = 30/10 = 3×. So B turns at 60 RPM. Meshing reverses direction → CCW at 60 RPM.',
    promptSvg: gearDiag([
      {cx:26,cy:50,r:17,teeth:14,label:'A',sub:'30T·20RPM'},
      {cx:60,cy:50,r:9,teeth:7,label:'B',sub:'10T·?'},
    ]),
  },
  {
    id: 'T1-C-3',
    subsectionId: 'spatial-mech',
    text: 'Three gears mesh in a row (A→B→C). Gear A turns CW. What direction does Gear C turn?',
    opts: ['Clockwise','Counter-clockwise','Same as B','Does not move'],
    correct: 0,
    exp: 'A turns B the opposite way. B then turns C the opposite way again. Two reversals = same direction as A. C turns clockwise.',
    promptSvg: gearDiag([
      {cx:20,cy:50,r:12,teeth:9,label:'A',sub:'CW'},
      {cx:46,cy:50,r:10,teeth:8,label:'B'},
      {cx:70,cy:50,r:9,teeth:7,label:'C',sub:'?'},
    ]),
  },
  {
    id: 'T1-C-4',
    subsectionId: 'spatial-mech',
    text: 'A belt connects two wheels. Left wheel turns <strong>clockwise</strong>. Which way does the right wheel turn?',
    opts: ['Clockwise','Counter-clockwise','It stops','Opposite to belt direction'],
    correct: 0,
    exp: 'A belt (crossed or not) running over two wheels makes both rotate in the same direction. Right wheel turns clockwise.',
    promptSvg: beltSvg,
  },
  {
    id: 'T1-C-5',
    subsectionId: 'spatial-mech',
    text: 'The fulcrum is at the <strong>centre</strong> of the lever. A 30 kg weight on the left is <strong>20 cm</strong> from the fulcrum. What weight 10 cm from the fulcrum on the right balances it?',
    opts: ['15 kg','30 kg','60 kg','10 kg'],
    correct: 2,
    exp: 'Torque: 30×20 = ?×10 → ? = 60 kg. Halving the distance doubles the required weight.',
    promptSvg: leverSvg(50, 20, 65, '30kg', '?'),
  },
  {
    id: 'T1-C-6',
    subsectionId: 'spatial-mech',
    text: 'A <strong>single fixed pulley</strong> supports a 60 kg load. How much force is required to lift it?',
    opts: ['30 kg','45 kg','60 kg','120 kg'],
    correct: 2,
    exp: 'A single fixed pulley changes the direction of the effort but provides no mechanical advantage. You must pull with 60 kg of force.',
    promptSvg: fixedPulleySvg,
  },
  {
    id: 'T1-C-7',
    subsectionId: 'spatial-mech',
    text: 'A <strong>movable pulley</strong> system has 2 rope sections supporting the load. The load is 100 kg. How much pull is needed?',
    opts: ['25 kg','50 kg','100 kg','200 kg'],
    correct: 1,
    exp: 'Two rope sections share the load equally. Mechanical advantage = 2. Pull required = 100 ÷ 2 = 50 kg.',
    promptSvg: movePulleySvg,
  },
  {
    id: 'T1-C-8',
    subsectionId: 'spatial-mech',
    text: 'Gear A (15 teeth) drives Gear B (45 teeth). If A turns at <strong>90 RPM</strong>, how fast does B turn?',
    opts: ['270 RPM','90 RPM','45 RPM','30 RPM'],
    correct: 3,
    exp: 'Speed ratio = 15/45 = 1/3. B turns at 90 × (1/3) = 30 RPM. Larger gear = slower speed.',
    promptSvg: gearDiag([
      {cx:22,cy:50,r:10,teeth:8,label:'A',sub:'15T·90RPM'},
      {cx:58,cy:50,r:20,teeth:14,label:'B',sub:'45T·?'},
    ]),
  },
];

// ─── Part D: Cube nets ────────────────────────────────────────────────────────

const partD: Question[] = [
  {
    id: 'T1-D-1',
    subsectionId: 'spatial-cubes',
    text: 'When this net is folded, which face is <strong>opposite the red face</strong>?',
    opts: ['Purple','Blue','Green','Orange'],
    correct: 0,
    exp: 'In a vertical cross net, the top face (red) folds opposite the bottom face (purple). They end up on opposite sides of the cube.',
    // NA colours: top=red, bottom=purple → correct=0
    promptSvg: netPromptA,
  },
  {
    id: 'T1-D-2',
    subsectionId: 'spatial-cubes',
    text: 'When this net is folded, which face is <strong>opposite the blue face</strong>?',
    opts: ['Red','Black','Orange','Purple'],
    correct: 2,
    exp: 'The left face (blue) is opposite the right face (orange). They are on either side of the centre face.',
    // NA: left=blue, right=orange → correct=2
    promptSvg: netPromptA,
  },
  {
    id: 'T1-D-3',
    subsectionId: 'spatial-cubes',
    text: 'Which cube could be folded from this net?',
    opts: ['A','B','C','D'],
    correct: 1,
    exp: 'Option B shows red (top), black (front), and orange (right) meeting at a corner — all three are mutually adjacent in the net.',
    promptSvg: netPromptA,
    choicesSvg: [
      netOption(NA.top, NA.bottom, NA.left),   // A: red top + purple + blue — red & purple opposite, invalid
      netOption(NA.top, NA.center, NA.right),  // B: red top + black front + orange right ✓
      netOption(NA.center, NA.bottom, NA.left),// C: black + purple + blue — invalid
      netOption(NA.left, NA.bottom, NA.right), // D: blue + purple + orange — blue & orange opposite, invalid
    ],
  },
  {
    id: 'T1-D-4',
    subsectionId: 'spatial-cubes',
    text: 'When this second net is folded, which face is <strong>opposite the black face</strong>?',
    opts: ['Red','Blue','Green','Purple'],
    correct: 2,
    exp: 'The black face is the centre of the cross. The green face is directly below it. When folded, they become opposite faces.',
    // NB: center=black, below=green → correct=2
    promptSvg: netPromptB,
  },
  {
    id: 'T1-D-5',
    subsectionId: 'spatial-cubes',
    text: 'When this second net is folded, which face is <strong>opposite the blue face</strong>?',
    opts: ['Red','Black','Orange','Purple'],
    correct: 2,
    exp: 'The blue face is on the left arm and the orange face is on the right arm of the cross. They fold to opposite sides of the cube.',
    // NB: left=blue, right=orange → correct=2
    promptSvg: netPromptB,
  },
  {
    id: 'T1-D-6',
    subsectionId: 'spatial-cubes',
    text: 'Which cube could be folded from this second net?',
    opts: ['A','B','C','D'],
    correct: 3,
    exp: 'Option D shows red (top), black (front), and orange (right) meeting at a corner — all three are adjacent in the net.',
    promptSvg: netPromptB,
    choicesSvg: [
      netOption(NB.top, NB.bottom, NB.left),    // A: red + purple + blue — top & bottom opposite, invalid
      netOption(NB.center, NB.bottom, NB.right), // B: black + purple + orange — invalid
      netOption(NB.left, NB.right, NB.below),   // C: blue + orange + green — left & right opposite, invalid
      netOption(NB.top, NB.center, NB.right),   // D: red + black + orange ✓
    ],
  },
];

export const spatialQuestions: Question[] = [...partA, ...partB, ...partC, ...partD];
