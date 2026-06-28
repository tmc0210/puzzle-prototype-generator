export type Direction = "up" | "down" | "left" | "right";

export type InputId = Direction;

export type Point = {
  x: number;
  y: number;
};

export type MechanicDoc = {
  id: string;
  title: string;
  version: number;
  objects: Record<string, MechanicObject>;
  inputs: Record<string, MechanicInput>;
  rules: MechanicRule[];
  win: WinCondition;
  counterfactuals?: Record<string, Counterfactual>;
};

export type MechanicObject = {
  glyph: string;
  layer: string;
  traits?: string[];
  vars?: Record<string, unknown>;
};

export type MechanicInput = {
  intent: string;
  dir?: Direction;
  cost?: number;
};

export type MechanicRule = {
  id: string;
  trigger: Record<string, unknown>;
  when?: Record<string, unknown>;
  effect?: Record<string, unknown>;
  branches?: MechanicBranch[];
  emits?: string[];
  teaches?: string[];
};

export type MechanicBranch = {
  id: string;
  when: Record<string, unknown>;
  effect: Record<string, unknown>;
  emits?: string[];
  teaches?: string[];
};

export type Counterfactual = {
  disable_rules?: string[];
  disable_branches?: string[];
};

export type KnowledgeDoc = {
  mechanic: string;
  knowledge: KnowledgeItem[];
};

export type KnowledgeItem = {
  id: string;
  statement: string;
  detector: {
    required_events?: string[];
    forbidden_events?: string[];
  };
  informal_semantics?: {
    trace_condition?: string;
    notes?: string;
  };
  counterfactual?: {
    model?: string;
    disable_rule?: string;
    disable_branch?: string;
    description?: string;
  };
};

export type LevelsDoc = {
  mechanic: string;
  levels: LevelDoc[];
};

export type PlayerModelDoc = {
  mechanic: string;
  derivation: {
    status: "manual_first_pass" | "llm_assisted" | "generated" | "validated";
    notes: string;
    open_questions?: string[];
  };
  facts: PlayerModelBaseItem[];
  constraints: PlayerModelBaseItem[];
  interactions: PlayerModelBaseItem[];
  abilities: PlayerModelAbility[];
  patterns: PlayerModelPattern[];
};

export type PlayerModelEvidence = {
  events?: {
    required?: string[];
    forbidden?: string[];
  };
  structural?: string[];
  graph?: string[];
  status?: "future" | "informal" | "trace" | "full_graph" | "unknown";
};

export type PlayerModelBaseItem = {
  id: string;
  kind: string;
  statement: string;
  prerequisites?: string[];
  source: Record<string, unknown>;
  evidence: PlayerModelEvidence;
  notes?: string;
};

export type PlayerModelAbility = {
  id: string;
  kind: "ability" | "ability_candidate";
  statement: string;
  goal_transform: {
    from: string;
    to: string;
  };
  prerequisites: string[];
  procedure_sketch: string[];
  source: Record<string, unknown>;
  evidence: PlayerModelEvidence;
  notes?: string;
};

export type PlayerModelPattern = {
  id: string;
  kind: "pattern" | "pattern_candidate";
  statement: string;
  structure: string[];
  required_abilities: string[];
  variation_axes: string[];
  source: Record<string, unknown>;
  evidence: PlayerModelEvidence;
  notes?: string;
};

export type CurriculumDoc = {
  mechanic: string;
  target_level_count?: number;
  tracks: CurriculumTrack[];
};

export type CurriculumTrack = {
  id: string;
  title: string;
  description?: string;
  goals: CurriculumGoal[];
};

export type CurriculumGoal = {
  knowledge: string[];
  roles: string[];
  count?: number;
  notes?: string;
};

export type PlayerModelTargetKind =
  | "fact"
  | "constraint"
  | "interaction"
  | "ability"
  | "pattern";

export type CurriculumV2Doc = {
  mechanic: string;
  status: "draft" | "reviewed" | "active";
  target_level_count?: number;
  target_policy: {
    formal_targets: string[];
    assumed_rules: string[];
    embedded_boundaries: string[];
    generator_guardrails: string[];
    notes?: string;
  };
  assumed_known: string[];
  ordering_notes?: string;
  units: CurriculumV2Unit[];
};

export type CurriculumV2Unit = {
  id: string;
  title: string;
  description?: string;
  goals: CurriculumV2Goal[];
};

export type CurriculumV2Goal = {
  id: string;
  title?: string;
  target: {
    kind: PlayerModelTargetKind;
    ref: string;
  };
  known_before: string[];
  hard_prerequisites: string[];
  role_sequence: Exclude<LevelRole, "mechanic_witness">[];
  support_level: SupportLevel;
  soft_ordering?: {
    locality?: "local" | "regional" | "remote" | "mixed" | "unknown";
    observability?: "direct" | "indirect" | "structural" | "unknown";
    mechanism_count?: number;
    state_space_burden?: "low" | "medium" | "high" | "unknown";
    notes?: string;
  };
  bundle_with?: string[];
  blocked_by_open_questions: string[];
  expected_solver_evidence?: SolverEvidenceId[];
  expected_llm_player_evidence?: LlmPlayerEvidenceId[];
  ordering_rationale: string;
  notes?: string;
};

export type LevelSpecsV2Doc = {
  mechanic: string;
  status: "draft" | "reviewed" | "active";
  curriculum: string;
  target_level_count?: number;
  specs: LevelSpecV2[];
};

export type CandidatesV2Doc = {
  mechanic: string;
  status: "generated" | "reviewed";
  generated_by: string;
  candidates: CandidateLevelV2[];
};

export type CandidateLevelV2 = {
  id: string;
  spec_id: string;
  title: string;
  status: "generated" | "verified" | "accepted" | "rejected";
  factory: string;
  seed: number;
  motifs: string[];
  layout: string;
  solution_trace?: CandidateTraceStep[];
  probe_trace?: CandidateTraceStep[];
  notes?: string;
};

export type CandidateTraceStep = {
  input: string;
  events?: string[];
  notes?: string;
};

export type LevelSpecV2 = {
  id: string;
  title: string;
  status: "draft" | "ready_for_generation" | "generated" | "accepted" | "rejected";
  primary_goal: string;
  secondary_goals?: string[];
  role: Exclude<LevelRole, "mechanic_witness">;
  support_level: SupportLevel;
  focus_targets: Array<{
    kind: PlayerModelTargetKind;
    ref: string;
  }>;
  known_before: string[];
  introduces: string[];
  practices: string[];
  assesses: string[];
  generation_contract: {
    objective:
      | "isolate_target"
      | "boundary_probe"
      | "guided_application"
      | "independent_application"
      | "variation_transfer"
      | "combination"
      | "challenge";
    win_condition: "prototype_default" | "custom";
    board_size?: {
      min_width?: number;
      max_width?: number;
      min_height?: number;
      max_height?: number;
    };
    required_objects?: string[];
    allowed_objects?: string[];
    required_rules?: string[];
    allowed_rules?: string[];
    required_branches?: string[];
    allowed_branches?: string[];
    structural_requirements: string[];
    forbidden_shortcuts?: string[];
  };
  evidence_contract: {
    solver: SolverEvidenceId[];
    llm_player: LlmPlayerEvidenceId[];
    graph_scope:
      | "full_graph_required"
      | "bounded_full_graph_preferred"
      | "trace_ok"
      | "not_applicable";
    event_requirements: LevelSpecEventRequirements;
    object_participation_requirements?: LevelSpecObjectParticipationRequirement[];
  };
  acceptance: {
    requires_player_win_standard: boolean;
    requires_target_on_solution_path: boolean;
    requires_no_event_win: boolean;
    notes?: string;
  };
  blocked_by_open_questions: string[];
  notes?: string;
};

export type LevelSpecEventRequirements = {
  winning_solution?: LevelSpecEventRequirement;
  all_shortest_solutions?: LevelSpecEventRequirement;
  all_winning_paths?: LevelSpecEventRequirement;
  probe_trace?: LevelSpecEventRequirement;
  reachable_witness?: LevelSpecEventRequirement;
};

export type LevelSpecEventRequirement = {
  required?: string[];
  forbidden?: string[];
};

export type LevelSpecObjectParticipationScope =
  | "winning_solution"
  | "all_shortest_solutions"
  | "all_winning_paths"
  | "probe_trace";

export type LevelSpecObjectParticipationRequirement = {
  object_type: string;
  role: string;
  min_distinct_instances: number;
  scope: LevelSpecObjectParticipationScope;
  event_type?: string;
};

export type LevelRole =
  | "diagnostic"
  | "discovery"
  | "boundary"
  | "guided_application"
  | "independent_application"
  | "variation_transfer"
  | "combination"
  | "challenge"
  | "review"
  | "mechanic_witness";

export type SupportLevel = "none" | "low" | "medium" | "high";

export type SolverEvidenceId =
  | "solvable"
  | "player_win_standard"
  | "target_event_detector_configured"
  | "expected_trace_replays"
  | "returned_solution_covers_target_events"
  | "expected_trace_covers_target_events"
  | "all_shortest_solutions_cover_target_events"
  | "all_winning_paths_cover_target_events"
  | "counterfactual_unsolvable"
  | "full_graph_complete";

export type LlmPlayerEvidenceId =
  | "tries_old_model"
  | "observes_old_model_failure"
  | "forms_target_hypothesis"
  | "revises_rule_model"
  | "uses_target_hypothesis_to_finish"
  | "applies_known_target_without_relearning"
  | "forms_subgoal_chain"
  | "identifies_bottleneck"
  | "reports_goal_clear"
  | "reports_rule_confusion"
  | "recovers_from_failed_model";

export type LevelDoc = {
  id: string;
  title: string;
  role: LevelRole;
  status: string;
  targets: string[];
  known_before: string[];
  withheld_until_level?: string[];
  target_learning: string[];
  support_level: SupportLevel;
  expected_solver_evidence: SolverEvidenceId[];
  expected_llm_player_evidence: LlmPlayerEvidenceId[];
  failure_interpretation?: Record<string, string>;
  layout: string;
  win?: WinCondition;
  expected_events?: string[];
  expected_trace?: Array<{
    input: string;
    events?: string[];
    notes?: string;
  }>;
  design_notes?: string;
};

export type WinCondition = {
  type: string;
  event?: string;
  object?: string;
  target?: string;
  description?: string;
  [key: string]: unknown;
};

export type PrototypePackage = {
  root: string;
  mechanic: MechanicDoc;
  knowledge: KnowledgeDoc;
  playerModel?: PlayerModelDoc;
  curriculumV2?: CurriculumV2Doc;
  curriculum: CurriculumDoc;
  levels: LevelsDoc;
};

export type CurriculumV2Package = {
  root: string;
  mechanic: MechanicDoc;
  playerModel: PlayerModelDoc;
  curriculumV2: CurriculumV2Doc;
  levelSpecsV2?: LevelSpecsV2Doc;
  candidatesV2?: CandidatesV2Doc;
  levels?: LevelsDoc;
};

export type SolutionStep = {
  input: InputId;
  events: string[];
  stateKey: string;
};

export type Solution = {
  found: boolean;
  inputs: InputId[];
  steps: SolutionStep[];
  events: string[];
  cost: number;
  exploredStates: number;
  searchStatus?: SearchStatus;
  budget?: SearchBudget;
  depth?: number;
  reason?: string;
};

export type SearchStatus = "found" | "complete" | "exhausted";

export type SearchBudget = {
  maxStates: number;
  maxDepth?: number;
};

export type SolverOptions = {
  disabledRules?: Set<string>;
  disabledBranches?: Set<string>;
  winCondition?: WinCondition;
  maxStates?: number;
  maxDepth?: number;
  collectAllOptimal?: boolean;
};

export type EvaluationResult = {
  levelId: string;
  title: string;
  solvable: boolean;
  shortestCost?: number;
  solutionInputs: InputId[];
  solutionEvents: string[];
  probeEvents: string[];
  exploredStates: number;
  graphAnalysis?: GraphAnalysis;
  targetResults: TargetEvaluation[];
  counterfactuals: CounterfactualEvaluation[];
  solverContract: SolverContractEvaluation;
  status: "pass" | "fail" | "warning";
  notes: string[];
};

export type EvidenceLevel =
  | "static"
  | "trace"
  | "optimal"
  | "full_graph"
  | "heuristic"
  | "unknown";

export type MetricStatus = "pass" | "fail" | "unknown";

export type MetricResult = {
  id: string;
  status: MetricStatus;
  evidence: EvidenceLevel;
  reason?: string;
};

export type SolverContractMetric = MetricResult & {
  evidenceId: SolverEvidenceId;
  knowledgeId?: string;
};

export type SolverContractEvaluation = {
  expected: SolverEvidenceId[];
  metrics: SolverContractMetric[];
  status: "pass" | "fail" | "warning";
};

export type GraphAnalysis = {
  status: "complete" | "exhausted";
  reachableStateCount: number;
  legalTransitionCount: number;
  eventOnlyTransitionCount: number;
  winStateCount: number;
  budget: {
    maxStates: number;
    maxTransitions?: number;
    maxDepth?: number;
  };
  reason?: string;
};

export type TargetEvaluation = {
  knowledgeId: string;
  requiredEvents: string[];
  forbiddenEvents: string[];
  observations: {
    shortestSolutionCovers: boolean;
    probeTraceCovers: boolean;
    basis: "solution" | "probe" | "solution_and_probe" | "none";
  };
  metrics: MetricResult[];
  acceptance: MetricResult;
  bypassCost?: number;
};

export type CounterfactualEvaluation = {
  knowledgeId: string;
  model?: string;
  solvable?: boolean;
  exploredStates?: number;
  checked: boolean;
  metric: MetricResult;
  notes?: string;
};
