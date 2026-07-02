# Candidate Packet: ICE_EXP_META_2026_07_02_round28_fresh_mirror_debt_chain_v1

## Prototype Context

```yaml
prototype: ice_slide_escape
confirmed_rules:
  - targets are overlays; `*` means target occupied by ice
  - win requires every target occupied by ice and player on the requested explicit edge goal
  - pushed ice slides until wall/ice/boundary; distance 4 rebounds one cell backward
tool_boundary:
  - every start/goal pair is a separate solve instance
  - no any-edge win is claimed
```

## Slot Brief

```yaml
intended_role: meta_first_design candidate
fresh_requirement: true
special_requirement:
  - all boxes/ice initially on targets
  - initial target ice seals the direct path from each start to its goal
  - base latest reachable knowledge must be required by every winning path
  - at least one of base/meta should be difficulty 4 or higher; neither below 3
```

## Layout And Interfaces

```text
############################
############################
############################
############################
#...########################
..#.*....#.*....#.*....#....
######.....##.....##.....###
############################
############################
############################
############################
############################
############################
############################
########################...#
....#....*.#....*.#....*.#..
###.....##.....##.....######
############################
############################
############################
############################
############################
```

```yaml
A: [0, 5]
B: [27, 5]
C: [27, 15]
D: [0, 15]
base_instance:
  start: [0, 5]
  goal: [27, 5]
meta_instance:
  start: [27, 15]
  goal: [0, 15]
targets_initially_with_ice:
  - [4, 5]
  - [11, 5]
  - [18, 5]
  - [23, 15]
  - [16, 15]
  - [9, 15]
extra_ice: []
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
```

## Design Claim

```yaml
player_insight: >
  Every visible ice block begins in the "correct" solved state, but the same
  ice also seals the route. The player must temporarily create target debt,
  route around the displaced ice, and then repay the debt with a d4 rebound
  before the next segment becomes meaningful.
base_causal_chain: >
  A enters the upper debt chain from the left. Each target is borrowed to the
  right by a d4 rebound, exposing a side pocket; the player then circles to the
  far side and rebounds the same ice back onto its target before advancing.
meta_causal_chain: >
  C enters the lower mirror chain from the right. The same target-debt grammar
  is read in reverse: each target is borrowed to the left, repaid to the right,
  and only then can the player continue toward D.
why_not_execution_only: >
  The repeated local act is simple, but the state meaning is inverted: solved
  target coverage is also a lock. The graph shows six irreversible progress
  steps with multiple viable/dead continuations in the middle modules.
falsification:
  - any A/B/C/D escape to an external edge
  - any A->C, A->D, B->C, or B->D solve that reaches a non-target interface
  - a winning path that omits ice_rebound_d4
  - any reachable d5/restart/d6 event in the base window
  - critic finding that the meta lane is merely an independent mirror, not a meaningful reinterpretation
```

## Evidence

```yaml
commands_run:
  - npx tsx src/cli.ts explain-layout prototypes/ice_slide_escape prototypes/ice_slide_escape/reports/ICE_EXP_META_2026_07_02_round28_fresh_mirror_debt_chain_v1_layout.txt --id ICE_EXP_META_2026_07_02_round28_fresh_mirror_debt_chain_v1_base --player-start 0,5 --player-goal 27,5 --targets ice_rebound_d4 --max-states 100000 --max-depth 200 --graph-max-states 100000 --write
  - npx tsx src/cli.ts explain-layout prototypes/ice_slide_escape prototypes/ice_slide_escape/reports/ICE_EXP_META_2026_07_02_round28_fresh_mirror_debt_chain_v1_layout.txt --id ICE_EXP_META_2026_07_02_round28_fresh_mirror_debt_chain_v1_meta --player-start 27,15 --player-goal 0,15 --targets ice_rebound_d4 --max-states 100000 --max-depth 200 --graph-max-states 100000 --write
  - npx tsx src/cli.ts compare-starts-layout prototypes/ice_slide_escape prototypes/ice_slide_escape/reports/ICE_EXP_META_2026_07_02_round28_fresh_mirror_debt_chain_v1_layout.txt --id ICE_EXP_META_2026_07_02_round28_fresh_mirror_debt_chain_v1_base_required_latest --player-goal 27,5 --starts 0,5 --targets ice_rebound_d4 --required-winning-events ice_rebound_d4 --forbidden-reachable-events ice_pass_through_d5 slide_restart_after_group ice_destroy_group_d6_plus --max-states 100000 --max-depth 200 --graph-max-states 100000 --write
  - npx tsx src/cli.ts compare-starts-layout prototypes/ice_slide_escape prototypes/ice_slide_escape/reports/ICE_EXP_META_2026_07_02_round28_fresh_mirror_debt_chain_v1_layout.txt --id ICE_EXP_META_2026_07_02_round28_fresh_mirror_debt_chain_v1_meta_required_latest --player-goal 0,15 --starts 27,15 --targets ice_rebound_d4 --required-winning-events ice_rebound_d4 --forbidden-reachable-events ice_pass_through_d5 slide_restart_after_group ice_destroy_group_d6_plus --max-states 100000 --max-depth 200 --graph-max-states 100000 --write
solver_result:
  base:
    found: true
    cost: 47
    events: { walk: 41, push_ice: 6, ice_rebound_d4: 6 }
    graph: { status: complete, reachable_states: 1717, legal_transitions: 3740, winning_states: 1 }
    agency: { status: complete, compressed_regions: 85, solution_irreversible_steps: 6, win_subgraph: branching_win_dag, forced_win_prefix: "1/6" }
  meta:
    found: true
    cost: 47
    events: { walk: 41, push_ice: 6, ice_rebound_d4: 6 }
    graph: { status: complete, reachable_states: 1717, legal_transitions: 3740, winning_states: 1 }
    agency: { status: complete, compressed_regions: 85, solution_irreversible_steps: 6, win_subgraph: branching_win_dag, forced_win_prefix: "1/6" }
winning_path_event_checks:
  base:
    missing_ice_rebound_d4_winning_path: "not found; complete search; explored=1716"
  meta:
    missing_ice_rebound_d4_winning_path: "not found; complete search; explored=1716"
reachable_event_exposure:
  base:
    status: complete
    forbidden_hits: []
    event_counts: { walk: 3614, push_ice: 126, ice_rebound_d4: 56, "ice_stop_short:d1": 70, push_ice_failed: 140 }
  meta:
    status: complete
    forbidden_hits: []
    event_counts: { walk: 3614, push_ice: 126, ice_rebound_d4: 56, "ice_stop_short:d1": 70, push_ice_failed: 140 }
evidence_refs:
  - prototypes/ice_slide_escape/reports/layout_analysis_ICE_EXP_META_2026_07_02_round28_fresh_mirror_debt_chain_v1_base.md
  - prototypes/ice_slide_escape/reports/layout_analysis_ICE_EXP_META_2026_07_02_round28_fresh_mirror_debt_chain_v1_meta.md
  - prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_02_round28_fresh_mirror_debt_chain_v1_base_required_latest.md
  - prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_02_round28_fresh_mirror_debt_chain_v1_meta_required_latest.md
  - prototypes/ice_slide_escape/reports/ICE_EXP_META_2026_07_02_round28_fresh_mirror_debt_chain_v1_interface_edges.md
```

## Meta Reinterpretation

```yaml
meta_design_mode: meta_first_design
shared_structure:
  - same three-lock target-debt rhythm in both halves
  - mirrored stopper spacing and side-pocket repayment geometry
  - both flows require the player to treat an already-covered target as a temporary debt resource
chain_delta_from_base: >
  Direction and edge context are reversed. The meta flow is not a new mechanic
  exposure; it is a late revisit of the same target-debt grammar from the
  opposite side.
cross_visit_payoff: >
  The intended payoff is recognition: the lower route looks solved for the same
  reason it is blocked, and the base-learned d4 repayment grammar transfers in
  reverse.
base_time_masking: >
  The lower route is unreachable from A/B and does not expose later events in
  the base reachable graph.
latent_or_lure_elements:
  - element: lower mirrored chain
    base_reading: visible but unreachable in the base instance
    meta_payoff: becomes the C->D route
classification_claim: meaningful_reinterpretation
known_taste_risk: >
  This may be judged as two independent mirrored lanes rather than a strong
  same-material reinterpretation. The critic should treat that as a core
  possible attack, not as a caveat.
```

## Interface Pair Policy

```yaml
declared_interface_points: [A, B, C, D]
target_pairs:
  - A->B
  - C->D
ignored_internal_reverse_pairs:
  - C->A
  - C->B
  - D->A
  - D->B
risky_non_target_pair_scope:
  - A/B/C/D -> edge goals outside A/B/C/D
  - internal non-target pairs not listed under ignored_internal_reverse_pairs
pair_diagnostics:
  edge_points: [[0,5], [27,5], [27,15], [0,15]]
  target_pairs:
    - { pair: A->B, result: solved, cost: 47 }
    - { pair: C->D, result: solved, cost: 47 }
  risky_internal_non_target_pairs:
    - { pair: A->C, result: unsolved }
    - { pair: A->D, result: unsolved }
    - { pair: B->C, result: unsolved }
    - { pair: B->D, result: unsolved }
  ignored_internal_reverse_pairs:
    - { pair: C->A, result: unsolved, verdict_effect: none }
    - { pair: C->B, result: unsolved, verdict_effect: none }
    - { pair: D->A, result: unsolved, verdict_effect: none }
    - { pair: D->B, result: unsolved, verdict_effect: none }
  self_pairs:
    - { pair: A->A, result: solved_zero_step, verdict_effect: none }
    - { pair: B->B, result: solved_zero_step, verdict_effect: none }
    - { pair: C->C, result: solved_zero_step, verdict_effect: none }
    - { pair: D->D, result: solved_zero_step, verdict_effect: none }
external_edge_escape_checks:
  - no edge floor outside A/B/C/D exists
```

## Design Target

```yaml
aesthetic_score_target: "4 minimum, pursue 5"
difficulty_score_target: "base 4-, meta 4- by solver graph; critic must decide"
target_role_notes:
  - all ice starts on target
  - every target in a claimed flow is borrowed and repaid
  - no extra ice exists
```

## Archive Lineage Policy

```yaml
default: fresh_required
authorized_archive_variant_work:
  enabled: false
candidate_relation: fresh
why_not_archive_variant: >
  This was built from a new target-debt chain primitive during this run. Archive
  candidates were used only as taste/failure calibration, not as layout or
  causal-chain starting points.
archive_taste_context:
  examples:
    - ICE_CAND_0024: human aesthetic 5; positive anchor for compact reuse and target-state incompatibility lure, not reused
    - ICE_CAND_0035: human 5/4; positive anchor for meta payoff, but B=C / D-wall pattern not reused
    - ICE_CAND_0034: human aesthetic 4 difficulty 2; warning that clean geometry without commitment depth should not be overrated
```

## Attempt Log

```yaml
serious_structural_attempts:
  - round26 fresh star y-gate: rejected by critic for aesthetic 3.4 and difficulty below target
  - round27 fresh restart chain: rejected by critic for static target seals and twin d6 witness chains
  - chain3 shared d4 target debt: rejected by controller before packet because A/C walked into each other and A->D solved
  - round28 mirror debt chain: current packet
local_repairs:
  - tried quadrant-isolating the shared target debt; repeated A->D or A->C interface leaks remained
abandoned_families:
  - static all-target seals
  - independent d6 restart witness chains
```
