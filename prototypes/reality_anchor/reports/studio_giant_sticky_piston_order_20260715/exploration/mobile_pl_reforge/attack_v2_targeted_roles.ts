import { readFile } from "node:fs/promises";
import { loadPrototypePackage } from "../../../../../../src/core/io.js";
import { getRuntimeAdapter } from "../../../../../../src/prototypes/runtimeAdapter.js";
import {
  cloneState,
  pointKey,
  type RealityAnchorState,
} from "../../../../../../src/prototypes/reality_anchor/mechanics.js";

const layoutPath = process.argv[2] ??
  "prototypes/reality_anchor/reports/studio_giant_sticky_piston_order_20260715/" +
  "exploration/mobile_pl_reforge/mobile_pl_reforge_v2.txt";
const pkg = await loadPrototypePackage("prototypes/reality_anchor");
const adapter = getRuntimeAdapter(pkg.mechanic);
const runtime = adapter.createRuntime(pkg.mechanic);
const layout = (await readFile(layoutPath, "utf8")).replace(/\r/g, "").replace(/\n+$/g, "");
const initial = adapter.parseLevel({ id: "MOBILE_PL_ATTACK", title: "attack", layout });
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
  { name: "canonical_roles", roles: ["O", ...p(10), "T", "T", "B", "B", "R", "F"] },
  { name: "pl_before_open", roles: [...p(10), "O", "T", "T", "B", "B", "R", "F"] },
  ...Array.from({ length: 9 }, (_, index) => {
    const before = index + 1;
    return {
      name: `pl_${before}_before_open_then_full`,
      roles: [...p(before), "O", ...p(10 - before), "T", "T", "B", "B", "R", "F"] as Role[],
    };
  }),
  ...Array.from({ length: 11 }, (_, count) => ({
    name: `pl_stroke_${count}`,
    roles: ["O", ...p(count), "T", "T", "B", "B", "R", "F"] as Role[],
  })),
  { name: "pl_overpull_11", roles: ["O", ...p(11), "T", "T", "B", "B", "R", "F"] },
  { name: "skip_both_reorders", roles: ["O", ...p(10), "R", "F"] },
  { name: "skip_bottom_reorder", roles: ["O", ...p(10), "T", "T", "R", "F"] },
  { name: "skip_top_reorder", roles: ["O", ...p(10), "B", "B", "R", "F"] },
  { name: "partial_reorders", roles: ["O", ...p(10), "T", "B", "R", "F"] },
  { name: "skip_restick", roles: ["O", ...p(10), "T", "T", "B", "B", "F"] },
  { name: "initial_early_fire", roles: ["F"] },
  { name: "pl_then_early_fire", roles: [...p(10), "F"] },
  { name: "open_then_early_fire", roles: ["O", ...p(10), "F"] },
  { name: "early_fire_then_finish_roles", roles: ["O", ...p(10), "F", "T", "T", "B", "B", "R", "F"] },
  { name: "open_early_fire_reset_then_canonical", roles: ["O", ...p(10), "F", "X", "T", "T", "B", "B", "R", "F"] },
  { name: "reordered_early_fire_reset_then_restick", roles: ["O", ...p(10), "T", "T", "B", "B", "F", "X", "R", "F"] },
  { name: "direct_top_middle_bottom", roles: [...p(10), "U", "M", "D"] },
  { name: "direct_middle_top_bottom", roles: [...p(10), "M", "U", "D"] },
  { name: "direct_bottom_middle_top", roles: [...p(10), "D", "M", "U"] },
  { name: "overpull_direct_top_bottom_then_fire", roles: ["O", ...p(11), "U", "D", "F"] },
  { name: "overpull_direct_bottom_top_then_fire", roles: ["O", ...p(11), "D", "U", "F"] },
  { name: "overpull_direct_top_bottom_only", roles: ["O", ...p(11), "U", "D"] },
  { name: "overpull_direct_top_bottom_restick_fire", roles: ["O", ...p(11), "U", "D", "R", "F"] },
  { name: "overpull_12", roles: ["O", ...p(12), "T", "T", "B", "B", "R", "F"] },
];

const results = scenarios.map(runScenario);
const targetedSearch = searchTargetedRoles(18, 2_000);
console.log(JSON.stringify({
  layoutPath,
  roleLegend: {
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
  },
  results,
  targetedSearch,
}, null, 2));

function runScenario(scenario: { name: string; roles: Role[] }) {
  let state = cloneState(initial);
  const exactInputs: Direction[] = [];
  const trace: Array<Record<string, unknown>> = [];
  let failedAt: { index: number; role: Role } | undefined;
  for (let index = 0; index < scenario.roles.length; index += 1) {
    const role = scenario.roles[index]!;
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
  return {
    name: scenario.name,
    roles: scenario.roles.join(""),
    completedRoles: trace.length,
    failedAt,
    exactInputCount: exactInputs.length,
    exactInputs,
    goalsCovered: coveredGoals(state),
    isWin: runtime.isWin(state, winCondition),
    trace,
    finalRender: adapter.renderState(state),
  };
}

function searchTargetedRoles(maxDepth: number, maxStates: number) {
  type SearchNode = {
    state: RealityAnchorState;
    depth: number;
    parent?: number;
    role?: Role;
    exactInputs?: Direction[];
  };
  const roleOrder: Role[] = ["O", "R", "P", "Q", "T", "B", "F", "X", "U", "M", "D"];
  const nodes: SearchNode[] = [{ state: cloneState(initial), depth: 0 }];
  const visited = new Map<string, number>([[canonicalStateKey(initial), 0]]);
  const wins: number[] = [];
  let cursor = 0;
  let transitions = 0;
  while (cursor < nodes.length && nodes.length < maxStates) {
    const node = nodes[cursor]!;
    if (node.depth < maxDepth && !runtime.isWin(node.state, winCondition)) {
      for (const role of roleOrder) {
        const executed = executeRole(node.state, role);
        if (!executed) continue;
        transitions += 1;
        const key = canonicalStateKey(executed.state);
        if (visited.has(key)) continue;
        const index = nodes.length;
        visited.set(key, index);
        nodes.push({
          state: executed.state,
          depth: node.depth + 1,
          parent: cursor,
          role,
          exactInputs: [...executed.exactInputs, executed.action],
        });
        if (runtime.isWin(executed.state, winCondition)) wins.push(index);
        if (nodes.length >= maxStates) break;
      }
    }
    cursor += 1;
  }
  const witnesses = wins.map((index) => reconstructSearch(nodes, index));
  witnesses.sort((a, b) => a.objectDepth - b.objectDepth || a.roles.localeCompare(b.roles));
  return {
    status: nodes.length >= maxStates ? "exhausted" : "complete_to_depth",
    maxDepth,
    maxStates,
    states: nodes.length,
    transitions,
    rawWins: wins.length,
    shortestWinningObjectDepth: witnesses[0]?.objectDepth ?? null,
    shortestWitnesses: witnesses.slice(0, 100),
  };
}

function reconstructSearch(
  nodes: Array<{ parent?: number; role?: Role; exactInputs?: Direction[]; depth: number }>,
  index: number,
) {
  const roles: Role[] = [];
  const chunks: Direction[][] = [];
  let current: number | undefined = index;
  while (current !== undefined) {
    const node = nodes[current]!;
    if (node.role) roles.push(node.role);
    if (node.exactInputs) chunks.push(node.exactInputs);
    current = node.parent;
  }
  roles.reverse();
  chunks.reverse();
  return {
    objectDepth: roles.length,
    roles: roles.join(""),
    exactInputs: chunks.flat(),
  };
}

function canonicalStateKey(state: RealityAnchorState): string {
  const objectKey = runtime.key(state).replace(/^Ply:[^|]*\|/, "");
  const component = walkReach(state).map((entry) => pointKey(entry.player)).sort().join(";");
  return `${objectKey}|Reach:${component}`;
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
      return {
        state: transition.state,
        exactInputs: reachable.inputs,
        action,
        events: transition.events,
      };
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
  return {
    state: transition.state,
    exactInputs: reachable.inputs,
    action,
    events: transition.events,
  };
}

function walkReach(state: RealityAnchorState): Reach[] {
  const occupied = occupiedCells(state);
  const queue: Reach[] = [{ player: state.player, inputs: [] }];
  const seen = new Set<string>([pointKey(state.player)]);
  for (let cursor = 0; cursor < queue.length; cursor += 1) {
    const current = queue[cursor]!;
    for (const direction of directions) {
      const next = movedPoint(current.player, direction);
      const key = pointKey(next);
      if (next.x < 0 || next.y < 0 || next.x >= state.width || next.y >= state.height ||
          state.walls.has(key) || occupied.has(key) || seen.has(key)) continue;
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
