# Candidate Packet: RA_LEX_2026_07_08_OVERSHOOT_CUT_DUAL_POCKET_v2

```yaml
review_iteration: 2
candidate_version: RA_LEX_2026_07_08_OVERSHOOT_CUT_DUAL_POCKET_v2
revision_of: RA_LEX_2026_07_08_OVERSHOOT_CUT_TAIL_v1

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
    - use mechanism_lab/lexicon.md material, not archive-derived layout, to compose a new causal chain
    - difficulty at least 3; target 3+ with compactness
    - aesthetic at least strong 3; pursue 4 only if critic agrees
  difficulty_or_support_expectation: no new rule teaching; asks player to plan overshoot, return cut, and dual endpoint allocation

mechanic_exposure_context:
  mechanic_window: all current Reality Anchor runtime rules are allowed
  allowed_exposure_through: all_current_reality_anchor_runtime_rules
  claimed_core_events:
    - force_chain
    - box_to_sticky
    - sticky_merge
    - move_sticky_rigid
    - sticky_to_box

revision_response_to_review_1:
  critic_verdict_on_v1: revise_required / structural_revision
  structural_changes:
    - Replaced the thin right-side tail target with a second upper pocket target.
    - The return cut now creates C+M that must be allocated upward into two adjacent top targets.
    - After cutting, M is pushed up first, then the player repositions and pushes C up; the tail is no longer a one-step horizontal afterthought.
    - The main graph grows from 159 to 901 reachable states, while the critical chain remains compact.
  addressed_attacks:
    - v1_attack: "tail goal deletion only reduced cost 13 -> 12, making it read as route tax"
      v2_response: "deleting either top target now collapses the intended material chain into ordinary crate or one-goal shortcuts: no_left_goal cost 11, no_right_goal cost 8"
    - v1_attack: "return cut might be the only local action after reaching right side"
      v2_response: "post-cut state has multiple viable commitments in region r19 and r29; the player must choose target allocation, not simply push one tail to a premarked right target"
    - v1_attack: "opening is narrow and overshoot may be obvious"
      v2_response: "the opening is still compact and partly forced; this is retained as clarity, not claimed as the whole difficulty. The claimed difficulty now rests on interpreting why the final state must be C+M and why two upper pockets consume the split resources differently"

solve_instance:
  layout: |-
    ########
    #..GG###
    #@CC...#
    ###....#
    ###BS###
    ########
  player_start: [1, 2]
  player_goal: null
  win_condition: all_targets_covered_by_objects

mechanism_scope:
  central:
    - B/S binding debt: the two crates must be pushed far enough into sticky side to become a merged MM bar
    - overshoot as route opening: stopping at C+M after one push does not provide the right-side return stance; the second push creates the MM state from which the player can loop around
    - fixed B/S return cut: pushing the MM bar left across the fixed boundary creates C+M
    - dual pocket allocation: the M half and C half are consumed by adjacent top pockets after the cut; uncut MM cannot satisfy the same allocation through a single-cell pocket interpretation
  allowed_support:
    - ordinary walking and crate pushing
    - force chain as carrier for the two-cell object line
  incidental_allowed:
    - after the cut, the two top targets may be approached in either final-region order if the material split and stance constraints allow it
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
    - The first push demonstrates the boundary but leaves only C+M and no sufficient right-side return setup.
    - The second push deliberately overshoots into MM; this merge is useful because the rigid bar can be returned from the right side.
    - The return push is a cut, not an undo: it changes the object grammar from one MM bar into C+M.
    - The two upper pockets make the split material matter. M can be lifted as a rigid sticky cell, then C must be lifted separately after repositioning.
  causal_chain:
    - Start with two crates on the box side.
    - Push right once to C+M.
    - Push right again to MM and sticky_merge.
    - Walk around to the right and push MM left across the fixed B/S boundary, cutting it into C+M.
    - Reposition under the M half and push it up onto the right upper target.
    - Reposition under the C half and push it up onto the left upper target.
  why_not_execution:
    - Every winning path must include the binding/merge/cut/sticky-motion events in complete missing-event probes.
    - Deleting the left upper target permits an 11-step ordinary-crate-heavy bypass with only one box_to_sticky and no sticky_merge/cut-return requirement.
    - Deleting the right upper target permits an 8-step ordinary crate shortcut with no material chain.
    - The final two pushes are vertical allocations into adjacent pockets, not a final horizontal route tax.
    - The initial moves are intentionally readable; the claimed depth is in recognizing the needed material state and endpoint allocation, not in hiding the first push.
  falsification:
    - A winning path missing sticky_merge, sticky_to_box, box_to_sticky, move_sticky_rigid, or force_chain falsifies the core claim.
    - A target-deletion counterfactual that preserves the same material chain with only a tiny cost change would weaken the dual-pocket claim.
    - A critic reading that the two top targets are still mere finish markers should block score escalation beyond strong 3.

evidence:
  commands_run:
    - npx tsx src/cli.ts explain-layout prototypes/reality_anchor prototypes/reality_anchor/reports/layout_RA_LEX_2026_07_08_OVERSHOOT_CUT_DUAL_POCKET_v2.txt --id RA_LEX_2026_07_08_OVERSHOOT_CUT_DUAL_POCKET_v2 --targets K_runtime_smoke --max-states 300000 --graph-max-states 300000 --write
    - npx tsx prototypes/reality_anchor/reports/probe_dual_axis_candidate.ts prototypes/reality_anchor/reports/layout_RA_LEX_2026_07_08_OVERSHOOT_CUT_DUAL_POCKET_v2.txt RA_LEX_2026_07_08_OVERSHOOT_CUT_DUAL_POCKET_v2 300000 80 bind_cross=box_to_sticky sticky_merge=sticky_merge cut_return=sticky_to_box sticky_motion=move_sticky_rigid force_chain=force_chain
    - npx tsx prototypes/reality_anchor/reports/trace_layout.ts prototypes/reality_anchor/reports/layout_RA_LEX_2026_07_08_OVERSHOOT_CUT_DUAL_POCKET_v2.txt RA_LEX_2026_07_08_OVERSHOOT_CUT_DUAL_POCKET_v2 "right right down right right right up left down left up down left up" 300000 80
    - fixed anchor reachable-event scan for box_sticky profile, written to fixed_anchor_probe_RA_LEX_2026_07_08_OVERSHOOT_CUT_DUAL_POCKET_v2_anchor_scan.*
    - explain-layout no_left_goal counterfactual, written to layout_analysis_RA_LEX_2026_07_08_OVERSHOOT_CUT_DUAL_POCKET_v2_no_left_goal.*
    - explain-layout no_right_goal counterfactual, written to layout_analysis_RA_LEX_2026_07_08_OVERSHOOT_CUT_DUAL_POCKET_v2_no_right_goal.*
  solver_result:
    found: true
    cost: 14
    depth: 14
    explored_states: 335
    graph_status: complete
    reachable_states: 901
    legal_transitions: 2263
    winning_states: 3
  trace_summary:
    solution_inputs: "right right down right right right up left down left up down left up"
    key_states:
      - step_1: C+M after first boundary crossing
      - step_2: MM merge on sticky side
      - step_8: return cut creates C+M
      - step_11: M covers the right upper target
      - step_14: C covers the left upper target and wins
  target_events:
    returned_solution_events:
      - push_object:crate#1 x3
      - force_chain:n2 x2
      - box_to_sticky:n1 x2
      - move_sticky_rigid x3
      - sticky_merge:n1 x1
      - sticky_to_box:n1 x1
      - push_object:sticky#1 x2
  winning_path_event_checks:
    event_probe:
      combined_probe: complete; no winning bypass found; explored_states=1920
      individual:
        bind_cross: complete; no winning bypass found; explored_states=1026
        sticky_merge: complete; no winning bypass found; explored_states=1459
        cut_return: complete; no winning bypass found; explored_states=1501
        sticky_motion: complete; no winning bypass found; explored_states=1051
        force_chain: complete; no winning bypass found; explored_states=1086
  reachable_event_exposure:
    fixed_anchor_probe:
      reachable_scan_status: complete
      reachable_states: 910
      legal_transitions: 2293
      forbidden_anchor_boundary_shift_hits: none
      note: "Combined fixed-anchor winning-path probe includes movable_push_pull_shift from a generic template; this candidate has no P/L movable anchor, so that missing group is not part of the design claim."
  graph_or_counterfactual_evidence:
    main_graph:
      status: complete
      reachable_states: 901
      winning_states: 3
      initial_scc_states: 36
      initial_scc_out: 8
      initial_scc_win_out: 2
      initial_scc_dead_out: 6
      scc_forcedWinPrefix: "0/2"
      solution_irreversible_path: "s0@0 -> s8@11 -> s21@14"
    no_left_goal:
      shortest_cost: 11
      graph_status: complete
      bypass_summary: "ordinary-crate-heavy route; only one box_to_sticky, no sticky_merge/cut-return chain"
      reason_to_retain: "left target prevents reducing the puzzle to a one-target or ordinary-crate allocation"
    no_right_goal:
      shortest_cost: 8
      graph_status: complete
      bypass_summary: "ordinary crate shortcut; no material chain"
      reason_to_retain: "right target forces both resources of the cut C+M output to be consumed"
  evidence_limits:
    - No rule-disabled counterfactual is configured for this prototype package.
    - No per-object instance identity claim is made.
    - Difficulty/aesthetic scores are for critic calibration, not tool verdicts.

diagnostic_routing:
  hard_evidence:
    - verify event-probe support for required winning path events
    - verify target prune interpretation
    - verify fixed B/S forbidden anchor-shift scan
  mechanism_scope:
    - fixed B/S, binding debt, return cut, dual pocket allocation
  claim_hygiene:
    - reject or cap score if this reads as a clean demo rather than player-facing structure
  taste_probes:
    - compare against RA_CAND_0018 as fixed B/S strong-3 lower bound
    - attack RA_CAND_0019-style obviousness in the opening
    - attack RA_CAND_0006-style target hardening if top targets feel like difficulty tax
  scc_graph:
    - graph complete
    - initial SCC has 36 states, 8 outgoing commitments, 2 win-reaching
    - solution SCC forcedWinPrefix is 0/2, so late chain is not a fully scripted SCC handoff
  variant_family:
    - fresh_required; not derived from archive layout or candidate route
  start_position:
    - opening comfort retained; player can inspect top pockets before committing
  prototype_specific_work:
    - invalid_goal_prune: both top-target deletion counterfactuals run
    - redundant_element_prune: manual; no nonfunctional object retained beyond B/S anchor and two top targets

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
    - Similarity to fixed B/S cut examples is expected because the brief explicitly asked to use design lexicon; the submitted structure composes binding debt, return cut, and dual endpoint allocation.

lexicon_use:
  entries_used:
    - "B/S 绑定债：箱资源生成刚体 footprint"
    - "固定 B/S 切割：C+M 尾巴与单格目标袋"
    - "刚体黏块 + 墙口：反向施力格谱系"
  how_used:
    - Binding debt supplies the two-push conversion from separate crates into a merged sticky bar.
    - Fixed B/S cutting supplies the return-cut C+M interface.
    - Wall-mouth / stance thinking supplies the idea that a footprint must be consumed by narrow upper pockets and that post-cut stance matters.
  designer_added_glue:
    - The second push both creates MM and opens the right-side return path.
    - The v2 repair turns v1's right-tail target into two adjacent top pockets, so both halves of C+M are consumed vertically.
    - The endgame asks for allocation order and stance recovery rather than a one-step horizontal refill.

attempt_log:
  serious_structural_attempts:
    - v1: overshoot, return cut, upper C pocket, right M tail; rejected by critic as too linear and tail-thin
    - v2: same lexicon base but tail obligation replaced with dual upper pockets and stronger target-deletion counterfactuals
  local_repairs:
    - moved second target from right side to the upper pocket row
    - accepted 901-state graph because it improves player-facing branch texture without making the route long
  abandoned_families:
    - P/L add-on was deferred because it would likely turn compact B/S logic into route tax for this candidate

archive_taste_context:
  examples:
    - candidate_id: RA_CAND_0017
      role: positive_high_density_anchor
      human_scores: aesthetic 4 / difficulty 5
      use_for_this_review: rewards compact high-mechanism-density coupling, but warns against claiming 4+ unless the critic sees genuine coupled reasoning
    - candidate_id: RA_CAND_0018
      role: relevant_lower_bound_anchor
      human_scores: aesthetic 3 / difficulty 2
      use_for_this_review: fixed B/S cut can reach strong-3 when the return move is a real insight; this candidate should exceed it through overshoot plus dual allocation
    - candidate_id: RA_CAND_0019
      role: lower_bound_or_negative_anchor
      human_scores: aesthetic 2 / difficulty 2
      use_for_this_review: attack whether opening pushes here are too obvious
    - candidate_id: RA_CAND_0006
      role: negative_anchor
      human_scores: aesthetic 2 / difficulty 5
      use_for_this_review: attack any difficulty that comes merely from target hardening or route length

claim_last_review:
  mode: not_used
  facts_packet: null
  claim_packet: null
  read_order: not_applicable
```

## Controller Notes

本候选是 v1 被 critic 打回后的结构修订。请 evidence reviewer 按硬证据审查：事件必要性、目标删除解释、固定 B/S 禁用位移扫描，以及 packet 是否把无关的 `movable_push_pull_shift` 探针误写为核心证据。请 puzzle critic 重点攻击：开局 overshoot 是否仍过于顺手、双上袋是否真正提升玩家侧结构、以及难度 3+ / 审美 strong 3 是否成立。
