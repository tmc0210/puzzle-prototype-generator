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
  "exploration/piston_contradiction_reforge/reforge_mask_v7_after_cut.txt";
const pkg = await loadPrototypePackage("prototypes/reality_anchor");
const adapter = getRuntimeAdapter(pkg.mechanic);
const runtime = adapter.createRuntime(pkg.mechanic);
const layout = (await readFile(layoutPath, "utf8")).replace(/\r/g, "").replace(/\n+$/g, "");
const initial = adapter.parseLevel({ id: "REFORGE_RESPONSIBILITY_AUDIT", title: "audit", layout });
const winCondition = pkg.mechanic.win;
const directions = ["up", "down", "left", "right"] as const;
type Role = "T" | "B" | "R" | "F";

const sequences = multisetSequences({ T: 2, B: 2, R: 1, F: 1 });
const winning: string[] = [];
const failedAt = new Map<string, number>();

for (const roles of sequences) {
  let state = initial;
  let failedRole: string | undefined;
  for (const role of roles) {
    const next = executeRole(state, role);
    if (!next) {
      failedRole = role;
      break;
    }
    state = next;
  }
  if (failedRole) {
    failedAt.set(failedRole, (failedAt.get(failedRole) ?? 0) + 1);
  } else if (runtime.isWin(state, winCondition)) {
    winning.push(roles.join(""));
  }
}

const normalizedWinning = new Set(winning.map((sequence) =>
  sequence.replace(/[TB]{4}/, "REORDER"),
));

console.log(JSON.stringify({
  layoutPath,
  responsibilityAlphabet: {
    T: "upper cut tip down one cell (required twice)",
    B: "lower cut tip up one cell (required twice)",
    R: "B/S pull-left reset from cut position to initial position",
    F: "left fire of the giant sticky group",
  },
  enumeratedRoleSequences: sequences.length,
  winningRawRoleSequences: winning.length,
  winningRoleSequences: winning,
  winningLogicalFamilies: normalizedWinning.size,
  winningLogicalFamilyKeys: [...normalizedWinning],
  failedAt: Object.fromEntries(failedAt),
}, null, 2));

function executeRole(state: RealityAnchorState, role: Role): RealityAnchorState | undefined {
  if (role === "T") {
    const tip = state.crates
      .filter((crate) => crate.x === 6 && crate.y >= 2 && crate.y <= 3)
      .sort((a, b) => b.y - a.y)[0];
    if (!tip) return undefined;
    return stepFromStance(state, { x: 6, y: tip.y - 1 }, "down", (events) =>
      events.some((event) => event.startsWith("push_object:crate")),
    );
  }
  if (role === "B") {
    const tip = state.crates
      .filter((crate) => crate.x === 6 && crate.y >= 15 && crate.y <= 16)
      .sort((a, b) => a.y - b.y)[0];
    if (!tip) return undefined;
    return stepFromStance(state, { x: 6, y: tip.y + 1 }, "up", (events) =>
      events.some((event) => event.startsWith("push_object:crate")),
    );
  }
  if (role === "R") {
    if (!state.boxStickyAnchor || state.boxStickyAnchor.box.x !== 6) return undefined;
    return stepFromStance(state, { x: 5, y: state.boxStickyAnchor.box.y }, "left", (events) =>
      events.includes("anchor_boundary_shift:box_sticky"),
    );
  }
  for (const reachable of walkReach(state)) {
    const stance = cloneState(state);
    stance.player = reachable;
    const transition = runtime.step(stance, "left", { winCondition });
    if (transition.legal && transition.events.includes("move_sticky_rigid")) {
      return transition.state;
    }
  }
  return undefined;
}

function stepFromStance(
  state: RealityAnchorState,
  stance: { x: number; y: number },
  action: typeof directions[number],
  accepts: (events: string[]) => boolean,
): RealityAnchorState | undefined {
  if (!walkReach(state).some((point) => pointKey(point) === pointKey(stance))) return undefined;
  const ready = cloneState(state);
  ready.player = stance;
  const transition = runtime.step(ready, action, { winCondition });
  return transition.legal && accepts(transition.events) ? transition.state : undefined;
}

function walkReach(state: RealityAnchorState): Array<{ x: number; y: number }> {
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
  const queue = [state.player];
  const seen = new Set<string>([pointKey(state.player)]);
  for (let cursor = 0; cursor < queue.length; cursor += 1) {
    const current = queue[cursor]!;
    for (const direction of directions) {
      const next = movedPoint(current, direction);
      const key = pointKey(next);
      if (next.x < 0 || next.y < 0 || next.x >= state.width || next.y >= state.height ||
          state.walls.has(key) || occupied.has(key) || seen.has(key)) continue;
      seen.add(key);
      queue.push(next);
    }
  }
  return queue;
}

function multisetSequences(counts: Record<Role, number>): Role[][] {
  const result: Role[][] = [];
  const total = Object.values(counts).reduce((sum, count) => sum + count, 0);
  const build = (prefix: Role[]) => {
    if (prefix.length === total) {
      result.push([...prefix]);
      return;
    }
    for (const role of Object.keys(counts) as Role[]) {
      if (counts[role] === 0) continue;
      counts[role] -= 1;
      prefix.push(role);
      build(prefix);
      prefix.pop();
      counts[role] += 1;
    }
  };
  build([]);
  return result;
}

function movedPoint(point: { x: number; y: number }, direction: typeof directions[number]) {
  if (direction === "up") return { x: point.x, y: point.y - 1 };
  if (direction === "down") return { x: point.x, y: point.y + 1 };
  if (direction === "left") return { x: point.x - 1, y: point.y };
  return { x: point.x + 1, y: point.y };
}
