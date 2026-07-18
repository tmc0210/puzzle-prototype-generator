import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import { loadPrototypePackage } from "../../../../../../src/core/io.js";
import { enumerateRuntimeGraph } from "../../../../../../src/core/runtimeGraph.js";
import { solveWithRuntime } from "../../../../../../src/core/solver.js";
import type { LevelDoc } from "../../../../../../src/core/types.js";
import { getRuntimeAdapter } from "../../../../../../src/prototypes/runtimeAdapter.js";

const taskDir = import.meta.dirname;
const prototypeRoot = path.resolve(taskDir, "../../../..");
const pkg = await loadPrototypePackage(prototypeRoot);
const adapter = getRuntimeAdapter(pkg.mechanic);
const runtime = adapter.createRuntime(pkg.mechanic);
const runtimeOptions = { winCondition: pkg.mechanic.win, maxStates: 500_000 };

const canonicalInputs = ["left", "down", "left", "up", "right", "up", "left", "left"];
const zPrefix = ["left", "down", "left", "up"];
const pCutPrefix = [...zPrefix, "right", "up", "left"];
const lCutPrefix = [...zPrefix, "left", "left", "left", "up", "up", "left"];
const squarePrefix = ["left", "left", "up", "left", "left", "left", "down", "down", "right", "up"];
const wrongSquareObject = "C:|M:5,6;6,6;5,7;6,7|PL:P:5,1;L:4,1|BS:B:4,3;S:5,3";

function runPrefix(initial: ReturnType<typeof adapter.parseLevel>, inputs: string[]) {
  let state = initial;
  const steps: Array<{ input: string; legal: boolean; reason: string | null }> = [];
  for (const input of inputs) {
    const transition = runtime.step(state, input, runtimeOptions);
    steps.push({ input, legal: transition.legal, reason: transition.reason ?? null });
    if (!transition.legal) break;
    state = transition.state;
  }
  const legal = steps.length === inputs.length && steps.every((step) => step.legal);
  const suffix = legal ? solveWithRuntime(runtime, state, runtimeOptions) : null;
  const stateKey = runtime.key(state);
  return {
    legal,
    steps,
    stateKey,
    objectKey: stateKey.replace(/^Ply:[^|]+\|/, ""),
    suffix: suffix ? {
      found: suffix.found,
      status: suffix.searchStatus,
      exploredStates: suffix.exploredStates,
      cost: suffix.found ? suffix.cost : null,
    } : null,
  };
}

const comparisons = [];
for (const filename of ["v10_construct_z_dual_handle.txt", "v11_construct_z_balanced_handles.txt"]) {
  const layout = await readFile(path.join(taskDir, filename), "utf8");
  const level: LevelDoc = { id: filename, title: filename, layout, win: pkg.mechanic.win };
  const initial = adapter.parseLevel(level);
  const graph = enumerateRuntimeGraph(runtime, initial, pkg.mechanic.win, runtimeOptions, {
    maxStates: runtimeOptions.maxStates,
    terminalizeWins: true,
  });
  const pCut = runPrefix(initial, pCutPrefix);
  const lCut = runPrefix(initial, lCutPrefix);
  const squareReplay = runPrefix(initial, squarePrefix);
  const squareStateIndexes = graph.keys
    .map((key, index) => ({ key: key.replace(/^Ply:[^|]+\|/, ""), index }))
    .filter((entry) => entry.key === wrongSquareObject)
    .map((entry) => entry.index);
  const parent = new Map<number, (typeof graph.edges)[number]>();
  for (const edge of graph.edges) {
    if (graph.depthByIndex[edge.to] === graph.depthByIndex[edge.from]! + 1 && !parent.has(edge.to)) parent.set(edge.to, edge);
  }
  const prefixTo = (target: number) => {
    const actions: string[] = [];
    let cursor = target;
    while (cursor !== 0) {
      const edge = parent.get(cursor);
      if (!edge) throw new Error(`${filename}: missing shortest-path parent for ${cursor}`);
      actions.push(edge.action);
      cursor = edge.from;
    }
    return actions.reverse();
  };
  const shortestWrongSquarePrefix = squareStateIndexes.length > 0 ? prefixTo(squareStateIndexes[0]!) : null;
  comparisons.push({
    filename,
    graph: {
      status: graph.status,
      states: graph.keys.length,
      transitions: graph.edges.length,
      winStates: graph.winStateIndexes.size,
    },
    canonical: runPrefix(initial, canonicalInputs),
    pCut,
    lCut,
    sameObjectOutcomeAfterFirstCut: pCut.objectKey === lCut.objectKey,
    squareReplay,
    wrongSquareObjectReachable: squareStateIndexes.length > 0,
    wrongSquareStateCount: squareStateIndexes.length,
    shortestWrongSquarePrefix,
    shortestWrongSquareReplay: shortestWrongSquarePrefix ? runPrefix(initial, shortestWrongSquarePrefix) : null,
  });
}

if (!comparisons[0]!.wrongSquareObjectReachable) throw new Error("v10 wrong square stopped being reachable");
for (const comparison of comparisons) {
  if (!comparison.sameObjectOutcomeAfterFirstCut) throw new Error(`${comparison.filename}: P/L outcomes differ`);
  if (!comparison.pCut.suffix?.found || comparison.pCut.suffix.cost !== 1) throw new Error(`${comparison.filename}: P cut broken`);
  if (comparison.lCut.suffix?.found || comparison.lCut.suffix?.status !== "complete") throw new Error(`${comparison.filename}: L cut no longer dead`);
}

const report = {
  finding: comparisons[1]!.wrongSquareObjectReachable
    ? "V11 保留同一 Z 的 P 推／L 拉命运分叉，也仍能通过另一条路线构成无解 2x2 方块；它不是证据退化版。是否替代 V10 应按空间可读性与人测，不按状态数更少决定。"
    : "V11 保留同一 Z 的 P 推／L 拉命运分叉，但收紧底部后，V10 中真实可达的 2x2 错构形已在完整状态图中消失。V11 只压缩状态数，削弱了构形选择证据，因此不替代 V10。",
  comparisons,
};
await writeFile(path.join(taskDir, "v10_v11_compare.json"), `${JSON.stringify(report, null, 2)}\n`, "utf8");
console.log(JSON.stringify(report, null, 2));
