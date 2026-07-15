import { mkdir, writeFile } from "node:fs/promises";
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

type PieceId = "H" | "R" | "T";
type Piece = { id: PieceId; cells: Point[] };
type Placement = { id: PieceId; x: number; y: number; cells: Point[] };

const root = path.resolve(
  "prototypes/reality_anchor/reports/explorer_giant_assembly_piston_challenge_20260715/exploration/runs/component_space/ordinary_crate_dual_interface",
);
const layoutsDir = path.join(root, "layouts");
await mkdir(layoutsDir, { recursive: true });
const pkg = await loadPrototypePackage(path.resolve("prototypes/reality_anchor"));

const width = 16;
const height = 16;
const pistons = [{ x: 10, y: 4 }, { x: 10, y: 8 }];
const goals = [{ x: 11, y: 4 }, { x: 11, y: 8 }];
const directStarts = [{ x: 9, y: 4 }, { x: 9, y: 8 }];
const pieces: Piece[] = [
  {
    id: "H",
    // rear spine + two sparse teeth; only both teeth aligned with the two C lanes can move +x.
    cells: [
      { x: 0, y: 0 }, { x: 0, y: 1 }, { x: 0, y: 2 }, { x: 0, y: 3 }, { x: 0, y: 4 },
      { x: 1, y: 0 }, { x: 1, y: 4 },
    ],
  },
  { id: "R", cells: [{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 0, y: 2 }] },
  { id: "T", cells: [0, 1, 2, 3, 4].map((x) => ({ x, y: 0 })) },
];
const exactPlacements: Record<PieceId, Point> = {
  H: { x: 8, y: 4 },
  R: { x: 8, y: 9 },
  T: { x: 4, y: 12 },
};

const terrain = makeTerrain();
const floorCells = [...terrain.floor].map(fromKey).sort(pointSort);
const componentFloor = new Set(
  floorCells
    .filter((cell) => cell.x <= 9 && cell.y >= 3)
    .map(pointKey),
);
const fixedUnavailable = new Set(pistons.map(pointKey));
const placementOptions = new Map<PieceId, Placement[]>();
for (const piece of pieces) {
  const options: Placement[] = [];
  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const cells = piece.cells.map((cell) => ({ x: x + cell.x, y: y + cell.y }));
      if (cells.every((cell) => componentFloor.has(pointKey(cell)) && !fixedUnavailable.has(pointKey(cell)))) {
        options.push({ id: piece.id, x, y, cells });
      }
    }
  }
  placementOptions.set(piece.id, options);
}

const fullLayout = renderLayout([
  placementAt("H", exactPlacements.H),
  placementAt("R", exactPlacements.R),
  placementAt("T", exactPlacements.T),
], { x: 3, y: 12 });
const directUpperLayout = renderLayout([], directStarts[0]!);
const directLowerLayout = renderLayout([], directStarts[1]!);
const directBayLayout = renderLayout([], { x: 3, y: 14 });
const neutralBayLayout = renderLayout([], { x: 3, y: 14 }, { neutralPL: true });
await Promise.all([
  writeFile(path.join(layoutsDir, "registered_full.layout.txt"), `${fullLayout}\n`, "utf8"),
  writeFile(path.join(layoutsDir, "direct_upper.layout.txt"), `${directUpperLayout}\n`, "utf8"),
  writeFile(path.join(layoutsDir, "direct_lower.layout.txt"), `${directLowerLayout}\n`, "utf8"),
  writeFile(path.join(layoutsDir, "direct_bay.layout.txt"), `${directBayLayout}\n`, "utf8"),
  writeFile(path.join(layoutsDir, "neutral_pl_bay.layout.txt"), `${neutralBayLayout}\n`, "utf8"),
]);

const directUpperInitial = parse("direct_upper", directUpperLayout);
const directLowerInitial = parse("direct_lower", directLowerLayout);
const fullInitial = parse("registered_full", fullLayout);
const directBayInitial = parse("direct_bay", directBayLayout);
const neutralBayInitial = parse("neutral_bay", neutralBayLayout);

const phaseWitnesses = {
  directUpper: {
    trace: trace(directUpperInitial, ["right", "left"]),
    coveredActionTable: actionTable(stateAfter(directUpperInitial, ["right"])),
    graph: exploreGraph(directUpperInitial, 200_000),
  },
  directLower: {
    trace: trace(directLowerInitial, ["right", "left"]),
    coveredActionTable: actionTable(stateAfter(directLowerInitial, ["right"])),
    graph: exploreGraph(directLowerInitial, 200_000),
  },
  directBay: exploreGraph(directBayInitial, 200_000),
  neutralPLBay: exploreGraph(neutralBayInitial, 200_000),
  registeredFull: {
    trace: trace(fullInitial, ["right"]),
    graph: exploreGraph(fullInitial, 200_000),
  },
};

// Geometric stress closure: actual fixed H/R/T only, every nonempty subset, every no-overlap
// translation in the registered socket. We deliberately do not invent smaller polyominoes.
const assemblyCandidates: Array<{ pieceIds: PieceId[]; placements: Placement[] }> = [];
for (let subsetMask = 1; subsetMask < 1 << pieces.length; subsetMask += 1) {
  const selected = pieces.filter((_, index) => (subsetMask & (1 << index)) !== 0);
  const visit = (index: number, chosen: Placement[]) => {
    if (index === selected.length) {
      assemblyCandidates.push({ pieceIds: selected.map((piece) => piece.id), placements: chosen });
      return;
    }
    for (const option of placementOptions.get(selected[index]!.id) ?? []) {
      if (!overlaps(chosen, option)) visit(index + 1, [...chosen, option]);
    }
  };
  visit(0, []);
}

const staticAudits = [];
const remoteTransitions = [];
for (const [candidateIndex, candidate] of assemblyCandidates.entries()) {
  const occupied = new Set(candidate.placements.flatMap((placement) => placement.cells).map(pointKey));
  const playerOrigins = floorCells.filter((cell) =>
    !occupied.has(pointKey(cell))
    && !fixedUnavailable.has(pointKey(cell))
    && !goals.some((goal) => samePoint(goal, cell))
  );
  let legalRight = 0;
  let remoteMaskTransitions = 0;
  for (const player of playerOrigins) {
    const layout = renderLayout(candidate.placements, player);
    let initial: RealityAnchorState;
    try {
      initial = parse(`stress_${candidateIndex}_${player.x}_${player.y}`, layout);
    } catch {
      continue;
    }
    const result = step(pkg.mechanic, initial, "right");
    if (!result.legal) continue;
    legalRight += 1;
    const beforeMask = coveredMask(initial);
    const afterMask = coveredMask(result.state);
    const movedMask = pistonAdvanceMask(initial, result.state);
    const startKind = forceStartKind(result.events);
    const direct = startKind === "crate" && directStarts.some((start) => samePoint(start, initial.player));
    if (!direct && (movedMask !== 0 || afterMask !== beforeMask)) {
      remoteMaskTransitions += 1;
      const entry = {
        candidateIndex,
        pieceIds: candidate.pieceIds,
        placements: candidate.placements.map(({ id, x, y }) => ({ id, x, y })),
        player,
        playerMode: forceModeAt(initial, player),
        events: result.events,
        beforeMask,
        afterMask,
        movedPistonMask: movedMask,
        startKind,
        exactFull: isExactFull(candidate),
        layout,
      };
      remoteTransitions.push(entry);
    }
  }
  staticAudits.push({
    candidateIndex,
    pieceIds: candidate.pieceIds,
    placements: candidate.placements.map(({ id, x, y }) => ({ id, x, y })),
    exactFull: isExactFull(candidate),
    legalRight,
    remoteMaskTransitions,
  });
}

const properRemote = remoteTransitions.filter((item) => item.movedPistonMask === 1 || item.movedPistonMask === 2);
const allRemote = remoteTransitions.filter((item) => item.movedPistonMask === 3);
const properSubsetRemote = remoteTransitions.filter((item) => item.pieceIds.length < 3 && item.movedPistonMask !== 0);
const allWithoutExactResponsibility = allRemote.filter((item) =>
  item.pieceIds.length < 3 || !item.pieceIds.includes("H")
);

for (const [index, entry] of properRemote.slice(0, 20).entries()) {
  await writeFile(path.join(layoutsDir, `counterexample_proper_remote_${index + 1}.layout.txt`), `${entry.layout}\n`, "utf8");
}
for (const [index, entry] of allRemote.filter((item) => !item.exactFull).slice(0, 10).entries()) {
  await writeFile(path.join(layoutsDir, `alternate_all_remote_${index + 1}.layout.txt`), `${entry.layout}\n`, "utf8");
}

const report = {
  schema: "ra_ordinary_crate_dual_interface_probe_v1",
  scope: {
    quantifiedObjects: [
      "actual fixed-orientation supplied H/R/T",
      "all nonempty proper subsets and full-kit translations in the registered socket",
      "the two designated ordinary piston crates C",
      "runtime-real sticky merge and B/S split during complete phase graphs",
    ],
    excluded: [
      "arbitrary smaller polyominoes not supplied by the level",
      "unregistered terrain outside this terminal",
    ],
    caveat: "Static translation enumeration is a geometric stress superset; full orthogonal-loader reachability is a separate phase obligation.",
  },
  geometry: {
    width,
    height,
    pistons,
    goals,
    directStarts,
    exactPlacements,
    pieces,
    placementOptionCounts: Object.fromEntries(pieces.map((piece) => [piece.id, placementOptions.get(piece.id)?.length ?? 0])),
  },
  phaseWitnesses,
  staticEnumeration: {
    candidateAssemblies: assemblyCandidates.length,
    remoteTransitions: remoteTransitions.length,
    remoteMovedMasks: histogram(remoteTransitions.map((item) => item.movedPistonMask)),
    properRemoteTransitions: properRemote.length,
    properSubsetRemoteTransitions: properSubsetRemote.length,
    allRemoteTransitions: allRemote.length,
    allWithoutExactResponsibility: allWithoutExactResponsibility.length,
    remoteTransitions,
    staticAudits,
  },
};

await writeFile(path.join(root, "audit.json"), `${JSON.stringify(report, null, 2)}\n`, "utf8");
process.stdout.write(`${JSON.stringify({
  placementOptions: report.geometry.placementOptionCounts,
  candidates: assemblyCandidates.length,
  remoteTransitions: remoteTransitions.length,
  movedMasks: report.staticEnumeration.remoteMovedMasks,
  properRemote: properRemote.length,
  properSubsetRemote: properSubsetRemote.length,
  allRemote: allRemote.length,
  fullGraph: phaseWitnesses.registeredFull.graph.summary,
  directGraph: phaseWitnesses.directBay.summary,
  neutralGraph: phaseWitnesses.neutralPLBay.summary,
})}\n`);

function makeTerrain() {
  const floor = new Set<string>();
  const open = (x: number, y: number) => floor.add(`${x},${y}`);
  // immobile crossed anchors: P/L above S/B, with boundary x=9|10.
  open(9, 1); open(10, 1);
  open(9, 2); open(10, 2);
  // sparse-head loader and stroke landing column.
  for (let y = 3; y <= 12; y += 1) {
    open(8, y); open(9, y);
  }
  // two direct C corridors; all orthogonal neighbors on the C/L-side remain walls.
  for (const y of [4, 8]) {
    open(10, y); open(11, y);
  }
  // offset handle lane and small assembly bay.
  for (let x = 3; x <= 9; x += 1) {
    open(x, 12); open(x, 13); open(x, 14);
  }
  return { floor };
}

function renderLayout(placements: Placement[], player: Point, options: { neutralPL?: boolean } = {}): string {
  const rows = Array.from({ length: height }, () => Array.from({ length: width }, () => "#"));
  for (const cell of floorCells) rows[cell.y]![cell.x] = ".";
  rows[2]![9] = "S";
  rows[2]![10] = "B";
  if (!options.neutralPL) {
    rows[1]![9] = "P";
    rows[1]![10] = "L";
  }
  for (const goal of goals) rows[goal.y]![goal.x] = "G";
  for (const piston of pistons) rows[piston.y]![piston.x] = "C";
  for (const placement of placements) {
    for (const cell of placement.cells) rows[cell.y]![cell.x] = "M";
  }
  rows[player.y]![player.x] = "@";
  return rows.map((row) => row.join("")).join("\n");
}

function parse(id: string, layout: string): RealityAnchorState {
  return parseLevel({ id, title: id, layout } satisfies LevelDoc);
}

function placementAt(id: PieceId, origin: Point): Placement {
  const piece = pieces.find((item) => item.id === id)!;
  return { id, x: origin.x, y: origin.y, cells: piece.cells.map((cell) => ({ x: origin.x + cell.x, y: origin.y + cell.y })) };
}

function trace(initial: RealityAnchorState, inputs: InputId[]) {
  let state = initial;
  const steps = [];
  for (const input of inputs) {
    const before = state;
    const result = step(pkg.mechanic, state, input);
    if (result.legal) state = result.state;
    steps.push({
      input,
      legal: result.legal,
      reason: result.reason ?? null,
      playerBefore: before.player,
      playerAfter: state.player,
      modeBefore: forceModeAt(before, before.player),
      events: result.events,
      coveredMask: coveredMask(state),
      pistonPositions: pistonPositions(state),
      crateCount: state.crates.length,
      stickyCellCount: state.stickyGroups.reduce((sum, group) => sum + group.length, 0),
      win: isWin(state),
    });
  }
  return steps;
}

function stateAfter(initial: RealityAnchorState, inputs: InputId[]): RealityAnchorState {
  let state = initial;
  for (const input of inputs) {
    const result = step(pkg.mechanic, state, input);
    if (result.legal) state = result.state;
  }
  return state;
}

function actionTable(state: RealityAnchorState) {
  return (["up", "down", "left", "right"] as InputId[]).map((input) => {
    const result = step(pkg.mechanic, state, input);
    return {
      input,
      legal: result.legal,
      reason: result.reason ?? null,
      events: result.events,
      afterMask: coveredMask(result.legal ? result.state : state),
    };
  });
}

function exploreGraph(initial: RealityAnchorState, maxStates: number) {
  const initialKey = stateKey(initial);
  const seen = new Map([[initialKey, initial]]);
  const queue = [initial];
  const parent = new Map<string, { previous: string; input: InputId }>();
  let cursor = 0;
  let transitions = 0;
  const remoteMasks: number[] = [];
  const pistonPositionKeys = new Set<string>();
  const crateCounts = new Set<number>();
  const stickyCellCounts = new Set<number>();
  while (cursor < queue.length && seen.size < maxStates) {
    const current = queue[cursor++]!;
    pistonPositionKeys.add(pistonPositions(current).join("|"));
    crateCounts.add(current.crates.length);
    stickyCellCounts.add(current.stickyGroups.reduce((sum, group) => sum + group.length, 0));
    if (isWin(current)) continue;
    const from = stateKey(current);
    for (const input of ["up", "down", "left", "right"] as InputId[]) {
      const result = step(pkg.mechanic, current, input);
      if (!result.legal) continue;
      transitions += 1;
      const movedMask = pistonAdvanceMask(current, result.state);
      if (movedMask && forceStartKind(result.events) !== "crate") remoteMasks.push(movedMask);
      const to = stateKey(result.state);
      if (!seen.has(to)) {
        seen.set(to, result.state);
        parent.set(to, { previous: from, input });
        queue.push(result.state);
      }
    }
  }
  const wins = [...seen].filter(([, state]) => isWin(state));
  const firstWin = wins[0]?.[0];
  return {
    summary: {
      status: cursor === queue.length ? "complete" : "exhausted",
      states: seen.size,
      transitions,
      wins: wins.length,
      shortestWin: firstWin ? reconstruct(firstWin, initialKey, parent) : null,
      reachableCoveredMasks: [...new Set([...seen.values()].map(coveredMask))].sort(),
      remoteMovedMasks: histogram(remoteMasks),
      pistonPositionKeys: [...pistonPositionKeys].sort(),
      crateCounts: [...crateCounts].sort((a, b) => a - b),
      stickyCellCounts: [...stickyCellCounts].sort((a, b) => a - b),
    },
  };
}

function coveredMask(state: RealityAnchorState): number {
  const occupied = new Set<string>();
  for (const crate of state.crates) occupied.add(pointKey(crate));
  for (const group of state.stickyGroups) for (const cell of group) occupied.add(pointKey(cell));
  if (state.pushPullAnchor) {
    occupied.add(pointKey(state.pushPullAnchor.push));
    occupied.add(pointKey(state.pushPullAnchor.pull));
  }
  if (state.boxStickyAnchor) {
    occupied.add(pointKey(state.boxStickyAnchor.box));
    occupied.add(pointKey(state.boxStickyAnchor.sticky));
  }
  return goals.reduce((mask, goal, index) => occupied.has(pointKey(goal)) ? mask | (1 << index) : mask, 0);
}

function pistonAdvanceMask(before: RealityAnchorState, after: RealityAnchorState): number {
  const beforeCrates = new Set(before.crates.map(pointKey));
  const afterCrates = new Set(after.crates.map(pointKey));
  return pistons.reduce((mask, piston, index) => {
    const goal = goals[index]!;
    return beforeCrates.has(pointKey(piston)) && afterCrates.has(pointKey(goal)) ? mask | (1 << index) : mask;
  }, 0);
}

function pistonPositions(state: RealityAnchorState): string[] {
  const crates = new Set(state.crates.map(pointKey));
  return pistons.map((piston, index) => {
    const goal = goals[index]!;
    if (crates.has(pointKey(piston))) return pointKey(piston);
    if (crates.has(pointKey(goal))) return pointKey(goal);
    return "outside";
  });
}

function forceStartKind(events: string[]): "crate" | "sticky" | "anchor" | "walk_or_other" {
  const first = events.find((event) => event.startsWith("push_object:") || event.startsWith("pull_object:"));
  if (!first) return "walk_or_other";
  if (first.includes(":crate#")) return "crate";
  if (first.includes(":sticky#")) return "sticky";
  return "anchor";
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

function isExactFull(candidate: { pieceIds: PieceId[]; placements: Placement[] }): boolean {
  return candidate.pieceIds.length === 3
    && candidate.placements.every((placement) => samePoint(placement, exactPlacements[placement.id]));
}

function histogram(values: number[]): Record<string, number> {
  const result: Record<string, number> = {};
  for (const value of values) result[String(value)] = (result[String(value)] ?? 0) + 1;
  return result;
}

function fromKey(key: string): Point {
  const [x, y] = key.split(",").map(Number);
  return { x: x!, y: y! };
}

function pointSort(left: Point, right: Point): number {
  return left.y - right.y || left.x - right.x;
}

function samePoint(left: Point, right: Point): boolean {
  return left.x === right.x && left.y === right.y;
}
