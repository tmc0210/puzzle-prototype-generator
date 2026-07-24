import { readFile, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import path from "node:path";
import { loadPrototypePackage } from "../../../../../../src/core/io.js";
import type { LevelDoc } from "../../../../../../src/core/types.js";
import {
  isWin,
  parseLevel,
  renderState,
  stateKey,
  step,
  type CandleAction,
  type CandleSokobanState,
} from "../../../../../../src/prototypes/candle_sokoban/mechanics.js";

const ROOT = path.resolve("prototypes/candle_sokoban/reports/studio_roll_reignite_consumed_20260724");
const layoutArg = process.argv.indexOf("--layout");
const layoutPath = layoutArg >= 0
  ? path.resolve(process.argv[layoutArg + 1]!)
  : path.join(ROOT, "designer/workbench/working_layout.txt");
const exactVersionArg = process.argv.indexOf("--exact-version");
const exactVersion = exactVersionArg >= 0 ? process.argv[exactVersionArg + 1] : "workbench";
const outArg = process.argv.indexOf("--out");
const outPath = outArg >= 0 ? process.argv[outArg + 1] : undefined;

const FLAGS = {
  axisPush: 1 << 0,
  firstWallExtinguish: 1 << 1,
  firstSameRollReignite: 1 << 2,
  exclusiveLit: 1 << 3,
  shrinkAfterReignite: 1 << 4,
  lowerLit: 1 << 5,
  postShrinkExtinguish: 1 << 6,
  gateCrossedAfterClear: 1 << 7,
  belowCoreReached: 1 << 8,
  returnReignite: 1 << 9,
  finalLitAfterReturn: 1 << 10,
} as const;

const REQUIRED_MASK = Object.values(FLAGS).reduce((mask, flag) => mask | flag, 0);

type Node = {
  state: CandleSokobanState;
  mask: number;
  order: string[];
  inputs: CandleAction[];
  depth: number;
  shortestWays: bigint;
  shortestInputs: CandleAction[][];
};

const pkg = await loadPrototypePackage(path.resolve("prototypes/candle_sokoban"));
const layout = (await readFile(layoutPath, "utf8")).replace(/\r/g, "").trimEnd();
const layoutSha256 = createHash("sha256").update(layout, "utf8").digest("hex");
const level: LevelDoc = {
  id: "CANDLE_ROLL_REIGNITE_CONSUMED_WORK",
  title: "CANDLE_ROLL_REIGNITE_CONSUMED_WORK",
  global_burn_cycle: 5,
  layout,
  win: { type: "all_braziers_lit" },
};
const initial = parseLevel(level);
const actions = Object.keys(pkg.mechanic.inputs) as CandleAction[];

const keyFor = (node: Pick<Node, "state" | "mask" | "order">): string =>
  `${stateKey(node.state)}||M:${node.mask}||O:${node.order.join(">")}`;

const initialNode: Node = {
  state: initial,
  mask: 0,
  order: [],
  inputs: [],
  depth: 0,
  shortestWays: 1n,
  shortestInputs: [[]],
};
const queue: Node[] = [initialNode];
const nodes = new Map<string, Node>([[keyFor(initialNode), initialNode]]);
const baseStates = new Set<string>([stateKey(initial)]);
const wins: Node[] = [];
let legalEdges = 0;

for (let cursor = 0; cursor < queue.length; cursor += 1) {
  const current = queue[cursor]!;
  if (isWin(current.state, level.win)) {
    wins.push(current);
    continue;
  }
  for (const action of actions) {
    const result = step(pkg.mechanic, current.state, action, { winCondition: level.win });
    if (!result.legal) continue;
    legalEdges += 1;
    baseStates.add(stateKey(result.state));
    const advanced = advanceHistory(current.mask, current.order, result.events, result.state);
    const candidate: Node = {
      state: result.state,
      mask: advanced.mask,
      order: advanced.order,
      inputs: [...current.inputs, action],
      depth: current.depth + 1,
      shortestWays: current.shortestWays,
      shortestInputs: current.shortestInputs.map((inputs) => [...inputs, action]),
    };
    const key = keyFor(candidate);
    const prior = nodes.get(key);
    if (!prior) {
      nodes.set(key, candidate);
      queue.push(candidate);
    } else if (prior.depth === candidate.depth) {
      prior.shortestWays += current.shortestWays;
      prior.shortestInputs = [...prior.shortestInputs, ...candidate.shortestInputs].slice(0, 20);
    }
  }
}

const minWinDepth = Math.min(...wins.map((node) => node.depth));
const shortestWins = wins.filter((node) => node.depth === minWinDepth);
const signatureMap = new Map<string, Node[]>();
for (const win of wins) {
  const signature = win.order.join(">");
  const list = signatureMap.get(signature) ?? [];
  list.push(win);
  signatureMap.set(signature, list);
}

const requiredFlags = Object.entries(FLAGS).map(([name, flag]) => ({
  name,
  allWinningTraces: wins.every((node) => (node.mask & flag) !== 0),
  violatingWinningTraceCount: wins.filter((node) => (node.mask & flag) === 0).length,
}));

const report = {
  candidateId: "CANDLE_ROLL_REIGNITE_CONSUMED_001",
  exactVersion,
  layoutSha256,
  scope: "complete reachable product graph to first all_braziers_lit state",
  layout,
  graph: {
    status: "complete",
    baseStateCount: baseStates.size,
    productStateCount: nodes.size,
    legalEdgeCount: legalEdges,
    winningProductStateCount: wins.length,
  },
  requiredHistory: {
    requiredMask: REQUIRED_MASK,
    everyWinningTraceHasAllRequiredFlags: wins.every((node) => (node.mask & REQUIRED_MASK) === REQUIRED_MASK),
    flags: requiredFlags,
  },
  winningMilestoneSignatures: [...signatureMap.entries()].map(([signature, matching]) => ({
    signature,
    winningProductStates: matching.length,
    minimumDepth: Math.min(...matching.map((node) => node.depth)),
    representativeInputs: matching[0]!.inputs,
  })),
  shortestWinningFamily: {
    cost: minWinDepth,
    productStates: shortestWins.length,
    rawShortestInputCount: shortestWins.reduce((sum, node) => sum + node.shortestWays, 0n).toString(),
    rawShortestInputRepresentatives: shortestWins.flatMap((node) => node.shortestInputs).slice(0, 20),
    representatives: shortestWins.slice(0, 20).map((node) => ({
      inputs: node.inputs,
      milestoneSignature: node.order.join(">"),
      finalState: renderState(node.state),
    })),
  },
  evidenceLimits: [
    "纯走位回环与同一 product state 的输入合流按逻辑等价处理。",
    "本报告证明所有首次胜利 trace 的必要历史标志与里程碑顺序，不把图统计解释为审美或难度。",
  ],
};

const json = `${JSON.stringify(report, null, 2)}\n`;
if (outPath) {
  await writeFile(path.resolve(outPath), json, "utf8");
}
process.stdout.write(json);

function advanceHistory(
  maskBefore: number,
  orderBefore: string[],
  events: string[],
  stateAfter: CandleSokobanState,
): { mask: number; order: string[] } {
  let mask = maskBefore;
  const order = [...orderBefore];
  const add = (flag: number, label: string): void => {
    if ((mask & flag) === 0) order.push(label);
    mask |= flag;
  };

  const hasSameRollReigniteMarker = events.some((event) =>
    event.startsWith("roll_reignite_after_extinguish:candle#1"),
  );
  const lightsLowerBrazier = events.includes("light_brazier:2,7");
  for (const event of events) {
    if (event.startsWith("push_axis:candle#1")) add(FLAGS.axisPush, "axis_push");
    if (event.startsWith("extinguish_by_wall:candle#1") && hasSameRollReigniteMarker) {
      add(FLAGS.firstWallExtinguish, "first_wall_extinguish");
    }
    if (
      event.startsWith("ignite_from_brazier:candle#1") &&
      hasSameRollReigniteMarker &&
      (mask & FLAGS.firstWallExtinguish) !== 0
    ) {
      add(FLAGS.firstSameRollReignite, "first_same_roll_reignite");
    }
    if (event.startsWith("roll_reignite_after_extinguish:candle#1")) {
      add(FLAGS.firstSameRollReignite, "first_same_roll_reignite");
    }
    if (event === "light_brazier:1,5" && (mask & FLAGS.firstSameRollReignite) !== 0) {
      add(FLAGS.exclusiveLit, "exclusive_first_track_brazier");
    }
    if (event.startsWith("shrink:candle#1") && (mask & FLAGS.firstSameRollReignite) !== 0) {
      add(FLAGS.shrinkAfterReignite, "shrink_after_reignite");
    }
    if (event === "light_brazier:2,7" && (mask & FLAGS.shrinkAfterReignite) !== 0) {
      add(FLAGS.lowerLit, "lower_brazier");
    }
    if (
      event.startsWith("extinguish_by_wall:candle#1") &&
      lightsLowerBrazier &&
      (mask & FLAGS.lowerLit) !== 0
    ) {
      add(FLAGS.postShrinkExtinguish, "post_shrink_extinguish");
    }
    if (
      event === "ignite_from_brazier:candle#1:2,7" &&
      (mask & FLAGS.belowCoreReached) !== 0
    ) {
      add(FLAGS.returnReignite, "return_reignite");
    }
    if (event === "light_brazier:2,1" && (mask & FLAGS.returnReignite) !== 0) {
      add(FLAGS.finalLitAfterReturn, "final_brazier_after_return");
    }
  }
  if (
    (mask & FLAGS.postShrinkExtinguish) !== 0 &&
    stateAfter.player.x === 2 &&
    stateAfter.player.y === 6
  ) {
    add(FLAGS.gateCrossedAfterClear, "gate_crossed_after_clear");
  }
  if (
    (mask & FLAGS.gateCrossedAfterClear) !== 0 &&
    stateAfter.player.x === 3 &&
    stateAfter.player.y === 9
  ) {
    add(FLAGS.belowCoreReached, "below_core_reached");
  }
  return { mask, order };
}
