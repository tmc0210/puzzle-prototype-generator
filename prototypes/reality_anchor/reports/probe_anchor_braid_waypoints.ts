import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { loadPrototypePackage } from "../../../src/core/io.js";
import type { InputId, LevelDoc, Point, SearchStatus } from "../../../src/core/types.js";
import { getRuntimeAdapter } from "../../../src/prototypes/runtimeAdapter.js";
import type { RealityAnchorState } from "../../../src/prototypes/reality_anchor/mechanics.js";

const layoutPath = process.argv[2];
const id = process.argv[3] ?? "RA_ANCHOR_BRAID_WAYPOINTS";
const maxStates = Number(process.argv[4] ?? 100_000);
if (!layoutPath) {
  throw new Error("Usage: probe_anchor_braid_waypoints.ts <layout-file> <id> [maxStates]");
}

const pkg = await loadPrototypePackage("prototypes/reality_anchor");
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
const initial = adapter.parseLevel(level) as RealityAnchorState;

type Waypoint = {
  id: string;
  description: string;
  matches: (state: RealityAnchorState) => boolean;
};

const point = (value: Point | undefined, x: number, y: number): boolean => value?.x === x && value.y === y;
const anchorsAt = (
  state: RealityAnchorState,
  pl: [number, number, number, number],
  bs: [number, number, number, number],
): boolean => Boolean(
  state.pushPullAnchor &&
  state.boxStickyAnchor &&
  point(state.pushPullAnchor.push, pl[0], pl[1]) &&
  point(state.pushPullAnchor.pull, pl[2], pl[3]) &&
  point(state.boxStickyAnchor.sticky, bs[0], bs[1]) &&
  point(state.boxStickyAnchor.box, bs[2], bs[3])
);

const waypoints: Waypoint[] = [
  {
    id: "pl_lower_stage",
    description: "P/L 向下离开主工作行，释放旧 L 半格；B/S 仍在初位。",
    matches: (state) => anchorsAt(state, [2, 4, 3, 4], [4, 2, 4, 3]),
  },
  {
    id: "bs_left_extract",
    description: "B/S 经旧 L 半格向左抽出，P/L 仍在下方 staging row。",
    matches: (state) => anchorsAt(state, [2, 4, 3, 4], [3, 2, 3, 3]),
  },
  {
    id: "mixed_up_bs_temp_dock",
    description: "两锚同链上移；B/S 的 S 端覆盖上目标，P/L 位于其下。",
    matches: (state) => anchorsAt(state, [2, 3, 3, 3], [3, 1, 3, 2]),
  },
  {
    id: "bs_right_vacate",
    description: "B/S 向右撤销上目标覆盖，腾出 P/L 的上拉玩家站位。",
    matches: (state) => anchorsAt(state, [2, 3, 3, 3], [4, 1, 4, 2]),
  },
  {
    id: "pl_up_prefinal",
    description: "P/L 被向上拉到预终态，P 端先覆盖下目标，等待最终同链左收。",
    matches: (state) => anchorsAt(state, [2, 2, 3, 2], [4, 1, 4, 2]),
  },
];

type ProbeResult = {
  found: boolean;
  status: SearchStatus;
  exploredStates: number;
  reason: string;
  progress?: number;
  missingWaypoints?: string[];
  inputs?: InputId[];
  events?: string[];
};

const result = findWinningWaypointBypass();
const report = {
  id,
  layout: adapter.renderState(initial),
  budget: { maxStates },
  waypoints: waypoints.map(({ id: waypointId, description }) => ({ id: waypointId, description })),
  result,
};

const outBase = path.join("prototypes/reality_anchor/reports", `anchor_braid_waypoint_probe_${id}`);
await mkdir(path.dirname(outBase), { recursive: true });
await writeFile(`${outBase}.json`, `${JSON.stringify(report, null, 2)}\n`, "utf8");
await writeFile(`${outBase}.md`, formatMarkdown(), "utf8");
console.log(`Wrote ${outBase}.md`);
console.log(`Wrote ${outBase}.json`);

function advance(state: RealityAnchorState, current: number): number {
  let next = current;
  while (next < waypoints.length && waypoints[next]!.matches(state)) next += 1;
  return next;
}

function findWinningWaypointBypass(): ProbeResult {
  const initialProgress = advance(initial, 0);
  const queue: Array<{
    state: RealityAnchorState;
    progress: number;
    inputs: InputId[];
    events: string[];
  }> = [{ state: initial, progress: initialProgress, inputs: [], events: [] }];
  const visited = new Set<string>([`${runtime.key(initial)}|${initialProgress}`]);
  let cursor = 0;
  while (cursor < queue.length) {
    if (visited.size > maxStates) {
      return {
        found: false,
        status: "exhausted",
        exploredStates: visited.size,
        reason: `state budget exceeded (${maxStates})`,
      };
    }
    const current = queue[cursor++]!;
    if (runtime.isWin(current.state, pkg.mechanic.win)) {
      if (current.progress < waypoints.length) {
        return {
          found: true,
          status: "found",
          exploredStates: visited.size,
          reason: "winning path skipped one or more ordered anchor waypoints",
          progress: current.progress,
          missingWaypoints: waypoints.slice(current.progress).map((waypoint) => waypoint.id),
          inputs: current.inputs,
          events: current.events,
        };
      }
      continue;
    }
    for (const action of runtime.actions(current.state, { winCondition: pkg.mechanic.win })) {
      const step = runtime.step(current.state, action, { winCondition: pkg.mechanic.win });
      if (!step.legal) continue;
      const state = step.state as RealityAnchorState;
      const progress = advance(state, current.progress);
      const key = `${runtime.key(state)}|${progress}`;
      if (visited.has(key)) continue;
      visited.add(key);
      queue.push({
        state,
        progress,
        inputs: [...current.inputs, action],
        events: [...current.events, ...step.events],
      });
    }
  }
  return {
    found: false,
    status: "complete",
    exploredStates: visited.size,
    reason: "no winning path skipped the ordered anchor braid waypoints",
  };
}

function formatMarkdown(): string {
  const lines = [
    `# Anchor Braid Waypoint Probe: ${id}`,
    "",
    `- Budget: maxStates=${maxStates}`,
    "",
    "## Layout",
    "",
    "```text",
    report.layout,
    "```",
    "",
    "## Ordered Waypoints",
    "",
    ...report.waypoints.flatMap((waypoint, index) => [
      `${index + 1}. \`${waypoint.id}\`：${waypoint.description}`,
      "",
    ]),
    "## Winning Bypass Probe",
    "",
    `- Found bypass: ${result.found}`,
    `- Status: ${result.status}`,
    `- Explored states: ${result.exploredStates}`,
    `- Reason: ${result.reason}`,
    ...(result.progress !== undefined ? [`- Ordered progress: ${result.progress}/${waypoints.length}`] : []),
    ...(result.missingWaypoints ? [`- Missing waypoints: ${result.missingWaypoints.join(", ")}`] : []),
    ...(result.inputs ? [`- Inputs: ${result.inputs.join(" ")}`] : []),
    ...(result.events ? [`- Events: ${result.events.join(" ") || "none"}`] : []),
  ];
  return `${lines.join("\n").trimEnd()}\n`;
}
