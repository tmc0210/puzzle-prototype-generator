import { copyFile, mkdir, readFile, writeFile } from "node:fs/promises";
import { loadPrototypePackage } from "../../../../../../src/core/io.js";
import { enumerateRuntimeGraph } from "../../../../../../src/core/runtimeGraph.js";
import { getRuntimeAdapter } from "../../../../../../src/prototypes/runtimeAdapter.js";
import {
  buildInputSequenceReplayReport,
  formatInputSequenceReplayMarkdown,
  replayInputSequence,
} from "../../../../../../src/workflows/inputSequenceReplay.js";

const prototypePath = "prototypes/candle_sokoban";
const workbench =
  "prototypes/candle_sokoban/reports/studio_all_mechanics_final_capstone_d4plus_20260725_02/designer/workbench";
const exactRoot =
  "prototypes/candle_sokoban/reports/studio_all_mechanics_final_capstone_d4plus_20260725_02/candidate/versions/v005";
const exactMode = process.argv.includes("--exact");
const artifactRoot = exactMode ? exactRoot : `${workbench}/v005_candidate_artifacts`;
const layoutPath = exactMode ? `${exactRoot}/layout.txt` : `${workbench}/working_layout.txt`;
const noWallPath = `${workbench}/counterfactual_no_writer_wall.txt`;
const noSourcePath = `${workbench}/counterfactual_no_reignite_source.txt`;
const inputs = [
  "up", "down", "down", "down", "up", "up", "up", "right", "right", "up", "up", "left",
  "down", "down", "down", "down", "right", "down", "down", "down", "left", "left",
];

await mkdir(artifactRoot, { recursive: true });
if (exactMode) {
  await mkdir(`${exactRoot}/counterfactuals`, { recursive: true });
  await copyFile(`${workbench}/reasoning_sketch.yml`, `${exactRoot}/reasoning_sketch.yml`);
  await copyFile(`${workbench}/downstream_coupling_audit.json`, `${exactRoot}/downstream_coupling_audit.json`);
  await copyFile(
    `${workbench}/whole_region_suffix_deletion_audit.yml`,
    `${exactRoot}/whole_region_suffix_deletion_audit.yml`,
  );
  await copyFile(
    `${workbench}/counterfactual_suffix_deleted_redirected.txt`,
    `${exactRoot}/counterfactuals/suffix_deleted_redirected.txt`,
  );
  await copyFile(noWallPath, `${exactRoot}/counterfactuals/no_writer_wall.txt`);
  await copyFile(noSourcePath, `${exactRoot}/counterfactuals/no_reignite_source.txt`);
}
const noWallEvidencePath = exactMode
  ? `${exactRoot}/counterfactuals/no_writer_wall.txt`
  : noWallPath;
const noSourceEvidencePath = exactMode
  ? `${exactRoot}/counterfactuals/no_reignite_source.txt`
  : noSourcePath;
const pkg = await loadPrototypePackage(prototypePath);
const adapter = getRuntimeAdapter(pkg.mechanic);
const runtime = adapter.createRuntime(pkg.mechanic);
const winCondition = pkg.mechanic.win;

const parse = async (path: string, id: string) => {
  const layout = await readFile(path, "utf8");
  return {
    layout,
    initial: adapter.parseLevel({ id, title: id, layout, win: winCondition }),
  };
};
const enumerate = (initial: ReturnType<typeof adapter.parseLevel>) => {
  const graph = enumerateRuntimeGraph(
    runtime,
    initial,
    winCondition,
    { winCondition, maxStates: 300_000, maxDepth: 200 },
    { maxStates: 300_000 },
  );
  if (graph.status !== "complete") throw new Error(`graph incomplete: ${graph.reason ?? "unknown"}`);
  return graph;
};

const full = await parse(
  layoutPath,
  exactMode
    ? "CANDLE_ALL_MECHANICS_FINAL_CAPSTONE_002_v005"
    : "CANDLE_ALL_MECHANICS_FINAL_CAPSTONE_002_v005_workbench",
);
const execution = replayInputSequence(
  adapter,
  runtime,
  full.initial,
  inputs,
  { winCondition },
  winCondition,
);
if (execution.stoppedAtIllegalAction || !execution.final.isWin) {
  throw new Error("canonical replay is not a complete normal win");
}
const replay = buildInputSequenceReplayReport(
  {
    id: "CANDLE_ALL_MECHANICS_FINAL_CAPSTONE_002_v005_canonical",
    prototype: pkg.mechanic.id,
    layoutSource: layoutPath,
    layout: full.layout,
    winCondition,
  },
  execution,
);
await writeFile(`${artifactRoot}/canonical_replay.json`, `${JSON.stringify(replay, null, 2)}\n`, "utf8");
await writeFile(`${artifactRoot}/canonical_replay.md`, formatInputSequenceReplayMarkdown(replay), "utf8");

const graph = enumerate(full.initial);
const outgoing = new Map<number, typeof graph.edges>();
const incoming = new Map<number, typeof graph.edges>();
for (const edge of graph.edges) {
  (outgoing.get(edge.from) ?? outgoing.set(edge.from, []).get(edge.from)!).push(edge);
  (incoming.get(edge.to) ?? incoming.set(edge.to, []).get(edge.to)!).push(edge);
}

const representativeFor = (winIndex: number) => {
  const path: typeof graph.edges = [];
  let cursor = winIndex;
  while (cursor !== 0) {
    const depth = graph.depthByIndex[cursor]!;
    const edge = (incoming.get(cursor) ?? []).find(
      (candidate) => graph.depthByIndex[candidate.from] === depth - 1,
    );
    if (!edge) throw new Error(`no BFS parent for ${cursor}`);
    path.push(edge);
    cursor = edge.from;
  }
  path.reverse();
  return {
    win_state_index: winIndex,
    depth: graph.depthByIndex[winIndex],
    inputs: path.map((edge) => edge.action),
    important_events: path.flatMap((edge) => edge.events).filter((event) =>
      event.startsWith("push_axis") ||
      event.startsWith("roll_candle") ||
      event.startsWith("extinguish_by_") ||
      event.startsWith("ignite_from_") ||
      event.startsWith("shrink:") ||
      event.startsWith("shrink_ignite") ||
      event.startsWith("simultaneous_burn") ||
      event.startsWith("burn_out") ||
      event.startsWith("light_brazier") ||
      event.startsWith("win_")
    ),
    state_key: graph.keys[winIndex],
  };
};
const representatives = [...graph.winStateIndexes]
  .sort((a, b) => graph.depthByIndex[a]! - graph.depthByIndex[b]!)
  .map(representativeFor);
await writeFile(
  `${artifactRoot}/winning_state_representatives.jsonl`,
  `${representatives.map((value) => JSON.stringify(value)).join("\n")}\n`,
  "utf8",
);

const canWinWithout = (matcher: (events: string[]) => boolean): boolean => {
  const seen = new Set<number>([0]);
  const queue = [0];
  for (let head = 0; head < queue.length; head += 1) {
    const current = queue[head]!;
    if (graph.winStateIndexes.has(current)) return true;
    for (const edge of outgoing.get(current) ?? []) {
      if (matcher(edge.events) || seen.has(edge.to)) continue;
      seen.add(edge.to);
      queue.push(edge.to);
    }
  }
  return false;
};

const objectParticipation = {
  schema_version: 1,
  candidate_id: "CANDLE_ALL_MECHANICS_FINAL_CAPSTONE_002",
  exact_version_target: "v005",
  graph: {
    status: graph.status,
    reachable_states: graph.states.length,
    legal_transitions: graph.edges.length,
    raw_winning_states: graph.winStateIndexes.size,
  },
  required_on_every_winning_path: {
    candle_1_writer_same_roll_douse_reignite: !canWinWithout((events) =>
      events.includes("extinguish_by_wall:candle#1") &&
      events.includes("ignite_from_brazier:candle#1:6,5") &&
      events.includes("roll_reignite_after_extinguish:candle#1:d2->d3")),
    candle_1_writer_selected_d4_stop: !canWinWithout((events) => events.includes("roll_candle:candle#1:d4")),
    candle_1_transfers_to_candle_2: !canWinWithout((events) => events.includes("shrink_ignite:candle#2")),
    candle_2_final_roll_and_target: !canWinWithout((events) =>
      events.includes("roll_candle:candle#2:d6") && events.includes("light_brazier:2,7")),
  },
  object_roles: [
    {
      object: "candle#1",
      role: "writer",
      participation: "先烧成两格，d4 下滚时墙灭/火盆复燃；缩短释放端帽格并以退焰点燃 candle#2，下一界燃尽。",
    },
    {
      object: "candle#2",
      role: "player_authored_stop_and_delayed_reader",
      participation: "开局被轴推两格决定 writer d4 止点与受火坐标；接火后缩成 y8 单格，左滚时 wick 在 y7 点亮终盆。",
    },
    {
      object: "lit_brazier_6_5",
      role: "writer_reignite_source",
      participation: "writer 被墙熄灭后唯一复燃来源；删除后完整图无胜态。",
    },
    {
      object: "unlit_brazier_2_7",
      role: "late_selector_and_normal_goal",
      participation: "其行要求 candle#2 两推输出；只由最终 d6 横滚在终点前点亮。",
    },
    {
      object: "wall_6_4",
      role: "writer_dousing_contact",
      participation: "使关键滚动先灭后燃；删除后相同 22 步胜解仍成立但所有灭火/复燃写入事件消失，作品身份改变。",
    },
  ],
};
await writeFile(
  `${artifactRoot}/object_participation_audit.json`,
  `${JSON.stringify(objectParticipation, null, 2)}\n`,
  "utf8",
);

const noWall = await parse(noWallEvidencePath, "v005_counterfactual_no_writer_wall");
const noWallExecution = replayInputSequence(
  adapter,
  runtime,
  noWall.initial,
  inputs,
  { winCondition },
  winCondition,
);
const noWallGraph = enumerate(noWall.initial);
const noSource = await parse(noSourceEvidencePath, "v005_counterfactual_no_reignite_source");
const noSourceGraph = enumerate(noSource.initial);
const noWallEvents = noWallExecution.steps.flatMap((step) => step.events);
const identityCounterfactuals = {
  schema_version: 1,
  candidate_id: "CANDLE_ALL_MECHANICS_FINAL_CAPSTONE_002",
  exact_version_target: "v005",
  counterfactuals: [
    {
      id: "remove_writer_dousing_wall_6_4",
      layout_ref: noWallEvidencePath,
      canonical_inputs_legal: !noWallExecution.stoppedAtIllegalAction,
      canonical_normal_win: noWallExecution.final.isWin,
      canonical_events_absent: {
        extinguish_by_wall_candle_1: !noWallEvents.includes("extinguish_by_wall:candle#1"),
        ignite_from_brazier_candle_1: !noWallEvents.includes("ignite_from_brazier:candle#1:6,5"),
        roll_reignite_after_extinguish: !noWallEvents.includes("roll_reignite_after_extinguish:candle#1:d2->d3"),
      },
      graph: {
        status: noWallGraph.status,
        states: noWallGraph.states.length,
        edges: noWallGraph.edges.length,
        raw_wins: noWallGraph.winStateIndexes.size,
      },
      identity_read: "同一正常胜解退化为预燃直达；可解性保留但滚动写入身份消失。",
    },
    {
      id: "remove_reignite_source_6_5",
      layout_ref: noSourceEvidencePath,
      graph: {
        status: noSourceGraph.status,
        states: noSourceGraph.states.length,
        edges: noSourceGraph.edges.length,
        raw_wins: noSourceGraph.winStateIndexes.size,
      },
      identity_read: "writer 经墙熄灭后没有复燃来源，完整图无胜态；source 是必需跨对象职责。",
    },
    {
      id: "one_push_local_success",
      evidence_ref: exactMode
        ? `${exactRoot}/downstream_coupling_audit.json`
        : `${workbench}/downstream_coupling_audit.json`,
      identity_read: "d3 同样完成墙灭/复燃/退焰点 relay，但完整图从其输出状态不能到达胜利。",
    },
    {
      id: "delete_final_region_and_redirect_midpoint_normal_win",
      evidence_ref: exactMode
        ? `${exactRoot}/whole_region_suffix_deletion_audit.yml`
        : `${workbench}/whole_region_suffix_deletion_audit.yml`,
      identity_read: "一推与两推重新等价，证明左下读出把约束传回早期停靠。",
    },
  ],
};
await writeFile(
  `${artifactRoot}/identity_counterfactual_audit.json`,
  `${JSON.stringify(identityCounterfactuals, null, 2)}\n`,
  "utf8",
);

const graphMarkdown = `# v005 工作台完整图与解族自查\n\n` +
  `- graph status: ${graph.status}\n` +
  `- reachable states: ${graph.states.length}\n` +
  `- legal transitions: ${graph.edges.length}\n` +
  `- raw winning states: ${graph.winStateIndexes.size}\n` +
  `- winning representative depths: ${representatives.map((value) => value.depth).join("、")}\n` +
  `- shortest winning depth: ${Math.min(...representatives.map((value) => value.depth))}\n` +
  `- search budget: maxStates=300000, maxDepth=200；未命中预算边界。\n\n` +
  `两个胜态代表均包含：两次 candle#2 轴推、candle#1 d4 同滚墙灭/火盆复燃、shrink_ignite:candle#2、` +
  `candle#2 缩成 y8 单格和 d6 横滚点亮 (2,7)。二者只在开场可逆走位调相的两步分配上不同，` +
  `对象职责、目标分配和依赖因果相同，判为 equivalent_variants_only。\n\n` +
  `完整 raw nodes/edges 将由 strict exposure audit 保存；逐胜态 BFS 代表见 winning_state_representatives.jsonl。\n`;
await writeFile(`${artifactRoot}/graph_analysis.md`, graphMarkdown, "utf8");

console.log(JSON.stringify({
  canonical_steps: replay.steps.length,
  normal_win: replay.final.isWin,
  graph_status: graph.status,
  reachable_states: graph.states.length,
  legal_transitions: graph.edges.length,
  winning_states: graph.winStateIndexes.size,
  no_wall_graph: { states: noWallGraph.states.length, wins: noWallGraph.winStateIndexes.size },
  no_source_graph: { states: noSourceGraph.states.length, wins: noSourceGraph.winStateIndexes.size },
}, null, 2));
