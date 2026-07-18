// Design-studio scratch helper: solve a raw layout file with the prototype's
// real runtime. Usage:
//   npx tsx scripts/solve-layout.mjs prototypes/reality_anchor <layout.txt> [--max-states N]
import { readFile } from "node:fs/promises";
import { loadPrototypePackage } from "../../../../../src/core/io.ts";
import { getRuntimeAdapter } from "../../../../../src/prototypes/runtimeAdapter.ts";
import { solveWithRuntime } from "../../../../../src/core/solver.ts";

const [protoRoot, layoutPath] = process.argv.slice(2);
if (!protoRoot || !layoutPath) {
  console.error("usage: solve-layout <prototypeRoot> <layout.txt> [--max-states N]");
  process.exit(2);
}
const maxIdx = process.argv.indexOf("--max-states");
const maxStates = maxIdx > 0 ? Number(process.argv[maxIdx + 1]) : 200000;

const pkg = await loadPrototypePackage(protoRoot);
const adapter = getRuntimeAdapter(pkg.mechanic);
const runtime = adapter.createRuntime(pkg.mechanic);
const layout = await readFile(layoutPath, "utf8");
const level = { id: "scratch", title: "scratch", layout, win: pkg.mechanic.win };
const initial = adapter.parseLevel(level);
const solution = solveWithRuntime(runtime, initial, {
  winCondition: pkg.mechanic.win,
  maxStates,
});

console.log(adapter.renderState(initial));
if (!solution.found) {
  console.log(`UNSOLVED explored=${solution.exploredStates} status=${solution.searchStatus} reason=${solution.reason ?? ""}`);
  process.exit(1);
}
console.log(`SOLVED cost=${solution.cost} explored=${solution.exploredStates}`);
console.log(`inputs=${solution.inputs.join(",")}`);
console.log(`events=${solution.events.join(" ")}`);
