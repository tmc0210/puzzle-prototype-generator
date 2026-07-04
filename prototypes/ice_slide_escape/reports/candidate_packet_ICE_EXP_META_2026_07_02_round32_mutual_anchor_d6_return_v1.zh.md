# 候选包：ICE_EXP_META_2026_07_02_round32_mutual_anchor_d6_return_v1

## 原型上下文

```yaml
prototype: ice_slide_escape
win_condition:
  - 所有 target 格必须被冰占据
  - 玩家必须站在本 solve instance 指定的边缘终点
confirmed_rules:
  - target 是 overlay；移动和滑行时按地面处理
  - `*` 表示 target 上有冰
  - `docs/rules.md` 允许 target 外存在额外冰
  - d4 撞障碍会让移动冰向后回弹一格
  - d6+ 撞障碍会摧毁完整连续障碍组
tool_boundary:
  - A->B 与 C->D 是两次重置后的独立求解实例
  - 不声明 any-edge win
  - A=D 或 B=C 导致的自环零步 pair 只作接口事实，不参与质量评分
```

## 本轮 brief 对齐

```yaml
intended_role: meta_first_design candidate
fresh_requirement: true
special_requirements:
  - 每个 target 初始都有冰
  - 初始 target 冰封住玩家起点到终点的走廊
  - base 可选择任意知识阶段；但 base 可达的最新已列知识必须在所有胜解中必经
  - meta 可使用全部知识
  - base/meta 难度都应 >= 3，且至少一个 >= 4
  - 审美最低 4，结构允许时追求 5
```

## 布局与接口

```text
###############.##
###############.##
#...###########.##
..#.*....*....*.##
####I....I....####
##################
##################
##################
```

```yaml
A: [0, 3]
B: [15, 0]
C: [15, 0]
D: [0, 3]
base_instance: { start: [0, 3], goal: [15, 0] }
meta_instance: { start: [15, 0], goal: [0, 3] }
targets_initially_with_ice:
  - [4, 3]
  - [9, 3]
  - [14, 3]
extra_off_target_ice:
  - [4, 4]
  - [9, 4]
edge_floor_cells:
  - [15, 0]
  - [0, 3]
```

本候选满足“每个 target 初始都有冰”。它不声称“所有冰都在 target 上”：两个额外冰块是规则允许的支撑/补料材料，用于 target 债务偿还后的 d6 开路。

## 机制暴露

```yaml
mechanic_exposure_sequence_ref: prototypes/ice_slide_escape/docs/mechanic_exposure_sequence.yml
base_allowed_exposure_through: ice_destroy_group_d6_plus
meta_allowed_exposure_through: ice_destroy_group_d6_plus
claimed_core_events:
  base: [push_ice, ice_rebound_d4, ice_destroy_group_d6_plus]
  meta: [push_ice, ice_rebound_d4, ice_destroy_group_d6_plus]
required_winning_path_events:
  base: [ice_rebound_d4, ice_destroy_group_d6_plus]
  meta: [ice_rebound_d4, ice_destroy_group_d6_plus]
forbidden_winning_path_events: []
forbidden_if_seen_anywhere: []
```

这个候选不 claiming pre-d5。base 允许到 d6；`ice_destroy_group_d6_plus` 是 exposure sequence 中列出的最新分支，且完整搜索显示 base 每条胜解都必须使用 d6。

## 设计目标与核心 claim

```yaml
aesthetic_score_target: "稳定 4；只有 critic 接受 compact mutual-anchor return 为高阶重解释时才 claim 5"
difficulty_score_target:
  base: ">=3，设计者自评 4-"
  meta: ">=4"
player_insight: >
  初始状态看似 target 已全部满足，但这个已满足状态同时封住通路。玩家必须临时制造 target 债，
  让被借出的冰成为后续 stopper / 偿还工具，恢复 target 覆盖后再用支撑冰做 d6 开路。
base_causal_chain: >
  A->B 先借出 [4,3]，再借出 [9,3]；第一块借出的冰参与第二块 target 的偿还几何。
  [9,3] 还回后，移动第 4 行支撑冰，再还回 [4,3]，最后 d6 摧毁支撑组打开去 B 的路。
meta_causal_chain: >
  C->D 反转锚点顺序：从右侧先借出 [14,3]，再借出 [9,3]，随后还回 [9,3]，
  以相反方向处理第 4 行支撑材料，还回 [14,3]，最后用 d6 打开返回 D 的路。
why_not_execution_only: >
  这不是两个互不相关的小门。两条路径都必须先背负嵌套 target 债，再让支撑材料变得有用；
  d6 开路只有在 target 行恢复后才是有效胜利状态。base/meta 共用三枚 target 锚点，
  但借出和偿还顺序反向。
```

## 反证条件

```yaml
falsification:
  - 任一 target 初始没有冰
  - 初始 target 冰无法静态封住 A<->B 走廊
  - [0,3] 与 [15,0] 之外存在外部边缘出口
  - base 存在不使用 ice_rebound_d4 的胜解
  - base 存在不使用 ice_destroy_group_d6_plus 的胜解
  - meta 存在不使用 ice_rebound_d4 的胜解
  - meta 存在不使用 ice_destroy_group_d6_plus 的胜解
  - critic 认为 extra off-target ice 削弱了“target 已解状态即锁”的核心读法
  - critic 认为 A=D / B=C 只是接口记号，不构成 meaningful return reinterpretation
```

## 求解证据摘要

```yaml
solver_result:
  base:
    found: true
    cost: 44
    events: { walk: 38, push_ice: 6, ice_blocks_ice_no_chain_push: 4, ice_rebound_d4: 5, "ice_destroy_group_d6_plus:len4": 1, ice_boundary_disappear_after_group: 1 }
    graph: { status: complete, reachable_states: 10315, legal_transitions: 26846, winning_states: 1 }
    agency: { status: complete, compressed_regions: 424, solution_commitments: 6, forced_viable_prefix: "2/6", forced_optimal_prefix: "2/6" }
  meta:
    found: true
    cost: 42
    events: { walk: 36, push_ice: 6, ice_blocks_ice_no_chain_push: 4, ice_rebound_d4: 5, "ice_destroy_group_d6_plus:len5": 1, ice_boundary_disappear_after_group: 1 }
    graph: { status: complete, reachable_states: 10296, legal_transitions: 26851, winning_states: 1 }
    agency: { status: complete, compressed_regions: 429, solution_commitments: 6, forced_viable_prefix: "2/6", forced_optimal_prefix: "2/6" }
winning_path_event_checks:
  base:
    missing_d4_winning_path: "not found; complete search; explored=10314"
    missing_d6_winning_path: "not found; complete search; explored=10498"
    missing_d4_or_d6_winning_path: "not found; complete search; explored=10498"
  meta:
    missing_d4_winning_path: "not found; complete search; explored=10295"
    missing_d6_winning_path: "not found; complete search; explored=10479"
    missing_d4_or_d6_winning_path: "not found; complete search; explored=10479"
```

## 静态封锁与接口证据

```yaml
edge_floor_cells: [[15, 0], [0, 3]]
initial_pure_walk_A_to_B: { found: false, visited: 6 }
initial_pure_walk_B_to_A: { found: false, visited: 4 }
remove_extra_ice_only_A_to_B: { found: false, visited: 6 }
remove_extra_ice_only_B_to_A: { found: false, visited: 4 }
remove_target_ice_only_A_to_B: { found: true, length: 20 }
remove_target_ice_only_B_to_A: { found: true, length: 20 }
interface_goal_B:
  A_to_B: { found: true, cost: 44 }
  B_to_B: { found: true, cost: 0, verdict_effect: none }
interface_goal_A:
  A_to_A: { found: true, cost: 0, verdict_effect: none }
  B_to_A: { found: true, cost: 42 }
```

解释：只移除额外冰仍无纯走路通路；移除 target 冰会打开 20 步走廊。因此封锁责任确实由 `[4,3]`、`[9,3]`、`[14,3]` 三个 target 冰承担。

## 返回解关键节点

```yaml
base_returned_solution:
  inputs: "right up right right down right right down right right right up right right down right right right up left down left left left left up left left left down right right right right right right right right right right up up up up"
  key_events:
    - { step: 6, input: right, role: "借出 target [4,3]，制造第一笔 target 债" }
    - { step: 13, input: right, role: "借出 target [9,3]，制造第二笔 target 债" }
    - { step: 20, input: left, role: "用已停放的冰几何偿还 [9,3]" }
    - { step: 24, input: left, role: "移动第 4 行支撑冰" }
    - { step: 27, input: left, role: "偿还 [4,3]" }
    - { step: 31, input: right, role: "d6 摧毁 len4 支撑组，target 行已恢复后打开 B 路线" }
meta_returned_solution:
  inputs: "down down down left left down left left left up left left down left left left up right down right right right right up right right right down left left left left left left left left left left left left up left"
  key_events:
    - { step: 4, input: left, role: "从右侧借出 target [14,3]" }
    - { step: 11, input: left, role: "以反向锚点顺序借出 [9,3]" }
    - { step: 18, input: right, role: "偿还 [9,3]" }
    - { step: 22, input: right, role: "移动第 4 行支撑材料" }
    - { step: 25, input: right, role: "偿还 [14,3]" }
    - { step: 29, input: left, role: "d6 摧毁 len5 支撑组，打开回 D 路线" }
```

## 证据文件

```yaml
layout_file: prototypes/ice_slide_escape/reports/ICE_EXP_META_2026_07_02_round32_mutual_anchor_d6_return_v1_layout.txt
base_analysis: prototypes/ice_slide_escape/reports/layout_analysis_ICE_EXP_META_2026_07_02_round32_mutual_anchor_d6_return_v1_base.md
meta_analysis: prototypes/ice_slide_escape/reports/layout_analysis_ICE_EXP_META_2026_07_02_round32_mutual_anchor_d6_return_v1_meta.md
base_required_latest: prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_02_round32_mutual_anchor_d6_return_v1_base_required_latest.md
meta_required_latest: prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_02_round32_mutual_anchor_d6_return_v1_meta_required_latest.md
base_required_d4: prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_02_round32_mutual_anchor_d6_return_v1_base_required_d4.md
base_required_d6: prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_02_round32_mutual_anchor_d6_return_v1_base_required_d6.md
meta_required_d4: prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_02_round32_mutual_anchor_d6_return_v1_meta_required_d4.md
meta_required_d6: prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_02_round32_mutual_anchor_d6_return_v1_meta_required_d6.md
interface_goal_B: prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_02_round32_mutual_anchor_d6_return_v1_interface_goal_B.md
interface_goal_A: prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_02_round32_mutual_anchor_d6_return_v1_interface_goal_A.md
interface_static_seal: prototypes/ice_slide_escape/reports/ICE_EXP_META_2026_07_02_round32_mutual_anchor_d6_return_v1_interface_edges.zh.md
```

## 原型接口合同

```yaml
interface_pair_policy:
  declared_interface_points:
    - A: [0, 3]
    - B: [15, 0]
    - C: [15, 0]
    - D: [0, 3]
  target_pairs: [A->B, C->D]
  ignored_pair_classes:
    - A->A self-pair from A=D overlap
    - B->B self-pair from B=C overlap
    - C/D reverse/internal pairs not listed as target pairs
  risky_pair_classes:
    - any edge goal outside [0,3] or [15,0]
pair_diagnostics:
  external_edge_escape_checks:
    - "static edge scan found only [0,3] and [15,0]"
  ignored_pairs:
    - "[0,3]->[0,3] cost 0"
    - "[15,0]->[15,0] cost 0"
  risky_pairs: []
```

## 归档 lineage

```yaml
default: fresh_required
authorized_archive_variant_work:
  enabled: false
candidate_relation: fresh
why_not_archive_variant: >
  这是新鲜的三 target 紧凑走廊和第 4 行 d6 支撑结构。它没有继承 round29 的空间骨架、
  下层回程门或五 target all-on-target 约束；旧评审只作为失败模式校准。
```

## 归档口味校准

```yaml
score_claim_allowed: true
examples:
  - { candidate_id: ICE_CAND_0015, human_aesthetic_score: 1, use: "负锚点：局部门执行不够" }
  - { candidate_id: ICE_CAND_0020, human_aesthetic_score: 2, use: "负锚点：功能性 return connection 不够" }
  - { candidate_id: ICE_CAND_0022, human_aesthetic_score: 3, use: "中档锚点：meta chain 成立仍可能缺高阶重解释" }
  - { candidate_id: ICE_CAND_0034, human_aesthetic_score: 4, use: "正锚点：回访可见结构且有玩家侧 return pressure 可到 4" }
  - { candidate_id: ICE_CAND_0035, human_aesthetic_score: 5, use: "严格正锚点：同接口 return 必须靠角色变化赢得意义" }
```

## 尝试记录

```yaml
serious_structural_attempts:
  - "round29 被独立 critic 因 return pressure 弱和局部门重复而拒绝"
  - "round30/round31 搜索没有得到 qualified revision"
  - "round32 改为三 target mutual-anchor 走廊，并让 d6 成为 base 最新必经知识"
local_repairs:
  - "保留 A=D、B=C，但从宽路线 gate 改为紧凑共享 target 走廊"
  - "接受规则允许的 extra support ice，不再强行要求每块冰都在 target 上"
abandoned_families:
  - "round29 five-target return-gate family"
  - "本 brief 下的纯 pre-d5 family；当前最强证据使用 d6 作为 latest required knowledge"
claim_last_review:
  mode: not_used
```
