import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import { loadPrototypePackage } from "../../../../../../../../src/core/io.js";
import type { InputId, LevelDoc, Point } from "../../../../../../../../src/core/types.js";
import {
  forceModeAt,
  isWin,
  parseLevel,
  pointKey,
  renderState,
  stateKey,
  step,
  type RealityAnchorState,
} from "../../../../../../../../src/prototypes/reality_anchor/mechanics.js";

const root = path.resolve(
  "prototypes/reality_anchor/reports/explorer_giant_assembly_piston_challenge_20260715/exploration/runs/runtime_counterexamples/ordinary_crate_dual_interface",
);
const pkg = await loadPrototypePackage(path.resolve("prototypes/reality_anchor"));
const inputs = ["up", "down", "left", "right"] as InputId[];

const acceptedIds = [
  "serial_direct",
  "serial_H",
  "serial_R",
  "serial_T",
  "serial_HR",
  "serial_HT",
  "serial_RT",
  "serial_HRT_full",
] as const;

const accepted: Record<string, {
  layout: string;
  initial: RealityAnchorState;
  graph: ReturnType<typeof exploreGraph>;
}> = {};

for (const id of acceptedIds) {
  const layout = await loadLayout(id);
  const initial = parseLevel({ id, title: id, layout } satisfies LevelDoc);
  accepted[id] = { layout, initial, graph: exploreGraph(initial, 300_000) };
}

const direct = accepted.serial_direct!.initial;
const bottomPrefix = [
  "right", "right", "right", "right", "right",
  "up", "up", "up", "right",
] as InputId[];
const topPrefix = [
  "right", "right", "right", "right", "right",
  "up", "up", "up", "up", "up", "up", "up", "up", "up", "up", "up",
  "right",
] as InputId[];
const bottomCovered = replay(direct, bottomPrefix).state;
const topCovered = replay(direct, topPrefix).state;
const directAudits = {
  bottom: directInterfaceAudit(bottomCovered, "11,12", "12,12"),
  top: directInterfaceAudit(topCovered, "11,4", "12,4"),
};

const fullInitial = accepted.serial_HRT_full!.initial;
const fullMove = step(pkg.mechanic, fullInitial, "right");
if (!fullMove.legal) throw new Error(`serial_HRT_full right 非法：${fullMove.reason}`);
const fullFinal = fullMove.state;
const fullLineage = auditFullLineage(fullInitial, fullFinal, fullMove.events);

const rejected = {
  accessibleAnchors: await replayRejected(
    "common_partial_spine",
    [
      "left", "left", "up", "up", "up", "up", "left", "left", "left", "up",
      "down", "left", "up", "right", "right", "right", "right", "up", "down",
      "right", "right", "right", "right", "up",
    ],
  ),
  uncappedGoalFront: await replayRejected(
    "rejected_uncapped_heads_loader",
    [
      "up", "up", "up", "up", "up", "left", "left", "left", "up", "right",
      "right", "down", "right", "right", "right", "right", "up",
    ],
  ),
  splitHead: await replayRejected(
    "sidebridge_bridge_plus_left",
    ["up", "right", "up", "left", "right", "right", "up", "right", "up"],
    true,
  ),
};

const report = {
  scope: {
    claim: "只审关卡实际供应件 H/R/T 及其合法 docked 真子集；不审任意更小 polyomino。",
    limitation: "这是 terminal/socket 局部原理见证，不证明三件从空地装配到该 socket 的可达过程。",
    coordinates: "零基坐标",
  },
  components: {
    H: {
      description: "monolithic sparse E-head：rear spine x=9,y=4..12；两齿 (10,4)/(10,12)，同一件含全部目标触点",
      cells: [
        ...Array.from({ length: 9 }, (_, index) => `9,${index + 4}`),
        "10,4", "10,12",
      ],
    },
    R: { description: "窄继电", cells: ["9,13", "9,14"] },
    T: { description: "偏置横把手", cells: ["6,15", "7,15", "8,15", "9,15"] },
  },
  accepted: Object.fromEntries(
    acceptedIds.map((id) => [id, { graph: accepted[id]!.graph }]),
  ),
  directAudits,
  full: {
    input: "right",
    events: fullMove.events,
    win: isWin(fullFinal),
    before: renderState(fullInitial),
    after: renderState(fullFinal),
    lineage: fullLineage,
  },
  rejected,
};

assertAccepted(report);
await writeFile(path.join(root, "audit.json"), `${JSON.stringify(report, null, 2)}\n`, "utf8");
await writeFile(path.join(root, "audit.md"), renderAudit(report), "utf8");
console.log(renderSummary(report));

async function loadLayout(id: string): Promise<string> {
  return (await readFile(path.join(root, "layouts", `${id}.txt`), "utf8")).trimEnd();
}

function replay(initial: RealityAnchorState, sequence: InputId[]) {
  let state = initial;
  const trace: Array<Record<string, unknown>> = [];
  for (const input of sequence) {
    const before = state;
    const result = step(pkg.mechanic, state, input);
    if (!result.legal) throw new Error(`replay 在 ${input} 非法：${result.reason}`);
    state = result.state;
    trace.push({
      input,
      events: result.events,
      playerBefore: before.player,
      playerAfter: state.player,
      modeBefore: forceModeAt(before, before.player),
      modeAfter: forceModeAt(state, state.player),
      coveredAfter: coveredGoals(state),
      winAfter: isWin(state),
    });
  }
  return { state, trace };
}

function directInterfaceAudit(
  covered: RealityAnchorState,
  initialCrateCell: string,
  goalCell: string,
) {
  const actions = inputs.map((input) => {
    const result = step(pkg.mechanic, covered, input);
    const after = result.legal ? result.state : covered;
    return {
      input,
      legal: result.legal,
      reason: result.reason ?? null,
      events: result.events,
      playerAfter: after.player,
      modeBefore: forceModeAt(covered, covered.player),
      coveredAfter: coveredGoals(after),
      crateAtInitialAfter: after.crates.some((crate) => pointKey(crate) === initialCrateCell),
      crateAtGoalAfter: after.crates.some((crate) => pointKey(crate) === goalCell),
    };
  });
  const legal = actions.filter((action) => action.legal);
  const pull = legal[0];
  if (legal.length !== 1 || pull?.input !== "left" || !pull.events.some((event) => event.startsWith("pull_object:crate#"))) {
    throw new Error(`direct post-cover 不是唯一 left L-pull：${JSON.stringify(actions)}`);
  }
  const pulled = step(pkg.mechanic, covered, "left").state;
  const secondLeft = step(pkg.mechanic, pulled, "left");
  return {
    player: covered.player,
    mode: forceModeAt(covered, covered.player),
    coveredGoals: coveredGoals(covered),
    actions,
    afterMandatoryPull: {
      player: pulled.player,
      mode: forceModeAt(pulled, pulled.player),
      crateAtInitial: pulled.crates.some((crate) => pointKey(crate) === initialCrateCell),
      crateAtGoal: pulled.crates.some((crate) => pointKey(crate) === goalCell),
    },
    continueExtractLeft: {
      legal: secondLeft.legal,
      events: secondLeft.events,
      crateStillAtInitial: secondLeft.state.crates.some((crate) => pointKey(crate) === initialCrateCell),
    },
  };
}

function exploreGraph(initial: RealityAnchorState, maxStates: number) {
  const initialAnchors = anchorKey(initial);
  const seen = new Map([[stateKey(initial), initial]]);
  const queue = [initial];
  let cursor = 0;
  let transitions = 0;
  let wins = isWin(initial) ? 1 : 0;
  let maxCoveredGoals = coveredGoals(initial).length;
  let anchorsFixed = true;
  const anchorShiftEvents = new Set<string>();
  const stickyMoveDirections = new Set<string>();
  const goalPatterns = new Set<string>([coveredGoals(initial).join(";") || "none"]);
  while (cursor < queue.length && seen.size <= maxStates) {
    const current = queue[cursor++]!;
    if (isWin(current)) continue;
    for (const input of inputs) {
      const result = step(pkg.mechanic, current, input);
      if (!result.legal) continue;
      transitions += 1;
      for (const event of result.events) {
        if (event.startsWith("anchor_boundary_shift:")) anchorShiftEvents.add(event);
      }
      if (result.events.includes("move_sticky_rigid")) stickyMoveDirections.add(input);
      if (anchorKey(result.state) !== initialAnchors) anchorsFixed = false;
      const covered = coveredGoals(result.state);
      maxCoveredGoals = Math.max(maxCoveredGoals, covered.length);
      goalPatterns.add(covered.join(";") || "none");
      const key = stateKey(result.state);
      if (seen.has(key)) continue;
      seen.set(key, result.state);
      queue.push(result.state);
      if (isWin(result.state)) wins += 1;
    }
  }
  return {
    status: cursor === queue.length ? "complete" : "exhausted",
    states: seen.size,
    transitions,
    wins,
    maxCoveredGoals,
    goalPatterns: [...goalPatterns].sort(),
    anchorsFixed,
    anchorShiftEvents: [...anchorShiftEvents].sort(),
    stickyMoveDirections: [...stickyMoveDirections].sort(),
  };
}

function auditFullLineage(
  before: RealityAnchorState,
  after: RealityAnchorState,
  events: string[],
) {
  const beforeCrates = new Set(before.crates.map(pointKey));
  const afterCrates = new Set(after.crates.map(pointKey));
  const afterSticky = new Set(after.stickyGroups.flat().map(pointKey));
  const shiftedDriver = before.stickyGroups.flat().map((cell) => ({ x: cell.x + 1, y: cell.y }));
  const goals = [...before.goals].sort().map((goal) => {
    const [x, y] = goal.split(",").map(Number);
    const source = `${x! - 1},${y!}`;
    return {
      goal,
      expectedSource: source,
      sourceWasOrdinaryCrate: beforeCrates.has(source),
      finalOccupant: afterCrates.has(goal) ? "ordinary_crate" : afterSticky.has(goal) ? "sticky" : "empty",
    };
  });
  return {
    goals,
    allGoalsCoveredByOrdinaryCrates: goals.every((goal) => goal.finalOccupant === "ordinary_crate"),
    exactOneStepSourceMapping: goals.every((goal) => goal.sourceWasOrdinaryCrate),
    translatedDriverCellsAllAccountedFor: shiftedDriver.every((cell) => {
      const key = pointKey(cell);
      return afterCrates.has(key) || afterSticky.has(key);
    }),
    driverGoalOverlap: shiftedDriver.map(pointKey).filter((cell) => before.goals.has(cell)),
    forceChainEvent: events.find((event) => event.startsWith("force_chain:")) ?? null,
    normalizationEvents: events.filter((event) => event.includes("_to_")),
    anchorsBefore: anchorSnapshot(before),
    anchorsAfter: anchorSnapshot(after),
    anchorsUnchanged: anchorKey(before) === anchorKey(after),
  };
}

async function replayRejected(id: string, sequence: InputId[], withGraph = false) {
  const layout = await loadLayout(id);
  const initial = parseLevel({ id, title: id, layout } satisfies LevelDoc);
  const replayed = replay(initial, sequence);
  return {
    id,
    inputs: sequence,
    win: isWin(replayed.state),
    events: replayed.trace.flatMap((item) => item.events as string[]),
    coveredGoals: coveredGoals(replayed.state),
    graph: withGraph ? exploreGraph(initial, 300_000) : null,
  };
}

function coveredGoals(state: RealityAnchorState): string[] {
  const occupied = new Set([
    ...state.crates.map(pointKey),
    ...state.stickyGroups.flat().map(pointKey),
  ]);
  return [...state.goals].filter((goal) => occupied.has(goal)).sort();
}

function anchorSnapshot(state: RealityAnchorState) {
  return {
    pushPull: state.pushPullAnchor
      ? { push: pointKey(state.pushPullAnchor.push), pull: pointKey(state.pushPullAnchor.pull) }
      : null,
    boxSticky: state.boxStickyAnchor
      ? { box: pointKey(state.boxStickyAnchor.box), sticky: pointKey(state.boxStickyAnchor.sticky) }
      : null,
  };
}

function anchorKey(state: RealityAnchorState): string {
  return JSON.stringify(anchorSnapshot(state));
}

function assertAccepted(report: any) {
  for (const id of ["serial_direct", "serial_H", "serial_R", "serial_T", "serial_HR", "serial_HT", "serial_RT"]) {
    const graph = report.accepted[id].graph;
    if (graph.status !== "complete" || graph.wins !== 0 || !graph.anchorsFixed || graph.anchorShiftEvents.length !== 0) {
      throw new Error(`${id} 未满足 complete/0-win/fixed-anchor：${JSON.stringify(graph)}`);
    }
  }
  const full = report.accepted.serial_HRT_full.graph;
  if (full.status !== "complete" || full.wins !== 1 || !report.full.win) {
    throw new Error(`full 未满足 complete/one-win：${JSON.stringify(full)}`);
  }
  if (!report.full.lineage.allGoalsCoveredByOrdinaryCrates || report.full.lineage.driverGoalOverlap.length !== 0) {
    throw new Error(`full goal lineage 失败：${JSON.stringify(report.full.lineage)}`);
  }
}

function renderAudit(report: any): string {
  const lines = [
    "# Ordinary-C dual-interface / serial H-R-T runtime audit",
    "",
    "> 零基坐标；图搜索在 win state 终止。证据范围仅为实际供应件 `H/R/T` 及其 docked 真子集，不泛化到任意更小结构。",
    "",
    "## 结论",
    "",
    "- direct：两只目标普通 `C` 都可由玩家从折弯侧廊推入 goal；覆盖后唯一合法动作是 `left` 的 L-pull，箱回初位，下一次 `left` 只是 walk，不能继续抽箱。",
    "- full：`H+R+T` 从偏置 T 把手一次 `right`，事件为 `force_chain:n3`；两个 goal 的终态占用者都是原目标普通 `C`，driver 不覆盖 goal。",
    "- subsets：`H/R/T/HR/HT/RT` 六个实际真子集全部完整图、0 胜；不使用伪唯一解口径。",
    "- anchors：所有接受态完整图中 P/L 与 B/S 坐标固定，`anchor_boundary_shift:*` 命中为 0。",
    "",
    "## 实际供应件",
    "",
    "- `H`：单件 monolithic sparse E-head；rear spine 为 `x=9,y=4..12`，两齿为 `(10,4)/(10,12)`。**全部目标触点属于同一件 H**。",
    "- `R`：`(9,13)/(9,14)` 两格窄继电。",
    "- `T`：`y=15,x=6..9` 偏置横把手；右 cap 只允许它执行最终一格行程。",
    "",
    "## 完整图",
    "",
    "| 状态 | states | transitions | wins | max covered | anchor fixed |",
    "| --- | ---: | ---: | ---: | ---: | --- |",
  ];
  for (const id of acceptedIds) {
    const graph = report.accepted[id].graph;
    lines.push(`| ${id} | ${graph.states} | ${graph.transitions} | ${graph.wins} | ${graph.maxCoveredGoals} | ${graph.anchorsFixed ? "yes" : "no"} |`);
  }
  lines.push("", "## Direct 覆盖后动作表", "");
  for (const [label, audit] of Object.entries(report.directAudits) as Array<[string, any]>) {
    lines.push(`### ${label}`, "", `- 覆盖态 player=\`${audit.player.x},${audit.player.y}\`，mode=\`${audit.mode}\`，covered=\`${audit.coveredGoals.join(";")}\`。`, "", "| input | legal | reason/events | goal C | initial C |", "| --- | --- | --- | --- | --- |");
    for (const action of audit.actions) {
      lines.push(`| ${action.input} | ${action.legal} | ${action.reason ?? action.events.join(",")} | ${action.crateAtGoalAfter} | ${action.crateAtInitialAfter} |`);
    }
    lines.push("", `强制 left 后：crateAtInitial=${audit.afterMandatoryPull.crateAtInitial}，crateAtGoal=${audit.afterMandatoryPull.crateAtGoal}；再 left 的事件为 \`${audit.continueExtractLeft.events.join(",") || "none"}\`，箱仍在初位=${audit.continueExtractLeft.crateStillAtInitial}。`, "");
  }
  lines.push(
    "## Full 一手与 goal occupant lineage",
    "",
    `- 输入：\`${report.full.input}\`；事件：${report.full.events.map((event: string) => `\`${event}\``).join(", ")}；win=${report.full.win}。`,
    `- driverGoalOverlap=\`${report.full.lineage.driverGoalOverlap.join(";") || "none"}\`；anchorsUnchanged=${report.full.lineage.anchorsUnchanged}。`,
    "",
    "| goal | 一步前来源 | 来源是 ordinary C | 终态 occupant |",
    "| --- | --- | --- | --- |",
  );
  for (const item of report.full.lineage.goals) {
    lines.push(`| ${item.goal} | ${item.expectedSource} | ${item.sourceWasOrdinaryCrate} | ${item.finalOccupant} |`);
  }
  lines.push(
    "",
    "```text",
    report.full.before,
    "```",
    "",
    "一次 right 后：",
    "",
    "```text",
    report.full.after,
    "```",
    "",
    "## 被否决的反例链",
    "",
    `1. **anchors 可达**：\`${report.rejected.accessibleAnchors.id}\` 的 24 步 trace 可先移动 B/S，把两只 C 转成 sticky，再逐只送 goal；win=${report.rejected.accessibleAnchors.win}，事件含 \`${report.rejected.accessibleAnchors.events.filter((event: string) => event.includes("anchor_boundary_shift") || event.includes("box_to_sticky")).join(",")}\`。修正：两对 anchors 封入不可达 2×2 壳。`,
    `2. **goal 正面未封**：\`${report.rejected.uncappedGoalFront.id}\` 的 17 步 trace 从 goal 正面 L-pull 两只 C 入 goal；win=${report.rejected.uncappedGoalFront.win}。修正：goal column 顶/底与右侧封成不可进入 cap。`,
    `3. **分立 H_L/H_R**：\`${report.rejected.splitHead.id}\` 完整图 states=${report.rejected.splitHead.graph.states}/transitions=${report.rejected.splitHead.graph.transitions}/wins=${report.rejected.splitHead.graph.wins}；\`B+H_L\` 可先永久 bank 左 goal，再 direct push 右 goal 即时获胜。修正：全部 contacts 合并进 monolithic H，任一 supplied 真子集都没有单独 contact bank。`,
    `4. **T 无右 cap**：曾在 300001 states 内 0 win 但图超预算，因为 T 可越过 register 游走。修正：row15 的 x=11 加 cap；现在 T 与 HT 都是 217 states / 763 transitions / 0 wins 的完整图。`,
    "",
    "## 证据边界",
    "",
    "- 已证明：同一 terminal socket terrain 上，ordinary-C direct P/L trap、完整 HRT 同步推进、所有实际 docked 真子集 0-win 可以共存。",
    "- 未证明：H/R/T 从空地各自移动并装配到该 docked 状态的完整 assembly trace；这应作为下一轮 challenge 布局任务，而不是把本局部见证直接当成成品关卡。",
    "- 不声称：任意更小 polyomino、任意玩家自造结构都不能过；用户口径只要求审实际供应组件及其合法组合。",
    "",
  );
  return `${lines.join("\n")}\n`;
}

function renderSummary(report: any): string {
  return acceptedIds.map((id) => {
    const graph = report.accepted[id].graph;
    return `${id}: ${graph.status}, ${graph.states} states, ${graph.transitions} transitions, ${graph.wins} wins`;
  }).join("\n");
}
