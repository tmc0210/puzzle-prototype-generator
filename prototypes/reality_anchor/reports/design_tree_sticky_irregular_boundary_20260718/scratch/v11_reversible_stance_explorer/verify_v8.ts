import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import { loadPrototypePackage } from "../../../../../../src/core/io.js";
import { enumerateRuntimeGraph } from "../../../../../../src/core/runtimeGraph.js";
import type { LevelDoc } from "../../../../../../src/core/types.js";
import { getRuntimeAdapter } from "../../../../../../src/prototypes/runtimeAdapter.js";

const layoutArg = process.argv[2];
if (!layoutArg) throw new Error("usage: verify_v8.ts <layout> [maxStates]");
const maxStates = Number(process.argv[3] ?? 500_000);
const layoutPath = path.resolve(layoutArg);
const pkg = await loadPrototypePackage(path.resolve(import.meta.dirname, "../../../.."));
const adapter = getRuntimeAdapter(pkg.mechanic);
const runtime = adapter.createRuntime(pkg.mechanic);
const layout = await readFile(layoutPath, "utf8");
const level: LevelDoc = { id: path.basename(layoutPath), title: path.basename(layoutPath), layout, win: pkg.mechanic.win };
const initial = adapter.parseLevel(level);
const graph = enumerateRuntimeGraph(runtime, initial, level.win!, { winCondition: level.win!, maxStates }, { maxStates, terminalizeWins: true });
type Edge = (typeof graph.edges)[number];
const outgoing = new Map<number, Edge[]>();
const incoming = new Map<number, Edge[]>();
for (const edge of graph.edges) {
  (outgoing.get(edge.from) ?? outgoing.set(edge.from, []).get(edge.from)!).push(edge);
  (incoming.get(edge.to) ?? incoming.set(edge.to, []).get(edge.to)!).push(edge);
}
const objectKey = (index: number) => graph.keys[index]!.replace(/^Ply:[^|]+\|/, "");
const wins = new Set(graph.winStateIndexes);
const canReachWin = new Set<number>(graph.winStateIndexes);
const reverseQueue = [...graph.winStateIndexes];
for (let i = 0; i < reverseQueue.length; i += 1) {
  for (const edge of incoming.get(reverseQueue[i]!) ?? []) {
    if (canReachWin.has(edge.from)) continue;
    canReachWin.add(edge.from);
    reverseQueue.push(edge.from);
  }
}

function follow(actions: string[]) {
  let state = 0;
  const events: string[][] = [];
  for (const action of actions) {
    const edge = (outgoing.get(state) ?? []).find((candidate) => candidate.action === action);
    if (!edge) return { legal: false, state, key: graph.keys[state], win: wins.has(state), events };
    state = edge.to;
    events.push(edge.events);
  }
  return { legal: true, state, key: graph.keys[state], win: wins.has(state), events };
}

function reachesWin(allow: (edge: Edge) => boolean) {
  const seen = new Set([0]);
  const queue = [0];
  for (let i = 0; i < queue.length; i += 1) {
    const state = queue[i]!;
    if (wins.has(state)) return { found: true, explored: seen.size };
    for (const edge of outgoing.get(state) ?? []) {
      if (!allow(edge) || seen.has(edge.to)) continue;
      seen.add(edge.to);
      queue.push(edge.to);
    }
  }
  return { found: false, explored: seen.size };
}

const suffix = "|PL:none|BS:B:8,1;S:7,1";
const roles = {
  separatedInitial: `C:|M:4,3;5,3|6,5${suffix}`,
  separatedStanceA: `C:|M:5,3;6,3|6,5${suffix}`,
  separatedStanceB: `C:|M:6,3;7,3|6,5${suffix}`,
  constructedCorrectL: `C:|M:5,4;6,4;6,5${suffix}`,
  constructedWrongFootL: `C:|M:6,4;7,4;6,5${suffix}`,
  extractedCorrectL: `C:|M:5,3;6,3;6,4${suffix}`,
  boundaryReadyCorrectL: `C:|M:6,3;7,3;7,4${suffix}`,
  finalCutProducts: `C:8,3;8,4|M:7,3${suffix}`,
};
const isTransition = (edge: Edge, from: string, to: string) => objectKey(edge.from) === from && objectKey(edge.to) === to;

const openingPrefix = path.basename(layoutPath).startsWith("v9_") ? ["down"] : [];
const canonicalInputs = [...openingPrefix, "right", "up", "right", "down", "left", "left", "down", "down", "right", "right", "up", "right", "right"];
const trialStartInputs = [...openingPrefix, "right"];
const trialForwardInputs = [...openingPrefix, "right", "right"];
const trialReturnInputs = [...openingPrefix, "right", "right", "down", "right", "right", "right", "up", "left", "down", "left", "left", "down", "left", "left", "up", "up", "right"];
const trialThenWinInputs = [...trialReturnInputs, ...canonicalInputs.slice(openingPrefix.length + 1)];
const wrongConstructionInputs = [...openingPrefix, "right", "right", "up", "right", "down"];
const trialStart = follow(trialStartInputs);
const trialForward = follow(trialForwardInputs);
const trialReturn = follow(trialReturnInputs);
const wrongConstruction = follow(wrongConstructionInputs);

const stateIndexesForObject = (key: string) => graph.keys.map((_, index) => index).filter((index) => objectKey(index) === key);
const wrongConstructedStates = stateIndexesForObject(roles.constructedWrongFootL);
const winObjectKeys = [...new Set([...wins].map((index) => objectKey(index)))];
const counterfactuals = {
  forbid_any_sticky_merge: reachesWin((edge) => !edge.events.some((event) => event.startsWith("sticky_merge"))),
  forbid_correct_orientation_merge: reachesWin((edge) => !isTransition(edge, roles.separatedStanceA, roles.constructedCorrectL)),
  forbid_shape_handle_extraction: reachesWin((edge) => !isTransition(edge, roles.constructedCorrectL, roles.extractedCorrectL)),
  forbid_boundary_approach_as_L: reachesWin((edge) => !isTransition(edge, roles.extractedCorrectL, roles.boundaryReadyCorrectL)),
  forbid_two_cell_boundary_cut: reachesWin((edge) => !isTransition(edge, roles.boundaryReadyCorrectL, roles.finalCutProducts)),
};

const result = {
  layout: layoutPath,
  graph: {
    status: graph.status,
    states: graph.keys.length,
    transitions: graph.edges.length,
    wins: wins.size,
    winReachingStates: canReachWin.size,
  },
  roles,
  canonical: { inputs: canonicalInputs, replay: follow(canonicalInputs) },
  constructionFacts: {
    initialConnectedStickyComponents: 2,
    correctWorkingLAbsentInitially: objectKey(0) !== roles.constructedCorrectL,
    wrongConstructionInputs,
    wrongConstruction,
    wrongConstructedStateCount: wrongConstructedStates.length,
    anyWrongConstructedStateCanReachWin: wrongConstructedStates.some((index) => canReachWin.has(index)),
  },
  reversiblePositionTrial: {
    startKey: trialStart.key,
    shiftedKey: trialForward.key,
    returnedKey: trialReturn.key,
    exactFullStateReturn: trialStart.legal && trialForward.legal && trialReturn.legal && trialStart.key === trialReturn.key,
    trialThenWin: follow(trialThenWinInputs),
  },
  uniquenessFacts: {
    winObjectKeys,
    allWinsUseSameFinalObjectResponsibilities: winObjectKeys.length === 1 && winObjectKeys[0] === roles.finalCutProducts,
    counterfactuals,
  },
};
const outputName = path.basename(layoutPath).startsWith("v9_") ? "v9_verification.json" : "v8_verification.json";
await writeFile(path.join(path.dirname(layoutPath), outputName), `${JSON.stringify(result, null, 2)}\n`, "utf8");
console.log(JSON.stringify(result, null, 2));
