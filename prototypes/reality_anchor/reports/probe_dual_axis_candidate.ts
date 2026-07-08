import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { eventMatchesPattern } from "../../../src/core/events.js";
import { loadPrototypePackage } from "../../../src/core/io.js";
import type { InputId, LevelDoc, SearchStatus } from "../../../src/core/types.js";
import { getRuntimeAdapter } from "../../../src/prototypes/runtimeAdapter.js";

type RuntimeState = unknown;

type Group = {
  name: string;
  patterns: string[];
};

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

const prototypePath = "prototypes/reality_anchor";
const layoutPath = process.argv[2] ?? "prototypes/reality_anchor/reports/scratch_dual_axis_layout.txt";
const id = process.argv[3] ?? "RA_EXP_2026_07_04_DUAL_AXIS_LOCK_v1";
const maxStates = Number(process.argv[4] ?? 300000);
const maxDepth = Number(process.argv[5] ?? 40);
const defaultGroups: Group[] = [
  { name: "push_pull_anchor_shift", patterns: ["anchor_boundary_shift:push_pull"] },
  { name: "box_sticky_anchor_shift", patterns: ["anchor_boundary_shift:box_sticky"] },
  { name: "pull_event", patterns: ["pull_object"] },
  { name: "material_normalization", patterns: ["box_to_sticky", "sticky_to_box"] },
  { name: "sticky_merge", patterns: ["sticky_merge"] },
  { name: "sticky_rigid_move", patterns: ["move_sticky_rigid"] },
];
const groups: Group[] = process.argv.length > 6 ? parseGroups(process.argv.slice(6)) : defaultGroups;

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
  target_learning: [],
  support_level: "none",
  expected_solver_evidence: ["solvable", "player_win_standard"],
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
  layout: adapter.renderState(initial),
  groups,
  budget: { maxStates, maxDepth },
  allGroupProbe,
  individualProbes,
};

const outBase = path.join(prototypePath, "reports", `event_probe_${id}`);
await mkdir(path.dirname(outBase), { recursive: true });
await writeFile(`${outBase}.json`, `${JSON.stringify(report, null, 2)}\n`, "utf8");
await writeFile(`${outBase}.md`, formatMarkdown(report), "utf8");
console.log(`Wrote ${outBase}.md`);
console.log(`Wrote ${outBase}.json`);

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

    const isWinningState = current.depth > 0 && runtime.isWin(current.state, pkg.mechanic.win);
    if (isWinningState && current.mask !== allMask) {
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
    if (isWinningState) {
      continue;
    }

    if (current.depth >= budget.maxDepth) {
      depthHit = true;
      continue;
    }

    for (const action of runtime.actions(current.state, { winCondition: pkg.mechanic.win })) {
      const result = runtime.step(current.state, action, { winCondition: pkg.mechanic.win });
      if (!result.legal) {
        continue;
      }
      const nextMask = collectMask(current.mask, result.events, requiredGroups);
      const nextKey = `${runtime.key(result.state)}|${nextMask}`;
      if (visited.has(nextKey)) {
        continue;
      }
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
  layout: string;
  groups: Group[];
  budget: { maxStates: number; maxDepth: number };
  allGroupProbe: ProbeResult;
  individualProbes: Array<{ group: string; result: ProbeResult }>;
}): string {
  const lines = [
    `# Event Probe: ${report.id}`,
    "",
    `- Budget: maxStates=${report.budget.maxStates}, maxDepth=${report.budget.maxDepth}`,
    `- Required groups: ${report.groups.map((group) => group.name).join(", ")}`,
    "",
    "## Layout",
    "",
    "```text",
    report.layout,
    "```",
    "",
    "## Combined Probe",
    "",
    ...formatProbe(report.allGroupProbe),
    "",
    "## Individual Probes",
    "",
  ];
  for (const probe of report.individualProbes) {
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

function parseGroups(rawGroups: string[]): Group[] {
  return rawGroups.map((raw) => {
    const [name, patternsRaw] = raw.split("=");
    if (!name || !patternsRaw) {
      throw new Error(`Group '${raw}' must be formatted as name=pattern1|pattern2`);
    }
    return {
      name,
      patterns: patternsRaw
        .split("|")
        .map((pattern) => pattern.trim())
        .filter((pattern) => pattern.length > 0),
    };
  });
}
