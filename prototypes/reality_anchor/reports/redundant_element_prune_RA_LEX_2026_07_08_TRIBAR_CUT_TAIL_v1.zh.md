# Redundant Element Prune: RA_LEX_2026_07_08_TRIBAR_CUT_TAIL_v1

redundant_element_prune:
  status: pruned
  sequence:
    - goal_prune
    - object_remove_prune
    - object_wallify_prune
    - space_prune
    - wall_outline_prune
  candidates_checked:
    - element:
        kind: goal
        id_or_cell: [4, 1]
      action_tested: remove
      result: keep
      reason: 删除后成本 19->6，并出现缺少 `sticky_to_box` 的胜路。
      hard_facts:
        cost_delta: "19->6"
        graph_status: complete
        expected_trace_win: true
        core_event_bypass: "missing sticky_cut"
      semantic_role: structural
    - element:
        kind: goal
        id_or_cell: [9, 2]
      action_tested: remove
      result: keep
      reason: 删除后成本 19->16，且 `move_sticky_rigid >= 6` 被 3 次移动胜路击穿；该目标负责二连 sticky 尾债消费。
      hard_facts:
        cost_delta: "19->16"
        graph_status: complete
        expected_trace_win: true
        core_event_bypass: "tail-consumption count bypass"
      semantic_role: structural
    - element:
        kind: space
        id_or_cell: "top-right open strip from working draft"
      action_tested: wall_prune
      result: trim
      reason: 该区域不承担站位、对象路线、目标义务或 opening comfort；墙化后主链、成本和核心事件计数保持。
      hard_facts:
        cost_delta: "19->19"
        graph_status: complete
        expected_trace_win: true
        core_event_bypass: none
      semantic_role: none
    - element:
        kind: space
        id_or_cell: "B/S side pockets from working draft"
      action_tested: wall_prune
      result: trim
      reason: B/S 两侧口袋不承担可达站位或机制读图责任；墙化后主链、成本和核心事件计数保持，完整图缩小到 347 states。
      hard_facts:
        cost_delta: "19->19"
        graph_status: complete
        expected_trace_win: true
        core_event_bypass: none
      semantic_role: none
  removed_elements: []
  wallified_objects: []
  trimmed_outline:
    - "右上无责任空地墙化为外框墙。"
    - "B/S 左右 side pockets 墙化，只保留固定 B/S 锚点本体。"
  retained_elements:
    - kind: object
      id_or_cell: "three initial crates"
      reason: 返回 trace 与 all-win count probe 证明三次 `box_to_sticky` 必要；不能删或墙化。
    - kind: object
      id_or_cell: "fixed B/S anchor"
      reason: 材料边界是核心机制，且不可移动。
    - kind: space
      id_or_cell: "row 3 corridor under the object lane"
      reason: 需要玩家回到左端推动切出的 crate，并保持尾债推进站位。
  evidence_refs:
    - prototypes/reality_anchor/reports/goal_prune_RA_LEX_2026_07_08_TRIBAR_CUT_TAIL_v1.zh.md
    - prototypes/reality_anchor/reports/layout_analysis_RA_LEX_2026_07_08_TRIBAR_CUT_TAIL_v1.md
    - prototypes/reality_anchor/reports/event_probe_RA_LEX_2026_07_08_TRIBAR_CUT_TAIL_v1_core4.md
    - prototypes/reality_anchor/reports/event_count_probe_RA_LEX_2026_07_08_TRIBAR_CUT_TAIL_v1_box_to_sticky_min3_box_to_sticky_min3.md
    - prototypes/reality_anchor/reports/event_count_probe_RA_LEX_2026_07_08_TRIBAR_CUT_TAIL_v1_move_sticky_min6_move_sticky_rigid_min6.md
