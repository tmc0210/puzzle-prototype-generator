import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
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
const sourceLayoutPath = path.join(taskRoot, "candidate/versions/v2/layout.txt");
const outputRoot = path.join(taskRoot, "designer/workbench/revision_001");
const sourceRaw = await readFile(sourceLayoutPath, "utf8");
const sourceRows = sourceRaw.replace(/\r/g, "").trimEnd().split("\n");
if (sourceRows.length !== 10 || sourceRows.at(-3) !== "################") {
  throw new Error("v2 layout 形状与 revision assignment 的裁边前提不一致");
}
const croppedLayout = sourceRows.slice(0, -2).join("\n");
const baselinePath = path.join(outputRoot, "cropped_baseline_layout.txt");

const variants = [
  { id: "b71_top_anchor", x: 7, y: 1, initial: "O" },
  { id: "b141_upper_goal", x: 14, y: 1, initial: "o" },
  { id: "b43_reignite_source", x: 4, y: 3, initial: "O" },
  { id: "b54_grate_left", x: 5, y: 4, initial: "O" },
  { id: "b64_grate_middle", x: 6, y: 4, initial: "O" },
  { id: "b74_grate_right", x: 7, y: 4, initial: "O" },
  { id: "b65_final_goal", x: 6, y: 5, initial: "o" },
  { id: "b36_stopper_anchor", x: 3, y: 6, initial: "O" },
] as const;

const pkg = await loadPrototypePackage(path.resolve("prototypes/candle_sokoban"));
const actions = Object.keys(pkg.mechanic.inputs) as CandleAction[];

await mkdir(outputRoot, { recursive: true });
await writeFile(baselinePath, `${croppedLayout}\n`, "utf8");

const index: Array<Record<string, unknown>> = [];
for (const variant of variants) {
  const rows = croppedLayout.split("\n");
  const cells = [...rows[variant.y]!];
  if (cells[variant.x] !== variant.initial) {
    throw new Error(
      `${variant.id} 预期 (${variant.x},${variant.y})=${variant.initial}，实际=${cells[variant.x]}`,
    );
  }
  cells[variant.x] = "#";
  rows[variant.y] = cells.join("");
  const layout = rows.join("\n");
  const variantRoot = path.join(outputRoot, "brazier_wall_counterfactuals", variant.id);
  const layoutPath = path.join(variantRoot, "layout.txt");
  await mkdir(variantRoot, { recursive: true });
  await writeFile(layoutPath, `${layout}\n`, "utf8");

  const level: LevelDoc = {
    id: `CANDLE_WALL_REIGNITION_TIMING_CAPSTONE_001_REV001_${variant.id}`,
    title: variant.id,
    global_burn_cycle: 5,
    layout,
    win: { type: "all_braziers_lit" },
  };
  try {
    const graph = enumerateReachableGraph(level);
    const graphPath = path.join(variantRoot, "reachable_graph.json");
    await writeFile(graphPath, `${JSON.stringify(graph, null, 2)}\n`, "utf8");
    index.push({
      ...variant,
      replacement: "#",
      layout_ref: path.relative(path.resolve(), layoutPath).replaceAll("\\", "/"),
      reachable_graph_ref: path.relative(path.resolve(), graphPath).replaceAll("\\", "/"),
      layout_sha256: graph.layout_sha256,
      graph: graph.graph,
      shortest_solution: graph.shortest_solution,
    });
    process.stdout.write(
      `${variant.id} graph=complete states=${graph.graph.reachable_state_count} edges=${graph.graph.legal_transition_count} wins=${graph.graph.win_state_count} shortest=${graph.shortest_solution.cost ?? "none"}\n`,
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    const validationPath = path.join(variantRoot, "initial_validation_error.json");
    const literalLayoutSha256 = createHash("sha256").update(`${layout}\n`).digest("hex");
    await writeFile(
      validationPath,
      `${JSON.stringify(
        {
          schema_version: 1,
          candidate_id: "CANDLE_WALL_REIGNITION_TIMING_CAPSTONE_001",
          exact_version_basis: "v2",
          counterfactual_id: variant.id,
          literal_layout_ref: path.relative(path.resolve(), layoutPath).replaceAll("\\", "/"),
          literal_layout_sha256: literalLayoutSha256,
          graph_status: "invalid_initial_contact",
          error: message,
          interpretation:
            "将 (3,6) 火盆原格替换为墙会在静默初始接触结算中立即熄灭 candle#3；Candle runtime 拒绝这种初态变化，因此不存在合法 exact 初态可供完整图枚举。",
        },
        null,
        2,
      )}\n`,
      "utf8",
    );

    let settledSurrogate: Record<string, unknown> | undefined;
    if (variant.id === "b36_stopper_anchor") {
      const surrogateRows = layout.split("\n");
      const surrogateCells = [...surrogateRows[6]!];
      surrogateCells[4] = "l";
      surrogateRows[6] = surrogateCells.join("");
      const surrogateLayout = surrogateRows.join("\n");
      const surrogateRoot = path.join(variantRoot, "settled_surrogate");
      const surrogateLayoutPath = path.join(surrogateRoot, "layout.txt");
      await mkdir(surrogateRoot, { recursive: true });
      await writeFile(surrogateLayoutPath, `${surrogateLayout}\n`, "utf8");
      const surrogateLevel: LevelDoc = {
        ...level,
        id: `${level.id}_SETTLED_SURROGATE`,
        title: `${variant.id}_settled_surrogate`,
        layout: surrogateLayout,
      };
      const surrogateGraph = enumerateReachableGraph(surrogateLevel);
      const surrogateGraphPath = path.join(surrogateRoot, "reachable_graph.json");
      await writeFile(
        surrogateGraphPath,
        `${JSON.stringify(surrogateGraph, null, 2)}\n`,
        "utf8",
      );
      settledSurrogate = {
        notice: "仅诊断墙替换完成静默熄灭后的稳定状态；不是“其它不变”的 literal counterfactual，也不得作为最终版。",
        layout_ref: path.relative(path.resolve(), surrogateLayoutPath).replaceAll("\\", "/"),
        reachable_graph_ref: path.relative(path.resolve(), surrogateGraphPath).replaceAll("\\", "/"),
        graph: surrogateGraph.graph,
        shortest_solution: surrogateGraph.shortest_solution,
      };
    }
    index.push({
      ...variant,
      replacement: "#",
      layout_ref: path.relative(path.resolve(), layoutPath).replaceAll("\\", "/"),
      layout_sha256: literalLayoutSha256,
      graph: { status: "invalid_initial_contact" },
      initial_validation_error_ref: path.relative(path.resolve(), validationPath).replaceAll("\\", "/"),
      ...(settledSurrogate ? { settled_surrogate: settledSurrogate } : {}),
    });
    process.stdout.write(`${variant.id} graph=invalid_initial_contact error=${message}\n`);
  }
}

await writeFile(
  path.join(outputRoot, "counterfactual_index.json"),
  `${JSON.stringify(
    {
      candidate_id: "CANDLE_WALL_REIGNITION_TIMING_CAPSTONE_001",
      exact_version_basis: "v2",
      baseline_layout_ref: path.relative(path.resolve(), baselinePath).replaceAll("\\", "/"),
      baseline_layout_sha256: createHash("sha256").update(`${croppedLayout}\n`).digest("hex"),
      variants: index,
    },
    null,
    2,
  )}\n`,
  "utf8",
);

function enumerateReachableGraph(level: LevelDoc) {
  const initial = parseLevel(level);
  type Node = {
    index: number;
    state: CandleSokobanState;
    key: string;
    depth: number;
    winning: boolean;
    parent_index: number | null;
    parent_input: CandleAction | null;
    parent_events: string[];
  };
  const first: Node = {
    index: 0,
    state: initial,
    key: stateKey(initial),
    depth: 0,
    winning: isWin(initial, level.win!),
    parent_index: null,
    parent_input: null,
    parent_events: [],
  };
  const queue: Node[] = [first];
  const byKey = new Map<string, Node>([[first.key, first]]);
  const edges: Array<{
    index: number;
    from: number;
    to: number;
    input: CandleAction;
    events: string[];
  }> = [];
  let firstWin: Node | undefined = first.winning ? first : undefined;

  for (let cursor = 0; cursor < queue.length; cursor += 1) {
    const current = queue[cursor]!;
    if (current.winning) continue;
    for (const action of actions) {
      const transition = step(pkg.mechanic, current.state, action, { winCondition: level.win });
      if (!transition.legal) continue;
      const key = stateKey(transition.state);
      let target = byKey.get(key);
      if (!target) {
        target = {
          index: queue.length,
          state: transition.state,
          key,
          depth: current.depth + 1,
          winning: isWin(transition.state, level.win!),
          parent_index: current.index,
          parent_input: action,
          parent_events: transition.events,
        };
        queue.push(target);
        byKey.set(key, target);
        if (target.winning && (!firstWin || target.depth < firstWin.depth)) firstWin = target;
      }
      edges.push({
        index: edges.length,
        from: current.index,
        to: target.index,
        input: action,
        events: transition.events,
      });
    }
  }

  const winningNodes = queue.filter((node) => node.winning);
  const solutionInputs: CandleAction[] = [];
  const solutionEvents: string[] = [];
  if (firstWin) {
    const reverseInputs: CandleAction[] = [];
    const reverseEvents: string[][] = [];
    let current: Node | undefined = firstWin;
    while (current.parent_index !== null) {
      reverseInputs.push(current.parent_input!);
      reverseEvents.push(current.parent_events);
      current = queue[current.parent_index];
    }
    solutionInputs.push(...reverseInputs.reverse());
    solutionEvents.push(...reverseEvents.reverse().flat());
  }

  const eventCounts = new Map<string, number>();
  for (const edge of edges) {
    for (const event of edge.events) {
      const type = event.split(":", 1)[0]!;
      eventCounts.set(type, (eventCounts.get(type) ?? 0) + 1);
    }
  }

  return {
    schema_version: 1,
    candidate_id: "CANDLE_WALL_REIGNITION_TIMING_CAPSTONE_001",
    exact_version_basis: "v2",
    counterfactual_level_id: level.id,
    layout: level.layout,
    layout_sha256: createHash("sha256").update(`${level.layout}\n`).digest("hex"),
    win_condition: level.win,
    graph: {
      status: "complete",
      terminalize_wins: true,
      reachable_state_count: queue.length,
      legal_transition_count: edges.length,
      win_state_count: winningNodes.length,
      max_observed_depth: Math.max(...queue.map((node) => node.depth)),
    },
    shortest_solution: {
      found: firstWin !== undefined,
      cost: firstWin?.depth ?? null,
      inputs: solutionInputs,
      events: solutionEvents,
    },
    event_counts: Object.fromEntries([...eventCounts.entries()].sort(([a], [b]) => a.localeCompare(b))),
    raw_graph: {
      nodes: queue.map(({ state: _state, ...node }) => node),
      edges,
    },
  };
}
