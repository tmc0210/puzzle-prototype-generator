import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

type Step = {
  action: string;
  legal: boolean;
  events: string[];
  after: { key: string; render: string; isWin: boolean };
};

type CaseResult = {
  id: string;
  actions: string[];
  initial: { key: string; render: string; isWin: boolean };
  final: { key: string; render: string; isWin: boolean };
  steps: Step[];
  reachableFromInitial: {
    status: string;
    reachableStates: number;
    legalTransitions: number;
    winStates: number;
  };
};

const studioRoot = path.resolve(import.meta.dirname, "../..");
const v5Path = path.join(studioRoot, "evidence/application_identity/results.json");
const v6Path = path.join(import.meta.dirname, "results.json");
const v5 = JSON.parse(await readFile(v5Path, "utf8")) as { cases: CaseResult[] };
const v6 = JSON.parse(await readFile(v6Path, "utf8")) as { cases: CaseResult[] };

const byId = (cases: CaseResult[], id: string): CaseResult => {
  const result = cases.find((entry) => entry.id === id);
  if (!result) throw new Error(`missing case ${id}`);
  return result;
};
const compactSteps = (entry: CaseResult) => entry.steps.map((step) => ({
  action: step.action,
  legal: step.legal,
  events: step.events,
  afterKey: step.after.key,
  afterIsWin: step.after.isWin,
}));

const perCaseInvariant = v6.cases.map((current) => {
  const prior = byId(v5.cases, current.id);
  const stateAndEventFactsUnchanged =
    JSON.stringify(current.actions) === JSON.stringify(prior.actions)
    && current.initial.key === prior.initial.key
    && current.final.key === prior.final.key
    && current.final.isWin === prior.final.isWin
    && JSON.stringify(compactSteps(current)) === JSON.stringify(compactSteps(prior))
    && JSON.stringify(current.reachableFromInitial) === JSON.stringify(prior.reachableFromInitial);
  if (!stateAndEventFactsUnchanged) {
    throw new Error(`v6 case ${current.id} changed a state/event fact beyond pure outline trim`);
  }
  return {
    id: current.id,
    actionsUnchanged: true,
    stateKeysUnchanged: true,
    eventTraceUnchanged: true,
    finalWinUnchanged: true,
    graphSummaryUnchanged: true,
  };
});

const base = byId(v6.cases, "base_three_sweeps_then_double_lock_win");
const premature = byId(v6.cases, "two_sweeps_then_premature_attempt");
const missingTip = byId(v6.cases, "cf_missing_upper_tip");
const disconnectedTip = byId(v6.cases, "cf_disconnect_upper_tip");
const prebuilt = byId(v6.cases, "cf_prebuilt_completed_shape");
const lockProbe = byId(v6.cases, "probe_upper_lock_alcove_retracts");

const narrowClaims = {
  baseExactWins: base.final.isWin,
  constructionEvents: base.steps.slice(0, 3).map((step) => step.events),
  finalEvents: base.steps.at(-1)?.events ?? [],
  prematureExactAttemptWins: premature.final.isWin,
  prematureFinalEvents: premature.steps.at(-1)?.events ?? [],
  missingUpperTipExactWins: missingTip.final.isWin,
  missingUpperTipCoveredTargetCount: (missingTip.final.render.match(/\*/g) ?? []).length,
  missingUpperTipGraph: missingTip.reachableFromInitial,
  disconnectedUpperTipExactWins: disconnectedTip.final.isWin,
  disconnectedUpperTipCoveredTargetCount: (disconnectedTip.final.render.match(/\*/g) ?? []).length,
  disconnectedUpperTipGraph: disconnectedTip.reachableFromInitial,
  prebuiltExactWins: prebuilt.final.isWin,
  prebuiltHasBoundaryShiftOrConversion: prebuilt.steps.some((step) =>
    step.events.some((event) => event.startsWith("anchor_boundary_shift:") || event.startsWith("box_to_sticky:"))),
  representativeLock: {
    pushEvents: lockProbe.steps[0]?.events ?? [],
    afterPushWins: lockProbe.steps[0]?.after.isWin ?? null,
    returnPullEvents: lockProbe.steps[3]?.events ?? [],
    returnsToInitialStateKey: lockProbe.final.key === lockProbe.initial.key,
    graphStatusLimit: lockProbe.reachableFromInitial.status,
  },
};

const requiredChecks = [
  narrowClaims.baseExactWins,
  JSON.stringify(narrowClaims.constructionEvents.map((events) => events.filter((event) => event.startsWith("box_to_sticky:"))))
    === JSON.stringify([["box_to_sticky:n2"], ["box_to_sticky:n2"], ["box_to_sticky:n4"]]),
  ["force_chain:n3", "move_sticky_rigid", "sticky_to_box:n4"].every((event) => narrowClaims.finalEvents.includes(event)),
  narrowClaims.prematureExactAttemptWins === false,
  narrowClaims.prematureFinalEvents.includes("sticky_to_box:n2"),
  narrowClaims.missingUpperTipExactWins === false,
  narrowClaims.missingUpperTipCoveredTargetCount === 1,
  narrowClaims.missingUpperTipGraph.status === "complete" && narrowClaims.missingUpperTipGraph.winStates === 0,
  narrowClaims.disconnectedUpperTipExactWins === false,
  narrowClaims.disconnectedUpperTipCoveredTargetCount === 1,
  narrowClaims.disconnectedUpperTipGraph.status === "complete" && narrowClaims.disconnectedUpperTipGraph.winStates === 0,
  narrowClaims.prebuiltExactWins,
  narrowClaims.prebuiltHasBoundaryShiftOrConversion === false,
  narrowClaims.representativeLock.afterPushWins === false,
  narrowClaims.representativeLock.pushEvents.includes("push_object:crate#1"),
  narrowClaims.representativeLock.returnPullEvents.includes("pull_object:crate#1"),
  narrowClaims.representativeLock.returnsToInitialStateKey,
];
if (!requiredChecks.every(Boolean)) {
  throw new Error("one or more narrow identity checks failed");
}

const result = {
  candidateId: "RA_FRESH_2026_07_15_FORGED_C_SYNC",
  exactVersion: "v6",
  comparisonBaseline: "v5 pure-two-column-outline-trim",
  perCaseInvariant,
  narrowClaims,
  limits: [
    "two_sweeps_then_premature_attempt only establishes the supplied exact attempt and its resulting event/state; no global return claim is made from its exhausted return-depth probe",
    "representative lock case has an exhausted broad reachable graph; only its four-step exact push-enter-return-pull trace is used",
    "identity counterfactuals establish mechanical relationships only, not aesthetics, difficulty, or slot quality",
  ],
};

await writeFile(path.join(import.meta.dirname, "identity_verification.json"), `${JSON.stringify(result, null, 2)}\n`, "utf8");
console.log(JSON.stringify({ perCaseInvariant, narrowClaims }, null, 2));
