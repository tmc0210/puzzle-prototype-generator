import { readFile } from "node:fs/promises";
import { enumerateRuntimeGraph } from "../../../../../../src/core/runtimeGraph.js";
import { loadPrototypePackage } from "../../../../../../src/core/io.js";
import { solveWithRuntime } from "../../../../../../src/core/solver.js";
import type { LevelDoc } from "../../../../../../src/core/types.js";
import { getRuntimeAdapter } from "../../../../../../src/prototypes/runtimeAdapter.js";

const path = process.argv[2]!;
const source = (await readFile(path, "utf8")).replace(/\r/g, "").trimEnd().split("\n");
const rows = source.map((row, y) => y === 6 ? row.slice(0, 1) + "." + row.slice(2) : row);
const pkg = await loadPrototypePackage("prototypes/candle_sokoban");
const adapter = getRuntimeAdapter(pkg.mechanic);
const runtime = adapter.createRuntime(pkg.mechanic);
const options = { winCondition: pkg.mechanic.win };
function sig(key: string): string { return key.split("|C:")[1]?.split("|B:")[0] ?? key; }
for (const countdown of [1, 2, 3, 4, 5]) {
  const initial = adapter.parseLevel({ id: `gate-phase-${countdown}`, title: "gate-phase", layout: `${rows.join("\n")}\n`, global_burn_cycle: 5, win: pkg.mechanic.win } as LevelDoc);
  initial.globalBurnCountdown = countdown;
  const solution = solveWithRuntime(runtime, initial, { ...options, maxStates: 30000, maxDepth: 80 });
  const graph = enumerateRuntimeGraph(runtime, initial, pkg.mechanic.win, options, { maxStates: 30000, terminalizeWins: true });
  console.log(JSON.stringify({ countdown, found: solution.found, depth: solution.depth, inputs: solution.inputs, status: graph.status, states: graph.keys.length, wins: graph.winStateIndexes.size, signatures: [...new Set([...graph.winStateIndexes].map((index) => sig(graph.keys[index]!)))] }));
}
