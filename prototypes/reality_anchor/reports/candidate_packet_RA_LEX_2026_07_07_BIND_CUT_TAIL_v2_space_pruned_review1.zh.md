# Candidate Packet: RA_LEX_2026_07_07_BIND_CUT_TAIL_v2_space_pruned / review_1

candidate_version: RA_LEX_2026_07_07_BIND_CUT_TAIL_v2_space_pruned
prototype: reality_anchor
review_iteration: review_1
review_integrity: independent_review_required
archive_eligibility: human_pending

## Prototype Context

confirmed_rules:

- Win condition: all targets must be covered by objects; player on target does not count.
- With no P/L anchor, the level is an all-push world.
- B/S anchor globally normalizes material by side: box-side cells become crates; sticky-side cells become sticky blocks.
- Adjacent sticky cells merge into one rigid block.
- Sticky rigid blocks move as rigid groups.

tool_boundary:

- Solver / graph / event probes are evidence only, not quality verdicts.
- No unique input sequence or object-instance identity claim is made.
- `mechanism_lab/runs` was intentionally not read for the original design round.

## Slot Brief

intended_role: challenge
known_before: [K_runtime_smoke]
target: [K_runtime_smoke]
difficulty_or_support_expectation: "qualified strong 3 candidate if player-side quality survives pruning caveats"

## Design Target

aesthetic_score_target: ">=3 only; do not claim 4"
difficulty_score_target: ">=3 only; do not claim 4"
target_role_notes: >
  This is a compact B/S lexicon-composition candidate after mandatory redundancy
  pruning. The pruning improves cleanliness but makes the graph more linear, so
  reviewers should attack whether it remains a valid strong-3 candidate rather
  than treating it as an upgraded puzzle.

## Solve Instance

layout:

```text
##########
#@.#G#####
#.CC....G#
####....##
####BS####
##########
```

win_condition: all_targets_covered_by_objects
player_start: [1, 1]

expected_solution:

```text
down right right right down right right right up left down left left up right right right
```

## Mechanism Scope

central:

- B/S binding debt: two crates must cross the B/S boundary as a chain, producing `C+M` and then `MM`.
- Sticky merge before cutback: the winning route must merge into `MM` before `sticky_to_box`.
- C+M cutback: the merged block is pushed from the right to produce `C+M`.
- Two target duties: upper target forces cutback; right target consumes the sticky tail.

required_winning_path_events:

- `force_chain`
- `box_to_sticky`
- `sticky_merge`
- `sticky_to_box`
- `move_sticky_rigid`
- at least two `box_to_sticky`
- no winning route with `sticky_to_box` before `sticky_merge`

forbidden_claims:

- unique solution
- object-instance identity necessity
- difficulty or aesthetic 4
- B/S movement as part of intended solution
- increased openness after pruning

## Design Claim

player_insight: >
  The player must not stop at the early `C+M` state. They must first let the two
  boxes bind into `MM`, then use the right-side approach to cut `MM` back into
  `C+M`; the C half covers the upper pocket while the M tail is consumed by the
  right target.

causal_chain:

1. Initial `CC` is pushed right along the B/S boundary.
2. First boundary crossing creates `C+M`.
3. Continuing the push creates adjacent `MM`, which merges into a rigid block.
4. The player routes around to the right and pushes left, triggering `sticky_to_box` and recovering `C+M`.
5. The C half is pushed into the upper single target.
6. The M tail is rigid-pushed right into the right target.

why_not_execution: >
  The trace is still narrow, especially in the opening. The claim is not that the
  route is open-ended; the claim is that the state changes are clean, necessary,
  and target-consumed after redundant space is removed.

falsification:

- If a win exists without any core event group, reject.
- If a win exists with fewer than two `box_to_sticky`, reject.
- If `sticky_to_box` can occur before `sticky_merge` in a win, reject.
- If either target can be removed without lowering cost or releasing a core bypass, prune or reject.
- If critic judges the remaining route as pure forced execution below difficulty 3, hold or reject.

## Evidence

commands_run:

- `npx tsx src/cli.ts explain-layout prototypes/reality_anchor prototypes/reality_anchor/reports/RA_LEX_2026_07_07_BIND_CUT_TAIL_v2_space_pruned_layout.txt --id RA_LEX_2026_07_07_BIND_CUT_TAIL_v2_space_pruned --targets K_runtime_smoke --max-states 800000 --graph-max-states 800000 --write`
- `npx tsx prototypes/reality_anchor/reports/probe_dual_axis_candidate.ts prototypes/reality_anchor/reports/RA_LEX_2026_07_07_BIND_CUT_TAIL_v2_space_pruned_layout.txt RA_LEX_2026_07_07_BIND_CUT_TAIL_v2_space_pruned_core5 800000 80 force_chain=force_chain box_to_sticky=box_to_sticky sticky_merge=sticky_merge sticky_to_box=sticky_to_box sticky_rigid=move_sticky_rigid`
- `npx tsx prototypes/reality_anchor/reports/probe_event_count.ts prototypes/reality_anchor/reports/RA_LEX_2026_07_07_BIND_CUT_TAIL_v2_space_pruned_layout.txt RA_LEX_2026_07_07_BIND_CUT_TAIL_v2_space_pruned_box_to_sticky_min2 box_to_sticky 2 800000 80`
- `npx tsx prototypes/reality_anchor/reports/probe_event_order.ts prototypes/reality_anchor/reports/RA_LEX_2026_07_07_BIND_CUT_TAIL_v2_space_pruned_layout.txt RA_LEX_2026_07_07_BIND_CUT_TAIL_v2_space_pruned_no_cut_before_merge sticky_to_box sticky_merge 800000 80`
- `npx tsx prototypes/reality_anchor/reports/probe_fixed_anchor_candidate.ts prototypes/reality_anchor/reports/RA_LEX_2026_07_07_BIND_CUT_TAIL_v2_space_pruned_layout.txt RA_LEX_2026_07_07_BIND_CUT_TAIL_v2_space_pruned_bs_fixed_scan box_sticky 800000 80 default`

solver_result:

- Found: yes.
- Cost: 17.
- Graph: complete.
- Reachable states: 165.
- Legal transitions: 383.
- Winning states: 1.
- Opening: commitments=1, viable=1, dead=0, optimal=1.

trace_summary:

- Events include `force_chain:n2` x3, `box_to_sticky:n1` x2, `sticky_merge:n1` x1, `sticky_to_box:n1` x1, `move_sticky_rigid` x5.

winning_path_event_checks:

- Core5 probe: complete/no bypass for all required groups.
- Count probe: complete/no win below 2 `box_to_sticky`.
- Order probe: complete/no win with `sticky_to_box` before `sticky_merge`.

prototype_specific_work:

- Redundant element prune was run in documented order.
- Goal prune retained both targets.
- Object remove/wallify found no eligible object candidate.
- Space prune removed the top-right pocket and both B/S side pockets.
- Wall-outline prune found no valid outer trim.

evidence_refs:

- prototypes/reality_anchor/reports/redundant_element_prune_RA_LEX_2026_07_07_BIND_CUT_TAIL_v2_space_pruned.zh.md
- prototypes/reality_anchor/reports/layout_analysis_RA_LEX_2026_07_07_BIND_CUT_TAIL_v2_space_pruned.md
- prototypes/reality_anchor/reports/event_probe_RA_LEX_2026_07_07_BIND_CUT_TAIL_v2_space_pruned_core5.md
- prototypes/reality_anchor/reports/event_count_probe_RA_LEX_2026_07_07_BIND_CUT_TAIL_v2_space_pruned_box_to_sticky_min2_box_to_sticky_min2.md
- prototypes/reality_anchor/reports/order_probe_RA_LEX_2026_07_07_BIND_CUT_TAIL_v2_space_pruned_no_cut_before_merge.md
- prototypes/reality_anchor/reports/fixed_anchor_probe_RA_LEX_2026_07_07_BIND_CUT_TAIL_v2_space_pruned_bs_fixed_scan.md
- prototypes/reality_anchor/reports/layout_analysis_RA_LEX_2026_07_07_BIND_CUT_TAIL_v2_space_pruned_no_top_goal.md
- prototypes/reality_anchor/reports/event_probe_RA_LEX_2026_07_07_BIND_CUT_TAIL_v2_space_pruned_no_top_goal_core5.md
- prototypes/reality_anchor/reports/layout_analysis_RA_LEX_2026_07_07_BIND_CUT_TAIL_v2_space_pruned_no_tail_goal.md
- prototypes/reality_anchor/reports/event_probe_RA_LEX_2026_07_07_BIND_CUT_TAIL_v2_space_pruned_no_tail_goal_core5.md

evidence_limits:

- The pruned graph is more linear than baseline: forced viable prefix rises from 3/8 to 6/8.
- Fixed-anchor default combined probe includes irrelevant P/L/pull expectations; cite only forbidden B/S shift scan and fixed B/S material effect.
- Score claims must be fresh; v1 critic/evidence verdicts are lineage context only.

## Archive Taste Context

examples:

- RA_CAND_0016: human-reviewed aesthetic 3 / difficulty 2; strong-guidance movable B/S merge-then-cut teaching. Used as lower-bound caution for scripted B/S timing.
- RA_CAND_0011: human-reviewed aesthetic 4 / difficulty 4; compact strong state-responsibility contradiction. Used to prevent overclaiming 4.
- RA_CAND_0005: human-reviewed aesthetic 4 / difficulty 4; high mechanism use with clear contradiction. Used to distinguish event density from player-facing insight.
- RA_CAND_0006: human-reviewed aesthetic 2 / difficulty 5; goal-position hardening and route complexity negative example. Used to detect route-tax risk.

## Claim Last Review

mode: not_used
facts_packet: not_applicable
claim_packet: not_applicable
read_order: not_applicable
