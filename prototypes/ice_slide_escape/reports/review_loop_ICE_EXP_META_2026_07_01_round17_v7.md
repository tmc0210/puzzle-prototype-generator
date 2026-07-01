# Review Loop Summary: ICE_EXP_META_2026_07_01_round17_v7

```yaml
prototype: ice_slide_escape
candidate_id: ICE_EXP_META_2026_07_01_round17_v7
controller_final_state: held_proposal
quality_review_state_from_critic: proposal_ready_with_caveats
review_integrity: independent_review
archive_eligibility: raw_run_only
designer_action_2: downgrade_or_hold
required_action_after_reviews: none
hold_reason: >
  质量审阅认为 v7 可作为带 caveat 的 proposal，但 controller 复核发现该布局
  和核心 double-debt 因果链明显 refined_from ICE_CAND_0022。当前 brief 未明确
  授权从旧 clean archive 候选做 variant / remix / strengthening，因此按
  archive-boundary 只能 hold，等待人类确认是否授权 0022-derived 方向。
```

## Candidate Packet 摘要

```yaml
meta_first_design: true
layout_ref: prototypes/ice_slide_escape/reports/ICE_EXP_META_2026_07_01_round17_scratch_v7_layout.txt
interfaces:
  A: [0, 2]
  B: [0, 7]
  C: [16, 7]
  D: [0, 2]  # shared with A
base_instance:
  player_start: [0, 2]
  player_goal: [0, 7]
  target_difficulty: "2/2+"
  allowed_exposure_through: ice_pass_through_d5
  recommended_exposure: "d4, not fully clean"
meta_instance:
  player_start: [16, 7]
  player_goal: [0, 2]
  target_difficulty: "4/4+"
  allowed_exposure_through: "all knowledge"
design_claim: >
  Base presents a light two-push stopper application. Meta starts from C, creates
  right-side target debt with d3/d5/d6/restart logic, then reuses the left base
  stopper read as the terminal return-to-start payoff.
```

```text
#################
#################
..I.GG#.....I.I.#
#.###..######.#.#
#....I.######.#.#
#......######*I.#
#.###########.#.#
..###########....
#################
```

## Evidence

```yaml
base:
  result: solved
  start: [0, 2]
  goal: [0, 7]
  cost: 23
  pushes: 2
  graph: "complete, states=571, wins=1"
  returned_events:
    ice_stop_short:d2: 2
    ice_blocks_ice_no_chain_push: 1
  d5_cap_gate: pass
  strict_d4_gate: fail
  strict_d4_caveat: "reachable boundary-disappear events exist; winning path remains d2/no-chain"
meta:
  result: solved
  start: [16, 7]
  goal: [0, 2]
  cost: 47
  pushes: 6
  graph: "complete, states=10985, wins=1"
  required_core_gate: pass
  returned_events:
    - ice_destroyed_d3
    - ice_pass_through_d5:len1
    - slide_restart_after_group
    - ice_destroy_group_d6_plus:len1
    - ice_blocks_ice_no_chain_push
    - ice_stop_short:d1
    - ice_stop_short:d2
edge_scan:
  all_graphs_complete: true
  non_interface_completion: none
  left_family_to_C: none
  C_target_complete_hits: [[0, 2], [0, 7], [16, 7]]
  selected_pair_costs:
    A/D_to_B: 23
    C_to_A/D: 47
    C_to_B: 52
```

Evidence refs:

```text
- prototypes/ice_slide_escape/reports/layout_analysis_ICE_EXP_META_2026_07_01_round17_v7_base.md
- prototypes/ice_slide_escape/reports/layout_analysis_ICE_EXP_META_2026_07_01_round17_v7_base.json
- prototypes/ice_slide_escape/reports/layout_analysis_ICE_EXP_META_2026_07_01_round17_v7_meta.md
- prototypes/ice_slide_escape/reports/layout_analysis_ICE_EXP_META_2026_07_01_round17_v7_meta.json
- prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_01_round17_v7_base_d5_cap.md
- prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_01_round17_v7_base_required_core_strict_d4.md
- prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_01_round17_v7_meta_required_core.md
- prototypes/ice_slide_escape/reports/edge_pair_scan_ICE_EXP_META_2026_07_01_round17_v7_ABCD.md
```

## Independent Review

```yaml
evidence_reviewer:
  verdict: supports_with_caveats
  required_action: none
  key_caveats:
    - "meta_first_design 是设计过程声明，不是 solver 可证明事实。"
    - "`natural` return 属于 critic/player-facing 判断；证据只支持 shortest。"
    - "C->B 也是完整 meta chain 若要作为强事实，后续最好另跑 required-core probe。"
    - "无 per-object necessity / object identity proof。"
puzzle_critic:
  review_loop_state: proposal_ready_with_caveats
  required_action: none
  base_difficulty: meets_target
  meta_difficulty: meets_target
  aesthetic_score: "4-"
  blocking_attacks: []
  non_blocking_caveats:
    - "D=A 牺牲四端点独立性，必须 player-facing framed as return-to-start。"
    - "C->B 也可完成完整 meta chain，但比 C->A/D 更长，不再像 v5 那样破坏主目标。"
    - "base strict d4 不完全 clean。"
    - "整体达低 4，不应宣称 5。"
```

## Archive Lineage Note

```yaml
archive_lineage_policy:
  default: fresh_required
  authorized_archive_variant_work:
    enabled: false
    authorized_by: null
    candidate_ids: []
    allowed_operations: []
  candidate_relation: refined_from:ICE_CAND_0022
  why_not_clean_proposal: >
    v7 保留 ICE_CAND_0022 的 17x9 大骨架、A/B/C 入口族、右侧 double-debt
    meta 读法和 left-return payoff 家族，只是打开左侧 base 走廊、封旧 right-top D、
    并改写 meta goal 为 A/D。因此它不是 fresh candidate。
```

Controller conclusion:

```text
证据和独立 critic 足以支持“可玩质量上的 proposal_ready_with_caveats”。
但在当前未授权 archive variant 的 brief 下，最终 controller 状态降为
held_proposal / raw_run_only。若人类明确授权 ICE_CAND_0022-derived variant，
则可把该候选作为 proposal_ready_with_caveats 继续人工审查；若不授权，应换
fresh family 继续搜索。
```
