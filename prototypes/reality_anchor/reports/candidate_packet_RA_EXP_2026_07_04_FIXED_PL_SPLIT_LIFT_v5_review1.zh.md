# Candidate Packet: RA_EXP_2026_07_04_FIXED_PL_SPLIT_LIFT_v5 review1

```yaml
prototype_context:
  prototype: reality_anchor
  confirmed_rules:
    - P/L anchor divides push side and pull side.
    - B/S anchor divides box side and sticky side.
    - Sticky components move as rigid bodies and may normalize into crates after crossing to B side.
    - Win condition is all targets covered by objects.
  win_condition: all_targets_covered_by_objects
  object_and_event_semantics:
    anchor_boundary_shift:box_sticky: B/S anchor object moved by force.
    anchor_boundary_shift:push_pull: P/L anchor object moved by force.
    sticky_to_box: sticky cell normalized onto B side and became a crate.
    move_sticky_rigid: a sticky component moved as a rigid body.
    pull_object: object moved by pull-side action.
  tool_boundary:
    - Solver/analyzer/probes are factual evidence, not quality verdicts.
    - No object-instance necessity is claimed.

slot_brief:
  intended_role: mid_game_fixed_anchor_transition
  known_before: [K_runtime_smoke, all_current_reality_anchor_runtime_rules_allowed]
  target:
    - two anchors in one level.
    - P/L is fixed in a wall pocket but globally used.
    - B/S is movable once and must create non-substitutable material structure.
  difficulty_or_support_expectation:
    - low/mid transition, not late-game hard.
    - sticky/box difference must be structural, not step economy.

mechanic_exposure_context:
  mechanic_window: all_current_reality_anchor_runtime_rules
  allowed_exposure_through: all_current_reality_anchor_runtime_rules
  claimed_core_events:
    - anchor_boundary_shift:box_sticky
    - pull_object
    - sticky_to_box
    - move_sticky_rigid

design_target:
  aesthetic_score_target: unscored_missing_lower_bound_archive_context
  difficulty_score_target: unscored_missing_lower_bound_archive_context
  target_role_notes:
    - compact transition showing sticky rigid movement followed by material split.
    - no numeric score claim because clean human archive has only positive anchors.
```

## Solve Instance

```yaml
candidate_version: RA_EXP_2026_07_04_FIXED_PL_SPLIT_LIFT_v5
layout_file: prototypes/reality_anchor/reports/RA_EXP_2026_07_04_FIXED_PL_SPLIT_LIFT_v5_layout.txt
player_start: [7, 1]
player_goal: null
win_condition: all_targets_covered_by_objects
push_pull_anchor: fixed_vertical_wall_pocket
box_sticky_anchor: movable_vertical_shaft
```

```text
###########
#P#....@..#
#L##G#.B#.#
####.##S#.#
####m##.#.#
####M####.#
###########
```

## Mechanism Scope

```yaml
central:
  - Fixed P/L makes the target column a pull-side manipulation lane.
  - B/S must be pushed down once so the material boundary sits between the intermediate top cell and the lower target.
  - First pull moves the vertical sticky pair as a rigid body and triggers sticky_to_box on the upper cell.
  - Second pull moves only the split-off crate to the upper target while the lower sticky cell remains on the lower target.
allowed_support:
  - short walking route from B/S shaft to pull lane.
incidental_allowed:
  - reachable box_to_sticky or sticky_merge outside the returned solution.
required_winning_path_events:
  - anchor_boundary_shift:box_sticky
  - pull_object
  - sticky_to_box
  - move_sticky_rigid
forbidden_winning_path_events: []
forbidden_if_seen_anywhere:
  - anchor_boundary_shift:push_pull
```

## Design Claim

```yaml
player_insight: >
  The two goals are separated by a gap, so an adjacent sticky pair cannot simply end on both goals.
  The pair must first move together, then split: the upper sticky cell becomes a crate that can be pulled
  onward, while the lower sticky cell stays on the lower target.
causal_chain:
  - Push B/S down in its shaft.
  - Walk to the pull lane above the vertical sticky pair.
  - Pull the sticky pair up once; sticky rigidity moves both cells together, and the upper cell crosses to B side.
  - The upper cell becomes a crate, so the pair is no longer a rigid sticky component.
  - Pull the crate up once more to cover the upper target; the lower sticky cell remains on the lower target.
why_not_execution: >
  The ordinary-box analog is complete and unsolved. With two boxes, the first pull can move only the upper
  box, leaving the lower target empty; sealed side cells prevent moving the upper box aside to recover.
  Therefore the sticky phase is a necessary common lift before the material split, not just a shorter route.
falsification:
  - Any winning path missing B/S shift, pull, sticky_to_box, or sticky rigid movement rejects the claim.
  - Any reachable P/L movement rejects the fixed-anchor claim.
  - Any solvable ordinary-box analog rejects material necessity.
```

## Evidence

```yaml
commands_run:
  - npx tsx src/cli.ts explain-layout prototypes/reality_anchor prototypes/reality_anchor/reports/RA_EXP_2026_07_04_FIXED_PL_SPLIT_LIFT_v5_layout.txt --id RA_EXP_2026_07_04_FIXED_PL_SPLIT_LIFT_v5 --title "Fixed P/L split lift v5" --role challenge --support none --targets K_runtime_smoke --max-states 400000 --graph-max-states 400000 --write
  - npx tsx src/cli.ts explain-layout prototypes/reality_anchor prototypes/reality_anchor/reports/RA_EXP_2026_07_04_FIXED_PL_SPLIT_LIFT_v5_box_analog_layout.txt --id RA_EXP_2026_07_04_FIXED_PL_SPLIT_LIFT_v5_box_analog --title "Fixed P/L split lift v5 box analog" --role challenge --support none --targets K_runtime_smoke --max-states 400000 --graph-max-states 400000 --write
  - npx tsx prototypes/reality_anchor/reports/probe_fixed_anchor_candidate.ts prototypes/reality_anchor/reports/RA_EXP_2026_07_04_FIXED_PL_SPLIT_LIFT_v5_layout.txt RA_EXP_2026_07_04_FIXED_PL_SPLIT_LIFT_v5 push_pull 400000 100 default
  - npx tsx prototypes/reality_anchor/reports/probe_dual_axis_candidate.ts prototypes/reality_anchor/reports/RA_EXP_2026_07_04_FIXED_PL_SPLIT_LIFT_v5_layout.txt RA_EXP_2026_07_04_FIXED_PL_SPLIT_LIFT_v5_core4 400000 100 box_sticky_anchor_shift=anchor_boundary_shift:box_sticky pull_event=pull_object sticky_to_box=sticky_to_box sticky_rigid_move=move_sticky_rigid
solver_result:
  found: true
  cost: 9
  depth: 9
  explored_states: 33
  inputs: down left up left left down down up up
trace_summary:
  events:
    - push_object:box_sticky_anchor
    - anchor_boundary_shift:box_sticky
    - walk
    - walk
    - walk
    - walk
    - walk
    - walk
    - pull_object:sticky#1
    - move_sticky_rigid
    - sticky_to_box:n1
    - pull_object:crate#1
object_or_instance_evidence:
  reported: none
  limit: no per-object necessity claim
winning_path_event_checks:
  fixed_anchor_probe_default:
    status: complete
    combined_missing_required_bypass_found: false
    individual_missing_required_bypass_found:
      movable_box_sticky_shift: false
      fixed_push_pull_effect: false
      material_normalization: false
  custom_core4_event_probe:
    status: complete
    combined_missing_required_bypass_found: false
    individual_missing_required_bypass_found:
      box_sticky_anchor_shift: false
      pull_event: false
      sticky_to_box: false
      sticky_rigid_move: false
reachable_event_exposure:
  original_graph_status: complete
  reachable_states: 81
  legal_transitions: 161
  forbidden_anchor_boundary_shift_push_pull_hits: none
graph_or_counterfactual_evidence:
  original_graph:
    status: complete
    reachable_states: 81
    winning_states: 25
    scc_shape: sccs=4, edges=4, winSubgraph=branching_win_dag
  ordinary_box_analog:
    layout_file: prototypes/reality_anchor/reports/RA_EXP_2026_07_04_FIXED_PL_SPLIT_LIFT_v5_box_analog_layout.txt
    found: false
    graph_status: complete
    reachable_states: 33
    winning_states: 0
evidence_refs:
  - prototypes/reality_anchor/reports/layout_analysis_RA_EXP_2026_07_04_FIXED_PL_SPLIT_LIFT_v5.md
  - prototypes/reality_anchor/reports/layout_analysis_RA_EXP_2026_07_04_FIXED_PL_SPLIT_LIFT_v5_box_analog.md
  - prototypes/reality_anchor/reports/fixed_anchor_probe_RA_EXP_2026_07_04_FIXED_PL_SPLIT_LIFT_v5.md
  - prototypes/reality_anchor/reports/event_probe_RA_EXP_2026_07_04_FIXED_PL_SPLIT_LIFT_v5_core4.md
evidence_limits:
  - Tool evidence proves event gates and this analog, not universal impossibility over all imaginable variants.
  - No human playtest evidence yet.
  - No object-instance necessity is claimed.
```

## Key Snapshots

```text
step 0
###########
#P#....@..#
#L##G#.B#.#
####.##S#.#
####m##.#.#
####M####.#
###########

step 1 down: B/S shifts down
###########
#P#.......#
#L##G#.@#.#
####.##B#.#
####m##S#.#
####M####.#
###########

step 8 up: sticky pair lifts; upper cell becomes crate, lower stays on lower target
###########
#P#.......#
#L##+#..#.#
####C##B#.#
####m##S#.#
####.####.#
###########

step 9 up: split-off crate covers upper target
###########
#P#.@.....#
#L##*#..#.#
####.##B#.#
####m##S#.#
####.####.#
###########
```

## Diagnostic Routing

```yaml
hard_evidence:
  evidence_reviewer_should_check:
    - original is solvable and graph complete.
    - fixed P/L has no reachable movement event.
    - all winning paths require B/S shift, pull, sticky_to_box, and sticky rigid movement.
    - ordinary-box analog is complete unsolved.
mechanism_scope:
  central_claims:
    - sticky rigidity is necessary before split.
    - sticky_to_box split is necessary before final crate pull.
claim_hygiene:
  fresh_required: true
  no_archive_variant_authorization: true
taste_probes:
  critic_should_attack:
    - Is this too much like a narrow scripted demonstration?
    - Is the split-lift insight player-legible from the target gap and sealed side cells?
    - Does B/S feel like a meaningful material boundary or just a one-step setup switch?
scc_graph:
  graph_fact: original complete graph; reachable_states=81; solution has two main commitment steps and one short scripted handoff after setup.
  neutral_meaning: The state space is small and the route is compact with limited exploration.
  player_facing_interpretation: Suitable as a transition/witness candidate if the split-lift relation is readable; too small for high-difficulty claims.
  verdict_effect_request: critic_decide
variant_family:
  relation: local repairs within fresh split-lift family after v1-v4 failed hard gates.
start_position:
  fixed_start: [7, 1]
prototype_specific_work:
  design_handoff: not_found
  pre_human_submission_pass: not_applicable
```

## Prototype Specific Contracts

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

## Archive Lineage Policy

```yaml
default: fresh_required
authorized_archive_variant_work:
  enabled: false
  authorized_by: null
  candidate_ids: []
  allowed_operations: []
candidate_relation: fresh
why_not_archive_variant: >
  Clean archive entries were read only for human taste calibration. This candidate uses a fixed P/L
  pull lane plus a B/S vertical shaft and a split-lift structure, not the archived layouts or routes.
```

## Attempt Log

```yaml
serious_structural_attempts:
  - id: RA_EXP_2026_07_04_FIXED_PL_SPLIT_LIFT_v1
    result: abandoned_before_review
    reason: B/S could cover a target directly and ordinary-box analog was malformed.
  - id: RA_EXP_2026_07_04_FIXED_PL_SPLIT_LIFT_v2
    result: abandoned_before_review
    reason: B/S shift was not required; adjacent targets could be covered by unsplit sticky pair.
  - id: RA_EXP_2026_07_04_FIXED_PL_SPLIT_LIFT_v3
    result: abandoned_before_review
    reason: intended layout was unsolved because leaving the B/S shaft pulled the anchor back.
  - id: RA_EXP_2026_07_04_FIXED_PL_SPLIT_LIFT_v4
    result: abandoned_before_review
    reason: original worked, but ordinary-box analog had a 23-step workaround via side space.
local_repairs:
  - added side exit from B/S shaft.
  - separated upper and lower targets by one gap.
  - sealed left/right side cells around upper target to block ordinary-box workaround.
abandoned_families: []
```

## Archive Taste Context

```yaml
examples:
  - candidate_id: RA_CAND_0001
    human_reviewed: true
    archive_eligibility: clean_archive
    human_comment: >
      机制使用多样、关卡设计密度高、各要素强耦合，玩家视角矛盾明显，
      综合质量较高的好关。
    relevance: positive anchor for compact coupling and visible player conflict.
  - candidate_id: RA_CAND_0002
    human_reviewed: true
    archive_eligibility: clean_archive
    human_comment: >
      对关卡中要素有充分利用，使用拉动黏块打破了“推拉锚点只能被单向移动”的假设，
      具有较强洞见。
    relevance: positive anchor for pull/sticky coupling and insight over execution.
negative_anchor_none_found: >
  Current clean human-reviewed archive contains only two accepted positive entries for this prototype.
score_claim_allowed: false
```

## Claim Last Review

```yaml
mode: not_used
facts_packet: not_applicable
claim_packet: not_applicable
read_order: not_applicable
```
