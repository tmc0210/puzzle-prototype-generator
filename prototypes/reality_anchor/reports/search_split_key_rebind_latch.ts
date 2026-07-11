import { readFile, writeFile } from "node:fs/promises";
import { loadPrototypePackage } from "../../../src/core/io.js";
import type { InputId, LevelDoc } from "../../../src/core/types.js";
import { getRuntimeAdapter } from "../../../src/prototypes/runtimeAdapter.js";

type Node = {
  state: unknown;
  phase: number;
  parent: number;
  input?: InputId;
  stepEvents: string[];
  depth: number;
};

const layoutPath = process.argv[2];
const id = process.argv[3] ?? "RA_SPLIT_KEY_REBIND_SEARCH";
const maxStates = Number(process.argv[4] ?? 800000);
const maxDepth = Number(process.argv[5] ?? 100);
const requireWin = process.argv[6] === "win";

if (!layoutPath) {
  throw new Error("Usage: search_split_key_rebind_latch.ts <layout-file> [id] [maxStates] [maxDepth]");
}

const pkg = await loadPrototypePackage("prototypes/reality_anchor");
const adapter = getRuntimeAdapter(pkg.mechanic);
const runtime = adapter.createRuntime(pkg.mechanic);
const layout = (await readFile(layoutPath, "utf8")).replace(/\r/g, "").replace(/\n+$/g, "");
const level: LevelDoc = {
  id,
  title: id,
  role: "challenge",
  status: "candidate",
  targets: ["K_runtime_smoke"],
  known_before: ["K_runtime_smoke"],
  target_learning: ["K_runtime_smoke"],
  support_level: "none",
  expected_solver_evidence: ["solvable"],
  expected_llm_player_evidence: [],
  layout,
};

const initial = adapter.parseLevel(level);
const queue: Node[] = [{ state: initial, phase: 0, parent: -1, stepEvents: [], depth: 0 }];
const visited = new Set<string>([`${runtime.key(initial)}|0`]);
let cursor = 0;
let found: Node | undefined;

while (cursor < queue.length && visited.size <= maxStates) {
  const current = queue[cursor++]!;
  if (current.phase >= 4 && (!requireWin || runtime.isWin(current.state, pkg.mechanic.win))) {
    found = current;
    break;
  }
  if (current.depth >= maxDepth) continue;
  for (const action of runtime.actions(current.state, { winCondition: pkg.mechanic.win })) {
    const step = runtime.step(current.state, action, { winCondition: pkg.mechanic.win });
    if (!step.legal) continue;
    const nextPhase = advance(current.phase, step.events);
    const key = `${runtime.key(step.state)}|${nextPhase}`;
    if (visited.has(key)) continue;
    visited.add(key);
    queue.push({
      state: step.state,
      phase: nextPhase,
      parent: cursor - 1,
      input: action,
      stepEvents: step.events,
      depth: current.depth + 1,
    });
  }
}

const reconstructed = found ? reconstruct(queue, queue.indexOf(found)) : undefined;
const result = {
  id,
  found: Boolean(found),
  exploredStates: visited.size,
  maxStates,
  maxDepth,
  requireWin,
  phaseReached: found?.phase ?? Math.max(...queue.map((node) => node.phase)),
  depth: found?.depth,
  inputs: reconstructed?.inputs,
  events: reconstructed?.events,
  finalLayout: found ? adapter.renderState(found.state as never) : undefined,
};

const out = `prototypes/reality_anchor/reports/search_${id}.json`;
await writeFile(out, `${JSON.stringify(result, null, 2)}\n`, "utf8");
console.log(JSON.stringify(result, null, 2));
console.log(`Wrote ${out}`);

function advance(phase: number, events: string[]): number {
  const has = (prefix: string) => events.some((event) => event === prefix || event.startsWith(`${prefix}:`));
  if (phase === 0 && has("sticky_merge") && has("anchor_boundary_shift:box_sticky")) return 1;
  if (phase === 1 && has("anchor_boundary_shift:push_pull")) return 2;
  if (phase === 2 && has("sticky_split") && has("sticky_to_box")) return 3;
  if (phase === 3 && has("box_to_sticky") && has("sticky_merge")) return 4;
  return phase;
}

function reconstruct(nodes: Node[], foundIndex: number): { inputs: InputId[]; events: string[] } {
  const inputs: InputId[] = [];
  const eventSteps: string[][] = [];
  let index = foundIndex;
  while (index >= 0) {
    const node = nodes[index]!;
    if (node.input) inputs.push(node.input);
    if (node.stepEvents.length > 0) eventSteps.push(node.stepEvents);
    index = node.parent;
  }
  inputs.reverse();
  eventSteps.reverse();
  return { inputs, events: eventSteps.flat() };
}
