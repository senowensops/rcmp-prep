import type { Question } from '@/types';
import { gearSVG, cubeNetSVG } from '@/data/shared/svgHelpers';

const baseQuestionSvg = (inner: string) =>
  `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="2" width="96" height="96" rx="8" fill="#fff" stroke="#d1d5db" strokeWidth="1.5"/>${inner}</svg>`;

const baseOptionSvg = (inner: string) =>
  `<svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"><rect x="1.5" y="1.5" width="57" height="57" rx="6" fill="#fff" stroke="#d1d5db" strokeWidth="1.2"/>${inner}</svg>`;

const shape = (d: string, fill = '#fff5f5') =>
  `<path d="${d}" fill="${fill}" stroke="#333" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round"/>`;

const gWrap = (content: string, transform = '') => `<g ${transform ? `transform="${transform}"` : ''}>${content}</g>`;

const isoCube = (x: number, y: number, top = '#f8fafc', left = '#e2e8f0', right = '#cbd5e1') => {
  const topPts = `${x},${y - 10} ${x + 10},${y - 16} ${x + 20},${y - 10} ${x + 10},${y - 4}`;
  const leftPts = `${x},${y - 10} ${x},${y + 6} ${x + 10},${y + 12} ${x + 10},${y - 4}`;
  const rightPts = `${x + 10},${y - 4} ${x + 20},${y - 10} ${x + 20},${y + 6} ${x + 10},${y + 12}`;
  return `
    <polygon points="${topPts}" fill="${top}" stroke="#333" strokeWidth="1.6"/>
    <polygon points="${leftPts}" fill="${left}" stroke="#333" strokeWidth="1.6"/>
    <polygon points="${rightPts}" fill="${right}" stroke="#333" strokeWidth="1.6"/>
  `;
};

const cubeShape = (coords: Array<[number, number]>, ox: number, oy: number, scale = 1) =>
  coords
    .map(([cx, cy]) => isoCube(ox + cx * 20 * scale, oy + cy * 16 * scale, '#eef2ff', '#c7d2fe', '#818cf8'))
    .join('');

const mechPrompt = (inner: string) =>
  `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="2" width="96" height="96" rx="8" fill="#fff" stroke="#d1d5db" strokeWidth="1.5"/>${inner}</svg>`;

const netOption = (front: string, top: string, right: string) =>
  baseOptionSvg(`
    <polygon points="18,25 30,18 42,25 30,32" fill="#fff" stroke="#333" strokeWidth="1.5"/>
    <polygon points="18,25 18,39 30,46 30,32" fill="#f3f4f6" stroke="#333" strokeWidth="1.5"/>
    <polygon points="30,32 42,25 42,39 30,46" fill="#e5e7eb" stroke="#333" strokeWidth="1.5"/>
    <text x="30" y="29" textAnchor="middle" fontSize="8" fill="#111" fontWeight="700">${top}</text>
    <text x="24" y="37" textAnchor="middle" fontSize="8" fill="#111" fontWeight="700">${front}</text>
    <text x="36" y="37" textAnchor="middle" fontSize="8" fill="#111" fontWeight="700">${right}</text>
  `);

const arrowShape = `<path d="M26 48h24V38l20 12-20 12V52H26z" fill="#fff5f5" stroke="#333" strokeWidth="2" strokeLinejoin="round"/>`;
const bentArrowShape = `<path d="M28 28h14v20h16V38l18 12-18 12V52H28z" fill="#fff5f5" stroke="#333" strokeWidth="2" strokeLinejoin="round"/>`;
const lShape = `<path d="M28 24h14v34h26v14H28z" fill="#fff5f5" stroke="#333" strokeWidth="2" strokeLinejoin="round"/>`;
const fShape = `<path d="M30 22h12v46H30z M42 22h24v10H42z M42 40h18v10H42z" fill="#fff5f5" stroke="#333" strokeWidth="2" strokeLinejoin="round"/>`;
const stepShape = `<path d="M24 30h20v12h12v12h12v12H24z" fill="#fff5f5" stroke="#333" strokeWidth="2" strokeLinejoin="round"/>`;
const polyShape = `<path d="M24 36 44 24 64 28 76 44 66 68 40 74 24 56Z" fill="#fff5f5" stroke="#333" strokeWidth="2" strokeLinejoin="round"/>`;
const hookShape = `<path d="M26 26h34v12H48v10h18v12H48v14H34V60H26z" fill="#fff5f5" stroke="#333" strokeWidth="2" strokeLinejoin="round"/>`;
const markerShape = `<path d="M24 34 58 28 74 44 64 68 34 74 22 54Z" fill="#fff5f5" stroke="#333" strokeWidth="2" strokeLinejoin="round"/>`;

const partA: Question[] = [
  {
    id: 'S-A-1',
    subsectionId: 'spatial-2d',
    text: 'Which option shows the original arrow after a 90° clockwise rotation?',
    opts: ['A', 'B', 'C', 'D'],
    correct: 1,
    exp: 'The original arrow points right. A 90° clockwise turn makes the point face downward, while keeping the shaft and arrowhead in the same relative positions.',
    promptSvg: baseQuestionSvg(gWrap(arrowShape, 'rotate(0 50 50)')),
    choicesSvg: [
      baseOptionSvg(gWrap(arrowShape, 'rotate(0 30 30) translate(-20 -20) scale(0.8)')),
      baseOptionSvg(gWrap(arrowShape, 'rotate(90 30 30) translate(-20 -20) scale(0.8)')),
      baseOptionSvg(gWrap(arrowShape, 'rotate(180 30 30) translate(-20 -20) scale(0.8)')),
      baseOptionSvg(gWrap(arrowShape, 'rotate(270 30 30) translate(-20 -20) scale(0.8)')),
    ],
  },
  {
    id: 'S-A-2',
    subsectionId: 'spatial-2d',
    text: 'Which option matches the L-shape after a 180° rotation?',
    opts: ['A', 'B', 'C', 'D'],
    correct: 2,
    exp: 'After a 180° turn, the long upright shifts to the opposite side and the foot that was at the bottom-right appears at the top-left. Only one option keeps that exact relationship.',
    promptSvg: baseQuestionSvg(lShape),
    choicesSvg: [
      baseOptionSvg(gWrap(lShape, 'translate(-20 -20) scale(0.8)')),
      baseOptionSvg(gWrap(lShape, 'rotate(90 30 30) translate(-20 -20) scale(0.8)')),
      baseOptionSvg(gWrap(lShape, 'rotate(180 30 30) translate(-20 -20) scale(0.8)')),
      baseOptionSvg(gWrap(lShape, 'rotate(270 30 30) translate(-20 -20) scale(0.8)')),
    ],
  },
  {
    id: 'S-A-3',
    subsectionId: 'spatial-2d',
    text: 'Which option shows the F-shape after a 90° counter-clockwise rotation?',
    opts: ['A', 'B', 'C', 'D'],
    correct: 3,
    exp: 'A 90° counter-clockwise rotation lays the vertical stem across the page and puts both short arms on the lower side of the shape. The mirrored choice is not correct.',
    promptSvg: baseQuestionSvg(fShape),
    choicesSvg: [
      baseOptionSvg(gWrap(fShape, 'translate(-20 -20) scale(0.8)')),
      baseOptionSvg(gWrap(fShape, 'rotate(90 30 30) translate(-20 -20) scale(0.8)')),
      baseOptionSvg(`<g transform="translate(2 2)"><path d="M18 16h10v28H18z M28 16h20v8H28z M28 34h15v8H28z" fill="#fff5f5" stroke="#333" strokeWidth="1.6" transform="scale(-1 1) translate(-66 0) rotate(270 30 30)"/></g>`),
      baseOptionSvg(gWrap(fShape, 'rotate(270 30 30) translate(-20 -20) scale(0.8)')),
    ],
  },
  {
    id: 'S-A-4',
    subsectionId: 'spatial-2d',
    text: 'Which option is the same irregular polygon rotated, not mirrored?',
    opts: ['A', 'B', 'C', 'D'],
    correct: 0,
    exp: 'The correct choice preserves the exact notch, long sloping edge, and point order. The distractors either mirror the shape or change the angle relationships slightly.',
    promptSvg: baseQuestionSvg(polyShape),
    choicesSvg: [
      baseOptionSvg(gWrap(polyShape, 'rotate(90 30 30) translate(-20 -20) scale(0.8)')),
      baseOptionSvg(`<g transform="translate(2 2)"><path d="M24 36 44 24 64 28 76 44 66 68 40 74 24 56Z" fill="#fff5f5" stroke="#333" strokeWidth="1.6" transform="scale(-1 1) translate(-80 0) translate(-18 -18) scale(0.78)"/></g>`),
      baseOptionSvg(shape('M18 25 33 16 48 18 55 31 49 48 29 53 18 40Z', '#fff5f5')),
      baseOptionSvg(gWrap(polyShape, 'rotate(180 30 30) translate(-20 -20) scale(0.8)')),
    ],
  },
  {
    id: 'S-A-5',
    subsectionId: 'spatial-2d',
    text: 'Which option matches the bent arrow after a 270° clockwise rotation?',
    opts: ['A', 'B', 'C', 'D'],
    correct: 3,
    exp: 'A 270° clockwise turn is the same as 90° counter-clockwise. The bent shaft and arrowhead must rotate together without swapping sides or becoming mirrored.',
    promptSvg: baseQuestionSvg(bentArrowShape),
    choicesSvg: [
      baseOptionSvg(gWrap(bentArrowShape, 'translate(-20 -20) scale(0.8)')),
      baseOptionSvg(gWrap(bentArrowShape, 'rotate(90 30 30) translate(-20 -20) scale(0.8)')),
      baseOptionSvg(gWrap(bentArrowShape, 'rotate(180 30 30) translate(-20 -20) scale(0.8)')),
      baseOptionSvg(gWrap(bentArrowShape, 'rotate(270 30 30) translate(-20 -20) scale(0.8)')),
    ],
  },
  {
    id: 'S-A-6',
    subsectionId: 'spatial-2d',
    text: 'Which option shows the stepped block shape after a 90° clockwise rotation?',
    opts: ['A', 'B', 'C', 'D'],
    correct: 1,
    exp: 'The staircase rises from left to right in the original. Rotating clockwise makes it descend vertically from top to bottom while keeping the same three-step order.',
    promptSvg: baseQuestionSvg(stepShape),
    choicesSvg: [
      baseOptionSvg(gWrap(stepShape, 'rotate(180 30 30) translate(-20 -20) scale(0.8)')),
      baseOptionSvg(gWrap(stepShape, 'rotate(90 30 30) translate(-20 -20) scale(0.8)')),
      baseOptionSvg(gWrap(stepShape, 'translate(-20 -20) scale(0.8)')),
      baseOptionSvg(`<g transform="translate(5 6)"><path d="M10 14h18v10h10v10h10v10H10z" fill="#fff5f5" stroke="#333" strokeWidth="1.6" transform="scale(-1 1) translate(-58 0)"/></g>`),
    ],
  },
  {
    id: 'S-A-7',
    subsectionId: 'spatial-2d',
    text: 'Which option shows the hook-shaped figure after a 180° rotation?',
    opts: ['A', 'B', 'C', 'D'],
    correct: 2,
    exp: 'A 180° turn places the long top bar on the opposite side and moves the short lower tab to the upper-left. Any option that keeps the opening on the same side is wrong.',
    promptSvg: baseQuestionSvg(hookShape),
    choicesSvg: [
      baseOptionSvg(gWrap(hookShape, 'rotate(90 30 30) translate(-20 -20) scale(0.8)')),
      baseOptionSvg(gWrap(hookShape, 'translate(-20 -20) scale(0.8)')),
      baseOptionSvg(gWrap(hookShape, 'rotate(180 30 30) translate(-20 -20) scale(0.8)')),
      baseOptionSvg(gWrap(hookShape, 'rotate(270 30 30) translate(-20 -20) scale(0.8)')),
    ],
  },
  {
    id: 'S-A-8',
    subsectionId: 'spatial-2d',
    text: 'Which option matches the marker shape after a 90° clockwise rotation?',
    opts: ['A', 'B', 'C', 'D'],
    correct: 0,
    exp: 'The point sequence stays identical under rotation: the narrow right edge becomes the lower edge, and the wider left side swings to the top. Only one choice preserves that order.',
    promptSvg: baseQuestionSvg(markerShape),
    choicesSvg: [
      baseOptionSvg(gWrap(markerShape, 'rotate(90 30 30) translate(-20 -20) scale(0.8)')),
      baseOptionSvg(gWrap(markerShape, 'rotate(180 30 30) translate(-20 -20) scale(0.8)')),
      baseOptionSvg(`<g transform="translate(2 2)"><path d="M24 34 58 28 74 44 64 68 34 74 22 54Z" fill="#fff5f5" stroke="#333" strokeWidth="1.6" transform="scale(-1 1) translate(-80 0) rotate(90 30 30) translate(-18 -18) scale(0.78)"/></g>`),
      baseOptionSvg(gWrap(markerShape, 'translate(-20 -20) scale(0.8)')),
    ],
  },
];

const partB: Question[] = [
  {
    id: 'S-B-1',
    subsectionId: 'spatial-3d',
    text: 'Which 3D block is the same shape as the model shown?',
    opts: ['A', 'B', 'C', 'D'],
    correct: 2,
    exp: 'The model is an L-shaped stack of three cubes with two cubes on the base and one rising above the right cube. Option C shows that same structure without a mirror reversal.',
    promptSvg: baseQuestionSvg(cubeShape([[0, 0], [1, 0], [1, -1]], 28, 58)),
    choicesSvg: [
      baseOptionSvg(cubeShape([[0, 0], [1, 0], [0, -1]], 12, 34, 0.9)),
      baseOptionSvg(cubeShape([[0, 0], [1, 0], [2, 0]], 8, 34, 0.9)),
      baseOptionSvg(cubeShape([[0, 0], [1, 0], [1, -1]], 12, 34, 0.9)),
      baseOptionSvg(cubeShape([[0, 0], [0, -1], [1, -1]], 12, 38, 0.9)),
    ],
  },
  {
    id: 'S-B-2',
    subsectionId: 'spatial-3d',
    text: 'Which option matches this stepped three-cube shape?',
    opts: ['A', 'B', 'C', 'D'],
    correct: 1,
    exp: 'The original climbs diagonally upward from front-left to back-right. Option B keeps the same stepped arrangement; the others either flatten the shape or mirror the high cube.',
    promptSvg: baseQuestionSvg(cubeShape([[0, 0], [1, -1], [2, -2]], 18, 66)),
    choicesSvg: [
      baseOptionSvg(cubeShape([[0, 0], [1, 0], [2, -1]], 8, 38, 0.9)),
      baseOptionSvg(cubeShape([[0, 0], [1, -1], [2, -2]], 8, 44, 0.9)),
      baseOptionSvg(cubeShape([[0, 0], [1, -1], [1, -2]], 10, 44, 0.9)),
      baseOptionSvg(cubeShape([[0, 0], [1, 0], [1, -1]], 12, 36, 0.9)),
    ],
  },
  {
    id: 'S-B-3',
    subsectionId: 'spatial-3d',
    text: 'Which option is the same corner stack, not a mirror image?',
    opts: ['A', 'B', 'C', 'D'],
    correct: 3,
    exp: 'The model has two cubes across the base and a third cube stacked above the left cube. Option D preserves that exact corner relationship instead of swapping left and right.',
    promptSvg: baseQuestionSvg(cubeShape([[0, 0], [1, 0], [0, -1]], 28, 58)),
    choicesSvg: [
      baseOptionSvg(cubeShape([[0, 0], [1, 0], [1, -1]], 12, 34, 0.9)),
      baseOptionSvg(cubeShape([[0, 0], [0, -1], [0, -2]], 18, 44, 0.9)),
      baseOptionSvg(cubeShape([[0, 0], [1, 0], [2, 0]], 8, 34, 0.9)),
      baseOptionSvg(cubeShape([[0, 0], [1, 0], [0, -1]], 12, 34, 0.9)),
    ],
  },
  {
    id: 'S-B-4',
    subsectionId: 'spatial-3d',
    text: 'Which 3D figure matches the four-cube zig-zag shape?',
    opts: ['A', 'B', 'C', 'D'],
    correct: 0,
    exp: 'The shape bends once to the right and then steps forward. Option A keeps both bends in the same order. The other choices either straighten one bend or mirror the sequence.',
    promptSvg: baseQuestionSvg(cubeShape([[0, 0], [1, 0], [1, -1], [2, -1]], 18, 62)),
    choicesSvg: [
      baseOptionSvg(cubeShape([[0, 0], [1, 0], [1, -1], [2, -1]], 8, 38, 0.9)),
      baseOptionSvg(cubeShape([[0, 0], [1, 0], [2, 0], [2, -1]], 8, 38, 0.9)),
      baseOptionSvg(cubeShape([[0, 0], [1, 0], [0, -1], [1, -1]], 10, 38, 0.9)),
      baseOptionSvg(cubeShape([[0, 0], [1, 0], [1, -1], [1, -2]], 12, 44, 0.9)),
    ],
  },
  {
    id: 'S-B-5',
    subsectionId: 'spatial-3d',
    text: 'Which option shows the same T-like arrangement of cubes?',
    opts: ['A', 'B', 'C', 'D'],
    correct: 1,
    exp: 'The original has three cubes along the top row and a single supporting cube centered below the middle cube. Option B matches that layout without shifting the support sideways.',
    promptSvg: baseQuestionSvg(cubeShape([[0, 0], [1, 0], [2, 0], [1, 1]], 18, 42)),
    choicesSvg: [
      baseOptionSvg(cubeShape([[0, 0], [1, 0], [2, 0], [0, 1]], 8, 30, 0.9)),
      baseOptionSvg(cubeShape([[0, 0], [1, 0], [2, 0], [1, 1]], 8, 30, 0.9)),
      baseOptionSvg(cubeShape([[0, 0], [1, 0], [1, 1], [2, 1]], 8, 30, 0.9)),
      baseOptionSvg(cubeShape([[0, 0], [1, 0], [2, 0], [2, 1]], 8, 30, 0.9)),
    ],
  },
  {
    id: 'S-B-6',
    subsectionId: 'spatial-3d',
    text: 'Which option matches the corner tower shape?',
    opts: ['A', 'B', 'C', 'D'],
    correct: 2,
    exp: 'This model has one cube at the front, one at the right, and a third stacked above the front cube. Option C preserves that footprint and height placement exactly.',
    promptSvg: baseQuestionSvg(cubeShape([[0, 0], [1, 0], [0, -1]], 30, 58)),
    choicesSvg: [
      baseOptionSvg(cubeShape([[0, 0], [1, 0], [1, -1]], 12, 34, 0.9)),
      baseOptionSvg(cubeShape([[0, 0], [0, -1], [1, -1]], 12, 38, 0.9)),
      baseOptionSvg(cubeShape([[0, 0], [1, 0], [0, -1]], 12, 34, 0.9)),
      baseOptionSvg(cubeShape([[0, 0], [1, 0], [2, -1]], 8, 38, 0.9)),
    ],
  },
];

const gearDiagram = (items: Array<{ cx: number; cy: number; r: number; teeth: number; label: string; sub?: string }>, arrows: string[] = []) =>
  mechPrompt(`
    ${items.map((g) => gearSVG(g.cx, g.cy, g.r, g.teeth, '#2563eb', g.label, g.sub)).join('')}
    ${arrows.join('')}
  `);

const leverSvg = (fulcrumX: number, leftX: number, rightX: number, leftLabel: string, rightLabel: string) =>
  mechPrompt(`
    <line x1="16" y1="62" x2="84" y2="62" stroke="#333" strokeWidth="3" strokeLinecap="round"/>
    <polygon points="${fulcrumX},62 ${fulcrumX - 6},76 ${fulcrumX + 6},76" fill="#9ca3af" stroke="#333" strokeWidth="1.5"/>
    <circle cx="${leftX}" cy="54" r="8" fill="#fee2e2" stroke="#333" strokeWidth="1.5"/>
    <circle cx="${rightX}" cy="54" r="8" fill="#dbeafe" stroke="#333" strokeWidth="1.5" strokeDasharray="3 2"/>
    <text x="${leftX}" y="57" textAnchor="middle" fontSize="7" fontWeight="700" fill="#111">${leftLabel}</text>
    <text x="${rightX}" y="57" textAnchor="middle" fontSize="7" fontWeight="700" fill="#111">${rightLabel}</text>
  `);

const pulleyFixedSvg = mechPrompt(`
  <rect x="32" y="8" width="36" height="5" rx="2" fill="#9ca3af"/>
  <circle cx="50" cy="24" r="10" fill="#f3f4f6" stroke="#333" strokeWidth="2"/>
  <circle cx="50" cy="24" r="2.5" fill="#6b7280"/>
  <line x1="40" y1="24" x2="40" y2="72" stroke="#333" strokeWidth="2"/>
  <line x1="60" y1="24" x2="60" y2="62" stroke="#333" strokeWidth="2"/>
  <rect x="33" y="72" width="14" height="12" fill="#fee2e2" stroke="#333" strokeWidth="1.5"/>
  <text x="40" y="80" textAnchor="middle" fontSize="6.5" fontWeight="700">50</text>
  <path d="M56 58l4 6 4-6" fill="none" stroke="#2563eb" strokeWidth="2"/>
  <text x="67" y="64" fontSize="7" fontWeight="700" fill="#2563eb">?</text>
`);

const pulleyMoveSvg = mechPrompt(`
  <rect x="26" y="8" width="48" height="5" rx="2" fill="#9ca3af"/>
  <circle cx="40" cy="24" r="8" fill="#f3f4f6" stroke="#333" strokeWidth="2"/>
  <circle cx="40" cy="24" r="2" fill="#6b7280"/>
  <circle cx="40" cy="56" r="8" fill="#f3f4f6" stroke="#333" strokeWidth="2"/>
  <circle cx="40" cy="56" r="2" fill="#6b7280"/>
  <line x1="32" y1="24" x2="32" y2="56" stroke="#333" strokeWidth="2"/>
  <line x1="48" y1="24" x2="48" y2="56" stroke="#333" strokeWidth="2"/>
  <line x1="48" y1="56" x2="66" y2="78" stroke="#2563eb" strokeWidth="2"/>
  <rect x="28" y="66" width="24" height="12" fill="#fee2e2" stroke="#333" strokeWidth="1.5"/>
  <text x="40" y="74" textAnchor="middle" fontSize="6.5" fontWeight="700">80</text>
  <path d="M62 72l4 6 4-6" fill="none" stroke="#2563eb" strokeWidth="2"/>
  <text x="72" y="79" fontSize="7" fontWeight="700" fill="#2563eb">?</text>
`);

const partC: Question[] = [
  {
    id: 'S-C-1',
    subsectionId: 'spatial-mech',
    text: 'Gear A turns clockwise. Which way does Gear B turn?',
    opts: ['Clockwise', 'Counter-clockwise', 'It does not move', 'It depends on gear size'],
    correct: 1,
    exp: 'Two meshing gears always turn in opposite directions because the teeth push against each other. If Gear A turns clockwise, the touching gear must turn counter-clockwise.',
    promptSvg: gearDiagram([
      { cx: 34, cy: 50, r: 14, teeth: 10, label: 'A', sub: 'CW' },
      { cx: 63, cy: 50, r: 14, teeth: 10, label: 'B', sub: '?' },
    ]),
  },
  {
    id: 'S-C-2',
    subsectionId: 'spatial-mech',
    text: 'Gear A has 20 teeth and turns at 30 RPM clockwise. Gear B has 10 teeth. Which answer is correct?',
    opts: ['Clockwise at 60 RPM', 'Counter-clockwise at 60 RPM', 'Counter-clockwise at 15 RPM', 'Clockwise at 15 RPM'],
    correct: 1,
    exp: 'Meshing gears reverse direction, so B turns counter-clockwise. Because B has half as many teeth, it turns twice as fast: 30 RPM becomes 60 RPM.',
    promptSvg: gearDiagram([
      { cx: 30, cy: 50, r: 16, teeth: 12, label: 'A', sub: '20T / 30' },
      { cx: 62, cy: 50, r: 10, teeth: 8, label: 'B', sub: '10T / ?' },
    ]),
  },
  {
    id: 'S-C-3',
    subsectionId: 'spatial-mech',
    text: 'Three gears mesh in a row. Gear A turns clockwise. What happens to Gear C?',
    opts: ['Clockwise', 'Counter-clockwise', 'It stays still', 'It changes direction randomly'],
    correct: 0,
    exp: 'Each gear mesh reverses direction. A turns B the opposite way, then B turns C the opposite way again. Two reversals mean Gear C turns the same direction as Gear A.',
    promptSvg: gearDiagram([
      { cx: 24, cy: 50, r: 12, teeth: 10, label: 'A', sub: 'CW' },
      { cx: 50, cy: 50, r: 10, teeth: 8, label: 'B' },
      { cx: 72, cy: 50, r: 8, teeth: 6, label: 'C', sub: '?' },
    ]),
  },
  {
    id: 'S-C-4',
    subsectionId: 'spatial-mech',
    text: 'A chain connects the two wheels. If the left wheel turns clockwise, which way does the right wheel turn?',
    opts: ['Clockwise', 'Counter-clockwise', 'It depends on wheel size', 'It will not move'],
    correct: 0,
    exp: 'A chain or belt running normally around two wheels carries motion in the same rotational direction. Unlike meshing gears, the second wheel does not reverse.',
    promptSvg: mechPrompt(`
      <circle cx="28" cy="50" r="12" fill="#f3f4f6" stroke="#333" strokeWidth="2"/>
      <circle cx="72" cy="50" r="12" fill="#f3f4f6" stroke="#333" strokeWidth="2"/>
      <line x1="28" y1="38" x2="72" y2="38" stroke="#6b7280" strokeWidth="2"/>
      <line x1="28" y1="62" x2="72" y2="62" stroke="#6b7280" strokeWidth="2"/>
      <text x="28" y="53" textAnchor="middle" fontSize="8" fontWeight="700">CW</text>
      <text x="72" y="53" textAnchor="middle" fontSize="8" fontWeight="700">?</text>
    `),
  },
  {
    id: 'S-C-5',
    subsectionId: 'spatial-mech',
    text: 'Which weight balances this lever?',
    opts: ['5 kg', '10 kg', '15 kg', '20 kg'],
    correct: 1,
    exp: 'The left load is twice as close to the fulcrum as the right load is far, so the right side needs only half the weight. Ten kilograms balances the turning force.',
    promptSvg: leverSvg(38, 22, 70, '20', '?'),
  },
  {
    id: 'S-C-6',
    subsectionId: 'spatial-mech',
    text: 'A 50 kg load hangs from a single fixed pulley. How much pull is needed on the other side?',
    opts: ['25 kg', '50 kg', '75 kg', '100 kg'],
    correct: 1,
    exp: 'A fixed pulley changes the direction of effort but does not reduce the amount of force needed. You still need a pull equal to the 50 kg load.',
    promptSvg: pulleyFixedSvg,
  },
  {
    id: 'S-C-7',
    subsectionId: 'spatial-mech',
    text: 'This system uses one fixed pulley and one movable pulley with an 80 kg load. How much pull is required?',
    opts: ['20 kg', '40 kg', '80 kg', '160 kg'],
    correct: 1,
    exp: 'With two supporting rope sections holding the moving pulley, the load is shared in half. An 80 kg load therefore needs about 40 kg of pulling force.',
    promptSvg: pulleyMoveSvg,
  },
  {
    id: 'S-C-8',
    subsectionId: 'spatial-mech',
    text: 'Two identical gears mesh together. If the left gear turns at 40 RPM clockwise, what does the right gear do?',
    opts: ['Clockwise at 40 RPM', 'Counter-clockwise at 40 RPM', 'Counter-clockwise at 80 RPM', 'Clockwise at 20 RPM'],
    correct: 1,
    exp: 'Equal-size meshing gears keep the same speed because they have the same number of teeth, but they reverse direction. So the right gear is counter-clockwise at 40 RPM.',
    promptSvg: gearDiagram([
      { cx: 30, cy: 50, r: 14, teeth: 10, label: 'L', sub: '40 CW' },
      { cx: 58, cy: 50, r: 14, teeth: 10, label: 'R', sub: '?' },
    ]),
  },
];

const NET_1 = { top: { symbol: '★', color: '#c8102e' }, left: { symbol: '▲', color: '#2563eb' }, center: { symbol: '✕', color: '#111827' }, right: { symbol: '■', color: '#d97706' }, below: { symbol: '♦', color: '#15803d' }, bottom: { symbol: '●', color: '#7c3aed' } };
const NET_2 = { top: { symbol: '□', color: '#111827' }, left: { symbol: '⬟', color: '#111827' }, center: { symbol: '#', color: '#111827' }, right: { symbol: '✕', color: '#111827' }, below: { symbol: '☆', color: '#111827' }, bottom: { symbol: '⊕', color: '#111827' } };

const cubePrompt1 = baseQuestionSvg(`<g transform="translate(10 4) scale(0.36)">${cubeNetSVG(NET_1, 50)}</g>`);
const cubePrompt2 = baseQuestionSvg(`<g transform="translate(10 4) scale(0.36)">${cubeNetSVG(NET_2, 50)}</g>`);

const partD: Question[] = [
  {
    id: 'S-D-1',
    subsectionId: 'spatial-cubes',
    text: 'When this net is folded into a cube, which face is opposite ★?',
    opts: ['●', '▲', '♦', '■'],
    correct: 0,
    exp: 'In this vertical strip, ★ is at the top and ● is the extra square at the far bottom. When folded, those two squares end up on opposite faces of the cube.',
    promptSvg: cubePrompt1,
  },
  {
    id: 'S-D-2',
    subsectionId: 'spatial-cubes',
    text: 'When this net is folded, which face is opposite ✕?',
    opts: ['★', '♦', '▲', '■'],
    correct: 1,
    exp: 'The center square ✕ becomes one face of the cube and the square directly below it, ♦, folds around to become the opposite face on the back.',
    promptSvg: cubePrompt1,
  },
  {
    id: 'S-D-3',
    subsectionId: 'spatial-cubes',
    text: 'Which cube could be folded from this net?',
    opts: ['A', 'B', 'C', 'D'],
    correct: 2,
    exp: 'From the net, ✕ is adjacent to ★, ▲, ■, and ♦, but not to ●. Option C keeps visible faces that really meet at one cube corner. The others place opposite faces together.',
    promptSvg: cubePrompt1,
    choicesSvg: [
      netOption('✕', '★', '●'),
      netOption('▲', '■', '✕'),
      netOption('✕', '★', '■'),
      netOption('♦', '✕', '●'),
    ],
  },
  {
    id: 'S-D-4',
    subsectionId: 'spatial-cubes',
    text: 'When this second net is folded, which face is opposite #?',
    opts: ['□', '☆', '⊕', '✕'],
    correct: 1,
    exp: 'In this arrangement, the center face # folds opposite the square immediately below it, ☆. The top and bottom of the longer strip become a different opposite pair.',
    promptSvg: cubePrompt2,
  },
  {
    id: 'S-D-5',
    subsectionId: 'spatial-cubes',
    text: 'When this second net is folded, which face is opposite ⬟?',
    opts: ['□', '#', '✕', '⊕'],
    correct: 2,
    exp: '⬟ sits to the left of the center square and ✕ sits to the right. When the side flaps fold inward, those two end up on opposite sides of the finished cube.',
    promptSvg: cubePrompt2,
  },
  {
    id: 'S-D-6',
    subsectionId: 'spatial-cubes',
    text: 'Which cube could be folded from this second net?',
    opts: ['A', 'B', 'C', 'D'],
    correct: 0,
    exp: 'Option A shows three faces that are all mutually adjacent in the folded cube. The wrong options place opposite faces together, which cannot happen on a real cube corner.',
    promptSvg: cubePrompt2,
    choicesSvg: [
      netOption('#', '□', '✕'),
      netOption('⬟', '✕', '#'),
      netOption('☆', '#', '□'),
      netOption('⬟', '□', '✕'),
    ],
  },
];

export const spatialQuestions: Question[] = [...partA, ...partB, ...partC, ...partD];
