# Goal Prune Check: RA_LEX_2026_07_08_TRIBAR_CUT_TAIL_v1

goal_prune_check:
  status: clean
  targets_checked:
    - target: [4, 1]
      action: keep
      reason: 删除左上目标后最短成本 19 -> 6，并出现缺少 `sticky_to_box` 的胜利路径；该目标负责迫使回推切割并消费切出的 crate。
      cost_delta: "19->6"
      graph_status: complete
      expected_trace_win: true
      core_event_bypass: "missing sticky_cut"
      evidence_refs:
        - prototypes/reality_anchor/reports/layout_analysis_RA_LEX_2026_07_08_TRIBAR_CUT_TAIL_v1_no_top_goal.md
        - prototypes/reality_anchor/reports/event_probe_RA_LEX_2026_07_08_TRIBAR_CUT_TAIL_v1_no_top_goal_core4.md
    - target: [9, 2]
      action: keep
      reason: 删除右侧目标后最短成本 19 -> 16；核心四事件仍必经，但 `move_sticky_rigid >= 6` 被 3 次移动胜路击穿，说明该目标负责二连 sticky 尾债的额外消费。
      cost_delta: "19->16"
      graph_status: complete
      expected_trace_win: true
      core_event_bypass: "tail-consumption count bypass: move_sticky_rigid 3 < 6"
      evidence_refs:
        - prototypes/reality_anchor/reports/layout_analysis_RA_LEX_2026_07_08_TRIBAR_CUT_TAIL_v1_no_right_goal.md
        - prototypes/reality_anchor/reports/event_probe_RA_LEX_2026_07_08_TRIBAR_CUT_TAIL_v1_no_right_goal_core4.md
        - prototypes/reality_anchor/reports/event_count_probe_RA_LEX_2026_07_08_TRIBAR_CUT_TAIL_v1_no_right_goal_move_sticky_min6_move_sticky_rigid_min6.md
  removed_targets: []
  retained_targets:
    - [4, 1]
    - [9, 2]
  evidence_refs:
    - prototypes/reality_anchor/reports/layout_analysis_RA_LEX_2026_07_08_TRIBAR_CUT_TAIL_v1.md
    - prototypes/reality_anchor/reports/event_probe_RA_LEX_2026_07_08_TRIBAR_CUT_TAIL_v1_core4.md
    - prototypes/reality_anchor/reports/event_count_probe_RA_LEX_2026_07_08_TRIBAR_CUT_TAIL_v1_move_sticky_min6_move_sticky_rigid_min6.md
