# Redundant Element Prune: RA_FRESH_2026_07_08_PULL_BRUSH_RETURN_v4_wall_trim

```yaml
redundant_element_prune:
  status: pruned
  final_candidate: RA_FRESH_2026_07_08_PULL_BRUSH_RETURN_v4_wall_trim
  sequence:
    - goal_prune
    - object_remove_prune
    - object_wallify_prune
    - space_prune
    - wall_outline_prune
  candidates_checked:
    - element:
        kind: goal
        id_or_cell: [8, 4]
      action_tested: remove
      result: keep
      reason: "删除后成本下降到 9 且绕开 pl_shift。"
      hard_facts:
        cost_delta: "34->9"
        graph_status: complete
        expected_trace_win: true
        core_event_bypass: "missing pl_shift"
        opening_delta: "not_improved_enough_to_allow_goal_removal"
        target_obligation_bypass: true
      semantic_role: structural
    - element:
        kind: goal
        id_or_cell: [7, 6]
      action_tested: remove
      result: keep
      reason: "删除后成本下降到 8 且绕开 material_cut 与 pl_shift。"
      hard_facts:
        cost_delta: "34->8"
        graph_status: complete
        expected_trace_win: true
        core_event_bypass: "missing material_cut, pl_shift"
        opening_delta: "not_improved_enough_to_allow_goal_removal"
        target_obligation_bypass: true
      semantic_role: structural
    - element:
        kind: object
        id_or_cell: "P/L anchor"
      action_tested: remove_or_wallify
      result: keep
      reason: "anchor_boundary_shift:push_pull 是所有胜路必经，且至少 2 次必经；对象承担核心机制职责。"
      hard_facts:
        cost_delta: "not_tested_structurally_core_object"
        graph_status: complete
        expected_trace_win: true
        core_event_bypass: none
        opening_delta: unchanged
        target_obligation_bypass: false
      semantic_role: structural
    - element:
        kind: object
        id_or_cell: "B/S anchor"
      action_tested: remove_or_wallify
      result: keep
      reason: "anchor_boundary_shift:box_sticky 是所有胜路必经，且至少 2 次必经；对象承担核心机制职责。"
      hard_facts:
        cost_delta: "not_tested_structurally_core_object"
        graph_status: complete
        expected_trace_win: true
        core_event_bypass: none
        opening_delta: unchanged
        target_obligation_bypass: false
      semantic_role: structural
    - element:
        kind: object
        id_or_cell: "initial sticky cells"
      action_tested: remove_or_wallify
      result: keep
      reason: "returned trace 多次触发 move_sticky_rigid / sticky_to_box；核心 probe 证明 sticky_rigid 与 material_cut 必经。"
      hard_facts:
        cost_delta: "not_tested_structurally_core_object"
        graph_status: complete
        expected_trace_win: true
        core_event_bypass: none
        opening_delta: unchanged
        target_obligation_bypass: false
      semantic_role: structural
    - element:
        kind: wall_outline
        id_or_cell: "v3 left and right pure outer wall columns"
      action_tested: trim
      result: trim
      reason: "v3 左右各一列纯外墙不改变对象、目标和通道相对关系；裁剪为 v4 后 shortest cost、trace、完整图状态数、transitions、核心 probes 均保持一致。"
      hard_facts:
        cost_delta: "34->34"
        graph_status: complete
        expected_trace_win: true
        core_event_bypass: none
        opening_delta: unchanged
        target_obligation_bypass: false
      semantic_role: none
    - element:
        kind: wall_outline
        id_or_cell: "remaining one-cell outer boundary"
      action_tested: trim
      result: keep
      reason: "v4 剩余外框是单格边界墙，不是双厚外框；继续裁剪会打开矩形边界而非删除冗余厚墙。"
      hard_facts:
        cost_delta: "not_applicable"
        graph_status: complete
        expected_trace_win: true
        core_event_bypass: none
        opening_delta: unchanged
        target_obligation_bypass: false
      semantic_role: blocker_only
  removed_elements: []
  wallified_objects: []
  trimmed_outline:
    - "Removed v3 left pure outer wall column."
    - "Removed v3 right pure outer wall column."
  retained_elements:
    - kind: goal
      id_or_cell: [8, 4]
      reason: "prevents no-upper early win and requires P/L shift."
    - kind: goal
      id_or_cell: [7, 6]
      reason: "prevents no-lower early win and requires material cut plus P/L shift."
    - kind: object
      id_or_cell: "P/L anchor, B/S anchor, initial sticky cells"
      reason: "core mechanism objects."
    - kind: wall_outline
      id_or_cell: "remaining one-cell outer boundary"
      reason: "required rectangular boundary, not thick border."
  evidence_refs:
    - prototypes/reality_anchor/reports/layout_analysis_RA_FRESH_2026_07_08_PULL_BRUSH_RETURN_v3.md
    - prototypes/reality_anchor/reports/layout_analysis_RA_FRESH_2026_07_08_PULL_BRUSH_RETURN_v4_wall_trim.md
    - prototypes/reality_anchor/reports/event_probe_RA_FRESH_2026_07_08_PULL_BRUSH_RETURN_v4_wall_trim_core6.md
    - prototypes/reality_anchor/reports/goal_prune_check_RA_FRESH_2026_07_08_PULL_BRUSH_RETURN_v4_wall_trim.zh.md
    - prototypes/reality_anchor/reports/opening_comfort_check_RA_FRESH_2026_07_08_PULL_BRUSH_RETURN_v4_wall_trim.zh.md
```

结论：已将 v3 的左右纯外墙列裁剪为 v4；v4 未发现可继续删除、墙化或裁剪且不破坏核心约束的明显要素。
