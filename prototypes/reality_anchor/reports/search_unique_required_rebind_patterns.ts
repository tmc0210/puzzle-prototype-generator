import { readFile } from "node:fs/promises";
import { eventMatchesPattern } from "../../../src/core/events.js";
import { loadPrototypePackage } from "../../../src/core/io.js";
import type { LevelDoc } from "../../../src/core/types.js";
import { getRuntimeAdapter } from "../../../src/prototypes/runtimeAdapter.js";

const layoutPath = process.argv[2];
const maxStates = Number(process.argv[3] ?? 500_000);
if (!layoutPath) {
  throw new Error("Usage: search_unique_required_rebind_patterns.ts <layout-file> [max-states]");
}

const requestedPatterns = process.argv.slice(4).filter(Boolean);
const requiredPatterns = requestedPatterns.length > 0
  ? requestedPatterns
  : ["sticky_to_box:n3", "push_object:sticky#2", "force_chain:n2"];
const pkg = await loadPrototypePackage("prototypes/reality_anchor");
const adapter = getRuntimeAdapter(pkg.mechanic);
const runtime = adapter.createRuntime(pkg.mechanic);
const layout = (await readFile(layoutPath, "utf8")).replace(/\r/g, "").replace(/\n+$/g, "");
const level: LevelDoc = {
  id: "RA_UNIQUE_REQUIRED_REBIND_SEARCH",
  title: "RA_UNIQUE_REQUIRED_REBIND_SEARCH",
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

const candidates = [
  [4, 4], [5, 4], [6, 4], [7, 4],
  [4, 5], [5, 5], [6, 5], [7, 5],
  [4, 6], [5, 6], [6, 6], [7, 6],
] as const;
const pointBits = new Map(candidates.map(([x, y], index) => [`${x},${y}`, 1 << index]));

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

const occupancy = new Uint16Array(states.length);
for (let index = 0; index < states.length; index += 1) {
  const state = states[index]!;
  let mask = 0;
  const occupied = [
    ...state.crates,
    ...state.stickyGroups.flat(),
    ...(state.pushPullAnchor ? [state.pushPullAnchor.push, state.pushPullAnchor.pull] : []),
    ...(state.boxStickyAnchor ? [state.boxStickyAnchor.box, state.boxStickyAnchor.sticky] : []),
  ];
  for (const point of occupied) mask |= pointBits.get(`${point.x},${point.y}`) ?? 0;
  occupancy[index] = mask;
}

const reachableWithout = new Map<string, Uint8Array>();
for (const pattern of requiredPatterns) {
  const seen = new Uint8Array(states.length);
  const queue = new Int32Array(states.length);
  let head = 0;
  let tail = 1;
  queue[0] = 0;
  seen[0] = 1;
  while (head < tail) {
    const from = queue[head++]!;
    for (const edge of edges[from] ?? []) {
      if (edge.events.some((event) => eventMatchesPattern(event, pattern)) || seen[edge.to]) continue;
      seen[edge.to] = 1;
      queue[tail++] = edge.to;
    }
  }
  reachableWithout.set(pattern, seen);
}

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

const hits: Array<{ mask: number; cost: number; winIndex: number }> = [];
for (let a = 0; a < candidates.length - 3; a += 1) {
  for (let b = a + 1; b < candidates.length - 2; b += 1) {
    for (let c = b + 1; c < candidates.length - 1; c += 1) {
      for (let d = c + 1; d < candidates.length; d += 1) {
        const goalMask = (1 << a) | (1 << b) | (1 << c) | (1 << d);
        if ((occupancy[0]! & goalMask) === goalMask) continue;
        const wins: number[] = [];
        for (let index = 0; index < occupancy.length; index += 1) {
          if ((occupancy[index]! & goalMask) === goalMask) wins.push(index);
          if (wins.length > 1) break;
        }
        if (wins.length !== 1) continue;
        const winIndex = wins[0]!;
        const cost = distance[winIndex]!;
        if (cost < 20) continue;
        const allRequired = requiredPatterns.every((pattern) => {
          const seen = reachableWithout.get(pattern)!;
          for (let index = 0; index < occupancy.length; index += 1) {
            if (seen[index] && (occupancy[index]! & goalMask) === goalMask) return false;
          }
          return true;
        });
        if (allRequired) hits.push({ mask: goalMask, cost, winIndex });
      }
    }
  }
}

hits.sort((left, right) => right.cost - left.cost || left.mask - right.mask);
console.log(`uniqueRequiredPatterns=${hits.length}`);
for (const hit of hits.slice(0, 100)) {
  const goals = candidates.filter((_, index) => (hit.mask & (1 << index)) !== 0);
  console.log(`cost=${hit.cost} goals=${goals.map(([x, y]) => `${x},${y}`).join(";")} winIndex=${hit.winIndex}`);
}
