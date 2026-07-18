// Enumerate distinct sticky GROUP SHAPE SETS reachable in a layout, and for
// each shape set, the shortest path to first reach it. Shows what assemblies
// are actually constructible.
import { readFile } from "node:fs/promises";
import { loadPrototypePackage } from "../../../../../src/core/io.ts";
import { getRuntimeAdapter } from "../../../../../src/prototypes/runtimeAdapter.ts";

const [protoRoot, layoutPath, maxS] = process.argv.slice(2);
const pkg = await loadPrototypePackage(protoRoot);
const adapter = getRuntimeAdapter(pkg.mechanic);
const runtime = adapter.createRuntime(pkg.mechanic);
const layout = await readFile(layoutPath, "utf8");
const level = { id: "q", title: "q", layout, win: pkg.mechanic.win };
const initial = adapter.parseLevel(level);
const opts = { winCondition: pkg.mechanic.win, maxStates: Number(maxS ?? 200000) };

function shapeKeyOf(cells) {
  const xs = cells.map((c) => c.x), ys = cells.map((c) => c.y);
  const minX = Math.min(...xs), minY = Math.min(...ys);
  const norm = cells.map((c) => `${c.x - minX},${c.y - minY}`).sort().join(";");
  return `${cells.length}:${norm}`;
}
function shapeSetKey(state) {
  return state.stickyGroups.map((g) => shapeKeyOf(g)).sort().join(" | ") + ` || crates:${state.crates.length}`;
}

const seen = new Set([runtime.key(initial)]);
const queue = [{ state: initial, path: [] }];
let cursor = 0;
const shapeSets = new Map();
while (cursor < queue.length) {
  const { state, path } = queue[cursor++];
  const sk = shapeSetKey(state);
  if (!shapeSets.has(sk)) shapeSets.set(sk, { count: 0, path });
  shapeSets.get(sk).count++;
  for (const action of runtime.actions(state, opts)) {
    const t = runtime.step(state, action, opts);
    if (!t.legal) continue;
    const k = runtime.key(t.state);
    if (seen.has(k)) continue;
    seen.add(k);
    queue.push({ state: t.state, path: [...path, action] });
  }
}
console.log(`explored=${seen.size} distinct shape sets=${shapeSets.size}`);
for (const [k, v] of [...shapeSets.entries()].sort((a, b) => a[1].path.length - b[1].path.length)) {
  console.log(`\n${k}  (states=${v.count}, first at depth=${v.path.length})`);
  console.log(`  path: ${v.path.join(",") || "(initial)"}`);
}
