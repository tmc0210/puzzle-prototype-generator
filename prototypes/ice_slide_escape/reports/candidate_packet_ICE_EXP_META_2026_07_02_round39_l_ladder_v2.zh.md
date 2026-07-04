# 候选包：ICE_EXP_META_2026_07_02_round39_l_ladder_v2

## 原型上下文

```yaml
prototype: ice_slide_escape
win_condition:
  - 所有 target 格必须被冰占据
  - 玩家必须站在本 solve instance 指定的边缘终点
confirmed_rules:
  - target 是 overlay；移动和滑行时按地面处理
  - "*" 表示 target 上有冰
  - d4 撞障碍会让移动冰向后回弹一格
tool_boundary:
  - A->B 与 C->D 是重置后的独立求解实例
  - 不声明 any-edge win
  - analyzer / graph 是证据，不是质量 verdict
```

## 本轮 brief 对齐

```yaml
intended_role: meta_first_design_candidate
fresh_requirement: true
base_allowed_exposure_through: ice_boundary_disappear
base_no_d5_d6_reachable: true
meta_allowed_exposure_through: all_known
difficulty_target:
  base: ">=2，目标 3"
  meta: ">=2，目标 3"
  combined: "至少一条流程 >=3"
aesthetic_target: "保底 4；本包按 4 送审，不声明 5"
```

## 布局与接口

```text
#######.############
#######.############
#######.############
....###.############
###.*....###########
####......##########
#######.############
#######..###########
########*.##########
########..##########
########....########
########..#.*....###
########..##........
#########.##########
#########.##########
```

```yaml
A: [7, 0]
B: [19, 12]
C: [0, 3]
D: [9, 14]
base_instance: { start: [7, 0], goal: [19, 12] }
meta_instance: { start: [0, 3], goal: [9, 14] }
target_ice_cells:
  - [4, 4]
  - [8, 8]
  - [12, 11]
extra_off_target_ice_count: 0
edge_floor_cells:
  - [7, 0]
  - [0, 3]
  - [19, 12]
  - [9, 14]
```

## 机制暴露与范围

```yaml
mechanic_exposure_sequence_ref: prototypes/ice_slide_escape/docs/mechanic_exposure_sequence.yml
base_allowed_exposure_through: ice_boundary_disappear
meta_allowed_exposure_through: all_known
claimed_core_events:
  base: [push_ice, ice_rebound_d4]
  meta: [push_ice, ice_rebound_d4]
required_winning_path_events:
  base: [ice_rebound_d4]
  meta: [ice_rebound_d4]
forbidden_if_seen_anywhere_for_base:
  - ice_pass_through_d5
  - slide_restart_after_group
  - ice_destroy_group_d6_plus
  - ice_boundary_disappear_after_group
incidental_allowed_for_base:
  - ice_boundary_disappear
```

base 完整可达扫描未命中 d5 / restart / d6 / group 后出界；本包只声明 base
处于 d6 前窗口，不声明 through-d4 clean cutoff。

## Review 1 后的设计修订

```yaml
previous_version: ICE_EXP_META_2026_07_02_round39_l_ladder_v1
designer_action_ref: prototypes/ice_slide_escape/reports/designer_action_ICE_EXP_META_2026_07_02_round39_l_ladder_v1_review_1.md
revision_summary:
  - "改变 base/meta 接口配对，而非把左->下、顶->右当成 v1 目标对。"
  - "base 现在是顶->右：共享中央 target 是开局门，右侧 target 是出口门。"
  - "meta 现在是左->下：左侧 target 是准备门，共享中央 target 是收束门。"
  - "claim 降格为 returned-solution-supported route facts + d4 事件类别必经。"
  - "不再声称指定 target 在所有胜解中逐对象必经。"
```

## 设计目标与核心 claim

```yaml
player_insight: >
  初始图面里三枚 target 都已被冰覆盖，但这些已完成 target 同时把四个接口之间的
  关键路径封住。目标 pair 不要求玩家发现新规则，而是重读同一批 target 冰：
  base 从顶部把中央 target 当作开局门，meta 从左侧把同一中央 target 当作最终出口门。
base_causal_chain: >
  返回最短 A->B 解先处理共享中央 target [8,8]：从顶部下推 d4 借出，再从下侧上推
  d4 还回；随后转入右侧 target [12,11]，右推/左推 d4 借出并还回，最后到 B。
meta_causal_chain: >
  返回最短 C->D 解先处理左侧 target [4,4]：右推/左推 d4 借出并还回；随后抵达同一
  中央 target [8,8]，下推/上推 d4 借出并还回，最后到 D。
chain_delta_from_base: >
  base 的读法是 central -> right；meta 的读法是 left -> central。共享中央 target
  从 base 的第一道锁变成 meta 的最后一道锁；它不是新机制展示，而是同一 target
  在不同入口目标下的顺序和出口责任变化。
why_not_execution_only: >
  两条目标流程各有 4 个 returned-solution d4 pushes；完整图未找到不使用 d4 的胜利
  路径。难点来自“已完成 target 必须临时变成通路，然后在离开前恢复”的目标债务读法。
  本包不把它提交为 5 分反转；主要审美目标是清楚、紧凑、四接口互补的 4 分候选。
```

## 反证条件

```yaml
falsification:
  - 任一 target 初始没有冰
  - 初始纯走路 A->B 或 C->D 可通
  - base 存在不使用 ice_rebound_d4 的胜利路径
  - base 可达扫描出现 d5、restart、d6 或 group 后出界
  - meta 存在不使用 ice_rebound_d4 的胜利路径
  - reviewer 认为 claim 仍把 returned solution object sequence 写成 all-solution per-object necessity
  - critic 认为 A->D 内部非目标 pair 抢走目标阅读
  - critic 认为中央 target 的 first/last 角色变化不足以达到 4
```

## 求解证据摘要

```yaml
solver_result:
  base:
    found: true
    cost: 34
    events: { walk: 30, push_ice: 4, ice_rebound_d4: 4 }
    graph: { status: complete, reachable_states: 979, legal_transitions: 2367, winning_states: 1 }
    agency: { status: complete, compressed_regions: 42, solution_commitments: 4, forced_viable_prefix: "1/4", forced_optimal_prefix: "1/4" }
  meta:
    found: true
    cost: 28
    events: { walk: 24, push_ice: 4, ice_rebound_d4: 4 }
    graph: { status: complete, reachable_states: 2526, legal_transitions: 6063, winning_states: 1 }
    agency: { status: complete, compressed_regions: 106, solution_commitments: 4, forced_viable_prefix: "1/4", forced_optimal_prefix: "1/4" }
winning_path_event_checks:
  base:
    missing_ice_rebound_d4_winning_path: "not found; complete search; explored=978"
    forbidden_reachable_hits_for_d5_restart_d6: none
  meta:
    missing_ice_rebound_d4_winning_path: "not found; complete search; explored=2525"
reachable_event_exposure:
  base_complete_scan:
    allowed_seen: [ice_rebound_d4, ice_stop_short:d1]
    forbidden_seen: []
evidence_limits:
  - "返回解的 target 坐标序列是 shortest returned solution 事实。"
  - "all-solution gate 只证明 ice_rebound_d4 事件类别必经。"
  - "没有 object-aware all-solution proof；不声明逐对象 target 债务在所有胜解中必经。"
```

## 返回解关键节点

```yaml
base_returned_solution:
  key_events:
    - { step: 9, input: down, role: "借出共享中央 target [8,8]" }
    - { step: 16, input: up, role: "还回 [8,8]，转向右侧 target" }
    - { step: 22, input: right, role: "借出右侧 target [12,11]" }
    - { step: 29, input: left, role: "还回 [12,11] 后前往 B" }
meta_returned_solution:
  key_events:
    - { step: 5, input: right, role: "借出左侧 target [4,4]" }
    - { step: 12, input: left, role: "还回 [4,4]，进入中央区" }
    - { step: 17, input: down, role: "借出共享中央 target [8,8]" }
    - { step: 24, input: up, role: "还回 [8,8] 后前往 D" }
```

## 接口与 pair policy

```yaml
interface_pair_policy:
  declared_interface_points:
    - A: [7, 0]
    - B: [19, 12]
    - C: [0, 3]
    - D: [9, 14]
  target_pairs: [A->B, C->D]
  ignored_pair_classes:
    - C/D->A/B reverse internal pairs
    - self-pairs A->A, B->B, C->C, D->D
  risky_pair_classes:
    - A/B -> C/D internal non-target pairs
    - any edge goal outside [7,0], [19,12], [0,3], [9,14]
pair_diagnostics:
  external_edge_escape_checks:
    - "static edge scan found only [7,0], [0,3], [19,12], [9,14]"
  ignored_pairs:
    - "C->A cost 16; ignored reverse internal pair"
    - "C->B cost 42; ignored reverse internal pair"
    - "D->B cost 20; ignored reverse internal pair"
    - "self-pairs A->A, B->B, C->C, D->D cost 0"
  risky_pairs:
    - "A->D cost 20"
```

## 证据文件

```yaml
layout_file: prototypes/ice_slide_escape/reports/ICE_EXP_META_2026_07_02_round39_l_ladder_v1_layout.txt
base_analysis: prototypes/ice_slide_escape/reports/layout_analysis_ICE_EXP_META_2026_07_02_round39_l_ladder_v2_base.md
meta_analysis: prototypes/ice_slide_escape/reports/layout_analysis_ICE_EXP_META_2026_07_02_round39_l_ladder_v2_meta.md
base_no_d5d6: prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_02_round39_l_ladder_v2_base_no_d5d6.md
meta_required_d4: prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_02_round39_l_ladder_v2_meta_required_d4.md
interface_static_and_pair_summary: prototypes/ice_slide_escape/reports/ICE_EXP_META_2026_07_02_round39_l_ladder_v2_interface_edges.zh.md
interface_goal_A: prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_02_round39_l_ladder_v2_interface_goal_A.md
interface_goal_B: prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_02_round39_l_ladder_v2_interface_goal_B.md
interface_goal_C: prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_02_round39_l_ladder_v2_interface_goal_C.md
interface_goal_D: prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_02_round39_l_ladder_v2_interface_goal_D.md
```

## 归档 lineage

```yaml
archive_lineage_policy:
  default: fresh_required
  authorized_archive_variant_work:
    enabled: false
  candidate_relation: fresh
  why_not_archive_variant: >
    候选没有从 archive 布局、接口关系或求解路线局部修改而来。archive 只用于审美校准。
```

## 归档口味校准

```yaml
score_claim_allowed: true
examples:
  - candidate_id: ICE_CAND_0034
    human_aesthetic_score: 4
    use: "4 分锚点：meta 回访扰乱/改写下方结构，而非完全复刻 base。"
  - candidate_id: ICE_CAND_0033
    human_aesthetic_score: 5
    use: "5 分锚点：同一核心冰在回访时产生小误导/小反转。"
  - candidate_id: ICE_CAND_0024
    human_aesthetic_score: 5
    use: "强正锚点：共享空间和要素复用强，base-time lure 有回访 payoff。"
  - candidate_id: ICE_CAND_0035
    human_aesthetic_score: 5
    use: "严格正锚点：旧出口/入口在地图语境中改变意义；不能机械复用同格模板。"
calibration_reading: >
  v2 仍弱于 5 分锚点，因为没有强反转或新机制差；但比 v1 更接近 0034 的 4 分锚点：
  中央 target 不再只是同一顺序中的重复门，而是在 base/meta 中承担 first/last 的
  互补责任。
```

## review routing

```yaml
diagnostic_routing:
  hard_evidence: required_done
  mechanism_scope: required_done
  claim_hygiene: required_done
  scc_graph: triggered_done
  prototype_specific_work: meta_first_design_done
  interface_pair_policy: triggered_done
claim_last_review:
  mode: not_used
```
