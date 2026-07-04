import { loadPrototypePackage } from "../../../src/core/io.js";
import { eventMatchesPattern } from "../../../src/core/events.js";
import { solveWithRuntime } from "../../../src/core/solver.js";
import { analyzeLevel } from "../../../src/workflows/levelAnalyzer.js";
import { getRuntimeAdapter } from "../../../src/prototypes/runtimeAdapter.js";
import { compareIceSlideStarts } from "../../../src/prototypes/ice_slide_escape/tools/startComparison.js";
import type { LevelDoc, WinCondition } from "../../../src/core/types.js";

type Pt = [number, number];

const pkg = await loadPrototypePackage("prototypes/ice_slide_escape");
const adapter = getRuntimeAdapter(pkg.mechanic);
const runtime = adapter.createRuntime(pkg.mechanic);

const maxStates = Number(process.argv[2] ?? 120000);
const maxDepth = Number(process.argv[3] ?? 180);
const lateForbidden = ["ice_pass_through_d5", "slide_restart_after_group", "ice_destroy_group_d6_plus"];

function key(p: Pt): string {
  return `${p[0]},${p[1]}`;
}

function same(a: Pt, b: Pt): boolean {
  return a[0] === b[0] && a[1] === b[1];
}

function eventType(e: string): string {
  return e.split(":")[0]!;
}

function has(events: string[], pattern: string): boolean {
  return events.some((event) => eventMatchesPattern(event, pattern));
}

function count(events: string[], type: string): number {
  return events.filter((event) => eventType(event) === type).length;
}

function levelFor(id: string, layout: string, start: Pt, goal: Pt): LevelDoc {
  return {
    id,
    title: id,
    role: "challenge",
    status: "candidate",
    targets: [],
    known_before: [],
    target_learning: [],
    support_level: "none",
    expected_solver_evidence: ["solvable"],
    expected_llm_player_evidence: [],
    layout,
    win: {
      type: "ice_slide_escape_explicit_goal",
      player_start: start,
      player_goal: goal,
    } satisfies WinCondition,
  };
}

function ch(layout: string, p: Pt): string {
  return layout.split("\n")[p[1]]![p[0]]!;
}

function edgeCells(layout: string): Pt[] {
  const rows = layout.split("\n");
  const out: Pt[] = [];
  for (let y = 0; y < rows.length; y += 1) {
    for (let x = 0; x < rows[0]!.length; x += 1) {
      if (x === 0 || y === 0 || x === rows[0]!.length - 1 || y === rows.length - 1) {
        out.push([x, y]);
      }
    }
  }
  return out;
}

function standableEdgeStarts(layout: string): Pt[] {
  return edgeCells(layout).filter((p) => {
    const c = ch(layout, p);
    return c !== "#" && c !== "I" && c !== "*";
  });
}

function hasTargetDebt(analysis: any, targets: Pt[]): boolean {
  const snapshots = analysis.keySnapshots ?? [];
  for (const snap of snapshots) {
    for (const target of targets) {
      const before = snap.before?.split("\n")?.[target[1]]?.[target[0]];
      const after = snap.after?.split("\n")?.[target[1]]?.[target[0]];
      if (before === "G" || after === "G") return true;
    }
  }
  return false;
}

function build(row4Left: number, row5Left: number, row6Left: number, rightLowerMask: number): string {
  const rows = Array.from({ length: 8 }, () => Array.from({ length: 18 }, () => "#"));

  // Core row: A/D side, target T, base d3 stopper O, right-side Q/C.
  for (const x of [0, 1, 2, 3, 5, 6, 7, 9, 10, 11, 12, 13, 14, 15, 17]) rows[3]![x] = ".";
  rows[3]![4] = "*";
  rows[3]![8] = "#";
  rows[3]![16] = "I";

  // Middle access is fixed on the core side; left bits decide whether D-side is reachable.
  for (const x of [4, 5, 6, 7]) rows[4]![x] = ".";
  for (let x = 0; x <= 3; x += 1) {
    if ((row4Left & (1 << x)) !== 0) rows[4]![x] = ".";
  }

  // Lower gate row: P is the base refill ice and meta lower gate.
  rows[5]![4] = "I";
  for (let x = 0; x <= 3; x += 1) {
    if ((row5Left & (1 << x)) !== 0) rows[5]![x] = ".";
  }
  for (let x = 5; x <= 17; x += 1) {
    if ((rightLowerMask & (1 << (x - 5))) !== 0) rows[5]![x] = ".";
  }

  // Stand-below / lower detour row.
  for (let x = 0; x <= 3; x += 1) {
    if ((row6Left & (1 << x)) !== 0) rows[6]![x] = ".";
  }
  for (let x = 4; x <= 16; x += 1) rows[6]![x] = ".";

  return rows.map((row) => row.join("")).join("\n");
}

function quickSolve(layout: string, start: Pt, goal: Pt) {
  try {
    const level = levelFor(`r53_quick_${key(start)}_${key(goal)}`, layout, start, goal);
    const initial = adapter.parseLevel(level);
    return solveWithRuntime(runtime, initial, {
      winCondition: level.win,
      maxStates: Math.min(maxStates, 40000),
      maxDepth,
    });
  } catch {
    return undefined;
  }
}

function fullAnalyze(layout: string, start: Pt, goal: Pt) {
  return analyzeLevel(pkg, levelFor(`r53_full_${key(start)}_${key(goal)}`, layout, start, goal), {
    maxStates,
    maxDepth,
    graphMaxStates: maxStates,
    bypassMaxStates: maxStates,
  });
}

const hits: any[] = [];
let checked = 0;
let baseGatePass = 0;
let metaDebt = 0;

const row4Options = [0b0000, 0b0001, 0b0011, 0b1000, 0b1111];
const row5Options = [0b0000, 0b0001, 0b0011, 0b0111, 0b1111];
const row6Options = [0b0000, 0b0001, 0b0011, 0b1111];
const rightOptions = [0b1111111111111, 0b0111111111111, 0b1111111111100];

for (const row4 of row4Options) {
  for (const row5 of row5Options) {
    for (const row6 of row6Options) {
      for (const rightMask of rightOptions) {
        const layout = build(row4, row5, row6, rightMask);
        const possibleStarts = [
          [0, 3],
          [0, 5],
          [3, 0],
          [17, 3],
          [17, 5],
          [4, 7],
          [16, 7],
        ] as Pt[];
        const possibleGoals = [
          [0, 3],
          [0, 5],
          [3, 0],
          [17, 3],
          [17, 5],
          [4, 7],
          [16, 7],
        ] as Pt[];
        const starts = possibleStarts.filter((p) => {
          try {
            const c = ch(layout, p);
            return c !== "#" && c !== "I" && c !== "*";
          } catch {
            return false;
          }
        });
        const goals = possibleGoals;
        const pairs: any[] = [];
        for (const start of starts) {
          for (const goal of goals) {
            if (same(start, goal)) continue;
            const sol = quickSolve(layout, start, goal);
            if (!sol?.found || count(sol.events, "push_ice") < 2) continue;
            pairs.push({ start, goal, sol });
          }
        }
        checked += 1;
        if (pairs.length < 2) continue;

        for (const basePair of pairs) {
          const be = basePair.sol.events as string[];
          if (!has(be, "ice_destroyed_d3") || !has(be, "ice_stop_short")) continue;
          if (lateForbidden.some((p) => has(be, p))) continue;

          let baseGate;
          try {
            baseGate = compareIceSlideStarts(pkg, layout, {
              id: "r53_skeleton_base_gate",
              title: "r53_skeleton_base_gate",
              role: "challenge",
              supportLevel: "none",
              targets: [],
              playerGoal: basePair.goal,
              starts: [basePair.start],
              requiredWinningEvents: ["ice_destroyed_d3", "ice_stop_short"],
              forbiddenWinningEvents: lateForbidden,
              forbiddenReachableEvents: lateForbidden,
              maxStates,
              maxDepth,
              graphMaxStates: maxStates,
            });
          } catch {
            continue;
          }
          if (baseGate.starts[0]?.machineGate !== "pass") continue;
          baseGatePass += 1;

          let baseAnalysis;
          try {
            baseAnalysis = fullAnalyze(layout, basePair.start, basePair.goal);
          } catch {
            continue;
          }
          if (!hasTargetDebt(baseAnalysis, [[4, 3]])) continue;

          for (const metaPair of pairs) {
            const interfaces = [basePair.start, basePair.goal, metaPair.start, metaPair.goal];
            if (new Set(interfaces.map(key)).size !== 4) continue;
            const me = metaPair.sol.events as string[];
            if (!has(me, "ice_destroy_group_d6_plus") || !has(me, "slide_restart_after_group")) continue;
            if (count(me, "push_ice") < 2) continue;
            let metaAnalysis;
            try {
              metaAnalysis = fullAnalyze(layout, metaPair.start, metaPair.goal);
            } catch {
              continue;
            }
            if (metaAnalysis.graph.status !== "complete") continue;
            const metaHasDebt = hasTargetDebt(metaAnalysis, [[4, 3]]);
            if (!metaHasDebt) continue;
            metaDebt += 1;

            const metaTypes = [...new Set(me.map(eventType).filter((e) => e !== "walk"))].sort();
            const score =
              count(be, "push_ice") * 10 +
              count(me, "push_ice") * 14 +
              metaTypes.length * 12 +
              Math.min(basePair.sol.cost, 40) +
              Math.min(metaPair.sol.cost, 50) -
              (basePair.start[0] === metaPair.start[0] && basePair.start[1] === metaPair.start[1] ? 50 : 0);

            hits.push({
              score,
              layout,
              A: basePair.start,
              B: basePair.goal,
              C: metaPair.start,
              D: metaPair.goal,
              masks: { row4, row5, row6, rightMask },
              base: {
                cost: basePair.sol.cost,
                inputs: basePair.sol.inputs,
                events: be,
                graph: {
                  status: baseAnalysis.graph.status,
                  states: baseAnalysis.graph.reachableStateCount,
                  wins: baseAnalysis.graph.winStateCount,
                },
                commitments: baseAnalysis.agency?.solutionCommitmentCount,
                gate: baseGate.starts[0],
              },
              meta: {
                cost: metaPair.sol.cost,
                inputs: metaPair.sol.inputs,
                events: me,
                graph: {
                  status: metaAnalysis.graph.status,
                  states: metaAnalysis.graph.reachableStateCount,
                  wins: metaAnalysis.graph.winStateCount,
                },
                commitments: metaAnalysis.agency?.solutionCommitmentCount,
              },
            });
          }
        }
      }
    }
  }
}

hits.sort((a, b) => b.score - a.score);
console.log(JSON.stringify({ checked, baseGatePass, metaDebt, hitCount: hits.length, top: hits.slice(0, 20) }, null, 2));
