# Candidate Packet: RA_LEX_2026_07_08_TRIBAR_TOP_MOUTH_v2 / review_1

```yaml
prototype_context:
  confirmed_rules:
    - B/S anchor defines box side / sticky side; objects crossing the boundary normalize material during legal move resolution.
    - Sticky cells form orthogonally connected rigid components and move as one rigid body.
    - Sticky merging and material conversion can turn separate crates into one sticky footprint, then cut the footprint back into C plus sticky tail.
    - Crate, sticky, and anchors can cover goals; player standing on a goal does not count.
    - No P/L anchor exists in this candidate.
  win_condition: all_targets_covered_by_objects
  object_and_event_semantics:
    C: crate / box-side material
    M: sticky cell / sticky-side material
    B/S: fixed box-sticky boundary; the anchor is sealed in the lower wall and is used as a material boundary
    returned_trace_events:
      box_to_sticky:n1: one crate cell crosses to sticky side and becomes sticky
      sticky_merge:n1: a new sticky cell joins the existing sticky component
      move_sticky_rigid: the merged sticky component moves as a rigid body
      sticky_to_box:n1: one sticky cell crosses back to box side and becomes a crate
  tool_boundary:
    - Runtime adapter, solver, full graph, agency/SCC digest, trace replay, local event probes, and event-count probes are available.
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
  difficulty_or_support_expectation: difficulty 3 floor; aesthetic strong 3 floor only if critic accepts target-mouth tail consumption as a real repair over the rejected horizontal-tail version.

mechanic_exposure_context:
  mechanic_window: full current Reality Anchor runtime
  allowed_exposure_through:
    - K_runtime_smoke
  claimed_core_events:
    - force_chain
    - box_to_sticky:n1
    - sticky_merge:n1
    - move_sticky_rigid
    - sticky_to_box:n1

design_target:
  aesthetic_score_target: "strong 3 floor; do not claim stable 4 unless critic explicitly supports it."
  difficulty_score_target: ">=3 by semantic state planning and all-win count gates, not by route length alone."
  target_role_notes: >
    v2 is a repair after critic rejected RA_LEX_2026_07_08_TRIBAR_CUT_TAIL_v1. The horizontal right-tail
    target was replaced by an upper target-mouth consumption: after `MMM` is cut into `C+MM`, the sticky tail
    must move upward into a mouth target, and the C output must be separately pushed into the adjacent C target.

revision_response_to_failed_review:
  rejected_candidate: RA_LEX_2026_07_08_TRIBAR_CUT_TAIL_v1
  critic_required_action: downgrade_or_hold
  addressed_attacks:
    - old_attack: "right target was endpoint hardening / horizontal route tax"
      v2_response: "tail responsibility is now an upward target-mouth consumption; deleting the M target lowers move_sticky_rigid from required 4 to an allowed 3-count route."
    - old_attack: "third crate only lengthened the fixed B/S cut-tail witness"
      v2_response: "all wins still require box_to_sticky >=3 and sticky_merge >=2; the third resource becomes part of the `MM` tail consumed after the cut."
    - old_attack: "three-goal top-mouth draft had a redundant sticky target"
      v2_response: "v2 removes the second sticky-side target and keeps only two targets with distinct output-consumption roles."
  remaining_caveats:
    - Opening remains strongly guided: down, right, right, right is the only viable early progress.
    - Deleting either target lowers output-consumption work but does not remove the entire material chain.
    - This should be judged as strong-3 / difficulty-3 application at most unless critic sees more.

solve_instance:
  id: RA_LEX_2026_07_08_TRIBAR_TOP_MOUTH_v2
  title: Tri-bar top mouth v2
  layout: |-
    ###########
    #@.#GG.####
    #.CCC....##
    ####.....##
    ####BS#####
    ###########
  player_start: [1, 1]
  win_condition: all_targets_covered_by_objects

mechanism_scope:
  central:
    - Three initial crates must be pushed through the fixed B/S boundary, creating a three-cell sticky bar.
    - The three crossings transform CCC into MMM with two sticky_merge events.
    - The player returns the MMM bar left across the fixed boundary, producing C+MM.
    - The MM tail is still a sticky rigid body and must be moved upward into the right upper target.
    - The cut C is then pushed upward into the left upper target.
  allowed_support:
    - ordinary walking around the lower corridor
    - force-chain pushes while converting the row of crates into sticky material
  incidental_allowed:
    - equivalent walking/repositioning inside reversible regions
    - order variants after the cut, if they preserve the same output-consumption responsibilities
  required_winning_path_events:
    - force_chain
    - box_to_sticky
    - sticky_merge
    - move_sticky_rigid
    - sticky_to_box
  required_winning_path_event_counts:
    box_to_sticky: ">=3"
    sticky_merge: ">=2"
    move_sticky_rigid: ">=4"
  required_winning_path_order:
    - sticky_to_box must not appear before at least one sticky_merge.
  forbidden_winning_path_events: []
  forbidden_if_seen_anywhere: []

design_claim:
  player_insight: >
    The player must read the row of three crates as a future footprint, not as three separate boxes. First the
    crates are deliberately bound into `MMM`; then the same bar is returned across fixed B/S to become `C+MM`.
    The cut is valuable because it creates two different output types: C for a single-cell target and MM for
    a sticky tail target-mouth push.
  causal_chain:
    - Start with three adjacent crates on the box side.
    - Push right three times: CCC -> CCM -> CMM -> MMM.
    - Walk around to the right and push MMM left across fixed B/S.
    - The boundary cut creates C+MM.
    - Push the MM tail upward into the right upper target.
    - Reposition left and push the C upward into the left upper target.
  why_not_execution:
    - Complete probes show every win requires the five core event groups.
    - Count probes show every win requires at least 3 box_to_sticky, 2 sticky_merge, and 4 move_sticky_rigid events.
    - v2 does not claim the opening is hidden; the claimed depth is in why the full `MMM` state must be made before cutting, and why the cut output must be consumed in two material roles.
    - The target roles are modest but real: removing the C target removes the C refill and drops cost 18->14; removing the M target allows a 3-move sticky route and drops cost 18->16.
  falsification:
    - A win without any core event group refutes the mechanism claim.
    - A win below box_to_sticky >=3, sticky_merge >=2, or move_sticky_rigid >=4 refutes the footprint / tail-consumption claim.
    - A critic reading that the M target is still only endpoint hardening should block submission.
    - A critic reading that this is only RA_CAND_0018 lengthened to three crates should block score escalation or hold the proposal.

evidence:
  commands_run:
    - npx tsx src/cli.ts explain-layout prototypes/reality_anchor prototypes/reality_anchor/reports/RA_LEX_2026_07_08_TRIBAR_TOP_MOUTH_v2_layout.txt --id RA_LEX_2026_07_08_TRIBAR_TOP_MOUTH_v2 --title "Tri-bar top mouth v2" --role challenge --support none --targets K_runtime_smoke --write --max-states 300000 --max-depth 80
    - npx tsx prototypes/reality_anchor/reports/trace_layout.ts prototypes/reality_anchor/reports/RA_LEX_2026_07_08_TRIBAR_TOP_MOUTH_v2_layout.txt RA_LEX_2026_07_08_TRIBAR_TOP_MOUTH_v2 "down right right right down right right right right up left down left up down left left up" 300000 80
    - npx tsx prototypes/reality_anchor/reports/probe_dual_axis_candidate.ts prototypes/reality_anchor/reports/RA_LEX_2026_07_08_TRIBAR_TOP_MOUTH_v2_layout.txt RA_LEX_2026_07_08_TRIBAR_TOP_MOUTH_v2_core5 300000 80 "box_to_sticky=box_to_sticky" "sticky_merge=sticky_merge" "sticky_cut=sticky_to_box" "sticky_rigid=move_sticky_rigid" "force_chain=force_chain"
    - npx tsx prototypes/reality_anchor/reports/probe_event_count.ts prototypes/reality_anchor/reports/RA_LEX_2026_07_08_TRIBAR_TOP_MOUTH_v2_layout.txt RA_LEX_2026_07_08_TRIBAR_TOP_MOUTH_v2_box_to_sticky_min3 box_to_sticky 3 300000 80
    - npx tsx prototypes/reality_anchor/reports/probe_event_count.ts prototypes/reality_anchor/reports/RA_LEX_2026_07_08_TRIBAR_TOP_MOUTH_v2_layout.txt RA_LEX_2026_07_08_TRIBAR_TOP_MOUTH_v2_sticky_merge_min2 sticky_merge 2 300000 80
    - npx tsx prototypes/reality_anchor/reports/probe_event_count.ts prototypes/reality_anchor/reports/RA_LEX_2026_07_08_TRIBAR_TOP_MOUTH_v2_layout.txt RA_LEX_2026_07_08_TRIBAR_TOP_MOUTH_v2_move_sticky_min4 move_sticky_rigid 4 300000 80
    - npx tsx prototypes/reality_anchor/reports/probe_event_order.ts prototypes/reality_anchor/reports/RA_LEX_2026_07_08_TRIBAR_TOP_MOUTH_v2_layout.txt RA_LEX_2026_07_08_TRIBAR_TOP_MOUTH_v2_no_cut_before_merge sticky_to_box sticky_merge 300000 80
    - explain-layout no_c_goal and no_m_goal counterfactuals, plus no_m_goal move_sticky_min4 count probe.
  solver_result:
    found: true
    cost: 18
    depth: 18
    inputs: "down right right right down right right right right up left down left up down left left up"
    event_counts:
      walk: 12
      push_object:crate#1: 4
      force_chain:n3: 2
      force_chain:n2: 1
      box_to_sticky:n1: 3
      sticky_merge:n1: 2
      move_sticky_rigid: 4
      sticky_to_box:n1: 1
      push_object:sticky#1: 2
    graph:
      status: complete
      reachable_states: 1387
      legal_transitions: 3511
      winning_states: 8
  trace_summary:
    - step_2_right: first crate crosses to sticky side, creating CCM.
    - step_3_right: second crossing creates CMM and first sticky_merge.
    - step_4_right: third crossing creates MMM and second sticky_merge.
    - step_11_left: return cut creates C+MM via sticky_to_box.
    - step_14_up: MM tail is pushed upward, covering the M target.
    - step_18_up: C is pushed upward, covering the C target and winning.
  target_events:
    K_runtime_smoke:
      detector_configured: false
      returned_solution_covers_detector: true
  object_or_instance_evidence:
    returned_trace_object_participation: analyzer did not report instance-level object participation
    interpretation: claim is about material footprint and event/count responsibility, not per-object identity across all routes.
  winning_path_event_checks:
    core5_probe:
      report: prototypes/reality_anchor/reports/event_probe_RA_LEX_2026_07_08_TRIBAR_TOP_MOUTH_v2_core5.md
      status: complete
      explored_states: 1387
      combined_missing_core_bypass: false
      individual_missing_bypass:
        box_to_sticky: false
        sticky_merge: false
        sticky_cut: false
        sticky_rigid: false
        force_chain: false
    count_probes:
      box_to_sticky_min3:
        report: prototypes/reality_anchor/reports/event_count_probe_RA_LEX_2026_07_08_TRIBAR_TOP_MOUTH_v2_box_to_sticky_min3_box_to_sticky_min3.md
        status: complete
        found_bypass_below_count: false
      sticky_merge_min2:
        report: prototypes/reality_anchor/reports/event_count_probe_RA_LEX_2026_07_08_TRIBAR_TOP_MOUTH_v2_sticky_merge_min2_sticky_merge_min2.md
        status: complete
        found_bypass_below_count: false
      move_sticky_rigid_min4:
        report: prototypes/reality_anchor/reports/event_count_probe_RA_LEX_2026_07_08_TRIBAR_TOP_MOUTH_v2_move_sticky_min4_move_sticky_rigid_min4.md
        status: complete
        found_bypass_below_count: false
    order_probe:
      report: prototypes/reality_anchor/reports/order_probe_RA_LEX_2026_07_08_TRIBAR_TOP_MOUTH_v2_no_cut_before_merge.md
      status: complete
      found_cut_before_merge_win: false
  reachable_event_exposure:
    full_graph_status: complete
    reachable_states: 1387
    legal_transitions: 3511
    event_only_illegal_transitions: 0
    note: No forbidden-if-seen-anywhere claim is made in this packet.
  graph_or_counterfactual_evidence:
    main_graph:
      report: prototypes/reality_anchor/reports/layout_analysis_RA_LEX_2026_07_08_TRIBAR_TOP_MOUTH_v2.md
      status: complete
      reachable_states: 1387
      legal_transitions: 3511
      winning_states: 8
      initial_scc:
        states: 3
        out: 1
        win_out: 1
        dead_out: 0
      solution_irreversible_path:
        steps: 6
        forced_win_prefix: "4/6"
        branching_win_sccs: 5
        merging_win_sccs: 0
      scriptiness_caveat: "Opening remains forced and should be used as a critic caveat."
    target_prune:
      report: prototypes/reality_anchor/reports/goal_prune_RA_LEX_2026_07_08_TRIBAR_TOP_MOUTH_v2.zh.md
      status: pruned_from_three_goal_draft
      removed_target:
        cell: [6, 1]
        reason: redundant sticky target from three-goal draft
      no_c_goal:
        report: prototypes/reality_anchor/reports/layout_analysis_RA_LEX_2026_07_08_TRIBAR_TOP_MOUTH_v2_no_c_goal.md
        cost_delta: "18->14"
        interpretation: "removes post-cut C refill; does not claim removal of whole core chain"
      no_m_goal:
        report: prototypes/reality_anchor/reports/layout_analysis_RA_LEX_2026_07_08_TRIBAR_TOP_MOUTH_v2_no_m_goal.md
        count_probe: prototypes/reality_anchor/reports/event_count_probe_RA_LEX_2026_07_08_TRIBAR_TOP_MOUTH_v2_no_m_goal_move_sticky_min4_move_sticky_rigid_min4.md
        cost_delta: "18->16"
        interpretation: "allows move_sticky_rigid 3 < 4; M target forces tail-mouth movement"
    redundant_element_prune:
      report: prototypes/reality_anchor/reports/redundant_element_prune_RA_LEX_2026_07_08_TRIBAR_TOP_MOUTH_v2.zh.md
      status: pruned
  evidence_limits:
    - Does not claim a unique input sequence.
    - Does not claim all-route object identity.
    - Does not claim fixed-anchor forbidden-event scan; forbidden_if_seen_anywhere is empty.
    - Target-deletion evidence supports output-consumption roles, not total collapse of the material chain.
    - Complete graph and probes are hard evidence only; they are not a quality verdict.
    - mechanism_lab/runs was not opened or used as a design source.

diagnostic_routing:
  hard_evidence:
    status: done
    items:
      - complete main graph
      - trace replay
      - core5 missing-event probe
      - count probes for box_to_sticky >=3, sticky_merge >=2, move_sticky_rigid >=4
      - order probe for no sticky_to_box before sticky_merge
      - no_c_goal and no_m_goal counterfactuals
      - redundant target prune from three-goal draft
  mechanism_scope:
    status: done
    items:
      - fixed B/S binding debt
      - three-crate sticky bar
      - fixed B/S return cut
      - C output and sticky-tail output consumption
  claim_hygiene:
    - Do not overclaim 4+ aesthetic or high difficulty.
    - Do not treat forced opening as a merit.
    - Do not claim target deletion removes all core events.
  taste_probes:
    - Compare against RA_CAND_0018 as fixed B/S cut-tail lower bound.
    - Attack RA_CAND_0019-style obvious opening.
    - Attack RA_CAND_0006-style target hardening if the upper M target still reads as endpoint tax.
    - Compare cautiously against RA_CAND_0017 high-density positive anchor; this candidate is less dense.
  scc_graph:
    - Graph complete with 1387 states and 3511 legal transitions.
    - Initial SCC has one win-reaching outgoing commitment; opening is strongly directed.
    - Later region after return cut has multiple commitments, but this does not erase the forced prefix.
  variant_family:
    - fresh_required; designed from mechanism_lab/lexicon.md, not from archive candidate files or runs.
    - Same lexicon neighborhood as fixed B/S cut-tail; critic should attack whether v2 is sufficiently more than RA_CAND_0018.
  start_position:
    - readable opening; no claim of hidden first move
  prototype_specific_work:
    - invalid_goal_prune: three-goal draft pruned to two targets
    - redundant_element_prune: second sticky target removed

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
    - Similarity to fixed B/S cut-tail examples is explicitly routed as a critic attack. The claimed difference from RA_CAND_0018 is all-win three-resource binding plus `C+MM` output consumption, not a new archive-derived layout skeleton.

lexicon_use:
  entries_used:
    - "B/S 绑定债：箱资源生成刚体 footprint"
    - "固定 B/S 切割：C+M 尾巴与单格目标袋"
    - "刚体黏块 + 墙口/目标口：前沿口宽消费"
  how_used:
    - Three crates are bound into a sticky footprint before the return cut.
    - The return cut turns the full footprint into a C output and sticky-tail output.
    - The sticky-tail output is consumed upward by a target mouth rather than by horizontal endpoint travel.
  designer_added_glue:
    - Rejected horizontal tail version was repaired into an upper target-mouth allocation.
    - Redundant second sticky target from the three-goal draft was pruned.
    - Count probes are used to avoid claiming independent target responsibility where only output-consumption count is proven.

attempt_log:
  serious_structural_attempts:
    - id: RA_LEX_2026_07_08_TRIBAR_CUT_TAIL_v1
      result: held_by_critic
      reason: third crate and right target read as RA_CAND_0018 lengthening / endpoint hardening.
    - id: RA_SCRATCH_BRIDGE_RELEASE_01
      result: abandoned
      reason: sticky_merge was not all-win necessary; endpoints could be cut separately.
    - id: RA_SCRATCH_TRIBAR_TOP_MOUTH_01
      result: pruned
      reason: three top targets worked, but one sticky target was redundant under goal deletion.
    - id: RA_LEX_2026_07_08_TRIBAR_TOP_MOUTH_v2
      result: current_candidate
      reason: pruned two-target version preserves core count evidence and replaces horizontal tail tax with upward target-mouth tail consumption.
  local_repairs:
    - Converted right-tail target to upper sticky target.
    - Removed redundant second sticky-side target.
  abandoned_families:
    - L-shaped bind-return-tooth family from earlier scratch, due to weak event necessity.
    - Bridge-release scratch, due to sticky_merge bypass.

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
      relevance: "本候选不能凭事件齐全借到高密度 4/5；追 4 要非常谨慎。"
    - candidate_id: RA_CAND_0018
      file: prototypes/reality_anchor/design_archive/candidates/RA_CAND_0018.md
      human_reviewed: true
      human_final_status: accepted
      aesthetic_score: 3
      difficulty_score: 2
      role_in_packet: lower_bound_same_lexicon_anchor
      human_reading: "固定 B/S 切割简单过渡关，价值在 merge 后回推切割并用两个目标分别消费 C 输出与 sticky tail。"
      relevance: "本候选必须证明比它更像应用关，否则只能作为同语料下界。"
    - candidate_id: RA_CAND_0019
      file: prototypes/reality_anchor/design_archive/candidates/RA_CAND_0019.md
      human_reviewed: true
      human_final_status: accepted
      aesthetic_score: 2
      difficulty_score: 2
      role_in_packet: obviousness_negative_anchor
      human_reading: "第一步推锚点和后续两步拉过于显然，只能作为简单应用/功能库存接受。"
      relevance: "攻击本候选的强引导开局。"
    - candidate_id: RA_CAND_0006
      file: prototypes/reality_anchor/design_archive/candidates/RA_CAND_0006.md
      human_reviewed: true
      human_final_status: archived_negative_example
      aesthetic_score: 2
      difficulty_score: 5
      role_in_packet: negative_hardening_anchor
      human_reading: "目标位置小改动削弱机制美感，并通过较差腾挪复杂度增难。"
      relevance: "攻击本候选的 M target 是否仍是目标硬化。"

claim_last_review:
  mode: not_used
  facts_packet: null
  claim_packet: null
  read_order: not_applicable
```
