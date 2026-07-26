import { readFile } from "node:fs/promises";
import { enumerateRuntimeGraph } from "../../../../../../src/core/runtimeGraph.js";
import { loadPrototypePackage } from "../../../../../../src/core/io.js";
import { solveWithRuntime } from "../../../../../../src/core/solver.js";
import type { LevelDoc } from "../../../../../../src/core/types.js";
import { replayInputSequence } from "../../../../../../src/workflows/inputSequenceReplay.js";
import { getRuntimeAdapter } from "../../../../../../src/prototypes/runtimeAdapter.js";

const basePath = process.argv[2]!;
const base = (await readFile(basePath, "utf8")).replace(/\r/g, "").trimEnd();
const pkg = await loadPrototypePackage("prototypes/candle_sokoban");
const adapter = getRuntimeAdapter(pkg.mechanic);
const runtime = adapter.createRuntime(pkg.mechanic);

function setCell(layout: string, x: number, y: number, glyph: string): string {
  const rows = layout.split("\n");
  const row = rows[y]!;
  if (x < 0 || x >= row.length) throw new Error(`out of bounds ${x},${y}`);
  rows[y] = `${row.slice(0, x)}${glyph}${row.slice(x + 1)}`;
  return rows.join("\n");
}

function makeLayout(target: string, walls: string[], floors: string[]): string {
  let layout = base;
  const currentTargetY = layout.split("\n").findIndex((row, index) => index > 9 && row.includes("o"));
  const currentTargetX = currentTargetY >= 0 ? layout.split("\n")[currentTargetY]!.indexOf("o") : -1;
  if (currentTargetX >= 0) layout = setCell(layout, currentTargetX, currentTargetY, ".");
  const [targetX, targetY] = target.split(",").map(Number);
  layout = setCell(layout, targetX!, targetY!, "o");
  for (const wall of walls) {
    const [x, y] = wall.split(",").map(Number);
    layout = setCell(layout, x!, y!, "#");
  }
  for (const floor of floors) {
    const [x, y] = floor.split(",").map(Number);
    layout = setCell(layout, x!, y!, ".");
  }
  return `${layout}\n`;
}

const targets = ["9,14", "9,15", "9,16", "9,17", "10,15", "10,16", "12,14"];
const wallPatterns: string[][] = [
  [],
  ["12,10", "12,11", "12,12", "12,13"],
  ["10,10", "10,11", "10,12", "10,13"],
  ["9,10", "9,11", "9,12", "9,13"],
  ["12,10", "12,11", "12,12", "12,13", "11,14"],
  ["10,10", "10,11", "10,12", "10,13", "11,14"],
  ["9,10", "9,11", "9,12", "9,13", "11,14"],
  ["12,13", "12,14", "12,15"],
  ["13,10", "13,11", "13,12", "13,13", "12,14"],
];

for (const target of targets) {
  for (const walls of wallPatterns) {
    const layout = makeLayout(target, walls, walls.includes("11,14") ? ["11,14"] : []);
    try {
      const level: LevelDoc = { id: "vertical-search", title: "vertical-search", layout, global_burn_cycle: 5, win: pkg.mechanic.win };
      const initial = adapter.parseLevel(level);
      const options = { winCondition: pkg.mechanic.win };
      const solution = solveWithRuntime(runtime, initial, { ...options, maxStates: 90000, maxDepth: 120 });
      if (!solution.found) continue;
      const replay = replayInputSequence(adapter, runtime, initial, solution.inputs, options, pkg.mechanic.win);
      const events = replay.steps.flatMap((step) => step.events);
      const graph = enumerateRuntimeGraph(runtime, initial, pkg.mechanic.win, options, { maxStates: 90000, terminalizeWins: true });
      const forbidden = graph.edges.flatMap((edge) => edge.events.filter((event) =>
        /^(roll_intermediate_|roll_reignite_after_extinguish|wick_reexposed_unlit|shrink_ignite)/.test(event)));
      const winningEdges = graph.edges.filter((edge) => edge.events.includes("win_all_braziers_lit"));
      const winningKeys = [...graph.winStateIndexes].map((index) => graph.keys[index]!);
      const signatures = [...new Set(winningKeys.map((key) => key.split("|C:")[1]?.split("|B:")[0] ?? key))];
      if (graph.status === "complete" && forbidden.length === 0) {
        console.log(JSON.stringify({
          target,
          walls,
          routeSteps: solution.inputs.length,
          graph: { status: graph.status, states: graph.keys.length, edges: graph.edges.length, winningEdges: winningEdges.length, signatures },
          requiredEvents: {
            wall: events.some((event) => event.startsWith("extinguish_by_wall")),
            source: events.some((event) => event.startsWith("ignite_from_brazier")),
            target: events.some((event) => event.startsWith("light_brazier")),
            win: replay.final.isWin,
          },
          inputs: solution.inputs,
          layout,
        }, null, 2));
      }
    } catch {
      // Invalid mutations are simply skipped during local design search.
    }
  }
}
