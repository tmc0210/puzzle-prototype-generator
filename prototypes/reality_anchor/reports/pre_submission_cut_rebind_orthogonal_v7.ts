import { readFile } from "node:fs/promises";
import { loadPrototypePackage } from "../../../src/core/io.js";
import { solveWithRuntime } from "../../../src/core/solver.js";
import type { LevelDoc } from "../../../src/core/types.js";
import { getRuntimeAdapter } from "../../../src/prototypes/runtimeAdapter.js";

const pkg = await loadPrototypePackage("prototypes/reality_anchor");
const layoutPath = "prototypes/reality_anchor/reports/RA_FRESH_2026_07_12_CUT_REBIND_ORTHOGONAL_layout_v7.txt";
const layout = (await readFile(layoutPath, "utf8")).trimEnd();
const canonical = ["down","right","right","up","left","left","up","left","down","left","left","down","right","right","up","up","up","up","up","right","right","down","right","up","left","left","left","down","down","right","up","left","up","right","right"];
const adapter = getRuntimeAdapter(pkg.mechanic);
const rows = layout.split("\n").map((row) => [...row]);
const goals: Array<[number, number]> = [];
for (let y = 0; y < rows.length; y += 1) {
  for (let x = 0; x < rows[y]!.length; x += 1) {
    if (rows[y]![x] === "G") goals.push([x, y]);
  }
}

const goalChecks = [];
for (const [gx, gy] of goals) {
  const variantRows = rows.map((row) => [...row]);
  variantRows[gy]![gx] = ".";
  const variantLayout = variantRows.map((row) => row.join("")).join("\n");
  const level: LevelDoc = {
    id: `RA_CRO_v7_without_${gx}_${gy}`,
    title: `without ${gx},${gy}`,
    layout: variantLayout,
    win: pkg.mechanic.win,
  };
  const runtime = adapter.createRuntime(pkg.mechanic);
  const initial = adapter.parseLevel(level);
  const solution = solveWithRuntime(runtime, initial, {
    winCondition: level.win ?? pkg.mechanic.win,
    maxStates: 500_000,
    maxDepth: 200,
  });
  const replay = adapter.replay(pkg.mechanic, initial, canonical, { winCondition: level.win ?? pkg.mechanic.win });
  goalChecks.push({
    target: [gx, gy],
    action: "keep",
    shortestFound: solution.found,
    shortestCost: solution.cost,
    shortestSearchStatus: solution.searchStatus,
    exploredStates: solution.exploredStates,
    expectedTraceLegal: replay.legal,
    expectedTraceWin: adapter.isWin(replay.state, level.win ?? pkg.mechanic.win),
    reason: solution.found && (solution.cost ?? 999) < 35 ? "removal_lowers_shortest_cost" : "no_clean_prune_without_complete_graph_and_core_event_scan",
  });
}

const baseLevel: LevelDoc = { id: "RA_CRO_v7", title: "v7", layout, win: pkg.mechanic.win };
const baseRuntime = adapter.createRuntime(pkg.mechanic);
const baseInitial = adapter.parseLevel(baseLevel);
const openingReplays = [
  ["up", "down"],
  ["right", "left"],
  ["down", "up"],
].map((inputs) => {
  const replay = adapter.replay(pkg.mechanic, baseInitial, inputs, { winCondition: baseLevel.win ?? pkg.mechanic.win });
  return {
    inputs,
    legal: replay.legal,
    returnsToInitial: baseRuntime.key(replay.state) === baseRuntime.key(baseInitial),
    events: replay.events,
  };
});

console.log(JSON.stringify({
  candidateVersion: "RA_FRESH_2026_07_12_CUT_REBIND_ORTHOGONAL_v7",
  goalPrune: {
    status: "kept_with_unknown",
    baseShortestCost: 35,
    targetsChecked: goalChecks,
  },
  openingComfort: {
    status: "clean_single_reversible_observation_route",
    openingReplays,
    fullGraphStatus: "exhausted_at_500001",
    note: "down,up 两步合法并返回初态；up,down 会拉动黏块，right 会拉动 B/S，均是可见承诺出口。完整 initial SCC 指标因全图耗尽不主张。",
  },
  redundantElementPrune: {
    status: "kept_with_unknown",
    fixedOrderObserved: ["goal_prune", "object_remove_prune", "object_wallify_prune", "space_prune", "wall_outline_prune"],
    objectFacts: "canonical trace moves both anchors and transforms/moves all five initial sticky cells; no object is eligible from trace nonparticipation.",
    spaceCandidatesKeptUnknown: [[7,3],[7,4],[7,5],[7,6]],
    reason: "base reachable graph exhausted; authority doc forbids clean prune without complete graph and core-event proof. No layout mutation performed.",
  },
}, null, 2));
