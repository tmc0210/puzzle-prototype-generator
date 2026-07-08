# Candidate Packet: RA_LEX_2026_07_08_TRIBAR_CUT_TAIL_v1 / review_1

```yaml
prototype_context:
  confirmed_rules:
    - B/S anchor defines box side / sticky side; objects crossing the boundary normalize material during legal move resolution.
    - Sticky cells form orthogonally connected rigid components and move as one rigid body.
    - Sticky merging and material conversion may change a footprint from separate crates to one sticky bar, or from sticky bar to crate plus sticky tail.
    - Crate, sticky, and anchors can cover goals; player standing on a goal does not count.
    - No P/L anchor exists in this candidate.
  win_condition: all_targets_covered_by_objects
  object_and_event_semantics:
    C: crate / ordinary box-side material
    M: sticky cell / sticky-side material, merged by orthogonal adjacency
    B/S: fixed box-sticky boundary; in this layout the B/S anchor is sealed in the lower wall, so it supplies material semantics but does not move
    returned_trace_events:
      box_to_sticky:n1: one crate cell crosses to sticky side and becomes sticky
      sticky_merge:n1: a new sticky cell joins the existing sticky component
      move_sticky_rigid: the merged sticky component moves as a rigid body
      sticky_to_box:n1: one sticky cell crosses back to box side and becomes a crate
  tool_boundary:
    - Runtime adapter, solver, full graph, agency/SCC digest, trace replay, and local event probes are available.
    - PuzzleScript exporter is not used for this prototype.

slot_brief:
  intended_role: challenge / fresh lexicon-composition candidate
  known_before:
    - K_runtime_smoke
    - fixed B/S material normalization
    - sticky merge and sticky rigid movement
    - fixed B/S cutting into C plus sticky tail
  target:
    - 全新设计并提交合格候选加入试玩列表。
    - 难度至少 3，追求更高。
    - 审美强 3 保底，追求 4 到 5。
    - 本轮测试 designer 使用 mechanism_lab/lexicon.md 的设计语料能力；同目录 runs 不作为设计来源。
  difficulty_or_support_expectation: difficulty 3+ floor; aesthetic strong 3 floor, possible 4 only if critic accepts the three-crate binding debt and post-cut tail responsibility as more than route length.

mechanic_exposure_context:
  mechanic_window: full current Reality Anchor runtime
  allowed_exposure_through:
    - K_runtime_smoke
  claimed_core_events:
    - box_to_sticky:n1
    - sticky_merge:n1
    - move_sticky_rigid
    - sticky_to_box:n1
    - force_chain

design_target:
  aesthetic_score_target: "strong 3 floor; pursue 4 only if three-resource binding and C+MM split consumption read as elegant player-facing structure."
  difficulty_score_target: ">=3; pursuit is semantic timing and material-state planning, not pure route tax."
  target_role_notes: >
    Compact fixed B/S challenge composed from mechanism_lab/lexicon.md. Three initial crates become a
    three-cell sticky bar, are returned across the same boundary as C+MM, then the C and MM tail are
    consumed by two separate target responsibilities.

solve_instance:
  id: RA_LEX_2026_07_08_TRIBAR_CUT_TAIL_v1
  title: Tri-bar cut tail v1
  layout: |-
    ###########
    #@.#G######
    #.CCC....G#
    ####.....##
    ####BS#####
    ###########
  player_start: [1, 1]
  win_condition: all_targets_covered_by_objects

mechanism_scope:
  central:
    - Three initial crates must be pushed through the fixed B/S boundary, not one or two.
    - The three crossings transform CCC into MMM with two sticky_merge events.
    - The player must return the MMM bar left across the boundary to cut it into C+MM.
    - The cut C is consumed by the upper single-cell pocket.
    - The remaining MM sticky tail must still move as a rigid two-cell debt to cover the right target.
  allowed_support:
    - Walking around the lower corridor to reach right-side and left-side push stances.
    - Force-chain pushes while converting the row of crates into sticky material.
  incidental_allowed:
    - Equivalent walking inside reversible regions, if core event and count gates remain unchanged.
  required_winning_path_events:
    - box_to_sticky
    - sticky_merge
    - move_sticky_rigid
    - sticky_to_box
  required_winning_path_event_counts:
    box_to_sticky: ">=3"
    sticky_merge: ">=2"
    move_sticky_rigid: ">=6"
  required_winning_path_order:
    - sticky_to_box must not appear before at least one sticky_merge.
  forbidden_winning_path_events: []
  forbidden_if_seen_anywhere:
    - anchor_boundary_shift:box_sticky
    - anchor_boundary_shift:push_pull
    - pull_object

design_claim:
  player_insight: >
    The visible upper C pocket tempts an early C+M or C+MM split, but the right target means the player
    must first bind all three crates into one MMM bar. Returning that bar left is not undoing progress:
    it creates C+MM, where the C is a single-cell pocket resource and the MM tail is still a rigid debt.
  causal_chain:
    - Start with three adjacent crates on the box side.
    - Push right three times: CCC -> CCM -> CMM -> MMM.
    - Walk around to the right and push the MMM bar left across fixed B/S.
    - The boundary cut creates C+MM.
    - Push the C upward into the upper target pocket.
    - Push the remaining MM tail right three times so one sticky cell covers the right target.
  why_not_execution: >
    This is not claimed as a long-route puzzle. The intended difficulty is the material-state timing:
    stopping after one or two conversions leaves too little tail responsibility, while converting all three
    boxes creates a footprint that must later be split and partly kept sticky. The right target is meant to
    make the third crate matter structurally instead of merely adding one more push.
  falsification:
    - A winning route with fewer than three box_to_sticky events falsifies the three-resource binding claim.
    - A winning route with fewer than two sticky_merge events falsifies the MMM bar claim.
    - A winning route without sticky_to_box falsifies the return-cut claim.
    - A winning route with fewer than six move_sticky_rigid events falsifies the MM tail-consumption claim.
    - A target-deletion counterfactual that preserves the same chain and count responsibilities would mark that target as redundant.
    - A critic reading that the result is just a longer RA_CAND_0018-style fixed B/S cut should hold or reject score escalation.

evidence:
  commands_run:
    - npx tsx src/cli.ts explain-layout prototypes/reality_anchor prototypes/reality_anchor/reports/RA_LEX_2026_07_08_TRIBAR_CUT_TAIL_v1_layout.txt --id RA_LEX_2026_07_08_TRIBAR_CUT_TAIL_v1 --title "Tri-bar cut tail v1" --role challenge --support none --targets K_runtime_smoke --write --max-states 300000 --max-depth 80
    - npx tsx prototypes/reality_anchor/reports/trace_layout.ts prototypes/reality_anchor/reports/RA_LEX_2026_07_08_TRIBAR_CUT_TAIL_v1_layout.txt RA_LEX_2026_07_08_TRIBAR_CUT_TAIL_v1 "down right right right down right right right right up left down left left left up right right right" 300000 80
    - npx tsx prototypes/reality_anchor/reports/probe_dual_axis_candidate.ts prototypes/reality_anchor/reports/RA_LEX_2026_07_08_TRIBAR_CUT_TAIL_v1_layout.txt RA_LEX_2026_07_08_TRIBAR_CUT_TAIL_v1_core4 300000 80 "box_to_sticky=box_to_sticky" "sticky_merge=sticky_merge" "sticky_cut=sticky_to_box" "sticky_rigid_tail=move_sticky_rigid"
    - npx tsx prototypes/reality_anchor/reports/probe_event_count.ts prototypes/reality_anchor/reports/RA_LEX_2026_07_08_TRIBAR_CUT_TAIL_v1_layout.txt RA_LEX_2026_07_08_TRIBAR_CUT_TAIL_v1_box_to_sticky_min3 box_to_sticky 3 300000 80
    - npx tsx prototypes/reality_anchor/reports/probe_event_count.ts prototypes/reality_anchor/reports/RA_LEX_2026_07_08_TRIBAR_CUT_TAIL_v1_layout.txt RA_LEX_2026_07_08_TRIBAR_CUT_TAIL_v1_sticky_merge_min2 sticky_merge 2 300000 80
    - npx tsx prototypes/reality_anchor/reports/probe_event_count.ts prototypes/reality_anchor/reports/RA_LEX_2026_07_08_TRIBAR_CUT_TAIL_v1_layout.txt RA_LEX_2026_07_08_TRIBAR_CUT_TAIL_v1_move_sticky_min6 move_sticky_rigid 6 300000 80
    - npx tsx prototypes/reality_anchor/reports/probe_event_order.ts prototypes/reality_anchor/reports/RA_LEX_2026_07_08_TRIBAR_CUT_TAIL_v1_layout.txt RA_LEX_2026_07_08_TRIBAR_CUT_TAIL_v1_no_cut_before_merge sticky_to_box sticky_merge 300000 80
    - no-top-goal and no-right-goal explain-layout / event-probe / count-probe counterfactuals, written under the same candidate id prefix.
  solver_result:
    found: true
    cost: 19
    depth: 19
    inputs: "down right right right down right right right right up left down left left left up right right right"
    event_counts:
      walk: 11
      push_object:crate#1: 4
      force_chain:n3: 2
      force_chain:n2: 1
      box_to_sticky:n1: 3
      sticky_merge:n1: 2
      move_sticky_rigid: 6
      sticky_to_box:n1: 1
      push_object:sticky#1: 4
    graph:
      status: complete
      reachable_states: 347
      legal_transitions: 824
      winning_states: 4
  trace_summary:
    - step_2_right: CCC becomes CCM; first box_to_sticky.
    - step_3_right: CCM becomes CMM; second box_to_sticky and first sticky_merge.
    - step_4_right: CMM becomes MMM; third box_to_sticky and second sticky_merge.
    - step_11_left: returning the MMM bar across fixed B/S creates CMM via sticky_to_box.
    - step_16_up: the cut C is pushed into the upper target pocket.
    - steps_17_to_19_right: the remaining MM tail is pushed as a rigid sticky body into the right target.
  target_events:
    K_runtime_smoke:
      detector_configured: false
      returned_solution_covers_detector: true
  object_or_instance_evidence:
    returned_trace_object_participation: analyzer did not report instance-level object participation
    interpretation: claim is about material footprint and event/count responsibility, not per-object identity across all routes.
  winning_path_event_checks:
    core4_probe:
      report: prototypes/reality_anchor/reports/event_probe_RA_LEX_2026_07_08_TRIBAR_CUT_TAIL_v1_core4.md
      status: complete
      explored_states: 347
      combined_missing_core_bypass: false
      individual_missing_bypass:
        box_to_sticky: false
        sticky_merge: false
        sticky_cut: false
        sticky_rigid_tail: false
    count_probes:
      box_to_sticky_min3:
        report: prototypes/reality_anchor/reports/event_count_probe_RA_LEX_2026_07_08_TRIBAR_CUT_TAIL_v1_box_to_sticky_min3_box_to_sticky_min3.md
        status: complete
        explored_states: 347
        found_bypass_below_count: false
      sticky_merge_min2:
        report: prototypes/reality_anchor/reports/event_count_probe_RA_LEX_2026_07_08_TRIBAR_CUT_TAIL_v1_sticky_merge_min2_sticky_merge_min2.md
        status: complete
        explored_states: 347
        found_bypass_below_count: false
      move_sticky_rigid_min6:
        report: prototypes/reality_anchor/reports/event_count_probe_RA_LEX_2026_07_08_TRIBAR_CUT_TAIL_v1_move_sticky_min6_move_sticky_rigid_min6.md
        status: complete
        explored_states: 545
        found_bypass_below_count: false
    order_probe:
      report: prototypes/reality_anchor/reports/order_probe_RA_LEX_2026_07_08_TRIBAR_CUT_TAIL_v1_no_cut_before_merge.md
      status: complete
      explored_states: 347
      found_cut_before_merge_win: false
  reachable_event_exposure:
    full_graph_status: complete
    reachable_states: 347
    legal_transitions: 824
    event_only_illegal_transitions: 0
    forbidden_anchor_shift_scan: no anchor_boundary_shift events appear in main solver report; B/S is sealed and fixed.
    note: no separate fixed-anchor scan file was generated for this candidate, so forbidden_if_seen_anywhere claims should be treated as supported by complete main reachable graph only if reviewer accepts report-level event exposure.
  graph_or_counterfactual_evidence:
    main_graph:
      report: prototypes/reality_anchor/reports/layout_analysis_RA_LEX_2026_07_08_TRIBAR_CUT_TAIL_v1.md
      status: complete
      reachable_states: 347
      legal_transitions: 824
      winning_states: 4
      forced_commitment_prefix: 3
      forced_viable_prefix: 4
      forced_optimal_prefix: 8
      initial_scc:
        states: 3
        out: 1
        win_out: 1
        dead_out: 0
      solution_irreversible_path:
        steps: 7
        forced_win_prefix: "4/7"
        branching_win_sccs: 5
        merging_win_sccs: 2
      critic_caveat: "Early progress is highly forced; use this as a scriptiness/obviousness attack, not as a merit."
    target_prune:
      report: prototypes/reality_anchor/reports/goal_prune_RA_LEX_2026_07_08_TRIBAR_CUT_TAIL_v1.zh.md
      status: clean
      no_top_goal:
        layout: prototypes/reality_anchor/reports/RA_LEX_2026_07_08_TRIBAR_CUT_TAIL_v1_no_top_goal_layout.txt
        solver_report: prototypes/reality_anchor/reports/layout_analysis_RA_LEX_2026_07_08_TRIBAR_CUT_TAIL_v1_no_top_goal.md
        core_probe: prototypes/reality_anchor/reports/event_probe_RA_LEX_2026_07_08_TRIBAR_CUT_TAIL_v1_no_top_goal_core4.md
        cost_delta: "19->6"
        bypass_summary: "winning path missing sticky_cut; left upper target forces return cut and C consumption."
      no_right_goal:
        layout: prototypes/reality_anchor/reports/RA_LEX_2026_07_08_TRIBAR_CUT_TAIL_v1_no_right_goal_layout.txt
        solver_report: prototypes/reality_anchor/reports/layout_analysis_RA_LEX_2026_07_08_TRIBAR_CUT_TAIL_v1_no_right_goal.md
        core_probe: prototypes/reality_anchor/reports/event_probe_RA_LEX_2026_07_08_TRIBAR_CUT_TAIL_v1_no_right_goal_core4.md
        count_probe: prototypes/reality_anchor/reports/event_count_probe_RA_LEX_2026_07_08_TRIBAR_CUT_TAIL_v1_no_right_goal_move_sticky_min6_move_sticky_rigid_min6.md
        cost_delta: "19->16"
        bypass_summary: "core four still required, but move_sticky_rigid >=6 is bypassed by a 3-move sticky route; right target forces extra MM tail consumption."
    redundant_element_prune:
      report: prototypes/reality_anchor/reports/redundant_element_prune_RA_LEX_2026_07_08_TRIBAR_CUT_TAIL_v1.zh.md
      status: pruned
      trimmed:
        - top-right open strip from working draft
        - B/S side pockets from working draft
      retained:
        - three initial crates
        - fixed B/S anchor
        - lower return corridor
  evidence_limits:
    - Does not claim a unique input sequence.
    - Does not claim per-object identity across all winning paths.
    - Complete graph and probes are hard evidence only; they are not a quality verdict.
    - No separate rule-disabled counterfactual is configured for this prototype package.
    - No separate fixed-anchor probe was produced; fixed B/S interpretation relies on sealed layout plus complete main event report.
    - mechanism_lab/runs was not opened or used as a design source.

diagnostic_routing:
  hard_evidence:
    status: done
    items:
      - explain-layout complete graph
      - trace replay for returned solution
      - missing-event core probe
      - event count probes for box_to_sticky >=3, sticky_merge >=2, move_sticky_rigid >=6
      - order probe for no sticky_to_box before sticky_merge
      - two target-deletion counterfactuals
      - redundant space prune report
  mechanism_scope:
    status: done
    items:
      - fixed B/S binding debt
      - three-crate sticky bar creation
      - fixed B/S return cut
      - C pocket consumption plus MM tail consumption
  claim_hygiene:
    - Cap or reject score if the third crate reads as padding rather than tail responsibility.
    - Do not infer player insight from solver event completeness alone.
    - Do not claim object identity or unique route.
  taste_probes:
    - Compare against RA_CAND_0018 as fixed B/S cut-tail lower bound: this candidate must be more than a longer version.
    - Attack RA_CAND_0019-style obviousness: opening down-right-right-right is strongly directed.
    - Attack RA_CAND_0006-style hardening: the right target may be read as endpoint tax unless the MM tail responsibility feels meaningful.
    - Compare only cautiously to RA_CAND_0017 high-density positive anchor; this candidate lacks dual-anchor density.
  scc_graph:
    - Graph complete with 347 states and 824 legal transitions.
    - Initial SCC has one win-reaching outgoing commitment.
    - Forced viable prefix is 4 commitments and forced optimal prefix is 8 commitments, so critic should inspect scriptiness.
    - There are 5 branching win SCCs and 2 merging win SCCs later, so the entire puzzle is not a single-state proof script.
  variant_family:
    - fresh_required; not derived from archive layout or candidate route.
    - Same lexicon family as fixed B/S cut-tail examples, so critic should attack similarity to RA_CAND_0018.
  start_position:
    - Player begins with both targets visible after a short look; opening is readable but potentially too guided.
  prototype_specific_work:
    - invalid_goal_prune: both targets checked and retained.
    - redundant_element_prune: right-top strip and B/S side pockets trimmed.

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
    - Designed from mechanism_lab/lexicon.md entries rather than an archive candidate layout, route, or object placement.
    - No file under mechanism_lab/runs was opened for this task.
    - Similarity to RA_CAND_0018 is explicitly routed as a critic attack: both use fixed B/S merge-then-cut, but this candidate adds three binding resources, all-win box_to_sticky >=3, sticky_merge >=2, and post-cut MM tail count responsibility.

lexicon_use:
  entries_used:
    - "B/S 绑定债：箱资源生成刚体 footprint"
    - "固定 B/S 切割：C+M 尾巴与单格目标袋"
    - "刚体黏块 + 墙口/目标口：反向施力格谱系 / 目标口消费"
  how_used:
    - Three crates crossing fixed B/S create a three-cell sticky footprint instead of a one-shot cut witness.
    - The return across fixed B/S intentionally cuts MMM into C+MM.
    - The upper single-cell target consumes the C output while the right target consumes the still-rigid MM tail.
  designer_added_glue:
    - The third crate is made structural through all-win box_to_sticky >=3 and move_sticky_rigid >=6 count probes.
    - Two target-deletion counterfactuals separate the C-pocket obligation from the MM-tail obligation.
    - The lower return corridor gives the player both sides of the same material bar without adding unrelated anchor systems.

attempt_log:
  serious_structural_attempts:
    - id: RA_SCRATCH_L_BIND_01
      result: abandoned
      reason: only one box_to_sticky was necessary; third crate had no responsibility and sticky_to_box could be bypassed.
    - id: RA_SCRATCH_TRIBAR_02
      result: strengthened
      reason: three-crate horizontal bar worked, but first draft had unused top-right strip and B/S side pockets.
    - id: RA_LEX_2026_07_08_TRIBAR_CUT_TAIL_v1
      result: current_candidate
      reason: side pockets and unused strip pruned; target-deletion and event-count probes show both target responsibilities.
  local_repairs:
    - Wallified right-top open strip that did not affect solution cost or core event counts.
    - Wallified B/S side pockets that did not affect stance, route, or mechanism reading.
    - Retained lower corridor because it is required for right-side return cut and left-side C pocket push.
  abandoned_families:
    - L-shaped bind-return-tooth family, due to weak event necessity and bypassed cut.

archive_taste_context:
  examples:
    - candidate_id: RA_CAND_0017
      file: prototypes/reality_anchor/design_archive/candidates/RA_CAND_0017.md
      human_reviewed: true
      human_final_status: accepted
      aesthetic_score: 4
      difficulty_score: 5
      role_in_packet: positive_high_density_anchor
      human_reading: "高机制密度、高要素耦合、精巧高难；人类看答案后认可但未亲手解出，审美保守为 4。"
      relevance: "提醒本候选不能把事件齐全等同于高密度 4/5；若追 4，必须有玩家侧责任耦合。"
    - candidate_id: RA_CAND_0005
      file: prototypes/reality_anchor/design_archive/candidates/RA_CAND_0005.md
      human_reviewed: true
      human_final_status: accepted
      aesthetic_score: 4
      difficulty_score: 4
      role_in_packet: positive_player_conflict_anchor
      human_reading: "玩家侧矛盾清楚，需要在 push world 触及 pull world 远目标，构造黏块加锚点三格长链；机制利用率高。"
      relevance: "校准 4 分需要清楚玩家矛盾，而不仅是多次触发事件。"
    - candidate_id: RA_CAND_0018
      file: prototypes/reality_anchor/design_archive/candidates/RA_CAND_0018.md
      human_reviewed: true
      human_final_status: accepted
      aesthetic_score: 3
      difficulty_score: 2
      role_in_packet: lower_bound_same_lexicon_anchor
      human_reading: "固定 B/S 切割简单过渡关，价值在 merge 后回推切割并用两个目标分别消费 C 输出与 sticky tail。"
      relevance: "本候选必须证明它不是同一语料的长度化版本；否则只能按强 3 下界处理。"
    - candidate_id: RA_CAND_0006
      file: prototypes/reality_anchor/design_archive/candidates/RA_CAND_0006.md
      human_reviewed: true
      human_final_status: archived_negative_example
      aesthetic_score: 2
      difficulty_score: 5
      role_in_packet: negative_hardening_anchor
      human_reading: "小目标位置变体削弱机制美感，并通过较差腾挪复杂度增难。"
      relevance: "攻击本候选的右目标和 19 步路线是否只是目标硬化/路线税。"

claim_last_review:
  mode: not_used
  facts_packet: null
  claim_packet: null
  read_order: not_applicable
```
