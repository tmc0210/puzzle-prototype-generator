import { readFile } from "node:fs/promises";
import { loadPrototypePackage } from "../../../src/core/io.js";
import type { InputId, LevelDoc } from "../../../src/core/types.js";
import { getRuntimeAdapter } from "../../../src/prototypes/runtimeAdapter.js";

const layoutPath = process.argv[2];
const maxStates = Number(process.argv[3] ?? 500_000);
if (!layoutPath) throw new Error("Usage: probe_unique_win_states_agent.ts <layout-file> [max-states]");

const pkg = await loadPrototypePackage("prototypes/reality_anchor");
const adapter = getRuntimeAdapter(pkg.mechanic);
const runtime = adapter.createRuntime(pkg.mechanic);
const layout = (await readFile(layoutPath, "utf8")).replace(/\r/g, "").replace(/\n+$/g, "");
const level: LevelDoc = {
  id: "RA_UNIQUE_WIN_PROBE",
  title: "RA_UNIQUE_WIN_PROBE",
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

const initial = adapter.parseLevel(level);
const initialKey = runtime.key(initial);
const queue = [{ state: initial, key: initialKey }];
const predecessor = new Map<string, { before: string; input: InputId }>();
const states = new Map<string, typeof initial>([[initialKey, initial]]);
const winningKeys: string[] = [];
let cursor = 0;

while (cursor < queue.length && states.size <= maxStates) {
  const current = queue[cursor++]!;
  for (const input of runtime.actions(current.state, { winCondition: pkg.mechanic.win }) as InputId[]) {
    const result = runtime.step(current.state, input, { winCondition: pkg.mechanic.win });
    if (!result.legal) continue;
    const key = runtime.key(result.state);
    if (states.has(key)) continue;
    states.set(key, result.state);
    predecessor.set(key, { before: current.key, input });
    if (runtime.isWin(result.state, pkg.mechanic.win)) {
      winningKeys.push(key);
    } else {
      queue.push({ state: result.state, key });
    }
  }
}

console.log(`status=${states.size > maxStates ? "exhausted" : "complete"} states=${states.size} wins=${winningKeys.length}`);
for (const [index, key] of winningKeys.entries()) {
  const inputs: InputId[] = [];
  let cursorKey = key;
  while (cursorKey !== initialKey) {
    const edge = predecessor.get(cursorKey);
    if (!edge) throw new Error(`Missing predecessor for ${cursorKey}`);
    inputs.push(edge.input);
    cursorKey = edge.before;
  }
  inputs.reverse();
  console.log(`WIN ${index + 1} cost=${inputs.length}`);
  console.log(key);
  console.log(inputs.join(" "));
  let beforeState = initial;
  for (const input of inputs.slice(0, -1)) {
    const result = runtime.step(beforeState, input, { winCondition: pkg.mechanic.win });
    if (!result.legal) throw new Error("Stored winning path became illegal");
    beforeState = result.state;
  }
  const lastInput = inputs.at(-1)!;
  const last = runtime.step(beforeState, lastInput, { winCondition: pkg.mechanic.win });
  console.log(`LAST ${lastInput}: ${last.events.join(" ")}`);
  console.log(adapter.renderState(beforeState));
  console.log(adapter.renderState(states.get(key)!));
}
