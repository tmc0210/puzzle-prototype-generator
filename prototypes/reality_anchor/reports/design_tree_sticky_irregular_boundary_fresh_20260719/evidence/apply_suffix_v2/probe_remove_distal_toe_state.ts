import { createHash } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";
import { loadPrototypePackage } from "../../../../../../src/core/io.js";
import type { InputId, LevelDoc, Point } from "../../../../../../src/core/types.js";
import {
  cloneState,
  pointKey,
  type RealityAnchorState,
} from "../../../../../../src/prototypes/reality_anchor/mechanics.js";
import { getRuntimeAdapter } from "../../../../../../src/prototypes/runtimeAdapter.js";

const layoutRef =
  "prototypes/reality_anchor/reports/design_tree_sticky_irregular_boundary_fresh_20260719/nodes/apply_suffix_001/layout.txt";
const snapshotRef =
  "prototypes/reality_anchor/reports/design_tree_sticky_irregular_boundary_fresh_20260719/nodes/apply_suffix_001/diagnostics/counterfactual_remove_distal_toe_core_snapshot.yml";
const outputRef =
  "prototypes/reality_anchor/reports/design_tree_sticky_irregular_boundary_fresh_20260719/evidence/apply_suffix_v2/remove_distal_toe_state_probe.json";
const canonicalPrefix = ["left", "down", "left", "up", "right", "up", "left"] as InputId[];
const removedToe: Point = { x: 4, y: 4 };

const pkg = await loadPrototypePackage("prototypes/reality_anchor");
const adapter = getRuntimeAdapter(pkg.mechanic);
const runtime = adapter.createRuntime(pkg.mechanic);
const layoutBytes = await readFile(layoutRef);
const layoutSha256 = createHash("sha256").update(layoutBytes).digest("hex");
const layout = layoutBytes.toString("utf8").replace(/\r/g, "").replace(/\n+$/g, "");
const level: LevelDoc = {
  id: "RA_STICKY_IRREGULAR_APPLY_SUFFIX_001_V2_CF_REMOVE_DISTAL_TOE_STATE",
  title: "RA_STICKY_IRREGULAR_APPLY_SUFFIX_001_V2_CF_REMOVE_DISTAL_TOE_STATE",
  role: "challenge",
  status: "candidate",
  targets: ["K_runtime_smoke"],
  known_before: ["K_runtime_smoke"],
  target_learning: ["K_runtime_smoke"],
  support_level: "none",
  expected_solver_evidence: ["solvable"],
  expected_llm_player_evidence: [],
  layout,
};

let source = adapter.parseLevel(level) as RealityAnchorState;
const prefixSteps: Array<{ step: number; input: InputId; legal: boolean; events: string[]; key: string }> = [];
for (const [index, input] of canonicalPrefix.entries()) {
  const transition = runtime.step(source, input, { winCondition: pkg.mechanic.win });
  prefixSteps.push({
    step: index + 1,
    input,
    legal: transition.legal,
    events: transition.events,
    key: runtime.key(transition.legal ? transition.state : source),
  });
  if (!transition.legal) {
    throw new Error(`canonical prefix failed at step ${index + 1}: ${transition.reason ?? "unknown"}`);
  }
  source = transition.state as RealityAnchorState;
}

const expectedSourceKey =
  "Ply:6,4|C:|M:5,3;6,3;4,4;5,4|PL:none|BS:B:4,2;S:4,3";
if (runtime.key(source) !== expectedSourceKey) {
  throw new Error(`unexpected step-7 source key: ${runtime.key(source)}`);
}
const expectedGoals = ["4,1", "4,3"];
if (JSON.stringify([...source.goals].sort()) !== JSON.stringify(expectedGoals)) {
  throw new Error(`unexpected goals: ${JSON.stringify([...source.goals].sort())}`);
}
if (!source.stickyGroups.some((group) => group.some((cell) => pointKey(cell) === pointKey(removedToe)))) {
  throw new Error("distal toe 4,4 is absent from source state");
}

const counterfactual = cloneState(source);
counterfactual.stickyGroups = counterfactual.stickyGroups
  .map((group) => group.filter((cell) => pointKey(cell) !== pointKey(removedToe)))
  .filter((group) => group.length > 0);
const beforeKey = runtime.key(counterfactual);
const beforeRender = adapter.renderState(counterfactual);
const transition = runtime.step(counterfactual, "up", { winCondition: pkg.mechanic.win });
const after = transition.legal ? (transition.state as RealityAnchorState) : counterfactual;

const report = {
  id: "RA_STICKY_IRREGULAR_APPLY_SUFFIX_001_V2_CF_REMOVE_DISTAL_TOE_STATE",
  prototype: "reality_anchor",
  exact: {
    candidateId: "RA_STICKY_IRREGULAR_APPLY_SUFFIX_001",
    exactVersion: "v2",
    layoutRef,
    layoutSha256,
  },
  sourceSnapshot: {
    declaredSnapshotRef: snapshotRef,
    derivation: "current exact canonical replay after step 7",
    canonicalPrefix,
    prefixSteps,
    key: runtime.key(source),
    goals: [...source.goals].sort(),
    player: source.player,
    stickyGroups: source.stickyGroups,
    boxStickyAnchor: source.boxStickyAnchor,
    render: adapter.renderState(source),
    overlayEncodingLimit:
      "ASCII render shows S at 4,3 and cannot display the underlying goal; state.goals independently retains 4,3.",
  },
  isolatedChange: {
    kind: "delete_single_sticky_cell",
    removedCell: removedToe,
    preservedGoals: [...counterfactual.goals].sort(),
    preservedPlayer: counterfactual.player,
    preservedBoxStickyAnchor: counterfactual.boxStickyAnchor,
  },
  replay: {
    inputs: ["up"],
    before: { key: beforeKey, render: beforeRender, isWin: runtime.isWin(counterfactual, pkg.mechanic.win) },
    step: {
      action: "up",
      legal: transition.legal,
      reason: transition.reason,
      events: transition.events,
    },
    after: {
      key: runtime.key(after),
      render: adapter.renderState(after),
      goals: [...after.goals].sort(),
      player: after.player,
      stickyGroups: after.stickyGroups,
      boxStickyAnchor: after.boxStickyAnchor,
      isWin: runtime.isWin(after, pkg.mechanic.win),
    },
  },
  evidenceBoundary:
    "This probe supports only the single-cell distal-toe responsibility from the exact step-7 state; it is not a standalone layout or a quality verdict.",
};

await writeFile(outputRef, `${JSON.stringify(report, null, 2)}\n`, "utf8");
console.log(JSON.stringify({
  outputRef,
  layoutSha256,
  sourceKey: report.sourceSnapshot.key,
  beforeKey,
  legal: transition.legal,
  events: transition.events,
  afterKey: report.replay.after.key,
  afterIsWin: report.replay.after.isWin,
}, null, 2));
