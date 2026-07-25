import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { loadPrototypePackage } from "../../../../../../src/core/io.js";
import type { LevelDoc } from "../../../../../../src/core/types.js";
import {
  isWin,
  parseLevel,
  stateKey,
  step,
  type CandleAction,
  type CandleSokobanState,
} from "../../../../../../src/prototypes/candle_sokoban/mechanics.js";

const taskRoot = path.resolve(
  "prototypes/candle_sokoban/reports/studio_wall_douse_reignite_timing_capstone_20260725",
);
const revisionRoot = path.join(taskRoot, "designer/workbench/revision_001");
const index = JSON.parse(
  await readFile(path.join(revisionRoot, "counterfactual_index.json"), "utf8"),
) as {
  baseline_layout_ref: string;
  variants: Array<{
    id: string;
    layout_ref: string;
    graph: { status: string };
    settled_surrogate?: { layout_ref: string };
  }>;
};
const pkg = await loadPrototypePackage(path.resolve("prototypes/candle_sokoban"));
const actions = Object.keys(pkg.mechanic.inputs) as CandleAction[];

type Flag = { name: string; bit: number; label?: string };
const FLAGS: Flag[] = [
  { name: "target_wall_douse", bit: 1 << 0, label: "wall_douse" },
  { name: "target_static_reignite", bit: 1 << 1, label: "static_reignite" },
  { name: "target_shrink_to_len3_after_reignite", bit: 1 << 2, label: "target_len3" },
  { name: "auxiliary_axis_push", bit: 1 << 3 },
  { name: "upper_brazier_after_auxiliary_push", bit: 1 << 4 },
  { name: "target_shrink_to_len2", bit: 1 << 5, label: "target_len2" },
  { name: "stopper_shrink_to_singleton", bit: 1 << 6 },
  { name: "target_shrink_to_len1", bit: 1 << 7, label: "target_len1_and_gate_open" },
  { name: "final_brazier_after_singleton", bit: 1 << 8, label: "singleton_delivery" },
  { name: "stopper_burn_out_at_final", bit: 1 << 9 },
];
const REQUIRED_MASK = FLAGS.reduce((mask, flag) => mask | flag.bit, 0);

type ProductNode = {
  state: CandleSokobanState;
  mask: number;
  order: string[];
  reignitePhase: number | null;
  depth: number;
  representativeInputs: CandleAction[];
  shortestWays: bigint;
};

async function analyzeAndWrite(id: string, layoutPath: string, outputPath: string) {
  const layout = (await readFile(layoutPath, "utf8")).replace(/\r/g, "").trimEnd();
  const level: LevelDoc = {
    id: `CANDLE_WALL_REIGNITION_TIMING_CAPSTONE_001_REV001_${id}`,
    title: id,
    global_burn_cycle: 5,
    layout,
    win: { type: "all_braziers_lit" },
  };
  const report = enumerate(level, id);
  await writeFile(outputPath, `${JSON.stringify(report, null, 2)}\n`, "utf8");
  process.stdout.write(
    `${id} product=complete states=${report.graph.product_state_count} wins=${report.graph.winning_product_state_count} all_required=${report.required_history.every_winning_trace_has_all_required_flags} signatures=${report.winning_milestone_signatures.length}\n`,
  );
}

function enumerate(level: LevelDoc, id: string) {
  const initial = parseLevel(level);
  const first: ProductNode = {
    state: initial,
    mask: 0,
    order: [],
    reignitePhase: null,
    depth: 0,
    representativeInputs: [],
    shortestWays: 1n,
  };
  const queue: ProductNode[] = [first];
  const byKey = new Map<string, ProductNode>([[productKey(first), first]]);
  const baseStates = new Set([stateKey(initial)]);
  const wins: ProductNode[] = [];
  let legalEdges = 0;

  for (let cursor = 0; cursor < queue.length; cursor += 1) {
    const current = queue[cursor]!;
    if (isWin(current.state, level.win!)) {
      wins.push(current);
      continue;
    }
    for (const action of actions) {
      const transition = step(pkg.mechanic, current.state, action, { winCondition: level.win });
      if (!transition.legal) continue;
      legalEdges += 1;
      const advanced = advance(
        current.mask,
        current.order,
        current.reignitePhase,
        current.state.globalBurnCountdown,
        transition.events,
      );
      const next: ProductNode = {
        state: transition.state,
        mask: advanced.mask,
        order: advanced.order,
        reignitePhase: advanced.reignitePhase,
        depth: current.depth + 1,
        representativeInputs: [...current.representativeInputs, action],
        shortestWays: current.shortestWays,
      };
      baseStates.add(stateKey(next.state));
      const key = productKey(next);
      const prior = byKey.get(key);
      if (!prior) {
        byKey.set(key, next);
        queue.push(next);
      } else if (prior.depth === next.depth) {
        prior.shortestWays += next.shortestWays;
      }
    }
  }

  const signatureCounts = new Map<string, { count: number; minimumDepth: number; representative: CandleAction[] }>();
  for (const win of wins) {
    const signature = win.order.join(">");
    const prior = signatureCounts.get(signature);
    if (!prior) {
      signatureCounts.set(signature, {
        count: 1,
        minimumDepth: win.depth,
        representative: win.representativeInputs,
      });
    } else {
      prior.count += 1;
      prior.minimumDepth = Math.min(prior.minimumDepth, win.depth);
    }
  }
  const minDepth = wins.length ? Math.min(...wins.map((win) => win.depth)) : null;
  const shortestWins = minDepth === null ? [] : wins.filter((win) => win.depth === minDepth);
  const phases = new Map<string, { count: number; minimumDepth: number }>();
  for (const win of wins) {
    const key = win.reignitePhase === null ? "none" : `t${win.reignitePhase}`;
    const prior = phases.get(key);
    if (!prior) phases.set(key, { count: 1, minimumDepth: win.depth });
    else {
      prior.count += 1;
      prior.minimumDepth = Math.min(prior.minimumDepth, win.depth);
    }
  }
  return {
    schema_version: 1,
    candidate_id: "CANDLE_WALL_REIGNITION_TIMING_CAPSTONE_001",
    exact_version_basis: "v2",
    counterfactual_id: id,
    scope: "完整可达状态的单调历史与首次复燃倒数产品图；胜利状态终止扩展",
    graph: {
      status: "complete",
      base_state_count: baseStates.size,
      product_state_count: byKey.size,
      legal_edge_count: legalEdges,
      winning_product_state_count: wins.length,
    },
    required_history: {
      required_mask: REQUIRED_MASK,
      every_winning_trace_has_all_required_flags:
        wins.length > 0 && wins.every((win) => (win.mask & REQUIRED_MASK) === REQUIRED_MASK),
      flags: FLAGS.map((flag) => ({
        name: flag.name,
        all_winning_traces: wins.length > 0 && wins.every((win) => (win.mask & flag.bit) !== 0),
        violating_winning_product_state_count: wins.filter((win) => (win.mask & flag.bit) === 0).length,
      })),
    },
    winning_milestone_signatures: [...signatureCounts.entries()].map(([signature, value]) => ({
      signature,
      winning_product_states: value.count,
      minimum_depth: value.minimumDepth,
      representative_inputs: value.representative,
    })),
    winning_reignite_phases: [...phases.entries()].map(([phase, value]) => ({ phase, ...value })),
    shortest_winning_family: {
      cost: minDepth,
      product_states: shortestWins.length,
      raw_shortest_input_count: shortestWins
        .reduce((sum, win) => sum + win.shortestWays, 0n)
        .toString(),
      representative_inputs: shortestWins[0]?.representativeInputs ?? [],
    },
  };
}

function productKey(node: ProductNode): string {
  return `${stateKey(node.state)}||M:${node.mask}||O:${node.order.join(">")}|RP:${node.reignitePhase ?? "none"}`;
}

function advance(
  maskBefore: number,
  orderBefore: string[],
  reignitePhaseBefore: number | null,
  countdownBefore: number,
  events: string[],
) {
  let mask = maskBefore;
  const order = [...orderBefore];
  let reignitePhase = reignitePhaseBefore;
  const add = (flag: Flag) => {
    if ((mask & flag.bit) === 0 && flag.label) order.push(flag.label);
    mask |= flag.bit;
  };
  if (events.includes("extinguish_by_wall:candle#1")) add(FLAGS[0]!);
  if ((mask & FLAGS[0]!.bit) !== 0 && events.includes("ignite_from_brazier:candle#1:4,3")) {
    add(FLAGS[1]!);
    reignitePhase ??= countdownBefore;
  }
  if ((mask & FLAGS[1]!.bit) !== 0 && events.includes("shrink:candle#1:len3")) add(FLAGS[2]!);
  if (events.includes("push_axis:candle#4")) add(FLAGS[3]!);
  if ((mask & FLAGS[3]!.bit) !== 0 && events.includes("light_brazier:14,1")) add(FLAGS[4]!);
  if ((mask & FLAGS[2]!.bit) !== 0 && events.includes("shrink:candle#1:len2")) add(FLAGS[5]!);
  if (events.includes("shrink:candle#3:len1")) add(FLAGS[6]!);
  if (
    (mask & FLAGS[5]!.bit) !== 0 &&
    (mask & FLAGS[6]!.bit) !== 0 &&
    events.includes("shrink:candle#1:len1")
  ) add(FLAGS[7]!);
  if ((mask & FLAGS[7]!.bit) !== 0 && events.includes("light_brazier:6,5")) add(FLAGS[8]!);
  if ((mask & FLAGS[8]!.bit) !== 0 && events.includes("burn_out:candle#3")) add(FLAGS[9]!);
  return { mask, order, reignitePhase };
}

await main();

async function main() {
  await analyzeAndWrite(
    "cropped_baseline",
    path.resolve(index.baseline_layout_ref),
    path.join(revisionRoot, "cropped_baseline_solution_family.json"),
  );
  for (const variant of index.variants) {
    if (variant.graph.status === "complete") {
      const layoutPath = path.resolve(variant.layout_ref);
      await analyzeAndWrite(
        variant.id,
        layoutPath,
        path.join(path.dirname(layoutPath), "solution_family_audit.json"),
      );
    }
    if (variant.settled_surrogate) {
      const layoutPath = path.resolve(variant.settled_surrogate.layout_ref);
      await analyzeAndWrite(
        `${variant.id}_settled_surrogate`,
        layoutPath,
        path.join(path.dirname(layoutPath), "solution_family_audit.json"),
      );
    }
  }
}
