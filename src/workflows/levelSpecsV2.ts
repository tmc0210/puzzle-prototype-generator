import type {
  CurriculumV2Package,
  LevelSpecV2,
} from "../core/types.js";

export type LevelSpecsV2Analysis = {
  prototype: string;
  status: string;
  targetLevelCount?: number;
  specCount: number;
  curriculumGoalCount: number;
  coveredGoalCount: number;
  roleCounts: Record<string, number>;
  objectiveCounts: Record<string, number>;
  graphScopeCounts: Record<string, number>;
  specs: LevelSpecV2Summary[];
  uncoveredGoals: string[];
  blockedSpecs: Array<{
    specId: string;
    openQuestions: string[];
  }>;
};

export type LevelSpecV2Summary = {
  id: string;
  title: string;
  status: string;
  primaryGoal: string;
  secondaryGoals: string[];
  role: string;
  objective: string;
  focusTargets: string[];
  introduces: string[];
  practices: string[];
  assesses: string[];
  solverEvidence: string[];
  llmPlayerEvidence: string[];
  graphScope: string;
  eventRequirements: string[];
  objectParticipationRequirements: string[];
};

export function analyzeLevelSpecsV2Package(pkg: CurriculumV2Package): LevelSpecsV2Analysis {
  if (!pkg.levelSpecsV2) {
    throw new Error("level_specs_v2.yml not found");
  }

  const curriculumGoalIds = new Set(
    pkg.curriculumV2.units.flatMap((unit) => unit.goals.map((goal) => goal.id)),
  );
  const coveredGoalIds = new Set<string>();
  const roleCounts: Record<string, number> = {};
  const objectiveCounts: Record<string, number> = {};
  const graphScopeCounts: Record<string, number> = {};

  const specs = pkg.levelSpecsV2.specs.map((spec) => {
    coveredGoalIds.add(spec.primary_goal);
    for (const goalId of spec.secondary_goals ?? []) {
      coveredGoalIds.add(goalId);
    }
    roleCounts[spec.role] = (roleCounts[spec.role] ?? 0) + 1;
    objectiveCounts[spec.generation_contract.objective] =
      (objectiveCounts[spec.generation_contract.objective] ?? 0) + 1;
    graphScopeCounts[spec.evidence_contract.graph_scope] =
      (graphScopeCounts[spec.evidence_contract.graph_scope] ?? 0) + 1;

    return summarizeSpec(spec);
  });

  return {
    prototype: pkg.mechanic.id,
    status: pkg.levelSpecsV2.status,
    targetLevelCount: pkg.levelSpecsV2.target_level_count,
    specCount: pkg.levelSpecsV2.specs.length,
    curriculumGoalCount: curriculumGoalIds.size,
    coveredGoalCount: [...coveredGoalIds].filter((goalId) => curriculumGoalIds.has(goalId)).length,
    roleCounts,
    objectiveCounts,
    graphScopeCounts,
    specs,
    uncoveredGoals: [...curriculumGoalIds].filter((goalId) => !coveredGoalIds.has(goalId)),
    blockedSpecs: pkg.levelSpecsV2.specs
      .filter((spec) => spec.blocked_by_open_questions.length > 0)
      .map((spec) => ({
        specId: spec.id,
        openQuestions: spec.blocked_by_open_questions,
      })),
  };
}

export function formatLevelSpecsV2Markdown(analysis: LevelSpecsV2Analysis): string {
  const lines: string[] = [
    `# Level Specs V2: ${analysis.prototype}`,
    "",
    "## Summary",
    "",
    `- Status: ${analysis.status}`,
    `- Specs: ${analysis.specCount}${analysis.targetLevelCount ? ` / ${analysis.targetLevelCount}` : ""}`,
    `- Curriculum goals covered: ${analysis.coveredGoalCount} / ${analysis.curriculumGoalCount}`,
    `- Uncovered goals: ${analysis.uncoveredGoals.length}`,
    `- Blocked specs: ${analysis.blockedSpecs.length}`,
    "",
    "## Role Counts",
    "",
    ...formatCounts(analysis.roleCounts),
    "",
    "## Objective Counts",
    "",
    ...formatCounts(analysis.objectiveCounts),
    "",
    "## Graph Scope Counts",
    "",
    ...formatCounts(analysis.graphScopeCounts),
    "",
    "## Specs",
    "",
    "| Spec | Role | Objective | Focus Targets | Introduces | Practices | Assesses | Graph |",
    "| --- | --- | --- | --- | --- | --- | --- | --- |",
    ...analysis.specs.map(
      (spec) =>
        [
          `| ${spec.id}`,
          spec.role,
          spec.objective,
          spec.focusTargets.join(", "),
          spec.introduces.length > 0 ? spec.introduces.join(", ") : "none",
          spec.practices.length > 0 ? spec.practices.join(", ") : "none",
          spec.assesses.length > 0 ? spec.assesses.join(", ") : "none",
          spec.graphScope,
        ].join(" | ") + " |",
    ),
    "",
    "## Evidence Summary",
    "",
    "| Spec | Solver Evidence | LLM Player Evidence | Event Requirements | Object Participation |",
    "| --- | --- | --- | --- | --- |",
    ...analysis.specs.map(
      (spec) =>
        [
          `| ${spec.id}`,
          spec.solverEvidence.length > 0 ? spec.solverEvidence.join(", ") : "none",
          spec.llmPlayerEvidence.length > 0 ? spec.llmPlayerEvidence.join(", ") : "none",
          spec.eventRequirements.length > 0 ? spec.eventRequirements.join("; ") : "none",
          spec.objectParticipationRequirements.length > 0
            ? spec.objectParticipationRequirements.join("; ")
            : "none",
        ].join(" | ") + " |",
    ),
    "",
    "## Coverage Gaps",
    "",
    `- Uncovered curriculum goals: ${
      analysis.uncoveredGoals.length > 0 ? analysis.uncoveredGoals.join(", ") : "none"
    }`,
    `- Blocked specs: ${
      analysis.blockedSpecs.length > 0
        ? analysis.blockedSpecs.map((spec) => spec.specId).join(", ")
        : "none"
    }`,
    "",
  ];

  return `${lines.join("\n")}\n`;
}

function summarizeSpec(spec: LevelSpecV2): LevelSpecV2Summary {
  return {
    id: spec.id,
    title: spec.title,
    status: spec.status,
    primaryGoal: spec.primary_goal,
    secondaryGoals: spec.secondary_goals ?? [],
    role: spec.role,
    objective: spec.generation_contract.objective,
    focusTargets: spec.focus_targets.map((target) => `${target.kind}:${target.ref}`),
    introduces: spec.introduces,
    practices: spec.practices,
    assesses: spec.assesses,
    solverEvidence: spec.evidence_contract.solver,
    llmPlayerEvidence: spec.evidence_contract.llm_player,
    graphScope: spec.evidence_contract.graph_scope,
    eventRequirements: formatEventRequirements(spec.evidence_contract.event_requirements),
    objectParticipationRequirements: formatObjectParticipationRequirements(
      spec.evidence_contract.object_participation_requirements ?? [],
    ),
  };
}

function formatEventRequirements(
  requirements: LevelSpecV2["evidence_contract"]["event_requirements"],
): string[] {
  return Object.entries(requirements).flatMap(([scope, requirement]) => {
    const parts: string[] = [];
    if (requirement.required && requirement.required.length > 0) {
      parts.push(`${scope}.required=${requirement.required.join("+")}`);
    }
    if (requirement.forbidden && requirement.forbidden.length > 0) {
      parts.push(`${scope}.forbidden=${requirement.forbidden.join("+")}`);
    }
    return parts;
  });
}

function formatObjectParticipationRequirements(
  requirements: NonNullable<LevelSpecV2["evidence_contract"]["object_participation_requirements"]>,
): string[] {
  return requirements.map((requirement) =>
    [
      `${requirement.scope}.object=${requirement.object_type}`,
      `role=${requirement.role}`,
      `min=${requirement.min_distinct_instances}`,
      ...(requirement.event_type ? [`event=${requirement.event_type}`] : []),
    ].join(" "),
  );
}

function formatCounts(counts: Record<string, number>): string[] {
  const entries = Object.entries(counts).sort(([a], [b]) => a.localeCompare(b));
  return entries.length > 0
    ? entries.map(([key, count]) => `- ${key}: ${count}`)
    : ["- none"];
}
