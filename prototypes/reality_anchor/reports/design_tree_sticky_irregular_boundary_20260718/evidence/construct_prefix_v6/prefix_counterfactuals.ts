import { createHash } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import { loadPrototypePackage } from "../../../../../../src/core/io.js";
import { solveWithRuntime } from "../../../../../../src/core/solver.js";
import type { LevelDoc } from "../../../../../../src/core/types.js";
import { getRuntimeAdapter } from "../../../../../../src/prototypes/runtimeAdapter.js";

const repoRoot = path.resolve(import.meta.dirname, "../../../../../..");
const prototypeRoot = path.join(repoRoot, "prototypes", "reality_anchor");
const layoutPath = path.join(
  repoRoot,
  "prototypes", "reality_anchor", "reports",
  "design_tree_sticky_irregular_boundary_20260718", "nodes", "construct_prefix_v6", "layout.txt",
);
const candidateId = "RA_STICKY_IRREGULAR_BOUNDARY_CONSTRUCT_PREFIX";
const exactVersion = "v6_sha256_6bdff0b7ab64ca4558140b5b31567f94c28af3bce3e427dd3d05a5038a74cb03";
const maxStates = 300_000;

const pkg = await loadPrototypePackage(prototypeRoot);
const adapter = getRuntimeAdapter(pkg.mechanic);
const runtime = adapter.createRuntime(pkg.mechanic);
const layout = await readFile(layoutPath, "utf8");
const layoutSha256 = createHash("sha256").update(layout).digest("hex");
const level: LevelDoc = { id: candidateId, title: candidateId, layout, win: pkg.mechanic.win };
const initial = adapter.parseLevel(level);
const options = { winCondition: pkg.mechanic.win, maxStates };

const cases = [
  {
    id: "correct_l_merge",
    relation: "从下方进入把手位，向左拉单格，与上方横条合成凸脚朝东的三格 L。",
    inputs: ["left", "left", "up", "left"],
  },
  {
    id: "wrong_lower_bar_merge",
    relation: "在同一把手位向下拉横条，使三格材料在目标行合成横条。",
    inputs: ["left", "left", "up", "down"],
  },
  {
    id: "wrong_upper_bar_merge",
    relation: "从目标上方拉起单格，使三格材料在上行合成横条。",
    inputs: ["up", "up", "left", "up"],
  },
];

const results = [];
for (const item of cases) {
  let state = initial;
  const steps = [];
  let legal = true;
  for (const input of item.inputs) {
    const transition = runtime.step(state, input, options);
    steps.push({
      input,
      legal: transition.legal,
      reason: transition.reason ?? null,
      events: transition.events ?? [],
      beforeKey: runtime.key(state),
      afterKey: transition.legal ? runtime.key(transition.state) : runtime.key(state),
    });
    if (!transition.legal) {
      legal = false;
      break;
    }
    state = transition.state;
  }
  const solution = legal ? solveWithRuntime(runtime, state, options) : null;
  results.push({
    id: item.id,
    relation: item.relation,
    inputs: item.inputs,
    prefixLegal: legal,
    steps,
    stateAfterPrefix: adapter.renderState(state).trimEnd(),
    suffixSolve: solution
      ? {
          found: solution.found,
          searchStatus: solution.searchStatus,
          exploredStates: solution.exploredStates,
          cost: solution.found ? solution.cost : null,
          inputs: solution.found ? solution.inputs : [],
          events: solution.found ? solution.events : [],
          reason: solution.reason ?? null,
        }
      : null,
  });
}

const report = {
  candidateId,
  exactVersion,
  layoutPath: path.relative(repoRoot, layoutPath).replaceAll("\\", "/"),
  layoutSha256,
  maxStates,
  results,
};
const lines = [
  `# 前序构造近邻反事实：${candidateId}`,
  "",
  `- exact version: ${exactVersion}`,
  `- layout SHA256: ${layoutSha256}`,
  `- 单 case 后缀求解预算: ${maxStates}`,
  "",
];
for (const result of results) {
  lines.push(
    `## ${result.id}`,
    "",
    `- 关系：${result.relation}`,
    `- 前缀：${result.inputs.join(" ")}`,
    `- 前缀合法：${result.prefixLegal ? "是" : "否"}`,
    `- 后缀可解：${result.suffixSolve?.found ? "是" : "否"}`,
    `- 搜索状态：${result.suffixSolve?.searchStatus ?? "not_run"}`,
    `- 探索状态数：${result.suffixSolve?.exploredStates ?? 0}`,
    result.suffixSolve?.found ? `- 后缀最短成本：${result.suffixSolve.cost}` : "- 后缀最短成本：无",
    "",
    "```text",
    result.stateAfterPrefix,
    "```",
    "",
  );
}

await writeFile(path.join(import.meta.dirname, "prefix_counterfactuals.json"), `${JSON.stringify(report, null, 2)}\n`, "utf8");
await writeFile(path.join(import.meta.dirname, "prefix_counterfactuals.md"), `${lines.join("\n")}\n`, "utf8");
console.log(JSON.stringify(report, null, 2));
