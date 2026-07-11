import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { eventMatchesPattern } from "../../../src/core/events.js";
import { loadPrototypePackage } from "../../../src/core/io.js";
import { solveWithRuntime } from "../../../src/core/solver.js";
import type { InputId, LevelDoc } from "../../../src/core/types.js";
import { getRuntimeAdapter } from "../../../src/prototypes/runtimeAdapter.js";

const prototypePath = "prototypes/reality_anchor";
const layoutPath = process.argv[2]
  ?? "prototypes/Reality_Anchor/reports/RA_FRESH_2026_07_10_ROLE_RELAY_REWEAVE_v1.layout.txt";
const outId = process.argv[3] ?? "RA_FRESH_2026_07_10_ROLE_RELAY_REWEAVE_v1";
const maxStates = Number(process.argv[4] ?? 100_000);
const maxDepth = Number(process.argv[5] ?? 100);

const pkg = await loadPrototypePackage(prototypePath);
const adapter = getRuntimeAdapter(pkg.mechanic);
const runtime = adapter.createRuntime(pkg.mechanic);
const source = (await readFile(layoutPath, "utf8")).replace(/\r/g, "").replace(/\n+$/g, "");
const rows = source.split("\n");
const start = findChar(rows, "@");
const dots = findAll(rows, ".");

const baseline = analyze("baseline", source);
if (!baseline.solutionFound) {
  throw new Error("Baseline must be solvable.");
}
const baselineCoreEvents = baseline.coreEvents;

type Variant = { family: string; name: string; layout: string; edits: string[] };
const variants: Variant[] = [];

for (const cell of dots) {
  variants.push({
    family: "single_wall",
    name: `wall_${cell.x}_${cell.y}`,
    layout: replaceAt(rows, cell.x, cell.y, "#").join("\n"),
    edits: [`wall:${cell.x},${cell.y}`],
  });
}

for (const cell of dots) {
  const moved = replaceAt(replaceAt(rows, start.x, start.y, "."), cell.x, cell.y, "@");
  variants.push({
    family: "move_start",
    name: `start_${cell.x}_${cell.y}`,
    layout: moved.join("\n"),
    edits: [`start:${start.x},${start.y}->${cell.x},${cell.y}`],
  });

  for (const wall of findAll(moved, ".")) {
    variants.push({
      family: "move_start_plus_single_wall",
      name: `start_${cell.x}_${cell.y}_wall_${wall.x}_${wall.y}`,
      layout: replaceAt(moved, wall.x, wall.y, "#").join("\n"),
      edits: [
        `start:${start.x},${start.y}->${cell.x},${cell.y}`,
        `wall:${wall.x},${wall.y}`,
      ],
    });
  }
}

const results = variants.map((variant) => ({ ...variant, analysis: analyze(variant.name, variant.layout) }));
const strictHits = results.filter(({ analysis }) => (
  analysis.solutionFound
  && analysis.solutionCost === baseline.solutionCost
  && sameArray(analysis.coreEvents, baselineCoreEvents)
  && analysis.graphComplete
  && analysis.winStateCount === 1
  && !analysis.earlyBsBeforePlWinFound
));

const report = {
  id: outId,
  sourceLayout: source,
  bounds: {
    families: ["single_wall", "move_start", "move_start_plus_single_wall"],
    testedVariants: variants.length,
    maxStates,
    maxDepth,
    strictRequirements: [
      `最短步数保持 ${baseline.solutionCost}`,
      "最短解的非 walk 核心事件序列与基线完全一致",
      "完整图搜索完成且只有一个 winning state",
      "不存在任何先发生 B/S 边界位移、后发生 P/L 边界位移的胜路",
    ],
  },
  baseline,
  strictHitCount: strictHits.length,
  strictHits,
  familySummary: summarizeFamilies(results),
  nearHits: results
    .filter(({ analysis }) => analysis.solutionFound && !analysis.earlyBsBeforePlWinFound)
    .slice(0, 100),
};

const outBase = path.join(prototypePath, "reports", `order_lock_search_${outId}`);
await writeFile(`${outBase}.json`, `${JSON.stringify(report, null, 2)}\n`, "utf8");
await writeFile(`${outBase}.md`, formatMarkdown(report), "utf8");
console.log(formatMarkdown(report));
console.log(`Wrote ${outBase}.md`);
console.log(`Wrote ${outBase}.json`);

function analyze(id: string, layout: string) {
  try {
    const level: LevelDoc = {
      id,
      title: id,
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
    const initial = adapter.parseLevel(level);
    const solution = solveWithRuntime(runtime, initial, {
      winCondition: pkg.mechanic.win,
      maxStates,
      maxDepth,
    });
    const graph = enumerateGraph(initial);
    const order = findEarlyBsBeforePlWin(initial);
    return {
      parseOk: true,
      solutionFound: solution.found,
      solutionCost: solution.cost,
      solutionInputs: solution.inputs,
      solutionEvents: solution.events,
      coreEvents: solution.events.filter((event) => event !== "walk"),
      graphComplete: graph.complete,
      reachableStateCount: graph.reachableStateCount,
      legalTransitionCount: graph.legalTransitionCount,
      winStateCount: graph.winStateCount,
      earlyBsBeforePlWinFound: order.found,
      earlyBsBeforePlInputs: order.inputs,
      earlyBsBeforePlDepth: order.depth,
      earlyBsBeforePlExploredStates: order.exploredStates,
    };
  } catch (error) {
    return {
      parseOk: false,
      solutionFound: false,
      coreEvents: [] as string[],
      graphComplete: false,
      winStateCount: 0,
      earlyBsBeforePlWinFound: false,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

function enumerateGraph(initial: unknown) {
  const queue = [initial];
  const visited = new Set([runtime.key(initial)]);
  let cursor = 0;
  let legalTransitionCount = 0;
  let winStateCount = runtime.isWin(initial, pkg.mechanic.win) ? 1 : 0;
  while (cursor < queue.length && visited.size <= maxStates) {
    const state = queue[cursor++]!;
    if (runtime.isWin(state, pkg.mechanic.win)) continue;
    for (const input of runtime.actions(state, { winCondition: pkg.mechanic.win }) as InputId[]) {
      const step = runtime.step(state, input, { winCondition: pkg.mechanic.win });
      if (!step.legal) continue;
      legalTransitionCount += 1;
      const key = runtime.key(step.state);
      if (visited.has(key)) continue;
      visited.add(key);
      if (runtime.isWin(step.state, pkg.mechanic.win)) winStateCount += 1;
      queue.push(step.state);
    }
  }
  return {
    complete: cursor >= queue.length && visited.size <= maxStates,
    reachableStateCount: visited.size,
    legalTransitionCount,
    winStateCount,
  };
}

function findEarlyBsBeforePlWin(initial: unknown) {
  const queue: Array<{
    state: unknown;
    seenPl: boolean;
    violated: boolean;
    inputs: InputId[];
    depth: number;
  }> = [{ state: initial, seenPl: false, violated: false, inputs: [], depth: 0 }];
  const visited = new Set([`${runtime.key(initial)}|0|0`]);
  let cursor = 0;
  while (cursor < queue.length && visited.size <= maxStates) {
    const current = queue[cursor++]!;
    if (current.depth > 0 && runtime.isWin(current.state, pkg.mechanic.win) && current.violated) {
      return { found: true, inputs: current.inputs, depth: current.depth, exploredStates: visited.size };
    }
    if (current.depth >= maxDepth || runtime.isWin(current.state, pkg.mechanic.win)) continue;
    for (const input of runtime.actions(current.state, { winCondition: pkg.mechanic.win }) as InputId[]) {
      const step = runtime.step(current.state, input, { winCondition: pkg.mechanic.win });
      if (!step.legal) continue;
      const hasPl = step.events.some((event) => eventMatchesPattern(event, "anchor_boundary_shift:push_pull"));
      const hasBs = step.events.some((event) => eventMatchesPattern(event, "anchor_boundary_shift:box_sticky"));
      const seenPl = current.seenPl || hasPl;
      const violated = current.violated || (hasBs && !current.seenPl && !hasPl);
      const key = `${runtime.key(step.state)}|${seenPl ? 1 : 0}|${violated ? 1 : 0}`;
      if (visited.has(key)) continue;
      visited.add(key);
      queue.push({
        state: step.state,
        seenPl,
        violated,
        inputs: [...current.inputs, input],
        depth: current.depth + 1,
      });
    }
  }
  return { found: false, exploredStates: visited.size };
}

function findChar(layoutRows: string[], char: string) {
  for (let y = 0; y < layoutRows.length; y += 1) {
    const x = layoutRows[y]!.indexOf(char);
    if (x >= 0) return { x, y };
  }
  throw new Error(`Missing '${char}' in layout.`);
}

function findAll(layoutRows: string[], char: string) {
  const result: Array<{ x: number; y: number }> = [];
  for (let y = 0; y < layoutRows.length; y += 1) {
    for (let x = 0; x < layoutRows[y]!.length; x += 1) {
      if (layoutRows[y]![x] === char) result.push({ x, y });
    }
  }
  return result;
}

function replaceAt(layoutRows: string[], x: number, y: number, char: string) {
  const copy = [...layoutRows];
  copy[y] = `${copy[y]!.slice(0, x)}${char}${copy[y]!.slice(x + 1)}`;
  return copy;
}

function sameArray(a: string[], b: string[]) {
  return a.length === b.length && a.every((value, index) => value === b[index]);
}

function summarizeFamilies(items: typeof results) {
  const families = new Map<string, {
    tested: number;
    solvable: number;
    costPreserved: number;
    coreEventsPreserved: number;
    uniqueWinState: number;
    earlyOrderLocked: number;
  }>();
  for (const item of items) {
    const row = families.get(item.family) ?? {
      tested: 0,
      solvable: 0,
      costPreserved: 0,
      coreEventsPreserved: 0,
      uniqueWinState: 0,
      earlyOrderLocked: 0,
    };
    row.tested += 1;
    if (item.analysis.solutionFound) row.solvable += 1;
    if (item.analysis.solutionCost === baseline.solutionCost) row.costPreserved += 1;
    if (sameArray(item.analysis.coreEvents, baselineCoreEvents)) row.coreEventsPreserved += 1;
    if (item.analysis.graphComplete && item.analysis.winStateCount === 1) row.uniqueWinState += 1;
    if (item.analysis.solutionFound && !item.analysis.earlyBsBeforePlWinFound) row.earlyOrderLocked += 1;
    families.set(item.family, row);
  }
  return Object.fromEntries(families);
}

function formatMarkdown(report: typeof report) {
  const lines = [
    `# 顺序锁穷举：${report.id}`,
    "",
    `- 已测变体：${report.bounds.testedVariants}`,
    `- 变体族：${report.bounds.families.join(", ")}`,
    `- 严格命中：${report.strictHitCount}`,
    `- 基线最短步数：${report.baseline.solutionCost}`,
    `- 基线完整图：${report.baseline.reachableStateCount} states / ${report.baseline.legalTransitionCount} transitions / ${report.baseline.winStateCount} winning state(s)`,
    `- 基线是否存在 B/S 早于 P/L 的胜路：${report.baseline.earlyBsBeforePlWinFound ? "是" : "否"}`,
    "",
    "## 分族汇总",
    "",
    "| 变体族 | 已测 | 可解 | 保持步数 | 保持核心序列 | 唯一胜态 | 锁死早序 |",
    "| --- | ---: | ---: | ---: | ---: | ---: | ---: |",
  ];
  for (const [family, row] of Object.entries(report.familySummary)) {
    lines.push(`| ${family} | ${row.tested} | ${row.solvable} | ${row.costPreserved} | ${row.coreEventsPreserved} | ${row.uniqueWinState} | ${row.earlyOrderLocked} |`);
  }
  lines.push("", "## 严格条件", "");
  for (const requirement of report.bounds.strictRequirements) lines.push(`- ${requirement}`);
  if (report.strictHits.length > 0) {
    lines.push("", "## 严格命中", "");
    for (const hit of report.strictHits) {
      lines.push(`### ${hit.name}`, "", `- 改动：${hit.edits.join(", ")}`, "", "```text", hit.layout, "```");
    }
  }
  return `${lines.join("\n")}\n`;
}
