# Candidate packet: RA_EXP_2026_07_04_DUAL_AXIS_LOCK_v3

```yaml
candidate_version: RA_EXP_2026_07_04_DUAL_AXIS_LOCK_v3
review_iteration: review_3
prototype: reality_anchor
review_integrity: pending_independent_review
archive_eligibility: human_pending
score_claim_allowed: false
```

## prototype_context

```yaml
confirmed_rules:
  - P/L 是可移动推拉锚点；P 侧为 push world，L 侧为 pull world。
  - B/S 是可移动箱黏锚点；B 侧为 box world，S 侧为 sticky world。
  - 箱/黏归一化在合法移动后结算；黏格四邻接自动合并为刚体。
  - 目标由箱、黏块或锚点格覆盖。
win_condition: all_targets_covered_by_objects
tool_boundary:
  runtime_adapter: implemented
  solver: implemented
  layout_analyzer: implemented
  graph_agency: complete_on_candidate
  puzzlescript_exporter: unavailable
  curated_miner: unavailable
```

## slot_brief

```yaml
intended_role: late-game challenge
known_before:
  - K_runtime_smoke
target: orthogonal dual-anchor + remote sticky merge challenge
difficulty_or_support_expectation: high difficulty attempt, support none
brief_requirement:
  - one horizontal anchor: B/S
  - one vertical anchor: P/L
  - different anchor types
```

## mechanic_exposure_context

```yaml
mechanic_window: all current Reality Anchor v0 runtime rules available
allowed_exposure_through: all_current_reality_anchor_runtime_rules
claimed_core_events:
  all_winning_paths:
    - anchor_boundary_shift:push_pull
    - anchor_boundary_shift:box_sticky
    - pull_object
    - material_normalization
    - sticky_merge
    - move_sticky_rigid
  returned_solution:
    - force_chain
    - box_to_sticky
```

## design_target

```yaml
aesthetic_score_target: unscored_missing_human_archive_context
difficulty_score_target: unscored_missing_human_archive_context
target_role_notes: >
  v3 is a support-none late-game attempt. It strengthens v2 by making the upper
  target visibly require a remote rigid-body push: the upper sticky cell cannot
  be pushed from its sealed left face, so a lower crate must be converted and
  merged into it.
```

## solve_instance

```yaml
layout: |-
  ##########
  #.##MG.###
  #.....P###
  #@CBSMLG##
  ###..M..##
  #####G####
  ##########
player_start: [1, 3]
win_condition: all_targets_covered_by_objects
anchor_orientation:
  push_pull_anchor: vertical
  box_sticky_anchor: horizontal
visible_debts:
  upper_goal: M is left-sealed; must be moved by a later merged lower half
  right_goal: P/L placement participates in target coverage and lane access
  lower_goal: sticky body must be pushed into the lower pocket
```

## mechanism_scope

```yaml
central:
  - both orthogonal anchors must shift on every winning path
  - pull-side interaction is required on every winning path
  - material normalization and sticky_merge are required on every winning path
  - sticky rigid movement is required on every winning path
allowed_support:
  - force_chain
  - anchor target coverage
  - ordinary walking/repositioning
incidental_allowed:
  - multiple post-opening commitments
required_winning_path_events:
  complete_product_probe:
    - push_pull_anchor_shift
    - box_sticky_anchor_shift
    - pull_event
    - material_normalization
    - sticky_merge
    - sticky_rigid_move
forbidden_winning_path_events: []
forbidden_if_seen_anywhere: []
```

## design_claim

```yaml
player_insight: >
  The player should read the top lane as a remote-push debt: the visible M beside
  the upper goal cannot be pushed from the left because of the wall, so another
  cell must become sticky below it and merge. That makes the B/S boundary more
  than a switch to touch later; it must be positioned so the carried crate turns
  into the lower half of a vertical sticky body. P/L supplies the orthogonal debt:
  its vertical placement is needed to use pull-side access early and later to
  finish the right-side target/lane commitment.
causal_chain:
  - Move B/S and pull the crate/B-S relation upward, establishing the material-boundary debt.
  - Move P/L to open the lower/right commitment chain while preserving access.
  - Use existing sticky motion for the lower target, then re-enter the B/S boundary.
  - Push the carried crate across B/S; it becomes sticky and merges with the sealed upper M.
  - Push the merged sticky body from the lower half so the upper half covers the upper target.
why_not_execution: >
  The key structure is visible before the route is executed: a left-sealed upper
  sticky cell next to a target cannot be solved by direct pushing. The player must
  create a lower handle for it. Complete event-probe evidence supports that every
  winning path consumes the relevant mechanism groups, including sticky_merge,
  rather than merely witnessing them on one returned trace.
falsification:
  - reviewer finds the sticky_merge event probe is not a valid all-winning-path group check.
  - critic finds the sealed upper sticky still reads as clutter rather than a remote-push debt.
  - future playtest finds players solve by local trial without recognizing the lower-handle idea.
```

## evidence

```yaml
commands_run:
  - npm run check
  - npx tsx src/cli.ts solve prototypes/reality_anchor RA_EXP_2026_07_04_DUAL_AXIS_LOCK_v3
  - npx tsx src/cli.ts explain-level prototypes/reality_anchor RA_EXP_2026_07_04_DUAL_AXIS_LOCK_v3 --max-states 300000 --graph-max-states 300000 --write
  - npx tsx prototypes/reality_anchor/reports/probe_dual_axis_candidate.ts prototypes/reality_anchor/reports/RA_EXP_2026_07_04_DUAL_AXIS_LOCK_v3_layout.txt RA_EXP_2026_07_04_DUAL_AXIS_LOCK_v3 300000 80
  - npx tsx src/cli.ts evaluate prototypes/reality_anchor
solver_result:
  found: true
  cost: 22
  explored_states: 900
  inputs: up right right down right up right up right down left down right up left left down left left up right right
trace_summary:
  event_counts:
    walk: 13
    push_object:box_sticky_anchor: 2
    anchor_boundary_shift:box_sticky: 3
    pull_object:crate#1: 1
    pull_object:box_sticky_anchor: 1
    force_chain:n2: 1
    push_object:push_pull_anchor: 2
    anchor_boundary_shift:push_pull: 2
    push_object:sticky#2: 1
    move_sticky_rigid: 2
    push_object:crate#1: 1
    box_to_sticky:n1: 1
    sticky_merge:n1: 1
    push_object:sticky#1: 1
target_events:
  K_runtime_smoke:
    detector_configured: false
    note: v0 smoke target; formal event necessity is supplied by event_probe.
winning_path_event_checks:
  complete_event_group_probe:
    source: prototypes/reality_anchor/reports/event_probe_RA_EXP_2026_07_04_DUAL_AXIS_LOCK_v3.md
    budget:
      max_states: 300000
      max_depth: 80
    required_groups:
      - push_pull_anchor_shift
      - box_sticky_anchor_shift
      - pull_event
      - material_normalization
      - sticky_merge
      - sticky_rigid_move
    combined_probe:
      found_bypass: false
      status: complete
      explored_states: 2984
    individual_probes:
      push_pull_anchor_shift: { found_bypass: false, status: complete, explored_states: 1688 }
      box_sticky_anchor_shift: { found_bypass: false, status: complete, explored_states: 1712 }
      pull_event: { found_bypass: false, status: complete, explored_states: 2243 }
      material_normalization: { found_bypass: false, status: complete, explored_states: 1975 }
      sticky_merge: { found_bypass: false, status: complete, explored_states: 1668 }
      sticky_rigid_move: { found_bypass: false, status: complete, explored_states: 1882 }
graph_or_counterfactual_evidence:
  level_analysis:
    source: prototypes/reality_anchor/reports/level_analysis_RA_EXP_2026_07_04_DUAL_AXIS_LOCK_v3.md
    graph_status: complete
    reachable_states: 1668
    legal_transitions: 4109
    winning_states: 15
  agency:
    status: complete
    compressed_regions: 153
    commitment_transitions: 286
    initial_region:
      states: 12
      commitments: 2
      viable_commitments: 1
      dead_commitments: 1
      progress_commitments: 1
      optimal_commitments: 1
    scc:
      win_subgraph: branching_win_dag
      solution_irreversible_steps: 7
      forced_win_prefix: 2
evidence_limits:
  - K_runtime_smoke has no formal detector.
  - Event-group proof is group-level, not per-object unique-route proof.
  - Analyzer object participation remains generic and reports no instance-level participation.
```

## diagnostic_routing

```yaml
hard_evidence:
  ask_reviewer_to_check:
    - complete graph status for v3
    - complete event-group probe including sticky_merge
    - no per-object or unique-solution overclaim
mechanism_scope:
  all_path_event_group_claim: yes, via complete event probe
  unique_solution_claim: no
claim_hygiene:
  player_readability: critic judgment required
taste_probes:
  - Does the sealed upper M next to G read as a remote-push debt?
  - Does the lower converted sticky cell function as a visible handle, not a hidden trick?
scc_graph:
  use_with_interpretation: graph_fact -> neutral_meaning -> player_facing_interpretation
variant_family:
  relation_to_v2: structural_revision_after_review_2
start_position:
  single_start: [1, 3]
prototype_specific_work:
  design_handoff: not_found
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
  reality_anchor has no clean human-reviewed design archive. v3 derives from
  this turn's fresh design claim and review_1/review_2 structural revisions.
```

## attempt_log

```yaml
serious_structural_attempts:
  - v1: dual-anchor route; rejected as event choreography.
  - v2: complete graph and event-group proof; rejected because upper sealed crate read like blockage/clutter.
  - v3: sealed upper sticky cell plus wall; later crate must convert and sticky_merge into lower handle.
local_repairs:
  - added sticky_merge to event-group probe.
  - removed top-left direct push access.
  - preserved full graph completeness with a smaller state space.
abandoned_families:
  - unsealed upper M variant: direct top push bypassed B/S and pull.
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
