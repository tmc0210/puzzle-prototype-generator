# Serious Candidate Packet: ICE_EXP_META_2026_07_02_round24_v1_verticalD

本文件是回应“D->A 回访动机弱”的结构改版送审候选包，不是通过结论。

```yaml
packet_status: ready_for_review_input
candidate_id: ICE_EXP_META_2026_07_02_round24_v1_verticalD
prototype: ice_slide_escape
source_candidate: ICE_EXP_META_2026_07_02_round23_v3_tight
revision_reason: "人类指出 D=A / D->A 回访从大地图连通上动机不足；本版把 D 改为独立下边界墙出口。"
review_loop_state_before_review: self_review_candidate
review_integrity_before_review: self_review_only
archive_eligibility_before_review: human_pending
archive_lineage_policy:
  default: fresh_required
  candidate_relation: structural_revision_of_current_unarchived_candidate
```

## solve_instances

```yaml
layout_ref: prototypes/ice_slide_escape/reports/ICE_EXP_META_2026_07_02_round24_v1_verticalD_layout.txt
layout: |
  ###############
  #....#......IG.
  ###########.#I#
  #.............#
  ############..#
  ############.##
  ############.##
  ############I.#
  ############...
  ############.##
  ############.##
  ############.##
  ############.##
  ############.##
  ###############
interfaces:
  A: [14, 8]
  B: [0, 3]
  C: [14, 1]
  D: [12, 14]
same_cell_interfaces: []
base_instance:
  player_start: [14, 8]
  player_goal: [0, 3]
meta_instance:
  player_start: [14, 1]
  player_goal: [12, 14]
```

## structural_delta

```yaml
compared_to: ICE_EXP_META_2026_07_02_round23_v3_tight
intent:
  - "取消 D=A，同格回访不再作为 meta 目标。"
  - "lower ice 下移一格，使 A 只能从下侧把它上推用于 B，C 才能从上侧把它下推用于 D。"
  - "在 x12 增加下方竖井，D=[12,14] 是初始墙出口；C->D 有明确的下方新出口语义。"
  - "阻断 x12,y2，同时开 x11,y2 作为 C 侧下行口，防止 A 在 base 后从上方反推 lower ice 偷开 D。"
known_tradeoffs:
  - "高度从 9 增到 15；新增竖井不是自由冗余，但会形成长尾步行。"
  - "C 完成 D opener 后仍可到 A=[14,8]，作为非目标接口回返 caveat 明示；A->D 已不可解。"
```

## mechanism_scope

```yaml
central:
  base:
    - "A=[14,8] 从 lower ice 下侧进入，先上推 lower ice，触发 d4 rebound，把它放到右侧中轴。"
    - "同一 lower ice 再被上推一次 short-stop 到 row3，成为开 B 的水平发射资源。"
    - "右上竖冰 short-stop 覆盖 target。"
    - "最后左推 row3 冰，d6+ 摧毁 B=[0,3] 墙并离开。"
  meta:
    - "C=[14,1] 先左推顶线冰，d6+ 摧毁左侧内墙，并以 d4 rebound 留下可见改写。"
    - "从 x11,y2 侧口下行，推动右上竖冰 short-stop 覆盖 target。"
    - "再从 lower ice 上侧下推，d6+ 打开 D=[12,14] 下边界墙出口。"
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
    cost: 23
    pushes: 4
    graph: "complete, reachable states=275, legal transitions=572, winning states=2"
    returned_events:
      - ice_rebound_d4
      - ice_stop_short:d1
      - ice_stop_short:d1
      - ice_destroy_group_d6_plus:len1
      - ice_boundary_disappear_after_group
    scc: "branching_win_dag, solution irreversible steps=4, forcedWinPrefix=2/4"
  meta:
    found: true
    cost: 21
    pushes: 3
    graph: "complete, reachable states=706, legal transitions=1470, winning states=2"
    returned_events:
      - ice_destroy_group_d6_plus:len1
      - slide_restart_after_group
      - ice_rebound_d4
      - ice_stop_short:d1
      - ice_destroy_group_d6_plus:len1
      - ice_boundary_disappear_after_group
    scc: "branching_win_dag, solution irreversible steps=3, forcedWinPrefix=1/3"
winning_path_event_checks:
  base_required_latest:
    required: [ice_destroy_group_d6_plus, ice_rebound_d4, ice_stop_short]
    result: pass
    missing_required_path: not_found_complete_search
    explored: 273
    latest_reachable_knowledge: ice_destroy_group_d6_plus
    latest_required_all_winning: true
  meta_required_full:
    required: [ice_destroy_group_d6_plus, ice_rebound_d4, ice_stop_short]
    result: pass
    missing_required_path: not_found_complete_search
    explored: 704
pair_policy:
  full_edge_scan:
    edge_goals_checked: 56
    legal_start_goal_instances_checked: 112
    all_pair_solves_complete_under_budget: true
    external_edge_escape: none
  target_pairs:
    A_to_B: solved
    C_to_D: solved_independent_bottom_wall_goal
  disclosed_non_target_interface_hits:
    - A_to_A
    - C_to_A
  rejected_bypass:
    A_to_D: complete_no_solution
evidence_limits:
  - "本版尚未完成独立 review。"
  - "C->A 仍可达；不是 D=A 回访，但需要 critic 判断大地图包装风险。"
  - "竖井拉高版面，审美 4 下界需由 critic 复核。"
```

证据引用：

```text
- prototypes/ice_slide_escape/reports/ICE_EXP_META_2026_07_02_round24_v1_verticalD_layout.txt
- prototypes/ice_slide_escape/reports/layout_analysis_ICE_EXP_META_2026_07_02_round24_v1_verticalD_base.md
- prototypes/ice_slide_escape/reports/layout_analysis_ICE_EXP_META_2026_07_02_round24_v1_verticalD_meta.md
- prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_02_round24_v1_verticalD_base_required_latest.md
- prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_02_round24_v1_verticalD_meta_required_full.md
- prototypes/ice_slide_escape/reports/edge_goal_full_scan_ICE_EXP_META_2026_07_02_round24_v1_verticalD_ABCD.md
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
      对结构有真实改写，而不是只换入口。round24 的目标是把 D 语义改得更自然，
      不以空间极致压缩取胜。
  - candidate_id: ICE_CAND_0024
    human_reviewed: true
    aesthetic_score: 5
    difficulty_score: 3
    use: high_taste_strong_reuse_anchor
    human_comment_summary: >
      0024 的 5 分来自强空间/要素复用、base-time lure 与遮蔽；round24 复用 lower ice
      的双身份，但没有同等层级的遮蔽惊喜，暂不 claim 5。
  - candidate_id: ICE_CAND_0035
    human_reviewed: true
    aesthetic_score: 5
    difficulty_score: 4
    use: return_pressure_warning
    human_comment_summary: >
      0035 说明 compact return pressure 可高审美，但用户已明确指出当前 D=A
      回访动机弱；round24 因此放弃同格回访，改用独立下方出口。
score_claim_allowed: true
controller_score_claim:
  aesthetic: "working_read_4_if_critic_accepts_vertical_shaft_semantic_payoff"
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
  - "独立 D 竖井是否解决了 D=A 回访动机弱的问题。"
  - "竖井新增空间是否读作功能性出口，还是重新引入冗余/长尾。"
  - "base/meta 难度是否满足一条 >=3 且两条都 >=2；整体审美 4 是否稳。"
```
