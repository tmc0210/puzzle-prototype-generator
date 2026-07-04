import { writeFile } from "node:fs/promises";
import path from "node:path";
import { loadPrototypePackage } from "../../../src/core/io.js";
import { eventMatchesPattern } from "../../../src/core/events.js";
import { findUncoveredGoalPathWithRuntime, solveWithRuntime } from "../../../src/core/solver.js";
import { getRuntimeAdapter } from "../../../src/prototypes/runtimeAdapter.js";
import type { LevelDoc, Point, PrototypePackage, WinCondition } from "../../../src/core/types.js";
import type { PuzzleRuntime } from "../../../src/core/puzzleRuntime.js";

type PointTuple = [number, number];
type Action = "up" | "down" | "left" | "right";

type Variant = {
  name: string;
  layout: string;
  A: PointTuple;
  B: PointTuple;
  C: PointTuple;
  D: PointTuple;
  note: string;
};

type ProbeRow = {
  name: string;
  note: string;
  A: PointTuple;
  B: PointTuple;
  C: PointTuple;
  D: PointTuple;
  baseSolved: boolean;
  baseCost?: number;
  baseEvents: string[];
  baseNoLate: boolean;
  baseLateHits: string[];
  baseRequiresD4: boolean;
  metaSolved: boolean;
  metaCost?: number;
  metaEvents: string[];
  metaRequiresD6Restart: boolean;
  metaRequiresD4: boolean;
  metaLConsumption: boolean;
  metaLConsumptionReason: string;
  pairRisk: string[];
};

const forbiddenLate = [
  "ice_pass_through_d5",
  "slide_restart_after_group",
  "ice_destroy_group_d6_plus",
];

async function main(): Promise<void> {
  const pkg = await loadPrototypePackage("prototypes/ice_slide_escape");
  const variants = buildVariants();
  const rows: ProbeRow[] = [];
  for (const variant of variants) {
    rows.push(await probeVariant(pkg, variant));
  }
  const markdown = formatReport(rows);
  const outPath = path.join(
    "prototypes",
    "ice_slide_escape",
    "reports",
    "worker_round54_lshape_probe_scan.md",
  );
  await writeFile(outPath, markdown, "utf8");
  console.log(markdown);
}

function buildVariants(): Variant[] {
  const v1 = [
    "###########.###",
    "###########I###",
    "###########.###",
    "###########.###",
    "###########.###",
    "###########.###",
    "###########.###",
    "###########.###",
    "###############",
    "####........###",
    "..#.*....*..###",
    "....#.....#####",
    "#######.#.#####",
  ].join("\n");

  const variants: Variant[] = [
    {
      name: "v1_bottom_D",
      layout: v1,
      A: [0, 10],
      B: [7, 12],
      C: [11, 0],
      D: [9, 12],
      note: "竖向 d6 产物落到 T2 右侧，但 D 在底边下支路，检查是否会被 d6 后 walk 直达。",
    },
    {
      name: "v1_left_D",
      layout: v1,
      A: [0, 10],
      B: [7, 12],
      C: [11, 0],
      D: [0, 10],
      note: "同一 L 核，把 D 移到左边，检查是否能迫使 T2 回封后离开。",
    },
    {
      name: "v1_top_return_D",
      layout: setCells(v1, [
        [[8, 0], "."],
        [[8, 1], "."],
        [[8, 2], "."],
        [[8, 3], "."],
        [[8, 4], "."],
        [[8, 5], "."],
        [[8, 6], "."],
        [[8, 7], "."],
        [[8, 8], "."],
      ]),
      A: [0, 10],
      B: [7, 12],
      C: [11, 0],
      D: [8, 0],
      note: "给 T1 回封后的右侧增加一条顶边出口，尝试让 D 位于回封后玩家侧。",
    },
    {
      name: "v1_right_after_T2_D",
      layout: setCells(v1, [
        [[12, 10], "."],
        [[13, 10], "."],
        [[14, 10], "."],
      ]),
      A: [0, 10],
      B: [7, 12],
      C: [11, 0],
      D: [14, 10],
      note: "打开 T2 右侧边界，测试 D 是否能在 T2/产物动作后成为右侧出口。",
    },
    {
      name: "v1_lower_cut_D",
      layout: setCells(v1, [
        [[7, 12], "."],
        [[8, 11], "#"],
        [[9, 11], "."],
        [[9, 12], "."],
      ]),
      A: [0, 10],
      B: [7, 12],
      C: [11, 0],
      D: [9, 12],
      note: "切断下支路左侧连通，尝试使 D 只能通过 T2 空目标入口进入。",
    },
  ];

  return variants;
}

async function probeVariant(pkg: PrototypePackage, variant: Variant): Promise<ProbeRow> {
  const adapter = getRuntimeAdapter(pkg.mechanic);
  const runtime = adapter.createRuntime(pkg.mechanic) as PuzzleRuntime<any, Action, any>;
  const baseInitial = adapter.parseLevel(levelFor(variant.layout, variant.A, variant.B));
  const metaInitial = adapter.parseLevel(levelFor(variant.layout, variant.C, variant.D));
  const baseWin = win(variant.A, variant.B);
  const metaWin = win(variant.C, variant.D);
  const base = solveWithRuntime(runtime, baseInitial, {
    winCondition: baseWin,
    maxStates: 120000,
    maxDepth: 180,
  });
  const meta = solveWithRuntime(runtime, metaInitial, {
    winCondition: metaWin,
    maxStates: 180000,
    maxDepth: 240,
  });
  const baseReach = scanReachableEvents(runtime, baseInitial, forbiddenLate, {
    winCondition: baseWin,
    maxStates: 120000,
    maxDepth: 180,
  });
  const baseMissingD4 = findUncoveredGoalPathWithRuntime(
    runtime,
    baseInitial,
    ["ice_rebound_d4"],
    [],
    { winCondition: baseWin, maxStates: 120000, maxDepth: 180 },
  );
  const metaMissingD6Restart = findUncoveredGoalPathWithRuntime(
    runtime,
    metaInitial,
    ["ice_destroy_group_d6_plus", "slide_restart_after_group"],
    [],
    { winCondition: metaWin, maxStates: 180000, maxDepth: 240 },
  );
  const metaMissingD4 = findUncoveredGoalPathWithRuntime(
    runtime,
    metaInitial,
    ["ice_rebound_d4"],
    [],
    { winCondition: metaWin, maxStates: 180000, maxDepth: 240 },
  );
  const pairRisk = await pairGoalRisk(pkg, variant);
  const consumption = checkLConsumption(meta.steps as Array<{ input: Action; events: string[] }>);
  return {
    name: variant.name,
    note: variant.note,
    A: variant.A,
    B: variant.B,
    C: variant.C,
    D: variant.D,
    baseSolved: base.found,
    baseCost: base.found ? base.cost : undefined,
    baseEvents: base.events,
    baseNoLate: baseReach.status === "complete" && baseReach.hits.length === 0,
    baseLateHits: baseReach.hits,
    baseRequiresD4: base.found && !baseMissingD4.found && baseMissingD4.searchStatus === "complete",
    metaSolved: meta.found,
    metaCost: meta.found ? meta.cost : undefined,
    metaEvents: meta.events,
    metaRequiresD6Restart:
      meta.found && !metaMissingD6Restart.found && metaMissingD6Restart.searchStatus === "complete",
    metaRequiresD4: meta.found && !metaMissingD4.found && metaMissingD4.searchStatus === "complete",
    metaLConsumption: consumption.ok,
    metaLConsumptionReason: consumption.reason,
    pairRisk,
  };
}

async function pairGoalRisk(pkg: PrototypePackage, variant: Variant): Promise<string[]> {
  const adapter = getRuntimeAdapter(pkg.mechanic);
  const runtime = adapter.createRuntime(pkg.mechanic) as PuzzleRuntime<any, Action, any>;
  const starts = [
    ["A", variant.A],
    ["B", variant.B],
    ["C", variant.C],
    ["D", variant.D],
  ] as const;
  const goals = [
    ["A", variant.A],
    ["B", variant.B],
    ["C", variant.C],
    ["D", variant.D],
  ] as const;
  const risks: string[] = [];
  for (const [startName, start] of starts) {
    for (const [goalName, goal] of goals) {
      if (startName === goalName) {
        continue;
      }
      if ((startName === "A" && goalName === "B") || (startName === "C" && goalName === "D")) {
        continue;
      }
      const initial = adapter.parseLevel(levelFor(variant.layout, start, goal));
      const solution = solveWithRuntime(runtime, initial, {
        winCondition: win(start, goal),
        maxStates: 60000,
        maxDepth: 160,
      });
      if (solution.found) {
        risks.push(`${startName}->${goalName}:cost${solution.cost}`);
      }
    }
  }
  return risks;
}

function checkLConsumption(steps: Array<{ input: Action; events: string[] }>): { ok: boolean; reason: string } {
  let firstD6Step = -1;
  const pushSteps: Array<{ step: number; dir: Action; events: string[] }> = [];
  for (let step = 0; step < steps.length; step += 1) {
    const stepEvents = steps[step]!.events;
    if (stepEvents.includes("push_ice")) {
      pushSteps.push({ step, dir: steps[step]!.input, events: stepEvents });
    }
    if (
      firstD6Step === -1 &&
      stepEvents.some((event) => eventMatchesPattern(event, "ice_destroy_group_d6_plus")) &&
      stepEvents.some((event) => eventMatchesPattern(event, "slide_restart_after_group"))
    ) {
      firstD6Step = step;
    }
  }
  if (firstD6Step === -1) {
    return { ok: false, reason: "返回解没有 d6/restart 步" };
  }
  const firstDir = steps[firstD6Step]!.input;
  const laterPushes = pushSteps.filter((item) => item.step > firstD6Step);
  const crossAxis = laterPushes.filter((item) => item.dir !== firstDir);
  const reboundOrIceBlock = crossAxis.filter((item) =>
    item.events.some((event) => eventMatchesPattern(event, "ice_rebound_d4")) ||
    item.events.some((event) => eventMatchesPattern(event, "ice_blocks_ice_no_chain_push")),
  );
  if (reboundOrIceBlock.length === 0) {
    return {
      ok: false,
      reason: `d6 后有 ${laterPushes.length} 次后续推冰，换轴且含 d4/ice-block 的消费为 0`,
    };
  }
  return {
    ok: true,
    reason: `d6 后存在 ${reboundOrIceBlock.length} 次换轴 d4/ice-block 推冰`,
  };
}

function scanReachableEvents<State, Options extends { maxStates?: number; maxDepth?: number; winCondition?: WinCondition }>(
  runtime: PuzzleRuntime<State, Action, Options>,
  initial: State,
  forbidden: string[],
  options: Options,
): { status: "complete" | "exhausted"; hits: string[] } {
  const maxStates = options.maxStates ?? 100000;
  const queue: Array<{ state: State; depth: number }> = [{ state: initial, depth: 0 }];
  const visited = new Set<string>([runtime.key(initial)]);
  const hits = new Set<string>();
  let cursor = 0;
  while (cursor < queue.length) {
    const current = queue[cursor]!;
    cursor += 1;
    if (options.maxDepth !== undefined && current.depth >= options.maxDepth) {
      continue;
    }
    for (const action of runtime.actions(current.state, options)) {
      const result = runtime.step(current.state, action, options);
      for (const event of result.events) {
        if (forbidden.some((pattern) => eventMatchesPattern(event, pattern))) {
          hits.add(event);
        }
      }
      if (!result.legal) {
        continue;
      }
      const key = runtime.key(result.state);
      if (visited.has(key)) {
        continue;
      }
      visited.add(key);
      if (visited.size > maxStates) {
        return { status: "exhausted", hits: [...hits].sort() };
      }
      queue.push({ state: result.state, depth: current.depth + 1 });
    }
  }
  return { status: "complete", hits: [...hits].sort() };
}

function levelFor(layout: string, start: PointTuple, goal: PointTuple): LevelDoc {
  return {
    id: "worker_round54_lshape_probe",
    title: "worker_round54_lshape_probe",
    role: "challenge",
    status: "candidate",
    targets: [],
    known_before: [],
    target_learning: [],
    support_level: "none",
    expected_solver_evidence: ["solvable"],
    expected_llm_player_evidence: [],
    layout,
    win: win(start, goal),
  };
}

function win(start: PointTuple, goal: PointTuple): WinCondition {
  return {
    type: "ice_slide_escape_explicit_goal",
    player_start: start,
    player_goal: goal,
  };
}

function setCells(layout: string, edits: Array<[PointTuple, string]>): string {
  const rows = layout.split("\n").map((row) => row.split(""));
  for (const [[x, y], value] of edits) {
    rows[y]![x] = value;
  }
  return rows.map((row) => row.join("")).join("\n");
}

function formatPoint(point: PointTuple): string {
  return `[${point[0]},${point[1]}]`;
}

function formatReport(rows: ProbeRow[]): string {
  const lines = [
    "# worker_round54_lshape probe scan",
    "",
    "```yaml",
    "reviewer_called: false",
    "critic_called: false",
    "scope: fixed_l_shape_core_interface_and_isolation_scan",
    "```",
    "",
    "## 摘要表",
    "",
    "| variant | base | base no-late | base d4 req | meta | meta d6/restart req | meta d4 req | L 消费 | pair risk |",
    "| --- | --- | --- | --- | --- | --- | --- | --- | --- |",
    ...rows.map((row) =>
      [
        row.name,
        row.baseSolved ? `yes/${row.baseCost}` : "no",
        row.baseNoLate ? "yes" : `no:${row.baseLateHits.slice(0, 3).join(",")}`,
        row.baseRequiresD4 ? "yes" : "no",
        row.metaSolved ? `yes/${row.metaCost}` : "no",
        row.metaRequiresD6Restart ? "yes" : "no",
        row.metaRequiresD4 ? "yes" : "no",
        row.metaLConsumption ? "yes" : `no:${row.metaLConsumptionReason}`,
        row.pairRisk.join("; ") || "none",
      ].join(" | ").replace(/^/, "| ").replace(/$/, " |"),
    ),
    "",
    "## 逐项读法",
    "",
    ...rows.flatMap((row) => [
      `### ${row.name}`,
      "",
      `- 接口: A=${formatPoint(row.A)}, B=${formatPoint(row.B)}, C=${formatPoint(row.C)}, D=${formatPoint(row.D)}`,
      `- 设计备注: ${row.note}`,
      `- base events: ${row.baseEvents.join(" ") || "none"}`,
      `- meta events: ${row.metaEvents.join(" ") || "none"}`,
      `- L 消费判断: ${row.metaLConsumptionReason}`,
      `- pair risk: ${row.pairRisk.join("; ") || "none"}`,
      "",
    ]),
  ];
  return `${lines.join("\n").trimEnd()}\n`;
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.stack ?? error.message : error);
  process.exitCode = 1;
});
