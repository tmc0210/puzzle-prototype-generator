import type {
  GenericSample,
  GenericSamplerProfile,
  GenericSolveInstance,
  Rng,
} from "../../workflows/genericSampler.js";
import { randInt } from "../../workflows/genericSampler.js";
import { eventType } from "../../core/events.js";

type Cell = {
  x: number;
  y: number;
};

export const iceSlideSamplerProfile: GenericSamplerProfile = {
  mechanicId: "ice_slide_escape",
  reportToolId: "ice_curated_miner_scoring_v0",
  maturity: "curated_miner",
  searchSpace:
    "ice_slide_escape curated miner v0: rectangular rows, explicit edge start/goal instances, heuristic branch salience scoring",
  defaultOptions: {
    iterations: 48,
    maxFindings: 10,
    minWidth: 8,
    maxWidth: 14,
    minHeight: 1,
    maxHeight: 4,
    minScore: 5,
    maxStates: 20_000,
    maxDepth: 80,
    graphMaxStates: 20_000,
  },
  sample: ({ index, seed, rng, options }) => sampleIceLayout(index, seed, rng, options),
  enumerateSolveInstances: ({ sample }) => enumerateIceSolveInstances(sample),
  classifyTags: ({ analysis, sample, instance }) => classifyIceTags(analysis, sample, instance),
  scoreFinding: ({ analysis, tags }) => scoreIceFinding(analysis.solution.cost ?? 0, tags),
  rejectFinding: ({ tags }) => rejectIceFinding(tags),
  notes: ({ tags }) => [
    `Observed tags: ${tags.join(", ") || "none"}.`,
    "Scored by ice_curated_miner_scoring_v0; heuristic ranking only, not accepted-level evidence.",
  ],
};

function sampleIceLayout(
  index: number,
  seed: number,
  rng: Rng,
  options: { minWidth: number; maxWidth: number; width: number },
): GenericSample {
  const variant = index % 5;
  if (variant === 0) {
    return rowSample(index, seed, "d5_pass_probe", "@I.....##...", [0, 0], [1, 0]);
  }
  if (variant === 1) {
    return rowSample(index, seed, "d6_destroy_probe", "@I......##...", [0, 0], [1, 0]);
  }
  if (variant === 2) {
    return rowSample(index, seed, "edge_goal_wall_probe", "*@I......#", [1, 0], [9, 0]);
  }
  if (variant === 3) {
    return rowSample(index, seed, "rebound_probe", "@I....#..", [0, 0], [1, 0]);
  }

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

function enumerateIceSolveInstances(sample: GenericSample): GenericSolveInstance[] {
  const preferred = preferredInstance(sample);
  const instances = preferred ? [preferred] : [];
  const parsed = parseGrid(sample.layout);
  const starts = edgeCells(parsed.width, parsed.height).filter((cell) =>
    isInitiallyStandable(parsed.rows, cell),
  );
  const goals = edgeCells(parsed.width, parsed.height);

  for (const start of starts) {
    for (const goal of goals) {
      const id = `s${start.x}_${start.y}_g${goal.x}_${goal.y}`;
      if (instances.some((instance) => instance.id === id)) {
        continue;
      }
      instances.push({
        id,
        playerStart: [start.x, start.y],
        playerGoal: [goal.x, goal.y],
        winCondition: {
          type: "ice_slide_escape_explicit_goal",
          player_start: [start.x, start.y],
          player_goal: [goal.x, goal.y],
        },
      });
      if (instances.length >= 6) {
        return instances;
      }
    }
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
    id: `s${start[0]}_${start[1]}_g${goal[0]}_${goal[1]}`,
    playerStart: start,
    playerGoal: goal,
    winCondition: {
      type: "ice_slide_escape_explicit_goal",
      player_start: start,
      player_goal: goal,
    },
    notes: ["Preferred explicit start/goal pair from the ice sampler profile."],
  };
}

function classifyIceTags(
  analysis: { initialState: string; solution: { events: string[]; cost?: number }; graph: { status: string }; agency: { scc?: { winSubgraphShape: string; solutionIrreversibleStepCount: number } } },
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
  if (types.has("ice_stop_short") && sample.layout.includes("I..I")) {
    tags.push("ice_blocks_ice_no_chain_push");
  }
  if (goalWasWall(sample, instance) && types.has("ice_destroy_group_d6_plus")) {
    tags.push("edge_goal_wall_opened");
  }
  if (sample.layout.includes("G") || sample.layout.includes("*") || sample.layout.includes("+")) {
    tags.push("target_present");
  }
  if (sample.layout.includes("*") || sample.layout.includes("+")) {
    tags.push("target_initially_satisfied");
  }
  if (
    tags.includes("target_present") &&
    instance.playerGoal !== undefined &&
    !samePoint(instance.playerStart, instance.playerGoal)
  ) {
    tags.push("target_and_escape_both_relevant");
  }
  if (samePoint(instance.playerStart, instance.playerGoal)) {
    tags.push("same_start_and_goal");
  }
  const nonWalkEvents = events.filter((event) => eventType(event) !== "walk").length;
  const walkEvents = events.filter((event) => eventType(event) === "walk").length;
  if ((analysis.solution.cost ?? 0) === 1 && nonWalkEvents > 0) {
    tags.push("single_action_probe_only");
  }
  if (walkEvents >= 8 || (nonWalkEvents > 0 && walkEvents >= nonWalkEvents + 6)) {
    tags.push("walk_padding_heavy");
  } else if (walkEvents >= 4 || (nonWalkEvents > 0 && walkEvents >= nonWalkEvents + 3)) {
    tags.push("walk_padding_moderate");
  }
  if (analysis.agency.scc?.winSubgraphShape === "branching_win_dag") {
    tags.push("branching_win_dag");
  }
  if (analysis.agency.scc?.solutionIrreversibleStepCount === 1) {
    tags.push("readable_single_commitment_witness");
  }
  if (events.every((event) => eventType(event) === "walk")) {
    tags.push("walk_only");
  }
  if (analysis.graph.status !== "complete") {
    tags.push("graph_incomplete");
  }
  return tags;
}

function scoreIceFinding(cost: number, tags: string[]): number {
  let score = Math.min(8, cost);
  if (tags.includes("push_ice")) {
    score += 5;
  }
  if (tags.includes("pass_through_d5")) {
    score += 18;
  }
  if (tags.includes("destroy_group_d6_plus")) {
    score += 18;
  }
  if (tags.includes("restart_after_group")) {
    score += 8;
  }
  if (tags.includes("rebound_d4")) {
    score += 12;
  }
  if (tags.includes("destroy_moving_ice_d3")) {
    score += 8;
  }
  if (tags.includes("boundary_disappear")) {
    score += 5;
  }
  if (tags.includes("short_stop_d1_d2")) {
    score += 3;
  }
  if (tags.includes("ice_blocks_ice_no_chain_push")) {
    score += 7;
  }
  if (tags.includes("edge_goal_wall_opened")) {
    score += 18;
  }
  if (tags.includes("target_present")) {
    score += 6;
  }
  if (tags.includes("target_and_escape_both_relevant")) {
    score += 10;
  }
  if (tags.includes("branching_win_dag")) {
    score += 6;
  }
  if (tags.includes("readable_single_commitment_witness")) {
    score += 2;
  }
  if (tags.includes("target_initially_satisfied")) {
    score -= 4;
  }
  if (tags.includes("same_start_and_goal")) {
    score -= 10;
  }
  if (tags.includes("walk_padding_moderate")) {
    score -= 4;
  }
  if (tags.includes("walk_padding_heavy")) {
    score -= 9;
  }
  if (tags.includes("single_action_probe_only")) {
    score -= 3;
  }
  if (tags.includes("walk_only")) {
    score -= 30;
  }
  if (tags.includes("graph_incomplete")) {
    score -= 12;
  }
  return score;
}

function rejectIceFinding(tags: string[]): string | undefined {
  if (tags.includes("walk_only")) {
    return "Curated miner v0 rejects walk-only findings.";
  }
  if (!tags.includes("push_ice")) {
    return "Curated miner v0 requires at least one ice push.";
  }
  return undefined;
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

function goalWasWall(sample: GenericSample, instance: GenericSolveInstance): boolean {
  const goal = instance.playerGoal;
  if (!goal) {
    return false;
  }
  const rows = sample.layout.replace(/\r/g, "").split("\n");
  return rows[goal[1]]?.[goal[0]] === "#";
}

function samePoint(
  left: [number, number] | undefined,
  right: [number, number] | undefined,
): boolean {
  return left !== undefined && right !== undefined && left[0] === right[0] && left[1] === right[1];
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
