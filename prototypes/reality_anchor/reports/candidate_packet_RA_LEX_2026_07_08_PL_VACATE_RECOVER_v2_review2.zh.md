# Candidate Packet: RA_LEX_2026_07_08_PL_VACATE_RECOVER_v2 / review_2

```yaml
prototype_context:
  confirmed_rules:
    - P/L anchor defines push or pull behavior from the player's current side.
    - Horizontal P/L with P on the left makes cells at or left of P push-side and cells to the right pull-side.
    - Pull moves the player into an empty front cell and pulls the object behind into the player's old cell.
    - Win requires every target to be covered by crate, sticky, or anchor; player on target does not count.
  tool_boundary:
    - Runtime adapter, solver, graph/agency analyzer, explain-layout, and local probes are available.
    - PuzzleScript exporter is not used for this prototype.

slot_brief:
  intended_role: challenge / fresh lexicon-composition candidate
  target: difficulty 3+ floor; strong aesthetic 3 floor
  revision_context:
    previous_version: RA_LEX_2026_07_08_PL_CHAIN_END_PULL_DUAL_POCKET_v1
    previous_critic: revise_required / structural_revision
    response: >
      v1 had two mostly independent endpoint pulls. v2 creates a shared target-vacate debt:
      the lower target is first covered, then vacated by an upper pull, then refilled.

mechanic_exposure_context:
  mechanic_window: full current Reality Anchor runtime
  claimed_core_events:
    - push_object
    - force_chain:n2
    - pull_object
  forbidden_core_events:
    - anchor_boundary_shift:push_pull
    - anchor_boundary_shift:box_sticky
    - box_to_sticky
    - sticky_to_box
    - sticky_merge
    - sticky_split
    - move_sticky_rigid

design_target:
  aesthetic_score_target: "strong 3; not claiming 4 unless critic accepts compact vacate/recover as unusually elegant."
  difficulty_score_target: "3; difficulty comes from recognizing that the first target coverage is temporary and must be repaired."
  target_role_notes: >
    Fixed-P/L two-crate chain where the lower target is a temporary coverage state, not a final parking spot.

solve_instance:
  id: RA_LEX_2026_07_08_PL_VACATE_RECOVER_v2
  title: PL vacate recover v2
  layout: |-
    #########
    ##PL#..##
    ###..G.##
    #.@CCG..#
    #########
  player_start: [2, 3]
  win_condition: all_targets_covered_by_objects

mechanism_scope:
  central:
    - Fixed P/L boundary makes the start cell push-side and the post-push region pull-side.
    - First winning progress pushes the two-crate chain right with `force_chain:n2`; the right crate now covers the lower target.
    - That coverage is intentionally temporary: the upper target is still empty, so the player must pull the lower-target crate upward onto the upper target.
    - Pulling upward vacates the lower target and opens the right-side return route.
    - The remaining crate is then pulled right into the vacated lower target.
  allowed_support:
    - Reversible walking through the tiny upper/right corridor after the upper pull.
    - A visible dead branch after the upper-corridor stance; graph shows one viable and one dead commitment in the relevant region.
  required_winning_path_events:
    - push_object
    - force_chain
    - pull_object
    - "pull_object count >= 2"
    - "target [5,3] covered -> uncovered -> covered before win"
  forbidden_winning_path_events:
    - anchor_boundary_shift:push_pull
  evidence_limits:
    - Do not claim unique input sequence.
    - Do not claim crate instance identities are globally meaningful; exact labels are returned-trace labels only.
    - Do not use graph completeness or forced prefix as taste evidence.

design_claim:
  player_insight: >
    The lower goal lighting up after the first push is a trap-like intermediate state, not a solved subgoal.
    To solve both targets, the player must deliberately pull that crate off the lower target and onto the upper
    target, then use the remaining crate to repair the lower target. The same cell is therefore read as
    temporary coverage, vacancy, and final recovery.
  causal_chain:
    - Push the two-crate chain once from P side into L-side territory; the lower target becomes covered.
    - Move to the upper pull stance and pull the lower-target crate upward, covering the upper target and vacating the lower target.
    - Use the opened side loop to stand on the lower target and pull the remaining crate into it.
  why_not_v1_or_RA_CAND_0019: >
    v1 had two mostly independent endpoint pulls and was rejected as clean 2. v2 couples the two pulls through
    one target's state history. RA_CAND_0019 was a moving B/S brush with obvious output consumption; v2 has no B/S,
    no material conversion, and no moving anchor.

evidence:
  commands_run:
    - npx tsx src/cli.ts explain-layout prototypes/reality_anchor prototypes/reality_anchor/reports/RA_LEX_2026_07_08_PL_VACATE_RECOVER_v2_layout.txt --id RA_LEX_2026_07_08_PL_VACATE_RECOVER_v2 --title "PL vacate recover v2" --role challenge --support none --targets K_runtime_smoke --max-states 300000 --graph-max-states 300000 --max-depth 80 --write
    - npx tsx prototypes/reality_anchor/reports/probe_dual_axis_candidate.ts prototypes/reality_anchor/reports/RA_LEX_2026_07_08_PL_VACATE_RECOVER_v2_layout.txt RA_LEX_2026_07_08_PL_VACATE_RECOVER_v2_core 300000 80 chain_force=force_chain push=push_object pull=pull_object
    - npx tsx prototypes/reality_anchor/reports/probe_event_count.ts prototypes/reality_anchor/reports/RA_LEX_2026_07_08_PL_VACATE_RECOVER_v2_layout.txt RA_LEX_2026_07_08_PL_VACATE_RECOVER_v2_pull_count pull_object 2 300000 80
    - npx tsx prototypes/reality_anchor/reports/probe_target_vacate.ts prototypes/reality_anchor/reports/RA_LEX_2026_07_08_PL_VACATE_RECOVER_v2_layout.txt RA_LEX_2026_07_08_PL_VACATE_RECOVER_v2_lower_target_vacate 5,3 300000 80
    - npx tsx prototypes/reality_anchor/reports/probe_fixed_anchor_candidate.ts prototypes/reality_anchor/reports/RA_LEX_2026_07_08_PL_VACATE_RECOVER_v2_layout.txt RA_LEX_2026_07_08_PL_VACATE_RECOVER_v2_pl_fixed_scan push_pull 300000 80
  solver_result:
    found: true
    cost: 10
    depth: 10
    inputs: right up right right up right down down left right
    event_counts:
      push_object:crate#1: 1
      force_chain:n2: 1
      pull_object:crate#2: 2
      walk: 7
  graph_facts:
    status: complete
    reachable_states: 20
    legal_transitions: 33
    winning_states: 1
    initial_scc_states: 2
    solution_irreversible_steps: 5
    forced_win_prefix: "5/5"
    relevant_branch: "after step 2 region has 2 commitments, 1 viable and 1 dead"
  winning_path_event_checks:
    core_probe:
      report: prototypes/reality_anchor/reports/event_probe_RA_LEX_2026_07_08_PL_VACATE_RECOVER_v2_core.md
      status: complete
      missing_chain_force_bypass: false
      missing_push_bypass: false
      missing_pull_bypass: false
    pull_count_probe:
      report: prototypes/reality_anchor/reports/event_count_probe_RA_LEX_2026_07_08_PL_VACATE_RECOVER_v2_pull_count_pull_object_min2.md
      status: complete
      bypass_below_two_pulls: false
    target_vacate_probe:
      report: prototypes/reality_anchor/reports/target_vacate_probe_RA_LEX_2026_07_08_PL_VACATE_RECOVER_v2_lower_target_vacate.md
      status: complete
      target: [5, 3]
      bypass_without_covered_uncovered_covered: false
    fixed_pl_scan:
      report: prototypes/reality_anchor/reports/fixed_anchor_probe_RA_LEX_2026_07_08_PL_VACATE_RECOVER_v2_pl_fixed_scan.md
      reachable_scan_status: complete
      forbidden_hits_anchor_boundary_shift_push_pull: none
  target_prune:
    report: prototypes/reality_anchor/reports/goal_prune_RA_LEX_2026_07_08_PL_VACATE_RECOVER_v2.zh.md
    upper_goal_deleted_cost: 1
    lower_goal_deleted_cost: 5
    interpretation: both retained; upper target forces vacating lower target, lower target forces recovery after upper pull

diagnostic_routing:
  evidence_reviewer:
    - Check whether target vacate claim is exactly supported by the target_vacate probe.
    - Check whether packet avoids overclaiming object identity despite repeated `pull_object:crate#2` labels.
    - Check whether fixed scan is used only for no reachable P/L shift.
  puzzle_critic:
    - Re-evaluate the previous v1 attacks after v2's lower-target vacate/recover debt.
    - Calibrate against RA_CAND_0011 as a stronger target-vacate positive and RA_CAND_0019 as obvious-action negative.
    - Decide whether v2 now reaches strong 3 / difficulty 3 despite small graph and scripted shape.

archive_lineage_policy:
  default: fresh_required
  authorized_archive_variant_work:
    enabled: false
  candidate_relation: fresh
  why_not_archive_variant: >
    Layout and route were built from lexicon entries plus v1 critic feedback. Archive was used for taste
    calibration and for rejecting 0019-adjacent B/S brush logic.

archive_taste_context:
  examples:
    - candidate_id: RA_CAND_0011
      scores: aesthetic 4 / difficulty 4
      relevance: Positive target-vacate/state-responsibility reference; v2 borrows the role principle, not the layout.
    - candidate_id: RA_CAND_0015
      scores: aesthetic 4 / difficulty 3
      relevance: Positive compact P/L application reference.
    - candidate_id: RA_CAND_0019
      scores: aesthetic 2 / difficulty 2
      relevance: Negative obvious first action and follow-up pulls; v2 must avoid being read as merely scripted.
    - candidate_id: RA_CAND_0018
      scores: aesthetic 3 / difficulty 2
      relevance: Lower bound for compact clean mechanism that may still be low difficulty.

lexicon_sources_used:
  - title: "P/L 边界交接：P 侧推链 -> 跨 P/L -> L 侧抽近端 -> 下方口袋打开"
    use: "主 recipe；两箱链先整体推过边界，再在 L 侧抽取。"
  - title: "P/L pull 抽取把手：前格门、footprint 门与扫带"
    use: "上拉与横拉均由 pull 前格/对象目标格门控制。"
  - title: "P/L 横向把手门 / footprint 门"
    use: "收紧 P/L 仓，避免 anchor 本体成为可移动支路。"
  - note: "未读取 mechanism_lab/runs。"
```
