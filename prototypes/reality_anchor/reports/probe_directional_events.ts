import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { eventMatchesPattern } from "../../../src/core/events.js";
import { loadPrototypePackage } from "../../../src/core/io.js";
import type { InputId, LevelDoc, SearchStatus } from "../../../src/core/types.js";
import { getRuntimeAdapter } from "../../../src/prototypes/runtimeAdapter.js";

type RuntimeState = unknown;

type EventGroup = {
  kind: "event";
  name: string;
  patterns: string[];
};

type PushPullMoveGroup = {
  kind: "plmove";
  name: string;
  pattern: string;
  dx: number;
  dy: number;
};

type Group = EventGroup | PushPullMoveGroup;

type ProbeResult = {
  found: boolean;
  status: SearchStatus;
  exploredStates: number;
  reason?: string;
  depth?: number;
  inputs?: InputId[];
  events?: string[];
  missingGroups?: string[];
};

type PushPullAnchor = {
  p: { x: number; y: number };
  l: { x: number; y: number };
};

const prototypePath = "prototypes/reality_anchor";
const layoutPath = process.argv[2];
const id = process.argv[3] ?? "RA_DIRECTIONAL_PROBE";
const maxStates = Number(process.argv[4] ?? 300000);
const maxDepth = Number(process.argv[5] ?? 1000);
const groups = process.argv.length > 6 ? parseGroups(process.argv.slice(6)) : defaultGroups();

if (!layoutPath) {
  throw new Error(
    "Usage: probe_directional_events.ts <layout-file> <id> [maxStates] [maxDepth] [group...]",
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
  support_level: "medium",
  expected_solver_evidence: ["solvable"],
  expected_llm_player_evidence: [],
  layout,
};
const initial = adapter.parseLevel(level);

const allGroupProbe = findWinMissingGroups(initial, groups, { maxStates, maxDepth });
const individualProbes = groups.map((group) => ({
  group: group.name,
  result: findWinMissingGroups(initial, [group], { maxStates, maxDepth }),
}));

const report = {
  id,
  layout: adapter.renderState(initial as never),
  groups,
  budget: { maxStates, maxDepth },
  allGroupProbe,
  individualProbes,
};

const outBase = path.join(prototypePath, "reports", `direction_probe_${id}`);
await mkdir(path.dirname(outBase), { recursive: true });
await writeFile(`${outBase}.json`, `${JSON.stringify(report, null, 2)}\n`, "utf8");
await writeFile(`${outBase}.md`, formatMarkdown(report), "utf8");
console.log(`Wrote ${outBase}.md`);
console.log(`Wrote ${outBase}.json`);

function findWinMissingGroups(
  initialState: RuntimeState,
  requiredGroups: Group[],
  budget: { maxStates: number; maxDepth: number },
): ProbeResult {
  const allMask = (1 << requiredGroups.length) - 1;
  const queue: Array<{
    state: RuntimeState;
    mask: number;
    inputs: InputId[];
    events: string[];
    depth: number;
  }> = [{ state: initialState, mask: 0, inputs: [], events: [], depth: 0 }];
  const visited = new Set<string>([`${runtime.key(initialState)}|0`]);
  let cursor = 0;
  let depthHit = false;

  while (cursor < queue.length) {
    if (visited.size > budget.maxStates) {
      return {
        found: false,
        status: "exhausted",
        exploredStates: visited.size,
        reason: `state budget exceeded (${budget.maxStates})`,
      };
    }

    const current = queue[cursor]!;
    cursor += 1;

    if (current.depth > 0 && runtime.isWin(current.state, pkg.mechanic.win) && current.mask !== allMask) {
      return {
        found: true,
        status: "found",
        exploredStates: visited.size,
        depth: current.depth,
        inputs: current.inputs,
        events: current.events,
        missingGroups: requiredGroups
          .filter((_, index) => (current.mask & (1 << index)) === 0)
          .map((group) => group.name),
      };
    }

    if (current.depth >= budget.maxDepth) {
      depthHit = true;
      continue;
    }

    for (const action of runtime.actions(current.state, { winCondition: pkg.mechanic.win })) {
      const step = runtime.step(current.state, action, { winCondition: pkg.mechanic.win });
      if (!step.legal) continue;
      const nextMask = collectMask(current.mask, current.state, step.state, step.events, requiredGroups);
      const nextKey = `${runtime.key(step.state)}|${nextMask}`;
      if (visited.has(nextKey)) continue;
      visited.add(nextKey);
      queue.push({
        state: step.state,
        mask: nextMask,
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
    reason: depthHit ? `depth budget exceeded (${budget.maxDepth})` : "no winning bypass found",
  };
}

function collectMask(
  current: number,
  before: RuntimeState,
  after: RuntimeState,
  events: string[],
  requiredGroups: Group[],
): number {
  let mask = current;
  const beforeAnchor = parsePushPullAnchor(runtime.key(before));
  const afterAnchor = parsePushPullAnchor(runtime.key(after));
  for (const [index, group] of requiredGroups.entries()) {
    if (group.kind === "event") {
      if (group.patterns.some((pattern) => events.some((event) => eventMatchesPattern(event, pattern)))) {
        mask |= 1 << index;
      }
      continue;
    }

    if (
      beforeAnchor &&
      afterAnchor &&
      events.some((event) => eventMatchesPattern(event, group.pattern)) &&
      afterAnchor.p.x - beforeAnchor.p.x === group.dx &&
      afterAnchor.p.y - beforeAnchor.p.y === group.dy &&
      afterAnchor.l.x - beforeAnchor.l.x === group.dx &&
      afterAnchor.l.y - beforeAnchor.l.y === group.dy
    ) {
      mask |= 1 << index;
    }
  }
  return mask;
}

function parsePushPullAnchor(key: string): PushPullAnchor | undefined {
  const match = /PL:P:(-?\d+),(-?\d+);L:(-?\d+),(-?\d+)/.exec(key);
  if (!match) return undefined;
  return {
    p: { x: Number(match[1]), y: Number(match[2]) },
    l: { x: Number(match[3]), y: Number(match[4]) },
  };
}

function defaultGroups(): Group[] {
  return [
    { kind: "plmove", name: "anchor_pull_right", pattern: "pull_object:push_pull_anchor", dx: 1, dy: 0 },
    { kind: "plmove", name: "anchor_push_right", pattern: "push_object:push_pull_anchor", dx: 1, dy: 0 },
  ];
}

function parseGroups(rawGroups: string[]): Group[] {
  return rawGroups.map((raw) => {
    const [name, spec] = raw.split("=");
    if (!name || !spec) {
      throw new Error(`Group '${raw}' must be formatted as name=event:pattern1|pattern2 or name=pl:pattern:dx:dy`);
    }
    if (spec.startsWith("event:")) {
      return {
        kind: "event",
        name,
        patterns: spec
          .slice("event:".length)
          .split("|")
          .map((pattern) => pattern.trim())
          .filter((pattern) => pattern.length > 0),
      };
    }
    if (spec.startsWith("pl:")) {
      const parts = spec.split(":");
      if (parts.length < 5) {
        throw new Error(`Directional group '${raw}' must end with :dx:dy`);
      }
      const dy = Number(parts.pop());
      const dx = Number(parts.pop());
      const pattern = parts.slice(1).join(":");
      if (!Number.isFinite(dx) || !Number.isFinite(dy)) {
        throw new Error(`Directional group '${raw}' has invalid dx/dy`);
      }
      return { kind: "plmove", name, pattern, dx, dy };
    }
    throw new Error(`Unknown group kind in '${raw}'`);
  });
}

function formatMarkdown(input: typeof report): string {
  const lines = [
    `# Directional Event Probe: ${input.id}`,
    "",
    `- Budget: maxStates=${input.budget.maxStates}, maxDepth=${input.budget.maxDepth}`,
    `- Required groups: ${input.groups.map((group) => group.name).join(", ")}`,
    "",
    "## Layout",
    "",
    "```text",
    input.layout,
    "```",
    "",
    "## Combined Probe",
    "",
    ...formatProbe(input.allGroupProbe),
    "",
    "## Individual Probes",
    "",
  ];
  for (const probe of input.individualProbes) {
    lines.push(`### ${probe.group}`);
    lines.push("");
    lines.push(...formatProbe(probe.result));
    lines.push("");
  }
  return `${lines.join("\n").trimEnd()}\n`;
}

function formatProbe(result: ProbeResult): string[] {
  return [
    `- Found bypass: ${result.found}`,
    `- Status: ${result.status}`,
    `- Explored states: ${result.exploredStates}`,
    ...(result.reason ? [`- Reason: ${result.reason}`] : []),
    ...(result.depth !== undefined ? [`- Depth: ${result.depth}`] : []),
    ...(result.missingGroups ? [`- Missing groups: ${result.missingGroups.join(", ") || "none"}`] : []),
    ...(result.inputs ? [`- Inputs: ${result.inputs.join(" ")}`] : []),
    ...(result.events ? [`- Events: ${result.events.join(" ") || "none"}`] : []),
  ];
}
