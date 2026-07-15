import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";

import { loadPrototypePackage } from "../../../../../../../../src/core/io.js";
import type { InputId, LevelDoc, Point } from "../../../../../../../../src/core/types.js";
import {
  forceModeAt,
  isWin,
  parseLevel,
  pointKey,
  stateKey,
  step,
  type RealityAnchorState,
} from "../../../../../../../../src/prototypes/reality_anchor/mechanics.js";

type PieceId = "H" | "L" | "R";
type Piece = { id: PieceId; cells: Point[] };
type Placement = { id: PieceId; x: number; y: number; cells: Point[] };
type Edge = {
  from: string;
  to: string;
  input: InputId;
  force: "push" | "pull" | "walk_or_other";
  modeBefore: "push" | "pull";
  beforeMask: number;
  afterMask: number;
  events: string[];
};

const root = path.resolve(
  "prototypes/reality_anchor/reports/explorer_giant_assembly_piston_challenge_20260715/exploration/runs/component_space/modular_hub_enumeration",
);
const sourceLayoutPath = path.resolve(root, "../../root_modular_probe/full_two_wing.layout.txt");
const pkg = await loadPrototypePackage(path.resolve("prototypes/reality_anchor"));
const baseLayout = (await readFile(sourceLayoutPath, "utf8")).trimEnd();
const baseRows = baseLayout.split("\n").map((row) => [...row]);

// H 是唯一能穿过一格窄颈的 spine；L/R 都有不可旋转的横向凸出。
const pieces: Piece[] = [
  { id: "H", cells: [{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 0, y: 2 }] },
  { id: "L", cells: [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 1, y: 1 }] },
  { id: "R", cells: [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 0, y: 1 }] },
];
const targetPlacements: Record<PieceId, Point> = {
  H: { x: 8, y: 6 },
  L: { x: 6, y: 5 },
  R: { x: 9, y: 5 },
};
const targetOrigin = { x: 8, y: 9 };
const pistons = [{ x: 6, y: 3 }, { x: 10, y: 3 }];
const goals = [{ x: 6, y: 2 }, { x: 10, y: 2 }];
const pistonKeys = new Set(pistons.map(pointKey));
const goalKeys = new Set(goals.map(pointKey));

const socketCells = new Set<string>();
for (let y = 2; y <= 9; y += 1) {
  for (let x = 6; x <= 10; x += 1) {
    if (baseRows[y]?.[x] !== "#") socketCells.add(`${x},${y}`);
  }
}
const forceOrigins = [{ x: 8, y: 8 }, { x: 8, y: 9 }];
const placementOptions = new Map<PieceId, Placement[]>();
for (const piece of pieces) {
  const options: Placement[] = [];
  for (let y = 2; y <= 9; y += 1) {
    for (let x = 6; x <= 10; x += 1) {
      const cells = piece.cells.map((cell) => ({ x: x + cell.x, y: y + cell.y }));
      if (cells.every((cell) => socketCells.has(pointKey(cell)) && !pistonKeys.has(pointKey(cell)))) {
        options.push({ id: piece.id, x, y, cells });
      }
    }
  }
  placementOptions.set(piece.id, options);
}

const candidates: Array<{
  id: string;
  pieceIds: PieceId[];
  placements: Placement[];
  union: Point[];
  forceOrigin: Point;
  exactAssembly: boolean;
  exactTarget: boolean;
  registeredPlane: boolean;
}> = [];

for (let mask = 1; mask < 1 << pieces.length; mask += 1) {
  const selected = pieces.filter((_, index) => (mask & (1 << index)) !== 0);
  const visit = (index: number, chosen: Placement[]) => {
    if (index < selected.length) {
      for (const option of placementOptions.get(selected[index]!.id) ?? []) {
        if (!overlaps(chosen, option)) visit(index + 1, [...chosen, option]);
      }
      return;
    }
    const union = sortPoints(chosen.flatMap((placement) => placement.cells));
    if (!connected(union)) return;
    for (const forceOrigin of forceOrigins) {
      if (union.some((cell) => samePoint(cell, forceOrigin))) continue;
      const handle = { x: forceOrigin.x, y: forceOrigin.y - 1 };
      if (!union.some((cell) => samePoint(cell, handle))) continue;
      const exactAssembly = chosen.length === 3
        && chosen.every((item) => samePoint(item, targetPlacements[item.id]));
      const placementCode = chosen.map((item) => `${item.id}${item.x}_${item.y}`).join("__");
      candidates.push({
        id: `${selected.map((piece) => piece.id).join("")}__${placementCode}__P${forceOrigin.x}_${forceOrigin.y}`,
        pieceIds: selected.map((piece) => piece.id),
        placements: chosen,
        union,
        forceOrigin,
        exactAssembly,
        exactTarget: exactAssembly && samePoint(forceOrigin, targetOrigin),
        registeredPlane: samePoint(forceOrigin, targetOrigin),
      });
    }
  };
  visit(0, []);
}

const representativeDir = path.join(root, "representative_layouts");
await rm(representativeDir, { recursive: true, force: true });
await mkdir(representativeDir, { recursive: true });
const cache = new Map<string, ReturnType<typeof exploreGraph>>();
const results = [];
for (const candidate of candidates) {
  const layout = renderLayout(candidate.union, candidate.forceOrigin);
  const initial = parseLevel({ id: candidate.id, title: candidate.id, layout } satisfies LevelDoc);
  const key = stateKey(initial);
  let graph = cache.get(key);
  if (!graph) {
    graph = exploreGraph(initial, 200_000);
    cache.set(key, graph);
  }
  const twoUp = trace(initial, ["up", "up"]);
  const coreBypassReasons: string[] = [];
  if (graph.wins > 0 && candidate.pieceIds.length < 3) coreBypassReasons.push("proper_supplied_subset_win");
  if (graph.winTransitions.some((edge) => edge.beforeMask === 1 || edge.beforeMask === 2)) {
    coreBypassReasons.push("partial_or_sequential_final_cover");
  }
  if (graph.winTransitions.some((edge) => edge.force === "pull")) {
    coreBypassReasons.push("l_side_pull_finish");
  }
  if (graph.winTransitions.some((edge) => edge.force === "walk_or_other")) {
    coreBypassReasons.push("non_force_finish");
  }
  results.push({
    id: candidate.id,
    initialStateKey: key,
    pieceIds: candidate.pieceIds,
    placements: candidate.placements.map(({ id, x, y }) => ({ id, x, y })),
    forceOrigin: candidate.forceOrigin,
    registeredPlane: candidate.registeredPlane,
    exactAssembly: candidate.exactAssembly,
    exactTarget: candidate.exactTarget,
    initialCoveredMask: coveredMask(initial),
    twoUp,
    graph: graph.summary,
    winTransitions: graph.winTransitions,
    partialAudit: graph.partialAudit,
    dynamicForceOrigins: graph.dynamicForceOrigins,
    classification: graph.wins === 0
      ? "nonwinning"
      : coreBypassReasons.length === 0
        ? "functional_equivalent_full_simultaneous_p_push"
        : "core_bypass",
    coreBypassReasons,
    layout,
  });
}

const exactFull = results.find((item) => item.exactTarget);
const exactLeft = results.find((item) =>
  item.registeredPlane
  && item.pieceIds.join("") === "HL"
  && item.placements.every((placement) => samePoint(placement, targetPlacements[placement.id]))
);
const exactRight = results.find((item) =>
  item.registeredPlane
  && item.pieceIds.join("") === "HR"
  && item.placements.every((placement) => samePoint(placement, targetPlacements[placement.id]))
);

for (const [name, item] of [["exact_full", exactFull], ["exact_left_subset", exactLeft], ["exact_right_subset", exactRight]] as const) {
  if (item) await writeFile(path.join(representativeDir, `${name}.layout.txt`), `${item.layout}\n`, "utf8");
}

const registered = results.filter((item) => item.registeredPlane);
const stress = results.filter((item) => !item.registeredPlane);
const winning = results.filter((item) => item.graph.wins > 0);
const registeredWinning = registered.filter((item) => item.graph.wins > 0);
const properSubsetWins = winning.filter((item) => item.pieceIds.length < 3);
const coreBypass = winning.filter((item) => item.classification === "core_bypass");
const wrongFunctional = winning.filter((item) => !item.exactAssembly && item.classification.startsWith("functional_equivalent"));
const subsetPersistentPartial = results.filter((item) =>
  item.pieceIds.length < 3 && item.partialAudit.nonForcedPartialStates > 0
);
const winningWithPartial = winning.filter((item) => item.partialAudit.partialStates > 0);
const fullDeadEndPersistentPartial = results.filter((item) =>
  item.pieceIds.length === 3
  && item.graph.wins === 0
  && item.partialAudit.persistentPartialStates > 0
);
const stressFunctional = winning.find((item) => !item.registeredPlane && item.classification.startsWith("functional_equivalent"));
const wingTailOptions = [...(placementOptions.get("L") ?? []), ...(placementOptions.get("R") ?? [])]
  .filter((placement) => placement.cells.some((cell) => cell.y >= 8));

if (stressFunctional) {
  await writeFile(path.join(representativeDir, "stress_functional_successor.layout.txt"), `${stressFunctional.layout}\n`, "utf8");
}
for (const [index, item] of fullDeadEndPersistentPartial.entries()) {
  await writeFile(path.join(representativeDir, `full_wrong_dead_end_bank_${index + 1}.layout.txt`), `${item.layout}\n`, "utf8");
}

const summary = {
  schema: "ra_modular_hub_supplied_component_closure_v1",
  omega: {
    includes: [
      "actual fixed-orientation H/L/R supplied components",
      "all nonempty supplied-component subsets",
      "all no-overlap integer translations inside the fixed registered socket whose union is 4-connected",
      "registered origin (8,9)->handle (8,8), plus the one-cell P-side stress origin (8,8)->handle (8,7)",
      "all later dynamic P/L force origins through complete four-input runtime graphs",
    ],
    excludes: [
      "arbitrary smaller polyominoes not supplied by this level",
      "rotations, cuts, or extra components not available in this registered phase",
      "terrain outside the fixed socket",
    ],
  },
  pieces: pieces.map((piece) => ({ id: piece.id, fixedOrientationCells: piece.cells })),
  targetPlacements,
  targetOrigin,
  socketCells: [...socketCells].sort(),
  counts: {
    placementOptions: Object.fromEntries(pieces.map((piece) => [piece.id, placementOptions.get(piece.id)?.length ?? 0])),
    candidateOrigins: results.length,
    registeredCandidateOrigins: registered.length,
    stressCandidateOrigins: stress.length,
    uniqueRuntimeInitialStates: cache.size,
    completeGraphs: results.filter((item) => item.graph.status === "complete").length,
    exhaustedGraphs: results.filter((item) => item.graph.status !== "complete").length,
    winningOrigins: winning.length,
    registeredWinningOrigins: registeredWinning.length,
    properSubsetWins: properSubsetWins.length,
    coreBypassWinningOrigins: coreBypass.length,
    wrongFunctionalWinningOrigins: wrongFunctional.length,
    subsetOriginsWithNonForcedPartial: subsetPersistentPartial.length,
    winningOriginsWithAnyPartialState: winningWithPartial.length,
    fullWrongNonwinningPersistentPartialOrigins: fullDeadEndPersistentPartial.length,
    wingPlacementOptionsEnteringPRegionY8Plus: wingTailOptions.length,
  },
  exactWitnesses: { full: exactFull, leftSubset: exactLeft, rightSubset: exactRight },
  properSubsetWinIds: properSubsetWins.map((item) => item.id),
  coreBypassIds: coreBypass.map((item) => item.id),
  wrongFunctionalIds: wrongFunctional.map((item) => item.id),
  subsetPersistentPartialIds: subsetPersistentPartial.map((item) => item.id),
  winningWithPartialIds: winningWithPartial.map((item) => item.id),
  fullDeadEndPersistentPartialIds: fullDeadEndPersistentPartial.map((item) => item.id),
  wingTailOptions,
  results,
};

await writeFile(path.join(root, "enumeration.json"), `${JSON.stringify(summary, null, 2)}\n`, "utf8");
process.stdout.write(`${JSON.stringify(summary.counts)}\n`);
for (const item of coreBypass.slice(0, 20)) {
  process.stdout.write(`BYPASS ${item.id}: ${item.coreBypassReasons.join("+")} shortest=${item.graph.shortestWin?.inputs.join(",") ?? "?"}\n`);
}

function exploreGraph(initial: RealityAnchorState, maxStates: number) {
  const initialKey = stateKey(initial);
  const seen = new Map([[initialKey, initial]]);
  const queue = [initial];
  const parent = new Map<string, { previous: string; input: InputId }>();
  const edges: Edge[] = [];
  const outgoing = new Map<string, Edge[]>();
  let cursor = 0;
  while (cursor < queue.length && seen.size < maxStates) {
    const current = queue[cursor++]!;
    if (isWin(current)) continue;
    const from = stateKey(current);
    for (const input of ["up", "down", "left", "right"] as InputId[]) {
      const result = step(pkg.mechanic, current, input);
      if (!result.legal) continue;
      const to = stateKey(result.state);
      const force = forceOf(result.events);
      const edge: Edge = {
        from,
        to,
        input,
        force,
        modeBefore: forceModeAt(current, current.player),
        beforeMask: coveredMask(current),
        afterMask: coveredMask(result.state),
        events: result.events,
      };
      edges.push(edge);
      outgoing.set(from, [...(outgoing.get(from) ?? []), edge]);
      if (!seen.has(to)) {
        seen.set(to, result.state);
        parent.set(to, { previous: from, input });
        queue.push(result.state);
      }
    }
  }
  const winKeys = [...seen].filter(([, state]) => isWin(state)).map(([key]) => key);
  const firstWin = winKeys[0];
  const winByType = new Map<string, Edge & { path: InputId[] }>();
  for (const edge of edges.filter((item) => winKeys.includes(item.to))) {
    const type = `${edge.force}_${edge.beforeMask}_to_${edge.afterMask}`;
    const withPath = { ...edge, path: [...reconstruct(edge.from, initialKey, parent), edge.input] };
    const previous = winByType.get(type);
    if (!previous || withPath.path.length < previous.path.length) winByType.set(type, withPath);
  }
  const partialStates = [...seen].filter(([, state]) => [1, 2].includes(coveredMask(state)));
  let forcedRetractPartialStates = 0;
  let nonForcedPartialStates = 0;
  let persistentPartialStates = 0;
  const partialExamples = [];
  for (const [key, state] of partialStates) {
    const legal = outgoing.get(key) ?? [];
    const mask = coveredMask(state);
    const forced = legal.length === 1
      && legal[0]!.force === "pull"
      && legal[0]!.input === "down"
      && legal[0]!.afterMask === 0;
    if (forced) forcedRetractPartialStates += 1;
    else nonForcedPartialStates += 1;
    if (legal.some((edge) => edge.afterMask === mask)) persistentPartialStates += 1;
    if (partialExamples.length < 8) {
      partialExamples.push({
        path: reconstruct(key, initialKey, parent),
        mask,
        player: state.player,
        mode: forceModeAt(state, state.player),
        forcedRetract: forced,
        legal: legal.map((edge) => ({ input: edge.input, force: edge.force, afterMask: edge.afterMask, events: edge.events })),
      });
    }
  }
  const dynamicForceOrigins = [...new Map(edges.filter((edge) => edge.force !== "walk_or_other").map((edge) => {
    const state = seen.get(edge.from)!;
    const value = { player: state.player, mode: edge.modeBefore, input: edge.input, force: edge.force };
    return [`${value.player.x},${value.player.y}:${value.mode}:${value.input}:${value.force}`, value];
  })).values()];
  const summary = {
    status: cursor === queue.length ? "complete" as const : "exhausted" as const,
    states: seen.size,
    transitions: edges.length,
    wins: winKeys.length,
    reachableCoveredMasks: [...new Set([...seen.values()].map(coveredMask))].sort(),
    shortestWin: firstWin ? { inputs: reconstruct(firstWin, initialKey, parent) } : null,
    winTransitionTypes: [...winByType.keys()].sort(),
  };
  return {
    wins: winKeys.length,
    summary,
    winTransitions: [...winByType.entries()].map(([type, edge]) => ({ type, ...edge })),
    partialAudit: {
      partialStates: partialStates.length,
      forcedRetractPartialStates,
      nonForcedPartialStates,
      persistentPartialStates,
      examples: partialExamples,
    },
    dynamicForceOrigins,
  };
}

function renderLayout(union: Point[], forceOrigin: Point): string {
  const rows = baseLayout.split("\n").map((row) => [...row]);
  for (let y = 0; y < rows.length; y += 1) {
    for (let x = 0; x < rows[y]!.length; x += 1) {
      if (rows[y]![x] === "M" && !pistonKeys.has(`${x},${y}`)) rows[y]![x] = ".";
      if (rows[y]![x] === "@") rows[y]![x] = ".";
    }
  }
  for (const cell of union) rows[cell.y]![cell.x] = goalKeys.has(pointKey(cell)) ? "m" : "M";
  rows[forceOrigin.y]![forceOrigin.x] = "@";
  return rows.map((row) => row.join("")).join("\n");
}

function trace(initial: RealityAnchorState, inputs: InputId[]) {
  let state = initial;
  const steps = [];
  for (const input of inputs) {
    const before = state;
    const result = step(pkg.mechanic, before, input);
    if (result.legal) state = result.state;
    steps.push({
      input,
      legal: result.legal,
      modeBefore: forceModeAt(before, before.player),
      playerBefore: before.player,
      playerAfter: state.player,
      events: result.events,
      coveredMask: coveredMask(state),
      win: isWin(state),
      stateKey: stateKey(state),
    });
  }
  return steps;
}

function coveredMask(state: RealityAnchorState): number {
  const occupied = new Set<string>();
  for (const crate of state.crates) occupied.add(pointKey(crate));
  for (const group of state.stickyGroups) for (const cell of group) occupied.add(pointKey(cell));
  return (occupied.has("6,2") ? 1 : 0) | (occupied.has("10,2") ? 2 : 0);
}

function forceOf(events: string[]): "push" | "pull" | "walk_or_other" {
  if (events.some((event) => event.startsWith("push_object:"))) return "push";
  if (events.some((event) => event.startsWith("pull_object:"))) return "pull";
  return "walk_or_other";
}

function reconstruct(key: string, initial: string, parent: Map<string, { previous: string; input: InputId }>): InputId[] {
  const inputs: InputId[] = [];
  let cursor = key;
  while (cursor !== initial) {
    const edge = parent.get(cursor);
    if (!edge) break;
    inputs.push(edge.input);
    cursor = edge.previous;
  }
  return inputs.reverse();
}

function overlaps(chosen: Placement[], next: Placement): boolean {
  const occupied = new Set(chosen.flatMap((placement) => placement.cells).map(pointKey));
  return next.cells.some((cell) => occupied.has(pointKey(cell)));
}

function connected(cells: Point[]): boolean {
  if (cells.length === 0) return false;
  const all = new Set(cells.map(pointKey));
  const visited = new Set([pointKey(cells[0]!)]);
  const open = [cells[0]!];
  while (open.length > 0) {
    const current = open.pop()!;
    for (const neighbor of [
      { x: current.x + 1, y: current.y },
      { x: current.x - 1, y: current.y },
      { x: current.x, y: current.y + 1 },
      { x: current.x, y: current.y - 1 },
    ]) {
      const key = pointKey(neighbor);
      if (all.has(key) && !visited.has(key)) {
        visited.add(key);
        open.push(neighbor);
      }
    }
  }
  return visited.size === all.size;
}

function sortPoints(cells: Point[]): Point[] {
  return [...cells].sort((left, right) => left.y - right.y || left.x - right.x);
}

function samePoint(left: Point, right: Point): boolean {
  return left.x === right.x && left.y === right.y;
}
