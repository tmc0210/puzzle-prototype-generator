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
const id = process.argv[3] ?? "RA_POST_CUT_CRATE_PUSH_PROBE";
const maxStates = Number(process.argv[4] ?? 300000);
const maxDepth = Number(process.argv[5] ?? 80);

if (!layoutPath) {
  throw new Error("Usage: probe_post_cut_crate_push.ts <layout-file> <id> [maxStates] [maxDepth]");
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
  support_level: "medium",
  expected_solver_evidence: ["solvable"],
  expected_llm_player_evidence: [],
  layout,
};
const initial = adapter.parseLevel(level);
const result = findWinWithCutButNoLaterCratePush(initial);
const report = {
  id,
  layout: adapter.renderState(initial as never),
  budget: { maxStates, maxDepth },
  result,
};

const outBase = path.join(prototypePath, "reports", `post_cut_crate_push_probe_${id}`);
await mkdir(path.dirname(outBase), { recursive: true });
await writeFile(`${outBase}.json`, `${JSON.stringify(report, null, 2)}\n`, "utf8");
await writeFile(`${outBase}.md`, formatMarkdown(report), "utf8");
console.log(`Wrote ${outBase}.md`);
console.log(`Wrote ${outBase}.json`);

function findWinWithCutButNoLaterCratePush(initialState: RuntimeState): ProbeResult {
  const queue: Array<{
    state: RuntimeState;
    cutSeen: boolean;
    laterCratePushSeen: boolean;
    inputs: InputId[];
    events: string[];
    depth: number;
  }> = [
    {
      state: initialState,
      cutSeen: false,
      laterCratePushSeen: false,
      inputs: [],
      events: [],
      depth: 0,
    },
  ];
  const visited = new Set<string>([`${runtime.key(initialState)}|0|0`]);
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

    if (
      current.depth > 0 &&
      current.cutSeen &&
      !current.laterCratePushSeen &&
      runtime.isWin(current.state, pkg.mechanic.win)
    ) {
      return {
        found: true,
        status: "found",
        exploredStates: visited.size,
        depth: current.depth,
        inputs: current.inputs,
        events: current.events,
      };
    }

    if (current.depth >= maxDepth) {
      depthHit = true;
      continue;
    }

    for (const action of runtime.actions(current.state, { winCondition: pkg.mechanic.win })) {
      const step = runtime.step(current.state, action, { winCondition: pkg.mechanic.win });
      if (!step.legal) continue;
      const hasCut = step.events.some((event) => eventMatchesPattern(event, "sticky_to_box"));
      const hasCratePush = step.events.some((event) => /^push_object:crate#/.test(event));
      const cutSeen = current.cutSeen || hasCut;
      const laterCratePushSeen = current.laterCratePushSeen || (current.cutSeen && hasCratePush);
      const key = `${runtime.key(step.state)}|${cutSeen ? 1 : 0}|${laterCratePushSeen ? 1 : 0}`;
      if (visited.has(key)) continue;
      visited.add(key);
      queue.push({
        state: step.state,
        cutSeen,
        laterCratePushSeen,
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
    reason: depthHit
      ? `depth budget exceeded (${maxDepth})`
      : "no winning path with sticky_to_box and no later crate push",
  };
}

function formatMarkdown(input: typeof report): string {
  const result = input.result;
  const lines = [
    `# Post-Cut Crate Push Probe: ${input.id}`,
    "",
    `- Budget: maxStates=${input.budget.maxStates}, maxDepth=${input.budget.maxDepth}`,
    "- Searched bypass: a winning path with sticky_to_box but no later push_object:crate#N",
    "",
    "## Layout",
    "",
    "```text",
    input.layout,
    "```",
    "",
    "## Bypass Probe",
    "",
    `- Found bypass: ${result.found}`,
    `- Status: ${result.status}`,
    `- Explored states: ${result.exploredStates}`,
    ...(result.reason ? [`- Reason: ${result.reason}`] : []),
    ...(result.depth !== undefined ? [`- Depth: ${result.depth}`] : []),
    ...(result.inputs ? [`- Inputs: ${result.inputs.join(" ")}`] : []),
    ...(result.events ? [`- Events: ${result.events.join(" ") || "none"}`] : []),
  ];
  return `${lines.join("\n").trimEnd()}\n`;
}
