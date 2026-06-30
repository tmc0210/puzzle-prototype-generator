# 候选：ICE_CAND_0022

```yaml
candidate_id: ICE_CAND_0022
prototype: ice_slide_escape
experiment_id: ICE_EXP_META_2026_07_01_round3_double_debt_proposal_ready_with_caveats
status: accepted
llm_candidate_strength: strong_meta_connector_with_caveats
human_final_status: accepted
archive_eligibility: clean_archive
review_integrity: human_review
motifs:
  - short_stop_d1_d2
  - d5_pass_through
  - d6_destroy_group
  - destroy_moving_ice_d3
  - restart_counting
  - target_ice_coverage
  - explicit_edge_goal
  - meta_reinterpretation
  - target_debt_refill
  - hidden_stopper
archive_use:
  - positive_reference
  - human_taste_reference
  - critic_calibration
  - designer_calibration
strengths:
  - late_game_meta_application
  - double_target_debt
  - consumed_hidden_stopper
  - clean_reachability_gate
failure_modes:
  - thin_base_flow
  - corridor_pressure
  - limited_spatial_element_interweaving
  - not_endgame_capstone
  - overclaim_risk
human_comment_ids:
  - HC_ICE_CAND_0022_001
ledger_ref: prototypes/ice_slide_escape/design_archive/experiments/ICE_EXP_META_2026_07_01_round3_double_debt_proposal_ready_with_caveats.md
evidence_refs:
  - prototypes/ice_slide_escape/reports/layout_analysis_ICE_CAND_0022_v1_base_A_to_B.md
  - prototypes/ice_slide_escape/reports/layout_analysis_ICE_CAND_0022_v1_meta_C_to_D.md
  - prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0022_v1_base_goal_B_ABCD.md
  - prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0022_v1_meta_goal_D_ABCD.md
  - prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0022_v1_goal_C_AB_only.md
  - prototypes/ice_slide_escape/reports/edge_pair_scan_ICE_CAND_0022_v1_ABCD.md
```

## 布局

求解实例：

```yaml
interfaces:
  A: [0, 2]
  B: [0, 7]
  C: [16, 7]
  D: [16, 2]
base_instance:
  player_start: [0, 2]
  player_goal: [0, 7]
meta_instance:
  player_start: [16, 7]
  player_goal: [16, 2]
win_condition: ice_slide_escape_explicit_goal
```

```text
#################
#################
..I.G*#.....I.I..
#.###..######.#.#
#.###I.######.#.#
#.###..######*I.#
#.###########.#.#
..###########....
#################
```

## Design Claim

```yaml
ecological_niche: >
  late-game meta application / strong functional connector。它比 ICE_CAND_0020
  和 ICE_CAND_0021 更激进：meta 不只是 role-relay，而是破坏正确状态、制造
  hidden stopper、再破坏另一个正确 target 并回填。仍不应包装成终局 capstone。
base_flow: >
  A->B 是干净但很薄的 light witness。玩家把 [2,2] 右推，借 [5,2] target ice
  d2 停到 [4,2] target，然后走到 B。base 单独不提供后期质量。
meta_flow: >
  C->D 是 double-debt meta。先把 [13,5] 已正确 target-ice 上推 d3 消失，
  产生右侧 target debt，并打开 x13 列推位以处理 [12,2]。随后 [12,2] 左推
  d5/restart，穿过 [6,2] wall + [5,2] target ice，借 [2,2] 停到 [3,2]，
  形成后续会被消费的 hidden stopper。接着 [14,5] 左推 d1 回填 [13,5]。
  然后 [14,2] 左推 d6+，摧毁 [6,2] wall + [5,2] target ice，借 [3,2]
  停到 [4,2]，同时制造 [5,2] target debt 并打开左侧回填通路。最后 [5,4]
  上推 d2 回填 [5,2]，再到 D。
cross_temporal_reuse: >
  base 的 [2,2]、[4,2]、[5,2]、[6,2] 在 meta 中换成 stopper、target debt、
  obstacle group 和 destructible gate。这个复用只在 meta 回访时产生价值，
  不能回灌成 base 深度。
player_insight: >
  后期回访玩家需要接受两个“正确状态”必须被破坏：右 target-ice 用来开推位，
  左 target-ice 用来作为 d6 可破组。关键不是事件多，而是 [12,2] 产物 [3,2]
  被 final d6 消费，且两个 target debt 必须偿还。
causal_chain: >
  Base: [2,2] -> [4,2] by d2, exit B.
  Meta: [13,5] d3 disappears -> opens x13 push position and creates debt;
  [12,2] left d5 -> [3,2] hidden stopper; [14,5] left d1 -> [13,5] refill;
  [14,2] left d6+ destroys [6,2]+[5,2], uses [3,2] to stop at [4,2];
  [5,4] up d2 -> [5,2] refill, exit D.
why_not_execution: >
  完整图、required-event probe 和四个资源移除反事实支持结构必要性；但审美上仍有 caveat：
  前两步带走廊气味，右侧回填偏直给，不是终局级顺序悖论。
falsification: >
  若 C->D 存在缺 d3/d5/restart/d6/d1/d2 的胜路，或移除 first d5 ice / final d6 ice /
  left refill ice / right refill ice 后仍可解，或出现 ABCD->非 ABCD edge、A/B->C/D，
  则 reject 或结构重做。
```

## 机制范围

```yaml
central:
  - "[13,5] correct target-ice destroyed by d3 to create target debt and x13 push access"
  - "[12,2] d5 creates [3,2] hidden stopper"
  - "[14,2] d6 consumes [3,2] stopper while destroying [6,2]+[5,2]"
  - "[5,4] refills the second target debt at [5,2]"
support:
  - base one-push target fill
  - explicit edge start / goal
  - target ice as obstacle-group member
  - right target refill by [14,5]
incidental:
  - selected-interface self/return pairs
  - post-solve walking to D
```

## 路由结果

```yaml
edge_pair_scan:
  ref: prototypes/ice_slide_escape/reports/edge_pair_scan_ICE_CAND_0022_v1_ABCD.md
  edge_goals_checked: 48
  starts_checked:
    A: [0, 2]
    B: [0, 7]
    C: [16, 7]
    D: [16, 2]
  ABCD_to_non_ABCD_edge: none_solved
  A_or_B_to_C_or_D:
    A_to_C: unsolved
    A_to_D: unsolved
    B_to_C: unsolved
    B_to_D: unsolved
  selected_interface_pairs_solved:
    - A->A
    - A->B
    - B->A
    - B->B
    - C->D
    - C->C
    - D->D
    - D->C
  verdict_effect: pass_required_reachability_gate
```

## Evidence Summary

```yaml
base_analysis:
  ref: prototypes/ice_slide_escape/reports/layout_analysis_ICE_CAND_0022_v1_base_A_to_B.md
  found: true
  graph_status: complete
  reachable_states: 18
  winning_states: 1
  cost: 9
  pushes: 1
meta_analysis:
  ref: prototypes/ice_slide_escape/reports/layout_analysis_ICE_CAND_0022_v1_meta_C_to_D.md
  found: true
  graph_status: complete
  reachable_states: 1018
  winning_states: 1
  cost: 51
  pushes: 5
  key_events:
    - ice_destroyed_d3
    - ice_pass_through_d5:len2
    - slide_restart_after_group
    - ice_destroy_group_d6_plus:len2
    - ice_stop_short:d1
    - ice_stop_short:d2
required_event_probe:
  ref: prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0022_v1_meta_goal_D_ABCD.md
  result: complete_no_missing_required_win
counterfactuals:
  remove_first_d5_ice: complete_unsolved
  remove_final_d6_ice: complete_unsolved
  remove_left_refill_ice: complete_unsolved
  remove_right_refill_ice: complete_unsolved
```

## SCC / Graph Diagnostic

```yaml
graph_interpretations:
  - graph_fact: "base A->B complete graph: 18 states, 1 commitment, one_win_continuation_per_scc"
    neutral_meaning: "base 的可胜不可逆提交只有一次。"
    player_facing_interpretation: "base 是轻量见证流程，不是深关。"
    verdict_effect: "限制 base_flow claim。"
  - graph_fact: "meta C->D complete graph: 1018 states, 49 SCCs, 5 solution commitments"
    neutral_meaning: "meta 存在多阶段不可逆结构。"
    player_facing_interpretation: "这支持结构复杂度，但不自动证明玩家洞见。"
    verdict_effect: "只作为结构证据。"
  - graph_fact: "meta forcedWinPrefix=2/5, branching_win_dag"
    neutral_meaning: "前两次胜路推进被强约束，后续存在分支/汇合。"
    player_facing_interpretation: "不能声称严格唯一顺序；可说存在状态债务和回填选择空间。"
    verdict_effect: "保留 caveat。"
  - graph_fact: "meta scripted handoffs 0/5, all handoffs has_reposition_room"
    neutral_meaning: "返回解不可逆提交前有可逆站位空间。"
    player_facing_interpretation: "弱支持非纯输入串，但不能替代审美评审。"
    verdict_effect: "minor support。"
  - graph_fact: "edge scan checked 48 edge goals from A/B/C/D; non-ABCD solved count 0"
    neutral_meaning: "声明接口起点没有通向非接口边缘 goal 的胜路。"
    player_facing_interpretation: "满足本轮硬性可达性要求。"
    verdict_effect: "通过 required reachability gate。"
```

## Review Loop

```yaml
review_1:
  target: ICE_CAND_0022_v1_double_debt_meta
  evidence_reviewer:
    verdict: supports_with_caveats
    review_loop_state: proposal_ready_with_caveats
    required_action: none
    summary: >
      证据支持 base 是 light witness，meta 是五推 double-debt chain；required-event
      probe、edge scan 和四个反事实均支持核心结构。Caveat：证据不证明玩家洞见，
      objectParticipation 为空，selected-interface 自环/返程需披露。
  design_critic:
    verdict: supports_with_caveats
    review_loop_state: proposal_ready_with_caveats
    required_action: none
    summary: >
      C->D 达到“更激进 meta”的最低审美门槛：破坏正确状态、预置远端 stopper、
      再破坏另一个正确 target 并回填，明显强于简单 role-relay。但前两步仍有
      corridor 气味，右侧回填偏直给，适合作为 strong meta connector/application，
      不应包装成终局级 aha。
  loop_result: proposal_ready_with_caveats
```

## 人类评语

```yaml
human_comments:
  - id: HC_ICE_CAND_0022_001
    author: human_designer
    status: accepted
    text: >
      这关非常扎实，我认为完全可以作为合格的 meta 关候选。base 流程轻度且
      不暴露右侧知识，并展示复杂结构引人遐想；meta 流程扎实稳健。meta 部分
      和 base 流程部分分别缺少洞见，但是洞见和扎实的 meta 共存的要求过高了。
      摸不到炫技级别的精彩 meta 好关的原因是复用虽然扎实，但是缺了点空间、
      要素的交融复用，base 流程下右侧的绝大部分东西都是摆设。当然，这样的
      优点是恰好 base 流程是游戏前期的简单 d2，正好匹配右侧对左侧读题几乎
      零污染，有非常合理的功能性定位。
status: accepted
```

## Evidence Refs

```text
- prototypes/ice_slide_escape/design_archive/experiments/ICE_EXP_META_2026_07_01_round3_double_debt_proposal_ready_with_caveats.md
- prototypes/ice_slide_escape/reports/ICE_CAND_0022_v1_double_debt_meta_layout.txt
- prototypes/ice_slide_escape/reports/layout_analysis_ICE_CAND_0022_v1_base_A_to_B.md
- prototypes/ice_slide_escape/reports/layout_analysis_ICE_CAND_0022_v1_base_A_to_B.json
- prototypes/ice_slide_escape/reports/layout_analysis_ICE_CAND_0022_v1_meta_C_to_D.md
- prototypes/ice_slide_escape/reports/layout_analysis_ICE_CAND_0022_v1_meta_C_to_D.json
- prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0022_v1_base_goal_B_ABCD.md
- prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0022_v1_base_goal_B_ABCD.json
- prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0022_v1_meta_goal_D_ABCD.md
- prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0022_v1_meta_goal_D_ABCD.json
- prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0022_v1_goal_C_AB_only.md
- prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0022_v1_goal_C_AB_only.json
- prototypes/ice_slide_escape/reports/edge_pair_scan_ICE_CAND_0022_v1_ABCD.md
- prototypes/ice_slide_escape/reports/layout_analysis_ICE_CAND_0022_v1_probe_remove_first_d5_ice.md
- prototypes/ice_slide_escape/reports/layout_analysis_ICE_CAND_0022_v1_probe_remove_first_d5_ice.json
- prototypes/ice_slide_escape/reports/layout_analysis_ICE_CAND_0022_v1_probe_remove_final_d6_ice.md
- prototypes/ice_slide_escape/reports/layout_analysis_ICE_CAND_0022_v1_probe_remove_final_d6_ice.json
- prototypes/ice_slide_escape/reports/layout_analysis_ICE_CAND_0022_v1_probe_remove_left_refill_ice.md
- prototypes/ice_slide_escape/reports/layout_analysis_ICE_CAND_0022_v1_probe_remove_left_refill_ice.json
- prototypes/ice_slide_escape/reports/layout_analysis_ICE_CAND_0022_v1_probe_remove_right_refill_ice.md
- prototypes/ice_slide_escape/reports/layout_analysis_ICE_CAND_0022_v1_probe_remove_right_refill_ice.json
```

## 检索摘要

```text
人类接受的合格 meta 候选。Base A->B 是 light witness；
Meta C->D 是 double-debt chain：先 d3 破坏右侧已填 target-ice 以打开 x13 推位，
再 d5 预置 [3,2] hidden stopper，回填右侧 target，随后 d6 摧毁 [6,2]+[5,2]
并消费 [3,2] 停到 [4,2]，最后回填 [5,2]。硬可达性 gate 通过。独立 review
认为它明显强于 0020/0021 的简单 connector。人类评语接受其作为扎实稳健的
meta 关候选：base 的轻量 d2 流程与右侧低读题污染恰好匹配，适合作为前期入口；
meta 扎实。Caveat 是 base/meta 各自缺少洞见，空间和要素交融复用不足，右侧
大多在 base 中是摆设，因此不是炫技级 meta 好关。
```
