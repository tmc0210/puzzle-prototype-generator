# 候选包：ICE_EXP_META_2026_07_02_round38_triple_target_reentry_v1

## 原型上下文

```yaml
prototype: ice_slide_escape
win_condition:
  - 所有 target 格必须被冰占据
  - 玩家必须站在本 solve instance 指定的边缘终点
confirmed_rules:
  - target 是 overlay；移动和滑行时按地面处理
  - "*" 表示 target 上有冰
  - d3 会摧毁移动冰
  - d4 撞障碍会让移动冰向后回弹一格
tool_boundary:
  - A->B 与 C->D 是两次重置后的独立求解实例
  - 不声明 any-edge win
  - B 与 D 同格导致的 B->B 零步 pair 只作接口事实，不参与质量评分
```

## 本轮 brief 对齐

```yaml
intended_role: meta_first_design_candidate
fresh_requirement: true
base_allowed_exposure_through: rebound_d4
base_brief_floor: d6_before_or_earlier
meta_allowed_exposure_through: all_known
difficulty_target:
  base: ">=2，目标 3+"
  meta: ">=2，目标 2+ / borderline 3"
  combined: "至少一条流程 >=3"
aesthetic_target: "稳定 4；不声明 5"
```

## 布局与接口

```text
###########.###############
###########.###############
###########.###############
....###......##......######
###.*....##.*....##.*....##
####.....###.#.....###.....
###########################
```

```yaml
A: [0, 3]
B: [26, 5]
C: [11, 0]
D: [26, 5]
base_instance: { start: [0, 3], goal: [26, 5] }
meta_instance: { start: [11, 0], goal: [26, 5] }
target_ice_cells:
  - [4, 4]
  - [12, 4]
  - [20, 4]
extra_off_target_ice_count: 0
edge_floor_cells:
  - [11, 0]
  - [0, 3]
  - [26, 5]
```

## 机制暴露

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
forbidden_if_seen_anywhere_for_base:
  - ice_boundary_disappear
  - ice_pass_through_d5
  - slide_restart_after_group
  - ice_destroy_group_d6_plus
  - ice_boundary_disappear_after_group
```

base 完整可达扫描里出现 `ice_stop_short:d1`、`ice_stop_short:d2`、`ice_destroyed_d3`，这些均早于 d4 或在 d4 前窗口内；未出现本包列出的后续 forbidden reachable events。

## 设计目标与核心 claim

```yaml
player_insight: >
  初始画面看似三枚 target 都已经完成，但这三枚 target 冰同时把 A/C 到右侧出口的通路封住。
  因为所有冰都在 target 上，任何胜解中的有效推冰都会临时制造 target 债；
  玩家侧读法是把“已完成目标”当成锁，借出 target 冰后再恢复最终覆盖。
base_causal_chain: >
  返回的最短 A->B 解展示三段 target 债务：[4,4]、[12,4]、[20,4]。
  每段在返回解里都先右推触发 d4 回弹形成临时通路，再从右侧左推回 target。
  本包没有声称逐对象顺序或三枚 target 全部处理是所有胜解的 per-object 必然性。
meta_causal_chain: >
  返回的最短 C->D 解从顶部重入到第一段之后，展示后两段 target 债务：[12,4] 与 [20,4]。
  它的 meta 价值是 reentry reread：从 C 入口看，同一条 debt corridor 的后缀仍要求
  玩家把已完成 target 读成通路锁，再通过 d4 借出/偿还进入右侧出口。
why_not_execution_only: >
  本候选的风险正是“是否只是三扇相似门”。设计 claim 不是把重复本身当作高分，
  而是把全 target 初始已解状态与通路封锁之间的矛盾作为核心审美。返回解展示 base 的
  三段 debt 与 meta 的两段新入口复读；若 critic 认为后缀重入不构成足够 meta 重解释，
  应把审美降到 3 或要求结构修改。
```

## 反证条件

```yaml
falsification:
  - 任一初始冰不在 target 上
  - 存在未声明外部边缘出口
  - 初始纯走路 A->B 或 C->D 可通
  - base 存在不使用 ice_rebound_d4 的胜解
  - base 可达扫描出现 boundary_disappear、d5、restart 或 d6+
  - meta 存在不使用 ice_rebound_d4 的胜解
  - evidence reviewer 认为本包仍把返回解逐对象顺序 overclaim 为所有胜解必然性
  - critic 认为 C->D 只是 A->B 的后缀练习，缺少 meta-first 的重读价值
  - critic 认为三枚 target 门的相似性压过了 all-target-debt 审美
```

## 求解证据摘要

```yaml
solver_result:
  base:
    found: true
    cost: 44
    events: { walk: 38, push_ice: 6, ice_rebound_d4: 6 }
    graph: { status: complete, reachable_states: 25016, legal_transitions: 59155, winning_states: 1 }
    agency: { status: complete, compressed_regions: 741, solution_commitments: 6, forced_viable_prefix: "1/6", forced_optimal_prefix: "1/6" }
  meta:
    found: true
    cost: 30
    events: { walk: 26, push_ice: 4, ice_rebound_d4: 4 }
    graph: { status: complete, reachable_states: 4763, legal_transitions: 11465, winning_states: 1 }
    agency: { status: complete, compressed_regions: 140, solution_commitments: 4, forced_viable_prefix: "1/4", forced_optimal_prefix: "1/4" }
winning_path_event_checks:
  base:
    missing_ice_rebound_d4_winning_path: "not found; complete search; explored=25015"
    forbidden_reachable_hits: none
  meta:
    missing_ice_rebound_d4_winning_path: "not found; complete search; explored=4762"
reachable_event_exposure:
  base_complete_scan:
    allowed_seen: [ice_rebound_d4, ice_stop_short:d1, ice_stop_short:d2, ice_destroyed_d3]
    forbidden_seen: []
evidence_limits:
  - "返回解的 target 坐标序列是 shortest returned solution 事实，不是逐对象 all-solution necessity 证明。"
  - "现有 all-solution gate 只证明 ice_rebound_d4 必经，以及 base 后续机制 forbidden reachable 未出现。"
```

## 静态封锁与接口证据

```yaml
edge_floor_cells: [[11, 0], [0, 3], [26, 5]]
external_edge_floor_cells_outside_declared_interfaces: []
static_A_to_B_with_ice_blockers: { found: false, visited: 5 }
static_C_to_B_with_ice_blockers: { found: false, visited: 19 }
static_A_to_C_with_ice_blockers: { found: false, visited: 5 }
interface_goal_B_or_D:
  A_to_B: { found: true, cost: 44 }
  C_to_D: { found: true, cost: 30 }
  B_to_B: { found: true, cost: 0, verdict_effect: none }
interface_goal_C:
  A_to_C: { found: true, cost: 20, verdict_effect: risk_internal_non_target_pair }
  C_to_C: { found: true, cost: 0, verdict_effect: none }
  B_to_C: { found: false }
```

## 返回解关键节点

```yaml
base_returned_solution:
  key_events:
    - { step: 5, input: right, role: "借出 target [4,4]，d4 回弹到 [7,4]" }
    - { step: 12, input: left, role: "偿还 [4,4]，玩家留在第一门右侧" }
    - { step: 19, input: right, role: "借出 target [12,4]，打开中段" }
    - { step: 26, input: left, role: "偿还 [12,4]，接入第三段" }
    - { step: 33, input: right, role: "借出 target [20,4]" }
    - { step: 40, input: left, role: "偿还 [20,4] 后前往 B" }
meta_returned_solution:
  key_events:
    - { step: 5, input: right, role: "从 C 重入后借出 target [12,4]" }
    - { step: 12, input: left, role: "偿还 [12,4]，进入末段" }
    - { step: 19, input: right, role: "借出 target [20,4]" }
    - { step: 26, input: left, role: "偿还 [20,4] 后前往 D/B" }
```

## 证据文件

```yaml
layout_file: prototypes/ice_slide_escape/reports/ICE_EXP_META_2026_07_02_round38_triple_target_reentry_v1_layout.txt
base_analysis: prototypes/ice_slide_escape/reports/layout_analysis_ICE_EXP_META_2026_07_02_round38_triple_target_reentry_v1_base.md
meta_analysis: prototypes/ice_slide_escape/reports/layout_analysis_ICE_EXP_META_2026_07_02_round38_triple_target_reentry_v1_meta.md
base_required_latest: prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_02_round38_triple_target_reentry_v1_base_required_latest.md
meta_required_d4: prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_02_round38_triple_target_reentry_v1_meta_required_d4.md
interface_goal_B: prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_02_round38_triple_target_reentry_v1_interface_goal_B.md
interface_goal_C: prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_02_round38_triple_target_reentry_v1_interface_goal_C.md
interface_static_seal: prototypes/ice_slide_escape/reports/ICE_EXP_META_2026_07_02_round38_triple_target_reentry_v1_interface_edges.zh.md
```

## 原型接口合同

```yaml
interface_pair_policy:
  declared_interface_points:
    - A: [0, 3]
    - B: [26, 5]
    - C: [11, 0]
    - D: [26, 5]
  target_pairs: [A->B, C->D]
  ignored_pair_classes:
    - B->B / D->D same-cell self-pair
    - C->C self-pair
  risky_pair_classes:
    - A->C is a declared-interface internal non-target pair; disclose as caveat
    - any edge goal outside [11,0], [0,3], [26,5]
pair_diagnostics:
  external_edge_escape_checks:
    - "static edge scan found only [11,0], [0,3], [26,5]"
  ignored_pairs:
    - "[26,5]->[26,5] cost 0"
    - "[11,0]->[11,0] cost 0"
  risky_pairs:
    - "[0,3]->[11,0] cost 20; internal non-target pair"
```

## 归档 lineage

```yaml
default: fresh_required
authorized_archive_variant_work:
  enabled: false
candidate_relation: fresh
why_not_archive_variant: >
  本候选没有继承旧候选的布局骨架、因果链或接口关系。旧 archive 只用于分数口味校准：
  round37 是本轮被替换的草稿，不作为提交候选。
```

## 归档口味校准

```yaml
score_claim_allowed: true
examples:
  - { candidate_id: ICE_CAND_0006, human_aesthetic_score: 3, use: "中档锚点：结构成立但不足以当高审美 capstone" }
  - { candidate_id: ICE_CAND_0034, human_aesthetic_score: 4, use: "正锚点：紧凑可见结构与 meta 干扰能支撑 4" }
  - { candidate_id: ICE_CAND_0024, human_aesthetic_score: 5, use: "强正锚点：共享空间/元素复用比单纯门串更强" }
  - { candidate_id: ICE_CAND_0035, human_aesthetic_score: 5, use: "严格正锚点：旧出口变回程入口需要明显角色变化" }
```

## claim-last review

```yaml
claim_last_review:
  mode: not_used
```
