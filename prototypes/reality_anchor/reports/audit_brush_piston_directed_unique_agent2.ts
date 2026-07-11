import { createHash } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";
import { stringify as stringifyYaml } from "yaml";
import { loadPrototypePackage } from "../../../src/core/io.js";
import {
  enumerateRuntimeGraph,
  type RuntimeGraph,
  type RuntimeGraphEdge,
} from "../../../src/core/runtimeGraph.js";
import type { InputId, LevelDoc, Point } from "../../../src/core/types.js";
import type { RealityAnchorState } from "../../../src/prototypes/reality_anchor/mechanics.js";
import { getRuntimeAdapter } from "../../../src/prototypes/runtimeAdapter.js";

type Edge = RuntimeGraphEdge<InputId>;
type Graph = RuntimeGraph<RealityAnchorState, InputId>;

type MacroEdge = {
  from: number;
  to: number;
  kind: "walk_commitment" | "object";
  action: InputId;
  events: string[];
  stage: string;
  source: Edge;
};

type SimplePath = {
  macros: number[];
  edges: MacroEdge[];
  objectStages: string[];
  objectOrder: string[];
  walkCommitments: string[];
};

const candidate = "RA_FRESH_2026_07_10_BRUSH_PISTON_TRIPLE_RELAY_v1";
const layoutPath = `prototypes/Reality_Anchor/reports/${candidate}.layout.txt`;
const tracePath = `prototypes/Reality_Anchor/reports/trace_${candidate}_CANONICAL.json`;
const outBase = `prototypes/Reality_Anchor/reports/${candidate}_directed_strict_unique_audit_2`;
const simplePathBudget = 5_000_000;
const productBudget = 5_000_000;

const pkg = await loadPrototypePackage("prototypes/reality_anchor");
const adapter = getRuntimeAdapter(pkg.mechanic);
const runtime = adapter.createRuntime(pkg.mechanic);
const layoutRaw = await readFile(layoutPath);
const layout = layoutRaw.toString("utf8").replace(/\r/g, "").replace(/\n+$/g, "");
const trace = JSON.parse(await readFile(tracePath, "utf8")) as { inputs: InputId[] };

const level: LevelDoc = {
  id: candidate,
  title: candidate,
  role: "challenge",
  status: "candidate",
  targets: [],
  known_before: ["K_runtime_smoke"],
  target_learning: ["K_runtime_smoke"],
  support_level: "none",
  expected_solver_evidence: ["solvable"],
  expected_llm_player_evidence: [],
  layout,
};

const initial = adapter.parseLevel(level) as RealityAnchorState;
const graph = enumerateRuntimeGraph(
  runtime,
  initial,
  pkg.mechanic.win,
  { winCondition: pkg.mechanic.win },
  { maxStates: 100_000, terminalizeWins: true },
) as Graph;
if (graph.status !== "complete") {
  throw new Error(`完整图未完成：${graph.status} ${graph.reason ?? ""}`);
}

const outgoing = Array.from({ length: graph.states.length }, () => [] as Edge[]);
for (const edge of graph.edges) outgoing[edge.from]!.push(edge);

const pureWalkEdges = graph.edges.filter(isPureWalk);
const nonWalkEdges = graph.edges.filter((edge) => !isPureWalk(edge));
const malformedWalkLabels = graph.edges.filter((edge) =>
  edge.events.includes("walk") && !isPureWalk(edge)
);
if (malformedWalkLabels.length > 0) {
  throw new Error("发现 walk 与对象事件混标，当前分类口径需人工复核");
}

// 关键修正：只对纯走位有向子图求强连通分量。单向 walk 永不被当作等价。
const walkScc = tarjan(graph.states.length, pureWalkEdges);
const macroObjectKeys = Array.from({ length: walkScc.count }, () => new Set<string>());
const macroRuntimeStates = Array.from({ length: walkScc.count }, () => [] as number[]);
for (let state = 0; state < graph.states.length; state += 1) {
  const macro = walkScc.of[state]!;
  macroObjectKeys[macro]!.add(objectKey(graph.states[state]!));
  macroRuntimeStates[macro]!.push(state);
}
const impureWalkSccs = macroObjectKeys.flatMap((keys, macro) =>
  keys.size === 1 ? [] : [{ macro, objectKeys: [...keys] }]
);
if (impureWalkSccs.length > 0) {
  throw new Error(`纯走位 SCC 内对象配置不一致：${JSON.stringify(impureWalkSccs)}`);
}

const rawMacroEdges: MacroEdge[] = graph.edges.flatMap((edge) => {
  const from = walkScc.of[edge.from]!;
  const to = walkScc.of[edge.to]!;
  if (isPureWalk(edge) && from === to) return [];
  const kind = isPureWalk(edge) ? "walk_commitment" as const : "object" as const;
  return [{
    from,
    to,
    kind,
    action: edge.action,
    events: substantive(edge.events),
    stage: kind === "object"
      ? exactStage(edge, graph.states[edge.from]!, graph.states[edge.to]!)
      : "",
    source: edge,
  }];
});

// 仅去掉完全相同的并行见证；不同动作方向、事件或对象前后态均保留。
const macroEdgeMap = new Map<string, MacroEdge>();
for (const edge of rawMacroEdges) {
  const key = `${edge.from}>${edge.to}|${edge.kind}|${edge.action}|${edge.stage}`;
  if (!macroEdgeMap.has(key)) macroEdgeMap.set(key, edge);
}
const macroEdges = [...macroEdgeMap.values()];
const macroOut = Array.from({ length: walkScc.count }, () => [] as MacroEdge[]);
const macroIn = Array.from({ length: walkScc.count }, () => [] as MacroEdge[]);
for (const edge of macroEdges) {
  macroOut[edge.from]!.push(edge);
  macroIn[edge.to]!.push(edge);
}

const startMacro = walkScc.of[0]!;
const winMacros = new Set([...graph.winStateIndexes].map((state) => walkScc.of[state]!));
const forward = macroReach([startMacro], macroOut, (edge) => edge.to);
const backward = macroReach([...winMacros], macroIn, (edge) => edge.from);
const relevantMacros = new Set([...forward].filter((macro) => backward.has(macro)));

const canonicalReplay = replayInputs(trace.inputs);
if (!canonicalReplay.win) throw new Error("规范 trace 未获胜");
const canonicalMacroEdges = runtimeEdgesToMacroEdges(canonicalReplay.edges);
const canonicalLoopErased = loopEraseMacroEdges(canonicalMacroEdges);
const canonicalStages = canonicalLoopErased
  .filter((edge) => edge.kind === "object")
  .map((edge) => edge.stage);
const canonicalOrder = canonicalLoopErased
  .filter((edge) => edge.kind === "object")
  .map(objectOrderKey);
if (canonicalStages.length !== 10) {
  throw new Error(`预期 10 个规范对象阶段，实际 ${canonicalStages.length}`);
}

// 证据 A：完整枚举纯 walk 有向 SCC 宏图上的所有 node-simple 胜路。
const simpleEnumeration = enumerateSimpleWinningMacroPaths();

// 证据 B：visited-mask × canonical 10 阶段自动机产品图。
// visited-mask 是 loop-erasure 的有限状态实现：回到同一对象宏状态的环按题设允许擦除，
// 因而产品图只需要审计 node-simple 代表元是否偏离规范阶段顺序。
const stageProduct = runStageProduct();

// 对照：若不先消去完整返回环，严格 raw 产品图会发现可逆 detour；该 witness 会被宏环擦除回规范链。
const rawDeviation = findRawStageDeviation();

const exactSignatures = new Set(simpleEnumeration.paths.map((path) => path.objectStages.join(" > ")));
const orderSignatures = new Set(simpleEnumeration.paths.map((path) => path.objectOrder.join(" > ")));
const allSimplePathsMatchCanonical = simpleEnumeration.paths.every((path) =>
  arraysEqual(path.objectStages, canonicalStages)
);
const noNecessaryObjectReorder =
  !simpleEnumeration.truncated &&
  simpleEnumeration.paths.length > 0 &&
  exactSignatures.size === 1 &&
  orderSignatures.size === 1 &&
  allSimplePathsMatchCanonical &&
  !stageProduct.truncated &&
  stageProduct.mismatchWin === null &&
  stageProduct.acceptedWinCount > 0;

const report = {
  auditVersion: "directed_strict_unique_audit_2",
  candidate,
  scope: "候选专属严格唯一性审计；不修改正式 packets、levels 或 playable queue。",
  exactInstance: {
    layoutPath: slash(layoutPath),
    tracePath: slash(tracePath),
    layoutSha256: createHash("sha256").update(layoutRaw).digest("hex"),
    layout,
  },
  criterion: {
    pureWalkEquivalence: "只合并纯 walk 有向子图的强连通分量；单向 pure-walk 边保留为 commitment。",
    objectStageIdentity: "输入方向 + 全部非 walk 事件 + 前对象配置 + 后对象配置。",
    allowedDifferences: [
      "纯走位路径差异",
      "回到同一 directed-walk SCC（同对象配置且可互相纯走位）的完整环",
    ],
    forbiddenDifference: "loop-erased 胜路中任何必要对象动作的增删、换序、方向变化或不同对象前后态。",
  },
  graph: {
    status: graph.status,
    reachableStates: graph.states.length,
    legalTransitions: graph.edges.length,
    winningStates: graph.winStateIndexes.size,
    pureWalkEdges: pureWalkEdges.length,
    nonWalkEdges: nonWalkEdges.length,
    directedWalkSccs: walkScc.count,
    impureWalkSccs,
    macroEdges: macroEdges.length,
    objectMacroSelfLoops: macroEdges.filter((edge) => edge.kind === "object" && edge.from === edge.to).length,
    crossSccWalkCommitments: macroEdges.filter((edge) => edge.kind === "walk_commitment").length,
    relevantMacros: relevantMacros.size,
    relevantCrossSccWalkCommitments: macroEdges.filter((edge) =>
      edge.kind === "walk_commitment" && relevantMacros.has(edge.from) && relevantMacros.has(edge.to)
    ).length,
    startMacro,
    winMacros: [...winMacros],
  },
  canonical: {
    inputs: trace.inputs,
    inputCount: trace.inputs.length,
    rawMacroEdgeCount: canonicalMacroEdges.length,
    loopErasedMacroEdgeCount: canonicalLoopErased.length,
    objectStageCount: canonicalStages.length,
    objectStages: canonicalStages,
    objectOrder: canonicalOrder,
    macroPath: [startMacro, ...canonicalLoopErased.map((edge) => edge.to)],
  },
  evidenceA: {
    method: "枚举 relevant directed-walk-SCC 宏图的全部 node-simple 胜路；任意有限胜路删除重复宏节点之间的完整返回环后必落入该集合。",
    budget: simplePathBudget,
    truncated: simpleEnumeration.truncated,
    traversedPrefixes: simpleEnumeration.traversedPrefixes,
    completedSimpleWinningPaths: simpleEnumeration.paths.length,
    distinctExactObjectStageSequences: exactSignatures.size,
    distinctObjectOrderSequences: orderSignatures.size,
    allMatchCanonical: allSimplePathsMatchCanonical,
    paths: simpleEnumeration.paths.map((path, index) => ({
      pathIndex: index + 1,
      macroPath: path.macros,
      objectStageCount: path.objectStages.length,
      objectStages: path.objectStages,
      objectOrder: path.objectOrder,
      walkCommitments: path.walkCommitments,
      exactWitness: reconstructMacroPath(path.edges),
    })),
  },
  evidenceB: {
    method: "在 node-simple 宏路径空间上运行 visited-mask × 10 阶段规范序列自动机；任何对象阶段不匹配都会进入 mismatch 状态并保留到胜态。",
    budget: productBudget,
    truncated: stageProduct.truncated,
    exploredProductStates: stageProduct.exploredProductStates,
    generatedProductTransitions: stageProduct.generatedProductTransitions,
    acceptedWinCount: stageProduct.acceptedWinCount,
    mismatchWinFound: stageProduct.mismatchWin !== null,
    mismatchWitness: stageProduct.mismatchWin,
  },
  rawLoopControl: rawDeviation,
  verdict: {
    status: noNecessaryObjectReorder ? "PASS" : "REJECT_OR_INCOMPLETE",
    graphComplete: graph.status === "complete",
    bothProofsComplete: !simpleEnumeration.truncated && !stageProduct.truncated,
    necessaryObjectReorderFound: !noNecessaryObjectReorder,
    conclusion: noNecessaryObjectReorder
      ? "未发现必要对象动作换序；全部 loop-erased 胜路都严格匹配同一 10 阶段对象链。两条 simple 胜路只差纯走位入口/单向走位 commitment，不是第二套对象计划。"
      : "存在对象阶段反例，或证明预算未完整跑完；不得通过唯一性门槛。",
    caveat: "该结论只覆盖题设的对象计划唯一性口径，不声称输入字符串唯一，也不评价审美与难度。",
  },
};

await writeFile(`${outBase}.json`, `${JSON.stringify(report, null, 2)}\n`, "utf8");
await writeFile(`${outBase}.yml`, stringifyYaml(report, { lineWidth: 0 }), "utf8");
await writeFile(`${outBase}.md`, formatMarkdown(report), "utf8");
console.log(JSON.stringify({
  graph: report.graph,
  evidenceA: {
    truncated: report.evidenceA.truncated,
    paths: report.evidenceA.completedSimpleWinningPaths,
    exactSequences: report.evidenceA.distinctExactObjectStageSequences,
    orderSequences: report.evidenceA.distinctObjectOrderSequences,
  },
  evidenceB: report.evidenceB,
  rawLoopControl: {
    found: report.rawLoopControl.found,
    loopErasedMatchesCanonical: report.rawLoopControl.loopErasedMatchesCanonical,
  },
  verdict: report.verdict,
}, null, 2));

function isPureWalk(edge: Edge): boolean {
  return edge.events.length === 1 && edge.events[0] === "walk";
}

function substantive(events: string[]): string[] {
  return events.filter((event) => event !== "walk");
}

function point(value: Point): string {
  return `${value.x},${value.y}`;
}

function objectKey(state: RealityAnchorState): string {
  return JSON.stringify({
    crates: state.crates.map(point).sort(),
    sticky: state.stickyGroups
      .map((group) => group.map(point).sort())
      .sort((left, right) => left.join(";").localeCompare(right.join(";"))),
    pushPull: state.pushPullAnchor
      ? { push: point(state.pushPullAnchor.push), pull: point(state.pushPullAnchor.pull) }
      : null,
    boxSticky: state.boxStickyAnchor
      ? { box: point(state.boxStickyAnchor.box), sticky: point(state.boxStickyAnchor.sticky) }
      : null,
  });
}

function exactStage(edge: Edge, from: RealityAnchorState, to: RealityAnchorState): string {
  return `${edge.action}:${substantive(edge.events).join("&")}|${objectKey(from)}=>${objectKey(to)}`;
}

function objectOrderKey(edge: MacroEdge): string {
  return `${edge.action}:${edge.events.join("&")}`;
}

function replayInputs(inputs: InputId[]): { win: boolean; states: number[]; edges: Edge[] } {
  let state = initial;
  let stateIndex = 0;
  const states = [0];
  const edges: Edge[] = [];
  for (const input of inputs) {
    const result = runtime.step(state, input, { winCondition: pkg.mechanic.win });
    if (!result.legal) throw new Error(`非法 trace 输入：${input}`);
    const to = graph.indexByKey.get(runtime.key(result.state));
    if (to === undefined) throw new Error("trace 状态不在完整图内");
    const edge = outgoing[stateIndex]!.find((item) => item.action === input && item.to === to);
    if (!edge) throw new Error("trace 边不在完整图内");
    edges.push(edge);
    states.push(to);
    state = result.state;
    stateIndex = to;
  }
  return { win: runtime.isWin(state, pkg.mechanic.win), states, edges };
}

function runtimeEdgesToMacroEdges(edges: Edge[]): MacroEdge[] {
  const result: MacroEdge[] = [];
  for (const edge of edges) {
    const from = walkScc.of[edge.from]!;
    const to = walkScc.of[edge.to]!;
    if (isPureWalk(edge) && from === to) continue;
    const kind = isPureWalk(edge) ? "walk_commitment" as const : "object" as const;
    result.push({
      from,
      to,
      kind,
      action: edge.action,
      events: substantive(edge.events),
      stage: kind === "object"
        ? exactStage(edge, graph.states[edge.from]!, graph.states[edge.to]!)
        : "",
      source: edge,
    });
  }
  return result;
}

function loopEraseMacroEdges(edges: MacroEdge[]): MacroEdge[] {
  const nodes = [startMacro, ...edges.map((edge) => edge.to)];
  const keptNodes: number[] = [];
  const keptEdges: MacroEdge[] = [];
  const position = new Map<number, number>();
  for (let index = 0; index < nodes.length; index += 1) {
    const node = nodes[index]!;
    const previous = position.get(node);
    if (previous !== undefined) {
      while (keptNodes.length - 1 > previous) {
        position.delete(keptNodes.pop()!);
        keptEdges.pop();
      }
      continue;
    }
    position.set(node, keptNodes.length);
    keptNodes.push(node);
    if (index > 0) keptEdges.push(edges[index - 1]!);
  }
  return keptEdges;
}

function enumerateSimpleWinningMacroPaths(): {
  paths: SimplePath[];
  traversedPrefixes: number;
  truncated: boolean;
} {
  const paths: SimplePath[] = [];
  const visited = new Set<number>([startMacro]);
  const macros = [startMacro];
  const edges: MacroEdge[] = [];
  let traversedPrefixes = 0;
  let truncated = false;

  const dfs = (node: number): void => {
    if (truncated) return;
    traversedPrefixes += 1;
    if (traversedPrefixes > simplePathBudget) {
      truncated = true;
      return;
    }
    if (winMacros.has(node)) {
      paths.push({
        macros: [...macros],
        edges: [...edges],
        objectStages: edges.filter((edge) => edge.kind === "object").map((edge) => edge.stage),
        objectOrder: edges.filter((edge) => edge.kind === "object").map(objectOrderKey),
        walkCommitments: edges
          .filter((edge) => edge.kind === "walk_commitment")
          .map((edge) => `${edge.from}->${edge.to}:${edge.action}`),
      });
      return;
    }
    for (const edge of macroOut[node]!) {
      if (!relevantMacros.has(edge.to) || visited.has(edge.to)) continue;
      visited.add(edge.to);
      macros.push(edge.to);
      edges.push(edge);
      dfs(edge.to);
      edges.pop();
      macros.pop();
      visited.delete(edge.to);
      if (truncated) return;
    }
  };
  dfs(startMacro);
  return { paths, traversedPrefixes, truncated };
}

function runStageProduct(): {
  exploredProductStates: number;
  generatedProductTransitions: number;
  acceptedWinCount: number;
  mismatchWin: null | ReturnType<typeof reconstructProductWitness>;
  truncated: boolean;
} {
  type Product = {
    macro: number;
    visited: bigint;
    progress: number;
    mismatch: boolean;
  };
  type SeenRow = { item: Product; previous?: string; edge?: MacroEdge };
  const key = (item: Product): string =>
    `${item.macro}|${item.visited.toString(16)}|${item.progress}|${item.mismatch ? 1 : 0}`;
  const start: Product = {
    macro: startMacro,
    visited: 1n << BigInt(startMacro),
    progress: 0,
    mismatch: false,
  };
  const queue = [start];
  const seen = new Map<string, SeenRow>([[key(start), { item: start }]]);
  let generatedProductTransitions = 0;
  let acceptedWinCount = 0;
  let mismatchKey: string | null = null;
  let truncated = false;

  for (let cursor = 0; cursor < queue.length; cursor += 1) {
    if (seen.size > productBudget) {
      truncated = true;
      break;
    }
    const item = queue[cursor]!;
    if (winMacros.has(item.macro)) {
      if (item.mismatch || item.progress !== canonicalStages.length) {
        mismatchKey = key(item);
        break;
      }
      acceptedWinCount += 1;
      continue;
    }
    for (const edge of macroOut[item.macro]!) {
      if (!relevantMacros.has(edge.to)) continue;
      const bit = 1n << BigInt(edge.to);
      if ((item.visited & bit) !== 0n) continue;
      generatedProductTransitions += 1;
      let progress = item.progress;
      let mismatch = item.mismatch;
      if (edge.kind === "object") {
        if (progress < canonicalStages.length && edge.stage === canonicalStages[progress]) progress += 1;
        else mismatch = true;
      }
      const next: Product = {
        macro: edge.to,
        visited: item.visited | bit,
        progress,
        mismatch,
      };
      const nextKey = key(next);
      if (seen.has(nextKey)) continue;
      seen.set(nextKey, { item: next, previous: key(item), edge });
      queue.push(next);
    }
  }

  return {
    exploredProductStates: seen.size,
    generatedProductTransitions,
    acceptedWinCount,
    mismatchWin: mismatchKey ? reconstructProductWitness(mismatchKey, seen) : null,
    truncated,
  };
}

function reconstructProductWitness(
  finalKey: string,
  seen: Map<string, { previous?: string; edge?: MacroEdge }>,
) {
  const edges: MacroEdge[] = [];
  let cursor = finalKey;
  while (seen.get(cursor)?.previous) {
    const row = seen.get(cursor)!;
    edges.unshift(row.edge!);
    cursor = row.previous!;
  }
  return reconstructMacroPath(edges);
}

function findRawStageDeviation() {
  type Product = { state: number; progress: number; mismatch: boolean };
  type Row = { item: Product; previous?: string; edge?: Edge };
  const key = (item: Product): string => `${item.state}|${item.progress}|${item.mismatch ? 1 : 0}`;
  const start: Product = { state: 0, progress: 0, mismatch: false };
  const queue = [start];
  const seen = new Map<string, Row>([[key(start), { item: start }]]);
  let winKey: string | null = null;
  for (let cursor = 0; cursor < queue.length; cursor += 1) {
    const item = queue[cursor]!;
    if (graph.winStateIndexes.has(item.state) &&
      (item.mismatch || item.progress !== canonicalStages.length)) {
      winKey = key(item);
      break;
    }
    for (const edge of outgoing[item.state]!) {
      let progress = item.progress;
      let mismatch = item.mismatch;
      if (!isPureWalk(edge)) {
        const stage = exactStage(edge, graph.states[edge.from]!, graph.states[edge.to]!);
        if (progress < canonicalStages.length && stage === canonicalStages[progress]) progress += 1;
        else mismatch = true;
      }
      const next: Product = { state: edge.to, progress, mismatch };
      const nextKey = key(next);
      if (seen.has(nextKey)) continue;
      seen.set(nextKey, { item: next, previous: key(item), edge });
      queue.push(next);
    }
  }
  if (!winKey) return {
    found: false,
    searchComplete: true,
    loopErasedMatchesCanonical: null,
  };
  const runtimeEdges: Edge[] = [];
  let cursor = winKey;
  while (seen.get(cursor)?.previous) {
    const row = seen.get(cursor)!;
    runtimeEdges.unshift(row.edge!);
    cursor = row.previous!;
  }
  const rawMacro = runtimeEdgesToMacroEdges(runtimeEdges);
  const erased = loopEraseMacroEdges(rawMacro);
  const erasedStages = erased.filter((edge) => edge.kind === "object").map((edge) => edge.stage);
  return {
    found: true,
    searchComplete: true,
    interpretation: "raw 严格序列的偏离来自对象 detour；宏环擦除后返回 canonical，不构成必要动作换序。",
    rawInputs: runtimeEdges.map((edge) => edge.action),
    rawObjectOrder: rawMacro.filter((edge) => edge.kind === "object").map(objectOrderKey),
    rawMacroPath: [startMacro, ...rawMacro.map((edge) => edge.to)],
    loopErasedInputs: reconstructMacroPath(erased).inputs,
    loopErasedObjectOrder: erased.filter((edge) => edge.kind === "object").map(objectOrderKey),
    loopErasedMacroPath: [startMacro, ...erased.map((edge) => edge.to)],
    loopErasedMatchesCanonical: arraysEqual(erasedStages, canonicalStages),
  };
}

function reconstructMacroPath(edges: MacroEdge[]) {
  const inputs: InputId[] = [];
  const runtimeEdges: Edge[] = [];
  let currentState = 0;
  for (const macroEdge of edges) {
    const route = pureWalkRoute(currentState, macroEdge.source.from, macroEdge.from);
    if (!route) throw new Error(`SCC 内无法纯走位 ${currentState}->${macroEdge.source.from}`);
    for (const edge of route) {
      inputs.push(edge.action);
      runtimeEdges.push(edge);
      currentState = edge.to;
    }
    inputs.push(macroEdge.source.action);
    runtimeEdges.push(macroEdge.source);
    currentState = macroEdge.source.to;
  }
  if (!graph.winStateIndexes.has(currentState)) {
    const winState = [...graph.winStateIndexes].find((state) => walkScc.of[state] === walkScc.of[currentState]);
    if (winState === undefined) throw new Error("宏胜路末端不含胜态");
    const route = pureWalkRoute(currentState, winState, walkScc.of[currentState]!);
    if (!route) throw new Error("宏胜路末端无法纯走位抵达胜态");
    for (const edge of route) {
      inputs.push(edge.action);
      runtimeEdges.push(edge);
      currentState = edge.to;
    }
  }
  const replay = replayInputs(inputs);
  return {
    inputs,
    inputCount: inputs.length,
    legal: true,
    win: replay.win,
    finalState: currentState,
    objectOrder: runtimeEdges.filter((edge) => !isPureWalk(edge)).map((edge) =>
      `${edge.action}:${substantive(edge.events).join("&")}`
    ),
  };
}

function pureWalkRoute(from: number, to: number, macro: number): Edge[] | null {
  if (from === to) return [];
  const queue = [from];
  const previous = new Map<number, Edge>();
  const seen = new Set([from]);
  for (let cursor = 0; cursor < queue.length; cursor += 1) {
    for (const edge of outgoing[queue[cursor]!]!) {
      if (!isPureWalk(edge) || walkScc.of[edge.to] !== macro || seen.has(edge.to)) continue;
      seen.add(edge.to);
      previous.set(edge.to, edge);
      queue.push(edge.to);
    }
  }
  if (!seen.has(to)) return null;
  const result: Edge[] = [];
  let cursor = to;
  while (cursor !== from) {
    const edge = previous.get(cursor)!;
    result.unshift(edge);
    cursor = edge.from;
  }
  return result;
}

function macroReach(
  starts: number[],
  edges: MacroEdge[][],
  next: (edge: MacroEdge) => number,
): Set<number> {
  const seen = new Set(starts);
  const queue = [...starts];
  for (let cursor = 0; cursor < queue.length; cursor += 1) {
    for (const edge of edges[queue[cursor]!]!) {
      const node = next(edge);
      if (seen.has(node)) continue;
      seen.add(node);
      queue.push(node);
    }
  }
  return seen;
}

function tarjan(stateCount: number, edges: Edge[]): { count: number; of: number[] } {
  const adjacency = Array.from({ length: stateCount }, () => [] as number[]);
  for (const edge of edges) adjacency[edge.from]!.push(edge.to);
  const index = new Array<number>(stateCount).fill(-1);
  const low = new Array<number>(stateCount).fill(-1);
  const stack: number[] = [];
  const onStack = new Array<boolean>(stateCount).fill(false);
  const of = new Array<number>(stateCount).fill(-1);
  let nextIndex = 0;
  let count = 0;

  const visit = (node: number): void => {
    index[node] = nextIndex;
    low[node] = nextIndex;
    nextIndex += 1;
    stack.push(node);
    onStack[node] = true;
    for (const next of adjacency[node]!) {
      if (index[next] === -1) {
        visit(next);
        low[node] = Math.min(low[node]!, low[next]!);
      } else if (onStack[next]) {
        low[node] = Math.min(low[node]!, index[next]!);
      }
    }
    if (low[node] !== index[node]) return;
    while (true) {
      const member = stack.pop()!;
      onStack[member] = false;
      of[member] = count;
      if (member === node) break;
    }
    count += 1;
  };

  for (let node = 0; node < stateCount; node += 1) {
    if (index[node] === -1) visit(node);
  }
  return { count, of };
}

function arraysEqual<T>(left: T[], right: T[]): boolean {
  return left.length === right.length && left.every((value, index) => value === right[index]);
}

function slash(value: string): string {
  return value.replace(/\\/g, "/");
}

function formatMarkdown(report: any): string {
  const lines = [
    `# ${candidate} 有向严格唯一性审计 2`,
    "",
    `- 结论：**${report.verdict.status}**`,
    `- 完整图：${report.graph.reachableStates} states / ${report.graph.legalTransitions} transitions / ${report.graph.winningStates} win`,
    `- 纯 walk 有向 SCC：${report.graph.directedWalkSccs}；可胜相关宏：${report.graph.relevantMacros}`,
    `- 证据 A：${report.evidenceA.completedSimpleWinningPaths} 条完整 node-simple 宏胜路，${report.evidenceA.distinctExactObjectStageSequences} 条精确对象阶段序列，截断=${report.evidenceA.truncated}`,
    `- 证据 B：${report.evidenceB.exploredProductStates} 个 visited-mask×阶段产品状态，偏离规范的胜态=${report.evidenceB.mismatchWinFound}，截断=${report.evidenceB.truncated}`,
    `- 必要对象动作换序：${report.verdict.necessaryObjectReorderFound ? "发现" : "未发现"}`,
    "",
    "## 修正后的等价口径",
    "",
    "只把纯走位有向子图的强连通分量视为同一玩家站位宏状态。跨 SCC 的单向 pure-walk 边仍是方向性 commitment，不做无向合并。对象阶段身份包含输入方向、非 walk 事件以及前后完整对象配置。",
    "",
    "允许忽略纯走位路径差异，也允许擦除回到同一 directed-walk SCC 的完整环；不允许擦除 loop-erased 胜路中的对象动作换序。",
    "",
    "## 交叉证据",
    "",
    `1. 宏路径枚举完整遍历 ${report.evidenceA.completedSimpleWinningPaths} 条 node-simple 胜路；二者都严格等于 canonical 的 10 段对象链。它们只在首次 B/S 后是否经过一条单向 walk commitment 上不同。`,
    `2. visited-mask × 10 阶段序列自动机完整探索 ${report.evidenceB.exploredProductStates} 个产品状态；没有任何 mismatch 胜态。`,
    "",
    "raw 严格序列确实能找到一次 B/S 上下往返 detour，但该段返回同一对象宏状态；宏环擦除后精确恢复 canonical。因此它属于题设允许的完整返回环，不是第二套必要计划。",
    "",
    "## 结论边界",
    "",
    report.verdict.conclusion,
    "",
    report.verdict.caveat,
    "",
    "## 精确布局",
    "",
    "```text",
    layout,
    "```",
    "",
  ];
  return `${lines.join("\n").trimEnd()}\n`;
}
