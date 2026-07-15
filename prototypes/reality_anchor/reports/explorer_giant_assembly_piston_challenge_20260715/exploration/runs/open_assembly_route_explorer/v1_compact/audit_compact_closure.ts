import assert from "node:assert/strict";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import { loadPrototypePackage } from "../../../../../../../../src/core/io.js";
import type { InputId, LevelDoc, Point } from "../../../../../../../../src/core/types.js";
import {
  forceModeAt,
  parseLevel,
  pointKey,
  step,
  type RealityAnchorState,
} from "../../../../../../../../src/prototypes/reality_anchor/mechanics.js";

type PieceId = "H" | "R" | "T";
type Placement = { id: PieceId; origin: Point; cells: Point[] };

const root = path.resolve(
  "prototypes/reality_anchor/reports/explorer_giant_assembly_piston_challenge_20260715/exploration/runs/open_assembly_route_explorer/v1_compact",
);
const layout = (await readFile(path.join(root, "layouts/open_assembly_compact.layout.txt"), "utf8")).trimEnd();
const audit = JSON.parse(await readFile(path.join(root, "audit_compact.json"), "utf8")) as { intendedInputs: InputId[] };
const pkg = await loadPrototypePackage(path.resolve("prototypes/reality_anchor"));
const base = parseLevel({ id: "compact_closure", title: "compact_closure", layout } satisfies LevelDoc);

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
  ...pistons.map(pointKey), ...goals.map(pointKey),
  ...(base.pushPullAnchor ? [pointKey(base.pushPullAnchor.push), pointKey(base.pushPullAnchor.pull)] : []),
  ...(base.boxStickyAnchor ? [pointKey(base.boxStickyAnchor.box), pointKey(base.boxStickyAnchor.sticky)] : []),
]);

const options = new Map<PieceId, Placement[]>();
for (const id of Object.keys(shapes) as PieceId[]) {
  const placements: Placement[] = [];
  for (let y = 0; y < base.height; y += 1) {
    for (let x = 0; x < base.width; x += 1) {
      const cells = shapes[id].map((cell) => ({ x: x + cell.x, y: y + cell.y }));
      if (cells.every((cell) => !base.walls.has(pointKey(cell)) && !fixedOccupied.has(pointKey(cell)))) {
        placements.push({ id, origin: { x, y }, cells });
      }
    }
  }
  options.set(id, placements);
}

const properAssemblies: Placement[][] = [];
for (const id of Object.keys(shapes) as PieceId[]) {
  for (const placement of options.get(id) ?? []) properAssemblies.push([placement]);
}
for (const [leftId, rightId] of [["H", "R"], ["H", "T"], ["R", "T"]] as Array<[PieceId, PieceId]>) {
  for (const left of options.get(leftId) ?? []) {
    for (const right of options.get(rightId) ?? []) {
      if (!overlaps(left.cells, right.cells)) properAssemblies.push([left, right]);
    }
  }
}

let properForceOrigins = 0;
const properRemote: Array<Record<string, unknown>> = [];
for (const placements of properAssemblies) {
  const candidate = stateWithPlacements(placements);
  for (const player of forceOrigins(candidate)) {
    properForceOrigins += 1;
    const before = { ...candidate, player };
    const result = step(pkg.mechanic, before, "right");
    if (!result.legal || startsFromDirectCrate(result.events)) continue;
    const movedMask = pistonAdvanceMask(before, result.state);
    if (movedMask === 0) continue;
    properRemote.push({
      pieces: placements.map((placement) => placement.id),
      origins: placements.map((placement) => placement.origin),
      player,
      mode: forceModeAt(before, player),
      movedMask,
      events: result.events,
    });
  }
}

let relevantFullAssemblies = 0;
let fullForceOrigins = 0;
const fullRemote: Array<Record<string, unknown>> = [];
for (const h of options.get("H") ?? []) {
  for (const r of options.get("R") ?? []) {
    if (overlaps(h.cells, r.cells)) continue;
    for (const t of options.get("T") ?? []) {
      if (overlaps(h.cells, t.cells) || overlaps(r.cells, t.cells)) continue;
      const placements = [h, r, t];
      const occupied = new Set(placements.flatMap((placement) => placement.cells).map(pointKey));
      // A first +x remote piston advance requires a supplied cell immediately left of a C.
      if (!occupied.has("9,4") && !occupied.has("9,8")) continue;
      relevantFullAssemblies += 1;
      const candidate = stateWithPlacements(placements);
      for (const player of forceOrigins(candidate)) {
        fullForceOrigins += 1;
        const before = { ...candidate, player };
        const result = step(pkg.mechanic, before, "right");
        if (!result.legal || startsFromDirectCrate(result.events)) continue;
        const movedMask = pistonAdvanceMask(before, result.state);
        if (movedMask === 0) continue;
        fullRemote.push({
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

// Replay the intended construction and retain one state per distinct full-giant topY.
let replayState = base;
const fullHeights = new Map<number, RealityAnchorState>();
for (const [index, input] of audit.intendedInputs.entries()) {
  const result = step(pkg.mechanic, replayState, input);
  assert.equal(result.legal, true, `intended compact input ${index + 1} became illegal`);
  replayState = result.state;
  const fullGroup = replayState.stickyGroups.find((group) => group.length === 15);
  if (fullGroup && !isCovered(replayState)) {
    const topY = Math.min(...fullGroup.map((cell) => cell.y));
    if (!fullHeights.has(topY)) fullHeights.set(topY, replayState);
  }
  if (isCovered(replayState)) break;
}

const heightScans = [...fullHeights.entries()].sort(([left], [right]) => right - left).map(([topY, heightState]) => {
  const remote = [];
  for (const player of forceOrigins(heightState)) {
    const before = { ...heightState, player };
    const result = step(pkg.mechanic, before, "right");
    if (!result.legal || startsFromDirectCrate(result.events)) continue;
    const movedMask = pistonAdvanceMask(before, result.state);
    if (movedMask !== 0) remote.push({ player, movedMask, events: result.events });
  }
  return { topY, remote };
});

assert.equal(properRemote.length, 0, "proper supplied subset remotely advances a piston");
assert.equal(fullRemote.length, 1, "expected exactly one full-kit remote transition");
assert.deepEqual(fullRemote[0]?.origins, [
  { id: "H", x: 8, y: 4 },
  { id: "R", x: 8, y: 9 },
  { id: "T", x: 4, y: 12 },
]);
assert.deepEqual(fullRemote[0]?.player, { x: 3, y: 12 });
assert.equal(fullRemote[0]?.movedMask, 3);
assert.deepEqual(heightScans.map((scan) => scan.topY), [9, 8, 7, 6, 5, 4]);
assert.equal(heightScans.filter((scan) => scan.topY !== 4).flatMap((scan) => scan.remote).length, 0);
assert.deepEqual([...new Set(heightScans.find((scan) => scan.topY === 4)?.remote.map((item) => item.movedMask))], [3]);
assert.equal(heightScans.find((scan) => scan.topY === 8)?.remote.length, 0, "single-tooth alignment at topY=8 is unsafe");

const report = {
  schema: "ra_open_assembly_compact_closure_v1",
  quantifiedDomain: [
    "actual fixed-orientation H/R/T",
    "every terrain-legal translation of all one/two-piece proper subsets",
    "every contact-relevant terrain-legal full-kit translation",
    "every runtime-capable +x push/pull force origin",
    "all six distinct full-giant heights topY=9..4",
  ],
  placementOptionCounts: Object.fromEntries((Object.keys(shapes) as PieceId[]).map((id) => [id, options.get(id)?.length ?? 0])),
  properAssemblies: properAssemblies.length,
  properForceOrigins,
  properRemote,
  relevantFullAssemblies,
  fullForceOrigins,
  fullRemote,
  heightScans,
  assertions: {
    properRemoteAdvances: properRemote.length,
    fullRemoteTransitions: fullRemote.length,
    fullWrongGeometryRemoteTransitions: fullRemote.filter((entry) => JSON.stringify(entry.origins) !== JSON.stringify([
      { id: "H", x: 8, y: 4 }, { id: "R", x: 8, y: 9 }, { id: "T", x: 4, y: 12 },
    ])).length,
    intermediateHeightRemoteAdvances: heightScans.filter((scan) => scan.topY !== 4).flatMap((scan) => scan.remote).length,
    singleToothTopY8RemoteAdvances: heightScans.find((scan) => scan.topY === 8)?.remote.length ?? -1,
    registeredMasks: [...new Set(heightScans.find((scan) => scan.topY === 4)?.remote.map((item) => item.movedMask))],
  },
};

await writeFile(path.join(root, "closure_compact.json"), `${JSON.stringify(report, null, 2)}\n`, "utf8");
process.stdout.write(`${JSON.stringify({
  placementOptionCounts: report.placementOptionCounts,
  properAssemblies: report.properAssemblies,
  properForceOrigins: report.properForceOrigins,
  relevantFullAssemblies: report.relevantFullAssemblies,
  fullForceOrigins: report.fullForceOrigins,
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

function forceOrigins(state: RealityAnchorState): Point[] {
  const occupied = objectKeys(state);
  const objectCells: Point[] = [
    ...state.crates,
    ...state.stickyGroups.flat(),
    ...(state.pushPullAnchor ? [state.pushPullAnchor.push, state.pushPullAnchor.pull] : []),
    ...(state.boxStickyAnchor ? [state.boxStickyAnchor.box, state.boxStickyAnchor.sticky] : []),
  ];
  const result = new Map<string, Point>();
  for (const cell of objectCells) {
    for (const x of [cell.x - 1, cell.x + 1]) {
      const point = { x, y: cell.y };
      const key = pointKey(point);
      if (x < 0 || x >= state.width || state.walls.has(key) || occupied.has(key)) continue;
      result.set(key, point);
    }
  }
  return [...result.values()];
}

function pistonAdvanceMask(before: RealityAnchorState, after: RealityAnchorState): number {
  const beforeCrates = new Set(before.crates.map(pointKey));
  const afterCrates = new Set(after.crates.map(pointKey));
  return pistons.reduce((mask, piston, index) =>
    beforeCrates.has(pointKey(piston)) && afterCrates.has(pointKey(goals[index]!)) ? mask | (1 << index) : mask
  , 0);
}

function startsFromDirectCrate(events: string[]): boolean {
  const event = events.find((item) => item.startsWith("push_object:") || item.startsWith("pull_object:"));
  return event?.includes(":crate#") ?? false;
}

function objectKeys(state: RealityAnchorState): Set<string> {
  const result = new Set(state.crates.map(pointKey));
  for (const group of state.stickyGroups) for (const cell of group) result.add(pointKey(cell));
  if (state.pushPullAnchor) {
    result.add(pointKey(state.pushPullAnchor.push));
    result.add(pointKey(state.pushPullAnchor.pull));
  }
  if (state.boxStickyAnchor) {
    result.add(pointKey(state.boxStickyAnchor.box));
    result.add(pointKey(state.boxStickyAnchor.sticky));
  }
  return result;
}

function isCovered(state: RealityAnchorState): boolean {
  const occupied = objectKeys(state);
  return goals.every((goal) => occupied.has(pointKey(goal)));
}

function overlaps(left: Point[], right: Point[]): boolean {
  const occupied = new Set(left.map(pointKey));
  return right.some((cell) => occupied.has(pointKey(cell)));
}

function connectedComponents(cells: Point[]): Point[][] {
  const byKey = new Map(cells.map((cell) => [pointKey(cell), cell]));
  const unseen = new Set(byKey.keys());
  const groups: Point[][] = [];
  while (unseen.size > 0) {
    const first = unseen.values().next().value as string;
    unseen.delete(first);
    const queue = [byKey.get(first)!];
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
