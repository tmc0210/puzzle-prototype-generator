import { readFile } from "node:fs/promises";
import { eventMatchesPattern } from "../../../src/core/events.js";
import { analyzeGraphWithRuntime } from "../../../src/core/graphAnalyzer.js";
import { loadPrototypePackage } from "../../../src/core/io.js";
import { solveWithRuntime } from "../../../src/core/solver.js";
import type { LevelDoc } from "../../../src/core/types.js";
import { getRuntimeAdapter } from "../../../src/prototypes/runtimeAdapter.js";

const layoutPath = process.argv[2];
const mode = process.argv[3] ?? "single-add";
const maxSolveStates = Number(process.argv[4] ?? 400_000);
const maxGraphStates = Number(process.argv[5] ?? 400_000);
const shardIndex = Number(process.argv[6] ?? 0);
const shardCount = Number(process.argv[7] ?? 1);
if (!layoutPath) {
  throw new Error("Usage: search_strict_central_order_lock_agent.ts <layout> [single-add|pair-add|single-toggle|corridor-pair] [maxSolveStates] [maxGraphStates]");
}

const pkg = await loadPrototypePackage("prototypes/reality_anchor");
const adapter = getRuntimeAdapter(pkg.mechanic);
const runtime = adapter.createRuntime(pkg.mechanic);
const base = (await readFile(layoutPath, "utf8")).replace(/\r/g, "").replace(/\n+$/g, "");
const rows = base.split("\n").map((row) => [...row]);

type Mutation = { id: string; edits: Array<{ x: number; y: number; glyph: string }> };
const floor: Array<{ x: number; y: number }> = [];
const walls: Array<{ x: number; y: number }> = [];
for (let y = 1; y < rows.length - 1; y += 1) {
  for (let x = 1; x < rows[y]!.length - 1; x += 1) {
    const glyph = rows[y]![x]!;
    if (glyph === ".") floor.push({ x, y });
    if (glyph === "#") walls.push({ x, y });
  }
}

const mutations: Mutation[] = [];
if (mode === "single-add" || mode === "single-toggle") {
  for (const point of floor) mutations.push({ id: `add_${point.x}_${point.y}`, edits: [{ ...point, glyph: "#" }] });
}
if (mode === "single-toggle") {
  for (const point of walls) mutations.push({ id: `remove_${point.x}_${point.y}`, edits: [{ ...point, glyph: "." }] });
}
if (mode === "gate-remove") {
  const selected = walls.filter(({ x, y }) => y >= 2 && y <= 6 && x >= 4 && x <= 9);
  for (const point of selected) mutations.push({ id: `remove_${point.x}_${point.y}`, edits: [{ ...point, glyph: "." }] });
}
if (mode === "pair-add") {
  for (let i = 0; i < floor.length - 1; i += 1) {
    for (let j = i + 1; j < floor.length; j += 1) {
      const a = floor[i]!;
      const b = floor[j]!;
      mutations.push({
        id: `add_${a.x}_${a.y}__${b.x}_${b.y}`,
        edits: [{ ...a, glyph: "#" }, { ...b, glyph: "#" }],
      });
    }
  }
}
if (mode === "corridor-pair") {
  const corridor = floor.filter(({ x, y }) => x >= 8 || y === 2 || y === 6);
  for (let i = 0; i < corridor.length - 1; i += 1) {
    for (let j = i + 1; j < corridor.length; j += 1) {
      const a = corridor[i]!;
      const b = corridor[j]!;
      mutations.push({
        id: `add_${a.x}_${a.y}__${b.x}_${b.y}`,
        edits: [{ ...a, glyph: "#" }, { ...b, glyph: "#" }],
      });
    }
  }
}
if (mode === "relocate-bs-right" || mode === "relocate-bs-all") {
  const b = findGlyph(rows, "B");
  const s = findGlyph(rows, "S");
  if (!b || !s) throw new Error("Base layout needs B and S");
  const cleared = rows.map((row) => [...row]);
  cleared[b.y]![b.x] = ".";
  cleared[s.y]![s.x] = ".";
  const candidates: Array<{ x: number; y: number }> = [];
  for (let y = 1; y < cleared.length - 1; y += 1) {
    for (let x = 1; x < cleared[y]!.length - 1; x += 1) {
      if (cleared[y]![x] === "." && (mode === "relocate-bs-all" || x >= 8)) candidates.push({ x, y });
    }
  }
  for (const box of candidates) {
    for (const sticky of candidates) {
      if (Math.abs(box.x - sticky.x) + Math.abs(box.y - sticky.y) !== 1) continue;
      mutations.push({
        id: `bs_B${box.x}_${box.y}_S${sticky.x}_${sticky.y}`,
        edits: [
          { ...b, glyph: "." },
          { ...s, glyph: "." },
          { ...box, glyph: "B" },
          { ...sticky, glyph: "S" },
        ],
      });
    }
  }
}
if (mode === "relocate-bs-carve") {
  const b = findGlyph(rows, "B");
  const s = findGlyph(rows, "S");
  if (!b || !s) throw new Error("Base layout needs B and S");
  const candidates: Array<{ x: number; y: number }> = [];
  for (let y = 2; y <= 6; y += 1) {
    for (let x = 7; x <= 11; x += 1) {
      if ([".", "#", "B", "S"].includes(rows[y]![x]!)) candidates.push({ x, y });
    }
  }
  const oldCellPolicies: Array<[string, string]> = [[".", "."], ["#", "#"], ["#", "."], [".", "#"]];
  for (const box of candidates) {
    for (const sticky of candidates) {
      if (Math.abs(box.x - sticky.x) + Math.abs(box.y - sticky.y) !== 1) continue;
      for (const [oldB, oldS] of oldCellPolicies) {
        mutations.push({
          id: `bscarve_B${box.x}_${box.y}_S${sticky.x}_${sticky.y}_old${oldB === "#" ? "w" : "f"}${oldS === "#" ? "w" : "f"}`,
          edits: [
            { ...b, glyph: oldB },
            { ...s, glyph: oldS },
            { ...box, glyph: "B" },
            { ...sticky, glyph: "S" },
          ],
        });
      }
    }
  }
}
if (mode === "seed-two-brush") {
  const objectCells: Array<{ x: number; y: number; glyph: string }> = [];
  for (let y = 0; y < rows.length; y += 1) {
    for (let x = 0; x < rows[y]!.length; x += 1) {
      if (["C", "*", "M", "m"].includes(rows[y]![x]!)) objectCells.push({ x, y, glyph: rows[y]![x]! });
    }
  }
  const clearEdits = objectCells.map(({ x, y, glyph }) => ({ x, y, glyph: glyph === "*" || glyph === "m" ? "G" : "." }));
  const brushRow = [5, 6, 7].map((x) => ({ x, y: 4 }));
  const thirdRow = [5, 6, 7].map((x) => ({ x, y: 3 }));
  const stickySeeds = [
    { x: 5, y: 5 }, { x: 6, y: 5 }, { x: 7, y: 5 },
    { x: 6, y: 6 }, { x: 7, y: 6 },
  ];
  for (let i = 0; i < brushRow.length - 1; i += 1) {
    for (let j = i + 1; j < brushRow.length; j += 1) {
      for (const third of thirdRow) {
        for (const sticky of stickySeeds) {
          const points = [brushRow[i]!, brushRow[j]!, third, sticky];
          if (new Set(points.map(({ x, y }) => `${x},${y}`)).size !== 4) continue;
          const placements = [
            ...[brushRow[i]!, brushRow[j]!, third].map((point) => ({ ...point, glyph: rows[point.y]![point.x] === "G" || rows[point.y]![point.x] === "*" ? "*" : "C" })),
            { ...sticky, glyph: rows[sticky.y]![sticky.x] === "G" || rows[sticky.y]![sticky.x] === "m" ? "m" : "M" },
          ];
          mutations.push({
            id: `seed_brush_${brushRow[i]!.x}_${brushRow[j]!.x}_third_${third.x}_${third.y}_sticky_${sticky.x}_${sticky.y}`,
            edits: [...clearEdits, ...placements],
          });
        }
      }
    }
  }
}
if (mode === "seed-prepull-gate") {
  const objectCells: Array<{ x: number; y: number; glyph: string }> = [];
  for (let y = 0; y < rows.length; y += 1) {
    for (let x = 0; x < rows[y]!.length; x += 1) {
      if (["C", "*", "M", "m"].includes(rows[y]![x]!)) objectCells.push({ x, y, glyph: rows[y]![x]! });
    }
  }
  const clearEdits = objectCells.map(({ x, y, glyph }) => ({ x, y, glyph: glyph === "*" || glyph === "m" ? "G" : "." }));
  const top = [5, 6, 7].map((x) => ({ x, y: 3 }));
  const brush = [5, 6, 7].map((x) => ({ x, y: 4 }));
  const stickySeeds = [{ x: 5, y: 5 }, { x: 6, y: 5 }, { x: 7, y: 6 }];
  for (let i = 0; i < top.length - 1; i += 1) {
    for (let j = i + 1; j < top.length; j += 1) {
      for (const brushCrate of brush) {
        for (const sticky of stickySeeds) {
          const crates = [top[i]!, top[j]!, brushCrate];
          const points = [...crates, sticky];
          if (new Set(points.map(({ x, y }) => `${x},${y}`)).size !== 4) continue;
          mutations.push({
            id: `gate_top_${top[i]!.x}_${top[j]!.x}_brush_${brushCrate.x}_sticky_${sticky.x}_${sticky.y}`,
            edits: [
              ...clearEdits,
              ...crates.map((point) => ({ ...point, glyph: isGoalGlyph(rows[point.y]![point.x]!) ? "*" : "C" })),
              { ...sticky, glyph: isGoalGlyph(rows[sticky.y]![sticky.x]!) ? "m" : "M" },
            ],
          });
        }
      }
    }
  }
}

const requiredOnce = [
  "pull_object:crate#",
  "pull_object:sticky#",
  "force_chain",
  "move_sticky_rigid",
  "sticky_to_box:n2",
];

let solved = 0;
let shortestQualified = 0;
let graphQualified = 0;
const selectedMutations = mutations.filter((_, index) => index % shardCount === shardIndex);
for (const mutation of selectedMutations) {
  const next = rows.map((row) => [...row]);
  for (const edit of mutation.edits) next[edit.y]![edit.x] = edit.glyph;
  const layout = next.map((row) => row.join("")).join("\n");
  let initial;
  try {
    initial = adapter.parseLevel(level(layout, mutation.id));
  } catch {
    continue;
  }
  const solution = solveWithRuntime(runtime, initial, {
    winCondition: pkg.mechanic.win,
    maxStates: maxSolveStates,
    maxDepth: 120,
  });
  if (!solution.found || solution.cost === undefined) continue;
  solved += 1;
  const shiftCount = count(solution.events, "anchor_boundary_shift:box_sticky");
  const brush2Count = count(solution.events, "box_to_sticky:n2");
  if (shiftCount < 4 || brush2Count < 2 || !requiredOnce.every((pattern) => count(solution.events, pattern) >= 1)) continue;
  shortestQualified += 1;
  const graph = analyzeGraphWithRuntime(runtime, initial, {
    winCondition: pkg.mechanic.win,
    maxStates: maxGraphStates,
  });
  if (graph.status !== "complete" || graph.winStateCount !== 1) continue;
  graphQualified += 1;
  console.log(`HIT ${mutation.id} cost=${solution.cost} states=${graph.reachableStateCount} wins=${graph.winStateCount} shifts=${shiftCount} brush2=${brush2Count}`);
  console.log(layout);
  console.log(`inputs=${solution.inputs.join(" ")}`);
  console.log(`events=${solution.events.join(" ")}`);
}
console.error(`SUMMARY mode=${mode} mutations=${mutations.length} shard=${shardIndex}/${shardCount} selected=${selectedMutations.length} solved=${solved} shortestQualified=${shortestQualified} graphQualified=${graphQualified}`);

function count(events: string[], pattern: string): number {
  return events.filter((event) => pattern.endsWith("#") ? event.startsWith(pattern) : eventMatchesPattern(event, pattern)).length;
}

function level(layout: string, suffix: string): LevelDoc {
  return {
    id: `RA_STRICT_CENTRAL_ORDER_LOCK_${suffix}`,
    title: "RA_STRICT_CENTRAL_ORDER_LOCK",
    role: "challenge",
    status: "candidate",
    targets: [],
    known_before: ["K_runtime_smoke"],
    target_learning: ["K_runtime_smoke"],
    support_level: "none",
    expected_solver_evidence: ["solvable"],
    expected_llm_player_evidence: [],
    layout,
  };
}

function findGlyph(grid: string[][], glyph: string): { x: number; y: number } | undefined {
  for (let y = 0; y < grid.length; y += 1) {
    const x = grid[y]!.indexOf(glyph);
    if (x >= 0) return { x, y };
  }
  return undefined;
}

function isGoalGlyph(glyph: string): boolean {
  return glyph === "G" || glyph === "*" || glyph === "m" || glyph === "+";
}
