import { enumerateRuntimeGraph } from "../../../../../../../src/core/runtimeGraph.js";
import { getRuntimeAdapter } from "../../../../../../../src/prototypes/runtimeAdapter.js";
import { readFile, writeFile } from "node:fs/promises";
import YAML from "yaml";
import type { MechanicDoc } from "../../../../../../../src/core/types.js";
import {
  forceModeAt,
  pointKey,
  type RealityAnchorState,
} from "../../../../../../../src/prototypes/reality_anchor/mechanics.js";

type Probe = {
  id: string;
  layout: string;
  prefix: string[];
};

const probes: Probe[] = [
  {
    id: "l3_boundary_mismatch",
    layout: [
      "#############",
      "#B####PL##G##",
      "#S###########",
      "######.....##",
      "#####.MM....#",
      "#####@M....##",
      "######..#..##",
      "######....###",
      "#############",
    ].join("\n"),
    prefix: ["right", "down", "down", "right", "right", "right", "up", "up", "up", "right"],
  },
  {
    id: "hook4_backward_toe_leak",
    layout: [
      "#############",
      "#B####PL##G##",
      "#S###########",
      "######.....##",
      "#####MMM....#",
      "#####@M....##",
      "######..#..##",
      "######....###",
      "#############",
    ].join("\n"),
    prefix: ["right", "down", "down", "right", "right", "right", "up", "up", "up", "right"],
  },
  {
    id: "l3_boundary_shift_leaks_push",
    layout: [
      "#############",
      "#B#####PL#G##",
      "#S###########",
      "######.....##",
      "#####.MM....#",
      "#####@M....##",
      "######..#..##",
      "######....###",
      "#############",
    ].join("\n"),
    prefix: ["right", "down", "down", "right", "right", "right", "up", "up", "up", "right"],
  },
  {
    id: "l3_without_low_shape_wall_has_turn_pull",
    layout: [
      "#############",
      "#B####PL##G##",
      "#S###########",
      "######.....##",
      "#####.MM....#",
      "#####@M....##",
      "######.....##",
      "######....###",
      "#############",
    ].join("\n"),
    prefix: ["right", "down", "down", "right", "right", "right", "up", "up", "up", "right"],
  },
];

const mechanic = YAML.parse(
  await readFile("prototypes/reality_anchor/mechanic.yml", "utf8"),
) as MechanicDoc;
const adapter = getRuntimeAdapter(mechanic);
const runtime = adapter.createRuntime(mechanic);
const outputs: Array<Record<string, unknown>> = [];

function stickyKey(state: RealityAnchorState): string {
  return state.stickyGroups
    .map((group) => group.map(pointKey).sort().join(";"))
    .sort()
    .join("|");
}

function movedSticky(events: string[]): boolean {
  return events.some((event) => event === "move_sticky_rigid");
}

function stickyCells(state: RealityAnchorState): Set<string> {
  return new Set(state.stickyGroups.flat().map(pointKey));
}

function findPath(
  edges: Array<{ from: number; to: number; action: string }>,
  from: number,
  to: number,
): string[] | undefined {
  if (from === to) return [];
  const outgoing = new Map<number, Array<{ to: number; action: string }>>();
  for (const edge of edges) {
    outgoing.set(edge.from, [...(outgoing.get(edge.from) ?? []), edge]);
  }
  const queue: Array<{ index: number; path: string[] }> = [{ index: from, path: [] }];
  const visited = new Set<number>([from]);
  for (let cursor = 0; cursor < queue.length; cursor += 1) {
    const current = queue[cursor]!;
    for (const edge of outgoing.get(current.index) ?? []) {
      if (visited.has(edge.to)) continue;
      const path = [...current.path, edge.action];
      if (edge.to === to) return path;
      visited.add(edge.to);
      queue.push({ index: edge.to, path });
    }
  }
  return undefined;
}

for (const probe of probes) {
  const initial = adapter.parseLevel({ id: probe.id, title: probe.id, layout: probe.layout });
  let current = initial as RealityAnchorState;
  const replay: Array<Record<string, unknown>> = [];
  for (const action of probe.prefix) {
    const beforeMode = forceModeAt(current, current.player);
    const result = runtime.step(current, action, { winCondition: mechanic.win });
    replay.push({ action, beforeMode, legal: result.legal, reason: result.reason, events: result.events });
    if (!result.legal) break;
    current = result.state as RealityAnchorState;
  }

  const finalSticky = stickyKey(current);
  const immediate = runtime.actions(current, {}).map((action) => {
    const result = runtime.step(current, action, {});
    return {
      action,
      mode: forceModeAt(current, current.player),
      legal: result.legal,
      reason: result.reason,
      events: result.events,
      stickyChanged: result.legal && stickyKey(result.state as RealityAnchorState) !== finalSticky,
    };
  });

  const graph = enumerateRuntimeGraph(runtime, current, mechanic.win, {}, {
    maxStates: 300_000,
    maxTransitions: 1_200_000,
    terminalizeWins: false,
  });
  const sameObjectIndexes = graph.states
    .map((state, index) => ({ state: state as RealityAnchorState, index }))
    .filter(({ state }) => stickyKey(state) === finalSticky);
  const sameObjectSet = new Set(sameObjectIndexes.map(({ index }) => index));
  const walkEdges = graph.edges.filter(
    (edge) => sameObjectSet.has(edge.from) && sameObjectSet.has(edge.to) && !movedSticky(edge.events),
  );
  const objectEdges = graph.edges
    .filter((edge) => sameObjectSet.has(edge.from) && movedSticky(edge.events))
    .map((edge) => ({
      from: edge.from,
      player: (graph.states[edge.from] as RealityAnchorState).player,
      mode: forceModeAt(
        graph.states[edge.from] as RealityAnchorState,
        (graph.states[edge.from] as RealityAnchorState).player,
      ),
      action: edge.action,
      events: edge.events,
      toSticky: stickyKey(graph.states[edge.to] as RealityAnchorState),
    }));

  const modeActionFamilies = [...new Set(objectEdges.map((edge) => `${edge.mode}:${edge.action}`))].sort();
  const sameDirectionDualModes = ["up", "down", "left", "right"].filter((action) => {
    const modes = new Set(objectEdges.filter((edge) => edge.action === action).map((edge) => edge.mode));
    return modes.size > 1;
  });
  const playerCells = sameObjectIndexes.map(({ state }) => pointKey(state.player)).sort();
  const reverseBranches = objectEdges
    .filter((edge) => edge.action !== "right")
    .map((edge) => {
      const graphEdge = graph.edges.find(
        (candidate) =>
          candidate.from === edge.from &&
          candidate.action === edge.action &&
          movedSticky(candidate.events),
      );
      const path = graphEdge ? findPath(graph.edges, graphEdge.to, 0) : undefined;
      return {
        from: edge.from,
        mode: edge.mode,
        action: edge.action,
        returnsToExactFinal: path !== undefined,
        returnPath: path,
      };
    });
  const pushPullRightCounts = {
    push: objectEdges.filter((edge) => edge.mode === "push" && edge.action === "right").length,
    pull: objectEdges.filter((edge) => edge.mode === "pull" && edge.action === "right").length,
  };
  const rightFacingHandleChecks = sameObjectIndexes
    .filter(({ state }) => stickyCells(state).has(`${state.player.x + 1},${state.player.y}`))
    .map(({ state, index }) => {
      const result = runtime.step(state, "right", {});
      return {
        index,
        player: state.player,
        mode: forceModeAt(state, state.player),
        legal: result.legal,
        reason: result.reason,
        events: result.events,
      };
    });
  const rightTrailingHandleChecks = sameObjectIndexes
    .filter(({ state }) => stickyCells(state).has(`${state.player.x - 1},${state.player.y}`))
    .map(({ state, index }) => {
      const result = runtime.step(state, "right", {});
      return {
        index,
        player: state.player,
        mode: forceModeAt(state, state.player),
        legal: result.legal,
        reason: result.reason,
        events: result.events,
      };
    });

  outputs.push({
    id: probe.id,
    replay,
    final: adapter.renderState(current),
    immediate,
    graph: {
      status: graph.status,
      reason: graph.reason,
      states: graph.states.length,
      transitions: graph.edges.length,
      maxDepth: Math.max(...graph.depthByIndex),
    },
    finalObjectWalkClosure: {
      states: sameObjectIndexes.length,
      distinctPlayerCells: [...new Set(playerCells)],
      walkEdges: walkEdges.length,
      objectEdges,
      modeActionFamilies,
      sameDirectionDualModes,
      pushPullRightCounts,
      rightFacingHandleChecks,
      rightTrailingHandleChecks,
      reverseBranches,
    },
  });
}

await writeFile(
  new URL("./handle_family_audit.json", import.meta.url),
  `${JSON.stringify({ generatedAt: new Date().toISOString(), probes: outputs }, null, 2)}\n`,
  "utf8",
);
for (const output of outputs) {
  const closure = output.finalObjectWalkClosure as Record<string, unknown>;
  console.log(
    JSON.stringify({
      id: output.id,
      graph: output.graph,
      modeActionFamilies: closure.modeActionFamilies,
      sameDirectionDualModes: closure.sameDirectionDualModes,
      pushPullRightCounts: closure.pushPullRightCounts,
      reverseBranches: closure.reverseBranches,
    }),
  );
}
