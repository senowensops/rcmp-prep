export type CubeFace = { symbol: string; color: string };
export type CubeFaces = { top?: CubeFace; left?: CubeFace; center?: CubeFace; right?: CubeFace; below?: CubeFace; bottom?: CubeFace };

export function gearSVG(cx: number, cy: number, r: number, teeth: number, color: string, label: string, sub?: string) {
  const toothDepth = r * 0.2, tipWidth = 0.3, baseWidth = 0.55;
  const pts: [number, number][] = [];
  for (let i = 0; i < teeth; i++) {
    const a0 = Math.PI * 2 * i / teeth, a1 = Math.PI * 2 * (i + 1) / teeth;
    const halfTooth = (a1 - a0) / 2;
    pts.push([cx + Math.cos(a0) * r, cy + Math.sin(a0) * r]);
    const tbL = a0 + halfTooth * (1 - baseWidth);
    pts.push([cx + Math.cos(tbL) * r, cy + Math.sin(tbL) * r]);
    const ttL = a0 + halfTooth * (1 - tipWidth);
    pts.push([cx + Math.cos(ttL) * (r + toothDepth), cy + Math.sin(ttL) * (r + toothDepth)]);
    const ttR = a0 + halfTooth * (1 + tipWidth);
    pts.push([cx + Math.cos(ttR) * (r + toothDepth), cy + Math.sin(ttR) * (r + toothDepth)]);
    const tbR = a0 + halfTooth * (1 + baseWidth);
    pts.push([cx + Math.cos(tbR) * r, cy + Math.sin(tbR) * r]);
  }
  const d = pts.map((p, i) => (i === 0 ? 'M' : 'L') + p[0].toFixed(1) + ',' + p[1].toFixed(1)).join(' ') + 'Z';
  let s = `<path d="${d}" fill="#d0d0d0" stroke="#888" stroke-width="1.5"/>`;
  s += `<circle cx="${cx}" cy="${cy}" r="${r * 0.35}" fill="#e8e8e8" stroke="#aaa" stroke-width="1.5"/>`;
  s += `<circle cx="${cx}" cy="${cy}" r="${r * 0.12}" fill="#666"/>`;
  s += `<text x="${cx}" y="${cy + 4}" text-anchor="middle" font-size="13" fill="#333" font-weight="800" font-family="Barlow Condensed,sans-serif">${label}</text>`;
  if (sub) s += `<text x="${cx}" y="${cy + r + toothDepth + 16}" text-anchor="middle" font-size="10" fill="${color}" font-weight="600" font-family="Barlow Condensed,sans-serif">${sub}</text>`;
  return s;
}

export function cubeNetSVG(faces: CubeFaces, size?: number) {
  const s = size || 70, gap = 2, pad = 10;
  const w = 3 * s + 2 * gap + 2 * pad, h = 4 * s + 3 * gap + 2 * pad;
  const col1 = pad, col2 = pad + s + gap, col3 = pad + 2 * (s + gap);
  const row1 = pad, row2 = pad + s + gap, row3 = pad + 2 * (s + gap), row4 = pad + 3 * (s + gap);
  function box(x: number, y: number, face?: CubeFace) {
    let r = `<rect x="${x}" y="${y}" width="${s}" height="${s}" fill="#fff" stroke="#333" stroke-width="2.5"/>`;
    if (face) r += `<text x="${x + s / 2}" y="${y + s / 2 + 8}" text-anchor="middle" font-size="28" fill="${face.color}" font-weight="700">${face.symbol}</text>`;
    return r;
  }
  let svg = `<svg viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">`;
  svg += box(col2, row1, faces.top);
  svg += box(col1, row2, faces.left);
  svg += box(col2, row2, faces.center);
  svg += box(col3, row2, faces.right);
  svg += box(col2, row3, faces.below);
  svg += box(col2, row4, faces.bottom);
  svg += `</svg>`;
  return svg;
}
