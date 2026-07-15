import { readFile } from "node:fs/promises";
import { loadPrototypePackage } from "../../../../../../src/core/io.js";
import { getRuntimeAdapter } from "../../../../../../src/prototypes/runtimeAdapter.js";
import {
  cloneState,
  pointKey,
  type RealityAnchorState,
} from "../../../../../../src/prototypes/reality_anchor/mechanics.js";

const prototypeRoot = "prototypes/reality_anchor";
const layoutPath = process.argv[2] ??
  "prototypes/reality_anchor/reports/studio_giant_sticky_piston_order_20260715/" +
  "exploration/piston_contradiction_reforge/reforge_mask_v5.txt";
const maxStates = Number(process.argv[3] ?? 50_000);
const maxObjectDepth = Number(process.argv[4] ?? 7);

const pkg = await loadPrototypePackage(prototypeRoot);
const adapter = getRuntimeAdapter(pkg.mechanic);
const runtime = adapter.createRuntime(pkg.mechanic);
const layout = (await readFile(layoutPath, "utf8")).replace(/\r/g, "").replace(/\n+$/g, "");
const parsed = adapter.parseLevel({ id: "REFORGE_MACRO_AUDIT", title: "REFORGE_MACRO_AUDIT", layout });
const winCondition = pkg.mechanic.win;
const directions = ["up", "down", "left", "right"] as const;

type WalkReach = {
  player: { x: number; y: number };
  inputs: string[];
};

type Canonicalized = {
  state: RealityAnchorState;
  key: string;
  reach: WalkReach[];
};

type MacroEdge = {
  exactInputs: string[];
  action: string;
  events: string[];
  summary: string;
};

type Node = {
  state: RealityAnchorState;
  key: string;
  reach: WalkReach[];
  depth: number;
  parent?: number;
  edge?: MacroEdge;
};

const initial = canonicalize(parsed);
const nodes: Node[] = [{ ...initial, depth: 0 }];
const visited = new Map<string, number>([[initial.key, 0]]);
const wins: number[] = [];
let cursor = 0;
let macroTransitions = 0;
let duplicateTransitions = 0;

while (cursor < nodes.length && nodes.length < maxStates) {
  const node = nodes[cursor]!;
  if (node.depth < maxObjectDepth && !runtime.isWin(node.state, winCondition)) {
    const emitted = new Set<string>();
    for (const reachable of node.reach) {
      for (const action of directions) {
        const stanceState = cloneState(node.state);
        stanceState.player = reachable.player;
        const transition = runtime.step(stanceState, action, { winCondition });
        if (!transition.legal || transition.events.every((event) => event === "walk")) continue;
        const next = canonicalize(transition.state);
        const localKey = `${next.key}|${action}|${transition.events.join("+")}`;
        if (emitted.has(localKey)) continue;
        emitted.add(localKey);
        macroTransitions += 1;
        if (visited.has(next.key)) {
          duplicateTransitions += 1;
          continue;
        }
        const index = nodes.length;
        visited.set(next.key, index);
        nodes.push({
          ...next,
          depth: node.depth + 1,
          parent: cursor,
          edge: {
            exactInputs: [...reachable.inputs, action],
            action,
            events: transition.events,
            summary: summarizeTransition(node.state, transition.state, action, transition.events),
          },
        });
        if (runtime.isWin(transition.state, winCondition)) wins.push(index);
        if (nodes.length >= maxStates) break;
      }
      if (nodes.length >= maxStates) break;
    }
  }
  cursor += 1;
}

const planGroups = new Map<string, { count: number; witness: ReturnType<typeof reconstruct> }>();
for (const index of wins) {
  const witness = reconstruct(index);
  const key = logicalPlanKey(witness.objectPlan);
  const current = planGroups.get(key);
  if (current) current.count += 1;
  else planGroups.set(key, { count: 1, witness });
}

console.log(JSON.stringify({
  layoutPath,
  status: nodes.length >= maxStates ? "exhausted" : "complete_to_depth",
  maxStates,
  maxObjectDepth,
  macroStates: nodes.length,
  macroTransitions,
  duplicateTransitions,
  rawWins: wins.length,
  shortestWinningObjectDepth: wins.length > 0 ? Math.min(...wins.map((index) => nodes[index]!.depth)) : null,
  winningLogicalPlanGroups: [...planGroups.entries()].map(([logicalPlanKey, value]) => ({
    logicalPlanKey,
    count: value.count,
    witness: value.witness,
  })),
}, null, 2));

function canonicalize(start: RealityAnchorState): Canonicalized {
  const queue: WalkReach[] = [{ player: start.player, inputs: [] }];
  const seen = new Set<string>([pointKey(start.player)]);
  const occupied = occupiedCells(start);
  for (let cursor = 0; cursor < queue.length; cursor += 1) {
    const current = queue[cursor]!;
    for (const action of directions) {
      const player = movedPoint(current.player, action);
      const playerKey = pointKey(player);
      if (player.x < 0 || player.y < 0 || player.x >= start.width || player.y >= start.height ||
          start.walls.has(playerKey) || occupied.has(playerKey)) continue;
      if (seen.has(playerKey)) continue;
      seen.add(playerKey);
      queue.push({ player, inputs: [...current.inputs, action] });
    }
  }
  queue.sort((a, b) => a.player.y - b.player.y || a.player.x - b.player.x);
  const representative = cloneState(start);
  representative.player = queue[0]!.player;
  const component = queue.map((entry) => pointKey(entry.player)).sort().join(";");
  return {
    state: representative,
    key: `${objectKey(representative)}|Reach:${component}`,
    reach: queue,
  };
}

function reconstruct(index: number) {
  const edges: MacroEdge[] = [];
  let current: number | undefined = index;
  while (current !== undefined) {
    const node = nodes[current]!;
    if (node.edge) edges.push(node.edge);
    current = node.parent;
  }
  edges.reverse();
  return {
    objectDepth: edges.length,
    exactInputs: edges.flatMap((edge) => edge.exactInputs),
    objectPlan: edges.map((edge) => ({
      action: edge.action,
      events: edge.events,
      summary: edge.summary,
    })),
  };
}

function summarizeTransition(
  before: RealityAnchorState,
  after: RealityAnchorState,
  action: string,
  events: string[],
): string {
  if (before.boxStickyAnchor && after.boxStickyAnchor &&
      (pointKey(before.boxStickyAnchor.box) !== pointKey(after.boxStickyAnchor.box) ||
       pointKey(before.boxStickyAnchor.sticky) !== pointKey(after.boxStickyAnchor.sticky))) {
    return `BS:${pointKey(before.boxStickyAnchor.box)}/${pointKey(before.boxStickyAnchor.sticky)}` +
      `->${pointKey(after.boxStickyAnchor.box)}/${pointKey(after.boxStickyAnchor.sticky)}`;
  }
  const beforeCrates = new Set(before.crates.map(pointKey));
  const afterCrates = new Set(after.crates.map(pointKey));
  const removed = [...beforeCrates].filter((key) => !afterCrates.has(key)).sort();
  const added = [...afterCrates].filter((key) => !beforeCrates.has(key)).sort();
  if (removed.length > 0 || added.length > 0) {
    return `C:${removed.join(";")}->${added.join(";")}`;
  }
  return `${action}:${events.join("+")}`;
}

function logicalPlanKey(plan: Array<{ summary: string }>): string {
  const summaries = plan.map((step) => step.summary);
  const firstBoundary = summaries.findIndex((summary) => summary.startsWith("BS:"));
  const finalBoundary = summaries.findLastIndex((summary) => summary.startsWith("BS:"));
  const middle = summaries
    .slice(firstBoundary + 1, finalBoundary)
    .filter((summary) => summary.startsWith("C:"))
    .sort();
  return [
    summaries[firstBoundary] ?? "no_open_boundary",
    ...middle,
    summaries[finalBoundary] ?? "no_close_boundary",
    summaries.at(-1) ?? "no_final",
  ].join(" | ");
}

function objectKey(state: RealityAnchorState): string {
  return runtime.key(state).replace(/^Ply:[^|]*\|/, "");
}

function occupiedCells(state: RealityAnchorState): Set<string> {
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
  return occupied;
}

function movedPoint(point: { x: number; y: number }, action: typeof directions[number]) {
  if (action === "up") return { x: point.x, y: point.y - 1 };
  if (action === "down") return { x: point.x, y: point.y + 1 };
  if (action === "left") return { x: point.x - 1, y: point.y };
  return { x: point.x + 1, y: point.y };
}
