# Experiment Ledger: ICE_EXP_META_2026_06_30_round2_stopper_relay_proposal_ready_with_caveats

```yaml
experiment_id: ICE_EXP_META_2026_06_30_round2_stopper_relay_proposal_ready_with_caveats
prototype: ice_slide_escape
date: 2026-06-30
terminal_state: proposal_ready_with_caveats
review_integrity: independent_review
candidate_ids:
  - ICE_CAND_0021
required_action_after_latest_review: none
```

## 本轮目标

执行一轮新的 meta 关设计尝试。候选需要显式区分：

```yaml
base_flow: "玩家初次进入地图时实际体验到的流程"
meta_flow: "玩家中后期回访同一重置布局时实际体验到的流程"
cross_temporal_reuse: "回访时产生的伏笔 / 重读 / 调度价值"
```

本轮不再把 cross-temporal reuse 误当成 base 或 meta 单流程复杂度。若设计只是拼图，
应明确承认其生态位。硬性可达性要求为：从 A/B/C/D 任意起点到非 A/B/C/D 边缘可解
即 reject；任意 A/B->C/D 可解也 reject。

## Archive Taste Context

仅使用有人类评语的候选做审美校准，未复用 layout、几何结构、因果链、路线、
对象摆放或入口出口关系。

```yaml
used_for_calibration:
  ICE_CAND_0019:
    human_status: accepted_positive_with_caveats
    lesson: >
      延迟 hidden stopper 和扎实复合锁可被接受，但仍不等于终局级 aha。
  ICE_CAND_0015:
    human_status: structural_redesign_needed
    lesson: >
      证据链存在不等于玩家洞见存在；唯一走廊自然触发不能声称强 insight。
  ICE_CAND_0004:
    human_status: rejected_candidate
    lesson: >
      简单重复和同质堆叠不可包装成 application。
  ICE_CAND_0020:
    human_status: accepted_functional_meta_connector
    lesson: >
      功能性 meta connector 有生态位；但 base 和 meta 单独流程若是 witness，
      不能因跨时间复用而被抬高复杂度。
```

## Exploration Log

```yaml
exploration:
  - step: read_constraints_and_previous_round
    result: >
      继承本轮 meta 约束，并吸收人类对 ICE_CAND_0020 的新校准：
      base/meta/cross-temporal reuse 三者分开评价。
  - step: manual_family_seed
    result: >
      放弃继续做上下平行 lane，改为一条主 lane + 一个竖向潜伏 relay 冰。
      目标是让 meta 第一推先制造非即时 stopper，第二块冰随后消费它。
  - step: v1_layout
    result: >
      v1 可解：base 是一推 d2；meta 是三推 d5 -> vertical d2 -> d5。
      但 C/D 命名使 C->C 比 C->D 更近，路由语义不够诚实。
  - step: designer_action_1
    action: swap_right_side_interface_labels
    result: >
      布局不变，接口改为 C=[14,6]、D=[14,2]，使声明 meta 为右下进、右上出。
      designer_action_1 不关闭 review loop，只进入新的 v2 证据。
  - step: v2_evidence
    result: >
      重新运行 base/meta solver、ABCD start comparison、edge scan 和 v2 方向反事实探针。
```

## Proposal

```yaml
candidate_id: ICE_CAND_0021
version: ICE_CAND_0021_v2_stopper_relay
terminal_state: proposal_ready_with_caveats
interfaces:
  A: [0, 2]
  B: [0, 6]
  C: [14, 6]
  D: [14, 2]
base_instance: A->B
meta_instance: C->D
classification: functional_meta_connector_with_small_role_relay
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
base_flow:
  claim: light witness / functional connector
  chain: "[2,2] right -> d2 stop at [4,2] target using [5,2] target ice"
  quality_note: >
    base 不能被称为复杂 application；玩家初见时不会感受到右侧潜伏材料用途。
meta_flow:
  claim: small stopper-relay
  chain: >
    [12,2] left d5/restart -> [3,2] stopper;
    [12,4] up d2 -> [12,2];
    [12,2] left d5/restart -> [4,2] target using [3,2] stopper.
  quality_note: >
    meta 内部有真实角色转换和状态消费，但两次 d5 复用同 corridor，
    仍是小型 relay，不是高难 capstone。
cross_temporal_reuse:
  claim: meaningful_reinterpretation
  reused_materials:
    - "[4,2] target"
    - "[5,2] target ice"
    - "[2,2] base ice"
    - "[6,2] wall"
    - "[12,2]/[12,4] right-side latent ice"
```

## Evidence Summary

```yaml
base_analysis:
  ref: prototypes/ice_slide_escape/reports/layout_analysis_ICE_CAND_0021_v2_base_A_to_B.md
  found: true
  graph_status: complete
  reachable_states: 16
  winning_states: 1
  cost: 8
  pushes: 1
  required_events:
    - ice_stop_short:d2
meta_analysis:
  ref: prototypes/ice_slide_escape/reports/layout_analysis_ICE_CAND_0021_v2_meta_C_to_D.md
  found: true
  graph_status: complete
  reachable_states: 123
  winning_states: 1
  cost: 18
  pushes: 3
  required_events:
    - ice_pass_through_d5:len2
    - slide_restart_after_group
    - ice_stop_short:d2
    - ice_stop_short:d1
edge_scan:
  ref: prototypes/ice_slide_escape/reports/edge_pair_scan_ICE_CAND_0021_v2_ABCD.md
  edge_goals_checked: 42
  ABCD_to_non_ABCD_edge: none_solved
  A_or_B_to_C_or_D: all_unsolved
counterfactuals:
  remove_main_lane_ice: complete_unsolved
  remove_base_stopper_ice: complete_unsolved
  remove_vertical_relay_ice: complete_unsolved
```

## SCC / Graph Diagnostic

```yaml
graph_reading:
  - graph_fact: "base A->B complete graph: 16 states, 1 commitment, forced viable prefix 1/1"
    neutral_meaning: "base 胜路只有一个实质不可逆推进。"
    player_facing_interpretation: "玩家体验是一推见效，然后走到出口。"
    verdict_effect: "支持 light witness 定位；压低复杂度 claim。"
  - graph_fact: "meta C->D complete graph: 123 states, 3 solution commitments, no scripted handoffs"
    neutral_meaning: "meta 返回解有三次不可逆推进，且提交前有可逆站位空间。"
    player_facing_interpretation: "meta 有实际 relay 规划空间。"
    verdict_effect: "支持 small role-relay merit。"
  - graph_fact: "meta branching_win_dag; forced optimal prefix 3/3; forced viable prefix 0/3"
    neutral_meaning: "最优承诺顺序固定，但可胜承诺顺序并非开局唯一。"
    player_facing_interpretation: "不能声称严格唯一解序列。"
    verdict_effect: "保留 caveat。"
  - graph_fact: "ABCD edge scan solved_count to non-ABCD edge is 0"
    neutral_meaning: "声明接口起点没有通向非接口边缘 goal 的胜路。"
    player_facing_interpretation: "大地图接口污染风险低。"
    verdict_effect: "通过硬性可达性 gate。"
```

## Review Loop

```yaml
review_1:
  target: ICE_CAND_0021_v2_stopper_relay
  evidence_reviewer:
    review_integrity: independent_review
    verdict: supports_with_caveats
    review_loop_state: proposal_ready_with_caveats
    required_action: none
    attacks:
      - "objectParticipation 为空，只能说坐标材料/位置角色复用。"
      - "selected-interface 自环/返程 pair 需披露。"
      - "证据支持 base 是轻流程，不支持复杂 application。"
  design_critic:
    review_integrity: independent_review
    verdict: supports_with_caveats
    review_loop_state: proposal_ready_with_caveats
    required_action: none
    attacks:
      - "base 独立质量很低。"
      - "meta 第一推可能先试后悟，不一定预先推理。"
      - "两次 d5 同 corridor，重复感真实。"
      - "forced optimal prefix 不等于所有可胜路线严格唯一。"
designer_action_after_review_1:
  action: none
  rationale: >
    required_action 为 none，且 reviewer/critic 均允许 proposal_ready_with_caveats。
    只在归档措辞中降级 claim，不用 designer_action 关闭 loop。
loop_result: proposal_ready_with_caveats
```

## Evidence Refs

```text
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
- prototypes/ice_slide_escape/reports/layout_analysis_ICE_CAND_0021_v2_probe_remove_main_lane_ice.json
- prototypes/ice_slide_escape/reports/layout_analysis_ICE_CAND_0021_v2_probe_remove_base_stopper_ice.md
- prototypes/ice_slide_escape/reports/layout_analysis_ICE_CAND_0021_v2_probe_remove_base_stopper_ice.json
- prototypes/ice_slide_escape/reports/layout_analysis_ICE_CAND_0021_v2_probe_remove_vertical_relay_ice.md
- prototypes/ice_slide_escape/reports/layout_analysis_ICE_CAND_0021_v2_probe_remove_vertical_relay_ice.json
```

## Human Review Priority

```yaml
priority_for_human_review:
  - ICE_CAND_0021
reason: >
  本轮唯一 proposal。它不是高难关，但在功能性 meta connector 生态位上比
  ICE_CAND_0020 多一层 meta 内部 role-relay，值得人类优先判断该结构是否足够
  有趣，或是否仍应只作为路线拼图素材。
```
