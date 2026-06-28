import type {
  PlayerModelDoc,
  PlayerModelTargetKind,
} from "./types.js";

export type PlayerModelIndex = {
  allIds: Set<string>;
  candidateIds: Set<string>;
  kindById: Map<string, PlayerModelTargetKind>;
  directHardPrerequisitesById: Map<string, string[]>;
};

export type TopologicalLayerResult = {
  layers: string[][];
  unresolved: string[];
};

export function buildPlayerModelIndex(playerModel: PlayerModelDoc): PlayerModelIndex {
  const allIds = new Set<string>();
  const candidateIds = new Set<string>();
  const kindById = new Map<string, PlayerModelTargetKind>();
  const directHardPrerequisitesById = new Map<string, string[]>();

  const addItem = (
    id: string,
    kind: PlayerModelTargetKind,
    prerequisites: string[] = [],
    candidate = false,
  ): void => {
    allIds.add(id);
    kindById.set(id, kind);
    if (candidate) {
      candidateIds.add(id);
    }
    directHardPrerequisitesById.set(id, [...new Set(prerequisites)]);
  };

  for (const item of playerModel.facts) {
    addItem(item.id, "fact", item.prerequisites ?? []);
  }
  for (const item of playerModel.constraints) {
    addItem(item.id, "constraint", item.prerequisites ?? []);
  }
  for (const item of playerModel.interactions) {
    addItem(item.id, "interaction", item.prerequisites ?? []);
  }
  for (const item of playerModel.abilities) {
    addItem(item.id, "ability", item.prerequisites, item.kind === "ability_candidate");
  }
  for (const item of playerModel.patterns) {
    addItem(
      item.id,
      "pattern",
      item.required_abilities,
      item.kind === "pattern_candidate",
    );
  }

  return { allIds, candidateIds, kindById, directHardPrerequisitesById };
}

export function getDirectHardPrerequisites(
  index: PlayerModelIndex,
  id: string,
): string[] {
  return index.directHardPrerequisitesById.get(id) ?? [];
}

export function getFormalTargetIds(index: PlayerModelIndex): string[] {
  return [...index.allIds].filter((id) => !index.candidateIds.has(id));
}

export function computeTopologicalLayers(
  index: PlayerModelIndex,
  targetIds: string[] = getFormalTargetIds(index),
): TopologicalLayerResult {
  const remaining = new Set(targetIds);
  const resolved = new Set<string>();
  const layers: string[][] = [];

  while (remaining.size > 0) {
    const layer = [...remaining].filter((id) =>
      getDirectHardPrerequisites(index, id).every(
        (prerequisite) => resolved.has(prerequisite) || !remaining.has(prerequisite),
      ),
    );
    if (layer.length === 0) {
      break;
    }
    layer.sort();
    layers.push(layer);
    for (const id of layer) {
      remaining.delete(id);
      resolved.add(id);
    }
  }

  return {
    layers,
    unresolved: [...remaining].sort(),
  };
}
