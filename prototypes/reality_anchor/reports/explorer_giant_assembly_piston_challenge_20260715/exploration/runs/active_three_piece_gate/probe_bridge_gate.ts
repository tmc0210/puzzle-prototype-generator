import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import { loadPrototypePackage } from "../../../../../../../src/core/io.js";
import type { LevelDoc } from "../../../../../../../src/core/types.js";
import {
  isWin,
  parseLevel,
  pointKey,
  renderState,
  step,
  type RealityAnchorState,
} from "../../../../../../../src/prototypes/reality_anchor/mechanics.js";

const root = path.resolve(
  "prototypes/reality_anchor/reports/explorer_giant_assembly_piston_challenge_20260715/exploration/runs/active_three_piece_gate",
);
const pkg = await loadPrototypePackage(path.resolve("prototypes/reality_anchor"));

const cases = [
  "naive_registered_ht_counterexample",
  "registered_full_bridge",
  "direct_upper_trap",
] as const;
const report: Record<string, unknown> = {};

for (const id of cases) {
  const layout = (await readFile(path.join(root, "layouts", `${id}.layout.txt`), "utf8")).trimEnd();
  const initial = parseLevel({ id, title: id, layout } satisfies LevelDoc);
  const result = step(pkg.mechanic, initial, "right");
  report[id] = {
    legal: result.legal,
    reason: result.reason ?? null,
    events: result.events,
    win: result.legal && isWin(result.state),
    coveredBefore: covered(initial),
    coveredAfter: result.legal ? covered(result.state) : covered(initial),
    before: renderState(initial),
    after: result.legal ? renderState(result.state) : null,
  };
}

const ht = report.naive_registered_ht_counterexample as any;
const full = report.registered_full_bridge as any;
const direct = report.direct_upper_trap as any;
if (!ht.legal || !ht.win || ht.coveredAfter.length !== 2) {
  throw new Error(`HT 最小反例未成立：${JSON.stringify(ht)}`);
}
if (!full.legal || !full.win || full.coveredAfter.length !== 2) {
  throw new Error(`full bridge 正对照未成立：${JSON.stringify(full)}`);
}
if (!direct.legal || direct.win || direct.coveredAfter.length !== 1) {
  throw new Error(`direct cover 未成立：${JSON.stringify(direct)}`);
}

const directLayout = (
  await readFile(path.join(root, "layouts", "direct_upper_trap.layout.txt"), "utf8")
).trimEnd();
const directInitial = parseLevel({
  id: "direct_upper_trap",
  title: "direct_upper_trap",
  layout: directLayout,
} satisfies LevelDoc);
const coveredDirect = step(pkg.mechanic, directInitial, "right").state;
const directActions = ["up", "down", "left", "right"].map((input) => {
  const result = step(pkg.mechanic, coveredDirect, input as "up" | "down" | "left" | "right");
  return {
    input,
    legal: result.legal,
    reason: result.reason ?? null,
    events: result.events,
    coveredAfter: result.legal ? covered(result.state) : covered(coveredDirect),
  };
});
const legalDirect = directActions.filter((action) => action.legal);
if (
  legalDirect.length !== 1
  || legalDirect[0]?.input !== "left"
  || !legalDirect[0].events.some((event: string) => event.startsWith("pull_object:crate#"))
  || legalDirect[0].coveredAfter.length !== 0
) {
  throw new Error(`direct covered state 不是唯一 L-pull reset：${JSON.stringify(directActions)}`);
}
report.directCoveredActions = directActions;

await writeFile(path.join(root, "audit.json"), `${JSON.stringify(report, null, 2)}\n`, "utf8");
console.log("VERIFIED naive HT bypass, full bridge control, and ordinary-C direct reset");

function covered(state: RealityAnchorState): string[] {
  const occupied = new Set([
    ...state.crates.map(pointKey),
    ...state.stickyGroups.flat().map(pointKey),
  ]);
  return [...state.goals].filter((goal) => occupied.has(goal)).sort();
}
