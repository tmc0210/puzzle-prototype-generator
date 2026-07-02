# Candidate Packet: ICE_EXP_META_2026_07_02_round29_fresh_return_gate_v1

## Prototype Context

```yaml
prototype: ice_slide_escape
win_condition:
  - all targets must be occupied by ice
  - player must stand on the explicit edge goal for that solve instance
object_and_event_semantics:
  - `*` is target plus ice
  - d4 collision rebounds one cell backward
  - targets are not obstacles, but occupied target ice blocks player movement
tool_boundary:
  - A->B and C->D are separate reset solve instances
  - no any-edge win is claimed
```

## Slot Brief

```yaml
intended_role: meta_first_design candidate
fresh_requirement: true
special_requirements:
  - every target initially has ice
  - every ice starts on a target
  - initial target ice seals the direct start-to-goal path
  - base latest reachable knowledge must be required on every winning path
  - both flows difficulty >= 3, at least one flow >= 4
  - aesthetic target >= 4, pursue 5
```

## Layout And Interfaces

```text
#####################
#####################
#...#################
..#.*....#.*....#....
#...##.....##.....#.#
#..################.#
#*#...###########...#
#...#....*.#....*.#.#
####....##.....######
#####################
#####################
#####################
```

```yaml
A: [0, 3]
B: [20, 3]
C: [20, 3]
D: [0, 3]
base_instance:
  start: [0, 3]
  goal: [20, 3]
meta_instance:
  start: [20, 3]
  goal: [0, 3]
targets_initially_with_ice:
  - [4, 3]
  - [11, 3]
  - [1, 6]
  - [9, 7]
  - [16, 7]
extra_ice: []
edge_floor_cells:
  - [0, 3]
  - [20, 3]
```

## Mechanic Exposure Context

```yaml
base_allowed_exposure_through: ice_rebound_d4
base_claimed_core_events:
  - push_ice
  - ice_rebound_d4
meta_allowed_exposure_through: ice_destroy_group_d6_plus
meta_claimed_core_events:
  - push_ice
  - ice_rebound_d4
required_winning_path_events:
  base:
    - ice_rebound_d4
  meta:
    - ice_rebound_d4
forbidden_if_seen_anywhere_in_base_window:
  - ice_pass_through_d5
  - slide_restart_after_group
  - ice_destroy_group_d6_plus
  - ice_boundary_disappear
```

## Design Claim

```yaml
player_insight: >
  The level starts apparently solved: every target already has ice. That solved
  state is also the lock. The player must temporarily create target debt, walk
  through the space that debt opens, and then repay it with d4 rebound before
  the route is meaningful.
base_causal_chain: >
  A->B uses the upper lane. Two target doors each require borrow-right,
  reposition through the pocket, then repay-left. The lower route and left
  return gate are visible but not useful from A.
meta_causal_chain: >
  B->A reuses B as the revisit entry, descends through the right inner stem,
  reads the lower lane in the opposite direction, then must open the left return
  gate from below and repay it from above before stepping back to A.
why_not_execution_only: >
  Base and meta are not two far-separated rooms. The same two edge cells become
  a go/return interface, and the lower lane only pays off after the upper route
  has taught the target-debt grammar. The final return gate is deliberately
  inaccessible as a bypass before it is borrowed.
falsification:
  - any target lacks initial ice
  - any ice starts off target
  - any external edge floor exists outside A/D and B/C
  - any winning path omits ice_rebound_d4
  - base can reach d5, restart, d6, or boundary disappearance
  - critic finds the B=C / D=A return pattern to be a weak interface trick rather than meaningful same-material reinterpretation
```

## Evidence

```yaml
commands_run:
  - npx tsx src/cli.ts explain-layout prototypes/ice_slide_escape prototypes/ice_slide_escape/reports/ICE_EXP_META_2026_07_02_round29_fresh_return_gate_v1_layout.txt --id ICE_EXP_META_2026_07_02_round29_fresh_return_gate_v1_base --player-start "0,3" --player-goal "20,3" --targets ice_rebound_d4 --max-states 300000 --max-depth 250 --graph-max-states 300000 --write
  - npx tsx src/cli.ts explain-layout prototypes/ice_slide_escape prototypes/ice_slide_escape/reports/ICE_EXP_META_2026_07_02_round29_fresh_return_gate_v1_layout.txt --id ICE_EXP_META_2026_07_02_round29_fresh_return_gate_v1_meta --player-start "20,3" --player-goal "0,3" --targets ice_rebound_d4 --max-states 300000 --max-depth 250 --graph-max-states 300000 --write
  - npx tsx src/cli.ts compare-starts-layout prototypes/ice_slide_escape prototypes/ice_slide_escape/reports/ICE_EXP_META_2026_07_02_round29_fresh_return_gate_v1_layout.txt --id ICE_EXP_META_2026_07_02_round29_fresh_return_gate_v1_base_required_latest --player-goal "20,3" --starts "0,3" --targets ice_rebound_d4 --required-winning-events ice_rebound_d4 --forbidden-reachable-events ice_pass_through_d5 slide_restart_after_group ice_destroy_group_d6_plus ice_boundary_disappear --max-states 300000 --max-depth 250 --graph-max-states 300000 --write
  - npx tsx src/cli.ts compare-starts-layout prototypes/ice_slide_escape prototypes/ice_slide_escape/reports/ICE_EXP_META_2026_07_02_round29_fresh_return_gate_v1_layout.txt --id ICE_EXP_META_2026_07_02_round29_fresh_return_gate_v1_meta_required_latest --player-goal "0,3" --starts "20,3" --targets ice_rebound_d4 --required-winning-events ice_rebound_d4 --forbidden-reachable-events ice_pass_through_d5 slide_restart_after_group ice_destroy_group_d6_plus ice_boundary_disappear --max-states 300000 --max-depth 250 --graph-max-states 300000 --write
solver_result:
  base:
    found: true
    cost: 34
    events: { walk: 30, push_ice: 4, ice_rebound_d4: 4 }
    graph: { status: complete, reachable_states: 109808, legal_transitions: 243352, winning_states: 1 }
    agency:
      status: complete
      compressed_regions: 3784
      solution_commitments: 4
      opening_commitments: { total: 2, viable: 1, dead: 1 }
      win_continuation_prefix: { viable: "1/4", optimal: "1/4" }
  meta:
    found: true
    cost: 46
    events: { walk: 40, push_ice: 6, ice_rebound_d4: 6 }
    graph: { status: complete, reachable_states: 109808, legal_transitions: 243352, winning_states: 1 }
    agency:
      status: complete
      compressed_regions: 3784
      solution_commitments: 6
      opening_commitments: { total: 2, viable: 1, dead: 1 }
      win_continuation_prefix: { viable: "1/6", optimal: "1/6" }
winning_path_event_checks:
  base:
    missing_ice_rebound_d4_winning_path: "not found; complete search; explored=109830"
  meta:
    missing_ice_rebound_d4_winning_path: "not found; complete search; explored=109848"
reachable_event_exposure:
  base:
    status: complete
    forbidden_hits: []
    event_counts: { walk: 235280, push_ice: 8072, "ice_stop_short:d1": 4592, push_ice_failed: 9344, ice_rebound_d4: 3480 }
  meta:
    status: complete
    forbidden_hits: []
    event_counts: { walk: 235280, push_ice: 8072, ice_rebound_d4: 3480, "ice_stop_short:d1": 4592, push_ice_failed: 9344 }
evidence_refs:
  - prototypes/ice_slide_escape/reports/layout_analysis_ICE_EXP_META_2026_07_02_round29_fresh_return_gate_v1_base.md
  - prototypes/ice_slide_escape/reports/layout_analysis_ICE_EXP_META_2026_07_02_round29_fresh_return_gate_v1_meta.md
  - prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_02_round29_fresh_return_gate_v1_base_required_latest.md
  - prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_02_round29_fresh_return_gate_v1_meta_required_latest.md
  - prototypes/ice_slide_escape/reports/ICE_EXP_META_2026_07_02_round29_fresh_return_gate_v1_interface_edges.md
```

## Meta Reinterpretation

```yaml
meta_design_mode: meta_first_design
base_instance:
  start: [0, 3]
  goal: [20, 3]
  intended_difficulty_score: "3+"
  causal_chain: "upper target-debt lane, two borrow/repay modules"
meta_instance:
  start: [20, 3]
  goal: [0, 3]
  intended_difficulty_score: "4"
  causal_chain: "right descent, lower reverse debt lane, left return-gate borrow/repay"
shared_structure:
  - A/D and B/C are the same two edge cells; the meta route is a return through the same interface, not a new external exit.
  - Both flows use the same target-debt grammar and the same d4 repayment rule.
  - The visible lower route is latent in base and becomes active only when revisiting from B/C.
  - The left `*` at [1,6] is both a visible solved target and the meta return lock.
chain_delta_from_base: >
  Base teaches the debt-and-repay grammar on the upper lane. Meta starts from
  the base exit and must reinterpret the right-side stem as an entrance, then
  use the lower row and final return gate. The final gate is orthogonal to the
  lane modules and requires understanding that a target can be temporarily
  opened only to be restored before stepping back to A.
cross_visit_payoff: >
  On first pass, the lower row and left return gate read as sealed decoration.
  On revisit, the same sealed targets become the only way home.
base_time_masking: >
  The full base reachable scan contains no d5/restart/d6/boundary events. The
  lower route is visible but cannot produce a valid base win without d4 debt
  repayment.
latent_or_lure_elements:
  - element: lower lane targets [16,7] and [9,7]
    base_reading: sealed lower material, not the A->B route
    meta_payoff: becomes the return lane from B/C
  - element: return gate target [1,6]
    base_reading: solved target that makes the left lower area look closed
    meta_payoff: final B->A lock; must be borrowed upward and repaid downward
classification_claim: meaningful_reinterpretation
known_taste_risk: >
  B=C and D=A are intentional return-interface overlaps. The critic should
  attack this if it reads as a cheap return trick or as two stacked lanes rather
  than a meaningful reinterpretation. This candidate does not use a D-wall and
  was not derived from archived B=C material.
```

## Interface Pair Policy

```yaml
declared_interface_points:
  A: [0, 3]
  B: [20, 3]
  C: [20, 3]
  D: [0, 3]
target_pairs:
  - A->B
  - C->D
ignored_internal_reverse_pairs:
  - C->A
  - C->B
  - D->A
  - D->B
risky_non_target_pair_scope:
  - edge goals outside the declared two physical edge cells
  - distinct internal non-target pairs not collapsed by A=D or B=C
pair_diagnostics:
  edge_points:
    - [0, 3]
    - [20, 3]
  external_edge_escape_checks:
    - no edge floor outside [0,3] and [20,3]
  target_pairs:
    - { pair: A->B, physical_pair: "[0,3]->[20,3]", result: solved, cost: 34 }
    - { pair: C->D, physical_pair: "[20,3]->[0,3]", result: solved, cost: 46 }
  overlap_self_pairs:
    - { pair: A->D, physical_pair: "[0,3]->[0,3]", result: solved_zero_step, verdict_effect: none }
    - { pair: C->B, physical_pair: "[20,3]->[20,3]", result: solved_zero_step, verdict_effect: none }
```

## Design Target

```yaml
aesthetic_score_target: "4 minimum, pursue 5"
difficulty_score_target:
  base: "at least 3"
  meta: "4 target"
target_role_notes:
  - all five targets begin occupied by ice
  - all five ice blocks begin on targets
  - base actively borrows/refills two targets
  - meta actively borrows/refills four lane/gate targets, including the final return gate
```

## Archive Lineage Policy

```yaml
default: fresh_required
authorized_archive_variant_work:
  enabled: false
candidate_relation: fresh
why_not_archive_variant: >
  The design was developed in this run from the target-debt primitive after
  round28's mirror-lane rejection. Archive candidates were used only as taste
  calibration. The B=C / D=A return overlap is not copied from an archive
  layout, does not use a D-wall, and uses the all-target-on-ice return-gate
  structure specific to this brief.
archive_taste_context:
  examples:
    - ICE_CAND_0024: human aesthetic 5; anchor for compact reuse and target-state incompatibility, not reused as layout
    - ICE_CAND_0035: human 5/4; warning that B=C patterns need real return pressure and cannot be copied
    - ICE_CAND_0034: human aesthetic 4 difficulty 2; warning that clean geometry alone does not prove difficulty
```

## Attempt Log

```yaml
serious_structural_attempts:
  - round26 fresh star y-gate: rejected by critic for aesthetic and difficulty below target
  - round27 fresh restart chain: rejected by critic for static target seals and twin d6 witness chains
  - chain3 shared d4 target debt: rejected by controller because A/C walked into each other and A->D solved
  - round28 mirror debt chain: evidence passed, critic rejected as two isolated mirrored lanes
  - round29 return gate: current packet
local_repairs:
  - removed a reachable d5 exposure caused by a vertical wrong-push on the first upper target
  - forced the left return-gate to be borrowed before the meta player can reach its upper refill stand
abandoned_families:
  - static all-target seals
  - independent d6 restart witness chains
  - separated mirror lanes
```
