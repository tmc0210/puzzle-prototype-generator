import { analyzeGraphWithRuntime } from "../../../src/core/graphAnalyzer.js";
import { loadPrototypePackage } from "../../../src/core/io.js";
import { solveWithRuntime } from "../../../src/core/solver.js";
import type { LevelDoc } from "../../../src/core/types.js";
import { getRuntimeAdapter } from "../../../src/prototypes/runtimeAdapter.js";

const base = [
  "#######",
  "##BSG.#",
  "#C.LG.#",
  "#.@P..#",
  "#######",
];
const pkg = await loadPrototypePackage("prototypes/reality_anchor");
const adapter = getRuntimeAdapter(pkg.mechanic);
const runtime = adapter.createRuntime(pkg.mechanic);
const floors: Array<[number, number]> = [];
for (let y = 0; y < base.length; y += 1) {
  for (let x = 0; x < base[y]!.length; x += 1) if (base[y]![x] === ".") floors.push([x, y]);
}

for (const kind of ["C", "M"] as const) {
  for (const [ox, oy] of floors) {
    for (const [gx, gy] of floors) {
      const rows = [...base];
      if (ox === gx && oy === gy) {
        rows[oy] = replace(rows[oy]!, ox, kind === "C" ? "*" : "m");
      } else {
        rows[oy] = replace(rows[oy]!, ox, kind);
        rows[gy] = replace(rows[gy]!, gx, "G");
      }
      const layout = rows.join("\n");
      const level: LevelDoc = {
        id: `RA_COMPACT_${kind}_${ox}_${oy}_${gx}_${gy}`,
        title: "RA_COMPACT",
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
      try { initial = adapter.parseLevel(level); } catch { continue; }
      const solution = solveWithRuntime(runtime, initial, {
        winCondition: pkg.mechanic.win,
        maxStates: 300_000,
        maxDepth: 100,
      });
      if (!solution.found || solution.cost < 18) continue;
      const graph = analyzeGraphWithRuntime(runtime, initial, {
        winCondition: pkg.mechanic.win,
        maxStates: 300_000,
      });
      if (graph.status !== "complete" || graph.winStateCount !== 1) continue;
      console.log(`HIT kind=${kind} object=${ox},${oy} goal=${gx},${gy} cost=${solution.cost} states=${graph.reachableStateCount}`);
      console.log(`inputs=${solution.inputs.join(" ")}`);
      console.log(`events=${solution.events.join(" ")}`);
      console.log(layout);
    }
  }
}

function replace(row: string, x: number, glyph: string): string {
  return `${row.slice(0, x)}${glyph}${row.slice(x + 1)}`;
}
