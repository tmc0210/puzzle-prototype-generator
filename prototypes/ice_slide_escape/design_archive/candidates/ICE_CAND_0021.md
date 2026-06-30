# 候选：ICE_CAND_0021

```yaml
candidate_id: ICE_CAND_0021
prototype: ice_slide_escape
experiment_id: ICE_EXP_META_2026_06_30_round2_stopper_relay_proposal_ready_with_caveats
status: proposal_ready_with_caveats
llm_candidate_strength: functional_meta_connector_with_small_role_relay
human_final_status: pending
archive_eligibility: human_pending
review_integrity: independent_review
motifs:
  - short_stop_d1_d2
  - d5_pass_through
  - restart_counting
  - target_ice_coverage
  - explicit_edge_goal
  - meta_reinterpretation
  - latent_element_payoff
archive_use:
  - critic_calibration
  - designer_calibration
strengths:
  - clean_reachability_gate
  - small_meta_role_relay
  - cross_temporal_reuse
failure_modes:
  - thin_base_flow
  - repeated_d5_corridor
  - overclaim_risk
human_comment_ids: []
ledger_ref: prototypes/ice_slide_escape/design_archive/experiments/ICE_EXP_META_2026_06_30_round2_stopper_relay_proposal_ready_with_caveats.md
evidence_refs:
  - prototypes/ice_slide_escape/reports/layout_analysis_ICE_CAND_0021_v2_base_A_to_B.md
  - prototypes/ice_slide_escape/reports/layout_analysis_ICE_CAND_0021_v2_meta_C_to_D.md
  - prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0021_v2_base_goal_B_ABCD.md
  - prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0021_v2_meta_goal_D_ABCD.md
  - prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0021_v2_goal_C_AB_only.md
  - prototypes/ice_slide_escape/reports/edge_pair_scan_ICE_CAND_0021_v2_ABCD.md
```

## 布局

求解实例：

```yaml
interfaces:
  A: [0, 2]
  B: [0, 6]
  C: [14, 6]
  D: [14, 2]
base_instance:
  player_start: [0, 2]
  player_goal: [0, 6]
meta_instance:
  player_start: [14, 6]
  player_goal: [14, 2]
win_condition: ice_slide_escape_explicit_goal
```

```text
###############
###############
..I.G*#.....I..
#.##########..#
#.##########I.#
#.##########..#
..##########...
###############
```

## Design Claim

```yaml
ecological_niche: >
  功能性 meta connector / 小型 stopper-relay 拼图素材。它比 ICE_CAND_0020
  的 meta 内部链条更有角色转换，但仍不是高难关或 capstone。
base_flow: >
  A->B 是轻 base / light witness。玩家从 A 进入，只需把 [2,2] 冰右推，
  借 [5,2] 初始 target ice 作为 stopper，d2 停到 [4,2] target，然后走到 B。
  不能把后续 meta 复用回灌成 base 自身复杂度。
meta_flow: >
  C->D 是三推 role-relay。右侧主 lane 冰 [12,2] 先左推，d5 穿过
  [6,2] wall + [5,2] target ice，借 [2,2] base 冰停到 [3,2]；这一步
  不填 target，而是制造后续 stopper。随后 [12,4] 竖向潜伏冰上推到
  [12,2]，再被左推第二次 d5 穿过同一障碍组，借 [3,2] 停到 [4,2] target。
cross_temporal_reuse: >
  [4,2] target、[5,2] target ice、[2,2] base 冰、[6,2] wall 在 base/meta
  中承担不同角色；右侧两块冰在 base 中是低暴露潜伏材料，在 meta 回访时获得 payoff。
player_insight: >
  meta 回访时，第一块右侧冰的正确价值不是填 target，而是非即时地制造最终 stopper；
  第二块潜伏冰随后消费这个 stopper。该洞见存在但规模较小，容易被玩家先试后悟。
causal_chain: >
  Base: [2,2] -> [4,2] target by d2 short stop, exit B.
  Meta: [12,2] left d5/restart -> [3,2] stopper; [12,4] up d2 -> [12,2];
  [12,2] left d5/restart -> [4,2] target using [3,2] stopper, exit D.
why_not_execution: >
  meta 有完整图支持的 3 次不可逆推进、required-event probe、以及移除主 lane 冰 /
  base stopper 冰 / 竖向 relay 冰后三个 complete-search 反事实失败。审美上仍需降级：
  两次 d5 复用同 corridor，第一推也可能被玩家自然试出。
falsification: >
  若存在缺少 d5/restart/d2/d1 的 meta 胜路、移除任一核心材料仍可 meta 解、
  ABCD->非 ABCD edge 可解，或 A/B->C/D 可解，则 reject 或结构重做。
```

## 机制范围

```yaml
central:
  - meta 中第一块右侧冰生成非即时 stopper
  - 竖向潜伏冰回到主 lane 并消费该 stopper
  - d5 pass-through + restart 穿过同一 wall/target-ice 障碍组
support:
  - base 一推 target fill
  - edge start / edge goal 显式接口
  - target ice 作为 obstacle group 成员
incidental:
  - selected-interface 自环/返程 pair
  - right-side walking reposition space
```

## 路由结果

```yaml
edge_pair_scan:
  ref: prototypes/ice_slide_escape/reports/edge_pair_scan_ICE_CAND_0021_v2_ABCD.md
  edge_goals_checked: 42
  starts_checked:
    A: [0, 2]
    B: [0, 6]
    C: [14, 6]
    D: [14, 2]
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

## 图诊断解释

```yaml
graph_interpretations:
  - graph_fact: "base A->B complete graph: 16 states, 1 commitment, forced viable prefix 1/1"
    neutral_meaning: "base 胜路只有一个实质不可逆推进。"
    player_facing_interpretation: "玩家体验是一推见效，然后走到出口。"
    verdict_effect: "支持 light witness / route connector 定位，不支持高复杂 claim。"
  - graph_fact: "meta C->D complete graph: 123 states, 3 solution commitments, no scripted handoffs"
    neutral_meaning: "meta 返回解有三次不可逆推进，提交前有可逆站位空间。"
    player_facing_interpretation: "meta 不是纯换入口走路，存在实际 relay 规划空间。"
    verdict_effect: "支持 small role-relay merit。"
  - graph_fact: "meta branching_win_dag, forced optimal prefix 3/3, forced viable prefix 0/3"
    neutral_meaning: "最优承诺顺序固定，但可胜承诺顺序并非开局唯一。"
    player_facing_interpretation: "不能声称严格唯一解序列。"
    verdict_effect: "保留 proposal_ready_with_caveats。"
  - graph_fact: "edge scan checked 42 edge goals from A/B/C/D; non-ABCD solved count 0"
    neutral_meaning: "四个声明接口起点没有通向非接口边缘的可解实例。"
    player_facing_interpretation: "满足本轮硬性可达性要求。"
    verdict_effect: "通过 required reachability gate。"
```

## Review Loop

```yaml
review_1:
  target: ICE_CAND_0021_v2_stopper_relay
  evidence_reviewer:
    verdict: supports_with_caveats
    review_loop_state: proposal_ready_with_caveats
    required_action: none
    summary: >
      证据支持 base 是一推轻流程，meta 是三推 role-relay；ABCD 到非 ABCD
      边缘无可解 pair，A/B->C/D 全部不可解。Caveat 是 objectParticipation
      为空，需按坐标材料而非对象身份表述；selected-interface 自环/返程需披露。
  design_critic:
    verdict: supports_with_caveats
    review_loop_state: proposal_ready_with_caveats
    required_action: none
    summary: >
      meta 内部链条比 ICE_CAND_0020 更有角色转换，第一 d5 无即时 target 回报，
      之后被竖向 relay 冰消费。但 base 独立质量很低，meta 两次 d5 同 corridor
      仍有重复感；应作为功能性 meta connector / 小型 stopper-relay 素材提交，
      不应包装成高洞见关。
  loop_result: proposal_ready_with_caveats
```

## 人类评语

```yaml
human_comments: []
status: pending
```

## 证据引用

```text
- prototypes/ice_slide_escape/design_archive/experiments/ICE_EXP_META_2026_06_30_round2_stopper_relay_proposal_ready_with_caveats.md
- prototypes/ice_slide_escape/reports/ICE_CAND_0021_v2_stopper_relay_layout.txt
- prototypes/ice_slide_escape/reports/layout_analysis_ICE_CAND_0021_v2_base_A_to_B.md
- prototypes/ice_slide_escape/reports/layout_analysis_ICE_CAND_0021_v2_base_A_to_B.json
- prototypes/ice_slide_escape/reports/layout_analysis_ICE_CAND_0021_v2_meta_C_to_D.md
- prototypes/ice_slide_escape/reports/layout_analysis_ICE_CAND_0021_v2_meta_C_to_D.json
- prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0021_v2_base_goal_B_ABCD.md
- prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0021_v2_base_goal_B_ABCD.json
- prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0021_v2_meta_goal_D_ABCD.md
- prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0021_v2_meta_goal_D_ABCD.json
- prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0021_v2_goal_C_AB_only.md
- prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0021_v2_goal_C_AB_only.json
- prototypes/ice_slide_escape/reports/edge_pair_scan_ICE_CAND_0021_v2_ABCD.md
- prototypes/ice_slide_escape/reports/layout_analysis_ICE_CAND_0021_v2_probe_remove_main_lane_ice.md
- prototypes/ice_slide_escape/reports/layout_analysis_ICE_CAND_0021_v2_probe_remove_base_stopper_ice.md
- prototypes/ice_slide_escape/reports/layout_analysis_ICE_CAND_0021_v2_probe_remove_vertical_relay_ice.md
```

## 检索摘要

```text
本轮 meta 设计 proposal_ready_with_caveats。Base A->B 是 light witness：
一推把 [2,2] 送到 [4,2] target。Meta C->D 是小型 stopper-relay：
右侧主 lane 冰先 d5 穿过 [6,2]+[5,2]，借 [2,2] 停到 [3,2]，作为非即时
stopper；竖向潜伏冰 [12,4] 上推回 [12,2] 后第二次 d5，借 [3,2] 停到
[4,2] target。完整 edge scan 通过硬可达性门。独立 review_1 要求降级口径：
它是功能性 meta connector / small role-relay，不是高难 capstone。
```
