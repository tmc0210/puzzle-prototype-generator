import { readFile } from "node:fs/promises";
import { eventMatchesPattern } from "../../../src/core/events.js";
import { loadPrototypePackage } from "../../../src/core/io.js";
import type { InputId, LevelDoc } from "../../../src/core/types.js";
import { getRuntimeAdapter } from "../../../src/prototypes/runtimeAdapter.js";

const layoutPath = process.argv[2];
const maxStates = Number(process.argv[3] ?? 500_000);
if (!layoutPath) {
  throw new Error("Usage: search_uvs_all_goal_patterns.ts <layout-file> [max-states]");
}

const requiredPatterns = [
  "sticky_to_box:n3",
  "anchor_boundary_shift:box_sticky",
  "box_to_sticky:n1",
];
const pkg = await loadPrototypePackage("prototypes/reality_anchor");
const adapter = getRuntimeAdapter(pkg.mechanic);
const runtime = adapter.createRuntime(pkg.mechanic);
const layout = (await readFile(layoutPath, "utf8")).replace(/\r/g, "").replace(/\n+$/g, "");
const level: LevelDoc = {
  id: "RA_UVS_ALL_GOAL_PATTERNS",
  title: "RA_UVS_ALL_GOAL_PATTERNS",
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

const lines = layout.split("\n");
const points: Array<readonly [number, number]> = [];
for (let y = 0; y < lines.length; y += 1) {
  for (let x = 0; x < lines[y]!.length; x += 1) {
    if (lines[y]![x] !== "#") points.push([x, y]);
  }
}
if (points.length > 30) {
  throw new Error(`Too many non-wall cells for bit mask: ${points.length}`);
}
const pointBits = new Map(points.map(([x, y], index) => [`${x},${y}`, 1 << index]));

const initial = adapter.parseLevel(level) as any;
const states: any[] = [initial];
const stateIndex = new Map<string, number>([[runtime.key(initial), 0]]);
const edges: Array<Array<{ to: number; events: string[]; input: InputId }>> = [];
const distance: number[] = [0];
const predecessor: Array<{ before: number; input: InputId } | undefined> = [undefined];
let cursor = 0;
while (cursor < states.length && states.length <= maxStates) {
  const state = states[cursor]!;
  const outgoing: Array<{ to: number; events: string[]; input: InputId }> = [];
  for (const input of runtime.actions(state, { winCondition: pkg.mechanic.win }) as InputId[]) {
    const result = runtime.step(state, input, { winCondition: pkg.mechanic.win });
    if (!result.legal) continue;
    const key = runtime.key(result.state);
    let index = stateIndex.get(key);
    if (index === undefined) {
      index = states.length;
      stateIndex.set(key, index);
      states.push(result.state);
      distance[index] = distance[cursor]! + 1;
      predecessor[index] = { before: cursor, input };
    }
    outgoing.push({ to: index, events: result.events, input });
  }
  edges[cursor] = outgoing;
  cursor += 1;
}
if (states.length > maxStates) {
  console.log(`graph=exhausted states=${states.length}`);
  process.exit(0);
}
console.log(`graph=complete states=${states.length} floorCells=${points.length}`);

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

type OccupancySummary = { count: number; index: number; materialMask: number };
const occupancy = new Map<number, OccupancySummary>();
const initialMaterialMask = maskForMaterial(initial);
for (let index = 0; index < states.length; index += 1) {
  const state = states[index]!;
  const materialMask = maskForMaterial(state);
  const anchorMask = maskForAnchors(state);
  const mask = materialMask | anchorMask;
  const current = occupancy.get(mask);
  if (current) current.count += 1;
  else occupancy.set(mask, { count: 1, index, materialMask });
}

const hits: Array<{ goals: string; cost: number; winIndex: number; inputs: string }> = [];
for (let a = 0; a < points.length - 3; a += 1) {
  for (let b = a + 1; b < points.length - 2; b += 1) {
    for (let c = b + 1; c < points.length - 1; c += 1) {
      for (let d = c + 1; d < points.length; d += 1) {
        const goalMask = (1 << a) | (1 << b) | (1 << c) | (1 << d);
        if ((initialMaterialMask & goalMask) === goalMask) continue;
        let winner: OccupancySummary | undefined;
        for (const [mask, summary] of occupancy) {
          if ((mask & goalMask) !== goalMask) continue;
          if (summary.count !== 1 || winner) {
            winner = undefined;
            break;
          }
          winner = summary;
        }
        if (!winner || distance[winner.index]! < 18) continue;
        // 审美约束：四个目标必须由箱/黏块覆盖，不把锚点当终局填充物。
        if ((winner.materialMask & goalMask) !== goalMask) continue;
        if (!requiredPatterns.every((pattern) => !reachableWithout.get(pattern)![winner!.index])) continue;
        const goalPoints = points.filter((_, index) => (goalMask & (1 << index)) !== 0);
        const inputs: InputId[] = [];
        let at = winner.index;
        while (at !== 0) {
          const edge = predecessor[at]!;
          inputs.push(edge.input);
          at = edge.before;
        }
        inputs.reverse();
        hits.push({
          goals: goalPoints.map(([x, y]) => `${x},${y}`).join(";"),
          cost: distance[winner.index]!,
          winIndex: winner.index,
          inputs: inputs.join(" "),
        });
      }
    }
  }
}

hits.sort((left, right) => right.cost - left.cost || left.goals.localeCompare(right.goals));
console.log(`uniqueRequiredHits=${hits.length}`);
for (const hit of hits.slice(0, 100)) {
  console.log(`cost=${hit.cost} goals=${hit.goals} winIndex=${hit.winIndex}`);
  console.log(`inputs=${hit.inputs}`);
}

function maskForMaterial(state: any): number {
  let mask = 0;
  for (const point of [...state.crates, ...state.stickyGroups.flat()]) {
    mask |= pointBits.get(`${point.x},${point.y}`) ?? 0;
  }
  return mask;
}

function maskForAnchors(state: any): number {
  let mask = 0;
  const anchorPoints = [
    ...(state.pushPullAnchor ? [state.pushPullAnchor.push, state.pushPullAnchor.pull] : []),
    ...(state.boxStickyAnchor ? [state.boxStickyAnchor.box, state.boxStickyAnchor.sticky] : []),
  ];
  for (const point of anchorPoints) mask |= pointBits.get(`${point.x},${point.y}`) ?? 0;
  return mask;
}
