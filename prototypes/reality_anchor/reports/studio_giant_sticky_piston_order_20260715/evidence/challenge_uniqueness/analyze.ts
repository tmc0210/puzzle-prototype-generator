import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import { loadPrototypePackage } from "../../../../../../src/core/io.js";
import { enumerateRuntimeGraph } from "../../../../../../src/core/runtimeGraph.js";
import type { LevelDoc } from "../../../../../../src/core/types.js";
import { getRuntimeAdapter } from "../../../../../../src/prototypes/runtimeAdapter.js";

const repoRoot = path.resolve(import.meta.dirname, "../../../../../..");
const candidateId = "RA_FRESH_2026_07_15_DESCENDING_E_PULL_SYNC";
const exactVersion = "v5";
const maxStates = 500_000;
const layoutPath = path.join(
  repoRoot,
  "prototypes/reality_anchor/reports/studio_giant_sticky_piston_order_20260715/candidates/challenge",
  `${candidateId}_${exactVersion}.txt`,
);

const pkg = await loadPrototypePackage(path.join(repoRoot, "prototypes/reality_anchor"));
const adapter = getRuntimeAdapter(pkg.mechanic);
const runtime = adapter.createRuntime(pkg.mechanic);
const layout = await readFile(layoutPath, "utf8");
const level: LevelDoc = {
  id: `${candidateId}_${exactVersion}`,
  title: `${candidateId}_${exactVersion}`,
  layout,
  win: pkg.mechanic.win,
};
const initial = adapter.parseLevel(level);
const winCondition = level.win ?? pkg.mechanic.win;
const graph = enumerateRuntimeGraph(
  runtime,
  initial,
  winCondition,
  { winCondition },
  { maxStates, terminalizeWins: true },
);

const withoutPlayer = (key: string): string => key.replace(/^Ply:[^|]+\|/, "");
const incoming = new Map<number, typeof graph.edges>();
const parentEdge = new Map<number, (typeof graph.edges)[number]>();
for (const edge of graph.edges) {
  const bucket = incoming.get(edge.to) ?? [];
  bucket.push(edge);
  incoming.set(edge.to, bucket);
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

const winIndexes = [...graph.winStateIndexes].sort((a, b) => a - b);
const minimumWinDepth = Math.min(...winIndexes.map((index) => graph.depthByIndex[index]!));
const canonicalWinIndex = winIndexes.find((index) => graph.depthByIndex[index] === minimumWinDepth)!;
const canonicalObjectKey = withoutPlayer(graph.keys[canonicalWinIndex]!);
const objectClassCounts = new Map<string, number>();
const actionCounts = new Map<string, number>();
const eventSignatureCounts = new Map<string, number>();
const finalTransitionClasses = new Set<string>();
const unexpectedSamples: Array<{
  winStateIndex: number;
  depth: number;
  action: string;
  events: string[];
  inputs: string[];
  before: string;
  after: string;
}> = [];
let incomingNonWinEdges = 0;
let expectedFinalEdges = 0;
let canonicalObjectWins = 0;

for (const winIndex of winIndexes) {
  const afterObjectKey = withoutPlayer(graph.keys[winIndex]!);
  objectClassCounts.set(afterObjectKey, (objectClassCounts.get(afterObjectKey) ?? 0) + 1);
  if (afterObjectKey === canonicalObjectKey) canonicalObjectWins += 1;
  const edges = (incoming.get(winIndex) ?? []).filter((edge) => !graph.winStateIndexes.has(edge.from));
  for (const edge of edges) {
    incomingNonWinEdges += 1;
    actionCounts.set(edge.action, (actionCounts.get(edge.action) ?? 0) + 1);
    const eventSignature = edge.events.join("|");
    eventSignatureCounts.set(eventSignature, (eventSignatureCounts.get(eventSignature) ?? 0) + 1);
    finalTransitionClasses.add(JSON.stringify({
      action: edge.action,
      events: edge.events,
      beforeObjectKey: withoutPlayer(graph.keys[edge.from]!),
      afterObjectKey,
    }));
    const expected = edge.action === "left"
      && edge.events.includes("pull_object:sticky#1")
      && edge.events.includes("force_chain:n3")
      && edge.events.includes("move_sticky_rigid")
      && edge.events.includes("sticky_to_box:n3")
      && afterObjectKey === canonicalObjectKey;
    if (expected) {
      expectedFinalEdges += 1;
    } else if (unexpectedSamples.length < 20) {
      unexpectedSamples.push({
        winStateIndex: winIndex,
        depth: graph.depthByIndex[winIndex]!,
        action: edge.action,
        events: edge.events,
        inputs: [...shortestInputs(edge.from), edge.action],
        before: adapter.renderState(graph.states[edge.from]!).trimEnd(),
        after: adapter.renderState(graph.states[winIndex]!).trimEnd(),
      });
    }
  }
}

const sortedCounts = (map: Map<string, number>) => [...map.entries()]
  .sort((a, b) => b[1] - a[1])
  .map(([key, count]) => ({ key, count }));
const result = {
  candidateId,
  exactVersion,
  layoutPath: path.relative(repoRoot, layoutPath).replaceAll("\\", "/"),
  graph: {
    status: graph.status,
    reason: graph.reason,
    reachableStates: graph.keys.length,
    transitions: graph.edges.length,
    winningStates: winIndexes.length,
    terminalizeWins: true,
    maxStates,
  },
  budgetPrefixSummary: {
    minimumWinDepth,
    canonicalShortestInputs: shortestInputs(canonicalWinIndex),
    winningObjectStateClasses: objectClassCounts.size,
    canonicalObjectWins,
    incomingNonWinEdges,
    expectedFinalEdges,
    unexpectedFinalEdges: incomingNonWinEdges - expectedFinalEdges,
    finalTransitionClassesIncludingObjectStates: finalTransitionClasses.size,
    finalActionCounts: sortedCounts(actionCounts),
    finalEventSignatureCounts: sortedCounts(eventSignatureCounts),
  },
  unexpectedSamples,
};

const lines = [
  `# Challenge budget-prefix uniqueness: ${candidateId}_${exactVersion}`,
  "",
  `- Graph status: ${graph.status}`,
  `- Budget: ${maxStates}`,
  `- Reachable prefix states: ${graph.keys.length}`,
  `- Raw winning states in prefix: ${winIndexes.length}`,
  `- Minimum win depth: ${minimumWinDepth}`,
  `- Winning object-state classes: ${objectClassCounts.size}`,
  `- Wins in canonical shortest object class: ${canonicalObjectWins}`,
  `- Incoming non-win -> win edges: ${incomingNonWinEdges}`,
  `- Expected pull/n3/rigid/n3 final edges in canonical class: ${expectedFinalEdges}`,
  `- Unexpected final edges: ${incomingNonWinEdges - expectedFinalEdges}`,
  `- Final transition classes including object states: ${finalTransitionClasses.size}`,
  "",
  "## Final action counts",
  "",
  ...sortedCounts(actionCounts).map(({ key, count }) => `- ${key}: ${count}`),
  "",
  "## Final event signatures",
  "",
  ...sortedCounts(eventSignatureCounts).map(({ key, count }) => `- ${count}: ${key}`),
  "",
  "## Unexpected samples",
  "",
  ...unexpectedSamples.flatMap((sample, index) => [
    `### Sample ${index + 1}`,
    "",
    `- Win state: ${sample.winStateIndex}`,
    `- Depth: ${sample.depth}`,
    `- Input: ${sample.action}`,
    `- Events: ${sample.events.join(", ")}`,
    `- Shortest inputs: ${sample.inputs.join(" ")}`,
    "",
    "```text",
    sample.before,
    "```",
    "",
    "```text",
    sample.after,
    "```",
    "",
  ]),
];

await mkdir(import.meta.dirname, { recursive: true });
await writeFile(path.join(import.meta.dirname, "results.json"), `${JSON.stringify(result, null, 2)}\n`, "utf8");
await writeFile(path.join(import.meta.dirname, "report.md"), `${lines.join("\n")}\n`, "utf8");
console.log(JSON.stringify(result.budgetPrefixSummary, null, 2));
