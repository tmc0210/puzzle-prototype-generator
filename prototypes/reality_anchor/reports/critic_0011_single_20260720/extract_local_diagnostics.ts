import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import YAML from "yaml";

import { loadPrototypePackage } from "../../../../src/core/io.js";
import { solveWithRuntime } from "../../../../src/core/solver.js";
import { getRuntimeAdapter } from "../../../../src/prototypes/runtimeAdapter.js";

const repoRoot = path.resolve(import.meta.dirname, "../../../..");
const replayRef = "prototypes/reality_anchor/reports/input_replay_critic_0011_single_20260720.json";
const graphRef = "prototypes/reality_anchor/reports/layout_analysis_critic_0011_graph_20260720.json";
const evidenceRef = "prototypes/reality_anchor/reports/critic_0011_single_20260720/local_branch_evidence.yml";
const requestedSteps = [7, 8, 14];
const maxStates = 100_000;
const maxDepth = 200;

const replay = JSON.parse(await readFile(path.join(repoRoot, replayRef), "utf8"));
const pkg = await loadPrototypePackage(path.join(repoRoot, "prototypes/reality_anchor"));
const adapter = getRuntimeAdapter(pkg.mechanic);
const runtime = adapter.createRuntime(pkg.mechanic);
const winCondition = replay.winCondition;
const options = { winCondition, maxStates, maxDepth };
let state = adapter.parseLevel({
  id: "anonymous-current",
  title: "anonymous-current",
  layout: replay.layout,
  win: winCondition,
});

const beforeByStep = new Map<number, unknown>();
for (const rawStep of replay.steps) {
  beforeByStep.set(rawStep.step, state);
  const result = runtime.step(state, rawStep.action, options);
  if (!result.legal) throw new Error(`canonical step ${rawStep.step} 非法`);
  state = result.state;
}

const branchEvidence: unknown[] = [];
const localDiagnostics = [];

for (const stepNumber of requestedSteps) {
  const rawStep = replay.steps.find((entry: { step: number }) => entry.step === stepNumber);
  const before = beforeByStep.get(stepNumber);
  if (!rawStep || !before) throw new Error(`缺少 step ${stepNumber}`);
  const beforeKey = runtime.key(before);
  const commitments = [];

  for (const action of runtime.actions(before, options)) {
    const result = runtime.step(before, action, options);
    if (!result.legal) continue;
    const returnSearch = searchForKey(result.state, beforeKey);
    if (returnSearch.found || returnSearch.status !== "complete") continue;

    const winSearch = solveWithRuntime(runtime, result.state, options);
    const outcome = winSearch.found
      ? "win_reachable"
      : winSearch.searchStatus === "complete"
        ? "non_win_reachable"
        : "unknown";
    const branchIndex = branchEvidence.length;
    const afterLayout = adapter.renderState(result.state);
    branchEvidence.push({
      canonical_step: stepNumber,
      input: action,
      events: result.events,
      before_key: beforeKey,
      after_key: runtime.key(result.state),
      after_layout: afterLayout,
      return_to_before: returnSearch,
      win_search: {
        outcome,
        found: winSearch.found,
        search_status: winSearch.searchStatus,
        explored_states: winSearch.exploredStates,
        budget: winSearch.budget,
      },
    });
    commitments.push({
      input: action,
      outcome,
      after_layout: afterLayout,
      evidence_ref: `${evidenceRef}#/branches/${branchIndex}`,
    });
  }

  localDiagnostics.push({
    canonical_step: stepNumber,
    before_layout: rawStep.before.render,
    canonical_input: rawStep.action,
    after_layout: rawStep.after.render,
    graph_completeness: "complete",
    source_graph_ref: graphRef,
    commitments,
  });
}

function searchForKey(initialState: any, targetKey: string) {
  const initialKey = runtime.key(initialState);
  if (initialKey === targetKey) return { found: true, status: "complete", explored_states: 1 };
  const queue = [{ state: initialState, depth: 0 }];
  const visited = new Set([initialKey]);
  let cursor = 0;
  let depthLimitHit = false;

  while (cursor < queue.length) {
    if (visited.size > maxStates) {
      return { found: false, status: "budget_limited", explored_states: visited.size };
    }
    const current = queue[cursor++];
    if (current.depth >= maxDepth) {
      depthLimitHit = true;
      continue;
    }
    for (const action of runtime.actions(current.state, options)) {
      const result = runtime.step(current.state, action, options);
      if (!result.legal) continue;
      const key = runtime.key(result.state);
      if (key === targetKey) return { found: true, status: "complete", explored_states: visited.size + 1 };
      if (visited.has(key)) continue;
      visited.add(key);
      queue.push({ state: result.state, depth: current.depth + 1 });
    }
  }
  return {
    found: false,
    status: depthLimitHit ? "budget_limited" : "complete",
    explored_states: visited.size,
  };
}

await writeFile(
  path.join(repoRoot, evidenceRef),
  YAML.stringify({
    scope: "requested_steps_only",
    requested_steps: requestedSteps,
    graph_ref: graphRef,
    max_states: maxStates,
    max_depth: maxDepth,
    branches: branchEvidence,
  }, { lineWidth: 0 }),
  "utf8",
);
await writeFile(
  path.join(repoRoot, "prototypes/reality_anchor/reports/critic_0011_single_20260720/local_diagnostics.yml"),
  YAML.stringify({
    review_attempt_id: "critic-0011-review-1",
    candidate_id: "anonymous-current",
    exact_version: "anonymous-exact-v1",
    evidence_review_refs: [
      "prototypes/reality_anchor/reports/critic_0011_single_20260720/evidence_review.yml",
    ],
    local_diagnostics: localDiagnostics,
  }, { lineWidth: 0 }),
  "utf8",
);
