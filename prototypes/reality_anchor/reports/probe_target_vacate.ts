import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { loadPrototypePackage } from "../../../src/core/io.js";
import type { InputId, LevelDoc, SearchStatus } from "../../../src/core/types.js";
import type { RealityAnchorState } from "../../../src/prototypes/reality_anchor/mechanics.js";
import { getRuntimeAdapter } from "../../../src/prototypes/runtimeAdapter.js";

type RuntimeState = unknown;
type VacatePhase = 0 | 1 | 2 | 3;

type ProbeResult = {
  foundBypass: boolean;
  status: SearchStatus;
  exploredStates: number;
  reason?: string;
  depth?: number;
  inputs?: InputId[];
  events?: string[];
  finalPhase?: VacatePhase;
};

const prototypePath = "prototypes/reality_anchor";
const layoutPath =
  process.argv[2] ?? "prototypes/reality_anchor/reports/RA_LEX_2026_07_06_VACATE_BIND_RETURN_v1_layout.txt";
const id = process.argv[3] ?? "RA_LEX_2026_07_06_VACATE_BIND_RETURN_v1_target_vacate";
const target = process.argv[4] ?? "3,1";
const maxStates = Number(process.argv[5] ?? 1000000);
const maxDepth = Number(process.argv[6] ?? 160);

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
const initialCovered = coversTarget(initial as RealityAnchorState, target);
const initialPhase: VacatePhase = initialCovered ? 1 : 0;
const result = findWinningBypass(initial, initialPhase, { maxStates, maxDepth });

const report = {
  id,
  layout: adapter.renderState(initial),
  target,
  initialCovered,
  budget: { maxStates, maxDepth },
  requiredPattern: "covered -> uncovered -> covered before win",
  result,
};

const outBase = path.join(prototypePath, "reports", `target_vacate_probe_${id}`);
await mkdir(path.dirname(outBase), { recursive: true });
await writeFile(`${outBase}.json`, `${JSON.stringify(report, null, 2)}\n`, "utf8");
await writeFile(`${outBase}.md`, formatMarkdown(report), "utf8");
console.log(`Wrote ${outBase}.md`);
console.log(`Wrote ${outBase}.json`);

function findWinningBypass(
  initialState: RuntimeState,
  phase: VacatePhase,
  budget: { maxStates: number; maxDepth: number },
): ProbeResult {
  const queue: Array<{
    state: RuntimeState;
    phase: VacatePhase;
    inputs: InputId[];
    events: string[];
    depth: number;
  }> = [{ state: initialState, phase, inputs: [], events: [], depth: 0 }];
  const visited = new Set<string>([`${runtime.key(initialState)}|${phase}`]);
  let cursor = 0;
  let depthHit = false;

  while (cursor < queue.length) {
    if (visited.size > budget.maxStates) {
      return {
        foundBypass: false,
        status: "exhausted",
        exploredStates: visited.size,
        reason: `state budget exceeded (${budget.maxStates})`,
      };
    }

    const current = queue[cursor]!;
    cursor += 1;

    if (current.depth > 0 && runtime.isWin(current.state, pkg.mechanic.win) && current.phase !== 3) {
      return {
        foundBypass: true,
        status: "found",
        exploredStates: visited.size,
        depth: current.depth,
        inputs: current.inputs,
        events: current.events,
        finalPhase: current.phase,
      };
    }

    if (current.depth >= budget.maxDepth) {
      depthHit = true;
      continue;
    }

    for (const action of runtime.actions(current.state, { winCondition: pkg.mechanic.win })) {
      const step = runtime.step(current.state, action, { winCondition: pkg.mechanic.win });
      if (!step.legal) {
        continue;
      }
      const nextCovered = coversTarget(step.state as RealityAnchorState, target);
      const nextPhase = advancePhase(current.phase, nextCovered);
      const nextKey = `${runtime.key(step.state)}|${nextPhase}`;
      if (visited.has(nextKey)) {
        continue;
      }
      visited.add(nextKey);
      queue.push({
        state: step.state,
        phase: nextPhase,
        inputs: [...current.inputs, action],
        events: [...current.events, ...step.events],
        depth: current.depth + 1,
      });
    }
  }

  return {
    foundBypass: false,
    status: depthHit ? "exhausted" : "complete",
    exploredStates: visited.size,
    reason: depthHit ? `depth budget exceeded (${budget.maxDepth})` : "no winning bypass found",
  };
}

function advancePhase(phase: VacatePhase, covered: boolean): VacatePhase {
  if (phase === 0) return covered ? 1 : 0;
  if (phase === 1) return covered ? 1 : 2;
  if (phase === 2) return covered ? 3 : 2;
  return 3;
}

function coversTarget(state: RealityAnchorState, key: string): boolean {
  for (const crate of state.crates) {
    if (`${crate.x},${crate.y}` === key) return true;
  }
  for (const group of state.stickyGroups) {
    for (const cell of group) {
      if (`${cell.x},${cell.y}` === key) return true;
    }
  }
  const pushPull = state.pushPullAnchor;
  if (pushPull && (`${pushPull.push.x},${pushPull.push.y}` === key || `${pushPull.pull.x},${pushPull.pull.y}` === key)) {
    return true;
  }
  const boxSticky = state.boxStickyAnchor;
  if (boxSticky && (`${boxSticky.box.x},${boxSticky.box.y}` === key || `${boxSticky.sticky.x},${boxSticky.sticky.y}` === key)) {
    return true;
  }
  return false;
}

function formatMarkdown(report: {
  id: string;
  layout: string;
  target: string;
  initialCovered: boolean;
  budget: { maxStates: number; maxDepth: number };
  requiredPattern: string;
  result: ProbeResult;
}): string {
  const lines = [
    `# Target Vacate Probe: ${report.id}`,
    "",
    `- Target: ${report.target}`,
    `- Initial covered: ${report.initialCovered}`,
    `- Required pattern: ${report.requiredPattern}`,
    `- Budget: maxStates=${report.budget.maxStates}, maxDepth=${report.budget.maxDepth}`,
    "",
    "## Layout",
    "",
    "```text",
    report.layout,
    "```",
    "",
    "## Result",
    "",
    `- Found bypass: ${report.result.foundBypass}`,
    `- Status: ${report.result.status}`,
    `- Explored states: ${report.result.exploredStates}`,
    ...(report.result.reason ? [`- Reason: ${report.result.reason}`] : []),
    ...(report.result.depth !== undefined ? [`- Depth: ${report.result.depth}`] : []),
    ...(report.result.finalPhase !== undefined ? [`- Final phase: ${report.result.finalPhase}`] : []),
    ...(report.result.inputs ? [`- Inputs: ${report.result.inputs.join(" ")}`] : []),
    ...(report.result.events ? [`- Events: ${report.result.events.join(" ") || "none"}`] : []),
  ];
  return `${lines.join("\n").trimEnd()}\n`;
}
