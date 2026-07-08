# Candidate Packet: RA_LEX_2026_07_08_PL_CHAIN_END_PULL_DUAL_POCKET_v1 / review_1

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
  target: difficulty 3+ floor; strong aesthetic 3 floor, not claiming 4 without critic support
  process_note: >
    Earlier B/S brush attempt was abandoned after explicit RA_CAND_0019 comparison because it was too close to
    the human-reviewed "obvious moving B/S brush" negative anchor.

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
  aesthetic_score_target: "strong 3; possible low 4 only if critic values the compact fixed-boundary handoff."
  difficulty_score_target: "3; difficulty comes from P-side chain handoff plus two L-side endpoint pulls."
  target_role_notes: >
    A small fixed-P/L boundary puzzle. The same two-crate chain first behaves as a push chain, then as two
    independent pull endpoints once the player crosses into L-side semantics.

solve_instance:
  id: RA_LEX_2026_07_08_PL_CHAIN_END_PULL_DUAL_POCKET_v1
  title: PL chain end pull dual pocket v1
  layout: |-
    ##########
    ##PL.#####
    ###.G#####
    #.@CC.G..#
    ###.....##
    ##########
  player_start: [2, 3]
  win_condition: all_targets_covered_by_objects

mechanism_scope:
  central:
    - Fixed P/L boundary makes the start cell push-side and the post-push corridor pull-side.
    - The two crates initially form a chain that also blocks the lower bypass entrance.
    - The first winning progress commitment must push the two-crate chain right with `force_chain:n2`, opening the old crate cell as access to the lower bypass.
    - In L-side semantics the player cannot continue pushing the chain from the left; the right endpoint must be pulled into the right target.
    - The remaining left endpoint must then be pulled upward into the upper target pocket.
  allowed_support:
    - Walking through the lower bypass to reach right and upper pull stances.
    - Equivalent walking order inside the same reversible regions.
  required_winning_path_events:
    - push_object
    - force_chain
    - pull_object
    - "pull_object count >= 2"
  forbidden_winning_path_events:
    - anchor_boundary_shift:push_pull
  evidence_limits:
    - Do not claim unique input sequence.
    - Do not claim crate instance identities are globally meaningful; exact labels are returned-trace labels only.
    - Do not use graph completeness as taste evidence.

design_claim:
  player_insight: >
    The player must stop reading the two crates as a normal push chain after the first move. Crossing the fixed
    P/L boundary changes the only viable manipulation into endpoint extraction: one endpoint is pulled sideways
    into the right target, and the other is pulled upward into the upper target.
  causal_chain:
    - Push the two-crate chain once from P side; this both crosses the boundary and opens the lower bypass.
    - Use the bypass to stand on the right target and pull the right endpoint into it.
    - Return to the upper pocket stance and pull the remaining endpoint upward into the upper target.
  why_not_RA_CAND_0019: >
    RA_CAND_0019 is a moving B/S brush that cuts material output and then consumes C/sticky products; it was
    human-scored aesthetic 2 / difficulty 2 because the opening push and following pulls were too obvious.
    This candidate has no B/S, no material conversion, no sticky output, and no moving anchor. Its responsibility
    is fixed-P/L semantic handoff of a crate chain, not brush-product assignment.

evidence:
  commands_run:
    - npx tsx src/cli.ts explain-layout prototypes/reality_anchor prototypes/reality_anchor/reports/RA_LEX_2026_07_08_PL_CHAIN_END_PULL_DUAL_POCKET_v1_layout.txt --id RA_LEX_2026_07_08_PL_CHAIN_END_PULL_DUAL_POCKET_v1 --title "PL chain end pull dual pocket v1" --role challenge --support none --targets K_runtime_smoke --max-states 300000 --graph-max-states 300000 --max-depth 80 --write
    - npx tsx prototypes/reality_anchor/reports/probe_dual_axis_candidate.ts prototypes/reality_anchor/reports/RA_LEX_2026_07_08_PL_CHAIN_END_PULL_DUAL_POCKET_v1_layout.txt RA_LEX_2026_07_08_PL_CHAIN_END_PULL_DUAL_POCKET_v1_core 300000 80 chain_force=force_chain push=push_object pull=pull_object
    - npx tsx prototypes/reality_anchor/reports/probe_event_count.ts prototypes/reality_anchor/reports/RA_LEX_2026_07_08_PL_CHAIN_END_PULL_DUAL_POCKET_v1_layout.txt RA_LEX_2026_07_08_PL_CHAIN_END_PULL_DUAL_POCKET_v1_pull_count pull_object 2 300000 80
    - npx tsx prototypes/reality_anchor/reports/probe_event_order.ts prototypes/reality_anchor/reports/RA_LEX_2026_07_08_PL_CHAIN_END_PULL_DUAL_POCKET_v1_layout.txt RA_LEX_2026_07_08_PL_CHAIN_END_PULL_DUAL_POCKET_v1_no_pull_before_chain pull_object force_chain 300000 80
    - npx tsx prototypes/reality_anchor/reports/probe_fixed_anchor_candidate.ts prototypes/reality_anchor/reports/RA_LEX_2026_07_08_PL_CHAIN_END_PULL_DUAL_POCKET_v1_layout.txt RA_LEX_2026_07_08_PL_CHAIN_END_PULL_DUAL_POCKET_v1_pl_fixed_scan push_pull 300000 80
  solver_result:
    found: true
    cost: 16
    depth: 16
    inputs: right down right right right up right down left left left left up up right up
    event_counts:
      push_object:crate#1: 1
      force_chain:n2: 1
      pull_object:crate#2: 1
      pull_object:crate#1: 1
      walk: 13
  graph_facts:
    status: complete
    reachable_states: 30
    legal_transitions: 52
    winning_states: 1
    initial_scc_states: 2
    solution_irreversible_steps: 4
    forced_win_prefix: "4/4"
  winning_path_event_checks:
    core_probe:
      report: prototypes/reality_anchor/reports/event_probe_RA_LEX_2026_07_08_PL_CHAIN_END_PULL_DUAL_POCKET_v1_core.md
      status: complete
      missing_chain_force_bypass: false
      missing_push_bypass: false
      missing_pull_bypass: false
    pull_count_probe:
      report: prototypes/reality_anchor/reports/event_count_probe_RA_LEX_2026_07_08_PL_CHAIN_END_PULL_DUAL_POCKET_v1_pull_count_pull_object_min2.md
      status: complete
      bypass_below_two_pulls: false
    order_probe:
      report: prototypes/reality_anchor/reports/order_probe_RA_LEX_2026_07_08_PL_CHAIN_END_PULL_DUAL_POCKET_v1_no_pull_before_chain.md
      status: complete
      pull_before_chain_win: false
    fixed_pl_scan:
      report: prototypes/reality_anchor/reports/fixed_anchor_probe_RA_LEX_2026_07_08_PL_CHAIN_END_PULL_DUAL_POCKET_v1_pl_fixed_scan.md
      reachable_scan_status: complete
      forbidden_hits_anchor_boundary_shift_push_pull: none
  target_prune:
    report: prototypes/reality_anchor/reports/goal_prune_RA_LEX_2026_07_08_PL_CHAIN_END_PULL_DUAL_POCKET_v1.zh.md
    upper_goal_deleted_cost: 7
    right_goal_deleted_cost: 4
    interpretation: both targets retained; each removes one endpoint pull responsibility if deleted

diagnostic_routing:
  evidence_reviewer:
    - Check whether evidence supports the exact claim boundaries without overclaiming crate identity.
    - Check whether fixed P/L scan is used only for no reachable anchor shift.
    - Check whether target deletion supports both target responsibilities.
  puzzle_critic:
    - Calibrate against RA_CAND_0015 and RA_CAND_0011 as stronger P/L positives.
    - Attack against RA_CAND_0019 obviousness and against scripted-tiny-graph risk.
    - Decide whether this is strong 3 / difficulty 3 or merely a clean 2.

archive_lineage_policy:
  default: fresh_required
  authorized_archive_variant_work:
    enabled: false
  candidate_relation: fresh
  why_not_archive_variant: >
    Layout and route were built from lexicon entries, not from archive layouts. Archive was used for taste
    calibration and for rejecting the earlier 0019-adjacent B/S brush attempt.

archive_taste_context:
  examples:
    - candidate_id: RA_CAND_0015
      scores: aesthetic 4 / difficulty 3
      relevance: Positive P/L compact application; stronger because it combines anchor movement and crate push/pull.
    - candidate_id: RA_CAND_0011
      scores: aesthetic 4 / difficulty 4
      relevance: Positive compact P/L state-responsibility reference; stronger due target-vacate inversion.
    - candidate_id: RA_CAND_0019
      scores: aesthetic 2 / difficulty 2
      relevance: Negative moving B/S brush obviousness; explicitly used to reject the abandoned brush candidate.
    - candidate_id: RA_CAND_0018
      scores: aesthetic 3 / difficulty 2
      relevance: Lower-bound compact fixed B/S split; warns that a clean mechanism witness is not automatically hard.

lexicon_sources_used:
  - title: "P/L 边界交接：P 侧推链 -> 跨 P/L -> L 侧抽近端 -> 下方口袋打开"
    use: "主 recipe；两箱链先整体推过边界，再在 L 侧抽取端点。"
  - title: "P/L pull 抽取把手：前格门、footprint 门与扫带"
    use: "两次 pull 的前格/目标格约束，用目标袋消费玩家旧站位。"
  - title: "P/L 横向把手门 / footprint 门"
    use: "P/L 锚点仓收紧时用于区分锚点本体是否能被误移动；最终 fixed scan 无 shift。"
  - note: "未读取 mechanism_lab/runs。"
```
