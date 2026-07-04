# 候选包：ICE_EXP_META_2026_07_02_round42_dual_cross_return_v2

## 原型上下文

```yaml
prototype: ice_slide_escape
win_condition:
  - 所有 target 格必须被冰占据
  - 玩家必须站在本 solve instance 指定的边缘终点
confirmed_rules:
  - target 是 overlay；移动和滑行时按地面处理
  - "*" 表示 target 上有冰
  - "I" 表示普通地面上的冰
  - d3 为撞墙摧毁冰；d4 撞障碍会让移动冰向后回弹一格
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
  base: ">=2，主张约 3"
  meta: ">=2，主张约 3"
  combined: "至少一条流程 >=3；本包主张两条均可支撑 3"
aesthetic_target: "按稳定 4 送审，不声明 5"
```

## 布局与接口

```text
########################
########################
########################
########################
#######..########..#####
######...I...###.......#
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
  base: [push_ice, ice_destroyed_d3, ice_rebound_d4]
  meta: [push_ice, ice_destroyed_d3, ice_rebound_d4]
required_winning_path_events:
  base: [ice_rebound_d4]
  meta: [ice_rebound_d4]
forbidden_reachable_for_base:
  - ice_pass_through_d5
  - slide_restart_after_group
  - ice_destroy_group_d6_plus
```

base 完整可达扫描未命中 d5 / restart / d6；返回解只使用 d3 与 d4 窗口内机制。

## 设计目标与核心 claim

```yaml
player_insight: >
  同一两枚中心锁位在两个 solve instance 中承担正交职责。A->B 时它们是水平通道门：
  先向右借出，再从右侧向左偿还。C->D 时玩家从旧出口回入，同一两枚锁位改成
  竖向回程门：先向下借出，再从下侧向上偿还。普通冰 [9,5] 在两条流程中作为
  连接段的牺牲物，迫使玩家在两个锁之间支付一次 d3 清理，而不是连续执行两个同构门。
base_causal_chain: >
  A->B 按左到右处理两个锁位。左锁 [6,6] 右推 d4 借出后，玩家必须从上方处理
  连接冰 [9,5]，以 d3 清出中段；随后左推 d4 偿还左锁。穿过中段后再处理右锁
  [16,6]：右推 d4 借出、左推 d4 偿还，最后到达 B。
meta_causal_chain: >
  C->D 从右侧进入后按反向顺序处理同两枚锁位。先处理右锁 [16,6] 的竖向借还：
  下推 d4 借出、上推 d4 偿还；回到中段后，从反向把连接冰 [9,5] 以 d3 摧毁。
  之后再处理左锁 [6,6] 的竖向借还：下推 d4 借出、上推 d4 偿还，最后回到 D/A。
chain_delta_from_base: >
  base 的顺序是 left-lock -> connector sacrifice -> right-lock，方向是 horizontal。
  meta 的顺序是 right-lock -> connector sacrifice -> left-lock，方向是 vertical。
  共享的是同一两处坐标锁位、同一个连接冰，以及同一物理接口；变化的是入口语义、
  轴向读法和锁的先后关系。
why_not_execution_only: >
  若只是两个相似 d4 门，审美会降为 3。本候选的送审点是轴向、顺序和中段状态
  同时改变：两个 target 锁不再只是并列重复，连接冰的 d3 牺牲把第一锁的完成、
  中段穿越和第二锁的进入绑定成一个可读的回访结构。完整图中两条流程各 5 次
  push，其中 4 次 d4 与 1 次 d3；所有胜解均要求 d4，base 还在 SCC 上呈现
  one_win_continuation_per_scc。
```

## 反证条件

```yaml
falsification:
  - base 存在不使用 ice_rebound_d4 的胜解
  - base 可达扫描出现 d5、restart 或 d6
  - meta 存在不使用 ice_rebound_d4 的胜解
  - reviewer 认为 [9,5] 只是噪声，而不是连接两个锁读法的状态转折
  - critic 认为 meta 只是 A->B 的后缀复读，而非同锁位轴向改读
  - critic 认为两个锁位的重复性压过了轴向和中段状态改变，审美只能到 3
  - 出现 [0,6] 与 [23,6] 之外的外部边缘出口
```

## 求解证据摘要

```yaml
solver_result:
  base:
    found: true
    cost: 39
    events: { walk: 34, push_ice: 5, ice_rebound_d4: 4, ice_destroyed_d3: 1 }
    graph: { status: complete, reachable_states: 5111, legal_transitions: 12656, winning_states: 1 }
    agency: { status: complete, compressed_regions: 106, solution_commitments: 5, forced_viable_prefix: "2/5", forced_optimal_prefix: "2/5" }
    scc: { shape: one_win_continuation_per_scc, sccs: 53, win_reachable: 3, forced_win_prefix: "2/2" }
  meta:
    found: true
    cost: 47
    events: { walk: 42, push_ice: 5, ice_rebound_d4: 4, ice_destroyed_d3: 1 }
    graph: { status: complete, reachable_states: 7119, legal_transitions: 17612, winning_states: 2 }
    agency: { status: complete, compressed_regions: 156, solution_commitments: 5, forced_viable_prefix: "1/5", forced_optimal_prefix: "1/5" }
    scc: { shape: branching_win_dag, sccs: 91, win_reachable: 9, forced_win_prefix: "0/1" }
winning_path_event_checks:
  base:
    missing_ice_rebound_d4_winning_path: "not found; complete search; explored=5716"
    forbidden_reachable_hits_for_d5_restart_d6: none
  meta:
    missing_ice_rebound_d4_winning_path: "not found; complete search; explored=7342"
reachable_event_exposure:
  base_forbidden_reachable_hits: none
  meta_forbidden_reachable_hits: none
evidence_limits:
  - 工具证明 required/forbidden 事件和可达图事实；审美仍需 critic 判断
  - objectParticipation 未给出对象身份轨迹，因此同坐标锁位角色变化依赖 keySnapshots 与布局事实
```

## 返回解关键节点

```yaml
base_returned_solution:
  key_events:
    - { step: 8, input: right, role: "水平借出左锁 [6,6]" }
    - { step: 12, input: right, role: "d3 摧毁连接冰 [9,5]" }
    - { step: 15, input: left, role: "水平偿还左锁 [6,6]" }
    - { step: 26, input: right, role: "水平借出右锁 [16,6]" }
    - { step: 33, input: left, role: "水平偿还右锁 [16,6]" }
meta_returned_solution:
  key_events:
    - { step: 9, input: down, role: "竖向借出右锁 [16,6]" }
    - { step: 16, input: up, role: "竖向偿还右锁 [16,6]" }
    - { step: 27, input: left, role: "d3 摧毁连接冰 [9,5]" }
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

## 命令与证据文件

```yaml
commands_run:
  - "npx tsx src/cli.ts explain-layout prototypes/ice_slide_escape ... --id ICE_EXP_META_2026_07_02_round42_dual_cross_return_v2_base --player-start '0,6' --player-goal '23,6' --targets ice_rebound_d4 --max-states 120000 --graph-max-states 120000 --max-depth 180 --write"
  - "npx tsx src/cli.ts explain-layout prototypes/ice_slide_escape ... --id ICE_EXP_META_2026_07_02_round42_dual_cross_return_v2_meta --player-start '23,6' --player-goal '0,6' --targets ice_rebound_d4 --max-states 120000 --graph-max-states 120000 --max-depth 180 --write"
  - "npx tsx src/cli.ts compare-starts-layout prototypes/ice_slide_escape ... --id ICE_EXP_META_2026_07_02_round42_dual_cross_return_v2_base_no_late --player-goal '23,6' --starts '0,6' --required-winning-events ice_rebound_d4 --forbidden-reachable-events ice_pass_through_d5,slide_restart_after_group,ice_destroy_group_d6_plus --write"
  - "npx tsx src/cli.ts compare-starts-layout prototypes/ice_slide_escape ... --id ICE_EXP_META_2026_07_02_round42_dual_cross_return_v2_meta_required --player-goal '0,6' --starts '23,6' --required-winning-events ice_rebound_d4 --write"
  - "npx tsx src/cli.ts compare-starts-layout prototypes/ice_slide_escape ... --id ICE_EXP_META_2026_07_02_round42_dual_cross_return_v2_interface_goal_A --player-goal '0,6' --starts '0,6' '23,6' --write"
  - "npx tsx src/cli.ts compare-starts-layout prototypes/ice_slide_escape ... --id ICE_EXP_META_2026_07_02_round42_dual_cross_return_v2_interface_goal_B --player-goal '23,6' --starts '0,6' '23,6' --write"
layout_file: prototypes/ice_slide_escape/reports/ICE_EXP_META_2026_07_02_round42_dual_cross_return_v2_layout.txt
interface_edges: prototypes/ice_slide_escape/reports/ICE_EXP_META_2026_07_02_round42_dual_cross_return_v2_interface_edges.md
base_analysis: prototypes/ice_slide_escape/reports/layout_analysis_ICE_EXP_META_2026_07_02_round42_dual_cross_return_v2_base.md
meta_analysis: prototypes/ice_slide_escape/reports/layout_analysis_ICE_EXP_META_2026_07_02_round42_dual_cross_return_v2_meta.md
base_no_late: prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_02_round42_dual_cross_return_v2_base_no_late.md
meta_required: prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_02_round42_dual_cross_return_v2_meta_required.md
interface_goal_A: prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_02_round42_dual_cross_return_v2_interface_goal_A.md
interface_goal_B: prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_02_round42_dual_cross_return_v2_interface_goal_B.md
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
    它从本轮 cross-axis 原语发展而来：同一两处锁位在 base/meta 中分别按水平/竖向使用，
    且 v2 加入连接冰 [9,5]，使两个锁之间出现状态牺牲，而不是沿用旧 archive 的主因果链。
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
    use: "负锚点：重复 target-door 串接和 A->D 外溢会致命；本包用同两锁正交改义、连接 d3 状态转折与两 edge 接口避开。"
  - candidate_id: ICE_CAND_0034
    human_aesthetic_score: 4
    use: "4 分锚点：回访扰动或改写同一结构时，紧凑清晰可支撑 4。"
  - candidate_id: ICE_CAND_0035
    human_aesthetic_score: 5
    use: "严格正锚点：旧出口变回访入口要靠角色改变赢得意义；本包借鉴该判准，不声明达到 5。"
calibration_reading: >
  本包比 0015/0037 强，因为它不是重复门串：meta 使用同一两处锁位，但顺序和轴向都改变，
  且连接冰让中段状态发生不可忽略的牺牲转折。它弱于 0035，因为没有更大的外部回访压力或
  更惊喜的单对象身份反转；因此按稳定 4、非 5 送审。
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
