# Candidate Packet: ICE_EXP_META_2026_07_02_round32_mutual_anchor_d6_return_v1

## Prototype Context

```yaml
prototype: ice_slide_escape
win_condition:
  - all target cells must be occupied by ice
  - player must stand on the explicit edge goal for that solve instance
confirmed_rules:
  - target cells are floor for movement and sliding; occupied target ice blocks the player
  - `*` means target plus ice
  - extra ice outside target cells is allowed by `docs/rules.md`
  - d4 obstacle collision rebounds the moving ice one cell backward
  - d6+ obstacle collision destroys the full contiguous obstacle group
tool_boundary:
  - A->B and C->D are separate reset solve instances
  - no any-edge win is claimed
  - zero-step self-pairs caused by A=D or B=C have verdict_effect: none
```

## Slot Brief

```yaml
intended_role: meta_first_design candidate
fresh_requirement: true
special_requirements:
  - every target initially has ice
  - initial target ice seals the player start-to-goal corridor
  - base flow may use any knowledge stage, but the latest listed knowledge reachable in base must be required in every winning path
  - meta flow may use all knowledge
  - both base and meta difficulty should be >= 3
  - at least one of base/meta should be >= 4
  - aesthetic minimum is 4; pursue 5 if structurally justified
```

## Layout And Interfaces

```text
###############.##
###############.##
#...###########.##
..#.*....*....*.##
####I....I....####
##################
##################
##################
```

```yaml
A: [0, 3]
B: [15, 0]
C: [15, 0]
D: [0, 3]
base_instance:
  start: [0, 3]
  goal: [15, 0]
meta_instance:
  start: [15, 0]
  goal: [0, 3]
targets_initially_with_ice:
  - [4, 3]
  - [9, 3]
  - [14, 3]
extra_off_target_ice:
  - [4, 4]
  - [9, 4]
edge_floor_cells:
  - [15, 0]
  - [0, 3]
```

The brief requires every target to start occupied and target ice to seal the corridor. It does not require every ice block to be on a target. This candidate intentionally uses two extra off-target ice pieces as support/refill material.

## Mechanic Exposure Context

```yaml
mechanic_exposure_sequence_ref: prototypes/ice_slide_escape/docs/mechanic_exposure_sequence.yml
base_allowed_exposure_through: ice_destroy_group_d6_plus
meta_allowed_exposure_through: ice_destroy_group_d6_plus
claimed_core_events:
  base:
    - push_ice
    - ice_rebound_d4
    - ice_destroy_group_d6_plus
  meta:
    - push_ice
    - ice_rebound_d4
    - ice_destroy_group_d6_plus
required_winning_path_events:
  base:
    - ice_rebound_d4
    - ice_destroy_group_d6_plus
  meta:
    - ice_rebound_d4
    - ice_destroy_group_d6_plus
forbidden_winning_path_events: []
forbidden_if_seen_anywhere: []
```

This does not claim the preferred pre-d5 base window. The base route reaches the d6 branch, which is the latest listed branch in the exposure sequence, and separate complete probes show d6 is required for every base winning path.

## Design Target

```yaml
aesthetic_score_target: "4 stable; 5 only if critic accepts the compact mutual-anchor return as high-grade reinterpretation"
difficulty_score_target:
  base: ">=3, claimed 4-"
  meta: ">=4"
target_role_notes:
  - all three target ice blocks are visible solved-state locks on the only horizontal corridor
  - the left and right endpoints are the same physical cells across base/meta: A=D and B=C
  - extra ice is not the lock; it is support material for d6 route opening after target debt is repaid
```

## Design Claim

```yaml
player_insight: >
  The board begins in a solved target state, and that solved state is also the
  corridor lock. The player must temporarily make target debt, use the displaced
  ice as a future stopper/repayment tool, restore target coverage, and only then
  spend support ice through d6 to open the edge route.
base_causal_chain: >
  A->B first borrows the target ice at [4,3], then borrows [9,3]. The first
  borrowed ice becomes part of the repayment geometry for the second target.
  After [9,3] is restored, row-4 support ice is moved, [4,3] is restored, and
  a final d6 group destruction opens the route to B while all targets remain
  occupied.
meta_causal_chain: >
  C->D inverts the anchor order. It borrows [14,3] from the right, then borrows
  [9,3] using the left target side as the anchor pressure. It repays [9,3],
  moves the row-4 support material in the opposite orientation, repays [14,3],
  then uses a d6 group destruction to open the return to D.
why_not_execution_only: >
  The route is not just push, cross, restore on isolated doors. Both flows carry
  a nested target debt before the support material becomes useful, and the
  final d6 opening is only valid after the target row has been restored. Base
  and meta share the same three target anchors but reverse which side is
  borrowed first and which restored target becomes the later stopper.
falsification:
  - any target starts without ice
  - initial target ice does not seal A<->B as a pure walking corridor
  - any external edge floor exists outside [0,3] and [15,0]
  - a base winning path exists without ice_rebound_d4
  - a base winning path exists without ice_destroy_group_d6_plus
  - a meta winning path exists without ice_rebound_d4
  - a meta winning path exists without ice_destroy_group_d6_plus
  - critic judges the two extra off-target ice pieces to undermine the "target solved state is the lock" read
  - critic judges A=D / B=C to be only an interface trick rather than a meaningful return reinterpretation
```

## Evidence

```yaml
commands_run:
  - npx tsx src/cli.ts explain-layout prototypes/ice_slide_escape prototypes/ice_slide_escape/reports/ICE_EXP_META_2026_07_02_round32_mutual_anchor_d6_return_v1_layout.txt --id ICE_EXP_META_2026_07_02_round32_mutual_anchor_d6_return_v1_base --player-start 0,3 --player-goal 15,0 --targets ice_rebound_d4,ice_destroy_group_d6_plus --max-states 500000 --max-depth 300 --graph-max-states 500000 --write
  - npx tsx src/cli.ts explain-layout prototypes/ice_slide_escape prototypes/ice_slide_escape/reports/ICE_EXP_META_2026_07_02_round32_mutual_anchor_d6_return_v1_layout.txt --id ICE_EXP_META_2026_07_02_round32_mutual_anchor_d6_return_v1_meta --player-start 15,0 --player-goal 0,3 --targets ice_rebound_d4,ice_destroy_group_d6_plus --max-states 500000 --max-depth 300 --graph-max-states 500000 --write
  - npx tsx src/cli.ts compare-starts-layout prototypes/ice_slide_escape prototypes/ice_slide_escape/reports/ICE_EXP_META_2026_07_02_round32_mutual_anchor_d6_return_v1_layout.txt --id ICE_EXP_META_2026_07_02_round32_mutual_anchor_d6_return_v1_base_required_latest --player-goal 15,0 --starts 0,3 --required-winning-events ice_rebound_d4,ice_destroy_group_d6_plus --max-states 500000 --max-depth 300 --graph-max-states 500000 --write
  - npx tsx src/cli.ts compare-starts-layout prototypes/ice_slide_escape prototypes/ice_slide_escape/reports/ICE_EXP_META_2026_07_02_round32_mutual_anchor_d6_return_v1_layout.txt --id ICE_EXP_META_2026_07_02_round32_mutual_anchor_d6_return_v1_meta_required_latest --player-goal 0,3 --starts 15,0 --required-winning-events ice_rebound_d4,ice_destroy_group_d6_plus --max-states 500000 --max-depth 300 --graph-max-states 500000 --write
  - npx tsx src/cli.ts compare-starts-layout prototypes/ice_slide_escape prototypes/ice_slide_escape/reports/ICE_EXP_META_2026_07_02_round32_mutual_anchor_d6_return_v1_layout.txt --id ICE_EXP_META_2026_07_02_round32_mutual_anchor_d6_return_v1_base_required_d4 --player-goal 15,0 --starts 0,3 --required-winning-events ice_rebound_d4 --max-states 500000 --max-depth 300 --graph-max-states 500000 --write
  - npx tsx src/cli.ts compare-starts-layout prototypes/ice_slide_escape prototypes/ice_slide_escape/reports/ICE_EXP_META_2026_07_02_round32_mutual_anchor_d6_return_v1_layout.txt --id ICE_EXP_META_2026_07_02_round32_mutual_anchor_d6_return_v1_base_required_d6 --player-goal 15,0 --starts 0,3 --required-winning-events ice_destroy_group_d6_plus --max-states 500000 --max-depth 300 --graph-max-states 500000 --write
  - npx tsx src/cli.ts compare-starts-layout prototypes/ice_slide_escape prototypes/ice_slide_escape/reports/ICE_EXP_META_2026_07_02_round32_mutual_anchor_d6_return_v1_layout.txt --id ICE_EXP_META_2026_07_02_round32_mutual_anchor_d6_return_v1_meta_required_d4 --player-goal 0,3 --starts 15,0 --required-winning-events ice_rebound_d4 --max-states 500000 --max-depth 300 --graph-max-states 500000 --write
  - npx tsx src/cli.ts compare-starts-layout prototypes/ice_slide_escape prototypes/ice_slide_escape/reports/ICE_EXP_META_2026_07_02_round32_mutual_anchor_d6_return_v1_layout.txt --id ICE_EXP_META_2026_07_02_round32_mutual_anchor_d6_return_v1_meta_required_d6 --player-goal 0,3 --starts 15,0 --required-winning-events ice_destroy_group_d6_plus --max-states 500000 --max-depth 300 --graph-max-states 500000 --write
  - npx tsx src/cli.ts compare-starts-layout prototypes/ice_slide_escape prototypes/ice_slide_escape/reports/ICE_EXP_META_2026_07_02_round32_mutual_anchor_d6_return_v1_layout.txt --id ICE_EXP_META_2026_07_02_round32_mutual_anchor_d6_return_v1_interface_goal_B --title ICE_EXP_META_2026_07_02_round32_mutual_anchor_d6_return_v1_interface_goal_B --player-goal 15,0 --starts 0,3 15,0 --max-states 500000 --max-depth 300 --graph-max-states 500000 --write
  - npx tsx src/cli.ts compare-starts-layout prototypes/ice_slide_escape prototypes/ice_slide_escape/reports/ICE_EXP_META_2026_07_02_round32_mutual_anchor_d6_return_v1_layout.txt --id ICE_EXP_META_2026_07_02_round32_mutual_anchor_d6_return_v1_interface_goal_A --title ICE_EXP_META_2026_07_02_round32_mutual_anchor_d6_return_v1_interface_goal_A --player-goal 0,3 --starts 0,3 15,0 --max-states 500000 --max-depth 300 --graph-max-states 500000 --write
solver_result:
  base:
    found: true
    cost: 44
    events: { walk: 38, push_ice: 6, ice_blocks_ice_no_chain_push: 4, ice_rebound_d4: 5, "ice_destroy_group_d6_plus:len4": 1, ice_boundary_disappear_after_group: 1 }
    graph: { status: complete, reachable_states: 10315, legal_transitions: 26846, winning_states: 1 }
    agency: { status: complete, compressed_regions: 424, solution_commitments: 6, forced_viable_prefix: "2/6", forced_optimal_prefix: "2/6" }
  meta:
    found: true
    cost: 42
    events: { walk: 36, push_ice: 6, ice_blocks_ice_no_chain_push: 4, ice_rebound_d4: 5, "ice_destroy_group_d6_plus:len5": 1, ice_boundary_disappear_after_group: 1 }
    graph: { status: complete, reachable_states: 10296, legal_transitions: 26851, winning_states: 1 }
    agency: { status: complete, compressed_regions: 429, solution_commitments: 6, forced_viable_prefix: "2/6", forced_optimal_prefix: "2/6" }
winning_path_event_checks:
  base:
    missing_d4_winning_path: "not found; complete search; explored=10314"
    missing_d6_winning_path: "not found; complete search; explored=10498"
    missing_d4_or_d6_winning_path: "not found; complete search; explored=10498"
  meta:
    missing_d4_winning_path: "not found; complete search; explored=10295"
    missing_d6_winning_path: "not found; complete search; explored=10479"
    missing_d4_or_d6_winning_path: "not found; complete search; explored=10479"
interface_and_static_seal:
  edge_floor_cells: [[15, 0], [0, 3]]
  initial_pure_walk_A_to_B: { found: false, visited: 6 }
  initial_pure_walk_B_to_A: { found: false, visited: 4 }
  remove_extra_ice_only_A_to_B: { found: false, visited: 6 }
  remove_extra_ice_only_B_to_A: { found: false, visited: 4 }
  remove_target_ice_only_A_to_B: { found: true, length: 20 }
  remove_target_ice_only_B_to_A: { found: true, length: 20 }
```

## Trace Summary

```yaml
base_returned_solution:
  inputs: "right up right right down right right down right right right up right right down right right right up left down left left left left up left left left down right right right right right right right right right right up up up up"
  key_events:
    - step: 6
      input: right
      role: "borrow target [4,3] with d4 rebound; first target debt created"
    - step: 13
      input: right
      role: "borrow target [9,3] with d4 rebound; second target debt created"
    - step: 20
      input: left
      role: "restore [9,3] using the parked ice geometry"
    - step: 24
      input: left
      role: "move row-4 support ice into later d6/refill position"
    - step: 27
      input: left
      role: "restore [4,3]"
    - step: 31
      input: right
      role: "d6 destroy len4 group and open the edge route while target row is restored"
meta_returned_solution:
  inputs: "down down down left left down left left left up left left down left left left up right down right right right right up right right right down left left left left left left left left left left left left up left"
  key_events:
    - step: 4
      input: left
      role: "borrow target [14,3] from the right"
    - step: 11
      input: left
      role: "borrow target [9,3] in the reversed anchor order"
    - step: 18
      input: right
      role: "restore [9,3]"
    - step: 22
      input: right
      role: "move row-4 support material"
    - step: 25
      input: right
      role: "restore [14,3]"
    - step: 29
      input: left
      role: "d6 destroy len5 group and open the return to D"
```

## Evidence Refs

```yaml
layout_file: prototypes/ice_slide_escape/reports/ICE_EXP_META_2026_07_02_round32_mutual_anchor_d6_return_v1_layout.txt
base_analysis: prototypes/ice_slide_escape/reports/layout_analysis_ICE_EXP_META_2026_07_02_round32_mutual_anchor_d6_return_v1_base.md
meta_analysis: prototypes/ice_slide_escape/reports/layout_analysis_ICE_EXP_META_2026_07_02_round32_mutual_anchor_d6_return_v1_meta.md
base_required_latest: prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_02_round32_mutual_anchor_d6_return_v1_base_required_latest.md
meta_required_latest: prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_02_round32_mutual_anchor_d6_return_v1_meta_required_latest.md
base_required_d4: prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_02_round32_mutual_anchor_d6_return_v1_base_required_d4.md
base_required_d6: prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_02_round32_mutual_anchor_d6_return_v1_base_required_d6.md
meta_required_d4: prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_02_round32_mutual_anchor_d6_return_v1_meta_required_d4.md
meta_required_d6: prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_02_round32_mutual_anchor_d6_return_v1_meta_required_d6.md
interface_goal_B: prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_02_round32_mutual_anchor_d6_return_v1_interface_goal_B.md
interface_goal_A: prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_02_round32_mutual_anchor_d6_return_v1_interface_goal_A.md
interface_static_seal: prototypes/ice_slide_escape/reports/ICE_EXP_META_2026_07_02_round32_mutual_anchor_d6_return_v1_interface_edges.md
```

## Prototype Specific Contracts

```yaml
interface_pair_policy:
  declared_interface_points:
    - A: [0, 3]
    - B: [15, 0]
    - C: [15, 0]
    - D: [0, 3]
  target_pairs:
    - A->B
    - C->D
  ignored_pair_classes:
    - A->A self-pair from A=D overlap
    - B->B self-pair from B=C overlap
    - C/D reverse/internal pairs not listed as target pairs
  risky_pair_classes:
    - any edge goal outside [0,3] or [15,0]
pair_diagnostics:
  external_edge_escape_checks:
    - "static edge scan found only [0,3] and [15,0]"
  ignored_pairs:
    - "[0,3]->[0,3] cost 0"
    - "[15,0]->[15,0] cost 0"
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
  This is a fresh compact three-anchor row with row-4 support material and d6
  return opening. It does not inherit the round29 spatial skeleton, lower-lane
  return gate, or five-target all-on-target constraint. Prior reviews informed
  failure modes only.
```

## Archive Taste Context

```yaml
score_claim_allowed: true
examples:
  - candidate_id: ICE_CAND_0015
    human_aesthetic_score: 1
    use: "negative anchor: local target-door execution is not enough"
  - candidate_id: ICE_CAND_0020
    human_aesthetic_score: 2
    use: "negative anchor: functional return connection is not enough"
  - candidate_id: ICE_CAND_0022
    human_aesthetic_score: 3
    use: "mid anchor: a real meta chain may still lack high-grade reinterpretation"
  - candidate_id: ICE_CAND_0034
    human_aesthetic_score: 4
    use: "positive anchor: revisiting visible structure can reach 4 when the return pressure is player-facing"
  - candidate_id: ICE_CAND_0035
    human_aesthetic_score: 5
    use: "strict positive anchor: same-interface return must earn meaning through role change, not notation"
```

## Attempt Log

```yaml
serious_structural_attempts:
  - "round29 was rejected by independent critic for weak return pressure and repeated local doors"
  - "round30/round31 searches did not produce a qualified revision"
  - "this round32 candidate shifts to a compact mutual-anchor row and makes d6 the required base/latest branch"
local_repairs:
  - "kept A=D and B=C, but changed from broad route-gate layout to a three-target shared corridor"
  - "accepted extra support ice under the rules instead of forcing every ice onto a target"
abandoned_families:
  - "round29 five-target return-gate family"
  - "pure pre-d5 target-debt family for this brief, because current best evidence uses d6 as latest required knowledge"
```

## Claim Last Review

```yaml
mode: not_used
facts_packet: null
claim_packet: null
read_order: not_applicable
```

