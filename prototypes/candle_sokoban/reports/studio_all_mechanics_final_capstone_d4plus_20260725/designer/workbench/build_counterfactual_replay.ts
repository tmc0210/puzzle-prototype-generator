import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { loadPrototypePackage } from "../../../../../../src/core/io.js";
import type { LevelDoc } from "../../../../../../src/core/types.js";
import { getRuntimeAdapter } from "../../../../../../src/prototypes/runtimeAdapter.js";
import {
  buildInputSequenceReplayReport,
  formatInputSequenceReplayMarkdown,
  replayInputSequence,
} from "../../../../../../src/workflows/inputSequenceReplay.js";

type GraphNode = {
  index: number;
  depth: number;
  winning: boolean;
};

type GraphEdge = {
  index: number;
  from: number;
  to: number;
  action: string;
};

type RawGraphArtifact = {
  level: { layout_sha256: string };
  graph: {
    status: string;
    budget: {
      max_states: number;
      max_transitions: number;
      terminalize_wins: boolean;
    };
  };
  raw_graph: {
    nodes: GraphNode[];
    edges: GraphEdge[];
  };
};

const layoutPath = path.resolve(requireArg(2, "layout path"));
const graphPath = path.resolve(requireArg(3, "raw graph path"));
const outputDir = path.resolve(requireArg(4, "output directory"));
const id = requireArg(5, "replay id");

const graph = JSON.parse(await readFile(graphPath, "utf8")) as RawGraphArtifact;
if (graph.graph.status !== "complete") {
  throw new Error(`反事实图未完整收敛：${graph.graph.status}`);
}

const nodesByIndex = new Map(graph.raw_graph.nodes.map((node) => [node.index, node]));
const winningNode = graph.raw_graph.nodes
  .filter((node) => node.winning)
  .sort((a, b) => a.depth - b.depth || a.index - b.index)[0];
if (!winningNode) throw new Error("反事实完整图没有胜局节点。");

const predecessor = new Map<number, GraphEdge>();
for (const edge of graph.raw_graph.edges) {
  const from = nodesByIndex.get(edge.from);
  const to = nodesByIndex.get(edge.to);
  if (!from || !to) throw new Error(`边 ${edge.index} 引用了不存在的节点。`);
  if (to.depth === from.depth + 1 && !predecessor.has(to.index)) {
    predecessor.set(to.index, edge);
  }
}

const reversePath: GraphEdge[] = [];
let cursor = winningNode.index;
while (cursor !== 0) {
  const edge = predecessor.get(cursor);
  if (!edge) throw new Error(`无法回溯胜局节点 ${cursor} 的最短前驱。`);
  reversePath.push(edge);
  cursor = edge.from;
}
const pathEdges = reversePath.reverse();
const inputs = pathEdges.map((edge) => edge.action);
if (inputs.length !== winningNode.depth) {
  throw new Error(`最短路径长度 ${inputs.length} 与节点深度 ${winningNode.depth} 不一致。`);
}

const pkg = await loadPrototypePackage(path.resolve("prototypes/candle_sokoban"));
const layout = (await readFile(layoutPath, "utf8")).replace(/\r/g, "").trimEnd();
const level: LevelDoc = {
  id,
  title: id,
  global_burn_cycle: 5,
  layout,
};
const adapter = getRuntimeAdapter(pkg.mechanic);
const runtime = adapter.createRuntime(pkg.mechanic);
const initial = adapter.parseLevel(level);
const winCondition = level.win ?? pkg.mechanic.win;
const execution = replayInputSequence(
  adapter,
  runtime,
  initial,
  inputs,
  { winCondition },
  winCondition,
);
if (execution.stoppedAtIllegalAction || execution.legalThroughStep !== inputs.length) {
  throw new Error(`反事实回放未完整合法：legalThrough=${execution.legalThroughStep}`);
}
if (!runtime.isWin(execution.finalState, winCondition)) {
  throw new Error("反事实回放结束后未满足 all_braziers_lit。");
}

const report = buildInputSequenceReplayReport(
  {
    id,
    prototype: pkg.mechanic.id,
    layoutSource: layoutPath,
    layout,
    winCondition,
  },
  execution,
);
await mkdir(outputDir, { recursive: true });
await writeFile(path.join(outputDir, "canonical_replay.json"), `${JSON.stringify(report, null, 2)}\n`, "utf8");
await writeFile(path.join(outputDir, "canonical_replay.md"), formatInputSequenceReplayMarkdown(report), "utf8");
await writeFile(
  path.join(outputDir, "shortest_win_path.json"),
  `${JSON.stringify({
    schema_version: 1,
    source_graph: graphPath,
    source_layout_sha256: graph.level.layout_sha256,
    graph_budget: graph.graph.budget,
    winning_node_index: winningNode.index,
    shortest_depth: winningNode.depth,
    edge_indices: pathEdges.map((edge) => edge.index),
    inputs,
  }, null, 2)}\n`,
  "utf8",
);
process.stdout.write(
  `counterfactual_replay id=${id} steps=${inputs.length} legal=${execution.legalThroughStep} win=${report.final.isWin} out=${outputDir}\n`,
);

function requireArg(index: number, label: string): string {
  const value = process.argv[index];
  if (!value) throw new Error(`缺少 ${label}`);
  return value;
}
