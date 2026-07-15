import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import { loadPrototypePackage } from "../../../../../../../src/core/io.js";
import type { InputId, LevelDoc } from "../../../../../../../src/core/types.js";
import {
  forceModeAt,
  isWin,
  parseLevel,
  pointKey,
  stateKey,
  step,
  type RealityAnchorState,
} from "../../../../../../../src/prototypes/reality_anchor/mechanics.js";

const root = path.resolve(
  "prototypes/reality_anchor/reports/explorer_giant_assembly_piston_challenge_20260715/exploration/runs/open_assembly_route_explorer",
);
const layout = (await readFile(path.join(root, "layouts/open_assembly_v0.layout.txt"), "utf8")).trimEnd();
const pkg = await loadPrototypePackage(path.resolve("prototypes/reality_anchor"));
const initial = parseLevel({ id: "open_assembly_v0_graph", title: "open_assembly_v0_graph", layout } satisfies LevelDoc);
const maxStates = Number(process.env.MAX_STATES ?? 250_000);

type ParentEdge = { previous: string; input: InputId };
const initialKey = stateKey(initial);
const seen = new Set<string>([initialKey]);
const queue: RealityAnchorState[] = [initial];
const queueKeys: string[] = [initialKey];
const parent = new Map<string, ParentEdge>();
const depth = new Map<string, number>([[initialKey, 0]]);
const wins: Array<Record<string, unknown>> = [];
const anchorPositions = { pushPull: new Set<string>(), boxSticky: new Set<string>() };
const reachableMasks = new Set<number>();
let transitions = 0;
let cursor = 0;

while (cursor < queue.length && seen.size < maxStates) {
  const current = queue[cursor]!;
  const from = queueKeys[cursor]!;
  cursor += 1;
  reachableMasks.add(coveredMask(current));
  if (current.pushPullAnchor) {
    anchorPositions.pushPull.add(`${pointKey(current.pushPullAnchor.push)}|${pointKey(current.pushPullAnchor.pull)}`);
  }
  if (current.boxStickyAnchor) {
    anchorPositions.boxSticky.add(`${pointKey(current.boxStickyAnchor.box)}|${pointKey(current.boxStickyAnchor.sticky)}`);
  }
  if (isWin(current)) continue;

  for (const input of ["up", "down", "left", "right"] as InputId[]) {
    const result = step(pkg.mechanic, current, input);
    if (!result.legal) continue;
    transitions += 1;
    const to = stateKey(result.state);
    if (isWin(result.state)) {
      wins.push({
        from,
        to,
        input,
        depth: (depth.get(from) ?? 0) + 1,
        preMask: coveredMask(current),
        playerBefore: current.player,
        forceModeBefore: forceModeAt(current, current.player),
        events: result.events,
        stickyGroupSizesBefore: current.stickyGroups.map((group) => group.length).sort((a, b) => a - b),
        stickyGroupSizesAfter: result.state.stickyGroups.map((group) => group.length).sort((a, b) => a - b),
        trace: reconstruct(from, initialKey, parent).concat(input),
      });
    }
    if (seen.has(to)) continue;
    seen.add(to);
    parent.set(to, { previous: from, input });
    depth.set(to, (depth.get(from) ?? 0) + 1);
    queue.push(result.state);
    queueKeys.push(to);
  }
}

const report = {
  schema: "ra_open_assembly_reachable_graph_v0",
  maxStates,
  status: cursor === queue.length ? "complete" : "exhausted",
  states: seen.size,
  expanded: cursor,
  transitions,
  wins: wins.length,
  winEntries: wins.slice(0, 100),
  shortestWinLength: wins.length > 0 ? Math.min(...wins.map((win) => win.depth as number)) : null,
  reachableMasks: [...reachableMasks].sort(),
  anchorPositions: {
    pushPull: [...anchorPositions.pushPull].sort(),
    boxSticky: [...anchorPositions.boxSticky].sort(),
  },
};

await writeFile(path.join(root, `reachable_graph_${maxStates}.json`), `${JSON.stringify(report, null, 2)}\n`, "utf8");
process.stdout.write(`${JSON.stringify({
  status: report.status,
  states: report.states,
  expanded: report.expanded,
  transitions: report.transitions,
  wins: report.wins,
  shortestWinLength: report.shortestWinLength,
  reachableMasks: report.reachableMasks,
  anchorPositionCounts: {
    pushPull: report.anchorPositions.pushPull.length,
    boxSticky: report.anchorPositions.boxSticky.length,
  },
}, null, 2)}\n`);

function coveredMask(state: RealityAnchorState): number {
  const occupied = new Set(state.crates.map(pointKey));
  for (const group of state.stickyGroups) for (const cell of group) occupied.add(pointKey(cell));
  const goals = [{ x: 11, y: 4 }, { x: 11, y: 8 }];
  return goals.reduce((mask, goal, index) => occupied.has(pointKey(goal)) ? mask | (1 << index) : mask, 0);
}

function reconstruct(key: string, start: string, parents: Map<string, ParentEdge>): InputId[] {
  const result: InputId[] = [];
  let cursorKey = key;
  while (cursorKey !== start) {
    const edge = parents.get(cursorKey);
    if (!edge) break;
    result.push(edge.input);
    cursorKey = edge.previous;
  }
  return result.reverse();
}
