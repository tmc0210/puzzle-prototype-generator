import { readFile } from "node:fs/promises";
import { loadPrototypePackage } from "../../../src/core/io.js";
import type { LevelDoc } from "../../../src/core/types.js";
import { getRuntimeAdapter } from "../../../src/prototypes/runtimeAdapter.js";

const layoutPath = process.argv[2];
const maxStates = Number(process.argv[3] ?? 500_000);
if (!layoutPath) throw new Error("Usage: search_unique_goal_patterns_agent.ts <layout-file> [max-states]");

const pkg = await loadPrototypePackage("prototypes/reality_anchor");
const adapter = getRuntimeAdapter(pkg.mechanic);
const runtime = adapter.createRuntime(pkg.mechanic);
const layout = (await readFile(layoutPath, "utf8")).replace(/\r/g, "").replace(/\n+$/g, "");
const level: LevelDoc = {
  id: "RA_UNIQUE_GOAL_SEARCH",
  title: "RA_UNIQUE_GOAL_SEARCH",
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
const initialKey = runtime.key(initial);
const states: any[] = [initial];
const keys = [initialKey];
const stateIndex = new Map<string, number>([[initialKey, 0]]);
const edges: Array<Array<{ to: number; n3: boolean; sticky2: boolean; force2: boolean }>> = [];
let cursor = 0;

while (cursor < states.length && states.length <= maxStates) {
  const state = states[cursor]!;
  const outgoing: Array<{ to: number; n3: boolean; sticky2: boolean; force2: boolean }> = [];
  for (const input of runtime.actions(state, { winCondition: pkg.mechanic.win })) {
    const result = runtime.step(state, input, { winCondition: pkg.mechanic.win });
    if (!result.legal) continue;
    const key = runtime.key(result.state);
    let index = stateIndex.get(key);
    if (index === undefined) {
      index = states.length;
      stateIndex.set(key, index);
      states.push(result.state);
      keys.push(key);
    }
    outgoing.push({
      to: index,
      n3: result.events.includes("sticky_to_box:n3"),
      sticky2: result.events.includes("push_object:sticky#2"),
      force2: result.events.includes("force_chain:n2"),
    });
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

const visitStamp = new Uint16Array(states.length);
const distance = new Uint16Array(states.length);
const queue = new Int32Array(states.length);
let stamp = 0;
const hits: Array<{ mask: number; cost: number; winIndex: number }> = [];

for (let a = 0; a < candidates.length - 3; a += 1) {
  for (let b = a + 1; b < candidates.length - 2; b += 1) {
    for (let c = b + 1; c < candidates.length - 1; c += 1) {
      for (let d = c + 1; d < candidates.length; d += 1) {
        const goalMask = (1 << a) | (1 << b) | (1 << c) | (1 << d);
        if ((occupancy[0]! & goalMask) === goalMask) continue;
        stamp += 1;
        if (stamp >= 65_535) throw new Error("visit stamp overflow");
        let head = 0;
        let tail = 1;
        let winCount = 0;
        let winIndex = -1;
        let shortest = 0;
        queue[0] = 0;
        visitStamp[0] = stamp;
        distance[0] = 0;
        while (head < tail && winCount <= 1) {
          const from = queue[head++]!;
          const nextDistance = distance[from]! + 1;
          for (const edge of edges[from] ?? []) {
            const to = edge.to;
            if (visitStamp[to] === stamp) continue;
            visitStamp[to] = stamp;
            distance[to] = nextDistance;
            if ((occupancy[to]! & goalMask) === goalMask) {
              winCount += 1;
              if (winCount === 1) {
                winIndex = to;
                shortest = nextDistance;
              }
            } else {
              queue[tail++] = to;
            }
          }
        }
        if (winCount === 1 && shortest >= 8) hits.push({ mask: goalMask, cost: shortest, winIndex });
      }
    }
  }
}

hits.sort((left, right) => right.cost - left.cost || left.mask - right.mask);
console.log(`uniquePatterns=${hits.length}`);
let n3RequiredCount = 0;
for (const hit of hits) {
  const goals = candidates.filter((_, index) => (hit.mask & (1 << index)) !== 0);
  const avoidsN3 = canWinAvoiding(hit.mask, "n3");
  if (avoidsN3) continue;
  n3RequiredCount += 1;
  const avoidsSticky2 = canWinAvoiding(hit.mask, "sticky2");
  const avoidsForce2 = canWinAvoiding(hit.mask, "force2");
  console.log(`cost=${hit.cost} n3Required=${!avoidsN3} sticky2Required=${!avoidsSticky2} force2Required=${!avoidsForce2} goals=${goals.map(([x, y]) => `${x},${y}`).join(";")} win=${keys[hit.winIndex]}`);
}
console.log(`n3RequiredUniquePatterns=${n3RequiredCount}`);

function canWinAvoiding(goalMask: number, flag: "n3" | "sticky2" | "force2"): boolean {
  stamp += 1;
  let head = 0;
  let tail = 1;
  queue[0] = 0;
  visitStamp[0] = stamp;
  while (head < tail) {
    const from = queue[head++]!;
    for (const edge of edges[from] ?? []) {
      if (edge[flag]) continue;
      const to = edge.to;
      if (visitStamp[to] === stamp) continue;
      visitStamp[to] = stamp;
      if ((occupancy[to]! & goalMask) === goalMask) return true;
      queue[tail++] = to;
    }
  }
  return false;
}
