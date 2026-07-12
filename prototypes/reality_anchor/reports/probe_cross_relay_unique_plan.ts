import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { eventMatchesPattern } from "../../../src/core/events.js";
import { loadPrototypePackage } from "../../../src/core/io.js";
import type { InputId, LevelDoc } from "../../../src/core/types.js";
import { getRuntimeAdapter } from "../../../src/prototypes/runtimeAdapter.js";

const layoutPath = process.argv[2];
const id = process.argv[3] ?? "RA_CROSS_RELAY_UNIQUE_PLAN";
const maxStates = Number(process.argv[4] ?? 100000);
const maxDepth = Number(process.argv[5] ?? 100);
if (!layoutPath) throw new Error("Usage: probe_cross_relay_unique_plan.ts <layout> <id> [maxStates] [maxDepth]");

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
const initialKey = runtime.key(initial);
type State = typeof initial;
type Node = { state: State; key: string; dist: number };
const queue: Node[] = [{ state: initial, key: initialKey, dist: 0 }];
const states = new Map<string, State>([[initialKey, initial]]);
const distance = new Map<string, number>([[initialKey, 0]]);
const pathCount = new Map<string, bigint>([[initialKey, 1n]]);
const parents = new Map<string, Array<{ before: string; input: InputId }>>();
const winningKeys: string[] = [];
let cursor = 0;
let exhausted = false;

while (cursor < queue.length) {
  if (states.size > maxStates) { exhausted = true; break; }
  const current = queue[cursor++]!;
  if (runtime.isWin(current.state, pkg.mechanic.win)) continue;
  if (current.dist >= maxDepth) { exhausted = true; continue; }
  for (const input of runtime.actions(current.state, { winCondition: pkg.mechanic.win }) as InputId[]) {
    const result = runtime.step(current.state, input, { winCondition: pkg.mechanic.win });
    if (!result.legal) continue;
    const key = runtime.key(result.state);
    const nextDist = current.dist + 1;
    const knownDist = distance.get(key);
    if (knownDist === undefined) {
      states.set(key, result.state);
      distance.set(key, nextDist);
      pathCount.set(key, pathCount.get(current.key)!);
      parents.set(key, [{ before: current.key, input }]);
      if (runtime.isWin(result.state, pkg.mechanic.win)) winningKeys.push(key);
      else queue.push({ state: result.state, key, dist: nextDist });
    } else if (knownDist === nextDist) {
      pathCount.set(key, pathCount.get(key)! + pathCount.get(current.key)!);
      parents.get(key)!.push({ before: current.key, input });
    }
  }
}

const shortestWinDistance = Math.min(...winningKeys.map((key) => distance.get(key)!));
const shortestWinningKeys = winningKeys.filter((key) => distance.get(key) === shortestWinDistance);
const shortestPathCount = shortestWinningKeys.reduce((sum, key) => sum + pathCount.get(key)!, 0n);
const sampledShortestInputs: InputId[][] = [];
for (const key of shortestWinningKeys) collectInputs(key, [], sampledShortestInputs, 32);
const sequenceProbe = probeMidPlBeforeSecondBs();

const report = {
  id,
  layout: adapter.renderState(initial),
  graph: {
    status: exhausted ? "exhausted" : "complete",
    reachable_states: states.size,
    winning_states: winningKeys.length,
    shortest_win_distance: shortestWinDistance,
    shortest_winning_states: shortestWinningKeys.length,
    shortest_input_sequence_count: shortestPathCount.toString(),
    sampled_shortest_inputs: sampledShortestInputs,
  },
  structural_sequence_probe: sequenceProbe,
};
const base = path.join("prototypes/reality_anchor/reports", `cross_relay_unique_plan_${id}`);
await writeFile(`${base}.json`, `${JSON.stringify(report, null, 2)}\n`, "utf8");
await writeFile(`${base}.md`, format(report), "utf8");
console.log(`Wrote ${base}.md`);
console.log(`Wrote ${base}.json`);

function collectInputs(key: string, reversed: InputId[], output: InputId[][], limit: number): void {
  if (output.length >= limit) return;
  if (key === initialKey) {
    output.push([...reversed].reverse());
    return;
  }
  for (const parent of parents.get(key) ?? []) {
    collectInputs(parent.before, [...reversed, parent.input], output, limit);
    if (output.length >= limit) return;
  }
}

function probeMidPlBeforeSecondBs() {
  type Monitored = {
    state: State;
    bsCount: number;
    plAfterFirstBs: boolean;
    violated: boolean;
    inputs: InputId[];
    depth: number;
  };
  const q: Monitored[] = [{
    state: initial,
    bsCount: 0,
    plAfterFirstBs: false,
    violated: false,
    inputs: [],
    depth: 0,
  }];
  const seen = new Set<string>([`${initialKey}|0|0|0`]);
  let i = 0;
  let depthHit = false;
  while (i < q.length) {
    if (seen.size > maxStates) return { found_violation_win: false, status: "exhausted", explored_states: seen.size };
    const current = q[i++]!;
    if (current.depth > 0 && runtime.isWin(current.state, pkg.mechanic.win)) {
      if (current.violated) return { found_violation_win: true, status: "found", explored_states: seen.size, inputs: current.inputs };
      continue;
    }
    if (current.depth >= maxDepth) { depthHit = true; continue; }
    for (const input of runtime.actions(current.state, { winCondition: pkg.mechanic.win }) as InputId[]) {
      const step = runtime.step(current.state, input, { winCondition: pkg.mechanic.win });
      if (!step.legal) continue;
      const bsNow = step.events.filter((e) => eventMatchesPattern(e, "anchor_boundary_shift:box_sticky")).length;
      const plNow = step.events.some((e) => eventMatchesPattern(e, "anchor_boundary_shift:push_pull"));
      const bsCount = Math.min(2, current.bsCount + bsNow);
      const plAfterFirstBs = current.plAfterFirstBs || (current.bsCount >= 1 && current.bsCount < 2 && plNow);
      const secondNow = current.bsCount < 2 && bsCount >= 2;
      const violated = current.violated || (secondNow && !plAfterFirstBs);
      const key = `${runtime.key(step.state)}|${bsCount}|${plAfterFirstBs ? 1 : 0}|${violated ? 1 : 0}`;
      if (seen.has(key)) continue;
      seen.add(key);
      q.push({ state: step.state, bsCount, plAfterFirstBs, violated, inputs: [...current.inputs, input], depth: current.depth + 1 });
    }
  }
  return {
    found_violation_win: false,
    status: depthHit ? "exhausted" : "complete",
    explored_states: seen.size,
    reason: depthHit ? "depth budget exceeded" : "all winning paths place a P/L shift after first B/S shift and before second B/S shift",
  };
}

function format(input: typeof report): string {
  const g = input.graph;
  const s = input.structural_sequence_probe;
  const lines = [
    `# Cross Relay Uniqueness: ${input.id}`,
    "",
    `- Graph status: ${g.status}`,
    `- Reachable states: ${g.reachable_states}`,
    `- Winning states: ${g.winning_states}`,
    `- Shortest win distance: ${g.shortest_win_distance}`,
    `- Shortest winning states: ${g.shortest_winning_states}`,
    `- Shortest input sequence count: ${g.shortest_input_sequence_count}`,
    "- Sampled shortest inputs:",
    ...g.sampled_shortest_inputs.map((inputs) => `  - ${inputs.join(" ")}`),
    "",
    "## Structural Sequence Probe",
    "",
    `- Found winning path whose second B/S shift lacks a P/L shift between the two B/S shifts: ${s.found_violation_win}`,
    `- Status: ${s.status}`,
    `- Explored states: ${s.explored_states}`,
    ...("reason" in s && s.reason ? [`- Reason: ${s.reason}`] : []),
    ...("inputs" in s && s.inputs ? [`- Inputs: ${s.inputs.join(" ")}`] : []),
  ];
  return `${lines.join("\n")}\n`;
}
