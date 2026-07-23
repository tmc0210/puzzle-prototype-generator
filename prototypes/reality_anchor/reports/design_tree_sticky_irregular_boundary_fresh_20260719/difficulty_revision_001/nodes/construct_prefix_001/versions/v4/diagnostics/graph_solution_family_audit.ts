import fs from "node:fs";
import path from "node:path";

import { loadPrototypePackage } from "../../../../../../../../../../src/core/io.js";
import { realityAnchorAdapter } from "../../../../../../../../../../src/prototypes/reality_anchor/runtime.js";

type ReplayStep = {
  step: number;
  input: string;
  legal: boolean;
  reason: string | null;
  events: string[];
  stateKey: string;
  isWin: boolean;
};

const args = process.argv.slice(2);
const argValue = (name: string, fallback?: string): string => {
  const index = args.indexOf(name);
  if (index >= 0 && args[index + 1]) return args[index + 1]!;
  if (fallback !== undefined) return fallback;
  throw new Error(`Missing required argument ${name}`);
};

const layoutPath = path.resolve(argValue("--layout"));
const canonicalPath = path.resolve(argValue("--canonical"));
const outputPath = path.resolve(argValue("--output"));
const maxStates = Number(argValue("--max-states", "300000"));
const maxTransitions = Number(argValue("--max-transitions", "8000000"));
const maxRecordedWins = Number(argValue("--max-recorded-wins", "50000"));

if (!Number.isFinite(maxStates) || maxStates <= 0) throw new Error("Invalid --max-states");
if (!Number.isFinite(maxTransitions) || maxTransitions <= 0) throw new Error("Invalid --max-transitions");

const prototypeRoot = path.resolve("prototypes/reality_anchor");
const pkg = await loadPrototypePackage(prototypeRoot);
const runtime = realityAnchorAdapter.createRuntime(pkg.mechanic);
const layout = fs.readFileSync(layoutPath, "utf8");
const initialState = realityAnchorAdapter.parseLevel({ id: "ra_v4_graph_audit", layout });
const canonicalDocument = JSON.parse(fs.readFileSync(canonicalPath, "utf8")) as { inputs: string[] };
const directions = runtime.actions();

const anchorFirstBypassInputs = [
  "left", "left", "left", "left", "left", "left", "left", "left", "left",
  "down", "left", "left", "left", "up", "left", "left",
  "down", "right", "right", "right", "right", "right", "right", "right", "right", "right", "right", "right",
  "down", "down", "down", "down",
  "left", "down", "left", "up",
  "right", "right", "up", "up",
  "left", "left", "left", "left", "left", "left",
  "right", "left",
  "up", "left", "left", "left", "left", "down", "down", "down", "right", "right", "down"
];

const canonicalWithoutExactReturnLoop = canonicalDocument.inputs.filter((_, index) => index !== 62 && index !== 63);

function replay(name: string, inputs: string[]) {
  let state = initialState;
  const initialKey = runtime.key(state);
  const steps: ReplayStep[] = [];
  const objectActions: Array<{ step: number; input: string; events: string[] }> = [];
  let firstMaterialActionStep: number | null = null;
  let firstBoxStickyAnchorStep: number | null = null;
  let firstFullStickyStep: number | null = null;
  let firstWinStep: number | null = null;

  for (let index = 0; index < inputs.length; index += 1) {
    const input = inputs[index]!;
    const result = runtime.step(state, input, {});
    if (result.legal) state = result.state;
    const events = [...result.events];
    const step = index + 1;
    const isObjectAction = events.some((event: string) =>
      event.startsWith("push_object:") || event.startsWith("pull_object:")
    );
    const isMaterialAction = events.some((event: string) =>
      event.startsWith("push_object:crate") ||
      event.startsWith("pull_object:crate") ||
      event.startsWith("push_object:sticky") ||
      event.startsWith("pull_object:sticky")
    );
    const isBoxStickyAction = events.some((event: string) => event.includes("box_sticky_anchor"));
    if (isObjectAction) objectActions.push({ step, input, events });
    if (firstMaterialActionStep === null && isMaterialAction) firstMaterialActionStep = step;
    if (firstBoxStickyAnchorStep === null && isBoxStickyAction) firstBoxStickyAnchorStep = step;
    const stickyCellCount = state.stickyGroups.reduce((sum: number, group: unknown[]) => sum + group.length, 0);
    if (firstFullStickyStep === null && state.crates.length === 0 && state.stickyGroups.length === 1 && stickyCellCount === 4) {
      firstFullStickyStep = step;
    }
    const isWin = runtime.isWin(state);
    if (firstWinStep === null && isWin) firstWinStep = step;
    steps.push({
      step,
      input,
      legal: result.legal,
      reason: result.reason ?? null,
      events,
      stateKey: runtime.key(state),
      isWin
    });
    if (!result.legal) break;
  }

  const finalKey = runtime.key(state);
  const exactReturnPairs: Array<{ fromStep: number; toStep: number; stateKey: string }> = [];
  const firstSeen = new Map<string, number>([[initialKey, 0]]);
  for (const step of steps) {
    const earlier = firstSeen.get(step.stateKey);
    if (earlier !== undefined) exactReturnPairs.push({ fromStep: earlier, toStep: step.step, stateKey: step.stateKey });
    else firstSeen.set(step.stateKey, step.step);
  }

  return {
    name,
    inputCount: inputs.length,
    inputs,
    legalThroughStep: steps.filter(step => step.legal).length,
    completedAllInputs: steps.length === inputs.length && steps.every(step => step.legal),
    isWin: runtime.isWin(state),
    firstWinStep,
    initialStateKey: initialKey,
    finalStateKey: finalKey,
    firstMaterialActionStep,
    firstBoxStickyAnchorStep,
    firstFullStickyStep,
    boxStickyMovedBeforeMaterial: firstBoxStickyAnchorStep !== null &&
      (firstMaterialActionStep === null || firstBoxStickyAnchorStep < firstMaterialActionStep),
    exactReturnPairs,
    objectActions,
    steps
  };
}

const canonicalReplay = replay("canonical_construct_boxes_then_bs_merge", canonicalDocument.inputs);
const anchorFirstBypassReplay = replay("non_equivalent_anchor_first_then_sticky_construct", anchorFirstBypassInputs);
const canonicalWithoutLoopReplay = replay("canonical_without_optional_exact_return_loop", canonicalWithoutExactReturnLoop);

const graphStart = Date.now();
const states: any[] = [initialState];
const stateKeys: string[] = [runtime.key(initialState)];
const parents: number[] = [-1];
const parentActions: string[] = [""];
const indexByKey = new Map<string, number>([[stateKeys[0]!, 0]]);
const winningStateIndexes: number[] = [];
let head = 0;
let legalTransitions = 0;
let duplicateTransitions = 0;
let budgetReason: string | null = null;

while (head < states.length) {
  if (states.length >= maxStates) {
    budgetReason = "state_budget_exceeded";
    break;
  }
  if (legalTransitions >= maxTransitions) {
    budgetReason = "transition_budget_exceeded";
    break;
  }
  const state = states[head]!;
  if (runtime.isWin(state)) {
    head += 1;
    continue;
  }
  for (const action of directions) {
    const result = runtime.step(state, action, {});
    if (!result.legal) continue;
    legalTransitions += 1;
    const key = runtime.key(result.state);
    const known = indexByKey.get(key);
    if (known !== undefined) {
      duplicateTransitions += 1;
      continue;
    }
    const nextIndex = states.length;
    indexByKey.set(key, nextIndex);
    states.push(result.state);
    stateKeys.push(key);
    parents.push(head);
    parentActions.push(action);
    if (runtime.isWin(result.state) && winningStateIndexes.length < maxRecordedWins) winningStateIndexes.push(nextIndex);
    if (states.length >= maxStates) break;
  }
  head += 1;
}

function reconstructInputs(index: number): string[] {
  const inputs: string[] = [];
  let cursor = index;
  while (cursor > 0) {
    inputs.push(parentActions[cursor]!);
    cursor = parents[cursor]!;
  }
  return inputs.reverse();
}

const recordedGraphWins = winningStateIndexes.map((index, winIndex) => ({
  winIndex,
  stateIndex: index,
  stateKey: stateKeys[index],
  inputs: reconstructInputs(index)
}));

const graphStatus = budgetReason === null && head >= states.length ? "complete" : "budget_exhausted";
const raw = {
  schema_version: 1,
  assignment_id: "RA_DESIGNER_DIFFICULTY_CONSTRUCT_PREFIX_V4_GRAPH_SUBMISSION_001",
  prototype_id: "reality_anchor",
  node_id: "construct_prefix_001",
  exact_version: "v4",
  generated_at: new Date().toISOString(),
  command: process.argv.join(" "),
  budget: { maxStates, maxTransitions, maxRecordedWins },
  graph: {
    status: graphStatus,
    budgetReason,
    reachableStatesRecorded: states.length,
    expandedStates: head,
    legalTransitions,
    duplicateTransitions,
    terminalWinningStatesRecorded: winningStateIndexes.length,
    elapsedMilliseconds: Date.now() - graphStart,
    recordedWins: recordedGraphWins
  },
  targetedReplays: {
    canonical: canonicalReplay,
    anchorFirstBypass: anchorFirstBypassReplay,
    canonicalWithoutExactReturnLoop: canonicalWithoutLoopReplay
  },
  automaticFlags: {
    canonicalWins: canonicalReplay.isWin,
    anchorFirstBypassWins: anchorFirstBypassReplay.isWin,
    anchorFirstChangesCausalOrder: anchorFirstBypassReplay.boxStickyMovedBeforeMaterial &&
      !canonicalReplay.boxStickyMovedBeforeMaterial,
    canonicalWithoutExactReturnLoopWins: canonicalWithoutLoopReplay.isWin
  },
  evidenceBoundary: [
    "graph 只声明记录的 full-state BFS 覆盖；budget_exhausted 不表示不可解或唯一。",
    "targeted replay 是 current runtime 的确定性 exact 输入复跑；一个非等价获胜反例足以阻止送审。",
    "canonical_without_optional_exact_return_loop 只审计完整回返环是否可省略；按 docs/21，该省略本身可属于同一逻辑类。"
  ]
};

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, `${JSON.stringify(raw, null, 2)}\n`, "utf8");
console.log(JSON.stringify({
  outputPath,
  graph: raw.graph,
  automaticFlags: raw.automaticFlags,
  targetedReplaySummary: {
    canonical: {
      isWin: canonicalReplay.isWin,
      inputCount: canonicalReplay.inputCount,
      firstMaterialActionStep: canonicalReplay.firstMaterialActionStep,
      firstBoxStickyAnchorStep: canonicalReplay.firstBoxStickyAnchorStep,
      firstFullStickyStep: canonicalReplay.firstFullStickyStep
    },
    anchorFirstBypass: {
      isWin: anchorFirstBypassReplay.isWin,
      inputCount: anchorFirstBypassReplay.inputCount,
      firstMaterialActionStep: anchorFirstBypassReplay.firstMaterialActionStep,
      firstBoxStickyAnchorStep: anchorFirstBypassReplay.firstBoxStickyAnchorStep,
      firstFullStickyStep: anchorFirstBypassReplay.firstFullStickyStep
    },
    canonicalWithoutExactReturnLoop: {
      isWin: canonicalWithoutLoopReplay.isWin,
      inputCount: canonicalWithoutLoopReplay.inputCount
    }
  }
}, null, 2));
