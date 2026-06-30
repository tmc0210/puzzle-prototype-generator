# Object Fact Probe: ICE_CAND_0019_v4_remove_left_hint_target

该探针用于确认 v4 删除 `[4,1]` target 后，胜利路径仍必须经过核心坐标事实。
注意：本项目状态键不追踪冰块持久身份；此处证明的是坐标事实必要性，不是同一
物理冰块身份的引擎级证明。

```yaml
candidate: ICE_CAND_0019_v4_remove_left_hint_target
layout_ref: prototypes/ice_slide_escape/reports/ICE_CAND_0019_scratch_v4_remove_left_hint_target.txt
player_start: [0, 9]
player_goal: [15, 3]
augmented_search_status: complete
augmented_states_explored: 69306
win_masks:
  - "111111"
```

## Checked Facts

```yaml
facts:
  - id: B_stopper_4_1
    meaning: B-like ice 必须占据 [4,1]，作为 A 的延迟 stopper，而不是 target 填点。
  - id: E_prepositioned_7_4
    meaning: 当 [7,3] 仍被占据时，E-like stopper 等在 [7,4]。
  - id: D_open_goal_7_3_empty
    meaning: [7,3] target 被清空，且 [15,3] edge goal wall 被打开。
  - id: A_done_F_preserved
    meaning: [5,1] 被填上，同时 F 仍保留在 [7,1]。
  - id: F_after_A_target_6_1
    meaning: [5,1] 被填上后，F 占据 [6,1]，且 [7,1] 已清空。
  - id: C_final_7_3_with_E_stop
    meaning: [7,3] 被回填，同时 E-like stopper 仍在 [7,4]。
```

## Results

```yaml
missing_fact_winning_path:
  B_stopper_4_1: not_found_complete_search
  E_prepositioned_7_4: not_found_complete_search
  D_open_goal_7_3_empty: not_found_complete_search
  A_done_F_preserved: not_found_complete_search
  F_after_A_target_6_1: not_found_complete_search
  C_final_7_3_with_E_stop: not_found_complete_search
  all_core_facts: not_found_complete_search
```

## Reading

v4 的 target 移除没有打开绕过原 F/A/E/C 时序骨架的胜路。所有胜路仍经过声明的
坐标事实：B 在 `[4,1]` 作为隐藏 stopper，E 预置在 `[7,4]`，D 打开 goal，
A 使用保留的 F 和 B 填 `[5,1]`，F 随后移动到 `[6,1]`，C 最后借 E 回填
`[7,3]`。

相对 v3，关键设计差异是解释性的，而非机械性的：`[4,1]` 不再提供即时 target
奖励，它的必要性只在 A 后续必须停到 `[5,1]` 时才显现。
