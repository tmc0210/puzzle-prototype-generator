# Candidate Packet: RA_LEX_2026_07_07_STROKE_SELECT_CMM_PAIR_v1 / review_1

```yaml
prototype_context:
  confirmed_rules:
    - P/L anchor defines push side vs pull side; anchor is a movable rigid 1x2 and can be force-chained.
    - B/S anchor defines box side vs sticky side; moving it normalizes crate/sticky cells after legal moves.
    - Sticky cells are orthogonally connected rigid bodies; split/converted cells can become independent after normalization.
    - Win requires every target to be covered by crate, sticky block, or anchor; player on target does not count.
  tool_boundary:
    - Runtime adapter, solver, graph, agency, layout analyzer, and local probes are implemented.
    - PuzzleScript exporter is unavailable for this prototype.

slot_brief:
  intended_role: challenge / lexicon-composition application
  target: fresh lexicon-based design, not an archive variant
  difficulty_or_support_expectation: at least 3; pursue stronger only if player-side structure supports it

mechanic_exposure_context:
  mechanic_window: full current Reality Anchor runtime
  claimed_core_events:
    - push_object:push_pull_anchor
    - force_chain
    - anchor_boundary_shift:push_pull
    - anchor_boundary_shift:box_sticky
    - sticky_to_box
    - pull_object:crate#1
    - pull_object:sticky#1
    - move_sticky_rigid

design_target:
  aesthetic_score_target: human-calibrated 3+ floor, with 4 only if critic accepts stroke selection as meaningful
  difficulty_score_target: 3+ floor
  target_role_notes: compact stroke-selection variant of ratchet-brush output; C output and sticky-pair output both consumed

solve_instance:
  id: RA_LEX_2026_07_07_STROKE_SELECT_CMM_PAIR_v1
  title: Stroke select CMM pair v1
  layout: |-
    ###########
    #.PLBS..###
    #@.###...##
    #...#MMmG.#
    #....G###.#
    #.........#
    ###########
  player_start: [1, 2]
  win_condition: all_targets_covered_by_objects

mechanism_scope:
  central:
    - Top P/L can drive B/S by force-chain; first stroke brushes `MMmG` into `CMmG`.
    - The `C` output must be pulled into the lower single-cell target.
    - The remaining sticky pair must be consumed by the right-side target mouth through sticky rigid movement.
    - The second available stroke is a wrong early stroke: if it happens before sticky-pair consumption, complete search finds no win.
  allowed_support:
    - Repositioning through the lower/right corridor.
    - A second B/S shift after sticky-pair consumption is not forbidden; it is a post-consumption detour and not part of the central claim.
  required_winning_path_events:
    - push_object:push_pull_anchor
    - force_chain
    - anchor_boundary_shift:push_pull
    - anchor_boundary_shift:box_sticky
    - sticky_to_box
    - pull_object:crate#1
    - pull_object:sticky#1
    - move_sticky_rigid
  forbidden_winning_path_events: []
  forbidden_if_seen_anywhere: []

design_claim:
  player_insight: >
    The top ratchet is no longer just a one-step button: it has an apparent second stroke. The player must read
    the downstream target mouth and stop after the first B/S brush, preserving a sticky pair for the right target
    while splitting off a crate for the lower target. An early second stroke over-brushes the output into `CC+M`,
    which cannot satisfy the intact two-target right mouth.
  causal_chain:
    - Use the first top P/L push to force-chain P/L and B/S one cell right.
    - B/S crossing converts the left sticky cell into crate, producing `C+MM`.
    - Do not take the second top stroke before the sticky pair is consumed; the complete after-second-stroke graph has no winning state.
    - Pull the `C` down into the lower target.
    - Pull the sticky pair right so the right-side target mouth is covered by sticky rigid movement.
  why_not_execution: >
    The main route has only three object interactions plus a visible wrong over-stroke branch, so the risk is route tax rather
    than mechanical impossibility. The hard claim is not unique input sequence or exactly-one-shift globally; it is that all
    first-win paths need the core event set, and any second B/S shift before sticky-pair pull is losing.
  falsification:
    - A first win missing P/L+B/S shift, force-chain, sticky_to_box, crate pull, sticky pull, or sticky rigid movement falsifies the core chain.
    - A first win with the second B/S shift before `pull_object:sticky#1` falsifies the stroke-selection claim.
    - A win from the immediate after-second-stroke state falsifies the over-brush failure claim.
    - If deleting the lower target or right target mouth preserves the same responsibilities, the target structure is redundant.

evidence:
  commands_run:
    - npx tsx src/cli.ts explain-layout prototypes/reality_anchor prototypes/reality_anchor/reports/RA_LEX_2026_07_07_STROKE_SELECT_CMM_PAIR_v1_layout.txt --id RA_LEX_2026_07_07_STROKE_SELECT_CMM_PAIR_v1 --targets K_runtime_smoke --max-states 300000 --graph-max-states 300000 --write
    - npx tsx prototypes/reality_anchor/reports/probe_dual_axis_candidate.ts prototypes/reality_anchor/reports/RA_LEX_2026_07_07_STROKE_SELECT_CMM_PAIR_v1_layout.txt RA_LEX_2026_07_07_STROKE_SELECT_CMM_PAIR_v1_core 500000 200 pl_anchor_push=push_object:push_pull_anchor push_pull_shift=anchor_boundary_shift:push_pull box_sticky_shift=anchor_boundary_shift:box_sticky force_chain=force_chain cut_sticky_to_box=sticky_to_box crate_pull=pull_object:crate#1 pair_pull=pull_object:sticky#1 pair_rigid_move=move_sticky_rigid
    - npx tsx src/cli.ts explain-layout prototypes/reality_anchor prototypes/reality_anchor/reports/RA_LEX_2026_07_07_STROKE_SELECT_CMM_PAIR_v1_after_second_stroke_layout.txt --id RA_LEX_2026_07_07_STROKE_SELECT_CMM_PAIR_v1_after_second_stroke --targets K_runtime_smoke --max-states 300000 --graph-max-states 300000 --max-depth 120 --write
    - npx tsx prototypes/reality_anchor/reports/probe_second_count_before_event.ts prototypes/reality_anchor/reports/RA_LEX_2026_07_07_STROKE_SELECT_CMM_PAIR_v1_layout.txt RA_LEX_2026_07_07_STROKE_SELECT_CMM_PAIR_v1_second_shift_before_pair_pull anchor_boundary_shift:box_sticky pull_object:sticky#1 500000 200
    - npx tsx prototypes/reality_anchor/reports/probe_event_at_least.ts prototypes/reality_anchor/reports/RA_LEX_2026_07_07_STROKE_SELECT_CMM_PAIR_v1_layout.txt RA_LEX_2026_07_07_STROKE_SELECT_CMM_PAIR_v1_two_bs_shifts_fixed anchor_boundary_shift:box_sticky 2 500000 200
    - npx tsx prototypes/reality_anchor/reports/probe_event_at_least_first_win.ts prototypes/reality_anchor/reports/RA_LEX_2026_07_07_STROKE_SELECT_CMM_PAIR_v1_layout.txt RA_LEX_2026_07_07_STROKE_SELECT_CMM_PAIR_v1_two_bs_shifts_first_win anchor_boundary_shift:box_sticky 2 500000 200
    - npx tsx src/cli.ts explain-layout prototypes/reality_anchor prototypes/reality_anchor/reports/RA_LEX_2026_07_07_STROKE_SELECT_CMM_PAIR_v1_no_lower_goal_layout.txt --id RA_LEX_2026_07_07_STROKE_SELECT_CMM_PAIR_v1_no_lower_goal --targets K_runtime_smoke --max-states 300000 --graph-max-states 300000 --write
    - npx tsx src/cli.ts explain-layout prototypes/reality_anchor prototypes/reality_anchor/reports/RA_LEX_2026_07_07_STROKE_SELECT_CMM_PAIR_v1_no_right_pair_goals_layout.txt --id RA_LEX_2026_07_07_STROKE_SELECT_CMM_PAIR_v1_no_right_pair_goals --targets K_runtime_smoke --max-states 300000 --graph-max-states 300000 --write
    - npx tsx src/cli.ts explain-layout prototypes/reality_anchor prototypes/reality_anchor/reports/RA_LEX_2026_07_07_STROKE_SELECT_CMM_PAIR_v1_no_rightmost_goal_layout.txt --id RA_LEX_2026_07_07_STROKE_SELECT_CMM_PAIR_v1_no_rightmost_goal --targets K_runtime_smoke --max-states 300000 --graph-max-states 300000 --write
    - npx tsx src/cli.ts explain-layout prototypes/reality_anchor prototypes/reality_anchor/reports/RA_LEX_2026_07_07_STROKE_SELECT_CMM_PAIR_v1_no_left_pair_goal_layout.txt --id RA_LEX_2026_07_07_STROKE_SELECT_CMM_PAIR_v1_no_left_pair_goal --targets K_runtime_smoke --max-states 300000 --graph-max-states 300000 --write
    - npx tsx prototypes/reality_anchor/reports/probe_second_count_before_event.ts prototypes/reality_anchor/reports/RA_LEX_2026_07_07_STROKE_SELECT_CMM_PAIR_v1_no_left_pair_goal_layout.txt RA_LEX_2026_07_07_STROKE_SELECT_CMM_PAIR_v1_no_left_pair_goal_second_shift_before_pair_pull anchor_boundary_shift:box_sticky pull_object:sticky#1 500000 200
  solver_result:
    found: true
    cost: 17
    inputs: up right down down down right right right down right right right right up up left right
    events: walk, push_object:push_pull_anchor, force_chain:n2, anchor_boundary_shift:push_pull, anchor_boundary_shift:box_sticky, sticky_to_box:n1, pull_object:crate#1, pull_object:sticky#1, move_sticky_rigid
  trace_summary:
    - step_2: P/L+B/S shift by force-chain; `MMmG` becomes `CMmG`.
    - step_9: crate#1 is pulled down into the lower target.
    - step_17: sticky#1 is pulled right; sticky rigid movement covers the right target mouth.
  winning_path_event_checks:
    event_probe_RA_LEX_2026_07_07_STROKE_SELECT_CMM_PAIR_v1_core:
      status: complete
      combined_missing_core_bypass: false
      individual_missing_bypass:
        pl_anchor_push: false
        push_pull_shift: false
        box_sticky_shift: false
        force_chain: false
        cut_sticky_to_box: false
        crate_pull: false
        pair_pull: false
        pair_rigid_move: false
  stroke_selection_checks:
    after_second_stroke_graph:
      status: complete
      solved: false
      reachable_states: 102
      winning_states: 0
    second_shift_before_pair_pull:
      status: complete
      found_winning_violation: false
    two_bs_shifts_global:
      found: true
      interpretation: second shift can occur after sticky-pair consumption and before lower crate completion; not used as a forbidden-event claim.
      evidence_note: use the fixed / first-win artifacts; the pre-fix event_at_least artifact that allowed post-win expansion is legacy-only and not part of the claim.
  reachable_event_exposure:
    full_graph_status: complete
    reachable_states: 3384
    legal_transitions: 8502
    winning_states: 6
  graph_or_counterfactual_evidence:
    main_graph:
      status: complete
      initial_scc_states: 22
      initial_scc_out: 2
      initial_scc_win_out: 1
      initial_scc_dead_out: 1
      solution_irreversible_steps: 4
      forced_win_prefix: 1/4
      handoff_scripted: 1/4
    no_lower_goal:
      status: complete
      cost: 15
      core_loss: no anchor shift, no sticky_to_box, no crate pull; only sticky-pair pull remains.
    no_right_pair_goals:
      status: complete
      cost: 9
      core_loss: stops after crate pull; no sticky-pair pull or sticky rigid target consumption.
    no_rightmost_goal:
      status: complete
      cost: 9
      core_loss: same as no_right_pair_goals; rightmost target is required for sticky-pair consumption.
    no_left_pair_goal:
      status: complete
      main_route_still_solved: true
      second_shift_before_pair_pull_violation: true
      interpretation: left pre-covered target is not needed for returned route, but it blocks the early-overbrush repair path and is part of the stroke-selection constraint.
  evidence_limits:
    - Does not claim unique input sequence.
    - Does not claim all winning paths have fixed event order except the tested no-second-B/S-shift-before-sticky-pull condition.
    - Does not claim all wins have exactly one B/S shift; a second shift after sticky-pair consumption is possible.
    - Object identity is limited to returned trace labels and event probe exact strings.

diagnostic_routing:
  hard_evidence:
    - Verify complete event probe supports required winning path events.
    - Verify after-second-stroke no-win and second-shift-before-pair-pull no-win support the stroke-selection claim.
  taste_probes:
    - Is the second-stroke threat enough to avoid the forced-button criticism from RATCHET_BRUSH_DUAL_PULL_v2?
    - Is route tax still too high: 17 cost, 14 walk, only 3 object interactions in the returned shortest solution?
    - Does the left pre-covered target read as a meaningful anti-overbrush lock or as hidden redundancy?
  scc_graph:
    - Complete graph; opening still has one viable and one dead commitment.
    - The branch after first stroke is stronger than v2 because early second B/S shift is a reachable, complete-fail overbrush branch.

archive_lineage_policy:
  default: fresh_required
  authorized_archive_variant_work:
    enabled: false
  candidate_relation: fresh
  why_not_archive_variant: >
    Design was composed from current lexicon entries. Archive was used only for taste calibration, not as a layout or route source.

archive_taste_context:
  examples:
    - candidate_id: RA_CAND_0005
      scores: aesthetic 4 / difficulty 4
      human_comment: 玩家侧矛盾明显，需要在推世界触及在拉世界的远目标，从而想到构造黏块+锚点的三格长链。
      relevance: calibrates visible cross-system contradiction and compact mechanism coupling.
    - candidate_id: RA_CAND_0011
      scores: aesthetic 4 / difficulty 4
      human_comment: 箱子需要被推进目标再拉出需要较强反直觉洞见，在较小空间做出了紧凑的强逻辑关卡。
      relevance: calibrates state responsibility and non-route-tax challenge.
    - candidate_id: RA_CAND_0016
      scores: aesthetic 3 / difficulty 2
      human_comment: 强引导的黏块合并再切割教学
      relevance: lower bound for clear but guided B/S timing.
    - candidate_id: RA_CAND_0006
      scores: aesthetic 2 / difficulty 5
      human_comment: 小目标位置改动弱化机制美感并增加腾挪难度，较差反例。
      relevance: warns against route tax and complexity inflation.

claim_last_review:
  mode: not_used
```

## 设计语料使用记录

- `P/L 长轴墙廊：L 端余量棘轮`：顶部 P/L 走廊保留两格余量，让第二 stroke 成为可见错误选择，而不是把 P/L 写成单次按钮。
- `B/S 移动边界刷产物：远程生成与门口消费`：P/L force-chain 远程推动 B/S，把三格 sticky footprint 刷成 `C+MM`。
- `固定 B/S 切割：C+M 尾巴与单格目标袋` 的扩展建议：把二格 `C+M` 扩为三格 `C+MM`，左格 crate 被下目标消费，右侧 sticky 债保留。
- `刚体黏块 + 墙口 / 目标口消费`：右侧目标口消费 sticky rigid movement；删除左侧预覆盖目标会恢复早二刷修复路径，说明该口也在承担 overbrush lock。
