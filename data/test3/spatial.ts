import type { Question } from '@/types';
import { gearSVG, cubeNetSVG } from '@/data/shared/svgHelpers';

// ─── SVG helpers ───────────────────────────────────────────────────────────────

const qSvg = (inner: string) =>
  `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><rect x="1" y="1" width="98" height="98" rx="8" fill="#fff" stroke="#d1d5db" strokeWidth="1.5"/>${inner}</svg>`;

const oSvg = (inner: string) =>
  `<svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"><rect x="1" y="1" width="58" height="58" rx="6" fill="#fff" stroke="#d1d5db" strokeWidth="1.2"/>${inner}</svg>`;

const F = '#faf5ff';
const S = '#7c3aed';

const rotQ = (d: string, deg: number) =>
  `<path d="${d}" fill="${F}" stroke="${S}" strokeWidth="2.2" strokeLinejoin="round" strokeLinecap="round" transform="rotate(${deg},50,50)"/>`;

const rotO = (d: string, deg: number) =>
  `<path d="${d}" fill="#fce7f3" stroke="#db2777" strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round" transform="rotate(${deg},30,30)"/>`;

// ─── Shape paths (centred at 50,50 for Q; at 30,30 for O) ─────────────────────

// Boomerang / check shape pointing RIGHT, centred at 50,50
const BOOM_Q = 'M22,62 L22,50 L56,50 L56,38 L72,38 L72,28 L80,28 L80,46 L64,46 L64,58 L36,58 L36,70 Z';
const BOOM_O  = 'M8,40 L8,30 L32,30 L32,20 L44,20 L44,12 L50,12 L50,26 L36,26 L36,36 L18,36 L18,46 Z';

// Parallelogram slanting right, centred at 50,50
const PARA_Q = 'M30,68 L50,28 L72,28 L52,68 Z';
const PARA_O  = 'M14,46 L28,14 L48,14 L34,46 Z';

// Spanner / wrench shape, centred at 50,50
const WRENCH_Q = 'M34,28 L38,32 L46,24 L52,28 L56,24 L66,34 L58,42 L62,46 L50,74 L42,74 L36,68 L52,52 L42,42 L34,50 L28,44 L28,38 Z';
const WRENCH_O  = 'M18,14 L21,17 L27,11 L31,14 L34,11 L42,19 L36,25 L38,28 L28,50 L23,50 L19,46 L30,34 L24,28 L19,33 L14,28 L14,23 Z';

// Diamond / rhombus, centred at 50,50
const DIAMOND_Q = 'M50,22 L78,50 L50,78 L22,50 Z';
const DIAMOND_O  = 'M30,8 L52,30 L30,52 L8,30 Z';

// Puzzle-tab shape: square with one tab out, centred at 50,50
const TAB_Q = 'M28,28 L28,72 L72,72 L72,56 L82,56 L82,44 L72,44 L72,28 Z';
const TAB_O  = 'M12,12 L12,48 L48,48 L48,36 L56,36 L56,26 L48,26 L48,12 Z';

// Lightning bolt shape, centred at 50,50
const BOLT_Q = 'M58,22 L42,50 L54,50 L40,78 L68,46 L54,46 L70,22 Z';
const BOLT_O  = 'M36,10 L24,30 L32,30 L22,52 L44,26 L34,26 L46,10 Z';

// Half-moon / crescent (approximated), centred at 50,50
const CRESCENT_Q = 'M38,26 L54,22 L68,30 L74,46 L68,62 L54,70 L40,66 L36,58 C44,56 50,52 52,46 C54,40 50,32 42,30 Z';
const CRESCENT_O  = 'M20,12 L32,9 L42,15 L46,27 L42,39 L32,45 L22,42 L18,36 C24,34 28,31 30,26 C32,21 28,16 22,15 Z';

// Arrow-head (triangle with notched tail), centred at 50,50
const ARROWHEAD_Q = 'M50,22 L76,64 L58,56 L58,78 L42,78 L42,56 L24,64 Z';
const ARROWHEAD_O  = 'M30,10 L50,42 L37,36 L37,52 L23,52 L23,36 L10,42 Z';

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
  coords.map(([cx,cy]) => isoCube(ox+cx*20*scale, oy+cy*16*scale, '#fae8ff','#d946ef','#a21caf')).join('');

const mechSvg = (inner: string) =>
  `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><rect x="1" y="1" width="98" height="98" rx="8" fill="#fff" stroke="#d1d5db" strokeWidth="1.5"/>${inner}</svg>`;

const gearDiag = (items: Array<{cx:number;cy:number;r:number;teeth:number;label:string;sub?:string}>) =>
  mechSvg(items.map(g => gearSVG(g.cx,g.cy,g.r,g.teeth,'#7c3aed',g.label,g.sub)).join(''));

const leverSvg = (fulcrumX: number, leftX: number, rightX: number, leftW: string, rightW: string) =>
  mechSvg(`
    <line x1="12" y1="62" x2="88" y2="62" stroke="#555" strokeWidth="3" strokeLinecap="round"/>
    <polygon points="${fulcrumX},62 ${fulcrumX-5},76 ${fulcrumX+5},76" fill="#9ca3af" stroke="#555" strokeWidth="1.2"/>
    <rect x="${leftX-10}" y="43" width="20" height="14" rx="3" fill="#fee2e2" stroke="#c8102e" strokeWidth="1.5"/>
    <text x="${leftX}" y="53" textAnchor="middle" fontSize="7" fontWeight="700" fill="#111">${leftW}</text>
    <rect x="${rightX-10}" y="43" width="20" height="14" rx="3" fill="#dbeafe" stroke="#2563eb" strokeWidth="1.5" strokeDasharray="2.5 1.5"/>
    <text x="${rightX}" y="53" textAnchor="middle" fontSize="7" fontWeight="700" fill="#2563eb">${rightW}</text>
  `);

// Gear train: A drives B which drives C (different sizes)
const compoundGearSvg = gearDiag([
  {cx:16,cy:50,r:12,teeth:10,label:'A',sub:'12T·CW'},
  {cx:40,cy:50,r:8,teeth:6,label:'B',sub:'8T'},
  {cx:60,cy:50,r:14,teeth:12,label:'C',sub:'14T·?'},
]);

// Single pulley with angled rope
const angledPulleySvg = mechSvg(`
  <rect x="34" y="6" width="32" height="5" rx="2" fill="#9ca3af"/>
  <circle cx="50" cy="22" r="11" fill="#f3f4f6" stroke="#555" strokeWidth="2"/>
  <circle cx="50" cy="22" r="2.8" fill="#6b7280"/>
  <line x1="39" y1="22" x2="39" y2="75" stroke="#555" strokeWidth="2"/>
  <rect x="30" y="75" width="18" height="13" fill="#fee2e2" stroke="#c8102e" strokeWidth="1.5"/>
  <text x="39" y="71" textAnchor="middle" fontSize="7" fontWeight="700" fill="#c8102e">75 kg</text>
  <line x1="61" y1="22" x2="78" y2="60" stroke="#2563eb" strokeWidth="2"/>
  <path d="M73,54 L80,62 L86,54" fill="none" stroke="#2563eb" strokeWidth="1.8"/>
  <text x="84" y="66" fontSize="7" fontWeight="700" fill="#2563eb">?</text>
`);

// Triple pulley (3 rope sections)
const triplePulleySvg = mechSvg(`
  <rect x="26" y="6" width="48" height="5" rx="2" fill="#9ca3af"/>
  <circle cx="38" cy="22" r="9" fill="#f3f4f6" stroke="#555" strokeWidth="2"/>
  <circle cx="62" cy="22" r="9" fill="#f3f4f6" stroke="#555" strokeWidth="2"/>
  <circle cx="50" cy="50" r="9" fill="#f3f4f6" stroke="#555" strokeWidth="2"/>
  <line x1="29" y1="22" x2="29" y2="50" stroke="#555" strokeWidth="1.8"/>
  <line x1="47" y1="22" x2="41" y2="50" stroke="#555" strokeWidth="1.8"/>
  <line x1="53" y1="22" x2="59" y2="22" stroke="#555" strokeWidth="1.8"/>
  <rect x="32" y="62" width="36" height="14" fill="#fee2e2" stroke="#c8102e" strokeWidth="1.5"/>
  <text x="50" y="58" textAnchor="middle" fontSize="7" fontWeight="700" fill="#c8102e">90 kg</text>
  <line x1="71" y1="22" x2="82" y2="50" stroke="#2563eb" strokeWidth="1.8"/>
  <path d="M77,44 L83,52 L89,44" fill="none" stroke="#2563eb" strokeWidth="1.8"/>
  <text x="86" y="56" fontSize="7" fontWeight="700" fill="#2563eb">?</text>
`);

// Rack and pinion SVG
const rackPinionSvg = mechSvg(`
  <rect x="14" y="54" width="72" height="14" fill="#e5e7eb" stroke="#555" strokeWidth="1.8" rx="2"/>
  <line x1="22" y1="54" x2="18" y2="48" stroke="#555" strokeWidth="1.5"/>
  <line x1="30" y1="54" x2="26" y2="48" stroke="#555" strokeWidth="1.5"/>
  <line x1="38" y1="54" x2="34" y2="48" stroke="#555" strokeWidth="1.5"/>
  <line x1="46" y1="54" x2="42" y2="48" stroke="#555" strokeWidth="1.5"/>
  <line x1="54" y1="54" x2="50" y2="48" stroke="#555" strokeWidth="1.5"/>
  <line x1="62" y1="54" x2="58" y2="48" stroke="#555" strokeWidth="1.5"/>
  <circle cx="50" cy="34" r="14" fill="#f3f4f6" stroke="#555" strokeWidth="2"/>
  <circle cx="50" cy="34" r="3.5" fill="#6b7280"/>
  <text x="50" y="37" textAnchor="middle" fontSize="8" fontWeight="700" fill="#333">CW</text>
  <path d="M62,78 L74,78" stroke="#2563eb" strokeWidth="2.5" markerEnd="url(#arrow)"/>
  <text x="76" y="82" fontSize="7" fontWeight="700" fill="#2563eb">?</text>
`);

// ─── Cube net data ────────────────────────────────────────────────────────────

const NET_E = {
  top:    { symbol: 'P', color: '#c8102e' },
  left:   { symbol: 'Q', color: '#2563eb' },
  center: { symbol: 'R', color: '#111'    },
  right:  { symbol: 'S', color: '#d97706' },
  below:  { symbol: 'T', color: '#15803d' },
  bottom: { symbol: 'U', color: '#7c3aed' },
};

const NET_F = {
  top:    { symbol: '↑', color: '#c8102e' },
  left:   { symbol: '←', color: '#2563eb' },
  center: { symbol: '⊕', color: '#111'    },
  right:  { symbol: '→', color: '#d97706' },
  below:  { symbol: '↓', color: '#15803d' },
  bottom: { symbol: '⊗', color: '#7c3aed' },
};

const netPromptE = qSvg(`<g transform="translate(6,2) scale(0.29)">${cubeNetSVG(NET_E, 55)}</g>`);
const netPromptF = qSvg(`<g transform="translate(6,2) scale(0.29)">${cubeNetSVG(NET_F, 55)}</g>`);

const netOption = (top: string, front: string, right: string) =>
  oSvg(`
    <polygon points="10,28 30,16 50,28 30,40" fill="#f8fafc" stroke="#333" strokeWidth="1.5"/>
    <polygon points="10,28 10,48 30,56 30,40" fill="#e2e8f0" stroke="#333" strokeWidth="1.5"/>
    <polygon points="30,40 50,28 50,48 30,56" fill="#cbd5e1" stroke="#333" strokeWidth="1.5"/>
    <text x="30" y="32" textAnchor="middle" fontSize="9" fill="#111" fontWeight="700">${top}</text>
    <text x="19" y="47" textAnchor="middle" fontSize="9" fill="#333" fontWeight="700">${front}</text>
    <text x="41" y="47" textAnchor="middle" fontSize="9" fill="#444" fontWeight="700">${right}</text>
  `);

// ─── Part A: 2D Rotations ─────────────────────────────────────────────────────

const partA: Question[] = [
  {
    id: 'T3-A-1',
    subsectionId: 'spatial-2d',
    text: 'Which option shows the <strong>boomerang shape</strong> after a <strong>90° clockwise</strong> rotation?',
    opts: ['A','B','C','D'],
    correct: 3,
    exp: 'The boomerang points upper-right. After 90° CW, it points lower-right. Option D shows this rotation.',
    promptSvg: qSvg(rotQ(BOOM_Q, 0)),
    choicesSvg: [
      oSvg(rotO(BOOM_O, 0)),    // A: unchanged
      oSvg(rotO(BOOM_O, 180)),  // B: 180°
      oSvg(rotO(BOOM_O, 270)),  // C: 90° CCW
      oSvg(rotO(BOOM_O, 90)),   // D: 90° CW ✓
    ],
  },
  {
    id: 'T3-A-2',
    subsectionId: 'spatial-2d',
    text: 'Which option shows the <strong>parallelogram</strong> after a <strong>180°</strong> rotation?',
    opts: ['A','B','C','D'],
    correct: 2,
    exp: 'Rotating a parallelogram 180° keeps its shape but shifts the slant. Option C is correct.',
    promptSvg: qSvg(rotQ(PARA_Q, 0)),
    choicesSvg: [
      oSvg(rotO(PARA_O, 90)),   // A: 90° CW
      oSvg(rotO(PARA_O, 270)),  // B: 90° CCW
      oSvg(rotO(PARA_O, 180)),  // C: 180° ✓
      oSvg(rotO(PARA_O, 0)),    // D: unchanged
    ],
  },
  {
    id: 'T3-A-3',
    subsectionId: 'spatial-2d',
    text: 'Which option shows the <strong>diamond</strong> after a <strong>90° clockwise</strong> rotation?',
    opts: ['A','B','C','D'],
    correct: 1,
    exp: 'A diamond (rhombus) rotated 90° CW keeps its shape but changes orientation. Option B is correct.',
    promptSvg: qSvg(rotQ(DIAMOND_Q, 0)),
    choicesSvg: [
      oSvg(rotO(DIAMOND_O, 0)),    // A: unchanged
      oSvg(rotO(DIAMOND_O, 90)),   // B: 90° CW ✓
      oSvg(rotO(DIAMOND_O, 180)),  // C: 180°
      oSvg(rotO(DIAMOND_O, 270)),  // D: 90° CCW
    ],
  },
  {
    id: 'T3-A-4',
    subsectionId: 'spatial-2d',
    text: 'Which option shows the <strong>puzzle tab</strong> shape after a <strong>270° clockwise</strong> rotation?',
    opts: ['A','B','C','D'],
    correct: 0,
    exp: '270° CW = 90° CCW. The tab on the right moves to the top. Option A shows this.',
    promptSvg: qSvg(rotQ(TAB_Q, 0)),
    choicesSvg: [
      oSvg(rotO(TAB_O, 270)),  // A: 90° CCW ✓
      oSvg(rotO(TAB_O, 90)),   // B: 90° CW
      oSvg(rotO(TAB_O, 180)),  // C: 180°
      oSvg(rotO(TAB_O, 0)),    // D: unchanged
    ],
  },
  {
    id: 'T3-A-5',
    subsectionId: 'spatial-2d',
    text: 'Which option shows the <strong>lightning bolt</strong> after a <strong>180°</strong> rotation?',
    opts: ['A','B','C','D'],
    correct: 3,
    exp: '180° rotation flips the bolt upside-down and left-right. Option D shows the correct result.',
    promptSvg: qSvg(rotQ(BOLT_Q, 0)),
    choicesSvg: [
      oSvg(rotO(BOLT_O, 90)),   // A: 90° CW
      oSvg(rotO(BOLT_O, 0)),    // B: unchanged
      oSvg(rotO(BOLT_O, 270)),  // C: 90° CCW
      oSvg(rotO(BOLT_O, 180)),  // D: 180° ✓
    ],
  },
  {
    id: 'T3-A-6',
    subsectionId: 'spatial-2d',
    text: 'Which option shows the <strong>crescent</strong> after a <strong>90° counter-clockwise</strong> rotation?',
    opts: ['A','B','C','D'],
    correct: 2,
    exp: '90° CCW turns the crescent so its opening faces to the right. Option C is correct.',
    promptSvg: qSvg(rotQ(CRESCENT_Q, 0)),
    choicesSvg: [
      oSvg(rotO(CRESCENT_O, 0)),    // A: unchanged (opening faces up-left)
      oSvg(rotO(CRESCENT_O, 90)),   // B: 90° CW
      oSvg(rotO(CRESCENT_O, 270)),  // C: 90° CCW ✓
      oSvg(rotO(CRESCENT_O, 180)),  // D: 180°
    ],
  },
  {
    id: 'T3-A-7',
    subsectionId: 'spatial-2d',
    text: 'Which option shows the <strong>arrowhead</strong> shape after a <strong>90° clockwise</strong> rotation?',
    opts: ['A','B','C','D'],
    correct: 1,
    exp: 'The arrowhead points upward. After 90° CW, it points right. Option B is correct.',
    promptSvg: qSvg(rotQ(ARROWHEAD_Q, 0)),
    choicesSvg: [
      oSvg(rotO(ARROWHEAD_O, 0)),    // A: unchanged (up)
      oSvg(rotO(ARROWHEAD_O, 90)),   // B: 90° CW = right ✓
      oSvg(rotO(ARROWHEAD_O, 180)),  // C: 180° = down
      oSvg(rotO(ARROWHEAD_O, 270)),  // D: 90° CCW = left
    ],
  },
  {
    id: 'T3-A-8',
    subsectionId: 'spatial-2d',
    text: 'Which option shows the <strong>wrench shape</strong> after a <strong>180°</strong> rotation?',
    opts: ['A','B','C','D'],
    correct: 2,
    exp: 'The wrench handle points down-left in the original. After 180°, the handle points up-right. Option C shows this.',
    promptSvg: qSvg(rotQ(WRENCH_Q, 0)),
    choicesSvg: [
      oSvg(rotO(WRENCH_O, 90)),   // A: 90° CW
      oSvg(rotO(WRENCH_O, 270)),  // B: 90° CCW
      oSvg(rotO(WRENCH_O, 180)),  // C: 180° ✓
      oSvg(rotO(WRENCH_O, 0)),    // D: unchanged
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
    id: 'T3-B-1',
    subsectionId: 'spatial-2d',
    text: 'Which option shows the <strong>lightning bolt</strong> reflected across the <strong>vertical axis</strong> (flipped left-right)?',
    opts: ['A','B','C','D'],
    correct: 0,
    exp: 'Flipping the bolt left-right mirrors its diagonal direction. Option A is correct.',
    promptSvg: qSvg(rotQ(BOLT_Q, 0)),
    choicesSvg: [
      flipH_O(BOLT_O),           // A: horizontal flip ✓
      oSvg(rotO(BOLT_O, 90)),    // B: 90° rotation
      oSvg(rotO(BOLT_O, 180)),   // C: 180° rotation
      oSvg(rotO(BOLT_O, 270)),   // D: 270° rotation
    ],
  },
  {
    id: 'T3-B-2',
    subsectionId: 'spatial-2d',
    text: 'Which option shows the <strong>tab shape</strong> reflected across the <strong>horizontal axis</strong> (flipped top-bottom)?',
    opts: ['A','B','C','D'],
    correct: 3,
    exp: 'Flipping the tab top-to-bottom mirrors it vertically — the tab protrusion moves to the opposite side. Option D is correct.',
    promptSvg: qSvg(rotQ(TAB_Q, 0)),
    choicesSvg: [
      oSvg(rotO(TAB_O, 90)),    // A: 90° rotation
      oSvg(rotO(TAB_O, 180)),   // B: 180° rotation
      oSvg(rotO(TAB_O, 270)),   // C: 270° rotation
      flipV_O(TAB_O),           // D: vertical flip ✓
    ],
  },
  {
    id: 'T3-B-3',
    subsectionId: 'spatial-2d',
    text: 'Which option shows the <strong>arrowhead</strong> reflected across the <strong>vertical axis</strong> (flipped left-right)?',
    opts: ['A','B','C','D'],
    correct: 2,
    exp: 'The arrowhead pointing up is symmetric left-right, so a horizontal flip looks identical. Option C (the flip) is correct.',
    promptSvg: qSvg(rotQ(ARROWHEAD_Q, 0)),
    choicesSvg: [
      oSvg(rotO(ARROWHEAD_O, 90)),    // A: 90° rotation
      oSvg(rotO(ARROWHEAD_O, 180)),   // B: 180° rotation
      flipH_O(ARROWHEAD_O),           // C: horizontal flip ✓
      oSvg(rotO(ARROWHEAD_O, 270)),   // D: 270° rotation
    ],
  },
  {
    id: 'T3-B-4',
    subsectionId: 'spatial-2d',
    text: 'Which option shows the <strong>parallelogram</strong> reflected across the <strong>vertical axis</strong> (flipped left-right)?',
    opts: ['A','B','C','D'],
    correct: 1,
    exp: 'Flipping the parallelogram left-right reverses its slant direction. Option B is correct.',
    promptSvg: qSvg(rotQ(PARA_Q, 0)),
    choicesSvg: [
      oSvg(rotO(PARA_O, 180)),   // A: 180° rotation
      flipH_O(PARA_O),           // B: horizontal flip ✓
      oSvg(rotO(PARA_O, 90)),    // C: 90° rotation
      oSvg(rotO(PARA_O, 270)),   // D: 270° rotation
    ],
  },
  {
    id: 'T3-B-5',
    subsectionId: 'spatial-2d',
    text: 'Which option shows the <strong>boom/step shape</strong> reflected across the <strong>horizontal axis</strong> (flipped top-bottom)?',
    opts: ['A','B','C','D'],
    correct: 3,
    exp: 'Flipping the step shape top-to-bottom reverses the vertical direction of the steps. Option D is correct.',
    promptSvg: qSvg(rotQ(BOOM_Q, 0)),
    choicesSvg: [
      oSvg(rotO(BOOM_O, 90)),    // A: 90° rotation
      oSvg(rotO(BOOM_O, 180)),   // B: 180° rotation
      oSvg(rotO(BOOM_O, 270)),   // C: 270° rotation
      flipV_O(BOOM_O),           // D: vertical flip ✓
    ],
  },
  {
    id: 'T3-B-6',
    subsectionId: 'spatial-2d',
    text: 'Which option shows the <strong>wrench shape</strong> reflected across the <strong>vertical axis</strong> (flipped left-right)?',
    opts: ['A','B','C','D'],
    correct: 0,
    exp: 'Flipping the wrench left-right mirrors its asymmetric form. Option A is correct.',
    promptSvg: qSvg(rotQ(WRENCH_Q, 0)),
    choicesSvg: [
      flipH_O(WRENCH_O),           // A: horizontal flip ✓
      oSvg(rotO(WRENCH_O, 90)),    // B: 90° rotation
      oSvg(rotO(WRENCH_O, 180)),   // C: 180° rotation
      oSvg(rotO(WRENCH_O, 270)),   // D: 270° rotation
    ],
  },
];

// ─── Part C: Mechanical reasoning ────────────────────────────────────────────

const partC: Question[] = [
  {
    id: 'T3-C-1',
    subsectionId: 'spatial-mech',
    text: 'In this <strong>compound gear train</strong>, A (12T CW) drives B (8T) drives C (14T). What does C do?',
    opts: ['CW, faster than A','CW, slower than A','CCW, faster than A','CCW, slower than A'],
    correct: 1,
    exp: 'A→B reverses (B is CCW). B→C reverses again (C is CW). Speed A to C: (12/8)×(8/14) = 12/14 < 1, so C is slower than A. C turns CW, slower.',
    promptSvg: compoundGearSvg,
  },
  {
    id: 'T3-C-2',
    subsectionId: 'spatial-mech',
    text: 'A <strong>rack and pinion</strong>: the pinion gear turns <strong>clockwise</strong>. Which way does the rack move?',
    opts: ['Left','Right','Up','Down'],
    correct: 1,
    exp: 'A clockwise pinion pushes the rack (a straight gear strip) to the right. The rack moves in the direction of the gear teeth at the bottom.',
    promptSvg: rackPinionSvg,
  },
  {
    id: 'T3-C-3',
    subsectionId: 'spatial-mech',
    text: 'Gear P has 18 teeth at 30 RPM. Gear Q has 6 teeth. Gear Q turns at:',
    opts: ['10 RPM','30 RPM','90 RPM','54 RPM'],
    correct: 2,
    exp: 'Speed ratio = 18/6 = 3. Q turns at 30 × 3 = 90 RPM. Smaller gear spins faster.',
    promptSvg: gearDiag([
      {cx:24,cy:50,r:14,teeth:10,label:'P',sub:'18T·30RPM'},
      {cx:52,cy:50,r:8,teeth:6,label:'Q',sub:'6T·?'},
    ]),
  },
  {
    id: 'T3-C-4',
    subsectionId: 'spatial-mech',
    text: 'A lever is <strong>balanced</strong>. The left side: 15 kg at 40 cm. Right side: ? kg at 20 cm. What is the unknown weight?',
    opts: ['7.5 kg','15 kg','30 kg','60 kg'],
    correct: 2,
    exp: 'Torque balance: 15×40 = ?×20 → ? = 600/20 = 30 kg. Halving the arm doubles the required load.',
    promptSvg: leverSvg(50, 24, 66, '15kg', '?'),
  },
  {
    id: 'T3-C-5',
    subsectionId: 'spatial-mech',
    text: 'A <strong>fixed pulley</strong> holds a 75 kg load. How much force is needed to hold it steady?',
    opts: ['37.5 kg','50 kg','75 kg','150 kg'],
    correct: 2,
    exp: 'A single fixed pulley provides no mechanical advantage — it only changes direction. You need 75 kg of force.',
    promptSvg: angledPulleySvg,
  },
  {
    id: 'T3-C-6',
    subsectionId: 'spatial-mech',
    text: 'A pulley system has <strong>3 rope sections</strong> supporting a 90 kg load. How much pull is needed?',
    opts: ['90 kg','45 kg','30 kg','22.5 kg'],
    correct: 2,
    exp: 'With 3 supporting rope sections, mechanical advantage = 3. Pull = 90/3 = 30 kg.',
    promptSvg: triplePulleySvg,
  },
  {
    id: 'T3-C-7',
    subsectionId: 'spatial-mech',
    text: 'Two gears mesh. Gear X has 40 teeth; Gear Y has 8 teeth. If Y turns CCW at 200 RPM, how fast does X turn?',
    opts: ['200 RPM','1000 RPM','40 RPM','25 RPM'],
    correct: 2,
    exp: 'Speed of X = Y RPM × (Y teeth / X teeth) = 200 × (8/40) = 40 RPM. Larger gear X turns slower.',
    promptSvg: gearDiag([
      {cx:32,cy:50,r:20,teeth:14,label:'X',sub:'40T·?'},
      {cx:60,cy:50,r:8,teeth:6,label:'Y',sub:'8T·200RPM CCW'},
    ]),
  },
  {
    id: 'T3-C-8',
    subsectionId: 'spatial-mech',
    text: 'A lever fulcrum is <strong>at one end</strong> (like a wheelbarrow). A 50 kg load is 80 cm from the fulcrum. How much force 200 cm from the fulcrum lifts it?',
    opts: ['50 kg','20 kg','125 kg','10 kg'],
    correct: 1,
    exp: 'Torque: 50×80 = ?×200 → ? = 4000/200 = 20 kg. The longer effort arm gives a 2.5:1 mechanical advantage.',
    promptSvg: leverSvg(18, 36, 78, '50kg', '?'),
  },
];

// ─── Part D: Cube nets ────────────────────────────────────────────────────────

const partD: Question[] = [
  {
    id: 'T3-D-1',
    subsectionId: 'spatial-cubes',
    text: 'When this net is folded, which face is <strong>opposite P</strong>?',
    opts: ['U','Q','S','T'],
    correct: 0,
    exp: 'In a vertical cross net, P (top) folds to be opposite U (bottom). They are at opposite ends of the vertical strip.',
    promptSvg: netPromptE,
  },
  {
    id: 'T3-D-2',
    subsectionId: 'spatial-cubes',
    text: 'When this net is folded, which face is <strong>opposite R</strong>?',
    opts: ['P','Q','T','U'],
    correct: 2,
    exp: 'R is the centre face; T is directly below R in the strip. When folded, R and T end up on opposite faces.',
    promptSvg: netPromptE,
  },
  {
    id: 'T3-D-3',
    subsectionId: 'spatial-cubes',
    text: 'Which cube could be folded from this net?',
    opts: ['A','B','C','D'],
    correct: 0,
    exp: 'Option A shows P, R, and S meeting at a corner — P is above R, S is to the right of R. These are all adjacent faces in the net.',
    promptSvg: netPromptE,
    choicesSvg: [
      netOption('P','R','S'),  // A: correct ✓
      netOption('P','U','Q'),  // B: P opposite U → can't share corner
      netOption('Q','S','R'),  // C: Q opposite S → can't share corner
      netOption('T','U','P'),  // D: T opposite? invalid
    ],
  },
  {
    id: 'T3-D-4',
    subsectionId: 'spatial-cubes',
    text: 'When this second net is folded, which face is <strong>opposite ↑</strong>?',
    opts: ['⊗','←','→','↓'],
    correct: 0,
    exp: '↑ is at the top of the strip and ⊗ is at the bottom. They fold to be on opposite faces of the cube.',
    promptSvg: netPromptF,
  },
  {
    id: 'T3-D-5',
    subsectionId: 'spatial-cubes',
    text: 'When this second net is folded, which face is <strong>opposite ←</strong>?',
    opts: ['↑','⊕','→','⊗'],
    correct: 2,
    exp: '← is the left face and → is the right face of the cross. These always fold to opposite sides.',
    promptSvg: netPromptF,
  },
  {
    id: 'T3-D-6',
    subsectionId: 'spatial-cubes',
    text: 'Which cube could be folded from the second net?',
    opts: ['A','B','C','D'],
    correct: 2,
    exp: 'Option C shows ↑, ⊕, and → meeting at a corner — ↑ is above ⊕, → is to the right of ⊕. These are adjacent in the net.',
    promptSvg: netPromptF,
    choicesSvg: [
      netOption('↑','⊗','←'),  // A: ↑ opposite ⊗ → can't share corner
      netOption('←','→','⊕'),  // B: ← opposite → → can't share corner
      netOption('↑','⊕','→'),  // C: correct ✓
      netOption('↓','⊗','→'),  // D: ↓ opposite ⊗? invalid
    ],
  },
];

export const spatialQuestions: Question[] = [...partA, ...partB, ...partC, ...partD];
