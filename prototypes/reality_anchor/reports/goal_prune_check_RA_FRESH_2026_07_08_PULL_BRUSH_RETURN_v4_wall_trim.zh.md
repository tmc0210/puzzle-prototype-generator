# Goal Prune Check: RA_FRESH_2026_07_08_PULL_BRUSH_RETURN_v4_wall_trim

```yaml
goal_prune_check:
  status: clean
  candidate: RA_FRESH_2026_07_08_PULL_BRUSH_RETURN_v4_wall_trim
  original:
    shortest_cost: 34
    graph_status: complete
    reachable_states: 104786
    core6_probe:
      status: complete
      found_bypass: false
  targets_checked:
    - target: [8, 4]
      label: upper_goal
      action: keep
      reason: "删除后最短成本 34->9，且出现缺少 pl_shift 的 combined core6 winning bypass；该目标承担 P/L anchor return 约束。"
      cost_delta: "34->9"
      graph_status: complete
      expected_trace_win: true
      core_event_bypass: "missing pl_shift"
    - target: [7, 6]
      label: lower_goal
      action: keep
      reason: "删除后最短成本 34->8，且出现缺少 material_cut 与 pl_shift 的 combined core6 winning bypass；该目标承担 brush-tail material cut 与防早停约束。"
      cost_delta: "34->8"
      graph_status: complete
      expected_trace_win: true
      core_event_bypass: "missing material_cut, pl_shift"
  removed_targets: []
  retained_targets:
    - [8, 4]
    - [7, 6]
  evidence_refs:
    - prototypes/reality_anchor/reports/layout_analysis_RA_FRESH_2026_07_08_PULL_BRUSH_RETURN_v4_wall_trim.md
    - prototypes/reality_anchor/reports/event_probe_RA_FRESH_2026_07_08_PULL_BRUSH_RETURN_v4_wall_trim_core6.md
    - prototypes/reality_anchor/reports/layout_analysis_RA_FRESH_2026_07_08_PULL_BRUSH_RETURN_v4_wall_trim_no_upper_goal.md
    - prototypes/reality_anchor/reports/event_probe_RA_FRESH_2026_07_08_PULL_BRUSH_RETURN_v4_wall_trim_no_upper_goal_core6.md
    - prototypes/reality_anchor/reports/layout_analysis_RA_FRESH_2026_07_08_PULL_BRUSH_RETURN_v4_wall_trim_no_lower_goal.md
    - prototypes/reality_anchor/reports/event_probe_RA_FRESH_2026_07_08_PULL_BRUSH_RETURN_v4_wall_trim_no_lower_goal_core6.md
```

结论：两个目标都不是顺路覆盖目标；删除任一目标都会降低最短成本并绕开当前核心事件组。
