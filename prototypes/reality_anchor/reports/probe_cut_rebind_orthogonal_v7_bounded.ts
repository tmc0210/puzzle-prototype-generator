import { readFile } from "node:fs/promises";
import { loadPrototypePackage } from "../../../src/core/io.js";
import { eventMatchesPattern } from "../../../src/core/events.js";
import type { LevelDoc } from "../../../src/core/types.js";
import { getRuntimeAdapter } from "../../../src/prototypes/runtimeAdapter.js";

const prototypePath = "prototypes/reality_anchor";
const layoutPath = "prototypes/reality_anchor/reports/RA_FRESH_2026_07_12_CUT_REBIND_ORTHOGONAL_layout_v7.txt";
const pkg = await loadPrototypePackage(prototypePath);
const layout = (await readFile(layoutPath, "utf8")).trimEnd();
const level: LevelDoc = {
  id: "RA_FRESH_2026_07_12_CUT_REBIND_ORTHOGONAL_v7",
  title: "RA_FRESH_2026_07_12_CUT_REBIND_ORTHOGONAL_v7",
  layout,
  win: pkg.mechanic.win,
};
const adapter = getRuntimeAdapter(pkg.mechanic);
const runtime = adapter.createRuntime(pkg.mechanic);
const initial = adapter.parseLevel(level);
const winCondition = level.win ?? pkg.mechanic.win;
const requiredEvents = [
  "anchor_boundary_shift:push_pull",
  "anchor_boundary_shift:box_sticky",
  "sticky_to_box",
  "sticky_split",
  "box_to_sticky",
  "sticky_merge",
  "move_sticky_rigid",
];

type AvoidScan = {
  event: string;
  result: "complete_no_bypass" | "bypass_found" | "exhausted";
  exploredStates: number;
  maxDepthReached: number;
  bypassInputs: string[];
  bypassEvents: string[];
};

function scanWinAvoidingEvent(pattern: string, maxStates = 750_000, maxDepth?: number): AvoidScan {
  const initialKey = runtime.key(initial);
  const queue: Array<{ state: unknown; key: string; depth: number }> = [
    { state: initial, key: initialKey, depth: 0 },
  ];
  const visited = new Set<string>([initialKey]);
  const parent = new Map<string, { prev: string; action: string; events: string[] }>();
  let cursor = 0;
  let maxDepthReached = 0;

  while (cursor < queue.length) {
    if (visited.size > maxStates) {
      return { event: pattern, result: "exhausted", exploredStates: visited.size, maxDepthReached, bypassInputs: [], bypassEvents: [] };
    }
    const current = queue[cursor++]!;
    maxDepthReached = Math.max(maxDepthReached, current.depth);
    if (maxDepth !== undefined && current.depth >= maxDepth) continue;
    for (const action of runtime.actions(current.state, { winCondition })) {
      const step = runtime.step(current.state, action, { winCondition });
      if (!step.legal || step.events.some((event) => eventMatchesPattern(event, pattern))) continue;
      const key = runtime.key(step.state);
      if (visited.has(key)) continue;
      visited.add(key);
      parent.set(key, { prev: current.key, action, events: step.events });
      if (runtime.isWin(step.state, winCondition)) {
        const inputs: string[] = [];
        const eventChunks: string[][] = [];
        let cursorKey = key;
        while (cursorKey !== initialKey) {
          const edge = parent.get(cursorKey)!;
          inputs.push(edge.action);
          eventChunks.push(edge.events);
          cursorKey = edge.prev;
        }
        return {
          event: pattern,
          result: "bypass_found",
          exploredStates: visited.size,
          maxDepthReached: current.depth + 1,
          bypassInputs: inputs.reverse(),
          bypassEvents: eventChunks.reverse().flat(),
        };
      }
      queue.push({ state: step.state, key, depth: current.depth + 1 });
    }
  }
  return { event: pattern, result: "complete_no_bypass", exploredStates: visited.size, maxDepthReached, bypassInputs: [], bypassEvents: [] };
}

const requiredEventScans = requiredEvents.map((event) => scanWinAvoidingEvent(event));

type FrontierEntry = {
  state: unknown;
  count: number;
  representativeInputs: string[];
  representativeEvents: string[];
};
let frontier = new Map<string, FrontierEntry>([
  [runtime.key(initial), { state: initial, count: 1, representativeInputs: [], representativeEvents: [] }],
]);
const visitedDepth = new Map<string, number>([[runtime.key(initial), 0]]);
let shortestDepth: number | undefined;
let shortestPathCount = 0;
const shortestWinStates = new Set<string>();
const shortestExamples: Array<{ inputs: string[]; events: string[]; finalState: string }> = [];
let layerTransitions = 0;

for (let depth = 0; depth < 80 && frontier.size > 0 && shortestDepth === undefined; depth += 1) {
  const next = new Map<string, FrontierEntry>();
  for (const entry of frontier.values()) {
    for (const action of runtime.actions(entry.state, { winCondition })) {
      const result = runtime.step(entry.state, action, { winCondition });
      if (!result.legal) continue;
      layerTransitions += 1;
      const nextInputs = [...entry.representativeInputs, action];
      const nextEvents = [...entry.representativeEvents, ...result.events];
      const nextKey = runtime.key(result.state);
      if (runtime.isWin(result.state, winCondition)) {
        shortestDepth = depth + 1;
        shortestPathCount += entry.count;
        shortestWinStates.add(nextKey);
        if (shortestExamples.length < 8) {
          shortestExamples.push({
            inputs: nextInputs,
            events: nextEvents,
            finalState: adapter.renderState(result.state),
          });
        }
        continue;
      }
      if (shortestDepth !== undefined) continue;
      const priorDepth = visitedDepth.get(nextKey);
      if (priorDepth !== undefined && priorDepth < depth + 1) continue;
      const existing = next.get(nextKey);
      if (existing) {
        existing.count = Math.min(1_000_000_000, existing.count + entry.count);
      } else {
        visitedDepth.set(nextKey, depth + 1);
        next.set(nextKey, {
          state: result.state,
          count: entry.count,
          representativeInputs: nextInputs,
          representativeEvents: nextEvents,
        });
      }
    }
  }
  frontier = next;
}

console.log(JSON.stringify({
  candidateVersion: level.id,
  requiredWinningEventScans: {
    requiredEvents,
    scans: requiredEventScans,
  },
  shortestSolutionEnumeration: {
    status: shortestDepth === undefined ? "not_found_within_depth" : "complete_through_first_win_depth",
    shortestDepth,
    shortestPathCount,
    shortestWinStateCount: shortestWinStates.size,
    layerTransitions,
    examples: shortestExamples,
  },
}, null, 2));
