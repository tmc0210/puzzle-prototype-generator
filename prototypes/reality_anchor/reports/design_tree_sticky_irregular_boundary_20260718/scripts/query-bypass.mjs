// Adversarial query over the reachable graph.
// Mode A (--through="C@x,y|M@x1,y1;x2,y2"): does any reachable WIN state exist
//   whose path from initial never visits a state matching the pinned object set?
//   (Ancestor-closure: marks all states that can reach a matching state, then
//   searches for wins outside the closure via reverse BFS on the transition graph.)
// Mode B (default): enumerate all win states and their shortest-path depth.
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

const throughArg = rest.find((a) => a.startsWith("--through="));
let wantCrates = null, wantSticky = null;
if (throughArg) {
  wantCrates = []; wantSticky = [];
  for (const part of throughArg.slice(10).split("|")) {
    const at = part.indexOf("@");
    const kind = part.slice(0, at), coords = part.slice(at + 1);
    const list = coords.split(";").filter(Boolean);
    if (kind === "C") wantCrates.push(...list);
    if (kind === "M") wantSticky.push(...list);
  }
  wantCrates.sort(); wantSticky.sort();
}
function objMatch(state) {
  const c = state.crates.map((p) => `${p.x},${p.y}`).sort();
  const m = state.stickyCells.map((p) => `${p.x},${p.y}`).sort();
  return c.join(";") === wantCrates.join(";") && m.join(";") === wantSticky.join(";");
}

// Forward BFS, storing adjacency (key -> successor keys).
const keyOf = (s) => runtime.key(s);
const states = new Map(); // key -> state
const adj = new Map(); // key -> string[]
const startKey = keyOf(initial);
states.set(startKey, initial);
adj.set(startKey, []);
const queue = [initial];
let cursor = 0;
const winKeys = [];
while (cursor < queue.length) {
  const state = queue[cursor++];
  const k = keyOf(state);
  for (const action of runtime.actions(state, opts)) {
    const t = runtime.step(state, action, opts);
    if (!t.legal) continue;
    const tk = keyOf(t.state);
    adj.get(k).push(tk);
    if (!states.has(tk)) {
      states.set(tk, t.state);
      adj.set(tk, []);
      queue.push(t.state);
      if (runtime.isWin?.(t.state, opts)) winKeys.push(tk);
    }
  }
}
console.log(`states=${states.size} wins=${winKeys.length}`);

if (!throughArg) {
  // Mode B: depth of each win
  const depth = new Map([[startKey, 0]]);
  const q2 = [startKey];
  let c2 = 0;
  while (c2 < q2.length) {
    const k = q2[c2++];
    for (const nk of adj.get(k)) if (!depth.has(nk)) { depth.set(nk, depth.get(k) + 1); q2.push(nk); }
  }
  for (const wk of winKeys) console.log(`win depth=${depth.get(wk)} key=${wk}`);
  process.exit(0);
}

// Mode A: reverse reachability from "through" states.
const throughKeys = [];
for (const [k, s] of states) if (objMatch(s)) throughKeys.push(k);
console.log(`throughStates=${throughKeys.length}`);
// Build reverse adjacency lazily.
const radj = new Map();
for (const [k, succs] of adj) for (const s of succs) {
  if (!radj.has(s)) radj.set(s, []);
  radj.get(s).push(k);
}
const canReachThrough = new Set(throughKeys);
const rq = [...throughKeys];
let rc = 0;
while (rc < rq.length) {
  const k = rq[rc++];
  for (const pk of radj.get(k) ?? []) if (!canReachThrough.has(pk)) { canReachThrough.add(pk); rq.push(pk); }
}
const bypassWins = winKeys.filter((wk) => !canReachThrough.has(wk));
console.log(`statesAbleToReachThrough=${canReachThrough.size}`);
console.log(bypassWins.length
  ? `BYPASS EXISTS: ${bypassWins.length} win state(s) unreachable-from-through`
  : "NO BYPASS: every reachable win state can only be reached via the pinned object state");
for (const wk of bypassWins.slice(0, 5)) console.log(`  bypass win key=${wk}`);
