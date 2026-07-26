import { readFile } from "node:fs/promises";
import { loadPrototypePackage } from "../../../../../../src/core/io.js";
import { solveWithRuntime } from "../../../../../../src/core/solver.js";
import { replayInputSequence } from "../../../../../../src/workflows/inputSequenceReplay.js";
import { getRuntimeAdapter } from "../../../../../../src/prototypes/runtimeAdapter.js";
const exact = process.argv[2]!;
const layout = `${(await readFile(`${exact}/layout.layout`, "utf8")).replace(/\r/g, "").trimEnd()}\n`;
const canonical = (JSON.parse(await readFile(`${exact}/canonical_inputs.json`, "utf8")) as { inputs: string[] }).inputs;
const pkg = await loadPrototypePackage("prototypes/candle_sokoban"); const adapter = getRuntimeAdapter(pkg.mechanic); const runtime = adapter.createRuntime(pkg.mechanic);
const initial = adapter.parseLevel({ id: "compare-current", title: "compare-current", layout, global_burn_cycle: 5, win: pkg.mechanic.win });
const solution = solveWithRuntime(runtime, initial, { winCondition: pkg.mechanic.win, maxStates: 300000, maxDepth: 200 });
function run(inputs: string[]) { const replay = replayInputSequence(adapter, runtime, initial, inputs, { winCondition: pkg.mechanic.win }, pkg.mechanic.win); return { inputs, final: replay.final.key, win: replay.final.isWin, events: replay.steps.flatMap((step) => step.events), keys: replay.steps.map((step) => step.after.key) }; }
const c = run(canonical); const s = run(solution.inputs);
let first = 0; while (first < Math.min(c.keys.length, s.keys.length) && c.keys[first] === s.keys[first]) first += 1;
console.log(JSON.stringify({ solver: { found: solution.found, depth: solution.inputs.length }, firstDifferentStep: first + 1, canonical: c, solverRoute: s }, null, 2));
