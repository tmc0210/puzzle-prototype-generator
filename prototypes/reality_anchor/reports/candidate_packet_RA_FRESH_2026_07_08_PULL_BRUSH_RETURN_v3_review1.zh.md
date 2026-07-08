# RA_FRESH_2026_07_08_PULL_BRUSH_RETURN_v3 候选包 review1

```yaml
prototype_context:
  confirmed_rules:
    - P/L anchor 按玩家输入时所处侧决定 push / pull。
    - B/S anchor 在 settle 阶段按边界把 box side 规格化为 crate，把 sticky side 规格化为 sticky block。
    - sticky block 正交邻接后作为刚体移动。
    - 胜利条件是所有目标被 crate、sticky block 或 anchor cell 覆盖；玩家站上目标不算覆盖。
  win_condition: all_targets_covered_by_objects
  object_and_event_semantics:
    pull_object: 发生过拉动对象或锚点。
    anchor_boundary_shift:box_sticky: B/S anchor 位置改变并重写材料边界。
    anchor_boundary_shift:push_pull: P/L anchor 位置改变并重写推拉边界。
    force_chain: 多对象或刚体/锚点链式受力。
    move_sticky_rigid: sticky 刚体移动。
    sticky_to_box: sticky 材料被 B/S 边界切回 box/crate。
  tool_boundary:
    - Analyzer / graph / event probes 是证据，不是质量 verdict。
    - 无 instance-level object participation；不声称具体对象实例在所有胜路中的身份必要性。
    - B/S shift >= 4 不成立；只声称 B/S shift 必经且 B/S shift >= 2 必经。

slot_brief:
  intended_role: challenge
  known_before:
    - Reality Anchor 基础规则
    - P/L push/pull side
    - B/S material normalization
    - sticky rigid movement
  target: fresh serious candidate for playable queue
  difficulty_or_support_expectation: difficulty >= 3, pursue higher; aesthetic >= 4, pursue 5

mechanic_exposure_context:
  mechanic_window: Reality Anchor dual-anchor challenge
  allowed_exposure_through: unrestricted within Reality Anchor current archive context
  claimed_core_events:
    - pull_object
    - anchor_boundary_shift:box_sticky
    - force_chain
    - move_sticky_rigid
    - sticky_to_box
    - anchor_boundary_shift:push_pull

design_target:
  aesthetic_score_target: 4 minimum, pursue 5
  difficulty_score_target: 3 minimum, pursue higher
  target_role_notes:
    - lower target consumes the first brush-tail material cut.
    - upper target forces a return phase where P/L anchor migration becomes necessary.
    - both targets are retained only because deletion drops shortest cost and bypasses core groups.

solve_instance:
  layout: |
    ###########
    #####P#####
    #####L#####
    ##...MM.G##
    ##@S.M...##
    ###B...G###
    #####...###
    ###########
  player_start: [3, 5]
  player_goal: null
  win_condition: all_targets_covered_by_objects

mechanism_scope:
  central:
    - P/L pull field extracts and later repositions anchors/material.
    - B/S moving boundary brushes sticky/crate identity and creates a lower target cut.
    - P/L anchor must later be migrated to cover the upper target.
  allowed_support:
    - walking/repositioning inside existing chamber
    - ordinary crate pulls after material cut
    - anchor cells covering targets
  incidental_allowed:
    - exact object instance identity
    - non-shortest alternative routes with lower B/S count
  required_winning_path_events:
    - pull_object
    - anchor_boundary_shift:box_sticky
    - force_chain
    - move_sticky_rigid
    - sticky_to_box
    - anchor_boundary_shift:push_pull
  forbidden_winning_path_events: []
  forbidden_if_seen_anywhere: []

design_claim:
  player_insight:
    - 第一段看似只是把 B/S anchor 向右拉刷出下目标，但这会把局面变成一个必须回收的债务状态。
    - 玩家需要意识到下目标不是终点；右上目标要求把 P/L anchor 从初始固定边界中释放并迁移到目标口。
    - 两个目标分别消费不同阶段：下目标消费 brush-tail cut，上目标消费 P/L anchor return。
  causal_chain:
    - 初始 5 步站位进入 pull 侧。
    - 右拉 B/S anchor 三次，触发 B/S boundary shift、force_chain 与 sticky rigid movement，制造右侧 sticky/box 尾部。
    - 向下拉 sticky 触发 sticky_to_box，覆盖下目标。
    - 返回左侧继续回拉 B/S anchor，重置/整理材料边界，为 P/L anchor 迁移创造空间。
    - 下拉 P/L anchor，短暂拉动 sticky 与 crate，切出可行站位。
    - 最后三次右推 P/L anchor，使 P cell 覆盖右上目标，同时下目标仍被对象覆盖。
  why_not_execution:
    - 只执行最近的向右刷尾会在第 9 步只解决下目标；删上目标时正是这个 9 步路径通关。
    - 只保留上目标时第 8 步即可通关，绕过 sticky_to_box 与 P/L shift；双目标才迫使两段状态消费同时成立。
    - 最短解 34 步，完整图 104786 states；关键分支不是单按钮，而是先完成又不能停、再反向回收的双阶段目标责任。
  falsification:
    - 若存在缺少任一核心事件组的胜路，claim 不成立。
    - 若任一目标删除后不降低成本且核心事件仍必经，该目标应删除。
    - 若 critic 认为第二段只是路线税而非 P/L anchor return 洞见，应返工或降级。

evidence:
  commands_run:
    - npx tsx src/cli.ts explain-layout prototypes/reality_anchor prototypes/reality_anchor/reports/layout_RA_FRESH_2026_07_08_PULL_BRUSH_RETURN_v3.txt --id RA_FRESH_2026_07_08_PULL_BRUSH_RETURN_v3 --title "Fresh Pull Brush Return v3" --role challenge --support none --targets K_runtime_smoke --max-states 300000 --graph-max-states 300000 --max-depth 120 --write
    - npx tsx prototypes/reality_anchor/reports/probe_dual_axis_candidate.ts prototypes/reality_anchor/reports/layout_RA_FRESH_2026_07_08_PULL_BRUSH_RETURN_v3.txt RA_FRESH_2026_07_08_PULL_BRUSH_RETURN_v3_core6 300000 300 pull_event=pull_object bs_shift=anchor_boundary_shift:box_sticky force_chain=force_chain sticky_rigid=move_sticky_rigid material_cut=sticky_to_box pl_shift=anchor_boundary_shift:push_pull
    - npx tsx prototypes/reality_anchor/reports/probe_event_count.ts prototypes/reality_anchor/reports/layout_RA_FRESH_2026_07_08_PULL_BRUSH_RETURN_v3.txt RA_FRESH_2026_07_08_PULL_BRUSH_RETURN_v3_bs_shift_min2 anchor_boundary_shift:box_sticky 2 300000 300
    - npx tsx prototypes/reality_anchor/reports/probe_event_count.ts prototypes/reality_anchor/reports/layout_RA_FRESH_2026_07_08_PULL_BRUSH_RETURN_v3.txt RA_FRESH_2026_07_08_PULL_BRUSH_RETURN_v3_pl_shift_min2 anchor_boundary_shift:push_pull 2 300000 300
    - target deletion explain/probe for no_upper_goal and no_lower_goal variants
  solver_result:
    found: true
    shortest_cost: 34
    depth: 34
    explored_states: 1455
    inputs: up right right down down right right right down left left up up left left left up right right right down right left down right down left up left up up right right right
  trace_summary:
    event_counts:
      walk: 18
      pull_object:box_sticky_anchor: 6
      anchor_boundary_shift:box_sticky: 6
      force_chain:n2: 3
      move_sticky_rigid: 5
      pull_object:sticky#1: 3
      sticky_to_box:n1: 1
      pull_object:push_pull_anchor: 2
      anchor_boundary_shift:push_pull: 5
      sticky_to_box:n2: 1
      pull_object:crate#3: 1
      pull_object:crate#1: 1
      push_object:push_pull_anchor: 3
  target_events:
    K_runtime_smoke: detector not configured; runtime smoke only
  object_or_instance_evidence:
    instance_level_participation: not reported
    returned_trace_snapshots:
      - step 6-9: B/S brush tail and lower target material cut
      - step 21-34: P/L anchor migration and upper target cover
  winning_path_event_checks:
    core6_probe:
      status: complete
      found_bypass: false
      explored_states: 104941
      groups:
        pull_event: no bypass
        bs_shift: no bypass
        force_chain: no bypass
        sticky_rigid: no bypass
        material_cut: no bypass
        pl_shift: no bypass
    bs_shift_min2:
      status: complete
      found_bypass_below_count: false
      explored_states: 104908
    pl_shift_min2:
      status: complete
      found_bypass_below_count: false
      explored_states: 104786
    bs_shift_min4_negative_limit:
      status: found
      found_bypass_below_count: true
      matched_count: 2
      depth: 68
  reachable_event_exposure:
    graph_status: complete
    reachable_states: 104786
    legal_transitions: 247141
    winning_states: 670
  graph_or_counterfactual_evidence:
    agency_status: complete
    compressed_regions: 11319
    commitment_transitions: 29119
    solution_commitments: 20
    scc_solution_irreversible_steps: 15
    scc_forced_win_prefix: 2/15
    scc_handoff_scriptiness: 9/15 scripted, maxRun=6
    large_late_scc: s1800 has 14085 states before final P/L push sequence
  evidence_limits:
    - B/S shift >= 4 is false; do not claim it.
    - Long alternative routes exist; shortest trace is not unique-design proof.
    - No per-object all-solution identity proof.
    - Quality target still needs critic judgment.

diagnostic_routing:
  hard_evidence:
    - core6 all-solution event gate
    - B/S shift min2 and P/L shift min2 count gates
    - target deletion counterfactuals
  mechanism_scope:
    - dual anchor interaction
    - B/S material cut
    - P/L anchor return
  claim_hygiene:
    - no claim that B/S shift count 6 is necessary
    - no unique solution claim
    - no per-object identity claim
  taste_probes:
    - compare against RA_CAND_0022 compact insight and RA_CAND_0017 high-density endgame
    - attack using RA_CAND_0006 route-tax hardening and RA_CAND_0019 obvious execution lower bound
  scc_graph:
    - interpret high scriptiness carefully; it may be caveat if player-facing sequence feels rote
    - interpret large late SCC as optional maneuvering space, not automatic merit
  variant_family:
    - fresh; earlier v1/v2 in this attempt were target-responsibility failures, not submitted variants
  start_position:
    - initial SCC states=3; opening is constrained but not immediate object-touch
  prototype_specific_work:
    - goal_prune_check required before queue
    - opening_comfort_check required if opening is judged too forced
    - redundant_element_prune required before queue

prototype_specific_contracts:
  interface_pair_policy:
    declared_interface_points: []
    target_pairs: []
    ignored_pair_classes: []
    risky_pair_classes: []
  pair_diagnostics:
    ignored_pairs: []
    risky_pairs: []

archive_lineage_policy:
  default: fresh_required
  authorized_archive_variant_work:
    enabled: false
    authorized_by: null
    candidate_ids: []
    allowed_operations: []
  candidate_relation: fresh
  why_not_archive_variant:
    - Fresh layout was built from lexicon interface ideas, not from a human archive layout.
    - Archive entries are used only for taste calibration.

attempt_log:
  serious_structural_attempts:
    - v1/v2 pull-brush-tail: clean core event chain but target deletion showed one target was redundant.
    - v3 pull-brush-return: moved upper target to require P/L anchor return; both target deletions now drop cost and bypass claimed groups.
  local_repairs:
    - rejected v1 lower target because no-lower deletion stayed equivalent.
    - rejected v2 upper target because no-upper deletion stayed equivalent.
  abandoned_families:
    - L-shape piston was considered from lexicon but not used in this candidate.

archive_taste_context:
  examples:
    - id: RA_CAND_0022
      role: positive_high_anchor
      human_scores: aesthetic 5, difficulty 4
      human_basis: compact counterintuitive pull-anchor handoff; high space utilization and strong player insight.
    - id: RA_CAND_0017
      role: positive_high_difficulty_anchor
      human_scores: aesthetic 4, difficulty 5
      human_basis: high mechanism density and coupling; very hard endgame, not solved by human before watching answer.
    - id: RA_CAND_0006
      role: negative_hardening_anchor
      human_scores: aesthetic 2, difficulty 5
      human_basis: small goal-position hardening weakened mechanism beauty and inflated route difficulty.
    - id: RA_CAND_0019
      role: lower_bound_obvious_execution_anchor
      human_scores: aesthetic 2, difficulty 2
      human_basis: evidence complete but first push and later pulls were too obvious; simple application only.
  none_found_reason: null

claim_last_review:
  mode: not_used
  facts_packet: null
  claim_packet: null
  read_order: not_applicable
```

## Evidence Refs

```text
prototypes/reality_anchor/reports/layout_RA_FRESH_2026_07_08_PULL_BRUSH_RETURN_v3.txt
prototypes/reality_anchor/reports/layout_analysis_RA_FRESH_2026_07_08_PULL_BRUSH_RETURN_v3.md
prototypes/reality_anchor/reports/event_probe_RA_FRESH_2026_07_08_PULL_BRUSH_RETURN_v3_core6.md
prototypes/reality_anchor/reports/event_count_probe_RA_FRESH_2026_07_08_PULL_BRUSH_RETURN_v3_bs_shift_min2_anchor_boundary_shift_box_sticky_min2.md
prototypes/reality_anchor/reports/event_count_probe_RA_FRESH_2026_07_08_PULL_BRUSH_RETURN_v3_pl_shift_min2_anchor_boundary_shift_push_pull_min2.md
prototypes/reality_anchor/reports/event_count_probe_RA_FRESH_2026_07_08_PULL_BRUSH_RETURN_v3_bs_shift_min4_anchor_boundary_shift_box_sticky_min4.md
prototypes/reality_anchor/reports/layout_analysis_RA_FRESH_2026_07_08_PULL_BRUSH_RETURN_v3_no_upper_goal.md
prototypes/reality_anchor/reports/event_probe_RA_FRESH_2026_07_08_PULL_BRUSH_RETURN_v3_no_upper_goal_core6.md
prototypes/reality_anchor/reports/layout_analysis_RA_FRESH_2026_07_08_PULL_BRUSH_RETURN_v3_no_lower_goal.md
prototypes/reality_anchor/reports/event_probe_RA_FRESH_2026_07_08_PULL_BRUSH_RETURN_v3_no_lower_goal_core6.md
```

## Design Corpus Used

```yaml
allowed_design_corpus:
  - prototypes/reality_anchor/mechanism_lab/lexicon.md
specific_lexicon_interfaces:
  - B/S 移动边界刷产物：远程生成与门口消费
  - P/L pull 抽取把手
  - P/L 边界交接输出
considered_but_not_used:
  - P/L L形缺角活塞
excluded_sources:
  - prototypes/reality_anchor/mechanism_lab/runs/
archive_usage:
  - human archive entries used for taste calibration only, not as layout or causal-chain source
```
