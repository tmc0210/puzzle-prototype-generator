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
  "prototypes/reality_anchor/reports/explorer_giant_assembly_piston_challenge_20260715/exploration/runs/preassembly_gate_r7",
);
const layout = (await readFile(path.join(root, "layouts/preassembly_gate_r7_v0.layout.txt"), "utf8")).trimEnd();
const pkg = await loadPrototypePackage(path.resolve("prototypes/reality_anchor"));
const base = parseLevel({ id: "preassembly_gate_subset_geometry", title: "preassembly_gate_subset_geometry", layout } satisfies LevelDoc);
const pistons: Point[] = [{ x: 10, y: 4 }, { x: 10, y: 8 }];
const goals: Point[] = [{ x: 11, y: 4 }, { x: 11, y: 8 }];

const shapes: Record<PieceId, Point[]> = {
  H: [
    { x: 0, y: 0 }, { x: 1, y: 0 },
    { x: 0, y: 1 }, { x: 0, y: 2 }, { x: 0, y: 3 },
    { x: 0, y: 4 }, { x: 1, y: 4 },
  ],
  R: [
    { x: 3, y: 0 }, { x: 3, y: 1 }, { x: 3, y: 2 },
    { x: 0, y: 3 }, { x: 1, y: 3 }, { x: 2, y: 3 }, { x: 3, y: 3 },
  ],
  T: [0, 1, 2, 3].map((x) => ({ x, y: 0 })),
};

const fixedOccupied = new Set([
  ...pistons.map(pointKey),
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
      // B/S 初态黏侧为 x<=9；超过边界的形态已不再是“该实际黏块组件”。
      if (cells.every((cell) =>
        cell.x <= 9 && !base.walls.has(pointKey(cell)) && !fixedOccupied.has(pointKey(cell))
      )) options.push({ id, origin: { x, y }, cells });
    }
  }
  placementOptions.set(id, options);
}

const subsets: Placement[][] = [];
for (const id of Object.keys(shapes) as PieceId[]) {
  for (const placement of placementOptions.get(id) ?? []) subsets.push([placement]);
}
for (const [leftId, rightId] of [["H", "R"], ["H", "T"], ["R", "T"]] as Array<[PieceId, PieceId]>) {
  for (const left of placementOptions.get(leftId) ?? []) {
    for (const right of placementOptions.get(rightId) ?? []) {
      if (!overlaps(left.cells, right.cells)) subsets.push([left, right]);
    }
  }
}

let contactRelevantSubsets = 0;
let forceOriginsTested = 0;
const remoteTransitions: Array<Record<string, unknown>> = [];
const remoteCountsByMask = new Map<number, number>();

for (const placements of subsets) {
  const occupied = new Set(placements.flatMap((placement) => placement.cells).map(pointKey));
  if (!occupied.has("9,4") && !occupied.has("9,8")) continue;
  contactRelevantSubsets += 1;
  const candidate = stateWithPlacements(placements);
  const objectKeys = occupiedKeys(candidate);
  for (const origin of floorCells) {
    if (objectKeys.has(pointKey(origin))) continue;
    forceOriginsTested += 1;
    const before = { ...candidate, player: { ...origin } };
    const result = step(pkg.mechanic, before, "right");
    if (!result.legal || startsFromDirectCrate(result.events)) continue;
    const movedMask = pistonAdvanceMask(before, result.state);
    if (movedMask === 0) continue;
    remoteCountsByMask.set(movedMask, (remoteCountsByMask.get(movedMask) ?? 0) + 1);
    if (remoteTransitions.length < 100) {
      remoteTransitions.push({
        pieces: placements.map((placement) => placement.id),
        origins: placements.map((placement) => placement.origin),
        player: origin,
        forceMode: forceModeAt(before, origin),
        movedMask,
        events: result.events,
      });
    }
  }
}

const report = {
  schema: "ra_preassembly_gate_actual_proper_subset_geometry_v0",
  quantifiedDomain: [
    "只量化本关实际供应、固定朝向的 H7/R7/T4；不泛化到任意更小多格形",
    "每个单件与每个二件 proper subset 的全部地形合法平移",
    "二件允许相邻后自动粘合，也允许保持分离",
    "每个几何可站立玩家格的 +x 真实施力；包括从真实开局不可达的施力源，是可达集上界",
    "B/S 初态黏侧 x<=9；跨到 box 侧后已不再是原 supplied sticky component，且实际相位图已证明终拍前无 B/S 事件",
  ],
  placementOptionCounts: Object.fromEntries(
    (Object.keys(shapes) as PieceId[]).map((id) => [id, placementOptions.get(id)?.length ?? 0]),
  ),
  subsetPlacements: subsets.length,
  contactRelevantSubsets,
  forceOriginsTested,
  remoteCountsByMask: Object.fromEntries([...remoteCountsByMask.entries()].sort((a, b) => a[0] - b[0])),
  assertions: {
    actualProperSubsetRemotePistonTransitions: [...remoteCountsByMask.values()].reduce((sum, count) => sum + count, 0),
    actualProperSubsetRemoteAllTransitions: remoteCountsByMask.get(3) ?? 0,
  },
  remoteTransitions,
};

await writeFile(path.join(root, "proper_subset_geometry_v0.json"), `${JSON.stringify(report, null, 2)}\n`, "utf8");
process.stdout.write(`${JSON.stringify({
  placementOptionCounts: report.placementOptionCounts,
  subsetPlacements: report.subsetPlacements,
  contactRelevantSubsets,
  forceOriginsTested,
  remoteCountsByMask: report.remoteCountsByMask,
  assertions: report.assertions,
  firstRemote: remoteTransitions[0] ?? null,
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

function occupiedKeys(state: RealityAnchorState): Set<string> {
  const keys = new Set(state.crates.map(pointKey));
  for (const group of state.stickyGroups) for (const cell of group) keys.add(pointKey(cell));
  if (state.pushPullAnchor) {
    keys.add(pointKey(state.pushPullAnchor.push));
    keys.add(pointKey(state.pushPullAnchor.pull));
  }
  if (state.boxStickyAnchor) {
    keys.add(pointKey(state.boxStickyAnchor.box));
    keys.add(pointKey(state.boxStickyAnchor.sticky));
  }
  return keys;
}

function overlaps(left: Point[], right: Point[]): boolean {
  const keys = new Set(left.map(pointKey));
  return right.some((cell) => keys.has(pointKey(cell)));
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
