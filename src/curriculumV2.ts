import {
  buildPlayerModelIndex,
  computeTopologicalLayers,
  getDirectHardPrerequisites,
} from "./playerModelGraph.js";
import type {
  CurriculumV2Goal,
  CurriculumV2Package,
  PlayerModelTargetKind,
} from "./types.js";

export type CurriculumV2Analysis = {
  prototype: string;
  status: string;
  targetLevelCount?: number;
  formalTargetCount: number;
  plannedGoalCount: number;
  plannedCoverageCount: number;
  formalTargetCounts: Record<string, number>;
  plannedTargetCounts: Record<string, number>;
  assumedRules: string[];
  embeddedBoundaries: string[];
  generatorGuardrails: string[];
  candidateTargets: Array<{
    id: string;
    kind: PlayerModelTargetKind;
  }>;
  openQuestions: string[];
  edges: CurriculumV2Edge[];
  layers: string[][];
  unresolvedLayerTargets: string[];
  goals: CurriculumV2GoalSummary[];
  unplannedFormalTargets: string[];
  blockedGoals: CurriculumV2BlockedGoal[];
};

export type CurriculumV2Edge = {
  from: string;
  to: string;
  toKind: PlayerModelTargetKind;
};

export type CurriculumV2GoalSummary = {
  unitId: string;
  unitTitle: string;
  goalId: string;
  target: string;
  kind: PlayerModelTargetKind;
  roleSequence: string[];
  supportLevel: string;
  hardPrerequisites: string[];
  knownBefore: string[];
  blockedByOpenQuestions: string[];
};

export type CurriculumV2BlockedGoal = {
  goalId: string;
  target: string;
  openQuestions: string[];
};

export function analyzeCurriculumV2Package(pkg: CurriculumV2Package): CurriculumV2Analysis {
  const index = buildPlayerModelIndex(pkg.playerModel);
  const formalTargetIds = [...pkg.curriculumV2.target_policy.formal_targets].sort();
  const goals = flattenGoals(pkg);
  const plannedTargetIds = new Set(goals.map((goal) => goal.target.ref));
  const plannedCoverage = formalTargetIds.filter(
    (id) => plannedTargetIds.has(id),
  );

  const edges: CurriculumV2Edge[] = [];
  for (const to of formalTargetIds) {
    for (const from of getDirectHardPrerequisites(index, to)) {
      edges.push({
        from,
        to,
        toKind: index.kindById.get(to) ?? "fact",
      });
    }
  }
  edges.sort((a, b) => `${a.to}:${a.from}`.localeCompare(`${b.to}:${b.from}`));

  const layerResult = computeTopologicalLayers(index, formalTargetIds);
  const goalSummaries = goals.map((goal) => ({
    unitId: goal.unitId,
    unitTitle: goal.unitTitle,
    goalId: goal.id,
    target: goal.target.ref,
    kind: goal.target.kind,
    roleSequence: goal.role_sequence,
    supportLevel: goal.support_level,
    hardPrerequisites: goal.hard_prerequisites,
    knownBefore: goal.known_before,
    blockedByOpenQuestions: goal.blocked_by_open_questions,
  }));

  return {
    prototype: pkg.mechanic.id,
    status: pkg.curriculumV2.status,
    targetLevelCount: pkg.curriculumV2.target_level_count,
    formalTargetCount: formalTargetIds.length,
    plannedGoalCount: goals.length,
    plannedCoverageCount: plannedCoverage.length,
    formalTargetCounts: countKinds(formalTargetIds, (id) => index.kindById.get(id)),
    plannedTargetCounts: countKinds(goals, (goal) => goal.target.kind),
    assumedRules: pkg.curriculumV2.target_policy.assumed_rules,
    embeddedBoundaries: pkg.curriculumV2.target_policy.embedded_boundaries,
    generatorGuardrails: pkg.curriculumV2.target_policy.generator_guardrails,
    candidateTargets: [...index.candidateIds]
      .sort()
      .map((id) => ({
        id,
        kind: index.kindById.get(id) ?? "fact",
      })),
    openQuestions: pkg.playerModel.derivation.open_questions ?? [],
    edges,
    layers: layerResult.layers,
    unresolvedLayerTargets: layerResult.unresolved,
    goals: goalSummaries,
    unplannedFormalTargets: formalTargetIds.filter(
      (id) => !plannedTargetIds.has(id),
    ),
    blockedGoals: goalSummaries
      .filter((goal) => goal.blockedByOpenQuestions.length > 0)
      .map((goal) => ({
        goalId: goal.goalId,
        target: goal.target,
        openQuestions: goal.blockedByOpenQuestions,
      })),
  };
}

export function formatCurriculumV2Markdown(analysis: CurriculumV2Analysis): string {
  const lines: string[] = [
    `# Curriculum V2: ${analysis.prototype}`,
    "",
    "## Summary",
    "",
    `- Status: ${analysis.status}`,
    `- Target level count: ${analysis.targetLevelCount ?? "none"}`,
    `- Formal curriculum targets: ${analysis.formalTargetCount}`,
    `- Planned learning goals: ${analysis.plannedGoalCount}`,
    `- Planned formal coverage: ${analysis.plannedCoverageCount} / ${analysis.formalTargetCount}`,
    `- Hard prerequisite edges: ${analysis.edges.length}`,
    `- Topological layers: ${analysis.layers.length}`,
    `- Unresolved layer targets: ${analysis.unresolvedLayerTargets.length}`,
    "",
    "## Target Counts",
    "",
    "| Kind | Formal Targets | Planned Goals |",
    "| --- | ---: | ---: |",
    ...allKinds().map(
      (kind) =>
        `| ${kind} | ${analysis.formalTargetCounts[kind] ?? 0} | ${analysis.plannedTargetCounts[kind] ?? 0} |`,
    ),
    "",
    "## Candidate Targets Excluded",
    "",
    ...(analysis.candidateTargets.length > 0
      ? analysis.candidateTargets.map((target) => `- ${target.kind}:${target.id}`)
      : ["- none"]),
    "",
    "## Non-Curricular Targets",
    "",
    `- Assumed rules: ${analysis.assumedRules.length > 0 ? analysis.assumedRules.join(", ") : "none"}`,
    `- Embedded boundaries: ${
      analysis.embeddedBoundaries.length > 0 ? analysis.embeddedBoundaries.join(", ") : "none"
    }`,
    `- Generator guardrails: ${
      analysis.generatorGuardrails.length > 0 ? analysis.generatorGuardrails.join(", ") : "none"
    }`,
    "",
    "## Open Questions",
    "",
    ...(analysis.openQuestions.length > 0
      ? analysis.openQuestions.map((question) => `- ${question}`)
      : ["- none"]),
    "",
    "## Hard Target DAG",
    "",
    ...(analysis.edges.length > 0
      ? [
          "| From | To | To Kind |",
          "| --- | --- | --- |",
          ...analysis.edges.map((edge) => `| ${edge.from} | ${edge.to} | ${edge.toKind} |`),
        ]
      : ["- no hard prerequisite edges"]),
    "",
    "## Topological Layers",
    "",
    ...(analysis.layers.length > 0
      ? analysis.layers.map((layer, index) => `- L${index}: ${layer.join(", ")}`)
      : ["- none"]),
    ...(analysis.unresolvedLayerTargets.length > 0
      ? ["", `Unresolved: ${analysis.unresolvedLayerTargets.join(", ")}`]
      : []),
    "",
    "## Curriculum Goals",
    "",
    "| Unit | Goal | Target | Roles | Support | Hard Prerequisites | Blocked |",
    "| --- | --- | --- | --- | --- | --- | --- |",
    ...analysis.goals.map(
      (goal) =>
        [
          `| ${goal.unitId}`,
          goal.goalId,
          `${goal.kind}:${goal.target}`,
          goal.roleSequence.join(", "),
          goal.supportLevel,
          goal.hardPrerequisites.length > 0 ? goal.hardPrerequisites.join(", ") : "none",
          goal.blockedByOpenQuestions.length > 0 ? goal.blockedByOpenQuestions.join("; ") : "no",
        ].join(" | ") + " |",
    ),
    "",
    "## Coverage Gaps",
    "",
    `- Unplanned formal targets: ${
      analysis.unplannedFormalTargets.length > 0
        ? analysis.unplannedFormalTargets.join(", ")
        : "none"
    }`,
    `- Blocked goals: ${
      analysis.blockedGoals.length > 0
        ? analysis.blockedGoals.map((goal) => `${goal.goalId}:${goal.target}`).join(", ")
        : "none"
    }`,
    "",
  ];

  return `${lines.join("\n")}\n`;
}

function flattenGoals(
  pkg: CurriculumV2Package,
): Array<CurriculumV2Goal & { unitId: string; unitTitle: string }> {
  return pkg.curriculumV2.units.flatMap((unit) =>
    unit.goals.map((goal) => ({
      ...goal,
      unitId: unit.id,
      unitTitle: unit.title,
    })),
  );
}

function countKinds<T>(
  items: T[],
  getKind: (item: T) => PlayerModelTargetKind | undefined,
): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const item of items) {
    const kind = getKind(item);
    if (!kind) {
      continue;
    }
    counts[kind] = (counts[kind] ?? 0) + 1;
  }
  return counts;
}

function allKinds(): PlayerModelTargetKind[] {
  return ["fact", "constraint", "interaction", "ability", "pattern"];
}
