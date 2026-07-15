import { readFile, writeFile } from "node:fs/promises";
import { loadPrototypePackage } from "../../../../../../src/core/io.js";
import { getRuntimeAdapter } from "../../../../../../src/prototypes/runtimeAdapter.js";
import {
  cloneState,
  pointKey,
  type RealityAnchorState,
} from "../../../../../../src/prototypes/reality_anchor/mechanics.js";

const layoutPath = process.argv[2] ??
  "prototypes/reality_anchor/reports/studio_giant_sticky_piston_order_20260715/" +
  "exploration/mobile_pl_reforge/mobile_pl_reforge_v4.txt";
const pkg = await loadPrototypePackage("prototypes/reality_anchor");
const adapter = getRuntimeAdapter(pkg.mechanic);
const runtime = adapter.createRuntime(pkg.mechanic);
const layout = (await readFile(layoutPath, "utf8")).replace(/\r/g, "").replace(/\n+$/g, "");
const initial = adapter.parseLevel({ id: "MOBILE_PL_V4_ATTACK", title: "attack", layout });
const winCondition = pkg.mechanic.win;
const directions = ["up", "down", "left", "right"] as const;

type Direction = typeof directions[number];
type Role = "O" | "R" | "P" | "Q" | "T" | "B" | "F" | "X" | "U" | "M" | "D";
type Reach = { player: { x: number; y: number }; inputs: Direction[] };
type Executed = {
  state: RealityAnchorState;
  exactInputs: Direction[];
  action: Direction;
  events: string[];
};

const p = (count: number): Role[] => Array.from({ length: count }, () => "P");
const scenarios: Array<{ name: string; roles: Role[] }> = [
  { name: "canonical_roles", roles: ["O", ...p(3), "T", "T", "B", "B", "R", "F"] },
  { name: "overpull_fourth", roles: ["O", ...p(4)] },
  { name: "pl_unmoved", roles: ["O", "T", "T", "B", "B", "R", "F"] },
  { name: "pl_short_one", roles: ["O", "P", "T", "T", "B", "B", "R", "F"] },
  { name: "pl_short_two", roles: ["O", "P", "P", "T", "T", "B", "B", "R", "F"] },
  { name: "pl_one_before_open", roles: ["P", "O", "P", "P", "T", "T", "B", "B", "R", "F"] },
  { name: "pl_two_before_open", roles: ["P", "P", "O", "P", "T", "T", "B", "B", "R", "F"] },
  { name: "pl_three_before_open", roles: ["P", "P", "P", "O", "T", "T", "B", "B", "R", "F"] },
  { name: "interleaved_tip_reorder", roles: ["O", ...p(3), "T", "B", "T", "B", "R", "F"] },
  { name: "top_bottom_bottom_top_order", roles: ["O", ...p(3), "T", "B", "B", "T", "R", "F"] },
  { name: "bottom_top_top_bottom_order", roles: ["O", ...p(3), "B", "T", "T", "B", "R", "F"] },
  { name: "bottom_top_bottom_top_order", roles: ["O", ...p(3), "B", "T", "B", "T", "R", "F"] },
  { name: "bottom_before_top", roles: ["O", ...p(3), "B", "B", "T", "T", "R", "F"] },
  { name: "reorder_before_full_pl", roles: ["O", "P", "P", "T", "T", "P", "B", "B", "R", "F"] },
  { name: "restick_before_reorder", roles: ["O", ...p(3), "R", "T", "T", "B", "B", "F"] },
  { name: "skip_both_reorders", roles: ["O", ...p(3), "R", "F"] },
  { name: "skip_bottom_reorder", roles: ["O", ...p(3), "T", "T", "R", "F"] },
  { name: "skip_top_reorder", roles: ["O", ...p(3), "B", "B", "R", "F"] },
  { name: "partial_reorders", roles: ["O", ...p(3), "T", "B", "R", "F"] },
  { name: "skip_restick", roles: ["O", ...p(3), "T", "T", "B", "B", "F"] },
  { name: "initial_early_fire", roles: ["F"] },
  { name: "early_fire_after_pl", roles: ["O", ...p(3), "F"] },
  { name: "early_fire_reset", roles: ["O", ...p(3), "F", "X"] },
  { name: "early_fire_then_finish", roles: ["O", ...p(3), "F", "T", "T", "B", "B", "R", "F"] },
  { name: "reordered_fire_without_restick_then_reset", roles: ["O", ...p(3), "T", "T", "B", "B", "F", "X"] },
  { name: "direct_locks_before_cut", roles: [...p(3), "U", "M", "D"] },
  { name: "direct_locks_after_cut", roles: ["O", ...p(3), "U", "M", "D"] },
];

const results = scenarios.map(runScenario);
const canonical = results.find((result) => result.name === "canonical_roles")!;
const prefixBeforeOpenRejected = results.find((result) => result.name === "pl_one_before_open")!;
const finalPlReplay = replayRoles(["O", ...p(3)]);
const finalPlState = finalPlReplay.state;
const openedFinalState = finalPlState;
const pl = openedFinalState.pushPullAnchor!;
const bs = openedFinalState.boxStickyAnchor!;
const plWallCells = [
  { x: pl.pull.x, y: pl.pull.y - 1 },
  { x: pl.push.x, y: pl.push.y - 1 },
  { x: pl.pull.x, y: pl.pull.y + 1 },
  { x: pl.push.x, y: pl.push.y + 1 },
].map((cell) => ({ ...cell, wall: openedFinalState.walls.has(pointKey(cell)) }));
const bsDownTargets = [
  { x: bs.box.x, y: bs.box.y + 1 },
  { x: bs.sticky.x, y: bs.sticky.y + 1 },
].map((cell) => ({ ...cell, wall: openedFinalState.walls.has(pointKey(cell)) }));
const bsDownAttempt = attemptFromStance(openedFinalState, { x: bs.sticky.x, y: bs.sticky.y - 1 }, "down");
const responsibilityAudit = auditResponsibilityAlphabet();
const macroOptionIndex = process.argv.indexOf("--macro");
const exactMacroSearch = macroOptionIndex >= 0
  ? runExactMacroSearch(Number(process.argv[macroOptionIndex + 1] ?? 500), 10)
  : undefined;

const roleLegend = {
  O: "B/S 右移切割",
  R: "B/S 左移复黏",
  P: "P/L 左移一格",
  Q: "P/L 右移一格",
  T: "上端切出箱下推一格",
  B: "下端切出箱上推一格",
  F: "巨大黏块左移发射",
  X: "巨大黏块右移复位",
  U: "单独把上锁箱左推上目标",
  M: "单独把中锁箱左推上目标",
  D: "单独把下锁箱左推上目标",
};
const normalizedWinning = [...new Set(responsibilityAudit.winningSequences.map(normalizeWinningSequence))];
const artifact = {
  layoutPath,
  scope: "Reality Anchor v4 explorer 对抗记录；不属于完整状态图证明",
  roleLegend,
  responsibilityAlphabet: {
    O: 1,
    P: 3,
    T: 2,
    B: 2,
    R: 1,
    F: 1,
  },
  exactWitnesses: {
    canonicalWin: canonical,
    prefixBeforeOpenRejected,
  },
  equivalenceNormalization: {
    rule: "六个胜利 role sequence 都以 OPPP 开始；差异只来自四个 T/B 的上下独立重排交错，统一归一化为 OPEN_PL_ALIGN -> REORDER -> RESTICK -> FIRE。POPP 不可执行，不属于等价族。",
    rawWinningRoleSequences: responsibilityAudit.winningSequences,
    normalizedWinningFamilies: normalizedWinning,
    familyCount: normalizedWinning.length,
  },
  geometryProbes: {
    finalPl: openedFinalState.pushPullAnchor,
    prefixExactInputs: finalPlReplay.exactInputs,
    reachableRightOfFinalPl: walkReach(openedFinalState)
      .some((entry) => entry.player.x === pl.push.x + 1 && entry.player.y === pl.push.y),
    fourthLeftShiftExists: executeRole(openedFinalState, "P") !== undefined,
    plVerticalNeighborCells: plWallCells,
    bsDownTargetCells: bsDownTargets,
    bsDownAttempt,
    bsDownFullAttemptInputs: [
      ...finalPlReplay.exactInputs,
      ...((bsDownAttempt as { walkInputs?: Direction[] }).walkInputs ?? []),
      "down",
    ],
  },
  targetedCases: results,
  responsibilityAudit,
  exactMacroSearch,
};
const serialized = `${JSON.stringify(artifact, null, 2)}\n`;
console.log(serialized.trimEnd());
if (process.argv.includes("--write")) {
  await writeFile(
    "prototypes/reality_anchor/reports/studio_giant_sticky_piston_order_20260715/" +
      "exploration/mobile_pl_reforge/attack_v4_responsibility_audit.json",
    serialized,
    "utf8",
  );
  if (exactMacroSearch) {
    await writeFile(
      "prototypes/reality_anchor/reports/studio_giant_sticky_piston_order_20260715/" +
        `exploration/mobile_pl_reforge/attack_v4_macro_search_exact_${exactMacroSearch.maxStates}.json`,
      `${JSON.stringify(exactMacroSearch, null, 2)}\n`,
      "utf8",
    );
  }
}

function normalizeWinningSequence(sequence: string): string {
  const prefix = sequence.startsWith("OPPP")
    ? "OPEN_PL_ALIGN"
    : "UNEXPECTED_PREFIX";
  const rest = sequence.slice(4);
  const reordered = /^[TB]{4}RF$/.test(rest) ? "REORDER -> RESTICK -> FIRE" : rest;
  return `${prefix} -> ${reordered}`;
}

function runScenario(scenario: { name: string; roles: Role[] }) {
  const replay = replayRoles(scenario.roles);
  return {
    name: scenario.name,
    roles: scenario.roles.join(""),
    completedRoles: replay.trace.length,
    failedAt: replay.failedAt,
    exactInputCount: replay.exactInputs.length,
    exactInputs: replay.exactInputs,
    goalsCovered: coveredGoals(replay.state),
    isWin: runtime.isWin(replay.state, winCondition),
    trace: replay.trace,
    finalRender: adapter.renderState(replay.state),
  };
}

function replayRoles(roles: Role[]) {
  let state = cloneState(initial);
  const exactInputs: Direction[] = [];
  const trace: Array<Record<string, unknown>> = [];
  let failedAt: { index: number; role: Role } | undefined;
  for (let index = 0; index < roles.length; index += 1) {
    const role = roles[index]!;
    const executed = executeRole(state, role);
    if (!executed) {
      failedAt = { index: index + 1, role };
      break;
    }
    state = executed.state;
    exactInputs.push(...executed.exactInputs, executed.action);
    trace.push({
      index: index + 1,
      role,
      action: executed.action,
      walkInputs: executed.exactInputs,
      events: executed.events,
      goalsCovered: coveredGoals(state),
      pl: state.pushPullAnchor,
      bs: state.boxStickyAnchor,
    });
  }
  return { state, exactInputs, trace, failedAt };
}

function auditResponsibilityAlphabet() {
  type Counts = { O: number; P: number; T: number; B: number; R: number; F: number };
  const limits: Counts = { O: 1, P: 3, T: 2, B: 2, R: 1, F: 1 };
  const roles = Object.keys(limits) as Array<keyof Counts>;
  type Node = { state: RealityAnchorState; counts: Counts; sequences: string[] };
  const initialCounts: Counts = { O: 0, P: 0, T: 0, B: 0, R: 0, F: 0 };
  const queue: Node[] = [{ state: cloneState(initial), counts: initialCounts, sequences: [""] }];
  const nodeByKey = new Map<string, number>([[responsibilityKey(initial, initialCounts), 0]]);
  const wins: string[] = [];
  let transitions = 0;
  for (let cursor = 0; cursor < queue.length; cursor += 1) {
    const node = queue[cursor]!;
    for (const role of roles) {
      if (node.counts[role] >= limits[role]) continue;
      const executed = executeRole(node.state, role);
      if (!executed) continue;
      transitions += 1;
      const counts = { ...node.counts, [role]: node.counts[role] + 1 };
      const sequences = node.sequences.map((sequence) => `${sequence}${role}`);
      if (runtime.isWin(executed.state, winCondition)) {
        wins.push(...sequences);
        continue;
      }
      const key = responsibilityKey(executed.state, counts);
      const existing = nodeByKey.get(key);
      if (existing !== undefined) {
        queue[existing]!.sequences.push(...sequences);
        continue;
      }
      nodeByKey.set(key, queue.length);
      queue.push({ state: executed.state, counts, sequences });
    }
  }
  const winningSequences = [...new Set(wins)].sort();
  return {
    complete: true,
    completenessBoundary: "只完整覆盖声明的 O1/P3/T2/B2/R1/F1 责任字母表，并按对象状态与玩家可达分量做 DP；不覆盖字母表外动作。",
    alphabet: limits,
    states: queue.length,
    transitions,
    rawWins: winningSequences.length,
    winningSequences,
    shortestWinningObjectDepth: winningSequences.length === 0
      ? null
      : Math.min(...winningSequences.map((sequence) => sequence.length)),
  };
}

function runExactMacroSearch(maxStates: number, maxObjectDepth: number) {
  type Canonical = { state: RealityAnchorState; key: string; reach: Reach[] };
  type Edge = { exactInputs: Direction[]; action: Direction; events: string[] };
  type Node = Canonical & { depth: number; parent?: number; edge?: Edge };
  const canonicalize = (source: RealityAnchorState): Canonical => {
    const reach = walkReach(source);
    reach.sort((a, b) => a.player.y - b.player.y || a.player.x - b.player.x);
    const representative = cloneState(source);
    representative.player = reach[0]!.player;
    const objectKey = runtime.key(representative).replace(/^Ply:[^|]*\|/, "");
    const component = reach.map((entry) => pointKey(entry.player)).sort().join(";");
    return { state: representative, key: `${objectKey}|Reach:${component}`, reach };
  };
  const start = canonicalize(initial);
  const nodes: Node[] = [{ ...start, depth: 0 }];
  const visited = new Map<string, number>([[start.key, 0]]);
  const wins: number[] = [];
  let cursor = 0;
  let transitions = 0;
  let duplicateTransitions = 0;
  while (cursor < nodes.length && nodes.length < maxStates) {
    const node = nodes[cursor]!;
    if (node.depth < maxObjectDepth && !runtime.isWin(node.state, winCondition)) {
      const emitted = new Set<string>();
      for (const reachable of node.reach) {
        for (const action of directions) {
          const ready = cloneState(node.state);
          ready.player = reachable.player;
          const transition = runtime.step(ready, action, { winCondition });
          if (!transition.legal || transition.events.every((event) => event === "walk")) continue;
          const next = canonicalize(transition.state);
          const localKey = `${next.key}|${action}|${transition.events.join("+")}`;
          if (emitted.has(localKey)) continue;
          emitted.add(localKey);
          transitions += 1;
          if (visited.has(next.key)) {
            duplicateTransitions += 1;
            continue;
          }
          const index = nodes.length;
          visited.set(next.key, index);
          nodes.push({
            ...next,
            depth: node.depth + 1,
            parent: cursor,
            edge: {
              exactInputs: [...reachable.inputs, action],
              action,
              events: transition.events,
            },
          });
          if (runtime.isWin(transition.state, winCondition)) wins.push(index);
          if (nodes.length >= maxStates) break;
        }
        if (nodes.length >= maxStates) break;
      }
    }
    cursor += 1;
  }
  const witnesses = wins.map((index) => {
    const edges: Edge[] = [];
    let current: number | undefined = index;
    while (current !== undefined) {
      const node = nodes[current]!;
      if (node.edge) edges.push(node.edge);
      current = node.parent;
    }
    edges.reverse();
    return {
      objectDepth: edges.length,
      exactInputs: edges.flatMap((edge) => edge.exactInputs),
      objectEvents: edges.map((edge) => ({ action: edge.action, events: edge.events })),
    };
  });
  return {
    layoutPath,
    searchKind: "runtime-verified pure-walk-component object-action macro BFS",
    pureWalkCriterion: "每条可达边逐步调用 runtime.step，且只接受 legal && events 全为 walk；不使用几何空格近似。",
    status: nodes.length >= maxStates ? "exhausted" : "complete_to_depth",
    maxStates,
    maxObjectDepth,
    macroStates: nodes.length,
    macroTransitions: transitions,
    duplicateTransitions,
    rawWins: wins.length,
    shortestWinningObjectDepth: witnesses.length === 0
      ? null
      : Math.min(...witnesses.map((witness) => witness.objectDepth)),
    winningWitnesses: witnesses,
    interpretationBoundary: "预算耗尽只表示该宏状态前缀未发现旁路；不得解释为深度完整、完整 SCC 或 unique_complete。",
  };
}

function responsibilityKey(state: RealityAnchorState, counts: Record<string, number>): string {
  const objectKey = runtime.key(state).replace(/^Ply:[^|]*\|/, "");
  const reach = walkReach(state).map((entry) => pointKey(entry.player)).sort().join(";");
  return `${objectKey}|Reach:${reach}|${JSON.stringify(counts)}`;
}

function executeRole(state: RealityAnchorState, role: Role): Executed | undefined {
  if (role === "O" || role === "R") {
    const before = state.boxStickyAnchor;
    if (!before) return undefined;
    const delta = role === "O" ? 1 : -1;
    return findObjectStep(state, role === "O" ? "right" : "left", (next, events) =>
      events.includes("anchor_boundary_shift:box_sticky") &&
      next.boxStickyAnchor?.box.x === before.box.x + delta,
    );
  }
  if (role === "P" || role === "Q") {
    const before = state.pushPullAnchor;
    if (!before) return undefined;
    const delta = role === "P" ? -1 : 1;
    return findObjectStep(state, role === "P" ? "left" : "right", (next, events) =>
      events.includes("anchor_boundary_shift:push_pull") &&
      next.pushPullAnchor?.pull.x === before.pull.x + delta,
    );
  }
  if (role === "T") {
    const tip = state.crates
      .filter((crate) => crate.x === 6 && crate.y >= 2 && crate.y <= 3)
      .sort((a, b) => b.y - a.y)[0];
    if (!tip) return undefined;
    return stepFromStance(state, { x: 6, y: tip.y - 1 }, "down", (next, events) =>
      events.some((event) => event.startsWith("push_object:crate")) &&
      next.crates.some((crate) => crate.x === 6 && crate.y === tip.y + 1),
    );
  }
  if (role === "B") {
    const tip = state.crates
      .filter((crate) => crate.x === 6 && crate.y >= 15 && crate.y <= 16)
      .sort((a, b) => a.y - b.y)[0];
    if (!tip) return undefined;
    return stepFromStance(state, { x: 6, y: tip.y + 1 }, "up", (next, events) =>
      events.some((event) => event.startsWith("push_object:crate")) &&
      next.crates.some((crate) => crate.x === 6 && crate.y === tip.y - 1),
    );
  }
  if (role === "F" || role === "X") {
    return findObjectStep(state, role === "F" ? "left" : "right", (_next, events) =>
      events.includes("move_sticky_rigid"),
    );
  }
  const row = role === "U" ? 4 : role === "M" ? 9 : 14;
  if (!state.crates.some((crate) => crate.x === 5 && crate.y === row)) return undefined;
  return stepFromStance(state, { x: 6, y: row }, "left", (next, events) =>
    events.some((event) => event.startsWith("push_object:crate")) &&
    next.crates.some((crate) => crate.x === 4 && crate.y === row),
  );
}

function findObjectStep(
  state: RealityAnchorState,
  action: Direction,
  accepts: (state: RealityAnchorState, events: string[]) => boolean,
): Executed | undefined {
  for (const reachable of walkReach(state)) {
    const ready = cloneState(state);
    ready.player = reachable.player;
    const transition = runtime.step(ready, action, { winCondition });
    if (!transition.legal || transition.events.every((event) => event === "walk")) continue;
    if (accepts(transition.state, transition.events)) {
      return { state: transition.state, exactInputs: reachable.inputs, action, events: transition.events };
    }
  }
  return undefined;
}

function stepFromStance(
  state: RealityAnchorState,
  stance: { x: number; y: number },
  action: Direction,
  accepts: (state: RealityAnchorState, events: string[]) => boolean,
): Executed | undefined {
  const reachable = walkReach(state).find((entry) => pointKey(entry.player) === pointKey(stance));
  if (!reachable) return undefined;
  const ready = cloneState(state);
  ready.player = stance;
  const transition = runtime.step(ready, action, { winCondition });
  if (!transition.legal || !accepts(transition.state, transition.events)) return undefined;
  return { state: transition.state, exactInputs: reachable.inputs, action, events: transition.events };
}

function attemptFromStance(state: RealityAnchorState, stance: { x: number; y: number }, action: Direction) {
  const reachable = walkReach(state).find((entry) => pointKey(entry.player) === pointKey(stance));
  if (!reachable) return { stance, action, reachable: false };
  const ready = cloneState(state);
  ready.player = stance;
  const transition = runtime.step(ready, action, { winCondition });
  return {
    stance,
    action,
    reachable: true,
    walkInputs: reachable.inputs,
    legal: transition.legal,
    events: transition.events,
    reason: transition.reason,
  };
}

function walkReach(state: RealityAnchorState): Reach[] {
  const queue: Reach[] = [{ player: state.player, inputs: [] }];
  const seen = new Set<string>([pointKey(state.player)]);
  for (let cursor = 0; cursor < queue.length; cursor += 1) {
    const current = queue[cursor]!;
    for (const direction of directions) {
      const ready = cloneState(state);
      ready.player = current.player;
      const transition = runtime.step(ready, direction, { winCondition });
      if (!transition.legal || transition.events.length === 0 ||
          transition.events.some((event) => event !== "walk")) continue;
      const next = transition.state.player;
      const key = pointKey(next);
      if (seen.has(key)) continue;
      seen.add(key);
      queue.push({ player: next, inputs: [...current.inputs, direction] });
    }
  }
  return queue;
}

function occupiedCells(state: RealityAnchorState): Set<string> {
  const occupied = new Set<string>();
  for (const crate of state.crates) occupied.add(pointKey(crate));
  for (const group of state.stickyGroups) for (const cell of group) occupied.add(pointKey(cell));
  if (state.pushPullAnchor) {
    occupied.add(pointKey(state.pushPullAnchor.push));
    occupied.add(pointKey(state.pushPullAnchor.pull));
  }
  if (state.boxStickyAnchor) {
    occupied.add(pointKey(state.boxStickyAnchor.box));
    occupied.add(pointKey(state.boxStickyAnchor.sticky));
  }
  return occupied;
}

function coveredGoals(state: RealityAnchorState): string[] {
  const occupied = occupiedCells(state);
  return [...state.goals].filter((goal) => occupied.has(goal)).sort();
}

function movedPoint(point: { x: number; y: number }, direction: Direction) {
  if (direction === "up") return { x: point.x, y: point.y - 1 };
  if (direction === "down") return { x: point.x, y: point.y + 1 };
  if (direction === "left") return { x: point.x - 1, y: point.y };
  return { x: point.x + 1, y: point.y };
}
