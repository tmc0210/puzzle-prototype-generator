import { readFile } from "node:fs/promises";
import type { LevelDoc } from "../../../../../../src/core/types.js";
import { enumerateRuntimeGraph } from "../../../../../../src/core/runtimeGraph.js";
import { loadPrototypePackage } from "../../../../../../src/core/io.js";
import { solveWithRuntime } from "../../../../../../src/core/solver.js";
import { replayInputSequence } from "../../../../../../src/workflows/inputSequenceReplay.js";
import { getRuntimeAdapter } from "../../../../../../src/prototypes/runtimeAdapter.js";

const basePath = "D:/Developer/sokoban/prototypes/candle_sokoban/reports/studio_wall_reignite_countdown_control_20260725_1428/designer/workbench/fresh_family_fixed4_threshold_horizontal_009.layout";
const packageRoot = "D:/Developer/sokoban/prototypes/candle_sokoban";
const packageData = await loadPrototypePackage("prototypes/candle_sokoban");
const adapter = getRuntimeAdapter(packageData.mechanic);
const runtime = adapter.createRuntime(packageData.mechanic);
const options = { winCondition: packageData.mechanic.win };
const raw = await readFile(basePath, "utf8");
const baseRows = raw.trimEnd().split(/\r?\n/);

const mutable: Array<[number, number]> = [
  [7, 5], [8, 5], [10, 5],
  [7, 6], [8, 6], [10, 6],
  [7, 7], [8, 7], [9, 7], [10, 7],
  [7, 8], [8, 8], [9, 8], [10, 8],
  [7, 9], [8, 9], [10, 9],
  [7, 10], [8, 10], [9, 10], [10, 10],
];

function layoutFor(changes: Array<[number, number, string]>): string {
  const rows = baseRows.map((row) => row.split(""));
  for (const [x, y, value] of changes) rows[y][x] = value;
  return rows.map((row) => row.join("")).join("\n") + "\n";
}

function signatureFromKey(key: string): string {
  return key.split("|C:")[1]?.split("|B:")[0] ?? key;
}

function eventNames(replay: any): string[] {
  return (replay.steps ?? []).flatMap((step: any) =>
    (step.events ?? []).map((event: any) => typeof event === "string" ? event : String(event.type ?? event.name ?? event.event ?? "")),
  );
}

function hasRequiredEvents(names: string[]): boolean {
  const joined = names.join("|");
  return joined.includes("extinguish_by_wall") &&
    (names.filter((name) => name === "ignite_from_brazier").length >= 2) &&
    joined.includes("light_brazier") &&
    names.filter((name) => name === "burn_out").length >= 2;
}

function hasForbidden(names: string[]): boolean {
  return names.some((name) => /^(roll_intermediate_|roll_reignite_after_extinguish|wick_reexposed_unlit|shrink_ignite|extinguish_by_candle_body|roll_last_brazier_before_endpoint)/.test(name));
}

let seed = 0x51f4d009;
function next(): number {
  seed = (seed * 1664525 + 1013904223) >>> 0;
  return seed / 0x100000000;
}

const candidates: Array<Array<[number, number, string]>> = [];
for (const [x, y] of mutable) {
  const current = baseRows[y][x];
  candidates.push([[x, y, current === "." ? "#" : "."]]);
}
for (let i = 0; i < 900; i++) {
  const count = next() < 0.8 ? 2 : 3;
  const picked = new Set<number>();
  const changes: Array<[number, number, string]> = [];
  while (changes.length < count) {
    const index = Math.floor(next() * mutable.length);
    if (picked.has(index)) continue;
    picked.add(index);
    const [x, y] = mutable[index];
    const current = baseRows[y][x];
    changes.push([x, y, current === "." ? "#" : "."]);
  }
  candidates.push(changes);
}

let tested = 0;
for (const changes of candidates) {
  const text = layoutFor(changes);
  let initial: any;
  try {
    initial = adapter.parseLevel({
      id: "fixed4-gate-mutation-009",
      title: "fixed4-gate-mutation-009",
      layout: text,
      global_burn_cycle: 5,
      win: packageData.mechanic.win,
    } as LevelDoc);
  } catch {
    continue;
  }
  tested++;
  const solved = solveWithRuntime(runtime, initial, { ...options, maxStates: 30000, maxDepth: 70 });
  if (!solved.found || !solved.inputs) continue;
  const replay = replayInputSequence(adapter, runtime, initial, solved.inputs, options, packageData.mechanic.win);
  if (!replay.final.isWin) continue;
  const names = eventNames(replay);
  if (!hasRequiredEvents(names) || hasForbidden(names)) continue;
  const graph = enumerateRuntimeGraph(runtime, initial, packageData.mechanic.win, options, { maxStates: 30000, terminalizeWins: true });
  if (graph.status !== "complete") continue;
  const wins = [...graph.winStateIndexes].map((index) => graph.keys[index]!);
  const signatures = [...new Set(wins.map((key) => signatureFromKey(key)))];
  if (signatures.length !== 1) continue;
  console.log(JSON.stringify({
    tested,
    changes,
    solver: { found: solved.found, cost: solved.inputs.length, inputs: solved.inputs },
    replayEvents: names,
    graph: { status: graph.status, states: graph.keys.length, edges: graph.edges.length, wins: wins.length },
    signature: signatures[0],
    layout: text,
  }, null, 2));
  process.exit(0);
}
console.log(JSON.stringify({ tested, found: false }));
