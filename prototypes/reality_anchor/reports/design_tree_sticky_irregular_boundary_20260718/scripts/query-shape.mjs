// Reachability query: from a layout's initial state, can the reachable graph
// contain a state whose sticky-group SHAPE SET (cell deltas, group sizes) equals
// a target shape set? Prints the shortest sequence of inputs reaching the first
// matching state, plus counts.
import { readFile } from "node:fs/promises";
import { loadPrototypePackage } from "../../../../../src/core/io.ts";
import { getRuntimeAdapter } from "../../../../../src/prototypes/runtimeAdapter.ts";

const [protoRoot, layoutPath, ...rest] = process.argv.slice(2);
const pkg = await loadPrototypePackage(protoRoot);
const adapter = getRuntimeAdapter(pkg.mechanic);
const runtime = adapter.createRuntime(pkg.mechanic);
const layout = await readFile(layoutPath, "utf8");
const level = { id: "q", title: "q", layout, win: pkg.mechanic.win };
const initial = adapter.parseLevel(level);
const opts = { winCondition: pkg.mechanic.win, maxStates: 400000 };

// Target shapes from CLI: e.g. --shapes "3:L,2:I" means one 3-cell L and one 2-cell bar.
function shapeKeyOf(cells) {
  const xs = cells.map((c) => c.x), ys = cells.map((c) => c.y);
  const minX = Math.min(...xs), minY = Math.min(...ys);
  const norm = cells.map((c) => `${c.x - minX},${c.y - minY}`).sort().join(";");
  return `${cells.length}:${norm}`;
}
function shapeSetKey(state) {
  const groups = runtime.stickyGroups(state);
  return groups.map((g) => shapeKeyOf(g.cells)).sort().join(" | ");
}

const targetArg = rest.find((a) => a.startsWith("--want="));
// Instead of parsing shape names, accept raw normalized cell strings.
// --want="3:0,0;1,0;1,1" (one group) ; multiple groups separated by " | "
const want = targetArg ? targetArg.slice(7) : null;

const seen = new Set([runtime.key(initial)]);
const queue = [{ state: initial, path: [] }];
let cursor = 0;
let found = null;
while (cursor < queue.length && !found) {
  const { state, path } = queue[cursor++];
  if (want && shapeSetKey(state) === want) {
    found = { state, path };
    break;
  }
  for (const action of runtime.actions(state, opts)) {
    const t = runtime.step(state, action, opts);
    if (!t.legal) continue;
    const k = runtime.key(t.state);
    if (seen.has(k)) continue;
    seen.add(k);
    queue.push({ state: t.state, path: [...path, action] });
  }
}
console.log(`explored=${seen.size}`);
if (found) {
  console.log(`FOUND depth=${found.path.length} inputs=${found.path.join(",")}`);
  console.log(adapter.renderState(found.state));
} else {
  console.log("NOT FOUND");
  // dump a histogram of distinct shape sets seen
  const sets = new Map();
  for (const { state } of queue) {
    const k = shapeSetKey(state);
    sets.set(k, (sets.get(k) ?? 0) + 1);
  }
  console.log(`distinct shape sets=${sets.size}`);
  for (const [k, n] of [...sets.entries()].sort((a, b) => b[1] - a[1]).slice(0, 25)) {
    console.log(`  ${n}  ${k}`);
  }
}
