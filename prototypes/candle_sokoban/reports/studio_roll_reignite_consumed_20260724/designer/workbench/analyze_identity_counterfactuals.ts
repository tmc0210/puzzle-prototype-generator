import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { loadPrototypePackage } from "../../../../../../src/core/io.js";
import type { LevelDoc } from "../../../../../../src/core/types.js";
import { analyzeLevel } from "../../../../../../src/workflows/levelAnalyzer.js";
import {
  isWin,
  parseLevel,
  stateKey,
  step,
  type CandleAction,
  type CandleSokobanState,
} from "../../../../../../src/prototypes/candle_sokoban/mechanics.js";

const exactRoot = path.resolve(
  "prototypes/candle_sokoban/reports/studio_roll_reignite_consumed_20260724/candidate/versions/v1",
);
const sourceLayout = (await readFile(path.join(exactRoot, "layout.txt"), "utf8"))
  .replace(/\r/g, "")
  .trimEnd();
const pkg = await loadPrototypePackage(path.resolve("prototypes/candle_sokoban"));

type Variant = {
  id: string;
  relation: string;
  x: number;
  y: number;
  replacement: string;
};

const variants: Variant[] = [
  {
    id: "known_source_unlit",
    relation: "把首次墙后已知火源改为未点亮，检查终点点燃与缩短是否仍可成立。",
    x: 1,
    y: 4,
    replacement: "o",
  },
  {
    id: "remove_first_concealing_wall",
    relation: "删除首次滚动 d1 遮芯墙，检查同滚动复燃是否退化为始终点燃。",
    x: 1,
    y: 3,
    replacement: ".",
  },
  {
    id: "remove_exclusive_first_track_brazier",
    relation: "删除首次烛芯列独占目标，检查提前缩短后绕过墙熄—复燃的胜解是否出现。",
    x: 1,
    y: 5,
    replacement: ".",
  },
  {
    id: "remove_final_consumer_brazier",
    relation: "删除顶部最终火盆，检查是否会在穿过退焰门之前提前满足正常胜利。",
    x: 2,
    y: 1,
    replacement: ".",
  },
  {
    id: "remove_post_shrink_extinguishing_wall",
    relation: "删除第二次滚动的遮芯墙，检查核心 candle 是否会在绕行期间继续燃烧并失去回程形状。",
    x: 2,
    y: 8,
    replacement: ".",
  },
  {
    id: "remove_endpoint_stop_and_return_source",
    relation: "删除兼任首次止挡、第二次点火与回程火源的下方火盆，检查三重对象责任。",
    x: 2,
    y: 7,
    replacement: ".",
  },
];

const results = variants.map((variant) => {
  const layout = replaceCell(sourceLayout, variant.x, variant.y, variant.replacement);
  const level: LevelDoc = {
    id: `CANDLE_ROLL_REIGNITE_CONSUMED_001_V1_CF_${variant.id}`,
    title: variant.id,
    global_burn_cycle: 5,
    layout,
    win: { type: "all_braziers_lit" },
  };
  const analysis = analyzeLevel(pkg, level, {
    maxStates: 500000,
    graphMaxStates: 500000,
    counterfactualMaxStates: 500000,
  });
  const firstReigniteProduct = analyzeFirstReigniteNecessity(level);
  return {
    id: variant.id,
    relation: variant.relation,
    changedCell: { x: variant.x, y: variant.y, replacement: variant.replacement },
    layout,
    solve: {
      found: analysis.solution.found,
      cost: analysis.solution.cost,
      inputs: analysis.solution.inputs,
      events: analysis.solution.events,
      hasFirstSameRollReignite: analysis.solution.events.some((event) =>
        event.startsWith("roll_reignite_after_extinguish:candle#1"),
      ),
      hasGateCrossingConsumer: analysis.solution.inputs.length > 8,
    },
    graph: analysis.graph,
    firstReigniteProduct,
  };
});

const report = {
  designTaskId: "candle_roll_reignite_consumed_20260724",
  candidateId: "CANDLE_ROLL_REIGNITE_CONSUMED_001",
  exactVersion: "v1",
  baselineLayout: sourceLayout,
  scope: "single-cell identity counterfactuals analyzed with the Candle runtime and complete reachable graphs",
  results,
  limits: [
    "反事实只说明相应单格职责或作品关系如何变化，不把可解/不可解当作审美结论。",
    "hasGateCrossingConsumer 仅作规范最短解的长度提示；exact 全胜解的门位历史由 solution_family.json 独立枚举。",
  ],
};

const markdown = [
  "# Identity Counterfactuals: CANDLE_ROLL_REIGNITE_CONSUMED_001 v1",
  "",
  ...results.flatMap((result) => [
    `## ${result.id}`,
    "",
    `- 关系：${result.relation}`,
    `- 完整图：${result.graph.status}，states=${result.graph.reachableStateCount}，wins=${result.graph.winStateCount}`,
    `- 可解：${result.solve.found ? `yes，cost=${result.solve.cost}` : "no"}`,
    `- 最短解含首次同滚动复燃：${result.solve.hasFirstSameRollReignite ? "yes" : "no"}`,
    `- 全部首次胜利均含同滚动复燃：${result.firstReigniteProduct.winsWithoutFirstReignite === 0 ? "yes" : "no"}`,
    `- 不含同滚动复燃的胜利 product states：${result.firstReigniteProduct.winsWithoutFirstReignite}`,
    `- 最短输入：${result.solve.inputs.join(" ") || "none"}`,
    "",
    "```text",
    result.layout,
    "```",
    "",
  ]),
  "## Evidence boundary",
  "",
  ...report.limits.map((limit) => `- ${limit}`),
  "",
].join("\n");

await Promise.all([
  writeFile(path.join(exactRoot, "identity_counterfactuals.json"), `${JSON.stringify(report, null, 2)}\n`, "utf8"),
  writeFile(path.join(exactRoot, "identity_counterfactuals.md"), markdown, "utf8"),
]);

process.stdout.write(
  results
    .map((result) => `${result.id}: graph=${result.graph.status} win=${result.solve.found} cost=${result.solve.cost ?? "n/a"} first_reignite=${result.solve.hasFirstSameRollReignite}`)
    .join("\n") + "\n",
);

function replaceCell(layout: string, x: number, y: number, replacement: string): string {
  const rows = layout.split("\n");
  const cells = [...rows[y]!];
  cells[x] = replacement;
  rows[y] = cells.join("");
  return rows.join("\n");
}

function analyzeFirstReigniteNecessity(level: LevelDoc): {
  status: "complete";
  productStateCount: number;
  winsWithFirstReignite: number;
  winsWithoutFirstReignite: number;
  representativeWithoutFirstReignite: CandleAction[] | null;
} {
  type Node = { state: CandleSokobanState; seen: boolean; inputs: CandleAction[] };
  const initial = parseLevel(level);
  const initialNode: Node = { state: initial, seen: false, inputs: [] };
  const key = (node: Node): string => `${stateKey(node.state)}|R:${node.seen ? 1 : 0}`;
  const queue: Node[] = [initialNode];
  const visited = new Set<string>([key(initialNode)]);
  const actions = Object.keys(pkg.mechanic.inputs) as CandleAction[];
  let winsWithFirstReignite = 0;
  let winsWithoutFirstReignite = 0;
  let representativeWithoutFirstReignite: CandleAction[] | null = null;

  for (let cursor = 0; cursor < queue.length; cursor += 1) {
    const current = queue[cursor]!;
    if (isWin(current.state, level.win!)) {
      if (current.seen) {
        winsWithFirstReignite += 1;
      } else {
        winsWithoutFirstReignite += 1;
        representativeWithoutFirstReignite ??= current.inputs;
      }
      continue;
    }
    for (const action of actions) {
      const transition = step(pkg.mechanic, current.state, action, { winCondition: level.win });
      if (!transition.legal) continue;
      const next: Node = {
        state: transition.state,
        seen: current.seen || transition.events.some((event) =>
          event.startsWith("roll_reignite_after_extinguish:candle#1"),
        ),
        inputs: [...current.inputs, action],
      };
      const nextKey = key(next);
      if (visited.has(nextKey)) continue;
      visited.add(nextKey);
      queue.push(next);
    }
  }

  return {
    status: "complete",
    productStateCount: visited.size,
    winsWithFirstReignite,
    winsWithoutFirstReignite,
    representativeWithoutFirstReignite,
  };
}
