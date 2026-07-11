import { readFile } from "node:fs/promises";
import { analyzeGraphWithRuntime } from "../../../src/core/graphAnalyzer.js";
import { loadPrototypePackage } from "../../../src/core/io.js";
import { solveWithRuntime } from "../../../src/core/solver.js";
import type { InputId, LevelDoc } from "../../../src/core/types.js";
import { getRuntimeAdapter } from "../../../src/prototypes/runtimeAdapter.js";

const layoutPath = process.argv[2];
if (!layoutPath) throw new Error("Usage: search_single_wall_n3_lock_agent.ts <layout-file>");
const pkg = await loadPrototypePackage("prototypes/reality_anchor");
const adapter = getRuntimeAdapter(pkg.mechanic);
const runtime = adapter.createRuntime(pkg.mechanic);
const raw = (await readFile(layoutPath, "utf8")).replace(/\r/g, "").replace(/\n+$/g, "");
const sourceRows = raw.split("\n");

for (let y = 0; y < sourceRows.length; y += 1) {
  for (let x = 0; x < sourceRows[y]!.length; x += 1) {
    if (sourceRows[y]![x] !== ".") continue;
    const rows = [...sourceRows];
    rows[y] = `${rows[y]!.slice(0, x)}#${rows[y]!.slice(x + 1)}`;
    const layout = rows.join("\n");
    const level: LevelDoc = {
      id: `RA_WALL_${x}_${y}`,
      title: `RA_WALL_${x}_${y}`,
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
    let initial: any;
    try {
      initial = adapter.parseLevel(level);
    } catch {
      continue;
    }
    const solution = solveWithRuntime(runtime, initial, {
      winCondition: pkg.mechanic.win,
      maxStates: 300_000,
      maxDepth: 100,
    });
    if (!solution.found || !solution.events.includes("sticky_to_box:n3")) continue;
    const bypass = winWithoutN3(initial, 300_000);
    if (bypass !== "complete_no_win") continue;
    const graph = analyzeGraphWithRuntime(runtime, initial, {
      winCondition: pkg.mechanic.win,
      maxStates: 500_000,
    });
    console.log(`LOCK x=${x} y=${y} cost=${solution.cost} graph=${graph.status} states=${graph.reachableStateCount} wins=${graph.winStateCount}`);
    console.log(solution.inputs.join(" "));
    console.log(layout);
  }
}

function winWithoutN3(initial: any, maxStates: number): "found" | "complete_no_win" | "exhausted" {
  const queue = [initial];
  const visited = new Set<string>([runtime.key(initial)]);
  let cursor = 0;
  while (cursor < queue.length) {
    if (visited.size > maxStates) return "exhausted";
    const state = queue[cursor++]!;
    for (const input of runtime.actions(state, { winCondition: pkg.mechanic.win }) as InputId[]) {
      const step = runtime.step(state, input, { winCondition: pkg.mechanic.win });
      if (!step.legal || step.events.includes("sticky_to_box:n3")) continue;
      const key = runtime.key(step.state);
      if (visited.has(key)) continue;
      if (runtime.isWin(step.state, pkg.mechanic.win)) return "found";
      visited.add(key);
      queue.push(step.state);
    }
  }
  return "complete_no_win";
}
