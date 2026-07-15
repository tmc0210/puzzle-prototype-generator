import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import { loadPrototypePackage } from "../../../../../../src/core/io.js";
import { enumerateRuntimeGraph } from "../../../../../../src/core/runtimeGraph.js";
import type { LevelDoc } from "../../../../../../src/core/types.js";
import { getRuntimeAdapter } from "../../../../../../src/prototypes/runtimeAdapter.js";

const repoRoot = path.resolve(import.meta.dirname, "../../../../../..");
const candidateId = "RA_FRESH_2026_07_15_FORGED_C_SYNC";
const exactVersion = "v5";
const layoutPath = path.join(
  repoRoot,
  "prototypes/reality_anchor/reports/studio_giant_sticky_piston_order_20260715/candidates/application",
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
  { maxStates: 200_000, terminalizeWins: true },
);

const withoutPlayer = (key: string): string => key.replace(/^Ply:[^|]+\|/, "");
const incoming = new Map<number, typeof graph.edges>();
for (const edge of graph.edges) {
  const bucket = incoming.get(edge.to) ?? [];
  bucket.push(edge);
  incoming.set(edge.to, bucket);
}

const wins = [...graph.winStateIndexes].sort((a, b) => a - b).map((stateIndex) => {
  const key = graph.keys[stateIndex]!;
  const nonWinIncoming = (incoming.get(stateIndex) ?? []).filter((edge) => !graph.winStateIndexes.has(edge.from));
  return {
    stateIndex,
    depth: graph.depthByIndex[stateIndex],
    player: key.match(/^Ply:([^|]+)/)?.[1] ?? "unknown",
    objectKey: withoutPlayer(key),
    render: adapter.renderState(graph.states[stateIndex]!).trimEnd(),
    incoming: nonWinIncoming.map((edge) => ({
      fromStateIndex: edge.from,
      action: edge.action,
      events: edge.events,
      beforeObjectKey: withoutPlayer(graph.keys[edge.from]!),
      beforeRender: adapter.renderState(graph.states[edge.from]!).trimEnd(),
    })),
  };
});

const incomingEdges = wins.flatMap((win) => win.incoming);
const transitionClasses = new Set(
  wins.flatMap((win) => win.incoming.map((edge) => JSON.stringify({
    action: edge.action,
    events: edge.events,
    beforeObjectKey: edge.beforeObjectKey,
    afterObjectKey: win.objectKey,
  }))),
);
const summary = {
  rawWinningStates: wins.length,
  winningObjectStateClasses: new Set(wins.map((win) => win.objectKey)).size,
  incomingNonWinEdges: incomingEdges.length,
  finalTransitionClassesIncludingObjectStates: transitionClasses.size,
  allFinalActionsRight: incomingEdges.every((edge) => edge.action === "right"),
  allFinalEventsMatch: incomingEdges.every((edge) =>
    ["push_object:sticky#1", "force_chain:n3", "move_sticky_rigid", "sticky_to_box:n4"]
      .every((event) => edge.events.includes(event))),
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
    maxStates: 200_000,
  },
  summary,
  wins,
};

const lines = [
  `# Application uniqueness expansion: ${candidateId}_${exactVersion}`,
  "",
  `- Graph status: ${graph.status}`,
  `- Reachable states: ${graph.keys.length}`,
  `- Legal transitions: ${graph.edges.length}`,
  `- Raw winning states: ${summary.rawWinningStates}`,
  `- Winning object-state classes after removing player: ${summary.winningObjectStateClasses}`,
  `- Incoming non-win -> win edges: ${summary.incomingNonWinEdges}`,
  `- Final transition classes including object states: ${summary.finalTransitionClassesIncludingObjectStates}`,
  `- All final actions right: ${summary.allFinalActionsRight}`,
  `- All final events match n3/rigid/n4: ${summary.allFinalEventsMatch}`,
  `- All wins cover two targets: ${summary.allWinsCoverTwoTargets}`,
  "",
  "## Raw win variants",
  "",
  ...wins.map((win) => `- state=${win.stateIndex}; depth=${win.depth}; player=${win.player}; incoming=${win.incoming.length}`),
  "",
];

await mkdir(import.meta.dirname, { recursive: true });
await writeFile(path.join(import.meta.dirname, "results.json"), `${JSON.stringify(result, null, 2)}\n`, "utf8");
await writeFile(path.join(import.meta.dirname, "report.md"), `${lines.join("\n")}\n`, "utf8");
console.log(JSON.stringify(summary, null, 2));
