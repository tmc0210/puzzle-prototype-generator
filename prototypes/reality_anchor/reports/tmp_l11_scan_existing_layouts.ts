import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { eventMatchesPattern } from "../../../src/core/events.js";
import { loadPrototypePackage } from "../../../src/core/io.js";
import { solveWithRuntime } from "../../../src/core/solver.js";
import type { InputId, LevelDoc, SearchStatus } from "../../../src/core/types.js";
import { getRuntimeAdapter } from "../../../src/prototypes/runtimeAdapter.js";

type RuntimeState = unknown;

type HardResult = {
  foundBypass: boolean;
  status: SearchStatus;
  exploredStates: number;
  missingFeatures?: string[];
  inputs?: InputId[];
  events?: string[];
  reason?: string;
};

type CandidateResult = {
  file: string;
  id: string;
  layout?: string;
  solveFound: boolean;
  solveStatus?: string;
  cost?: number;
  inputs?: InputId[];
  events?: string[];
  shortestHasCore?: boolean;
  shortestHasPostCutCratePush?: boolean;
  hard?: HardResult;
  error?: string;
};

const prototypePath = "prototypes/reality_anchor";
const reportsPath = path.join(prototypePath, "reports");
const maxStates = Number(process.argv[2] ?? 1_000_000);
const maxDepth = Number(process.argv[3] ?? 120);
const hardLimit = Number(process.argv[4] ?? maxStates);
const only = process.argv[5];

const requiredFeatureNames = [
  "anchor_boundary_shift:box_sticky",
  "box_to_sticky",
  "sticky_merge",
  "sticky_to_box",
  "move_sticky_rigid",
  "push_object:crate",
  "post_sticky_to_box_push_object:crate",
];
const allMask = (1 << requiredFeatureNames.length) - 1;
const postCutCratePushBit = requiredFeatureNames.length - 1;

const pkg = await loadPrototypePackage(prototypePath);
const adapter = getRuntimeAdapter(pkg.mechanic);
const runtime = adapter.createRuntime(pkg.mechanic);
const files = (await readdir(reportsPath))
  .filter((file) => /L11.*layout\.txt$/i.test(file))
  .filter((file) => !only || file.includes(only))
  .sort();

const results: CandidateResult[] = [];

for (const file of files) {
  const id = file.replace(/_layout\.txt$/i, "");
  const fullPath = path.join(reportsPath, file);
  const rawLayout = (await readFile(fullPath, "utf8")).replace(/\r/g, "").replace(/\n+$/g, "");
  const level = toLevel(id, rawLayout);
  try {
    const initial = adapter.parseLevel(level);
    const rendered = adapter.renderState(initial as never);
    const solution = solveWithRuntime(runtime, initial, {
      winCondition: pkg.mechanic.win,
      maxStates,
      maxDepth,
    });
    const result: CandidateResult = {
      file,
      id,
      layout: rendered,
      solveFound: solution.found,
      solveStatus: solution.searchStatus,
    };
    if (!solution.found) {
      result.error = solution.reason;
      results.push(result);
      continue;
    }
    result.cost = solution.cost;
    result.inputs = solution.inputs;
    result.events = solution.events;
    result.shortestHasCore = hasCore(solution.events);
    result.shortestHasPostCutCratePush = hasPostCutCratePush(initial, solution.inputs);
    if (result.shortestHasCore && result.shortestHasPostCutCratePush) {
      result.hard = findWinMissingHardFeatures(initial, hardLimit);
    }
    results.push(result);
  } catch (error) {
    results.push({ file, id, solveFound: false, error: String(error) });
  }
}

const report = {
  budget: { maxStates, maxDepth, hardLimit },
  requiredFeatureNames,
  results,
};
const outBase = path.join(reportsPath, "tmp_l11_scan_existing_layouts");
await writeFile(`${outBase}.json`, `${JSON.stringify(report, null, 2)}\n`, "utf8");
await writeFile(`${outBase}.md`, formatMarkdown(report), "utf8");
console.log(formatMarkdown(report));
console.log(`Wrote ${outBase}.md`);
console.log(`Wrote ${outBase}.json`);

function toLevel(id: string, layout: string): LevelDoc {
  return {
    id,
    title: id,
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
}

function hasCore(events: string[]): boolean {
  return (
    events.some((event) => eventMatchesPattern(event, "anchor_boundary_shift:box_sticky")) &&
    events.some((event) => eventMatchesPattern(event, "box_to_sticky")) &&
    events.some((event) => eventMatchesPattern(event, "sticky_merge")) &&
    events.some((event) => eventMatchesPattern(event, "sticky_to_box")) &&
    events.some((event) => eventMatchesPattern(event, "move_sticky_rigid")) &&
    events.some(isCratePush)
  );
}

function hasPostCutCratePush(initial: RuntimeState, inputs: InputId[]): boolean {
  let state = initial;
  let cutSeen = false;
  for (const input of inputs) {
    const result = runtime.step(state, input, { winCondition: pkg.mechanic.win });
    if (!result.legal) return false;
    if (cutSeen && result.events.some(isCratePush)) return true;
    if (result.events.some((event) => eventMatchesPattern(event, "sticky_to_box"))) cutSeen = true;
    state = result.state;
  }
  return false;
}

function findWinMissingHardFeatures(initial: RuntimeState, limit: number): HardResult {
  const queue: Array<{
    state: RuntimeState;
    key: string;
    mask: number;
    cutSeen: boolean;
    depth: number;
    inputs: InputId[];
    events: string[];
  }> = [{ state: initial, key: runtime.key(initial), mask: 0, cutSeen: false, depth: 0, inputs: [], events: [] }];
  const visited = new Set<string>([`${queue[0]!.key}|0|0`]);
  let cursor = 0;
  while (cursor < queue.length) {
    if (visited.size > limit) {
      return {
        foundBypass: false,
        status: "exhausted",
        exploredStates: visited.size,
        reason: `state budget exceeded (${limit})`,
      };
    }
    const current = queue[cursor++]!;
    if (current.depth > 0 && runtime.isWin(current.state, pkg.mechanic.win)) {
      if (current.mask !== allMask) {
        return {
          foundBypass: true,
          status: "found",
          exploredStates: visited.size,
          missingFeatures: missingFeatures(current.mask),
          inputs: current.inputs,
          events: current.events,
        };
      }
      continue;
    }
    for (const action of runtime.actions(current.state, { winCondition: pkg.mechanic.win })) {
      const step = runtime.step(current.state, action, { winCondition: pkg.mechanic.win });
      if (!step.legal) continue;
      const nextMask = collectMask(current.mask, current.cutSeen, step.events);
      const nextCutSeen =
        current.cutSeen || step.events.some((event) => eventMatchesPattern(event, "sticky_to_box"));
      const nextKey = runtime.key(step.state);
      const key = `${nextKey}|${nextMask}|${nextCutSeen ? 1 : 0}`;
      if (visited.has(key)) continue;
      visited.add(key);
      queue.push({
        state: step.state,
        key: nextKey,
        mask: nextMask,
        cutSeen: nextCutSeen,
        depth: current.depth + 1,
        inputs: [...current.inputs, action],
        events: [...current.events, ...step.events],
      });
    }
  }
  return {
    foundBypass: false,
    status: "complete",
    exploredStates: visited.size,
    reason: "no winning bypass found",
  };
}

function collectMask(current: number, cutSeen: boolean, events: string[]): number {
  let mask = current;
  if (events.some((event) => eventMatchesPattern(event, "anchor_boundary_shift:box_sticky"))) mask |= 1 << 0;
  if (events.some((event) => eventMatchesPattern(event, "box_to_sticky"))) mask |= 1 << 1;
  if (events.some((event) => eventMatchesPattern(event, "sticky_merge"))) mask |= 1 << 2;
  if (events.some((event) => eventMatchesPattern(event, "sticky_to_box"))) mask |= 1 << 3;
  if (events.some((event) => eventMatchesPattern(event, "move_sticky_rigid"))) mask |= 1 << 4;
  if (events.some(isCratePush)) mask |= 1 << 5;
  if (cutSeen && events.some(isCratePush)) mask |= 1 << postCutCratePushBit;
  return mask;
}

function missingFeatures(mask: number): string[] {
  return requiredFeatureNames.filter((_, index) => (mask & (1 << index)) === 0);
}

function isCratePush(event: string): boolean {
  return /^push_object:crate#\d+$/.test(event);
}

function formatMarkdown(input: typeof report): string {
  const lines = [
    "# L11 Existing Layout Scan",
    "",
    `budget: maxStates=${input.budget.maxStates} maxDepth=${input.budget.maxDepth} hardLimit=${input.budget.hardLimit}`,
    `files=${input.results.length}`,
    "",
  ];
  const interesting = input.results.filter(
    (result) => result.shortestHasCore || result.shortestHasPostCutCratePush || result.hard,
  );
  lines.push(`interesting=${interesting.length}`);
  lines.push("");
  for (const result of interesting) {
    lines.push(`## ${result.id}`);
    lines.push("");
    lines.push(`file=${result.file}`);
    lines.push(`solve=${result.solveFound} status=${result.solveStatus ?? "n/a"} cost=${result.cost ?? "n/a"}`);
    lines.push(`shortestCore=${result.shortestHasCore ?? false} postCutCratePush=${result.shortestHasPostCutCratePush ?? false}`);
    if (result.hard) {
      lines.push(
        `hardBypass=${result.hard.foundBypass} status=${result.hard.status} explored=${result.hard.exploredStates} missing=${result.hard.missingFeatures?.join(",") ?? "n/a"}`,
      );
    }
    if (result.layout) {
      lines.push("");
      lines.push("```text");
      lines.push(result.layout);
      lines.push("```");
    }
    if (result.inputs) lines.push(`inputs=${result.inputs.join(" ")}`);
    if (result.events) lines.push(`events=${result.events.join(" ")}`);
    if (result.hard?.inputs) lines.push(`bypassInputs=${result.hard.inputs.join(" ")}`);
    if (result.hard?.events) lines.push(`bypassEvents=${result.hard.events.join(" ")}`);
    lines.push("");
  }
  return `${lines.join("\n").trimEnd()}\n`;
}
