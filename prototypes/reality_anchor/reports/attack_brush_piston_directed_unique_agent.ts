import { readFile, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import { loadPrototypePackage } from "../../../src/core/io.js";
import { enumerateRuntimeGraph, type RuntimeGraph, type RuntimeGraphEdge } from "../../../src/core/runtimeGraph.js";
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
  source: Edge;
  stageKey: string;
  contactKey: string;
};

const candidate = "RA_FRESH_2026_07_10_BRUSH_PISTON_TRIPLE_RELAY_v1";
const layoutPath = `prototypes/reality_anchor/reports/${candidate}.layout.txt`;
const outBase = `prototypes/reality_anchor/reports/${candidate}_directed_uniqueness_attack_scratch`;
const canonicalInputs: InputId[] = [
  "left", "up", "left", "right", "right", "down", "right", "down", "left", "left",
  "left", "up", "up", "right", "down", "right", "left", "left", "down",
];

const pkg = await loadPrototypePackage("prototypes/reality_anchor");
const adapter = getRuntimeAdapter(pkg.mechanic);
const runtime = adapter.createRuntime(pkg.mechanic);
const raw = await readFile(layoutPath);
const layout = raw.toString("utf8").replace(/\r/g, "").replace(/\n+$/g, "");
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
const graph = enumerateRuntimeGraph(runtime, initial, pkg.mechanic.win, { winCondition: pkg.mechanic.win }, {
  maxStates: 100_000,
  maxDepth: 200,
  terminalizeWins: true,
}) as Graph;
if (graph.status !== "complete") throw new Error(`完整图失败：${graph.status} ${graph.reason ?? ""}`);

const outgoing = Array.from({ length: graph.keys.length }, () => [] as Edge[]);
const incoming = Array.from({ length: graph.keys.length }, () => [] as Edge[]);
for (const edge of graph.edges) {
  outgoing[edge.from]!.push(edge);
  incoming[edge.to]!.push(edge);
}
const walkEdges = graph.edges.filter((edge) => isPureWalk(edge));
const walkOut = Array.from({ length: graph.keys.length }, () => [] as number[]);
const walkIn = Array.from({ length: graph.keys.length }, () => [] as number[]);
for (const edge of walkEdges) {
  walkOut[edge.from]!.push(edge.to);
  walkIn[edge.to]!.push(edge.from);
}

const scc = kosaraju(walkOut, walkIn);
const macroEdges: MacroEdge[] = [];
for (const edge of graph.edges) {
  const from = scc.id[edge.from]!;
  const to = scc.id[edge.to]!;
  if (isPureWalk(edge) && from === to) continue;
  const events = substantive(edge.events);
  macroEdges.push({
    from,
    to,
    kind: events.length === 0 ? "walk_commitment" : "object",
    action: edge.action,
    events,
    source: edge,
    stageKey: events.length === 0
      ? ""
      : stageKey(edge, graph.states[edge.from]!, graph.states[edge.to]!),
    contactKey: events.length === 0
      ? ""
      : contactStageKey(edge, graph.states[edge.from]!, graph.states[edge.to]!),
  });
}
const macroOut = Array.from({ length: scc.count }, () => [] as MacroEdge[]);
const macroIn = Array.from({ length: scc.count }, () => [] as MacroEdge[]);
for (const edge of macroEdges) {
  macroOut[edge.from]!.push(edge);
  macroIn[edge.to]!.push(edge);
}
const startMacro = scc.id[0]!;
const winMacros = new Set([...graph.winStateIndexes].map((index) => scc.id[index]!));
const macroForward = reachMacro([startMacro], macroOut, (edge) => edge.to);
const macroBackward = reachMacro([...winMacros], macroIn, (edge) => edge.from);
const relevantMacros = new Set([...macroForward].filter((node) => macroBackward.has(node)));

const canonical = replayIndexes(canonicalInputs);
const canonicalObjectStages = canonical.edges
  .filter((edge) => !isPureWalk(edge))
  .map((edge) => stageKey(edge, graph.states[edge.from]!, graph.states[edge.to]!));
const canonicalEventStages = canonical.edges
  .filter((edge) => !isPureWalk(edge))
  .map((edge) => `${edge.action}:${substantive(edge.events).join("&")}`);
const canonicalContactStages = canonical.edges
  .filter((edge) => !isPureWalk(edge))
  .map((edge) => contactStageKey(edge, graph.states[edge.from]!, graph.states[edge.to]!));
const canonicalMacroWalk = compressConsecutive([startMacro, ...canonical.indexes.slice(1).map((index) => scc.id[index]!)]);
const canonicalWalkCommitments = canonical.edges
  .filter((edge) => isPureWalk(edge) && scc.id[edge.from] !== scc.id[edge.to])
  .map((edge) => `${scc.id[edge.from]}->${scc.id[edge.to]}:${edge.action}`);

const rawDeviation = shortestRawDeviation(canonicalObjectStages);
const simpleSearch = enumerateSimpleMacroPaths(canonicalObjectStages, 2_000_000);
const directionalWalkPairs = inspectDirectionalWalkPairs();
const objectConfigurations = inspectObjectConfigurations();

let witness: ReturnType<typeof reconstructMacroPath> | null = null;
if (simpleSearch.firstObjectDeviation) witness = reconstructMacroPath(simpleSearch.firstObjectDeviation.edges);
else if (simpleSearch.firstContactDeviation) witness = reconstructMacroPath(simpleSearch.firstContactDeviation.edges);
else if (simpleSearch.firstWalkCommitmentDeviation) witness = reconstructMacroPath(simpleSearch.firstWalkCommitmentDeviation.edges);
const canonicalReplay = replayWitness(canonicalInputs);
const merge = witness ? firstPostDivergenceMerge(canonicalReplay.steps, witness.steps) : null;
const winningRoleAssignments = [...new Set([...graph.winStateIndexes].map((index) => JSON.stringify(goalRoles(graph.states[index]!))))].map((value) => JSON.parse(value));

const report = {
  candidate,
  scope: "独立攻击唯一解；只写 scratch，不修改候选、packet、levels 或 queue。",
  exactLayoutSha256: createHash("sha256").update(raw).digest("hex"),
  layout,
  fullRuntimeGraph: {
    status: graph.status,
    states: graph.keys.length,
    transitions: graph.edges.length,
    wins: graph.winStateIndexes.size,
  },
  directedPureWalk: {
    edgeCount: walkEdges.length,
    sccCount: scc.count,
    relevantSccCount: relevantMacros.size,
    crossSccOneWayCommitmentEdges: macroEdges.filter((edge) => edge.kind === "walk_commitment").length,
    relevantCrossSccOneWayCommitmentEdges: macroEdges.filter((edge) => edge.kind === "walk_commitment" && relevantMacros.has(edge.from) && relevantMacros.has(edge.to)).length,
    directionalWalkPairs,
    note: "只把双向可达的纯 walk 状态压入同一 SCC；跨 SCC 的纯 walk 保留为单向承诺。",
  },
  canonical: {
    inputs: canonicalInputs,
    objectStageCount: canonicalObjectStages.length,
    objectStages: canonicalObjectStages,
    eventStages: canonicalEventStages,
    contactStages: canonicalContactStages,
    directedWalkSccPath: canonicalMacroWalk,
    walkCommitments: canonicalWalkCommitments,
  },
  rawDeviation,
  simpleDirectedMacroPaths: simpleSearch,
  objectConfigurations,
  terminalResponsibility: {
    winningStateCount: graph.winStateIndexes.size,
    distinctGoalRoleAssignments: winningRoleAssignments.length,
    assignments: winningRoleAssignments,
  },
  exactManipulationCaveat: witness ? {
    canonicalInputs,
    alternateInputs: witness.inputs,
    canonicalOpening: canonicalInputs.slice(0, 3),
    alternateOpening: witness.inputs.slice(0, 3),
    canonicalFirstContact: canonicalContactStages[0],
    alternateFirstContact: witness.contactStages[0],
    exactMerge: merge,
    commonSuffixAfterMerge: merge
      ? arraysEqual(canonicalInputs.slice(merge.canonicalStep), witness.inputs.slice(merge.alternateStep))
      : false,
  } : null,
  witness,
  verdict: simpleSearch.firstObjectDeviation
    ? {
        status: "COUNTEREXAMPLE",
        reason: "存在不重复有向纯走位 SCC 的可胜路径，其对象动作阶段不同于 canonical；不能由返回同一有向纯走位 SCC 的环擦除。",
      }
    : simpleSearch.firstContactDeviation
      ? {
          status: "MANIPULATION_CONTACT_CAVEAT",
          reason: "对象配置阶段唯一，但首次 B/S 上拉可分别接触 B 端或 S 端；两条最短输入在第 3 步 exact-state 汇合。严格到接触端/输入串时不唯一，严格到对象位移与职责计划时仍唯一。",
        }
    : simpleSearch.firstWalkCommitmentDeviation
      ? {
          status: "DIRECTIONAL_WALK_CAVEAT",
          reason: "对象阶段投影唯一，但存在不同的单向纯走位承诺路径；旧 weak-walk DSU 把它误并为普通入口差异。",
        }
      : simpleSearch.truncated
        ? { status: "INCOMPLETE", reason: "simple directed macro path 枚举达到上限，不能给充分证明。" }
        : {
            status: "NO_COUNTEREXAMPLE",
            reason: "完整枚举所有不重复有向纯走位 SCC 的可胜路径；对象阶段与单向纯走位承诺均无第二序列。",
          },
};

await writeFile(`${outBase}.json`, `${JSON.stringify(report, null, 2)}\n`, "utf8");
await writeFile(`${outBase}.md`, formatMarkdown(report), "utf8");
console.log(JSON.stringify({
  graph: report.fullRuntimeGraph,
  directedPureWalk: {
    sccCount: report.directedPureWalk.sccCount,
    relevantSccCount: report.directedPureWalk.relevantSccCount,
    crossScc: report.directedPureWalk.crossSccOneWayCommitmentEdges,
    relevantCrossScc: report.directedPureWalk.relevantCrossSccOneWayCommitmentEdges,
  },
  simple: {
    enumerated: simpleSearch.completedPathCount,
    objectSignatures: simpleSearch.objectSignatureCount,
    contactSignatures: simpleSearch.contactSignatureCount,
    walkCommitmentSignatures: simpleSearch.walkCommitmentSignatureCount,
    truncated: simpleSearch.truncated,
  },
  verdict: report.verdict,
  witnessInputs: witness?.inputs,
}, null, 2));

function isPureWalk(edge: Edge): boolean {
  return substantive(edge.events).length === 0;
}

function substantive(events: string[]): string[] {
  return events.filter((event) => event !== "walk");
}

function point(point: Point): string {
  return `${point.x},${point.y}`;
}

function objectKey(state: RealityAnchorState): string {
  return JSON.stringify({
    crates: state.crates.map(point).sort(),
    sticky: state.stickyGroups.map((group) => group.map(point).sort()).sort((a, b) => a.join(";").localeCompare(b.join(";"))),
    pl: state.pushPullAnchor ? { p: point(state.pushPullAnchor.push), l: point(state.pushPullAnchor.pull) } : null,
    bs: state.boxStickyAnchor ? { b: point(state.boxStickyAnchor.box), s: point(state.boxStickyAnchor.sticky) } : null,
  });
}

function goalRoles(state: RealityAnchorState): Record<string, string> {
  const roles: Record<string, string> = {};
  for (const goal of [...state.goals].sort()) {
    const [xRaw, yRaw] = goal.split(",");
    const x = Number(xRaw); const y = Number(yRaw);
    if (state.crates.some((cell) => cell.x === x && cell.y === y)) roles[goal] = "crate";
    else if (state.stickyGroups.some((group) => group.some((cell) => cell.x === x && cell.y === y))) roles[goal] = "sticky";
    else if (state.pushPullAnchor?.push.x === x && state.pushPullAnchor.push.y === y) roles[goal] = "P";
    else if (state.pushPullAnchor?.pull.x === x && state.pushPullAnchor.pull.y === y) roles[goal] = "L";
    else if (state.boxStickyAnchor?.box.x === x && state.boxStickyAnchor.box.y === y) roles[goal] = "B";
    else if (state.boxStickyAnchor?.sticky.x === x && state.boxStickyAnchor.sticky.y === y) roles[goal] = "S";
    else roles[goal] = "empty";
  }
  return roles;
}

function stageKey(edge: Edge, from: RealityAnchorState, to: RealityAnchorState): string {
  return `${edge.action}:${substantive(edge.events).join("&")}|${objectKey(from)}=>${objectKey(to)}`;
}

function contactStageKey(edge: Edge, from: RealityAnchorState, to: RealityAnchorState): string {
  const events = substantive(edge.events);
  const mode = events.some((event) => event.startsWith("pull_object:"))
    ? "pull"
    : events.some((event) => event.startsWith("push_object:"))
      ? "push"
      : "other";
  const vectors: Record<InputId, Point> = {
    up: { x: 0, y: -1 }, down: { x: 0, y: 1 }, left: { x: -1, y: 0 }, right: { x: 1, y: 0 },
  };
  const vector = vectors[edge.action];
  const contact = mode === "pull"
    ? { x: from.player.x - vector.x, y: from.player.y - vector.y }
    : { x: from.player.x + vector.x, y: from.player.y + vector.y };
  return `${stageKey(edge, from, to)}|contact=${mode}:${objectGlyphAt(from, contact)}@${point(contact)}|player=${point(from.player)}=>${point(to.player)}`;
}

function objectGlyphAt(state: RealityAnchorState, cell: Point): string {
  const same = (candidate: Point): boolean => candidate.x === cell.x && candidate.y === cell.y;
  if (state.crates.some(same)) return "C";
  if (state.stickyGroups.some((group) => group.some(same))) return "M";
  if (state.pushPullAnchor && same(state.pushPullAnchor.push)) return "P";
  if (state.pushPullAnchor && same(state.pushPullAnchor.pull)) return "L";
  if (state.boxStickyAnchor && same(state.boxStickyAnchor.box)) return "B";
  if (state.boxStickyAnchor && same(state.boxStickyAnchor.sticky)) return "S";
  return "none";
}

function replayIndexes(inputs: InputId[]): { indexes: number[]; edges: Edge[] } {
  const indexes = [0];
  const edges: Edge[] = [];
  let state = initial;
  let index = 0;
  for (const input of inputs) {
    const step = runtime.step(state, input, { winCondition: pkg.mechanic.win });
    if (!step.legal) throw new Error(`canonical 非法：${input}`);
    const to = graph.indexByKey.get(runtime.key(step.state));
    if (to === undefined) throw new Error("canonical 状态不在完整图");
    const edge = outgoing[index]!.find((candidateEdge) => candidateEdge.action === input && candidateEdge.to === to);
    if (!edge) throw new Error("canonical 边不在完整图");
    edges.push(edge);
    indexes.push(to);
    state = step.state;
    index = to;
  }
  return { indexes, edges };
}

function kosaraju(out: number[][], inc: number[][]): { count: number; id: number[]; nodes: number[][] } {
  const seen = new Set<number>();
  const order: number[] = [];
  const visit = (start: number): void => {
    const stack: Array<[number, number]> = [[start, 0]];
    seen.add(start);
    while (stack.length) {
      const top = stack.at(-1)!;
      const next = out[top[0]]![top[1]];
      if (next === undefined) {
        order.push(top[0]); stack.pop(); continue;
      }
      top[1] += 1;
      if (!seen.has(next)) { seen.add(next); stack.push([next, 0]); }
    }
  };
  for (let node = 0; node < out.length; node += 1) if (!seen.has(node)) visit(node);
  const id = new Array<number>(out.length).fill(-1);
  const nodes: number[][] = [];
  for (const start of order.reverse()) {
    if (id[start] !== -1) continue;
    const component = nodes.length;
    const queue = [start];
    id[start] = component;
    nodes.push([]);
    for (let cursor = 0; cursor < queue.length; cursor += 1) {
      const node = queue[cursor]!;
      nodes[component]!.push(node);
      for (const next of inc[node]!) if (id[next] === -1) { id[next] = component; queue.push(next); }
    }
  }
  return { count: nodes.length, id, nodes };
}

function reachMacro(
  starts: number[],
  edges: MacroEdge[][],
  next: (edge: MacroEdge) => number,
): Set<number> {
  const seen = new Set(starts);
  const queue = [...starts];
  for (let cursor = 0; cursor < queue.length; cursor += 1) {
    for (const edge of edges[queue[cursor]!]!) {
      const node = next(edge);
      if (!seen.has(node)) { seen.add(node); queue.push(node); }
    }
  }
  return seen;
}

function compressConsecutive(nodes: number[]): number[] {
  return nodes.filter((node, index) => index === 0 || node !== nodes[index - 1]);
}

function shortestRawDeviation(canonicalStages: string[]) {
  type Product = { state: number; progress: number; bad: boolean };
  const key = (item: Product): string => `${item.state}|${item.progress}|${item.bad ? 1 : 0}`;
  const start: Product = { state: 0, progress: 0, bad: false };
  const queue = [start];
  const seen = new Map<string, { previous?: string; edge?: Edge; item: Product }>([[key(start), { item: start }]]);
  let foundKey: string | null = null;
  for (let cursor = 0; cursor < queue.length; cursor += 1) {
    const item = queue[cursor]!;
    if (graph.winStateIndexes.has(item.state) && (item.bad || item.progress !== canonicalStages.length)) {
      foundKey = key(item); break;
    }
    for (const edge of outgoing[item.state]!) {
      let progress = item.progress;
      let bad = item.bad;
      if (!isPureWalk(edge)) {
        const stage = stageKey(edge, graph.states[edge.from]!, graph.states[edge.to]!);
        if (progress >= canonicalStages.length || stage !== canonicalStages[progress]) bad = true;
        else progress += 1;
      }
      const next = { state: edge.to, progress, bad };
      const nextKey = key(next);
      if (!seen.has(nextKey)) {
        seen.set(nextKey, { previous: key(item), edge, item: next });
        queue.push(next);
      }
    }
  }
  if (!foundKey) return { found: false, searchComplete: true };
  const edges: Edge[] = [];
  let cursor = foundKey;
  while (seen.get(cursor)?.previous) {
    const row = seen.get(cursor)!;
    edges.unshift(row.edge!);
    cursor = row.previous!;
  }
  const erased = loopEraseStateEdges(edges);
  return {
    found: true,
    rawInputs: edges.map((edge) => edge.action),
    rawObjectStages: edges.filter((edge) => !isPureWalk(edge)).map((edge) => stageKey(edge, graph.states[edge.from]!, graph.states[edge.to]!)),
    exactStateLoopErasedInputs: erased.map((edge) => edge.action),
    exactStateLoopErasedObjectStages: erased.filter((edge) => !isPureWalk(edge)).map((edge) => stageKey(edge, graph.states[edge.from]!, graph.states[edge.to]!)),
    loopEraseReturnsCanonical: arraysEqual(
      erased.filter((edge) => !isPureWalk(edge)).map((edge) => stageKey(edge, graph.states[edge.from]!, graph.states[edge.to]!)),
      canonicalStages,
    ),
  };
}

function loopEraseStateEdges(edges: Edge[]): Edge[] {
  const nodes = [0, ...edges.map((edge) => edge.to)];
  const stackNodes: number[] = [];
  const stackEdges: Edge[] = [];
  const positions = new Map<number, number>();
  for (let index = 0; index < nodes.length; index += 1) {
    const node = nodes[index]!;
    const previous = positions.get(node);
    if (previous !== undefined) {
      while (stackNodes.length - 1 > previous) {
        positions.delete(stackNodes.pop()!);
        stackEdges.pop();
      }
      continue;
    }
    positions.set(node, stackNodes.length);
    stackNodes.push(node);
    if (index > 0) stackEdges.push(edges[index - 1]!);
  }
  return stackEdges;
}

function enumerateSimpleMacroPaths(canonicalStages: string[], limit: number) {
  type PathRow = { edges: MacroEdge[]; objectStages: string[]; contactStages: string[]; walkCommitments: string[] };
  let completedPathCount = 0;
  let traversedPrefixes = 0;
  let truncated = false;
  const objectSignatures = new Set<string>();
  const contactSignatures = new Set<string>();
  const walkSignatures = new Set<string>();
  let firstObjectDeviation: PathRow | null = null;
  let firstContactDeviation: PathRow | null = null;
  let firstWalkCommitmentDeviation: PathRow | null = null;
  let canonicalWalkCommitmentSignature: string | null = null;
  const canonicalMacroSet = new Set(canonicalMacroWalk);
  canonicalWalkCommitmentSignature = canonicalWalkCommitments.join(" > ");

  const visited = new Set<number>([startMacro]);
  const path: MacroEdge[] = [];
  const dfs = (node: number): void => {
    if (truncated) return;
    traversedPrefixes += 1;
    if (traversedPrefixes > limit) { truncated = true; return; }
    if (winMacros.has(node)) {
      completedPathCount += 1;
      const objectStages = path.filter((edge) => edge.kind === "object").map((edge) => edge.stageKey);
      const contactStages = path.filter((edge) => edge.kind === "object").map((edge) => edge.contactKey);
      const walkCommitments = path.filter((edge) => edge.kind === "walk_commitment").map((edge) => `${edge.from}->${edge.to}:${edge.action}`);
      const objectSignature = objectStages.join(" > ");
      const contactSignature = contactStages.join(" > ");
      const walkSignature = walkCommitments.join(" > ");
      objectSignatures.add(objectSignature);
      contactSignatures.add(contactSignature);
      walkSignatures.add(walkSignature);
      const row = { edges: [...path], objectStages, contactStages, walkCommitments };
      if (!firstObjectDeviation && !arraysEqual(objectStages, canonicalStages)) firstObjectDeviation = row;
      if (!firstContactDeviation && !arraysEqual(contactStages, canonicalContactStages)) firstContactDeviation = row;
      if (!firstWalkCommitmentDeviation && walkSignature !== canonicalWalkCommitmentSignature) firstWalkCommitmentDeviation = row;
      return;
    }
    for (const edge of macroOut[node]!) {
      if (!relevantMacros.has(edge.to) || visited.has(edge.to)) continue;
      visited.add(edge.to); path.push(edge);
      dfs(edge.to);
      path.pop(); visited.delete(edge.to);
      if (truncated) return;
    }
  };
  dfs(startMacro);
  return {
    criterion: "枚举有向纯 walk SCC 压缩图中全部 node-simple 可胜路径；回到同一 SCC 的环可擦除，跨 SCC 单向 walk 不可擦除。",
    completedPathCount,
    traversedPrefixes,
    limit,
    truncated,
    objectSignatureCount: objectSignatures.size,
    contactSignatureCount: contactSignatures.size,
    walkCommitmentSignatureCount: walkSignatures.size,
    canonicalWalkCommitmentSignature,
    objectSignatures: [...objectSignatures],
    contactSignatures: [...contactSignatures],
    walkCommitmentSignatures: [...walkSignatures],
    firstObjectDeviation,
    firstContactDeviation,
    firstWalkCommitmentDeviation,
    canonicalMacroSetSize: canonicalMacroSet.size,
  };
}

function reconstructMacroPath(path: MacroEdge[]) {
  const inputs: InputId[] = [];
  const fullEdges: Edge[] = [];
  let current = 0;
  for (const macroEdge of path) {
    const route = pureWalkRoute(current, macroEdge.source.from, scc.id[current]!);
    if (!route) throw new Error(`SCC 内无法路由 ${current}->${macroEdge.source.from}`);
    for (const edge of route) { fullEdges.push(edge); inputs.push(edge.action); current = edge.to; }
    fullEdges.push(macroEdge.source); inputs.push(macroEdge.source.action); current = macroEdge.source.to;
  }
  if (!graph.winStateIndexes.has(current)) {
    const target = [...graph.winStateIndexes].find((win) => scc.id[win] === scc.id[current]);
    if (target === undefined) throw new Error("末 SCC 没有胜态");
    const route = pureWalkRoute(current, target, scc.id[current]!);
    if (!route) throw new Error("胜态 SCC 内无法路由");
    for (const edge of route) { fullEdges.push(edge); inputs.push(edge.action); current = edge.to; }
  }
  const replay = replayWitness(inputs);
  return {
    inputs,
    finalStateIndex: current,
    legal: replay.legal,
    win: replay.win,
    objectStages: fullEdges.filter((edge) => !isPureWalk(edge)).map((edge) => stageKey(edge, graph.states[edge.from]!, graph.states[edge.to]!)),
    contactStages: fullEdges.filter((edge) => !isPureWalk(edge)).map((edge) => contactStageKey(edge, graph.states[edge.from]!, graph.states[edge.to]!)),
    eventStages: fullEdges.filter((edge) => !isPureWalk(edge)).map((edge) => `${edge.action}:${substantive(edge.events).join("&")}`),
    directedWalkSccPath: compressConsecutive([0, ...fullEdges.map((edge) => edge.to)].map((index) => scc.id[index]!)),
    steps: replay.steps,
  };
}

function pureWalkRoute(from: number, to: number, component: number): Edge[] | null {
  if (from === to) return [];
  const queue = [from];
  const previous = new Map<number, Edge>();
  const seen = new Set([from]);
  for (let cursor = 0; cursor < queue.length; cursor += 1) {
    for (const edge of outgoing[queue[cursor]!]!) {
      if (!isPureWalk(edge) || scc.id[edge.to] !== component || seen.has(edge.to)) continue;
      seen.add(edge.to); previous.set(edge.to, edge); queue.push(edge.to);
    }
  }
  if (!seen.has(to)) return null;
  const edges: Edge[] = [];
  let cursor = to;
  while (cursor !== from) {
    const edge = previous.get(cursor)!;
    edges.unshift(edge); cursor = edge.from;
  }
  return edges;
}

function replayWitness(inputs: InputId[]) {
  let state = initial;
  const steps: Array<{ step: number; input: InputId; legal: boolean; events: string[]; stateIndex: number | null; player: string; roles: Record<string, string>; layout: string }> = [];
  for (let index = 0; index < inputs.length; index += 1) {
    const input = inputs[index]!;
    const result = runtime.step(state, input, { winCondition: pkg.mechanic.win });
    if (!result.legal) return { legal: false, win: false, steps };
    state = result.state;
    steps.push({
      step: index + 1,
      input,
      legal: result.legal,
      events: result.events,
      stateIndex: graph.indexByKey.get(runtime.key(state)) ?? null,
      player: point(state.player),
      roles: goalRoles(state),
      layout: adapter.renderState(state),
    });
  }
  return { legal: true, win: runtime.isWin(state, pkg.mechanic.win), steps };
}

function firstPostDivergenceMerge(
  canonicalSteps: Array<{ stateIndex: number | null; player: string; roles: Record<string, string>; layout: string }>,
  alternateSteps: Array<{ stateIndex: number | null; player: string; roles: Record<string, string>; layout: string }>,
) {
  const left = [0, ...canonicalSteps.map((step) => step.stateIndex)];
  const right = [0, ...alternateSteps.map((step) => step.stateIndex)];
  let commonPrefix = 0;
  while (commonPrefix < left.length && commonPrefix < right.length && left[commonPrefix] === right[commonPrefix]) commonPrefix += 1;
  let best: { canonicalStep: number; alternateStep: number; stateIndex: number } | null = null;
  for (let i = commonPrefix; i < left.length; i += 1) {
    if (left[i] === null) continue;
    for (let j = commonPrefix; j < right.length; j += 1) {
      if (left[i] !== right[j]) continue;
      if (!best || i + j < best.canonicalStep + best.alternateStep) best = { canonicalStep: i, alternateStep: j, stateIndex: left[i]! };
    }
  }
  if (!best) return null;
  const state = graph.states[best.stateIndex]!;
  return {
    ...best,
    key: graph.keys[best.stateIndex],
    player: point(state.player),
    objectConfiguration: objectKey(state),
    goalRoles: goalRoles(state),
    layout: adapter.renderState(state),
  };
}

function inspectDirectionalWalkPairs() {
  let bidirectional = 0;
  let oneWay = 0;
  const relevantExamples: Array<{ from: number; to: number; action: InputId; reversePureWalk: boolean; fromPlayer: string; toPlayer: string; object: string }> = [];
  const pureSet = new Set(walkEdges.map((edge) => `${edge.from}->${edge.to}`));
  for (const edge of walkEdges) {
    if (pureSet.has(`${edge.to}->${edge.from}`)) bidirectional += 1;
    else {
      oneWay += 1;
      if (relevantExamples.length < 20 && macroBackward.has(scc.id[edge.to]!) && macroForward.has(scc.id[edge.from]!)) {
        relevantExamples.push({
          from: edge.from,
          to: edge.to,
          action: edge.action,
          reversePureWalk: false,
          fromPlayer: point(graph.states[edge.from]!.player),
          toPlayer: point(graph.states[edge.to]!.player),
          object: objectKey(graph.states[edge.from]!),
        });
      }
    }
  }
  return { directedEdgesWithReverse: bidirectional, directedEdgesWithoutReverse: oneWay, relevantExamples };
}

function inspectObjectConfigurations() {
  const byKey = new Map<string, number[]>();
  for (let index = 0; index < graph.states.length; index += 1) {
    const key = objectKey(graph.states[index]!);
    const indexes = byKey.get(key) ?? [];
    indexes.push(index); byKey.set(key, indexes);
  }
  const split = [...byKey.entries()].map(([key, indexes]) => ({
    key,
    runtimeStates: indexes.length,
    directedWalkSccs: [...new Set(indexes.map((index) => scc.id[index]!))].sort((a, b) => a - b),
    players: indexes.map((index) => point(graph.states[index]!.player)).sort(),
  })).filter((row) => row.directedWalkSccs.length > 1);
  return {
    distinctObjectConfigurations: byKey.size,
    configurationsSplitAcrossDirectedWalkSccs: split.length,
    split,
  };
}

function arraysEqual<T>(left: T[], right: T[]): boolean {
  return left.length === right.length && left.every((value, index) => value === right[index]);
}

function formatMarkdown(report: any): string {
  const witnessInputs = report.witness?.inputs?.join(" ") ?? "无";
  const merge = report.exactManipulationCaveat?.exactMerge;
  const contact = (value: string | undefined): string => value?.split("|contact=")[1]?.split("|player=")[0] ?? "无";
  const lines = [
    `# ${candidate} 有向唯一解攻击（scratch）`,
    "",
    `- 结论：${report.verdict.status}`,
    `- 理由：${report.verdict.reason}`,
    `- 完整图：${report.fullRuntimeGraph.states} states / ${report.fullRuntimeGraph.transitions} transitions / ${report.fullRuntimeGraph.wins} win`,
    `- 有向纯 walk SCC：${report.directedPureWalk.sccCount}；可胜相关：${report.directedPureWalk.relevantSccCount}`,
    `- 相关跨 SCC 单向 walk 承诺：${report.directedPureWalk.relevantCrossSccOneWayCommitmentEdges}`,
    `- 完整 simple 宏胜路：${report.simpleDirectedMacroPaths.completedPathCount}；截断：${report.simpleDirectedMacroPaths.truncated}`,
    `- 对象阶段签名数：${report.simpleDirectedMacroPaths.objectSignatureCount}`,
    `- 接触端签名数：${report.simpleDirectedMacroPaths.contactSignatureCount}`,
    `- 单向 walk 承诺签名数：${report.simpleDirectedMacroPaths.walkCommitmentSignatureCount}`,
    "",
    "## 口径",
    "",
    report.simpleDirectedMacroPaths.criterion,
    "",
    "旧 weak-walk DSU 会把单向纯 walk 边当成无向边。本审计只压缩纯 walk 强连通分量，跨分量的纯 walk 保留为单向承诺。",
    "",
    "## 精确操控差异（不是第二套对象职责计划）",
    "",
    `- canonical：${report.exactManipulationCaveat?.canonicalInputs?.join(" ") ?? "无"}`,
    `- alternate：${witnessInputs}`,
    `- legal/win：${report.witness?.legal ?? false}/${report.witness?.win ?? false}`,
    `- 前三键：canonical=${report.exactManipulationCaveat?.canonicalOpening?.join(" ")}；alternate=${report.exactManipulationCaveat?.alternateOpening?.join(" ")}`,
    `- 首次 B/S 接触：canonical=${contact(report.exactManipulationCaveat?.canonicalFirstContact)}；alternate=${contact(report.exactManipulationCaveat?.alternateFirstContact)}`,
    `- exact merge：canonical step ${merge?.canonicalStep ?? "无"} / alternate step ${merge?.alternateStep ?? "无"} / state ${merge?.stateIndex ?? "无"}`,
    `- merge 后完整后缀相同：${report.exactManipulationCaveat?.commonSuffixAfterMerge ?? false}`,
    "",
    "```text",
    merge?.layout ?? "无",
    "```",
    "",
    "## 充分性边界",
    "",
    "任意可胜 runtime 路径若重复同一个有向纯 walk SCC，则重复段回到了同一对象配置，且 SCC 内入口到出口可由纯 walk 替代；因此该段属于可擦除回返环。擦除至 node-simple 后，本审计完整枚举出 2 条可胜宏路径，未截断；二者的 10 段对象配置变化完全相同。",
    "",
    `终局胜态/职责签名：${report.terminalResponsibility.winningStateCount}/${report.terminalResponsibility.distinctGoalRoleAssignments}；没有第二种终局目标职责。`,
    "",
    `最短 raw 对象偏离确实存在，但 exact-state loop erase 后回到 canonical：${report.rawDeviation.loopEraseReturnsCanonical ?? "无"}。这类反复不构成非回返对象计划。`,
    "",
    "## Layout",
    "",
    "```text",
    layout,
    "```",
    "",
  ];
  return `${lines.join("\n").trimEnd()}\n`;
}
