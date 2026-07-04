import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { loadPrototypePackage } from "../../../src/core/io.js";
import { solveWithRuntime } from "../../../src/core/solver.js";
import { getRuntimeAdapter } from "../../../src/prototypes/runtimeAdapter.js";
import { compareIceSlideStarts } from "../../../src/prototypes/ice_slide_escape/tools/startComparison.js";
import type { LevelDoc, WinCondition } from "../../../src/core/types.js";

type Point = [number, number];

type CandidateHit = {
  id: string;
  seed: number;
  iteration: number;
  width: number;
  height: number;
  layout: string;
  interfaces: { A: Point; B: Point; C: Point; D: Point };
  iceCount: number;
  targetCount: number;
  base: {
    cost: number;
    inputs: string[];
    events: string[];
    exploredStates: number;
    reachableStatus?: string;
    reachableStates?: number;
    forbiddenReachableHits?: string[];
    machineGate?: string;
  };
  meta: {
    cost: number;
    inputs: string[];
    events: string[];
    exploredStates: number;
    machineGate?: string;
  };
  notes: string[];
};

type Rng = () => number;

const root = process.cwd();
const reportsDir = path.join(root, "prototypes", "ice_slide_escape", "reports");
const seed = Number(process.argv.find((arg) => arg.startsWith("--seed="))?.split("=")[1] ?? 53001);
const iterations = Number(process.argv.find((arg) => arg.startsWith("--iterations="))?.split("=")[1] ?? 2500);
const maxHits = Number(process.argv.find((arg) => arg.startsWith("--max-hits="))?.split("=")[1] ?? 12);

const forbiddenBaseLate = ["ice_pass_through_d5", "slide_restart_after_group", "ice_destroy_group_d6_plus"];

function makeRng(initialSeed: number): Rng {
  let state = initialSeed >>> 0;
  return () => {
    state = (1664525 * state + 1013904223) >>> 0;
    return state / 0x100000000;
  };
}

function pick<T>(rng: Rng, items: T[]): T {
  return items[Math.floor(rng() * items.length)]!;
}

function key([x, y]: Point): string {
  return `${x},${y}`;
}

function parseKey(raw: string): Point {
  const [x, y] = raw.split(",").map(Number);
  return [x!, y!];
}

function eventHas(events: string[], pattern: string): boolean {
  return events.some((event) => event === pattern || event.startsWith(`${pattern}:`));
}

function countPushes(events: string[]): number {
  return events.filter((event) => event === "push_ice").length;
}

function buildLevel(id: string, layout: string, start: Point, goal: Point): LevelDoc {
  const win: WinCondition = {
    type: "ice_slide_escape_explicit_goal",
    player_start: start,
    player_goal: goal,
  };
  return {
    id,
    title: id,
    role: "challenge",
    status: "candidate",
    targets: [],
    known_before: [],
    target_learning: [],
    support_level: "none",
    expected_solver_evidence: ["solvable"],
    expected_llm_player_evidence: [],
    layout,
    win,
  };
}

function allCells(width: number, height: number): Point[] {
  const cells: Point[] = [];
  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      cells.push([x, y]);
    }
  }
  return cells;
}

function neighbors([x, y]: Point): Point[] {
  return [
    [x + 1, y],
    [x - 1, y],
    [x, y + 1],
    [x, y - 1],
  ];
}

function inBounds([x, y]: Point, width: number, height: number): boolean {
  return x >= 0 && y >= 0 && x < width && y < height;
}

function initialPathExists(layout: string, start: Point, goal: Point): boolean {
  const rows = layout.split("\n");
  const height = rows.length;
  const width = rows[0]!.length;
  const blocked = new Set<string>();
  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const glyph = rows[y]![x]!;
      if (glyph === "#" || glyph === "I" || glyph === "*") {
        blocked.add(`${x},${y}`);
      }
    }
  }
  const queue: Point[] = [start];
  const seen = new Set<string>([key(start)]);
  for (let i = 0; i < queue.length; i += 1) {
    const current = queue[i]!;
    if (key(current) === key(goal)) {
      return true;
    }
    for (const next of neighbors(current)) {
      if (!inBounds(next, width, height) || seen.has(key(next)) || blocked.has(key(next))) {
        continue;
      }
      seen.add(key(next));
      queue.push(next);
    }
  }
  return false;
}

function enumerateEdgeFloors(layout: string): Point[] {
  const rows = layout.split("\n");
  const height = rows.length;
  const width = rows[0]!.length;
  const points: Point[] = [];
  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const edge = x === 0 || y === 0 || x === width - 1 || y === height - 1;
      const glyph = rows[y]![x]!;
      if (edge && glyph !== "#" && glyph !== "I" && glyph !== "*") {
        points.push([x, y]);
      }
    }
  }
  return points;
}

function countGlyph(layout: string, glyph: string): number {
  return [...layout].filter((ch) => ch === glyph).length;
}

function generateLayout(rng: Rng, iteration: number): { layout: string; interfaces: { A: Point; B: Point; C: Point; D: Point } } {
  const width = pick(rng, [11, 12, 13, 14]);
  const height = pick(rng, [8, 9, 10]);
  const A: Point = [0, Math.floor(height / 2)];
  const B: Point = [Math.floor(width / 2) - 1, height - 1];
  const C: Point = [width - 1, Math.max(2, Math.floor(height / 2) - 1)];
  const D: Point = [Math.floor(width / 2) + 2, 0];
  const interfaceKeys = new Set([key(A), key(B), key(C), key(D)]);

  const rows = Array.from({ length: height }, () => Array.from({ length: width }, () => "."));
  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const edge = x === 0 || y === 0 || x === width - 1 || y === height - 1;
      if (edge && !interfaceKeys.has(`${x},${y}`)) {
        rows[y]![x] = "#";
      }
    }
  }

  const wallDensity = 0.18 + rng() * 0.12;
  for (const [x, y] of allCells(width, height)) {
    if (x === 0 || y === 0 || x === width - 1 || y === height - 1) {
      continue;
    }
    if (interfaceKeys.has(`${x},${y}`)) {
      continue;
    }
    const centralBias = x >= 3 && x <= width - 4 && y >= 2 && y <= height - 3 ? 0.08 : 0;
    if (rng() < wallDensity - centralBias) {
      rows[y]![x] = "#";
    }
  }

  // 保留一条中核候选带，并用随机错位墙切成短段，避免完全开阔地图。
  const midY = Math.floor(height / 2);
  for (let x = 2; x < width - 2; x += 1) {
    if (rng() < 0.72) rows[midY]![x] = ".";
  }
  for (let y = 2; y < height - 2; y += 1) {
    const x = Math.floor(width / 2) + (rng() < 0.5 ? -1 : 1);
    if (rng() < 0.55) rows[y]![x] = ".";
  }

  rows[A[1]]![A[0]] = ".";
  rows[B[1]]![B[0]] = ".";
  rows[C[1]]![C[0]] = ".";
  rows[D[1]]![D[0]] = ".";

  // 额外开放少量边缘候选口，后续再挑 A/B/C/D。这样避免固定接口把好结构错过。
  const edgeCandidates = allCells(width, height).filter(([x, y]) => {
    if (interfaceKeys.has(`${x},${y}`)) return false;
    if (!(x === 0 || y === 0 || x === width - 1 || y === height - 1)) return false;
    if ((x === 0 || x === width - 1) && (y <= 1 || y >= height - 2)) return false;
    if ((y === 0 || y === height - 1) && (x <= 1 || x >= width - 2)) return false;
    return true;
  });
  const extraOpenings = pick(rng, [0, 1, 1, 2]);
  for (let i = 0; i < extraOpenings; i += 1) {
    const [x, y] = pick(rng, edgeCandidates);
    rows[y]![x] = ".";
  }

  const floorCells = allCells(width, height).filter(([x, y]) => {
    if (interfaceKeys.has(`${x},${y}`)) return false;
    if (rows[y]![x] !== ".") return false;
    return x >= 2 && x <= width - 3 && y >= 1 && y <= height - 2;
  });

  const centralFloors = floorCells.filter(([x, y]) => x >= 3 && x <= width - 4 && y >= 2 && y <= height - 3);
  const targetCount = pick(rng, [2, 2, 3, 3, 4]);
  const targetKeys = new Set<string>();
  for (let i = 0; i < targetCount && centralFloors.length > 0; i += 1) {
    const point = pick(rng, centralFloors);
    targetKeys.add(key(point));
  }

  // 至少一个目标落在 A/B 与 C/D 之间的中行附近，提高封路概率。
  const chokeCandidates = centralFloors.filter(([x, y]) => Math.abs(y - midY) <= 1 && x >= 3 && x <= width - 4);
  if (chokeCandidates.length > 0) {
    targetKeys.add(key(pick(rng, chokeCandidates)));
  }

  for (const raw of targetKeys) {
    const [x, y] = parseKey(raw);
    rows[y]![x] = "*";
  }

  const extraIceCount = pick(rng, [0, 1, 1, 2]);
  const extraFloors = floorCells.filter((point) => !targetKeys.has(key(point)));
  const extraIce = new Set<string>();
  for (let i = 0; i < extraIceCount && extraFloors.length > 0; i += 1) {
    const point = pick(rng, extraFloors);
    extraIce.add(key(point));
  }
  for (const raw of extraIce) {
    const [x, y] = parseKey(raw);
    rows[y]![x] = "I";
  }

  // 偶尔制造一条 meta 长距离发射线，但不固定它的终点。
  if (iteration % 3 === 0) {
    const y = pick(rng, [2, midY, height - 3].filter((value) => value > 0 && value < height - 1));
    const fromRight = rng() < 0.5;
    const xStart = fromRight ? width - 3 : 2;
    const xEnd = fromRight ? 2 : width - 3;
    const step = fromRight ? -1 : 1;
    for (let x = xStart; x !== xEnd; x += step) {
      if (!interfaceKeys.has(`${x},${y}`) && rows[y]![x] !== "*") {
        rows[y]![x] = ".";
      }
    }
    if (!interfaceKeys.has(`${xStart},${y}`) && rows[y]![xStart] === ".") {
      rows[y]![xStart] = "I";
    }
  }

  return {
    layout: rows.map((row) => row.join("")).join("\n"),
    interfaces: { A, B, C, D },
  };
}

type PairSolve = {
  start: Point;
  goal: Point;
  cost: number;
  inputs: string[];
  events: string[];
  exploredStates: number;
};

function quickSolvePair(
  adapter: ReturnType<typeof getRuntimeAdapter>,
  runtime: ReturnType<ReturnType<typeof getRuntimeAdapter>["createRuntime"]>,
  layout: string,
  start: Point,
  goal: Point,
  id: string,
  maxStates: number,
  maxDepth: number,
): PairSolve | undefined {
  if (key(start) === key(goal) || initialPathExists(layout, start, goal)) {
    return undefined;
  }
  const level = buildLevel(id, layout, start, goal);
  try {
    const solution = solveWithRuntime(runtime, adapter.parseLevel(level), {
      winCondition: level.win,
      maxStates,
      maxDepth,
    });
    if (!solution.found) {
      return undefined;
    }
    return {
      start,
      goal,
      cost: solution.cost,
      inputs: solution.inputs,
      events: solution.events,
      exploredStates: solution.exploredStates,
    };
  } catch {
    return undefined;
  }
}

async function main(): Promise<void> {
  const pkg = await loadPrototypePackage("prototypes/ice_slide_escape");
  const adapter = getRuntimeAdapter(pkg.mechanic);
  const runtime = adapter.createRuntime(pkg.mechanic);
  const rng = makeRng(seed);
  const hits: CandidateHit[] = [];
  const failures: Record<string, number> = {};

  for (let iteration = 0; iteration < iterations && hits.length < maxHits; iteration += 1) {
    const { layout, interfaces } = generateLayout(rng, iteration);
    const rows = layout.split("\n");
    const width = rows[0]!.length;
    const height = rows.length;
    const targetCount = countGlyph(layout, "*");
    const iceCount = countGlyph(layout, "*") + countGlyph(layout, "I");

    if (targetCount < 2 || targetCount > 4 || iceCount > 6) {
      failures.bad_counts = (failures.bad_counts ?? 0) + 1;
      continue;
    }
    const edgeFloors = enumerateEdgeFloors(layout);
    if (edgeFloors.length < 4 || edgeFloors.length > 12) {
      failures.edge_count_bad = (failures.edge_count_bad ?? 0) + 1;
      continue;
    }

    const basePairs: PairSolve[] = [];
    const metaPairs: PairSolve[] = [];
    const orderedPairs = edgeFloors.flatMap((start) =>
      edgeFloors.filter((goal) => key(goal) !== key(start)).map((goal) => ({ start, goal })),
    );
    for (let i = orderedPairs.length - 1; i > 0; i -= 1) {
      const j = Math.floor(rng() * (i + 1));
      [orderedPairs[i], orderedPairs[j]] = [orderedPairs[j]!, orderedPairs[i]!];
    }
    const sampledPairs = orderedPairs.slice(0, 26);
    for (const { start, goal } of sampledPairs) {
        const pair = quickSolvePair(
          adapter,
          runtime,
          layout,
          start,
          goal,
          `worker_round53_seed${seed}_${iteration}_${key(start)}_${key(goal)}`,
          12000,
          120,
        );
        if (!pair) continue;
        const returnedLate = pair.events.some((event) => forbiddenBaseLate.some((pattern) => eventHas([event], pattern)));
        if (!returnedLate && countPushes(pair.events) >= 2) {
          basePairs.push(pair);
        }
        if (
          eventHas(pair.events, "ice_destroy_group_d6_plus") &&
          eventHas(pair.events, "slide_restart_after_group") &&
          countPushes(pair.events) >= 3
        ) {
          metaPairs.push(pair);
        }
        if (basePairs.length > 5 && metaPairs.length > 5) break;
    }
    if (basePairs.length === 0) {
      failures.no_base_pair = (failures.no_base_pair ?? 0) + 1;
      continue;
    }
    if (metaPairs.length === 0) {
      failures.no_meta_pair = (failures.no_meta_pair ?? 0) + 1;
      continue;
    }

    const pairChoice = basePairs.flatMap((base) =>
      metaPairs
        .filter((meta) => new Set([key(base.start), key(base.goal), key(meta.start), key(meta.goal)]).size === 4)
        .map((meta) => ({ base, meta })),
    )[0];
    if (!pairChoice) {
      failures.no_distinct_abcd_pairing = (failures.no_distinct_abcd_pairing ?? 0) + 1;
      continue;
    }

    const selectedInterfaces = {
      A: pairChoice.base.start,
      B: pairChoice.base.goal,
      C: pairChoice.meta.start,
      D: pairChoice.meta.goal,
    };
    const baseSolution = pairChoice.base;
    const metaSolution = pairChoice.meta;

    const id = `worker_round53_seed${seed}_${iteration}`;
    const baseCompare = compareIceSlideStarts(pkg, layout, {
      id: `${id}_base_probe`,
      title: `${id} base probe`,
      role: "challenge",
      supportLevel: "none",
      targets: [],
      playerGoal: selectedInterfaces.B,
      starts: [selectedInterfaces.A],
      requiredWinningEvents: [],
      forbiddenWinningEvents: [],
      forbiddenReachableEvents: forbiddenBaseLate,
      maxStates: 20000,
      maxDepth: 100,
      graphMaxStates: 20000,
    });
    const baseRow = baseCompare.starts[0]!;
    if (baseRow.machineGate !== "pass") {
      failures.base_compare_fail = (failures.base_compare_fail ?? 0) + 1;
      continue;
    }

    const metaCompare = compareIceSlideStarts(pkg, layout, {
      id: `${id}_meta_probe`,
      title: `${id} meta probe`,
      role: "challenge",
      supportLevel: "none",
      targets: [],
      playerGoal: selectedInterfaces.D,
      starts: [selectedInterfaces.C],
      requiredWinningEvents: ["ice_destroy_group_d6_plus", "slide_restart_after_group"],
      forbiddenWinningEvents: [],
      forbiddenReachableEvents: [],
      maxStates: 80000,
      maxDepth: 150,
      graphMaxStates: 80000,
    });
    const metaRow = metaCompare.starts[0]!;
    if (metaRow.machineGate !== "pass") {
      failures.meta_compare_fail = (failures.meta_compare_fail ?? 0) + 1;
      continue;
    }

    hits.push({
      id,
      seed,
      iteration,
      width,
      height,
      layout,
      interfaces: selectedInterfaces,
      iceCount,
      targetCount,
      base: {
        cost: baseSolution.cost,
        inputs: baseSolution.inputs,
        events: baseSolution.events,
        exploredStates: baseSolution.exploredStates,
        reachableStatus: baseRow.reachableEventScan?.status,
        reachableStates: baseRow.reachableEventScan?.reachableStates,
        forbiddenReachableHits: baseRow.reachableEventScan?.forbiddenReachableHits,
        machineGate: baseRow.machineGate,
      },
      meta: {
        cost: metaSolution.cost,
        inputs: metaSolution.inputs,
        events: metaSolution.events,
        exploredStates: metaSolution.exploredStates,
        machineGate: metaRow.machineGate,
      },
      notes: [
        `base pushes=${countPushes(baseSolution.events)}`,
        `meta pushes=${countPushes(metaSolution.events)}`,
      ],
    });
  }

  await mkdir(reportsDir, { recursive: true });
  const jsonPath = path.join(reportsDir, `worker_round53_search_seed${seed}.json`);
  const mdPath = path.join(reportsDir, `worker_round53_search_seed${seed}.md`);
  await writeFile(jsonPath, `${JSON.stringify({ seed, iterations, hits, failures }, null, 2)}\n`, "utf8");
  await writeFile(mdPath, formatMarkdown(seed, iterations, hits, failures), "utf8");
  console.log(`Wrote ${jsonPath}`);
  console.log(`Wrote ${mdPath}`);
  console.log(`hits=${hits.length}`);
  console.log(`failures=${JSON.stringify(failures)}`);
}

function formatMarkdown(seedValue: number, iterationCount: number, hits: CandidateHit[], failures: Record<string, number>): string {
  const lines = [
    `# worker_round53 search seed ${seedValue}`,
    "",
    `iterations: ${iterationCount}`,
    `hits: ${hits.length}`,
    "",
    "## Failures",
    "",
    "```json",
    JSON.stringify(failures, null, 2),
    "```",
    "",
    "## Hits",
    "",
  ];
  for (const hit of hits) {
    lines.push(
      `### ${hit.id}`,
      "",
      `interfaces: A ${JSON.stringify(hit.interfaces.A)}, B ${JSON.stringify(hit.interfaces.B)}, C ${JSON.stringify(hit.interfaces.C)}, D ${JSON.stringify(hit.interfaces.D)}`,
      `ice_count: ${hit.iceCount}, target_count: ${hit.targetCount}`,
      "",
      "```text",
      hit.layout,
      "```",
      "",
      `base: gate=${hit.base.machineGate}, cost=${hit.base.cost}, reachable=${hit.base.reachableStatus}/${hit.base.reachableStates}, events=${hit.base.events.join(" ")}`,
      `base inputs: ${hit.base.inputs.join(" ")}`,
      "",
      `meta: gate=${hit.meta.machineGate}, cost=${hit.meta.cost}, events=${hit.meta.events.join(" ")}`,
      `meta inputs: ${hit.meta.inputs.join(" ")}`,
      "",
    );
  }
  return `${lines.join("\n").trimEnd()}\n`;
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.stack ?? error.message : error);
  process.exitCode = 1;
});
