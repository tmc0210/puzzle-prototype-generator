import assert from "node:assert/strict";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import { loadPrototypePackage } from "../../../../../../../src/core/io.js";
import type { InputId, LevelDoc, Point } from "../../../../../../../src/core/types.js";
import {
  forceModeAt,
  parseLevel,
  pointKey,
  step,
  type RealityAnchorState,
} from "../../../../../../../src/prototypes/reality_anchor/mechanics.js";

type PieceId = "H" | "R" | "T";
type Placement = { id: PieceId; origin: Point; cells: Point[] };

const root = path.resolve(
  "prototypes/reality_anchor/reports/explorer_giant_assembly_piston_challenge_20260715/exploration/runs/open_assembly_route_explorer",
);
const layoutPath = path.join(root, "layouts/open_assembly_v0.layout.txt");
const layout = (await readFile(layoutPath, "utf8")).trimEnd();
const audit = JSON.parse(await readFile(path.join(root, "audit_v0.json"), "utf8")) as { intendedInputs: InputId[] };
const pkg = await loadPrototypePackage(path.resolve("prototypes/reality_anchor"));
const base = parseLevel({ id: "open_closure_base", title: "open_closure_base", layout } satisfies LevelDoc);

const shapes: Record<PieceId, Point[]> = {
  H: [
    { x: 0, y: 0 }, { x: 1, y: 0 },
    { x: 0, y: 1 }, { x: 0, y: 2 }, { x: 0, y: 3 },
    { x: 0, y: 4 }, { x: 1, y: 4 },
  ],
  R: [{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 0, y: 2 }],
  T: [0, 1, 2, 3, 4].map((x) => ({ x, y: 0 })),
};
const pistons = [{ x: 10, y: 4 }, { x: 10, y: 8 }];
const goals = [{ x: 11, y: 4 }, { x: 11, y: 8 }];
const fixedOccupied = new Set([
  ...pistons.map(pointKey),
  ...goals.map(pointKey),
  ...(base.pushPullAnchor ? [pointKey(base.pushPullAnchor.push), pointKey(base.pushPullAnchor.pull)] : []),
  ...(base.boxStickyAnchor ? [pointKey(base.boxStickyAnchor.box), pointKey(base.boxStickyAnchor.sticky)] : []),
]);
const floorCells: Point[] = [];
for (let y = 0; y < base.height; y += 1) {
  for (let x = 0; x < base.width; x += 1) {
    if (!base.walls.has(`${x},${y}`)) floorCells.push({ x, y });
  }
}

const placementOptions = new Map<PieceId, Placement[]>();
for (const id of Object.keys(shapes) as PieceId[]) {
  const options: Placement[] = [];
  for (let y = 0; y < base.height; y += 1) {
    for (let x = 0; x < base.width; x += 1) {
      const cells = shapes[id].map((cell) => ({ x: x + cell.x, y: y + cell.y }));
      if (cells.every((cell) => !base.walls.has(pointKey(cell)) && !fixedOccupied.has(pointKey(cell)))) {
        options.push({ id, origin: { x, y }, cells });
      }
    }
  }
  placementOptions.set(id, options);
}

// Geometric stress superset: every legal translation of every actual one- and two-piece subset.
// Other supplied pieces are removed, which can only make a remote stroke easier, not harder.
const subsetAssemblies: Placement[][] = [];
for (const id of Object.keys(shapes) as PieceId[]) {
  for (const placement of placementOptions.get(id) ?? []) subsetAssemblies.push([placement]);
}
for (const [leftId, rightId] of [["H", "R"], ["H", "T"], ["R", "T"]] as Array<[PieceId, PieceId]>) {
  for (const left of placementOptions.get(leftId) ?? []) {
    for (const right of placementOptions.get(rightId) ?? []) {
      if (!overlaps(left.cells, right.cells)) subsetAssemblies.push([left, right]);
    }
  }
}

let subsetOriginsTested = 0;
const subsetRemoteTransitions: Array<Record<string, unknown>> = [];
for (const [assemblyIndex, placements] of subsetAssemblies.entries()) {
  const state = stateWithPlacements(placements);
  const occupied = new Set(placements.flatMap((placement) => placement.cells).map(pointKey));
  for (const player of floorCells) {
    const playerKey = pointKey(player);
    if (occupied.has(playerKey) || fixedOccupied.has(playerKey)) continue;
    subsetOriginsTested += 1;
    const before = { ...state, player: { ...player } };
    const result = step(pkg.mechanic, before, "right");
    if (!result.legal) continue;
    const movedMask = pistonAdvanceMask(before, result.state);
    if (movedMask === 0 || startsFromDirectCrate(result.events)) continue;
    subsetRemoteTransitions.push({
      assemblyIndex,
      pieces: placements.map((placement) => placement.id),
      origins: placements.map((placement) => placement.origin),
      player,
      mode: forceModeAt(before, player),
      movedMask,
      events: result.events,
    });
  }
}

// Full-kit wrong geometry audit.  A first remote piston advance necessarily has a supplied sticky
// cell at (9,4) or (9,8), so configurations without either contact are safely skipped.
let relevantFullAssemblies = 0;
let fullOriginsTested = 0;
const fullRemoteTransitions: Array<Record<string, unknown>> = [];
for (const h of placementOptions.get("H") ?? []) {
  for (const r of placementOptions.get("R") ?? []) {
    if (overlaps(h.cells, r.cells)) continue;
    for (const t of placementOptions.get("T") ?? []) {
      if (overlaps(h.cells, t.cells) || overlaps(r.cells, t.cells)) continue;
      const placements = [h, r, t];
      const occupied = new Set(placements.flatMap((placement) => placement.cells).map(pointKey));
      if (!occupied.has("9,4") && !occupied.has("9,8")) continue;
      relevantFullAssemblies += 1;
      const candidate = stateWithPlacements(placements);
      for (const player of floorCells) {
        const playerKey = pointKey(player);
        if (occupied.has(playerKey) || fixedOccupied.has(playerKey)) continue;
        fullOriginsTested += 1;
        const before = { ...candidate, player: { ...player } };
        const result = step(pkg.mechanic, before, "right");
        if (!result.legal) continue;
        const movedMask = pistonAdvanceMask(before, result.state);
        if (movedMask === 0 || startsFromDirectCrate(result.events)) continue;
        fullRemoteTransitions.push({
          origins: placements.map((placement) => ({ id: placement.id, ...placement.origin })),
          player,
          mode: forceModeAt(before, player),
          movedMask,
          events: result.events,
        });
      }
    }
  }
}

// Along the exact construction, scan every geometrically standable right-force origin at every
// vertical registration height.  This is again a superset of truly reachable player positions.
let state = base;
const phaseStates: Array<{ stepIndex: number; state: RealityAnchorState }> = [];
let secondMergeSeen = false;
for (const [index, input] of audit.intendedInputs.entries()) {
  const result = step(pkg.mechanic, state, input);
  assert.equal(result.legal, true, `intended input ${index + 1} became illegal`);
  state = result.state;
  if (result.events.some((event) => event.startsWith("sticky_merge:"))) {
    if (secondMergeSeen) throw new Error("more than two merge steps in intended trace");
    if (state.stickyGroups.length === 1) secondMergeSeen = true;
  }
  if (secondMergeSeen && !isCovered(state)) phaseStates.push({ stepIndex: index + 1, state });
  if (isCovered(state)) break;
}

const registrationScans: Array<Record<string, unknown>> = [];
for (const phase of phaseStates) {
  const cells = phase.state.stickyGroups.flat();
  const topY = Math.min(...cells.map((cell) => cell.y));
  const occupied = objectKeys(phase.state);
  const remote = [];
  for (const player of floorCells) {
    if (occupied.has(pointKey(player))) continue;
    const before = { ...phase.state, player: { ...player } };
    const result = step(pkg.mechanic, before, "right");
    if (!result.legal) continue;
    const movedMask = pistonAdvanceMask(before, result.state);
    if (movedMask !== 0 && !startsFromDirectCrate(result.events)) {
      remote.push({ player, movedMask, events: result.events });
    }
  }
  registrationScans.push({ stepIndex: phase.stepIndex, topY, remote });
}

const preWinScans = registrationScans.filter((scan) => (scan.remote as unknown[]).length > 0);
const partialRegistrationScans = registrationScans.filter((scan) => (scan.topY as number) !== 4);
const partialRemote = partialRegistrationScans.flatMap((scan) => scan.remote as unknown[]);

assert.equal(subsetRemoteTransitions.length, 0, "a one/two-piece supplied subset can remotely advance a piston");
assert.ok(fullRemoteTransitions.length > 0, "full kit should have a remote all-piston stroke");
assert.equal(
  fullRemoteTransitions.filter((item) => item.movedMask !== 3).length,
  0,
  "a full-kit wrong geometry can remotely advance a proper piston subset",
);
for (const transition of fullRemoteTransitions) {
  assert.deepEqual(transition.origins, [
    { id: "H", x: 8, y: 4 },
    { id: "R", x: 8, y: 9 },
    { id: "T", x: 4, y: 12 },
  ], "a non-registered full-kit geometry can remotely advance the pistons");
  assert.deepEqual(transition.player, { x: 3, y: 12 }, "registered giant has an unexpected force origin");
}
assert.equal(partialRemote.length, 0, "an intermediate transport height can remotely advance a piston");
assert.ok(preWinScans.length >= 1, "registered full giant should have a remote all-piston stroke");
for (const scan of preWinScans) {
  for (const remote of scan.remote as Array<{ movedMask: number }>) assert.equal(remote.movedMask, 3);
}

const report = {
  schema: "ra_open_assembly_geometric_closure_v0",
  quantifiedDomain: [
    "actual fixed-orientation H/R/T only",
    "every terrain-legal translation of each one- and two-piece proper subset",
    "every geometrically standable +x force origin, including unreachable origins",
    "every intended vertical transport height after full merge",
  ],
  placementOptionCounts: Object.fromEntries(
    (Object.keys(shapes) as PieceId[]).map((id) => [id, placementOptions.get(id)?.length ?? 0]),
  ),
  subsetAssemblies: subsetAssemblies.length,
  subsetOriginsTested,
  subsetRemoteTransitions,
  relevantFullAssemblies,
  fullOriginsTested,
  fullRemoteTransitions,
  registrationScans,
  assertions: {
    suppliedProperSubsetRemotePistonAdvances: subsetRemoteTransitions.length,
    fullRemoteTransitions: fullRemoteTransitions.length,
    fullWrongGeometryRemotePistonAdvances: fullRemoteTransitions.filter((item) =>
      JSON.stringify(item.origins) !== JSON.stringify([
        { id: "H", x: 8, y: 4 },
        { id: "R", x: 8, y: 9 },
        { id: "T", x: 4, y: 12 },
      ])
    ).length,
    intermediateHeightRemotePistonAdvances: partialRemote.length,
    registeredRemoteScans: preWinScans.length,
    registeredMasks: [...new Set(preWinScans.flatMap((scan) =>
      (scan.remote as Array<{ movedMask: number }>).map((item) => item.movedMask)
    ))],
  },
};

await writeFile(path.join(root, "geometric_closure_v0.json"), `${JSON.stringify(report, null, 2)}\n`, "utf8");
process.stdout.write(`${JSON.stringify({
  placementOptionCounts: report.placementOptionCounts,
  subsetAssemblies: report.subsetAssemblies,
  subsetOriginsTested: report.subsetOriginsTested,
  relevantFullAssemblies: report.relevantFullAssemblies,
  fullOriginsTested: report.fullOriginsTested,
  assertions: report.assertions,
}, null, 2)}\n`);

function stateWithPlacements(placements: Placement[]): RealityAnchorState {
  return {
    ...base,
    player: { x: 8, y: 3 },
    crates: pistons.map((point) => ({ ...point })),
    stickyGroups: connectedComponents(placements.flatMap((placement) => placement.cells)),
  };
}

function pistonAdvanceMask(before: RealityAnchorState, after: RealityAnchorState): number {
  const beforeCrates = new Set(before.crates.map(pointKey));
  const afterCrates = new Set(after.crates.map(pointKey));
  return pistons.reduce((mask, piston, index) =>
    beforeCrates.has(pointKey(piston)) && afterCrates.has(pointKey(goals[index]!)) ? mask | (1 << index) : mask
  , 0);
}

function startsFromDirectCrate(events: string[]): boolean {
  const first = events.find((event) => event.startsWith("push_object:") || event.startsWith("pull_object:"));
  return first?.includes(":crate#") ?? false;
}

function overlaps(left: Point[], right: Point[]): boolean {
  const keys = new Set(left.map(pointKey));
  return right.some((cell) => keys.has(pointKey(cell)));
}

function objectKeys(current: RealityAnchorState): Set<string> {
  const keys = new Set(current.crates.map(pointKey));
  for (const group of current.stickyGroups) for (const cell of group) keys.add(pointKey(cell));
  if (current.pushPullAnchor) {
    keys.add(pointKey(current.pushPullAnchor.push));
    keys.add(pointKey(current.pushPullAnchor.pull));
  }
  if (current.boxStickyAnchor) {
    keys.add(pointKey(current.boxStickyAnchor.box));
    keys.add(pointKey(current.boxStickyAnchor.sticky));
  }
  return keys;
}

function isCovered(current: RealityAnchorState): boolean {
  const occupied = objectKeys(current);
  return goals.every((goal) => occupied.has(pointKey(goal)));
}

function connectedComponents(cells: Point[]): Point[][] {
  const byKey = new Map(cells.map((cell) => [pointKey(cell), cell]));
  const unseen = new Set(byKey.keys());
  const groups: Point[][] = [];
  while (unseen.size > 0) {
    const firstKey = unseen.values().next().value as string;
    unseen.delete(firstKey);
    const queue = [byKey.get(firstKey)!];
    const group: Point[] = [];
    for (let cursor = 0; cursor < queue.length; cursor += 1) {
      const cell = queue[cursor]!;
      group.push({ ...cell });
      for (const neighbor of [
        { x: cell.x + 1, y: cell.y }, { x: cell.x - 1, y: cell.y },
        { x: cell.x, y: cell.y + 1 }, { x: cell.x, y: cell.y - 1 },
      ]) {
        const key = pointKey(neighbor);
        if (!unseen.delete(key)) continue;
        queue.push(byKey.get(key)!);
      }
    }
    groups.push(group);
  }
  return groups;
}
