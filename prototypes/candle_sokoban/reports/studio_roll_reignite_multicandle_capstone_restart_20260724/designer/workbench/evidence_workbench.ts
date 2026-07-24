import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { loadPrototypePackage } from "../../../../../../src/core/io.js";
import { enumerateRuntimeGraph } from "../../../../../../src/core/runtimeGraph.js";
import { solveWithRuntime } from "../../../../../../src/core/solver.js";
import type { InputId, LevelDoc, SolverOptions } from "../../../../../../src/core/types.js";
import {
  createCandleSokobanRuntime,
} from "../../../../../../src/prototypes/candle_sokoban/runtime.js";
import {
  cloneState,
  parseLevel,
  renderState,
  stateKey,
  step,
  type CandleSokobanState,
} from "../../../../../../src/prototypes/candle_sokoban/mechanics.js";

const taskRoot = path.resolve(
  "prototypes/candle_sokoban/reports/studio_roll_reignite_multicandle_capstone_restart_20260724",
);
const prototypeRoot = path.resolve("prototypes/candle_sokoban");
const layoutPath = process.argv[2]
  ? path.resolve(process.argv[2])
  : path.join(taskRoot, "designer", "workbench", "layout_phase_v2.txt");
const outDir = process.argv[3]
  ? path.resolve(process.argv[3])
  : path.join(taskRoot, "designer", "workbench", "evidence_phase_v2");
const exactVersion = process.argv[4] ?? "workbench_phase_v2";
const candidateId = "CANDLE_REIGNITE_MULTICANDLE_CAPSTONE_002";
const levelId = `${candidateId}_${exactVersion.toUpperCase()}`;
const win = { type: "all_braziers_lit" } as const;
const maxStates = 300_000;
const maxTransitions = 1_000_000;
const maxDepth = 200;

type Edge = {
  from: number;
  to: number;
  action: InputId;
  events: string[];
};

type ProductNode = {
  base: number;
  mask: number;
  order: string[];
};

type Milestone = {
  id: string;
  event: string;
  occurrence?: number;
};

const milestones: Milestone[] = [
  { id: "core_axis_alignment", event: "push_axis:candle#1" },
  { id: "synchronized_setup_burn", event: "simultaneous_burn:candle#1+candle#3" },
  { id: "core_roll_reignite", event: "roll_reignite_after_extinguish:candle#1:d1->d4" },
  { id: "receiver_ignition_from_core", event: "shrink_ignite:candle#2" },
  { id: "core_burn_out", event: "burn_out:candle#1" },
  { id: "source_axis_push_1", event: "push_axis:candle#3", occurrence: 1 },
  { id: "source_axis_push_2", event: "push_axis:candle#3", occurrence: 2 },
  { id: "memory_brazier_lit_by_source", event: "light_brazier:4,4" },
  { id: "receiver_lights_final_brazier", event: "light_brazier:6,10" },
  { id: "all_braziers_lit_win", event: "win_all_braziers_lit" },
];

const milestoneIndex = new Map(milestones.map((item, index) => [item.id, index]));
const allMilestonesMask = (1 << milestones.length) - 1;

await mkdir(outDir, { recursive: true });
const pkg = await loadPrototypePackage(prototypeRoot);
const mechanic = pkg.mechanic;
const runtime = createCandleSokobanRuntime(mechanic);
const layout = (await readFile(layoutPath, "utf8")).replace(/\r/g, "").trimEnd();
const level: LevelDoc = {
  id: levelId,
  title: "回焰接力",
  global_burn_cycle: 5,
  win,
  layout,
};
const initialState = parseLevel(level);
const options: SolverOptions = {
  winCondition: win,
  maxStates,
  maxDepth,
};
const solution = solveWithRuntime(runtime, initialState, options);
if (!solution.found) {
  throw new Error(`候选不可解：${solution.reason ?? "unknown"}`);
}

const graph = enumerateRuntimeGraph(runtime, initialState, win, options, {
  maxStates,
  maxTransitions,
  terminalizeWins: true,
});
if (graph.status !== "complete") {
  throw new Error(`完整图未完成：${graph.reason ?? "unknown"}`);
}
const edges = graph.edges as Edge[];
const reverseDistance = computeReverseDistance(graph.keys.length, edges, graph.winStateIndexes);
const shortestCost = reverseDistance[0];
if (shortestCost === undefined) {
  throw new Error("完整图没有从初态到胜态的路径");
}

const shortest = summarizeShortestSolutions(
  graph.keys.length,
  edges,
  graph.winStateIndexes,
  graph.depthByIndex,
  reverseDistance,
  shortestCost,
);
const product = enumerateFirstWinProduct(graph.keys.length, edges, graph.winStateIndexes);
const winStates = Array.from(graph.winStateIndexes)
  .sort((a, b) => a - b)
  .map((index) => ({
    base_state_index: index,
    state_key: graph.keys[index],
    rendered_state: renderState(graph.states[index]!),
  }));

const requiredOnAllWinningPaths = milestones.map((milestone) => ({
  milestone: milestone.id,
  required: product.winningMissingMilestones.every(
    (missing) => !missing.includes(milestone.id),
  ),
}));

const replay = buildReplay(initialState, solution.inputs);
const counterfactuals = await buildCounterfactuals(layout, replay);

const solutionFamily = {
  artifact_kind: "task_local_first_win_product_graph",
  candidate_id: candidateId,
  exact_version: exactVersion,
  graph: {
    status: graph.status,
    reachable_states: graph.keys.length,
    legal_edges: edges.length,
    winning_base_states: graph.winStateIndexes.size,
    max_states: maxStates,
    max_transitions: maxTransitions,
  },
  shortest_solutions: shortest,
  milestone_definition: milestones,
  first_win_product_graph: product,
  required_on_all_winning_paths: requiredOnAllWinningPaths,
  logical_uniqueness_result:
    product.winningOrderSignatures.length === 1 &&
    product.winningMissingMilestones.every((missing) => missing.length === 0)
      ? "equivalent_variants_only"
      : "non_equivalent_or_bypass_found",
  evidence_limit:
    "产品图合并相同 runtime state、已见里程碑集合与首次出现顺序；重复普通走位和已见里程碑不会被误计为新逻辑家族。",
};

const layoutAnalysis = {
  artifact_kind: "complete_runtime_graph",
  candidate_id: candidateId,
  exact_version: exactVersion,
  win,
  budget: {
    max_states: maxStates,
    max_transitions: maxTransitions,
    terminalize_wins: true,
  },
  status: graph.status,
  reachable_state_count: graph.keys.length,
  legal_transition_count: edges.length,
  winning_state_count: graph.winStateIndexes.size,
  shortest_solution: {
    found: solution.found,
    cost: solution.cost,
    depth: solution.depth,
    explored_states_before_first_win: solution.exploredStates,
    inputs: solution.inputs,
    events: solution.events,
  },
  winning_states: winStates,
};

const completeGraph = {
  artifact_kind: "complete_runtime_graph_raw",
  candidate_id: candidateId,
  exact_version: exactVersion,
  status: graph.status,
  budget: {
    max_states: maxStates,
    max_transitions: maxTransitions,
    terminalize_wins: true,
  },
  initial_state_index: 0,
  state_keys: graph.keys,
  depths: graph.depthByIndex,
  winning_state_indexes: Array.from(graph.winStateIndexes).sort((a, b) => a - b),
  legal_edges: edges,
};

await writeJson(path.join(outDir, "canonical_replay.json"), replay);
await writeJson(path.join(outDir, "layout_analysis.json"), layoutAnalysis);
await writeJson(path.join(outDir, "complete_graph.json"), completeGraph);
await writeJson(path.join(outDir, "solution_family.json"), solutionFamily);
await writeJson(path.join(outDir, "identity_counterfactuals.json"), counterfactuals);
await writeFile(
  path.join(outDir, "canonical_replay.md"),
  renderReplayMarkdown(replay),
  "utf8",
);
await writeFile(
  path.join(outDir, "layout_analysis.md"),
  renderLayoutAnalysisMarkdown(layoutAnalysis, solutionFamily),
  "utf8",
);
await writeFile(
  path.join(outDir, "identity_counterfactuals.md"),
  renderCounterfactualMarkdown(counterfactuals),
  "utf8",
);

console.log(
  JSON.stringify(
    {
      exact_version: exactVersion,
      shortest_cost: shortestCost,
      raw_shortest_input_count: shortest.raw_shortest_input_count,
      shortest_milestone_signatures: shortest.milestone_signatures.length,
      graph_states: graph.keys.length,
      graph_edges: edges.length,
      winning_states: graph.winStateIndexes.size,
      product_states: product.product_state_count,
      winning_product_states: product.winning_product_state_count,
      winning_order_signatures: product.winningOrderSignatures,
      winning_missing_milestones: product.winningMissingMilestones,
      logical_uniqueness_result: solutionFamily.logical_uniqueness_result,
      counterfactuals: counterfactuals.cases.map((item) => ({
        id: item.id,
        solvable: item.solvable,
        status: item.search_status,
        cost: item.shortest_cost,
      })),
      out_dir: outDir,
    },
    null,
    2,
  ),
);

function computeReverseDistance(
  stateCount: number,
  graphEdges: Edge[],
  wins: Set<number>,
): Array<number | undefined> {
  const incoming: Edge[][] = Array.from({ length: stateCount }, () => []);
  for (const edge of graphEdges) incoming[edge.to]!.push(edge);
  const distance: Array<number | undefined> = Array.from({ length: stateCount });
  const queue = Array.from(wins);
  for (const index of queue) distance[index] = 0;
  for (let cursor = 0; cursor < queue.length; cursor += 1) {
    const to = queue[cursor]!;
    const nextDistance = distance[to]! + 1;
    for (const edge of incoming[to]!) {
      if (distance[edge.from] !== undefined) continue;
      distance[edge.from] = nextDistance;
      queue.push(edge.from);
    }
  }
  return distance;
}

function summarizeShortestSolutions(
  stateCount: number,
  graphEdges: Edge[],
  wins: Set<number>,
  depth: number[],
  reverse: Array<number | undefined>,
  cost: number,
) {
  const outgoing: Edge[][] = Array.from({ length: stateCount }, () => []);
  for (const edge of graphEdges) {
    if (
      depth[edge.from] + 1 === depth[edge.to] &&
      depth[edge.from] + 1 + (reverse[edge.to] ?? Number.POSITIVE_INFINITY) === cost
    ) {
      outgoing[edge.from]!.push(edge);
    }
  }
  const counts: bigint[] = Array.from({ length: stateCount }, () => 0n);
  const ordered = Array.from({ length: stateCount }, (_, index) => index)
    .sort((a, b) => depth[b]! - depth[a]!);
  for (const index of ordered) {
    if (wins.has(index)) {
      counts[index] = 1n;
      continue;
    }
    counts[index] = outgoing[index]!.reduce((sum, edge) => sum + counts[edge.to]!, 0n);
  }

  const signatureMemo = new Map<number, Set<string>>();
  const signaturesFrom = (index: number): Set<string> => {
    const cached = signatureMemo.get(index);
    if (cached) return cached;
    if (wins.has(index)) {
      const terminal = new Set([""]);
      signatureMemo.set(index, terminal);
      return terminal;
    }
    const result = new Set<string>();
    for (const edge of outgoing[index]!) {
      const local = projectMilestoneEvents(edge.events).join(">");
      for (const suffix of signaturesFrom(edge.to)) {
        const combined = [local, suffix].filter(Boolean).join(">");
        result.add(combined);
        if (result.size > 2_000) {
          throw new Error("最短解里程碑签名超过 2000，拒绝模糊归并");
        }
      }
    }
    signatureMemo.set(index, result);
    return result;
  };

  const examples: InputId[][] = [];
  const collect = (index: number, prefix: InputId[]) => {
    if (examples.length >= 40) return;
    if (wins.has(index)) {
      examples.push(prefix);
      return;
    }
    for (const edge of outgoing[index]!) {
      collect(edge.to, [...prefix, edge.action]);
      if (examples.length >= 40) return;
    }
  };
  collect(0, []);

  return {
    shortest_cost: cost,
    raw_shortest_input_count: counts[0]!.toString(),
    enumerated_examples_complete: counts[0]! <= BigInt(examples.length),
    input_examples: examples,
    milestone_signatures: Array.from(signaturesFrom(0)).sort(),
  };
}

function enumerateFirstWinProduct(
  stateCount: number,
  graphEdges: Edge[],
  wins: Set<number>,
) {
  const outgoing: Edge[][] = Array.from({ length: stateCount }, () => []);
  for (const edge of graphEdges) outgoing[edge.from]!.push(edge);
  const initial: ProductNode = { base: 0, mask: 0, order: [] };
  const keyOf = (node: ProductNode) => `${node.base}|${node.mask}|${node.order.join(",")}`;
  const queue = [initial];
  const seen = new Set([keyOf(initial)]);
  const winningNodes: ProductNode[] = [];
  let legalEdges = 0;

  for (let cursor = 0; cursor < queue.length; cursor += 1) {
    const current = queue[cursor]!;
    if (wins.has(current.base)) {
      winningNodes.push(current);
      continue;
    }
    for (const edge of outgoing[current.base]!) {
      legalEdges += 1;
      const next = applyMilestones(current, edge.events);
      next.base = edge.to;
      const key = keyOf(next);
      if (seen.has(key)) continue;
      seen.add(key);
      queue.push(next);
    }
  }

  const winningOrderSignatures = Array.from(
    new Set(winningNodes.map((node) => node.order.join(">"))),
  ).sort();
  const winningMissingMilestones = Array.from(
    new Set(
      winningNodes.map((node) =>
        milestones
          .filter((_, index) => (node.mask & (1 << index)) === 0)
          .map((item) => item.id)
          .join(">"),
      ),
    ),
  )
    .map((signature) => (signature ? signature.split(">") : []))
    .sort((a, b) => a.join(">").localeCompare(b.join(">")));

  return {
    status: "complete",
    base_state_count: stateCount,
    product_state_count: seen.size,
    legal_product_edges: legalEdges,
    winning_product_state_count: winningNodes.length,
    winningOrderSignatures,
    winningMissingMilestones,
    every_winning_product_has_all_milestones:
      winningNodes.every((node) => node.mask === allMilestonesMask),
  };
}

function applyMilestones(current: ProductNode, events: string[]): ProductNode {
  let mask = current.mask;
  const order = [...current.order];
  for (const event of events) {
    if (event === "push_axis:candle#3") {
      const firstIndex = milestoneIndex.get("source_axis_push_1")!;
      const secondIndex = milestoneIndex.get("source_axis_push_2")!;
      const index = (mask & (1 << firstIndex)) === 0 ? firstIndex : secondIndex;
      if ((mask & (1 << index)) === 0) {
        mask |= 1 << index;
        order.push(milestones[index]!.id);
      }
      continue;
    }
    for (const milestone of milestones) {
      if (milestone.occurrence) continue;
      if (event !== milestone.event) continue;
      const index = milestoneIndex.get(milestone.id)!;
      if ((mask & (1 << index)) !== 0) continue;
      mask |= 1 << index;
      order.push(milestone.id);
    }
  }
  return { base: current.base, mask, order };
}

function projectMilestoneEvents(events: string[]): string[] {
  const projected: string[] = [];
  for (const event of events) {
    if (event === "push_axis:candle#3") {
      projected.push("source_axis_push");
      continue;
    }
    for (const milestone of milestones) {
      if (milestone.occurrence) continue;
      if (event !== milestone.event) continue;
      projected.push(milestone.id);
    }
  }
  return projected;
}

function buildReplay(initial: CandleSokobanState, inputs: InputId[]) {
  let state = cloneState(initial);
  const steps = inputs.map((input, index) => {
    const before = cloneState(state);
    const result = step(mechanic, state, input, options);
    if (!result.legal) {
      throw new Error(`canonical replay 第 ${index + 1} 步非法：${input}`);
    }
    state = result.state;
    return {
      step: index + 1,
      input,
      legal: result.legal,
      before: {
        state_key: stateKey(before),
        rendered_state: renderState(before),
        state: serializeState(before),
      },
      events: result.events,
      after: {
        state_key: stateKey(state),
        rendered_state: renderState(state),
        state: serializeState(state),
      },
      win_after_step: runtime.isWin(state, win),
    };
  });
  return {
    artifact_kind: "canonical_replay",
    candidate_id: candidateId,
    exact_version: exactVersion,
    level_id: levelId,
    win,
    global_burn_cycle: 5,
    inputs,
    completed: true,
    legal_through_step: inputs.length,
    initial: {
      state_key: stateKey(initial),
      rendered_state: renderState(initial),
      state: serializeState(initial),
    },
    steps,
    final: {
      state_key: stateKey(state),
      rendered_state: renderState(state),
      state: serializeState(state),
      win: runtime.isWin(state, win),
    },
  };
}

async function buildCounterfactuals(
  baseLayout: string,
  canonicalReplay: ReturnType<typeof buildReplay>,
) {
  const layoutCases = [
    {
      id: "source_unlit_no_reignite",
      claim: "把 candle#3 初始火源改为未燃，核心无法沿原结构复燃，原胜解应失败。",
      layout: baseLayout.replace("L", "l"),
    },
    {
      id: "always_lit_core_without_douse_wall",
      claim: "移除核心 d1 遮芯墙，使核心始终点燃；应实质改变最短解与目标处理顺序。",
      layout: mutateLayoutCell(baseLayout, 4, 3, "."),
    },
    {
      id: "receiver_removed",
      claim: "删除 candle#2；核心失去止挡与滚后接力对象，末目标也失去执行者。",
      layout: baseLayout
        .split("\n")
        .map((row) => row.replace("u", ".").replace(/2/g, "."))
        .join("\n"),
    },
    {
      id: "source_replaced_by_static_fire",
      claim: "用静态既燃火盆替代 candle#3 的供火职责；虽可供核心复燃，却不能回填被暗越的历史火盆。",
      layout: replaceSourceCandleWithStaticFire(baseLayout),
    },
  ];
  const cases = [];
  for (const item of layoutCases) {
    const variantLevel: LevelDoc = {
      ...level,
      id: `${levelId}_${item.id}`,
      layout: item.layout,
    };
    const variantInitial = parseLevel(variantLevel);
    const result = solveWithRuntime(runtime, variantInitial, options);
    cases.push({
      id: item.id,
      claim: item.claim,
      mutation: "layout",
      solvable: result.found,
      shortest_cost: result.found ? result.cost : null,
      search_status: result.searchStatus,
      explored_states: result.exploredStates,
      reason: result.reason ?? null,
      shortest_inputs: result.inputs,
      shortest_events: result.events,
    });
  }

  let postCore = cloneState(initialState);
  for (const input of canonicalReplay.inputs.slice(0, 6)) {
    const result = step(mechanic, postCore, input, options);
    if (!result.legal) throw new Error("post-core counterfactual 前缀非法");
    postCore = result.state;
  }
  postCore.candles = postCore.candles.filter((candle) => candle.id !== "candle#1");
  const retireResult = solveWithRuntime(runtime, postCore, options);
  cases.push({
    id: "core_retires_immediately_after_reignite_roll",
    claim: "让核心在复燃滚动后立即退出题面；其后不能通过缩短点亮 candle#2，接力链断裂。",
    mutation: "state_after_canonical_step_6",
    mutated_state_key: stateKey(postCore),
    mutated_rendered_state: renderState(postCore),
    solvable: retireResult.found,
    shortest_cost: retireResult.found ? retireResult.cost : null,
    search_status: retireResult.searchStatus,
    explored_states: retireResult.exploredStates,
    reason: retireResult.reason ?? null,
    shortest_inputs: retireResult.inputs,
    shortest_events: retireResult.events,
  });

  return {
    artifact_kind: "identity_counterfactuals",
    candidate_id: candidateId,
    exact_version: exactVersion,
    base_shortest_cost: solution.cost,
    cases,
    interpretation:
      "反事实只承担机械区别证明：无复燃、核心提前退休、删除接收蜡烛或把供火蜡烛静态化均破坏原链；移除墙灭若仍可解，也必须以不同目标时序和最短代价求解。",
    evidence_limit: "反事实不能替代玩家审美与难度判断。",
  };
}

function mutateLayoutCell(source: string, x: number, y: number, glyph: string): string {
  const rows = source.split("\n");
  const row = rows[y]!;
  rows[y] = `${row.slice(0, x)}${glyph}${row.slice(x + 1)}`;
  return rows.join("\n");
}

function replaceSourceCandleWithStaticFire(source: string): string {
  const rows = source.split("\n");
  const y = rows.findIndex((row) => row.includes("L"));
  if (y < 0) throw new Error("找不到 candle#3 的 L cap");
  const row = rows[y]!;
  const capX = row.indexOf("L");
  const chars = row.split("");
  chars[capX] = "O";
  for (let x = capX + 1; x < chars.length && chars[x] === "3"; x += 1) {
    chars[x] = ".";
  }
  rows[y] = chars.join("");
  return rows.join("\n");
}

function serializeState(state: CandleSokobanState) {
  return {
    width: state.width,
    height: state.height,
    player: state.player,
    dead: state.dead,
    global_burn_cycle: state.globalBurnCycle,
    global_burn_countdown: state.globalBurnCountdown,
    walls: Array.from(state.walls).sort(),
    candles: state.candles.map((candle) => ({
      id: candle.id,
      digit: candle.digit ?? null,
      axis: candle.axis,
      wick_dir: candle.wickDir,
      lit: candle.lit,
      body_cells: candle.bodyCells,
    })),
    braziers: state.braziers.map((brazier) => ({
      position: brazier.position,
      lit: brazier.lit,
    })),
  };
}

async function writeJson(target: string, value: unknown) {
  await writeFile(target, `${JSON.stringify(value, null, 2)}\n`, "utf8");
}

function renderReplayMarkdown(replayData: ReturnType<typeof buildReplay>): string {
  const lines = [
    `# ${candidateId} ${exactVersion} canonical replay`,
    "",
    `- Win: all_braziers_lit`,
    `- Steps: ${replayData.steps.length}`,
    `- Completed: ${replayData.completed ? "yes" : "no"}`,
    `- Final win: ${replayData.final.win ? "yes" : "no"}`,
    `- Inputs: ${replayData.inputs.join(" ")}`,
    "",
  ];
  for (const item of replayData.steps) {
    lines.push(
      `## Step ${item.step}: ${item.input}`,
      "",
      `Events: ${item.events.join(", ")}`,
      "",
      "Before:",
      "",
      "```text",
      item.before.rendered_state,
      "```",
      "",
      "After:",
      "",
      "```text",
      item.after.rendered_state,
      "```",
      "",
    );
  }
  return `${lines.join("\n")}\n`;
}

function renderLayoutAnalysisMarkdown(
  analysis: typeof layoutAnalysis,
  family: typeof solutionFamily,
): string {
  return `# ${candidateId} ${exactVersion} complete analysis

- Graph status: ${analysis.status}
- Reachable states: ${analysis.reachable_state_count}
- Legal transitions: ${analysis.legal_transition_count}
- Winning states: ${analysis.winning_state_count}
- Shortest cost: ${analysis.shortest_solution.cost}
- Raw shortest input count: ${family.shortest_solutions.raw_shortest_input_count}
- Shortest milestone signatures: ${family.shortest_solutions.milestone_signatures.length}
- Product states: ${family.first_win_product_graph.product_state_count}
- Winning product states: ${family.first_win_product_graph.winning_product_state_count}
- Winning milestone order signatures: ${family.first_win_product_graph.winningOrderSignatures.length}
- Logical uniqueness result: ${family.logical_uniqueness_result}
`;
}

function renderCounterfactualMarkdown(
  data: Awaited<ReturnType<typeof buildCounterfactuals>>,
): string {
  const lines = [
    `# ${candidateId} ${exactVersion} identity counterfactuals`,
    "",
    `Base shortest cost: ${data.base_shortest_cost}`,
    "",
  ];
  for (const item of data.cases) {
    lines.push(
      `## ${item.id}`,
      "",
      item.claim,
      "",
      `- Solvable: ${item.solvable ? "yes" : "no"}`,
      `- Search status: ${item.search_status}`,
      `- Shortest cost: ${item.shortest_cost ?? "n/a"}`,
      `- Explored states: ${item.explored_states}`,
      "",
    );
  }
  lines.push("## Evidence limit", "", data.evidence_limit, "");
  return `${lines.join("\n")}\n`;
}
