# Candidate Packet: RA_EXP_2026_07_04_SOFT_HANDOFF_v2

```yaml
review_iteration: review_1
candidate_version: RA_EXP_2026_07_04_SOFT_HANDOFF_v2
review_input_type: candidate_version
prototype: reality_anchor
packet_status: ready_for_independent_review
```

## Prototype Context

```yaml
prototype_context:
  confirmed_rules:
    - P/L 是可移动二格推拉锚点；P 侧按 push 处理，L 侧按 pull 处理。
    - B/S 是可移动二格箱/黏锚点；B 侧为箱，S 侧为黏，移动后全局归一化。
    - 黏块四邻接自动合并，作为刚体移动；进入箱侧会 split/转箱。
    - 任意目标必须由 crate、sticky block 或 anchor cell 覆盖；玩家站在目标上不计。
  win_condition: all_targets_covered_by_objects
  object_and_event_semantics:
    - anchor_boundary_shift: 锚点发生平移，事件带 push_pull 或 box_sticky 类型后缀。
    - pull_object: pull-side 输入拉动身后一格对象。
    - box_to_sticky / sticky_to_box: B/S 边界结算导致材料归一化。
    - move_sticky_rigid: 黏块作为刚体被移动。
  tool_boundary:
    - runtime adapter: implemented
    - solver/layout analyzer/graph: implemented
    - raw sampler/search: only structural material, not quality verdict
    - curated miner/PuzzleScript exporter: unavailable
```

## Slot Brief

```yaml
slot_brief:
  intended_role: challenge
  known_before: [K_runtime_smoke]
  target: [K_runtime_smoke]
  difficulty_or_support_expectation: >
    本轮用户要求较上一轮候选难度稍低。目标是后期组合规则已知后的短链挑战，
    不追求 PHASE_FERRY_v8 那样的长程 ferry 或六事件全包。
mechanic_exposure_context:
  mechanic_window: all_current_reality_anchor_runtime_rules
  allowed_exposure_through: all_current_reality_anchor_runtime_rules
  claimed_core_events:
    - push_pull_anchor_shift
    - box_sticky_anchor_shift
    - pull_event
    - material_normalization
    - sticky_rigid_move
design_target:
  aesthetic_score_target: unscored_missing_human_archive_context
  difficulty_score_target: unscored_missing_human_archive_context
  score_claim_allowed: false
  target_role_notes: >
    比最近的高难候选短、更少回返；仍要求两个不同锚点都被玩家理解和必要化。
```

## Solve Instance

```yaml
solve_instance:
  player_start: [6, 1]
  player_goal: null
  win_condition: all_targets_covered_by_objects
  push_pull_anchor: horizontal
  box_sticky_anchor: horizontal
```

```text
#########
#...G.@.#
#C.GLP.##
#BS#.#..#
#########
```

## Mechanism Scope

```yaml
mechanism_scope:
  central:
    - push_pull_anchor_shift
    - box_sticky_anchor_shift
    - pull_event
    - material_normalization
    - sticky_rigid_move
  allowed_support:
    - anchor_target_cover
    - short repositioning walks
    - force_chain
  incidental_allowed: []
  required_winning_path_events:
    - anchor_boundary_shift:push_pull
    - anchor_boundary_shift:box_sticky
    - pull_object
    - box_to_sticky|sticky_to_box
    - move_sticky_rigid
  forbidden_winning_path_events: []
  forbidden_if_seen_anywhere:
    - runtime_error
  not_claimed:
    - unique_solution
    - object_instance_identity_across_all_wins
    - sticky_merge
```

## Design Claim

```yaml
design_claim:
  player_insight: >
    玩家要把短横向走廊读成“先 B/S 材料换相，再 P/L 目标收束”：B/S 把左侧
    crate 带上来并转成 sticky，sticky 被拉到上目标；P/L 最后平移覆盖下目标。
  causal_chain:
    - 右侧起点迫使玩家先去左入口，不能直接用 P/L 结束。
    - 向上拉 B/S 时，左侧 crate 被带上来，形成可被拉过上目标的材料。
    - 向右拉 crate 触发 box_to_sticky，随后 sticky rigid move 把它放到上目标。
    - 最后向左推 P/L，锚点覆盖下目标并完成胜利。
  why_not_execution: >
    路线短，但两目标分别消费两个锚点的结果：上目标消费 B/S 生成的 sticky，
    下目标消费 P/L 的位置。若玩家只按近处 affordance 处理某一个锚点，无法
    同时覆盖两个目标。
  falsification:
    - 任一核心事件组存在胜路绕过。
    - 完整图不 complete，导致 all-solution 必要性未知。
    - critic 判断初始横向走位只是 padding，机制链不足以支撑 challenge role。
```

## Evidence

```yaml
evidence:
  commands_run:
    - npx tsx src/cli.ts explain-layout prototypes/reality_anchor prototypes/reality_anchor/reports/RA_EXP_2026_07_04_SOFT_HANDOFF_v2_layout.txt --id RA_EXP_2026_07_04_SOFT_HANDOFF_v2 --title "Soft handoff v2" --role challenge --support none --targets K_runtime_smoke --max-states 300000 --graph-max-states 300000 --write
    - npx tsx prototypes/reality_anchor/reports/probe_dual_axis_candidate.ts prototypes/reality_anchor/reports/RA_EXP_2026_07_04_SOFT_HANDOFF_v2_layout.txt RA_EXP_2026_07_04_SOFT_HANDOFF_v2 300000 50 "push_pull_anchor_shift=anchor_boundary_shift:push_pull" "box_sticky_anchor_shift=anchor_boundary_shift:box_sticky" "pull_event=pull_object" "material_normalization=box_to_sticky|sticky_to_box" "sticky_rigid_move=move_sticky_rigid"
    - npx tsx prototypes/reality_anchor/reports/trace_layout.ts prototypes/reality_anchor/reports/RA_EXP_2026_07_04_SOFT_HANDOFF_v2_layout.txt RA_EXP_2026_07_04_SOFT_HANDOFF_v2
    - npx tsx src/cli.ts explain-level prototypes/reality_anchor RA_EXP_2026_07_04_SOFT_HANDOFF_v2 --max-states 300000 --graph-max-states 300000 --write
    - npm run check
  solver_result:
    found: true
    cost: 12
    depth: 12
    explored_states: 67
    inputs: left left left left down up right right right right down left
    events: >
      walk walk walk walk walk pull_object:box_sticky_anchor force_chain:n2
      anchor_boundary_shift:box_sticky pull_object:crate#1 box_to_sticky:n1
      pull_object:sticky#1 move_sticky_rigid pull_object:sticky#1
      move_sticky_rigid walk walk push_object:push_pull_anchor
      anchor_boundary_shift:push_pull
  trace_summary:
    - step_6_up: B/S 被向上拉，crate 被带到上排。
    - step_7_right: crate 被右拉并触发 box_to_sticky。
    - step_8_9_right_right: sticky 刚体移动到上目标。
    - step_12_left: P/L 左移，锚点覆盖下目标，胜利。
  target_events:
    returned_solution_covers:
      - anchor_boundary_shift:box_sticky
      - box_to_sticky
      - move_sticky_rigid
      - anchor_boundary_shift:push_pull
  object_or_instance_evidence:
    instance_level_participation: not_reported_by_tool
    object_identity_claim: not_claimed
  winning_path_event_checks:
    combined_probe:
      status: complete
      found_bypass: false
      explored_states: 105
      groups:
        - push_pull_anchor_shift
        - box_sticky_anchor_shift
        - pull_event
        - material_normalization
        - sticky_rigid_move
    individual_probes:
      push_pull_anchor_shift: {status: complete, found_bypass: false, explored_states: 90}
      box_sticky_anchor_shift: {status: complete, found_bypass: false, explored_states: 90}
      pull_event: {status: complete, found_bypass: false, explored_states: 104}
      material_normalization: {status: complete, found_bypass: false, explored_states: 103}
      sticky_rigid_move: {status: complete, found_bypass: false, explored_states: 104}
  reachable_event_exposure:
    graph_status: complete
    reachable_states: 90
    legal_transitions: 177
    event_only_illegal_transitions: 0
    winning_states: 7
  graph_or_counterfactual_evidence:
    graph_status: complete
    agency_status: complete
    compressed_regions: 17
    winning_regions: 1
    solution_irreversible_path_steps: 5
    forced_win_prefix: 5/5
    win_subgraph_shape: one_win_continuation_per_scc
    counterfactuals: none_configured
  evidence_limits:
    - Analyzer reports no instance-level participation; packet does not claim per-object necessity.
    - Full all-solution event gates are only for named event groups, not for exact input order.
    - No human playtest; player insight remains critic-facing.
```

## Key Snapshots

```text
Step 0
#########
#...G.@.#
#C.GLP.##
#BS#.#..#
#########

Step 6 after up: pull B/S, bring crate up
#########
#C@.G...#
#BSGLP.##
#..#.#..#
#########

Step 7 after right: crate becomes sticky
#########
#.M@G...#
#BSGLP.##
#..#.#..#
#########

Step 9 after right: sticky covers upper target
#########
#...m@..#
#BSGLP.##
#..#.#..#
#########

Step 12 after left: P/L covers lower target, win
#########
#...m...#
#BSLP@.##
#..#.#..#
#########
```

## Diagnostic Routing

```yaml
diagnostic_routing:
  hard_evidence:
    - verify all-solution core event gates
    - verify graph complete status
    - verify no overclaim of object identity or unique route
  mechanism_scope:
    - central event groups only; sticky_merge explicitly not claimed
  claim_hygiene:
    - score_claim_allowed: false
    - object identity not claimed
    - uniqueness not claimed
  taste_probes:
    - attack whether opening walk to left entrance feels like padding
    - attack whether short forced chain is challenge-grade or only guided application
    - compare cautiously to RA_CAND_0001 human comment, without score inference
  scc_graph:
    - graph complete, 90 reachable states
    - one winning region and one_win_continuation_per_scc
    - forcedWinPrefix 5/5 must be interpreted through player-facing consequences
  variant_family:
    - fresh_required; not archive-derived
  start_position:
    - fixed player_start from layout
  prototype_specific_work:
    - design_handoff.yml not present; no prototype-specific workflow declared
```

## Prototype Specific Contracts

```yaml
prototype_specific_contracts:
  interface_pair_policy:
    declared_interface_points: []
    target_pairs: []
    ignored_pair_classes: []
    risky_pair_classes: []
  pair_diagnostics:
    ignored_pairs: []
    risky_pairs: []
```

## Archive Lineage Policy

```yaml
archive_lineage_policy:
  default: fresh_required
  authorized_archive_variant_work:
    enabled: false
    authorized_by: null
    candidate_ids: []
    allowed_operations: []
  candidate_relation: fresh
  why_not_archive_variant: >
    RA_CAND_0001 是三目标正交锁与下方把手链；本候选是两目标横向短链，
    B/S 先生成 sticky 覆盖上目标，P/L 最后覆盖下目标。未复用旧布局、
    对象角色、目标关系或主要因果链。
```

## Attempt Log

```yaml
attempt_log:
  serious_structural_attempts:
    - fresh_design_claim_RA_EXP_2026_07_04_SOFT_HANDOFF_v0.zh.md
    - search_soft_handoff_742011.md
    - search_soft_handoff_742012.md
    - search_soft_handoff_742013.md
    - search_soft_handoff_742014.md
  local_repairs:
    - altB_clean: 去掉闲置箱后仍可解，但胜态较多、读感更像练习关。
    - altA_clean: 去掉右上未消费 M 后保留 12 步核心链，选为 v2。
    - altC/altD: 可解且证据通过，但中段走位或静态对象噪声更明显。
  abandoned_families: []
```

## Archive Taste Context

```yaml
archive_taste_context:
  examples:
    - candidate_id: RA_CAND_0001
      human_reviewed: true
      archive_eligibility: clean_archive
      human_comment_id: HC_RA_CAND_0001_001
      human_scores:
        aesthetic_score: 4
        difficulty_score: 4
      human_comment: >
        机制使用多样、关卡设计密度高、各要素强耦合，玩家视角矛盾明显，
        综合质量较高的好关。
      use: positive_human_taste_anchor_only
      boundary: >
        只作口味参照；不授权复用布局、目标关系、对象角色或因果链。
  negative_anchor_none_found:
    reason: >
      Reality Anchor 当前 clean human-reviewed archive 只有 RA_CAND_0001 一个
      accepted 正例，没有低分、失败或下界人评条目。critic 不得输出分数化
      审美/难度结论，只能给非分数结构判断。
  none_found_reason: null
```

## Claim Last Review

```yaml
claim_last_review:
  mode: not_used
  facts_packet: not_split
  claim_packet: not_split
  read_order: not_applicable
```

## Evidence Refs

```text
- prototypes/reality_anchor/reports/design_claim_RA_EXP_2026_07_04_SOFT_HANDOFF_v2.zh.md
- prototypes/reality_anchor/reports/layout_analysis_RA_EXP_2026_07_04_SOFT_HANDOFF_v2.md
- prototypes/reality_anchor/reports/level_analysis_RA_EXP_2026_07_04_SOFT_HANDOFF_v2.md
- prototypes/reality_anchor/reports/event_probe_RA_EXP_2026_07_04_SOFT_HANDOFF_v2.md
- prototypes/reality_anchor/reports/trace_RA_EXP_2026_07_04_SOFT_HANDOFF_v2.md
- prototypes/reality_anchor/levels.yml
```
