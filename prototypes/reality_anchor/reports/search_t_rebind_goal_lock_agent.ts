import { readFile } from "node:fs/promises";
import { eventMatchesPattern } from "../../../src/core/events.js";
import { loadPrototypePackage } from "../../../src/core/io.js";
import type { LevelDoc } from "../../../src/core/types.js";
import { getRuntimeAdapter } from "../../../src/prototypes/runtimeAdapter.js";

const layoutPath = process.argv[2];
const maxStates = Number(process.argv[3] ?? 500_000);
if (!layoutPath) throw new Error("Usage: search_t_rebind_goal_lock_agent.ts <layout-file> [max-states]");

const pkg = await loadPrototypePackage("prototypes/reality_anchor");
const adapter = getRuntimeAdapter(pkg.mechanic);
const runtime = adapter.createRuntime(pkg.mechanic);
const layout = (await readFile(layoutPath, "utf8")).replace(/\r/g, "").replace(/\n+$/g, "");
const level: LevelDoc = {
  id: "RA_T_REBIND_GOAL_LOCK_SEARCH",
  title: "RA_T_REBIND_GOAL_LOCK_SEARCH",
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

const initial = adapter.parseLevel(level) as any;
const states: any[] = [initial];
const stateIndex = new Map<string, number>([[runtime.key(initial), 0]]);
const edges: Array<Array<{ to: number; events: string[] }>> = [];
let cursor = 0;
while (cursor < states.length && states.length <= maxStates) {
  const state = states[cursor]!;
  const outgoing: Array<{ to: number; events: string[] }> = [];
  for (const input of runtime.actions(state, { winCondition: pkg.mechanic.win })) {
    const result = runtime.step(state, input, { winCondition: pkg.mechanic.win });
    if (!result.legal) continue;
    const key = runtime.key(result.state);
    let index = stateIndex.get(key);
    if (index === undefined) {
      index = states.length;
      stateIndex.set(key, index);
      states.push(result.state);
    }
    outgoing.push({ to: index, events: result.events });
  }
  edges[cursor] = outgoing;
  cursor += 1;
}
if (states.length > maxStates) {
  console.log(`graph=exhausted states=${states.length}`);
  process.exit(0);
}
console.log(`graph=complete states=${states.length}`);

const patterns = ["sticky_to_box:n3", "push_object:sticky#2"];
const reachableWithout = patterns.map((pattern) => {
  const seen = new Uint8Array(states.length);
  const queue = new Int32Array(states.length);
  let head = 0;
  let tail = 1;
  queue[0] = 0;
  seen[0] = 1;
  while (head < tail) {
    const from = queue[head++]!;
    for (const edge of edges[from] ?? []) {
      if (seen[edge.to] || edge.events.some((event) => eventMatchesPattern(event, pattern))) continue;
      seen[edge.to] = 1;
      queue[tail++] = edge.to;
    }
  }
  return seen;
});

const distance = new Int32Array(states.length);
distance.fill(-1);
const queue = new Int32Array(states.length);
let head = 0;
let tail = 1;
queue[0] = 0;
distance[0] = 0;
while (head < tail) {
  const from = queue[head++]!;
  for (const edge of edges[from] ?? []) {
    if (distance[edge.to] >= 0) continue;
    distance[edge.to] = distance[from]! + 1;
    queue[tail++] = edge.to;
  }
}

type Record = { count: number; state: number };
const coverCounts = new Map<string, Record>();
for (let index = 0; index < states.length; index += 1) {
  const state = states[index]!;
  const occupied = [
    ...state.crates,
    ...state.stickyGroups.flat(),
    ...(state.pushPullAnchor ? [state.pushPullAnchor.push, state.pushPullAnchor.pull] : []),
    ...(state.boxStickyAnchor ? [state.boxStickyAnchor.box, state.boxStickyAnchor.sticky] : []),
  ].map((point: { x: number; y: number }) => `${point.x},${point.y}`).sort();
  for (let a = 0; a < occupied.length - 3; a += 1) {
    for (let b = a + 1; b < occupied.length - 2; b += 1) {
      for (let c = b + 1; c < occupied.length - 1; c += 1) {
        for (let d = c + 1; d < occupied.length; d += 1) {
          const key = `${occupied[a]};${occupied[b]};${occupied[c]};${occupied[d]}`;
          const found = coverCounts.get(key);
          if (found) found.count += 1;
          else coverCounts.set(key, { count: 1, state: index });
        }
      }
    }
  }
}

const hits: Array<{ state: number; cost: number; goals: string }> = [];
for (const [goals, record] of coverCounts) {
  if (record.count !== 1) continue;
  const state = states[record.state]!;
  const materials = [...state.crates, ...state.stickyGroups.flat()]
    .map((point: { x: number; y: number }) => `${point.x},${point.y}`)
    .sort()
    .join(";");
  if (materials !== goals) continue;
  if (reachableWithout.some((seen) => seen[record.state])) continue;
  if (distance[record.state]! < 20) continue;
  hits.push({ state: record.state, cost: distance[record.state]!, goals });
}

hits.sort((left, right) => right.cost - left.cost || left.goals.localeCompare(right.goals));
console.log(`uniqueMaterialGoalLocks=${hits.length}`);
for (const hit of hits.slice(0, 100)) {
  console.log(`cost=${hit.cost} goals=${hit.goals} state=${hit.state}`);
}
