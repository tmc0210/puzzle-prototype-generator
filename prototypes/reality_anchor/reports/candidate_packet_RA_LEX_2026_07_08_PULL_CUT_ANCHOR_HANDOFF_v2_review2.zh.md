# Candidate Packet: RA_LEX_2026_07_08_PULL_CUT_ANCHOR_HANDOFF_v2 review_2

```yaml
prototype_context:
  confirmed_rules:
    - P/L anchor divides push and pull regions by label side; this candidate uses it as a fixed region boundary.
    - B/S anchor divides box and sticky regions and may itself be moved or pulled.
    - Sticky blocks move as four-neighbor rigid bodies; crossing B/S can cut sticky cells into crates.
    - All targets must be covered by movable objects or anchors; player on target does not count.
  win_condition: all_targets_covered_by_objects
  object_and_event_semantics:
    target_covering_objects: [crate, sticky_block, push_pull_anchor, box_sticky_anchor]
    event_groups_claimed_all_wins:
      - pull_object
      - anchor_boundary_shift:box_sticky
      - sticky_to_box
      - move_sticky_rigid
      - force_chain
    returned_trace_role_reading_only:
      - upper crate as payload in the intended witness
      - lower crate as pull-side handle/spacer in the intended witness
      - final B/S pull as intended witness endpoint
  tool_boundary:
    tool_maturity: runtime-backed solver/analyzer available; raw sampler only; curated miner unavailable.

slot_brief:
  intended_role: challenge
  known_before: [K_runtime_smoke]
  target: [K_runtime_smoke]
  difficulty_or_support_expectation: "至少 difficulty 3；审美 strong 3 保底，追求 4 但不硬称 4。"

mechanic_exposure_context:
  mechanic_window: all_current_reality_anchor_runtime_rules
  allowed_exposure_through: all_current_reality_anchor_runtime_rules
  claimed_core_events:
    - pull_object
    - anchor_boundary_shift:box_sticky
    - sticky_to_box
    - move_sticky_rigid
    - force_chain
  non_claimed_reachable_events:
    - box_to_sticky
    - sticky_merge

design_target:
  aesthetic_score_target: "strong 3 floor; possible 4 only if human playtest reads the handoff"
  difficulty_score_target: "3"
  target_role_notes: >
    Compact lexicon-composition challenge. The intended player-side reading is a
    cut-output role handoff, but the hard evidence claim is deliberately limited
    to all-win event-group necessity and fixed P/L reachability facts.

solve_instance:
  id: RA_LEX_2026_07_08_PULL_CUT_ANCHOR_HANDOFF_v2
  layout: |-
    ##########
    #..G#...##
    #...MM@P##
    #.....#L##
    ###BS#####
    ##########
  player_start: [6, 2]
  player_goal: null
  win_condition: all_targets_covered_by_objects
  expected_trace:
    - input: left
      events: [push_object:sticky#1, move_sticky_rigid, sticky_to_box:n1]
    - input: left
      events: [push_object:sticky#1, force_chain:n2, move_sticky_rigid, sticky_to_box:n1]
    - input: left
      events: [push_object:crate#2, force_chain:n2]
    - input: up
      events: [walk]
    - input: left
      events: [walk]
    - input: left
      events: [walk]
    - input: down
      events: [push_object:crate#1]
    - input: right
      events: [push_object:crate#1]
    - input: down
      events: [walk]
    - input: right
      events: [pull_object:crate#2]
    - input: right
      events: [pull_object:crate#2]
    - input: up
      events: [pull_object:box_sticky_anchor, force_chain:n3, anchor_boundary_shift:box_sticky]

mechanism_scope:
  central_hard_claims:
    - every win requires pull_object
    - every win requires anchor_boundary_shift:box_sticky
    - every win requires sticky_to_box
    - every win requires move_sticky_rigid
    - every win requires force_chain
    - no reachable state produces anchor_boundary_shift:push_pull
  central_design_reading:
    - returned trace demonstrates a cut-output role handoff
    - critic should judge whether the handoff reads as player-facing insight
  allowed_support:
    - ordinary crate pushes for allocation after the cut
    - small opening observation buffer
  incidental_allowed:
    - reachable but non-required box_to_sticky and sticky_merge
  required_winning_path_events:
    - pull_object
    - anchor_boundary_shift:box_sticky
    - sticky_to_box
    - move_sticky_rigid
    - force_chain
  forbidden_winning_path_events: []
  forbidden_if_seen_anywhere:
    - anchor_boundary_shift:push_pull

design_claim:
  player_insight: >
    Intended player-facing insight: after the sticky pair is cut, the player is
    meant to treat the outputs as staged resources for a later P/L pull-side
    handoff, not merely as local boxes. This is a design-reading claim for the
    critic, not a tool-proved psychological fact.
  causal_chain: >
    Returned-trace witness: the sticky pair is pushed left across B/S and cut by
    sticky_to_box; the outputs are allocated through push and pull phases; the
    final pull of B/S plus force-chain covers the sole upper target. The packet
    does not claim all-solution object identity, exact order uniqueness, or
    per-object role necessity.
  why_not_execution: >
    The candidate is intended to be harder than a witness because the final state
    depends on using the P/L pull region and B/S movement together. Evidence
    supports the required event groups; critic remains responsible for judging
    whether this feels like insight rather than forced execution.
  falsification:
    - A complete winning path missing any required event group invalidates the hard mechanism claim.
    - A reachable P/L anchor shift invalidates the fixed P/L boundary claim.
    - Human/critic finding that the final B/S pull reads as obvious execution should cap the candidate below the aesthetic target.

evidence:
  commands_run:
    - npx tsx src/cli.ts tool-maturity prototypes/reality_anchor
    - npx tsx src/cli.ts explain-layout prototypes/reality_anchor prototypes/reality_anchor/reports/RA_LEX_2026_07_08_PULL_CUT_ANCHOR_HANDOFF_v2_layout.txt --id RA_LEX_2026_07_08_PULL_CUT_ANCHOR_HANDOFF_v2 --targets K_runtime_smoke --max-states 300000 --graph-max-states 300000 --write
    - npx tsx prototypes/reality_anchor/reports/probe_dual_axis_candidate.ts prototypes/reality_anchor/reports/RA_LEX_2026_07_08_PULL_CUT_ANCHOR_HANDOFF_v2_layout.txt RA_LEX_2026_07_08_PULL_CUT_ANCHOR_HANDOFF_v2_core 300000 80 push_pull_effect=pull_object box_sticky_anchor_shift=anchor_boundary_shift:box_sticky material_cut=sticky_to_box sticky_rigid=move_sticky_rigid force_chain=force_chain
    - npx tsx prototypes/reality_anchor/reports/probe_fixed_anchor_candidate.ts prototypes/reality_anchor/reports/RA_LEX_2026_07_08_PULL_CUT_ANCHOR_HANDOFF_v2_layout.txt RA_LEX_2026_07_08_PULL_CUT_ANCHOR_HANDOFF_v2_fixed_PL push_pull 300000 80 strong_material
  solver_result:
    found: true
    cost: 12
    graph_status: complete
    reachable_states: 1081
    legal_transitions: 2597
    winning_states: 1
    ref: prototypes/reality_anchor/reports/layout_analysis_RA_LEX_2026_07_08_PULL_CUT_ANCHOR_HANDOFF_v2.md
  trace_summary:
    returned_solution_only: true
    events:
      push_object:sticky#1: 2
      move_sticky_rigid: 2
      sticky_to_box:n1: 2
      force_chain:n2: 2
      push_object:crate#2: 1
      push_object:crate#1: 2
      pull_object:crate#2: 2
      pull_object:box_sticky_anchor: 1
      force_chain:n3: 1
      anchor_boundary_shift:box_sticky: 1
  target_events:
    target_count: 1
    goal_prune_summary: >
      v1 lower target was removed because deleting it preserved the trace and
      all event gates; deleting the upper target created a 3-step bypass.
    ref: prototypes/reality_anchor/reports/redundant_element_prune_RA_LEX_2026_07_08_PULL_CUT_ANCHOR_HANDOFF_v2.zh.md
  object_or_instance_evidence:
    instance_level_necessity_claimed: false
    returned_trace_role_reading:
      - sticky pair is cut in the returned trace
      - returned trace allocates two crates into different apparent roles
      - returned trace ends with B/S pull and force-chain
    limit: layout_analysis reports no instance-level object participation summary
  winning_path_event_checks:
    all_required_groups_probe:
      status: complete
      found_bypass: false
      groups:
        - push_pull_effect=pull_object
        - box_sticky_anchor_shift=anchor_boundary_shift:box_sticky
        - material_cut=sticky_to_box
        - sticky_rigid=move_sticky_rigid
        - force_chain=force_chain
      ref: prototypes/reality_anchor/reports/event_probe_RA_LEX_2026_07_08_PULL_CUT_ANCHOR_HANDOFF_v2_core.md
    fixed_pl_scan:
      status: complete
      forbidden_hits: none
      forbidden: anchor_boundary_shift:push_pull
      ref: prototypes/reality_anchor/reports/fixed_anchor_probe_RA_LEX_2026_07_08_PULL_CUT_ANCHOR_HANDOFF_v2_fixed_PL.md
  reachable_event_exposure:
    complete_scan_ref: prototypes/reality_anchor/reports/fixed_anchor_probe_RA_LEX_2026_07_08_PULL_CUT_ANCHOR_HANDOFF_v2_fixed_PL.md
    notes: >
      Reachable box_to_sticky and sticky_merge are non-claimed incidental events.
      P/L anchor shift is not reachable.
  graph_or_counterfactual_evidence:
    graph_complete: true
    agency_initial_scc_size: 4
    winning_states: 1
    scc_shape: branching_win_dag
  evidence_limits:
    - No unique-route claim.
    - No all-solution per-object role or identity claim.
    - No exact event order necessity claim beyond returned trace.
    - No tool proof of player insight or puzzle quality.

diagnostic_routing:
  hard_evidence:
    - all required event groups
    - graph completeness
    - fixed P/L reachable scan
    - v1 goal prune
  mechanism_scope:
    central: [pull_object, B/S shift, sticky_to_box cut, sticky rigid move, force_chain]
    returned_trace_reading: [cut-output handoff, final B/S pull]
    incidental: [reachable box_to_sticky, reachable sticky_merge]
  claim_hygiene:
    - Review_2 explicitly removes per-object and exact-order overclaims.
  taste_probes:
    - Critic should attack whether final B/S pull reads as insight or execution.
  scc_graph:
    - graph_status: complete
    - initial_scc_size: 4
    - winning_states: 1
    - forced_optimal_prefix: 8/8
  variant_family:
    archive_lineage_policy: fresh_required
    duplicate_risk: lexicon motif reuse only, not archive variant work
  start_position:
    opening_comfort: "Initial SCC size 4; compact but not zero-buffer."
  prototype_specific_work:
    goal_prune: completed_v1_to_v2
    redundant_element_prune: completed

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
  why_not_archive_variant: >
    The design uses current lexicon entries as grammar, not an archived layout,
    route, object-role assignment, or candidate repair.

attempt_log:
  serious_structural_attempts:
    - id: v1_dual_target
      result: lower target pruned as side-effect target
    - id: v2_single_target_review1
      result: evidence reviewer required claim downgrade
    - id: v2_single_target_review2
      result: revised claim; same layout and evidence
  local_repairs:
    - Removed v1 lower target.
    - Downgraded claim after evidence review_1.
  abandoned_families:
    - Pure B/S brush samples: too event-witness-like and often graph-exhausted.
    - Fixed minimal split-tail: too close to low-difficulty teaching witness.

archive_taste_context:
  examples:
    - candidate_id: RA_CAND_0015
      human_reviewed: true
      aesthetic_score: 4
      difficulty_score: 3
      human_comment: >
        同时要求对锚点和箱子的推拉应用，在简洁的结构中实现了充分的机制覆盖和清晰的逻辑链。
      use: positive_anchor_for_compact_difficulty_3_logic
    - candidate_id: RA_CAND_0018
      human_reviewed: true
      aesthetic_score: 3
      difficulty_score: 2
      human_comment: >
        固定锚点切割简单过渡关，审美升到3分的原因是有一个不算显然的回推动作。
      use: lower_bound_anchor_for_fixed_BS_cut
    - candidate_id: RA_CAND_0019
      human_reviewed: true
      aesthetic_score: 2
      difficulty_score: 2
      human_comment: >
        利用移动锚点切割的水关，第一步的推锚点和之后的两步拉过于显然。
      use: negative_anchor_for_obvious_anchor_operation
    - candidate_id: RA_CAND_0006
      human_reviewed: true
      aesthetic_score: 2
      difficulty_score: 5
      human_comment: >
        用较小的目标位置改动极大地弱化机制美感并增加了腾挪难度，这种增加难度的方式实为较差的反例。
      use: negative_anchor_for_route_tax_or_goal_hardening
  none_found_reason: null

lexicon_usage:
  source_file: prototypes/reality_anchor/mechanism_lab/lexicon.md
  runs_directory_read: false
  entries_used:
    - "固定 B/S 切割：C+M 尾巴与单格目标袋"
    - "P/L pull 抽取把手：前格门、footprint 门与扫带"
    - "B/S 移动边界刷产物：远程生成与门口消费"
    - "刚体黏块 + 墙口：反向施力格谱系"
  composition_sentence: >
    固定 B/S 切割给出 returned-trace 的 crate-role handoff；P/L pull 区域提供
    抽取把手，最终 B/S force-chain 将 returned-trace payload 顶入目标袋。

claim_last_review:
  mode: not_used
  facts_packet: null
  claim_packet: null
  read_order: not_applicable
```
