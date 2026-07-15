import assert from "node:assert/strict";
import { fileURLToPath } from "node:url";
import { before, test } from "node:test";
import { eventsMatchPattern } from "../../core/events.js";
import { loadPrototypePackage } from "../../core/io.js";
import type {
  Direction,
  InputId,
  LevelDoc,
  Point,
  PrototypePackage,
  SolverOptions,
} from "../../core/types.js";
import { pointKey, type RealityAnchorState } from "./mechanics.js";
import { realityAnchorAdapter } from "./runtime.js";

const prototypeRoot = fileURLToPath(
  new URL("../../../prototypes/reality_anchor/", import.meta.url),
);

const vectors: Record<Direction, Point> = {
  up: { x: 0, y: -1 },
  right: { x: 1, y: 0 },
  down: { x: 0, y: 1 },
  left: { x: -1, y: 0 },
};

const rotatedDirections: Direction[] = ["up", "right", "down", "left"];
const forceModes = ["push", "pull"] as const;

let pkg: PrototypePackage;

before(async () => {
  pkg = await loadPrototypePackage(prototypeRoot);
});

test("C 形黏块向上 push 时玩家与刚体原子平移", () => {
  const state = parseFixture(
    "C_PUSH_UP",
    [
      "#########",
      "#BS.....#",
      "#G......#",
      "#..MMM..#",
      "#..M@...#",
      "#..MMM..#",
      "#.......#",
      "#########",
    ],
  );

  const result = realityAnchorAdapter.step(pkg.mechanic, state, "up", {});

  assert.equal(result.legal, true);
  assert.deepEqual(result.events, ["push_object:sticky#1", "move_sticky_rigid"]);
  assert.equal(
    realityAnchorAdapter.renderState(result.state),
    [
      "#########",
      "#BS.....#",
      "#G.MMM..#",
      "#..M@...#",
      "#..MMM..#",
      "#.......#",
      "#.......#",
      "#########",
    ].join("\n"),
  );
  assertNoPlayerObjectOverlap(result.state);
});

test("C 形黏块向上 pull 时动作前的同刚体前格可以腾空", () => {
  const state = parseFixture(
    "C_PULL_UP",
    [
      "###########",
      "#BS.PL....#",
      "#G........#",
      "#...MMM...#",
      "#...M@....#",
      "#...MMM...#",
      "#.........#",
      "###########",
    ],
  );

  const result = realityAnchorAdapter.step(pkg.mechanic, state, "up", {});

  assert.equal(result.legal, true);
  assert.deepEqual(result.events, ["pull_object:sticky#1", "move_sticky_rigid"]);
  assert.equal(
    realityAnchorAdapter.renderState(result.state),
    [
      "###########",
      "#BS.PL....#",
      "#G..MMM...#",
      "#...M@....#",
      "#...MMM...#",
      "#.........#",
      "#.........#",
      "###########",
    ].join("\n"),
  );
  assertNoPlayerObjectOverlap(result.state);
});

for (const force of forceModes) {
  for (const [turns, direction] of rotatedDirections.entries()) {
    test(`C 形整体移动覆盖 ${force}/${direction}`, () => {
      const state = parseFixture(
        `C_${force.toUpperCase()}_${direction.toUpperCase()}`,
        buildRotatedCShapeLayout(force, turns),
      );
      const originalPlayer = { ...state.player };
      const originalSticky = stickyCellKeys(state);

      const result = realityAnchorAdapter.step(pkg.mechanic, state, direction, {});

      assert.equal(result.legal, true);
      assert.ok(eventsMatchPattern(result.events, `${force}_object`));
      assert.ok(result.events.includes("move_sticky_rigid"));
      assert.deepEqual(result.state.player, add(originalPlayer, direction));
      assert.deepEqual(
        stickyCellKeys(result.state),
        originalSticky.map((key) => pointKey(add(pointFromKey(key), direction))).sort(),
      );
      assertNoPlayerObjectOverlap(result.state);
    });
  }
}

for (const force of forceModes) {
  test(`C 形 ${force} 可以连续执行两次`, () => {
    let state = parseFixture(`C_${force.toUpperCase()}_TWICE`, buildRotatedCShapeLayout(force, 0));
    const originalPlayer = { ...state.player };
    const originalSticky = stickyCellKeys(state);

    for (let stepIndex = 0; stepIndex < 2; stepIndex += 1) {
      const result = realityAnchorAdapter.step(pkg.mechanic, state, "up", {});
      assert.equal(result.legal, true, `第 ${stepIndex + 1} 步应合法`);
      assert.ok(eventsMatchPattern(result.events, `${force}_object`));
      assert.ok(result.events.includes("move_sticky_rigid"));
      state = result.state;
    }

    assert.deepEqual(state.player, { x: originalPlayer.x, y: originalPlayer.y - 2 });
    assert.deepEqual(
      stickyCellKeys(state),
      originalSticky
        .map((key) => pointFromKey(key))
        .map((point) => ({ x: point.x, y: point.y - 2 }))
        .map(pointKey)
        .sort(),
    );
    assertNoPlayerObjectOverlap(state);
  });
}

for (const force of forceModes) {
  test(`C 形 ${force} 可推动两箱力链并在移动后执行 B/S 归一化`, () => {
    const state = parseFixture(
      `C_${force.toUpperCase()}_CRATE_CHAIN`,
      buildCrateChainLayout(force, false),
    );

    const result = realityAnchorAdapter.step(pkg.mechanic, state, "up", {});

    assert.equal(result.legal, true);
    assert.ok(eventsMatchPattern(result.events, `${force}_object`));
    assert.ok(result.events.includes("force_chain:n3"));
    assert.ok(result.events.includes("move_sticky_rigid"));
    assert.ok(result.events.includes("sticky_to_box:n3"));
    assert.equal(result.state.crates.length, 5);
    assert.equal(result.state.stickyGroups.flat().length, 4);
    assertNoPlayerObjectOverlap(result.state);
  });

  test(`C 形 ${force} 的箱链末端撞墙时整步原子失败`, () => {
    const state = parseFixture(
      `C_${force.toUpperCase()}_CRATE_CHAIN_BLOCKED`,
      buildCrateChainLayout(force, true),
    );
    const beforeKey = realityAnchorAdapter.createRuntime(pkg.mechanic).key(state);

    const result = realityAnchorAdapter.step(pkg.mechanic, state, "up", {});

    assert.equal(result.legal, false);
    assert.equal(result.reason, "force_blocked");
    assert.deepEqual(result.events, []);
    assert.strictEqual(result.state, state);
    assert.equal(realityAnchorAdapter.createRuntime(pkg.mechanic).key(result.state), beforeKey);
  });

  test(`C 形 ${force} 会收齐领先边两处独立箱子的分叉力链`, () => {
    const state = parseFixture(
      `C_${force.toUpperCase()}_BRANCHING_CHAIN`,
      buildBranchingCrateLayout(force, false),
    );

    const result = realityAnchorAdapter.step(pkg.mechanic, state, "up", {});

    assert.equal(result.legal, true);
    assert.ok(result.events.includes("force_chain:n3"));
    const crateKeys = result.state.crates.map(pointKey);
    assert.ok(crateKeys.includes("3,2"));
    assert.ok(crateKeys.includes("5,2"));
    assertNoPlayerObjectOverlap(result.state);
  });

  test(`C 形 ${force} 的分叉力链任一支路堵墙时全部不动`, () => {
    const state = parseFixture(
      `C_${force.toUpperCase()}_BRANCHING_CHAIN_BLOCKED`,
      buildBranchingCrateLayout(force, true),
    );

    const result = realityAnchorAdapter.step(pkg.mechanic, state, "up", {});

    assertAtomicFailure(result, state, "force_blocked");
  });

  test(`C 形 ${force} 的任一非接触臂撞墙时不能部分移动`, () => {
    const state = parseFixture(
      `C_${force.toUpperCase()}_PARTIAL_WALL`,
      buildRotatedCShapeLayout(force, 0, [{ x: 5, y: 4 }]),
    );

    const result = realityAnchorAdapter.step(pkg.mechanic, state, "up", {});

    assertAtomicFailure(result, state, "force_blocked");
  });

  test(`C 形 ${force} 的任一刚体格越界时不能部分移动`, () => {
    const state = parseFixture(
      `C_${force.toUpperCase()}_BOUNDARY`,
      buildBoundaryCShapeLayout(force),
    );

    const result = realityAnchorAdapter.step(pkg.mechanic, state, "up", {});

    assertAtomicFailure(result, state, "force_blocked");
  });

  test(`禁用 ${force}_force 时 C 形整体移动仍被规则开关拒绝`, () => {
    const state = parseFixture(
      `C_${force.toUpperCase()}_DISABLED`,
      buildRotatedCShapeLayout(force, 0),
    );
    const options: SolverOptions = { disabledRules: new Set([`${force}_force`]) };

    const result = realityAnchorAdapter.step(pkg.mechanic, state, "up", options);

    assertAtomicFailure(result, state, `${force}_force_disabled`);
  });
}

test("pull 时前方独立箱不会随身后箱一起移动", () => {
  const state = parseFixture(
    "PULL_UNRELATED_FRONT_CRATE",
    [
      "###########",
      "#...PL....#",
      "#G........#",
      "#....C....#",
      "#....@....#",
      "#....C....#",
      "#.........#",
      "###########",
    ],
  );

  const result = realityAnchorAdapter.step(pkg.mechanic, state, "up", {});

  assertAtomicFailure(result, state, "player_destination_occupied");
});

test("pull 时前格对象若由受力闭包的另一处接触带动并腾空则动作合法", () => {
  const state = parseFixture(
    "PULL_FRONT_ANCHOR_JOINS_FORCE_CHAIN",
    [
      "##########",
      "#BS......#",
      "#G.......#",
      "#...LP...#",
      "#...@M...#",
      "#...MM...#",
      "#........#",
      "##########",
    ],
  );

  const result = realityAnchorAdapter.step(pkg.mechanic, state, "up", {});

  assert.equal(result.legal, true);
  assert.deepEqual(result.events, [
    "pull_object:sticky#1",
    "force_chain:n2",
    "anchor_boundary_shift:push_pull",
    "move_sticky_rigid",
  ]);
  assertNoPlayerObjectOverlap(result.state);
});

test("pull 时身后无对象且前格有箱仍是普通目标格占用失败", () => {
  const state = parseFixture(
    "PULL_NO_TARGET_FRONT_CRATE",
    [
      "###########",
      "#...PL....#",
      "#G........#",
      "#....C....#",
      "#....@....#",
      "#.........#",
      "#.........#",
      "###########",
    ],
  );

  const result = realityAnchorAdapter.step(pkg.mechanic, state, "up", {});

  assertAtomicFailure(result, state, "destination_occupied");
});

test("现有 Reality Anchor smoke 行为保持成立", () => {
  const cases: Array<{
    levelId: string;
    input: InputId;
    legal: boolean;
    events?: string[];
    reason?: string;
  }> = [
    {
      levelId: "RA_SMOKE_01_PUSH_CHAIN",
      input: "right",
      legal: true,
      events: ["push_object", "force_chain"],
    },
    {
      levelId: "RA_SMOKE_02_PULL_BOX",
      input: "right",
      legal: true,
      events: ["pull_object"],
    },
    {
      levelId: "RA_SMOKE_03_PUSH_ANCHOR_BOUNDARY",
      input: "right",
      legal: true,
      events: ["push_object", "force_chain", "anchor_boundary_shift"],
    },
    {
      levelId: "RA_SMOKE_06_STICKY_BLOCKED",
      input: "right",
      legal: false,
      reason: "force_blocked",
    },
  ];

  for (const fixture of cases) {
    const level = pkg.levels.levels.find((candidate) => candidate.id === fixture.levelId);
    assert.ok(level, `缺少 ${fixture.levelId}`);
    const state = realityAnchorAdapter.parseLevel(level);
    const result = realityAnchorAdapter.step(pkg.mechanic, state, fixture.input, {});
    assert.equal(result.legal, fixture.legal, fixture.levelId);
    assert.equal(result.reason, fixture.reason, fixture.levelId);
    for (const event of fixture.events ?? []) {
      assert.ok(eventsMatchPattern(result.events, event), `${fixture.levelId} 缺少 ${event}`);
    }
    if (!fixture.legal) {
      assert.strictEqual(result.state, state, `${fixture.levelId} 非法动作必须保持原状态`);
      assert.deepEqual(result.events, [], `${fixture.levelId} 非法动作不得发出事件`);
    }
  }
});

function parseFixture(id: string, layout: string[] | string): RealityAnchorState {
  const level: LevelDoc = {
    id,
    title: id,
    layout: Array.isArray(layout) ? layout.join("\n") : layout,
  };
  return realityAnchorAdapter.parseLevel(level);
}

function buildRotatedCShapeLayout(
  force: "push" | "pull",
  turns: number,
  extraWalls: Point[] = [],
): string[] {
  const size = 13;
  const rows = Array.from({ length: size }, (_, y) =>
    Array.from({ length: size }, (_, x) =>
      x === 0 || y === 0 || x === size - 1 || y === size - 1 ? "#" : ".",
    ),
  );
  const player = { x: 6, y: 6 };
  const canonicalOffsets: Point[] = [
    { x: -1, y: -1 },
    { x: 0, y: -1 },
    { x: 1, y: -1 },
    { x: -1, y: 0 },
    { x: -1, y: 1 },
    { x: 0, y: 1 },
    { x: 1, y: 1 },
  ];

  setGlyph(rows, { x: 1, y: 1 }, "B");
  setGlyph(rows, { x: 2, y: 1 }, "S");
  if (force === "pull") {
    setGlyph(rows, { x: 1, y: 2 }, "P");
    setGlyph(rows, { x: 2, y: 2 }, "L");
  }
  setGlyph(rows, { x: 11, y: 11 }, "G");
  for (const offset of canonicalOffsets.map((point) => rotate(point, turns))) {
    setGlyph(rows, { x: player.x + offset.x, y: player.y + offset.y }, "M");
  }
  setGlyph(rows, player, "@");
  for (const wall of extraWalls) {
    setGlyph(rows, wall, "#");
  }

  return rows.map((row) => row.join(""));
}

function buildCrateChainLayout(force: "push" | "pull", blocked: boolean): string[] {
  const controlRow = force === "pull"
    ? blocked ? "#PL#....#" : "#PL.....#"
    : blocked ? "#..#....#" : "#.......#";
  return [
    "#########",
    controlRow,
    "#..C....#",
    "#B.C....#",
    "#S.MMM..#",
    "#..M@...#",
    "#..MMM.G#",
    "#.......#",
    "#########",
  ];
}

function buildBoundaryCShapeLayout(force: "push" | "pull"): string[] {
  return [
    "...MMM...",
    "...M@....",
    "...MMM...",
    ".........",
    ".BS......",
    force === "pull" ? ".PL......" : ".........",
    ".......G.",
    ".........",
  ];
}

function buildBranchingCrateLayout(force: "push" | "pull", blocked: boolean): string[] {
  return [
    "#########",
    force === "pull" ? "#PL.....#" : "#.......#",
    blocked ? "#....#..#" : "#.......#",
    "#B.C.C..#",
    "#S.MMM..#",
    "#..M@...#",
    "#..MMM.G#",
    "#.......#",
    "#########",
  ];
}

function rotate(point: Point, turns: number): Point {
  let rotated = { ...point };
  for (let index = 0; index < turns; index += 1) {
    rotated = { x: -rotated.y, y: rotated.x };
  }
  return rotated;
}

function add(point: Point, direction: Direction): Point {
  const vector = vectors[direction];
  return { x: point.x + vector.x, y: point.y + vector.y };
}

function setGlyph(rows: string[][], point: Point, glyph: string): void {
  rows[point.y]![point.x] = glyph;
}

function stickyCellKeys(state: RealityAnchorState): string[] {
  return state.stickyGroups.flat().map(pointKey).sort();
}

function pointFromKey(key: string): Point {
  const [xRaw, yRaw] = key.split(",");
  return { x: Number(xRaw), y: Number(yRaw) };
}

function assertNoPlayerObjectOverlap(state: RealityAnchorState): void {
  const playerKey = pointKey(state.player);
  const occupied = new Set([
    ...state.crates.map(pointKey),
    ...state.stickyGroups.flat().map(pointKey),
    ...(state.pushPullAnchor
      ? [pointKey(state.pushPullAnchor.push), pointKey(state.pushPullAnchor.pull)]
      : []),
    ...(state.boxStickyAnchor
      ? [pointKey(state.boxStickyAnchor.box), pointKey(state.boxStickyAnchor.sticky)]
      : []),
  ]);
  assert.equal(occupied.has(playerKey), false, `玩家与对象重叠于 ${playerKey}`);
}

function assertAtomicFailure(
  result: ReturnType<typeof realityAnchorAdapter.step>,
  originalState: RealityAnchorState,
  reason: string,
): void {
  assert.equal(result.legal, false);
  assert.equal(result.reason, reason);
  assert.deepEqual(result.events, []);
  assert.strictEqual(result.state, originalState);
}
