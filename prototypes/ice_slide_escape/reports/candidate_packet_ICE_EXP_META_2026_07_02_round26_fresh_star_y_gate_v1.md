# Serious Candidate Packet: ICE_EXP_META_2026_07_02_round26_fresh_star_y_gate_v1

本文件是 fresh-from-primitives meta-first 候选包。它不以 archive、round25、ICE_CAND_0036 或其他既有布局作为设计起点；archive 只作为口味校准背景。用户额外澄清后，本包采用硬约束为：所有 target 初始均被冰覆盖，且允许没有额外裸冰。

```yaml
packet_status: ready_for_independent_review
candidate_id: ICE_EXP_META_2026_07_02_round26_fresh_star_y_gate_v1
prototype: ice_slide_escape
design_mode: meta_first_design
source_relation: fresh_from_primitives
archive_lineage_policy:
  default: fresh_required
  candidate_relation: "fresh generated / not a revision of any archived or current candidate"
review_loop_state_before_review: self_review_candidate
review_integrity_before_review: self_review_only
```

## solve_instances

```yaml
layout_ref: prototypes/ice_slide_escape/reports/ICE_EXP_META_2026_07_02_round26_fresh_star_y_gate_v1_layout.txt
layout: |
  #############.##################
  #############.##################
  #############.##################
  .....########.##################
  ####.*....###..#################
  #####.....####*....#############
  #########.####.###.#############
  #########.####.###.#############
  #########.####.###.#############
  #########.####.....#############
  #########.########.#############
  #########..........#############
  #################.##############
  #################.####...#######
  #################.*....#.*....##
  ##################.....##.......
  ############################.###
  ############################.###
  ############################.###
  ############################.###
  ############################.###
  ################################
interfaces:
  A: [0, 3]
  B: [31, 15]
  C: [13, 0]
  D: [31, 15]
same_cell_interfaces:
  - B_equals_D
base_instance:
  player_start: [0, 3]
  player_goal: [31, 15]
meta_instance:
  player_start: [13, 0]
  player_goal: [31, 15]
```

## requirement_fit

```yaml
target_occupancy:
  targets_initially_covered: true
  glyph_counts:
    star: 4
    bare_target_G: 0
    bare_ice_I: 0
static_path_contradiction:
  A_to_B:
    blocked_with_initial_stars: true
    reachable_if_stars_removed: true
  C_to_D:
    blocked_with_initial_stars: true
    reachable_if_stars_removed: true
knowledge_policy:
  base_latest_reachable_knowledge: ice_rebound_d4
  base_latest_required_all_winning: true
  base_forbidden_late_reachable:
    - ice_pass_through_d5
    - slide_restart_after_group
    - ice_destroy_group_d6_plus
    - ice_boundary_disappear
  base_forbidden_late_reachable_hits: none
  meta_latest_required_all_winning: true
```

## mechanism_scope

```yaml
core_read:
  - "全图只有四个 `*`；每一道门初始都既是目标满足状态，又是玩家静态路径的塞子。"
  - "每个门的操作都是 d4 取出 -> 在同一小腔内反向 d4 回填。"
  - "A 与 C 是两条不同入口：A 先解决左入口横向门，C 先解决上入口竖向门。"
  - "随后两条流程汇入共享 Y 形主干，连续处理下方两组目标门，最终抵达同一个右出口。"
  - "B=D 是有意保守处理：关闭下边界后避免 B/D 互通污染，牺牲不同终点换取接口干净。"
```

## evidence

```yaml
solver_result:
  base:
    found: true
    cost: 57
    pushes: 6
    returned_events:
      ice_rebound_d4: 6
    graph: "complete, reachable states=6722, legal transitions=15295, winning states=1"
    scc: "branching_win_dag, solution irreversible steps=6, forcedWinPrefix=1/6"
  meta:
    found: true
    cost: 55
    pushes: 6
    returned_events:
      ice_rebound_d4: 6
    graph: "complete, reachable states=6722, legal transitions=15335, winning states=1"
    scc: "branching_win_dag, solution irreversible steps=6, forcedWinPrefix=1/6"
winning_path_event_checks:
  base_required_latest:
    required: [ice_rebound_d4]
    forbidden_reachable:
      - ice_pass_through_d5
      - slide_restart_after_group
      - ice_destroy_group_d6_plus
      - ice_boundary_disappear
    result: pass
    missing_required_path: not_found_complete_search
    forbidden_reachable_hits: none
  meta_required_latest:
    required: [ice_rebound_d4]
    forbidden_reachable:
      - ice_pass_through_d5
      - slide_restart_after_group
      - ice_destroy_group_d6_plus
      - ice_boundary_disappear
    result: pass
    missing_required_path: not_found_complete_search
    forbidden_reachable_hits: none
  d4_minimum_probe:
    base_d4_less_than_6_win: not_found_complete
    meta_d4_less_than_6_win: not_found_complete
edge_scan:
  edge_starts:
    - [13, 0]
    - [0, 3]
    - [31, 15]
  solved_pairs:
    - A_to_B
    - C_to_D
  non_target_solved_pairs: none
```

证据引用：

```text
- prototypes/ice_slide_escape/reports/ICE_EXP_META_2026_07_02_round26_fresh_star_y_gate_v1_layout.txt
- prototypes/ice_slide_escape/reports/layout_analysis_ICE_EXP_META_2026_07_02_round26_fresh_star_y_gate_v1_base.md
- prototypes/ice_slide_escape/reports/layout_analysis_ICE_EXP_META_2026_07_02_round26_fresh_star_y_gate_v1_meta.md
- prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_02_round26_fresh_star_y_gate_v1_base_required_latest.md
- prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_02_round26_fresh_star_y_gate_v1_meta_required_latest.md
- prototypes/ice_slide_escape/reports/interface_d4_probe_ICE_EXP_META_2026_07_02_round26_fresh_star_y_gate_v1.md
```

## self_review_risks

```yaml
known_tradeoffs:
  - "B=D 同出口：接口更干净，但 meta 不是不同终点回访。"
  - "机制非常集中在 d4，缺少 d5/d6/restart 的惊喜。"
  - "地图 32x22，视觉上有长廊和大片墙；需要 critic 判断是否仍可达审美 4。"
  - "base 与 meta 在共享主干中高度相同；差异主要来自入口门方向与进入共享链的上下文。"
positive_read:
  - "所有目标初始覆盖和静态封路矛盾非常清楚。"
  - "每个目标门都必须借出再恢复，d4<6 的胜利路径不存在。"
  - "base/latest 知识严格：没有 d5/d6/restart/boundary 外溢。"
  - "两条流程都是 6-push，图完整且单一 winning state。"
```

## reviewer_questions

```yaml
evidence_reviewer:
  - "请确认所有 target 初始均为 `*`，且没有裸 `I` / `G`。"
  - "请确认 base/meta required latest 证据是否支持 d4 为最后可达知识且所有胜利路径需要 d4。"
  - "请确认 edge scan 只有 A->B 与 C->D 两条目标解；B=D 同格是否已正确披露。"
puzzle_critic:
  - "B=D 同出口是否削弱 meta-first 到不可提交，还是可作为保守同出口候选。"
  - "六连 d4 是否读作优雅目标门链，还是重复填充。"
  - "整体审美是否达到 4 分保底，难度是否两边 >=3 且至少一边 >=4。"
```
