import { readFile } from "node:fs/promises";
import { enumerateRuntimeGraph } from "../../../../../../src/core/runtimeGraph.js";
import { loadPrototypePackage } from "../../../../../../src/core/io.js";
import { solveWithRuntime } from "../../../../../../src/core/solver.js";
import type { LevelDoc } from "../../../../../../src/core/types.js";
import { replayInputSequence } from "../../../../../../src/workflows/inputSequenceReplay.js";
import { getRuntimeAdapter } from "../../../../../../src/prototypes/runtimeAdapter.js";

const root = "prototypes/candle_sokoban/reports/studio_wall_reignite_countdown_control_20260725_1428/designer/workbench";
const basePath = `${root}/probe_postburn_roll_gate_lit.layout`;
const base = (await readFile(basePath, "utf8")).replace(/\r/g, "").trimEnd();
const rows = base.split("\n");
const pkg = await loadPrototypePackage("prototypes/candle_sokoban");
const adapter = getRuntimeAdapter(pkg.mechanic);
const runtime = adapter.createRuntime(pkg.mechanic);
const options = { winCondition: pkg.mechanic.win };
const dirs = { up: [0, -1], down: [0, 1], left: [-1, 0], right: [1, 0] } as const;
const glyphs = { up: "u", down: "d", left: "l", right: "r" } as const;
function key(x: number, y: number): string { return `${x},${y}`; }
function get(layout: string, x: number, y: number): string { return layout.split("\n")[y]![x]!; }
function setCell(layout: string, x: number, y: number, glyph: string): string {
  const next = layout.split("\n");
  const row = next[y]!;
  next[y] = row.slice(0, x) + glyph + row.slice(x + 1);
  return next.join("\n");
}
function signature(stateKey: string): string {
  return stateKey.split("|C:")[1]?.split("|B:")[0] ?? stateKey;
}

const wallCells = new Set<string>();
for (let y = 0; y < rows.length; y += 1) {
  for (let x = 0; x < rows[y]!.length; x += 1) if (rows[y]![x] === "#") wallCells.add(key(x, y));
}
const openCells: Array<[number, number]> = [];
for (let y = 1; y < rows.length - 1; y += 1) {
  for (let x = 1; x < rows[y]!.length - 1; x += 1) {
    if (!wallCells.has(key(x, y))) openCells.push([x, y]);
  }
}

for (const [targetX, targetY] of openCells) {
  if (get(base, targetX, targetY) !== "." && !(targetX === 3 && targetY === 3)) continue;
  for (const [pushName, [dx, dy]] of Object.entries(dirs) as Array<[keyof typeof dirs, readonly [number, number]]>) {
    for (const [wickName, [wx, wy]] of Object.entries(dirs) as Array<[keyof typeof dirs, readonly [number, number]]>) {
      const bodyX = 2;
      const bodyY = 3;
      const initialX = bodyX - dx;
      const initialY = bodyY - dy;
      const playerX = bodyX - 2 * dx;
      const playerY = bodyY - 2 * dy;
      const sourceX = bodyX + wx;
      const sourceY = bodyY + wy;
      const positions = [[initialX, initialY], [playerX, playerY], [sourceX, sourceY], [targetX, targetY]] as const;
      if (positions.some(([x, y]) => x <= 0 || y <= 0 || x >= 10 || y >= 10 || wallCells.has(key(x, y)))) continue;
      if (new Set(positions.map(([x, y]) => key(x, y))).size !== positions.length) continue;
      let layout = base;
      layout = setCell(layout, 2, 2, ".");
      layout = setCell(layout, 4, 7, ".");
      layout = setCell(layout, 3, 3, ".");
      layout = setCell(layout, targetX, targetY, "o");
      layout = setCell(layout, sourceX, sourceY, "O");
      layout = setCell(layout, initialX, initialY, glyphs[wickName]);
      layout = setCell(layout, playerX, playerY, "@");
      let initial;
      try {
        initial = adapter.parseLevel({ id: "entry-over-lit-skeleton", title: "entry-over-lit-skeleton", layout: `${layout}\n`, global_burn_cycle: 5, win: pkg.mechanic.win } as LevelDoc);
      } catch {
        continue;
      }
      const solution = solveWithRuntime(runtime, initial, { ...options, maxStates: 30000, maxDepth: 80 });
      if (!solution.found || !solution.inputs) continue;
      const replay = replayInputSequence(adapter, runtime, initial, solution.inputs, options, pkg.mechanic.win);
      const events = replay.steps.flatMap((step) => step.events);
      if (!replay.final.isWin || !events.some((event) => event.startsWith("ignite_from_brazier"))) continue;
      const graph = enumerateRuntimeGraph(runtime, initial, pkg.mechanic.win, options, { maxStates: 30000, terminalizeWins: true });
      if (graph.status !== "complete") continue;
      const forbidden = graph.edges.flatMap((edge) => edge.events.filter((event) => /^(roll_intermediate_|roll_reignite_after_extinguish|wick_reexposed_unlit|shrink_ignite|extinguish_by_candle_body)/.test(event)));
      const signatures = [...new Set([...graph.winStateIndexes].map((index) => signature(graph.keys[index]!)))];
      console.log(JSON.stringify({ push: pushName, wick: wickName, target: [targetX, targetY], source: [sourceX, sourceY], inputs: solution.inputs, events, states: graph.keys.length, edges: graph.edges.length, wins: graph.winStateIndexes.size, signatures, forbidden: [...new Set(forbidden)], layout: `${layout}\n` }, null, 2));
      if (signatures.length === 1 && forbidden.length === 0) process.exit(0);
    }
  }
}
console.log("NO_SOLVER_UNIQUE");
