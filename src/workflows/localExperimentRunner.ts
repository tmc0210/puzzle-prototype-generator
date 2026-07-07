import { enumerateRuntimeGraph } from "../core/runtimeGraph.js";
import type { RuntimeSearchOptions } from "../core/puzzleRuntime.js";
import type { LevelDoc, PrototypePackage, WinCondition } from "../core/types.js";
import { getRuntimeAdapter, type CurrentRuntimeAdapter } from "../prototypes/runtimeAdapter.js";

export type LocalExperimentDefaults = {
  maxExploreDepth?: number;
  maxReturnDepth?: number;
  maxStates?: number;
  maxTransitions?: number;
  disabledRules?: string[];
  disabledBranches?: string[];
  win?: WinCondition;
};

export type LocalExperimentCaseDoc = {
  id: string;
  family?: string;
  variant?: string;
  changedVariable?: string;
  contrastWith?: string[];
  title?: string;
  question?: string;
  notes?: string;
  layout: string;
  actions?: string[];
  maxExploreDepth?: number;
  maxReturnDepth?: number;
  maxStates?: number;
  maxTransitions?: number;
  disabledRules?: string[];
  disabledBranches?: string[];
  win?: WinCondition;
};

export type LocalExperimentCasesDoc = {
  runId?: string;
  title?: string;
  notes?: string;
  defaults?: LocalExperimentDefaults;
  cases: LocalExperimentCaseDoc[];
};

export type LocalExperimentCounterfactual = {
  disabledRules: string[];
  disabledBranches: string[];
};

export type LocalExperimentBudgets = {
  maxExploreDepth: number;
  maxReturnDepth: number;
  maxStates: number;
  maxTransitions?: number;
};

export type LocalStateSnapshot = {
  key: string;
  render: string;
  isWin: boolean;
};

export type LocalReplayStep = {
  step: number;
  action: string;
  legal: boolean;
  reason?: string;
  events: string[];
  eventWin: boolean;
  before: LocalStateSnapshot;
  after: LocalStateSnapshot;
};

export type LocalActionTableEntry = {
  action: string;
  legal: boolean;
  reason?: string;
  events: string[];
  eventWin: boolean;
  nextKey?: string;
  nextRender?: string;
};

export type LocalReturnSearch = {
  found: boolean;
  status: "found" | "complete" | "exhausted" | "not_applicable";
  path: string[];
  depth?: number;
  exploredStates: number;
  maxDepth: number;
  reason?: string;
};

export type LocalReachableSummary = {
  status: "complete" | "exhausted";
  reason?: string;
  reachableStates: number;
  legalTransitions: number;
  winStates: number;
  maxObservedDepth: number;
  eventTypes: string[];
  eventCounts: Record<string, number>;
};

export type LocalChangedCell = {
  x: number;
  y: number;
  before: string;
  after: string;
};

export type LocalExperimentCaseResult = {
  id: string;
  family?: string;
  variant?: string;
  changedVariable?: string;
  contrastWith?: string[];
  title?: string;
  question?: string;
  notes?: string;
  layout: string;
  actions: string[];
  stoppedAtIllegalAction: boolean;
  winCondition: WinCondition;
  counterfactual: LocalExperimentCounterfactual;
  budgets: LocalExperimentBudgets;
  initial: LocalStateSnapshot;
  final: LocalStateSnapshot;
  steps: LocalReplayStep[];
  finalActionTable: LocalActionTableEntry[];
  returnToInitial: LocalReturnSearch;
  reachableFromInitial: LocalReachableSummary;
  changedCells: LocalChangedCell[];
};

export type LocalExperimentFamilyCaseSummary = {
  id: string;
  variant?: string;
  changedVariable?: string;
  contrastWith?: string[];
  returnToInitial: string;
  finalLegalActions: string[];
  finalIllegalActions: string[];
  reachableStatus: LocalReachableSummary["status"];
  reachableStates: number;
  graphComplete: boolean;
};

export type LocalExperimentFamilySummary = {
  family: string;
  cases: LocalExperimentFamilyCaseSummary[];
};

export type LocalExperimentReport = {
  runId: string;
  title?: string;
  notes?: string;
  prototype: string;
  generatedAt: string;
  families: LocalExperimentFamilySummary[];
  cases: LocalExperimentCaseResult[];
};

type LocalRuntimeOptions = RuntimeSearchOptions & {
  disabledRules?: Set<string>;
  disabledBranches?: Set<string>;
};

type ReturnQueueItem = {
  state: unknown;
  key: string;
  path: string[];
  depth: number;
};

export function parseLocalExperimentCasesDoc(
  raw: unknown,
  source: string,
): LocalExperimentCasesDoc {
  const doc = record(raw, source);
  const casesRaw = doc.cases;
  if (!Array.isArray(casesRaw)) {
    throw new Error(`${source} must contain a cases array.`);
  }

  return {
    runId: optionalString(doc.runId, `${source}.runId`),
    title: optionalString(doc.title, `${source}.title`),
    notes: optionalString(doc.notes, `${source}.notes`),
    defaults: doc.defaults === undefined ? undefined : parseDefaults(doc.defaults, `${source}.defaults`),
    cases: casesRaw.map((item, index) => parseCase(item, `${source}.cases[${index}]`)),
  };
}

export function runLocalExperimentCases(
  pkg: PrototypePackage,
  doc: LocalExperimentCasesDoc,
): LocalExperimentReport {
  const adapter = getRuntimeAdapter(pkg.mechanic);
  const runtime = adapter.createRuntime(pkg.mechanic);
  const defaults = doc.defaults ?? {};
  const cases = doc.cases.map((caseDoc) => runCase(pkg, adapter, runtime, defaults, caseDoc));

  return {
    runId: doc.runId ?? "ad_hoc",
    title: doc.title,
    notes: doc.notes,
    prototype: pkg.mechanic.id,
    generatedAt: new Date().toISOString(),
    families: summarizeFamilies(cases),
    cases,
  };
}

export function formatLocalExperimentMarkdown(report: LocalExperimentReport): string {
  const lines: string[] = [];
  lines.push(`# 机制局部实验: ${report.runId}`);
  lines.push("");
  lines.push(`- 原型: ${report.prototype}`);
  lines.push(`- 生成时间: ${report.generatedAt}`);
  if (report.title) {
    lines.push(`- 标题: ${report.title}`);
  }
  if (report.notes) {
    lines.push(`- 备注: ${report.notes}`);
  }

  if (report.families.length > 0) {
    lines.push("");
    lines.push("## 结构族摘要");
    for (const family of report.families) {
      lines.push("");
      lines.push(`### ${family.family}`);
      lines.push("| case | variant | changed variable | contrast | return | final legal | final illegal | graph |");
      lines.push("| --- | --- | --- | --- | --- | --- | --- | --- |");
      for (const item of family.cases) {
        lines.push(
          `| ${md(item.id)} | ${md(item.variant ?? "-")} | ${md(item.changedVariable ?? "-")} | ${md(item.contrastWith?.join(", ") ?? "-")} | ${md(item.returnToInitial)} | ${md(item.finalLegalActions.join(", ") || "-")} | ${md(item.finalIllegalActions.join(", ") || "-")} | ${item.graphComplete ? "complete" : md(item.reachableStatus)} / ${item.reachableStates} states |`,
        );
      }
    }
  }

  for (const caseResult of report.cases) {
    lines.push("");
    lines.push(`## ${caseResult.id}${caseResult.title ? `: ${caseResult.title}` : ""}`);
    if (caseResult.family || caseResult.variant || caseResult.changedVariable || caseResult.contrastWith) {
      lines.push("");
      lines.push(`结构族: ${caseResult.family ?? "-"}`);
      lines.push(`变体: ${caseResult.variant ?? "-"}`);
      lines.push(`变化变量: ${caseResult.changedVariable ?? "-"}`);
      lines.push(`对照: ${caseResult.contrastWith?.join(", ") ?? "-"}`);
    }
    if (caseResult.question) {
      lines.push("");
      lines.push(`问题: ${caseResult.question}`);
    }
    if (caseResult.notes) {
      lines.push(`备注: ${caseResult.notes}`);
    }
    lines.push(`动作序列: ${caseResult.actions.length > 0 ? caseResult.actions.join(" ") : "(无)"}`);
    lines.push(`反事实禁用: ${formatCounterfactual(caseResult.counterfactual)}`);
    lines.push(
      `预算: exploreDepth=${caseResult.budgets.maxExploreDepth}, returnDepth=${caseResult.budgets.maxReturnDepth}, maxStates=${caseResult.budgets.maxStates}` +
        (caseResult.budgets.maxTransitions === undefined
          ? ""
          : `, maxTransitions=${caseResult.budgets.maxTransitions}`),
    );
    lines.push("");
    lines.push("layout:");
    lines.push("```text");
    lines.push(caseResult.layout);
    lines.push("```");
    lines.push("");
    lines.push("初始状态:");
    lines.push("```text");
    lines.push(caseResult.initial.render);
    lines.push("```");

    if (caseResult.steps.length > 0) {
      lines.push("");
      lines.push("动作回放:");
      for (const step of caseResult.steps) {
        const status = step.legal ? "legal" : `illegal${step.reason ? ` (${step.reason})` : ""}`;
        lines.push(
          `- ${step.step}. ${step.action}: ${status}; events=${formatList(step.events)}; eventWin=${step.eventWin ? "yes" : "no"}`,
        );
        lines.push("```text");
        lines.push(step.after.render);
        lines.push("```");
      }
      if (caseResult.stoppedAtIllegalAction) {
        lines.push("- 后续动作未继续回放，因为动作序列中出现 illegal step。");
      }
    }

    lines.push("");
    lines.push("最终状态:");
    lines.push("```text");
    lines.push(caseResult.final.render);
    lines.push("```");
    lines.push(
      `变化格: ${caseResult.changedCells.length === 0 ? "无" : formatChangedCells(caseResult.changedCells)}`,
    );

    lines.push("");
    lines.push("最终状态动作表:");
    lines.push("| action | legal | events | next / reason |");
    lines.push("| --- | --- | --- | --- |");
    for (const entry of caseResult.finalActionTable) {
      const next = entry.legal
        ? `${entry.nextKey ?? "(no key)"}${entry.eventWin ? " / event-win" : ""}`
        : entry.reason ?? "illegal";
      lines.push(
        `| ${md(entry.action)} | ${entry.legal ? "yes" : "no"} | ${md(formatList(entry.events))} | ${md(next)} |`,
      );
    }

    lines.push("");
    lines.push(`回到初始: ${formatReturnSearch(caseResult.returnToInitial)}`);
    lines.push(
      `局部可达图: status=${caseResult.reachableFromInitial.status}, states=${caseResult.reachableFromInitial.reachableStates}, transitions=${caseResult.reachableFromInitial.legalTransitions}, winStates=${caseResult.reachableFromInitial.winStates}, maxDepth=${caseResult.reachableFromInitial.maxObservedDepth}`,
    );
    if (caseResult.reachableFromInitial.reason) {
      lines.push(`可达图停止原因: ${caseResult.reachableFromInitial.reason}`);
    }
    lines.push(`事件类型: ${formatEventCounts(caseResult.reachableFromInitial.eventCounts)}`);
  }

  lines.push("");
  return `${lines.join("\n")}\n`;
}

function runCase(
  pkg: PrototypePackage,
  adapter: CurrentRuntimeAdapter,
  runtime: ReturnType<CurrentRuntimeAdapter["createRuntime"]>,
  defaults: LocalExperimentDefaults,
  caseDoc: LocalExperimentCaseDoc,
): LocalExperimentCaseResult {
  const winCondition = caseDoc.win ?? defaults.win ?? pkg.mechanic.win;
  const options = buildOptions(defaults, caseDoc, winCondition);
  const counterfactual = buildCounterfactual(defaults, caseDoc);
  const budgets = buildBudgets(defaults, caseDoc);
  const level = caseToLevel(caseDoc, winCondition);
  const initial = adapter.parseLevel(level);
  let current = initial;
  const steps: LocalReplayStep[] = [];
  let stoppedAtIllegalAction = false;

  for (const [index, rawAction] of (caseDoc.actions ?? []).entries()) {
    const before = snapshot(adapter, runtime, current, winCondition);
    const transition = runtime.step(current, rawAction, options);
    const afterState = transition.legal ? transition.state : current;
    const after = snapshot(adapter, runtime, afterState, winCondition);
    steps.push({
      step: index + 1,
      action: rawAction,
      legal: transition.legal,
      reason: transition.reason,
      events: transition.events,
      eventWin: adapter.isEventWin(transition.events, winCondition),
      before,
      after,
    });
    current = afterState;
    if (!transition.legal) {
      stoppedAtIllegalAction = true;
      break;
    }
  }

  const initialSnapshot = snapshot(adapter, runtime, initial, winCondition);
  const finalSnapshot = snapshot(adapter, runtime, current, winCondition);
  const graph = enumerateRuntimeGraph(runtime, initial, winCondition, options, {
    maxStates: budgets.maxStates,
    maxTransitions: budgets.maxTransitions,
    maxDepth: budgets.maxExploreDepth,
  });
  const eventCounts = countGraphEvents(graph.edges);

  return {
    id: caseDoc.id,
    family: caseDoc.family,
    variant: caseDoc.variant,
    changedVariable: caseDoc.changedVariable,
    contrastWith: caseDoc.contrastWith,
    title: caseDoc.title,
    question: caseDoc.question,
    notes: caseDoc.notes,
    layout: caseDoc.layout,
    actions: caseDoc.actions ?? [],
    stoppedAtIllegalAction,
    winCondition,
    counterfactual,
    budgets,
    initial: initialSnapshot,
    final: finalSnapshot,
    steps,
    finalActionTable: buildActionTable(adapter, runtime, current, options, winCondition),
    returnToInitial: stoppedAtIllegalAction
      ? notApplicableReturnSearch(
          budgets.maxReturnDepth,
          "replay stopped at illegal action; return search skipped",
        )
      : searchReturnToKey(runtime, current, initialSnapshot.key, options, {
          maxDepth: budgets.maxReturnDepth,
          maxStates: budgets.maxStates,
        }),
    reachableFromInitial: {
      status: graph.status,
      reason: graph.reason,
      reachableStates: graph.keys.length,
      legalTransitions: graph.edges.length,
      winStates: graph.winStateIndexes.size,
      maxObservedDepth: Math.max(0, ...graph.depthByIndex),
      eventTypes: Object.keys(eventCounts).sort(),
      eventCounts,
    },
    changedCells: diffRenderedStates(initialSnapshot.render, finalSnapshot.render),
  };
}

function buildBudgets(
  defaults: LocalExperimentDefaults,
  caseDoc: LocalExperimentCaseDoc,
): LocalExperimentBudgets {
  return {
    maxExploreDepth: caseDoc.maxExploreDepth ?? defaults.maxExploreDepth ?? 14,
    maxReturnDepth: caseDoc.maxReturnDepth ?? defaults.maxReturnDepth ?? 24,
    maxStates: caseDoc.maxStates ?? defaults.maxStates ?? 20_000,
    maxTransitions: caseDoc.maxTransitions ?? defaults.maxTransitions ?? 80_000,
  };
}

function summarizeFamilies(cases: LocalExperimentCaseResult[]): LocalExperimentFamilySummary[] {
  const byFamily = new Map<string, LocalExperimentCaseResult[]>();
  for (const caseResult of cases) {
    if (!caseResult.family) {
      continue;
    }
    byFamily.set(caseResult.family, [...(byFamily.get(caseResult.family) ?? []), caseResult]);
  }

  return [...byFamily.entries()].map(([family, familyCases]) => ({
    family,
    cases: familyCases.map((caseResult) => ({
      id: caseResult.id,
      variant: caseResult.variant,
      changedVariable: caseResult.changedVariable,
      contrastWith: caseResult.contrastWith,
      returnToInitial: returnOutcomeLabel(caseResult.returnToInitial),
      finalLegalActions: caseResult.finalActionTable
        .filter((entry) => entry.legal)
        .map((entry) => entry.action),
      finalIllegalActions: caseResult.finalActionTable
        .filter((entry) => !entry.legal)
        .map((entry) => `${entry.action}:${entry.reason ?? "illegal"}`),
      reachableStatus: caseResult.reachableFromInitial.status,
      reachableStates: caseResult.reachableFromInitial.reachableStates,
      graphComplete: caseResult.reachableFromInitial.status === "complete",
    })),
  }));
}

function returnOutcomeLabel(search: LocalReturnSearch): string {
  if (search.status === "not_applicable") {
    return `not applicable${search.reason ? `: ${search.reason}` : ""}`;
  }
  if (search.found) {
    return `yes depth=${search.depth ?? 0}`;
  }
  if (search.status === "complete") {
    return "no complete";
  }
  return `unknown exhausted${search.reason ? `: ${search.reason}` : ""}`;
}

function formatReturnSearch(search: LocalReturnSearch): string {
  if (search.status === "not_applicable") {
    return `not applicable (${search.reason ?? "return search skipped"})`;
  }
  if (search.found) {
    return `yes, depth=${search.depth ?? 0}, path=${search.path.join(" ")}`;
  }
  if (search.status === "complete") {
    return `no (complete${search.reason ? `: ${search.reason}` : ""})`;
  }
  return `unknown (${search.status}${search.reason ? `: ${search.reason}` : ""}; 不可当作 no)`;
}

function notApplicableReturnSearch(maxDepth: number, reason: string): LocalReturnSearch {
  return {
    found: false,
    status: "not_applicable",
    path: [],
    exploredStates: 0,
    maxDepth,
    reason,
  };
}

function buildOptions(
  defaults: LocalExperimentDefaults,
  caseDoc: LocalExperimentCaseDoc,
  winCondition: WinCondition,
): LocalRuntimeOptions {
  const disabledRules = mergeStrings(defaults.disabledRules, caseDoc.disabledRules);
  const disabledBranches = mergeStrings(defaults.disabledBranches, caseDoc.disabledBranches);
  return {
    winCondition,
    ...(disabledRules.length > 0 ? { disabledRules: new Set(disabledRules) } : {}),
    ...(disabledBranches.length > 0 ? { disabledBranches: new Set(disabledBranches) } : {}),
  };
}

function buildCounterfactual(
  defaults: LocalExperimentDefaults,
  caseDoc: LocalExperimentCaseDoc,
): LocalExperimentCounterfactual {
  return {
    disabledRules: mergeStrings(defaults.disabledRules, caseDoc.disabledRules),
    disabledBranches: mergeStrings(defaults.disabledBranches, caseDoc.disabledBranches),
  };
}

function mergeStrings(left: string[] | undefined, right: string[] | undefined): string[] {
  return [...new Set([...(left ?? []), ...(right ?? [])])];
}

function caseToLevel(caseDoc: LocalExperimentCaseDoc, winCondition: WinCondition): LevelDoc {
  return {
    id: caseDoc.id,
    title: caseDoc.title ?? caseDoc.id,
    role: "mechanic_witness",
    status: "scratch",
    targets: [],
    known_before: [],
    target_learning: [],
    support_level: "none",
    expected_solver_evidence: [],
    expected_llm_player_evidence: [],
    layout: caseDoc.layout,
    win: winCondition,
  };
}

function snapshot(
  adapter: CurrentRuntimeAdapter,
  runtime: ReturnType<CurrentRuntimeAdapter["createRuntime"]>,
  state: unknown,
  winCondition: WinCondition,
): LocalStateSnapshot {
  return {
    key: runtime.key(state),
    render: adapter.renderState(state),
    isWin: runtime.isWin(state, winCondition),
  };
}

function buildActionTable(
  adapter: CurrentRuntimeAdapter,
  runtime: ReturnType<CurrentRuntimeAdapter["createRuntime"]>,
  state: unknown,
  options: LocalRuntimeOptions,
  winCondition: WinCondition,
): LocalActionTableEntry[] {
  return runtime.actions(state, options).map((action: string) => {
    const transition = runtime.step(state, action, options);
    const eventWin = adapter.isEventWin(transition.events, winCondition);
    if (!transition.legal) {
      return {
        action,
        legal: false,
        reason: transition.reason,
        events: transition.events,
        eventWin,
      };
    }
    return {
      action,
      legal: true,
      events: transition.events,
      eventWin,
      nextKey: runtime.key(transition.state),
      nextRender: adapter.renderState(transition.state),
    };
  });
}

function searchReturnToKey(
  runtime: ReturnType<CurrentRuntimeAdapter["createRuntime"]>,
  startState: unknown,
  targetKey: string,
  options: LocalRuntimeOptions,
  budget: { maxDepth: number; maxStates: number },
): LocalReturnSearch {
  const startKey = runtime.key(startState);
  if (startKey === targetKey) {
    return {
      found: true,
      status: "found",
      path: [],
      depth: 0,
      exploredStates: 1,
      maxDepth: budget.maxDepth,
    };
  }

  const queue: ReturnQueueItem[] = [{ state: startState, key: startKey, path: [], depth: 0 }];
  const visited = new Set<string>([startKey]);
  let cursor = 0;
  let depthLimitHit = false;

  while (cursor < queue.length) {
    const current = queue[cursor]!;
    cursor += 1;

    if (current.depth >= budget.maxDepth) {
      depthLimitHit = true;
      continue;
    }

    for (const action of runtime.actions(current.state, options)) {
      const transition = runtime.step(current.state, action, options);
      if (!transition.legal) {
        continue;
      }
      const nextKey = runtime.key(transition.state);
      const nextPath = [...current.path, action];
      if (nextKey === targetKey) {
        return {
          found: true,
          status: "found",
          path: nextPath,
          depth: current.depth + 1,
          exploredStates: visited.size + 1,
          maxDepth: budget.maxDepth,
        };
      }
      if (visited.has(nextKey)) {
        continue;
      }
      visited.add(nextKey);
      if (visited.size > budget.maxStates) {
        return {
          found: false,
          status: "exhausted",
          path: [],
          exploredStates: visited.size,
          maxDepth: budget.maxDepth,
          reason: "state budget exceeded",
        };
      }
      queue.push({
        state: transition.state,
        key: nextKey,
        path: nextPath,
        depth: current.depth + 1,
      });
    }
  }

  return {
    found: false,
    status: depthLimitHit ? "exhausted" : "complete",
    path: [],
    exploredStates: visited.size,
    maxDepth: budget.maxDepth,
    reason: depthLimitHit ? "depth budget exceeded" : "search complete",
  };
}

function countGraphEvents(edges: Array<{ events: string[] }>): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const edge of edges) {
    for (const event of edge.events) {
      counts[event] = (counts[event] ?? 0) + 1;
    }
  }
  return counts;
}

function diffRenderedStates(before: string, after: string): LocalChangedCell[] {
  const beforeRows = before.split("\n");
  const afterRows = after.split("\n");
  const height = Math.max(beforeRows.length, afterRows.length);
  const width = Math.max(
    ...beforeRows.map((row) => row.length),
    ...afterRows.map((row) => row.length),
    0,
  );
  const changed: LocalChangedCell[] = [];

  for (let y = 0; y < height; y += 1) {
    const beforeRow = beforeRows[y] ?? "";
    const afterRow = afterRows[y] ?? "";
    for (let x = 0; x < width; x += 1) {
      const beforeGlyph = beforeRow[x] ?? " ";
      const afterGlyph = afterRow[x] ?? " ";
      if (beforeGlyph !== afterGlyph) {
        changed.push({ x, y, before: beforeGlyph, after: afterGlyph });
      }
    }
  }

  return changed;
}

function parseDefaults(raw: unknown, source: string): LocalExperimentDefaults {
  const value = record(raw, source);
  return {
    maxExploreDepth: optionalNumber(value.maxExploreDepth, `${source}.maxExploreDepth`),
    maxReturnDepth: optionalNumber(value.maxReturnDepth, `${source}.maxReturnDepth`),
    maxStates: optionalNumber(value.maxStates, `${source}.maxStates`),
    maxTransitions: optionalNumber(value.maxTransitions, `${source}.maxTransitions`),
    disabledRules: optionalStringArray(value.disabledRules, `${source}.disabledRules`),
    disabledBranches: optionalStringArray(value.disabledBranches, `${source}.disabledBranches`),
    win: optionalWinCondition(value.win, `${source}.win`),
  };
}

function parseCase(raw: unknown, source: string): LocalExperimentCaseDoc {
  const value = record(raw, source);
  return {
    id: requiredString(value.id, `${source}.id`),
    family: optionalString(value.family, `${source}.family`),
    variant: optionalString(value.variant, `${source}.variant`),
    changedVariable: optionalString(
      value.changedVariable ?? value.changed_variable,
      `${source}.changedVariable`,
    ),
    contrastWith: optionalStringList(
      value.contrastWith ?? value.contrast_with,
      `${source}.contrastWith`,
    ),
    title: optionalString(value.title, `${source}.title`),
    question: optionalString(value.question, `${source}.question`),
    notes: optionalString(value.notes, `${source}.notes`),
    layout: requiredString(value.layout, `${source}.layout`).replace(/\r/g, "").replace(/\n+$/g, ""),
    actions: optionalStringArray(value.actions, `${source}.actions`),
    maxExploreDepth: optionalNumber(value.maxExploreDepth, `${source}.maxExploreDepth`),
    maxReturnDepth: optionalNumber(value.maxReturnDepth, `${source}.maxReturnDepth`),
    maxStates: optionalNumber(value.maxStates, `${source}.maxStates`),
    maxTransitions: optionalNumber(value.maxTransitions, `${source}.maxTransitions`),
    disabledRules: optionalStringArray(value.disabledRules, `${source}.disabledRules`),
    disabledBranches: optionalStringArray(value.disabledBranches, `${source}.disabledBranches`),
    win: optionalWinCondition(value.win, `${source}.win`),
  };
}

function record(raw: unknown, source: string): Record<string, unknown> {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) {
    throw new Error(`${source} must be an object.`);
  }
  return raw as Record<string, unknown>;
}

function requiredString(raw: unknown, source: string): string {
  if (typeof raw !== "string" || raw.length === 0) {
    throw new Error(`${source} must be a non-empty string.`);
  }
  return raw;
}

function optionalString(raw: unknown, source: string): string | undefined {
  if (raw === undefined) {
    return undefined;
  }
  if (typeof raw !== "string") {
    throw new Error(`${source} must be a string.`);
  }
  return raw;
}

function optionalNumber(raw: unknown, source: string): number | undefined {
  if (raw === undefined) {
    return undefined;
  }
  if (typeof raw !== "number" || !Number.isFinite(raw)) {
    throw new Error(`${source} must be a finite number.`);
  }
  return raw;
}

function optionalStringArray(raw: unknown, source: string): string[] | undefined {
  if (raw === undefined) {
    return undefined;
  }
  if (!Array.isArray(raw) || raw.some((item) => typeof item !== "string")) {
    throw new Error(`${source} must be an array of strings.`);
  }
  return raw as string[];
}

function optionalStringList(raw: unknown, source: string): string[] | undefined {
  if (raw === undefined) {
    return undefined;
  }
  if (typeof raw === "string") {
    return [raw];
  }
  if (!Array.isArray(raw) || raw.some((item) => typeof item !== "string")) {
    throw new Error(`${source} must be a string or an array of strings.`);
  }
  return raw as string[];
}

function optionalWinCondition(raw: unknown, source: string): WinCondition | undefined {
  if (raw === undefined) {
    return undefined;
  }
  const value = record(raw, source);
  if (typeof value.type !== "string" || value.type.length === 0) {
    throw new Error(`${source}.type must be a non-empty string.`);
  }
  return value as WinCondition;
}

function formatCounterfactual(counterfactual: LocalExperimentCounterfactual): string {
  const parts: string[] = [];
  if (counterfactual.disabledRules.length > 0) {
    parts.push(`rules=${counterfactual.disabledRules.join(",")}`);
  }
  if (counterfactual.disabledBranches.length > 0) {
    parts.push(`branches=${counterfactual.disabledBranches.join(",")}`);
  }
  return parts.length > 0 ? parts.join("; ") : "无";
}

function formatList(values: string[]): string {
  return values.length === 0 ? "-" : values.join(",");
}

function formatEventCounts(counts: Record<string, number>): string {
  const entries = Object.entries(counts).sort(([left], [right]) => left.localeCompare(right));
  return entries.length === 0
    ? "无"
    : entries.map(([event, count]) => `${event}=${count}`).join(", ");
}

function formatChangedCells(cells: LocalChangedCell[]): string {
  const sample = cells
    .slice(0, 12)
    .map((cell) => `(${cell.x},${cell.y}) ${cell.before}->${cell.after}`)
    .join("; ");
  return cells.length > 12 ? `${sample}; ... 共 ${cells.length}` : sample;
}

function md(value: string): string {
  return value.replace(/\|/g, "\\|").replace(/\n/g, "<br>");
}
