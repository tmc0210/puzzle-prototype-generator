import type { LevelDoc, LevelRole, Point, PrototypePackage, SupportLevel, WinCondition } from "../../../core/types.js";
import { analyzeLevel, type LevelAnalysis } from "../../../workflows/levelAnalyzer.js";
import { eventMatchesPattern } from "../../../core/events.js";
import { getRuntimeAdapter } from "../../runtimeAdapter.js";
import { findUncoveredGoalPathWithRuntime } from "../../../core/solver.js";

type PointTuple = [number, number];

export type IceSlideStartComparisonOptions = {
  id: string;
  title: string;
  role: LevelRole;
  supportLevel: SupportLevel;
  targets: string[];
  playerGoal: PointTuple;
  starts?: PointTuple[];
  requiredEvents: string[];
  forbiddenEvents: string[];
  reportEvents: string[];
  maxStates?: number;
  maxDepth?: number;
  graphMaxStates?: number;
};

export type ReachableEventScan = {
  status: "complete" | "exhausted";
  reachableStates: number;
  legalTransitions: number;
  eventOnlyIllegalTransitions: number;
  eventCounts: Record<string, number>;
  reportHits: string[];
  reason?: string;
};

export type StartComparisonRow = {
  playerStart: PointTuple;
  legalStart: boolean;
  error?: string;
  solvable: boolean;
  cost?: number;
  inputs: string[];
  returnedEvents: string[];
  returnedRequiredCovered: boolean;
  returnedForbiddenHits: string[];
  graphStatus?: string;
  reachableStates?: number;
  winningStates?: number;
  initialScc?: {
    states: number;
    out: number;
    winOut: number;
    deadOut: number;
    dist: number | null;
  };
  solutionScc?: {
    shape: string;
    irreversibleSteps: number;
    forcedWinPrefix: number;
  };
  firstStepLegalEvents: string[];
  winningPathMissingRequired?: GoalPathProbe;
  winningPathWithForbidden?: GoalPathProbe;
  winningPathMissingRequiredOrWithForbidden?: GoalPathProbe;
  reachableEventScan?: ReachableEventScan;
  machineGate: "pass" | "fail" | "unknown";
  machineGateReasons: string[];
};

export type GoalPathProbe = {
  checked: boolean;
  found: boolean;
  cost?: number;
  inputs?: string[];
  events?: string[];
  exploredStates: number;
  searchStatus?: string;
  reason?: string;
};

export type IceSlideStartComparisonReport = {
  prototype: string;
  id: string;
  playerGoal: PointTuple;
  requiredEvents: string[];
  forbiddenEvents: string[];
  reportEvents: string[];
  starts: StartComparisonRow[];
};

export function compareIceSlideStarts(
  pkg: PrototypePackage,
  layout: string,
  options: IceSlideStartComparisonOptions,
): IceSlideStartComparisonReport {
  if (pkg.mechanic.id !== "ice_slide_escape") {
    throw new Error("compare-starts-layout 目前只支持 ice_slide_escape");
  }

  const starts = options.starts ?? enumerateEdgeStarts(layout);
  const rows = starts.map((start) => compareSingleStart(pkg, layout, options, start));

  return {
    prototype: pkg.mechanic.id,
    id: options.id,
    playerGoal: options.playerGoal,
    requiredEvents: options.requiredEvents,
    forbiddenEvents: options.forbiddenEvents,
    reportEvents: options.reportEvents,
    starts: rows,
  };
}

function compareSingleStart(
  pkg: PrototypePackage,
  layout: string,
  options: IceSlideStartComparisonOptions,
  playerStart: PointTuple,
): StartComparisonRow {
  const level = buildLevel(layout, options, playerStart);

  try {
    const analysis = analyzeLevel(pkg, level, {
      maxStates: options.maxStates,
      maxDepth: options.maxDepth,
      graphMaxStates: options.graphMaxStates,
      bypassMaxStates: options.graphMaxStates ?? options.maxStates,
    });
    const adapter = getRuntimeAdapter(pkg.mechanic);
    const runtime = adapter.createRuntime(pkg.mechanic);
    const initial = adapter.parseLevel(level);
    const winCondition = level.win ?? pkg.mechanic.win;
    const firstStepLegalEvents = collectFirstStepLegalEvents(runtime, initial, {
      winCondition,
      maxStates: options.maxStates,
      maxDepth: options.maxDepth,
    });
    const reachableEventScan = scanReachableEvents(runtime, initial, options.reportEvents, {
      winCondition,
      maxStates: options.graphMaxStates ?? options.maxStates,
      maxDepth: options.maxDepth,
    });
    const winningPathMissingRequired =
      options.requiredEvents.length > 0
        ? toGoalPathProbe(
            findUncoveredGoalPathWithRuntime(
              runtime,
              initial,
              options.requiredEvents,
              [],
              {
                winCondition,
                maxStates: options.graphMaxStates ?? options.maxStates,
                maxDepth: options.maxDepth,
              },
            ),
          )
        : undefined;
    const winningPathWithForbidden =
      options.forbiddenEvents.length > 0
        ? toGoalPathProbe(
            findUncoveredGoalPathWithRuntime(
              runtime,
              initial,
              [],
              options.forbiddenEvents,
              {
                winCondition,
                maxStates: options.graphMaxStates ?? options.maxStates,
                maxDepth: options.maxDepth,
              },
            ),
          )
        : undefined;
    const winningPathMissingRequiredOrWithForbidden =
      options.requiredEvents.length > 0 || options.forbiddenEvents.length > 0
        ? toGoalPathProbe(
            findUncoveredGoalPathWithRuntime(
              runtime,
              initial,
              options.requiredEvents,
              options.forbiddenEvents,
              {
                winCondition,
                maxStates: options.graphMaxStates ?? options.maxStates,
                maxDepth: options.maxDepth,
              },
            ),
          )
        : undefined;

    const row = buildRow({
      playerStart,
      analysis,
      firstStepLegalEvents,
      reachableEventScan,
      requiredEvents: options.requiredEvents,
      forbiddenEvents: options.forbiddenEvents,
      winningPathMissingRequired,
      winningPathWithForbidden,
      winningPathMissingRequiredOrWithForbidden,
    });
    return row;
  } catch (error) {
    return {
      playerStart,
      legalStart: false,
      error: error instanceof Error ? error.message : String(error),
      solvable: false,
      inputs: [],
      returnedEvents: [],
      returnedRequiredCovered: false,
      returnedForbiddenHits: [],
      firstStepLegalEvents: [],
      machineGate: "fail",
      machineGateReasons: ["start is not a valid solve instance"],
    };
  }
}

function buildLevel(
  layout: string,
  options: IceSlideStartComparisonOptions,
  playerStart: PointTuple,
): LevelDoc {
  return {
    id: `${options.id}_start_${playerStart[0]}_${playerStart[1]}`,
    title: `${options.title} start ${formatPoint(playerStart)}`,
    role: options.role,
    status: "candidate",
    targets: options.targets,
    known_before: [],
    target_learning: options.targets,
    support_level: options.supportLevel,
    expected_solver_evidence: ["solvable"],
    expected_llm_player_evidence: [],
    layout,
    win: {
      type: "ice_slide_escape_explicit_goal",
      player_start: playerStart,
      player_goal: options.playerGoal,
    } satisfies WinCondition,
  };
}

function buildRow(input: {
  playerStart: PointTuple;
  analysis: LevelAnalysis;
  firstStepLegalEvents: string[];
  reachableEventScan: ReachableEventScan;
  requiredEvents: string[];
  forbiddenEvents: string[];
  winningPathMissingRequired?: GoalPathProbe;
  winningPathWithForbidden?: GoalPathProbe;
  winningPathMissingRequiredOrWithForbidden?: GoalPathProbe;
}): StartComparisonRow {
  const forbiddenHits = uniqueEventsMatching(input.analysis.solution.events, input.forbiddenEvents);
  const returnedRequiredCovered = input.requiredEvents.every((pattern) =>
    input.analysis.solution.events.some((event) => eventMatchesPattern(event, pattern)),
  );
  const initialScc = input.analysis.agency.scc?.initialScc;
  const scc = input.analysis.agency.scc;
  const machineGateReasons: string[] = [];

  if (!input.analysis.solution.found) {
    machineGateReasons.push("该显式起终点不可解");
  }
  if (input.analysis.solution.found && !returnedRequiredCovered) {
    machineGateReasons.push("返回解未覆盖全部 required events");
  }
  if (forbiddenHits.length > 0) {
    machineGateReasons.push("返回解触发 forbidden events");
  }
  if (input.winningPathMissingRequired?.found) {
    machineGateReasons.push("存在缺少 required events 的胜利路径");
  }
  if (input.winningPathWithForbidden?.found) {
    machineGateReasons.push("存在触发 forbidden events 的胜利路径");
  }
  if (input.reachableEventScan.status !== "complete") {
    machineGateReasons.push("可达事件扫描未完成");
  }
  if (input.reachableEventScan.reportHits.length > 0) {
    machineGateReasons.push("可达图中出现 report-only events");
  }

  const machineGate =
    machineGateReasons.length === 0
      ? "pass"
      : input.reachableEventScan.status === "complete"
        ? "fail"
        : "unknown";

  return {
    playerStart: input.playerStart,
    legalStart: true,
    solvable: input.analysis.solution.found,
    cost: input.analysis.solution.found ? input.analysis.solution.cost : undefined,
    inputs: input.analysis.solution.inputs,
    returnedEvents: input.analysis.solution.events,
    returnedRequiredCovered,
    returnedForbiddenHits: forbiddenHits,
    graphStatus: input.analysis.graph.status,
    reachableStates: input.analysis.graph.reachableStateCount,
    winningStates: input.analysis.graph.winStateCount,
    initialScc: initialScc
      ? {
          states: initialScc.stateCount,
          out: initialScc.outgoingCount,
          winOut: initialScc.winReachableOutgoingCount,
          deadOut: initialScc.deadOutgoingCount,
          dist: initialScc.distanceToWin,
        }
      : undefined,
    solutionScc: scc
      ? {
          shape: scc.winSubgraphShape,
          irreversibleSteps: scc.solutionIrreversibleStepCount,
          forcedWinPrefix: scc.forcedWinContinuationPrefixLength,
        }
      : undefined,
    firstStepLegalEvents: input.firstStepLegalEvents,
    winningPathMissingRequired: input.winningPathMissingRequired,
    winningPathWithForbidden: input.winningPathWithForbidden,
    winningPathMissingRequiredOrWithForbidden: input.winningPathMissingRequiredOrWithForbidden,
    reachableEventScan: input.reachableEventScan,
    machineGate,
    machineGateReasons,
  };
}

function collectFirstStepLegalEvents<State, Action extends string, Options extends { winCondition?: WinCondition }>(
  runtime: {
    actions: (state: State, options: Options) => Action[];
    step: (
      state: State,
      action: Action,
      options: Options,
    ) => { legal: boolean; events: string[] };
  },
  initial: State,
  options: Options,
): string[] {
  const events: string[] = [];
  for (const action of runtime.actions(initial, options)) {
    const result = runtime.step(initial, action, options);
    if (result.legal) {
      events.push(...result.events);
    }
  }
  return [...new Set(events)].sort();
}

function scanReachableEvents<State, Action extends string, Options extends { winCondition?: WinCondition; maxStates?: number; maxDepth?: number }>(
  runtime: {
    key: (state: State) => string;
    actions: (state: State, options: Options) => Action[];
    step: (
      state: State,
      action: Action,
      options: Options,
    ) => { legal: boolean; state: State; events: string[] };
  },
  initial: State,
  reportEvents: string[],
  options: Options,
): ReachableEventScan {
  const maxStates = options.maxStates ?? 100_000;
  const queue: Array<{ state: State; depth: number }> = [{ state: initial, depth: 0 }];
  const visited = new Set<string>([runtime.key(initial)]);
  const eventCounts: Record<string, number> = {};
  const reportHits = new Set<string>();
  let cursor = 0;
  let legalTransitions = 0;
  let eventOnlyIllegalTransitions = 0;

  while (cursor < queue.length) {
    const current = queue[cursor]!;
    cursor += 1;

    if (options.maxDepth !== undefined && current.depth >= options.maxDepth) {
      continue;
    }

    for (const action of runtime.actions(current.state, options)) {
      const result = runtime.step(current.state, action, options);
      countEvents(result.events, eventCounts);
      collectReportHits(result.events, reportEvents, reportHits);

      if (!result.legal) {
        if (result.events.length > 0) {
          eventOnlyIllegalTransitions += 1;
        }
        continue;
      }

      legalTransitions += 1;
      const key = runtime.key(result.state);
      if (visited.has(key)) {
        continue;
      }
      visited.add(key);
      if (visited.size > maxStates) {
        return {
          status: "exhausted",
          reachableStates: visited.size,
          legalTransitions,
          eventOnlyIllegalTransitions,
          eventCounts,
          reportHits: [...reportHits].sort(),
          reason: `state budget exceeded (${maxStates})`,
        };
      }
      queue.push({ state: result.state, depth: current.depth + 1 });
    }
  }

  return {
    status: "complete",
    reachableStates: visited.size,
    legalTransitions,
    eventOnlyIllegalTransitions,
    eventCounts,
    reportHits: [...reportHits].sort(),
  };
}

function enumerateEdgeStarts(layout: string): PointTuple[] {
  const lines = layout.replace(/\r/g, "").replace(/\n+$/g, "").split("\n");
  if (lines.length === 0 || lines[0] === undefined || lines[0].length === 0) {
    throw new Error("layout is empty");
  }
  const width = lines[0].length;
  if (lines.some((line) => line.length !== width)) {
    throw new Error("layout must be rectangular");
  }
  const starts: PointTuple[] = [];
  for (let y = 0; y < lines.length; y += 1) {
    const line = lines[y]!;
    for (let x = 0; x < width; x += 1) {
      const onEdge = x === 0 || y === 0 || x === width - 1 || y === lines.length - 1;
      if (!onEdge) {
        continue;
      }
      const glyph = line[x]!;
      if (glyph !== "#" && glyph !== "I" && glyph !== "*") {
        starts.push([x, y]);
      }
    }
  }
  return starts;
}

function toGoalPathProbe(solution: {
  found: boolean;
  cost: number;
  inputs: string[];
  events: string[];
  exploredStates: number;
  searchStatus?: string;
  reason?: string;
}): GoalPathProbe {
  return {
    checked: true,
    found: solution.found,
    cost: solution.found ? solution.cost : undefined,
    inputs: solution.found ? solution.inputs : undefined,
    events: solution.found ? solution.events : undefined,
    exploredStates: solution.exploredStates,
    searchStatus: solution.searchStatus,
    reason: solution.reason,
  };
}

function countEvents(events: string[], counts: Record<string, number>): void {
  for (const event of events) {
    counts[event] = (counts[event] ?? 0) + 1;
  }
}

function collectReportHits(events: string[], patterns: string[], hits: Set<string>): void {
  for (const event of events) {
    if (patterns.some((pattern) => eventMatchesPattern(event, pattern))) {
      hits.add(event);
    }
  }
}

function uniqueEventsMatching(events: string[], patterns: string[]): string[] {
  const matches = new Set<string>();
  for (const event of events) {
    if (patterns.some((pattern) => eventMatchesPattern(event, pattern))) {
      matches.add(event);
    }
  }
  return [...matches].sort();
}

export function formatIceSlideStartComparisonMarkdown(
  report: IceSlideStartComparisonReport,
): string {
  const lines: string[] = [
    `# 冰原起点比较：${report.id}`,
    "",
    "## 摘要",
    "",
    `- Prototype: ${report.prototype}`,
    `- 玩家终点: ${formatPoint(report.playerGoal)}`,
    `- Required events: ${report.requiredEvents.join(", ") || "none"}`,
    `- Forbidden events: ${report.forbiddenEvents.join(", ") || "none"}`,
    `- Report-only events: ${report.reportEvents.join(", ") || "none"}`,
    `- 已检查起点: ${report.starts.length}`,
    "",
    "## 起点表",
    "",
    "| 起点 | 机器闸门 | 可解 | Cost | Required 覆盖 | 返回解 forbidden | 可达 report hits | Graph | Initial SCC | Solution SCC | 原因 |",
    "| --- | --- | --- | ---: | --- | --- | --- | --- | --- | --- | --- |",
    ...report.starts.map(formatStartRow),
    "",
    "## 细节",
    "",
    ...report.starts.flatMap(formatStartDetails),
  ];

  return `${lines.join("\n").trimEnd()}\n`;
}

function formatStartRow(row: StartComparisonRow): string {
  return [
    formatPoint(row.playerStart),
    row.machineGate,
    row.solvable ? "yes" : "no",
    row.cost ?? "n/a",
    row.returnedRequiredCovered ? "yes" : "no",
    row.returnedForbiddenHits.join(", ") || "none",
    row.reachableEventScan?.reportHits.join(", ") || "none",
    row.graphStatus
      ? `${row.graphStatus}, states=${row.reachableStates ?? "n/a"}, wins=${row.winningStates ?? "n/a"}`
      : "n/a",
    row.initialScc
      ? `states=${row.initialScc.states}, out=${row.initialScc.out}, winOut=${row.initialScc.winOut}, deadOut=${row.initialScc.deadOut}, dist=${row.initialScc.dist ?? "n/a"}`
      : "n/a",
    row.solutionScc
      ? `${row.solutionScc.shape}, forced=${row.solutionScc.forcedWinPrefix}/${row.solutionScc.irreversibleSteps}`
      : "n/a",
    row.machineGateReasons.join("; ") || "none",
  ].map(escapeCell).join(" | ").replace(/^/, "| ").replace(/$/, " |");
}

function formatStartDetails(row: StartComparisonRow): string[] {
  const lines = [
    `### 起点 ${formatPoint(row.playerStart)}`,
    "",
    `- 合法起点: ${row.legalStart}`,
    ...(row.error ? [`- Error: ${row.error}`] : []),
    `- 机器闸门: ${row.machineGate}`,
    `- 闸门原因: ${row.machineGateReasons.join("; ") || "none"}`,
    `- 第一步合法事件: ${row.firstStepLegalEvents.join(", ") || "none"}`,
    `- Inputs: ${row.inputs.join(" ") || "none"}`,
    `- 返回解事件: ${row.returnedEvents.join(" ") || "none"}`,
    "",
    "胜利路径探针：",
    "",
    `- 缺少 required events 的胜利路径: ${formatGoalPathProbe(row.winningPathMissingRequired)}`,
    `- 触发 forbidden events 的胜利路径: ${formatGoalPathProbe(row.winningPathWithForbidden)}`,
    `- 缺少 required 或触发 forbidden 的胜利路径: ${formatGoalPathProbe(row.winningPathMissingRequiredOrWithForbidden)}`,
    "",
    "可达事件扫描：",
    "",
    ...formatReachableEventScan(row.reachableEventScan),
    "",
  ];
  return lines;
}

function formatGoalPathProbe(probe: GoalPathProbe | undefined): string {
  if (!probe) {
    return "未检查";
  }
  if (probe.found) {
    return `找到，cost=${probe.cost}, inputs=${probe.inputs?.join(" ") ?? "n/a"}, events=${probe.events?.join(" ") ?? "none"}`;
  }
  if (probe.searchStatus === "complete") {
    return `未找到；完整搜索，explored=${probe.exploredStates}`;
  }
  return `未知；status=${probe.searchStatus ?? "unknown"}, explored=${probe.exploredStates}, reason=${probe.reason ?? "none"}`;
}

function formatReachableEventScan(scan: ReachableEventScan | undefined): string[] {
  if (!scan) {
    return ["- 未检查"];
  }
  return [
    `- Status: ${scan.status}`,
    `- 可达状态: ${scan.reachableStates}`,
    `- 合法转移: ${scan.legalTransitions}`,
    `- 仅事件非法转移: ${scan.eventOnlyIllegalTransitions}`,
    `- Report hits: ${scan.reportHits.join(", ") || "none"}`,
    `- 事件计数: ${formatEventCounts(scan.eventCounts)}`,
    ...(scan.reason ? [`- Reason: ${scan.reason}`] : []),
  ];
}

function formatEventCounts(counts: Record<string, number>): string {
  const entries = Object.entries(counts);
  if (entries.length === 0) {
    return "none";
  }
  return entries.map(([event, count]) => `${event}=${count}`).join(", ");
}

function formatPoint(point: PointTuple): string {
  return `[${point[0]},${point[1]}]`;
}

function escapeCell(value: string | number | boolean): string {
  return String(value).replaceAll("|", "\\|").replace(/\n/g, " ");
}
