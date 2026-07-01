# Serious Candidate Packet: ICE_EXP_META_2026_07_02_round23_v3_tight

本文件是空间压缩后的送审候选包，不是通过结论。

```yaml
packet_status: ready_for_review_input
candidate_id: ICE_EXP_META_2026_07_02_round23_v3_tight
prototype: ice_slide_escape
source_candidate: ICE_EXP_META_2026_07_02_round23_v2
revision_reason: "人类指出空间冗余；本版压缩宽度并墙化无用空域。"
review_loop_state_before_review: self_review_candidate
review_integrity_before_review: self_review_only
archive_eligibility_before_review: human_pending
archive_lineage_policy:
  default: fresh_required
  candidate_relation: optimized_revision_of_current_unarchived_candidate
```

## solve_instances

```yaml
layout_ref: prototypes/ice_slide_escape/reports/ICE_EXP_META_2026_07_02_round23_v3_tight_layout.txt
layout: |
  ###############
  #....#......IG.
  ############.I#
  #.............#
  ############..#
  ############.##
  ############I.#
  ############...
  ###############
interfaces:
  A: [14, 7]
  B: [0, 3]
  C: [14, 1]
  D: [14, 7]
same_cell_interfaces:
  - D_equals_A
base_instance:
  player_start: [14, 7]
  player_goal: [0, 3]
meta_instance:
  player_start: [14, 1]
  player_goal: [14, 7]
```

## optimization_delta

```yaml
compared_to: ICE_EXP_META_2026_07_02_round23_v2
layout_size:
  v2: "18x9"
  v3_tight: "15x9"
  width_delta: "-3 columns"
space_change:
  - "删除中部 3 列空域，保留顶线 d6+ -> d4 所需距离。"
  - "把 row2 / row4 / row5 / row6 / row7 左侧无用空间墙化，只保留 row3 d6 开 B 长廊和右侧换位竖井。"
  - "A/D、C、B 坐标随压缩重映射；D=A 同格接口保留。"
evidence_delta:
  base_reachable_states:
    v2: 5490
    v3_tight: 154
  meta_reachable_states:
    v2: 2920
    v3_tight: 548
  base_cost:
    v2: 25
    v3_tight: 22
  meta_cost:
    v2: 14
    v3_tight: 14
risk_delta:
  - "空间更干净，但 base / meta 的自由游走与旁支明显减少，可能显得走廊化。"
  - "base winning states 从 2 降到 1；若 critic 认为压缩导致过度脚本化，应回退到较温和的 crop3-open 版本。"
```

## mechanism_scope

```yaml
central:
  base:
    - "从 A=[14,7] 进入，先上推底部冰，触发 no-chain + d4 rebound，把冰放到 row3 长廊。"
    - "再上推右上竖冰，用 d1 short-stop 覆盖唯一 target。"
    - "最后左推 row3 冰，d6+ 摧毁 B=[0,3] 墙并离开。"
  meta:
    - "从 C=[14,1] 进入，先左推顶线冰，d6+ 摧毁内墙并在左侧外墙前 d4 rebound。"
    - "再用同一右上竖冰 short-stop 填 target。"
    - "最后消费右下低位冰 short-stop，把旧 A 读成 D 出口。"
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
    cost: 22
    pushes: 3
    graph: "complete, reachable states=154, legal transitions=330, winning states=1"
    returned_events:
      - ice_blocks_ice_no_chain_push
      - ice_rebound_d4
      - ice_stop_short:d1
      - ice_destroy_group_d6_plus:len1
      - ice_boundary_disappear_after_group
  meta:
    found: true
    cost: 14
    pushes: 3
    graph: "complete, reachable states=548, legal transitions=1159, winning states=2"
    returned_events:
      - ice_destroy_group_d6_plus:len1
      - slide_restart_after_group
      - ice_rebound_d4
      - ice_stop_short:d1
      - ice_stop_short:d1
winning_path_event_checks:
  base_required_latest:
    required: [ice_destroy_group_d6_plus, ice_rebound_d4, ice_stop_short]
    result: pass
    missing_required_path: not_found_complete_search
    explored: 153
    latest_reachable_knowledge: ice_destroy_group_d6_plus
    latest_required_all_winning: true
  meta_required_full:
    required: [ice_destroy_group_d6_plus, ice_rebound_d4, ice_stop_short]
    result: pass
    missing_required_path: not_found_complete_search
    explored: 546
pair_policy:
  full_edge_scan:
    edge_goals_checked: 44
    legal_start_goal_instances_checked: 88
    all_pair_solves_complete_under_budget: true
    external_edge_escape: none
  target_pairs:
    A_to_B: solved
    C_to_D: solved_same_cell_as_A
graph_or_counterfactual_evidence:
  base_scc: "branching_win_dag, solution irreversible steps=3, forcedWinPrefix=1/3"
  meta_scc: "branching_win_dag, solution irreversible steps=3, forcedWinPrefix=1/3"
evidence_limits:
  - "本版尚未完成独立 review。"
  - "空间压缩可能提升审美干净度，也可能降低读题空间与难度感；需要 critic 判断。"
```

证据引用：

```text
- prototypes/ice_slide_escape/reports/ICE_EXP_META_2026_07_02_round23_v3_tight_layout.txt
- prototypes/ice_slide_escape/reports/layout_analysis_ICE_EXP_META_2026_07_02_round23_v3_tight_base.md
- prototypes/ice_slide_escape/reports/layout_analysis_ICE_EXP_META_2026_07_02_round23_v3_tight_meta.md
- prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_02_round23_v3_tight_base_required_latest.md
- prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_02_round23_v3_tight_meta_required_full.md
- prototypes/ice_slide_escape/reports/edge_goal_full_scan_ICE_EXP_META_2026_07_02_round23_v3_tight_ABCD.md
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
      对结构有真实改写，而不是只换入口。v3_tight 的目标是成为更干净的
      compact 4，而不是高厚度 5。
  - candidate_id: ICE_CAND_0024
    human_reviewed: true
    aesthetic_score: 5
    difficulty_score: 3
    use: high_taste_strong_reuse_anchor
    human_comment_summary: >
      0024 的 5 分来自强空间/要素复用、base-time lure 与遮蔽；v3_tight
      明显更管线化、更短，不应自称 5。
  - candidate_id: ICE_CAND_0035
    human_reviewed: true
    aesthetic_score: 5
    difficulty_score: 4
    use: compact_return_pressure_warning
    human_comment_summary: >
      0035 说明 compact return pressure 可高审美，但依赖自然发现包装和地图语境；
      v3_tight 只借鉴“旧入口可被回访读成出口”的抽象教训，不能借此自动升 5。
score_claim_allowed: true
controller_score_claim:
  aesthetic: "working_read_4_lower_bound_if_critic_accepts_tight_corridor_tradeoff"
  difficulty:
    base: "working_read_low_3"
    meta: "working_read_2_plus"
```

## reviewer_questions

```yaml
evidence_reviewer:
  - "压缩后 base 最新可达 d6+ 是否仍被所有 A->B 胜利路径使用。"
  - "base/meta required d6+d4+short 是否仍由 complete search 支持。"
  - "D=A 同格接口与 full edge scan 是否仍 clean。"
puzzle_critic:
  - "空间压缩是否修复 v2 的冗余，还是把关卡压成过度脚本化走廊。"
  - "base 是否仍能读作低位 3，meta 是否仍不低于 2。"
  - "整体审美是否比 v2 更稳地达到 4，或因墙化过重而需要回退到温和压缩。"
```
