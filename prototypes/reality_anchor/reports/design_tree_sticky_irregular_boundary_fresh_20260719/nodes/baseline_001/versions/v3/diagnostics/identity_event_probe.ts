import { readFile } from "node:fs/promises";
import { loadPrototypePackage } from "../../../../../../../../../src/core/io.js";
import { enumerateRuntimeGraph } from "../../../../../../../../../src/core/runtimeGraph.js";
import { getRuntimeAdapter } from "../../../../../../../../../src/prototypes/runtimeAdapter.js";

const layoutPath = process.argv[2];
if (!layoutPath) throw new Error("usage: identity_event_probe.ts <layout>");

const pkg = await loadPrototypePackage("prototypes/reality_anchor");
const adapter = getRuntimeAdapter(pkg.mechanic);
const runtime = adapter.createRuntime(pkg.mechanic);
const layout = (await readFile(layoutPath, "utf8")).replace(/\r/g, "").trimEnd();
const initial: any = adapter.parseLevel({
  id: "RA_BASELINE_V3_IDENTITY_PROBE", title: "RA_BASELINE_V3_IDENTITY_PROBE",
  role: "challenge", status: "candidate", targets: ["K_runtime_smoke"],
  known_before: ["K_runtime_smoke"], target_learning: ["K_runtime_smoke"], support_level: "none",
  expected_solver_evidence: ["solvable"], expected_llm_player_evidence: [], layout,
} as any);
const graph: any = enumerateRuntimeGraph(
  runtime as any, initial, pkg.mechanic.win, { winCondition: pkg.mechanic.win }, { maxStates: 300_000 },
);
if (graph.status !== "complete") throw new Error(`graph incomplete: ${graph.reason ?? "unknown"}`);

const groups = [
  { id: "movable_box_sticky_shift", prefixes: ["anchor_boundary_shift:box_sticky"] },
  { id: "fixed_push_pull_effect", prefixes: ["pull_object"] },
  { id: "sticky_rigid_move", prefixes: ["move_sticky_rigid"] },
];

function edgeHas(edge: any, prefixes: string[]) {
  return edge.events.some((event: string) => prefixes.some((prefix) => event === prefix || event.startsWith(`${prefix}:`)));
}

function findWinningBypass(prefixes: string[]) {
  const queue = [0];
  const seen = new Set<number>([0]);
  let cursor = 0;
  while (cursor < queue.length) {
    const at = queue[cursor++]!;
    if (graph.winStateIndexes.has(at)) return { found: true, reachable_without_group: seen.size };
    for (const edge of graph.edges) {
      if (edge.from !== at || edgeHas(edge, prefixes) || seen.has(edge.to)) continue;
      seen.add(edge.to);
      queue.push(edge.to);
    }
  }
  return { found: false, reachable_without_group: seen.size };
}

const forbidden = new Set<string>();
const eventCounts: Record<string, number> = {};
for (const edge of graph.edges) {
  for (const event of edge.events) {
    eventCounts[event] = (eventCounts[event] ?? 0) + 1;
    if (event === "anchor_boundary_shift:push_pull") forbidden.add(event);
  }
}

const report = {
  status: "complete",
  budget: { max_states: 300000 },
  graph: { reachable_states: graph.keys.length, legal_transitions: graph.edges.length, winning_states: graph.winStateIndexes.size },
  individual_winning_bypass_probes: Object.fromEntries(groups.map((group) => [group.id, {
    status: "complete",
    ...findWinningBypass(group.prefixes),
  }])),
  reachable_event_scan: {
    status: "complete",
    forbidden_event: "anchor_boundary_shift:push_pull",
    forbidden_hits: [...forbidden].sort(),
    event_counts: Object.fromEntries(Object.entries(eventCounts).sort()),
  },
  evidence_boundary: "只审计本节点声明的 B/S 位移、fixed P/L pull 效应与 sticky 刚体移动；不要求 normalization、box_to_sticky 或 sticky_merge。",
};

console.log(JSON.stringify(report, null, 2));
