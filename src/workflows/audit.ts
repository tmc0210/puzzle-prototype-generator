import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { evaluatePackage } from "./evaluator.js";
import {
  buildPlayerModelIndex,
  computeTopologicalLayers,
  getDirectHardPrerequisites,
} from "../core/playerModelGraph.js";
import type { CurriculumDoc, PrototypePackage } from "../core/types.js";

export type PrototypeAudit = {
  prototype: string;
  levelCount: number;
  targetLevelCount?: number;
  acceptedLevels: number;
  passedLevels: number;
  certifiedLevels: number;
  failedLevels: string[];
  warningLevels: string[];
  knowledgeCount: number;
  coveredKnowledge: number;
  uncoveredKnowledge: string[];
  roleCounts: Record<string, number>;
  costCurve: Array<{
    id: string;
    role: string;
    cost?: number;
    exploredStates: number;
    graphStatus?: string;
    reachableStates?: number;
  }>;
  curriculumGoals: CurriculumGoalAudit[];
  artifacts: Array<{ path: string; exists: boolean; label: string }>;
  webPlayableVersionedAssets: boolean;
  playerWinStandard: string;
  formalWinViolations: FormalWinViolation[];
  qualityScorerImplemented: boolean;
  informalSemantics: InformalSemanticsAudit[];
  eventWinLevels: EventWinAudit[];
  roleContractIssues: RoleContractIssue[];
  playerModel?: PlayerModelAudit;
  curriculumV2?: CurriculumV2Audit;
  complete: boolean;
  notes: string[];
  advisoryNotes: string[];
};

export type CurriculumGoalAudit = {
  trackId: string;
  knowledge: string[];
  roles: string[];
  targetCount: number;
  passedCount: number;
  passedLevels: string[];
  ok: boolean;
};

export type InformalSemanticsAudit = {
  knowledgeId: string;
  traceCondition?: string;
  notes?: string;
};

export type EventWinAudit = {
  levelId: string;
  role: string;
  event?: string;
};

export type FormalWinViolation = {
  levelId: string;
  role: string;
  winType: string;
};

export type RoleContractIssue = {
  levelId: string;
  role: string;
  severity: "error" | "warning";
  message: string;
};

export type PlayerModelAudit = {
  exists: boolean;
  referenceStatus: "ok";
  factCount: number;
  constraintCount: number;
  interactionCount: number;
  abilityCount: number;
  patternCount: number;
  abilityCandidateCount: number;
  patternCandidateCount: number;
  openQuestions: string[];
  candidateRefs: string[];
};

export type CurriculumV2Audit = {
  exists: boolean;
  status: string;
  unitCount: number;
  goalCount: number;
  targetCounts: Record<string, number>;
  roleCounts: Record<string, number>;
  assumedKnown: string[];
  targetLayers: string[][];
  unresolvedLayerTargets: string[];
  orderingIssues: CurriculumV2OrderingIssue[];
  blockedGoals: Array<{
    goalId: string;
    target: string;
    openQuestions: string[];
  }>;
};

export type CurriculumV2OrderingIssue = {
  goalId: string;
  target: string;
  severity: "error" | "warning";
  message: string;
};

export function auditPrototype(
  pkg: PrototypePackage,
  curriculum: CurriculumDoc = pkg.curriculum,
): PrototypeAudit {
  const results = evaluatePackage(pkg);
  const resultByLevel = new Map(results.map((result) => [result.levelId, result]));
  const playerWinStandard = pkg.mechanic.win.type;
  const acceptedLevels = pkg.levels.levels.filter((level) => level.status === "accepted").length;
  const passedLevels = results.filter((result) => result.status === "pass").length;
  const isCertifiedLevel = (level: PrototypePackage["levels"]["levels"][number]): boolean =>
    level.status === "accepted" &&
    resultByLevel.get(level.id)?.status === "pass" &&
    (level.win ?? pkg.mechanic.win).type === playerWinStandard;
  const certifiedLevels = pkg.levels.levels.filter(isCertifiedLevel).length;
  const failedLevels = results
    .filter((result) => result.status === "fail")
    .map((result) => result.levelId);
  const warningLevels = results
    .filter((result) => result.status === "warning")
    .map((result) => result.levelId);

  const roleCounts: Record<string, number> = {};
  for (const level of pkg.levels.levels) {
    roleCounts[level.role] = (roleCounts[level.role] ?? 0) + 1;
  }

  const uncoveredKnowledge = pkg.knowledge.knowledge
    .filter((item) => {
      const targetLevels = pkg.levels.levels.filter((level) => level.targets.includes(item.id));
      return (
        targetLevels.length === 0 ||
        !targetLevels.some((level) => isCertifiedLevel(level))
      );
    })
    .map((item) => item.id);

  const curriculumGoals = curriculum.tracks.flatMap((track) =>
    track.goals.map((goal) => {
      const targetCount = goal.count ?? 1;
      const passedLevels = pkg.levels.levels
        .filter((level) => {
          const levelResult = resultByLevel.get(level.id);
          return (
            levelResult?.status === "pass" &&
            isCertifiedLevel(level) &&
            goal.knowledge.every((knowledgeId) => level.targets.includes(knowledgeId)) &&
            goal.roles.includes(level.role)
          );
        })
        .map((level) => level.id);
      return {
        trackId: track.id,
        knowledge: goal.knowledge,
        roles: goal.roles,
        targetCount,
        passedCount: passedLevels.length,
        passedLevels,
        ok: passedLevels.length >= targetCount,
      };
    }),
  );

  const artifacts = [
    { label: "runtime report", path: "reports/evaluation.json" },
    { label: "web playable", path: "playable/index.html" },
    { label: "web playable data", path: "playable/data.json" },
    { label: "PuzzleScript Next export", path: "game.ps" },
  ].map((artifact) => ({
    ...artifact,
    exists: existsSync(path.join(pkg.root, artifact.path)),
  }));

  const webPlayableVersionedAssets = hasVersionedPlayableAssets(pkg.root);
  const formalWinViolations = pkg.levels.levels
    .filter((level) => level.status === "accepted")
    .filter((level) => (level.win ?? pkg.mechanic.win).type !== playerWinStandard)
    .map((level) => ({
      levelId: level.id,
      role: level.role,
      winType: (level.win ?? pkg.mechanic.win).type,
    }));
  const qualityScorerImplemented = false;
  const informalSemantics = pkg.knowledge.knowledge
    .filter((item) => item.informal_semantics)
    .map((item) => ({
      knowledgeId: item.id,
      traceCondition: item.informal_semantics?.trace_condition,
      notes: item.informal_semantics?.notes,
    }));
  const eventWinLevels = pkg.levels.levels
    .filter((level) => (level.win ?? pkg.mechanic.win).type === "event_occurs")
    .map((level) => ({
      levelId: level.id,
      role: level.role,
      event: (level.win ?? pkg.mechanic.win).event,
    }));
  const roleContractIssues = analyzeRoleContracts(pkg);
  const playerModel = auditPlayerModel(pkg);
  const curriculumV2 = auditCurriculumV2(pkg);
  const targetLevelCount = curriculum?.target_level_count;
  const notes: string[] = [];
  const advisoryNotes: string[] = [];
  if (!qualityScorerImplemented) {
    notes.push("Quality scorer is not implemented; evaluator only checks runtime reachability and event coverage.");
  }
  notes.push(
    "Knowledge and curriculum coverage count only certified levels: status accepted, evaluator pass, and matching player-facing win standard.",
  );
  if (formalWinViolations.length > 0) {
    notes.push(
      `${formalWinViolations.length} accepted level(s) override the player-facing win standard '${playerWinStandard}'.`,
    );
  }
  if (informalSemantics.length > 0) {
    advisoryNotes.push(
      `${informalSemantics.length} knowledge item(s) include informal semantics; these do not participate in evaluator proof.`,
    );
  }
  if (eventWinLevels.length > 0) {
    advisoryNotes.push(
      `${eventWinLevels.length} level(s) use event_occurs win conditions; these are fixture witnesses. Accepted player-facing levels must use '${playerWinStandard}' unless the prototype spec changes.`,
    );
  }
  const roleContractErrors = roleContractIssues.filter((issue) => issue.severity === "error");
  const roleContractWarnings = roleContractIssues.filter((issue) => issue.severity === "warning");
  if (roleContractErrors.length > 0) {
    notes.push(`${roleContractErrors.length} role contract error(s) found; see Level Role Contracts.`);
  }
  if (roleContractWarnings.length > 0) {
    advisoryNotes.push(
      `${roleContractWarnings.length} role contract warning(s) found; see Level Role Contracts.`,
    );
  }
  if (playerModel?.exists) {
    advisoryNotes.push(
      `Player model present: ${playerModel.factCount} facts, ${playerModel.constraintCount} constraints, ${playerModel.interactionCount} interactions, ${playerModel.abilityCount} abilities, ${playerModel.patternCount} patterns.`,
    );
    if (playerModel.abilityCandidateCount > 0 || playerModel.patternCandidateCount > 0) {
      advisoryNotes.push(
        `Player model has ${playerModel.abilityCandidateCount} ability candidate(s) and ${playerModel.patternCandidateCount} pattern candidate(s); candidates should not be used as formal curriculum targets without confirmation.`,
      );
    }
    if (playerModel.openQuestions.length > 0) {
      advisoryNotes.push(
        `Player model has ${playerModel.openQuestions.length} open question(s) that may block future runtime or curriculum generalization.`,
      );
    }
  }
  if (curriculumV2?.exists) {
    advisoryNotes.push(
      `Curriculum v2 present: ${curriculumV2.unitCount} units, ${curriculumV2.goalCount} learning goals.`,
    );
    if (curriculumV2.orderingIssues.length > 0) {
      advisoryNotes.push(
        `Curriculum v2 has ${curriculumV2.orderingIssues.length} ordering issue(s); see Curriculum V2.`,
      );
    }
    if (curriculumV2.blockedGoals.length > 0) {
      advisoryNotes.push(
        `Curriculum v2 has ${curriculumV2.blockedGoals.length} goal(s) blocked by open question(s).`,
      );
    }
  }
  if (targetLevelCount !== undefined && pkg.levels.levels.length < targetLevelCount) {
    notes.push(`Level count is below curriculum target ${targetLevelCount}.`);
  }
  if (acceptedLevels !== pkg.levels.levels.length) {
    notes.push("Not all levels are accepted.");
  }
  if (passedLevels !== pkg.levels.levels.length) {
    notes.push("Not all levels pass evaluator.");
  }
  if (uncoveredKnowledge.length > 0) {
    notes.push(`Uncovered knowledge: ${uncoveredKnowledge.join(", ")}.`);
  }
  for (const artifact of artifacts) {
    if (!artifact.exists) {
      notes.push(`Missing ${artifact.label}: ${artifact.path}.`);
    }
  }
  if (!webPlayableVersionedAssets) {
    notes.push("Web playable does not use versioned app/style/data asset URLs.");
  }

  const curriculumGaps = curriculumGoals.filter((goal) => !goal.ok);
  if (curriculumGaps.length > 0) {
    notes.push(`${curriculumGaps.length} curriculum goal(s) are under target; see Curriculum Goal Coverage.`);
  }

  const complete =
    (targetLevelCount === undefined || pkg.levels.levels.length >= targetLevelCount) &&
    acceptedLevels === pkg.levels.levels.length &&
    passedLevels === pkg.levels.levels.length &&
    certifiedLevels === pkg.levels.levels.length &&
    uncoveredKnowledge.length === 0 &&
    curriculumGoals.every((goal) => goal.ok) &&
    artifacts.every((artifact) => artifact.exists) &&
    webPlayableVersionedAssets &&
    formalWinViolations.length === 0 &&
    roleContractErrors.length === 0 &&
    qualityScorerImplemented;

  return {
    prototype: pkg.mechanic.id,
    levelCount: pkg.levels.levels.length,
    targetLevelCount,
    acceptedLevels,
    passedLevels,
    certifiedLevels,
    failedLevels,
    warningLevels,
    knowledgeCount: pkg.knowledge.knowledge.length,
    coveredKnowledge: pkg.knowledge.knowledge.length - uncoveredKnowledge.length,
    uncoveredKnowledge,
    roleCounts,
    costCurve: pkg.levels.levels.map((level) => {
      const result = resultByLevel.get(level.id);
      return {
        id: level.id,
        role: level.role,
        cost: result?.shortestCost,
        exploredStates: result?.exploredStates ?? 0,
        graphStatus: result?.graphAnalysis?.status,
        reachableStates: result?.graphAnalysis?.reachableStateCount,
      };
    }),
    curriculumGoals,
    artifacts,
    webPlayableVersionedAssets,
    playerWinStandard,
    formalWinViolations,
    qualityScorerImplemented,
    informalSemantics,
    eventWinLevels,
    roleContractIssues,
    playerModel,
    curriculumV2,
    complete,
    notes,
    advisoryNotes,
  };
}

function auditPlayerModel(pkg: PrototypePackage): PlayerModelAudit | undefined {
  if (!pkg.playerModel) {
    return undefined;
  }

  return {
    exists: true,
    referenceStatus: "ok",
    factCount: pkg.playerModel.facts.length,
    constraintCount: pkg.playerModel.constraints.length,
    interactionCount: pkg.playerModel.interactions.length,
    abilityCount: pkg.playerModel.abilities.length,
    patternCount: pkg.playerModel.patterns.length,
    abilityCandidateCount: pkg.playerModel.abilities.filter(
      (ability) => ability.kind === "ability_candidate",
    ).length,
    patternCandidateCount: pkg.playerModel.patterns.filter(
      (pattern) => pattern.kind === "pattern_candidate",
    ).length,
    openQuestions: pkg.playerModel.derivation.open_questions ?? [],
    candidateRefs: playerModelCandidateRefs(pkg),
  };
}

function playerModelCandidateRefs(pkg: PrototypePackage): string[] {
  if (!pkg.playerModel) {
    return [];
  }
  const candidateAbilityIds = new Set(
    pkg.playerModel.abilities
      .filter((ability) => ability.kind === "ability_candidate")
      .map((ability) => ability.id),
  );
  const candidatePatternIds = new Set(
    pkg.playerModel.patterns
      .filter((pattern) => pattern.kind === "pattern_candidate")
      .map((pattern) => pattern.id),
  );
  const refs: string[] = [];
  for (const pattern of pkg.playerModel.patterns) {
    for (const abilityId of pattern.required_abilities) {
      if (candidateAbilityIds.has(abilityId)) {
        refs.push(`${pattern.id} requires candidate ability ${abilityId}`);
      }
    }
  }
  return refs;
}

function auditCurriculumV2(pkg: PrototypePackage): CurriculumV2Audit | undefined {
  if (!pkg.curriculumV2 || !pkg.playerModel) {
    return undefined;
  }

  const index = buildPlayerModelIndex(pkg.playerModel);
  const targetCounts: Record<string, number> = {};
  const roleCounts: Record<string, number> = {};
  const orderingIssues: CurriculumV2OrderingIssue[] = [];
  const blockedGoals: CurriculumV2Audit["blockedGoals"] = [];
  const introduced = new Set(pkg.curriculumV2.assumed_known);
  const targetOrder: string[] = [];

  for (const unit of pkg.curriculumV2.units) {
    for (const goal of unit.goals) {
      targetCounts[goal.target.kind] = (targetCounts[goal.target.kind] ?? 0) + 1;
      for (const role of goal.role_sequence) {
        roleCounts[role] = (roleCounts[role] ?? 0) + 1;
      }

      const bundle = new Set(goal.bundle_with ?? []);
      const knownBefore = new Set(goal.known_before);
      const hardPrerequisites = new Set(goal.hard_prerequisites);
      for (const prerequisite of getDirectHardPrerequisites(index, goal.target.ref)) {
        if (!hardPrerequisites.has(prerequisite)) {
          orderingIssues.push({
            goalId: goal.id,
            target: goal.target.ref,
            severity: "error",
            message: `missing derived hard prerequisite '${prerequisite}'`,
          });
        }
      }
      for (const prerequisite of goal.hard_prerequisites) {
        if (!knownBefore.has(prerequisite) && !bundle.has(prerequisite)) {
          orderingIssues.push({
            goalId: goal.id,
            target: goal.target.ref,
            severity: "error",
            message: `hard prerequisite '${prerequisite}' is not in known_before or bundle_with`,
          });
        }
        if (!introduced.has(prerequisite) && !bundle.has(prerequisite)) {
          orderingIssues.push({
            goalId: goal.id,
            target: goal.target.ref,
            severity: "error",
            message: `hard prerequisite '${prerequisite}' has not appeared earlier`,
          });
        }
      }
      for (const known of goal.known_before) {
        if (!introduced.has(known)) {
          orderingIssues.push({
            goalId: goal.id,
            target: goal.target.ref,
            severity: "warning",
            message: `known_before '${known}' has not appeared earlier`,
          });
        }
      }
      if (goal.blocked_by_open_questions.length > 0) {
        blockedGoals.push({
          goalId: goal.id,
          target: goal.target.ref,
          openQuestions: goal.blocked_by_open_questions,
        });
      }
      introduced.add(goal.target.ref);
      targetOrder.push(goal.target.ref);
      for (const ref of bundle) {
        introduced.add(ref);
        targetOrder.push(ref);
      }
    }
  }

  const layerResult = computeTopologicalLayers(index, [
    ...new Set([...pkg.curriculumV2.assumed_known, ...targetOrder]),
  ]);

  return {
    exists: true,
    status: pkg.curriculumV2.status,
    unitCount: pkg.curriculumV2.units.length,
    goalCount: pkg.curriculumV2.units.reduce((sum, unit) => sum + unit.goals.length, 0),
    targetCounts,
    roleCounts,
    assumedKnown: pkg.curriculumV2.assumed_known,
    targetLayers: layerResult.layers,
    unresolvedLayerTargets: layerResult.unresolved,
    orderingIssues,
    blockedGoals,
  };
}

function analyzeRoleContracts(pkg: PrototypePackage): RoleContractIssue[] {
  const issues: RoleContractIssue[] = [];
  for (const level of pkg.levels.levels) {
    const targets = new Set(level.targets);
    const knownBefore = new Set(level.known_before);
    const withheld = new Set(level.withheld_until_level ?? []);
    const targetLearning = new Set(level.target_learning);
    const win = level.win ?? pkg.mechanic.win;

    for (const knowledgeId of targetLearning) {
      if (!targets.has(knowledgeId)) {
        issues.push({
          levelId: level.id,
          role: level.role,
          severity: "error",
          message: `target_learning '${knowledgeId}' is not listed in targets.`,
        });
      }
    }

    for (const knowledgeId of withheld) {
      if (knownBefore.has(knowledgeId)) {
        issues.push({
          levelId: level.id,
          role: level.role,
          severity: "error",
          message: `knowledge '${knowledgeId}' is both known_before and withheld_until_level.`,
        });
      }
    }

    if (
      ["discovery", "boundary"].includes(level.role) &&
      level.target_learning.every((knowledgeId) => knownBefore.has(knowledgeId))
    ) {
      issues.push({
        levelId: level.id,
        role: level.role,
        severity: "warning",
        message: `${level.role} role has no target_learning outside known_before.`,
      });
    }

    if (
      ["guided_application", "independent_application", "variation_transfer", "combination", "challenge"].includes(
        level.role,
      ) &&
      level.target_learning.some((knowledgeId) => !knownBefore.has(knowledgeId))
    ) {
      issues.push({
        levelId: level.id,
        role: level.role,
        severity: "warning",
        message: `${level.role} role should usually put its target_learning in known_before; otherwise it is closer to discovery.`,
      });
    }

    if (win.type === "event_occurs" && level.role !== "mechanic_witness") {
      issues.push({
        levelId: level.id,
        role: level.role,
        severity: "warning",
        message:
          "event_occurs win condition marks this as a fixture-style witness, not a normal player-facing curriculum level.",
      });
    }

    if (level.role === "mechanic_witness" && level.status === "accepted") {
      issues.push({
        levelId: level.id,
        role: level.role,
        severity: "error",
        message: "mechanic_witness levels cannot be accepted curriculum levels.",
      });
    }

    if (
      level.expected_solver_evidence.includes("player_win_standard") &&
      win.type !== pkg.mechanic.win.type
    ) {
      issues.push({
        levelId: level.id,
        role: level.role,
        severity: "error",
        message: `expected_solver_evidence includes player_win_standard, but win type is '${win.type}' instead of '${pkg.mechanic.win.type}'.`,
      });
    }
  }
  return issues;
}

function hasVersionedPlayableAssets(root: string): boolean {
  try {
    const indexHtml = readFileSync(path.join(root, "playable/index.html"), "utf8");
    const appJs = readFileSync(path.join(root, "playable/app.js"), "utf8");
    return (
      /style\.css\?v=/.test(indexHtml) &&
      /app\.js\?v=/.test(indexHtml) &&
      /data\.json\?v=/.test(appJs)
    );
  } catch {
    return false;
  }
}

export function formatAuditMarkdown(audit: PrototypeAudit): string {
  const lines: string[] = [
    `# Prototype Audit: ${audit.prototype}`,
    "",
    "## Summary",
    "",
    `- MVP gate complete: ${audit.complete ? "yes" : "no"}`,
    `- Levels: ${audit.levelCount}${audit.targetLevelCount ? ` / ${audit.targetLevelCount}` : ""}`,
    `- Accepted levels: ${audit.acceptedLevels} / ${audit.levelCount}`,
    `- Passing levels: ${audit.passedLevels} / ${audit.levelCount}`,
    `- Certified curriculum levels: ${audit.certifiedLevels} / ${audit.levelCount}`,
    `- Knowledge coverage (certified): ${audit.coveredKnowledge} / ${audit.knowledgeCount}`,
    `- Versioned web assets: ${audit.webPlayableVersionedAssets ? "yes" : "no"}`,
    `- Player win standard: ${audit.playerWinStandard}`,
    `- Quality scorer implemented: ${audit.qualityScorerImplemented ? "yes" : "no"}`,
    `- Level role contract issues: ${audit.roleContractIssues.length}`,
    `- Player model: ${audit.playerModel?.exists ? "present" : "none"}`,
    `- Curriculum v2: ${audit.curriculumV2?.exists ? "present" : "none"}`,
    "",
    "## Role Counts",
    "",
    ...Object.entries(audit.roleCounts)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([role, count]) => `- ${role}: ${count}`),
    "",
    "## Cost Curve",
    "",
    "| Level | Role | Cost | Solver Explored | Graph Status | Reachable States |",
    "| --- | --- | ---: | ---: | --- | ---: |",
    ...audit.costCurve.map(
      (item) =>
        `| ${item.id} | ${item.role} | ${item.cost ?? "n/a"} | ${item.exploredStates} | ${item.graphStatus ?? "n/a"} | ${item.reachableStates ?? "n/a"} |`,
    ),
    "",
    "## Curriculum Goal Coverage",
    "",
    "| Track | Knowledge | Roles | Target | Certified Levels | Status |",
    "| --- | --- | --- | ---: | --- | --- |",
    ...audit.curriculumGoals.map((goal) =>
      [
        `| ${goal.trackId}`,
        goal.knowledge.join(", "),
        goal.roles.join(", "),
        String(goal.targetCount),
        goal.passedLevels.length > 0 ? goal.passedLevels.join(", ") : "none",
        goal.ok ? "OK" : `GAP ${goal.passedCount}/${goal.targetCount}`,
      ].join(" | ") + " |",
    ),
    "",
    "## Design Gate Limits",
    "",
    `- Event-occurs win levels: ${
      audit.eventWinLevels.length > 0
        ? audit.eventWinLevels
            .map((level) => `${level.levelId} (${level.role}${level.event ? `:${level.event}` : ""})`)
            .join(", ")
        : "none"
    }`,
    `- Accepted win-standard violations: ${
      audit.formalWinViolations.length > 0
        ? audit.formalWinViolations
            .map((level) => `${level.levelId} (${level.role}:${level.winType})`)
            .join(", ")
        : "none"
    }`,
    `- Informal semantics: ${
      audit.informalSemantics.length > 0
        ? audit.informalSemantics
            .map((item) => `${item.knowledgeId}:${item.traceCondition ?? item.notes ?? "unspecified"}`)
            .join(", ")
        : "none"
    }`,
    "",
    "## Level Role Contracts",
    "",
    audit.roleContractIssues.length > 0
      ? "| Level | Role | Severity | Issue |"
      : "- No role contract issues.",
    ...(audit.roleContractIssues.length > 0
      ? [
          "| --- | --- | --- | --- |",
          ...audit.roleContractIssues.map(
            (issue) =>
              `| ${issue.levelId} | ${issue.role} | ${issue.severity} | ${issue.message} |`,
          ),
        ]
      : []),
    "",
    "## Player Model",
    "",
    ...(audit.playerModel
      ? [
          `- Facts: ${audit.playerModel.factCount}`,
          `- Constraints: ${audit.playerModel.constraintCount}`,
          `- Interactions: ${audit.playerModel.interactionCount}`,
          `- Abilities: ${audit.playerModel.abilityCount}`,
          `- Ability candidates: ${audit.playerModel.abilityCandidateCount}`,
          `- Patterns: ${audit.playerModel.patternCount}`,
          `- Pattern candidates: ${audit.playerModel.patternCandidateCount}`,
          `- References: ${audit.playerModel.referenceStatus}`,
          `- Open questions: ${
            audit.playerModel.openQuestions.length > 0
              ? audit.playerModel.openQuestions.join("; ")
              : "none"
          }`,
          `- Candidate references: ${
            audit.playerModel.candidateRefs.length > 0
              ? audit.playerModel.candidateRefs.join("; ")
              : "none"
          }`,
        ]
      : ["- No player_model.yml found."]),
    "",
    "## Curriculum V2",
    "",
    ...(audit.curriculumV2
      ? [
          `- Status: ${audit.curriculumV2.status}`,
          `- Units: ${audit.curriculumV2.unitCount}`,
          `- Goals: ${audit.curriculumV2.goalCount}`,
          `- Assumed known: ${
            audit.curriculumV2.assumedKnown.length > 0
              ? audit.curriculumV2.assumedKnown.join(", ")
              : "none"
          }`,
          `- Target counts: ${
            Object.entries(audit.curriculumV2.targetCounts).length > 0
              ? Object.entries(audit.curriculumV2.targetCounts)
                  .sort(([a], [b]) => a.localeCompare(b))
                  .map(([kind, count]) => `${kind}:${count}`)
                  .join(", ")
              : "none"
          }`,
          `- Role counts: ${
            Object.entries(audit.curriculumV2.roleCounts).length > 0
              ? Object.entries(audit.curriculumV2.roleCounts)
                  .sort(([a], [b]) => a.localeCompare(b))
                  .map(([role, count]) => `${role}:${count}`)
                  .join(", ")
              : "none"
          }`,
          `- Topological layers: ${
            audit.curriculumV2.targetLayers.length > 0
              ? audit.curriculumV2.targetLayers
                  .map((layer, index) => `L${index}[${layer.join(", ")}]`)
                  .join(" -> ")
              : "none"
          }`,
          `- Unresolved layer targets: ${
            audit.curriculumV2.unresolvedLayerTargets.length > 0
              ? audit.curriculumV2.unresolvedLayerTargets.join(", ")
              : "none"
          }`,
        ]
      : ["- No curriculum_v2.yml found."]),
    ...(audit.curriculumV2
      ? [
          "",
          audit.curriculumV2.orderingIssues.length > 0
            ? "| Goal | Target | Severity | Issue |"
            : "- No curriculum v2 ordering issues.",
          ...(audit.curriculumV2.orderingIssues.length > 0
            ? [
                "| --- | --- | --- | --- |",
                ...audit.curriculumV2.orderingIssues.map(
                  (issue) =>
                    `| ${issue.goalId} | ${issue.target} | ${issue.severity} | ${issue.message} |`,
                ),
              ]
            : []),
          "",
          audit.curriculumV2.blockedGoals.length > 0
            ? "| Goal | Target | Open Questions |"
            : "- No curriculum v2 goals are blocked by open questions.",
          ...(audit.curriculumV2.blockedGoals.length > 0
            ? [
                "| --- | --- | --- |",
                ...audit.curriculumV2.blockedGoals.map(
                  (goal) =>
                    `| ${goal.goalId} | ${goal.target} | ${goal.openQuestions.join("; ")} |`,
                ),
              ]
            : []),
        ]
      : []),
    "",
    "## Artifacts",
    "",
    ...audit.artifacts.map(
      (artifact) => `- ${artifact.exists ? "OK" : "MISSING"} ${artifact.label}: \`${artifact.path}\``,
    ),
    "",
    "## Notes",
    "",
    ...(audit.notes.length > 0 ? audit.notes.map((note) => `- ${note}`) : ["- No blocking notes."]),
    "",
    "## Advisory Notes",
    "",
    ...(audit.advisoryNotes.length > 0
      ? audit.advisoryNotes.map((note) => `- ${note}`)
      : ["- No advisory notes."]),
    "",
  ];

  if (audit.failedLevels.length > 0 || audit.warningLevels.length > 0) {
    lines.push("## Non-Pass Levels", "");
    if (audit.failedLevels.length > 0) {
      lines.push(`- Failed: ${audit.failedLevels.join(", ")}`);
    }
    if (audit.warningLevels.length > 0) {
      lines.push(`- Warning: ${audit.warningLevels.join(", ")}`);
    }
    lines.push("");
  }

  return `${lines.join("\n")}\n`;
}
