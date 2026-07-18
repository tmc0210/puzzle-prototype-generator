import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import { loadPrototypePackage } from "../../../../../../src/core/io.js";
import { enumerateRuntimeGraph } from "../../../../../../src/core/runtimeGraph.js";
import type { LevelDoc } from "../../../../../../src/core/types.js";
import { getRuntimeAdapter } from "../../../../../../src/prototypes/runtimeAdapter.js";

const repoRoot = path.resolve(import.meta.dirname, "../../../../../..");
const prototypeRoot = path.join(repoRoot, "prototypes", "reality_anchor");
const candidateId = "RA_BASELINE_STICKY_IRREGULAR_BOUNDARY";
const exactVersion = "v2";
const layoutPath = path.join(
  repoRoot,
  "prototypes", "reality_anchor", "reports",
  "design_tree_sticky_irregular_boundary_20260718", "scratch", "baseline_v2.txt",
);

const pkg = await loadPrototypePackage(prototypeRoot);
const adapter = getRuntimeAdapter(pkg.mechanic);
const runtime = adapter.createRuntime(pkg.mechanic);
const layout = await readFile(layoutPath, "utf8");
const layoutSha256 = createHash("sha256").update(layout).digest("hex");
const level: LevelDoc = { id: `${candidateId}_${exactVersion}`, title: `${candidateId}_${exactVersion}`, layout, win: pkg.mechanic.win };
const initial = adapter.parseLevel(level);
const winCondition = level.win ?? pkg.mechanic.win;
const graph = enumerateRuntimeGraph(runtime, initial, winCondition, { winCondition }, { maxStates: 200_000, terminalizeWins: true });

const incoming = new Map<number, typeof graph.edges>();
for (const edge of graph.edges) {
  const bucket = incoming.get(edge.to) ?? [];
  bucket.push(edge);
  incoming.set(edge.to, bucket);
}
const parentEdge = new Map<number, (typeof graph.edges)[number]>();
for (const edge of graph.edges) {
  if (graph.depthByIndex[edge.to] === graph.depthByIndex[edge.from]! + 1 && !parentEdge.has(edge.to)) {
    parentEdge.set(edge.to, edge);
  }
}
function shortestInputs(index: number): string[] {
  const reversed: string[] = [];
  let cursor = index;
  while (cursor !== 0) {
    const edge = parentEdge.get(cursor);
    if (!edge) throw new Error(`No shortest-path parent for state ${cursor}`);
    reversed.push(edge.action);
    cursor = edge.from;
  }
  return reversed.reverse();
}
function withoutPlayer(key: string): string {
  return key.replace(/^Ply:[^|]+\|/, "");
}
function compactRender(state: (typeof graph.states)[number]): string {
  return adapter.renderState(state).trimEnd();
}

const winIndexes = [...graph.winStateIndexes].sort((a, b) => a - b);
const winRecords = winIndexes.map((index) => {
  const winIncoming = (incoming.get(index) ?? []).filter((edge) => !graph.winStateIndexes.has(edge.from));
  return {
    stateIndex: index,
    depth: graph.depthByIndex[index],
    key: graph.keys[index],
    objectKey: withoutPlayer(graph.keys[index]!),
    render: compactRender(graph.states[index]!),
    shortestInputs: shortestInputs(index),
    incomingFromNonWin: winIncoming.map((edge) => ({
      fromStateIndex: edge.from,
      fromDepth: graph.depthByIndex[edge.from],
      action: edge.action,
      events: edge.events,
      beforeKey: graph.keys[edge.from],
      beforeObjectKey: withoutPlayer(graph.keys[edge.from]!),
      beforeRender: compactRender(graph.states[edge.from]!),
    })),
  };
});

const finalTransitionClasses = new Map<string, number>();
for (const record of winRecords) {
  for (const edge of record.incomingFromNonWin) {
    const signature = JSON.stringify({ action: edge.action, events: edge.events, beforeObjectKey: edge.beforeObjectKey, afterObjectKey: record.objectKey });
    finalTransitionClasses.set(signature, (finalTransitionClasses.get(signature) ?? 0) + 1);
  }
}
const objectStateClasses = [...new Set(winRecords.map((record) => record.objectKey))];
const allWinningEdges = winRecords.flatMap((record) => record.incomingFromNonWin);
const invariants = {
  everyWinningEdgeSameAction: [...new Set(allWinningEdges.map((e) => e.action))],
  everyWinningEdgeEvents: [...new Set(allWinningEdges.map((e) => e.events.join("|")))],
  winningDepths: [...new Set(winRecords.map((r) => r.depth))],
};
const report = {
  candidateId, exactVersion,
  layoutPath: path.relative(repoRoot, layoutPath).replaceAll("\\", "/"),
  layoutSha256,
  graph: { status: graph.status, reason: graph.reason, reachableStates: graph.keys.length, transitions: graph.edges.length, winningStates: winIndexes.length, terminalizeWins: true, maxStates: 200_000 },
  equivalenceSummary: {
    rawWinningStates: winRecords.length,
    winningObjectStateClasses: objectStateClasses.length,
    finalTransitionClassesIncludingObjectStates: finalTransitionClasses.size,
    allWinningIncomingEdges: allWinningEdges.length,
    invariants,
  },
  winRecords,
};
const lines: string[] = [
  `# Baseline 解族唯一性展开：${candidateId}_${exactVersion}`, "",
  `- 布局 SHA256：${layoutSha256}`,
  `- 状态图状态：${graph.status}`,
  `- 可达状态：${graph.keys.length}`,
  `- 合法转移：${graph.edges.length}`,
  `- 原始胜态：${winRecords.length}`,
  `- 去除玩家坐标后的胜利对象态类：${objectStateClasses.length}`,
  `- 终局转移类：${finalTransitionClasses.size}`,
  `- 非胜态进入胜态的边：${allWinningEdges.length}`,
  `- 胜利深度集合：${invariants.winningDepths.join(",")}`,
  "",
];
for (const record of winRecords) {
  lines.push(`## 胜态 ${record.stateIndex}`, "",
    `- BFS 深度：${record.depth}`,
    `- 最短输入：${record.shortestInputs.join(" ")}`,
    `- 来自非胜态的入边：${record.incomingFromNonWin.length}`,
    `- 玩家坐标：${record.key?.match(/^Ply:([^|]+)/)?.[1] ?? "未知"}`, "",
    "```text", record.render, "```", "");
  record.incomingFromNonWin.forEach((edge, i) => {
    lines.push(`### 入边 ${i + 1}`, "",
      `- 来源状态：${edge.fromStateIndex}（深度 ${edge.fromDepth}）`,
      `- 输入：${edge.action}`,
      `- 事件：${edge.events.join(", ")}`, "");
  });
}
await mkdir(import.meta.dirname, { recursive: true });
await writeFile(path.join(import.meta.dirname, "results.json"), `${JSON.stringify(report, null, 2)}\n`, "utf8");
await writeFile(path.join(import.meta.dirname, "report.md"), `${lines.join("\n")}\n`, "utf8");
console.log(JSON.stringify({ layoutSha256, graph: report.graph, equivalenceSummary: report.equivalenceSummary }, null, 2));
