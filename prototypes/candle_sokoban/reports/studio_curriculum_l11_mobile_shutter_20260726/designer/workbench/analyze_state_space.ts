import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { loadPrototypePackage } from "../../../../../../src/core/io.js";
import { enumerateRuntimeGraph } from "../../../../../../src/core/runtimeGraph.js";
import type { LevelDoc } from "../../../../../../src/core/types.js";
import { getRuntimeAdapter } from "../../../../../../src/prototypes/runtimeAdapter.js";

const workbenchRoot = path.resolve(
  "prototypes/candle_sokoban/reports/studio_curriculum_l11_mobile_shutter_20260726/designer/workbench",
);
const layout = (await readFile(path.join(workbenchRoot, "layout.txt"), "utf8"))
  .replace(/\r/g, "")
  .trimEnd();
const pkg = await loadPrototypePackage(path.resolve("prototypes/candle_sokoban"));
const adapter = getRuntimeAdapter(pkg.mechanic);
const runtime = adapter.createRuntime(pkg.mechanic);
const level: LevelDoc = {
  id: "wb",
  title: "wb",
  global_burn_cycle: 5,
  layout,
};
const initial = adapter.parseLevel(level);
const winCondition = level.win ?? pkg.mechanic.win;
const graph = enumerateRuntimeGraph(
  runtime,
  initial,
  winCondition,
  { winCondition },
  { maxStates: 300_000, terminalizeWins: true },
);

const uniqueBySlot = new Map<string, Set<string>>();
const tupleCounts = new Map<string, number>();
for (const key of graph.keys) {
  const parts = key.split("|");
  const candleStart = parts.findIndex((part) => part.startsWith("C:"));
  const brazierIndex = parts.findIndex((part) => part.startsWith("B:"));
  const candleParts = parts
    .slice(candleStart, brazierIndex)
    .map((part, index) => (index === 0 ? part.slice(2) : part));
  const candlePart = `C:${candleParts.join("|")}`;
  const braziers = parts.find((part) => part.startsWith("B:")) ?? "B:";
  const tuple = `${candlePart}|${braziers}`;
  tupleCounts.set(tuple, (tupleCounts.get(tuple) ?? 0) + 1);
  for (const candle of candleParts) {
    const id = candle.split(":", 1)[0] ?? "unknown";
    const bucket = uniqueBySlot.get(id) ?? new Set<string>();
    bucket.add(candle);
    uniqueBySlot.set(id, bucket);
  }
}

const report = {
  graph: {
    status: graph.status,
    states: graph.keys.length,
    edges: graph.edges.length,
    wins: graph.winStateIndexes.size,
  },
  unique_candle_states: Object.fromEntries(
    [...uniqueBySlot.entries()]
      .map(([id, values]) => [id, values.size] as const)
      .sort(([left], [right]) => left.localeCompare(right)),
  ),
  unique_object_tuples: tupleCounts.size,
  most_frequent_object_tuples: [...tupleCounts.entries()]
    .sort((left, right) => right[1] - left[1])
    .slice(0, 20)
    .map(([tuple, playerTimerVariants]) => ({ tuple, playerTimerVariants })),
};
await writeFile(
  path.join(workbenchRoot, "state_space_stats.json"),
  `${JSON.stringify(report, null, 2)}\n`,
  "utf8",
);
console.log(JSON.stringify(report, null, 2));
