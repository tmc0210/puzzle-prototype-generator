import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

import { loadPrototypePackage } from "../../../../../../../src/core/io.js";
import type { InputId, LevelDoc, Point } from "../../../../../../../src/core/types.js";
import {
  forceModeAt,
  isWin,
  parseLevel,
  pointKey,
  renderState,
  stateKey,
  step,
  type RealityAnchorState,
} from "../../../../../../../src/prototypes/reality_anchor/mechanics.js";

type LayoutOptions = {
  leftDocked: boolean;
  rightDocked: boolean;
  player: Point;
  openSideExit?: boolean;
};

const root = path.resolve(
  "prototypes/reality_anchor/reports/explorer_giant_assembly_piston_challenge_20260715/exploration/runs/modular_hub",
);
const layoutDir = path.join(root, "layouts");
await mkdir(layoutDir, { recursive: true });

const pkg = await loadPrototypePackage(path.resolve("prototypes/reality_anchor"));

const assemblyInputs = [
  ...repeat("right", 4),
  ...repeat("left", 4),
  "down",
  "down",
  ...repeat("right", 19),
  "up",
  "up",
  ...repeat("left", 5),
  ...repeat("right", 5),
  "down",
  "down",
  ...repeat("left", 10),
  "up",
  "up",
  "up",
  "down",
] as InputId[];

const scenarios = [
  {
    id: "assembly_full",
    layout: buildLayout({ leftDocked: false, rightDocked: false, player: { x: 3, y: 8 } }),
    inputs: assemblyInputs,
    graphBudget: 500_000,
  },
  {
    id: "registered_hub_only",
    layout: buildLayout({ leftDocked: false, rightDocked: false, player: { x: 12, y: 9 } }),
    inputs: ["up", "up", "down"] as InputId[],
    graphBudget: 500_000,
  },
  {
    id: "registered_left_hub",
    layout: buildLayout({ leftDocked: true, rightDocked: false, player: { x: 12, y: 9 } }),
    inputs: ["up", "up", "down"] as InputId[],
    graphBudget: 500_000,
  },
  {
    id: "registered_full",
    layout: buildLayout({ leftDocked: true, rightDocked: true, player: { x: 12, y: 9 } }),
    inputs: ["up", "up", "down"] as InputId[],
    graphBudget: 200_000,
  },
  {
    id: "registered_hub_open_side",
    layout: buildLayout({
      leftDocked: false,
      rightDocked: false,
      player: { x: 12, y: 9 },
      openSideExit: true,
    }),
    inputs: ["up", "up", "right"] as InputId[],
    graphBudget: 500_000,
  },
];

const audits: any[] = [];
for (const scenario of scenarios) {
  await writeFile(path.join(layoutDir, `${scenario.id}.txt`), `${scenario.layout}\n`, "utf8");
  const level: LevelDoc = { id: scenario.id, title: scenario.id, layout: scenario.layout };
  const initial = parseLevel(level);
  const trace = traceInputs(initial, scenario.inputs);
  const graph = exploreGraph(initial, scenario.graphBudget);
  audits.push({
    id: scenario.id,
    inputs: scenario.inputs,
    layout: scenario.layout,
    trace,
    graph,
  });
  process.stdout.write(
    `${scenario.id}: traceWin=${trace.steps.some((item) => item.winAfter)}, graph=${graph.status} states=${graph.states} wins=${graph.wins} shortest=${graph.shortestWin?.inputs.join(",") ?? "none"}\n`,
  );
}

const integrated = audits.find((item) => item.id === "assembly_full");
const hubOnly = audits.find((item) => item.id === "registered_hub_only");
const leftHub = audits.find((item) => item.id === "registered_left_hub");
const full = audits.find((item) => item.id === "registered_full");
const openSide = audits.find((item) => item.id === "registered_hub_open_side");
assert(integrated?.graph.status === "complete", "integrated graph must be complete");
assert(integrated?.graph.partialStatesThatCanBankAnyCurrentGoalToWin === 0, "partial goal banking bypass");
assert(integrated?.graph.distinctPushPullAnchors.length === 1, "P/L anchor moved");
assert(integrated?.graph.distinctBoxStickyAnchors.length === 1, "B/S anchor moved");
assert(integrated?.graph.initialStickyCells === 21, "unexpected initial sticky lineage count");
assert(integrated?.graph.winningEntrySignatures.length === 3, "unexpected winning entry family count");
for (const entry of integrated.graph.winningEntrySignatures) {
  assert(entry.input === "up" && entry.preMask === 0 && entry.mode === "push", "non-simultaneous winning entry");
  assert(entry.winningGroupCells === 21 && entry.parkedStickyCellsAfter === 0, "win omitted a supplied component");
  assert(entry.cratesAfter === 0, "win changed object identity");
  assert(entry.pushPullAnchorAfter === "P:1,8|L:1,7", "win moved P/L anchor");
  assert(entry.boxStickyAnchorAfter === "B:1,1|S:1,2", "win moved B/S anchor");
}
assert(hubOnly?.trace.steps[1]?.coveredAfter.length === 1, "hub-only must cover one target");
assert(hubOnly?.trace.steps[2]?.coveredAfter.length === 0, "hub-only pull must revoke target");
assert(leftHub?.trace.steps[1]?.coveredAfter.length === 2, "left+hub must cover two targets");
assert(leftHub?.trace.steps[2]?.coveredAfter.length === 0, "left+hub pull must revoke targets");
assert(full?.trace.steps[1]?.winAfter === true, "full registered crown must win on stroke two");
assert(full?.trace.steps[2]?.coveredAfter.length === 0, "full registered crown pull must revoke all targets");
assert(openSide?.trace.steps[2]?.events.includes("walk"), "open-side counterfactual must walk");
assert(openSide?.trace.steps[2]?.coveredAfter.length === 1, "open-side counterfactual must preserve target");
process.stdout.write("VERIFIED modular hub assertions\n");

await writeFile(path.join(root, "audit.json"), `${JSON.stringify({ scenarios: audits }, null, 2)}\n`, "utf8");
await writeFile(path.join(root, "audit.md"), renderAudit(audits), "utf8");

function buildLayout(options: LayoutOptions): string {
  const width = 25;
  const height = 13;
  const rows = Array.from({ length: height }, () => Array.from({ length: width }, () => "#"));
  const floor = (x: number, y: number) => {
    rows[y]![x] = ".";
  };
  const glyph = (x: number, y: number, value: string) => {
    rows[y]![x] = value;
  };

  // Captive head chamber: three piston axes and two arm sweeps.
  for (const x of [8, 12, 16]) {
    for (let y = 2; y <= 8; y += 1) floor(x, y);
  }
  for (let y = 3; y <= 5; y += 1) {
    for (let x = 9; x <= 11; x += 1) floor(x, y);
    for (let x = 13; x <= 15; x += 1) floor(x, y);
  }

  // Four-cell-high horizontal loader tunnels. Each undocked wing is a full-height plug.
  for (let y = 5; y <= 8; y += 1) {
    for (let x = 3; x <= 8; x += 1) floor(x, y);
    for (let x = 16; x <= 22; x += 1) floor(x, y);
  }

  // Exterior loop and unique central force origin.
  for (let x = 3; x <= 22; x += 1) floor(x, 10);
  for (const x of [3, 12, 22]) {
    for (let y = 8; y <= 10; y += 1) floor(x, y);
  }

  // Isolated anchors set S at y>=2 and P at y>=8.
  floor(1, 1);
  floor(1, 2);
  glyph(1, 1, "B");
  glyph(1, 2, "S");
  floor(1, 7);
  floor(1, 8);
  glyph(1, 7, "L");
  glyph(1, 8, "P");
  // x=2 remains wall, so neither anchor can be pushed into the left loader.

  for (const x of [8, 12, 16]) {
    glyph(x, 2, "G");
    glyph(x, 3, "M");
  }

  // Central hub/spine: always supplies the complete four-cell axial reach.
  for (let y = 5; y <= 8; y += 1) glyph(12, y, "M");

  placeLeftWing(rows, options.leftDocked ? 8 : 4);
  placeRightWing(rows, options.rightDocked ? 16 : 20);

  if (options.openSideExit) floor(13, 7);
  glyph(options.player.x, options.player.y, "@");
  return rows.map((row) => row.join("")).join("\n");
}

function placeLeftWing(rows: string[][], columnX: number): void {
  for (let y = 5; y <= 8; y += 1) rows[y]![columnX] = "M";
  for (let x = columnX + 1; x <= columnX + 3; x += 1) rows[5]![x] = "M";
}

function placeRightWing(rows: string[][], columnX: number): void {
  for (let y = 5; y <= 8; y += 1) rows[y]![columnX] = "M";
  for (let x = columnX - 3; x <= columnX - 1; x += 1) rows[5]![x] = "M";
}

function repeat(input: InputId, count: number): InputId[] {
  return Array.from({ length: count }, () => input);
}

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message);
}

function traceInputs(initial: RealityAnchorState, inputs: InputId[]) {
  let state = initial;
  const steps = [];
  for (const input of inputs) {
    const before = state;
    const result = step(pkg.mechanic, before, input);
    const after = result.legal ? result.state : before;
    steps.push({
      input,
      legal: result.legal,
      reason: result.reason ?? null,
      events: result.events,
      playerBefore: before.player,
      playerAfter: after.player,
      modeBefore: forceModeAt(before, before.player),
      modeAfter: forceModeAt(after, after.player),
      coveredBefore: coveredGoals(before),
      coveredAfter: coveredGoals(after),
      winAfter: isWin(after),
      stateAfter: renderState(after),
    });
    state = after;
  }
  return { steps, finalStateKey: stateKey(state) };
}

function coveredGoals(state: RealityAnchorState): string[] {
  const occupied = new Set<string>();
  for (const crate of state.crates) occupied.add(pointKey(crate));
  for (const group of state.stickyGroups) for (const cell of group) occupied.add(pointKey(cell));
  return [...state.goals].filter((goal) => occupied.has(goal)).sort();
}

function coveredMask(state: RealityAnchorState): number {
  const goals = [...state.goals].sort();
  const covered = new Set(coveredGoals(state));
  return goals.reduce((mask, goal, index) => covered.has(goal) ? mask | (1 << index) : mask, 0);
}

function exploreGraph(initial: RealityAnchorState, maxStates: number) {
  const initialKey = stateKey(initial);
  const seen = new Map([[initialKey, initial]]);
  const queue = [initial];
  const parent = new Map<string, { previous: string; input: InputId }>();
  const initialMask = coveredMask(initial);
  const masks = new Set([initialMask]);
  const maskByKey = new Map([[initialKey, initialMask]]);
  const reverseEdges = new Map<string, Set<string>>();
  const partialPreservingEdges: Array<{ from: string; to: string; input: InputId; fromMask: number; toMask: number }> = [];
  const winningEntries: Array<{
    input: InputId;
    preMask: number;
    player: Point;
    mode: "push" | "pull";
    events: string[];
    winningGroupShape: string;
    winningGroupCells: number;
    totalStickyCellsAfter: number;
    parkedStickyCellsAfter: number;
    cratesAfter: number;
    pushPullAnchorAfter: string;
    boxStickyAnchorAfter: string;
  }> = [];
  let cursor = 0;
  let transitions = 0;
  let wins = isWin(initial) ? 1 : 0;
  let firstWinKey = isWin(initial) ? initialKey : undefined;

  while (cursor < queue.length && seen.size < maxStates) {
    const current = queue[cursor++]!;
    if (isWin(current)) continue;
    const currentKey = stateKey(current);
    for (const input of ["up", "down", "left", "right"] as InputId[]) {
      const result = step(pkg.mechanic, current, input);
      if (!result.legal) continue;
      transitions += 1;
      const currentMask = maskByKey.get(currentKey) ?? coveredMask(current);
      const nextMask = coveredMask(result.state);
      masks.add(nextMask);
      const key = stateKey(result.state);
      const predecessors = reverseEdges.get(key) ?? new Set<string>();
      predecessors.add(currentKey);
      reverseEdges.set(key, predecessors);
      if (currentMask > 0 && currentMask < 7 && (nextMask & currentMask) !== 0) {
        partialPreservingEdges.push({ from: currentKey, to: key, input, fromMask: currentMask, toMask: nextMask });
      }
      if (isWin(result.state)) {
        const winningGroup = goalGroup(result.state);
        const totalStickyCellsAfter = stickyCellCount(result.state);
        winningEntries.push({
          input,
          preMask: currentMask,
          player: current.player,
          mode: forceModeAt(current, current.player),
          events: result.events,
          winningGroupShape: goalGroupShape(result.state),
          winningGroupCells: winningGroup?.length ?? 0,
          totalStickyCellsAfter,
          parkedStickyCellsAfter: totalStickyCellsAfter - (winningGroup?.length ?? 0),
          cratesAfter: result.state.crates.length,
          pushPullAnchorAfter: pushPullAnchorKey(result.state),
          boxStickyAnchorAfter: boxStickyAnchorKey(result.state),
        });
      }
      if (seen.has(key)) continue;
      seen.set(key, result.state);
      maskByKey.set(key, nextMask);
      parent.set(key, { previous: currentKey, input });
      queue.push(result.state);
      if (isWin(result.state)) {
        wins += 1;
        firstWinKey ??= key;
      }
    }
  }

  const winKeys = [...seen].filter(([, state]) => isWin(state)).map(([key]) => key);
  const bankReach = new Map<number, Set<string>>();
  for (const requiredMask of [1, 2, 3, 4, 5, 6]) {
    const reachable = new Set<string>();
    const open = winKeys.filter((key) => ((maskByKey.get(key) ?? 0) & requiredMask) === requiredMask);
    for (const key of open) reachable.add(key);
    for (let index = 0; index < open.length; index += 1) {
      const key = open[index]!;
      for (const predecessor of reverseEdges.get(key) ?? []) {
        const mask = maskByKey.get(predecessor) ?? 0;
        if ((mask & requiredMask) !== requiredMask || reachable.has(predecessor)) continue;
        reachable.add(predecessor);
        open.push(predecessor);
      }
    }
    bankReach.set(requiredMask, reachable);
  }
  const partialKeys = [...maskByKey]
    .filter(([, mask]) => mask > 0 && mask < 7)
    .map(([key]) => key);
  const partialBankAll = partialKeys.filter((key) => {
    const mask = maskByKey.get(key) ?? 0;
    return bankReach.get(mask)?.has(key) ?? false;
  });
  const partialBankAny = partialKeys.filter((key) => {
    const mask = maskByKey.get(key) ?? 0;
    return [1, 2, 4].some((bit) => (mask & bit) !== 0 && (bankReach.get(bit)?.has(key) ?? false));
  });
  const winningEntrySignatures = [...new Set(winningEntries.map((entry) => JSON.stringify(entry)))].map(
    (entry) => JSON.parse(entry),
  );
  const distinctPushPullAnchors = [...new Set([...seen.values()].map(pushPullAnchorKey))];
  const distinctBoxStickyAnchors = [...new Set([...seen.values()].map(boxStickyAnchorKey))];
  const distinctStickyCellTotals = [...new Set([...seen.values()].map(stickyCellCount))].sort((left, right) => left - right);
  const distinctCrateCounts = [...new Set([...seen.values()].map((state) => state.crates.length))].sort((left, right) => left - right);

  return {
    status: cursor === queue.length ? "complete" as const : "exhausted" as const,
    states: seen.size,
    transitions,
    wins,
    reachableCoveredMasks: [...masks].sort((left, right) => left - right),
    partialStates: partialKeys.length,
    partialPreservingTransitions: partialPreservingEdges.length,
    partialStatesThatCanBankAllCurrentGoalsToWin: partialBankAll.length,
    partialStatesThatCanBankAnyCurrentGoalToWin: partialBankAny.length,
    winningEntrySignatures,
    initialStickyCells: stickyCellCount(initial),
    distinctStickyCellTotals,
    distinctCrateCounts,
    distinctPushPullAnchors,
    distinctBoxStickyAnchors,
    shortestWin: firstWinKey ? reconstruct(firstWinKey, initialKey, parent) : null,
  };
}

function goalGroup(state: RealityAnchorState): Point[] | undefined {
  const goals = [...state.goals];
  return state.stickyGroups.find((candidate) => {
    const cells = new Set(candidate.map(pointKey));
    return goals.every((goal) => cells.has(goal));
  });
}

function goalGroupShape(state: RealityAnchorState): string {
  const group = goalGroup(state);
  if (!group) return "none";
  const minX = Math.min(...group.map((cell) => cell.x));
  const minY = Math.min(...group.map((cell) => cell.y));
  return group
    .map((cell) => `${cell.x - minX},${cell.y - minY}`)
    .sort()
    .join(";");
}

function stickyCellCount(state: RealityAnchorState): number {
  return state.stickyGroups.reduce((total, group) => total + group.length, 0);
}

function pushPullAnchorKey(state: RealityAnchorState): string {
  const anchor = state.pushPullAnchor;
  return anchor ? `P:${pointKey(anchor.push)}|L:${pointKey(anchor.pull)}` : "none";
}

function boxStickyAnchorKey(state: RealityAnchorState): string {
  const anchor = state.boxStickyAnchor;
  return anchor ? `B:${pointKey(anchor.box)}|S:${pointKey(anchor.sticky)}` : "none";
}

function reconstruct(
  winKey: string,
  initialKey: string,
  parent: Map<string, { previous: string; input: InputId }>,
) {
  const inputs: InputId[] = [];
  let cursor = winKey;
  while (cursor !== initialKey) {
    const edge = parent.get(cursor);
    if (!edge) break;
    inputs.push(edge.input);
    cursor = edge.previous;
  }
  inputs.reverse();
  return { cost: inputs.length, inputs };
}

function renderAudit(results: Array<Record<string, any>>): string {
  const lines = [
    "# Modular captive hub runtime audit",
    "",
    "> 坐标零基。完整图只用于找反例；大型开放装配图允许预算耗尽。",
    "",
  ];
  for (const result of results) {
    lines.push(
      `## ${result.id}`,
      "",
      `- Inputs: \`${result.inputs.join(",")}\``,
      `- Graph: \`${result.graph.status}\`, states=${result.graph.states}, transitions=${result.graph.transitions}, wins=${result.graph.wins}`,
      `- Reachable covered masks: \`${result.graph.reachableCoveredMasks.join(",")}\``,
      `- Partial states: ${result.graph.partialStates}; preserving transitions=${result.graph.partialPreservingTransitions}; bank-all-to-win=${result.graph.partialStatesThatCanBankAllCurrentGoalsToWin}; bank-any-to-win=${result.graph.partialStatesThatCanBankAnyCurrentGoalToWin}`,
      `- Winning entry signatures: ${result.graph.winningEntrySignatures.length}`,
      `- Sticky lineage: initial=${result.graph.initialStickyCells}, reachable totals=\`${result.graph.distinctStickyCellTotals.join(",")}\`, crate counts=\`${result.graph.distinctCrateCounts.join(",")}\``,
      `- Anchor positions: P/L=\`${result.graph.distinctPushPullAnchors.join(",")}\`; B/S=\`${result.graph.distinctBoxStickyAnchors.join(",")}\``,
      `- Shortest win: ${result.graph.shortestWin ? `\`${result.graph.shortestWin.inputs.join(",")}\`` : "none"}`,
      "",
      "```text",
      result.layout,
      "```",
      "",
    );
    for (const [index, item] of result.trace.steps.entries()) {
      lines.push(
        `### Step ${index + 1}: ${item.input}`,
        "",
        `- legal=${item.legal}${item.reason ? `, reason=${item.reason}` : ""}`,
        `- player: \`${item.playerBefore.x},${item.playerBefore.y}\` (${item.modeBefore}) -> \`${item.playerAfter.x},${item.playerAfter.y}\` (${item.modeAfter})`,
        `- events: ${item.events.length ? item.events.map((event: string) => `\`${event}\``).join(", ") : "none"}`,
        `- covered: \`${item.coveredBefore.join(";") || "none"}\` -> \`${item.coveredAfter.join(";") || "none"}\``,
        `- win=${item.winAfter}`,
        "",
        "```text",
        item.stateAfter,
        "```",
        "",
      );
    }
  }
  return `${lines.join("\n")}\n`;
}
