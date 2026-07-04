# Candidate packet: RA_EXP_2026_07_04_DUAL_AXIS_LOCK_v2

```yaml
candidate_version: RA_EXP_2026_07_04_DUAL_AXIS_LOCK_v2
review_iteration: review_2
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
  - 同类型锚点每关最多一个；两类锚点可以共存并独立判定。
  - 箱/黏归一化在合法移动后结算；黏块四邻接自动合并为刚体。
  - 所有目标必须由箱、黏块或任意锚点格覆盖。
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
target: orthogonal dual-anchor challenge
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
  all_winning_paths:
    - anchor_boundary_shift:push_pull
    - anchor_boundary_shift:box_sticky
    - pull_object
    - material_normalization
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
  v2 aims to be a compact late-game challenge where the player must move both
  orthogonal anchor cuts and consume both pull-side and sticky-body consequences.
  No numeric aesthetic or difficulty score is claimed.
```

## solve_instance

```yaml
layout: |-
  ##########
  #.#C.G.###
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
targets:
  - upper goal behind a sealed-left face
  - right goal covered by final P/L placement
  - lower goal covered by sticky-body movement
```

## mechanism_scope

```yaml
central:
  - both orthogonal anchors must shift on every winning path in the complete product search
  - pull-side interaction is required on every winning path
  - material normalization is required on every winning path under the real rules
  - sticky rigid movement is required on every winning path
allowed_support:
  - force_chain
  - anchor target coverage
  - ordinary walking/repositioning
incidental_allowed:
  - multiple optimal commitments after the opening
required_winning_path_events:
  complete_product_probe:
    - push_pull_anchor_shift
    - box_sticky_anchor_shift
    - pull_event
    - material_normalization
    - sticky_rigid_move
forbidden_winning_path_events: []
forbidden_if_seen_anywhere: []
```

## design_claim

```yaml
player_insight: >
  The player has to treat the two anchors as different cuts with different debts:
  B/S must be displaced early enough to make the carried crate cross material
  sides later, while P/L must be moved to create the right-side target cover and
  to keep lower sticky movement viable. The upper sealed-left crate prevents the
  top target from being solved as a direct one-box push, so the player must use
  the lower route and later material transition instead.
causal_chain:
  - Use the horizontal B/S anchor from the pull-side lane, then pull the carried crate and B/S relation upward.
  - Move the vertical P/L anchor so the right target and lower lane become part of the same commitment chain.
  - Spend a sticky-body push on the lower target before returning to the B/S cut.
  - Reposition B/S and push the carried crate across the material boundary.
  - Use the resulting sticky movement to cover the upper target, then finish with P/L target coverage.
why_not_execution: >
  The opening complete graph has two commitments from the initial region, only
  one of which is viable. The final solve is not justified by event variety alone:
  complete product evidence says every winning path must include both anchor
  shifts, pull, material normalization, and sticky rigid movement. The remaining
  player-side question is whether the visible sealed top face and lower/right
  target debts make that necessity readable rather than merely forced.
falsification:
  - independent reviewer finds the event probe does not actually prove the all-winning-path event groups.
  - critic finds the complete graph facts still do not translate into a readable dual-anchor insight.
  - a stronger human/playtest review reports that the top sealed crate reads as clutter rather than clue.
```

## evidence

```yaml
commands_run:
  - npm run check
  - npx tsx src/cli.ts solve prototypes/reality_anchor RA_EXP_2026_07_04_DUAL_AXIS_LOCK_v2
  - npx tsx src/cli.ts explain-level prototypes/reality_anchor RA_EXP_2026_07_04_DUAL_AXIS_LOCK_v2 --max-states 300000 --graph-max-states 300000 --write
  - npx tsx prototypes/reality_anchor/reports/probe_dual_axis_candidate.ts prototypes/reality_anchor/reports/RA_EXP_2026_07_04_DUAL_AXIS_LOCK_v2_layout.txt RA_EXP_2026_07_04_DUAL_AXIS_LOCK_v2 300000 80
  - npx tsx src/cli.ts evaluate prototypes/reality_anchor
solver_result:
  found: true
  cost: 25
  explored_states: 1479
  inputs: up right right down right up up right right down left down up left down left left up right right down right up down right
trace_summary:
  event_counts:
    walk: 15
    push_object:box_sticky_anchor: 2
    anchor_boundary_shift:box_sticky: 3
    pull_object:crate#2: 1
    pull_object:box_sticky_anchor: 1
    force_chain:n2: 1
    push_object:push_pull_anchor: 2
    anchor_boundary_shift:push_pull: 2
    push_object:sticky#1: 3
    move_sticky_rigid: 3
    push_object:crate#2: 1
    box_to_sticky:n1: 1
target_events:
  K_runtime_smoke:
    detector_configured: false
    note: v0 smoke target; formal event necessity is supplied by event_probe, not knowledge detector.
winning_path_event_checks:
  complete_event_group_probe:
    source: prototypes/reality_anchor/reports/event_probe_RA_EXP_2026_07_04_DUAL_AXIS_LOCK_v2.md
    budget:
      max_states: 300000
      max_depth: 80
    required_groups:
      - push_pull_anchor_shift
      - box_sticky_anchor_shift
      - pull_event
      - material_normalization
      - sticky_rigid_move
    combined_probe:
      found_bypass: false
      status: complete
      explored_states: 4977
    individual_probes:
      push_pull_anchor_shift: { found_bypass: false, status: complete, explored_states: 3150 }
      box_sticky_anchor_shift: { found_bypass: false, status: complete, explored_states: 3176 }
      pull_event: { found_bypass: false, status: complete, explored_states: 3746 }
      material_normalization: { found_bypass: false, status: complete, explored_states: 3875 }
      sticky_rigid_move: { found_bypass: false, status: complete, explored_states: 3360 }
graph_or_counterfactual_evidence:
  level_analysis:
    source: prototypes/reality_anchor/reports/level_analysis_RA_EXP_2026_07_04_DUAL_AXIS_LOCK_v2.md
    graph_status: complete
    reachable_states: 3128
    legal_transitions: 7877
    winning_states: 16
  agency:
    status: complete
    compressed_regions: 286
    commitment_transitions: 594
    initial_region:
      states: 13
      commitments: 2
      viable_commitments: 1
      dead_commitments: 1
      progress_commitments: 1
      optimal_commitments: 1
    scc:
      win_subgraph: branching_win_dag
      solution_irreversible_steps: 7
      forced_win_prefix: 2
counterfactual_notes:
  disabled_pull_force:
    result: unsolved complete in local probe
    use_in_packet: secondary_note_only
  disabled_push_force:
    result: unsolved complete in local probe
    use_in_packet: secondary_note_only
  disabled_box_sticky_normalize:
    result: solvable in altered-rule local probe
    interpretation: do not claim rule-level counterfactual necessity for normalization
evidence_limits:
  - K_runtime_smoke has no formal detector.
  - Analyzer object participation is generic and reports no instance-level participation.
  - Material normalization is all-winning-path required in the real-rule event product probe, but disabling the normalization rule in an altered-rule model remains solvable; do not overstate rule-level indispensability.
```

## diagnostic_routing

```yaml
hard_evidence:
  ask_reviewer_to_check:
    - complete graph status for v2
    - complete event-group probe semantics
    - no overclaim from altered-rule counterfactuals
mechanism_scope:
  all_path_event_group_claim: yes, via complete event probe
  unique_solution_claim: no
claim_hygiene:
  risk: player-side readability still needs critic judgment
taste_probes:
  - Does the sealed upper crate read as a clue/debt, or as clutter?
  - Does the complete graph's opening dead commitment translate into visible player pressure?
scc_graph:
  use_with_interpretation: graph_fact -> neutral_meaning -> player_facing_interpretation
variant_family:
  relation_to_v1: structural_revision_after_review_1
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
  reality_anchor has no clean human-reviewed design archive. v2 derives from
  this turn's fresh design claim and review_1 structural revision, not from any
  archived candidate.
```

## attempt_log

```yaml
serious_structural_attempts:
  - v1: 21-step dual-anchor route; rejected by critic as too event-list/choreography-like.
  - v2 target-shift: reduced one repeated sticky push but normalization counterfactual remained weak.
  - v2 sealed-top revision: added upper sealed crate/wall, produced complete graph and complete event-group probe.
local_repairs:
  - fixed rectangular row width after scratch render exposed a stray floor.
  - removed stale v1 trace tail from expected_trace.
abandoned_families:
  - sticky_merge attempt: either introduced direct top-box shortcut or long route noise.
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
