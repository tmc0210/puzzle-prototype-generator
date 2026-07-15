import assert from "node:assert/strict";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import { loadPrototypePackage } from "../../../../../../../src/core/io.js";
import type { InputId, LevelDoc, Point } from "../../../../../../../src/core/types.js";
import {
  forceModeAt,
  parseLevel,
  pointKey,
  step,
  type RealityAnchorState,
} from "../../../../../../../src/prototypes/reality_anchor/mechanics.js";

type MacroEdge = { previous: string; input: InputId; origin: Point };
type MacroNode = { state: RealityAnchorState; key: string; region: Point[] };

const root = path.resolve(
  "prototypes/reality_anchor/reports/explorer_giant_assembly_piston_challenge_20260715/exploration/runs/preassembly_gate_r7",
);
const layout = (await readFile(path.join(root, "layouts/preassembly_gate_r7_v0.layout.txt"), "utf8")).trimEnd();
const intended = JSON.parse(await readFile(path.join(root, "audit_v0.json"), "utf8")) as {
  intendedInputs: InputId[];
  summary: { fullMergeStep: number };
};
const pkg = await loadPrototypePackage(path.resolve("prototypes/reality_anchor"));
const initial = parseLevel({ id: "preassembly_gate_r7_macro", title: "preassembly_gate_r7_macro", layout } satisfies LevelDoc);
const maxMacroStates = Number(process.env.MAX_MACRO_STATES ?? 250_000);

const canonicalHr = stateAfter(initial, intended.intendedInputs.slice(0, 17));
const canonicalFull = stateAfter(initial, intended.intendedInputs.slice(0, intended.summary.fullMergeStep));
const canonicalHrGeometry = stickyGeometry(canonicalHr);
const canonicalFullGeometry = stickyGeometry(canonicalFull);

const start = makeNode(initial);
const queue: MacroNode[] = [start];
const seen = new Set<string>([start.key]);
const parent = new Map<string, MacroEdge>();
const depth = new Map<string, number>([[start.key, 0]]);
let cursor = 0;
let forceEdges = 0;
let walkCellsScanned = 0;
const profiles = new Set<string>();
const fullMergeEntries: Array<Record<string, unknown>> = [];
const wrongPairEntries: Array<Record<string, unknown>> = [];
const prematureUpEntries: Array<Record<string, unknown>> = [];
const noncanonicalHrEntries: Array<Record<string, unknown>> = [];
const noncanonicalFullEntries: Array<Record<string, unknown>> = [];
const anchorMoveEntries: Array<Record<string, unknown>> = [];

while (cursor < queue.length && seen.size < maxMacroStates) {
  const node = queue[cursor++]!;
  const profile = sizes(node.state);
  profiles.add(profile.join("+"));
  if (profile.length === 1 && profile[0] === 18) continue;
  walkCellsScanned += node.region.length;

  for (const origin of node.region) {
    const atOrigin = { ...node.state, player: { ...origin } };
    for (const input of ["up", "down", "left", "right"] as InputId[]) {
      const result = step(pkg.mechanic, atOrigin, input);
      if (!result.legal || !movesObject(result.events)) continue;
      forceEdges += 1;
      const next = makeNode(result.state);
      const nextProfile = sizes(result.state);
      const nextDepth = (depth.get(node.key) ?? 0) + 1;
      const macroTrace = (): Array<Record<string, unknown>> =>
        reconstruct(node.key, start.key, parent).concat({ input, origin, events: result.events });

      if (result.events.some((event) => event.startsWith("anchor_boundary_shift:"))) {
        if (anchorMoveEntries.length < 10) anchorMoveEntries.push({ depth: nextDepth, input, origin, events: result.events, macroTrace: macroTrace() });
      }
      if (nextProfile.includes(13)) {
        if (wrongPairEntries.length < 10) wrongPairEntries.push({ depth: nextDepth, input, origin, events: result.events, profile: nextProfile, macroTrace: macroTrace() });
      }
      if (nextProfile.includes(14) && stickyGeometry(result.state) !== canonicalHrGeometry) {
        if (noncanonicalHrEntries.length < 10) noncanonicalHrEntries.push({ depth: nextDepth, input, origin, events: result.events, profile: nextProfile, macroTrace: macroTrace() });
      }
      const becomesFull = nextProfile.length === 1 && nextProfile[0] === 18;
      const stickyMovedUp = input === "up" && result.events.some((event) =>
        event.startsWith("push_object:sticky#") || event.startsWith("pull_object:sticky#")
      );
      if (stickyMovedUp && !becomesFull) {
        if (prematureUpEntries.length < 10) {
          prematureUpEntries.push({
            depth: nextDepth,
            input,
            origin,
            events: result.events,
            profileBefore: profile,
            profileAfter: nextProfile,
            macroTrace: macroTrace(),
          });
        }
      }
      if (becomesFull) {
        const entry = {
          depth: nextDepth,
          input,
          origin,
          events: result.events,
          canonicalGeometry: stickyGeometry(result.state) === canonicalFullGeometry,
          macroTrace: macroTrace(),
        };
        if (fullMergeEntries.length < 100) fullMergeEntries.push(entry);
        if (!entry.canonicalGeometry && noncanonicalFullEntries.length < 10) noncanonicalFullEntries.push(entry);
      }

      if (seen.has(next.key)) continue;
      seen.add(next.key);
      parent.set(next.key, { previous: node.key, input, origin: { ...origin } });
      depth.set(next.key, nextDepth);
      queue.push(next);
    }
  }
}

const status = cursor === queue.length ? "complete" : "exhausted";
const passed = wrongPairEntries.length === 0
  && noncanonicalHrEntries.length === 0
  && prematureUpEntries.length === 0
  && fullMergeEntries.length > 0
  && noncanonicalFullEntries.length === 0
  && anchorMoveEntries.length === 0;

const report = {
  schema: "ra_preassembly_gate_macro_graph_v0",
  maxMacroStates,
  status,
  macroStates: seen.size,
  expanded: cursor,
  forceEdges,
  walkCellsScanned,
  profiles: [...profiles].sort(),
  quantifier: [
    "每个物体配置内穷举玩家的完整纯走路连通区域",
    "从区域内每个格点穷举四方向真实 push/pull 施力边",
    "完整18格首次合体设为吸收边界；运输相位另审",
  ],
  assertions: {
    passed,
    wrongPairEntries: wrongPairEntries.length,
    noncanonicalHrEntries: noncanonicalHrEntries.length,
    prematureUpEntries: prematureUpEntries.length,
    fullMergeEntries: fullMergeEntries.length,
    noncanonicalFullEntries: noncanonicalFullEntries.length,
    anchorMoveEntries: anchorMoveEntries.length,
    fullMergeMacroDepths: [...new Set(fullMergeEntries.map((entry) => entry.depth))].sort((a, b) => (a as number) - (b as number)),
  },
  firstFullMergeEntry: fullMergeEntries[0] ?? null,
  counterexamples: {
    wrongPairEntries: wrongPairEntries.slice(0, 10),
    noncanonicalHrEntries: noncanonicalHrEntries.slice(0, 10),
    prematureUpEntries: prematureUpEntries.slice(0, 10),
    noncanonicalFullEntries: noncanonicalFullEntries.slice(0, 10),
    anchorMoveEntries: anchorMoveEntries.slice(0, 10),
  },
};

await writeFile(path.join(root, `preassembly_macro_${maxMacroStates}.json`), `${JSON.stringify(report, null, 2)}\n`, "utf8");
process.stdout.write(`${JSON.stringify({
  status,
  macroStates: report.macroStates,
  expanded: report.expanded,
  forceEdges,
  walkCellsScanned,
  profiles: report.profiles,
  assertions: report.assertions,
}, null, 2)}\n`);

function makeNode(state: RealityAnchorState): MacroNode {
  const region = walkRegion(state);
  const representative = region[0]!;
  const normalized = { ...state, player: { ...representative } };
  return {
    state: normalized,
    region,
    key: `${objectGeometry(normalized)}@${pointKey(representative)}`,
  };
}

function walkRegion(state: RealityAnchorState): Point[] {
  const start = { ...state.player };
  const points: Point[] = [start];
  const seenPoints = new Set<string>([pointKey(start)]);
  const occupied = occupiedKeys(state);
  const vectors: Record<InputId, Point> = {
    up: { x: 0, y: -1 },
    down: { x: 0, y: 1 },
    left: { x: -1, y: 0 },
    right: { x: 1, y: 0 },
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
      const key = destinationKey;
      if (seenPoints.has(key)) continue;
      seenPoints.add(key);
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

function sizes(state: RealityAnchorState): number[] {
  return state.stickyGroups.map((group) => group.length).sort((a, b) => a - b);
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
