import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import { loadPrototypePackage } from "../../../../../../../../src/core/io.js";
import type { InputId, LevelDoc } from "../../../../../../../../src/core/types.js";
import {
  forceModeAt,
  isWin,
  parseLevel,
  pointKey,
  stateKey,
  step,
  type RealityAnchorState,
} from "../../../../../../../../src/prototypes/reality_anchor/mechanics.js";

type WinTransition = {
  type: string;
  force: "push" | "pull" | "walk_or_other";
  beforeCoveredMask: number;
  afterCoveredMask: number;
  modeBefore: "push" | "pull";
  input: InputId;
  events: string[];
  path: InputId[];
};

const root = path.resolve(
  "prototypes/reality_anchor/reports/explorer_giant_assembly_piston_challenge_20260715/exploration/runs/component_space/latching_docked_enumeration",
);
const pkg = await loadPrototypePackage(path.resolve("prototypes/reality_anchor"));
const enumeration = JSON.parse(await readFile(path.join(root, "enumeration.json"), "utf8"));
const targetPlacements = { A: [6, 5], B: [8, 6], C: [7, 8] } as const;
const targetPlayer = { x: 8, y: 9 };

const allResults = enumeration.results.map((item: any) => {
  const exactAssembly = item.placements.every((placement: any) => {
    const target = targetPlacements[placement.id as keyof typeof targetPlacements];
    return target && placement.x === target[0] && placement.y === target[1];
  });
  return {
    ...item,
    exactAssembly,
    exactTarget: exactAssembly
      && item.forceOrigin.x === targetPlayer.x
      && item.forceOrigin.y === targetPlayer.y,
  };
});

const winningResults = allResults.filter((item: any) => item.graph.wins > 0);
const rawProperSubsetWins = winningResults.filter((item: any) => item.pieceIds.length < 3);
const rawFullWrongAssemblyWins = winningResults.filter((item: any) => item.pieceIds.length === 3 && !item.exactAssembly);
const rawCorrectAssemblyWins = winningResults.filter((item: any) => item.exactAssembly);
enumeration.results = allResults;
enumeration.counts.fullWrongWins = rawFullWrongAssemblyWins.length;
enumeration.counts.correctAssemblyWins = rawCorrectAssemblyWins.length;
enumeration.counts.exactTargetWins = rawCorrectAssemblyWins.filter((item: any) => item.exactTarget).length;
enumeration.counts.uniqueWinningAssemblies = new Set(winningResults.map((item: any) => placementKey(item.placements))).size;
enumeration.counts.uniqueWrongWinningAssemblies = new Set(rawFullWrongAssemblyWins.map((item: any) => placementKey(item.placements))).size;
enumeration.properSubsetWinIds = rawProperSubsetWins.map((item: any) => item.id);
enumeration.fullWrongWinIds = rawFullWrongAssemblyWins.map((item: any) => item.id);
enumeration.correctAssemblyWinIds = rawCorrectAssemblyWins.map((item: any) => item.id);
await writeFile(path.join(root, "enumeration.json"), `${JSON.stringify(enumeration, null, 2)}\n`, "utf8");

const familyResults = [];
for (const item of winningResults) {
  const level: LevelDoc = { id: item.id, title: item.id, layout: item.layout };
  const audit = auditAllWinTransitions(parseLevel(level), 200_000);
  const reasons: string[] = [];
  if (item.pieceIds.length < 3) reasons.push("proper_component_subset_win");
  if (audit.winTransitions.some((transition) => transition.beforeCoveredMask === 1 || transition.beforeCoveredMask === 2)) {
    reasons.push("sequential_or_banked_final_cover");
  }
  if (audit.winTransitions.some((transition) => transition.force === "pull")) {
    reasons.push("l_side_forward_pull_finish");
  }
  if (audit.winTransitions.some((transition) => transition.force === "walk_or_other")) {
    reasons.push("non_force_finish");
  }
  const classification = reasons.length === 0
    ? "functional_equivalent_full_simultaneous_p_push"
    : "core_bypass";
  familyResults.push({
    id: item.id,
    pieceIds: item.pieceIds,
    placements: item.placements,
    forceOrigin: item.forceOrigin,
    exactAssembly: item.exactAssembly,
    exactTarget: item.exactTarget,
    shortestWin: item.graph.shortestWin,
    classification,
    coreBypassReasons: reasons,
    graph: {
      status: audit.status,
      states: audit.states,
      transitions: audit.transitions,
    },
    winTransitionTypes: audit.winTransitionTypes,
    winTransitions: audit.winTransitions,
    layout: item.layout,
  });
}

const functional = familyResults.filter((item) => item.classification.startsWith("functional_equivalent"));
const bypass = familyResults.filter((item) => item.classification === "core_bypass");
const properSubsetWins = familyResults.filter((item) => item.pieceIds.length < 3);
const wrongAssemblyFunctional = functional.filter((item) => !item.exactAssembly);
const wrongAssemblyBypass = bypass.filter((item) => !item.exactAssembly);
const pullBypass = bypass.filter((item) => item.coreBypassReasons.includes("l_side_forward_pull_finish"));
const sequentialBypass = bypass.filter((item) => item.coreBypassReasons.includes("sequential_or_banked_final_cover"));

const byPieceSet = Object.fromEntries(
  [...new Set(allResults.map((item: any) => item.pieceIds.join("")))].sort().map((pieceSet) => {
    const group = allResults.filter((item: any) => item.pieceIds.join("") === pieceSet);
    return [pieceSet, { candidates: group.length, wins: group.filter((item: any) => item.graph.wins > 0).length }];
  }),
);

const byShortestCost = Object.fromEntries(
  [...new Set(familyResults.map((item) => item.shortestWin.cost))]
    .sort((left, right) => left - right)
    .map((cost) => [String(cost), familyResults.filter((item) => item.shortestWin.cost === cost).length]),
);

const summary = {
  schema: "ra_latching_docked_family_classification_v1",
  omega: {
    name: "supplied_component_closure",
    includes: [
      "supplied fixed-orientation A/B/C pieces",
      "all nonempty supplied-piece subsets",
      "all no-overlap integer translations whose selected union is initially sticky-connected",
      "all geometrically legal initial P-side up-force origins in the fixed socket (y=8 and y=9 rows)",
      "all runtime-reachable later P/L force origins, including L-side forward/side handles, through complete local graphs",
    ],
    excludes: [
      "arbitrary abstract smaller polyominoes not supplied by the level",
      "B/S cuts or extra movable materials not present in this fixed socket",
      "states outside the fixed latching socket terrain",
    ],
  },
  counts: {
    candidates: allResults.length,
    completeGraphs: allResults.filter((item: any) => item.graph.status === "complete").length,
    winningCandidateOrigins: familyResults.length,
    properSubsetWins: properSubsetWins.length,
    functionalEquivalentWinningOrigins: functional.length,
    coreBypassWinningOrigins: bypass.length,
    wrongAssemblyFunctionalOrigins: wrongAssemblyFunctional.length,
    wrongAssemblyCoreBypassOrigins: wrongAssemblyBypass.length,
    lSidePullBypassOrigins: pullBypass.length,
    sequentialBankingBypassOrigins: sequentialBypass.length,
    uniqueWinningAssemblies: new Set(familyResults.map((item) => placementKey(item.placements))).size,
    uniqueWrongFunctionalAssemblies: new Set(wrongAssemblyFunctional.map((item) => placementKey(item.placements))).size,
    uniqueWrongCoreBypassAssemblies: new Set(wrongAssemblyBypass.map((item) => placementKey(item.placements))).size,
  },
  byPieceSet,
  byShortestCost,
  exactTargetIds: familyResults.filter((item) => item.exactTarget).map((item) => item.id),
  functionalEquivalentIds: functional.map((item) => item.id),
  coreBypassIds: bypass.map((item) => item.id),
  familyResults,
};

await writeFile(path.join(root, "family_classification.json"), `${JSON.stringify(summary, null, 2)}\n`, "utf8");
process.stdout.write(`${JSON.stringify(summary.counts)}\n`);
for (const item of bypass.slice(0, 20)) {
  process.stdout.write(`${item.id}: ${item.coreBypassReasons.join("+")} types=${item.winTransitionTypes.join(",")}\n`);
}

function auditAllWinTransitions(initial: RealityAnchorState, maxStates: number) {
  const initialKey = stateKey(initial);
  const seen = new Map([[initialKey, initial]]);
  const queue = [initial];
  const distance = new Map([[initialKey, 0]]);
  const parent = new Map<string, { previous: string; input: InputId }>();
  const transitionByType = new Map<string, WinTransition>();
  let cursor = 0;
  let transitions = 0;

  while (cursor < queue.length && seen.size < maxStates) {
    const current = queue[cursor++]!;
    if (isWin(current)) continue;
    const currentKey = stateKey(current);
    for (const input of ["up", "down", "left", "right"] as InputId[]) {
      const result = step(pkg.mechanic, current, input);
      if (!result.legal) continue;
      transitions += 1;
      const nextKey = stateKey(result.state);
      if (isWin(result.state)) {
        const force = result.events.some((event) => event.startsWith("push_object:"))
          ? "push"
          : result.events.some((event) => event.startsWith("pull_object:"))
            ? "pull"
            : "walk_or_other";
        const beforeMask = coveredMask(current);
        const afterMask = coveredMask(result.state);
        const type = `${force}_${beforeMask}_to_${afterMask}`;
        const path = [...reconstruct(currentKey, initialKey, parent), input];
        const previous = transitionByType.get(type);
        if (!previous || path.length < previous.path.length) {
          transitionByType.set(type, {
            type,
            force,
            beforeCoveredMask: beforeMask,
            afterCoveredMask: afterMask,
            modeBefore: forceModeAt(current, current.player),
            input,
            events: result.events,
            path,
          });
        }
      }
      if (seen.has(nextKey)) continue;
      seen.set(nextKey, result.state);
      distance.set(nextKey, (distance.get(currentKey) ?? 0) + 1);
      parent.set(nextKey, { previous: currentKey, input });
      queue.push(result.state);
    }
  }

  return {
    status: cursor === queue.length ? "complete" : "exhausted",
    states: seen.size,
    transitions,
    winTransitionTypes: [...transitionByType.keys()].sort(),
    winTransitions: [...transitionByType.values()].sort((left, right) => left.path.length - right.path.length),
  };
}

function reconstruct(
  state: string,
  initial: string,
  parent: Map<string, { previous: string; input: InputId }>,
): InputId[] {
  const inputs: InputId[] = [];
  let cursor = state;
  while (cursor !== initial) {
    const edge = parent.get(cursor);
    if (!edge) break;
    inputs.push(edge.input);
    cursor = edge.previous;
  }
  inputs.reverse();
  return inputs;
}

function coveredMask(state: RealityAnchorState): number {
  const occupied = new Set<string>();
  for (const crate of state.crates) occupied.add(pointKey(crate));
  for (const group of state.stickyGroups) for (const cell of group) occupied.add(pointKey(cell));
  return (occupied.has("6,2") ? 1 : 0) | (occupied.has("10,2") ? 2 : 0);
}

function placementKey(placements: Array<{ id: string; x: number; y: number }>): string {
  return placements.map((item) => `${item.id}:${item.x},${item.y}`).join("|");
}
