// Dump the BFS expansion from ax5's initial state: every legal move and where it goes.
import { loadPrototypePackage } from "../../../../../src/core/io.ts";
import { getRuntimeAdapter } from "../../../../../src/prototypes/runtimeAdapter.ts";

const protoRoot = "prototypes/reality_anchor";
const pkg = await loadPrototypePackage(protoRoot);
const adapter = getRuntimeAdapter(pkg.mechanic);
const runtime = adapter.createRuntime(pkg.mechanic);
import { readFile } from "node:fs/promises";
const layout = await readFile(process.argv[2], "utf8");
const level = { id: "probe", title: "probe", layout, win: pkg.mechanic.win };
const initial = adapter.parseLevel(level);
const key = (p) => `${p.x},${p.y}`;
const seen = new Set();
const queue = [{ state: initial, depth: 0, via: "start" }];
const skey = (s) => `${key(s.player)}|${s.stickyGroups.map((g) => g.map(key).sort().join("+")).sort().join("|")}|${s.crates.map(key).sort().join("+")}`;
seen.add(skey(initial));
let processed = 0;
while (queue.length && processed < 400) {
  const { state, depth, via } = queue.shift();
  processed++;
  const moves = [];
  for (const inp of ["up", "down", "left", "right"]) {
    const t = runtime.step(state, inp, { winCondition: pkg.mechanic.win, maxStates: 10000 });
    if (!t.legal) { moves.push(`${inp}:ILLEGAL(${t.reason})`); continue; }
    moves.push(`${inp}:${(t.events ?? []).join("|") || "walk"}`);
    const k = skey(t.state);
    if (!seen.has(k)) { seen.add(k); queue.push({ state: t.state, depth: depth + 1, via: inp }); }
  }
  console.log(`d${depth} @(${key(state.player)}) [${state.stickyGroups.map((g) => g.map(key).sort().join("+")).join(" ")}] c[${state.crates.map(key).join(" ")}] :: ${moves.join("  ")}`);
}
console.log(`total unique states seen: ${seen.size}, queue remaining: ${queue.length}`);
