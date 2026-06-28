import type {
  CandidateLevelV2,
  CandidateTraceStep,
  CurriculumV2Goal,
  CurriculumV2Package,
  InputId,
  LevelDoc,
  LevelSpecEventRequirements,
  LevelSpecObjectParticipationRequirement,
  LevelSpecObjectParticipationScope,
  LevelSpecV2,
} from "../core/types.js";
import { solveWithRuntime } from "../core/solver.js";
import { coversEventPatterns } from "../core/events.js";
import { analyzeObjectParticipation } from "../prototypes/objectParticipation.js";
import { getRuntimeAdapter } from "../prototypes/runtimeAdapter.js";

const eventRequirementScopes = [
  "winning_solution",
  "all_shortest_solutions",
  "all_winning_paths",
  "probe_trace",
  "reachable_witness",
] as const;

type EventRequirementScope = (typeof eventRequirementScopes)[number];

export type V2MetricStatus = "pass" | "fail" | "unknown";
export type V2MetricEvidence =
  | "static"
  | "trace"
  | "optimal"
  | "full_graph"
  | "runtime"
  | "unknown";

export type V2Metric = {
  id: string;
  status: V2MetricStatus;
  evidence: V2MetricEvidence;
  reason: string;
};

export type V2SpecEvaluation = {
  specId: string;
  title: string;
  role: string;
  status: "pass" | "fail" | "pending";
  metrics: V2Metric[];
  eventRequirements: string[];
  objectParticipationRequirements: string[];
};

export type V2Evaluation = {
  prototype: string;
  specCount: number;
  candidateBindings: number;
  status: "pass" | "fail" | "pending";
  counts: Record<V2MetricStatus, number>;
  specs: V2SpecEvaluation[];
};

export function evaluateLevelSpecsV2Package(pkg: CurriculumV2Package): V2Evaluation {
  if (!pkg.levelSpecsV2) {
    throw new Error("level_specs_v2.yml not found");
  }

  const goals = new Map(
    pkg.curriculumV2.units.flatMap((unit) => unit.goals.map((goal) => [goal.id, goal])),
  );
  const candidatesBySpec = candidatesBySpecId(pkg);
  const specs = pkg.levelSpecsV2.specs.map((spec) =>
    evaluateSpec(pkg, spec, goals, candidatesBySpec.get(spec.id) ?? []),
  );
  const counts = countMetrics(specs);
  const status = specs.some((spec) => spec.status === "fail")
    ? "fail"
    : specs.some((spec) => spec.status === "pending")
      ? "pending"
      : "pass";

  return {
    prototype: pkg.mechanic.id,
    specCount: pkg.levelSpecsV2.specs.length,
    candidateBindings: [...candidatesBySpec.values()].reduce(
      (sum, candidates) => sum + candidates.length,
      0,
    ),
    status,
    counts,
    specs,
  };
}

function evaluateSpec(
  pkg: CurriculumV2Package,
  spec: LevelSpecV2,
  goals: Map<string, CurriculumV2Goal>,
  candidates: CandidateLevelV2[],
): V2SpecEvaluation {
  const goal = goals.get(spec.primary_goal);
  const candidateRuntimeMetrics =
    candidates.length === 0
      ? [
          pendingRuntimeMetric(
            "solvable",
            "A concrete generated level is required before runtime search can prove solvability.",
          ),
          pendingRuntimeMetric(
            "candidate_player_win_standard",
            "A concrete generated level is required before checking that it did not override the player-facing win condition.",
          ),
          pendingRuntimeMetric(
            "candidate_no_event_win",
            "A concrete generated level is required before checking that no event-win fixture is used.",
          ),
        ]
      : evaluateCandidateRuntimeMetrics(pkg, candidates);
  const metrics: V2Metric[] = [
    {
      id: "spec_schema_and_references_valid",
      status: "pass",
      evidence: "static",
      reason: "The v2 package loader accepted schema and cross-reference validation.",
    },
    evaluatePrimaryGoalBinding(spec, goal),
    evaluateEventRequirementsScoped(spec.evidence_contract.event_requirements),
    evaluateWinContract(spec, pkg.mechanic.win.type),
    evaluateCandidateBinding(candidates.length),
    ...candidateRuntimeMetrics,
    ...evaluateEventRequirementEvidence(pkg, spec.evidence_contract.event_requirements, candidates),
    ...evaluateObjectParticipationEvidence(
      pkg,
      spec.evidence_contract.object_participation_requirements ?? [],
      candidates,
    ),
  ];

  const status = metrics.some((metric) => metric.status === "fail")
    ? "fail"
    : metrics.some((metric) => metric.status === "unknown")
      ? "pending"
      : "pass";

  return {
    specId: spec.id,
    title: spec.title,
    role: spec.role,
    status,
    metrics,
    eventRequirements: formatEventRequirements(spec.evidence_contract.event_requirements),
    objectParticipationRequirements: formatObjectParticipationRequirements(
      spec.evidence_contract.object_participation_requirements ?? [],
    ),
  };
}

function evaluatePrimaryGoalBinding(
  spec: LevelSpecV2,
  goal: CurriculumV2Goal | undefined,
): V2Metric {
  if (!goal) {
    return {
      id: "primary_goal_binding",
      status: "fail",
      evidence: "static",
      reason: `Primary goal '${spec.primary_goal}' is missing from curriculum_v2.`,
    };
  }

  const targetInFocus = spec.focus_targets.some(
    (target) => target.kind === goal.target.kind && target.ref === goal.target.ref,
  );
  const targetInLearningState = [
    ...spec.introduces,
    ...spec.practices,
    ...spec.assesses,
  ].includes(goal.target.ref);

  if (targetInFocus && targetInLearningState) {
    return {
      id: "primary_goal_binding",
      status: "pass",
      evidence: "static",
      reason: "Primary curriculum target is present in focus targets and learning-state fields.",
    };
  }

  return {
    id: "primary_goal_binding",
    status: "fail",
    evidence: "static",
    reason: "Primary curriculum target is not explicitly bound to focus and learning-state fields.",
  };
}

function evaluateEventRequirementsScoped(
  requirements: LevelSpecEventRequirements,
): V2Metric {
  const entries = getEventRequirementEntries(requirements);
  if (entries.length === 0) {
    return {
      id: "event_requirements_scoped",
      status: "fail",
      evidence: "static",
      reason: "No scoped event requirement is declared, so target-on-path evidence has no executable event predicate.",
    };
  }

  const emptyScopes = entries.filter(
    ([, requirement]) =>
      (requirement.required ?? []).length === 0 && (requirement.forbidden ?? []).length === 0,
  );
  if (emptyScopes.length > 0) {
    return {
      id: "event_requirements_scoped",
      status: "fail",
      evidence: "static",
      reason: `Empty event requirement scopes: ${emptyScopes.map(([scope]) => scope).join(", ")}.`,
    };
  }

  return {
    id: "event_requirements_scoped",
    status: "pass",
    evidence: "static",
    reason: "Every event requirement is scoped and has at least one required or forbidden event.",
  };
}

function evaluateWinContract(spec: LevelSpecV2, defaultWinType: string): V2Metric {
  if (spec.generation_contract.win_condition !== "prototype_default") {
    return {
      id: "declares_player_win_standard",
      status: "fail",
      evidence: "static",
      reason: "Spec requests a custom win condition; this must be confirmed before accepted-level generation.",
    };
  }

  if (defaultWinType === "event") {
    return {
      id: "declares_player_win_standard",
      status: "fail",
      evidence: "static",
      reason: "Prototype default win condition is event-based, but the confirmed player-facing standard must not be event-win.",
    };
  }

  return {
    id: "declares_player_win_standard",
    status: "pass",
    evidence: "static",
    reason: `Spec uses prototype default win condition '${defaultWinType}'.`,
  };
}

function evaluateCandidateBinding(candidateCount: number): V2Metric {
  if (candidateCount === 0) {
    return {
      id: "candidate_bound_to_spec",
      status: "unknown",
      evidence: "unknown",
      reason: "No generated candidate level is bound to this spec yet.",
    };
  }

  return {
    id: "candidate_bound_to_spec",
    status: "pass",
    evidence: "static",
    reason: `${candidateCount} generated candidate level(s) reference this spec.`,
  };
}

function evaluateCandidateRuntimeMetrics(
  pkg: CurriculumV2Package,
  candidates: CandidateLevelV2[],
): V2Metric[] {
  const adapter = getRuntimeAdapter(pkg.mechanic);
  const runtime = adapter.createRuntime(pkg.mechanic);
  const solved = candidates
    .map((candidate) => ({
      candidate,
      solution: solveWithRuntime(runtime, adapter.parseLevel(toLevelDoc(candidate)), {
        winCondition: pkg.mechanic.win,
        maxStates: 100_000,
        maxDepth: 120,
      }),
    }))
    .filter((result) => result.solution.found);

  return [
    {
      id: "solvable",
      status: solved.length > 0 ? "pass" : "fail",
      evidence: solved.length > 0 ? "optimal" : "unknown",
      reason:
        solved.length > 0
          ? `Solver found a player-facing winning path for ${solved.length} candidate(s).`
          : "No bound candidate was solved within the runtime budget.",
    },
    {
      id: "candidate_player_win_standard",
      status: "pass",
      evidence: "static",
      reason: "Candidate v2 format does not allow per-candidate win-condition overrides yet.",
    },
    {
      id: "candidate_no_event_win",
      status: "pass",
      evidence: "static",
      reason: "Candidate v2 format has no event-win fixture field.",
    },
  ];
}

function evaluateEventRequirementEvidence(
  pkg: CurriculumV2Package,
  requirements: LevelSpecEventRequirements,
  candidates: CandidateLevelV2[],
): V2Metric[] {
  return getEventRequirementEntries(requirements).map(([scope, requirement]) => ({
    id: `event_requirement:${scope}`,
    status: evaluateScopedEventRequirement(pkg, candidates, scope, requirement).status,
    evidence: evidenceNeededForScope(scope),
    reason: evaluateScopedEventRequirement(pkg, candidates, scope, requirement).reason,
  }));
}

function evaluateObjectParticipationEvidence(
  pkg: CurriculumV2Package,
  requirements: LevelSpecObjectParticipationRequirement[],
  candidates: CandidateLevelV2[],
): V2Metric[] {
  return requirements.map((requirement, index) => {
    const result = evaluateScopedObjectParticipation(pkg, candidates, requirement);
    return {
      id: `object_participation:${index + 1}:${requirement.scope}`,
      status: result.status,
      evidence: evidenceNeededForObjectParticipationScope(requirement.scope),
      reason: result.reason,
    };
  });
}

function evaluateScopedObjectParticipation(
  pkg: CurriculumV2Package,
  candidates: CandidateLevelV2[],
  requirement: LevelSpecObjectParticipationRequirement,
): Pick<V2Metric, "status" | "reason"> {
  if (candidates.length === 0) {
    return {
      status: "unknown",
      reason: `${formatObjectParticipationRequirement(requirement)} requires ${formulaForObjectParticipationScope(requirement.scope)}, but no candidate is bound to the spec.`,
    };
  }

  if (requirement.scope === "winning_solution") {
    const adapter = getRuntimeAdapter(pkg.mechanic);
    const runtime = adapter.createRuntime(pkg.mechanic);
    const solved = candidates
      .map((candidate) => ({
        candidate,
        solution: solveWithRuntime(runtime, adapter.parseLevel(toLevelDoc(candidate)), {
          winCondition: pkg.mechanic.win,
          maxStates: 100_000,
          maxDepth: 120,
        }),
      }))
      .filter((result) => result.solution.found);

    const covering = solved.find((result) =>
      coversObjectParticipation(pkg.mechanic.id, result.solution.events, requirement),
    );
    if (covering) {
      return {
        status: "pass",
        reason: `${covering.candidate.id} canonical winning solution satisfies ${formatObjectParticipationRequirement(requirement)}.`,
      };
    }
    return {
      status: solved.length === 0 ? "unknown" : "fail",
      reason:
        solved.length === 0
          ? "No solved candidate is available for canonical winning-solution object participation checking."
          : `No solved candidate canonical winning solution satisfies ${formatObjectParticipationRequirement(requirement)}.`,
    };
  }

  if (requirement.scope === "probe_trace") {
    const covering = candidates.find((candidate) => {
      const replay = replayCandidateTrace(pkg, candidate, candidate.probe_trace ?? [], {
        allowIllegal: true,
      });
      return replay.tracePresent && coversObjectParticipation(pkg.mechanic.id, replay.events, requirement);
    });
    if (covering) {
      return {
        status: "pass",
        reason: `${covering.id} probe trace satisfies ${formatObjectParticipationRequirement(requirement)}.`,
      };
    }
    return {
      status: "fail",
      reason: `No candidate probe trace satisfies ${formatObjectParticipationRequirement(requirement)}.`,
    };
  }

  return {
    status: "unknown",
    reason: `${formatObjectParticipationRequirement(requirement)} requires ${formulaForObjectParticipationScope(requirement.scope)}. Object-participation product graph checking is not implemented yet.`,
  };
}

function evaluateScopedEventRequirement(
  pkg: CurriculumV2Package,
  candidates: CandidateLevelV2[],
  scope: EventRequirementScope,
  requirement: {
    required?: string[];
    forbidden?: string[];
  },
): Pick<V2Metric, "status" | "reason"> {
  if (candidates.length === 0) {
    return {
      status: "unknown",
      reason: `${formatRequirement(requirement)} requires ${formulaForScope(scope)}, but no candidate is bound to the spec.`,
    };
  }

  if (scope === "winning_solution") {
    const adapter = getRuntimeAdapter(pkg.mechanic);
    const runtime = adapter.createRuntime(pkg.mechanic);
    const solved = candidates
      .map((candidate) => ({
        candidate,
        solution: solveWithRuntime(runtime, adapter.parseLevel(toLevelDoc(candidate)), {
          winCondition: pkg.mechanic.win,
          maxStates: 100_000,
          maxDepth: 120,
        }),
      }))
      .filter((result) => result.solution.found);
    const covering = solved.find((result) => coversEvents(result.solution.events, requirement));
    if (covering) {
      return {
        status: "pass",
        reason: `${covering.candidate.id} canonical winning solution satisfies ${formatRequirement(requirement)}.`,
      };
    }
    return {
      status: solved.length === 0 ? "unknown" : "fail",
      reason:
        solved.length === 0
          ? "No solved candidate is available for canonical winning-solution event checking."
          : `No solved candidate canonical winning solution satisfies ${formatRequirement(requirement)}.`,
    };
  }

  if (scope === "probe_trace") {
    const covering = candidates.find((candidate) => {
      const replay = replayCandidateTrace(pkg, candidate, candidate.probe_trace ?? [], {
        allowIllegal: true,
      });
      return replay.tracePresent && coversEvents(replay.events, requirement);
    });
    if (covering) {
      return {
        status: "pass",
        reason: `${covering.id} probe trace satisfies ${formatRequirement(requirement)}.`,
      };
    }
    return {
      status: "fail",
      reason: `No candidate probe trace satisfies ${formatRequirement(requirement)}.`,
    };
  }

  return {
    status: "unknown",
    reason: `${formatRequirement(requirement)} requires ${formulaForScope(scope)}.`,
  };
}

function pendingRuntimeMetric(id: string, reason: string): V2Metric {
  return {
    id,
    status: "unknown",
    evidence: "unknown",
    reason,
  };
}

function evidenceNeededForScope(scope: EventRequirementScope): V2MetricEvidence {
  switch (scope) {
    case "winning_solution":
      return "trace";
    case "all_shortest_solutions":
      return "optimal";
    case "all_winning_paths":
      return "full_graph";
    case "probe_trace":
      return "trace";
    case "reachable_witness":
      return "runtime";
  }
}

function evidenceNeededForObjectParticipationScope(
  scope: LevelSpecObjectParticipationScope,
): V2MetricEvidence {
  switch (scope) {
    case "winning_solution":
      return "trace";
    case "all_shortest_solutions":
      return "optimal";
    case "all_winning_paths":
      return "full_graph";
    case "probe_trace":
      return "trace";
  }
}

function formulaForScope(scope: EventRequirementScope): string {
  switch (scope) {
    case "winning_solution":
      return "the canonical winning solution trace to satisfy the event predicate";
    case "all_shortest_solutions":
      return "a complete shortest-path product search proving no optimal bypass";
    case "all_winning_paths":
      return "a complete product graph proving no winning bypass";
    case "probe_trace":
      return "a replayed probe trace satisfying the event predicate";
    case "reachable_witness":
      return "a reachability search finding at least one trace satisfying the event predicate";
  }
}

function formulaForObjectParticipationScope(scope: LevelSpecObjectParticipationScope): string {
  switch (scope) {
    case "winning_solution":
      return "the canonical winning solution trace to satisfy the object participation predicate";
    case "all_shortest_solutions":
      return "a complete shortest-path product search proving no optimal participation bypass";
    case "all_winning_paths":
      return "a complete product graph proving no winning participation bypass";
    case "probe_trace":
      return "a replayed probe trace satisfying the object participation predicate";
  }
}

function formatRequirement(requirement: {
  required?: string[];
  forbidden?: string[];
}): string {
  const parts: string[] = [];
  if (requirement.required && requirement.required.length > 0) {
    parts.push(`required=[${requirement.required.join(", ")}]`);
  }
  if (requirement.forbidden && requirement.forbidden.length > 0) {
    parts.push(`forbidden=[${requirement.forbidden.join(", ")}]`);
  }
  return parts.join(" ");
}

function formatObjectParticipationRequirement(
  requirement: LevelSpecObjectParticipationRequirement,
): string {
  return [
    `object=${requirement.object_type}`,
    `role=${requirement.role}`,
    `min_distinct=${requirement.min_distinct_instances}`,
    ...(requirement.event_type ? [`event_type=${requirement.event_type}`] : []),
  ].join(" ");
}

function getEventRequirementEntries(
  requirements: LevelSpecEventRequirements,
): Array<[EventRequirementScope, NonNullable<LevelSpecEventRequirements[EventRequirementScope]>]> {
  return eventRequirementScopes.flatMap((scope) => {
    const requirement = requirements[scope];
    return requirement ? [[scope, requirement]] : [];
  });
}

function formatEventRequirements(requirements: LevelSpecEventRequirements): string[] {
  return getEventRequirementEntries(requirements).map(
    ([scope, requirement]) => `${scope}: ${formatRequirement(requirement)}`,
  );
}

function formatObjectParticipationRequirements(
  requirements: LevelSpecObjectParticipationRequirement[],
): string[] {
  return requirements.map(
    (requirement) => `${requirement.scope}: ${formatObjectParticipationRequirement(requirement)}`,
  );
}

function candidatesBySpecId(pkg: CurriculumV2Package): Map<string, CandidateLevelV2[]> {
  const candidates = new Map<string, CandidateLevelV2[]>();
  for (const candidate of pkg.candidatesV2?.candidates ?? []) {
    const existing = candidates.get(candidate.spec_id) ?? [];
    existing.push(candidate);
    candidates.set(candidate.spec_id, existing);
  }
  return candidates;
}

function countMetrics(specs: V2SpecEvaluation[]): Record<V2MetricStatus, number> {
  const counts: Record<V2MetricStatus, number> = {
    pass: 0,
    fail: 0,
    unknown: 0,
  };
  for (const metric of specs.flatMap((spec) => spec.metrics)) {
    counts[metric.status] += 1;
  }
  return counts;
}

function toLevelDoc(candidate: CandidateLevelV2): LevelDoc {
  return {
    id: candidate.id,
    title: candidate.title,
    role: "mechanic_witness",
    status: "candidate",
    targets: [candidate.spec_id],
    known_before: [],
    target_learning: [candidate.spec_id],
    support_level: "high",
    expected_solver_evidence: ["solvable"],
    expected_llm_player_evidence: [],
    layout: candidate.layout,
  };
}

function replayCandidateTrace(
  pkg: CurriculumV2Package,
  candidate: CandidateLevelV2,
  trace: CandidateTraceStep[],
  options: {
    allowIllegal?: boolean;
  } = {},
): {
  tracePresent: boolean;
  events: string[];
} {
  const adapter = getRuntimeAdapter(pkg.mechanic);
  let state = adapter.parseLevel(toLevelDoc(candidate));
  const events: string[] = [];
  for (const traceStep of trace) {
    const result = adapter.step(pkg.mechanic, state, traceStep.input as InputId, {
      winCondition: pkg.mechanic.win,
    });
    events.push(...result.events);
    if (result.legal) {
      state = result.state;
    } else if (!options.allowIllegal) {
      break;
    }
  }
  return {
    tracePresent: trace.length > 0,
    events,
  };
}

function coversEvents(
  events: string[],
  requirement: {
    required?: string[];
    forbidden?: string[];
  },
): boolean {
  return coversEventPatterns(events, requirement.required ?? [], requirement.forbidden ?? []);
}

function coversObjectParticipation(
  mechanicId: string,
  events: string[],
  requirement: LevelSpecObjectParticipationRequirement,
): boolean {
  return analyzeObjectParticipation(mechanicId, events).some(
    (summary) =>
      summary.objectType === requirement.object_type &&
      summary.role === requirement.role &&
      (requirement.event_type === undefined || summary.eventType === requirement.event_type) &&
      summary.distinctInstances.length >= requirement.min_distinct_instances,
  );
}

export function formatEvaluationV2Markdown(evaluation: V2Evaluation): string {
  const lines: string[] = [
    `# Evaluation V2: ${evaluation.prototype}`,
    "",
    "## Summary",
    "",
    `- Status: ${evaluation.status}`,
    `- Specs: ${evaluation.specCount}`,
    `- Candidate bindings: ${evaluation.candidateBindings}`,
    `- Metric pass: ${evaluation.counts.pass}`,
    `- Metric fail: ${evaluation.counts.fail}`,
    `- Metric unknown: ${evaluation.counts.unknown}`,
    "",
    "## Spec Gate Summary",
    "",
    "| Spec | Role | Status | Static Failures | Pending Runtime Metrics | Event Requirements | Object Participation |",
    "| --- | --- | --- | ---: | ---: | --- | --- |",
    ...evaluation.specs.map((spec) => {
      const staticFailures = spec.metrics.filter(
        (metric) => metric.status === "fail" && metric.evidence === "static",
      ).length;
      const pendingRuntime = spec.metrics.filter((metric) => metric.status === "unknown").length;
      return [
        `| ${spec.specId}`,
        spec.role,
        spec.status,
        String(staticFailures),
        String(pendingRuntime),
        spec.eventRequirements.join("; "),
        spec.objectParticipationRequirements.length > 0
          ? spec.objectParticipationRequirements.join("; ")
          : "none",
      ].join(" | ") + " |";
    }),
    "",
    "## Pending Runtime Evidence",
    "",
    ...evaluation.specs.flatMap((spec) => {
      const unknown = spec.metrics.filter((metric) => metric.status === "unknown");
      if (unknown.length === 0) {
        return [`- ${spec.specId}: none`];
      }
      return unknown.map(
        (metric) => `- ${spec.specId} ${metric.id} (${metric.evidence}): ${metric.reason}`,
      );
    }),
    "",
  ];

  return `${lines.join("\n")}\n`;
}
