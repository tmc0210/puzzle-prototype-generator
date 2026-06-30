import type {
  GenericSample,
  GenericSamplerProfile,
  GenericSolveInstance,
  Rng,
} from "../../workflows/genericSampler.js";
import { randInt } from "../../workflows/genericSampler.js";
import { eventType } from "../../core/events.js";
import type { LevelAnalysis } from "../../workflows/levelAnalyzer.js";
import type { MinerFinding, NormalizedMineOptions } from "../../workflows/seedMiner.js";

type Cell = {
  x: number;
  y: number;
};

type MutableGrid = string[][];

type Vector = {
  dx: number;
  dy: number;
};

type IceSamplerOptions = {
  preset: string;
  width: number;
  height: number;
  minWidth: number;
  maxWidth: number;
  minHeight: number;
  maxHeight: number;
  wallDensity: number;
};

type CapsuleSpec = {
  distance: number;
  targetFinal: boolean;
  obstacleGlyph: "#" | "I";
};

type RowProbeSpec = {
  generator: string;
  layout: string;
};

const rowProbeSlotsPerCycle = 6;

const rowProbeSpecs: RowProbeSpec[] = [
  { generator: "short_stop_d2_probe", layout: "@I..#" },
  { generator: "d3_destroy_probe", layout: "@I...#" },
  { generator: "rebound_probe", layout: "@I....#" },
  { generator: "d5_pass_restart_d3_probe", layout: "@I.....##...#" },
  { generator: "d6_destroy_restart_d3_probe", layout: "@I......##...#" },
  { generator: "ice_blocks_d2_probe", layout: "@I..I" },
  { generator: "boundary_d0_probe", layout: "@I" },
  { generator: "boundary_d1_probe", layout: "@I." },
  { generator: "short_stop_d1_probe", layout: "@I.#" },
  { generator: "ice_blocks_d1_probe", layout: "@I.I" },
  { generator: "ice_blocks_d3_destroy_probe", layout: "@I...I" },
  { generator: "ice_blocks_d4_rebound_probe", layout: "@I....I" },
  { generator: "d5_pass_len1_boundary_probe", layout: "@I.....#" },
  { generator: "d5_pass_restart_boundary_probe", layout: "@I.....#." },
  { generator: "d6_destroy_len1_boundary_probe", layout: "@I......#" },
  { generator: "d6_destroy_restart_boundary_probe", layout: "@I......#." },
  { generator: "d5_pass_restart_short_d1_probe", layout: "@I.....#.#" },
  { generator: "d6_destroy_restart_short_d1_probe", layout: "@I......#.#" },
  { generator: "d5_pass_restart_rebound_probe", layout: "@I.....#....#" },
  { generator: "d6_destroy_restart_rebound_probe", layout: "@I......#....#" },
  { generator: "d5_pass_restart_pass_probe", layout: "@I.....#.....#" },
  { generator: "d6_destroy_restart_pass_probe", layout: "@I......#.....#" },
  { generator: "d5_pass_restart_destroy_probe", layout: "@I.....#......#" },
  { generator: "d6_destroy_restart_destroy_probe", layout: "@I......#......#" },
];

export const iceSlideSamplerProfile: GenericSamplerProfile = {
  mechanicId: "ice_slide_escape",
  reportToolId: "ice_mechanic_probe_prior_v1",
  maturity: "curated_miner",
  scoreLabel: "rankingPriorScore",
  supportedTags: [
    "push_ice",
    "short_stop_d1_d2",
    "destroy_moving_ice_d3",
    "rebound_d4",
    "pass_through_d5",
    "destroy_group_d6_plus",
    "restart_after_group",
    "boundary_disappear",
    "ice_blocks_ice_no_chain_push",
    "row_probe",
    "two_dimensional_structure",
    "distinct_edge_goal",
    "same_start_goal",
    "multi_push_chain",
    "mixed_mechanic_chain",
    "branching_win_dag",
    "stopper_cascade_candidate",
    "heterogeneous_push_roles",
  ],
  searchSpace:
    "ice_slide_escape curated miner v4: expanded row witnesses, 2D capsule rooms with distinct exits, and design-surface ranking hints",
  defaultPreset: "quick",
  defaultOptions: {
    minWidth: 8,
    maxWidth: 12,
    minHeight: 1,
    maxHeight: 7,
    minScore: 5,
    maxDepth: 100,
  },
  presets: {
    quick: {
      iterations: 32,
      maxFindings: 6,
      maxInstances: 180,
      maxStates: 3_000,
      graphMaxStates: 3_000,
    },
    deep: {
      iterations: 72,
      maxFindings: 12,
      maxInstances: 0,
      maxStates: 12_000,
      graphMaxStates: 12_000,
    },
  },
  sample: ({ index, seed, rng, options }) => sampleIceLayout(index, seed, rng, options),
  enumerateSolveInstances: ({ sample }) => enumerateIceSolveInstances(sample),
  classifyTags: ({ analysis, sample, instance }) => classifyIceTags(analysis, sample, instance),
  scoreFinding: ({ analysis, tags, sample, instance }) =>
    scoreIceFinding(analysis, tags, sample, instance),
  rejectFinding: ({ analysis, tags, sample, instance }) =>
    rejectIceFinding(analysis, tags, sample, instance),
  selectFindings: ({ findings, maxFindings, options }) =>
    selectIceFindings(findings, maxFindings, options),
  notes: ({ analysis, tags, sample, instance }) => buildIceFindingNotes(analysis, tags, sample, instance),
};

function sampleIceLayout(
  index: number,
  seed: number,
  rng: Rng,
  options: IceSamplerOptions,
): GenericSample {
  const variant = index % 16;
  if (variant < rowProbeSlotsPerCycle) {
    return rowProbeSample(index, seed, variant);
  }
  if (variant === 6) {
    return randomLineSample(index, seed, rng, options);
  }
  if (variant === 7) {
    return capsuleRoomSample(index, seed, rng, options, "long_branch_inspiration_room", {
      d4Targets: 1,
      d3Threats: 1,
      iceBackedRatio: 0.45,
      longBranchInspiration: true,
    });
  }
  if (variant === 8) {
    return capsuleRoomSample(index, seed, rng, options, "dual_d4_capsule_room", {
      d4Targets: 2,
      d3Threats: 0,
      iceBackedRatio: 0.35,
      longBranchInspiration: false,
    });
  }
  if (variant === 9) {
    return capsuleRoomSample(index, seed, rng, options, "d3_d4_pressure_room", {
      d4Targets: 2,
      d3Threats: 2,
      iceBackedRatio: 0.25,
      longBranchInspiration: false,
    });
  }
  if (variant === 10) {
    return capsuleRoomSample(index, seed, rng, options, "icebacked_capsule_room", {
      d4Targets: 2,
      d3Threats: 1,
      iceBackedRatio: 0.8,
      longBranchInspiration: false,
    });
  }
  if (variant === 11) {
    return capsuleRoomSample(index, seed, rng, options, "long_branch_inspiration_room", {
      d4Targets: 1,
      d3Threats: 1,
      iceBackedRatio: 0.45,
      longBranchInspiration: true,
    });
  }
  if (variant === 12) {
    return capsuleRoomSample(index, seed, rng, options, "dual_d4_capsule_room", {
      d4Targets: 2,
      d3Threats: 0,
      iceBackedRatio: 0.35,
      longBranchInspiration: false,
    });
  }
  if (variant === 13) {
    return capsuleRoomSample(index, seed, rng, options, "d3_d4_pressure_room", {
      d4Targets: 2,
      d3Threats: 2,
      iceBackedRatio: 0.25,
      longBranchInspiration: false,
    });
  }
  if (variant === 14) {
    return capsuleRoomSample(index, seed, rng, options, "icebacked_capsule_room", {
      d4Targets: 2,
      d3Threats: 1,
      iceBackedRatio: 0.8,
      longBranchInspiration: false,
    });
  }

  return capsuleRoomSample(index, seed, rng, options, "long_branch_inspiration_room", {
    d4Targets: 1,
    d3Threats: 1,
    iceBackedRatio: 0.45,
    longBranchInspiration: true,
  });
}

function rowProbeSample(index: number, seed: number, slot: number): GenericSample {
  const cycle = Math.floor(index / 16);
  const specIndex = (cycle * rowProbeSlotsPerCycle + slot) % rowProbeSpecs.length;
  const spec = rowProbeSpecs[specIndex]!;
  return rowSample(index, seed, spec.generator, spec.layout, [0, 0], [1, 0]);
}

function randomLineSample(
  index: number,
  seed: number,
  rng: Rng,
  options: Pick<IceSamplerOptions, "width" | "minWidth" | "maxWidth">,
): GenericSample {
  const width = options.width > 0 ? options.width : randInt(rng, options.minWidth, options.maxWidth);
  const cells = Array.from({ length: width }, () => ".");
  cells[0] = "@";
  cells[1] = "I";
  const obstacleStart = randInt(rng, 4, Math.max(4, width - 2));
  for (let x = 2; x < width; x += 1) {
    cells[x] = ".";
  }
  if (obstacleStart < width) {
    cells[obstacleStart] = rng() < 0.25 ? "I" : "#";
  }
  if (obstacleStart + 1 < width && rng() < 0.55) {
    cells[obstacleStart + 1] = rng() < 0.35 ? "I" : "#";
  }
  return rowSample(index, seed, "random_line_probe", cells.join(""), [0, 0], [1, 0]);
}

function capsuleRoomSample(
  index: number,
  seed: number,
  rng: Rng,
  options: IceSamplerOptions,
  generator: string,
  spec: {
    d4Targets: number;
    d3Threats: number;
    iceBackedRatio: number;
    longBranchInspiration: boolean;
  },
): GenericSample {
  const width =
    options.width > 0
      ? options.width
      : randInt(rng, Math.max(8, options.minWidth), Math.max(10, options.maxWidth));
  const height =
    options.height > 0
      ? options.height
      : randInt(rng, Math.max(6, options.minHeight), Math.max(7, options.maxHeight));
  const grid = makeWalledGrid(width, height);
  carveRect(grid, 1, 1, width - 2, height - 2);
  addBaffles(grid, rng, options.wallDensity);

  let placedTargets = 0;
  for (let attempt = 0; attempt < spec.d4Targets * 12 && placedTargets < spec.d4Targets; attempt += 1) {
    const obstacleGlyph = rng() < spec.iceBackedRatio ? "I" : "#";
    if (placeSlideCapsule(grid, rng, { distance: 4, targetFinal: true, obstacleGlyph })) {
      placedTargets += 1;
    }
  }

  if (placedTargets === 0) {
    forceHorizontalD4Capsule(grid, rng);
  }

  for (let count = 0; count < spec.d3Threats; count += 1) {
    placeSlideCapsule(grid, rng, { distance: 3, targetFinal: false, obstacleGlyph: "#" });
  }

  if (spec.longBranchInspiration) {
    const distance = rng() < 0.5 ? 5 : 6;
    placeSlideCapsule(grid, rng, {
      distance,
      targetFinal: false,
      obstacleGlyph: rng() < 0.5 ? "I" : "#",
    });
  }

  const startEdge = placeEdgeDoor(grid, rng);
  const goalEdge = placeDistinctEdgeDoor(grid, rng, startEdge);
  grid[startEdge.y]![startEdge.x] = "@";

  return {
    index,
    seed,
    generator,
    layout: renderGrid(grid),
    metadata: {
      preferredStart: [startEdge.x, startEdge.y],
      preferredGoal: [goalEdge.x, goalEdge.y],
    },
  };
}

function rowSample(
  index: number,
  seed: number,
  generator: string,
  layout: string,
  playerStart: [number, number],
  playerGoal: [number, number],
): GenericSample {
  return {
    index,
    seed,
    generator,
    layout,
    metadata: {
      preferredStart: playerStart,
      preferredGoal: playerGoal,
    },
  };
}

function makeWalledGrid(width: number, height: number): MutableGrid {
  return Array.from({ length: height }, () => Array.from({ length: width }, () => "#"));
}

function carveRect(grid: MutableGrid, left: number, top: number, right: number, bottom: number): void {
  for (let y = Math.max(0, top); y <= Math.min(grid.length - 1, bottom); y += 1) {
    for (let x = Math.max(0, left); x <= Math.min(grid[y]!.length - 1, right); x += 1) {
      grid[y]![x] = ".";
    }
  }
}

function addBaffles(grid: MutableGrid, rng: Rng, density: number): void {
  const width = grid[0]?.length ?? 0;
  const height = grid.length;
  if (width < 8 || height < 6) {
    return;
  }
  const baffleCount = randInt(rng, 1, 3);
  for (let index = 0; index < baffleCount; index += 1) {
    const horizontal = rng() < 0.55;
    if (horizontal) {
      const y = randInt(rng, 2, height - 3);
      const gap = randInt(rng, 1, width - 2);
      for (let x = 1; x < width - 1; x += 1) {
        if (x !== gap && x !== gap - 1 && rng() > density * 0.35) {
          grid[y]![x] = "#";
        }
      }
    } else {
      const x = randInt(rng, 2, width - 3);
      const gap = randInt(rng, 1, height - 2);
      for (let y = 1; y < height - 1; y += 1) {
        if (y !== gap && y !== gap - 1 && rng() > density * 0.35) {
          grid[y]![x] = "#";
        }
      }
    }
  }
}

function placeSlideCapsule(grid: MutableGrid, rng: Rng, spec: CapsuleSpec): boolean {
  const dirs = shuffledDirections(rng);
  for (let attempt = 0; attempt < 80; attempt += 1) {
    const dir = dirs[attempt % dirs.length]!;
    const origin = randomInteriorCell(grid, rng);
    const pusher = translate(origin, dir, -1);
    const obstacle = translate(origin, dir, spec.distance + 1);
    if (!inBounds(grid, pusher) || !inBounds(grid, obstacle)) {
      continue;
    }
    const laneCells = [pusher, origin];
    for (let offset = 1; offset <= spec.distance; offset += 1) {
      laneCells.push(translate(origin, dir, offset));
    }
    if (laneCells.some((cell) => !inBounds(grid, cell) || !canClearForLane(grid, cell))) {
      continue;
    }
    if (!canUseAsObstacle(grid, obstacle)) {
      continue;
    }
    const target = spec.targetFinal ? translate(origin, dir, finalOffset(spec.distance)) : undefined;
    if (target && !canClearForTarget(grid, target)) {
      continue;
    }

    for (const cell of laneCells) {
      grid[cell.y]![cell.x] = ".";
    }
    grid[origin.y]![origin.x] = "I";
    if (target) {
      grid[target.y]![target.x] = "G";
    }
    grid[obstacle.y]![obstacle.x] = spec.obstacleGlyph;
    return true;
  }
  return false;
}

function forceHorizontalD4Capsule(grid: MutableGrid, rng: Rng): void {
  const width = grid[0]?.length ?? 0;
  const height = grid.length;
  if (width < 7 || height < 3) {
    return;
  }
  const y = randInt(rng, 1, height - 2);
  const origin = { x: 1, y };
  for (let x = 0; x <= Math.min(width - 1, 6); x += 1) {
    grid[y]![x] = ".";
  }
  grid[y]![origin.x] = "I";
  grid[y]![origin.x + 3] = "G";
  grid[y]![origin.x + 5] = rng() < 0.5 ? "I" : "#";
}

function placeEdgeDoor(grid: MutableGrid, rng: Rng): Cell {
  const width = grid[0]?.length ?? 0;
  const height = grid.length;
  const side = randInt(rng, 0, 3);
  if (side === 0) {
    const x = randInt(rng, 1, width - 2);
    clearCell(grid, { x, y: 0 });
    clearCell(grid, { x, y: 1 });
    return { x, y: 0 };
  }
  if (side === 1) {
    const x = randInt(rng, 1, width - 2);
    clearCell(grid, { x, y: height - 1 });
    clearCell(grid, { x, y: height - 2 });
    return { x, y: height - 1 };
  }
  if (side === 2) {
    const y = randInt(rng, 1, height - 2);
    clearCell(grid, { x: 0, y });
    clearCell(grid, { x: 1, y });
    return { x: 0, y };
  }
  const y = randInt(rng, 1, height - 2);
  clearCell(grid, { x: width - 1, y });
  clearCell(grid, { x: width - 2, y });
  return { x: width - 1, y };
}

function placeDistinctEdgeDoor(grid: MutableGrid, rng: Rng, start: Cell): Cell {
  let best = start;
  let bestDistance = -1;
  for (let attempt = 0; attempt < 24; attempt += 1) {
    const candidate = placeEdgeDoor(grid, rng);
    const distance = manhattan(start, candidate);
    if (distance > bestDistance) {
      best = candidate;
      bestDistance = distance;
    }
    if (distance >= 5) {
      return candidate;
    }
  }
  return bestDistance > 0 ? best : farthestEdgeDoor(grid, start);
}

function farthestEdgeDoor(grid: MutableGrid, start: Cell): Cell {
  const width = grid[0]?.length ?? 0;
  const height = grid.length;
  let best = start;
  let bestDistance = -1;
  for (const candidate of edgeCells(width, height)) {
    const distance = manhattan(start, candidate);
    if (distance > bestDistance) {
      best = candidate;
      bestDistance = distance;
    }
  }
  clearCell(grid, best);
  const inward = inwardNeighbor(best, width, height);
  if (inward) {
    clearCell(grid, inward);
  }
  return best;
}

function inwardNeighbor(cell: Cell, width: number, height: number): Cell | undefined {
  if (cell.y === 0) {
    return { x: cell.x, y: 1 };
  }
  if (cell.y === height - 1) {
    return { x: cell.x, y: height - 2 };
  }
  if (cell.x === 0) {
    return { x: 1, y: cell.y };
  }
  if (cell.x === width - 1) {
    return { x: width - 2, y: cell.y };
  }
  return undefined;
}

function shuffledDirections(rng: Rng): Vector[] {
  const dirs = [
    { dx: 1, dy: 0 },
    { dx: -1, dy: 0 },
    { dx: 0, dy: 1 },
    { dx: 0, dy: -1 },
  ];
  return dirs.sort(() => rng() - 0.5);
}

function randomInteriorCell(grid: MutableGrid, rng: Rng): Cell {
  const width = grid[0]?.length ?? 0;
  const height = grid.length;
  return {
    x: randInt(rng, 1, Math.max(1, width - 2)),
    y: randInt(rng, 1, Math.max(1, height - 2)),
  };
}

function translate(cell: Cell, dir: Vector, distance: number): Cell {
  return {
    x: cell.x + dir.dx * distance,
    y: cell.y + dir.dy * distance,
  };
}

function finalOffset(distance: number): number {
  return distance === 4 ? 3 : distance;
}

function inBounds(grid: MutableGrid, cell: Cell): boolean {
  return cell.y >= 0 && cell.y < grid.length && cell.x >= 0 && cell.x < (grid[cell.y]?.length ?? 0);
}

function canClearForLane(grid: MutableGrid, cell: Cell): boolean {
  const glyph = grid[cell.y]?.[cell.x] ?? "#";
  return glyph !== "I" && glyph !== "G" && glyph !== "*" && glyph !== "@" && glyph !== "+";
}

function canClearForTarget(grid: MutableGrid, cell: Cell): boolean {
  const glyph = grid[cell.y]?.[cell.x] ?? "#";
  return glyph !== "I" && glyph !== "*" && glyph !== "@" && glyph !== "+";
}

function canUseAsObstacle(grid: MutableGrid, cell: Cell): boolean {
  const glyph = grid[cell.y]?.[cell.x] ?? "#";
  return glyph !== "G" && glyph !== "*" && glyph !== "@" && glyph !== "+";
}

function clearCell(grid: MutableGrid, cell: Cell): void {
  if (inBounds(grid, cell)) {
    grid[cell.y]![cell.x] = ".";
  }
}

function renderGrid(grid: MutableGrid): string {
  return grid.map((row) => row.join("")).join("\n");
}

function enumerateIceSolveInstances(sample: GenericSample): GenericSolveInstance[] {
  const preferred = preferredInstance(sample);
  const parsed = parseGrid(sample.layout);
  if (preferred && parsed.height === 1) {
    return [preferred];
  }
  const instances: GenericSolveInstance[] = [];
  if (preferred && !sameTuple(preferred.playerStart, preferred.playerGoal)) {
    instances.push(preferred);
  }
  const starts = edgeCells(parsed.width, parsed.height).filter((cell) =>
    isInitiallyStandable(parsed.rows, cell),
  );
  const preferredStart = preferred?.playerStart;
  const sortedStarts = sortStarts(starts, preferredStart);

  for (const start of sortedStarts) {
    const goals = edgeCells(parsed.width, parsed.height)
      .filter((goal) => !sameCell(start, goal))
      .sort((left, right) => manhattan(start, right) - manhattan(start, left));
    for (const goal of goals) {
      const instance = buildIceSolveInstance([start.x, start.y], [goal.x, goal.y]);
      if (instances.some((existing) => existing.id === instance.id)) {
        continue;
      }
      instances.push(instance);
      if (instances.length >= 10) {
        return instances;
      }
    }
  }

  if (instances.length === 0 && preferred) {
    return [preferred];
  }
  return instances;
}

function preferredInstance(sample: GenericSample): GenericSolveInstance | undefined {
  const start = tupleMetadata(sample, "preferredStart");
  const goal = tupleMetadata(sample, "preferredGoal");
  if (!start || !goal) {
    return undefined;
  }
  return {
    ...buildIceSolveInstance(start, goal),
    notes: ["Preferred explicit start/goal pair from the ice sampler profile."],
  };
}

function buildIceSolveInstance(
  playerStart: [number, number],
  playerGoal: [number, number],
): GenericSolveInstance {
  return {
    id: `s${playerStart[0]}_${playerStart[1]}_g${playerGoal[0]}_${playerGoal[1]}`,
    playerStart,
    playerGoal,
    winCondition: {
      type: "ice_slide_escape_explicit_goal",
      player_start: playerStart,
      player_goal: playerGoal,
    },
  };
}

function classifyIceTags(
  analysis: LevelAnalysis,
  sample: GenericSample,
  instance: GenericSolveInstance,
): string[] {
  const events = analysis.solution.events;
  const types = new Set(events.map(eventType));
  const tags: string[] = [];
  if (types.has("push_ice")) {
    tags.push("push_ice");
  }
  if (types.has("ice_stop_short")) {
    tags.push("short_stop_d1_d2");
  }
  if (types.has("ice_destroyed_d3")) {
    tags.push("destroy_moving_ice_d3");
  }
  if (types.has("ice_rebound_d4")) {
    tags.push("rebound_d4");
  }
  if (types.has("ice_pass_through_d5")) {
    tags.push("pass_through_d5");
  }
  if (types.has("ice_destroy_group_d6_plus")) {
    tags.push("destroy_group_d6_plus");
  }
  if (types.has("slide_restart_after_group")) {
    tags.push("restart_after_group");
  }
  if (types.has("ice_boundary_disappear") || types.has("ice_boundary_disappear_after_group")) {
    tags.push("boundary_disappear");
  }
  if (types.has("ice_blocks_ice_no_chain_push")) {
    tags.push("ice_blocks_ice_no_chain_push");
  }
  if (isTwoDimensionalSample(sample)) {
    tags.push("two_dimensional_structure");
  } else {
    tags.push("row_probe");
  }
  if (sameTuple(instance.playerStart, instance.playerGoal)) {
    tags.push("same_start_goal");
  } else {
    tags.push("distinct_edge_goal");
  }
  if (countEventType(events, "push_ice") >= 2) {
    tags.push("multi_push_chain");
  }
  const nonWalkPushTypes = new Set(
    events
      .map(eventType)
      .filter((type) => type !== "walk" && type !== "push_ice"),
  );
  if (nonWalkPushTypes.size >= 3) {
    tags.push("mixed_mechanic_chain");
  }
  if (
    types.has("ice_rebound_d4") &&
    types.has("ice_pass_through_d5") &&
    types.has("ice_destroy_group_d6_plus") &&
    types.has("slide_restart_after_group") &&
    types.has("ice_blocks_ice_no_chain_push")
  ) {
    tags.push("stopper_cascade_candidate");
  }
  if (analysis.agency.scc?.winSubgraphShape === "branching_win_dag") {
    tags.push("branching_win_dag");
  }
  tags.push(...classifyTraceStructure(analysis));
  return tags;
}

function scoreIceFinding(
  analysis: LevelAnalysis,
  tags: string[],
  sample: GenericSample,
  instance: GenericSolveInstance,
): number {
  let score = 0;
  if (tags.includes("short_stop_d1_d2")) {
    score += 16;
  }
  if (tags.includes("destroy_moving_ice_d3")) {
    score += 12;
  }
  if (tags.includes("rebound_d4")) {
    score += 9;
  }
  if (tags.includes("pass_through_d5")) {
    score += 5;
  }
  if (tags.includes("destroy_group_d6_plus")) {
    score += 3;
  }
  if (tags.includes("restart_after_group")) {
    score += 8;
  }
  if (tags.includes("ice_blocks_ice_no_chain_push")) {
    score += 10;
  }
  if (tags.includes("boundary_disappear")) {
    score -= 6;
  }
  score += multiEventBonus(analysis.solution.events);
  score += designSurfaceBonus(analysis, tags, sample, instance);
  return score;
}

function designSurfaceBonus(
  analysis: LevelAnalysis,
  tags: string[],
  sample: GenericSample,
  instance: GenericSolveInstance,
): number {
  let score = 0;
  const pushCount = countEventType(analysis.solution.events, "push_ice");
  const isRow = !isTwoDimensionalSample(sample);
  if (isRow) {
    score -= 14;
  } else {
    score += 8;
  }
  if (sameTuple(instance.playerStart, instance.playerGoal)) {
    score -= 18;
  } else {
    score += 8;
  }
  if ((analysis.solution.cost ?? 0) <= 2) {
    score -= 8;
  }
  if (pushCount >= 2) {
    score += 6;
  }
  if (pushCount >= 3) {
    score += 6;
  }
  if (tags.includes("mixed_mechanic_chain")) {
    score += 8;
  }
  if (tags.includes("stopper_cascade_candidate")) {
    score += 18;
  }
  if (tags.includes("branching_win_dag")) {
    score += 5;
  }
  if (tags.includes("heterogeneous_push_roles")) {
    score += 8;
  }
  const scc = analysis.agency.scc;
  if (scc) {
    if (scc.initialScc.winReachableOutgoingCount >= 2) {
      score += 4;
    }
    if (scc.initialScc.deadOutgoingCount >= 2) {
      score += 4;
    }
  }
  return score;
}

function multiEventBonus(events: string[]): number {
  const pushCount = countEventType(events, "push_ice");
  const d4Count = countEventType(events, "ice_rebound_d4");
  const d3Count = countEventType(events, "ice_destroyed_d3");
  const iceBlockCount = countEventType(events, "ice_blocks_ice_no_chain_push");
  const branchTypes = new Set(
    events
      .map(eventType)
      .filter((type) => type !== "walk" && type !== "push_ice"),
  );
  return (
    Math.min(12, Math.max(0, pushCount - 1) * 4) +
    Math.min(8, Math.max(0, d4Count - 1) * 4) +
    Math.min(6, Math.max(0, d3Count - 1) * 3) +
    Math.min(4, iceBlockCount * 2) +
    Math.min(9, Math.max(0, branchTypes.size - 1) * 3)
  );
}

function countEventType(events: string[], type: string): number {
  return events.filter((event) => eventType(event) === type).length;
}

function rejectIceFinding(
  analysis: LevelAnalysis,
  tags: string[],
  sample: GenericSample,
  instance: GenericSolveInstance,
): string | undefined {
  if (!tags.includes("push_ice")) {
    return "Ice mechanism probe prior requires at least one successful ice push.";
  }
  if (analysis.solution.events.every((event) => eventType(event) === "walk")) {
    return "Ice mechanism probe prior rejects walk-only findings.";
  }
  if (analysis.graph.status !== "complete") {
    return "Ice mechanism probe prior requires complete graph evidence.";
  }
  if (isTwoDimensionalSample(sample) && sameTuple(instance.playerStart, instance.playerGoal)) {
    return "Ice inspiration miner rejects same start/goal 2D findings; add or choose a distinct edge exit.";
  }
  return undefined;
}

function buildIceFindingNotes(
  analysis: LevelAnalysis,
  tags: string[],
  sample: GenericSample,
  instance: GenericSolveInstance,
): string[] {
  const notes = [
    `Observed miner tags: ${tags.join(", ") || "none"}.`,
    "Ranked by ice_mechanic_probe_prior_v1; this is a discovery and inspiration prior, not a quality score.",
  ];
  if (tags.includes("row_probe")) {
    notes.push("Row probe: use this to calibrate distance semantics, not as layout inspiration.");
  }
  if (tags.includes("two_dimensional_structure")) {
    notes.push(
      "2D sample: mine it for spatial relationships, then rerun experiment-specific evidence gates before promotion.",
    );
  }
  if (tags.includes("same_start_goal")) {
    notes.push("Same start/goal is a design smell for this prototype; split the exit before serious review.");
  }
  if (tags.includes("distinct_edge_goal")) {
    notes.push("Distinct edge goal present; inspect whether the exit route is meaningful or just post-solve walking.");
  }
  if (tags.includes("stopper_cascade_candidate")) {
    notes.push(
      "Cascade lead: look for an ice product that becomes a later stopper, then prove wrong-order prefixes dead.",
    );
  }
  if (tags.includes("branching_win_dag")) {
    notes.push("Branching win DAG: check whether the branch is real player choice or just harmless order freedom.");
  }
  if (tags.includes("heterogeneous_push_roles")) {
    notes.push("Heterogeneous push roles: returned pushes have different observed effects; inspect whether that difference matters.");
  }
  if (sameTuple(instance.playerStart, instance.playerGoal)) {
    notes.push("Rewrite with separate player_start/player_goal before asking critic to judge puzzle quality.");
  }
  return notes;
}

function selectIceFindings(
  findings: MinerFinding[],
  maxFindings: number,
  _options: NormalizedMineOptions,
): MinerFinding[] {
  const selected: MinerFinding[] = [];
  const sampleIndexes = new Set<number>();
  const generatorCounts = new Map<string, number>();
  const generatorCap = Math.max(2, Math.ceil(maxFindings * 0.4));
  const rowProbeCap = Math.max(1, Math.ceil(maxFindings * 0.35));
  let rowProbeCount = 0;

  for (const finding of findings) {
    if (sampleIndexes.has(finding.source.index)) {
      continue;
    }
    const isRowProbe = finding.tags.includes("row_probe");
    if (isRowProbe && rowProbeCount >= rowProbeCap) {
      continue;
    }
    const generatorCount = generatorCounts.get(finding.source.generator) ?? 0;
    if (generatorCount >= generatorCap) {
      continue;
    }
    selected.push(finding);
    sampleIndexes.add(finding.source.index);
    generatorCounts.set(finding.source.generator, generatorCount + 1);
    if (isRowProbe) {
      rowProbeCount += 1;
    }
    if (selected.length >= maxFindings) {
      return selected;
    }
  }

  return selected;
}

type ParsedTraceState = {
  walls: Set<string>;
  targets: Set<string>;
  ice: Set<string>;
  player?: Cell;
};

type PushRole =
  | "target_cover"
  | "wall_destroy"
  | "ice_loss"
  | "rebound"
  | "pass_through"
  | "destroy_group"
  | "ice_stopper_hit";

function classifyTraceStructure(analysis: LevelAnalysis): string[] {
  const pushSnapshots = analysis.keySnapshots.filter((snapshot) =>
    snapshot.events.some((event) => eventType(event) === "push_ice"),
  );
  if (pushSnapshots.length < 2) {
    return [];
  }

  const roles = new Set<PushRole>();

  for (const snapshot of pushSnapshots) {
    const before = parseRenderedTraceState(snapshot.before);
    const after = parseRenderedTraceState(snapshot.after);
    const events = new Set(snapshot.events.map(eventType));

    for (const _key of setDifference(coveredTargets(after), coveredTargets(before))) {
      roles.add("target_cover");
    }

    if (setDifference(before.walls, after.walls).length > 0) {
      roles.add("wall_destroy");
    }
    if (events.has("ice_destroyed_d3") || events.has("ice_boundary_disappear")) {
      roles.add("ice_loss");
    }
    if (events.has("ice_rebound_d4")) {
      roles.add("rebound");
    }
    if (events.has("ice_pass_through_d5")) {
      roles.add("pass_through");
    }
    if (events.has("ice_destroy_group_d6_plus")) {
      roles.add("destroy_group");
    }
    if (events.has("ice_blocks_ice_no_chain_push")) {
      roles.add("ice_stopper_hit");
    }
  }

  const tags: string[] = [];
  if (roles.size >= 3) {
    tags.push("heterogeneous_push_roles");
  }
  return tags;
}

function parseRenderedTraceState(rendered: string): ParsedTraceState {
  const walls = new Set<string>();
  const targets = new Set<string>();
  const ice = new Set<string>();
  let player: Cell | undefined;
  const rows = rendered.replace(/\r/g, "").split("\n");
  for (const [y, row] of rows.entries()) {
    for (let x = 0; x < row.length; x += 1) {
      const glyph = row[x];
      const key = `${x},${y}`;
      if (glyph === "#") {
        walls.add(key);
      } else if (glyph === "G") {
        targets.add(key);
      } else if (glyph === "*") {
        targets.add(key);
        ice.add(key);
      } else if (glyph === "+") {
        targets.add(key);
        player = { x, y };
      } else if (glyph === "@") {
        player = { x, y };
      } else if (glyph === "I") {
        ice.add(key);
      }
    }
  }
  return { walls, targets, ice, player };
}

function coveredTargets(state: ParsedTraceState): Set<string> {
  return new Set([...state.ice].filter((key) => state.targets.has(key)));
}

function setDifference(left: Set<string>, right: Set<string>): string[] {
  return [...left].filter((key) => !right.has(key));
}

function tupleMetadata(sample: GenericSample, key: string): [number, number] | undefined {
  const value = sample.metadata?.[key];
  if (
    Array.isArray(value) &&
    value.length === 2 &&
    typeof value[0] === "number" &&
    typeof value[1] === "number"
  ) {
    return [value[0], value[1]];
  }
  return undefined;
}

function parseGrid(layout: string): { rows: string[]; width: number; height: number } {
  const rows = layout.replace(/\r/g, "").split("\n");
  return {
    rows,
    width: rows[0]?.length ?? 0,
    height: rows.length,
  };
}

function isTwoDimensionalSample(sample: GenericSample): boolean {
  return parseGrid(sample.layout).height > 1;
}

function sameTuple(
  left: [number, number] | undefined,
  right: [number, number] | undefined,
): boolean {
  return Boolean(left && right && left[0] === right[0] && left[1] === right[1]);
}

function sameCell(left: Cell, right: Cell): boolean {
  return left.x === right.x && left.y === right.y;
}

function manhattan(left: Cell, right: Cell): number {
  return Math.abs(left.x - right.x) + Math.abs(left.y - right.y);
}

function sortStarts(cells: Cell[], preferred: [number, number] | undefined): Cell[] {
  if (!preferred) {
    return cells;
  }
  return [...cells].sort((left, right) => {
    const leftPreferred = left.x === preferred[0] && left.y === preferred[1] ? 0 : 1;
    const rightPreferred = right.x === preferred[0] && right.y === preferred[1] ? 0 : 1;
    if (leftPreferred !== rightPreferred) {
      return leftPreferred - rightPreferred;
    }
    return 0;
  });
}

function edgeCells(width: number, height: number): Cell[] {
  const cells: Cell[] = [];
  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      if (x === 0 || y === 0 || x === width - 1 || y === height - 1) {
        cells.push({ x, y });
      }
    }
  }
  return cells;
}

function isInitiallyStandable(rows: string[], cell: Cell): boolean {
  const glyph = rows[cell.y]?.[cell.x] ?? "#";
  return glyph !== "#" && glyph !== "I" && glyph !== "*";
}
