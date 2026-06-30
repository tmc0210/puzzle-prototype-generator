# Experiment Run: ICE_EXP_003 round12 F timing dual role

```yaml
run_id: ICE_EXP_003_2026_06_30_round12_f_timing_proposal_ready
experiment_id: ICE_EXP_003_all_knowledge_endgame_capstone
prototype: ice_slide_escape
terminal_state: accepted
accepted_candidates:
  - ICE_CAND_0019
accepted_version: ICE_CAND_0019_v4_remove_left_hint_target
llm_candidate_strength: proposal_candidate_no_major_caveat
human_final_status: accepted
review_integrity: human_review
archive_eligibility: clean_archive
```

## Context

本轮在 `ICE_CAND_0018` 被 critic 打回后换 family。0018 的失败点是 C/D 虽有
双重用途，但玩家侧仍读成短线性 `B -> E -> D -> E -> A`，C 的价值偏被动固定
结构。

新 family 让同一位置的 F 产生时序冲突：F 早推像是在处理上层 target / 门，
但会破坏 A 的 d5 障碍；F 永远不动又会挡住 C 的最终下推。E 也不再自己补
target，而是先预置成 C 的延迟 stopper。

`v3` 通过独立 evidence review 和 design critic，达到 `proposal_ready`。
随后进行 `v4_remove_left_hint_target` 优化：移除 `[4,1]` 的左上 target，
让第一步 B 到 `[4,1]` 从显性填 target 改成后续 A 停在 `[5,1]` 所需的隐藏
stopper。该优化保留原 6 推互锁结构，并被 human review 接受为正例。

候选记录：

```text
prototypes/ice_slide_escape/design_archive/candidates/ICE_CAND_0019.md
```

## Human Review

```yaml
human_comments:
  - id: HC_ICE_CAND_0019_001
    author: human_designer
    status: accepted_positive_with_caveats
    text: >
      此关作为正例的优化是我直接提出的从原 v3 移除了 [4,1] 的左上 target。
      原版中，第一推 B 到 [4,1] 被 target 是过于自然的直接达成目标，玩家可以
      不理解其后续价值也顺手执行，因此无有效洞见；v4 中这一步不再有即时目标回报，
      只在后续 A 左推停到 [5,1] 时才显现为必要条件。因此该修改把一个显然的开锁
      步骤转化为延迟生效的隐藏结构，显著增强了第一步的非局部性和回读价值，同时
      没有破坏原关卡扎实的复杂互锁结构和逻辑链，在v4优化后完全可以作为一个后期
      较高难度关卡备选。但需注意此关仍然偏复合锁结构，因几乎每个关键步骤质量都
      尚可所以被接纳，实际并未有游戏流程末期仍然有效的真正精彩的洞见、有趣的局部
      结构或aha-moment（把一个已经在目标的冰推走在游戏前中期大概是新颖有趣的，
      但是后期这应该只是轻度亮点了）
```

Human-taste reading:

```text
此正例价值主要来自 v4：B 到 [4,1] 不再是即时 target 填点，而是转化为 A 后续
定位所需的延迟隐藏 stopper。此候选应作为后期较高难度的复合锁参考，而不是
作为单一精彩 aha-moment 的纯净范例。
```

## Submitted Versions

```yaml
review_1_candidate_version: ICE_CAND_0019_v2_false_top_door_lower_route
review_2_candidate_version: ICE_CAND_0019_v3_f_as_final_target_after_a
accepted_version: ICE_CAND_0019_v4_remove_left_hint_target
player_start: [0, 9]
player_goal: [15, 3]
final_layout_ref: prototypes/ice_slide_escape/reports/ICE_CAND_0019_scratch_v4_remove_left_hint_target.txt
target_removal_ref: prototypes/ice_slide_escape/reports/target_removal_probe_ICE_CAND_0019.md
```

```text
################
#....GGI.....I.#
#.#.#..I######.#
#..#...*.......#
#..#....########
#..#....########
#..#...I########
#..#....########
#...I..#########
........########
################
```

## Evidence

```yaml
layout_analysis:
  ref: prototypes/ice_slide_escape/reports/layout_analysis_ICE_CAND_0019_v4_remove_left_hint_target.md
  result: pass
  graph_status: complete
  reachable_states: 50528
  legal_transitions: 140744
  winning_states: 1
  shortest_cost: 43
  push_count: 6
required_probe:
  ref: prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0019_v4_precise_required_probe.md
  result: pass
  graph_status: complete
  reachable_states: 50528
  winning_states: 1
  missing_required_win: not_found_complete_search
  explored_augmented_states: 59934
all_edge_probe:
  ref: prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0019_v4_all_edge_starts.md
  result: pass
  checked_edge_starts:
    - [0, 9]
object_fact_probe:
  ref: prototypes/ice_slide_escape/reports/object_fact_probe_ICE_CAND_0019_v4_remove_left_hint_target.md
  result: pass
  augmented_search_status: complete
  augmented_states_explored: 69306
  missing_core_fact_win: not_found_complete_search
target_removal_probe:
  ref: prototypes/ice_slide_escape/reports/target_removal_probe_ICE_CAND_0019.md
  result: pass
  summary: >
    移除 [4,1] 安全，并改善第一步读法。移除 [5,1]、[6,1] 或 [7,3] 被拒绝，
    因为它们会削弱或摧毁核心链。
```

## Review Loop

```yaml
review_1:
  candidate_version_reviewed: ICE_CAND_0019_v2_false_top_door_lower_route
  evidence_reviewer:
    verdict: caveated_pass
    review_loop_state: proposal_ready_with_caveats
    required_action: preserve_object_level_caveat_or_add_fact_probe
    summary: >
      证据支持 43 inputs / 6 pushes trace、50528 states 的完整图、required-event
      必要性和 all-edge start 主张。但该版本有 7 个胜局，而且证据证明的是事件族
      必要性与 trace 坐标，不是对象层 all-path 唯一性。
  design_critic:
    verdict: proposal_candidate
    review_loop_state: proposal_ready_with_caveats
    required_action: close_branching_and_object_fact_caveat
    summary: >
      v2 强于 0015-0018，因为 F 有真实的“先保留、再移动”时序，E 也是延迟
      stopper。剩余 caveat 是分支性：7 个胜局，且尚无对象层反事实证明。
  loop_result: revise_required
designer_action_1:
  action: >
    在 [6,1] 增加上方 target。这会堵住 v2 中 A 可被牺牲、F 后续仍能直接填
    [5,1] 的绕法。v3 中 F 必须先作为 A 的 d5 obstacle，再移动到 [6,1] 填
    target，并为 C 清出 [7,1]。
review_2:
  candidate_version_reviewed: ICE_CAND_0019_v3_f_as_final_target_after_a
  evidence_reviewer:
    verdict: caveated_pass
    review_loop_state: proposal_ready
    required_action: none
    summary: >
      v3 支持声明的 43 inputs / 6 pushes trace；完整图 50528 states 且只有
      1 个胜局；required probe 完整；边缘起点只有 [0,9]。object-fact probe
      没有找到任何缺少核心坐标事实的胜路，因此关闭 v2 核心证据 caveat。剩余
      caveat 仅是证据措辞：坐标事实必要性，不是持久冰块身份。
  design_critic:
    verdict: proposal_candidate_no_major_caveat
    review_loop_state: proposal_ready
    required_action: none
    summary: >
      v3 关闭 review_1 caveat。新增 [6,1] target 让 F 成为中心：过早移动 F
      会破坏 A，永远不动 F 会挡住 C，正确路线必须先保留 F 给 A，再把它移到
      [6,1]。剩余分支事实不构成阻塞，因为完整图只有 1 个胜局，object-fact
      probe 证明所有胜路都经过核心坐标事实。
  loop_result: proposal_ready
designer_action_2:
  candidate_version: ICE_CAND_0019_v4_remove_left_hint_target
  action: remove_target_at_4_1
  summary: >
    移除 B 第一落点的可见 target 提示。B 仍必须占据 [4,1]，但它的价值只在
    A 需要 stopper 停到 [5,1] 时才显现。
critic_calibration_after_v4:
  verdict: design_improvement
  summary: >
    独立 critic calibration 将该改动识别为洞见提升，而非单纯隐藏信息，因为
    A 后续的落点条件提供了推断隐藏 stopper 的具体理由。
human_review:
  verdict: accepted_positive_with_caveats
  summary: >
    v4 被接受为后期较高难度正例。主要 caveat 是它仍属于复合锁，而非真正的
    endgame aha-moment。
```

## Mechanism Scope

```yaml
central:
  - B at [4,1] 是 A 的延迟隐藏 stopper，不是即时 target 填点。
  - F 必须先保留在 [7,1] 作为 A 的 d5 obstacle，再移动到 [6,1]。
  - E 必须预置到 [7,4] 作为 C 的延迟 stopper。
  - D 必须打开 edge goal 并暂时清空 [7,3]。
  - C 最后必须借 E 回填 [7,3]。
support:
  - d5 pass-through / restart 决定 B 和 A 的行程。
  - d6+ destruction 打开右侧 edge goal。
  - d1/d2 short stop 和 ice-block interaction 决定精确落点。
caveat:
  - 因复合互锁扎实而被接受，而不是因为存在单一的流程末期 aha-moment。
```

## Exploration Log Summary

```yaml
families:
  - family: f_timing_dual_role
    attempts: v1_preserve_c_false_door, v2_false_top_door_lower_route, v3_f_as_final_target_after_a
    result: proposal_ready_before_human_optimization
    reason: >
      F 已经具备预期的“先保留、再移动”时序，但 v2 需要 [6,1] target 来关闭
      绕法。v3 随后以 1 个胜局和 object-fact necessity 通过独立 review。
  - family: target_removal_refinement
    attempts: remove_[4,1], remove_[5,1], remove_[6,1], remove_[7,3]
    result: accepted_v4
    reason: >
      移除 [4,1] 在不改变解长或核心链的前提下改善第一步读法。移除 [5,1] 会
      削弱 A 的 target 角色；移除 [6,1] 会重新打开 v2 caveat；移除 [7,3] 会
      摧毁 E/C 最终回填结构。
```

## Evidence Refs

```text
- prototypes/ice_slide_escape/reports/layout_analysis_ICE_CAND_0019_v4_remove_left_hint_target.md
- prototypes/ice_slide_escape/reports/layout_analysis_ICE_CAND_0019_v4_remove_left_hint_target.json
- prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0019_v4_precise_required_probe.md
- prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0019_v4_precise_required_probe.json
- prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0019_v4_all_edge_starts.md
- prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0019_v4_all_edge_starts.json
- prototypes/ice_slide_escape/reports/object_fact_probe_ICE_CAND_0019_v4_remove_left_hint_target.md
- prototypes/ice_slide_escape/reports/target_removal_probe_ICE_CAND_0019.md
```

## Retrieval Summary

```text
Round 12 产出 ICE_CAND_0019 v4，一个带 caveat 的人类接受正例。最终接受的
优化从 v3 移除 [4,1] target，使 B 的第一推不再是显然的局部 target 填点，而是
转化为 A 所需的延迟隐藏 stopper。43 inputs / 6 pushes 核心保持不变：B hidden
stopper，E 作为 C 的延迟 stopper，D 打开 edge goal 并清空 [7,3]，A 使用 F
和 B，F 再填 [6,1]，C 最终回填 [7,3]。人类 review 接受其强化后的第一步
非局部性和扎实互锁，同时警告该关仍是复合锁，而不是真正的 late-game aha-moment。
```
