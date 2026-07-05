import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { eventMatchesPattern } from "../../../src/core/events.js";
import { loadPrototypePackage } from "../../../src/core/io.js";
import { solveWithRuntime } from "../../../src/core/solver.js";
import type { InputId, LevelDoc, SearchStatus } from "../../../src/core/types.js";
import { getRuntimeAdapter } from "../../../src/prototypes/runtimeAdapter.js";

type RuntimeState = unknown;

type Feature = {
  name: string;
  matches: (events: string[]) => boolean;
};

type SearchNode = {
  state: RuntimeState;
  key: string;
  mask: number;
  cutSeen: boolean;
  depth: number;
  parent: number;
  input?: InputId;
  events: string[];
};

type ProbeResult = {
  foundBypass: boolean;
  status: SearchStatus;
  exploredStates: number;
  reason?: string;
  depth?: number;
  inputs?: InputId[];
  events?: string[];
  missingFeatures?: string[];
};

const prototypePath = "prototypes/reality_anchor";
const layoutPath = process.argv[2];
const id = process.argv[3] ?? "RA_L11_TMP_HARD_PROBE";
const maxStates = Number(process.argv[4] ?? 2_000_000);
const rawMaxDepth = process.argv[5];
const maxDepth = rawMaxDepth === undefined || rawMaxDepth === "none" ? undefined : Number(rawMaxDepth);

if (!layoutPath) {
  throw new Error("Usage: tmp_l11_hard_probe.ts <layout-file> <id> [maxStates] [maxDepth|none]");
}

const features: Feature[] = [
  {
    name: "anchor_boundary_shift:box_sticky",
    matches: (events) => events.some((event) => eventMatchesPattern(event, "anchor_boundary_shift:box_sticky")),
  },
  {
    name: "box_to_sticky",
    matches: (events) => events.some((event) => eventMatchesPattern(event, "box_to_sticky")),
  },
  {
    name: "sticky_merge",
    matches: (events) => events.some((event) => eventMatchesPattern(event, "sticky_merge")),
  },
  {
    name: "sticky_to_box",
    matches: (events) => events.some((event) => eventMatchesPattern(event, "sticky_to_box")),
  },
  {
    name: "move_sticky_rigid",
    matches: (events) => events.some((event) => eventMatchesPattern(event, "move_sticky_rigid")),
  },
  {
    name: "push_object:crate",
    matches: (events) => events.some(isCratePush),
  },
  {
    name: "post_sticky_to_box_push_object:crate",
    matches: () => false,
  },
];

const postCutCratePushBit = features.length - 1;
const allMask = (1 << features.length) - 1;

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
const solution = solveWithRuntime(runtime, initial, {
  winCondition: pkg.mechanic.win,
  maxStates,
  maxDepth: maxDepth ?? 500,
});
const hardProbe = findWinMissingHardFeatures(initial);

const report = {
  id,
  layout: adapter.renderState(initial as never),
  requiredFeatures: features.map((feature) => feature.name),
  budget: { maxStates, maxDepth: maxDepth ?? "none" },
  shortestSolution: solution.found
    ? {
        found: true,
        cost: solution.cost,
        depth: solution.depth,
        exploredStates: solution.exploredStates,
        inputs: solution.inputs,
        events: solution.events,
        stepSummary: summarizeSteps(initial, solution.inputs),
      }
    : {
        found: false,
        status: solution.searchStatus,
        exploredStates: solution.exploredStates,
        reason: solution.reason,
      },
  hardProbe,
};

const outBase = path.join(prototypePath, "reports", `tmp_l11_hard_probe_${sanitize(id)}`);
await mkdir(path.dirname(outBase), { recursive: true });
await writeFile(`${outBase}.json`, `${JSON.stringify(report, null, 2)}\n`, "utf8");
await writeFile(`${outBase}.md`, formatMarkdown(report), "utf8");
console.log(formatMarkdown(report));
console.log(`Wrote ${outBase}.md`);
console.log(`Wrote ${outBase}.json`);

function findWinMissingHardFeatures(initialState: RuntimeState): ProbeResult {
  const nodes: SearchNode[] = [
    {
      state: initialState,
      key: runtime.key(initialState),
      mask: 0,
      cutSeen: false,
      depth: 0,
      parent: -1,
      events: [],
    },
  ];
  const visited = new Set<string>([visitedKey(nodes[0]!)]);
  let cursor = 0;
  let depthHit = false;

  while (cursor < nodes.length) {
    if (visited.size > maxStates) {
      return {
        foundBypass: false,
        status: "exhausted",
        exploredStates: visited.size,
        reason: `state budget exceeded (${maxStates})`,
      };
    }

    const currentIndex = cursor;
    const current = nodes[cursor++]!;

    if (current.depth > 0 && runtime.isWin(current.state, pkg.mechanic.win)) {
      if (current.mask !== allMask) {
        const path = reconstruct(nodes, currentIndex);
        return {
          foundBypass: true,
          status: "found",
          exploredStates: visited.size,
          depth: current.depth,
          inputs: path.inputs,
          events: path.events,
          missingFeatures: missingFeatures(current.mask),
        };
      }
      continue;
    }

    if (maxDepth !== undefined && current.depth >= maxDepth) {
      depthHit = true;
      continue;
    }

    for (const action of runtime.actions(current.state, { winCondition: pkg.mechanic.win })) {
      const step = runtime.step(current.state, action, { winCondition: pkg.mechanic.win });
      if (!step.legal) continue;

      const nextMask = collectMask(current.mask, current.cutSeen, step.events);
      const nextCutSeen =
        current.cutSeen || step.events.some((event) => eventMatchesPattern(event, "sticky_to_box"));
      const nextKey = runtime.key(step.state);
      const node: SearchNode = {
        state: step.state,
        key: nextKey,
        mask: nextMask,
        cutSeen: nextCutSeen,
        depth: current.depth + 1,
        parent: currentIndex,
        input: action,
        events: step.events,
      };
      const vKey = visitedKey(node);
      if (visited.has(vKey)) continue;
      visited.add(vKey);
      nodes.push(node);
    }
  }

  return {
    foundBypass: false,
    status: depthHit ? "exhausted" : "complete",
    exploredStates: visited.size,
    reason: depthHit ? `depth budget exceeded (${maxDepth})` : "no winning bypass found",
  };
}

function collectMask(current: number, cutSeen: boolean, events: string[]): number {
  let mask = current;
  for (const [index, feature] of features.entries()) {
    if (index === postCutCratePushBit) continue;
    if (feature.matches(events)) {
      mask |= 1 << index;
    }
  }
  if (cutSeen && events.some(isCratePush)) {
    mask |= 1 << postCutCratePushBit;
  }
  return mask;
}

function visitedKey(node: SearchNode): string {
  return `${node.key}|m:${node.mask}|cut:${node.cutSeen ? 1 : 0}`;
}

function missingFeatures(mask: number): string[] {
  return features
    .filter((_, index) => (mask & (1 << index)) === 0)
    .map((feature) => feature.name);
}

function reconstruct(nodes: SearchNode[], index: number): { inputs: InputId[]; events: string[] } {
  const inputs: InputId[] = [];
  const eventGroups: string[][] = [];
  let cursor = index;
  while (cursor >= 0) {
    const node = nodes[cursor]!;
    if (node.input) {
      inputs.push(node.input);
      eventGroups.push(node.events);
    }
    cursor = node.parent;
  }
  inputs.reverse();
  eventGroups.reverse();
  return { inputs, events: eventGroups.flat() };
}

function summarizeSteps(initialState: RuntimeState, inputs: InputId[]): Array<{ step: number; input: InputId; events: string[] }> {
  let state = initialState;
  const steps: Array<{ step: number; input: InputId; events: string[] }> = [];
  for (const [index, input] of inputs.entries()) {
    const result = runtime.step(state, input, { winCondition: pkg.mechanic.win });
    steps.push({ step: index + 1, input, events: result.events });
    if (!result.legal) break;
    state = result.state;
  }
  return steps;
}

function isCratePush(event: string): boolean {
  return /^push_object:crate#\d+$/.test(event);
}

function formatMarkdown(input: typeof report): string {
  const lines = [
    `# L11 Hard Probe: ${input.id}`,
    "",
    `- Budget: maxStates=${input.budget.maxStates}, maxDepth=${input.budget.maxDepth}`,
    `- Required: ${input.requiredFeatures.join(", ")}`,
    "",
    "## Layout",
    "",
    "```text",
    input.layout,
    "```",
    "",
    "## Shortest Solver Path",
    "",
  ];

  if (input.shortestSolution.found) {
    lines.push(`- Found: true`);
    lines.push(`- Cost: ${input.shortestSolution.cost}`);
    lines.push(`- Depth: ${input.shortestSolution.depth}`);
    lines.push(`- Explored states: ${input.shortestSolution.exploredStates}`);
    lines.push(`- Inputs: ${input.shortestSolution.inputs.join(" ")}`);
    lines.push(`- Events: ${input.shortestSolution.events.join(" ") || "none"}`);
    lines.push("");
    lines.push("### Event Steps");
    lines.push("");
    for (const step of input.shortestSolution.stepSummary.filter((item) => item.events.some((event) => event !== "walk"))) {
      lines.push(`- ${step.step}. ${step.input}: ${step.events.join(" ")}`);
    }
  } else {
    lines.push(`- Found: false`);
    lines.push(`- Status: ${input.shortestSolution.status}`);
    lines.push(`- Explored states: ${input.shortestSolution.exploredStates}`);
    lines.push(`- Reason: ${input.shortestSolution.reason ?? "n/a"}`);
  }

  lines.push("");
  lines.push("## Hard Probe");
  lines.push("");
  lines.push(`- Found bypass: ${input.hardProbe.foundBypass}`);
  lines.push(`- Status: ${input.hardProbe.status}`);
  lines.push(`- Explored states: ${input.hardProbe.exploredStates}`);
  if (input.hardProbe.reason) lines.push(`- Reason: ${input.hardProbe.reason}`);
  if (input.hardProbe.depth !== undefined) lines.push(`- Bypass depth: ${input.hardProbe.depth}`);
  if (input.hardProbe.missingFeatures) lines.push(`- Missing features: ${input.hardProbe.missingFeatures.join(", ")}`);
  if (input.hardProbe.inputs) lines.push(`- Bypass inputs: ${input.hardProbe.inputs.join(" ")}`);
  if (input.hardProbe.events) lines.push(`- Bypass events: ${input.hardProbe.events.join(" ") || "none"}`);

  return `${lines.join("\n").trimEnd()}\n`;
}

function sanitize(value: string): string {
  return value.replace(/[^a-zA-Z0-9_-]/g, "_");
}
