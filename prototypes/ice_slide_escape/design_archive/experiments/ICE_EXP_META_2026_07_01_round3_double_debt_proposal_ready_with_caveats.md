# Experiment Ledger: ICE_EXP_META_2026_07_01_round3_double_debt_proposal_ready_with_caveats

```yaml
experiment_id: ICE_EXP_META_2026_07_01_round3_double_debt_proposal_ready_with_caveats
prototype: ice_slide_escape
date: 2026-07-01
terminal_state: proposal_ready_with_caveats
review_integrity: independent_review
candidate_ids:
  - ICE_CAND_0022
required_action_after_latest_review: none
```

## 本轮目标校准

人类即时反馈指出：`ICE_CAND_0021` 与 `ICE_CAND_0020` 在后期回访玩家尺度上几乎
无差异；简单 role-relay 对后期玩家约等于无难度。本轮因此不再围绕短 d5/d6 链
打转，而尝试更激进的 meta flow：

```yaml
new_meta_bar:
  - meta flow 自身必须按后期玩家尺度评价
  - 必须出现非局部状态债、破坏正确状态再回填、hidden stopper 或顺序张力
  - 事件数量和 SCC 复杂度只能作结构事实，不能作质量证明
  - base_flow / meta_flow / cross_temporal_reuse 继续分开评价
note: >
  上述反馈作为本轮即时设计约束使用，不写入 archive human_comment，
  因为用户未显式标记为归档评语。
```

## Archive Taste Context

仅使用带人类评语的候选做 taste calibration；未复用 archive layout、几何结构、
因果链、路线、对象摆放或入口出口关系。

```yaml
used_for_calibration:
  ICE_CAND_0019:
    human_status: accepted_positive_with_caveats
    lesson: >
      延迟 hidden stopper 和扎实复合锁可接受，但仍不是终局级 aha。
  ICE_CAND_0015:
    human_status: structural_redesign_needed
    lesson: >
      证据链存在但唯一通路自然触发，不算有效洞见。
  ICE_CAND_0020:
    human_status: accepted_functional_meta_connector
    lesson: >
      功能性 meta connector 有生态位，但 base/meta 单流程 witness 不能被过度声称。
```

## Exploration Log

```yaml
exploration:
  - step: update_target
    result: >
      将目标从 small role-relay 提升到 double-debt / target destruction and refill。
  - step: miner_probe
    command: >
      npx tsx src/cli.ts mine prototypes/ice_slide_escape --preset deep --iterations 48 ...
    result: >
      矿工仅作机制灵感：观察到 mixed d3/d4/d5/d6、多 push、branching win DAG
      的可能形态；未复用任何矿工 layout。
  - step: manual_family
    result: >
      手工构造 base 轻 witness + meta double-debt 家族。Meta 先破坏右侧已填 target，
      再预置 hidden stopper，随后 d6 破坏左侧已填 target 并回填。
  - step: v1_solver
    result: >
      Base 可解 cost 9；Meta 可解 cost 51、5 pushes、完整图 1018 states、1 win。
  - step: evidence_gates
    result: >
      required-event probe、ABCD 全边缘扫描、四个核心资源移除反事实均通过。
```

## Proposal

```yaml
candidate_id: ICE_CAND_0022
version: ICE_CAND_0022_v1_double_debt_meta
terminal_state: proposal_ready_with_caveats
interfaces:
  A: [0, 2]
  B: [0, 7]
  C: [16, 7]
  D: [16, 2]
base_instance: A->B
meta_instance: C->D
classification: strong_meta_connector_with_caveats
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
base_flow:
  claim: light witness
  chain: "[2,2] right -> d2 stop at [4,2] target using [5,2] target ice"
  quality_note: "base 干净但薄，不承担后期普通关质量。"
meta_flow:
  claim: double-debt meta application
  chain: >
    [13,5] d3 disappears -> x13 push access and right target debt;
    [12,2] left d5/restart -> [3,2] hidden stopper;
    [14,5] left d1 -> [13,5] refill;
    [14,2] left d6+ -> destroy [6,2]+[5,2], use [3,2] to stop at [4,2];
    [5,4] up d2 -> [5,2] refill.
  quality_note: >
    有破坏正确状态、hidden stopper 消费和二次 target debt；但仍有 corridor
    气味和专用回填冰，不是终局级 aha。
cross_temporal_reuse:
  reused_materials:
    - "[2,2] base ice -> meta stopper"
    - "[4,2] base target -> final d6 landing target"
    - "[5,2] base target ice -> d6 destructible group / target debt"
    - "[6,2] wall -> destructible gate"
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
required_probe:
  ref: prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0022_v1_meta_goal_D_ABCD.md
  result: complete_no_missing_required_win
edge_scan:
  ref: prototypes/ice_slide_escape/reports/edge_pair_scan_ICE_CAND_0022_v1_ABCD.md
  edge_goals_checked: 48
  ABCD_to_non_ABCD_edge: none_solved
  A_or_B_to_C_or_D: all_unsolved
counterfactuals:
  remove_first_d5_ice: complete_unsolved
  remove_final_d6_ice: complete_unsolved
  remove_left_refill_ice: complete_unsolved
  remove_right_refill_ice: complete_unsolved
```

## SCC / Graph Diagnostic

```yaml
graph_reading:
  - graph_fact: "base A->B complete graph: 18 states, 1 commitment"
    neutral_meaning: "base 的可胜不可逆提交只有一次。"
    player_facing_interpretation: "base 是轻量见证流程。"
    verdict_effect: "限制 base claim。"
  - graph_fact: "meta C->D complete graph: 1018 states, 49 SCCs, 5 solution commitments"
    neutral_meaning: "meta 有多阶段不可逆结构。"
    player_facing_interpretation: "这只证明结构复杂度；玩家价值来自状态债务被消费。"
    verdict_effect: "supports structure, not quality by itself。"
  - graph_fact: "meta forcedWinPrefix=2/5, branching_win_dag"
    neutral_meaning: "前两次胜路推进强约束，后续有分支/汇合。"
    player_facing_interpretation: "不能声称严格唯一顺序悖论。"
    verdict_effect: "proposal_ready_with_caveats。"
  - graph_fact: "edge scan: ABCD_to_non_ABCD_edge solved_count=0"
    neutral_meaning: "无声明接口到非接口边缘的胜路。"
    player_facing_interpretation: "大地图接口污染风险低。"
    verdict_effect: "pass hard reachability gate。"
```

## Review Loop

```yaml
review_1:
  target: ICE_CAND_0022_v1_double_debt_meta
  evidence_reviewer:
    review_integrity: independent_review
    verdict: supports_with_caveats
    review_loop_state: proposal_ready_with_caveats
    required_action: none
    attacks:
      - "证据支持结构事实，不证明后期玩家必然洞见。"
      - "objectParticipation 为空，只能按坐标材料表述。"
      - "C->C/D->D/D->C selected-interface 变体需披露。"
  design_critic:
    review_integrity: independent_review
    verdict: supports_with_caveats
    review_loop_state: proposal_ready_with_caveats
    required_action: none
    attacks:
      - "base_flow 过薄。"
      - "meta 前两步仍有 forced-corridor 气味。"
      - "double-debt 成立，但不是完全顺序悖论。"
      - "如果目标是终局级 meta，还需要更强错误诱因。"
designer_action_after_review_1:
  action: none
  rationale: >
    required_action 为 none；按 caveat 降级为 strong meta connector/application，
    不包装成 capstone。
loop_result: proposal_ready_with_caveats
```

## Evidence Refs

```text
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

## Human Review Priority

```yaml
priority_for_human_review:
  - ICE_CAND_0022
reason: >
  本轮唯一值得提交的人类审查 proposal。它直接回应“不要在简单机制里打转”的反馈，
  meta flow 至少有 double-debt 和 hidden stopper 消费；但仍需人类判断是否只是
  corridor 装置链，或已经达到可用 late-game meta application。
```
