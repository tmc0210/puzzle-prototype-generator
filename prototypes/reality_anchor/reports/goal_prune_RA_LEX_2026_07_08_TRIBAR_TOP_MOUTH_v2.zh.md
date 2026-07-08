# Goal Prune Check: RA_LEX_2026_07_08_TRIBAR_TOP_MOUTH_v2

goal_prune_check:
  status: pruned_from_three_goal_draft
  retained_targets:
    - [4, 1]
    - [5, 1]
  removed_targets:
    - target: [6, 1]
      reason: 三目标草图中删除任一 sticky-side 目标仍保留同样 18 步主链；第二个 sticky 目标没有独立目标责任，已从 v2 剪掉。
      evidence_refs:
        - prototypes/reality_anchor/reports/layout_analysis_RA_LEX_2026_07_08_TRIBAR_TOP_MOUTH_v1_no_left_m_goal.md
        - prototypes/reality_anchor/reports/layout_analysis_RA_LEX_2026_07_08_TRIBAR_TOP_MOUTH_v1_no_right_m_goal.md
  targets_checked:
    - target: [4, 1]
      action: keep
      reason: 删除 C 目标后最短成本 18 -> 14；返回 shortcut 在 sticky target 覆盖后直接获胜，不再需要切后 C 回填。该目标负责消费 `C+MM` 中的 C 输出，但不声明它移除核心材料链。
      cost_delta: "18->14"
      graph_status: complete
      evidence_refs:
        - prototypes/reality_anchor/reports/layout_analysis_RA_LEX_2026_07_08_TRIBAR_TOP_MOUTH_v2_no_c_goal.md
    - target: [5, 1]
      action: keep
      reason: 删除 M 目标后最短成本 18 -> 16；`move_sticky_rigid >= 4` 被 3 次移动胜路击穿。该目标负责 sticky tail 上塞口宽消费。
      cost_delta: "18->16"
      graph_status: complete
      count_bypass: "move_sticky_rigid 3 < 4"
      evidence_refs:
        - prototypes/reality_anchor/reports/layout_analysis_RA_LEX_2026_07_08_TRIBAR_TOP_MOUTH_v2_no_m_goal.md
        - prototypes/reality_anchor/reports/event_count_probe_RA_LEX_2026_07_08_TRIBAR_TOP_MOUTH_v2_no_m_goal_move_sticky_min4_move_sticky_rigid_min4.md
  evidence_refs:
    - prototypes/reality_anchor/reports/layout_analysis_RA_LEX_2026_07_08_TRIBAR_TOP_MOUTH_v2.md
    - prototypes/reality_anchor/reports/event_probe_RA_LEX_2026_07_08_TRIBAR_TOP_MOUTH_v2_core5.md
    - prototypes/reality_anchor/reports/event_count_probe_RA_LEX_2026_07_08_TRIBAR_TOP_MOUTH_v2_move_sticky_min4_move_sticky_rigid_min4.md
