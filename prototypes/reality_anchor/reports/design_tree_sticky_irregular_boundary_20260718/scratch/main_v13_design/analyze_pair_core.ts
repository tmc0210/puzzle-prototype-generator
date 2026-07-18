import path from "node:path";
import { readFileSync } from "node:fs";

import { loadPrototypePackage } from "../../../../../../src/core/io.js";
import { enumerateRuntimeGraph } from "../../../../../../src/core/runtimeGraph.js";
import type { LevelDoc } from "../../../../../../src/core/types.js";
import { getRuntimeAdapter } from "../../../../../../src/prototypes/runtimeAdapter.js";

const prototypeRoot = path.resolve(import.meta.dirname, "../../../..");
const pkg = await loadPrototypePackage(prototypeRoot);
const adapter = getRuntimeAdapter(pkg.mechanic);
const runtime = adapter.createRuntime(pkg.mechanic);
const defaultLayout = `##########
#####SB###
####LP####
##########
#...M...@#
#MM....C.#
#G.......#
##########`;
const layoutPath = process.argv[2];
const layout = layoutPath ? readFileSync(path.resolve(layoutPath), "utf8").trimEnd() : defaultLayout;
const level: LevelDoc = { id: "pair_core", title: "pair_core", layout, win: pkg.mechanic.win };
const initial = adapter.parseLevel(level);
const graph = enumerateRuntimeGraph(runtime, initial, pkg.mechanic.win, { winCondition: pkg.mechanic.win, maxStates: 100_000 }, { maxStates: 100_000, terminalizeWins: false });
if (graph.status !== "complete") throw new Error(`graph ${graph.status}`);

type Edge = (typeof graph.edges)[number];
const incoming = new Map<number, Edge[]>();
const outgoing = new Map<number, Edge[]>();
for (const edge of graph.edges) {
  (incoming.get(edge.to) ?? (incoming.set(edge.to, []), incoming.get(edge.to)!)).push(edge);
  (outgoing.get(edge.from) ?? (outgoing.set(edge.from, []), outgoing.get(edge.from)!)).push(edge);
}

const objectKey = (state: number) => graph.keys[state]!.replace(/^Ply:[^|]+\|/, "");
const player = (state: number) => graph.keys[state]!.match(/^Ply:(\d+),(\d+)/)!.slice(1).map(Number) as [number, number];
const traceTo = (target: number) => {
  const actions: string[] = [];
  let cursor = target;
  while (cursor !== 0) {
    const edge = (incoming.get(cursor) ?? []).sort((a, b) => a.from - b.from || a.action.localeCompare(b.action))[0];
    if (!edge) throw new Error(`no predecessor ${cursor}`);
    actions.push(edge.action);
    cursor = edge.from;
  }
  return actions.reverse();
};

function parsedShape(state: number) {
  const object = objectKey(state);
  const crates = (object.match(/^C:([^|]*)\|M:/)?.[1] ?? "").split(";").filter(Boolean);
  const stickyRaw = object.match(/\|M:(.*?)\|PL:/)?.[1] ?? "";
  const components = stickyRaw ? stickyRaw.split("|").map((part) => part.split(";").filter(Boolean)) : [];
  if (crates.length || components.length !== 1 || components[0]!.length !== 4) return null;
  const pts = components[0]!.map((cell) => cell.split(",").map(Number) as [number, number]);
  const minX = Math.min(...pts.map(([x]) => x));
  const minY = Math.min(...pts.map(([, y]) => y));
  return pts.map(([x, y]) => `${x - minX},${y - minY}`).sort().join(";");
}

const wanted = new Set(["0,0;1,0;1,1;2,1", "0,1;1,0;1,1;2,0"]);
const records: unknown[] = [];
for (const push of graph.edges) {
  const shape = parsedShape(push.from);
  if (!shape || !wanted.has(shape)) continue;
  const beforePlayer = player(push.from);
  const afterPlayer = player(push.to);
  if (push.action !== "left" || beforePlayer[0] < 5 || afterPlayer[0] > 4 || !(push.events ?? []).some((event) => event.startsWith("push_object:sticky"))) continue;
  const pushedObject = objectKey(push.to);
  const walkQueue = [push.to];
  const walkPrev = new Map<number, Edge | null>([[push.to, null]]);
  for (let i = 0; i < walkQueue.length; i += 1) {
    const state = walkQueue[i]!;
    for (const edge of outgoing.get(state) ?? []) {
      if (objectKey(edge.to) !== pushedObject || walkPrev.has(edge.to)) continue;
      walkPrev.set(edge.to, edge);
      walkQueue.push(edge.to);
    }
  }
  for (const state of walkQueue) {
    for (const pull of outgoing.get(state) ?? []) {
      if (!["up", "down"].includes(pull.action) || !(pull.events ?? []).some((event) => event.startsWith("pull_object:sticky"))) continue;
      const walkActions: string[] = [];
      let cursor = state;
      while (cursor !== push.to) {
        const edge = walkPrev.get(cursor)!;
        if (!edge) break;
        walkActions.push(edge.action);
        cursor = edge.from;
      }
      walkActions.reverse();
      records.push({
        shape,
        constructSteps: traceTo(push.from).length,
        constructTrace: traceTo(push.from),
        prePushKey: graph.keys[push.from],
        push: { action: push.action, fromPlayer: beforePlayer, toPlayer: afterPlayer, events: push.events, objectAfter: pushedObject },
        walkActions,
        pull: { action: pull.action, fromPlayer: player(pull.from), toPlayer: player(pull.to), events: pull.events, objectAfter: objectKey(pull.to) },
      });
    }
  }
}

console.log(JSON.stringify({ graph: { states: graph.keys.length, transitions: graph.edges.length }, records }, null, 2));
