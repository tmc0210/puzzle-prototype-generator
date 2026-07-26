import { readFile } from "node:fs/promises";
import { loadPrototypePackage } from "../../../../../../src/core/io.js";
import { solveWithRuntime } from "../../../../../../src/core/solver.js";
import type { LevelDoc } from "../../../../../../src/core/types.js";
import { replayInputSequence } from "../../../../../../src/workflows/inputSequenceReplay.js";
import { getRuntimeAdapter } from "../../../../../../src/prototypes/runtimeAdapter.js";

const layout = `${(await readFile(process.argv[2]!, "utf8")).replace(/\r/g, "").trimEnd()}\n`;
const pkg = await loadPrototypePackage("prototypes/candle_sokoban");
const adapter = getRuntimeAdapter(pkg.mechanic); const runtime = adapter.createRuntime(pkg.mechanic);
const level: LevelDoc = { id: "trace", title: "trace", layout, global_burn_cycle: 5, win: pkg.mechanic.win };
const initial = adapter.parseLevel(level); const options = { winCondition: pkg.mechanic.win };
const solution = solveWithRuntime(runtime, initial, { ...options, maxStates: 100000, maxDepth: 200 });
const replay = replayInputSequence(adapter, runtime, initial, solution.inputs, options, pkg.mechanic.win);
console.log(JSON.stringify({ found: solution.found, inputs: solution.inputs, steps: replay.steps.map((step) => ({ index: step.step, input: step.action, events: step.events, key: step.after.key })) }, null, 2));
