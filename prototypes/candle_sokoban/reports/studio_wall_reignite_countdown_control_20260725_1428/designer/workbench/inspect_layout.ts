import { readFile } from "node:fs/promises";
import { enumerateRuntimeGraph } from "../../../../../../src/core/runtimeGraph.js";
import { loadPrototypePackage } from "../../../../../../src/core/io.js";
import { solveWithRuntime } from "../../../../../../src/core/solver.js";
import type { LevelDoc } from "../../../../../../src/core/types.js";
import { replayInputSequence } from "../../../../../../src/workflows/inputSequenceReplay.js";
import { getRuntimeAdapter } from "../../../../../../src/prototypes/runtimeAdapter.js";

const layoutPath = process.argv[2]!;
const route = (process.argv.find((arg) => arg.startsWith("route="))?.slice(6) ?? "").split(/\s+/).filter(Boolean);
const burnCycle = Number(process.argv.find((arg) => arg.startsWith("burn="))?.slice(5) ?? "5");
const layout = `${(await readFile(layoutPath, "utf8")).replace(/\r/g, "").trimEnd()}\n`;
const pkg = await loadPrototypePackage("prototypes/candle_sokoban");
const adapter = getRuntimeAdapter(pkg.mechanic);
const runtime = adapter.createRuntime(pkg.mechanic);
const level: LevelDoc = { id: "inspect-layout", title: "inspect-layout", layout, global_burn_cycle: burnCycle, win: pkg.mechanic.win };
const initial = adapter.parseLevel(level);
const options = { winCondition: pkg.mechanic.win };
const solution = solveWithRuntime(runtime, initial, { ...options, maxStates: 300000, maxDepth: 200 });
const canonical = route.length > 0 ? route : solution.inputs;
const replay = replayInputSequence(adapter, runtime, initial, canonical, options, pkg.mechanic.win);
const graph = enumerateRuntimeGraph(runtime, initial, pkg.mechanic.win, options, { maxStates: 300000, terminalizeWins: true });
const forbidden = graph.edges.flatMap((edge) => edge.events.filter((event) => /^(roll_intermediate_|roll_reignite_after_extinguish|wick_reexposed_unlit|shrink_ignite)/.test(event)));
const winningKeys = [...graph.winStateIndexes].map((index) => graph.keys[index]!);
const signatures = [...new Set(winningKeys.map((key) => key.split("|C:")[1]?.split("|B:")[0] ?? key))];
console.log(JSON.stringify({
  layout,
  solver: { found: solution.found, depth: solution.depth, inputs: solution.inputs, exploredStates: solution.exploredStates },
  canonical: { steps: canonical.length, finalWin: replay.final.isWin, events: replay.steps.flatMap((step) => step.events) },
  graph: { status: graph.status, states: graph.keys.length, edges: graph.edges.length, winningStates: graph.winStateIndexes.size, winningTerminalEdges: graph.edges.filter((edge) => edge.events.includes("win_all_braziers_lit")).length, signatures },
  forbidden: [...new Set(forbidden)],
}, null, 2));
