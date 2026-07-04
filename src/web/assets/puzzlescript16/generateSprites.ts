import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { deflateSync } from "node:zlib";

type Rgba = [number, number, number, number];

type Canvas = {
  width: number;
  height: number;
  pixels: Uint8Array;
};

type JoinDirection = "left" | "right" | "up" | "down";

const here = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(here, "png");
const crcTable = Array.from({ length: 256 }, (_, index) => {
  let value = index;
  for (let bit = 0; bit < 8; bit += 1) {
    value = value & 1 ? 0xedb88320 ^ (value >>> 1) : value >>> 1;
  }
  return value >>> 0;
});

await mkdir(outDir, { recursive: true });

const sprites: Record<string, (canvas: Canvas) => void> = {
  "terrain_floor_box_side.png": drawFloorBox,
  "terrain_floor_sticky_side.png": drawFloorSticky,
  "terrain_wall_box_side.png": drawWallBox,
  "terrain_wall_sticky_side.png": drawWallSticky,
  "target_goal.png": drawGoal,
  "ra_player_push_side.png": drawPlayerPush,
  "ra_player_pull_side.png": drawPlayerPull,
  "ra_crate_box_side.png": drawCrateBox,
  "ra_crate_sticky_side.png": drawCrateSticky,
  "ra_sticky_box_side.png": drawStickyBox,
  "ra_sticky_sticky_side.png": drawStickySticky,
  "ra_anchor_push_end.png": drawAnchorPush,
  "ra_anchor_pull_end.png": drawAnchorPull,
  "ra_anchor_push_end_join_left.png": (canvas) => drawAnchorPush(canvas, "left"),
  "ra_anchor_push_end_join_right.png": (canvas) => drawAnchorPush(canvas, "right"),
  "ra_anchor_push_end_join_up.png": (canvas) => drawAnchorPush(canvas, "up"),
  "ra_anchor_push_end_join_down.png": (canvas) => drawAnchorPush(canvas, "down"),
  "ra_anchor_pull_end_join_left.png": (canvas) => drawAnchorPull(canvas, "left"),
  "ra_anchor_pull_end_join_right.png": (canvas) => drawAnchorPull(canvas, "right"),
  "ra_anchor_pull_end_join_up.png": (canvas) => drawAnchorPull(canvas, "up"),
  "ra_anchor_pull_end_join_down.png": (canvas) => drawAnchorPull(canvas, "down"),
  "ra_anchor_box_end.png": drawAnchorBox,
  "ra_anchor_sticky_end.png": drawAnchorSticky,
  "ra_anchor_box_end_join_left.png": (canvas) => drawAnchorBox(canvas, "left"),
  "ra_anchor_box_end_join_right.png": (canvas) => drawAnchorBox(canvas, "right"),
  "ra_anchor_box_end_join_up.png": (canvas) => drawAnchorBox(canvas, "up"),
  "ra_anchor_box_end_join_down.png": (canvas) => drawAnchorBox(canvas, "down"),
  "ra_anchor_sticky_end_join_left.png": (canvas) => drawAnchorSticky(canvas, "left"),
  "ra_anchor_sticky_end_join_right.png": (canvas) => drawAnchorSticky(canvas, "right"),
  "ra_anchor_sticky_end_join_up.png": (canvas) => drawAnchorSticky(canvas, "up"),
  "ra_anchor_sticky_end_join_down.png": (canvas) => drawAnchorSticky(canvas, "down"),
};

for (const [file, draw] of Object.entries(sprites)) {
  const canvas = createCanvas();
  draw(canvas);
  await writeFile(path.join(outDir, file), encodePng(canvas));
}

console.log(`Wrote ${Object.keys(sprites).length} 16x16 sprites to ${outDir}`);

function createCanvas(): Canvas {
  return { width: 16, height: 16, pixels: new Uint8Array(16 * 16 * 4) };
}

function clear(canvas: Canvas, color: string): void {
  rect(canvas, 0, 0, 16, 16, color);
}

function setPixel(canvas: Canvas, x: number, y: number, color: string): void {
  if (x < 0 || y < 0 || x >= canvas.width || y >= canvas.height) {
    return;
  }
  const [red, green, blue, alpha] = rgba(color);
  const index = (y * canvas.width + x) * 4;
  canvas.pixels[index] = red;
  canvas.pixels[index + 1] = green;
  canvas.pixels[index + 2] = blue;
  canvas.pixels[index + 3] = alpha;
}

function rect(
  canvas: Canvas,
  x: number,
  y: number,
  width: number,
  height: number,
  color: string,
): void {
  for (let yy = y; yy < y + height; yy += 1) {
    for (let xx = x; xx < x + width; xx += 1) {
      setPixel(canvas, xx, yy, color);
    }
  }
}

function hline(canvas: Canvas, x: number, y: number, width: number, color: string): void {
  rect(canvas, x, y, width, 1, color);
}

function vline(canvas: Canvas, x: number, y: number, height: number, color: string): void {
  rect(canvas, x, y, 1, height, color);
}

function points(canvas: Canvas, color: string, coords: Array<[number, number]>): void {
  for (const [x, y] of coords) {
    setPixel(canvas, x, y, color);
  }
}

function drawFloorBox(canvas: Canvas): void {
  clear(canvas, "#c9a56f");
}

function drawFloorSticky(canvas: Canvas): void {
  clear(canvas, "#7ca77b");
}

function drawWallBox(canvas: Canvas): void {
  drawCleanBrickWall(canvas, "#7b513b", "#493228");
}

function drawWallSticky(canvas: Canvas): void {
  drawCleanBrickWall(canvas, "#4d765f", "#2d4b42");
}

function drawCleanBrickWall(canvas: Canvas, brick: string, mortar: string): void {
  clear(canvas, brick);
  for (const y of [0, 4, 8, 12]) {
    hline(canvas, 0, y, 16, mortar);
  }
  for (const [row, offsets] of [
    [0, [0, 8]],
    [4, [4, 12]],
    [8, [0, 8]],
    [12, [4, 12]],
  ] as const) {
    for (const x of offsets) {
      vline(canvas, x, row + 1, 3, mortar);
    }
  }
}

function drawGoal(canvas: Canvas): void {
  diamond(canvas, 8, 8, 6, "#e1a42f");
  diamond(canvas, 8, 8, 3, "#ffe47c");
  setPixel(canvas, 8, 8, "#fff6b8");
}

function drawPlayerPush(canvas: Canvas): void {
  drawPlayerBase(canvas, "#164854", "#2f7f95", "#164854", "#d8fbff");
  rect(canvas, 4, 7, 8, 5, "#164854");
  rect(canvas, 5, 8, 6, 3, "#82d8e5");
  hline(canvas, 5, 8, 6, "#d8fbff");
  rect(canvas, 3, 8, 2, 3, "#d8fbff");
  rect(canvas, 11, 8, 2, 3, "#d8fbff");
}

function drawPlayerPull(canvas: Canvas): void {
  drawPlayerBase(canvas, "#3e2a5d", "#7b5aa6", "#3e2a5d", "#f2eaff");
  rect(canvas, 4, 8, 8, 2, "#f2eaff");
  rect(canvas, 5, 7, 6, 5, "#3e2a5d");
  rect(canvas, 6, 8, 4, 3, "#d4c0ff");
  rect(canvas, 7, 8, 2, 1, "#3e2a5d");
  rect(canvas, 3, 8, 2, 2, "#f2eaff");
  rect(canvas, 11, 8, 2, 2, "#f2eaff");
}

function drawPlayerBase(
  canvas: Canvas,
  head: string,
  body: string,
  dark: string,
  light: string,
): void {
  rect(canvas, 5, 2, 6, 3, head);
  rect(canvas, 4, 5, 8, 7, body);
  rect(canvas, 6, 6, 4, 1, light);
  rect(canvas, 5, 12, 3, 3, dark);
  rect(canvas, 9, 12, 3, 3, dark);
  points(canvas, dark, [[6, 4], [10, 4]]);
}

function drawCrateBox(canvas: Canvas): void {
  drawSolidBlock(canvas, "#5b2d20", "#b96a3f", "#d8954f", "#7a3d28", "#f0b36d");
}

function drawCrateSticky(canvas: Canvas): void {
  drawSolidBlock(canvas, "#3f5a3a", "#7f9c59", "#a8bc72", "#587143", "#d6dda0");
}

function drawStickyBox(canvas: Canvas): void {
  drawStickyBlock(canvas, "#4d5430", "#8f955f", "#b9bd76", "#d9d99a", "#f2edb1");
}

function drawStickySticky(canvas: Canvas): void {
  drawStickyBlock(canvas, "#315a38", "#5f9355", "#79ad68", "#9fd180", "#d4ed9a");
}

function drawSolidBlock(
  canvas: Canvas,
  outline: string,
  fill: string,
  light: string,
  dark: string,
  highlight: string,
): void {
  rect(canvas, 1, 1, 14, 14, outline);
  rect(canvas, 2, 2, 12, 12, fill);
  rect(canvas, 3, 3, 10, 3, light);
  rect(canvas, 3, 6, 10, 6, fill);
  hline(canvas, 2, 2, 12, highlight);
  vline(canvas, 2, 2, 12, highlight);
  hline(canvas, 2, 13, 12, dark);
  vline(canvas, 13, 2, 12, dark);
}

function drawStickyBlock(
  canvas: Canvas,
  outline: string,
  shadow: string,
  mid: string,
  light: string,
  highlight: string,
): void {
  rect(canvas, 1, 1, 14, 14, outline);
  setPixel(canvas, 1, 1, "transparent");
  setPixel(canvas, 14, 1, "transparent");
  setPixel(canvas, 1, 14, "transparent");
  setPixel(canvas, 14, 14, "transparent");

  rect(canvas, 2, 2, 12, 4, light);
  rect(canvas, 2, 6, 12, 5, mid);
  rect(canvas, 2, 11, 12, 3, shadow);
  hline(canvas, 3, 3, 10, highlight);
  hline(canvas, 2, 13, 12, outline);
  vline(canvas, 13, 3, 10, outline);
}

function drawAnchorPush(canvas: Canvas, join?: JoinDirection): void {
  drawAnchorCap(canvas, join, "#164854", "#2f7f95", "#82d8e5", "#d8fbff");
  rect(canvas, 5, 5, 6, 6, "#164854");
  rect(canvas, 6, 6, 4, 4, "#d8fbff");
}

function drawAnchorPull(canvas: Canvas, join?: JoinDirection): void {
  drawAnchorCap(canvas, join, "#3e2a5d", "#7b5aa6", "#d4c0ff", "#f2eaff");
  rect(canvas, 5, 5, 6, 6, "#3e2a5d");
  rect(canvas, 6, 6, 4, 4, "#d4c0ff");
  rect(canvas, 7, 7, 2, 2, "#3e2a5d");
}

function drawAnchorBox(canvas: Canvas, join?: JoinDirection): void {
  drawAnchorCap(canvas, join, "#5b2d20", "#8f4f35", "#e0a076", "#f0c09a");
  rect(canvas, 5, 5, 6, 6, "#5b2d20");
  rect(canvas, 6, 6, 4, 4, "#e0a076");
}

function drawAnchorSticky(canvas: Canvas, join?: JoinDirection): void {
  drawAnchorCap(canvas, join, "#315a38", "#5f9355", "#8fc777", "#d4ed9a");
  rect(canvas, 5, 4, 6, 8, "#79ad68");
  hline(canvas, 5, 4, 6, "#d4ed9a");
}

function diamond(canvas: Canvas, cx: number, cy: number, radius: number, color: string): void {
  for (let y = -radius; y <= radius; y += 1) {
    const width = radius - Math.abs(y);
    hline(canvas, cx - width, cy + y, width * 2 + 1, color);
  }
}

function drawAnchorCap(
  canvas: Canvas,
  join: JoinDirection | undefined,
  outline: string,
  fill: string,
  inner: string,
  highlight: string,
): void {
  if (join) {
    drawJoinBand(canvas, join, outline);
  }
  rect(canvas, 1, 1, 14, 14, outline);
  rect(canvas, 2, 2, 12, 12, fill);
  rect(canvas, 4, 4, 8, 8, inner);
  hline(canvas, 2, 2, 12, highlight);
  hline(canvas, 2, 13, 12, outline);
}

function drawJoinBand(canvas: Canvas, join: JoinDirection, outline: string): void {
  switch (join) {
    case "left":
      rect(canvas, 0, 5, 8, 6, outline);
      break;
    case "right":
      rect(canvas, 8, 5, 8, 6, outline);
      break;
    case "up":
      rect(canvas, 5, 0, 6, 8, outline);
      break;
    case "down":
      rect(canvas, 5, 8, 6, 8, outline);
      break;
  }
}

function rgba(color: string): Rgba {
  if (color === "transparent") {
    return [0, 0, 0, 0];
  }
  const normalized = color.startsWith("#") ? color.slice(1) : color;
  if (normalized.length !== 6) {
    throw new Error(`Expected #rrggbb color, got ${color}`);
  }
  return [
    Number.parseInt(normalized.slice(0, 2), 16),
    Number.parseInt(normalized.slice(2, 4), 16),
    Number.parseInt(normalized.slice(4, 6), 16),
    255,
  ];
}

function encodePng(canvas: Canvas): Buffer {
  const scanlineLength = canvas.width * 4 + 1;
  const raw = Buffer.alloc(scanlineLength * canvas.height);
  for (let y = 0; y < canvas.height; y += 1) {
    raw[y * scanlineLength] = 0;
    const sourceStart = y * canvas.width * 4;
    Buffer.from(canvas.pixels.buffer, sourceStart, canvas.width * 4).copy(
      raw,
      y * scanlineLength + 1,
    );
  }

  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk("IHDR", ihdr(canvas.width, canvas.height)),
    chunk("IDAT", deflateSync(raw)),
    chunk("IEND", Buffer.alloc(0)),
  ]);
}

function ihdr(width: number, height: number): Buffer {
  const data = Buffer.alloc(13);
  data.writeUInt32BE(width, 0);
  data.writeUInt32BE(height, 4);
  data[8] = 8;
  data[9] = 6;
  data[10] = 0;
  data[11] = 0;
  data[12] = 0;
  return data;
}

function chunk(type: string, data: Buffer): Buffer {
  const typeBuffer = Buffer.from(type, "ascii");
  const length = Buffer.alloc(4);
  length.writeUInt32BE(data.length, 0);
  const checksum = Buffer.alloc(4);
  checksum.writeUInt32BE(crc32(Buffer.concat([typeBuffer, data])), 0);
  return Buffer.concat([length, typeBuffer, data, checksum]);
}

function crc32(data: Buffer): number {
  let value = 0xffffffff;
  for (const byte of data) {
    value = crcTable[(value ^ byte) & 0xff]! ^ (value >>> 8);
  }
  return (value ^ 0xffffffff) >>> 0;
}
