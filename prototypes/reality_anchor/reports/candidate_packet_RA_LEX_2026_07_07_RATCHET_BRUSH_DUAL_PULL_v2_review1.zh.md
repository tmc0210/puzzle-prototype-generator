# Candidate Packet: RA_LEX_2026_07_07_RATCHET_BRUSH_DUAL_PULL_v2 / review_1

```yaml
prototype_context:
  confirmed_rules:
    - P/L anchor defines push side vs pull side; anchor is movable rigid 1x2 and may be force-chained.
    - B/S anchor defines box side vs sticky side; moving it normalizes crates/sticky cells after legal moves.
    - Sticky cells are orthogonally connected rigid bodies; split cells can become independent after normalization.
    - Win requires every target to be covered by crate, sticky block, or anchor; player on target does not count.
  win_condition: all_targets_covered_by_objects
  object_and_event_semantics:
    - push_object / pull_object identify direct force mode.
    - anchor_boundary_shift:push_pull and anchor_boundary_shift:box_sticky identify moved anchors.
    - sticky_to_box means sticky material crossed to box side and became crate material.
    - move_sticky_rigid means a sticky rigid body moved.
  tool_boundary:
    - Runtime adapter / solver / graph / event probe are implemented.
    - Reality Anchor miner is raw_sampler only; not used as quality verdict.
    - PuzzleScript exporter unavailable.

slot_brief:
  intended_role: challenge / lexicon-composition application
  known_before: all_current_reality_anchor_runtime_rules
  target: combine lexicon structures into a new candidate, not an archive variant
  difficulty_or_support_expectation: at least 3; pursuing higher while keeping compact causal responsibility

mechanic_exposure_context:
  mechanic_window: full current Reality Anchor runtime
  allowed_exposure_through: all_current_reality_anchor_runtime_rules
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
  aesthetic_score_target: human-calibrated 3+ floor, aiming 4
  difficulty_score_target: 3+ floor, aiming challenge rather than witness
  target_role_notes: compact two-output consumption of one B/S brush result

solve_instance:
  id: RA_LEX_2026_07_07_RATCHET_BRUSH_DUAL_PULL_v2
  title: Ratchet brush dual pull v2
  layout: |-
    ##########
    #.PLBS.###
    #@.###..##
    #...#MMG.#
    #....G#..#
    #........#
    ##########
  player_start: [1, 2]
  player_goal: null
  win_condition: all_targets_covered_by_objects

mechanism_scope:
  central:
    - P/L long-axis ratchet push force-chains P/L and B/S one cell right.
    - That B/S brush cuts the horizontal sticky pair into C+M via sticky_to_box.
    - The C output is consumed by the lower single-cell pull pocket.
    - The M tail output is consumed by the right target pull pocket.
  allowed_support:
    - Walking/repositioning inside the lower room.
    - Pull-side semantics after the P/L shift.
  incidental_allowed:
    - Branching order among post-brush reposition states.
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
    The top P/L move is not a button. It is a one-cell ratchet stroke that also brushes the B/S boundary,
    selecting the downstream material output C+M. The two targets then prove both halves of that output:
    the C must be pulled into the lower single-cell pocket, and the sticky tail must later be pulled into
    the right target.
  causal_chain:
    - Observe the lower mouth rejects the original MM footprint: the lower target can only accept the left cell if it is cut free.
    - Use the top P/L long-axis push; because B/S is directly ahead, the force chain moves both anchors once.
    - B/S moves from boundary x=4/5 to x=5/6, converting the left sticky cell at x=5 into crate while leaving the x=6 tail sticky.
    - Pull crate#1 down from the lower target cell; this covers the lower goal and vacates the source cell.
    - Reposition to the right target and pull sticky#1 right; the sticky tail covers the right goal.
  why_not_execution: >
    A direct sticky manipulation route was found in v1 and removed by the x=4 wall. In v2, complete event probes
    show no winning path missing the ratchet push, both anchor shifts, the B/S cut, the crate pull, or the sticky-tail pull.
    The player must account for one output becoming crate and the other staying sticky; removing either target collapses
    the corresponding half of the chain.
  falsification:
    - A win without P/L+B/S anchor shift would falsify the ratchet-brush claim.
    - A win without sticky_to_box would falsify the cut-output claim.
    - A win without pull_object:crate#1 would falsify lower C-pocket consumption.
    - A win without pull_object:sticky#1 or move_sticky_rigid would falsify sticky-tail consumption.
    - If deleting either goal preserved the same event responsibilities, the goal would be redundant.

evidence:
  commands_run:
    - npx tsx src/cli.ts explain-layout prototypes/reality_anchor prototypes/reality_anchor/reports/RA_LEX_2026_07_07_RATCHET_BRUSH_DUAL_PULL_v2_layout.txt --id RA_LEX_2026_07_07_RATCHET_BRUSH_DUAL_PULL_v2 --targets K_runtime_smoke --max-states 300000 --graph-max-states 300000 --write
    - npx tsx prototypes/reality_anchor/reports/probe_dual_axis_candidate.ts prototypes/reality_anchor/reports/RA_LEX_2026_07_07_RATCHET_BRUSH_DUAL_PULL_v2_layout.txt RA_LEX_2026_07_07_RATCHET_BRUSH_DUAL_PULL_v2_core7 500000 200 pl_anchor_push=push_object:push_pull_anchor push_pull_shift=anchor_boundary_shift:push_pull box_sticky_shift=anchor_boundary_shift:box_sticky force_chain=force_chain cut_sticky_to_box=sticky_to_box crate_pull=pull_object:crate#1 tail_pull=pull_object:sticky#1 tail_rigid_move=move_sticky_rigid
    - npx tsx src/cli.ts explain-layout prototypes/reality_anchor prototypes/reality_anchor/reports/RA_LEX_2026_07_07_RATCHET_BRUSH_DUAL_PULL_v2_no_lower_goal_layout.txt --id RA_LEX_2026_07_07_RATCHET_BRUSH_DUAL_PULL_v2_no_lower_goal --targets K_runtime_smoke --max-states 300000 --graph-max-states 300000 --write
    - npx tsx src/cli.ts explain-layout prototypes/reality_anchor prototypes/reality_anchor/reports/RA_LEX_2026_07_07_RATCHET_BRUSH_DUAL_PULL_v2_no_tail_goal_layout.txt --id RA_LEX_2026_07_07_RATCHET_BRUSH_DUAL_PULL_v2_no_tail_goal --targets K_runtime_smoke --max-states 300000 --graph-max-states 300000 --write
  solver_result:
    found: true
    cost: 14
    inputs: up right down down down right right right down right right up up right
    events: walk, push_object:push_pull_anchor, force_chain:n2, anchor_boundary_shift:push_pull, anchor_boundary_shift:box_sticky, sticky_to_box:n1, pull_object:crate#1, pull_object:sticky#1, move_sticky_rigid
  trace_summary:
    - step_2: top force-chain moves P/L+B/S right and outputs C+M.
    - step_9: crate#1 is pulled down into the lower target.
    - step_14: sticky#1 is pulled right into the tail target.
  target_events:
    - lower target requires crate pull in intact candidate; deleting it produces a 12-step win with only sticky pull and no anchor shift / cut.
    - tail target requires sticky-tail pull in intact candidate; deleting it produces a 9-step win that stops after crate pull.
  object_or_instance_evidence:
    - Returned trace uses crate#1 for lower target and sticky#1 for right target.
    - Generic objectParticipation formatter did not report instance-level summary for this prototype; use trace events and snapshots.
  winning_path_event_checks:
    event_probe_RA_LEX_2026_07_07_RATCHET_BRUSH_DUAL_PULL_v2_core7:
      status: complete
      combined_missing_core_bypass: false
      individual_missing_bypass:
        pl_anchor_push: false
        push_pull_shift: false
        box_sticky_shift: false
        force_chain: false
        cut_sticky_to_box: false
        crate_pull: false
        tail_pull: false
        tail_rigid_move: false
  reachable_event_exposure:
    full_graph_status: complete
    reachable_states: 311
    legal_transitions: 786
    winning_states: 4
  graph_or_counterfactual_evidence:
    main_graph:
      status: complete
      initial_scc_states: 25
      initial_scc_out: 2
      initial_scc_win_out: 1
      initial_scc_dead_out: 1
      solution_irreversible_steps: 3
      handoff_scripted: 0/3
    no_lower_goal:
      cost: 12
      core_loss: bypasses anchor shifts, sticky_to_box, and crate pull; only tail pull remains.
    no_tail_goal:
      cost: 9
      core_loss: bypasses sticky-tail pull/rigid tail consumption.
  evidence_limits:
    - Does not claim unique input sequence.
    - Does not claim all win paths have fixed order beyond required event groups.
    - Does not claim object identity beyond returned trace labels and required exact event strings in probe.

diagnostic_routing:
  hard_evidence:
    - Verify event probe supports all central mechanism claims.
    - Check v1 bypass is not present in v2.
  mechanism_scope:
    - Central mechanism is ratchet-brush output plus dual pull-pocket consumption.
    - box_to_sticky is not central and not forbidden.
  claim_hygiene:
    - Fresh design; not an archive variant.
    - Existing archive used only for taste calibration.
  taste_probes:
    - Is this more than a two-step witness?
    - Does the top ratchet read as an output selector or as a forced button?
    - Does the tail target meaningfully consume the sticky half rather than acting as a side target?
  scc_graph:
    - Complete graph; initial dead-out exists but initial SCC has 25 states and first handoff is not scripted.
  variant_family:
    - v1 rejected internally because direct left pull of MM bypassed top ratchet/brush.
    - v2 walls that direct pull stance.
  start_position:
    - Start at [1,2] keeps a nontrivial initial SCC; adjacent-start variant had scripted_same_state_handoff.
  prototype_specific_work:
    opening_comfort_check: addressed through graph facts; no separate compare-start command used.
    goal_prune_check: two single-goal deletion counterfactuals run.
    redundant_element_prune: not run as full cleanup because this is human-pending candidate, not clean archive.

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
    Design was composed from lexicon structures, not from archive candidate layout, route, object roles, or causal chain.

attempt_log:
  serious_structural_attempts:
    - v1: same shape without x=4 wall; rejected after event probe found a 42-step win missing P/L and B/S shifts.
    - v2: added wall to remove direct MM pull stance; core event probe complete.
  local_repairs:
    - Added x=4 wall in row 3.
    - Kept [1,2] start after adjacent-start probe showed scripted same-state opening handoff.
  abandoned_families:
    - BIND_CUT_TAIL-like fixed boundary split was avoided to reduce duplication with current playable list.

archive_taste_context:
  examples:
    - candidate_id: RA_CAND_0005
      scores: aesthetic 4 / difficulty 4
      human_comment: >
        玩家侧矛盾明显，需要在推世界触及在拉世界的远目标，从而想到构造黏块+锚点的三格长链。
        结构有趣，机制利用率高，整体较好的挑战关。
      relevance: high-score dual-anchor challenge; calibrates visible player-side contradiction and compact mechanism use.
    - candidate_id: RA_CAND_0011
      scores: aesthetic 4 / difficulty 4
      human_comment: >
        箱子需要被推进目标再拉出需要较强反直觉洞见，在较小空间做出了紧凑的强逻辑关卡。
      relevance: calibrates compact state-responsibility and target vacate/reuse.
    - candidate_id: RA_CAND_0016
      scores: aesthetic 3 / difficulty 2
      human_comment: 强引导的黏块合并再切割教学
      relevance: lower-bound B/S timing example; clear but strongly guided should not be oversold.
    - candidate_id: RA_CAND_0006
      scores: aesthetic 2 / difficulty 5
      human_comment: >
        已有关卡的一个强复杂度的变体，用较小的目标位置改动极大地弱化机制美感并增加了腾挪难度，
        这种增加难度的方式实为较差的反例，仅做归档。
      relevance: negative anchor; warns against route tax or difficulty inflation without stronger mechanism beauty.
  none_found_reason: null

claim_last_review:
  mode: not_used
  facts_packet: null
  claim_packet: null
  read_order: not_applicable
```

## 设计语料使用记录

- `P/L 长轴墙廊：L 端余量棘轮`：顶部 P/L 只有一格可推进余量，推动后形成一次性 ratchet stroke。
- `B/S 移动边界刷产物：远程生成与门口消费`：P/L force-chain 同时推动 B/S，边界向右刷过下方 sticky pair。
- `固定 B/S 切割：C+M 尾巴与单格目标袋`：刷后输出 `C+M`，左格 crate 被下方单格 pull-pocket 消费。
- `刚体黏块 + 墙口 / 目标口消费`：右侧目标要求 sticky tail 作为 sticky rigid 被 pull 入目标，避免只证明材质转换事件。

## Evidence Refs

- `prototypes/reality_anchor/reports/layout_analysis_RA_LEX_2026_07_07_RATCHET_BRUSH_DUAL_PULL_v2.md`
- `prototypes/reality_anchor/reports/layout_analysis_RA_LEX_2026_07_07_RATCHET_BRUSH_DUAL_PULL_v2.json`
- `prototypes/reality_anchor/reports/event_probe_RA_LEX_2026_07_07_RATCHET_BRUSH_DUAL_PULL_v2_core7.md`
- `prototypes/reality_anchor/reports/event_probe_RA_LEX_2026_07_07_RATCHET_BRUSH_DUAL_PULL_v2_core7.json`
- `prototypes/reality_anchor/reports/layout_analysis_RA_LEX_2026_07_07_RATCHET_BRUSH_DUAL_PULL_v2_no_lower_goal.md`
- `prototypes/reality_anchor/reports/layout_analysis_RA_LEX_2026_07_07_RATCHET_BRUSH_DUAL_PULL_v2_no_tail_goal.md`
