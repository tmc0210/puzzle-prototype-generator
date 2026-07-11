import { readFile } from "node:fs/promises";
import { eventMatchesPattern } from "../../../src/core/events.js";
import { loadPrototypePackage } from "../../../src/core/io.js";
import type { InputId, LevelDoc } from "../../../src/core/types.js";
import { getRuntimeAdapter } from "../../../src/prototypes/runtimeAdapter.js";

const layoutPath = process.argv[2];
const maxStates = Number(process.argv[3] ?? 500_000);
if (!layoutPath) throw new Error("Usage: search_strict_central_goal_pairs_agent.ts <layout> [maxStates]");

const pkg = await loadPrototypePackage("prototypes/reality_anchor");
const adapter = getRuntimeAdapter(pkg.mechanic);
const runtime = adapter.createRuntime(pkg.mechanic);
const layout = (await readFile(layoutPath, "utf8")).replace(/\r/g, "").replace(/\n+$/g, "");
const lines = layout.split("\n");
const level: LevelDoc = {
  id: "RA_STRICT_CENTRAL_GOAL_PAIR_SEARCH",
  title: "RA_STRICT_CENTRAL_GOAL_PAIR_SEARCH",
  role: "challenge",
  status: "candidate",
  targets: [],
  known_before: ["K_runtime_smoke"],
  target_learning: ["K_runtime_smoke"],
  support_level: "none",
  expected_solver_evidence: ["solvable"],
  expected_llm_player_evidence: [],
  layout,
};

const points: Array<{ x: number; y: number }> = [];
for (let y = 0; y < lines.length; y += 1) {
  for (let x = 0; x < lines[y]!.length; x += 1) {
    if (lines[y]![x] !== "#") points.push({ x, y });
  }
}
const bit = new Map(points.map((point, index) => [`${point.x},${point.y}`, 1n << BigInt(index)]));
const central = [{ x: 5, y: 4 }, { x: 6, y: 4 }, { x: 5, y: 5 }, { x: 6, y: 5 }];
const centralMask = maskPoints(central);
const anchorGoalCandidates = points.filter(({ x, y }) => x >= 8 && !central.some((point) => point.x === x && point.y === y));

const initial = adapter.parseLevel(level) as any;
const states: any[] = [initial];
const stateIndex = new Map<string, number>([[runtime.key(initial), 0]]);
const predecessor: Array<{ before: number; input: InputId; events: string[] } | undefined> = [undefined];
const distance: number[] = [0];
const edges: number[][] = [];
let cursor = 0;
while (cursor < states.length && states.length <= maxStates) {
  const state = states[cursor]!;
  const outgoing: number[] = [];
  for (const input of runtime.actions(state, { winCondition: pkg.mechanic.win }) as InputId[]) {
    const step = runtime.step(state, input, { winCondition: pkg.mechanic.win });
    if (!step.legal) continue;
    const key = runtime.key(step.state);
    let index = stateIndex.get(key);
    if (index === undefined) {
      index = states.length;
      stateIndex.set(key, index);
      states.push(step.state);
      predecessor[index] = { before: cursor, input, events: step.events };
      distance[index] = distance[cursor]! + 1;
    }
    outgoing.push(index);
  }
  edges[cursor] = outgoing;
  cursor += 1;
}
if (states.length > maxStates) {
  console.log(`graph=exhausted states=${states.length}`);
  process.exit(0);
}
console.log(`graph=complete states=${states.length} anchorGoalCandidates=${anchorGoalCandidates.length}`);

const occupancy = states.map(maskOccupancy);
const centralCovered = occupancy.map((mask) => (mask & centralMask) === centralMask);
let uniquePairs = 0;
let qualified = 0;
for (let a = 0; a < anchorGoalCandidates.length - 1; a += 1) {
  for (let b = a + 1; b < anchorGoalCandidates.length; b += 1) {
    const pair = [anchorGoalCandidates[a]!, anchorGoalCandidates[b]!];
    const goalMask = centralMask | maskPoints(pair);
    let winner = -1;
    let wins = 0;
    const seen = new Uint8Array(states.length);
    const queue = new Int32Array(states.length);
    let head = 0;
    let tail = 1;
    queue[0] = 0;
    seen[0] = 1;
    while (head < tail) {
      const index = queue[head++]!;
      if (index !== 0 && centralCovered[index] && (occupancy[index]! & goalMask) === goalMask) {
        winner = index;
        wins += 1;
        if (wins > 1) break;
        continue;
      }
      for (const to of edges[index] ?? []) {
        if (seen[to]) continue;
        seen[to] = 1;
        queue[tail++] = to;
      }
    }
    if (wins !== 1) continue;
    uniquePairs += 1;
    const trace = reconstruct(winner);
    const shiftCount = count(trace.events, "anchor_boundary_shift:box_sticky");
    const brush2Count = count(trace.events, "box_to_sticky:n2");
    const required = ["pull_object:crate#", "pull_object:sticky#", "force_chain", "move_sticky_rigid", "sticky_to_box:n2"];
    console.log(`UNIQUE pair=${pair.map(({ x, y }) => `${x},${y}`).join(";")} cost=${distance[winner]} shifts=${shiftCount} brush2=${brush2Count} core=${required.map((pattern) => `${pattern}:${count(trace.events, pattern)}`).join(",")}`);
    if (shiftCount < 4 || brush2Count < 2 || !required.every((pattern) => count(trace.events, pattern) >= 1)) continue;
    qualified += 1;
    console.log(`HIT pair=${pair.map(({ x, y }) => `${x},${y}`).join(";")} cost=${distance[winner]} shifts=${shiftCount} brush2=${brush2Count} winner=${winner}`);
    console.log(`inputs=${trace.inputs.join(" ")}`);
    console.log(`events=${trace.events.join(" ")}`);
  }
}
console.log(`SUMMARY uniquePairs=${uniquePairs} qualified=${qualified}`);

function maskPoints(input: Array<{ x: number; y: number }>): bigint {
  let mask = 0n;
  for (const point of input) mask |= bit.get(`${point.x},${point.y}`) ?? 0n;
  return mask;
}

function maskOccupancy(state: any): bigint {
  const occupied = [
    ...state.crates,
    ...state.stickyGroups.flat(),
    ...(state.pushPullAnchor ? [state.pushPullAnchor.push, state.pushPullAnchor.pull] : []),
    ...(state.boxStickyAnchor ? [state.boxStickyAnchor.box, state.boxStickyAnchor.sticky] : []),
  ];
  return maskPoints(occupied);
}

function reconstruct(index: number): { inputs: InputId[]; events: string[] } {
  const inputs: InputId[] = [];
  const eventSteps: string[][] = [];
  let at = index;
  while (at !== 0) {
    const edge = predecessor[at]!;
    inputs.push(edge.input);
    eventSteps.push(edge.events);
    at = edge.before;
  }
  inputs.reverse();
  eventSteps.reverse();
  return { inputs, events: eventSteps.flat() };
}

function count(events: string[], pattern: string): number {
  return events.filter((event) => pattern.endsWith("#") ? event.startsWith(pattern) : eventMatchesPattern(event, pattern)).length;
}
