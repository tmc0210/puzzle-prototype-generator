import { createHash } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import { loadPrototypePackage } from "../../../../../../src/core/io.js";
import { enumerateRuntimeGraph } from "../../../../../../src/core/runtimeGraph.js";
import { solveWithRuntime } from "../../../../../../src/core/solver.js";
import type { LevelDoc } from "../../../../../../src/core/types.js";
import { getRuntimeAdapter } from "../../../../../../src/prototypes/runtimeAdapter.js";

const taskDir = import.meta.dirname;
const layoutFilename = process.argv[2] ?? "v10_construct_z_dual_handle.txt";
const layoutPath = path.join(taskDir, layoutFilename);
const evidenceFilename = layoutFilename.startsWith("v11_") ? "v11_evidence.json" : "v10_evidence.json";
const prototypeRoot = path.resolve(taskDir, "../../../..");
const maxStates = 500_000;
const canonicalInputs = ["left", "down", "left", "up", "right", "up", "left", "left"];
const zPrefix = ["left", "down", "left", "up"];
const pHandlePrefix = [...zPrefix, "right", "up"];
const lHandlePrefix = [...zPrefix, "left", "left", "left", "up", "up"];
const squarePrefix = layoutFilename.startsWith("v11_")
  ? ["left", "left", "down", "left", "up"]
  : ["left", "left", "up", "left", "left", "left", "down", "down", "right", "up"];

const pkg = await loadPrototypePackage(prototypeRoot);
const adapter = getRuntimeAdapter(pkg.mechanic);
const runtime = adapter.createRuntime(pkg.mechanic);
const layout = await readFile(layoutPath, "utf8");
const layoutSha256 = createHash("sha256").update(layout).digest("hex");
const level: LevelDoc = { id: layoutFilename, title: layoutFilename, layout, win: pkg.mechanic.win };
const initial = adapter.parseLevel(level);
const runtimeOptions = { winCondition: pkg.mechanic.win, maxStates };
const graph = enumerateRuntimeGraph(runtime, initial, pkg.mechanic.win, runtimeOptions, { maxStates, terminalizeWins: true });
if (graph.status !== "complete") throw new Error(`graph incomplete: ${graph.status}`);

type Edge = (typeof graph.edges)[number];
const outgoing = new Map<number, Edge[]>();
const incoming = new Map<number, Edge[]>();
for (const edge of graph.edges) {
  (outgoing.get(edge.from) ?? outgoing.set(edge.from, []).get(edge.from)!).push(edge);
  (incoming.get(edge.to) ?? incoming.set(edge.to, []).get(edge.to)!).push(edge);
}
const objectKeyAt = (index: number) => graph.keys[index]!.replace(/^Ply:[^|]+\|/, "");

const winReaching = new Set<number>(graph.winStateIndexes);
const reverseQueue = [...graph.winStateIndexes];
for (let i = 0; i < reverseQueue.length; i += 1) {
  for (const edge of incoming.get(reverseQueue[i]!) ?? []) {
    if (winReaching.has(edge.from)) continue;
    winReaching.add(edge.from);
    reverseQueue.push(edge.from);
  }
}
const winReachingEdges = graph.edges.filter((edge) => winReaching.has(edge.from) && winReaching.has(edge.to));

function runPrefix(inputs: string[]) {
  let state = initial;
  const steps: Array<{ step: number; input: string; legal: boolean; reason: string | null; events: string[]; stateKey: string; render: string }> = [];
  for (const [index, input] of inputs.entries()) {
    const transition = runtime.step(state, input, runtimeOptions);
    if (transition.legal) state = transition.state;
    steps.push({
      step: index + 1,
      input,
      legal: transition.legal,
      reason: transition.reason ?? null,
      events: transition.events ?? [],
      stateKey: runtime.key(state),
      render: adapter.renderState(state).trimEnd(),
    });
    if (!transition.legal) break;
  }
  const legal = steps.length === inputs.length && steps.every((step) => step.legal);
  const suffix = legal ? solveWithRuntime(runtime, state, runtimeOptions) : null;
  const stateKey = runtime.key(state);
  return {
    inputs,
    legal,
    stateKey,
    objectKey: stateKey.replace(/^Ply:[^|]+\|/, ""),
    render: adapter.renderState(state).trimEnd(),
    steps,
    suffix: suffix ? {
      found: suffix.found,
      searchStatus: suffix.searchStatus,
      exploredStates: suffix.exploredStates,
      cost: suffix.found ? suffix.cost : null,
      inputs: suffix.found ? suffix.inputs : [],
    } : null,
  };
}

const canonical = runPrefix(canonicalInputs);
const zConstructed = runPrefix(zPrefix);
const pHandle = runPrefix(pHandlePrefix);
const pCut = runPrefix([...pHandlePrefix, "left"]);
const lHandle = runPrefix(lHandlePrefix);
const lCut = runPrefix([...lHandlePrefix, "left"]);
const squareMerge = runPrefix(squarePrefix);
if (!canonical.legal || !canonical.suffix?.found || canonical.suffix.cost !== 0) throw new Error("canonical failed");
if (!zConstructed.legal || !pCut.legal || !lCut.legal || !squareMerge.legal) throw new Error("counterfactual prefix failed");
if (pCut.objectKey !== lCut.objectKey) throw new Error("P/L cut object outcomes no longer match");
if (!pCut.suffix?.found || pCut.suffix.cost !== 1) throw new Error("P-side cut must retain one-step win suffix");
if (lCut.suffix?.found || lCut.suffix?.searchStatus !== "complete") throw new Error("L-side cut unexpectedly reaches win");
if (squareMerge.suffix?.found || squareMerge.suffix?.searchStatus !== "complete") throw new Error("square merge unexpectedly reaches win");

const roles = {
  initial: runPrefix([]).objectKey,
  shiftedLowerDomino: runPrefix(["left"]).objectKey,
  constructedZ: zConstructed.objectKey,
  cutZ: pCut.objectKey,
  win: canonical.objectKey,
  wrongSquare: squareMerge.objectKey,
};

function reachesWinWithout(forbidden: (edge: Edge) => boolean) {
  const seen = new Set([0]);
  const queue = [0];
  for (let i = 0; i < queue.length; i += 1) {
    const state = queue[i]!;
    if (graph.winStateIndexes.has(state)) return { foundWin: true, exploredStates: seen.size, status: "found" };
    for (const edge of outgoing.get(state) ?? []) {
      if (forbidden(edge) || seen.has(edge.to)) continue;
      seen.add(edge.to);
      queue.push(edge.to);
    }
  }
  return { foundWin: false, exploredStates: seen.size, status: "complete" };
}
const edgeMatches = (edge: Edge, from: string, to: string, action: string, eventPrefix: string) =>
  objectKeyAt(edge.from) === from && objectKeyAt(edge.to) === to && edge.action === action
  && edge.events.some((event) => event.startsWith(eventPrefix));
const counterfactuals = {
  forbidInitialLeftShift: reachesWinWithout((edge) => edgeMatches(edge, roles.initial, roles.shiftedLowerDomino, "left", "push_object:sticky")),
  forbidZMerge: reachesWinWithout((edge) => edgeMatches(edge, roles.shiftedLowerDomino, roles.constructedZ, "up", "sticky_merge")),
  forbidPSideCut: reachesWinWithout((edge) => edgeMatches(edge, roles.constructedZ, roles.cutZ, "left", "push_object:sticky")),
  forbidFinalCutPush: reachesWinWithout((edge) => edgeMatches(edge, roles.cutZ, roles.win, "left", "push_object:sticky")),
  forbidConstructedZState: reachesWinWithout((edge) => objectKeyAt(edge.to) === roles.constructedZ),
};
const mandatoryCounterfactualNames = layoutFilename.startsWith("v11_")
  ? ["forbidPSideCut", "forbidFinalCutPush", "forbidConstructedZState"]
  : Object.keys(counterfactuals);
for (const [name, result] of Object.entries(counterfactuals).filter(([name]) => mandatoryCounterfactualNames.includes(name))) {
  if (result.foundWin || result.status !== "complete") throw new Error(`${name} failed`);
}

const winningObjectTransitions = winReachingEdges
  .filter((edge) => objectKeyAt(edge.from) !== objectKeyAt(edge.to))
  .map((edge) => ({
    action: edge.action,
    events: edge.events,
    fromObject: objectKeyAt(edge.from),
    toObject: objectKeyAt(edge.to),
  }));
const pullEdgesOnWinClosure = winReachingEdges.filter((edge) => edge.events.some((event) => event.startsWith("pull_object")));
if (pullEdgesOnWinClosure.length !== 0) throw new Error("winning closure unexpectedly contains pull action");

const genericAudit = JSON.parse(await readFile(`${layoutPath}.audit.json`, "utf8"));
if (genericAudit.winScc.pathCount !== "1") throw new Error("generic SCC audit no longer has one source-to-win path");

const report = {
  candidate: {
    layoutPath,
    layoutSha256,
    exactVersion: `${path.basename(layoutFilename, ".txt")}_sha256_${layoutSha256}`,
  },
  graph: {
    status: graph.status,
    states: graph.keys.length,
    transitions: graph.edges.length,
    winningStates: graph.winStateIndexes.size,
    winReachingStates: winReaching.size,
    winReachingEdges: winReachingEdges.length,
    rawSccCount: genericAudit.winScc.count,
    sourceToWinRawSccPathCount: genericAudit.winScc.pathCount,
  },
  roles,
  canonical,
  constructionCounterfactual: {
    squareMerge,
    finding: "两横向 domino 若对齐成 2x2 square，完整后继搜索无胜解；只有错位重黏成 Z 才进入胜路。",
  },
  plBoundaryCounterfactual: {
    pHandle,
    pCut,
    lHandle,
    lCut,
    sameObjectOutcomeAfterFirstCut: pCut.objectKey === lCut.objectKey,
    finding: "同一已构成 Z 在同一 P/L-B/S 局部左移：P 侧推后玩家留在右把手并有一拍胜利后继；L 侧拉后玩家被 Z 前缘切出的箱与墙袋封在左侧，完整后继搜索无胜解。",
  },
  mandatoryCounterfactuals: counterfactuals,
  winningClosure: {
    objectTransitions: winningObjectTransitions,
    pullObjectEdgeCount: pullEdgesOnWinClosure.length,
  },
  limits: [
    "完整图与所有后继反事实均使用当前 runtime、terminalizeWins=true、maxStates=500000。",
    "raw SCC 路径唯一表示一个不可逆玩家逻辑链；纯走位与可逆的 lower-domino 左移/复位留在 SCC 内。",
    "本证据只报告机械事实，不替代独立审美审查。",
  ],
};
await writeFile(path.join(taskDir, evidenceFilename), `${JSON.stringify(report, null, 2)}\n`, "utf8");
console.log(JSON.stringify({ candidate: report.candidate, graph: report.graph, counterfactuals, pCutSuffix: pCut.suffix, lCutSuffix: lCut.suffix, squareSuffix: squareMerge.suffix }, null, 2));
