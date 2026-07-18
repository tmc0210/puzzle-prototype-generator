import { readFile, writeFile, mkdir } from "node:fs/promises";
import { createHash } from "node:crypto";
import path from "node:path";

import { loadPrototypePackage } from "../../../../../../src/core/io.js";
import { enumerateRuntimeGraph } from "../../../../../../src/core/runtimeGraph.js";
import type { LevelDoc } from "../../../../../../src/core/types.js";
import { getRuntimeAdapter } from "../../../../../../src/prototypes/runtimeAdapter.js";

const here = import.meta.dirname;
const prototypeRoot = path.resolve(here, "../../../..");
const layoutPath = path.resolve(here, "../../nodes/construct_prefix_v12/layout.txt");
const layout = await readFile(layoutPath, "utf8");
const expectedLayoutSha256 = "67eb19809e76d2b459e511520fb3e79b766cf6da42596acb3d88b9566959eb69";
const exactVersion = `v12_sha256_${expectedLayoutSha256}`;
const layoutSha256 = createHash("sha256").update(layout).digest("hex");
if (layoutSha256 !== expectedLayoutSha256) {
  throw new Error(`layout hash mismatch: expected ${expectedLayoutSha256}, got ${layoutSha256}`);
}
const pkg = await loadPrototypePackage(prototypeRoot);
const adapter = getRuntimeAdapter(pkg.mechanic);
const runtime = adapter.createRuntime(pkg.mechanic);
const options = { winCondition: pkg.mechanic.win, maxStates: 500_000 };
const level: LevelDoc = { id: "RA_STICKY_IRREGULAR_BOUNDARY_CONSTRUCT_S_V12_EQUIVALENCE", title: "RA_STICKY_IRREGULAR_BOUNDARY_CONSTRUCT_S_V12_EQUIVALENCE", layout, win: pkg.mechanic.win };
const initial = adapter.parseLevel(level);
const graph = enumerateRuntimeGraph(runtime, initial, pkg.mechanic.win, options, {
  maxStates: 500_000,
  terminalizeWins: true,
});
if (graph.status !== "complete") throw new Error(`incomplete graph: ${graph.status}`);

type Edge = (typeof graph.edges)[number];
const outgoing = new Map<number, Edge[]>();
const incoming = new Map<number, Edge[]>();
for (const edge of graph.edges) {
  const outs = outgoing.get(edge.from) ?? [];
  outs.push(edge);
  outgoing.set(edge.from, outs);
  const ins = incoming.get(edge.to) ?? [];
  ins.push(edge);
  incoming.set(edge.to, ins);
}
for (const edges of outgoing.values()) edges.sort((a, b) => a.action.localeCompare(b.action) || a.to - b.to);
const wins = graph.winStateIndexes;
const objectKey = (state: number) => graph.keys[state]!.replace(/^Ply:[^|]+\|/, "");
const playerKey = (state: number) => graph.keys[state]!.match(/^Ply:([^|]+)/)?.[1] ?? "?";

// Complete reverse win closure.
const closure = new Set<number>(wins);
const reverseQueue = [...wins];
for (let i = 0; i < reverseQueue.length; i += 1) {
  for (const edge of incoming.get(reverseQueue[i]!) ?? []) {
    if (closure.has(edge.from)) continue;
    closure.add(edge.from);
    reverseQueue.push(edge.from);
  }
}
const winEdges = graph.edges.filter((e) => closure.has(e.from) && closure.has(e.to));

// Kosaraju SCCs on the complete win closure.
const adj = new Map<number, number[]>();
const rev = new Map<number, number[]>();
for (const e of winEdges) {
  (adj.get(e.from) ?? (adj.set(e.from, []), adj.get(e.from)!)).push(e.to);
  (rev.get(e.to) ?? (rev.set(e.to, []), rev.get(e.to)!)).push(e.from);
}
const visited = new Set<number>();
const finish: number[] = [];
for (const root of [...closure].sort((a, b) => a - b)) {
  if (visited.has(root)) continue;
  visited.add(root);
  const stack: Array<[number, number]> = [[root, 0]];
  while (stack.length) {
    const top = stack[stack.length - 1]!;
    const targets = adj.get(top[0]) ?? [];
    if (top[1] < targets.length) {
      const next = targets[top[1]++]!;
      if (!visited.has(next)) { visited.add(next); stack.push([next, 0]); }
    } else { finish.push(top[0]); stack.pop(); }
  }
}
const assigned = new Set<number>();
const sccs: number[][] = [];
for (let i = finish.length - 1; i >= 0; i -= 1) {
  const root = finish[i]!;
  if (assigned.has(root)) continue;
  assigned.add(root);
  const states: number[] = [];
  const stack = [root];
  while (stack.length) {
    const state = stack.pop()!;
    states.push(state);
    for (const next of rev.get(state) ?? []) if (!assigned.has(next)) { assigned.add(next); stack.push(next); }
  }
  sccs.push(states.sort((a, b) => a - b));
}
const sccOf = new Map<number, number>();
sccs.forEach((states, id) => states.forEach((state) => sccOf.set(state, id)));
const dag = new Map<number, Set<number>>();
for (const e of winEdges) {
  const from = sccOf.get(e.from)!;
  const to = sccOf.get(e.to)!;
  if (from !== to) (dag.get(from) ?? (dag.set(from, new Set()), dag.get(from)!)).add(to);
}
const sourceScc = sccOf.get(0)!;
const winSccs = new Set([...wins].map((state) => sccOf.get(state)!));
const sccPaths: number[][] = [];
function enumerateSccPaths(current: number, prefix: number[]) {
  const pathNow = [...prefix, current];
  if (winSccs.has(current)) { sccPaths.push(pathNow); return; }
  for (const next of [...(dag.get(current) ?? [])].sort((a, b) => a - b)) enumerateSccPaths(next, pathNow);
}
enumerateSccPaths(sourceScc, []);

function representativeForSccPath(sccPath: number[]) {
  type Item = { state: number; progress: number; edges: Edge[] };
  const queue: Item[] = [{ state: 0, progress: 0, edges: [] }];
  const seen = new Set([`0:0`]);
  for (let cursor = 0; cursor < queue.length; cursor += 1) {
    const item = queue[cursor]!;
    if (wins.has(item.state) && item.progress === sccPath.length - 1) return item.edges;
    for (const edge of outgoing.get(item.state) ?? []) {
      if (!closure.has(edge.to)) continue;
      const toScc = sccOf.get(edge.to)!;
      let progress = item.progress;
      if (toScc !== sccPath[progress]) {
        if (progress + 1 >= sccPath.length || toScc !== sccPath[progress + 1]) continue;
        progress += 1;
      }
      const key = `${edge.to}:${progress}`;
      if (seen.has(key)) continue;
      seen.add(key);
      queue.push({ state: edge.to, progress, edges: [...item.edges, edge] });
    }
  }
  throw new Error(`no representative for ${sccPath.join("->")}`);
}

function compactTrace(edges: Edge[]) {
  return edges.map((e, step) => ({
    step: step + 1,
    action: e.action,
    fromPlayer: playerKey(e.from),
    toPlayer: playerKey(e.to),
    objectChanged: objectKey(e.from) !== objectKey(e.to),
    fromObject: objectKey(e.from),
    toObject: objectKey(e.to),
    events: e.events,
    fromScc: sccOf.get(e.from),
    toScc: sccOf.get(e.to),
  }));
}

const canonicalInputs = ["down", "left", "left", "left", "right", "right", "right", "up", "left", "left", "down", "left", "left", "down"];
let canonicalState = initial;
const canonicalTrace: Array<{ step: number; action: string; state: number; key: string; events: string[] }> = [];
for (const [i, action] of canonicalInputs.entries()) {
  const t = runtime.step(canonicalState, action, options);
  if (!t.legal) throw new Error(`illegal canonical step ${i + 1}`);
  canonicalState = t.state;
  const state = graph.indexByKey.get(runtime.key(canonicalState));
  if (state === undefined) throw new Error("canonical state absent from graph");
  canonicalTrace.push({ step: i + 1, action, state, key: runtime.key(canonicalState), events: t.events });
}
const objectAtCanonicalStep = (step: number) => objectKey(canonicalTrace[step - 1]!.state);
const canonicalThreeL = objectAtCanonicalStep(9);
const canonicalFourS = objectAtCanonicalStep(10);
const canonicalPreFinal = objectAtCanonicalStep(13);
const canonicalWin = objectAtCanonicalStep(14);

function replay(inputs: string[]) {
  let state = initial;
  for (const action of inputs) {
    const transition = runtime.step(state, action, options);
    if (!transition.legal) throw new Error(`illegal replay: ${inputs.join(",")}`);
    state = transition.state;
  }
  const index = graph.indexByKey.get(runtime.key(state));
  if (index === undefined) throw new Error("replay state absent from complete graph");
  const descendants = new Set([index]);
  const queue = [index];
  let foundWin = wins.has(index);
  for (let i = 0; i < queue.length; i += 1) {
    for (const edge of outgoing.get(queue[i]!) ?? []) {
      if (descendants.has(edge.to)) continue;
      descendants.add(edge.to);
      queue.push(edge.to);
      if (wins.has(edge.to)) foundWin = true;
    }
  }
  return {
    inputs,
    stateKey: graph.keys[index],
    objectKey: objectKey(index),
    completeGraphDescendants: descendants.size,
    foundWin,
    inWinClosure: closure.has(index),
  };
}

const wrongSquare = replay(["left", "left", "left", "right", "right", "right", "down", "left", "left", "left"]);
const upperPartialThenLower = replay(["left", "left", "right", "right", "down", "left", "left"]);
const terminalUpperContactWitness = replay([
  ...canonicalInputs.slice(0, 10),
  "left", "down", "left", "down",
]);

function avoidObject(forbidden: string) {
  const seen = new Set<number>();
  const queue: number[] = [];
  if (objectKey(0) !== forbidden) { seen.add(0); queue.push(0); }
  let foundWin = false;
  for (let i = 0; i < queue.length && !foundWin; i += 1) {
    for (const e of outgoing.get(queue[i]!) ?? []) {
      if (objectKey(e.to) === forbidden || seen.has(e.to)) continue;
      seen.add(e.to); queue.push(e.to);
      if (wins.has(e.to)) { foundWin = true; break; }
    }
  }
  return { status: "complete", exploredStates: seen.size, foundWin };
}

function avoidEdge(predicate: (e: Edge) => boolean) {
  const seen = new Set([0]);
  const queue = [0];
  let foundWin = wins.has(0);
  let forbiddenEdgesEncountered = 0;
  for (let i = 0; i < queue.length && !foundWin; i += 1) {
    for (const e of outgoing.get(queue[i]!) ?? []) {
      if (predicate(e)) { forbiddenEdgesEncountered += 1; continue; }
      if (seen.has(e.to)) continue;
      seen.add(e.to); queue.push(e.to);
      if (wins.has(e.to)) { foundWin = true; break; }
    }
  }
  return { status: "complete", exploredStates: seen.size, foundWin, forbiddenEdgesEncountered };
}

const exactFourSConstructionLeftPush = (e: Edge) => objectKey(e.from) === canonicalThreeL
  && objectKey(e.to) === canonicalFourS
  && e.action === "left"
  && e.events.some((x) => x.startsWith("push_object"));
const exactTerminalLeftPush = (e: Edge) => objectKey(e.from) === canonicalFourS
  && objectKey(e.to) === canonicalPreFinal
  && e.action === "left"
  && e.events.some((x) => x.startsWith("push_object"));
const exactDownPull = (e: Edge) => objectKey(e.from) === canonicalPreFinal
  && objectKey(e.to) === canonicalWin
  && e.action === "down"
  && e.events.some((x) => x.startsWith("pull_object"));
const describeEdge = (e: Edge) => ({
  action: e.action,
  fromPlayer: playerKey(e.from),
  toPlayer: playerKey(e.to),
  fromObject: objectKey(e.from),
  toObject: objectKey(e.to),
  events: e.events,
});

const report = {
  candidateId: "RA_STICKY_IRREGULAR_BOUNDARY_CONSTRUCT_S",
  exactVersion,
  layoutSha256,
  graph: { status: graph.status, states: graph.states.length, transitions: graph.edges.length, winStates: wins.size, winClosureStates: closure.size, winClosureEdges: winEdges.length },
  canonical: {
    trace: canonicalTrace,
    threeL: canonicalThreeL,
    fourS: canonicalFourS,
    preFinal: canonicalPreFinal,
    win: canonicalWin,
  },
  scc: {
    count: sccs.length,
    source: sourceScc,
    wins: [...winSccs],
    pathCount: sccPaths.length,
    paths: sccPaths.map((sccPath, i) => {
      const edges = representativeForSccPath(sccPath);
      return {
        id: i + 1,
        sccPath,
        inputs: edges.map((e) => e.action),
        fullTrace: compactTrace(edges),
        objectChangeTrace: compactTrace(edges).filter((x) => x.objectChanged),
      };
    }),
    components: sccs.map((states, id) => ({
      id,
      stateCount: states.length,
      objectKeys: [...new Set(states.map(objectKey))].sort(),
      players: [...new Set(states.map(playerKey))].sort(),
      next: [...(dag.get(id) ?? [])].sort((a, b) => a - b),
    })),
  },
  necessity: {
    threeL: avoidObject(canonicalThreeL),
    fourS: avoidObject(canonicalFourS),
    exactFourSConstructionLeftPush: avoidEdge(exactFourSConstructionLeftPush),
    exactTerminalLeftPush: avoidEdge(exactTerminalLeftPush),
    exactDownPull: avoidEdge(exactDownPull),
    matchedMandatoryEdges: {
      fourSConstructionLeftPush: graph.edges.filter(exactFourSConstructionLeftPush).map(describeEdge),
      terminalLeftPush: graph.edges.filter(exactTerminalLeftPush).map(describeEdge),
      downPull: graph.edges.filter(exactDownPull).map(describeEdge),
    },
  },
  deadEnds: {
    wrongSquare,
    upperPartialThenLower,
  },
  equivalentVariant: {
    terminalUpperContactWitness,
    note: "四格 S 从上接触格左推后，经 down,left 两次 walk 到达唯一 down-pull 站位；仅反驳“left push 与 down pull 必须相邻输入”。",
  },
};

await mkdir(here, { recursive: true });
await writeFile(path.join(here, "equivalence_audit.json"), `${JSON.stringify(report, null, 2)}\n`, "utf8");
console.log(JSON.stringify({
  graph: report.graph,
  canonical: { threeL: report.canonical.threeL, fourS: report.canonical.fourS, preFinal: report.canonical.preFinal, win: report.canonical.win },
  pathCount: report.scc.pathCount,
  paths: report.scc.paths.map((p) => ({ id: p.id, sccPath: p.sccPath, inputs: p.inputs, objectChangeTrace: p.objectChangeTrace })),
  necessity: report.necessity,
  deadEnds: report.deadEnds,
  equivalentVariant: report.equivalentVariant,
}, null, 2));
