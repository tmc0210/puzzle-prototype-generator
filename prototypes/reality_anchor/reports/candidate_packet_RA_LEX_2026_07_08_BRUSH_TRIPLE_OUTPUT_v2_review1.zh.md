# Candidate Packet: RA_LEX_2026_07_08_BRUSH_TRIPLE_OUTPUT_v2 / review_1

```yaml
prototype_context:
  confirmed_rules:
    - B/S anchor defines box side / sticky side; objects crossing the boundary normalize material during legal move resolution.
    - B/S anchor can be pushed as an object, shifting the boundary relative to remote objects.
    - Sticky cells form orthogonally connected rigid components and move as one rigid body.
    - Sticky merging can turn a crate crossing into a larger rigid sticky footprint.
    - Crate, sticky, and anchors can cover goals; player standing on a goal does not count.
  win_condition: all_targets_covered_by_objects
  object_and_event_semantics:
    C: crate / box-side material
    M: sticky cell / sticky-side material
    B/S: movable box-sticky boundary anchor
    returned_trace_events:
      box_to_sticky:n1: the opening C crosses to sticky side and becomes sticky
      sticky_merge:n1: that new sticky cell merges with the existing MM pair
      move_sticky_rigid: a sticky component moves as a rigid body
      anchor_boundary_shift:box_sticky: pushed B/S shifts the boundary
      sticky_to_box:n1: one sticky cell is swept to box side and becomes C
  tool_boundary:
    - Runtime adapter, solver, full graph, agency/SCC digest, trace replay, local event probes, event-count probes, and order probes are available.
    - PuzzleScript exporter is not used for this prototype.
```

## Slot Brief

- intended_role: challenge / fresh lexicon-composition candidate
- known_before: `K_runtime_smoke`
- target:
  - 全新设计并提交合格候选加入试玩列表。
  - 难度至少 3，追求更高。
  - 审美强 3 保底，追求 4 到 5。
  - 本轮测试 designer 使用 `mechanism_lab/lexicon.md` 的设计语料能力；同目录 `runs/` 不作为设计来源。
- difficulty_or_support_expectation: difficulty 3 floor; aesthetic strong 3 floor. Do not self-claim stable 4+ unless critic supports it.

## Solve Instance

```yaml
id: RA_LEX_2026_07_08_BRUSH_TRIPLE_OUTPUT_v2
title: Brush triple output v2
role: challenge
support: none
layout: |-
  #############
  ######.G#####
  #####@C.MM###
  #####.....G##
  #####...G####
  #####.BS..###
  #############
player_start: [5, 2]
win_condition: all_targets_covered_by_objects
```

## Lexicon Use

This candidate used only `prototypes/reality_anchor/mechanism_lab/lexicon.md`; `mechanism_lab/runs/` was not read.

- `B/S 绑定债：箱资源生成刚体 footprint`
  - Opening C is deliberately pushed across B/S to bind with MM and create `MMM`.
- `B/S 移动边界刷产物：远程生成与门口消费`
  - The player pushes B/S twice so the boundary sweeps the remote `MMM` into `CMM` then `CCM`.
- `固定 B/S 切割：C+M 尾巴与单格目标袋` tail-debt principle
  - The candidate borrows the idea that cut outputs must be consumed, but avoids the rejected fixed B/S cut-tail layout family.
- `刚体黏块 + 墙口`
  - The three-cell sticky footprint and final sticky tail are consumed through target-mouth movement.

## Mechanism Scope

central:

- Opening C must become sticky and merge with the existing MM, making `MMM`.
- `MMM` must move as a sticky rigid body to the remote brush lane.
- B/S must be pushed right twice, producing two boundary shifts and two `sticky_to_box` conversions.
- The resulting `CCM` must be split into three consumed responsibilities:
  - top C target
  - lower C target
  - right M tail target

allowed_support:

- ordinary walking around the compressed corridor
- equivalent reversible repositioning inside SCC regions

incidental_allowed:

- a longer win can produce an early `sticky_to_box` before the main merge; this is not part of the claim.
- event identity is claimed by group/count, not by object instance uniqueness.

required_winning_path_events:

- `box_to_sticky`
- `sticky_merge`
- `move_sticky_rigid`
- `anchor_boundary_shift:box_sticky`
- `sticky_to_box`

required_winning_path_event_counts:

- `anchor_boundary_shift:box_sticky >= 2`
- `sticky_to_box >= 2`
- `move_sticky_rigid >= 2`

forbidden_winning_path_events: []
forbidden_if_seen_anywhere: []

explicit_non_claims:

- no `force_chain` core claim
- no all-win `sticky_merge` before any `sticky_to_box` order claim
- no per-object identity uniqueness claim
- no exhaustive minimality theorem for every wall/floor cell

## Design Claim

player_insight:

The player must read the single C as an input to a future sticky footprint, not as a target-filler. After C joins MM into `MMM`, the puzzle asks for a second abstraction: push the B/S anchor, not the payload, to brush the remote footprint into distinct material outputs. The payoff is three-way allocation: two C outputs and one sticky tail.

causal_chain:

1. Push C right across B/S: `C + MM -> MMM`.
2. Move `MMM` down as a rigid sticky body.
3. Walk back to B/S and push B/S right once: `MMM -> CMM`.
4. Push B/S right again: `CMM -> CCM`.
5. Push the left C up twice to the top target.
6. Push the second C down to the lower target.
7. Push the remaining M right into the right target.

why_not_execution_only:

- Complete core probe shows every win needs all five event groups.
- Count probes show every win needs two B/S shifts, two sticky-to-box conversions, and two sticky rigid moves.
- Goal deletion counterfactuals show each target removes a distinct downstream responsibility:
  - top deletion admits a one-cut win (`sticky_to_box` count 1)
  - right deletion removes the final sticky-tail move (`move_sticky_rigid` count 1)
  - lower deletion admits a one-cut win (`sticky_to_box` count 1)
- v2 prunes v1's open left room while keeping the same event chain, improving visual tightness.

falsification:

- A winning path in the main layout without any of the five core event groups refutes the mechanism.
- A winning path in the main layout with fewer than two B/S shifts, fewer than two `sticky_to_box`, or fewer than two sticky-rigid moves refutes the triple-output claim.
- A critic reading the upper target as weak should account for the no-top deletion result: same shortest cost, but many more winning states and a low-count one-cut bypass.
- A critic reading this as fixed B/S cut-tail lineage should compare the active step: this candidate relies on movable-boundary brushing, not one fixed return cut.

## Evidence

commands_run:

- `npx tsx src/cli.ts explain-layout prototypes/reality_anchor prototypes/reality_anchor/reports/RA_LEX_2026_07_08_BRUSH_TRIPLE_OUTPUT_v2_layout.txt --id RA_LEX_2026_07_08_BRUSH_TRIPLE_OUTPUT_v2 --title "Brush triple output v2" --role challenge --support none --targets K_runtime_smoke --write --max-states 300000 --max-depth 120`
- `npx tsx prototypes/reality_anchor/reports/trace_layout.ts prototypes/reality_anchor/reports/RA_LEX_2026_07_08_BRUSH_TRIPLE_OUTPUT_v2_layout.txt RA_LEX_2026_07_08_BRUSH_TRIPLE_OUTPUT_v2 "right up right down left down down left down right right up up up right down right" 300000 120`
- `npx tsx prototypes/reality_anchor/reports/probe_dual_axis_candidate.ts prototypes/reality_anchor/reports/RA_LEX_2026_07_08_BRUSH_TRIPLE_OUTPUT_v2_layout.txt RA_LEX_2026_07_08_BRUSH_TRIPLE_OUTPUT_v2_core5 300000 120 "box_to_sticky=box_to_sticky" "sticky_merge=sticky_merge" "sticky_rigid=move_sticky_rigid" "bs_shift=anchor_boundary_shift:box_sticky" "sticky_cut=sticky_to_box"`
- `npx tsx prototypes/reality_anchor/reports/probe_event_count.ts prototypes/reality_anchor/reports/RA_LEX_2026_07_08_BRUSH_TRIPLE_OUTPUT_v2_layout.txt RA_LEX_2026_07_08_BRUSH_TRIPLE_OUTPUT_v2_bs_shift_min2 anchor_boundary_shift:box_sticky 2 300000 120`
- `npx tsx prototypes/reality_anchor/reports/probe_event_count.ts prototypes/reality_anchor/reports/RA_LEX_2026_07_08_BRUSH_TRIPLE_OUTPUT_v2_layout.txt RA_LEX_2026_07_08_BRUSH_TRIPLE_OUTPUT_v2_sticky_to_box_min2 sticky_to_box 2 300000 120`
- `npx tsx prototypes/reality_anchor/reports/probe_event_count.ts prototypes/reality_anchor/reports/RA_LEX_2026_07_08_BRUSH_TRIPLE_OUTPUT_v2_layout.txt RA_LEX_2026_07_08_BRUSH_TRIPLE_OUTPUT_v2_move_sticky_min2 move_sticky_rigid 2 300000 120`
- `explain-layout` and count probes for no-top, no-right, and no-lower target deletion variants.
- `npx tsx prototypes/reality_anchor/reports/probe_event_order.ts prototypes/reality_anchor/reports/RA_LEX_2026_07_08_BRUSH_TRIPLE_OUTPUT_v2_layout.txt RA_LEX_2026_07_08_BRUSH_TRIPLE_OUTPUT_v2_no_cut_before_merge sticky_to_box sticky_merge 300000 120`

solver_result:

```yaml
found: true
cost: 17
depth: 17
inputs: "right up right down left down down left down right right up up up right down right"
event_counts:
  push_object:crate#1: 3
  box_to_sticky:n1: 1
  sticky_merge:n1: 1
  walk: 9
  push_object:sticky#1: 2
  move_sticky_rigid: 2
  push_object:box_sticky_anchor: 2
  anchor_boundary_shift:box_sticky: 2
  sticky_to_box:n1: 2
  push_object:crate#2: 1
graph:
  status: complete
  reachable_states: 5140
  legal_transitions: 14372
  winning_states: 4
```

trace_summary:

- step 1 right: C crosses to sticky side and merges with MM into `MMM`.
- step 4 down: `MMM` moves down as a rigid body.
- step 10 right: B/S shift cuts first M into C, producing `CMM`.
- step 11 right: B/S shift cuts second M into C, producing `CCM`.
- step 14 up: first C reaches top target.
- step 16 down: second C reaches lower target.
- step 17 right: remaining M reaches right target.

winning_path_event_checks:

```yaml
core5_probe:
  report: prototypes/reality_anchor/reports/event_probe_RA_LEX_2026_07_08_BRUSH_TRIPLE_OUTPUT_v2_core5.md
  combined_missing_core_bypass: false
  status: complete
  individual_missing_bypass:
    box_to_sticky: false
    sticky_merge: false
    sticky_rigid: false
    bs_shift: false
    sticky_cut: false
count_probes:
  bs_shift_min2:
    report: prototypes/reality_anchor/reports/event_count_probe_RA_LEX_2026_07_08_BRUSH_TRIPLE_OUTPUT_v2_bs_shift_min2_anchor_boundary_shift_box_sticky_min2.md
    found_bypass_below_count: false
    status: complete
  sticky_to_box_min2:
    report: prototypes/reality_anchor/reports/event_count_probe_RA_LEX_2026_07_08_BRUSH_TRIPLE_OUTPUT_v2_sticky_to_box_min2_sticky_to_box_min2.md
    found_bypass_below_count: false
    status: complete
  move_sticky_min2:
    report: prototypes/reality_anchor/reports/event_count_probe_RA_LEX_2026_07_08_BRUSH_TRIPLE_OUTPUT_v2_move_sticky_min2_move_sticky_rigid_min2.md
    found_bypass_below_count: false
    status: complete
order_probe_negative_boundary:
  report: prototypes/reality_anchor/reports/order_probe_RA_LEX_2026_07_08_BRUSH_TRIPLE_OUTPUT_v2_no_cut_before_merge.md
  found_violation_win: true
  implication: do not claim all wins avoid early sticky_to_box before sticky_merge
```

goal_prune:

```yaml
top_target_[7,1]:
  action: keep
  report: prototypes/reality_anchor/reports/layout_analysis_RA_LEX_2026_07_08_BRUSH_TRIPLE_OUTPUT_v2_no_top_goal.md
  cost_delta: "17->17"
  winning_states: "4->48"
  low_count_probe: prototypes/reality_anchor/reports/event_count_probe_RA_LEX_2026_07_08_BRUSH_TRIPLE_OUTPUT_v2_no_top_goal_sticky_to_box_min2_sticky_to_box_min2.md
  low_count_bypass: true
  matched_count: 1
right_target_[10,3]:
  action: keep
  report: prototypes/reality_anchor/reports/layout_analysis_RA_LEX_2026_07_08_BRUSH_TRIPLE_OUTPUT_v2_no_right_goal.md
  cost_delta: "17->16"
  low_count_probe: prototypes/reality_anchor/reports/event_count_probe_RA_LEX_2026_07_08_BRUSH_TRIPLE_OUTPUT_v2_no_right_goal_move_sticky_min2_move_sticky_rigid_min2.md
  low_count_bypass: true
  matched_count: 1
lower_target_[8,4]:
  action: keep
  report: prototypes/reality_anchor/reports/layout_analysis_RA_LEX_2026_07_08_BRUSH_TRIPLE_OUTPUT_v2_no_lower_goal.md
  cost_delta: "17->16"
  low_count_probe: prototypes/reality_anchor/reports/event_count_probe_RA_LEX_2026_07_08_BRUSH_TRIPLE_OUTPUT_v2_no_lower_goal_sticky_to_box_min2_sticky_to_box_min2.md
  low_count_bypass: true
  matched_count: 1
```

prune_and_compactness:

- v2 is a compact prune of v1.
- v1 reachable states: 35393.
- v2 reachable states: 5140.
- v2 keeps the same returned event chain and same cost while removing unused left-side room.
- report: `prototypes/reality_anchor/reports/redundant_element_prune_RA_LEX_2026_07_08_BRUSH_TRIPLE_OUTPUT_v2.zh.md`

## Archive Calibration

Comparators:

- RA_CAND_0018: fixed B/S cut-tail lower-bound, human difficulty 2 / aesthetic 3.
- RA_CAND_0005: three-cell chain with clear conflict, human 4/4.
- RA_CAND_0017: high-density chain, human 5/4 but with upper-bound risk.

Positioning:

- This candidate should score above RA_CAND_0018 because the active mechanism is movable-boundary two-stroke brushing plus triple output, not a fixed single cut-tail.
- It should not be claimed as RA_CAND_0017-tier density. The opening is still readable, and one target's responsibility is mainly all-win count gating rather than shortest-cost delta.

## Reviewer Requests

Evidence reviewer:

- Check whether the packet overstates any tool result.
- Verify that the negative order probe is handled as a caveat, not ignored.
- Verify that the target-prune claims match the deletion probes.

Puzzle critic:

- Judge whether the movable-boundary brushing and triple output are enough for difficulty >=3 and strong aesthetic 3 floor.
- Attack especially:
  - top target same-cost deletion
  - possible route-tax reading of right M target
  - opening scriptiness
  - whether this still feels too close to fixed B/S cut-tail lineage

Expected acceptable result:

- submission only if both independent reviews return `required_action: none`.
