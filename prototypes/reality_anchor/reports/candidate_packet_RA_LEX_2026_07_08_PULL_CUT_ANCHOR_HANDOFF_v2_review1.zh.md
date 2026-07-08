# Candidate Packet: RA_LEX_2026_07_08_PULL_CUT_ANCHOR_HANDOFF_v2 review_1

```yaml
prototype_context:
  confirmed_rules:
    - P/L anchor divides push and pull regions by label side; fixed P/L can supply a static rule boundary.
    - B/S anchor divides box and sticky regions; moving B/S can normalize objects and can itself be pulled as a movable anchor.
    - Sticky blocks move as four-neighbor rigid bodies; crossing B/S can cut sticky cells into crates.
    - All targets must be covered by movable objects or anchors; player on target does not count.
  win_condition: all_targets_covered_by_objects
  object_and_event_semantics:
    target_covering_objects: [crate, sticky_block, push_pull_anchor, box_sticky_anchor]
    central_events:
      - pull_object
      - anchor_boundary_shift:box_sticky
      - sticky_to_box
      - move_sticky_rigid
      - force_chain
    incidental_reachable_but_not_claimed:
      - box_to_sticky
      - sticky_merge
  tool_boundary:
    tool_maturity: runtime-backed solver/analyzer available; raw sampler only; curated miner unavailable.
    maturity_ref: npx tsx src/cli.ts tool-maturity prototypes/reality_anchor

slot_brief:
  intended_role: challenge
  known_before: [K_runtime_smoke]
  target: [K_runtime_smoke]
  difficulty_or_support_expectation: "至少 difficulty 3；追求更高但不靠路线税。审美强 3 保底，追求 4。"

mechanic_exposure_context:
  mechanic_window: all_current_reality_anchor_runtime_rules
  allowed_exposure_through: all_current_reality_anchor_runtime_rules
  claimed_core_events:
    - pull_object
    - anchor_boundary_shift:box_sticky
    - sticky_to_box
    - move_sticky_rigid
    - force_chain

design_target:
  aesthetic_score_target: "strong 3 floor; 4 if critic accepts the handoff as a real insight"
  difficulty_score_target: "3 or higher"
  target_role_notes: >
    Compact lexicon-composition challenge. It should read as a state-role handoff:
    first cut sticky into two crates, then use one crate as a pull-side link so
    the B/S anchor can lift the other crate into the only goal.

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
  central:
    - fixed P/L region handoff: top row push phase, lower corridor pull phase
    - B/S cut of sticky pair into crates by leftward pushes across the boundary
    - pulled crate creates the final handle / spacer for pulling B/S upward
    - final B/S pull force-chain lifts the other crate into the sole upper target
  allowed_support:
    - ordinary crate pushes for allocation after the cut
    - small opening observation buffer
  incidental_allowed:
    - reachable but non-winning box_to_sticky / sticky_merge exploration
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
    The player must re-read the cut output as two future roles, not just as two
    boxes: one crate becomes the visible upper-target payload, while the other
    must be pulled in the P/L pull region to become the handle/spacer that lets
    the B/S anchor itself move upward and force-chain the payload into the target.
  causal_chain:
    - Sticky pair is pushed left across B/S, cutting into C+M and then CC.
    - The CC pair is shifted left far enough to split responsibilities.
    - One crate is pushed down/right into the lower pull corridor.
    - In the pull region, that crate is pulled right twice to stand between the player and B/S.
    - The final upward pull moves B/S and the crate chain together, lifting the upper crate into the only target.
  why_not_execution: >
    The non-obvious step is not raw route length. The final target is not reachable
    by simply pushing a crate up: the player needs the lower pull-region handle
    and must understand that pulling B/S is a productive final move, not a reset
    or side effect. The v1 lower target was removed because it did not add this
    responsibility.
  falsification:
    - A win missing pull_object, B/S shift, sticky_to_box, sticky rigid movement, or force_chain invalidates the claim.
    - Any reachable P/L anchor shift invalidates the fixed-region handoff claim.
    - If deleting the sole target or replacing the final B/S pull with ordinary push still wins, the player insight collapses.

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
  trace_summary:
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
      v1 lower target was removed; deleting upper target in v1 produced a 3-step
      bypass missing most core groups.
  object_or_instance_evidence:
    returned_trace_objects:
      - sticky pair moved and cut twice
      - two crates allocated into upper payload and lower pull handle
      - B/S anchor pulled in final force chain
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
      Reachable scan includes incidental box_to_sticky and sticky_merge, but no
      P/L anchor shift. The claim does not require winning-path box_to_sticky or
      sticky_merge.
  graph_or_counterfactual_evidence:
    graph_complete: true
    agency_initial_scc_size: 4
    winning_states: 1
    goal_prune_ref: prototypes/reality_anchor/reports/redundant_element_prune_RA_LEX_2026_07_08_PULL_CUT_ANCHOR_HANDOFF_v2.zh.md
  evidence_limits:
    - No unique-route claim beyond graph facts already stated.
    - No per-object identity necessity claim beyond returned trace role reading.
    - No claim that box_to_sticky or sticky_merge are required in all wins.

diagnostic_routing:
  hard_evidence:
    - all required event groups
    - graph completeness
    - fixed P/L reachable scan
    - v1 goal prune
  mechanism_scope:
    central: [pull handoff, B/S cut, final B/S force-chain]
    incidental: [reachable box_to_sticky, reachable sticky_merge]
  claim_hygiene:
    - Do not score as high-density all-mechanic challenge.
    - Attack whether final B/S pull is a real insight or just forced execution.
  taste_probes:
    - Compare against human comments for compact strong logic vs obvious anchor operation.
  scc_graph:
    - graph_status: complete
    - initial_scc_size: 4
    - winning_states: 1
    - forced_optimal_prefix: 8/8
  variant_family:
    archive_lineage_policy: fresh_required
    duplicate_risk: >
      Shares lexicon motifs with fixed B/S cut and P/L pull-handle entries, but
      not a variant of a specific archive candidate layout or route.
  start_position:
    opening_comfort: >
      Initial SCC size 4 gives small observation buffer; first irreversible move
      is not forced immediately by graph, but optimal route begins with the cut.
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
    The design uses current lexicon entries as grammar, not any archived layout,
    route, object-role assignment, or candidate repair.

attempt_log:
  serious_structural_attempts:
    - id: v1_dual_target
      result: lower target pruned as side-effect target
    - id: v2_single_target
      result: evidence-supported packet candidate
  local_repairs:
    - Removed lower target after goal-prune evidence.
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
    固定 B/S 切割输出两个 crate roles；一个成为上目标 payload，另一个在 P/L pull
    区域变成抽取把手，最终抽动 B/S 形成 force-chain，把 payload 顶进墙齿后的目标袋。

claim_last_review:
  mode: not_used
  facts_packet: null
  claim_packet: null
  read_order: not_applicable
```
