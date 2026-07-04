# 候选包：ICE_EXP_META_2026_07_02_round39_l_ladder_v1

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
aesthetic_target: "保底 4，追求 5；本包按 4+ 送审，不自授 5"
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
A: [0, 3]
B: [9, 14]
C: [7, 0]
D: [19, 12]
base_instance: { start: [0, 3], goal: [9, 14] }
meta_instance: { start: [7, 0], goal: [19, 12] }
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

base 完整可达扫描命中 `ice_boundary_disappear:d4`，因此本包不声明 base
是 through-d4 clean cutoff；它只声明 base 处在 d6 前窗口，且无 d5 / restart /
d6 可达外溢。

## 设计目标与核心 claim

```yaml
player_insight: >
  这是一个 L 形 target-debt 换乘站：左横门、中央竖门、右横门都以已完成的
  target 冰作为门锁。玩家不能把 "*" 读成静态完成物；每条目标流程都要临时借出
  一枚 target 冰、穿过对应门、再从另一侧用 d4 回弹还回 target。
base_causal_chain: >
  A->B 从左侧进入，先处理左横门 [4,4]：右推 d4 借出、绕到右侧、左推 d4 还回。
  然后进入中央竖门 [8,8]：下推 d4 借出、绕到底侧、上推 d4 还回，最后到 B。
meta_causal_chain: >
  C->D 从顶部进入同一个中央竖门 [8,8]，先完成与 base 共享的竖门债务；随后不去
  B，而是转向右横门 [12,11]，通过右推/左推 d4 借出并还回，最后到 D。
chain_delta_from_base: >
  base 是 left-door -> shared-vertical-door -> bottom exit；meta 是
  shared-vertical-door -> right-door -> right exit。两条流程共享中央门的几何
  与债务读法，但入口视角和第二枚 target 的角色不同。
why_not_execution_only: >
  返回解不是单次 witness：两条流程各有 4 个不可逆 d4 commitment，完整图显示
  opening 有死分支/分支但目标流程仍必须经过 d4 债务还原。风险是三扇门都同构；
  审美 claim 只把它提交为 4+ 的清晰换乘结构，不把重复本身包装成 5 分。
```

## 反证条件

```yaml
falsification:
  - 任一 target 初始没有冰
  - 初始纯走路 A->B 或 C->D 可通
  - base 存在不使用 ice_rebound_d4 的胜利路径
  - base 可达扫描出现 d5、restart、d6 或 group 后出界
  - meta 存在不使用 ice_rebound_d4 的胜利路径
  - reviewer 认为本包把返回解的逐对象顺序过度声称为 all-solution per-object necessity
  - critic 认为 A->C / A->D / B->D 内部非目标 pair 抢走目标阅读
  - critic 认为三门同构导致 meta 只是拼接练习，不足以达到 4
```

## 求解证据摘要

```yaml
solver_result:
  base:
    found: true
    cost: 28
    events: { walk: 24, push_ice: 4, ice_rebound_d4: 4 }
    graph: { status: complete, reachable_states: 2526, legal_transitions: 6063, winning_states: 1 }
    agency: { status: complete, compressed_regions: 106, solution_commitments: 4, forced_viable_prefix: "1/4", forced_optimal_prefix: "1/4" }
  meta:
    found: true
    cost: 34
    events: { walk: 30, push_ice: 4, ice_rebound_d4: 4 }
    graph: { status: complete, reachable_states: 979, legal_transitions: 2367, winning_states: 1 }
    agency: { status: complete, compressed_regions: 42, solution_commitments: 4, forced_viable_prefix: "1/4", forced_optimal_prefix: "1/4" }
winning_path_event_checks:
  base:
    missing_ice_rebound_d4_winning_path: "not found; complete search; explored=2525"
    forbidden_reachable_hits_for_d5_restart_d6: none
  meta:
    missing_ice_rebound_d4_winning_path: "not found; complete search; explored=978"
reachable_event_exposure:
  base_complete_scan:
    allowed_seen: [ice_rebound_d4, ice_stop_short:d1, ice_boundary_disappear:d4]
    forbidden_seen: []
evidence_limits:
  - "返回解的三枚 target 坐标序列是 shortest returned solution 事实。"
  - "all-solution gate 只证明 ice_rebound_d4 事件类别必经；没有逐对象 all-solution necessity 证明。"
  - "base 有 boundary_disappear 可达噪音；因此只声明 d6 前窗口，不声明 through-d4 clean cutoff。"
```

## 返回解关键节点

```yaml
base_returned_solution:
  key_events:
    - { step: 5, input: right, role: "借出左横门 target [4,4]" }
    - { step: 12, input: left, role: "还回 [4,4]，玩家留在右侧换乘区" }
    - { step: 17, input: down, role: "借出共享中央竖门 target [8,8]" }
    - { step: 24, input: up, role: "还回 [8,8]，前往 B" }
meta_returned_solution:
  key_events:
    - { step: 9, input: down, role: "从 C 入口借出共享中央竖门 target [8,8]" }
    - { step: 16, input: up, role: "还回 [8,8]，转向右横门" }
    - { step: 22, input: right, role: "借出右横门 target [12,11]" }
    - { step: 29, input: left, role: "还回 [12,11]，前往 D" }
```

## 接口与 pair policy

```yaml
interface_pair_policy:
  declared_interface_points:
    - A: [0, 3]
    - B: [9, 14]
    - C: [7, 0]
    - D: [19, 12]
  target_pairs: [A->B, C->D]
  ignored_pair_classes:
    - C/D->A/B reverse internal pairs
    - self-pairs A->A, B->B, C->C, D->D
  risky_pair_classes:
    - A/B -> C/D internal non-target pairs
    - any edge goal outside [0,3], [9,14], [7,0], [19,12]
pair_diagnostics:
  external_edge_escape_checks:
    - "static edge scan found only [7,0], [0,3], [19,12], [9,14]"
  ignored_pairs:
    - "C->B cost 20; ignored reverse internal pair"
    - "C->A unsolved; D->A unsolved; D->B unsolved"
    - "self-pairs A->A, B->B, C->C, D->D cost 0"
  risky_pairs:
    - "A->C cost 16"
    - "A->D cost 42"
    - "B->D cost 20"
```

## 证据文件

```yaml
layout_file: prototypes/ice_slide_escape/reports/ICE_EXP_META_2026_07_02_round39_l_ladder_v1_layout.txt
base_analysis: prototypes/ice_slide_escape/reports/layout_analysis_ICE_EXP_META_2026_07_02_round39_l_ladder_v1_base.md
meta_analysis: prototypes/ice_slide_escape/reports/layout_analysis_ICE_EXP_META_2026_07_02_round39_l_ladder_v1_meta.md
base_no_d5d6: prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_02_round39_l_ladder_v1_base_no_d5d6.md
base_strict_d4_window_failed_boundary: prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_02_round39_l_ladder_v1_base_required_d4.md
meta_required_d4: prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_02_round39_l_ladder_v1_meta_required_d4.md
interface_static_and_pair_summary: prototypes/ice_slide_escape/reports/ICE_EXP_META_2026_07_02_round39_l_ladder_v1_interface_edges.zh.md
interface_goal_A: prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_02_round39_l_ladder_v1_interface_goal_A.md
interface_goal_B: prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_02_round39_l_ladder_v1_interface_goal_B.md
interface_goal_C: prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_02_round39_l_ladder_v1_interface_goal_C.md
interface_goal_D: prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_02_round39_l_ladder_v1_interface_goal_D.md
```

## 归档 lineage

```yaml
archive_lineage_policy:
  default: fresh_required
  authorized_archive_variant_work:
    enabled: false
  candidate_relation: fresh
  why_not_archive_variant: >
    本候选不是从已有候选的布局、接口关系或求解路线局部修改而来。archive 只用作
    审美校准：学习高分 meta 的抽象要求，即共享结构必须改变角色或入口读法；
    不复用旧候选几何、对象坐标、入口出口关系或主因果链。
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
  本候选弱于 0024/0033/0035 的 5 分反转，因为三扇门同构且没有新机制差；它更接近
  0034 的 4 分锚点，但通过共享中央门与四侧接口，让 base/meta 都是完整 4-commitment
  流程，目标是 4+ 而非自授 5。
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
