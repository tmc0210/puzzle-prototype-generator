import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { loadPrototypePackage } from "../../../../../../src/core/io.js";
import { enumerateRuntimeGraph, type RuntimeGraphEdge } from "../../../../../../src/core/runtimeGraph.js";
import { getRuntimeAdapter } from "../../../../../../src/prototypes/runtimeAdapter.js";

const maxStates = Number(process.argv[2] ?? 50_000);
const pkg = await loadPrototypePackage("prototypes/reality_anchor");
const adapter = getRuntimeAdapter(pkg.mechanic);
const runtime = adapter.createRuntime(pkg.mechanic);
const options = { winCondition: pkg.mechanic.win } as never;

const full = graph(parse("non_collinear_rebind_skeleton_v3.txt"));
const unmerged = graph(parse("final_unmerged_probe_v3.txt"));

console.log(JSON.stringify({
  maxStates,
  full: {
    ...summary(full),
    historyWitnesses: historyWitnesses(full),
  },
  unmerged: {
    ...summary(unmerged),
    firstWin: firstWin(unmerged),
  },
}, null, 2));

function parse(name: string) {
  const path = fileURLToPath(new URL(`./${name}`, import.meta.url));
  return adapter.parseLevel({
    id: name,
    title: name,
    layout: readFileSync(path, "utf8"),
    win: pkg.mechanic.win,
  });
}

function graph(state: unknown) {
  return enumerateRuntimeGraph(
    runtime as never,
    state as never,
    pkg.mechanic.win,
    options,
    { maxStates, terminalizeWins: true },
  );
}

function summary(input: ReturnType<typeof graph>) {
  return {
    status: input.status,
    reason: input.reason,
    states: input.states.length,
    transitions: input.edges.length,
    rawWins: input.winStateIndexes.size,
    objectWinFamilies: new Set(
      [...input.winStateIndexes].map(index => input.keys[index]!.replace(/^Ply:[^|]+\|/, "")),
    ).size,
  };
}

function historyWitnesses(input: ReturnType<typeof graph>) {
  const CUT = 1;
  const FULL_REBIND = 2;
  const PHASE_CRATE_PUSH = 4;
  const found = new Map<string, ReturnType<typeof compactWitness>>();
  const outgoing = outgoingEdges(input);
  const queue: Array<{ state: number; mask: number; edges: RuntimeGraphEdge[] }> = [
    { state: 0, mask: 0, edges: [] },
  ];
  const visited = new Set(["0|0"]);
  for (let head = 0; head < queue.length; head += 1) {
    const current = queue[head]!;
    if (input.winStateIndexes.has(current.state)) {
      const category = (current.mask & CUT) === 0
        ? "win_without_cut"
        : (current.mask & FULL_REBIND) === 0
          ? "win_cut_without_full_rebind"
          : (current.mask & PHASE_CRATE_PUSH) === 0
            ? "win_rebind_without_phase_push"
            : "win_with_cut_phase_rebind";
      if (!found.has(category)) found.set(category, compactWitness(current.edges));
    }
    for (const edge of outgoing.get(current.state) ?? []) {
      let mask = current.mask;
      if (edge.events.some(event => event.startsWith("sticky_to_box:"))) mask |= CUT;
      if (edge.events.includes("box_to_sticky:n4")) mask |= FULL_REBIND;
      if (edge.events.some(event => event.startsWith("push_object:crate#"))) mask |= PHASE_CRATE_PUSH;
      const key = `${edge.to}|${mask}`;
      if (visited.has(key)) continue;
      visited.add(key);
      queue.push({ state: edge.to, mask, edges: [...current.edges, edge] });
    }
  }
  return Object.fromEntries(found);
}

function firstWin(input: ReturnType<typeof graph>) {
  const outgoing = outgoingEdges(input);
  const queue: Array<{ state: number; edges: RuntimeGraphEdge[] }> = [{ state: 0, edges: [] }];
  const visited = new Set([0]);
  for (let head = 0; head < queue.length; head += 1) {
    const current = queue[head]!;
    if (input.winStateIndexes.has(current.state)) return compactWitness(current.edges);
    for (const edge of outgoing.get(current.state) ?? []) {
      if (visited.has(edge.to)) continue;
      visited.add(edge.to);
      queue.push({ state: edge.to, edges: [...current.edges, edge] });
    }
  }
  return null;
}

function outgoingEdges(input: ReturnType<typeof graph>) {
  const outgoing = new Map<number, RuntimeGraphEdge[]>();
  for (const edge of input.edges) {
    const list = outgoing.get(edge.from) ?? [];
    list.push(edge);
    outgoing.set(edge.from, list);
  }
  return outgoing;
}

function compactWitness(edges: RuntimeGraphEdge[]) {
  return {
    length: edges.length,
    inputs: edges.map(edge => edge.action),
    nonWalk: edges
      .map((edge, index) => ({ index: index + 1, input: edge.action, events: edge.events }))
      .filter(step => step.events.some(event => event !== "walk")),
  };
}
