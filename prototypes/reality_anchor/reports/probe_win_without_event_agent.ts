import { readFile } from "node:fs/promises";
import { eventMatchesPattern } from "../../../src/core/events.js";
import { loadPrototypePackage } from "../../../src/core/io.js";
import type { InputId, LevelDoc } from "../../../src/core/types.js";
import { getRuntimeAdapter } from "../../../src/prototypes/runtimeAdapter.js";

const layoutPath = process.argv[2];
const forbidden = process.argv[3];
const maxStates = Number(process.argv[4] ?? 500_000);
if (!layoutPath || !forbidden) throw new Error("Usage: probe_win_without_event_agent.ts <layout-file> <event-pattern> [max-states]");

const pkg = await loadPrototypePackage("prototypes/reality_anchor");
const adapter = getRuntimeAdapter(pkg.mechanic);
const runtime = adapter.createRuntime(pkg.mechanic);
const layout = (await readFile(layoutPath, "utf8")).replace(/\r/g, "").replace(/\n+$/g, "");
const level: LevelDoc = {
  id: "RA_WIN_WITHOUT_EVENT_PROBE",
  title: "RA_WIN_WITHOUT_EVENT_PROBE",
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
const queue = [{ state: initial, inputs: [] as InputId[] }];
const visited = new Set<string>([runtime.key(initial)]);
let cursor = 0;
while (cursor < queue.length && visited.size <= maxStates) {
  const current = queue[cursor++]!;
  for (const input of runtime.actions(current.state, { winCondition: pkg.mechanic.win }) as InputId[]) {
    const step = runtime.step(current.state, input, { winCondition: pkg.mechanic.win });
    if (!step.legal || step.events.some((event) => eventMatchesPattern(event, forbidden))) continue;
    const key = runtime.key(step.state);
    if (visited.has(key)) continue;
    const inputs = [...current.inputs, input];
    if (runtime.isWin(step.state, pkg.mechanic.win)) {
      console.log(`bypass=true status=found states=${visited.size + 1} cost=${inputs.length}`);
      console.log(inputs.join(" "));
      process.exit(0);
    }
    visited.add(key);
    queue.push({ state: step.state, inputs });
  }
}
console.log(`bypass=false status=${visited.size > maxStates ? "exhausted" : "complete"} states=${visited.size}`);
