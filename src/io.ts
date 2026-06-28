import { access, readFile } from "node:fs/promises";
import path from "node:path";
import { Ajv2020 } from "ajv/dist/2020.js";
import YAML from "yaml";
import {
  buildPlayerModelIndex,
  getDirectHardPrerequisites,
} from "./playerModelGraph.js";
import type {
  CandidatesV2Doc,
  CurriculumDoc,
  CurriculumV2Package,
  CurriculumV2Doc,
  KnowledgeDoc,
  LevelSpecsV2Doc,
  LevelsDoc,
  MechanicDoc,
  PlayerModelDoc,
  PrototypePackage,
} from "./types.js";

type SchemaName =
  | "mechanic"
  | "knowledge"
  | "curriculum"
  | "curriculum_v2"
  | "candidates_v2"
  | "level_specs_v2"
  | "levels"
  | "player_model";

const schemaFiles: Record<SchemaName, string> = {
  mechanic: "mechanic.schema.json",
  knowledge: "knowledge.schema.json",
  curriculum: "curriculum.schema.json",
  curriculum_v2: "curriculum_v2.schema.json",
  candidates_v2: "candidates_v2.schema.json",
  level_specs_v2: "level_specs_v2.schema.json",
  levels: "levels.schema.json",
  player_model: "player_model.schema.json",
};

async function readJson(filePath: string): Promise<unknown> {
  return JSON.parse(await readFile(filePath, "utf8"));
}

async function readYaml<T>(filePath: string): Promise<T> {
  return YAML.parse(await readFile(filePath, "utf8")) as T;
}

async function fileExists(filePath: string): Promise<boolean> {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function validateAgainstSchema(
  repoRoot: string,
  name: SchemaName,
  data: unknown,
): Promise<void> {
  const schemaPath = path.join(repoRoot, "schemas", schemaFiles[name]);
  const schema = (await readJson(schemaPath)) as object;
  const ajv = new Ajv2020({ allErrors: true });
  const validate = ajv.compile(schema);
  if (!validate(data)) {
    const errors = validate.errors
      ?.map((error: { instancePath: string; message?: string }) => `${error.instancePath || "/"} ${error.message}`)
      .join("\n");
    throw new Error(`Invalid ${name} document:\n${errors ?? "unknown schema error"}`);
  }
}

export async function loadPrototypePackage(
  prototypeRoot: string,
): Promise<PrototypePackage> {
  const root = path.resolve(prototypeRoot);
  const repoRoot = path.resolve(root, "..", "..");

  const mechanic = await readYaml<MechanicDoc>(path.join(root, "mechanic.yml"));
  const knowledge = await readYaml<KnowledgeDoc>(path.join(root, "knowledge.yml"));
  const playerModelPath = path.join(root, "player_model.yml");
  const playerModel = (await fileExists(playerModelPath))
    ? await readYaml<PlayerModelDoc>(playerModelPath)
    : undefined;
  const curriculumV2Path = path.join(root, "curriculum_v2.yml");
  const curriculumV2 = (await fileExists(curriculumV2Path))
    ? await readYaml<CurriculumV2Doc>(curriculumV2Path)
    : undefined;
  const curriculum = await readYaml<CurriculumDoc>(path.join(root, "curriculum.yml"));
  const levels = await readYaml<LevelsDoc>(path.join(root, "levels.yml"));

  await validateAgainstSchema(repoRoot, "mechanic", mechanic);
  await validateAgainstSchema(repoRoot, "knowledge", knowledge);
  if (playerModel) {
    await validateAgainstSchema(repoRoot, "player_model", playerModel);
  }
  if (curriculumV2) {
    await validateAgainstSchema(repoRoot, "curriculum_v2", curriculumV2);
  }
  await validateAgainstSchema(repoRoot, "curriculum", curriculum);
  await validateAgainstSchema(repoRoot, "levels", levels);

  if (knowledge.mechanic !== mechanic.id) {
    throw new Error(
      `knowledge.yml mechanic '${knowledge.mechanic}' does not match '${mechanic.id}'`,
    );
  }

  if (levels.mechanic !== mechanic.id) {
    throw new Error(`levels.yml mechanic '${levels.mechanic}' does not match '${mechanic.id}'`);
  }

  if (playerModel && playerModel.mechanic !== mechanic.id) {
    throw new Error(
      `player_model.yml mechanic '${playerModel.mechanic}' does not match '${mechanic.id}'`,
    );
  }

  if (curriculum.mechanic !== mechanic.id) {
    throw new Error(
      `curriculum.yml mechanic '${curriculum.mechanic}' does not match '${mechanic.id}'`,
    );
  }

  if (curriculumV2 && curriculumV2.mechanic !== mechanic.id) {
    throw new Error(
      `curriculum_v2.yml mechanic '${curriculumV2.mechanic}' does not match '${mechanic.id}'`,
    );
  }

  const knowledgeIds = new Set(knowledge.knowledge.map((item) => item.id));
  if (playerModel) {
    validatePlayerModelReferences(playerModel, {
      mechanic,
      levelIds: new Set(levels.levels.map((level) => level.id)),
    });
  }
  if (curriculumV2) {
    if (!playerModel) {
      throw new Error("curriculum_v2.yml requires player_model.yml");
    }
    validateCurriculumV2References(curriculumV2, playerModel);
  }
  for (const track of curriculum.tracks) {
    for (const goal of track.goals) {
      for (const target of goal.knowledge) {
        if (!knowledgeIds.has(target)) {
          throw new Error(`Curriculum track ${track.id} targets unknown knowledge '${target}'`);
        }
      }
    }
  }

  for (const level of levels.levels) {
    const referencedKnowledge = [
      ...level.targets,
      ...level.known_before,
      ...(level.withheld_until_level ?? []),
      ...level.target_learning,
    ];
    for (const target of referencedKnowledge) {
      if (!knowledgeIds.has(target)) {
        throw new Error(`Level ${level.id} references unknown knowledge '${target}'`);
      }
    }
  }

  return { root, mechanic, knowledge, playerModel, curriculumV2, curriculum, levels };
}

export async function loadCurriculumV2Package(
  prototypeRoot: string,
): Promise<CurriculumV2Package> {
  const root = path.resolve(prototypeRoot);
  const repoRoot = path.resolve(root, "..", "..");

  const mechanic = await readYaml<MechanicDoc>(path.join(root, "mechanic.yml"));
  const playerModel = await readYaml<PlayerModelDoc>(path.join(root, "player_model.yml"));
  const curriculumV2 = await readYaml<CurriculumV2Doc>(path.join(root, "curriculum_v2.yml"));
  const levelSpecsV2Path = path.join(root, "level_specs_v2.yml");
  const levelSpecsV2 = (await fileExists(levelSpecsV2Path))
    ? await readYaml<LevelSpecsV2Doc>(levelSpecsV2Path)
    : undefined;
  const candidatesV2Path = path.join(root, "candidates_v2.yml");
  const candidatesV2 = (await fileExists(candidatesV2Path))
    ? await readYaml<CandidatesV2Doc>(candidatesV2Path)
    : undefined;
  const levelsPath = path.join(root, "levels.yml");
  const levels = (await fileExists(levelsPath)) ? await readYaml<LevelsDoc>(levelsPath) : undefined;

  await validateAgainstSchema(repoRoot, "mechanic", mechanic);
  await validateAgainstSchema(repoRoot, "player_model", playerModel);
  await validateAgainstSchema(repoRoot, "curriculum_v2", curriculumV2);
  if (levelSpecsV2) {
    await validateAgainstSchema(repoRoot, "level_specs_v2", levelSpecsV2);
  }
  if (candidatesV2) {
    await validateAgainstSchema(repoRoot, "candidates_v2", candidatesV2);
  }
  if (levels) {
    await validateAgainstSchema(repoRoot, "levels", levels);
  }

  if (playerModel.mechanic !== mechanic.id) {
    throw new Error(
      `player_model.yml mechanic '${playerModel.mechanic}' does not match '${mechanic.id}'`,
    );
  }
  if (curriculumV2.mechanic !== mechanic.id) {
    throw new Error(
      `curriculum_v2.yml mechanic '${curriculumV2.mechanic}' does not match '${mechanic.id}'`,
    );
  }
  if (levelSpecsV2 && levelSpecsV2.mechanic !== mechanic.id) {
    throw new Error(
      `level_specs_v2.yml mechanic '${levelSpecsV2.mechanic}' does not match '${mechanic.id}'`,
    );
  }
  if (candidatesV2 && candidatesV2.mechanic !== mechanic.id) {
    throw new Error(
      `candidates_v2.yml mechanic '${candidatesV2.mechanic}' does not match '${mechanic.id}'`,
    );
  }
  if (levels && levels.mechanic !== mechanic.id) {
    throw new Error(`levels.yml mechanic '${levels.mechanic}' does not match '${mechanic.id}'`);
  }

  validatePlayerModelReferences(playerModel, {
    mechanic,
    levelIds: levels ? new Set(levels.levels.map((level) => level.id)) : undefined,
  });
  validateCurriculumV2References(curriculumV2, playerModel);
  if (levelSpecsV2) {
    validateLevelSpecsV2References(levelSpecsV2, curriculumV2, playerModel, mechanic);
  }
  if (candidatesV2) {
    if (!levelSpecsV2) {
      throw new Error("candidates_v2.yml requires level_specs_v2.yml");
    }
    validateCandidatesV2References(candidatesV2, levelSpecsV2, mechanic);
  }

  return { root, mechanic, playerModel, curriculumV2, levelSpecsV2, candidatesV2, levels };
}

function validateCandidatesV2References(
  candidatesDoc: CandidatesV2Doc,
  levelSpecs: LevelSpecsV2Doc,
  mechanic: MechanicDoc,
): void {
  const errors: string[] = [];
  const candidateIds = new Set<string>();
  const specIds = new Set(levelSpecs.specs.map((spec) => spec.id));
  const inputIds = new Set(Object.keys(mechanic.inputs));
  const eventIds = new Set(
    mechanic.rules.flatMap((rule) => [
      ...(rule.emits ?? []),
      ...(rule.branches ?? []).flatMap((branch) => branch.emits ?? []),
    ]),
  );

  const checkTrace = (
    owner: string,
    field: string,
    trace: CandidatesV2Doc["candidates"][number]["solution_trace"] | undefined,
  ): void => {
    for (const [index, step] of (trace ?? []).entries()) {
      if (!inputIds.has(step.input)) {
        errors.push(`${owner}.${field}[${index}].input references unknown input '${step.input}'`);
      }
      for (const event of step.events ?? []) {
        if (!eventIds.has(event)) {
          errors.push(`${owner}.${field}[${index}].events references unknown event '${event}'`);
        }
      }
    }
  };

  for (const candidate of candidatesDoc.candidates) {
    if (candidateIds.has(candidate.id)) {
      errors.push(`duplicate candidates_v2 id '${candidate.id}'`);
    }
    candidateIds.add(candidate.id);
    if (!specIds.has(candidate.spec_id)) {
      errors.push(`${candidate.id}.spec_id references unknown level spec '${candidate.spec_id}'`);
    }
    checkTrace(candidate.id, "solution_trace", candidate.solution_trace);
    checkTrace(candidate.id, "probe_trace", candidate.probe_trace);
  }

  if (errors.length > 0) {
    throw new Error(`Invalid candidates_v2 references:\n${errors.join("\n")}`);
  }
}

function validatePlayerModelReferences(
  playerModel: PlayerModelDoc,
  context: {
    mechanic: MechanicDoc;
    levelIds?: Set<string>;
  },
): void {
  const errors: string[] = [];
  const abilityIds = new Set(playerModel.abilities.map((item) => item.id));
  const modelItems = [
    ...playerModel.facts,
    ...playerModel.constraints,
    ...playerModel.interactions,
    ...playerModel.abilities,
    ...playerModel.patterns,
  ];
  const modelIds = new Set<string>();
  const duplicateIds = new Set<string>();
  for (const item of modelItems) {
    if (modelIds.has(item.id)) {
      duplicateIds.add(item.id);
    }
    modelIds.add(item.id);
  }
  for (const duplicateId of duplicateIds) {
    errors.push(`duplicate player model id '${duplicateId}'`);
  }

  const branchIdsByRule = new Map(
    context.mechanic.rules.map((rule) => [
      rule.id,
      new Set((rule.branches ?? []).map((branch) => branch.id)),
    ]),
  );
  const branchIds = new Set(
    context.mechanic.rules.flatMap((rule) => (rule.branches ?? []).map((branch) => branch.id)),
  );
  const ruleIds = new Set(context.mechanic.rules.map((rule) => rule.id));
  const objectIds = new Set(Object.keys(context.mechanic.objects));
  const eventIds = new Set(
    context.mechanic.rules.flatMap((rule) => [
      ...(rule.emits ?? []),
      ...(rule.branches ?? []).flatMap((branch) => branch.emits ?? []),
    ]),
  );

  const checkModelRef = (owner: string, field: string, ref: string): void => {
    if (!modelIds.has(ref)) {
      errors.push(`${owner}.${field} references unknown player model id '${ref}'`);
    }
  };

  const checkEvents = (owner: string, field: string, events: string[] | undefined): void => {
    for (const event of events ?? []) {
      if (!eventIds.has(event)) {
        errors.push(`${owner}.${field} references unknown event '${event}'`);
      }
    }
  };

  const checkSource = (owner: string, source: Record<string, unknown>): void => {
    const rule = typeof source.rule === "string" ? source.rule : undefined;
    const branch = typeof source.branch === "string" ? source.branch : undefined;
    const object = typeof source.object === "string" ? source.object : undefined;
    const level = typeof source.level === "string" ? source.level : undefined;
    const events = Array.isArray(source.events)
      ? source.events.filter((event): event is string => typeof event === "string")
      : undefined;

    if (rule && !ruleIds.has(rule)) {
      errors.push(`${owner}.source.rule references unknown rule '${rule}'`);
    }
    if (branch) {
      if (rule && !branchIdsByRule.get(rule)?.has(branch)) {
        errors.push(`${owner}.source.branch references unknown branch '${branch}' on rule '${rule}'`);
      } else if (!rule && !branchIds.has(branch)) {
        errors.push(`${owner}.source.branch references unknown branch '${branch}'`);
      }
    }
    if (object && !objectIds.has(object)) {
      errors.push(`${owner}.source.object references unknown object '${object}'`);
    }
    if (level && context.levelIds && !context.levelIds.has(level)) {
      errors.push(`${owner}.source.level references unknown level '${level}'`);
    }
    checkEvents(owner, "source.events", events);
  };

  for (const item of modelItems) {
    const prerequisites = "prerequisites" in item ? (item.prerequisites ?? []) : [];
    for (const prerequisite of prerequisites) {
      checkModelRef(item.id, "prerequisites", prerequisite);
    }
    checkSource(item.id, item.source);
    checkEvents(item.id, "evidence.events.required", item.evidence.events?.required);
    checkEvents(item.id, "evidence.events.forbidden", item.evidence.events?.forbidden);
  }

  for (const pattern of playerModel.patterns) {
    for (const abilityId of pattern.required_abilities) {
      if (!abilityIds.has(abilityId)) {
        errors.push(`${pattern.id}.required_abilities references non-ability id '${abilityId}'`);
      }
    }
  }

  if (errors.length > 0) {
    throw new Error(`Invalid player_model references:\n${errors.join("\n")}`);
  }
}

function validateCurriculumV2References(
  curriculum: CurriculumV2Doc,
  playerModel: PlayerModelDoc,
): void {
  const errors: string[] = [];
  const index = buildPlayerModelIndex(playerModel);
  const introduced = new Set(curriculum.assumed_known);
  const goalIds = new Set<string>();
  const targetRefs = new Set<string>();
  const unitIds = new Set<string>();
  const formalTargets = new Set(curriculum.target_policy.formal_targets);

  const checkModelRef = (owner: string, field: string, ref: string): void => {
    if (!index.allIds.has(ref)) {
      errors.push(`${owner}.${field} references unknown player model id '${ref}'`);
      return;
    }
    if (index.candidateIds.has(ref)) {
      errors.push(`${owner}.${field} references candidate player model id '${ref}'`);
    }
  };

  const policyEntries: Array<[string, string[]]> = [
    ["formal_targets", curriculum.target_policy.formal_targets],
    ["assumed_rules", curriculum.target_policy.assumed_rules],
    ["embedded_boundaries", curriculum.target_policy.embedded_boundaries],
    ["generator_guardrails", curriculum.target_policy.generator_guardrails],
  ];
  const policyOwnerByRef = new Map<string, string>();
  for (const [field, refs] of policyEntries) {
    for (const ref of refs) {
      checkModelRef("curriculum_v2.target_policy", field, ref);
      const existingOwner = policyOwnerByRef.get(ref);
      if (existingOwner) {
        errors.push(
          `curriculum_v2.target_policy lists '${ref}' in both '${existingOwner}' and '${field}'`,
        );
      }
      policyOwnerByRef.set(ref, field);
    }
  }

  for (const ref of curriculum.assumed_known) {
    checkModelRef("curriculum_v2", "assumed_known", ref);
  }

  for (const unit of curriculum.units) {
    if (unitIds.has(unit.id)) {
      errors.push(`duplicate curriculum_v2 unit id '${unit.id}'`);
    }
    unitIds.add(unit.id);

    for (const goal of unit.goals) {
      const owner = `${unit.id}.${goal.id}`;
      if (goalIds.has(goal.id)) {
        errors.push(`duplicate curriculum_v2 goal id '${goal.id}'`);
      }
      goalIds.add(goal.id);

      checkModelRef(owner, "target.ref", goal.target.ref);
      const actualKind = index.kindById.get(goal.target.ref);
      if (actualKind && actualKind !== goal.target.kind) {
        errors.push(
          `${owner}.target.kind is '${goal.target.kind}', but '${goal.target.ref}' is '${actualKind}'`,
        );
      }
      if (targetRefs.has(goal.target.ref)) {
        errors.push(`${owner}.target.ref duplicates curriculum target '${goal.target.ref}'`);
      }
      if (!formalTargets.has(goal.target.ref)) {
        errors.push(`${owner}.target.ref '${goal.target.ref}' is not listed in target_policy.formal_targets`);
      }
      targetRefs.add(goal.target.ref);

      for (const ref of goal.known_before) {
        checkModelRef(owner, "known_before", ref);
        if (!introduced.has(ref)) {
          errors.push(
            `${owner}.known_before lists '${ref}', but it is not assumed_known or introduced by an earlier goal`,
          );
        }
      }

      for (const ref of goal.hard_prerequisites) {
        checkModelRef(owner, "hard_prerequisites", ref);
      }
      for (const ref of goal.bundle_with ?? []) {
        checkModelRef(owner, "bundle_with", ref);
      }

      const declaredHardPrerequisites = new Set(goal.hard_prerequisites);
      for (const prerequisite of getDirectHardPrerequisites(index, goal.target.ref)) {
        if (!declaredHardPrerequisites.has(prerequisite)) {
          errors.push(
            `${owner}.hard_prerequisites is missing derived hard prerequisite '${prerequisite}'`,
          );
        }
      }

      const bundle = new Set(goal.bundle_with ?? []);
      const knownBefore = new Set(goal.known_before);
      for (const prerequisite of goal.hard_prerequisites) {
        if (!knownBefore.has(prerequisite) && !bundle.has(prerequisite)) {
          errors.push(
            `${owner}.hard_prerequisites '${prerequisite}' must also appear in known_before or bundle_with`,
          );
        }
        if (!introduced.has(prerequisite) && !bundle.has(prerequisite)) {
          errors.push(
            `${owner}.hard_prerequisites '${prerequisite}' is not assumed_known or introduced by an earlier goal`,
          );
        }
      }

      introduced.add(goal.target.ref);
      for (const ref of bundle) {
        introduced.add(ref);
      }
    }
  }

  if (errors.length > 0) {
    throw new Error(`Invalid curriculum_v2 references:\n${errors.join("\n")}`);
  }
}

function validateLevelSpecsV2References(
  levelSpecs: LevelSpecsV2Doc,
  curriculum: CurriculumV2Doc,
  playerModel: PlayerModelDoc,
  mechanic: MechanicDoc,
): void {
  const errors: string[] = [];
  const index = buildPlayerModelIndex(playerModel);
  const introduced = new Set(curriculum.assumed_known);
  const specIds = new Set<string>();
  const goalById = new Map(
    curriculum.units.flatMap((unit) => unit.goals.map((goal) => [goal.id, goal] as const)),
  );
  const objectIds = new Set(Object.keys(mechanic.objects));
  const objectTraits = new Set(
    Object.values(mechanic.objects).flatMap((object) => object.traits ?? []),
  );
  const ruleIds = new Set(mechanic.rules.map((rule) => rule.id));
  const branchIds = new Set(
    mechanic.rules.flatMap((rule) => (rule.branches ?? []).map((branch) => branch.id)),
  );
  const eventIds = new Set(
    mechanic.rules.flatMap((rule) => [
      ...(rule.emits ?? []),
      ...(rule.branches ?? []).flatMap((branch) => branch.emits ?? []),
    ]),
  );
  const formalTargets = new Set(curriculum.target_policy.formal_targets);
  const openQuestions = new Set(playerModel.derivation.open_questions ?? []);

  const checkModelRef = (owner: string, field: string, ref: string): void => {
    if (!index.allIds.has(ref)) {
      errors.push(`${owner}.${field} references unknown player model id '${ref}'`);
      return;
    }
    if (index.candidateIds.has(ref)) {
      errors.push(`${owner}.${field} references candidate player model id '${ref}'`);
    }
  };

  const checkTargetRef = (
    owner: string,
    field: string,
    target: { kind: string; ref: string },
  ): void => {
    checkModelRef(owner, field, target.ref);
    const actualKind = index.kindById.get(target.ref);
    if (actualKind && actualKind !== target.kind) {
      errors.push(`${owner}.${field} kind '${target.kind}' does not match '${target.ref}' kind '${actualKind}'`);
    }
  };

  const checkMechanicRefs = (
    owner: string,
    field: string,
    refs: string[] | undefined,
    validIds: Set<string>,
  ): void => {
    for (const ref of refs ?? []) {
      if (!validIds.has(ref)) {
        errors.push(`${owner}.${field} references unknown mechanic id '${ref}'`);
      }
    }
  };

  const checkRequiredWithinAllowed = (
    owner: string,
    label: string,
    required: string[] | undefined,
    allowed: string[] | undefined,
  ): void => {
    if (!required || !allowed) {
      return;
    }
    const allowedSet = new Set(allowed);
    for (const ref of required) {
      if (!allowedSet.has(ref)) {
        errors.push(`${owner}.${label} requires '${ref}', but it is not listed as allowed`);
      }
    }
  };

  for (const spec of levelSpecs.specs) {
    const owner = spec.id;
    if (specIds.has(spec.id)) {
      errors.push(`duplicate level_specs_v2 spec id '${spec.id}'`);
    }
    specIds.add(spec.id);

    const primaryGoal = goalById.get(spec.primary_goal);
    if (!primaryGoal) {
      errors.push(`${owner}.primary_goal references unknown curriculum_v2 goal '${spec.primary_goal}'`);
    } else {
      if (!primaryGoal.role_sequence.includes(spec.role)) {
        errors.push(`${owner}.role '${spec.role}' is not in primary goal '${spec.primary_goal}' role_sequence`);
      }
    }

    const referencedGoalIds = [spec.primary_goal, ...(spec.secondary_goals ?? [])];
    const referencedGoalTargets = referencedGoalIds
      .map((goalId) => goalById.get(goalId)?.target.ref)
      .filter((ref): ref is string => Boolean(ref));
    for (const goalId of referencedGoalIds) {
      if (!goalById.has(goalId)) {
        errors.push(`${owner}.secondary_goals references unknown curriculum_v2 goal '${goalId}'`);
      }
    }

    for (const target of spec.focus_targets) {
      checkTargetRef(owner, "focus_targets", target);
    }
    const focusRefs = new Set(spec.focus_targets.map((target) => target.ref));
    const activeRefs = new Set([...spec.introduces, ...spec.practices, ...spec.assesses]);
    for (const ref of referencedGoalTargets) {
      if (!focusRefs.has(ref)) {
        errors.push(`${owner}.focus_targets does not include referenced goal target '${ref}'`);
      }
      if (!activeRefs.has(ref)) {
        errors.push(`${owner} does not introduce, practice, or assess referenced goal target '${ref}'`);
      }
    }

    for (const ref of [
      ...spec.known_before,
      ...spec.introduces,
      ...spec.practices,
      ...spec.assesses,
    ]) {
      checkModelRef(owner, "player_model_refs", ref);
    }

    for (const ref of spec.known_before) {
      if (!introduced.has(ref)) {
        errors.push(`${owner}.known_before '${ref}' has not been introduced by an earlier spec or assumed_known`);
      }
    }

    for (const ref of spec.assesses) {
      if (!formalTargets.has(ref)) {
        errors.push(`${owner}.assesses '${ref}' is not listed in target_policy.formal_targets`);
      }
    }

    for (const ref of spec.introduces) {
      if (introduced.has(ref)) {
        errors.push(`${owner}.introduces '${ref}' was already introduced earlier`);
      }
    }

    const introducedHere = new Set(spec.introduces);
    for (const ref of spec.introduces) {
      for (const prerequisite of getDirectHardPrerequisites(index, ref)) {
        if (!introduced.has(prerequisite) && !introducedHere.has(prerequisite)) {
          errors.push(
            `${owner}.introduces '${ref}' before hard prerequisite '${prerequisite}' is known or introduced in the same spec`,
          );
        }
      }
    }

    const knownOrIntroducedHere = new Set([...spec.known_before, ...spec.introduces]);
    for (const ref of [...spec.practices, ...spec.assesses]) {
      if (!knownOrIntroducedHere.has(ref)) {
        errors.push(`${owner} practices or assesses '${ref}' before it is known or introduced in this spec`);
      }
    }

    const contract = spec.generation_contract;
    checkMechanicRefs(owner, "required_objects", contract.required_objects, objectIds);
    checkMechanicRefs(owner, "allowed_objects", contract.allowed_objects, objectIds);
    checkMechanicRefs(owner, "required_rules", contract.required_rules, ruleIds);
    checkMechanicRefs(owner, "allowed_rules", contract.allowed_rules, ruleIds);
    checkMechanicRefs(owner, "required_branches", contract.required_branches, branchIds);
    checkMechanicRefs(owner, "allowed_branches", contract.allowed_branches, branchIds);
    for (const [scope, requirement] of Object.entries(spec.evidence_contract.event_requirements)) {
      checkMechanicRefs(owner, `event_requirements.${scope}.required`, requirement.required, eventIds);
      checkMechanicRefs(owner, `event_requirements.${scope}.forbidden`, requirement.forbidden, eventIds);
    }
    for (const [index, requirement] of (
      spec.evidence_contract.object_participation_requirements ?? []
    ).entries()) {
      if (!objectIds.has(requirement.object_type) && !objectTraits.has(requirement.object_type)) {
        errors.push(
          `${owner}.object_participation_requirements[${index}].object_type references unknown object type or trait '${requirement.object_type}'`,
        );
      }
      if (requirement.event_type && !eventIds.has(requirement.event_type)) {
        errors.push(
          `${owner}.object_participation_requirements[${index}].event_type references unknown event '${requirement.event_type}'`,
        );
      }
    }
    checkRequiredWithinAllowed(owner, "objects", contract.required_objects, contract.allowed_objects);
    checkRequiredWithinAllowed(owner, "rules", contract.required_rules, contract.allowed_rules);
    checkRequiredWithinAllowed(owner, "branches", contract.required_branches, contract.allowed_branches);

    const boardSize = contract.board_size;
    if (boardSize?.min_width && boardSize.max_width && boardSize.min_width > boardSize.max_width) {
      errors.push(`${owner}.generation_contract.board_size min_width exceeds max_width`);
    }
    if (boardSize?.min_height && boardSize.max_height && boardSize.min_height > boardSize.max_height) {
      errors.push(`${owner}.generation_contract.board_size min_height exceeds max_height`);
    }

    for (const question of spec.blocked_by_open_questions) {
      if (!openQuestions.has(question)) {
        errors.push(`${owner}.blocked_by_open_questions references an unknown open question`);
      }
    }
    if (
      spec.blocked_by_open_questions.length > 0 &&
      ["ready_for_generation", "generated", "accepted"].includes(spec.status)
    ) {
      errors.push(`${owner} is blocked by open questions but has status '${spec.status}'`);
    }

    for (const ref of spec.introduces) {
      introduced.add(ref);
    }
  }

  if (errors.length > 0) {
    throw new Error(`Invalid level_specs_v2 references:\n${errors.join("\n")}`);
  }
}
