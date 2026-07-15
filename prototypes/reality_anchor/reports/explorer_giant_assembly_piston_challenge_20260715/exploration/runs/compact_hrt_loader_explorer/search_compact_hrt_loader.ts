import fs from "node:fs";
import path from "node:path";
import { parse } from "yaml";

import type { Direction, LevelDoc, MechanicDoc, Point } from "../../../../../../../src/core/types.js";
import {
  cloneState,
  forceModeAt,
  isWin,
  parseLevel,
  pointKey,
  stateKey,
  step,
  type RealityAnchorState,
} from "../../../../../../../src/prototypes/reality_anchor/mechanics.js";

const directions: Direction[] = ["up", "down", "left", "right"];
const vectors: Record<Direction, Point> = {
  up: { x: 0, y: -1 },
  down: { x: 0, y: 1 },
  left: { x: -1, y: 0 },
  right: { x: 1, y: 0 },
};

const runDir = path.resolve(import.meta.dirname);
const repoRoot = path.resolve(runDir, "../../../../../../..");
const mechanic = parse(
  fs.readFileSync(path.join(repoRoot, "prototypes/reality_anchor/mechanic.yml"), "utf8"),
) as MechanicDoc;
const layoutPath = path.join(runDir, "layouts/compact_hrt_loader_v1.layout.txt");
const layout = fs.readFileSync(layoutPath, "utf8").trimEnd();
const level: LevelDoc = { id: "compact_hrt_loader_v1", title: "compact HRT loader v1", layout };

const exactInputs: Direction[] = [
  ...Array<Direction>(5).fill("up"),
  "left",
  "left",
  "down",
  "right",
  "left",
  ...Array<Direction>(3).fill("up"),
  ...Array<Direction>(11).fill("right"),
  ...Array<Direction>(9).fill("up"),
  ...Array<Direction>(11).fill("left"),
  ...Array<Direction>(3).fill("down"),
  "right",
  "right",
];

const registeredPieces: Record<"H" | "R" | "T", Point[]> = {
  H: [
    { x: 12, y: 4 },
    { x: 12, y: 5 },
    { x: 12, y: 6 },
    { x: 12, y: 7 },
    { x: 12, y: 8 },
    { x: 13, y: 4 },
    { x: 13, y: 8 },
  ],
  R: [
    { x: 6, y: 6 },
    { x: 7, y: 6 },
    { x: 8, y: 6 },
    { x: 9, y: 6 },
    { x: 10, y: 6 },
    { x: 11, y: 6 },
    { x: 8, y: 5 },
  ],
  T: [
    { x: 4, y: 6 },
    { x: 5, y: 6 },
    { x: 5, y: 7 },
    { x: 5, y: 8 },
    { x: 5, y: 9 },
    { x: 5, y: 10 },
    { x: 6, y: 10 },
  ],
};

function targetMask(state: RealityAnchorState): number {
  const occupied = occupiedKeys(state);
  const goals = [...state.goals].sort((a, b) => Number(a.split(",")[1]) - Number(b.split(",")[1]));
  return goals.reduce((mask, goal, index) => mask | (occupied.has(goal) ? 1 << index : 0), 0);
}

function occupiedKeys(state: RealityAnchorState): Set<string> {
  return new Set([
    ...state.crates.map(pointKey),
    ...state.stickyGroups.flat().map(pointKey),
    ...(state.pushPullAnchor
      ? [pointKey(state.pushPullAnchor.push), pointKey(state.pushPullAnchor.pull)]
      : []),
    ...(state.boxStickyAnchor
      ? [pointKey(state.boxStickyAnchor.box), pointKey(state.boxStickyAnchor.sticky)]
      : []),
  ]);
}

function add(point: Point, direction: Direction): Point {
  const vector = vectors[direction];
  return { x: point.x + vector.x, y: point.y + vector.y };
}

function subtract(point: Point, direction: Direction): Point {
  const vector = vectors[direction];
  return { x: point.x - vector.x, y: point.y - vector.y };
}

function isFree(state: RealityAnchorState, point: Point, occupied = occupiedKeys(state)): boolean {
  return point.x >= 0 && point.y >= 0 && point.x < state.width && point.y < state.height &&
    !state.walls.has(pointKey(point)) && !occupied.has(pointKey(point));
}

function reachablePlayerPoints(state: RealityAnchorState): Point[] {
  const occupied = occupiedKeys(state);
  const queue: Point[] = [{ ...state.player }];
  const seen = new Set<string>([pointKey(state.player)]);
  for (let cursor = 0; cursor < queue.length; cursor += 1) {
    const current = queue[cursor]!;
    for (const direction of directions) {
      const next = add(current, direction);
      const key = pointKey(next);
      if (!seen.has(key) && isFree(state, next, occupied)) {
        seen.add(key);
        queue.push(next);
      }
    }
  }
  return queue;
}

type RightPushObservation = {
  origin: Point;
  legal: boolean;
  reason?: string;
  events: string[];
  maskBefore: number;
  maskAfter: number;
};

function scanReachableRightPushes(state: RealityAnchorState): RightPushObservation[] {
  const observations: RightPushObservation[] = [];
  for (const origin of reachablePlayerPoints(state)) {
    const atOrigin = cloneState(state);
    atOrigin.player = origin;
    const result = step(mechanic, atOrigin, "right");
    if (!result.events.some((event) => event.startsWith("push_object:"))) {
      continue;
    }
    observations.push({
      origin,
      legal: result.legal,
      reason: result.reason,
      events: result.events,
      maskBefore: targetMask(atOrigin),
      maskAfter: targetMask(result.state),
    });
  }
  return observations;
}

function connectedComponents(cells: Point[]): Point[][] {
  const byKey = new Map(cells.map((cell) => [pointKey(cell), cell]));
  const seen = new Set<string>();
  const components: Point[][] = [];
  for (const cell of cells) {
    const startKey = pointKey(cell);
    if (seen.has(startKey)) {
      continue;
    }
    const queue = [cell];
    const component: Point[] = [];
    seen.add(startKey);
    for (let cursor = 0; cursor < queue.length; cursor += 1) {
      const current = queue[cursor]!;
      component.push(current);
      for (const direction of directions) {
        const neighbor = add(current, direction);
        const key = pointKey(neighbor);
        const found = byKey.get(key);
        if (found && !seen.has(key)) {
          seen.add(key);
          queue.push(found);
        }
      }
    }
    components.push(component.sort(pointCompare));
  }
  return components.sort((a, b) => pointCompare(a[0]!, b[0]!));
}

function pointCompare(a: Point, b: Point): number {
  return a.y - b.y || a.x - b.x;
}

function replayWithCheckpoints(): {
  final: RealityAnchorState;
  beforeFinal: RealityAnchorState;
  transport: Array<{ offset: number; state: RealityAnchorState }>;
} {
  let state = parseLevel(level);
  const transport: Array<{ offset: number; state: RealityAnchorState }> = [];
  let beforeFinal = state;
  for (const [index, input] of exactInputs.entries()) {
    if (index === 24) {
      transport.push({ offset: 9, state: cloneState(state) });
    }
    if (index === exactInputs.length - 1) {
      beforeFinal = cloneState(state);
    }
    const result = step(mechanic, state, input);
    if (!result.legal) {
      throw new Error(`exact trace step ${index + 1} is illegal: ${result.reason}`);
    }
    state = result.state;
    if (index >= 24 && index <= 32) {
      transport.push({ offset: 32 - index, state: cloneState(state) });
    }
  }
  return { final: state, beforeFinal, transport };
}

function subsetAudit(base: RealityAnchorState): Record<string, unknown> {
  const names = ["H", "R", "T"] as const;
  const results: Record<string, unknown> = {};
  for (let mask = 1; mask < 1 << names.length; mask += 1) {
    const selected = names.filter((_, index) => (mask & (1 << index)) !== 0);
    const cells = selected.flatMap((name) => registeredPieces[name].map((point) => ({ ...point })));
    const state = cloneState(base);
    state.stickyGroups = connectedComponents(cells);
    state.player = { x: 1, y: 3 };
    const observations = scanReachableRightPushes(state);
    results[selected.join("")] = {
      suppliedCellCount: cells.length,
      stickyGroupCount: state.stickyGroups.length,
      rightPushCount: observations.length,
      targetChanging: observations.filter((item) => item.maskAfter !== item.maskBefore),
    };
  }
  return results;
}

function objectConfigKey(state: RealityAnchorState): string {
  const clone = cloneState(state);
  clone.player = { x: 0, y: 0 };
  return stateKey(clone).replace(/^Ply:[^|]+\|/, "");
}

function canonicalizePlayerComponent(state: RealityAnchorState): RealityAnchorState {
  const points = reachablePlayerPoints(state).sort((a, b) => a.y - b.y || a.x - b.x);
  const result = cloneState(state);
  result.player = points[0] ?? state.player;
  return result;
}

type MacroNode = { state: RealityAnchorState; depth: number };

function macroSearch(maxStates: number, maxObjectDepth: number): Record<string, unknown> {
  const initial = canonicalizePlayerComponent(parseLevel(level));
  const queue: MacroNode[] = [{ state: initial, depth: 0 }];
  const indexByKey = new Map<string, number>([[stateKey(initial), 0]]);
  let cursor = 0;
  let transitionCount = 0;
  let depthCutCount = 0;
  let anchorShiftCount = 0;
  let preWinSplitOrConversionCount = 0;
  const partialRightTargetTransitions: Array<Record<string, unknown>> = [];
  const allRightTargetTransitions: Array<Record<string, unknown>> = [];
  const winIndexes: number[] = [];

  while (cursor < queue.length && queue.length < maxStates) {
    const nodeIndex = cursor;
    const node = queue[cursor]!;
    cursor += 1;
    if (isWin(node.state, mechanic.win)) {
      winIndexes.push(nodeIndex);
      continue;
    }
    if (node.depth >= maxObjectDepth) {
      depthCutCount += 1;
      continue;
    }
    const occupied = occupiedKeys(node.state);
    for (const origin of reachablePlayerPoints(node.state)) {
      const mode = forceModeAt(node.state, origin);
      for (const direction of directions) {
        const contact = mode === "push" ? add(origin, direction) : subtract(origin, direction);
        if (!occupied.has(pointKey(contact))) {
          continue;
        }
        const atOrigin = cloneState(node.state);
        atOrigin.player = origin;
        const beforeConfig = objectConfigKey(atOrigin);
        const beforeMask = targetMask(atOrigin);
        const result = step(mechanic, atOrigin, direction);
        if (!result.legal || objectConfigKey(result.state) === beforeConfig) {
          continue;
        }
        transitionCount += 1;
        const afterMask = targetMask(result.state);
        if (result.events.some((event) => event.startsWith("anchor_boundary_shift:"))) {
          anchorShiftCount += 1;
        }
        if (
          !isWin(result.state, mechanic.win) &&
          result.events.some((event) => event.startsWith("sticky_to_box:") || event.startsWith("sticky_split:"))
        ) {
          preWinSplitOrConversionCount += 1;
        }
        if (direction === "right" && result.events.some((event) => event.startsWith("push_object:")) && afterMask !== beforeMask) {
          const observation = {
            nodeIndex,
            depth: node.depth,
            origin,
            beforeMask,
            afterMask,
            events: result.events,
          };
          if (afterMask === 3) {
            allRightTargetTransitions.push(observation);
          } else {
            partialRightTargetTransitions.push(observation);
          }
        }
        const canonical = canonicalizePlayerComponent(result.state);
        const key = stateKey(canonical);
        if (!indexByKey.has(key)) {
          indexByKey.set(key, queue.length);
          queue.push({ state: canonical, depth: node.depth + 1 });
          if (queue.length >= maxStates) {
            break;
          }
        }
      }
      if (queue.length >= maxStates) {
        break;
      }
    }
  }

  return {
    status: queue.length >= maxStates ? "state_budget_exhausted" : depthCutCount > 0 ? "depth_bounded" : "complete",
    maxStates,
    maxObjectDepth,
    macroStates: queue.length,
    expandedStates: cursor,
    objectTransitions: transitionCount,
    depthCutCount,
    winStateCount: winIndexes.length,
    winDepths: [...new Set(winIndexes.map((index) => queue[index]!.depth))].sort((a, b) => a - b),
    partialRightTargetTransitionCount: partialRightTargetTransitions.length,
    partialRightTargetTransitions: partialRightTargetTransitions.slice(0, 20),
    allRightTargetTransitionCount: allRightTargetTransitions.length,
    allRightTargetTransitions: allRightTargetTransitions.slice(0, 20),
    anchorShiftTransitionCount: anchorShiftCount,
    preWinSplitOrConversionTransitionCount: preWinSplitOrConversionCount,
  };
}

const replay = replayWithCheckpoints();
const transportAudit = replay.transport.map(({ offset, state }) => {
  const observations = scanReachableRightPushes(state);
  return {
    offset,
    reachablePlayerCellCount: reachablePlayerPoints(state).length,
    legalRightPushCount: observations.length,
    targetChanging: observations.filter((item) => item.maskAfter !== item.maskBefore),
  };
});

const report = {
  layout: path.relative(runDir, layoutPath).replaceAll("\\", "/"),
  exactTrace: {
    stepCount: exactInputs.length,
    finalWin: isWin(replay.final, mechanic.win),
    finalMask: targetMask(replay.final),
  },
  transportAudit,
  registeredSubsetAudit: subsetAudit(replay.beforeFinal),
  macroSearch: macroSearch(8_000, 16),
};

const reportDir = path.join(runDir, "reports");
fs.mkdirSync(reportDir, { recursive: true });
fs.writeFileSync(path.join(reportDir, "search_audit.json"), `${JSON.stringify(report, null, 2)}\n`);
console.log(JSON.stringify(report, null, 2));
