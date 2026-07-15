import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const width = 16;
const height = 25;
const rows = Array.from({ length: height }, () => Array.from({ length: width }, () => "#"));

function floor(x: number, y: number): void {
  rows[y]![x] = ".";
}

function glyph(x: number, y: number, value: string): void {
  rows[y]![x] = value;
}

function floorRow(y: number, fromX: number, toX: number): void {
  for (let x = fromX; x <= toX; x += 1) floor(x, y);
}

function floorColumn(x: number, fromY: number, toY: number): void {
  for (let y = fromY; y <= toY; y += 1) floor(x, y);
}

// Fixed P/L and B/S; the active boundary is x=9|10, immediately beside both ordinary C.
glyph(9, 1, "P");
glyph(10, 1, "L");
glyph(9, 2, "S");
glyph(10, 2, "B");

// The start descends past both direct piston interfaces before entering the yard.
floorColumn(8, 3, 17);
floorColumn(9, 4, 17);
for (const y of [4, 8]) {
  glyph(10, y, "C");
  glyph(11, y, "G");
}

// Irregular blind atrium.  The true target shadow is stepped rather than an H-shaped cavity:
// x=7,y4..8 shadows H, then x=6,y9..11 shadows the bulky relay.
for (let x = 3; x <= 6; x += 1) floor(x, 5);
for (let x = 2; x <= 6; x += 1) floor(x, 6);
for (let x = 2; x <= 5; x += 1) floor(x, 7);
for (let x = 1; x <= 6; x += 1) floor(x, 8);
for (let x = 1; x <= 5; x += 1) floor(x, 9);
for (let x = 2; x <= 5; x += 1) floor(x, 10);
for (let x = 3; x <= 5; x += 1) floor(x, 11);
floorRow(12, 1, 9);
for (let y = 9; y <= 11; y += 1) floor(7, y);

// H loader and the full-giant transport curtain.
for (let y = 13; y <= 17; y += 1) floorRow(y, 1, 9);
for (let y = 18; y <= 21; y += 1) floorRow(y, 4, 8);
floorColumn(1, 13, 23);

// T's one-cell-deep horizontal loader.  Before T moves, its own body seals the x7/x8 pocket:
// R occupies the pocket's north edge, x9 is wall, and x7/x8,y23 remain walls.
floorRow(22, 1, 8);
floorRow(23, 1, 6);

// H: the accepted compact seven-cell bracket, six cells left of its register axis.
for (let y = 13; y <= 17; y += 1) glyph(2, y, "M");
glyph(3, 13, "M");
glyph(3, 17, "M");

// R: a seven-cell J/block.  H first docks one column left of registration.  T then plugs the
// sealed lower pocket; the next right stroke moves the complete 19-cell giant onto the axis.
for (let y = 18; y <= 21; y += 1) glyph(7, y, "M");
for (let y = 18; y <= 20; y += 1) glyph(6, y, "M");

// T: a five-cell bar.  Two right pushes plug the sealed pocket and merge all 19 cells;
// only its exposed lower edge then supplies an upward force origin.
for (let x = 2; x <= 6; x += 1) glyph(x, 22, "M");

glyph(8, 3, "@");

const layout = rows.map((row) => row.join("")).join("\n");
const root = path.resolve(
  "prototypes/reality_anchor/reports/studio_giant_sticky_piston_order_20260715",
);
const candidatePath = path.join(
  root,
  "candidates/challenge/RA_FRESH_2026_07_15_OPEN_HRT_ASCENT_SYNC_v2.txt",
);
await mkdir(path.dirname(candidatePath), { recursive: true });
await writeFile(candidatePath, `${layout}\n`, "utf8");
process.stdout.write(`${layout}\n`);
