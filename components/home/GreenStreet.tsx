"use client";

import React from "react";

/**
 * A street in Mumbai where Green Shoots lives. Flat colour, one line weight,
 * no light effects — the only motion is a taxi and a scooter going about
 * their day.
 *
 *   Office (Art Deco, rooftop letters) · banyan on a chabutra · chai tapri ·
 *   housing society · school & playground · park · GIFT City towers.
 */

/* ---------------- projection ---------------- */
const S = 25;
const OX = 713;
const OY = 118;
const CX = 0.8660254;
const P = (x: number, y: number, z = 0): [number, number] => [OX + (x - y) * S * CX, OY + (x + y) * S * 0.5 - z * S];
const pt = (x: number, y: number, z = 0) => {
  const [a, b] = P(x, y, z);
  return `${a.toFixed(1)},${b.toFixed(1)}`;
};
type V3 = [number, number, number?];
const poly = (...ps: V3[]) => ps.map((p) => pt(p[0], p[1], p[2] ?? 0)).join(" ");
const path = (ps: V3[], close = true) => `M${ps.map((p) => pt(p[0], p[1], p[2] ?? 0)).join(" L")}${close ? "Z" : ""}`;

/* ---------------- palette ---------------- */
const INK = "#1F3A2C";
type Tone = { top: string; left: string; right: string };
const WALL: Tone = { top: "#FFFFFF", left: "#F7F3EA", right: "#E8E1D1" };
const SAGE: Tone = { top: "#D5E2BE", left: "#BFD0A2", right: "#A6BA87" };
const FOREST: Tone = { top: "#3B5E4B", left: "#2A4A39", right: "#213D2F" };
const GOLD: Tone = { top: "#EED79A", left: "#DFC170", right: "#C8A956" };
const GLASS_T: Tone = { top: "#EEF3EC", left: "#DCE7DD", right: "#C6D7CA" };
const STONE: Tone = { top: "#F2ECDF", left: "#E6DECC", right: "#D6CCB6" };
const DARK: Tone = { top: "#3A4A42", left: "#26332C", right: "#1D2923" };
const GLASS = "#CFE0D2";
const ROAD = "#E5E0D3";
const WALK = "#F0EBDF";
const LAWN = "#D5E2BE";
const BG = "#F5F1E8";

/* ---------------- primitives ---------------- */

function Box({ x, y, z, w, d, h, t = WALL }: { x: number; y: number; z: number; w: number; d: number; h: number; t?: Tone }) {
  const zt = z + h;
  return (
    <g>
      <polygon fill={t.left} points={poly([x, y + d, z], [x + w, y + d, z], [x + w, y + d, zt], [x, y + d, zt])} />
      <polygon fill={t.right} points={poly([x + w, y, z], [x + w, y + d, z], [x + w, y + d, zt], [x + w, y, zt])} />
      <polygon fill={t.top} points={poly([x, y, zt], [x + w, y, zt], [x + w, y + d, zt], [x, y + d, zt])} />
    </g>
  );
}

/** Rectangle on a left-facing wall (plane y = Y), u along x, v up. */
const onL = (Y: number, u0: number, v0: number, u1: number, v1: number) => poly([u0, Y, v0], [u1, Y, v0], [u1, Y, v1], [u0, Y, v1]);
/** Rectangle on a right-facing wall (plane x = X), u along y, v up. */
const onR = (X: number, u0: number, v0: number, u1: number, v1: number) => poly([X, u0, v0], [X, u1, v0], [X, u1, v1], [X, u0, v1]);

/** Arched opening on a left wall. */
function archL(Y: number, u: number, w: number, h: number) {
  const r = w / 2;
  const pts: V3[] = [[u, Y, 0], [u, Y, h - r]];
  for (let i = 0; i <= 10; i++) {
    const a = Math.PI - (i / 10) * Math.PI;
    pts.push([u + r + Math.cos(a) * r, Y, h - r + Math.sin(a) * r]);
  }
  pts.push([u + w, Y, 0]);
  return path(pts);
}

/** Upright cylinder (iso circle radius r at x,y from z0, height h). */
function Cyl({ x, y, z, r, h, t }: { x: number; y: number; z: number; r: number; h: number; t: Tone }) {
  const [cx, cyB] = P(x, y, z);
  const cyT = cyB - h * S;
  const rx = r * S * 1.2247;
  const ry = r * S * 0.7071;
  return (
    <g>
      <path fill={t.left} d={`M${cx - rx},${cyT} L${cx - rx},${cyB} A${rx} ${ry} 0 0 0 ${cx + rx},${cyB} L${cx + rx},${cyT} Z`} />
      <ellipse cx={cx} cy={cyT} rx={rx} ry={ry} fill={t.top} />
    </g>
  );
}

/** Rounded rectangle on the ground, as world points. */
function rrect(x0: number, y0: number, x1: number, y1: number, r: number): V3[] {
  const pts: V3[] = [];
  const arc = (cx: number, cy: number, a0: number) => {
    for (let i = 0; i <= 6; i++) {
      const a = a0 + (i / 6) * (Math.PI / 2);
      pts.push([cx + Math.cos(a) * r, cy + Math.sin(a) * r, 0]);
    }
  };
  arc(x1 - r, y0 + r, -Math.PI / 2);
  arc(x1 - r, y1 - r, 0);
  arc(x0 + r, y1 - r, Math.PI / 2);
  arc(x0 + r, y0 + r, Math.PI);
  return pts;
}

/** Text lying on a left-facing wall (reads along +x). */
function TextL({ x, y, z, size, children, fill = INK, family = "sans", weight = 700, spacing = 1.5 }: { x: number; y: number; z: number; size: number; children: React.ReactNode; fill?: string; family?: "sans" | "serif"; weight?: number; spacing?: number }) {
  const [a, b] = P(x, y, z);
  return (
    <text
      transform={`matrix(${CX} 0.5 0 1 ${a.toFixed(1)} ${b.toFixed(1)})`}
      fontSize={size}
      fill={fill}
      stroke="none"
      fontWeight={weight}
      letterSpacing={spacing}
      fontFamily={family === "serif" ? "'Cormorant Garamond', Georgia, serif" : "'Plus Jakarta Sans', sans-serif"}
      fontStyle={family === "serif" ? "italic" : "normal"}
    >
      {children}
    </text>
  );
}

function Tree({ x, y, s = 1, round = false }: { x: number; y: number; s?: number; round?: boolean }) {
  const [bx, by] = P(x, y, 0);
  return (
    <g>
      <path d={`M${bx},${by} L${bx},${by - 16 * s}`} strokeWidth={1.4} />
      {round ? (
        <circle cx={bx} cy={by - 28 * s} r={14 * s} fill={LAWN} />
      ) : (
        <path fill={LAWN} d={`M${bx},${by - 12 * s} C${bx - 15 * s},${by - 16 * s} ${bx - 13 * s},${by - 46 * s} ${bx},${by - 54 * s} C${bx + 13 * s},${by - 46 * s} ${bx + 15 * s},${by - 16 * s} ${bx},${by - 12 * s} Z`} />
      )}
      <path d={`M${bx - 4 * s},${by - 30 * s} q3 -3 6 0 M${bx + 1 * s},${by - 22 * s} q3 -3 6 0`} strokeWidth={0.9} />
    </g>
  );
}

function Palm({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  const [bx, by] = P(x, y, 0);
  const tx = bx + 4 * s, ty = by - 76 * s;
  const fronds = [-168, -138, -108, -72, -42, -12, 160].map((deg, i) => {
    const a = (deg * Math.PI) / 180;
    const L = (i % 2 ? 26 : 32) * s;
    const r1 = (v: number) => v.toFixed(1);
    const ex = tx + Math.cos(a) * L, ey = ty + Math.sin(a) * L + 10 * s;
    const mx = tx + Math.cos(a) * L * 0.5, my = ty + Math.sin(a) * L * 0.5 - 6 * s;
    return `M${r1(tx)},${r1(ty)} Q${r1(mx)},${r1(my)} ${r1(ex)},${r1(ey)}`;
  });
  return (
    <g>
      <path d={`M${bx},${by} Q${bx + 9 * s},${by - 40 * s} ${tx},${ty}`} strokeWidth={2.6} />
      {fronds.map((d, i) => (
        <g key={i}>
          <path d={d} stroke="#8DA66A" strokeWidth={5 * s} />
          <path d={d} strokeWidth={0.9} />
        </g>
      ))}
    </g>
  );
}

function Lamp({ x, y }: { x: number; y: number }) {
  const [bx, by] = P(x, y, 0);
  return (
    <g>
      <path d={`M${bx},${by} L${bx},${by - 54} q0 -6 6 -6 L${bx + 12},${by - 60}`} strokeWidth={1.3} />
      <path d={`M${bx + 9},${by - 61} h9 l-2 4 h-5 z`} fill={DARK.left} />
    </g>
  );
}

function Scooter({ x, y, colour = SAGE, along = "x" }: { x: number; y: number; colour?: Tone; along?: "x" | "y" }) {
  if (along === "x") {
    const [w1x, w1y] = P(x + 0.12, y + 0.3, 0.1);
    const [w2x, w2y] = P(x + 0.66, y + 0.3, 0.1);
    return (
      <g>
        <Box x={x} y={y} z={0.12} w={0.8} d={0.3} h={0.22} t={colour} />
        <Box x={x + 0.08} y={y + 0.04} z={0.34} w={0.38} d={0.22} h={0.08} t={DARK} />
        <polygon fill={colour.left} points={poly([x + 0.62, y + 0.3, 0.3], [x + 0.78, y + 0.3, 0.3], [x + 0.8, y + 0.3, 0.72], [x + 0.7, y + 0.3, 0.72])} />
        <circle cx={w1x} cy={w1y} r={3.6} fill={DARK.left} />
        <circle cx={w2x} cy={w2y} r={3.6} fill={DARK.left} />
      </g>
    );
  }
  const [w1x, w1y] = P(x + 0.3, y + 0.12, 0.1);
  const [w2x, w2y] = P(x + 0.3, y + 0.66, 0.1);
  return (
    <g>
      <Box x={x} y={y} z={0.12} w={0.3} d={0.8} h={0.22} t={colour} />
      <Box x={x + 0.04} y={y + 0.34} z={0.34} w={0.22} d={0.38} h={0.08} t={DARK} />
      <polygon fill={colour.right} points={poly([x + 0.3, y + 0.02, 0.3], [x + 0.3, y + 0.18, 0.3], [x + 0.3, y + 0.1, 0.72], [x + 0.3, y + 0.0, 0.72])} />
      <circle cx={w1x} cy={w1y} r={3.6} fill={DARK.left} />
      <circle cx={w2x} cy={w2y} r={3.6} fill={DARK.left} />
    </g>
  );
}

/** Mumbai kaali-peeli: black below, yellow above. Drawn heading +x. */
function Taxi({ x, y }: { x: number; y: number }) {
  const w1 = P(x + 0.3, y + 0.78, 0.13);
  const w2 = P(x + 1.25, y + 0.78, 0.13);
  return (
    <g>
      <Box x={x} y={y} z={0.12} w={1.6} d={0.78} h={0.3} t={GOLD} />
      <polygon fill={DARK.left} points={poly([x, y + 0.78, 0.12], [x + 1.6, y + 0.78, 0.12], [x + 1.6, y + 0.78, 0.26], [x, y + 0.78, 0.26])} />
      <Box x={x + 0.38} y={y + 0.06} z={0.42} w={0.86} d={0.66} h={0.3} t={DARK} />
      <polygon fill={GLASS} points={onL(y + 0.72, x + 0.46, 0.47, x + 0.78, 0.68)} />
      <polygon fill={GLASS} points={onL(y + 0.72, x + 0.84, 0.47, x + 1.16, 0.68)} />
      <polygon fill={GLASS} points={onR(x + 1.24, y + 0.12, 0.47, y + 0.66, 0.68)} />
      <Box x={x + 0.68} y={y + 0.24} z={0.72} w={0.26} d={0.3} h={0.08} t={GOLD} />
      <circle cx={w1[0]} cy={w1[1]} r={5} fill={DARK.right} />
      <circle cx={w2[0]} cy={w2[1]} r={5} fill={DARK.right} />
    </g>
  );
}

/* ---------------- landmarks ---------------- */

function Housing() {
  const floors = Array.from({ length: 10 }, (_, f) => 0.35 + f * 0.76);
  return (
    <g>
      <Box x={5} y={5} z={0} w={4} d={3.5} h={8.1} />
      {floors.map((z) => (
        <g key={z}>
          {[5.3, 7.3].map((u) => (
            <g key={u}>
              <polygon fill={GLASS} points={onL(8.5, u + 0.2, z + 0.12, u + 1.2, z + 0.58)} />
              <Box x={u} y={8.5} z={z} w={1.4} d={0.34} h={0.06} t={STONE} />
              <polygon fill="#FFFFFF" points={onL(8.84, u, z + 0.06, u + 1.4, z + 0.3)} />
            </g>
          ))}
          {[5.4, 6.4, 7.4].map((u) => (
            <polygon key={u} fill={GLASS} points={onR(9, u, z + 0.14, u + 0.62, z + 0.56)} />
          ))}
        </g>
      ))}
      {/* a few balcony plants */}
      {[[5.6, 1.15], [8.2, 2.67], [5.9, 4.95], [7.9, 6.47]].map(([u, z], i) => {
        const [px, py] = P(u, 8.7, z + 0.3);
        return <circle key={i} cx={px} cy={py - 4} r={4.5} fill={LAWN} />;
      })}
      <Box x={7.3} y={5.4} z={8.1} w={1.2} d={1.2} h={0.62} />
      <Cyl x={6.1} y={6.3} z={8.1} r={0.42} h={0.6} t={DARK} />
      <polygon fill={DARK.left} points={onL(8.5, 6.6, 0, 7.4, 0.32)} />
    </g>
  );
}

function Office() {
  return (
    <g>
      <Box x={12} y={8} z={0} w={6} d={4.5} h={3.9} />
      {/* floor bands */}
      {[1.35, 2.62].map((z) => (
        <g key={z}>
          <path d={path([[12, 12.5, z], [16.3, 12.5, z]], false)} />
          <path d={path([[18, 8, z], [18, 12.5, z]], false)} />
        </g>
      ))}
      {/* ground floor arches, upper windows */}
      {[12.35, 13.3, 14.25, 15.2].map((u) => (
        <g key={u}>
          <path d={archL(12.5, u, 0.62, 1.12)} fill={GLASS} />
          <polygon fill={GLASS} points={onL(12.5, u, 1.62, u + 0.62, 2.38)} />
          <polygon fill={GLASS} points={onL(12.5, u, 2.9, u + 0.62, 3.6)} />
        </g>
      ))}
      {[8.4, 9.4, 10.4, 11.4].map((u) => (
        <g key={u}>
          <polygon fill={GLASS} points={onR(18, u, 0.25, u + 0.62, 1.1)} />
          <polygon fill={GLASS} points={onR(18, u, 1.62, u + 0.62, 2.38)} />
          <polygon fill={GLASS} points={onR(18, u, 2.9, u + 0.62, 3.6)} />
        </g>
      ))}
      {/* Deco tower with fins */}
      <Box x={16.3} y={12.5} z={0} w={1.4} d={0.5} h={4.9} t={SAGE} />
      {[16.62, 17.0, 17.38].map((u) => (
        <path key={u} d={path([[u, 13, 1.6], [u, 13, 4.6]], false)} />
      ))}
      <Box x={16.5} y={12.6} z={4.9} w={1.0} d={0.3} h={0.32} t={SAGE} />
      <polygon fill={FOREST.left} points={onL(13, 16.6, 0, 17.4, 0.95)} />
      {/* awning + steps */}
      <polygon fill={GOLD.top} points={poly([13.25, 12.5, 1.38], [15.25, 12.5, 1.38], [15.25, 13.05, 1.12], [13.25, 13.05, 1.12])} />
      {[13.65, 14.05, 14.45, 14.85].map((u) => (
        <polygon key={u} fill="#FFFFFF" points={poly([u, 12.5, 1.38], [u + 0.2, 12.5, 1.38], [u + 0.2, 13.05, 1.12], [u, 13.05, 1.12])} />
      ))}
      <polygon fill={GOLD.left} points={onL(13.05, 13.25, 1.0, 15.25, 1.12)} />
      <Box x={13.4} y={12.5} z={0} w={1.7} d={0.4} h={0.12} t={STONE} />
      {/* roof terrace: planters and tank at the back, letters in front */}
      {[[12.6, 8.5], [13.5, 8.4], [15.6, 8.5]].map(([x, y], i) => {
        const [px, py] = P(x, y, 3.9);
        return <circle key={i} cx={px} cy={py - 5} r={5.5} fill={LAWN} />;
      })}
      <Cyl x={17.2} y={8.9} z={3.9} r={0.36} h={0.5} t={DARK} />
      {/* rooftop letters, like the old Deco buildings */}
      <path d={path([[12.5, 10.9, 3.9], [12.5, 10.9, 4.25]], false)} />
      <path d={path([[16.0, 10.9, 3.9], [16.0, 10.9, 4.25]], false)} />
      <path d={path([[12.3, 10.9, 4.25], [16.2, 10.9, 4.25]], false)} />
      <TextL x={12.32} y={10.9} z={4.32} size={13.5} spacing={1.4}>GREEN SHOOTS</TextL>
    </g>
  );
}

function Banyan() {
  const [cx, cyB] = P(7.6, 12.4, 0.35);
  const top = cyB - 100;
  // Aerial roots: [x offset, how far down they reach (1 = ground), thickness]
  const roots: [number, number, number][] = [
    [-112, 0.55, 1], [-96, 1, 2.6], [-74, 0.4, 1], [-58, 0.8, 1], [-30, 0.35, 1],
    [34, 0.45, 1], [62, 1, 2.8], [84, 0.5, 1], [104, 0.7, 1], [120, 0.3, 1],
  ];
  const blobs: [number, number, number, number, string][] = [
    [-110, 26, 34, 19, "#B4C895"], [122, 22, 32, 18, "#C2D4A5"],
    [-78, 4, 46, 27, "#C2D4A5"], [84, 0, 48, 28, "#D5E2BE"],
    [-44, -26, 46, 27, "#D5E2BE"], [38, -30, 50, 28, "#C2D4A5"],
    [-6, -44, 42, 24, "#D5E2BE"], [-2, -6, 62, 32, "#D5E2BE"],
    [-58, 26, 44, 20, "#B4C895"], [54, 26, 46, 20, "#B4C895"], [2, 30, 40, 16, "#C2D4A5"],
  ];
  return (
    <g>
      <Cyl x={7.6} y={12.4} z={0} r={1.6} h={0.35} t={STONE} />
      {roots.map(([dx, reach, w], i) => {
        const y0 = top + 30;
        const y1 = y0 + (cyB + (Math.abs(dx) > 90 ? 16 : 6) - y0) * reach;
        return <path key={i} d={`M${cx + dx},${y0} L${cx + dx + (i % 2 ? 1 : -1)},${y1}`} strokeWidth={w} />;
      })}
      <path fill={FOREST.left} d={`M${cx - 18},${cyB + 2} C${cx - 9},${cyB - 12} ${cx - 12},${cyB - 54} ${cx - 6},${top + 22} L${cx + 7},${top + 22} C${cx + 12},${cyB - 54} ${cx + 10},${cyB - 12} ${cx + 19},${cyB + 2} Z`} />
      <path d={`M${cx - 4},${top + 40} C${cx - 20},${top + 30} ${cx - 40},${top + 28} ${cx - 60},${top + 22} M${cx + 4},${top + 44} C${cx + 22},${top + 32} ${cx + 44},${top + 30} ${cx + 66},${top + 20}`} strokeWidth={2.4} />
      {blobs.map(([dx, dy, rx, ry, c], i) => (
        <ellipse key={i} cx={cx + dx} cy={top + dy} rx={rx} ry={ry} fill={c} />
      ))}
      {[[-84, 4], [44, -30], [-12, -8], [92, 6], [-48, -26], [10, 24]].map(([dx, dy], i) => (
        <path key={i} d={`M${cx + dx},${top + dy} q4 -4 8 0 q4 4 8 0`} strokeWidth={0.9} />
      ))}
    </g>
  );
}

function Tapri() {
  const [kx, ky] = P(6.45, 16.08, 0.88);
  return (
    <g>
      <Box x={5.4} y={15} z={0} w={1.7} d={1.0} h={0.95} />
      <polygon fill={SAGE.left} points={onL(16, 5.4, 0, 7.1, 0.3)} />
      <polygon fill={FOREST.left} points={onL(16, 5.6, 0.44, 6.9, 0.84)} />
      <Box x={5.5} y={15.95} z={0.36} w={1.5} d={0.18} h={0.06} t={STONE} />
      {/* striped awning */}
      {[0, 1, 2, 3, 4, 5].map((k) => (
        <polygon key={k} fill={k % 2 ? "#FFFFFF" : GOLD.top} points={poly([5.3 + k * 0.32, 16, 1.18], [5.62 + k * 0.32, 16, 1.18], [5.62 + k * 0.32, 16.5, 0.96], [5.3 + k * 0.32, 16.5, 0.96])} />
      ))}
      {/* kettle */}
      <path d={`M${kx - 5},${ky} q0 -9 5 -9 q5 0 5 9 z M${kx + 5},${ky - 5} l6 -3`} fill={GOLD.left} />
      {/* signboard */}
      <Box x={5.6} y={15.3} z={0.95} w={1.3} d={0.08} h={0.4} t={FOREST} />
      <TextL x={5.86} y={15.38} z={1.06} size={9} fill="#F5F1E8" spacing={1.2}>CHAI</TextL>
      <Cyl x={5.9} y={16.95} z={0} r={0.17} h={0.3} t={GOLD} />
      <Cyl x={6.75} y={16.95} z={0} r={0.17} h={0.3} t={GOLD} />
    </g>
  );
}

function School() {
  return (
    <g>
      <Box x={19.5} y={5} z={0} w={5} d={3.5} h={2.4} />
      <polygon fill={SAGE.left} points={onL(8.5, 19.5, 0, 24.5, 0.32)} />
      <polygon fill={SAGE.right} points={onR(24.5, 5, 0, 8.5, 0.32)} />
      {[19.8, 20.55, 21.3, 22.95, 23.7].map((u) => (
        <g key={u}>
          <polygon fill={GLASS} points={onL(8.5, u, 0.62, u + 0.45, 1.18)} />
          <polygon fill={GLASS} points={onL(8.5, u, 1.42, u + 0.45, 1.98)} />
        </g>
      ))}
      <path d={archL(8.5, 22.05, 0.7, 1.15)} fill={FOREST.left} />
      {[5.35, 6.15, 6.95, 7.75].map((u) => (
        <g key={u}>
          <polygon fill={GLASS} points={onR(24.5, u, 0.62, u + 0.45, 1.18)} />
          <polygon fill={GLASS} points={onR(24.5, u, 1.42, u + 0.45, 1.98)} />
        </g>
      ))}
      <Box x={19.5} y={5} z={2.4} w={5} d={3.5} h={0.16} t={GOLD} />
      <polygon fill={FOREST.left} points={onL(8.5, 21.4, 2.02, 23.4, 2.3)} />
      <TextL x={21.55} y={8.5} z={2.09} size={7.5} fill="#F5F1E8" spacing={2}>SCHOOL</TextL>
      {/* flag */}
      <path d={path([[20.2, 9.5, 0], [20.2, 9.5, 3.4]], false)} strokeWidth={1.3} />
      <polygon fill={GOLD.left} points={poly([20.2, 9.5, 3.38], [21.05, 9.5, 3.3], [21.05, 9.5, 2.88], [20.2, 9.5, 2.96])} />
    </g>
  );
}

function Grounds() {
  const field = rrect(19.6, 10, 24.4, 13.3, 0.35);
  const park = rrect(19.6, 14.1, 24.4, 17.3, 0.35);
  const [fcx, fcy] = P(22, 11.65, 0);
  return (
    <g>
      <path d={path(field)} fill={LAWN} />
      <g stroke="#FFFFFF" strokeWidth={1.6}>
        <path d={path(rrect(19.9, 10.3, 24.1, 13.0, 0.05))} />
        <path d={path([[22, 10.3], [22, 13.0]], false)} />
        <ellipse cx={fcx} cy={fcy} rx={0.55 * S * 1.2247} ry={0.55 * S * 0.7071} />
      </g>
      <path d={path([[19.9, 11.2, 0], [19.9, 11.2, 0.5], [19.9, 12.1, 0.5], [19.9, 12.1, 0]], false)} strokeWidth={1.2} />
      <path d={path([[24.1, 11.2, 0], [24.1, 11.2, 0.5], [24.1, 12.1, 0.5], [24.1, 12.1, 0]], false)} strokeWidth={1.2} />
      <path d={path(park)} fill={LAWN} />
      <path d={path([[20.2, 16.8], [22.4, 15.2], [24, 15.2]], false)} stroke={WALK} strokeWidth={7} />
      <Box x={22.6} y={15.9} z={0.18} w={0.9} d={0.3} h={0.06} t={STONE} />
      <path d={path([[22.6, 16.2, 0], [22.6, 16.2, 0.18]], false)} />
      <path d={path([[23.5, 16.2, 0], [23.5, 16.2, 0.18]], false)} />
    </g>
  );
}

function Gift() {
  return (
    <g>
      <Box x={27.9} y={2.5} z={0} w={1.6} d={1.6} h={7} t={GLASS_T} />
      {Array.from({ length: 12 }, (_, i) => 0.6 + i * 0.55).map((z) => (
        <g key={z} strokeOpacity={0.45}>
          <path d={path([[27.9, 4.1, z], [29.5, 4.1, z]], false)} />
          <path d={path([[29.5, 2.5, z], [29.5, 4.1, z]], false)} />
        </g>
      ))}
      <Box x={27.8} y={0.2} z={0} w={1.8} d={1.6} h={10.2} t={GLASS_T} />
      {[28.1, 28.4, 28.7, 29.0, 29.3].map((u) => (
        <path key={u} d={path([[u, 1.8, 0.4], [u, 1.8, 9.9]], false)} strokeOpacity={0.45} />
      ))}
      {[0.5, 0.85, 1.2, 1.55].map((u) => (
        <path key={u} d={path([[29.6, u, 0.4], [29.6, u, 9.9]], false)} strokeOpacity={0.45} />
      ))}
      <Box x={28.1} y={0.45} z={10.2} w={1.2} d={1.1} h={0.45} t={GLASS_T} />
      <path d={path([[28.7, 1.0, 10.65], [28.7, 1.0, 11.6]], false)} strokeWidth={1.2} />
    </g>
  );
}

function Billboard() {
  return (
    <g>
      <path d={path([[22.9, 21.4, 0], [22.9, 21.4, 1.5]], false)} strokeWidth={1.6} />
      <path d={path([[26.4, 21.4, 0], [26.4, 21.4, 1.5]], false)} strokeWidth={1.6} />
      <polygon fill={FOREST.left} points={onL(21.4, 22.2, 1.45, 27.2, 3.2)} />
      <polygon fill={FOREST.right} points={poly([27.2, 21.4, 1.45], [27.2, 21.25, 1.45], [27.2, 21.25, 3.2], [27.2, 21.4, 3.2])} />
      <TextL x={22.55} y={21.4} z={2.5} size={17} fill="#F5F1E8" family="serif" weight={500} spacing={0}>Strong roots.</TextL>
      <TextL x={22.55} y={21.4} z={1.85} size={17} fill="#E6CF8F" family="serif" weight={500} spacing={0}>Enduring wealth.</TextL>
    </g>
  );
}

/* ---------------- scene ---------------- */

export default function GreenStreet({ play, className = "" }: { play: boolean; className?: string }) {
  const outer = rrect(1.4, 1.4, 27.6, 20.6, 3.6);
  const road = rrect(2, 2, 27, 20, 3);
  const walk = rrect(4, 4, 25, 18, 1.6);
  const block = rrect(4.6, 4.6, 24.4, 17.4, 1.1);
  const lane = rrect(3, 3, 26, 19, 2.2);
  const taxiFrom = P(4.6, 19.05);
  const taxiTo = P(24.2, 19.05);
  const scootFrom = P(25.3, 16.2);
  const scootTo = P(25.3, 4.4);

  const at = (d: number): React.CSSProperties => ({ ["--d" as string]: `${d}ms` });

  return (
    <svg viewBox="240 50 1120 690" className={`gs-city ${play ? "is-in" : ""} ${className}`} fill="none" stroke={INK} strokeWidth="1" strokeLinejoin="round" strokeLinecap="round" role="img" aria-label="An illustrated Mumbai street: the Green Shoots office beside a banyan tree and a chai stall, with a housing society, a school, a park and GIFT City towers in the distance">
      {/* ground */}
      <g className="gs-in" style={at(0)}>
        <path d={path(outer)} fill={WALK} />
        <polygon fill={ROAD} points={poly([13.6, 20], [16, 20], [16, 40], [13.6, 40])} />
        <polygon fill={ROAD} points={poly([27, 9.6], [48, 9.6], [48, 12], [27, 12])} />
        <polygon fill={ROAD} points={poly([9.6, 2], [12, 2], [12, -40], [9.6, -40])} />
        <path d={path(road)} fill={ROAD} />
        <path d={path(lane)} stroke="#FFFFFF" strokeWidth={2} strokeDasharray="10 12" />
        <path d={path(walk)} fill={WALK} />
        <path d={path(block)} fill={BG} />
        {Array.from({ length: 6 }, (_, i) => 13.75 + i * 0.38).map((x) => (
          <polygon key={x} fill="#FFFFFF" stroke="none" points={poly([x, 18.25], [x + 0.2, 18.25], [x + 0.2, 19.75], [x, 19.75])} />
        ))}
        <path d={path(rrect(5, 9.5, 11, 15.6, 0.5))} fill={LAWN} />
      </g>

      {/* back edge */}
      <g className="gs-in" style={at(120)}>
        <Palm x={7} y={0.6} s={0.9} />
        <Palm x={13} y={0.7} />
        <Palm x={19.5} y={0.6} s={0.85} />
        <Palm x={0.7} y={4.5} />
        <Palm x={0.6} y={9.5} s={0.9} />
      </g>

      <g className="gs-in" style={at(180)}><Gift /></g>
      <g className="gs-in" style={at(240)}><Housing /></g>
      <g className="gs-in" style={at(300)}><School /></g>
      <g className="gs-in" style={at(340)}>
        <Lamp x={11} y={4.3} />
        <Lamp x={18} y={4.3} />
        <Lamp x={4.3} y={7.5} />
        <Lamp x={24.7} y={9.4} />
      </g>
      <g className="gs-in" style={at(380)}><Banyan /></g>
      <g className="gs-in" style={at(440)}><Office /></g>
      <g className="gs-in" style={at(500)}>
        <Grounds />
        <Tree x={20.3} y={14.8} round />
        <Tree x={23.7} y={14.7} />
        <Tree x={21.3} y={16.8} s={0.9} round />
        <Tree x={11.4} y={14.6} s={0.85} />
        <Tree x={18.6} y={13.6} s={0.8} />
      </g>
      <g className="gs-in" style={at(560)}>
        <Tapri />
        <Scooter x={8.4} y={16.5} colour={SAGE} />
        <Scooter x={9.4} y={16.5} colour={GOLD} />
        <Lamp x={4.3} y={13} />
        <Lamp x={11} y={17.7} />
        <Lamp x={19} y={17.7} />
        <Lamp x={24.7} y={14.2} />
      </g>

      {/* traffic */}
      <g className="gs-drive" style={{ ["--dx" as string]: `${scootTo[0] - scootFrom[0]}px`, ["--dy" as string]: `${scootTo[1] - scootFrom[1]}px`, ["--dur" as string]: "11s", ["--dl" as string]: "1.5s" }}>
        <Scooter x={25.3} y={16.2} colour={SAGE} along="y" />
      </g>
      <g className="gs-drive" style={{ ["--dx" as string]: `${taxiTo[0] - taxiFrom[0]}px`, ["--dy" as string]: `${taxiTo[1] - taxiFrom[1]}px`, ["--dur" as string]: "14s", ["--dl" as string]: "0.6s" }}>
        <Taxi x={4.6} y={19.05} />
      </g>

      {/* front edge */}
      <g className="gs-in" style={at(620)}>
        <Palm x={28.4} y={6.5} s={0.95} />
        <Palm x={28.6} y={14.5} />
        <Palm x={0.8} y={15} s={0.95} />
        <Palm x={3.2} y={21.4} />
        <Palm x={8.5} y={21.5} s={0.9} />
        <Palm x={18.6} y={21.4} s={0.95} />
        <Billboard />
      </g>
    </svg>
  );
}
