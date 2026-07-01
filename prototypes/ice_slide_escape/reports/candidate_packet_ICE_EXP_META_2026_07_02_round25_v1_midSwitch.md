# Serious Candidate Packet: ICE_EXP_META_2026_07_02_round25_v1_midSwitch

本文件是回应“round24 几何太怪、长直死胡同过于明示 d6、左下墙块难看”的结构改版送审候选包，不是通过结论。

```yaml
packet_status: ready_for_review_input
candidate_id: ICE_EXP_META_2026_07_02_round25_v1_midSwitch
prototype: ice_slide_escape
source_candidate: ICE_EXP_META_2026_07_02_round24_v1_verticalD
revision_reason: "人类指出 round24 的竖井几何和左下墙块审美不足；本版改为中轴 switch 结构。"
review_loop_state_before_review: self_review_candidate
review_integrity_before_review: self_review_only
archive_eligibility_before_review: human_pending
archive_lineage_policy:
  default: fresh_required
  candidate_relation: structural_revision_of_current_unarchived_candidate
```

## solve_instances

```yaml
layout_ref: prototypes/ice_slide_escape/reports/ICE_EXP_META_2026_07_02_round25_v1_midSwitch_layout.txt
layout: |
  ###############
  #....#......IG.
  ###########.#I#
  #.............#
  #######..###..#
  #######.####.##
  #######.####.##
  ######.I#######
  ..............#
  ###############
interfaces:
  A: [0, 8]
  B: [0, 3]
  C: [14, 1]
  D: [14, 8]
same_cell_interfaces: []
base_instance:
  player_start: [0, 8]
  player_goal: [0, 3]
meta_instance:
  player_start: [14, 1]
  player_goal: [14, 8]
```

## structural_delta

```yaml
compared_to: ICE_EXP_META_2026_07_02_round24_v1_verticalD
removed_or_reduced:
  - "删除 15 高下方竖井；高度回到 10。"
  - "删除左下大块实墙；底部成为可读的横向出口廊。"
  - "D 不再靠一条长竖直死胡同显式要求 d6。"
new_structure:
  - "lower ice 移到中轴 [7,7]。"
  - "B=[0,3] 与 D=[14,8] 分居左右，都是边界墙出口。"
  - "base 从 A=[0,8] 进入，站在 lower ice 下侧上推，把同一冰转为 row3 左推开 B 的资源。"
  - "meta 从 C=[14,1] 进入，站在 lower ice 上侧下推，把同一冰转为 bottom lane 右推开 D 的资源。"
geometry_read:
  - "两条 d6 发射线都从中轴到边界，长度接近必要下限，不再是过长死胡同。"
  - "底部横廊既是 A 的入场路径，也是 D 的发射/离场路径；不是纯装饰空间。"
known_tradeoffs:
  - "A 起点到中轴第一推有 7 步入场 walk。"
  - "C->A 仍可达；需作为 harmless back edge 或由大地图包装消解。"
```

## mechanism_scope

```yaml
central:
  base:
    - "A=[0,8] 沿底部进入中轴，从下侧上推 lower ice。"
    - "lower ice 先 d4 rebound 到 [7,4]，再 short-stop 到 row3，成为 B opener。"
    - "右上竖冰 short-stop 覆盖 target。"
    - "最后横向左推中轴冰，d6+ 摧毁 B=[0,3] 墙出口。"
  meta:
    - "C=[14,1] 先左推顶线冰，d6+ 摧毁内墙并触发 d4 rebound。"
    - "右上竖冰 short-stop 覆盖 target。"
    - "从上侧下推中轴 lower ice，short-stop 到底部横廊。"
    - "最后横向右推同一冰，d6+ 摧毁 D=[14,8] 墙出口。"
required_winning_path_events:
  base:
    - ice_destroy_group_d6_plus
    - ice_rebound_d4
    - ice_stop_short
  meta:
    - ice_destroy_group_d6_plus
    - ice_rebound_d4
    - ice_stop_short
```

## evidence

```yaml
solver_result:
  base:
    found: true
    cost: 33
    pushes: 4
    graph: "complete, reachable states=551, legal transitions=1158, winning states=2"
    returned_events:
      - ice_rebound_d4
      - ice_stop_short:d1
      - ice_stop_short:d1
      - ice_destroy_group_d6_plus:len1
      - ice_boundary_disappear_after_group
    scc: "branching_win_dag, solution irreversible steps=4, forcedWinPrefix=2/4"
  meta:
    found: true
    cost: 29
    pushes: 4
    graph: "complete, reachable states=1273, legal transitions=2688, winning states=2"
    returned_events:
      - ice_destroy_group_d6_plus:len1
      - slide_restart_after_group
      - ice_rebound_d4
      - ice_stop_short:d1
      - ice_stop_short:d1
      - ice_destroy_group_d6_plus:len1
      - ice_boundary_disappear_after_group
    scc: "branching_win_dag, solution irreversible steps=4, forcedWinPrefix=1/4"
winning_path_event_checks:
  base_required_latest:
    required: [ice_destroy_group_d6_plus, ice_rebound_d4, ice_stop_short]
    result: pass
    missing_required_path: not_found_complete_search
    explored: 549
    latest_reachable_knowledge: ice_destroy_group_d6_plus
    latest_required_all_winning: true
  meta_required_full:
    required: [ice_destroy_group_d6_plus, ice_rebound_d4, ice_stop_short]
    result: pass
    missing_required_path: not_found_complete_search
    explored: 1271
pair_policy:
  full_edge_scan:
    edge_goals_checked: 46
    legal_start_goal_instances_checked: 92
    all_pair_solves_complete_under_budget: true
    external_edge_escape: none
  target_pairs:
    A_to_B: solved
    C_to_D: solved_independent_right_wall_goal
  disclosed_non_target_interface_hits:
    - A_to_A
    - C_to_A
  rejected_bypass:
    A_to_D: complete_no_solution
evidence_limits:
  - "本版尚未完成独立 review。"
  - "C->A 仍可达；不是 D=A 回访，但需要 critic 判断大地图包装风险。"
  - "底部横廊承担入场和开 D 两个功能，但 base 仍有较长入场步行。"
```

证据引用：

```text
- prototypes/ice_slide_escape/reports/ICE_EXP_META_2026_07_02_round25_v1_midSwitch_layout.txt
- prototypes/ice_slide_escape/reports/layout_analysis_ICE_EXP_META_2026_07_02_round25_v1_midSwitch_base.md
- prototypes/ice_slide_escape/reports/layout_analysis_ICE_EXP_META_2026_07_02_round25_v1_midSwitch_meta.md
- prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_02_round25_v1_midSwitch_base_required_latest.md
- prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_02_round25_v1_midSwitch_meta_required_full.md
- prototypes/ice_slide_escape/reports/edge_goal_full_scan_ICE_EXP_META_2026_07_02_round25_v1_midSwitch_ABCD.md
```

## archive_taste_context

```yaml
examples:
  - candidate_id: ICE_CAND_0034
    human_reviewed: true
    aesthetic_score: 4
    difficulty_score: 2
    use: compact_meta_4_anchor
    human_comment_summary: >
      人类接受 compact meta 亮点候选：base 可薄，meta 约 3；关键是 meta
      对结构有真实改写，而不是只换入口。round25 通过同一中轴 lower ice
      的上下侧互斥操作强化重读。
  - candidate_id: ICE_CAND_0024
    human_reviewed: true
    aesthetic_score: 5
    difficulty_score: 3
    use: high_taste_strong_reuse_anchor
    human_comment_summary: >
      0024 的 5 分来自强空间/要素复用、base-time lure 与遮蔽；round25
      有更强的对称复用，但仍缺少同等遮蔽诱惑，暂不 claim 5。
  - candidate_id: ICE_CAND_0035
    human_reviewed: true
    aesthetic_score: 5
    difficulty_score: 4
    use: return_pressure_warning
    human_comment_summary: >
      0035 说明 compact return pressure 可高审美，但用户已明确指出当前 D=A
      回访动机弱；round25 继续保持 D 独立，并把重读集中到中轴资源互斥。
score_claim_allowed: true
controller_score_claim:
  aesthetic: "working_read_stronger_4_if_critic_accepts_bottom_lane_as_functional"
  difficulty:
    base: "working_read_3"
    meta: "working_read_3_minus_to_3"
```

## reviewer_questions

```yaml
evidence_reviewer:
  - "base 与 meta required d6+d4+short 是否由 complete search 支持。"
  - "A->D 是否确实不可解，且 full edge scan 是否无接口外边界逃逸。"
  - "C->A 是否已被正确标为非目标接口 caveat，而非隐藏 escape。"
puzzle_critic:
  - "中轴 switch 是否比 round24 竖井更自然、更不明示 d6。"
  - "底部横廊是否功能成立，还是仍读作长直道。"
  - "base/meta 难度是否满足一条 >=3 且两条都 >=2；整体审美 4 是否更稳，是否接近 5。"
```
