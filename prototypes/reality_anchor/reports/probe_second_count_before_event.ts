import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { eventMatchesPattern } from "../../../src/core/events.js";
import { loadPrototypePackage } from "../../../src/core/io.js";
import type { InputId, LevelDoc, SearchStatus } from "../../../src/core/types.js";
import { getRuntimeAdapter } from "../../../src/prototypes/runtimeAdapter.js";

type RuntimeState = unknown;

type ProbeResult = {
  found: boolean;
  status: SearchStatus;
  exploredStates: number;
  reason?: string;
  depth?: number;
  inputs?: InputId[];
  events?: string[];
};

const prototypePath = "prototypes/reality_anchor";
const layoutPath = process.argv[2];
const id = process.argv[3] ?? "RA_SECOND_COUNT_BEFORE_EVENT_PROBE";
const countedPattern = process.argv[4] ?? "anchor_boundary_shift:box_sticky";
const requiredBeforeSecondPattern = process.argv[5] ?? "pull_object:sticky#1";
const maxStates = Number(process.argv[6] ?? 300000);
const maxDepth = Number(process.argv[7] ?? 160);

if (!layoutPath) {
  throw new Error(
    "Usage: probe_second_count_before_event.ts <layout-file> <id> <counted-pattern> <required-before-second-pattern> [maxStates] [maxDepth]",
  );
}

const pkg = await loadPrototypePackage(prototypePath);
const adapter = getRuntimeAdapter(pkg.mechanic);
const runtime = adapter.createRuntime(pkg.mechanic);
const layout = (await readFile(layoutPath, "utf8")).replace(/\r/g, "").replace(/\n+$/g, "");
const level: LevelDoc = {
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
const initial = adapter.parseLevel(level);
const result = findWinWithSecondCountBeforeEvent(initial);
const report = {
  id,
  layout: adapter.renderState(initial as never),
  countedPattern,
  requiredBeforeSecondPattern,
  budget: { maxStates, maxDepth },
  result,
};

const outBase = path.join(prototypePath, "reports", `second_count_before_event_probe_${id}`);
await mkdir(path.dirname(outBase), { recursive: true });
await writeFile(`${outBase}.json`, `${JSON.stringify(report, null, 2)}\n`, "utf8");
await writeFile(`${outBase}.md`, formatMarkdown(report), "utf8");
console.log(`Wrote ${outBase}.md`);
console.log(`Wrote ${outBase}.json`);

function findWinWithSecondCountBeforeEvent(initialState: RuntimeState): ProbeResult {
  const queue: Array<{
    state: RuntimeState;
    count: number;
    seenRequired: boolean;
    violated: boolean;
    inputs: InputId[];
    events: string[];
    depth: number;
  }> = [
    { state: initialState, count: 0, seenRequired: false, violated: false, inputs: [], events: [], depth: 0 },
  ];
  const visited = new Set<string>([`${runtime.key(initialState)}|0|0|0`]);
  let cursor = 0;
  let depthHit = false;

  while (cursor < queue.length) {
    if (visited.size > maxStates) {
      return {
        found: false,
        status: "exhausted",
        exploredStates: visited.size,
        reason: `state budget exceeded (${maxStates})`,
      };
    }
    const current = queue[cursor]!;
    cursor += 1;
    const isWinningState = current.depth > 0 && runtime.isWin(current.state, pkg.mechanic.win);
    if (isWinningState && current.violated) {
      return {
        found: true,
        status: "found",
        exploredStates: visited.size,
        depth: current.depth,
        inputs: current.inputs,
        events: current.events,
      };
    }
    if (isWinningState) {
      continue;
    }
    if (current.depth >= maxDepth) {
      depthHit = true;
      continue;
    }
    for (const action of runtime.actions(current.state, { winCondition: pkg.mechanic.win })) {
      const step = runtime.step(current.state, action, { winCondition: pkg.mechanic.win });
      if (!step.legal) continue;
      const requiredNow = step.events.some((event) => eventMatchesPattern(event, requiredBeforeSecondPattern));
      const countedNow = step.events.filter((event) => eventMatchesPattern(event, countedPattern)).length;
      const nextCount = Math.min(2, current.count + countedNow);
      const seenRequired = current.seenRequired || requiredNow;
      const secondHappenedNow = current.count < 2 && nextCount >= 2;
      const violated = current.violated || (secondHappenedNow && !current.seenRequired && !requiredNow);
      const key = `${runtime.key(step.state)}|${nextCount}|${seenRequired ? 1 : 0}|${violated ? 1 : 0}`;
      if (visited.has(key)) continue;
      visited.add(key);
      queue.push({
        state: step.state,
        count: nextCount,
        seenRequired,
        violated,
        inputs: [...current.inputs, action],
        events: [...current.events, ...step.events],
        depth: current.depth + 1,
      });
    }
  }

  return {
    found: false,
    status: depthHit ? "exhausted" : "complete",
    exploredStates: visited.size,
    reason: depthHit ? `depth budget exceeded (${maxDepth})` : "no winning violation found",
  };
}

function formatMarkdown(input: typeof report): string {
  const result = input.result;
  const lines = [
    `# Second Count Before Event Probe: ${input.id}`,
    "",
    `- Counted pattern: ${input.countedPattern}`,
    `- Required before second count: ${input.requiredBeforeSecondPattern}`,
    `- Budget: maxStates=${input.budget.maxStates}, maxDepth=${input.budget.maxDepth}`,
    "",
    "## Layout",
    "",
    "```text",
    input.layout,
    "```",
    "",
    "## Violation Winning Probe",
    "",
    `- Found winning violation: ${result.found}`,
    `- Status: ${result.status}`,
    `- Explored states: ${result.exploredStates}`,
    ...(result.reason ? [`- Reason: ${result.reason}`] : []),
    ...(result.depth !== undefined ? [`- Depth: ${result.depth}`] : []),
    ...(result.inputs ? [`- Inputs: ${result.inputs.join(" ")}`] : []),
    ...(result.events ? [`- Events: ${result.events.join(" ") || "none"}`] : []),
  ];
  return `${lines.join("\n").trimEnd()}\n`;
}
