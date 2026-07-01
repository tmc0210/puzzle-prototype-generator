# Experiment: ICE_EXP_META_2026_07_02_round22_same_cell_return

```yaml
experiment_id: ICE_EXP_META_2026_07_02_round22_same_cell_return_accepted
prototype: ice_slide_escape
terminal_state: accepted
candidate_id: ICE_CAND_0035
original_human_accepted_layout_version: ICE_EXP_META_2026_07_02_round22_v1
current_layout_version: ICE_EXP_META_2026_07_02_round22_v3_soft_d5d6_cap
not_adopted_strict_patch: ICE_EXP_META_2026_07_02_round22_v2_patch
post_acceptance_patch_status: human_accepted_soft_patch
review_integrity: human_review
archive_eligibility: clean_archive
human_final_status: accepted
required_action: none
```

## 目标

本轮目标是 meta-first 设计并提交合格候选：base 流程知识阶段不限但需明确；
meta 默认全知识；base/meta 至少一条难度 >=3，且都不低于 2；整体审美 4 保底，
追求 5。

最终采用 `ICE_EXP_META_2026_07_02_round22_v1` 的 B=C 单关回读设计。v1 先由独立 evidence reviewer 与
puzzle critic 通过为 `proposal_ready_with_caveats`，随后由人类设计师接受为
审美 5 的特殊正例。之后发现 v1 存在 A 起点 base 可达 d5/d6 外溢；
当前保留 `ICE_EXP_META_2026_07_02_round22_v3_soft_d5d6_cap` 作为人类接受的
温和补丁版本。`ICE_EXP_META_2026_07_02_round22_v2_patch` 是未采用的 strict
补丁：机器更干净，但更线性。

## 候选

```text
###########
#....#....#
#.#..#....#
#.G..I.####
#I..I....##
#.#####.###
```

Interfaces:

```yaml
A: [1, 5]
B: [7, 5]
C: [7, 5]
D: [10, 4]
base_instance: A -> B
meta_instance: C -> D
```

## 设计结论

```yaml
terminal_claim: >
  accepted. 这是一个带 meta 要素的单关设计，而不是标准两段式 meta-first
  模板。B/C 同格让首访出口在外部地图 return pressure 下变成回访入口；
  刷新后的同一关被自然重读，旧出口、target、左下冰组和可破墙 D 组合成
  一关两用。
human_score:
  aesthetic_score: 5
  aesthetic_label: 标杆范例
  difficulty_score: 4
  difficulty_label: 阶段挑战
  difficulty_detail: >
    局部 base A->B 约 2+；显式知道 C->D 目标时 meta 机制约 3；
    带下方死路或等价 return pressure 的整体单关体验约 4。
reuse_boundary:
  abstract_positive_reference: true
  do_not_template_geometry: true
  not_reusable_as:
    - B=C same-cell template
    - dead-end-return template
    - D-wall template
```

## 证据摘要

```yaml
base:
  instance: A->B
  result: solved
  cost: 12
  pushes: 4
  returned_events:
    - ice_destroyed_d3
    - ice_rebound_d4
    - ice_stop_short:d1
  required_events:
    - ice_destroyed_d3
    - ice_rebound_d4
    - ice_stop_short
  required_events_status: "pass, complete search"
  graph: "complete, states=496, transitions=1312, wins=1"
  exposure_note: "v3 base no-d5/d6 pass；strict no-late 仍 fail_boundary_only。"
meta:
  instance: C->D
  result: solved
  cost: 22
  pushes: 4
  returned_events:
    - ice_blocks_ice_no_chain_push
    - ice_stop_short:d2
    - ice_boundary_disappear:d1
    - ice_destroy_group_d6_plus:len2
    - ice_rebound_d4
  required_events:
    - ice_rebound_d4
    - ice_stop_short
    - ice_boundary_disappear
    - ice_destroy_group_d6_plus
  required_events_status: "pass, complete search"
  graph: "complete, states=1804, transitions=4706, wins=1"
routing:
  B_equals_C: true
  A_to_D: unsolved
  D_as_start: invalid_initial_wall
  full_edge_goal_scan:
    edge_goals_checked: 30
    legal_start_goal_instances_checked: 60
    all_pair_solves_complete_under_budget: true
    non_interface_solved: []
  ignored_reverse_pairs:
    - C->A
    - C->B
review:
  evidence_review:
    verdict: supports_with_caveats
    required_action: none
  puzzle_critic:
    verdict: supports_with_noncore_caveats
    required_action: none
  controller_result: proposal_ready_with_caveats
```

## Human Review

```yaml
human_comments:
  - id: HC_ICE_CAND_0035_001
    author: human_designer
    status: accepted
    aesthetic_score: 5
    difficulty_score: 4
    difficulty_detail: >
      局部 base A->B 约 2+；显式知道 C->D 目标时 meta 机制约 3；
      带下方死路或等价 return pressure 的整体单关体验约 4。
    text: >
      这关是一个意外优秀的带 meta 要素的单关设计，而不是标准两段式
      meta-first 模板。B/C 同格意味着玩家从 B 离开后，如果周围地图让他
      不得不原路返回，刷新后的同一关会被自然重读：首访的出口变成回访入口，
      base 与 meta 不需要任何知识差，却因为地图语境和目标方向改变产生
      “一关两用”的效果。这个点非常漂亮，审美可给 5。

      但此关不应作为可机械复用的 B=C 模板。它的价值依赖周围地图配合、
      回返动机、以及同一左下冰组在回访时确实改变角色，是典型的需要但也
      值得周围关卡主动配合的好关。后续设计不能因为使用同格出入口、死路
      返回或 D-wall 就获得同等加分。另外，下方地图死路/回返压力不是增加
      难度，而是降低发现门槛并保证公平性。没有这个 wrapper，玩家可能一辈子
      不会发现 B=C 的回访读法，这不是高难而是不可见。真正应计入难度的是：
      在自然回返后，玩家意识到同一单关刷新后还有第二用途，并把旧出口、
      target 和可破墙 D 重新组织起来。局部 C->D 机制约 3；有良好回返
      wrapper 的整体难度约 4。
```

## Review Notes

```yaml
review_iterations:
  - review_1:
      candidate: ICE_EXP_META_2026_07_02_round22_v1
      evidence_reviewer_verdict: supports_with_caveats
      critic_verdict: supports_with_noncore_caveats
      required_action: none
      notes: >
        独立 reviewer/critic 支持 proposal_ready_with_caveats。critic 原本
        不支持 5，只支持 4 下界；人类随后基于地图语境中的一关两用价值给出
        审美 5，但明确禁止机械复用几何。
caveats_retained:
  - "v3 修复 v1 base 可达 d5/d6/restart 外溢，但仍有 boundary-only 可达噪音。"
  - "v3 不能声明完全干净 early cutoff；若要 strict no-late，需要另审更硬补丁。"
  - "v2 strict patch 机器更干净，但更线性，未采用。"
  - "meta no-chain 由返回解支持，但未单独验证为 all-winning required。"
  - "B=C / D-wall / dead-end return 不是模板；必须有外部 return pressure 与实质角色重读。"
```

## 归档备注

此候选是审美 5 的抽象 meta 正例，但不是可机械复用的结构模板。未来 designer /
critic 使用它时，应把重点放在“地图语境迫使玩家重读同一关”与“return pressure
保障隐藏 CD 组发现性”，而不是 B=C 同格、死路返回或 D-wall 的表面形式。

归档当前采用布局为 `ICE_EXP_META_2026_07_02_round22_v3_soft_d5d6_cap`。它修复
v1 的 base 可达 d5/d6/restart 严重外溢，但仍有 boundary-only 可达噪音，不能
作为完全干净 early cutoff 正例。`ICE_EXP_META_2026_07_02_round22_v2_patch` 是
未采用 strict 补丁；它保留 B=C 单关回读抽象，但改变局部顺序并增加线性度。
