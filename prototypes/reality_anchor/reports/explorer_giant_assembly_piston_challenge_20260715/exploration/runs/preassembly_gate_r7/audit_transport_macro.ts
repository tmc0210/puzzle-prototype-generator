import assert from "node:assert/strict";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import { loadPrototypePackage } from "../../../../../../../src/core/io.js";
import type { InputId, LevelDoc, Point } from "../../../../../../../src/core/types.js";
import {
  forceModeAt,
  isWin,
  parseLevel,
  pointKey,
  step,
  type RealityAnchorState,
} from "../../../../../../../src/prototypes/reality_anchor/mechanics.js";

type MacroNode = { state: RealityAnchorState; key: string; region: Point[] };
type MacroEdge = { previous: string; input: InputId; origin: Point };

const root = path.resolve(
  "prototypes/reality_anchor/reports/explorer_giant_assembly_piston_challenge_20260715/exploration/runs/preassembly_gate_r7",
);
const layout = (await readFile(path.join(root, "layouts/preassembly_gate_r7_v0.layout.txt"), "utf8")).trimEnd();
const intended = JSON.parse(await readFile(path.join(root, "audit_v0.json"), "utf8")) as {
  intendedInputs: InputId[];
  summary: { fullMergeStep: number; firstFullAscentStep: number };
};
const pkg = await loadPrototypePackage(path.resolve("prototypes/reality_anchor"));
const initial = parseLevel({ id: "preassembly_gate_r7_transport", title: "preassembly_gate_r7_transport", layout } satisfies LevelDoc);
const fullMergeStep = intended.summary.fullMergeStep;
const fullStart = stateAfter(initial, intended.intendedInputs.slice(0, fullMergeStep));
const pistons: Point[] = [{ x: 10, y: 4 }, { x: 10, y: 8 }];
const goals: Point[] = [{ x: 11, y: 4 }, { x: 11, y: 8 }];
const maxMacroStates = Number(process.env.MAX_MACRO_STATES ?? 50_000);

const canonicalHeights = new Map<string, number>();
let canonical = fullStart;
canonicalHeights.set(stickyGeometry(canonical), 0);
for (let heightIndex = 1; heightIndex <= 9; heightIndex += 1) {
  const result = step(pkg.mechanic, canonical, "up");
  assert.equal(result.legal, true, `canonical ascent ${heightIndex} illegal`);
  canonical = result.state;
  canonicalHeights.set(stickyGeometry(canonical), heightIndex);
}

const start = makeNode(fullStart);
const queue: MacroNode[] = [start];
const seen = new Set<string>([start.key]);
const parent = new Map<string, MacroEdge>();
const depth = new Map<string, number>([[start.key, 0]]);
let cursor = 0;
let forceEdges = 0;
let walkCellsScanned = 0;
const heightsSeen = new Set<number>();
const winEntries: Array<Record<string, unknown>> = [];
const wrongStickyGeometry: Array<Record<string, unknown>> = [];
const remotePartialEntries: Array<Record<string, unknown>> = [];
const nonterminalRemoteAllEntries: Array<Record<string, unknown>> = [];
const anchorMoveEntries: Array<Record<string, unknown>> = [];
const prewinBoundaryEntries: Array<Record<string, unknown>> = [];

while (cursor < queue.length && seen.size < maxMacroStates) {
  const node = queue[cursor++]!;
  if (isWin(node.state)) continue;
  const phase = canonicalHeights.get(stickyGeometry(node.state));
  if (phase !== undefined) heightsSeen.add(phase);
  walkCellsScanned += node.region.length;

  for (const origin of node.region) {
    const atOrigin = { ...node.state, player: { ...origin } };
    for (const input of ["up", "down", "left", "right"] as InputId[]) {
      const result = step(pkg.mechanic, atOrigin, input);
      if (!result.legal || !movesObject(result.events)) continue;
      forceEdges += 1;
      const next = makeNode(result.state);
      const nextIsWin = isWin(result.state);
      const nextHeight = canonicalHeights.get(stickyGeometry(result.state));
      const macroTrace = (): Array<Record<string, unknown>> =>
        reconstruct(node.key, start.key, parent).concat({ input, origin, events: result.events });

      if (result.events.some((event) => event.startsWith("anchor_boundary_shift:")) && anchorMoveEntries.length < 10) {
        anchorMoveEntries.push({ input, origin, events: result.events, macroTrace: macroTrace() });
      }
      if (!nextIsWin && nextHeight === undefined && wrongStickyGeometry.length < 10) {
        wrongStickyGeometry.push({ phase, input, origin, events: result.events, macroTrace: macroTrace() });
      }
      if (!nextIsWin && result.events.some((event) =>
        event.startsWith("sticky_to_box:") || event.startsWith("box_to_sticky:") || event.startsWith("sticky_split:")
      ) && prewinBoundaryEntries.length < 10) {
        prewinBoundaryEntries.push({ phase, input, origin, events: result.events, macroTrace: macroTrace() });
      }

      const movedMask = pistonAdvanceMask(atOrigin, result.state);
      if (movedMask !== 0 && !startsFromDirectCrate(result.events)) {
        const entry = { phase, input, origin, movedMask, win: nextIsWin, events: result.events, macroTrace: macroTrace() };
        if (movedMask !== 3 && remotePartialEntries.length < 10) remotePartialEntries.push(entry);
        if (movedMask === 3 && !nextIsWin && nonterminalRemoteAllEntries.length < 10) nonterminalRemoteAllEntries.push(entry);
      }

      if (nextIsWin) {
        if (winEntries.length < 100) {
          winEntries.push({
            phase,
            input,
            origin,
            forceMode: forceModeAt(atOrigin, origin),
            movedMask,
            events: result.events,
            macroTrace: macroTrace(),
          });
        }
      }

      if (seen.has(next.key)) continue;
      seen.add(next.key);
      parent.set(next.key, { previous: node.key, input, origin: { ...origin } });
      depth.set(next.key, (depth.get(node.key) ?? 0) + 1);
      queue.push(next);
    }
  }
}

const status = cursor === queue.length ? "complete" : "exhausted";
const badWin = winEntries.filter((entry) =>
  entry.phase !== 9 || entry.input !== "right" || entry.movedMask !== 3
  || JSON.stringify(entry.origin) !== JSON.stringify({ x: 4, y: 13 })
);
const passed = status === "complete"
  && wrongStickyGeometry.length === 0
  && remotePartialEntries.length === 0
  && nonterminalRemoteAllEntries.length === 0
  && anchorMoveEntries.length === 0
  && prewinBoundaryEntries.length === 0
  && winEntries.length > 0
  && badWin.length === 0;

const report = {
  schema: "ra_preassembly_gate_transport_macro_v0",
  maxMacroStates,
  status,
  macroStates: seen.size,
  expanded: cursor,
  forceEdges,
  walkCellsScanned,
  heightsSeen: [...heightsSeen].sort((a, b) => a - b),
  quantifier: [
    "从唯一标准 full-merge 状态起算",
    "每个物体配置折叠纯走路连通域，但穷举域内每个真实 push/pull 施力边",
    "胜利状态为吸收边界；ordinary-C 直推边与远程黏块施力分开分类",
  ],
  assertions: {
    passed,
    wrongStickyGeometry: wrongStickyGeometry.length,
    remotePartialEntries: remotePartialEntries.length,
    nonterminalRemoteAllEntries: nonterminalRemoteAllEntries.length,
    anchorMoveEntries: anchorMoveEntries.length,
    prewinBoundaryEntries: prewinBoundaryEntries.length,
    winEntries: winEntries.length,
    badWinEntries: badWin.length,
  },
  firstWin: winEntries[0] ?? null,
  counterexamples: {
    wrongStickyGeometry,
    remotePartialEntries,
    nonterminalRemoteAllEntries,
    anchorMoveEntries,
    prewinBoundaryEntries,
    badWin: badWin.slice(0, 10),
  },
};

await writeFile(path.join(root, `transport_macro_${maxMacroStates}.json`), `${JSON.stringify(report, null, 2)}\n`, "utf8");
process.stdout.write(`${JSON.stringify({
  status,
  macroStates: report.macroStates,
  expanded: report.expanded,
  forceEdges,
  walkCellsScanned,
  heightsSeen: report.heightsSeen,
  assertions: report.assertions,
  firstWin: report.firstWin,
}, null, 2)}\n`);

function makeNode(state: RealityAnchorState): MacroNode {
  const region = walkRegion(state);
  const representative = region[0]!;
  const normalized = { ...state, player: { ...representative } };
  return { state: normalized, region, key: `${objectGeometry(normalized)}@${pointKey(representative)}` };
}

function walkRegion(state: RealityAnchorState): Point[] {
  const points: Point[] = [{ ...state.player }];
  const seenPoints = new Set<string>([pointKey(state.player)]);
  const occupied = occupiedKeys(state);
  const vectors: Record<InputId, Point> = {
    up: { x: 0, y: -1 }, down: { x: 0, y: 1 }, left: { x: -1, y: 0 }, right: { x: 1, y: 0 },
  };
  for (let cursor = 0; cursor < points.length; cursor += 1) {
    const player = points[cursor]!;
    for (const input of ["up", "down", "left", "right"] as InputId[]) {
      const vector = vectors[input];
      const destination = { x: player.x + vector.x, y: player.y + vector.y };
      const destinationKey = pointKey(destination);
      if (
        destination.x < 0 || destination.x >= state.width || destination.y < 0 || destination.y >= state.height
        || state.walls.has(destinationKey) || occupied.has(destinationKey)
      ) continue;
      if (forceModeAt(state, player) === "pull") {
        const behind = { x: player.x - vector.x, y: player.y - vector.y };
        if (occupied.has(pointKey(behind))) continue;
      }
      if (seenPoints.has(destinationKey)) continue;
      seenPoints.add(destinationKey);
      points.push(destination);
    }
  }
  return points.sort((left, right) => left.y - right.y || left.x - right.x);
}

function occupiedKeys(state: RealityAnchorState): Set<string> {
  const occupied = new Set(state.crates.map(pointKey));
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

function movesObject(events: string[]): boolean {
  return events.some((event) => event.startsWith("push_object:") || event.startsWith("pull_object:"));
}

function startsFromDirectCrate(events: string[]): boolean {
  const first = events.find((event) => event.startsWith("push_object:") || event.startsWith("pull_object:"));
  return first?.includes(":crate#") ?? false;
}

function pistonAdvanceMask(before: RealityAnchorState, after: RealityAnchorState): number {
  const beforeCrates = new Set(before.crates.map(pointKey));
  const afterCrates = new Set(after.crates.map(pointKey));
  return pistons.reduce((mask, piston, index) =>
    beforeCrates.has(pointKey(piston)) && afterCrates.has(pointKey(goals[index]!)) ? mask | (1 << index) : mask
  , 0);
}

function objectGeometry(state: RealityAnchorState): string {
  return JSON.stringify({
    crates: state.crates.map(pointKey).sort(),
    sticky: state.stickyGroups.map((group) => group.map(pointKey).sort()).sort((a, b) => a.join("|").localeCompare(b.join("|"))),
    pushPull: state.pushPullAnchor ? [pointKey(state.pushPullAnchor.push), pointKey(state.pushPullAnchor.pull)] : null,
    boxSticky: state.boxStickyAnchor ? [pointKey(state.boxStickyAnchor.box), pointKey(state.boxStickyAnchor.sticky)] : null,
  });
}

function stickyGeometry(state: RealityAnchorState): string {
  return JSON.stringify(
    state.stickyGroups.map((group) => group.map(pointKey).sort()).sort((a, b) => a.join("|").localeCompare(b.join("|"))),
  );
}

function stateAfter(start: RealityAnchorState, inputs: InputId[]): RealityAnchorState {
  let state = start;
  for (const input of inputs) {
    const result = step(pkg.mechanic, state, input);
    assert.equal(result.legal, true);
    state = result.state;
  }
  return state;
}

function reconstruct(key: string, start: string, parents: Map<string, MacroEdge>): Array<Record<string, unknown>> {
  const edges: Array<Record<string, unknown>> = [];
  let cursorKey = key;
  while (cursorKey !== start) {
    const edge = parents.get(cursorKey);
    if (!edge) break;
    edges.push({ input: edge.input, origin: edge.origin });
    cursorKey = edge.previous;
  }
  return edges.reverse();
}
