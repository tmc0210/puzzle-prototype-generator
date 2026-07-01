# ICE_EXP_META_2026_07_01_round8_cross_wall_dual_fill_proposal_ready_with_caveats

```yaml
experiment_id: ICE_EXP_META_2026_07_01_round8_cross_wall_dual_fill_proposal_ready_with_caveats
prototype: ice_slide_escape
terminal_state: structural_redesign_needed
candidate_id: ICE_CAND_0027
review_integrity: independent_review
archive_eligibility: raw_run_only
human_final_status: pending
required_action: change_family
```

## Brief

继续 meta 优先设计尝试。上一轮 failed search 后，本轮转向“玩家区域物理隔离，
但冰块可远程跨墙作用”的结构族，避免继续生产 0020 水平 clean connector，也避免
复用上一轮 `short-stop wall -> d6 gate -> D-wall exit` 的局部结构族。

Hard gates:

```yaml
reject_if:
  - any selected A/B/C/D start solves a non-selected perimeter goal
  - any A or B start solves C or D
  - candidate substantially reuses an archive candidate layout, geometry, main causal chain, route, object placement, or entrance/exit relation
must_report:
  - A/B/C/D starts against every perimeter goal
review_rule:
  - required_action != none blocks proposal_ready and proposal_ready_with_caveats
```

## Archive Taste Context

只使用带人类评语的 archive candidate 做 taste calibration；未复用其 layout、几何、
主因果链、路线、对象摆放或入口出口关系。0025 只作为当前对话中的失败约束
提及，不作为有人类评语支持的 archive taste reference。

```yaml
used:
  ICE_CAND_0020:
    role: lower_bound_overclaim_calibration
    lesson: base/meta 单流程都偏 simple witness 时，跨时间复用不能拔高单流程复杂度；0020 可作为功能性调度拼图，不是本轮生产目标。
  ICE_CAND_0022:
    role: accepted_functional_meta_with_caveats
    lesson: 扎实 meta 可接受；base 轻和低污染本身是中性，只有与前期生态位匹配才成为价值。
  ICE_CAND_0024:
    role: positive_strong_meta_reference
    lesson: 更强 meta 依赖共享空间/要素复用、base-time 遮蔽、以及状态不兼容诱惑；本候选不按 0024 档过度声称。
```

## Candidate

```yaml
candidate_id: ICE_CAND_0027
version: ICE_CAND_0027_v1_cross_wall_dual_fill
interfaces:
  A: [0, 4]
  B: [0, 2]
  C: [13, 3]
  D: [13, 2]
base_instance:
  player_start: [0, 4]
  player_goal: [0, 2]
meta_instance:
  player_start: [13, 3]
  player_goal: [13, 2]
win_condition: ice_slide_escape_explicit_goal
```

```text
##############
#.....##.....#
......##......
#...IG#.....I.
.I.....#GI...#
#.....##.....#
##############
```

## Design Claim

```yaml
terminal_claim: >
  structural_redesign_needed. ICE_CAND_0027 is a typical wrong meta design:
  it overvalues mirrored same-logic reuse and clean routing evidence. It should
  not be submitted as a proposal.
player_insight: >
  Base asks the player to notice that the first left-side ice can fill a right-side
  target through d5 pass-through/restart even though the player never crosses the
  separator, then complete the left target locally. Meta asks the revisit player
  to reread the same two targets and stopper ice from the right side with local
  and remote roles exchanged.
causal_chain: >
  base: [1,4] right d5/restart fills [8,4] against [9,4] -> [4,3] right d1 fills
  [5,3]. meta: [12,3] left d5/restart fills [5,3] against [4,3] -> [9,4] left d1
  fills [8,4].
why_not_execution: >
  Solver, complete graph, SCC, required-event, and full perimeter routing evidence
  all support the route, but that evidence only proves execution and hard gates.
  It does not prove meta quality. The decisive failure is that base and meta are
  the same two-step logic in opposite directions.
falsification: >
  Reject or redesign if any selected start reaches a non-selected perimeter goal,
  if A or B can solve C or D, if either route has a win missing d5 pass-through /
  restart / short-stop events, if human review finds this too close to clean
  connector ecology, or if the mirror symmetry makes the meta route feel like
  repeating rather than rereading.
```

## Mechanism Scope

```yaml
central:
  - "base remote fill: [1,4] -> [8,4] through d5 pass-through/restart"
  - "base local fill: [4,3] -> [5,3]"
  - "meta remote fill: [12,3] -> [5,3] through d5 pass-through/restart"
  - "meta local fill: [9,4] -> [8,4]"
  - "same two targets and stopper ice exchange local/remote roles across base/meta"
support:
  - "staggered center walls keep A/B and C/D as separate player regions"
  - "explicit edge goals create left-in-left-out and right-in-right-out interfaces"
  - "d5 pass-through/restart lets ice act across the separator while wall topology stays closed"
incidental:
  - "outer empty cells used only for walking to exit after target completion"
  - "B as a selected start has no solvable perimeter goal; this is acceptable for the hard route gate but not a design feature"
```

## Evidence Summary

```yaml
base_analysis:
  ref: prototypes/ice_slide_escape/reports/layout_analysis_ICE_CAND_0027_v1_base_A_to_B.md
  found: true
  cost: 10
  pushes: 2
  graph_status: complete
  reachable_states: 191
  winning_states: 1
  key_events:
    - ice_pass_through_d5:len1
    - slide_restart_after_group
    - ice_blocks_ice_no_chain_push
    - ice_stop_short:d1
base_required_probe:
  ref: prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0027_v1_base_goal_B_required.md
  result: pass
  missing_required_win: none_found_complete
  explored: 190
meta_analysis:
  ref: prototypes/ice_slide_escape/reports/layout_analysis_ICE_CAND_0027_v1_meta_C_to_D.md
  found: true
  cost: 11
  pushes: 2
  graph_status: complete
  reachable_states: 691
  winning_states: 1
  key_events:
    - ice_pass_through_d5:len1
    - slide_restart_after_group
    - ice_blocks_ice_no_chain_push
    - ice_stop_short:d1
meta_required_probe:
  ref: prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0027_v1_meta_goal_D_required.md
  result: pass
  missing_required_win: none_found_complete
  explored: 799
evidence_caveat:
  - "objectParticipation is empty; object-identity claims are trace/snapshot supported, not all-solution identity proofs"
  - "required probes prove event-family necessity, not exact two-d1 count necessity"
```

## Routing Result

```yaml
edge_pair_scan:
  ref: prototypes/ice_slide_escape/reports/edge_pair_scan_ICE_CAND_0027_v1_ABCD.md
  method: selected_starts_against_all_perimeter_edge_goals
  perimeter_goals_checked: 38
  checked_pairs: 152
  ABCD_to_non_ABCD_edge: none_solved
  A_or_B_to_C_or_D:
    A_to_C: unsolved
    A_to_D: unsolved
    B_to_C: unsolved
    B_to_D: unsolved
  selected_interface_pairs_solved:
    A: ["A", "B"]
    B: []
    C: ["C", "D"]
    D: ["D", "C"]
  verdict_effect: pass_required_reachability_gate
```

Explicit edge reachability:

```text
A [0,4] solves only B [0,2] and A [0,4]; all other perimeter goals unsolved.
B [0,2] solves no perimeter goal.
C [13,3] solves only D [13,2] and C [13,3]; all other perimeter goals unsolved.
D [13,2] solves only D [13,2] and C [13,3]; all other perimeter goals unsolved.
```

## SCC / Graph Reading

```yaml
graph_interpretations:
  - graph_fact: "base graph complete: 191 states, 1 win; solution irreversible steps=2; forcedWinPrefix=2/2; initial SCC states=1,out=1,winOut=1,deadOut=0."
    neutral_meaning: "A->B has two irreversible solution commitments and both are forced among win-continuing commitments in the complete graph."
    player_facing_interpretation: "This supports a compact two-fill application, but graph facts alone do not make it high difficulty."
    verdict_effect: "support with caveat"
  - graph_fact: "meta graph complete: 691 states, 1 win; solution irreversible steps=2; winSubgraph=branching_win_dag; initial SCC states=26,out=7,winOut=2,deadOut=5; forcedWinPrefix=0/2."
    neutral_meaning: "C->D is solved in the complete graph, but the opening has multiple irreversible choices and the returned path is not a unique forced prefix."
    player_facing_interpretation: "Meta has some exploration surface, yet the core remains a short two-fill route rather than a long compound lock."
    verdict_effect: "support with caveat"
  - graph_fact: "edge scan checked 38 perimeter goals for each selected start; selected_to_nonselected_solved=0, early_to_late_solved=0, ABCD_to_nonselected_solved=0."
    neutral_meaning: "The selected edge interfaces are separated into left A/B and right C/D at the perimeter-goal level."
    player_facing_interpretation: "First-visit A/B cannot leak into the revisit C/D exits or stray perimeter exits; revisit C/D remains a right-side interface."
    verdict_effect: "hard routing gate passes"
```

## Review Loop

```yaml
review_1:
  candidate_version_reviewed: ICE_CAND_0027_v1_cross_wall_dual_fill
  evidence_reviewer:
    review_integrity: independent
    verdict: pass_with_caveats
    review_loop_state: proposal_ready_with_caveats
    required_action: none
    summary: >
      Solver, required-event probes, graph/SCC, and full-perimeter routing support
      serious-candidate status. Caveats: required probes prove event families,
      not object identity or exact count necessity; meta returned trace is not a
      unique fixed prefix.
  design_critic:
    review_integrity: independent
    verdict: proposal_ready_with_caveats
    required_action: none
    summary: >
      The strongest value is cross-time reuse: the same two targets, stopper ice,
      and center wall reading exchange local/remote roles. Base and meta are both
      compact two-push applications, not strong challenges. Submit only with clear
      caveats: this is stronger than 0020-style connector, but not 0024-level
      strong-reuse or high-difficulty meta.
```

## Post-Review Correction

```yaml
designer_correction:
  source: live_designer_feedback
  status: structural_redesign_needed
  not_recorded_as_human_archive_comment: true
  reason: >
    The candidate is a typical wrong meta design. It treats left/right mirrored
    same-logic reuse as meta rereading. Base and meta both execute remote d5 fill
    plus local d1 fill; the direction changes, but the player insight does not.
    Clean solver/routing evidence and shared elements were incorrectly allowed
    to compensate for lack of distinct logic chains.
design_lesson:
  - "Do not count mirrored same-logic reuse as different base/meta logic."
  - "Do not let hard routing, SCC, or required-event evidence stand in for quality."
  - "A valid meta revisit needs a new read, new debt, state incompatibility, delayed consumption, or another genuinely different logical interface."
  - "Cross-time reuse must produce reinterpretation, not just symmetric confirmation."
```

Critic attacks and designer actions:

```yaml
attacks:
  - type: taste
    text: "base/meta each have only two pushes and should not be overclaimed."
  - type: taste
    text: "event signatures are mirrored; meta value may feel like reversing rather than discovering a new lock."
  - type: taste
    text: "connector risk remains because the route is short: remote fill, local fill, exit."
  - type: evidence
    text: "objectParticipation is empty; do not state object-level all-solution identity."
post_review_designer_actions:
  - "downgraded terminal state to structural_redesign_needed"
  - "recorded as negative calibration for mirrored same-logic reuse"
  - "future attempts must change family and require distinct base/meta logic chains"
  - "reported B-start perimeter reachability exactly as no solvable perimeter goal"
```

## Terminal

```yaml
terminal_state: structural_redesign_needed
proposal_ready: false
required_action: change_family
human_priority: none
reason: >
  This should not be submitted as a proposal. It is useful only as negative
  calibration: physically separated regions, shared elements, and clean routing
  can still be a wrong meta design when base and meta remain the same mirrored
  logic chain.
```
