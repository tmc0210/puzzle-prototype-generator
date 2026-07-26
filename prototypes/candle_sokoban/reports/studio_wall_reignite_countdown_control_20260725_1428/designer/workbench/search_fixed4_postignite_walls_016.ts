import { readFile } from "node:fs/promises";
import { enumerateRuntimeGraph } from "../../../../../../src/core/runtimeGraph.js";
import { loadPrototypePackage } from "../../../../../../src/core/io.js";
import { solveWithRuntime } from "../../../../../../src/core/solver.js";
import type { LevelDoc } from "../../../../../../src/core/types.js";
import { replayInputSequence } from "../../../../../../src/workflows/inputSequenceReplay.js";
import { getRuntimeAdapter } from "../../../../../../src/prototypes/runtimeAdapter.js";

const basePath = "D:/Developer/sokoban/prototypes/candle_sokoban/reports/studio_wall_reignite_countdown_control_20260725_1428/designer/workbench/fresh_family_fixed4_threshold_horizontal_016.layout";
const baseRows = (await readFile(basePath, "utf8")).trimEnd().split(/\r?\n/);
const pkg = await loadPrototypePackage("prototypes/candle_sokoban");
const adapter = getRuntimeAdapter(pkg.mechanic);
const runtime = adapter.createRuntime(pkg.mechanic);
const options = { winCondition: pkg.mechanic.win };

function layoutFor(changes: Array<[number, number, string]>): string {
  const rows = baseRows.map((row) => row.split(""));
  for (const [x, y, value] of changes) rows[y]![x] = value;
  return rows.map((row) => row.join("")).join("\n") + "\n";
}

function signature(key: string): string {
  return key.split("|C:")[1]?.split("|B:")[0] ?? key;
}

const required = ["extinguish_by_wall", "ignite_from_brazier:candle#single2:7,7", "ignite_from_brazier:candle#single1:11,3", "light_brazier:8,3", "win_all_braziers_lit"];
const forbidden = /^(roll_intermediate_|roll_last_brazier_before_endpoint|roll_reignite_after_extinguish|wick_reexposed_unlit|shrink_ignite|extinguish_by_candle_body)/;
function eventsFor(replay: any): string[] {
  return replay.steps.flatMap((step: any) => step.events as string[]);
}
function usableEvents(events: string[]): boolean {
  return required.every((needle) => events.some((event) => event.startsWith(needle))) && !events.some((event) => forbidden.test(event));
}

const protectedCells = new Set([
  "7,4", "8,3", "9,3", "11,3", "7,7",
  "8,7", "9,7", "10,7", "11,7", "11,6", "11,5", "11,4",
  "12,5", "12,4", "8,9", "9,9", "10,9", "11,9", "8,10", "9,10",
]);
const cells: Array<[number, number]> = [];
for (let y = 4; y <= 10; y += 1) {
  for (let x = 8; x <= 14; x += 1) {
    if (protectedCells.has(`${x},${y}`)) continue;
    if (baseRows[y]![x] === ".") cells.push([x, y]);
  }
}

let seed = 0x016f1e0d;
function random(): number {
  seed = (seed * 1664525 + 1013904223) >>> 0;
  return seed / 0x1_0000_0000;
}

const candidates: Array<Array<[number, number, string]>> = cells.map(([x, y]) => [[x, y, "#"]]);
for (let i = 0; i < 1600; i += 1) {
  const count = random() < 0.88 ? 2 : 3;
  const picked = new Set<number>();
  const changes: Array<[number, number, string]> = [];
  while (changes.length < count) {
    const index = Math.floor(random() * cells.length);
    if (picked.has(index)) continue;
    picked.add(index);
    const [x, y] = cells[index]!;
    changes.push([x, y, "#"]);
  }
  candidates.push(changes);
}

let tested = 0;
for (const changes of candidates) {
  const layout = layoutFor(changes);
  let initial: any;
  try {
    initial = adapter.parseLevel({ id: "fixed4-postignite-wall", title: "fixed4-postignite-wall", layout, global_burn_cycle: 5, win: pkg.mechanic.win } as LevelDoc);
  } catch {
    continue;
  }
  tested += 1;
  const solution = solveWithRuntime(runtime, initial, { ...options, maxStates: 30000, maxDepth: 80 });
  if (!solution.found || !solution.inputs) continue;
  const replay = replayInputSequence(adapter, runtime, initial, solution.inputs, options, pkg.mechanic.win);
  const canonicalEvents = eventsFor(replay);
  if (!replay.final.isWin || !usableEvents(canonicalEvents)) continue;
  const graph = enumerateRuntimeGraph(runtime, initial, pkg.mechanic.win, options, { maxStates: 30000, terminalizeWins: true });
  if (graph.status !== "complete" || graph.winStateIndexes.size === 0) continue;
  const graphEvents = graph.edges.flatMap((edge) => edge.events);
  if (graphEvents.some((event) => forbidden.test(event))) continue;
  const signatures = [...new Set([...graph.winStateIndexes].map((index) => signature(graph.keys[index]!)))];
  if (signatures.length !== 1) continue;
  console.log(JSON.stringify({ tested, changes, inputs: solution.inputs, states: graph.keys.length, edges: graph.edges.length, wins: graph.winStateIndexes.size, signatures, layout }, null, 2));
  process.exit(0);
}
console.log(JSON.stringify({ tested, found: false }));
