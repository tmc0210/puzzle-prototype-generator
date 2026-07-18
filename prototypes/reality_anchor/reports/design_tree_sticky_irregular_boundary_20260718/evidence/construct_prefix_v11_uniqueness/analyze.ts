import { createHash } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import { loadPrototypePackage } from "../../../../../../src/core/io.js";
import { enumerateRuntimeGraph } from "../../../../../../src/core/runtimeGraph.js";
import { solveWithRuntime } from "../../../../../../src/core/solver.js";
import type { LevelDoc } from "../../../../../../src/core/types.js";
import { getRuntimeAdapter } from "../../../../../../src/prototypes/runtimeAdapter.js";

const evidenceDir = import.meta.dirname;
const prototypeRoot = path.resolve(evidenceDir, "../../../..");
const layoutPath = path.resolve(evidenceDir, "../../nodes/construct_prefix_v11/layout.txt");
const layoutRef = "prototypes/reality_anchor/reports/design_tree_sticky_irregular_boundary_20260718/nodes/construct_prefix_v11/layout.txt";
const exactVersion = "v11_sha256_fb16d7c1587211705a29794d958a069b2cc47209dc7c2db2a1c19b040682e783";
const expectedSha256 = "fb16d7c1587211705a29794d958a069b2cc47209dc7c2db2a1c19b040682e783";
const maxStates = 500_000;

const canonicalInputs = ["left", "down", "left", "up", "right", "up", "left", "left"];
const canonicalZPrefix = ["left", "down", "left", "up"];
const alternateZPrefix = ["up", "left", "left", "left", "down", "down", "right", "up", "right", "right", "up", "left"];
const wrongSquarePrefix = ["left", "left", "down", "left", "up"];
const pCutPrefix = [...canonicalZPrefix, "right", "up", "left"];
const lCutPrefix = [...canonicalZPrefix, "left", "left", "left", "up", "up", "left"];

const pkg = await loadPrototypePackage(prototypeRoot);
const adapter = getRuntimeAdapter(pkg.mechanic);
const runtime = adapter.createRuntime(pkg.mechanic);
const runtimeOptions = { winCondition: pkg.mechanic.win, maxStates };
const layout = await readFile(layoutPath, "utf8");
const actualSha256 = createHash("sha256").update(layout).digest("hex");
if (actualSha256 !== expectedSha256) {
  throw new Error(`layout hash mismatch: expected ${expectedSha256}, got ${actualSha256}`);
}

const level: LevelDoc = {
  id: "construct_prefix_v11",
  title: "construct_prefix_v11",
  layout,
  win: pkg.mechanic.win,
};
const initial = adapter.parseLevel(level);
const graph = enumerateRuntimeGraph(
  runtime,
  initial,
  pkg.mechanic.win,
  runtimeOptions,
  { maxStates, terminalizeWins: true },
);
if (graph.status !== "complete") throw new Error(`graph incomplete: ${graph.status}`);

type Edge = (typeof graph.edges)[number];
const outgoing = new Map<number, Edge[]>();
const incoming = new Map<number, Edge[]>();
for (const edge of graph.edges) {
  (outgoing.get(edge.from) ?? outgoing.set(edge.from, []).get(edge.from)!).push(edge);
  (incoming.get(edge.to) ?? incoming.set(edge.to, []).get(edge.to)!).push(edge);
}
const objectKeyAt = (index: number) => graph.keys[index]!.replace(/^Ply:[^|]+\|/, "");
const playerKey = (stateKey: string) => stateKey.match(/^Ply:([^|]+)/)?.[1] ?? "unknown";
const anchorSignature = (objectKey: string) => objectKey
  .split("|")
  .filter((part) => part.startsWith("PL:") || part.startsWith("BS:"))
  .join("|");

function runPrefix(inputs: string[]) {
  let state = initial;
  const steps: Array<{
    step: number;
    input: string;
    legal: boolean;
    reason: string | null;
    events: string[];
    stateKey: string;
  }> = [];
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
    player: playerKey(stateKey),
    objectKey: stateKey.replace(/^Ply:[^|]+\|/, ""),
    lastEvents: steps.at(-1)?.events ?? [],
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
const canonicalZ = runPrefix(canonicalZPrefix);
const alternateZ = runPrefix(alternateZPrefix);
const canonicalPreMerge = runPrefix(canonicalZPrefix.slice(0, -1));
const alternatePreMerge = runPrefix(alternateZPrefix.slice(0, -1));
const wrongSquare = runPrefix(wrongSquarePrefix);
const pCut = runPrefix(pCutPrefix);
const lCut = runPrefix(lCutPrefix);
const finalBeforeWin = pCut;

for (const [name, replay] of Object.entries({ canonical, canonicalZ, alternateZ, canonicalPreMerge, alternatePreMerge, wrongSquare, pCut, lCut })) {
  if (!replay.legal) throw new Error(`${name} replay is illegal`);
}
if (!canonical.suffix?.found || canonical.suffix.cost !== 0) throw new Error("canonical replay is not winning");
if (!canonicalZ.lastEvents.some((event) => event.startsWith("sticky_merge"))) throw new Error("canonical Z prefix does not merge");
if (!alternateZ.lastEvents.some((event) => event.startsWith("sticky_merge"))) throw new Error("alternate Z prefix does not merge");
if (canonicalZ.objectKey !== alternateZ.objectKey) throw new Error("assembly orders do not converge to the same Z object state");
if (wrongSquare.suffix?.found || wrongSquare.suffix?.searchStatus !== "complete") throw new Error("wrong square unexpectedly reaches win");
if (!pCut.lastEvents.some((event) => event.startsWith("push_object"))) throw new Error("P-side cut is not a push");
if (!lCut.lastEvents.some((event) => event.startsWith("pull_object"))) throw new Error("L-side cut is not a pull");
if (pCut.objectKey !== lCut.objectKey) throw new Error("P/L first-cut object states differ");
if (!pCut.suffix?.found || pCut.suffix.cost !== 1) throw new Error("P-side cut must retain a one-input winning suffix");
if (lCut.suffix?.found || lCut.suffix?.searchStatus !== "complete") throw new Error("L-side pull unexpectedly reaches win");

const wins = new Set(graph.winStateIndexes);
const winReaching = new Set<number>(wins);
const reverseQueue = [...wins];
for (let i = 0; i < reverseQueue.length; i += 1) {
  for (const edge of incoming.get(reverseQueue[i]!) ?? []) {
    if (winReaching.has(edge.from)) continue;
    winReaching.add(edge.from);
    reverseQueue.push(edge.from);
  }
}
const winEdges = graph.edges.filter((edge) => winReaching.has(edge.from) && winReaching.has(edge.to));

// Collapse walking and reversible loops to raw SCCs on the complete win-reaching closure.
const adjacency = new Map<number, number[]>();
const reverseAdjacency = new Map<number, number[]>();
for (const edge of winEdges) {
  (adjacency.get(edge.from) ?? adjacency.set(edge.from, []).get(edge.from)!).push(edge.to);
  (reverseAdjacency.get(edge.to) ?? reverseAdjacency.set(edge.to, []).get(edge.to)!).push(edge.from);
}
const visited = new Set<number>();
const finishOrder: number[] = [];
for (const root of [...winReaching].sort((a, b) => a - b)) {
  if (visited.has(root)) continue;
  visited.add(root);
  const dfs: Array<{ state: number; cursor: number }> = [{ state: root, cursor: 0 }];
  while (dfs.length > 0) {
    const frame = dfs.at(-1)!;
    const targets = adjacency.get(frame.state) ?? [];
    if (frame.cursor < targets.length) {
      const target = targets[frame.cursor++]!;
      if (!visited.has(target)) {
        visited.add(target);
        dfs.push({ state: target, cursor: 0 });
      }
    } else {
      finishOrder.push(frame.state);
      dfs.pop();
    }
  }
}
const assigned = new Set<number>();
const sccs: number[][] = [];
for (let i = finishOrder.length - 1; i >= 0; i -= 1) {
  const root = finishOrder[i]!;
  if (assigned.has(root)) continue;
  assigned.add(root);
  const component: number[] = [];
  const dfs = [root];
  while (dfs.length > 0) {
    const state = dfs.pop()!;
    component.push(state);
    for (const target of reverseAdjacency.get(state) ?? []) {
      if (assigned.has(target)) continue;
      assigned.add(target);
      dfs.push(target);
    }
  }
  sccs.push(component.sort((a, b) => a - b));
}
const sccByState = new Map<number, number>();
for (const [id, states] of sccs.entries()) for (const state of states) sccByState.set(state, id);
const condensation = new Map<number, Set<number>>();
for (const edge of winEdges) {
  const from = sccByState.get(edge.from)!;
  const to = sccByState.get(edge.to)!;
  if (from !== to) (condensation.get(from) ?? condensation.set(from, new Set()).get(from)!).add(to);
}
const winSccs = new Set([...wins].map((state) => sccByState.get(state)!));
const pathMemo = new Map<number, bigint>();
function countSccPaths(scc: number): bigint {
  if (winSccs.has(scc)) return 1n;
  const memoized = pathMemo.get(scc);
  if (memoized !== undefined) return memoized;
  let count = 0n;
  for (const next of condensation.get(scc) ?? []) count += countSccPaths(next);
  pathMemo.set(scc, count);
  return count;
}
const sourceScc = sccByState.get(0);
const sourceToWinRawSccPathCount = sourceScc === undefined ? "0" : countSccPaths(sourceScc).toString();

const indexByKey = new Map(graph.keys.map((key, index) => [key, index]));
const stateScc = (stateKey: string) => sccByState.get(indexByKey.get(stateKey)!)!;
const canonicalPreMergeScc = stateScc(canonicalPreMerge.stateKey);
const alternatePreMergeScc = stateScc(alternatePreMerge.stateKey);
const canonicalZScc = stateScc(canonicalZ.stateKey);
const alternateZScc = stateScc(alternateZ.stateKey);
if (canonicalPreMergeScc !== alternatePreMergeScc) throw new Error("assembly orders do not originate in the same reversible SCC");
if (canonicalZScc !== alternateZScc) throw new Error("assembly orders do not converge to the same post-merge SCC");

type GroupedTransition = {
  fromObject: string;
  toObject: string;
  action: string;
  events: string[];
  edgeCount: number;
};
function groupTransitions(edges: Edge[]): GroupedTransition[] {
  const groups = new Map<string, GroupedTransition>();
  for (const edge of edges) {
    const fromObject = objectKeyAt(edge.from);
    const toObject = objectKeyAt(edge.to);
    const signature = JSON.stringify([fromObject, toObject, edge.action, edge.events]);
    const group = groups.get(signature) ?? { fromObject, toObject, action: edge.action, events: edge.events, edgeCount: 0 };
    group.edgeCount += 1;
    groups.set(signature, group);
  }
  return [...groups.values()].sort((a, b) => a.action.localeCompare(b.action) || a.fromObject.localeCompare(b.fromObject));
}
const mergeGroupsOnWinClosure = groupTransitions(winEdges.filter((edge) => edge.events.some((event) => event.startsWith("sticky_merge"))));
const mergeOutcomeObjects = [...new Set(mergeGroupsOnWinClosure.map((group) => group.toObject))];
if (mergeOutcomeObjects.length !== 1 || mergeOutcomeObjects[0] !== canonicalZ.objectKey) {
  throw new Error("win closure contains another construction outcome");
}

function reachesWinWithout(forbidden: (edge: Edge) => boolean) {
  const seen = new Set([0]);
  const queue = [0];
  for (let i = 0; i < queue.length; i += 1) {
    const state = queue[i]!;
    if (wins.has(state)) return { foundWin: true, searchStatus: "found", exploredStates: seen.size };
    for (const edge of outgoing.get(state) ?? []) {
      if (forbidden(edge) || seen.has(edge.to)) continue;
      seen.add(edge.to);
      queue.push(edge.to);
    }
  }
  return { foundWin: false, searchStatus: "complete", exploredStates: seen.size };
}
const edgeMatches = (edge: Edge, from: string, to: string, action: string, eventPrefix: string) =>
  objectKeyAt(edge.from) === from
  && objectKeyAt(edge.to) === to
  && edge.action === action
  && edge.events.some((event) => event.startsWith(eventPrefix));
const winObjectKey = canonical.objectKey;
const counterfactuals = {
  forbidConstructedZObjectState: reachesWinWithout((edge) => objectKeyAt(edge.to) === canonicalZ.objectKey),
  forbidFirstPSideCut: reachesWinWithout((edge) => edgeMatches(edge, canonicalZ.objectKey, pCut.objectKey, "left", "push_object")),
  forbidFinalPush: reachesWinWithout((edge) => edgeMatches(edge, finalBeforeWin.objectKey, winObjectKey, "left", "push_object")),
};
for (const [name, result] of Object.entries(counterfactuals)) {
  if (result.foundWin || result.searchStatus !== "complete") throw new Error(`${name} did not eliminate all wins`);
}

const initialAnchorSignature = anchorSignature(objectKeyAt(0));
const anchorChangedStateCount = graph.keys.filter((key) => anchorSignature(key.replace(/^Ply:[^|]+\|/, "")) !== initialAnchorSignature).length;
const anchorMovementEdgeCount = graph.edges.filter((edge) => anchorSignature(objectKeyAt(edge.from)) !== anchorSignature(objectKeyAt(edge.to))).length;
if (anchorChangedStateCount !== 0 || anchorMovementEdgeCount !== 0) throw new Error("anchor movement found");
const pullEdgesOnWinClosure = winEdges.filter((edge) => edge.events.some((event) => event.startsWith("pull_object")));
if (pullEdgesOnWinClosure.length !== 0) throw new Error("winning closure contains a pull route");

const shortestCost = Math.min(...[...wins].map((index) => graph.depthByIndex[index]!));
if (graph.keys.length !== 496 || graph.edges.length !== 1229 || wins.size !== 1) throw new Error("formal graph counts changed");
if (winReaching.size !== 134 || winEdges.length !== 326) throw new Error("win closure counts changed");
if (sccs.length !== 4 || sourceToWinRawSccPathCount !== "1") throw new Error("raw SCC uniqueness changed");
if (shortestCost !== canonicalInputs.length) throw new Error(`shortest cost changed: ${shortestCost}`);

const results = {
  schema: "reality_anchor_designer_mechanical_evidence_v1",
  exact: {
    exactVersion,
    layoutRef,
    expectedSha256,
    actualSha256,
    hashMatch: actualSha256 === expectedSha256,
    canonicalInputs,
  },
  search: {
    maxStates,
    terminalizeWins: true,
    status: graph.status,
    budgetExhausted: false,
  },
  graph: {
    states: graph.keys.length,
    transitions: graph.edges.length,
    winningStates: wins.size,
    shortestCost,
    winClosureStates: winReaching.size,
    winClosureTransitions: winEdges.length,
    rawSccCount: sccs.length,
    sourceToWinRawSccPathCount,
  },
  canonical: {
    inputs: canonical.inputs,
    legal: canonical.legal,
    winning: canonical.suffix?.found === true && canonical.suffix.cost === 0,
    finalObject: canonical.objectKey,
  },
  construction: {
    requiredObjectState: canonicalZ.objectKey,
    forbidRequiredObjectState: counterfactuals.forbidConstructedZObjectState,
    canonicalAssembly: {
      inputs: canonicalZ.inputs,
      preMergeObject: canonicalPreMerge.objectKey,
      mergeAction: canonicalZ.inputs.at(-1),
      mergeEvents: canonicalZ.lastEvents,
      resultObject: canonicalZ.objectKey,
      preMergeRawScc: canonicalPreMergeScc,
      resultRawScc: canonicalZScc,
    },
    alternateAssembly: {
      inputs: alternateZ.inputs,
      preMergeObject: alternatePreMerge.objectKey,
      mergeAction: alternateZ.inputs.at(-1),
      mergeEvents: alternateZ.lastEvents,
      resultObject: alternateZ.objectKey,
      preMergeRawScc: alternatePreMergeScc,
      resultRawScc: alternateZScc,
    },
    equivalence: {
      sameMaterialRoles: true,
      sameResultObject: canonicalZ.objectKey === alternateZ.objectKey,
      samePreMergeRawScc: canonicalPreMergeScc === alternatePreMergeScc,
      samePostMergeRawScc: canonicalZScc === alternateZScc,
      onlyMergeOutcomeOnWinClosure: mergeOutcomeObjects[0],
      mergeTransitionGroupsOnWinClosure: mergeGroupsOnWinClosure,
    },
    wrongSquare: {
      inputs: wrongSquare.inputs,
      objectState: wrongSquare.objectKey,
      suffix: wrongSquare.suffix,
    },
  },
  boundaryHandles: {
    pSidePush: {
      inputs: pCut.inputs,
      playerAfterCut: pCut.player,
      events: pCut.lastEvents,
      objectAfterCut: pCut.objectKey,
      suffix: pCut.suffix,
    },
    lSidePull: {
      inputs: lCut.inputs,
      playerAfterCut: lCut.player,
      events: lCut.lastEvents,
      objectAfterCut: lCut.objectKey,
      suffix: lCut.suffix,
    },
    sameObjectAfterFirstCut: pCut.objectKey === lCut.objectKey,
    differentPlayerLanding: pCut.player !== lCut.player,
  },
  mandatoryBoundaryTransitions: {
    firstPSideCut: counterfactuals.forbidFirstPSideCut,
    finalPush: counterfactuals.forbidFinalPush,
  },
  bypassAudit: {
    anchorChangedStateCount,
    anchorMovementEdgeCount,
    pullObjectEdgesOnWinClosure: pullEdgesOnWinClosure.length,
    distinctMergeOutcomeObjectsOnWinClosure: mergeOutcomeObjects.length,
    otherConstructedShapeWinningRouteFound: false,
  },
  solutionUniqueness: {
    result: "unique_complete",
    searchScope: "complete",
    playerLogicClasses: 1,
    knownRawWinningVariants: [
      "规范装配：下料先左移，再向上与上料黏成 Z。",
      "等价装配：下料先上移，再从右向左与上料黏成同一 Z。",
      "纯走位、可逆材料移动与完整回返环。",
    ],
    equivalenceAccount: "两种装配使用相同材料职责，合并前位于同一可逆 raw SCC，合并后得到相同 Z 对象态并进入同一 raw SCC；完整胜利闭包只有这一 merge outcome，随后只有同一 P 侧首切与最终推动职责链。",
  },
  limits: [
    "本证据是 designer-side mechanical evidence，只审计当前 runtime 下的可解性、状态图、反事实和解族；不替代玩家可读性、审美、难度或独立 reviewer 判断。",
    "unique_complete 指完整图只剩一个玩家逻辑类，不声称原始输入串唯一；两种装配顺序、纯走位和可逆回返属于等价变体。",
    "状态图使用 terminalizeWins=true；胜利后的任意继续输入不在审计范围内。",
    "正式 layout 字节、机制实现、win condition 或 runtime 变化都会使本证据失效，必须重新运行 analyze.ts。",
  ],
};

const report = `# construct_prefix_v11 designer-side mechanical evidence

## Exact 绑定

- exact：\`${exactVersion}\`
- layout：\`${layoutRef}\`
- SHA-256：\`${actualSha256}\`（与声明一致）
- canonical：\`${canonicalInputs.join(",")}\`

## 完整图与唯一性结论

以当前 Reality Anchor runtime、\`terminalizeWins=true\`、\`maxStates=${maxStates}\` 完整枚举：${graph.keys.length} 个状态、${graph.edges.length} 条转移、${wins.size} 个胜利状态；搜索状态为 \`${graph.status}\`，没有预算截断。最短成本为 ${shortestCost}。

胜利闭包有 ${winReaching.size} 个状态、${winEdges.length} 条转移；raw SCC 共 ${sccs.length} 个，起点到胜利的 raw SCC 路径数为 ${sourceToWinRawSccPathCount}。唯一性分类为 **\`unique_complete\`**：完整图只留下一个玩家逻辑类，不主张原始输入串唯一。

## 构形必要性与等价装配

正确工作 Z 对象态为：

\`${canonicalZ.objectKey}\`

禁止任何转移进入该 Z 对象态后，完整探索 ${counterfactuals.forbidConstructedZObjectState.exploredStates} 个状态，无胜利。因此正确异形不是初态预制物，也不是可绕过的搬运外观，而是全局必要中间态。

存在两种装配顺序：

1. 规范顺序 \`${canonicalZ.inputs.join(",")}\`：下料先左移，再向上黏合。
2. 等价顺序 \`${alternateZ.inputs.join(",")}\`：下料先上移，再从右向左黏合。

二者保持相同材料职责，合并前位于同一可逆 raw SCC（${canonicalPreMergeScc}），合并后得到完全相同的 Z 对象态并进入同一 raw SCC（${canonicalZScc}）。胜利闭包中虽有 ${mergeGroupsOnWinClosure.length} 组 merge 转移，但 merge outcome 只有 1 个。因此它们是同一玩家逻辑 family 的装配换序，不是两条不同构形胜路。

局部错误构形 \`${wrongSquare.inputs.join(",")}\` 会得到 2×2 square：

\`${wrongSquare.objectKey}\`

从该状态继续搜索 ${wrongSquare.suffix!.exploredStates} 个状态，结果 \`${wrongSquare.suffix!.searchStatus}\` 且无胜利。方块与 Z 的差异是实际黏合拓扑差异，不是位置误差。

## 同一 Z 的 P/L 边界命运

P 侧首切使用 \`push_object\`；L 侧首切使用 \`pull_object\`。两者切后对象态完全相同：

\`${pCut.objectKey}\`

- P 侧推后玩家在 \`${pCut.player}\`，保留 1 步胜利后继 \`${pCut.suffix!.inputs.join(",")}\`。
- L 侧拉后玩家在 \`${lCut.player}\`，被墙袋与切后黏块封死；后继搜索仅 ${lCut.suffix!.exploredStates} 个状态，\`${lCut.suffix!.searchStatus}\` 且无胜利。

所以高潮不是 P/L 名义差异，而是相同 Z、相同首次切割对象结果下，动作方向改变玩家落点和可逆性。

## 必要边界转化与旁路

- 禁止首次 P 侧切割：完整探索 ${counterfactuals.forbidFirstPSideCut.exploredStates} 个状态，无胜利。
- 禁止最终推动：完整探索 ${counterfactuals.forbidFinalPush.exploredStates} 个状态，无胜利。
- 全图锚点变化状态数：${anchorChangedStateCount}；锚点移动边数：${anchorMovementEdgeCount}。
- 胜利闭包中的 \`pull_object\` 边数：${pullEdgesOnWinClosure.length}。
- 胜利闭包中的不同 merge outcome 数：${mergeOutcomeObjects.length}。

因此没有锚点移动胜路、L 拉胜路或其它构形胜路；所有胜利变体都收敛到同一 Z，再执行同一 P 侧首切与最终推动职责链。

## Limits

- 本报告是 designer-side mechanical evidence，不替代玩家可读性、审美、难度与独立 reviewer 判断。
- \`unique_complete\` 是玩家逻辑类唯一，不是原始输入串唯一；纯走位、可逆回返和两种等价装配顺序明确排除在非等价多解之外。
- 本图在胜利处终止；胜利后的继续输入不在审计范围内。
- layout 字节、机制、胜利条件或 runtime 一旦变化，必须重新运行本目录的 \`analyze.ts\`。
`;

await writeFile(path.join(evidenceDir, "results.json"), `${JSON.stringify(results, null, 2)}\n`, "utf8");
await writeFile(path.join(evidenceDir, "report.md"), report, "utf8");
console.log(JSON.stringify({
  exactVersion,
  graph: results.graph,
  solutionUniqueness: results.solutionUniqueness.result,
  counterfactuals,
  wrongSquareSuffix: wrongSquare.suffix,
  pCutSuffix: pCut.suffix,
  lCutSuffix: lCut.suffix,
}, null, 2));
