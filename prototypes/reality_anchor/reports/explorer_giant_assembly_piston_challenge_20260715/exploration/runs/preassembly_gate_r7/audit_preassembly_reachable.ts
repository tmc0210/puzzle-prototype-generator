import assert from "node:assert/strict";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import { loadPrototypePackage } from "../../../../../../../src/core/io.js";
import type { InputId, LevelDoc } from "../../../../../../../src/core/types.js";
import {
  parseLevel,
  pointKey,
  stateKey,
  step,
  type RealityAnchorState,
} from "../../../../../../../src/prototypes/reality_anchor/mechanics.js";

type ParentEdge = { previous: string; input: InputId };

const root = path.resolve(
  "prototypes/reality_anchor/reports/explorer_giant_assembly_piston_challenge_20260715/exploration/runs/preassembly_gate_r7",
);
const layout = (await readFile(path.join(root, "layouts/preassembly_gate_r7_v0.layout.txt"), "utf8")).trimEnd();
const intended = JSON.parse(await readFile(path.join(root, "audit_v0.json"), "utf8")) as { intendedInputs: InputId[] };
const pkg = await loadPrototypePackage(path.resolve("prototypes/reality_anchor"));
const initial = parseLevel({ id: "preassembly_gate_r7_pregraph", title: "preassembly_gate_r7_pregraph", layout } satisfies LevelDoc);
const maxStates = Number(process.env.MAX_STATES ?? 500_000);

const canonicalHr = stateAfter(initial, intended.intendedInputs.slice(0, 17));
const canonicalFull = stateAfter(initial, intended.intendedInputs.slice(0, 40));
const canonicalHrGeometry = objectGeometry(canonicalHr);
const canonicalFullGeometry = objectGeometry(canonicalFull);

const initialKey = stateKey(initial);
const queue: RealityAnchorState[] = [initial];
const queueKeys = [initialKey];
const seen = new Set<string>([initialKey]);
const parent = new Map<string, ParentEdge>();
let cursor = 0;
let transitions = 0;
let maxDepth = 0;
const depth = new Map<string, number>([[initialKey, 0]]);
const groupSizeProfiles = new Set<string>();
const anchorPoses = { pushPull: new Set<string>(), boxSticky: new Set<string>() };
const fullMergeEntries: Array<Record<string, unknown>> = [];
const wrongPairEntries: Array<Record<string, unknown>> = [];
const prematureUpEntries: Array<Record<string, unknown>> = [];
const noncanonicalHrEntries: Array<Record<string, unknown>> = [];
const noncanonicalFullEntries: Array<Record<string, unknown>> = [];

while (cursor < queue.length && seen.size < maxStates) {
  const current = queue[cursor]!;
  const from = queueKeys[cursor]!;
  cursor += 1;
  const profile = sizes(current);
  groupSizeProfiles.add(profile.join("+"));
  if (current.pushPullAnchor) anchorPoses.pushPull.add(`${pointKey(current.pushPullAnchor.push)}|${pointKey(current.pushPullAnchor.pull)}`);
  if (current.boxStickyAnchor) anchorPoses.boxSticky.add(`${pointKey(current.boxStickyAnchor.box)}|${pointKey(current.boxStickyAnchor.sticky)}`);

  // 完整合体是本审计的吸收边界；之后由运输相位审计接手。
  if (profile.length === 1 && profile[0] === 20) continue;

  for (const input of ["up", "down", "left", "right"] as InputId[]) {
    const result = step(pkg.mechanic, current, input);
    if (!result.legal) continue;
    transitions += 1;
    const next = result.state;
    const nextProfile = sizes(next);
    const to = stateKey(next);
    const nextDepth = (depth.get(from) ?? 0) + 1;
    const trace = (): InputId[] => reconstruct(from, initialKey, parent).concat(input);

    if (nextProfile.includes(13)) {
      wrongPairEntries.push({ depth: nextDepth, input, events: result.events, profile: nextProfile, trace: trace() });
    }
    if (nextProfile.includes(14) && objectGeometry(next) !== canonicalHrGeometry) {
      noncanonicalHrEntries.push({ depth: nextDepth, input, events: result.events, profile: nextProfile, trace: trace() });
    }

    const stickyMovedUp = input === "up" && result.events.some((event) =>
      event.startsWith("push_object:sticky#") || event.startsWith("pull_object:sticky#")
    );
    const becomesFull = nextProfile.length === 1 && nextProfile[0] === 20;
    if (stickyMovedUp && !becomesFull) {
      prematureUpEntries.push({ depth: nextDepth, input, events: result.events, profileBefore: profile, profileAfter: nextProfile, trace: trace() });
    }

    if (becomesFull) {
      const entry = {
        depth: nextDepth,
        input,
        events: result.events,
        playerBefore: current.player,
        playerAfter: next.player,
        trace: trace(),
        canonicalGeometry: objectGeometry(next) === canonicalFullGeometry,
      };
      fullMergeEntries.push(entry);
      if (!entry.canonicalGeometry) noncanonicalFullEntries.push(entry);
    }

    if (seen.has(to)) continue;
    seen.add(to);
    parent.set(to, { previous: from, input });
    depth.set(to, nextDepth);
    maxDepth = Math.max(maxDepth, nextDepth);
    queue.push(next);
    queueKeys.push(to);
  }
}

const status = cursor === queue.length ? "complete" : "exhausted";
assert.equal(status, "complete", `预合体状态图在 ${maxStates} 状态预算内未闭合`);
assert.equal(wrongPairEntries.length, 0, "H/R 之外的二件粘合可达");
assert.equal(noncanonicalHrEntries.length, 0, "H/R 可在非 dock 位姿粘合");
assert.equal(prematureUpEntries.length, 0, "完整合体前有组件/子装配进入上行运输");
assert.ok(fullMergeEntries.length > 0, "完整合体不可达");
assert.equal(noncanonicalFullEntries.length, 0, "存在非标准完整合体位姿");
assert.deepEqual([...anchorPoses.pushPull], ["9,1|10,1"]);
assert.deepEqual([...anchorPoses.boxSticky], ["10,2|9,2"]);

const report = {
  schema: "ra_preassembly_gate_reachable_phase_v0",
  maxStates,
  status,
  states: seen.size,
  expanded: cursor,
  transitions,
  maxDepth,
  groupSizeProfiles: [...groupSizeProfiles].sort(),
  anchorPoses: {
    pushPull: [...anchorPoses.pushPull],
    boxSticky: [...anchorPoses.boxSticky],
  },
  assertions: {
    wrongPairEntries: wrongPairEntries.length,
    noncanonicalHrEntries: noncanonicalHrEntries.length,
    prematureUpEntries: prematureUpEntries.length,
    fullMergeEntries: fullMergeEntries.length,
    noncanonicalFullEntries: noncanonicalFullEntries.length,
    fullMergeDepths: [...new Set(fullMergeEntries.map((entry) => entry.depth))].sort((a, b) => (a as number) - (b as number)),
  },
  firstFullMergeEntry: fullMergeEntries[0] ?? null,
  counterexamples: {
    wrongPairEntries: wrongPairEntries.slice(0, 10),
    noncanonicalHrEntries: noncanonicalHrEntries.slice(0, 10),
    prematureUpEntries: prematureUpEntries.slice(0, 10),
    noncanonicalFullEntries: noncanonicalFullEntries.slice(0, 10),
  },
};

await writeFile(path.join(root, `preassembly_reachable_${maxStates}.json`), `${JSON.stringify(report, null, 2)}\n`, "utf8");
process.stdout.write(`${JSON.stringify({
  status,
  states: report.states,
  expanded: report.expanded,
  transitions,
  maxDepth,
  groupSizeProfiles: report.groupSizeProfiles,
  assertions: report.assertions,
}, null, 2)}\n`);

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

function stateAfter(start: RealityAnchorState, inputs: InputId[]): RealityAnchorState {
  let state = start;
  for (const input of inputs) {
    const result = step(pkg.mechanic, state, input);
    assert.equal(result.legal, true);
    state = result.state;
  }
  return state;
}

function reconstruct(key: string, start: string, parents: Map<string, ParentEdge>): InputId[] {
  const inputs: InputId[] = [];
  let cursorKey = key;
  while (cursorKey !== start) {
    const edge = parents.get(cursorKey);
    if (!edge) break;
    inputs.push(edge.input);
    cursorKey = edge.previous;
  }
  return inputs.reverse();
}
