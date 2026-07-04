# Facts Packet: ICE_EXP_META_2026_07_03_round52_v38_x10_seal_x8_detour review_3

```yaml
candidate_version: ICE_EXP_META_2026_07_03_round52_v38_x10_seal_x8_detour
packet_type: facts_packet
review_iteration_target: review_3
claim_last_review: true
prototype: ice_slide_escape
status: review_candidate
```

## Prototype Facts

```yaml
rules_sources:
  - prototypes/ice_slide_escape/docs/rules.md
  - prototypes/ice_slide_escape/docs/solver_contract.md
  - prototypes/ice_slide_escape/docs/mechanic_exposure_sequence.yml
  - prototypes/ice_slide_escape/docs/designer_contract.md
  - prototypes/ice_slide_escape/docs/meta_interfaces.md
  - prototypes/ice_slide_escape/docs/design_directives.md
win_condition: ice_slide_escape_explicit_goal
solver_contract:
  - "Each player_start / player_goal pair is a separate explicit solve instance."
  - "Start must be an initially standable edge cell."
  - "Goal is a specific edge cell; all targets must have ice at win."
ice_identity_policy: indistinguishable
event_exposure_sequence:
  - ice_stop_short
  - ice_destroyed_d3
  - ice_rebound_d4
  - ice_boundary_disappear
  - [ice_pass_through_d5, slide_restart_after_group]
  - ice_destroy_group_d6_plus
```

## Brief And Role Facts

```yaml
workflow: meta_first_design
target_pairs:
  base: "A->B"
  meta: "C->D"
base_allowed_exposure_through: ice_boundary_disappear
meta_allowed_exposure_through: ice_destroy_group_d6_plus
requested_quality:
  aesthetic_floor: 4
  difficulty: "both >=2, at least one >=3"
```

## Layout And Interfaces

```yaml
layout_file: prototypes/ice_slide_escape/reports/ICE_EXP_META_2026_07_03_round52_v38_x10_seal_x8_detour_layout.txt
interfaces:
  A: [0, 5]
  B: [11, 10]
  C: [23, 4]
  D: [11, 10]
target_pairs:
  - A->B
  - C->D
interface_note: "B and D are the same physical edge cell; this is not a same-cell / return-pressure bonus claim."
```

```text
########################
########################
########################
####.###################
####.#################..
.....*...*...##......*.#
#####.##..#####........#
####II#..I..###.....II##
####.......####.......##
####**.##..#############
##########..############
```

## Machine Evidence

```yaml
base_strict_gate:
  file: prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_03_round52_v38_x10_seal_x8_detour_base_strict.md
  start: [0, 5]
  goal: [11, 10]
  machine_gate: pass
  cost: 24
  graph_status: complete
  reachable_states: 1853
  winning_states: 6
  required_winning_events: [ice_destroyed_d3, ice_stop_short]
  forbidden_winning_events: [ice_destroy_group_d6_plus, ice_pass_through_d5, slide_restart_after_group]
  forbidden_reachable_events: [ice_destroy_group_d6_plus, ice_pass_through_d5, slide_restart_after_group]
  forbidden_reachable_hits: none
  solution_scc: "branching_win_dag, solution irreversible steps=2, forcedWinPrefix=1/2"

base_explain:
  file: prototypes/ice_slide_escape/reports/layout_analysis_ICE_EXP_META_2026_07_03_round52_v38_x10_seal_x8_detour_base_explain.md
  found: true
  cost: 24
  graph_complete: true
  reachable_states: 1853
  solution_commitments: 2
  endgame_tail_steps: 9
  returned_event_counts:
    push_ice: 2
    ice_destroyed_d3: 1
    ice_stop_short_d2: 1

meta_required_gate:
  file: prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_03_round52_v38_x10_seal_x8_detour_meta_required.md
  start: [23, 4]
  goal: [11, 10]
  machine_gate: pass
  cost: 36
  graph_status: complete
  reachable_states: 184683
  winning_states: 42
  required_winning_events: [ice_destroy_group_d6_plus, ice_destroyed_d3, ice_stop_short:d2]
  no_winning_path_missing_required: true
  solution_scc: "branching_win_dag, solution irreversible steps=4, forcedWinPrefix=0/4"

meta_explain:
  file: prototypes/ice_slide_escape/reports/layout_analysis_ICE_EXP_META_2026_07_03_round52_v38_x10_seal_x8_detour_meta_explain.md
  found: true
  cost: 36
  graph_complete: true
  reachable_states: 184683
  solution_commitments: 4
  endgame_tail_steps: 5
  returned_event_counts:
    push_ice: 4
    ice_destroy_group_d6_plus_len2: 1
    slide_restart_after_group: 1
    ice_destroyed_d3: 2
    ice_stop_short_d2: 2
```

## Object-Debt Evidence

```yaml
file: prototypes/ice_slide_escape/reports/object_debt_probe_ICE_EXP_META_2026_07_03_round52_v38_x10_seal_x8_detour.zh.md
method: "Complete BFS under a constraint that discards any successor where the named target cell is empty."
avoid_empty_target_21_5:
  found_winning_path: false
  explored_states: 619
  status: complete_no_win
avoid_empty_target_9_5:
  found_winning_path: false
  explored_states: 3785
  status: complete_no_win
control_avoid_empty_target_5_5:
  found_winning_path: true
  cost: 36
evidence_limit: "Proves target-cell debt necessity only; does not prove individual ice identity."
```

## Mechanism Scope Facts

```yaml
base:
  claimed_core_events: [ice_destroyed_d3, ice_stop_short]
  forbidden_if_seen_anywhere: [ice_pass_through_d5, slide_restart_after_group, ice_destroy_group_d6_plus]
  reachable_scan_status: complete
  forbidden_reachable_hits: none
  note: "base reachable event counts include ice_boundary_disappear:d5=12; this is not part of the forbidden set."
meta:
  claimed_core_events: [ice_destroy_group_d6_plus, slide_restart_after_group, ice_destroyed_d3, ice_stop_short]
  forbidden_if_seen_anywhere: []
```

## Meta-Interface Facts

```yaml
meta_design_mode: meta_first_design
interface_pair_policy:
  declared_interface_points: [A, B, C, D]
  target_pairs: ["A->B", "C->D"]
  ignored_internal_reverse_pairs: ["C->A", "C->B", "D->A", "D->B"]
  risky_non_target_pair_scope:
    - "A/B/C/D -> edge goals outside A/B/C/D"
    - "internal non-target pairs not listed under ignored_internal_reverse_pairs"
edge_pair_diagnostics:
  external_edge_escape_checks: []
  risky_internal_non_target_pairs: []
  ignored_internal_reverse_pairs: []
evidence_limit: "No full edge-pair scan is claimed for v38."
```

## Archive Taste Context

```yaml
examples:
  - candidate_id: ICE_CAND_0034
    file: prototypes/ice_slide_escape/design_archive/candidates/ICE_CAND_0034.md
    human_reviewed: true
    aesthetic_score: 4
    difficulty_score: 2
    human_excerpt: "亮点在于meta回访时左推（8，5）的冰扰乱下方结构，带来新解法而非完全复刻base流程的简单d1+d4。"
    relevance: "4 分下界：meta 必须扰乱/改写共享结构，而非附加钥匙。"
  - candidate_id: ICE_CAND_0035
    file: prototypes/ice_slide_escape/design_archive/candidates/ICE_CAND_0035.md
    human_reviewed: true
    aesthetic_score: 5
    difficulty_score: 4
    human_excerpt: "B/C 同格意味着玩家从 B 离开后，如果周围地图让他不得不原路返回，刷新后的同一关会被自然重读。"
    relevance: "高分边界：同格/旧出口高分依赖 return-pressure wrapper；v38 不声称该 bonus。"
  - candidate_id: ICE_CAND_0033
    file: prototypes/ice_slide_escape/design_archive/candidates/ICE_CAND_0033.md
    human_reviewed: true
    aesthetic_score: 5
    difficulty_score: 2
    human_excerpt: "meta 流程没有比base新增知识的前提下，这一关做出了非常有趣的小误导、小反转。"
    relevance: "低难高审美正例：meta 价值可来自重读和心路，而不必只是更晚机制。"
  - candidate_id: ICE_CAND_0037
    file: prototypes/ice_slide_escape/design_archive/candidates/ICE_CAND_0037.md
    human_reviewed: true
    aesthetic_score: 1
    difficulty_score: 2
    human_excerpt: "典型反例，将三个无洞见的重复步骤拼接声称为关卡和meta流程，无任何价值，并且有A->D外溢的致命问题。"
    relevance: "负例：不要把重复 target-door / 接口便利 / 事件覆盖误判为洞见。"
```

## Review Integrity Notes

```yaml
invalidated_prior_reviews:
  review_1: "free-prompt reviewer/critic; review_integrity missing"
  review_2_puzzle_critic: "template-like but claim_last_review was false; cannot be final critic under current default"
current_review:
  review_iteration: review_3
  critic_claim_last_review: true
```
