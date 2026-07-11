import { readFile } from "node:fs/promises";
import { eventMatchesPattern } from "../../../src/core/events.js";
import { loadPrototypePackage } from "../../../src/core/io.js";
import type { InputId, LevelDoc } from "../../../src/core/types.js";
import { getRuntimeAdapter } from "../../../src/prototypes/runtimeAdapter.js";

type Node = { state: unknown; parent: number; input?: InputId };

const layoutPath = process.argv[2];
const forbidden = process.argv[3];
const maxStates = Number(process.argv[4] ?? 3_000_000);
if (!layoutPath || !forbidden) {
  throw new Error("Usage: probe_split_key_win_without_event.ts <layout-file> <event-pattern> [max-states]");
}

const pkg = await loadPrototypePackage("prototypes/reality_anchor");
const adapter = getRuntimeAdapter(pkg.mechanic);
const runtime = adapter.createRuntime(pkg.mechanic);
const layout = (await readFile(layoutPath, "utf8")).replace(/\r/g, "").replace(/\n+$/g, "");
const level: LevelDoc = {
  id: "RA_SPLIT_KEY_WIN_WITHOUT_EVENT",
  title: "RA_SPLIT_KEY_WIN_WITHOUT_EVENT",
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
const queue: Node[] = [{ state: initial, parent: -1 }];
const visited = new Set<string>([runtime.key(initial)]);
let cursor = 0;
let foundIndex = -1;

while (cursor < queue.length && visited.size <= maxStates) {
  const currentIndex = cursor;
  const current = queue[cursor++]!;
  for (const input of runtime.actions(current.state, { winCondition: pkg.mechanic.win }) as InputId[]) {
    const step = runtime.step(current.state, input, { winCondition: pkg.mechanic.win });
    if (!step.legal || step.events.some((event) => eventMatchesPattern(event, forbidden))) continue;
    const key = runtime.key(step.state);
    if (visited.has(key)) continue;
    visited.add(key);
    queue.push({ state: step.state, parent: currentIndex, input });
    if (runtime.isWin(step.state, pkg.mechanic.win)) {
      foundIndex = queue.length - 1;
      break;
    }
  }
  if (foundIndex >= 0) break;
}

if (foundIndex >= 0) {
  const inputs: InputId[] = [];
  let index = foundIndex;
  while (index >= 0) {
    const node = queue[index]!;
    if (node.input) inputs.push(node.input);
    index = node.parent;
  }
  inputs.reverse();
  console.log(`bypass=true status=found states=${visited.size} cost=${inputs.length}`);
  console.log(inputs.join(" "));
} else {
  console.log(`bypass=false status=${visited.size > maxStates ? "exhausted" : "complete"} states=${visited.size}`);
}
