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
type CandlePalette = {
  outline: string;
  shadow: string;
  wax: string;
  light: string;
};

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
  "candle_terrain_floor.png": drawCandleFloor32,
  "candle_terrain_wall.png": drawCandleWall32,
  "candle_player_alive.png": drawCandlePlayerAlive32,
  "candle_player_dead.png": drawCandlePlayerDead32,
  "candle_brazier_unlit.png": drawBrazierUnlit32,
  "candle_brazier_lit.png": drawBrazierLit32,
  "candle_wick_left_unlit.png": (canvas) => drawWickProjection(canvas, "left", false),
  "candle_wick_right_unlit.png": (canvas) => drawWickProjection(canvas, "right", false),
  "candle_wick_up_unlit.png": (canvas) => drawWickProjection(canvas, "up", false),
  "candle_wick_down_unlit.png": (canvas) => drawWickProjection(canvas, "down", false),
  "candle_wick_left_lit.png": (canvas) => drawWickProjection(canvas, "left", true),
  "candle_wick_right_lit.png": (canvas) => drawWickProjection(canvas, "right", true),
  "candle_wick_up_lit.png": (canvas) => drawWickProjection(canvas, "up", true),
  "candle_wick_down_lit.png": (canvas) => drawWickProjection(canvas, "down", true),
};

const candlePalettes: Record<string, CandlePalette> = {
  "1": { outline: "#55351f", shadow: "#a95f34", wax: "#e8914d", light: "#ffd09a" },
  "2": { outline: "#4d3c18", shadow: "#aa8a35", wax: "#e3bd55", light: "#fff0a6" },
  "3": { outline: "#274a31", shadow: "#4e8b58", wax: "#78bd6d", light: "#c8ec9b" },
  "4": { outline: "#244650", shadow: "#3d8091", wax: "#65b4bf", light: "#bdebf0" },
  "5": { outline: "#293a62", shadow: "#52699f", wax: "#7892cf", light: "#c7d7ff" },
  "6": { outline: "#49305d", shadow: "#8052a0", wax: "#ad78c7", light: "#e6c6f4" },
  "7": { outline: "#5c2d43", shadow: "#a14c6a", wax: "#d87591", light: "#ffc0d0" },
  "8": { outline: "#4f372d", shadow: "#8c6857", wax: "#b99175", light: "#ead0ae" },
  "9": { outline: "#3e4148", shadow: "#707883", wax: "#a8b0b5", light: "#e7ebdf" },
  single: { outline: "#55451f", shadow: "#a9873e", wax: "#dec073", light: "#fff1b0" },
};

for (const [id, palette] of Object.entries(candlePalettes)) {
  if (id !== "single") {
    sprites[`candle_body_${id}_middle_horizontal.png`] = (canvas) =>
      drawCandleMiddle32(canvas, "horizontal", palette);
    sprites[`candle_body_${id}_middle_vertical.png`] = (canvas) =>
      drawCandleMiddle32(canvas, "vertical", palette);
    for (const direction of ["left", "right", "up", "down"] as const) {
      sprites[`candle_body_${id}_tail_${direction}.png`] = (canvas) =>
        drawCandleTail32(canvas, direction, palette);
    }
  }
  for (const direction of ["left", "right", "up", "down"] as const) {
    sprites[`candle_cap_${id}_${direction}_unlit.png`] = (canvas) =>
      drawCandleCap32(canvas, direction, palette, id === "single");
    sprites[`candle_cap_${id}_${direction}_lit.png`] = (canvas) =>
      drawCandleCap32(canvas, direction, palette, id === "single");
  }
}

for (const [file, draw] of Object.entries(sprites)) {
  const canvas = createCanvas(file.startsWith("candle_") ? 32 : 16);
  draw(canvas);
  await writeFile(path.join(outDir, file), encodePng(canvas));
}

console.log(`Wrote ${Object.keys(sprites).length} mixed 16x16/32x32 sprites to ${outDir}`);

function createCanvas(size = 16): Canvas {
  return { width: size, height: size, pixels: new Uint8Array(size * size * 4) };
}

function clear(canvas: Canvas, color: string): void {
  rect(canvas, 0, 0, canvas.width, canvas.height, color);
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

function drawCandleFloor32(canvas: Canvas): void {
  clear(canvas, "#242225");
  rect(canvas, 1, 1, 30, 30, "#302c2d");
  hline(canvas, 2, 2, 28, "#3e3734");
  vline(canvas, 2, 2, 28, "#393230");
  hline(canvas, 2, 29, 28, "#1c1b1e");
  vline(canvas, 29, 3, 27, "#211f21");
  points(canvas, "#4c423c", [[6, 7], [21, 5], [14, 17], [25, 23], [8, 26]]);
  points(canvas, "#17171a", [[5, 22], [18, 11], [27, 14], [12, 6], [22, 27]]);
  hline(canvas, 9, 12, 5, "#292527");
  hline(canvas, 19, 21, 4, "#403936");
}

function drawCandleWall32(canvas: Canvas): void {
  clear(canvas, "#17171a");
  rect(canvas, 1, 1, 30, 30, "#443c3a");
  for (const y of [1, 10, 20, 31]) {
    hline(canvas, 0, y, 32, "#201e21");
  }
  vline(canvas, 16, 2, 8, "#242124");
  vline(canvas, 8, 11, 9, "#242124");
  vline(canvas, 24, 11, 9, "#242124");
  vline(canvas, 16, 21, 10, "#242124");
  hline(canvas, 3, 3, 11, "#62554e");
  hline(canvas, 18, 12, 5, "#574a45");
  hline(canvas, 10, 22, 5, "#514641");
  points(canvas, "#302a2a", [[5, 8], [27, 6], [13, 17], [4, 27], [25, 28]]);
}

function drawCandlePlayerAlive32(canvas: Canvas): void {
  rect(canvas, 10, 3, 12, 3, "#17161a");
  rect(canvas, 8, 6, 16, 9, "#211b1c");
  rect(canvas, 10, 7, 12, 7, "#d0a174");
  rect(canvas, 11, 8, 10, 2, "#e9bd89");
  points(canvas, "#211b1c", [[13, 11], [19, 11]]);
  rect(canvas, 7, 15, 18, 12, "#294b4b");
  hline(canvas, 9, 16, 14, "#67917c");
  rect(canvas, 4, 16, 4, 10, "#c8956d");
  rect(canvas, 24, 16, 4, 10, "#c8956d");
  rect(canvas, 9, 27, 6, 5, "#18171b");
  rect(canvas, 18, 27, 6, 5, "#18171b");
  rect(canvas, 13, 18, 7, 3, "#426b62");
  setPixel(canvas, 20, 20, "#d5aa72");
}

function drawCandlePlayerDead32(canvas: Canvas): void {
  rect(canvas, 3, 19, 23, 9, "#294342");
  hline(canvas, 5, 19, 18, "#57786c");
  rect(canvas, 21, 12, 9, 9, "#211b1c");
  rect(canvas, 23, 14, 7, 6, "#bd8d6b");
  hline(canvas, 24, 14, 5, "#dfad7d");
  points(canvas, "#582d2c", [[24, 15], [28, 19], [28, 15], [24, 19]]);
  rect(canvas, 1, 25, 8, 5, "#18171b");
  rect(canvas, 9, 27, 8, 5, "#18171b");
  points(canvas, "#6c2924", [[27, 23], [29, 25], [25, 27]]);
}

function drawBrazierBase32(canvas: Canvas): void {
  rect(canvas, 6, 14, 20, 3, "#17171a");
  rect(canvas, 8, 17, 16, 8, "#5b4941");
  hline(canvas, 10, 18, 12, "#92715b");
  hline(canvas, 9, 24, 14, "#332a2a");
  rect(canvas, 12, 25, 8, 3, "#443632");
  hline(canvas, 8, 28, 16, "#17171a");
  points(canvas, "#a98665", [[7, 16], [24, 16]]);
}

function drawBrazierUnlit32(canvas: Canvas): void {
  drawBrazierBase32(canvas);
  rect(canvas, 10, 10, 12, 4, "#141418");
  hline(canvas, 12, 10, 8, "#6b4932");
  points(canvas, "#77614f", [[13, 9], [18, 8], [20, 10]]);
}

function drawBrazierLit32(canvas: Canvas): void {
  drawBrazierBase32(canvas);
  points(canvas, "#7f281d", [
    [10, 14], [11, 11], [12, 8], [14, 5], [16, 2], [18, 5], [21, 7],
    [22, 11], [21, 14], [19, 12], [13, 13],
  ]);
  rect(canvas, 12, 9, 10, 6, "#d64b24");
  rect(canvas, 14, 6, 6, 8, "#f4812c");
  rect(canvas, 15, 4, 4, 8, "#ffc04a");
  rect(canvas, 16, 7, 2, 6, "#fff1a0");
  points(canvas, "#ff6730", [[11, 12], [21, 10], [13, 7], [19, 5]]);
}

function drawCandleMiddle32(
  canvas: Canvas,
  axis: "horizontal" | "vertical",
  palette: CandlePalette,
): void {
  drawWaxBand32(canvas, axis, palette);
  if (axis === "horizontal") {
    points(canvas, palette.light, [[7, 12], [18, 11], [27, 13]]);
    points(canvas, palette.shadow, [[11, 21], [24, 20]]);
  } else {
    points(canvas, palette.light, [[12, 7], [11, 18], [13, 27]]);
    points(canvas, palette.shadow, [[21, 11], [20, 24]]);
  }
}

function drawWaxBand32(
  canvas: Canvas,
  axis: "horizontal" | "vertical",
  palette: CandlePalette,
): void {
  if (axis === "horizontal") {
    rect(canvas, 0, 8, 32, 16, palette.outline);
    rect(canvas, 0, 10, 32, 12, palette.wax);
    hline(canvas, 0, 10, 32, palette.light);
    hline(canvas, 0, 21, 32, palette.shadow);
    hline(canvas, 0, 23, 32, palette.outline);
  } else {
    rect(canvas, 8, 0, 16, 32, palette.outline);
    rect(canvas, 10, 0, 12, 32, palette.wax);
    vline(canvas, 10, 0, 32, palette.light);
    vline(canvas, 21, 0, 32, palette.shadow);
    vline(canvas, 23, 0, 32, palette.outline);
  }
}

function drawCandleTail32(
  canvas: Canvas,
  join: JoinDirection,
  palette: CandlePalette,
): void {
  const axis = join === "left" || join === "right" ? "horizontal" : "vertical";
  drawWaxBand32(canvas, axis, palette);
  if (join === "right") {
    rect(canvas, 0, 8, 7, 16, "transparent");
    rect(canvas, 5, 8, 4, 16, palette.outline);
    rect(canvas, 7, 10, 2, 12, palette.light);
  } else if (join === "left") {
    rect(canvas, 25, 8, 7, 16, "transparent");
    rect(canvas, 23, 8, 4, 16, palette.outline);
    rect(canvas, 23, 10, 2, 12, palette.shadow);
  } else if (join === "down") {
    rect(canvas, 8, 0, 16, 7, "transparent");
    rect(canvas, 8, 5, 16, 4, palette.outline);
    rect(canvas, 10, 7, 12, 2, palette.light);
  } else {
    rect(canvas, 8, 25, 16, 7, "transparent");
    rect(canvas, 8, 23, 16, 4, palette.outline);
    rect(canvas, 10, 23, 12, 2, palette.shadow);
  }
}

function drawCandleCap32(
  canvas: Canvas,
  wickDir: JoinDirection,
  palette: CandlePalette,
  singleton: boolean,
): void {
  const axis = wickDir === "left" || wickDir === "right" ? "horizontal" : "vertical";
  drawWaxBand32(canvas, axis, palette);
  if (singleton) {
    if (axis === "horizontal") {
      rect(canvas, 0, 8, 6, 16, "transparent");
      rect(canvas, 26, 8, 6, 16, "transparent");
      rect(canvas, 5, 8, 4, 16, palette.outline);
      rect(canvas, 23, 8, 4, 16, palette.outline);
    } else {
      rect(canvas, 8, 0, 16, 6, "transparent");
      rect(canvas, 8, 26, 16, 6, "transparent");
      rect(canvas, 8, 5, 16, 4, palette.outline);
      rect(canvas, 8, 23, 16, 4, palette.outline);
    }
  }
  drawCandleEndRim32(canvas, wickDir, palette);
}

function drawCandleEndRim32(
  canvas: Canvas,
  direction: JoinDirection,
  palette: CandlePalette,
): void {
  if (direction === "right") {
    rect(canvas, 25, 8, 4, 16, palette.outline);
    rect(canvas, 25, 10, 2, 12, palette.light);
    points(canvas, palette.shadow, [[27, 14], [28, 18]]);
  } else if (direction === "left") {
    rect(canvas, 3, 8, 4, 16, palette.outline);
    rect(canvas, 5, 10, 2, 12, palette.light);
    points(canvas, palette.shadow, [[3, 14], [4, 19]]);
  } else if (direction === "down") {
    rect(canvas, 8, 25, 16, 4, palette.outline);
    rect(canvas, 10, 25, 12, 2, palette.light);
    points(canvas, palette.shadow, [[14, 27], [19, 28]]);
  } else {
    rect(canvas, 8, 3, 16, 4, palette.outline);
    rect(canvas, 10, 5, 12, 2, palette.light);
    points(canvas, palette.shadow, [[14, 3], [19, 4]]);
  }
}

function drawWickProjection(
  canvas: Canvas,
  direction: JoinDirection,
  lit: boolean,
): void {
  const wick = "#211713";
  const wickMid = "#744728";
  const wickLight = "#c18a50";
  if (direction === "right") {
    rect(canvas, 0, 13, 17, 6, wick);
    rect(canvas, 0, 15, 15, 2, wickMid);
    hline(canvas, 1, 15, 12, wickLight);
  } else if (direction === "left") {
    rect(canvas, 15, 13, 17, 6, wick);
    rect(canvas, 17, 15, 15, 2, wickMid);
    hline(canvas, 19, 15, 12, wickLight);
  } else if (direction === "down") {
    rect(canvas, 13, 0, 6, 17, wick);
    rect(canvas, 15, 0, 2, 15, wickMid);
    vline(canvas, 15, 1, 12, wickLight);
  } else {
    rect(canvas, 13, 15, 6, 17, wick);
    rect(canvas, 15, 17, 2, 15, wickMid);
    vline(canvas, 15, 19, 12, wickLight);
  }

  if (!lit) {
    drawWickKnot32(canvas, direction);
    return;
  }

  const center = direction === "right"
    ? { x: 18, y: 16 }
    : direction === "left"
      ? { x: 13, y: 16 }
      : direction === "down"
        ? { x: 16, y: 18 }
        : { x: 16, y: 13 };
  diamond(canvas, center.x, center.y, 9, "#6f211b");
  diamond(canvas, center.x, center.y, 7, "#d94721");
  diamond(canvas, center.x, center.y, 5, "#f58b2c");
  diamond(canvas, center.x, center.y, 3, "#ffd34f");
  rect(canvas, center.x - 1, center.y - 2, 3, 5, "#fff4ad");
  setPixel(canvas, center.x, center.y, "#fffbd3");
  points(canvas, "#f7a338", [
    [center.x - 6, center.y - 5],
    [center.x + 5, center.y - 4],
    [center.x + 6, center.y + 4],
  ]);
}

function drawWickKnot32(canvas: Canvas, direction: JoinDirection): void {
  const x = direction === "right" ? 14 : direction === "left" ? 15 : 16;
  const y = direction === "down" ? 14 : direction === "up" ? 15 : 16;
  rect(canvas, x - 3, y - 3, 7, 7, "#1b1412");
  rect(canvas, x - 2, y - 2, 5, 5, "#744728");
  hline(canvas, x - 1, y - 2, 3, "#c18a50");
  points(canvas, "#e0aa67", [[x, y], [x + 1, y + 1]]);
}

function drawCandleFloor(canvas: Canvas): void {
  clear(canvas, "#302b2a");
  hline(canvas, 0, 0, 16, "#3d3633");
  vline(canvas, 0, 0, 16, "#3a3331");
  hline(canvas, 2, 14, 12, "#292525");
  points(canvas, "#4a403a", [[3, 4], [11, 3], [7, 10], [13, 12]]);
  points(canvas, "#211f20", [[4, 12], [9, 6], [14, 8]]);
}

function drawCandleWall(canvas: Canvas): void {
  clear(canvas, "#211e20");
  rect(canvas, 1, 1, 14, 14, "#49403d");
  for (const y of [1, 6, 11, 15]) {
    hline(canvas, 0, y, 16, "#272326");
  }
  vline(canvas, 8, 2, 4, "#2d2829");
  vline(canvas, 4, 7, 4, "#2d2829");
  vline(canvas, 12, 7, 4, "#2d2829");
  vline(canvas, 8, 12, 3, "#2d2829");
  hline(canvas, 2, 2, 5, "#62534a");
  hline(canvas, 9, 7, 3, "#5a4c45");
}

function drawCandlePlayerAlive(canvas: Canvas): void {
  rect(canvas, 5, 2, 6, 5, "#241d1b");
  rect(canvas, 6, 3, 4, 3, "#d2aa7f");
  points(canvas, "#241d1b", [[7, 4], [9, 4]]);
  rect(canvas, 4, 7, 8, 6, "#324d4c");
  hline(canvas, 5, 7, 6, "#6f9b83");
  rect(canvas, 3, 8, 2, 4, "#d2aa7f");
  rect(canvas, 11, 8, 2, 4, "#d2aa7f");
  rect(canvas, 5, 13, 3, 3, "#201c20");
  rect(canvas, 9, 13, 3, 3, "#201c20");
}

function drawCandlePlayerDead(canvas: Canvas): void {
  rect(canvas, 2, 9, 12, 5, "#293c3c");
  hline(canvas, 3, 9, 10, "#587568");
  rect(canvas, 10, 6, 5, 5, "#241d1b");
  rect(canvas, 11, 7, 3, 3, "#b98e6d");
  points(canvas, "#562d2d", [[11, 7], [13, 9]]);
  rect(canvas, 1, 12, 4, 3, "#201c20");
  rect(canvas, 5, 13, 4, 3, "#201c20");
}

function drawBrazierUnlit(canvas: Canvas): void {
  drawBrazierBase(canvas);
  rect(canvas, 5, 4, 6, 3, "#171719");
  hline(canvas, 6, 4, 4, "#654732");
}

function drawBrazierLit(canvas: Canvas): void {
  drawBrazierBase(canvas);
  points(canvas, "#8f2f20", [[5, 6], [10, 6], [6, 4], [9, 4], [7, 2], [8, 2]]);
  rect(canvas, 6, 5, 4, 3, "#dc5a28");
  rect(canvas, 7, 3, 2, 4, "#ff9e35");
  setPixel(canvas, 8, 3, "#fff09b");
}

function drawBrazierBase(canvas: Canvas): void {
  hline(canvas, 3, 7, 10, "#1b191c");
  rect(canvas, 4, 8, 8, 4, "#594943");
  hline(canvas, 5, 8, 6, "#8b6d58");
  rect(canvas, 6, 12, 4, 2, "#3a3030");
  hline(canvas, 4, 14, 8, "#1b191c");
}

function drawCandleMiddle(
  canvas: Canvas,
  axis: "horizontal" | "vertical",
  palette: CandlePalette,
): void {
  drawWaxBand(canvas, axis, palette);
  if (axis === "horizontal") {
    hline(canvas, 0, 5, 16, palette.light);
    hline(canvas, 0, 11, 16, palette.outline);
  } else {
    vline(canvas, 5, 0, 16, palette.light);
    vline(canvas, 11, 0, 16, palette.outline);
  }
}

function drawCandleTail(
  canvas: Canvas,
  join: JoinDirection,
  palette: CandlePalette,
): void {
  const axis = join === "left" || join === "right" ? "horizontal" : "vertical";
  drawWaxBand(canvas, axis, palette);
  switch (join) {
    case "right":
      rect(canvas, 0, 4, 5, 8, "transparent");
      rect(canvas, 3, 4, 3, 8, palette.outline);
      rect(canvas, 4, 5, 2, 6, palette.light);
      break;
    case "left":
      rect(canvas, 11, 4, 5, 8, "transparent");
      rect(canvas, 10, 4, 3, 8, palette.outline);
      rect(canvas, 10, 5, 2, 6, palette.wax);
      break;
    case "down":
      rect(canvas, 4, 0, 8, 5, "transparent");
      rect(canvas, 4, 3, 8, 3, palette.outline);
      rect(canvas, 5, 4, 6, 2, palette.light);
      break;
    case "up":
      rect(canvas, 4, 11, 8, 5, "transparent");
      rect(canvas, 4, 10, 8, 3, palette.outline);
      rect(canvas, 5, 10, 6, 2, palette.wax);
      break;
  }
}

function drawWaxBand(
  canvas: Canvas,
  axis: "horizontal" | "vertical",
  palette: CandlePalette,
): void {
  if (axis === "horizontal") {
    rect(canvas, 0, 4, 16, 8, palette.outline);
    rect(canvas, 0, 5, 16, 6, palette.wax);
    hline(canvas, 0, 10, 16, palette.shadow);
  } else {
    rect(canvas, 4, 0, 8, 16, palette.outline);
    rect(canvas, 5, 0, 6, 16, palette.wax);
    vline(canvas, 10, 0, 16, palette.shadow);
  }
}

function drawCandleCap(
  canvas: Canvas,
  wickDir: JoinDirection,
  lit: boolean,
  palette: CandlePalette,
  singleton: boolean,
): void {
  const axis = wickDir === "left" || wickDir === "right" ? "horizontal" : "vertical";
  if (!singleton) {
    drawWaxBand(canvas, axis, palette);
  }
  drawCandleEndMass(canvas, wickDir, palette, singleton);
  drawWickAndFlame(canvas, wickDir, lit);
}

function drawCandleEndMass(
  canvas: Canvas,
  wickDir: JoinDirection,
  palette: CandlePalette,
  singleton: boolean,
): void {
  const x = wickDir === "right" ? 5 : wickDir === "left" ? 3 : 4;
  const y = wickDir === "down" ? 5 : wickDir === "up" ? 3 : 4;
  const width = wickDir === "left" || wickDir === "right" ? 8 : 8;
  const height = wickDir === "up" || wickDir === "down" ? 8 : 8;
  rect(canvas, x, y, width, height, palette.outline);
  rect(canvas, x + 1, y + 1, width - 2, height - 2, palette.wax);
  hline(canvas, x + 1, y + 1, width - 2, palette.light);
  if (singleton) {
    hline(canvas, x + 2, y + height - 2, width - 4, palette.shadow);
  }
}

function drawWickAndFlame(canvas: Canvas, direction: JoinDirection, lit: boolean): void {
  const wick = "#241a17";
  const ember = "#9c3921";
  const flame = "#f4772a";
  const core = "#ffe27a";
  const unlitTip: Record<JoinDirection, Array<[number, number]>> = {
    left: [[4, 7], [3, 7], [2, 6]],
    right: [[11, 7], [12, 7], [13, 6]],
    up: [[7, 4], [7, 3], [6, 2]],
    down: [[7, 11], [7, 12], [6, 13]],
  };
  points(canvas, wick, unlitTip[direction]);
  if (!lit) {
    return;
  }
  const flames: Record<JoinDirection, { outer: Array<[number, number]>; inner: Array<[number, number]> }> = {
    left: { outer: [[0, 7], [1, 6], [1, 7], [1, 8], [2, 7]], inner: [[1, 7]] },
    right: { outer: [[15, 7], [14, 6], [14, 7], [14, 8], [13, 7]], inner: [[14, 7]] },
    up: { outer: [[7, 0], [6, 1], [7, 1], [8, 1], [7, 2]], inner: [[7, 1]] },
    down: { outer: [[7, 15], [6, 14], [7, 14], [8, 14], [7, 13]], inner: [[7, 14]] },
  };
  points(canvas, ember, flames[direction].outer);
  points(canvas, flame, flames[direction].outer.slice(1));
  points(canvas, core, flames[direction].inner);
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
