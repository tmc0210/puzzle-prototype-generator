// Enumerate reachable states and per-state legal actions for a raw layout.
// Usage: npx tsx scripts/enum-states.mjs <prototypeRoot> <layout.txt> [--max-states N] [--verbose]
import { readFile } from "node:fs/promises";
import { loadPrototypePackage } from "../../../../../src/core/io.ts";
import { getRuntimeAdapter } from "../../../../../src/prototypes/runtimeAdapter.ts";

const [protoRoot, layoutPath] = process.argv.slice(2);
const maxIdx = process.argv.indexOf("--max-states");
const maxStates = maxIdx > 0 ? Number(process.argv[maxIdx + 1]) : 5000;
const verbose = process.argv.includes("--verbose");

const pkg = await loadPrototypePackage(protoRoot);
const adapter = getRuntimeAdapter(pkg.mechanic);
const runtime = adapter.createRuntime(pkg.mechanic);
const layout = await readFile(layoutPath, "utf8");
const level = { id: "scratch", title: "scratch", layout, win: pkg.mechanic.win };
const initial = adapter.parseLevel(level);
const opts = { winCondition: pkg.mechanic.win, maxStates };

const queue = [initial];
const visited = new Set([runtime.key(initial)]);
let cursor = 0;
while (cursor < queue.length && visited.size < maxStates) {
  const state = queue[cursor++];
  const actions = runtime.actions(state, opts);
  if (verbose) {
    console.log(`--- state ${runtime.key(state)}`);
  }
  for (const action of actions) {
    const t = runtime.step(state, action, opts);
    if (verbose) {
      console.log(`  ${action}: legal=${t.legal}${t.reason ? ` reason=${t.reason}` : ""} events=${(t.events ?? []).join("|")}`);
    }
    if (t.legal) {
      const k = runtime.key(t.state);
      if (!visited.has(k)) {
        visited.add(k);
        queue.push(t.state);
      }
    }
  }
}
console.log(`reachable=${visited.size}`);
if (verbose) {
  console.log("=== all state keys ===");
  for (const k of visited) console.log(k);
}
