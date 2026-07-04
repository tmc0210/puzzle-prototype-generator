# Candidate Packet: ICE_EXP_META_2026_07_03_round54_v10

```yaml
candidate_version: ICE_EXP_META_2026_07_03_round54_v10_two_target_late_reseal
prototype: ice_slide_escape
review_iteration: review_1
review_input_type: candidate_version
claim_last_review:
  mode: sequential_single_call
  facts_packet: prototypes/ice_slide_escape/reports/facts_packet_ICE_EXP_META_2026_07_03_round54_v10.zh.md
  claim_packet: prototypes/ice_slide_escape/reports/claim_packet_ICE_EXP_META_2026_07_03_round54_v10.zh.md
  read_order: facts_then_claim
archive_lineage_policy:
  default: fresh_required
  authorized_archive_variant_work:
    enabled: false
  candidate_relation: fresh
```

## Prototype Context

```yaml
confirmed_rules:
  - rectangular board; targets are overlays
  - ice slides until obstacle or boundary
  - d4 rebounds one cell backward
  - d5 passes through obstacle group and restarts counting
  - d6_plus destroys obstacle group and restarts or disappears
win_condition:
  type: ice_slide_escape_explicit_goal
  requirements:
    - all_targets_occupied_by_ice
    - player_on_requested_edge_goal_cell
tool_boundary:
  - each start/goal pair is a separate solve instance
  - graph evidence is evidence, not quality verdict
```

## Slot Brief

```yaml
intended_role: meta_first_design paired candidate
known_before:
  base: through ice_rebound_d4
  meta: all_known
target:
  base_flow: d6-before-or-earlier, implemented as d4-only winning route
  meta_flow: late d5/d6/restart reinterpretation
difficulty_or_support_expectation:
  base: ">=2"
  meta: ">=3"
  at_least_one_flow: ">=3"
  aesthetic: ">=4 target, pursue 5"
```

## Solve Instances

```yaml
layout_ref: prototypes/ice_slide_escape/reports/ICE_EXP_META_2026_07_03_round54_v10_two_target_late_reseal_layout.txt
interfaces:
  A: [0, 6]
  B: [7, 0]
  C: [10, 0]
  D: [0, 10]
base_instance:
  player_start: [0, 6]
  player_goal: [7, 0]
meta_instance:
  player_start: [10, 0]
  player_goal: [0, 10]
```

```text
#######.##.##
#######.##I##
#######.##.##
#######.##.##
#######.##.##
#...#....#.##
..#.*....*.##
#...#.....###
######.##.###
######.##...#
.#..........#
#############
#############
```

## Mechanism Scope

```yaml
central:
  base:
    claimed_core_events:
      - ice_rebound_d4
    required_winning_path_events:
      - ice_rebound_d4
    forbidden_winning_path_events:
      - ice_pass_through_d5
      - slide_restart_after_group
      - ice_destroy_group_d6_plus
    forbidden_if_seen_anywhere:
      - ice_pass_through_d5
      - slide_restart_after_group
      - ice_destroy_group_d6_plus
  meta:
    claimed_core_events:
      - ice_pass_through_d5
      - slide_restart_after_group
      - ice_destroy_group_d6_plus
      - ice_rebound_d4
    required_winning_path_events:
      - ice_pass_through_d5
      - ice_destroy_group_d6_plus
      - slide_restart_after_group
      - ice_rebound_d4
allowed_support:
  - ice_stop_short
  - ice_blocks_ice_no_chain_push
```

## Design Claim

See `claim_packet_ICE_EXP_META_2026_07_03_round54_v10.zh.md`.

Short form:

- Base: T1 uses T2 as d4 obstacle, then T1 returns to its target.
- Meta: d5/restart places a bottom D-door resource; T2 must move to open the access channel; the resource d6-opens D; T2 must return to its target before D can win.

## Evidence

```yaml
commands_run:
  - npx tsx src/cli.ts explain-layout ... --id round54_v10_base_explain --player-start '0,6' --player-goal '7,0' --write
  - npx tsx src/cli.ts compare-starts-layout ... --id round54_v10_base_no_late --player-goal '7,0' --starts '0,6' --required-winning-events ice_rebound_d4 --forbidden-reachable-events ice_pass_through_d5 slide_restart_after_group ice_destroy_group_d6_plus --write
  - npx tsx src/cli.ts compare-starts-layout ... --id round54_v10_base_forbidden_winning --player-goal '7,0' --starts '0,6' --required-winning-events ice_rebound_d4 --forbidden-winning-events ice_pass_through_d5 slide_restart_after_group ice_destroy_group_d6_plus --write
  - npx tsx src/cli.ts explain-layout ... --id round54_v10_meta_explain --player-start '10,0' --player-goal '0,10' --write
  - npx tsx src/cli.ts compare-starts-layout ... --id round54_v10_meta_required_d5_d6_d4 --player-goal '0,10' --starts '10,0' --required-winning-events ice_pass_through_d5 ice_destroy_group_d6_plus slide_restart_after_group ice_rebound_d4 --write
  - npx tsx prototypes/ice_slide_escape/reports/round54_v10_edge_goal_scan.ts
solver_result:
  base:
    found: true
    cost: 19
    graph_complete: true
    reachable_states: 847
    winning_states: 1
  meta:
    found: true
    cost: 34
    graph_complete: true
    reachable_states: 3040
    winning_states: 1
winning_path_event_checks:
  base: pass
  meta: pass
reachable_event_exposure:
  base_no_late: pass
edge_pair_diagnostics:
  external_edge_escape: none_found
  risky_internal_non_target_pairs: none_found
  ignored_internal_reverse_pairs:
    - C -> B, verdict_effect: none
evidence_limits:
  - no per-object identity proof beyond trace positions
  - no counterfactual models configured
```

## Prototype-Specific Contracts

```yaml
interface_pair_policy:
  declared_interface_points: [A, B, C, D]
  target_pairs: ["A->B", "C->D"]
  ignored_pair_classes:
    - "C/D->A/B"
  risky_pair_classes:
    - "A/B/C/D -> edge goals outside A/B/C/D"
    - "internal non-target pairs not listed under ignored_pair_classes"
pair_diagnostics:
  ignored_pairs:
    - pair: "C->B"
      ref: prototypes/ice_slide_escape/reports/round54_v10_edge_goal_scan.md
      verdict_effect: none
  risky_pairs: []
```

## Archive Taste Context

See `facts_packet_ICE_EXP_META_2026_07_03_round54_v10.zh.md`.

Anchors: `ICE_CAND_0024` positive 5, `ICE_CAND_0019` positive 4, `ICE_CAND_0034` lower positive 4, `ICE_CAND_0037` negative 1.

## Attempt Log

```yaml
serious_structural_attempts:
  - round54 v5: good target/d6 coupling but rejected for base late reachable leakage and A/B->C internal risk
  - round54 v8/v9: separated C shaft; base became clean, but D placement or T2 return geometry initially failed
  - worker_round54_v5_repair_v5: produced v10 geometry with clean base and clean pair scan
abandoned_families:
  - same-row horizontal d6 direct rewrite, failed due base late leakage or d6 key degeneration
```
