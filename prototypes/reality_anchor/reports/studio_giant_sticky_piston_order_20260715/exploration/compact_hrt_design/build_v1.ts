import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const width = 22;
const height = 20;
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

// Isolated fixed P/L and B/S anchors. The active boundary is x=16|17.
glyph(16, 1, "P");
glyph(17, 1, "L");
glyph(16, 2, "S");
glyph(17, 2, "B");

// Opening route: the player first travels through both ordinary-C piston bays.
floorColumn(16, 3, 13);
floorColumn(20, 3, 18);
floorRow(3, 16, 20);
floorRow(7, 16, 20);
floorRow(11, 16, 20);
floorRow(13, 10, 20);
floorRow(14, 10, 20);

// Compact registered shaft. x=14 remains the rear wall-shadow for H and R.
floorColumn(15, 5, 17);
floorColumn(16, 4, 18);
for (const y of [5, 9]) {
  glyph(17, y, "C");
  glyph(18, y, "G");
}

// Assembly bay and return loop.
floorRow(15, 1, 16);
floorRow(16, 1, 16);
floorRow(17, 1, 16);
floorRow(18, 1, 20);
floorColumn(1, 15, 18);
floorColumn(2, 15, 18);

// T is a seven-cell U-shaped rail piece. It starts left and can only dock rightward.
for (let x = 4; x <= 8; x += 1) glyph(x, 16, "M");
glyph(4, 17, "M");
glyph(8, 17, "M");

// Compact H: five-cell spine plus two teeth, initially three rows below registration.
for (let y = 8; y <= 12; y += 1) glyph(15, y, "M");
glyph(16, 8, "M");
glyph(16, 12, "M");

// R: three-cell relay plus a right lift-foot. It must move up twice before T can dock.
for (let y = 15; y <= 17; y += 1) glyph(15, y, "M");
glyph(16, 17, "M");

// The player starts above the piston route, before seeing the assembly bay.
glyph(16, 3, "@");

const layout = rows.map((row) => row.join("")).join("\n");
const root = path.resolve(
  "prototypes/reality_anchor/reports/studio_giant_sticky_piston_order_20260715",
);
const candidatePath = path.join(
  root,
  "candidates/challenge/RA_FRESH_2026_07_15_COMPACT_HRT_ASCENT_v1.txt",
);
await mkdir(path.dirname(candidatePath), { recursive: true });
await writeFile(candidatePath, `${layout}\n`, "utf8");
process.stdout.write(`${layout}\n`);
