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

type PieceId = "A" | "B" | "C";
type Piece = { id: PieceId; cells: Point[] };
type Placement = { id: PieceId; x: number; y: number; cells: Point[] };

const root = path.resolve(
  "prototypes/reality_anchor/reports/explorer_giant_assembly_piston_challenge_20260715/exploration/runs/component_space/latching_docked_enumeration",
);
const sourceLayoutPath = path.resolve(
  root,
  "../../runtime_counterexamples/latching_variant/layouts/latch_correct_full.txt",
);
const pkg = await loadPrototypePackage(path.resolve("prototypes/reality_anchor"));
const baseLayout = (await readFile(sourceLayoutPath, "utf8")).trimEnd();

const pieces: Piece[] = [
  { id: "A", cells: [0, 1, 2, 3, 4].map((x) => ({ x, y: 0 })) },
  { id: "B", cells: [{ x: 0, y: 0 }, { x: 0, y: 1 }] },
  { id: "C", cells: [0, 1, 2].map((x) => ({ x, y: 0 })) },
];

const targetHandle = { x: 8, y: 8 };
const targetPlayer = { x: 8, y: 9 };
const pistons = [{ x: 6, y: 3 }, { x: 10, y: 3 }];
const goals = [{ x: 6, y: 2 }, { x: 10, y: 2 }];
const targetPlacements: Record<PieceId, { x: number; y: number }> = {
  A: { x: 6, y: 5 },
  B: { x: 8, y: 6 },
  C: { x: 7, y: 8 },
};

const baseRows = baseLayout.split("\n").map((row) => [...row]);
const socketCells = new Set<string>();
for (let y = 2; y <= 9; y += 1) {
  for (let x = 6; x <= 10; x += 1) {
    if (baseRows[y]?.[x] !== "#") socketCells.add(`${x},${y}`);
  }
}
const unavailable = new Set(pistons.map(pointKey));
const possibleForceOrigins = [...socketCells]
  .map((cell) => {
    const [x, y] = cell.split(",").map(Number);
    return { x, y };
  })
  .filter((cell) => cell.y >= 8)
  .sort((left, right) => left.y - right.y || left.x - right.x);
const placementOptions = new Map<PieceId, Placement[]>();
for (const piece of pieces) {
  const options: Placement[] = [];
  for (let y = 0; y < baseRows.length; y += 1) {
    for (let x = 0; x < baseRows[y]!.length; x += 1) {
      const cells = piece.cells.map((cell) => ({ x: x + cell.x, y: y + cell.y }));
      if (cells.every((cell) => socketCells.has(pointKey(cell)) && !unavailable.has(pointKey(cell)))) {
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
  handle: Point;
  exactAssembly: boolean;
  exactTarget: boolean;
}> = [];

for (let subsetMask = 1; subsetMask < (1 << pieces.length); subsetMask += 1) {
  const selected = pieces.filter((_, index) => (subsetMask & (1 << index)) !== 0);
  const visit = (index: number, chosen: Placement[]) => {
    if (index < selected.length) {
      for (const option of placementOptions.get(selected[index]!.id) ?? []) {
        if (overlaps(chosen, option)) continue;
        visit(index + 1, [...chosen, option]);
      }
      return;
    }
    const union = sortPoints(chosen.flatMap((placement) => placement.cells));
    if (!connected(union)) return;
    for (const forceOrigin of possibleForceOrigins) {
      if (union.some((cell) => samePoint(cell, forceOrigin))) continue;
      const candidateHandle = { x: forceOrigin.x, y: forceOrigin.y - 1 };
      if (!union.some((cell) => samePoint(cell, candidateHandle))) continue;
      const placementCode = chosen.map((item) => `${item.id}${item.x}_${item.y}`).join("__");
      const exactAssembly = chosen.every((item) => samePoint(item, targetPlacements[item.id]));
      candidates.push({
        id: `${selected.map((piece) => piece.id).join("") || "none"}__${placementCode}__P${forceOrigin.x}_${forceOrigin.y}`,
        pieceIds: selected.map((piece) => piece.id),
        placements: chosen,
        union,
        forceOrigin,
        handle: candidateHandle,
        exactAssembly,
        exactTarget: exactAssembly && samePoint(forceOrigin, targetPlayer),
      });
    }
  };
  visit(0, []);
}

const graphCache = new Map<string, ReturnType<typeof exploreGraph>>();
const results = [];
const counterexampleDir = path.join(root, "winning_layouts");
await rm(counterexampleDir, { recursive: true, force: true });
await mkdir(counterexampleDir, { recursive: true });

for (const candidate of candidates) {
  const layout = renderCandidateLayout(candidate.union, candidate.forceOrigin);
  const level: LevelDoc = { id: candidate.id, title: candidate.id, layout };
  const initial = parseLevel(level);
  const initialKey = stateKey(initial);
  let graph = graphCache.get(initialKey);
  if (!graph) {
    graph = exploreGraph(initial, 200_000);
    graphCache.set(initialKey, graph);
  }
  const twoPush = traceInputs(initial, ["up", "up"]);
  const doubleTouchLogic =
    twoPush.steps.length === 2
    && twoPush.steps.every((item) => item.legal)
    && twoPush.steps[0]!.coveredMask === 0
    && twoPush.steps[1]!.coveredMask === 3
    && twoPush.steps[1]!.win;
  const result = {
    id: candidate.id,
    pieceIds: candidate.pieceIds,
    placements: candidate.placements.map(({ id, x, y }) => ({ id, x, y })),
    union: candidate.union,
    forceOrigin: candidate.forceOrigin,
    handle: candidate.handle,
    exactAssembly: candidate.exactAssembly,
    exactTarget: candidate.exactTarget,
    initialStateKey: initialKey,
    initiallyTouchesPistons: candidate.union.some((cell) =>
      pistons.some((piston) => Math.abs(cell.x - piston.x) + Math.abs(cell.y - piston.y) === 1)
    ),
    twoPush,
    doubleTouchLogic,
    graph,
    layout,
  };
  results.push(result);
  if (graph.wins > 0) {
    await writeFile(path.join(counterexampleDir, `${safeId(candidate.id)}.txt`), `${layout}\n`, "utf8");
  }
}

const winning = results.filter((item) => item.graph.wins > 0);
const properSubsetWins = winning.filter((item) => item.pieceIds.length < 3);
const fullWrongWins = winning.filter((item) => item.pieceIds.length === 3 && !item.exactAssembly);
const correctAssemblyAlternateOriginWins = winning.filter((item) => item.exactAssembly && !item.exactTarget);
const winsOutsideDoubleTouch = winning.filter((item) => !item.doubleTouchLogic);
const graphIncomplete = results.filter((item) => item.graph.status !== "complete");
const uniqueWinningAssemblies = new Set(winning.map((item) => placementKey(item.placements)));
const uniqueWrongWinningAssemblies = new Set(fullWrongWins.map((item) => placementKey(item.placements)));

const summary = {
  schema: "ra_latching_docked_component_enumeration_v1",
  scope: {
    pieces: pieces.map((piece) => ({ id: piece.id, fixedOrientationCells: piece.cells })),
    socketCells: [...socketCells].sort(),
    unavailableCells: [...unavailable].sort(),
    targetHandle,
    targetPlayer,
    possibleForceOrigins,
    pistons,
    goals,
    requirements: [
      "fixed orientation integer translations",
      "no overlap",
      "selected component union initially 4-connected",
      "a legal P-side force-origin in the socket is empty and has a selected component cell immediately above it",
      "all component cells lie in the fixed central socket and avoid player/pistons",
    ],
  },
  counts: {
    candidates: results.length,
    uniqueRuntimeInitialStates: graphCache.size,
    completeGraphs: results.length - graphIncomplete.length,
    incompleteGraphs: graphIncomplete.length,
    winningCandidates: winning.length,
    properSubsetWins: properSubsetWins.length,
    fullWrongWins: fullWrongWins.length,
    correctAssemblyAlternateOriginWins: correctAssemblyAlternateOriginWins.length,
    uniqueWinningAssemblies: uniqueWinningAssemblies.size,
    uniqueWrongWinningAssemblies: uniqueWrongWinningAssemblies.size,
    winsOutsideDoubleTouchLogic: winsOutsideDoubleTouch.length,
  },
  winningIds: winning.map((item) => item.id),
  properSubsetWinIds: properSubsetWins.map((item) => item.id),
  fullWrongWinIds: fullWrongWins.map((item) => item.id),
  correctAssemblyAlternateOriginWinIds: correctAssemblyAlternateOriginWins.map((item) => item.id),
  winsOutsideDoubleTouchIds: winsOutsideDoubleTouch.map((item) => item.id),
  results,
};

await writeFile(path.join(root, "enumeration.json"), `${JSON.stringify(summary, null, 2)}\n`, "utf8");
process.stdout.write(`${JSON.stringify(summary.counts)}\n`);
if (properSubsetWins.length || fullWrongWins.length || winsOutsideDoubleTouch.length) {
  process.stdout.write(`COUNTEREXAMPLE proper=${properSubsetWins.length} fullWrong=${fullWrongWins.length} outsideLogic=${winsOutsideDoubleTouch.length}\n`);
  for (const item of [...properSubsetWins, ...fullWrongWins, ...winsOutsideDoubleTouch].slice(0, 20)) {
    process.stdout.write(`${item.id} shortest=${item.graph.shortestWin?.inputs.join(",") ?? "?"}\n`);
  }
}

function renderCandidateLayout(union: Point[], forceOrigin: Point): string {
  const rows = baseLayout.split("\n").map((row) => [...row]);
  for (let y = 0; y < rows.length; y += 1) {
    for (let x = 0; x < rows[y]!.length; x += 1) {
      if (rows[y]![x] === "M" && !pistons.some((piston) => piston.x === x && piston.y === y)) {
        rows[y]![x] = ".";
      }
      if (rows[y]![x] === "@") rows[y]![x] = ".";
    }
  }
  for (const cell of union) rows[cell.y]![cell.x] = "M";
  rows[forceOrigin.y]![forceOrigin.x] = "@";
  return rows.map((row) => row.join("")).join("\n");
}

function traceInputs(initial: RealityAnchorState, inputs: InputId[]) {
  let state = initial;
  const steps = [];
  for (const input of inputs) {
    const before = state;
    const result = step(pkg.mechanic, before, input);
    const after = result.legal ? result.state : before;
    steps.push({
      input,
      legal: result.legal,
      reason: result.reason ?? null,
      modeBefore: forceModeAt(before, before.player),
      modeAfter: forceModeAt(after, after.player),
      playerBefore: before.player,
      playerAfter: after.player,
      events: result.events,
      coveredMask: coveredMask(after),
      win: isWin(after),
    });
    state = after;
  }
  return { steps, finalStateKey: stateKey(state) };
}

function exploreGraph(initial: RealityAnchorState, maxStates: number) {
  const initialKey = stateKey(initial);
  const seen = new Map([[initialKey, initial]]);
  const queue = [initial];
  const parent = new Map<string, { previous: string; input: InputId }>();
  let cursor = 0;
  let transitions = 0;
  let wins = isWin(initial) ? 1 : 0;
  let firstWinKey = isWin(initial) ? initialKey : undefined;
  const reachableCoveredMasks = new Set([coveredMask(initial)]);

  while (cursor < queue.length && seen.size < maxStates) {
    const current = queue[cursor++]!;
    if (isWin(current)) continue;
    const currentKey = stateKey(current);
    for (const input of ["up", "down", "left", "right"] as InputId[]) {
      const result = step(pkg.mechanic, current, input);
      if (!result.legal) continue;
      transitions += 1;
      reachableCoveredMasks.add(coveredMask(result.state));
      const nextKey = stateKey(result.state);
      if (seen.has(nextKey)) continue;
      seen.set(nextKey, result.state);
      parent.set(nextKey, { previous: currentKey, input });
      queue.push(result.state);
      if (isWin(result.state)) {
        wins += 1;
        firstWinKey ??= nextKey;
      }
    }
  }

  return {
    status: cursor === queue.length ? "complete" as const : "exhausted" as const,
    states: seen.size,
    transitions,
    wins,
    reachableCoveredMasks: [...reachableCoveredMasks].sort(),
    shortestWin: firstWinKey ? reconstruct(firstWinKey, initialKey, parent) : null,
  };
}

function reconstruct(
  winKey: string,
  initialKey: string,
  parent: Map<string, { previous: string; input: InputId }>,
) {
  const inputs: InputId[] = [];
  let cursor = winKey;
  while (cursor !== initialKey) {
    const edge = parent.get(cursor);
    if (!edge) break;
    inputs.push(edge.input);
    cursor = edge.previous;
  }
  inputs.reverse();
  return { cost: inputs.length, inputs };
}

function coveredMask(state: RealityAnchorState): number {
  const occupied = new Set<string>();
  for (const crate of state.crates) occupied.add(pointKey(crate));
  for (const group of state.stickyGroups) for (const cell of group) occupied.add(pointKey(cell));
  return goals.reduce((mask, goal, index) => occupied.has(pointKey(goal)) ? mask | (1 << index) : mask, 0);
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

function safeId(value: string): string {
  return value.replace(/[^a-zA-Z0-9_-]+/g, "_").slice(0, 120);
}

function placementKey(placements: Array<{ id: PieceId; x: number; y: number }>): string {
  return placements.map((item) => `${item.id}:${item.x},${item.y}`).join("|");
}
