import { readFile } from "node:fs/promises";
import { loadPrototypePackage } from "../../../src/core/io.js";
import { enumerateRuntimeGraph } from "../../../src/core/runtimeGraph.js";
import type { LevelDoc } from "../../../src/core/types.js";
import type { RealityAnchorState } from "../../../src/prototypes/reality_anchor/mechanics.js";
import { getRuntimeAdapter } from "../../../src/prototypes/runtimeAdapter.js";

const layoutPath = process.argv[2]!;
const maxStates = Number(process.argv[3] ?? 200_000);
const pkg = await loadPrototypePackage("prototypes/reality_anchor");
const adapter = getRuntimeAdapter(pkg.mechanic);
const runtime = adapter.createRuntime(pkg.mechanic);
const layout = (await readFile(layoutPath, "utf8")).replace(/\r/g, "").replace(/\n+$/g, "");
const level: LevelDoc = {
  id: "RA_DYNAMIC_SHAFT_GROWTH",
  title: "RA_DYNAMIC_SHAFT_GROWTH",
  role: "challenge",
  status: "candidate",
  targets: [],
  known_before: [],
  target_learning: [],
  support_level: "none",
  expected_solver_evidence: [],
  expected_llm_player_evidence: [],
  layout,
};
const initial = adapter.parseLevel(level) as RealityAnchorState;
const graph = enumerateRuntimeGraph(runtime, initial, pkg.mechanic.win,
  { winCondition: pkg.mechanic.win }, { maxStates, terminalizeWins: true });

const pl = new Map<string, number>();
const bs = new Map<string, number>();
const sticky = new Map<string, number>();
const objects = new Map<string, number>();
for (const key of graph.keys) {
  const [, ...parts] = key.split("|");
  const objectKey = parts.join("|");
  objects.set(objectKey, (objects.get(objectKey) ?? 0) + 1);
  const plKey = parts.find((part) => part.startsWith("PL:"))!;
  const bsKey = parts.find((part) => part.startsWith("BS:"))!;
  const stickyKey = parts.find((part) => part.startsWith("M:"))!;
  pl.set(plKey, (pl.get(plKey) ?? 0) + 1);
  bs.set(bsKey, (bs.get(bsKey) ?? 0) + 1);
  sticky.set(stickyKey, (sticky.get(stickyKey) ?? 0) + 1);
}
const eventKinds = new Map<string, number>();
for (const edge of graph.edges) {
  const label = edge.events.filter((event) => event !== "walk").join("&") || "walk";
  eventKinds.set(label, (eventKinds.get(label) ?? 0) + 1);
}
function top(map: Map<string, number>, n = 20) {
  return [...map].sort((a, b) => b[1] - a[1]).slice(0, n);
}
console.log(JSON.stringify({
  status: graph.status,
  reason: graph.reason,
  states: graph.keys.length,
  edges: graph.edges.length,
  wins: graph.winStateIndexes.size,
  uniqueObjectConfigs: objects.size,
  uniquePL: pl.size,
  uniqueBS: bs.size,
  uniqueSticky: sticky.size,
  topPL: top(pl),
  topBS: top(bs),
  eventKinds: top(eventKinds, 50),
}, null, 2));
