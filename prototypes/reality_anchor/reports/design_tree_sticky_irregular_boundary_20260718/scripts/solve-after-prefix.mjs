// 任务内诊断：回放一个前缀，再从所得 exact state 求解。
// 用法：npx tsx scripts/solve-after-prefix.mjs <prototypeRoot> <layout.txt> <comma-separated-inputs>
import { readFile } from "node:fs/promises";
import { loadPrototypePackage } from "../../../../../src/core/io.ts";
import { getRuntimeAdapter } from "../../../../../src/prototypes/runtimeAdapter.ts";
import { solveWithRuntime } from "../../../../../src/core/solver.ts";

const [protoRoot, layoutPath, inputText = ""] = process.argv.slice(2);
if (!protoRoot || !layoutPath) {
  console.error("usage: solve-after-prefix <prototypeRoot> <layout.txt> <comma-separated-inputs>");
  process.exit(2);
}

const pkg = await loadPrototypePackage(protoRoot);
const adapter = getRuntimeAdapter(pkg.mechanic);
const runtime = adapter.createRuntime(pkg.mechanic);
const layout = await readFile(layoutPath, "utf8");
const level = { id: "scratch", title: "scratch", layout, win: pkg.mechanic.win };
let state = adapter.parseLevel(level);
const opts = { winCondition: pkg.mechanic.win, maxStates: 400000 };
const inputs = inputText.split(",").map((value) => value.trim()).filter(Boolean);

for (let index = 0; index < inputs.length; index += 1) {
  const transition = runtime.step(state, inputs[index], opts);
  console.log(`prefix ${index + 1} ${inputs[index]} legal=${transition.legal} events=${(transition.events ?? []).join("|")} reason=${transition.reason ?? ""}`);
  if (!transition.legal) process.exit(1);
  state = transition.state;
}

console.log(adapter.renderState(state));
const solution = solveWithRuntime(runtime, state, opts);
if (!solution.found) {
  console.log(`UNSOLVED explored=${solution.exploredStates} status=${solution.searchStatus} reason=${solution.reason ?? ""}`);
  process.exit(0);
}
console.log(`SOLVED suffixCost=${solution.cost} explored=${solution.exploredStates}`);
console.log(`suffixInputs=${solution.inputs.join(",")}`);
console.log(`suffixEvents=${solution.events.join(" ")}`);
