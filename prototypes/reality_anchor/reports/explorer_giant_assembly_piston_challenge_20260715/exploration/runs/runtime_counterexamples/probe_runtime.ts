import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import { loadPrototypePackage } from "../../../../../../../src/core/io.js";
import type { InputId, LevelDoc } from "../../../../../../../src/core/types.js";
import {
  forceModeAt,
  isWin,
  parseLevel,
  pointKey,
  renderState,
  stateKey,
  step,
  type RealityAnchorState,
} from "../../../../../../../src/prototypes/reality_anchor/mechanics.js";

type Scenario = {
  id: string;
  inputs: InputId[];
  closureNote: string;
  graphCheck?: boolean;
};

const scenarios: Scenario[] = [
  {
    id: "assembly_reachable",
    inputs: [
      "up", "up",
      "left", "left", "left", "left",
      "down", "down", "down", "down",
      "right", "right", "right", "right",
      "up", "up", "up",
    ],
    closureNote: "开放 push 区内，A(横五)、B(竖二)、C(横三) 初始互不相连；第 2 与第 17 手各发生一次 sticky_merge，最终得到正确冠-颈-尾巨构。",
  },
  {
    id: "bypass_long_bar",
    inputs: ["up", "down"],
    closureNote: "第一手：sticky#1 + 目标箱（force_chain:n2）；第二手：玩家空走，目标箱不回撤。",
  },
  {
    id: "bypass_branch_component",
    inputs: ["up", "down"],
    closureNote: "第一手：分叉 sticky#1 + 目标箱（force_chain:n2）；第二手：玩家空走，目标箱不回撤。",
  },
  {
    id: "register_span_full",
    inputs: ["up"],
    closureNote: "三层轴向支撑使玩家起点落在 P 侧；sticky#1 + 目标箱（force_chain:n2）。",
  },
  {
    id: "register_span_short",
    inputs: ["up"],
    closureNote: "两层轴向支撑使玩家只能站在 L 侧；up 不建立受力闭包。",
  },
  {
    id: "register_span_branch_bypass",
    inputs: ["up"],
    closureNote: "形状虽非直条，但轴向跨度仍为三层；sticky#1 + 目标箱（force_chain:n2）。",
  },
  {
    id: "register_unsealed_pull_handle",
    inputs: ["up"],
    closureNote: "只给 proper subset A；玩家从 L 侧中央缺口抓住 A 的前侧把手，pull 闭包为 A + 两个目标箱（force_chain:n3）。",
  },
  {
    id: "shear_component_set_correct",
    inputs: ["up"],
    closureNote: "全部 A/B/C 合体；sticky#1 + 两个目标箱（force_chain:n3），顶沿五格同时被 B/S 剪成箱。",
    graphCheck: true,
  },
  {
    id: "shear_component_set_wrong",
    inputs: ["up", "down", "up", "down"],
    closureNote: "错误合体第一手仅 sticky#1 + 左目标箱（force_chain:n2）；三格前沿被剪掉后，残体仅能 push/pull 往复。",
    graphCheck: true,
  },
  {
    id: "shear_component_subset_ab",
    inputs: ["up"],
    closureNote: "轴向跨度最大的 proper subset A+B 仍只到三层，玩家在 L 侧；up 不建立受力闭包。",
    graphCheck: true,
  },
];

const runDir = path.resolve(
  "prototypes/reality_anchor/reports/explorer_giant_assembly_piston_challenge_20260715/exploration/runs/runtime_counterexamples",
);
const layoutDir = path.join(runDir, "layouts");
const pkg = await loadPrototypePackage(path.resolve("prototypes/reality_anchor"));

const results = [];
for (const scenario of scenarios) {
  const layout = (await readFile(path.join(layoutDir, `${scenario.id}.txt`), "utf8")).trimEnd();
  const level: LevelDoc = { id: scenario.id, title: scenario.id, layout };
  let state = parseLevel(level);
  const steps = [];

  for (const input of scenario.inputs) {
    const before = state;
    const result = step(pkg.mechanic, state, input);
    const after = result.legal ? result.state : state;
    steps.push({
      input,
      legal: result.legal,
      reason: result.reason ?? null,
      events: result.events,
      playerBefore: before.player,
      playerAfter: after.player,
      forceModeBefore: forceModeAt(before, before.player),
      forceModeAfter: forceModeAt(after, after.player),
      coveredGoalsBefore: coveredGoals(before),
      coveredGoalsAfter: coveredGoals(after),
      isWinAfter: isWin(after),
      stateBefore: renderState(before),
      stateAfter: renderState(after),
    });
    state = after;
  }

  results.push({
    id: scenario.id,
    layout,
    inputs: scenario.inputs,
    closureNote: scenario.closureNote,
    initialPlayer: parseLevel(level).player,
    initialForceMode: forceModeAt(parseLevel(level), parseLevel(level).player),
    steps,
    finalWin: isWin(state),
    graph: scenario.graphCheck ? exploreGraph(parseLevel(level), 100_000) : null,
  });
}

await mkdir(runDir, { recursive: true });
await writeFile(path.join(runDir, "audit.json"), `${JSON.stringify({ scenarios: results }, null, 2)}\n`, "utf8");
await writeFile(path.join(runDir, "audit.md"), renderMarkdown(results), "utf8");

function coveredGoals(state: RealityAnchorState): string[] {
  const occupied = new Set<string>();
  for (const crate of state.crates) occupied.add(pointKey(crate));
  for (const group of state.stickyGroups) for (const cell of group) occupied.add(pointKey(cell));
  if (state.pushPullAnchor) {
    occupied.add(pointKey(state.pushPullAnchor.push));
    occupied.add(pointKey(state.pushPullAnchor.pull));
  }
  if (state.boxStickyAnchor) {
    occupied.add(pointKey(state.boxStickyAnchor.box));
    occupied.add(pointKey(state.boxStickyAnchor.sticky));
  }
  return [...state.goals].filter((goal) => occupied.has(goal)).sort();
}

function exploreGraph(initial: RealityAnchorState, maxStates: number) {
  const seen = new Map([[stateKey(initial), initial]]);
  const queue = [initial];
  let cursor = 0;
  let legalTransitions = 0;
  let winningStates = isWin(initial) ? 1 : 0;

  while (cursor < queue.length && seen.size < maxStates) {
    const current = queue[cursor++]!;
    for (const input of ["up", "down", "left", "right"] as InputId[]) {
      const result = step(pkg.mechanic, current, input);
      if (!result.legal) continue;
      legalTransitions += 1;
      const key = stateKey(result.state);
      if (seen.has(key)) continue;
      seen.set(key, result.state);
      queue.push(result.state);
      if (isWin(result.state)) winningStates += 1;
    }
  }

  return {
    status: cursor === queue.length ? "complete" : "exhausted",
    reachableStates: seen.size,
    legalTransitions,
    winningStates,
    maxStates,
  };
}

function renderMarkdown(results: Array<Record<string, any>>): string {
  const lines = [
    "# Runtime counterexample / interface audit",
    "",
    "> 坐标均为零基 `(x,y)`；force mode 由每手输入前的玩家坐标决定。",
    "",
  ];
  for (const result of results) {
    lines.push(`## ${result.id}`, "", `- Inputs: \`${result.inputs.join(",")}\``);
    lines.push(`- Initial player / mode: \`${result.initialPlayer.x},${result.initialPlayer.y}\` / \`${result.initialForceMode}\``);
    lines.push(`- Closure audit: ${result.closureNote}`);
    lines.push(`- Final win: \`${result.finalWin}\``);
    if (result.graph) {
      lines.push(
        `- Graph: \`${result.graph.status}\`, states=${result.graph.reachableStates}, transitions=${result.graph.legalTransitions}, wins=${result.graph.winningStates}`,
      );
    }
    lines.push("", "```text", result.layout, "```", "");
    for (const [index, stepResult] of result.steps.entries()) {
      lines.push(
        `### Step ${index + 1}: ${stepResult.input}`,
        "",
        `- legal=${stepResult.legal}${stepResult.reason ? `, reason=${stepResult.reason}` : ""}`,
        `- player: \`${stepResult.playerBefore.x},${stepResult.playerBefore.y}\` (${stepResult.forceModeBefore}) -> \`${stepResult.playerAfter.x},${stepResult.playerAfter.y}\` (${stepResult.forceModeAfter})`,
        `- events: ${stepResult.events.length ? stepResult.events.map((event: string) => `\`${event}\``).join(", ") : "none"}`,
        `- covered goals: \`${stepResult.coveredGoalsBefore.join(";") || "none"}\` -> \`${stepResult.coveredGoalsAfter.join(";") || "none"}\``,
        `- win after: \`${stepResult.isWinAfter}\``,
        "",
        "```text",
        stepResult.stateAfter,
        "```",
        "",
      );
    }
  }
  return `${lines.join("\n")}\n`;
}
