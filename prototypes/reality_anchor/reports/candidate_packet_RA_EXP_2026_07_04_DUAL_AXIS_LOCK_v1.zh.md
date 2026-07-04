# Candidate packet: RA_EXP_2026_07_04_DUAL_AXIS_LOCK_v1

```yaml
candidate_version: RA_EXP_2026_07_04_DUAL_AXIS_LOCK_v1
review_iteration: review_1
prototype: reality_anchor
review_integrity: pending_independent_review
archive_eligibility: human_pending
score_claim_allowed: false
```

## prototype_context

```yaml
confirmed_rules:
  - P/L 是可移动 1x2 或 2x1 推拉锚点；P 侧为 push world，L 侧为 pull world。
  - B/S 是可移动 1x2 或 2x1 箱黏锚点；B 侧为 box world，S 侧为 sticky world。
  - 同类型锚点每关最多一个；两类锚点可共存并独立判定。
  - 箱子/黏块在合法移动后按 B/S 边界归一化，黏格四邻接自动合并为刚体。
  - 目标必须由箱、黏块或任意锚点格覆盖；玩家站在目标上不算。
win_condition: all_targets_covered_by_objects
object_and_event_semantics:
  central_events:
    - pull_object
    - push_object
    - force_chain
    - anchor_boundary_shift:push_pull
    - anchor_boundary_shift:box_sticky
    - box_to_sticky
    - move_sticky_rigid
tool_boundary:
  runtime_adapter: implemented
  solver: implemented
  layout_analyzer: implemented
  graph_agency: implemented but graph can exhaust on this candidate
  puzzle_script_exporter: unavailable
  curated_miner: unavailable
```

## slot_brief

```yaml
intended_role: late-game challenge
known_before:
  - K_runtime_smoke
target: compact dual-axis anchor combination
difficulty_or_support_expectation: high difficulty attempt, support none
brief_requirement:
  - one horizontal anchor
  - one vertical anchor
  - different anchor types
```

## mechanic_exposure_context

```yaml
mechanic_window: all current Reality Anchor v0 runtime rules available
allowed_exposure_through: all_current_reality_anchor_runtime_rules
claimed_core_events:
  returned_solution:
    - pull_object
    - force_chain
    - anchor_boundary_shift:push_pull
    - anchor_boundary_shift:box_sticky
    - box_to_sticky
    - move_sticky_rigid
  all_winning_paths: not_claimed
```

## design_target

```yaml
aesthetic_score_target: unscored_missing_human_archive_context
difficulty_score_target: unscored_missing_human_archive_context
target_role_notes: >
  尝试做后期高难候选。核心审美目标是让竖直 P/L 与水平 B/S 在同一条路径中
  交替承担角色，而不是各自作为一次性 witness。
```

## solve_instance

```yaml
layout: |-
  ##########
  #....G.###
  #.....P###
  #@CBSMLG##
  ###..M..##
  #####G####
  ##########
player_start: [1, 3]
player_goal: not_applicable
win_condition: all_targets_covered_by_objects
anchor_orientation:
  push_pull_anchor: vertical
  box_sticky_anchor: horizontal
```

## mechanism_scope

```yaml
central:
  - vertical P/L creates push-vs-pull side changes used by the returned solution
  - horizontal B/S is moved more than once and later sweeps cargo across material boundary
  - a box becomes sticky on the returned solution
  - sticky rigidity is later consumed to cover targets
allowed_support:
  - force_chain
  - anchor cells as final target-covering objects
  - ordinary walking/repositioning
incidental_allowed:
  - alternate longer material-normalization direction if it still uses both anchors and pull
required_winning_path_events:
  all_paths: not_claimed
  returned_shortest_solution_contains:
    - pull_object
    - anchor_boundary_shift:push_pull
    - anchor_boundary_shift:box_sticky
    - box_to_sticky
    - move_sticky_rigid
forbidden_winning_path_events: []
forbidden_if_seen_anywhere: []
```

## design_claim

```yaml
player_insight: >
  The intended solve asks the player to read two perpendicular cuts. The vertical
  P/L cut changes whether the player can push or must pull in the upper/lower
  lanes; the horizontal B/S cut changes whether the cargo remains a box or joins
  the sticky economy. The returned shortest solution uses both cuts before the
  final target-cover pushes.
causal_chain:
  - Push and pull the horizontal B/S anchor while carrying a crate relation through the pull side.
  - Use the vertical P/L anchor as a later movable gate, including a push_pull boundary shift.
  - Move sticky cargo into the lower target, then move B/S left so the held crate normalizes into sticky material.
  - Use the converted/sticky cargo to cover the upper target while the anchor positions constrain the remaining route.
why_not_execution: >
  The route is not just a straight force chain: it alternates pull-side handling,
  B/S displacement, P/L displacement, material conversion, and sticky body pushes
  across separated lanes. A local-only player can see legal moves, but the
  value of early B/S movement is only paid off after P/L relocation and later
  material normalization.
falsification:
  - A complete or stronger bounded search finds a same-depth or shorter win missing either anchor shift.
  - A complete or stronger bounded search finds a same-depth or shorter win with no pull event.
  - A complete or stronger bounded search finds a same-depth or shorter win with no material normalization.
  - Human/critic review finds the 21-step route is still mostly local execution rather than a real dual-cut insight.
```

## evidence

```yaml
commands_run:
  - npm run check
  - npx tsx src/cli.ts solve prototypes/reality_anchor RA_EXP_2026_07_04_DUAL_AXIS_LOCK_v1
  - npx tsx src/cli.ts explain-level prototypes/reality_anchor RA_EXP_2026_07_04_DUAL_AXIS_LOCK_v1 --max-states 1000000 --graph-max-states 1000000 --write
  - npx tsx prototypes/reality_anchor/reports/probe_dual_axis_candidate.ts prototypes/reality_anchor/reports/scratch_dual_axis_layout.txt RA_EXP_2026_07_04_DUAL_AXIS_LOCK_v1_material_d40 300000 40
  - npx tsx src/cli.ts evaluate prototypes/reality_anchor
solver_result:
  found: true
  cost: 21
  explored_states: 1917
  inputs: up right right down right up up right right down left down right left left left up left up right right
trace_summary:
  event_counts:
    walk: 10
    push_object:box_sticky_anchor: 3
    anchor_boundary_shift:box_sticky: 4
    pull_object:crate#1: 1
    pull_object:box_sticky_anchor: 1
    force_chain:n2: 1
    push_object:push_pull_anchor: 2
    anchor_boundary_shift:push_pull: 2
    push_object:sticky#1: 4
    move_sticky_rigid: 4
    box_to_sticky:n1: 1
target_events:
  K_runtime_smoke:
    detector_configured: false
    note: v0 knowledge has no formal event detector; use trace/event probe evidence instead.
object_or_instance_evidence:
  analyzer_object_participation: none reported by generic parser
winning_path_event_checks:
  returned_solution_contains_core_events: true
  bounded_missing_event_group_probe_d40:
    source: prototypes/reality_anchor/reports/event_probe_RA_EXP_2026_07_04_DUAL_AXIS_LOCK_v1_material_d40.md
    budget:
      max_states: 300000
      max_depth: 40
    required_groups:
      - push_pull_anchor_shift
      - box_sticky_anchor_shift
      - pull_event
      - material_normalization
      - sticky_rigid_move
    result: no bypass found within depth 40, but status is depth_exhausted
reachable_event_exposure:
  complete_scan: not_available
graph_or_counterfactual_evidence:
  level_analysis:
    source: prototypes/reality_anchor/reports/level_analysis_RA_EXP_2026_07_04_DUAL_AXIS_LOCK_v1.md
    graph_status: exhausted
    reachable_states: 1000001
    legal_transitions: 2424403
    reason: state budget exceeded
  counterfactuals: none configured
evidence_limits:
  - Full reachable graph did not complete even at 1,000,000 states.
  - No all-winning-path or unique-solution claim is made.
  - Bounded event probe is useful negative evidence up to depth 40, not a complete proof.
  - K_runtime_smoke is a v0 smoke target with no formal detector.
```

## diagnostic_routing

```yaml
hard_evidence:
  ask_reviewer_to_check:
    - returned trace supports the stated returned-solution event claims
    - packet does not overclaim all-path necessity
    - graph exhaustion is correctly downgraded to evidence limit
mechanism_scope:
  central_claim_is_trace_supported: yes
  all_path_claim: no
claim_hygiene:
  risk: player_insight wording may still sound like necessity; read with evidence limits.
taste_probes:
  - Does the two-axis structure feel like a real late-game dual-cut puzzle or mostly a long route?
  - Are the separated target lanes legible enough despite compact walls?
scc_graph:
  graph_status: exhausted
  use_for_quality: false
variant_family:
  fresh_candidate: true
start_position:
  single_start: [1, 3]
prototype_specific_work:
  design_handoff: not_found
  pre_human_submission_pass: not_applicable
```

## prototype_specific_contracts

```yaml
interface_pair_policy:
  declared_interface_points: []
  target_pairs: []
  ignored_pair_classes: []
  risky_pair_classes: []
pair_diagnostics:
  ignored_pairs: []
  risky_pairs: []
```

## archive_lineage_policy

```yaml
default: fresh_required
authorized_archive_variant_work:
  enabled: false
  authorized_by: null
  candidate_ids: []
  allowed_operations: []
candidate_relation: fresh
why_not_archive_variant: >
  reality_anchor has no clean human-reviewed design archive. The candidate was
  built from a fresh claim and local structural probes, not from an archived
  layout, route, object role, or candidate id.
```

## attempt_log

```yaml
serious_structural_attempts:
  - V0: P/L horizontal and B/S vertical; solvable cost 12 but no pull and graph exhausted.
  - V1: P/L vertical and B/S horizontal; cost 19 with pull, but no explicit material conversion.
  - V2: added box-side crate for horizontal B/S sweep; cost 21 with box_to_sticky.
  - V3/V5: tightened unused side space while preserving the 21-step route.
local_repairs:
  - removed upper/right dead space
  - avoided declaring full graph complete
  - changed event probe from box_to_sticky-only to material_normalization group
abandoned_families:
  - raw sampler short witnesses: rejected as too short and not orthogonal-anchor-specific
```

## archive_taste_context

```yaml
examples: []
none_found_reason: >
  prototypes/reality_anchor has no design_archive directory and no clean
  human-reviewed candidate records. Critic must not output scored aesthetic or
  difficulty claims.
negative_anchor_none_found: true
score_claim_allowed: false
```

## claim_last_review

```yaml
mode: not_used
facts_packet: not_applicable
claim_packet: not_applicable
read_order: not_applicable
```
