import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { eventMatchesPattern } from "../../../src/core/events.js";
import { loadPrototypePackage } from "../../../src/core/io.js";
import type { InputId, LevelDoc, SearchStatus } from "../../../src/core/types.js";
import { getRuntimeAdapter } from "../../../src/prototypes/runtimeAdapter.js";

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
const id = process.argv[3] ?? "RA_EVENT_BEFORE_COUNT_PROBE";
const countedPattern = process.argv[4] ?? "anchor_boundary_shift:box_sticky";
const requiredCount = Number(process.argv[5] ?? 2);
const earlyPattern = process.argv[6] ?? "move_sticky_rigid";
const maxStates = Number(process.argv[7] ?? 300000);
const maxDepth = Number(process.argv[8] ?? 120);

if (!layoutPath) {
  throw new Error(
    "Usage: probe_event_before_count.ts <layout-file> <id> <counted-pattern> <required-count> <early-pattern> [maxStates] [maxDepth]",
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
const result = findWinningViolation(initial);
const report = {
  id,
  layout: adapter.renderState(initial as never),
  countedPattern,
  requiredCount,
  earlyPattern,
  budget: { maxStates, maxDepth },
  result,
};
const outBase = path.join(
  prototypePath,
  "reports",
  `event_before_count_probe_${id}_${sanitize(earlyPattern)}`,
);
await mkdir(path.dirname(outBase), { recursive: true });
await writeFile(`${outBase}.json`, `${JSON.stringify(report, null, 2)}\n`, "utf8");
await writeFile(`${outBase}.md`, formatMarkdown(report), "utf8");
console.log(`Wrote ${outBase}.md`);
console.log(`Wrote ${outBase}.json`);

function findWinningViolation(initialState: unknown): ProbeResult {
  const queue: Array<{
    state: unknown;
    count: number;
    violated: boolean;
    inputs: InputId[];
    events: string[];
    depth: number;
  }> = [{ state: initialState, count: 0, violated: false, inputs: [], events: [], depth: 0 }];
  const visited = new Set<string>([`${runtime.key(initialState)}|0|0`]);
  let cursor = 0;
  let depthHit = false;
  while (cursor < queue.length) {
    if (visited.size > maxStates) {
      return { found: false, status: "exhausted", exploredStates: visited.size, reason: "state budget exceeded" };
    }
    const current = queue[cursor++]!;
    if (current.depth > 0 && runtime.isWin(current.state, pkg.mechanic.win) && current.violated) {
      return {
        found: true,
        status: "found",
        exploredStates: visited.size,
        depth: current.depth,
        inputs: current.inputs,
        events: current.events,
      };
    }
    if (runtime.isWin(current.state, pkg.mechanic.win)) continue;
    if (current.depth >= maxDepth) {
      depthHit = true;
      continue;
    }
    for (const action of runtime.actions(current.state, { winCondition: pkg.mechanic.win })) {
      const step = runtime.step(current.state, action, { winCondition: pkg.mechanic.win });
      if (!step.legal) continue;
      const increment = step.events.filter((event) => eventMatchesPattern(event, countedPattern)).length;
      const count = Math.min(requiredCount, current.count + increment);
      const earlyNow = step.events.some((event) => eventMatchesPattern(event, earlyPattern));
      const violated = current.violated || (earlyNow && count < requiredCount);
      const key = `${runtime.key(step.state)}|${count}|${violated ? 1 : 0}`;
      if (visited.has(key)) continue;
      visited.add(key);
      queue.push({
        state: step.state,
        count,
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
    reason: depthHit ? "depth budget exceeded" : "no winning early-event violation found",
  };
}

function formatMarkdown(input: typeof report): string {
  const result = input.result;
  const lines = [
    `# Event Before Count Probe: ${input.id}`,
    "",
    `- Counted pattern: ${input.countedPattern}`,
    `- Required count before early event: ${input.requiredCount}`,
    `- Early pattern: ${input.earlyPattern}`,
    `- Budget: maxStates=${input.budget.maxStates}, maxDepth=${input.budget.maxDepth}`,
    "",
    "## Layout",
    "",
    "```text",
    input.layout,
    "```",
    "",
    "## Winning Violation Probe",
    "",
    `- Found violation win: ${result.found}`,
    `- Status: ${result.status}`,
    `- Explored states: ${result.exploredStates}`,
    ...(result.reason ? [`- Reason: ${result.reason}`] : []),
    ...(result.depth !== undefined ? [`- Depth: ${result.depth}`] : []),
    ...(result.inputs ? [`- Inputs: ${result.inputs.join(" ")}`] : []),
    ...(result.events ? [`- Events: ${result.events.join(" ") || "none"}`] : []),
  ];
  return `${lines.join("\n").trimEnd()}\n`;
}

function sanitize(value: string): string {
  return value.replace(/[^a-zA-Z0-9_-]/g, "_");
}
