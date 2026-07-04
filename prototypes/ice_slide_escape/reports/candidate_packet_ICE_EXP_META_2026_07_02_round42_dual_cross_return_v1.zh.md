# 候选包：ICE_EXP_META_2026_07_02_round42_dual_cross_return_v1

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
  - A->B 与 C->D 是两次重置后的独立求解实例
  - 不声明 any-edge win
  - A=D / B=C 造成的零步 self-pair 只作接口事实，不参与质量评分
```

## 本轮 brief 对齐

```yaml
intended_role: meta_first_design_candidate
fresh_requirement: true
base_allowed_exposure_through: ice_rebound_d4
base_d6_before_or_earlier: true
meta_allowed_exposure_through: all_known
difficulty_target:
  base: ">=2，目标 3"
  meta: ">=2，目标 3"
  combined: "至少一条流程 >=3；本包主张两条均约 3"
aesthetic_target: "按 4 送审，不声明 5"
```

## 布局与接口

```text
########################
########################
########################
########################
#######..########..#####
######.......###.......#
....#.*....#..#.*....#..
###....######....#######
#####..########..#######
#####..########..#######
#####..########..#######
#####.#########.########
#####..########..#######
########################
```

```yaml
A: [0, 6]
B: [23, 6]
C: [23, 6]
D: [0, 6]
base_instance: { start: [0, 6], goal: [23, 6] }
meta_instance: { start: [23, 6], goal: [0, 6] }
edge_floor_cells:
  - [0, 6]
  - [23, 6]
```

## 机制暴露与范围

```yaml
mechanic_exposure_sequence_ref: prototypes/ice_slide_escape/docs/mechanic_exposure_sequence.yml
base_allowed_exposure_through: ice_rebound_d4
meta_allowed_exposure_through: all_known
claimed_core_events:
  base: [push_ice, ice_rebound_d4]
  meta: [push_ice, ice_rebound_d4]
required_winning_path_events:
  base: [ice_rebound_d4]
  meta: [ice_rebound_d4]
forbidden_reachable_for_base:
  - ice_pass_through_d5
  - slide_restart_after_group
  - ice_destroy_group_d6_plus
```

base 完整可达扫描未命中 d5 / restart / d6。返回解与可达事件只显示 d4 及更早的
短停噪声。

## 设计目标与核心 claim

```yaml
player_insight: >
  同一两枚中心锁位在两个 solve instance 中承担正交职责。A->B 时它们是水平通道门：
  先向右借出，再从右侧向左偿还。C->D 时玩家从旧出口回入，同一两枚锁位改成竖向
  回程门：先向下借出，再从下侧向上偿还。meta 的读法不是复制一条后缀路线，而是
  把 base 中的水平门改读成竖向回程结构。
base_causal_chain: >
  A->B 按左到右处理两个锁位：[6,6] 右推 d4 借出、左推 d4 偿还；随后 [16,6]
  以同样的水平门语法处理，最后到达 B。
meta_causal_chain: >
  C->D 从右侧进入后按反向顺序处理同两枚锁位：[16,6] 下推 d4 借出、上推 d4
  偿还；随后 [6,6] 也以竖向门语法处理，最后回到 D/A。
chain_delta_from_base: >
  base 的顺序是 left-lock -> right-lock，方向是 horizontal。meta 的顺序是
  right-lock -> left-lock，方向是 vertical。共享的不是抽象 d4 语法，而是同一两处
  坐标锁位与同一物理接口；这正是本包的 meta-first 审美核心。
why_not_execution_only: >
  若只是两个相似 d4 门，审美会降为 3。本候选的送审点是轴向和入口语义同时改变：
  base 从左进入时，侧袋只服务于水平偿还；meta 从右进入时，玩家必须发现同一锁位
  的下方绕行位，完成竖向借还后才能继续回程。完整图中两条流程各 4 次 d4 push，
  均只有 1 个 winning state，且 d4 在所有胜解中必经。
```

## 反证条件

```yaml
falsification:
  - base 存在不使用 ice_rebound_d4 的胜解
  - base 可达扫描出现 d5、restart 或 d6
  - meta 存在不使用 ice_rebound_d4 的胜解
  - reviewer 认为 meta 只是 A->B 的后缀复读，而非同锁位轴向改读
  - critic 认为两个锁位的重复性压过了轴向改义，审美只能到 3
  - 出现 [0,6] 与 [23,6] 之外的外部边缘出口
```

## 求解证据摘要

```yaml
solver_result:
  base:
    found: true
    cost: 39
    events: { walk: 35, push_ice: 4, ice_rebound_d4: 4 }
    graph: { status: complete, reachable_states: 3038, legal_transitions: 7546, winning_states: 1 }
    agency: { status: complete, compressed_regions: 63, solution_commitments: 4, forced_viable_prefix: "1/4", forced_optimal_prefix: "1/4" }
  meta:
    found: true
    cost: 47
    events: { walk: 43, push_ice: 4, ice_rebound_d4: 4 }
    graph: { status: complete, reachable_states: 3038, legal_transitions: 7546, winning_states: 1 }
    agency: { status: complete, compressed_regions: 63, solution_commitments: 4, forced_viable_prefix: "1/4", forced_optimal_prefix: "1/4" }
winning_path_event_checks:
  base:
    missing_ice_rebound_d4_winning_path: "not found; complete search; explored=3164"
    forbidden_reachable_hits_for_d5_restart_d6: none
  meta:
    missing_ice_rebound_d4_winning_path: "not found; complete search; explored=3158"
```

## 返回解关键节点

```yaml
base_returned_solution:
  key_events:
    - { step: 8, input: right, role: "水平借出左锁 [6,6]" }
    - { step: 15, input: left, role: "水平偿还左锁 [6,6]" }
    - { step: 26, input: right, role: "水平借出右锁 [16,6]" }
    - { step: 33, input: left, role: "水平偿还右锁 [16,6]" }
meta_returned_solution:
  key_events:
    - { step: 9, input: down, role: "竖向借出右锁 [16,6]" }
    - { step: 16, input: up, role: "竖向偿还右锁 [16,6]" }
    - { step: 31, input: down, role: "竖向借出左锁 [6,6]" }
    - { step: 38, input: up, role: "竖向偿还左锁 [6,6]" }
```

## 接口与 pair policy

```yaml
interface_pair_policy:
  declared_interface_points:
    - A: [0, 6]
    - B: [23, 6]
    - C: [23, 6]
    - D: [0, 6]
  target_pairs: [A->B, C->D]
  ignored_pair_classes:
    - A->D same-cell self-pair
    - C->B same-cell self-pair
  risky_pair_classes:
    - any edge goal outside [0,6] or [23,6]
pair_diagnostics:
  external_edge_escape_checks:
    - "static edge scan found only [0,6] and [23,6]"
  target_pairs:
    - "A->B cost 39"
    - "C->D cost 47"
  self_pairs:
    - "[0,6]->[0,6] cost 0"
    - "[23,6]->[23,6] cost 0"
  risky_pairs: []
```

## 证据文件

```yaml
layout_file: prototypes/ice_slide_escape/reports/ICE_EXP_META_2026_07_02_round42_dual_cross_return_v1_layout.txt
base_analysis: prototypes/ice_slide_escape/reports/layout_analysis_ICE_EXP_META_2026_07_02_round42_dual_cross_return_v1_base.md
meta_analysis: prototypes/ice_slide_escape/reports/layout_analysis_ICE_EXP_META_2026_07_02_round42_dual_cross_return_v1_meta.md
base_no_late: prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_02_round42_dual_cross_return_v1_base_no_late.md
meta_required: prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_02_round42_dual_cross_return_v1_meta_required.md
interface_goal_A: prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_02_round42_dual_cross_return_v1_interface_goal_A.md
interface_goal_B: prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_02_round42_dual_cross_return_v1_interface_goal_B.md
```

## 归档 lineage

```yaml
archive_lineage_policy:
  default: fresh_required
  authorized_archive_variant_work:
    enabled: false
  candidate_relation: fresh
  why_not_archive_variant: >
    本候选不是 round38/round39 的后缀门串，也不是 round29 的上下 lane return gate。
    它从本轮手工 cross-axis 原语发展而来：同一两处锁位在 base/meta 中分别按水平/竖向使用。
    archive 只用于口味校准。
```

## 归档口味校准

```yaml
score_claim_allowed: true
examples:
  - candidate_id: ICE_CAND_0015
    human_aesthetic_score: 1
    use: "负锚点：若只是局部门执行，不能给高审美。"
  - candidate_id: ICE_CAND_0037
    human_aesthetic_score: 1
    use: "负锚点：重复 target-door 串接和 A->D 外溢会致命；本包用同两锁正交改义与两 edge 接口避开。"
  - candidate_id: ICE_CAND_0034
    human_aesthetic_score: 4
    use: "4 分锚点：回访扰动或改写同一结构时，紧凑清晰可支撑 4。"
  - candidate_id: ICE_CAND_0035
    human_aesthetic_score: 5
    use: "严格正锚点：旧出口变回访入口要靠角色改变赢得意义；本包借鉴该判准，不声明达到 5。"
calibration_reading: >
  本包比 0015/0037 强，因为不是重复门串：meta 使用同一两处锁位，但顺序和轴向都改变。
  它弱于 0035，因为没有更大的外部回访压力或更惊喜的单对象身份反转；因此按稳定 4、
  非 5 送审。
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
