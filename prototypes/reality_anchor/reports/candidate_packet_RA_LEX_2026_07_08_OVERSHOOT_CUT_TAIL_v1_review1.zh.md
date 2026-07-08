# Candidate Packet: RA_LEX_2026_07_08_OVERSHOOT_CUT_TAIL_v1

```yaml
review_iteration: 1
candidate_version: RA_LEX_2026_07_08_OVERSHOOT_CUT_TAIL_v1

prototype_context:
  confirmed_rules:
    - all_targets_covered_by_objects
    - fixed B/S anchor separates box side and sticky side
    - box_to_sticky / sticky_to_box normalize after legal moves
    - orthogonally adjacent sticky cells merge into one rigid body
    - a rigid sticky body moves as a whole; if any destination cell is blocked, the whole move fails
  win_condition: all targets must be covered by crate, sticky block, or anchor cell; player on target does not count
  object_and_event_semantics:
    C: crate, independent movable object
    M: sticky cell, merged by orthogonal adjacency into rigid components
    B/S: box-sticky anchor; in this layout B at [3,4], S at [4,4], so x<=3 is box side and x>=4 is sticky side
  tool_boundary:
    runtime_adapter: implemented
    solver_graph_agency: implemented through generic runtime interface
    curated_generator: unavailable
    puzzlescript_exporter: unavailable

slot_brief:
  intended_role: challenge / lexicon-composition application
  known_before:
    - fixed B/S material normalization
    - sticky merge and sticky rigid movement
    - single-cell pocket can consume C while rejecting an uncut sticky footprint
  target:
    - use lexicon material, not archive-derived layout, to compose a new causal chain
    - difficulty at least 3; target 3+ with compactness
    - aesthetic at least strong 3; target 4 if critic agrees
  difficulty_or_support_expectation: no new rule teaching; asks player to plan an overshoot, a return cut, and tail consumption

mechanic_exposure_context:
  mechanic_window: all current Reality Anchor runtime rules are allowed
  allowed_exposure_through: all_current_reality_anchor_runtime_rules
  claimed_core_events:
    - force_chain
    - box_to_sticky
    - sticky_merge
    - move_sticky_rigid
    - sticky_to_box

design_target:
  aesthetic_score_target: "3+; pursue 4 if the critic accepts the compact tail-debt chain"
  difficulty_score_target: "3+"
  target_role_notes:
    - The level should read as a compact structure puzzle, not as a long route-tax puzzle.
    - The first C+M state is intentionally tempting but insufficient; the player must overshoot to MM to open the right-side return stance.
    - The right target forces the M tail to remain a real debt after the C is consumed by the upper pocket.

solve_instance:
  layout: |-
    ########
    #..G####
    #@CC.G.#
    ###....#
    ###BS###
    ########
  player_start: [1, 2]
  player_goal: null
  win_condition: all_targets_covered_by_objects

mechanism_scope:
  central:
    - B/S binding debt: two crates are pushed far enough into sticky side to become a merged MM bar
    - fixed B/S cutting: returning the MM bar left across the boundary produces C+M
    - single-cell upper target pocket consumes C while the wall at [4,1] rejects the uncut footprint
    - tail debt: after C moves into the upper pocket, the vacated cell becomes the stance needed to push M onto the right target
  allowed_support:
    - ordinary walking and crate pushing
    - force chain as the carrier for the two-cell object line
  incidental_allowed:
    - the right target is temporarily covered before the cut; that temporary coverage is deliberately undone by the return cut
  required_winning_path_events:
    - box_to_sticky
    - sticky_merge
    - sticky_to_box
    - move_sticky_rigid
    - force_chain
  forbidden_winning_path_events: []
  forbidden_if_seen_anywhere:
    - anchor_boundary_shift:box_sticky
    - anchor_boundary_shift:push_pull

design_claim:
  player_insight:
    - The apparent C+M after one push is not enough. The player must overshoot into a true MM bar so the bar itself opens the right-side route.
    - The return push is not just undoing progress: it cuts the MM bar across fixed B/S into C+M, creating a usable C and leaving an M tail debt.
    - The upper C pocket and the right M target form an ordered dependency: C must be consumed first, because only then can the player stand in the vacated cell and push the M tail onto its target.
  causal_chain:
    - Start with two crates on box side.
    - Push right once to C+M; this shows the boundary but does not solve the target structure.
    - Push right again to MM; sticky_merge occurs and the right-side route/return stance becomes reachable.
    - Walk around to the right and push the MM bar left; sticky_to_box cuts the left cell into C while the right cell remains M.
    - Push C upward into the single-cell pocket.
    - Use the vacated cell as stance to push M right onto the tail target.
  why_not_execution:
    - A one-push interpretation reaches C+M but cannot both cover the upper target and finish the tail target.
    - The second target is not guidance; deleting it drops the shortest solution from 13 to 12 and removes the final tail-debt obligation.
    - Deleting the upper target drops the shortest solution from 13 to 2, proving the initial MM-on-right-target state is not the real win.
    - Every winning path must include binding, merge, sticky movement, and cut-return events in complete probes.
  falsification:
    - A winning path missing sticky_merge, sticky_to_box, box_to_sticky, move_sticky_rigid, or force_chain would falsify the core claim.
    - If either target can be deleted without lowering cost or losing the core chain, the target-duty claim fails.
    - If the initial SCC collapses to a forced first move in the submitted version, opening comfort must be revised.

evidence:
  commands_run:
    - npx tsx src/cli.ts explain-layout prototypes/reality_anchor prototypes/reality_anchor/reports/layout_RA_LEX_2026_07_08_OVERSHOOT_CUT_TAIL_v1.txt --id RA_LEX_2026_07_08_OVERSHOOT_CUT_TAIL_v1 --targets K_runtime_smoke --max-states 300000 --graph-max-states 300000 --write
    - npx tsx prototypes/reality_anchor/reports/probe_dual_axis_candidate.ts prototypes/reality_anchor/reports/layout_RA_LEX_2026_07_08_OVERSHOOT_CUT_TAIL_v1.txt RA_LEX_2026_07_08_OVERSHOOT_CUT_TAIL_v1 300000 80 bind_cross=box_to_sticky sticky_merge=sticky_merge cut_return=sticky_to_box sticky_motion=move_sticky_rigid force_chain=force_chain
    - npx tsx prototypes/reality_anchor/reports/trace_layout.ts prototypes/reality_anchor/reports/layout_RA_LEX_2026_07_08_OVERSHOOT_CUT_TAIL_v1.txt RA_LEX_2026_07_08_OVERSHOOT_CUT_TAIL_v1 "right right down right right right up left down left left up right" 300000 80
    - explain-layout no_top_goal counterfactual, written to layout_analysis_RA_LEX_2026_07_08_OVERSHOOT_CUT_TAIL_v1_no_top_goal.*
    - explain-layout no_tail_goal counterfactual, written to layout_analysis_RA_LEX_2026_07_08_OVERSHOOT_CUT_TAIL_v1_no_tail_goal.*
  solver_result:
    found: true
    cost: 13
    depth: 13
    explored_states: 121
    graph_status: complete
    reachable_states: 159
    legal_transitions: 376
    winning_states: 1
  trace_summary:
    solution_inputs: "right right down right right right up left down left left up right"
    key_states:
      - step_1: C+M after first boundary crossing; not yet sufficient
      - step_2: MM merge on sticky side; right target temporarily covered
      - step_8: return cut creates C+M and uncovers right target
      - step_12: C covers upper pocket and opens stance at [3,2]
      - step_13: M tail covers right target and wins
  target_events:
    returned_solution_events:
      - push_object:crate#1 x3
      - force_chain:n2 x2
      - box_to_sticky:n1 x2
      - move_sticky_rigid x3
      - sticky_merge:n1 x1
      - sticky_to_box:n1 x1
      - push_object:sticky#1 x2
  object_or_instance_evidence:
    - Object participation helper did not report instance-level participation for Reality Anchor; claim is event/geometry based rather than per-object identity based.
  winning_path_event_checks:
    event_probe:
      combined_probe: complete; no winning bypass found; explored_states=318
      individual:
        bind_cross: complete; no winning bypass found
        sticky_merge: complete; no winning bypass found
        cut_return: complete; no winning bypass found
        sticky_motion: complete; no winning bypass found
        force_chain: complete; no winning bypass found
  reachable_event_exposure:
    - Full graph complete in layout analysis; returned solution and complete event probe contain no anchor_boundary_shift requirement.
    - No separate all-reachable forbidden-event scan was run for anchor shifts; geometry seals the B/S anchor in row 4, but this remains a noncentral claim.
  graph_or_counterfactual_evidence:
    main_graph:
      status: complete
      reachable_states: 159
      winning_states: 1
      initial_scc_states: 4
      initial_scc_out: 2
      initial_scc_win_out: 1
      initial_scc_dead_out: 1
    no_top_goal:
      shortest_cost: 2
      graph_status: complete
      reason_to_retain: removing the upper target allows a 2-step early win on the right target
    no_tail_goal:
      shortest_cost: 12
      graph_status: complete
      reason_to_retain: removing the tail target deletes the final M-tail obligation
  evidence_limits:
    - No rule-disabled counterfactual is configured for this prototype package.
    - No per-object necessity claim is made.
    - Difficulty/aesthetic scores are for critic calibration, not tool verdicts.

diagnostic_routing:
  hard_evidence:
    - verify event-probe support for required winning path events
    - verify target prune interpretation
  mechanism_scope:
    - fixed B/S, binding debt, return cut, tail debt
  claim_hygiene:
    - reject if this reads as simple forced execution instead of player-facing footprint reasoning
  taste_probes:
    - compare against human anchors for compact strong logic vs obvious forced opener
  scc_graph:
    - graph complete
    - initial SCC has 4 states, one viable and one dead outgoing commitment
    - forcedWinPrefix 5/5 is a fact, not by itself a merit
  variant_family:
    - fresh_required; not derived from archive layout or candidate route
  start_position:
    - opening_comfort_check considered: retained upper-left observation pocket; compressed SCC=1 version was rejected before packet
  prototype_specific_work:
    - invalid_goal_prune: run by target deletion counterfactuals; both targets retained
    - redundant_element_prune: manual screen only; no object was pruned; upper-left pocket retained for opening comfort

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
    - Designed from lexicon entries rather than an archive candidate layout, route, or object placement.
    - No archive candidate file was used as a base.
    - Similar mechanic family to fixed B/S cut examples is expected because the brief asked to use design lexicon; the causal chain adds overshoot-as-route-opening plus M-tail post-pocket consumption.

lexicon_use:
  entries_used:
    - "B/S 绑定债：箱资源生成刚体 footprint"
    - "固定 B/S 切割：C+M 尾巴与单格目标袋"
    - "刚体黏块 + 墙口：反向施力格谱系"
  how_used:
    - Binding debt supplies the two-push overshoot from C+M into MM.
    - Fixed B/S cutting supplies the return-cut C+M interface.
    - Reverse stance / handle thinking supplies the right-side route opening and final tail-push stance.
  designer_added_glue:
    - The second push is not just stronger binding; it opens the right-side route needed to perform the return cut.
    - The right target is temporarily covered, then intentionally vacated, then refilled only after the C pocket frees the stance.

attempt_log:
  serious_structural_attempts:
    - v0: one-target version; valid but M tail had no target duty
    - v1: two-target version with tail duty
    - v1_compressed: removed too much top-left space; rejected because initial SCC collapsed to 1 and first move became too贴脸
    - v1_final: retained top-left observation pocket, removed unrelated right-top space
  local_repairs:
    - added right target to consume M tail
    - kept upper-left observation pocket for opening comfort
  abandoned_families:
    - P/L add-on was deferred because it would likely turn compact B/S logic into route tax for this candidate

archive_taste_context:
  examples:
    - candidate_id: RA_CAND_0017
      role: positive_high_density_anchor
      human_scores: aesthetic 4 / difficulty 5
      human_comment: "很精彩的关卡，对于推拉和黏块拼接切割都有要求极高的应用，需要很强的推理和腾挪技巧，有大量的反直觉操作，是极难的游戏末期挑战关卡。...精巧设计、高机制密度、高要素耦合值得学习。"
      use_for_this_review: rewards compact high-mechanism-density coupling, but warns against excessive difficulty
    - candidate_id: RA_CAND_0018
      role: relevant_lower_bound_anchor
      human_scores: aesthetic 3 / difficulty 2
      human_comment: "利用固定锚点进行切割的简单过渡关，审美升到3分的原因是有一个不算显然的回推动作而非按部就班凭直觉过关"
      use_for_this_review: fixed B/S cut can reach strong-3 when the return move is a real insight; this candidate must exceed it via overshoot and tail duty
    - candidate_id: RA_CAND_0019
      role: lower_bound_or_negative_anchor
      human_scores: aesthetic 2 / difficulty 2
      human_comment: "利用移动锚点切割的水关，第一步的推锚点和之后的两步拉过于显然，作为简单应用可以接受"
      use_for_this_review: attack whether opening pushes here are too obvious / forced
    - candidate_id: RA_CAND_0006
      role: negative_anchor
      human_scores: aesthetic 2 / difficulty 5
      human_comment: "用较小的目标位置改动极大地弱化机制美感并增加了腾挪难度，这种增加难度的方式实为较差的反例"
      use_for_this_review: attack any difficulty that comes merely from route length or target hardening
  none_found_reason: null

claim_last_review:
  mode: not_used
  facts_packet: null
  claim_packet: null
  read_order: not_applicable
```

## Controller Notes

本候选不是 archive variant；它只使用 `mechanism_lab/lexicon.md` 中的局部设计语料。请 reviewer 和 critic 分别按 `$sokoban-evidence-reviewer`、`$sokoban-puzzle-critic` 的模板审查，不要把工具 pass 当作质量 pass。
