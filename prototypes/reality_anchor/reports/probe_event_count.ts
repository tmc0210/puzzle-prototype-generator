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
  count?: number;
};

const prototypePath = "prototypes/reality_anchor";
const layoutPath = process.argv[2];
const id = process.argv[3] ?? "RA_EVENT_COUNT_PROBE";
const eventPattern = process.argv[4] ?? "pull_object";
const minCount = Number(process.argv[5] ?? 1);
const maxStates = Number(process.argv[6] ?? 300000);
const maxDepth = Number(process.argv[7] ?? 80);

if (!layoutPath) {
  throw new Error(
    "Usage: probe_event_count.ts <layout-file> <id> <event-pattern> <min-count> [maxStates] [maxDepth]",
  );
}

const pkg = await loadPrototypePackage(prototypePath);
const adapter = getRuntimeAdapter(pkg.mechanic);
const runtime = adapter.createRuntime(pkg.mechanic);
const layout = (await readFile(layoutPath, "utf8")).replace(/\r/g, "").replace(/\n+$/g, "");
const level: LevelDoc = {
  id,
  title: id,
  role: "mechanic_witness",
  status: "candidate",
  targets: ["K_runtime_smoke"],
  known_before: ["K_runtime_smoke"],
  target_learning: ["K_runtime_smoke"],
  support_level: "medium",
  expected_solver_evidence: ["solvable"],
  expected_llm_player_evidence: [],
  layout,
};
const initial = adapter.parseLevel(level);
const result = findWinBelowCount(initial);
const report = {
  id,
  layout: adapter.renderState(initial as never),
  eventPattern,
  minCount,
  budget: { maxStates, maxDepth },
  result,
};

const outBase = path.join(prototypePath, "reports", `event_count_probe_${id}_${sanitize(eventPattern)}_min${minCount}`);
await mkdir(path.dirname(outBase), { recursive: true });
await writeFile(`${outBase}.json`, `${JSON.stringify(report, null, 2)}\n`, "utf8");
await writeFile(`${outBase}.md`, formatMarkdown(report), "utf8");
console.log(`Wrote ${outBase}.md`);
console.log(`Wrote ${outBase}.json`);

function findWinBelowCount(initialState: RuntimeState): ProbeResult {
  const queue: Array<{
    state: RuntimeState;
    count: number;
    inputs: InputId[];
    events: string[];
    depth: number;
  }> = [{ state: initialState, count: 0, inputs: [], events: [], depth: 0 }];
  const visited = new Set<string>([`${runtime.key(initialState)}|0`]);
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
    if (current.depth > 0 && runtime.isWin(current.state, pkg.mechanic.win) && current.count < minCount) {
      return {
        found: true,
        status: "found",
        exploredStates: visited.size,
        depth: current.depth,
        inputs: current.inputs,
        events: current.events,
        count: current.count,
      };
    }
    if (current.depth >= maxDepth) {
      depthHit = true;
      continue;
    }
    for (const action of runtime.actions(current.state, { winCondition: pkg.mechanic.win })) {
      const step = runtime.step(current.state, action, { winCondition: pkg.mechanic.win });
      if (!step.legal) continue;
      const eventCount = step.events.filter((event) => eventMatchesPattern(event, eventPattern)).length;
      const nextCount = Math.min(minCount, current.count + eventCount);
      const key = `${runtime.key(step.state)}|${nextCount}`;
      if (visited.has(key)) continue;
      visited.add(key);
      queue.push({
        state: step.state,
        count: nextCount,
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
    reason: depthHit ? `depth budget exceeded (${maxDepth})` : "no winning bypass found",
  };
}

function formatMarkdown(input: typeof report): string {
  const result = input.result;
  const lines = [
    `# Event Count Probe: ${input.id}`,
    "",
    `- Event pattern: ${input.eventPattern}`,
    `- Required minimum count: ${input.minCount}`,
    `- Budget: maxStates=${input.budget.maxStates}, maxDepth=${input.budget.maxDepth}`,
    "",
    "## Layout",
    "",
    "```text",
    input.layout,
    "```",
    "",
    "## Bypass Probe",
    "",
    `- Found bypass below count: ${result.found}`,
    `- Status: ${result.status}`,
    `- Explored states: ${result.exploredStates}`,
    ...(result.reason ? [`- Reason: ${result.reason}`] : []),
    ...(result.count !== undefined ? [`- Matched count: ${result.count}`] : []),
    ...(result.depth !== undefined ? [`- Depth: ${result.depth}`] : []),
    ...(result.inputs ? [`- Inputs: ${result.inputs.join(" ")}`] : []),
    ...(result.events ? [`- Events: ${result.events.join(" ") || "none"}`] : []),
  ];
  return `${lines.join("\n").trimEnd()}\n`;
}

function sanitize(value: string): string {
  return value.replace(/[^a-zA-Z0-9_-]/g, "_");
}
