import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import { loadPrototypePackage } from "../../../../../../src/core/io.js";
import { enumerateRuntimeGraph } from "../../../../../../src/core/runtimeGraph.js";
import type { LevelDoc } from "../../../../../../src/core/types.js";
import { getRuntimeAdapter } from "../../../../../../src/prototypes/runtimeAdapter.js";

const repoRoot = path.resolve(import.meta.dirname, "../../../../../..");
const candidateId = "RA_FRESH_2026_07_15_DESCENDING_E_PULL_SYNC";
const exactVersion = "v6";
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
const level: LevelDoc = { id: `${candidateId}_${exactVersion}`, title: `${candidateId}_${exactVersion}`, layout, win: pkg.mechanic.win };
const initial = adapter.parseLevel(level);
const winCondition = level.win ?? pkg.mechanic.win;
const graph = enumerateRuntimeGraph(runtime, initial, winCondition, { winCondition }, { maxStates, terminalizeWins: true });

const withoutPlayer = (key: string): string => key.replace(/^Ply:[^|]+\|/, "");
const incoming = new Map<number, typeof graph.edges>();
for (const edge of graph.edges) {
  const bucket = incoming.get(edge.to) ?? [];
  bucket.push(edge);
  incoming.set(edge.to, bucket);
}
const wins = [...graph.winStateIndexes].sort((a, b) => a - b).map((stateIndex) => {
  const key = graph.keys[stateIndex]!;
  return {
    stateIndex,
    depth: graph.depthByIndex[stateIndex],
    player: key.match(/^Ply:([^|]+)/)?.[1] ?? "unknown",
    objectKey: withoutPlayer(key),
    render: adapter.renderState(graph.states[stateIndex]!).trimEnd(),
    incoming: (incoming.get(stateIndex) ?? []).filter((edge) => !graph.winStateIndexes.has(edge.from)).map((edge) => ({
      fromStateIndex: edge.from,
      action: edge.action,
      events: edge.events,
      beforeObjectKey: withoutPlayer(graph.keys[edge.from]!),
      beforeRender: adapter.renderState(graph.states[edge.from]!).trimEnd(),
    })),
  };
});
const incomingEdges = wins.flatMap((win) => win.incoming);
const transitionClasses = new Set(wins.flatMap((win) => win.incoming.map((edge) => JSON.stringify({
  action: edge.action,
  events: edge.events,
  beforeObjectKey: edge.beforeObjectKey,
  afterObjectKey: win.objectKey,
}))));
const summary = {
  rawWinningStates: wins.length,
  winningObjectStateClasses: new Set(wins.map((win) => win.objectKey)).size,
  incomingNonWinEdges: incomingEdges.length,
  finalTransitionClassesIncludingObjectStates: transitionClasses.size,
  allFinalActionsLeft: incomingEdges.every((edge) => edge.action === "left"),
  allFinalEventsMatch: incomingEdges.every((edge) => [
    "pull_object:sticky#1",
    "force_chain:n3",
    "move_sticky_rigid",
    "sticky_to_box:n3",
  ].every((event) => edge.events.includes(event))),
  allWinsCoverTwoTargets: wins.every((win) => (win.render.match(/\*/g) ?? []).length === 2),
};
const result = {
  candidateId,
  exactVersion,
  layoutPath: path.relative(repoRoot, layoutPath).replaceAll("\\", "/"),
  graph: {
    status: graph.status,
    reason: graph.reason,
    reachableStates: graph.keys.length,
    transitions: graph.edges.length,
    terminalizeWins: true,
    maxStates,
  },
  summary,
  wins,
};
const lines = [
  `# Challenge uniqueness expansion: ${candidateId}_${exactVersion}`,
  "",
  `- Graph status: ${graph.status}`,
  `- Reachable states: ${graph.keys.length}`,
  `- Legal transitions: ${graph.edges.length}`,
  `- Raw winning states: ${summary.rawWinningStates}`,
  `- Winning object-state classes after removing player: ${summary.winningObjectStateClasses}`,
  `- Incoming non-win -> win edges: ${summary.incomingNonWinEdges}`,
  `- Final transition classes including object states: ${summary.finalTransitionClassesIncludingObjectStates}`,
  `- All final actions left: ${summary.allFinalActionsLeft}`,
  `- All final events match pull/n3/rigid/n3: ${summary.allFinalEventsMatch}`,
  `- All wins cover two targets: ${summary.allWinsCoverTwoTargets}`,
  "",
];
await mkdir(import.meta.dirname, { recursive: true });
await writeFile(path.join(import.meta.dirname, "results.json"), `${JSON.stringify(result, null, 2)}\n`, "utf8");
await writeFile(path.join(import.meta.dirname, "report.md"), `${lines.join("\n")}\n`, "utf8");
console.log(JSON.stringify(summary, null, 2));
