import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { loadPrototypePackage } from "../../../src/core/io.js";
import { enumerateRuntimeGraph, type RuntimeGraph, type RuntimeGraphEdge } from "../../../src/core/runtimeGraph.js";
import type { InputId, LevelDoc } from "../../../src/core/types.js";
import type { RealityAnchorState } from "../../../src/prototypes/reality_anchor/mechanics.js";
import { getRuntimeAdapter } from "../../../src/prototypes/runtimeAdapter.js";

const layoutPath = process.argv[2]
  ?? "prototypes/Reality_Anchor/reports/RA_FRESH_2026_07_10_SQUARE_REPAIR_BIND_HANDOFF_v6.layout.txt";
const maxStates = Number(process.argv[3] ?? 500_000);
const id = "RA_FRESH_2026_07_10_SQUARE_REPAIR_BIND_HANDOFF_v6_unique_responsibility_chain";
const outBase = path.join("prototypes/Reality_Anchor/reports", id);

const pkg = await loadPrototypePackage("prototypes/reality_anchor");
const adapter = getRuntimeAdapter(pkg.mechanic);
const runtime = adapter.createRuntime(pkg.mechanic);
const layout = (await readFile(layoutPath, "utf8")).replace(/\r/g, "").replace(/\n+$/g, "");
const level: LevelDoc = {
  id,
  title: id,
  role: "challenge",
  status: "candidate",
  targets: ["K_runtime_smoke"],
  known_before: ["K_runtime_smoke"],
  target_learning: ["K_runtime_smoke"],
  support_level: "none",
  expected_solver_evidence: ["solvable"],
  expected_llm_player_evidence: [],
  layout,
};

type Graph = RuntimeGraph<RealityAnchorState, InputId>;
type Edge = RuntimeGraphEdge<InputId>;

const initial = adapter.parseLevel(level) as RealityAnchorState;
const graph = enumerateRuntimeGraph(
  runtime,
  initial,
  pkg.mechanic.win,
  { winCondition: pkg.mechanic.win },
  { maxStates, terminalizeWins: true },
) as Graph;
if (graph.status !== "complete") {
  throw new Error(`graph ${graph.status}: ${graph.reason ?? "unknown"}`);
}

const adjacency = Array.from({ length: graph.keys.length }, () => [] as Edge[]);
const reverse = Array.from({ length: graph.keys.length }, () => [] as Edge[]);
for (const edge of graph.edges) {
  adjacency[edge.from]!.push(edge);
  reverse[edge.to]!.push(edge);
}

const scc = computeSccs(graph.keys.length, graph.edges);
const sccOutgoing = Array.from({ length: scc.count }, () => new Set<number>());
const sccIncoming = Array.from({ length: scc.count }, () => new Set<number>());
const concreteBySccEdge = new Map<string, Edge[]>();
for (const edge of graph.edges) {
  const from = scc.of[edge.from]!;
  const to = scc.of[edge.to]!;
  if (from === to) continue;
  sccOutgoing[from]!.add(to);
  sccIncoming[to]!.add(from);
  const key = `${from}->${to}`;
  const group = concreteBySccEdge.get(key) ?? [];
  group.push(edge);
  concreteBySccEdge.set(key, group);
}

const winningSccs = new Set([...graph.winStateIndexes].map((index) => scc.of[index]!));
const winReachableSccs = reverseReachableScc(winningSccs, sccIncoming);
const initialScc = scc.of[0]!;
const winSccPaths = enumerateSccPaths(initialScc, winningSccs, winReachableSccs, sccOutgoing);

const toWin = reverseDistances(graph.keys.length, graph.winStateIndexes, reverse);
const shortestCost = toWin[0];
if (shortestCost === null) throw new Error("initial state cannot reach win");
const optimal = analyzeOptimalPlans(graph, adjacency, toWin, shortestCost);

const pathDetails = winSccPaths.map((sccPath, index) => {
  const route = shortestRouteForSccPath(graph, adjacency, scc.of, sccPath);
  const crossingSteps = route.edges.flatMap((edge, edgeIndex) => {
    const fromScc = scc.of[edge.from]!;
    const toScc = scc.of[edge.to]!;
    if (fromScc === toScc) return [];
    return [{
      step: edgeIndex + 1,
      fromScc,
      toScc,
      input: edge.action,
      events: edge.events,
      substantiveEvents: substantiveEvents(edge.events),
      objectStateChanged: objectKey(graph.keys[edge.from]!) !== objectKey(graph.keys[edge.to]!),
      sourceKey: graph.keys[edge.from],
      targetKey: graph.keys[edge.to],
    }];
  });
  const nonWalkEventSteps = route.edges.flatMap((edge, edgeIndex) => {
    const events = substantiveEvents(edge.events);
    return events.length === 0 ? [] : [{ step: edgeIndex + 1, input: edge.action, events }];
  });
  return {
    pathIndex: index + 1,
    sccPath,
    shortestRouteCost: route.edges.length,
    inputs: route.edges.map((edge) => edge.action),
    crossingSteps,
    irreversibleObjectCrossingSignature: crossingSteps
      .filter((step) => step.objectStateChanged)
      .map((step) => eventStepSignature(step.substantiveEvents)),
    nonWalkEventSteps,
    exactNonWalkSignature: exactSignature(route.edges),
    roleMilestoneSignature: roleMilestoneSignature(route.edges),
  };
});

const winNodes = [...winReachableSccs].sort((a, b) => a - b).map((sccId) => ({
  sccId,
  stateCount: scc.sizes[sccId],
  isInitial: sccId === initialScc,
  isWinning: winningSccs.has(sccId),
  winOutgoing: [...sccOutgoing[sccId]!].filter((target) => winReachableSccs.has(target)).sort((a, b) => a - b),
  winIncoming: [...sccIncoming[sccId]!].filter((source) => winReachableSccs.has(source)).sort((a, b) => a - b),
}));

const winEdges = [...concreteBySccEdge.entries()].flatMap(([key, edges]) => {
  const [fromText, toText] = key.split("->");
  const fromScc = Number(fromText);
  const toScc = Number(toText);
  if (!winReachableSccs.has(fromScc) || !winReachableSccs.has(toScc)) return [];
  const variants = new Map<string, {
    action: InputId;
    events: string[];
    substantiveEvents: string[];
    objectStateChanged: boolean;
    count: number;
    sourceKey: string;
    targetKey: string;
  }>();
  for (const edge of edges) {
    const changed = objectKey(graph.keys[edge.from]!) !== objectKey(graph.keys[edge.to]!);
    const signature = `${edge.action}|${edge.events.join("&")}|${changed ? 1 : 0}`;
    const prior = variants.get(signature);
    if (prior) {
      prior.count += 1;
    } else {
      variants.set(signature, {
        action: edge.action,
        events: edge.events,
        substantiveEvents: substantiveEvents(edge.events),
        objectStateChanged: changed,
        count: 1,
        sourceKey: graph.keys[edge.from]!,
        targetKey: graph.keys[edge.to]!,
      });
    }
  }
  return [{ fromScc, toScc, concreteTransitionCount: edges.length, variants: [...variants.values()] }];
}).sort((a, b) => a.fromScc - b.fromScc || a.toScc - b.toScc);

const report = {
  id,
  auditScope: "candidate_specific_unique_responsibility_chain",
  sourceLayout: layoutPath.replace(/\\/g, "/"),
  layout: adapter.renderState(initial),
  verdict: {
    status: optimal.roleMilestoneSignatures.length > 1 ? "REJECT" : "PASS",
    criterion: "唯一正确职责链：允许纯走位差异与同职责可交换微序，但不允许胜路改变职责阶段的先后和转换分配。",
    reason: optimal.roleMilestoneSignatures.length > 1
      ? "完整最短解枚举得到两种职责里程碑序列：一条先拉中央 crate 再首次移动 B/S，另一条先移动 B/S 再拉 crate；转换分配也从一次 n2 变为两次 n1。这是同成本的不同物体处理计划。"
      : "全部最短解归约为同一职责里程碑序列。",
    witnesses: [
      {
        label: "先移动 B/S，后拉 crate",
        cost: optimal.roleMilestoneWitnesses[0]?.cost ?? null,
        trace: "trace_RA_FRESH_2026_07_10_SQUARE_REPAIR_BIND_HANDOFF_v6_WITNESS_BS_BEFORE_PULL.md",
        orderProbe: "order_probe_RA_FRESH_2026_07_10_SQUARE_REPAIR_BIND_HANDOFF_v6_BS_BEFORE_PULL.md",
      },
      {
        label: "先拉 crate，后移动 B/S",
        cost: optimal.roleMilestoneWitnesses[1]?.cost ?? null,
        trace: "trace_RA_FRESH_2026_07_10_SQUARE_REPAIR_BIND_HANDOFF_v6_WITNESS_PULL_BEFORE_BS.md",
        orderProbe: "order_probe_RA_FRESH_2026_07_10_SQUARE_REPAIR_BIND_HANDOFF_v6_PULL_BEFORE_BS.md",
      },
    ],
    doNotInfer: "1 个 winning state 只证明终局状态唯一；它不排除多条职责不同的最短胜路。",
  },
  definitions: {
    exactWinningStateUniqueness: "完整可达图在胜利状态终止后仅有一个 winning state key。",
    sccPath: "把任意可逆往返压进同一强连通分量后，从初态 SCC 到胜利 SCC 的不可逆路径。",
    exactNonWalkSignature: "删除纯 walk 步，但保留每个物体动作产生的完整事件组及顺序。",
    roleMilestoneSignature: "仅保留会改变职责阶段的转换、拉取与 B/S 边界移动事件；不把同一职责内的刚体位移/黏合记作新计划。",
    limitation: "允许任意可逆绕路会产生无穷多输入串；本审计比较全部 SCC 不可逆路径与全部最短解的去走位事件序列，而不是声称输入串唯一。",
  },
  graph: {
    status: graph.status,
    reachableStates: graph.keys.length,
    legalTransitions: graph.edges.length,
    winningStates: graph.winStateIndexes.size,
    shortestCost,
  },
  scc: {
    count: scc.count,
    initialScc,
    winningSccs: [...winningSccs],
    winReachableSccCount: winReachableSccs.size,
    branchingWinSccs: winNodes.filter((node) => !node.isWinning && node.winOutgoing.length > 1).map((node) => node.sccId),
    mergingWinSccs: winNodes.filter((node) => !node.isInitial && node.winIncoming.length > 1).map((node) => node.sccId),
    winNodes,
    winEdges,
    winSccPathCount: winSccPaths.length,
    winSccPaths,
  },
  optimalSolutions: optimal,
  allWinSccPathRepresentatives: pathDetails,
  reducedComparisons: {
    distinctRepresentativeExactNonWalkSignatures: unique(pathDetails.map((item) => item.exactNonWalkSignature)),
    distinctRepresentativeRoleMilestoneSignatures: unique(pathDetails.map((item) => item.roleMilestoneSignature)),
    distinctRepresentativeIrreversibleObjectCrossingSignatures: unique(
      pathDetails.map((item) => item.irreversibleObjectCrossingSignature.join(" > ")),
    ),
  },
};

await writeFile(`${outBase}.json`, `${JSON.stringify(report, null, 2)}\n`, "utf8");
await writeFile(`${outBase}.md`, formatMarkdown(report), "utf8");
console.log(`Wrote ${outBase}.json`);
console.log(`Wrote ${outBase}.md`);
console.log(JSON.stringify({
  graph: report.graph,
  scc: {
    count: report.scc.count,
    winReachableSccCount: report.scc.winReachableSccCount,
    branchingWinSccs: report.scc.branchingWinSccs,
    mergingWinSccs: report.scc.mergingWinSccs,
    winSccPathCount: report.scc.winSccPathCount,
  },
  optimalSolutions: report.optimalSolutions,
  reducedComparisons: report.reducedComparisons,
}, null, 2));

function analyzeOptimalPlans(
  inputGraph: Graph,
  inputAdjacency: Edge[][],
  distancesToWin: Array<number | null>,
  cost: number,
) {
  const relevant = inputGraph.keys.map((_, index) =>
    distancesToWin[index] !== null && inputGraph.depthByIndex[index]! + distancesToWin[index]! === cost
  );
  const byDistanceToWin = Array.from({ length: cost + 1 }, () => [] as number[]);
  for (let index = 0; index < inputGraph.keys.length; index += 1) {
    const distance = distancesToWin[index];
    if (!relevant[index] || distance === null || distance > cost) continue;
    byDistanceToWin[distance]!.push(index);
  }
  const pathCount = new Array<bigint>(inputGraph.keys.length).fill(0n);
  const exactSignatures = Array.from({ length: inputGraph.keys.length }, () => new Set<string>());
  const roleSignatures = Array.from({ length: inputGraph.keys.length }, () => new Set<string>());
  for (const win of inputGraph.winStateIndexes) {
    if (!relevant[win]) continue;
    pathCount[win] = 1n;
    exactSignatures[win]!.add("");
    roleSignatures[win]!.add("");
  }
  let truncated = false;
  const signatureCap = 10_000;
  for (let distance = 1; distance <= cost; distance += 1) {
    for (const from of byDistanceToWin[distance]!) {
      for (const edge of inputAdjacency[from]!) {
        if (!relevant[edge.to] || distancesToWin[edge.to] !== distance - 1) continue;
        pathCount[from] += pathCount[edge.to]!;
        const exactToken = eventStepSignature(substantiveEvents(edge.events));
        const roleToken = eventStepSignature(roleEvents(edge.events));
        addPrefixed(exactSignatures[from]!, exactToken, exactSignatures[edge.to]!, signatureCap);
        addPrefixed(roleSignatures[from]!, roleToken, roleSignatures[edge.to]!, signatureCap);
        if (exactSignatures[from]!.size >= signatureCap || roleSignatures[from]!.size >= signatureCap) {
          truncated = true;
        }
      }
    }
  }
  return {
    shortestCost: cost,
    exactInputPathCount: pathCount[0]!.toString(),
    distinctExactNonWalkSignatureCount: exactSignatures[0]!.size,
    exactNonWalkSignatures: [...exactSignatures[0]!].sort(),
    distinctRoleMilestoneSignatureCount: roleSignatures[0]!.size,
    roleMilestoneSignatures: [...roleSignatures[0]!].sort(),
    roleMilestoneWitnesses: [...roleSignatures[0]!].sort().map((signature, index) => {
      const edges = reconstructOptimalRoleWitness(
        signature,
        inputGraph,
        inputAdjacency,
        distancesToWin,
        relevant,
        roleSignatures,
      );
      return {
        witnessIndex: index + 1,
        cost: edges.length,
        inputs: edges.map((edge) => edge.action),
        roleMilestoneSignature: signature,
        exactNonWalkSignature: exactSignature(edges),
        roleMilestoneSteps: edges.flatMap((edge, edgeIndex) => {
          const events = roleEvents(edge.events);
          return events.length === 0 ? [] : [{
            step: edgeIndex + 1,
            input: edge.action,
            events,
            allEvents: edge.events,
            beforeKey: inputGraph.keys[edge.from],
            afterKey: inputGraph.keys[edge.to],
            beforeLayout: adapter.renderState(inputGraph.states[edge.from]!),
            afterLayout: adapter.renderState(inputGraph.states[edge.to]!),
          }];
        }),
      };
    }),
    signatureEnumerationTruncated: truncated,
    signatureCap,
  };
}

function reconstructOptimalRoleWitness(
  targetSignature: string,
  inputGraph: Graph,
  inputAdjacency: Edge[][],
  distancesToWin: Array<number | null>,
  relevant: boolean[],
  roleSignatures: Array<Set<string>>,
): Edge[] {
  const edges: Edge[] = [];
  let current = 0;
  let remaining = targetSignature;
  while (!inputGraph.winStateIndexes.has(current)) {
    const distance = distancesToWin[current];
    if (distance === null || distance <= 0) throw new Error("role witness lost the win distance");
    let selected: { edge: Edge; suffix: string } | undefined;
    for (const edge of inputAdjacency[current]!) {
      if (!relevant[edge.to] || distancesToWin[edge.to] !== distance - 1) continue;
      const token = eventStepSignature(roleEvents(edge.events));
      for (const suffix of roleSignatures[edge.to]!) {
        const combined = token.length === 0 ? suffix : suffix.length === 0 ? token : `${token} > ${suffix}`;
        if (combined !== remaining) continue;
        selected = { edge, suffix };
        break;
      }
      if (selected) break;
    }
    if (!selected) throw new Error(`could not reconstruct role signature from state ${current}: ${remaining}`);
    edges.push(selected.edge);
    current = selected.edge.to;
    remaining = selected.suffix;
  }
  if (remaining.length !== 0) throw new Error(`role witness ended with suffix: ${remaining}`);
  return edges;
}

function addPrefixed(target: Set<string>, token: string, suffixes: Set<string>, cap: number): void {
  for (const suffix of suffixes) {
    const combined = token.length === 0 ? suffix : suffix.length === 0 ? token : `${token} > ${suffix}`;
    target.add(combined);
    if (target.size >= cap) return;
  }
}

function shortestRouteForSccPath(
  inputGraph: Graph,
  inputAdjacency: Edge[][],
  sccOf: number[],
  sccPath: number[],
): { edges: Edge[] } {
  const position = new Map(sccPath.map((sccId, index) => [sccId, index]));
  const predecessor = new Map<number, Edge>();
  const queue = [0];
  const visited = new Set<number>([0]);
  let terminal: number | null = null;
  for (let cursor = 0; cursor < queue.length; cursor += 1) {
    const from = queue[cursor]!;
    if (inputGraph.winStateIndexes.has(from)) {
      terminal = from;
      break;
    }
    const fromPosition = position.get(sccOf[from]!);
    if (fromPosition === undefined) continue;
    for (const edge of inputAdjacency[from]!) {
      const toPosition = position.get(sccOf[edge.to]!);
      if (toPosition === undefined) continue;
      if (toPosition !== fromPosition && toPosition !== fromPosition + 1) continue;
      if (visited.has(edge.to)) continue;
      visited.add(edge.to);
      predecessor.set(edge.to, edge);
      queue.push(edge.to);
    }
  }
  if (terminal === null) throw new Error(`failed to realize SCC path ${sccPath.join("->")}`);
  const edges: Edge[] = [];
  let cursor = terminal;
  while (cursor !== 0) {
    const edge = predecessor.get(cursor);
    if (!edge) throw new Error(`missing predecessor at ${cursor}`);
    edges.push(edge);
    cursor = edge.from;
  }
  edges.reverse();
  return { edges };
}

function reverseDistances(
  stateCount: number,
  wins: Set<number>,
  inputReverse: Edge[][],
): Array<number | null> {
  const distance = new Array<number | null>(stateCount).fill(null);
  const queue = [...wins];
  for (const win of wins) distance[win] = 0;
  for (let cursor = 0; cursor < queue.length; cursor += 1) {
    const current = queue[cursor]!;
    for (const edge of inputReverse[current]!) {
      if (distance[edge.from] !== null) continue;
      distance[edge.from] = distance[current]! + 1;
      queue.push(edge.from);
    }
  }
  return distance;
}

function reverseReachableScc(wins: Set<number>, incoming: Array<Set<number>>): Set<number> {
  const seen = new Set(wins);
  const queue = [...wins];
  for (let cursor = 0; cursor < queue.length; cursor += 1) {
    for (const previous of incoming[queue[cursor]!]!) {
      if (seen.has(previous)) continue;
      seen.add(previous);
      queue.push(previous);
    }
  }
  return seen;
}

function enumerateSccPaths(
  start: number,
  wins: Set<number>,
  winReachable: Set<number>,
  outgoing: Array<Set<number>>,
): number[][] {
  const paths: number[][] = [];
  const stack: Array<{ node: number; path: number[] }> = [{ node: start, path: [start] }];
  while (stack.length > 0) {
    const current = stack.pop()!;
    if (wins.has(current.node)) {
      paths.push(current.path);
      continue;
    }
    const nexts = [...outgoing[current.node]!]
      .filter((next) => winReachable.has(next))
      .sort((a, b) => b - a);
    for (const next of nexts) {
      if (current.path.includes(next)) throw new Error("SCC condensation unexpectedly contains a cycle");
      stack.push({ node: next, path: [...current.path, next] });
    }
  }
  return paths.sort((a, b) => a.join(",").localeCompare(b.join(","), undefined, { numeric: true }));
}

function computeSccs(stateCount: number, edges: Edge[]): { of: number[]; count: number; sizes: number[] } {
  const outgoing = Array.from({ length: stateCount }, () => [] as number[]);
  const reverseOutgoing = Array.from({ length: stateCount }, () => [] as number[]);
  for (const edge of edges) {
    outgoing[edge.from]!.push(edge.to);
    reverseOutgoing[edge.to]!.push(edge.from);
  }
  const visited = new Array<boolean>(stateCount).fill(false);
  const order: number[] = [];
  for (let state = 0; state < stateCount; state += 1) {
    if (visited[state]) continue;
    finishOrderDfs(state, outgoing, visited, order);
  }
  const of = new Array<number>(stateCount).fill(-1);
  const sizes: number[] = [];
  for (let orderIndex = order.length - 1; orderIndex >= 0; orderIndex -= 1) {
    const state = order[orderIndex]!;
    if (of[state] !== -1) continue;
    const id = sizes.length;
    const stack = [state];
    of[state] = id;
    sizes[id] = 0;
    while (stack.length > 0) {
      const current = stack.pop()!;
      sizes[id] = sizes[id]! + 1;
      for (const previous of reverseOutgoing[current]!) {
        if (of[previous] !== -1) continue;
        of[previous] = id;
        stack.push(previous);
      }
    }
  }
  return { of, count: sizes.length, sizes };
}

function finishOrderDfs(start: number, outgoing: number[][], visited: boolean[], order: number[]): void {
  const stack: Array<{ state: number; next: number }> = [{ state: start, next: 0 }];
  visited[start] = true;
  while (stack.length > 0) {
    const frame = stack.at(-1)!;
    const neighbors = outgoing[frame.state]!;
    if (frame.next < neighbors.length) {
      const next = neighbors[frame.next]!;
      frame.next += 1;
      if (!visited[next]) {
        visited[next] = true;
        stack.push({ state: next, next: 0 });
      }
    } else {
      order.push(frame.state);
      stack.pop();
    }
  }
}

function substantiveEvents(events: string[]): string[] {
  return events.filter((event) => event !== "walk");
}

function roleEvents(events: string[]): string[] {
  const wanted = [
    "sticky_to_box:n1",
    "force_chain:n2",
    "box_to_sticky:n1",
    "pull_object:crate#1",
    "anchor_boundary_shift:box_sticky",
    "pull_object:sticky#1",
    "sticky_to_box:n2",
    "box_to_sticky:n2",
  ];
  return events.filter((event) => wanted.includes(event));
}

function eventStepSignature(events: string[]): string {
  return events.join("&");
}

function exactSignature(edges: Edge[]): string {
  return edges.map((edge) => eventStepSignature(substantiveEvents(edge.events))).filter(Boolean).join(" > ");
}

function roleMilestoneSignature(edges: Edge[]): string {
  return edges.map((edge) => eventStepSignature(roleEvents(edge.events))).filter(Boolean).join(" > ");
}

function objectKey(key: string): string {
  return key.split("|").filter((part) => !part.startsWith("Ply:")).join("|");
}

function unique(values: string[]): string[] {
  return [...new Set(values)].sort();
}

function formatMarkdown(input: typeof report): string {
  const lines = [
    `# ${input.id}`,
    "",
    `## 审计结论：${input.verdict.status}`,
    "",
    `- 判定标准：${input.verdict.criterion}`,
    `- 理由：${input.verdict.reason}`,
    `- 禁止误读：${input.verdict.doNotInfer}`,
    "- 两条硬反例：",
    ...input.verdict.witnesses.map((witness) =>
      `  - ${witness.label}；cost=${witness.cost}；trace=${witness.trace}；probe=${witness.orderProbe}`
    ),
    "",
    "## 结论所依据的口径",
    "",
    `- 精确胜利状态唯一：${input.definitions.exactWinningStateUniqueness}`,
    `- SCC 路径：${input.definitions.sccPath}`,
    `- 去走位事件序列：${input.definitions.exactNonWalkSignature}`,
    `- 职责里程碑序列：${input.definitions.roleMilestoneSignature}`,
    `- 边界：${input.definitions.limitation}`,
    "",
    "## 完整图",
    "",
    `- 状态/边：${input.graph.reachableStates}/${input.graph.legalTransitions}`,
    `- 胜利状态：${input.graph.winningStates}`,
    `- 最短成本：${input.graph.shortestCost}`,
    `- SCC：${input.scc.count}；可胜 SCC：${input.scc.winReachableSccCount}`,
    `- 可胜分叉 SCC：${input.scc.branchingWinSccs.join(", ") || "无"}`,
    `- 可胜汇合 SCC：${input.scc.mergingWinSccs.join(", ") || "无"}`,
    `- 全部可胜 SCC 路径：${input.scc.winSccPathCount}`,
    "",
    "## 全部最短解",
    "",
    `- 精确输入路径数：${input.optimalSolutions.exactInputPathCount}`,
    `- 去走位事件序列种数：${input.optimalSolutions.distinctExactNonWalkSignatureCount}`,
    `- 职责里程碑序列种数：${input.optimalSolutions.distinctRoleMilestoneSignatureCount}`,
    `- 截断：${input.optimalSolutions.signatureEnumerationTruncated}`,
    "",
    "### 最短解职责里程碑序列",
    "",
    ...input.optimalSolutions.roleMilestoneSignatures.map((signature, index) => `${index + 1}. ${signature || "（空）"}`),
    "",
    "### 每种最短职责序列的可复现 witness",
    "",
    ...input.optimalSolutions.roleMilestoneWitnesses.flatMap((witness) => [
      `#### Witness ${witness.witnessIndex}`,
      "",
      `- 成本：${witness.cost}`,
      `- Inputs：${witness.inputs.join(" ")}`,
      `- 职责里程碑：${witness.roleMilestoneSignature}`,
      "",
      ...witness.roleMilestoneSteps.map((step) =>
        `- step ${step.step} ${step.input}: ${step.events.join("+")}；before=${step.beforeKey}；after=${step.afterKey}`
      ),
      "",
    ]),
    "## 可胜 SCC 子图",
    "",
    "| SCC | 状态数 | 可胜入边 | 可胜出边 | 初态 | 胜利 |",
    "| ---: | ---: | --- | --- | --- | --- |",
    ...input.scc.winNodes.map((node) =>
      `| ${node.sccId} | ${node.stateCount} | ${node.winIncoming.join(",")} | ${node.winOutgoing.join(",")} | ${node.isInitial ? "是" : "否"} | ${node.isWinning ? "是" : "否"} |`
    ),
    "",
    "### 可胜 SCC 边的实际事件变体",
    "",
    ...input.scc.winEdges.flatMap((edge) => [
      `#### s${edge.fromScc} -> s${edge.toScc}`,
      "",
      ...edge.variants.map((variant) =>
        `- ${variant.action}；events=${variant.events.join("+") || "none"}；objectChanged=${variant.objectStateChanged}；concrete=${variant.count}`
      ),
      "",
    ]),
    "## 每条可胜 SCC 路径的最短代表",
    "",
    ...input.allWinSccPathRepresentatives.flatMap((item) => [
      `### Path ${item.pathIndex}: ${item.sccPath.map((value) => `s${value}`).join(" -> ")}`,
      "",
      `- 代表成本：${item.shortestRouteCost}`,
      `- 不可逆物体跨 SCC 序列：${item.irreversibleObjectCrossingSignature.join(" > ") || "none"}`,
      `- 职责里程碑：${item.roleMilestoneSignature || "none"}`,
      `- 完整去走位事件：${item.exactNonWalkSignature || "none"}`,
      "",
    ]),
    "## 归约比较",
    "",
    `- 代表路径的完整去走位事件序列种数：${input.reducedComparisons.distinctRepresentativeExactNonWalkSignatures.length}`,
    `- 代表路径的职责里程碑序列种数：${input.reducedComparisons.distinctRepresentativeRoleMilestoneSignatures.length}`,
    `- 代表路径的不可逆物体跨 SCC 序列种数：${input.reducedComparisons.distinctRepresentativeIrreversibleObjectCrossingSignatures.length}`,
  ];
  return `${lines.join("\n").trimEnd()}\n`;
}
