# Object Fact Probe: ICE_CAND_0019_v3_f_as_final_target_after_a

该探针是针对一审 caveat 的补充诊断：`layout_analysis` 没有 instance-level
object participation，因此不能直接证明所有胜路都由同一块冰以同一身份完成
F/A/E/C 角色。这里用完整状态图 + 坐标事实 mask 做增强搜索，检查是否存在
缺少核心坐标事实的胜利路径。

```yaml
candidate: ICE_CAND_0019_v3_f_as_final_target_after_a
layout_ref: prototypes/ice_slide_escape/reports/ICE_CAND_0019_scratch_v3_f_as_final_target_after_a.txt
player_start: [0, 9]
player_goal: [15, 3]
augmented_search_status: complete
augmented_states_explored: 69305
```

## Checked Facts

```yaml
facts:
  - id: B_at_4_1
    meaning: top-left target / A stopper exists at [4,1]
  - id: E_prepositioned_7_4
    meaning: E-like stopper waits at [7,4] while [7,3] is still occupied
  - id: D_open_goal_7_3_empty
    meaning: [7,3] target is cleared and [15,3] edge goal wall is opened
  - id: A_done_F_preserved
    meaning: [5,1] is filled while F remains at [7,1]
  - id: F_after_A_target_6_1
    meaning: after [5,1] is filled, F occupies [6,1] and [7,1] is clear
  - id: C_final_7_3_with_E_stop
    meaning: [7,3] is refilled while the E-like stopper remains at [7,4]
```

## Results

```yaml
missing_fact_winning_path:
  B_at_4_1: not_found_complete_search
  E_prepositioned_7_4: not_found_complete_search
  D_open_goal_7_3_empty: not_found_complete_search
  A_done_F_preserved: not_found_complete_search
  F_after_A_target_6_1: not_found_complete_search
  C_final_7_3_with_E_stop: not_found_complete_search
  all_core_facts: not_found_complete_search
```

## Reading

The probe supports the strengthened claim that all winning paths pass through
the declared coordinate facts: B at `[4,1]`, E pre-positioned at `[7,4]`,
D/goal opening, A consuming preserved F, F then moving to `[6,1]`, and C finally
refilling `[7,3]` against E.

This is not engine-level identity tracking. Ice blocks are canonicalized by
positions, so the proof is coordinate-fact necessity, not persistent object
identity. For this layout, that is the right evidence boundary: the player-facing
logic is about preserving and later moving the ice occupying `[7,1]`.
