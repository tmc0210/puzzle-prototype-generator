import { readFile, writeFile } from "node:fs/promises";
import { stringify } from "yaml";
import { loadPrototypePackage } from "../../../src/core/io.js";
import { realityAnchorAdapter } from "../../../src/prototypes/reality_anchor/runtime.js";
import { pointKey, stateKey, type RealityAnchorState } from "../../../src/prototypes/reality_anchor/mechanics.js";
import type { LevelDoc } from "../../../src/core/types.js";

const root = "prototypes/reality_anchor";
const id = process.argv[2] ?? "RA_FRESH_2026_07_11_TWIN_LOOM_RESECTION_v22";
const pkg = await loadPrototypePackage(root);
const layout = (await readFile(`${root}/reports/${id}.layout.txt`, "utf8")).trimEnd();
const level: LevelDoc = { id, title: id, layout, win: pkg.mechanic.win };
const initial = realityAnchorAdapter.parseLevel(level);
const runtime = realityAnchorAdapter.createRuntime(pkg.mechanic);
const initialKey = stateKey(initial);
const nodes = new Map<string, { state: RealityAnchorState; prev?: string; action?: string; events?: string[] }>([[initialKey, { state: initial }]]);
const queue = [stateKey(initial)];
const groups = new Map<string, { count: number; winners: string[] }>();
const maxStates = Number(process.argv[3] ?? 1_200_000);
for (let cursor = 0; cursor < queue.length && nodes.size <= maxStates; cursor += 1) {
  const state = nodes.get(queue[cursor]!)!.state;
  if (runtime.isWin(state, pkg.mechanic.win)) {
    const key = objectKey(state);
    const current = groups.get(key);
    groups.set(key, { count: (current?.count ?? 0) + 1, winners: [...(current?.winners ?? []), queue[cursor]!] });
    continue;
  }
  for (const action of runtime.actions(state, { winCondition: pkg.mechanic.win })) {
    const transition = runtime.step(state, action, { winCondition: pkg.mechanic.win });
    if (!transition.legal) continue;
    const key = stateKey(transition.state);
    if (nodes.has(key)) continue;
    nodes.set(key, { state: transition.state, prev: queue[cursor]!, action, events: transition.events });
    queue.push(key);
  }
}
const report = {
  candidate_id: id,
  search: {
    status: nodes.size <= maxStates ? "complete" : "cutoff",
    explored_states: nodes.size,
    max_states: maxStates,
  },
  winning_object_groups: groups.size,
  groups: [...groups.entries()].map(([key, value]) => ({
    object_key: key,
    winning_player_states: value.count,
    winning_non_walk_traces: value.winners.map(reconstruct),
  })),
};
await writeFile(`${root}/reports/${id}_equivalence_report.yml`, stringify(report), "utf8");
console.log(JSON.stringify(report, null, 2));

function objectKey(state: RealityAnchorState) {
  const crates = state.crates.map(pointKey).sort().join(";");
  const sticky = state.stickyGroups.map((group) => group.map(pointKey).sort().join(";")).sort().join("|");
  const bs = state.boxStickyAnchor ? `${pointKey(state.boxStickyAnchor.sticky)}-${pointKey(state.boxStickyAnchor.box)}` : "none";
  return `C:${crates}|M:${sticky}|BS:${bs}`;
}

function reconstruct(winner: string) {
  const steps: Array<{ action: string; events: string[] }> = [];
  let key = winner;
  while (key !== initialKey) {
    const node = nodes.get(key)!;
    steps.push({ action: node.action!, events: node.events ?? [] });
    key = node.prev!;
  }
  return steps.reverse().filter((step) => step.events.some((event) => event !== "walk"));
}
