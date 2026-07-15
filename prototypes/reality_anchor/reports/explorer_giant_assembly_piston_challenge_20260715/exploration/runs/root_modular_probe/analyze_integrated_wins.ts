import { readFile } from "node:fs/promises";
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

const pkg = await loadPrototypePackage(path.resolve("prototypes/reality_anchor"));
const layoutPath = path.resolve(
  "prototypes/reality_anchor/reports/explorer_giant_assembly_piston_challenge_20260715/exploration/runs/modular_hub/layouts/assembly_full.txt",
);
const layout = (await readFile(layoutPath, "utf8")).trimEnd();
const initial = parseLevel({ id: "integrated_win_audit", title: "integrated_win_audit", layout } satisfies LevelDoc);
const seen = new Map([[stateKey(initial), initial]]);
const queue = [initial];
const winEntries: Array<Record<string, unknown>> = [];
const winKeys = new Set<string>();
let cursor = 0;
let transitions = 0;

while (cursor < queue.length && seen.size < 200_000) {
  const current = queue[cursor++]!;
  if (isWin(current)) continue;
  for (const input of ["up", "down", "left", "right"] as InputId[]) {
    const result = step(pkg.mechanic, current, input);
    if (!result.legal) continue;
    transitions += 1;
    const nextKey = stateKey(result.state);
    if (isWin(result.state)) {
      winKeys.add(nextKey);
      winEntries.push({
        input,
        mode: forceModeAt(current, current.player),
        player: current.player,
        beforeCovered: coveredMask(current),
        afterCovered: coveredMask(result.state),
        events: result.events,
        pushPullAnchor: result.state.pushPullAnchor,
        boxStickyAnchor: result.state.boxStickyAnchor,
        crates: result.state.crates,
        stickyGroupSizes: result.state.stickyGroups.map((group) => group.length).sort((a, b) => a - b),
        stickyBounds: result.state.stickyGroups.map(bounds),
      });
    }
    if (seen.has(nextKey)) continue;
    seen.set(nextKey, result.state);
    queue.push(result.state);
  }
}

const unique = [...new Set(winEntries.map((entry) => JSON.stringify(entry)))].map((entry) => JSON.parse(entry));
const compact = {
  playerOrigins: [...new Set(unique.map((entry) => `${entry.player.x},${entry.player.y}`))].sort(),
  pushPullAnchors: [...new Set(unique.map((entry) => JSON.stringify(entry.pushPullAnchor)))].map((entry) => JSON.parse(entry)),
  boxStickyAnchors: [...new Set(unique.map((entry) => JSON.stringify(entry.boxStickyAnchor)))].map((entry) => JSON.parse(entry)),
  stickyGroupProfiles: [...new Set(unique.map((entry) => JSON.stringify({
    sizes: entry.stickyGroupSizes,
    bounds: entry.stickyBounds,
    crates: entry.crates,
  })))].map((entry) => JSON.parse(entry)),
  transitionProfiles: [...new Set(unique.map((entry) => JSON.stringify({
    input: entry.input,
    mode: entry.mode,
    beforeCovered: entry.beforeCovered,
    afterCovered: entry.afterCovered,
    events: entry.events,
  })))].map((entry) => JSON.parse(entry)),
};
process.stdout.write(`${JSON.stringify({
  status: cursor === queue.length ? "complete" : "exhausted",
  states: seen.size,
  transitions,
  winStates: winKeys.size,
  winEntryEdges: winEntries.length,
  compact,
}, null, 2)}\n`);

function coveredMask(state: RealityAnchorState): number {
  const occupied = new Set(state.crates.map(pointKey));
  for (const group of state.stickyGroups) for (const cell of group) occupied.add(pointKey(cell));
  return [...state.goals].sort().reduce((mask, goal, index) => occupied.has(goal) ? mask | (1 << index) : mask, 0);
}

function bounds(group: Array<{ x: number; y: number }>) {
  return {
    minX: Math.min(...group.map((cell) => cell.x)),
    maxX: Math.max(...group.map((cell) => cell.x)),
    minY: Math.min(...group.map((cell) => cell.y)),
    maxY: Math.max(...group.map((cell) => cell.y)),
  };
}
