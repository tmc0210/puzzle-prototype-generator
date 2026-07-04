import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { eventMatchesPattern } from "../../../src/core/events.js";
import { loadPrototypePackage } from "../../../src/core/io.js";
import type { InputId, LevelDoc, SearchStatus } from "../../../src/core/types.js";
import { getRuntimeAdapter } from "../../../src/prototypes/runtimeAdapter.js";

type RuntimeState = unknown;
type FixedKind = "box_sticky" | "push_pull";
type Group = { name: string; patterns: string[] };
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
type ReachableScan = {
  status: SearchStatus;
  reachableStates: number;
  legalTransitions: number;
  eventCounts: Record<string, number>;
  forbiddenHits: string[];
  reason?: string;
};

const prototypePath = "prototypes/reality_anchor";
const layoutPath = process.argv[2];
const id = process.argv[3] ?? "RA_FIXED_ANCHOR_CANDIDATE";
const fixedKind = parseFixedKind(process.argv[4] ?? "box_sticky");
const maxStates = Number(process.argv[5] ?? 300000);
const maxDepth = Number(process.argv[6] ?? 50);
const profile = process.argv[7] ?? "default";

if (!layoutPath) {
  throw new Error("Usage: probe_fixed_anchor_candidate.ts <layout-file> <id> <box_sticky|push_pull> [maxStates] [maxDepth] [profile]");
}

const groups = buildGroups(fixedKind, profile);

const forbiddenReachable =
  fixedKind === "box_sticky" ? ["anchor_boundary_shift:box_sticky"] : ["anchor_boundary_shift:push_pull"];

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

const allGroupProbe = findWinMissingGroups(initial, groups, { maxStates, maxDepth });
const individualProbes = groups.map((group) => ({
  group: group.name,
  result: findWinMissingGroups(initial, [group], { maxStates, maxDepth }),
}));
const reachableScan = scanReachableEvents(initial, forbiddenReachable, { maxStates });

const report = {
  id,
  fixedKind,
  profile,
  layout: adapter.renderState(initial as never),
  groups,
  forbiddenReachable,
  budget: { maxStates, maxDepth },
  allGroupProbe,
  individualProbes,
  reachableScan,
};

const outBase = path.join(prototypePath, "reports", `fixed_anchor_probe_${id}`);
await mkdir(path.dirname(outBase), { recursive: true });
await writeFile(`${outBase}.json`, `${JSON.stringify(report, null, 2)}\n`, "utf8");
await writeFile(`${outBase}.md`, formatMarkdown(report), "utf8");
console.log(`Wrote ${outBase}.md`);
console.log(`Wrote ${outBase}.json`);

function parseFixedKind(value: string): FixedKind {
  if (value === "box_sticky" || value === "push_pull") return value;
  throw new Error("fixed kind must be box_sticky or push_pull");
}

function buildGroups(kind: FixedKind, groupProfile: string): Group[] {
  const base =
    kind === "box_sticky"
      ? [
          { name: "movable_push_pull_shift", patterns: ["anchor_boundary_shift:push_pull"] },
          { name: "fixed_box_sticky_effect", patterns: ["box_to_sticky", "sticky_to_box"] },
          { name: "pull_event", patterns: ["pull_object"] },
        ]
      : [
          { name: "movable_box_sticky_shift", patterns: ["anchor_boundary_shift:box_sticky"] },
          { name: "fixed_push_pull_effect", patterns: ["pull_object"] },
          { name: "material_normalization", patterns: ["box_to_sticky", "sticky_to_box"] },
        ];
  if (groupProfile === "strong_material_no_pull" && kind === "box_sticky") {
    return [
      { name: "movable_push_pull_shift", patterns: ["anchor_boundary_shift:push_pull"] },
      { name: "fixed_box_sticky_effect", patterns: ["box_to_sticky", "sticky_to_box"] },
      { name: "box_to_sticky", patterns: ["box_to_sticky"] },
      { name: "sticky_merge", patterns: ["sticky_merge"] },
      { name: "sticky_rigid_move", patterns: ["move_sticky_rigid"] },
    ];
  }
  if (groupProfile !== "strong_material") return base;
  return [
    ...base,
    { name: "box_to_sticky", patterns: ["box_to_sticky"] },
    { name: "sticky_merge", patterns: ["sticky_merge"] },
    { name: "sticky_rigid_move", patterns: ["move_sticky_rigid"] },
  ];
}

function findWinMissingGroups(
  initial: RuntimeState,
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
  }> = [{ state: initial, mask: 0, inputs: [], events: [], depth: 0 }];
  const visited = new Set<string>([`${runtime.key(initial)}|0`]);
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
      const result = runtime.step(current.state, action, { winCondition: pkg.mechanic.win });
      if (!result.legal) continue;
      const nextMask = collectMask(current.mask, result.events, requiredGroups);
      const nextKey = `${runtime.key(result.state)}|${nextMask}`;
      if (visited.has(nextKey)) continue;
      visited.add(nextKey);
      queue.push({
        state: result.state,
        mask: nextMask,
        inputs: [...current.inputs, action],
        events: [...current.events, ...result.events],
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

function scanReachableEvents(
  initial: RuntimeState,
  forbiddenPatterns: string[],
  budget: { maxStates: number },
): ReachableScan {
  const queue: RuntimeState[] = [initial];
  const visited = new Set<string>([runtime.key(initial)]);
  const eventCounts: Record<string, number> = {};
  const forbiddenHits = new Set<string>();
  let legalTransitions = 0;
  let cursor = 0;
  while (cursor < queue.length) {
    if (visited.size > budget.maxStates) {
      return {
        status: "exhausted",
        reachableStates: visited.size,
        legalTransitions,
        eventCounts,
        forbiddenHits: [...forbiddenHits].sort(),
        reason: `state budget exceeded (${budget.maxStates})`,
      };
    }
    const current = queue[cursor]!;
    cursor += 1;
    for (const action of runtime.actions(current, { winCondition: pkg.mechanic.win })) {
      const result = runtime.step(current, action, { winCondition: pkg.mechanic.win });
      if (!result.legal) continue;
      legalTransitions += 1;
      for (const event of result.events) {
        eventCounts[event] = (eventCounts[event] ?? 0) + 1;
        if (forbiddenPatterns.some((pattern) => eventMatchesPattern(event, pattern))) {
          forbiddenHits.add(event);
        }
      }
      const key = runtime.key(result.state);
      if (visited.has(key)) continue;
      visited.add(key);
      queue.push(result.state);
    }
  }
  return {
    status: "complete",
    reachableStates: visited.size,
    legalTransitions,
    eventCounts,
    forbiddenHits: [...forbiddenHits].sort(),
  };
}

function collectMask(current: number, events: string[], requiredGroups: Group[]): number {
  let mask = current;
  for (const [index, group] of requiredGroups.entries()) {
    if (group.patterns.some((pattern) => events.some((event) => eventMatchesPattern(event, pattern)))) {
      mask |= 1 << index;
    }
  }
  return mask;
}

function formatMarkdown(report: {
  id: string;
  fixedKind: FixedKind;
  profile: string;
  layout: string;
  groups: Group[];
  forbiddenReachable: string[];
  budget: { maxStates: number; maxDepth: number };
  allGroupProbe: ProbeResult;
  individualProbes: Array<{ group: string; result: ProbeResult }>;
  reachableScan: ReachableScan;
}): string {
  const lines = [
    `# Fixed Anchor Probe: ${report.id}`,
    "",
    `- Fixed kind: ${report.fixedKind}`,
    `- Profile: ${report.profile}`,
    `- Budget: maxStates=${report.budget.maxStates}, maxDepth=${report.budget.maxDepth}`,
    `- Required groups: ${report.groups.map((group) => group.name).join(", ")}`,
    `- Forbidden reachable events: ${report.forbiddenReachable.join(", ")}`,
    "",
    "## Layout",
    "",
    "```text",
    report.layout,
    "```",
    "",
    "## Combined Winning-Path Probe",
    "",
    ...formatProbe(report.allGroupProbe),
    "",
    "## Individual Winning-Path Probes",
    "",
  ];
  for (const probe of report.individualProbes) {
    lines.push(`### ${probe.group}`);
    lines.push("");
    lines.push(...formatProbe(probe.result));
    lines.push("");
  }
  lines.push("## Reachable Event Scan");
  lines.push("");
  lines.push(`- Status: ${report.reachableScan.status}`);
  lines.push(`- Reachable states: ${report.reachableScan.reachableStates}`);
  lines.push(`- Legal transitions: ${report.reachableScan.legalTransitions}`);
  lines.push(`- Forbidden hits: ${report.reachableScan.forbiddenHits.join(", ") || "none"}`);
  if (report.reachableScan.reason) lines.push(`- Reason: ${report.reachableScan.reason}`);
  lines.push("- Event counts:");
  for (const [event, count] of Object.entries(report.reachableScan.eventCounts).sort()) {
    lines.push(`  - ${event}: ${count}`);
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
