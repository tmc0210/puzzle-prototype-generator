# Redundant Element Prune: RA_LEX_2026_07_07_BIND_CUT_TAIL_v2_space_pruned

baseline_candidate: RA_LEX_2026_07_07_BIND_CUT_TAIL_v1
pruned_candidate: RA_LEX_2026_07_07_BIND_CUT_TAIL_v2_space_pruned
prototype: reality_anchor
status: pruned
sequence:
  - goal_prune
  - object_remove_prune
  - object_wallify_prune
  - space_prune
  - wall_outline_prune

## Baseline

```text
##########
#@.#G#...#
#.CC....G#
####....##
#...BS...#
##########
```

Hard facts:

- Baseline shortest cost: 17.
- Baseline graph: complete, 2654 reachable states, 7018 legal transitions, 4 winning states.
- Baseline opening: commitments=1, viable=1, dead=0, optimal=1.
- Baseline core probe: complete/no bypass for `force_chain`, `box_to_sticky`, `sticky_merge`, `sticky_to_box`, `move_sticky_rigid`.

## 1. Goal Prune

targets_checked:

- target: [4, 1]
  action: keep
  reason: Removing the upper single-cell target shortens the puzzle and releases the cut requirement.
  hard_facts:
    cost_delta: "17->6"
    graph_status: complete
    core_event_bypass: "missing sticky_to_box"
    refs:
      - prototypes/reality_anchor/reports/layout_analysis_RA_LEX_2026_07_07_BIND_CUT_TAIL_v1_no_top_goal.md
      - prototypes/reality_anchor/reports/event_probe_RA_LEX_2026_07_07_BIND_CUT_TAIL_v1_no_top_goal_core5.md

- target: [8, 2]
  action: keep
  reason: Removing the right target shortens the puzzle and removes the sticky-tail consumption tail.
  hard_facts:
    cost_delta: "17->14"
    graph_status: complete
    core_event_bypass: none
    refs:
      - prototypes/reality_anchor/reports/layout_analysis_RA_LEX_2026_07_07_BIND_CUT_TAIL_v1_no_tail_goal.md
      - prototypes/reality_anchor/reports/event_probe_RA_LEX_2026_07_07_BIND_CUT_TAIL_v1_no_tail_goal_core5.md

removed_targets: []

## 2. Object Remove Prune

No object entered removal testing:

- The two initial crates are moved, converted, split, and cover targets during the returned solution.
- The B/S anchor is the material-normalization boundary required for `box_to_sticky` and `sticky_to_box`.

removed_objects: []

## 3. Object Wallify Prune

No object entered wallify testing. The only static-looking object is B/S, but its semantic role is not blocker-only; it is the mechanism boundary consumed by the material events.

wallified_objects: []

## 4. Space Prune

### Candidate A: top-right pocket

element:

- kind: space
- cells: [6, 1], [7, 1], [8, 1]
- action_tested: wall_prune

Result: remove.

Hard facts:

- Layout: `RA_LEX_2026_07_07_BIND_CUT_TAIL_v1_prune_top_right_pocket_layout.txt`
- Cost: 17->17.
- Graph: complete, 876 reachable states, 2247 legal transitions, 4 winning states.
- Core probe: complete/no bypass for all core groups.
- Opening: commitments=1, viable=1, dead=0, optimal=1.
- Expected trace remains the shortest returned solution.

Reason: these cells are a reachable-looking upper pocket above the right target lane, but they are not used by the player path, object path, target responsibility, mechanism boundary, or opening comfort.

Refs:

- prototypes/reality_anchor/reports/layout_analysis_RA_LEX_2026_07_07_BIND_CUT_TAIL_v1_prune_top_right_pocket.md
- prototypes/reality_anchor/reports/event_probe_RA_LEX_2026_07_07_BIND_CUT_TAIL_v1_prune_top_right_pocket_core5.md

### Candidate B: B/S side pockets

element:

- kind: space
- cells: [1, 4], [2, 4], [3, 4], [6, 4], [7, 4], [8, 4]
- action_tested: wall_prune

Result: remove.

Hard facts:

- Layout: `RA_LEX_2026_07_07_BIND_CUT_TAIL_v1_prune_anchor_pockets_layout.txt`
- Cost: 17->17.
- Graph: complete, 397 reachable states, 982 legal transitions, 1 winning state.
- Core probe: complete/no bypass for all core groups.
- Opening: commitments=1, viable=1, dead=0, optimal=1.
- Expected trace remains the shortest returned solution.

Reason: these cells only allow residual B/S movement and side-pocket space. The design claim does not use B/S movement; the material boundary itself remains active after walling the pockets.

Refs:

- prototypes/reality_anchor/reports/layout_analysis_RA_LEX_2026_07_07_BIND_CUT_TAIL_v1_prune_anchor_pockets.md
- prototypes/reality_anchor/reports/event_probe_RA_LEX_2026_07_07_BIND_CUT_TAIL_v1_prune_anchor_pockets_core5.md

### Combined Space Prune

Pruned layout:

```text
##########
#@.#G#####
#.CC....G#
####....##
####BS####
##########
```

Result: remove both candidate groups.

Hard facts:

- Cost: 17->17.
- Graph: complete, 165 reachable states, 383 legal transitions, 1 winning state.
- Core probe: complete/no bypass for `force_chain`, `box_to_sticky`, `sticky_merge`, `sticky_to_box`, `move_sticky_rigid`.
- Count probe: complete/no win below 2 `box_to_sticky`.
- Order probe: complete/no winning route with `sticky_to_box` before `sticky_merge`.
- Opening: commitments=1, viable=1, dead=0, optimal=1.
- Fixed B/S scan: reachable forbidden `anchor_boundary_shift:box_sticky` hits: none.

Caveat:

- The combined graph is more linear than the baseline: forced viable prefix rises from 3/8 to 6/8 in the bidirectional compression digest. This is acceptable for redundancy cleanup, but the pruned version must not be described as more open or higher difficulty than the baseline.
- `fixed_anchor_probe` default combined groups include P/L/pull expectations irrelevant to this no-P/L level; only its reachable forbidden scan and fixed B/S material-effect result are cited.

Refs:

- prototypes/reality_anchor/reports/layout_analysis_RA_LEX_2026_07_07_BIND_CUT_TAIL_v2_space_pruned.md
- prototypes/reality_anchor/reports/event_probe_RA_LEX_2026_07_07_BIND_CUT_TAIL_v2_space_pruned_core5.md
- prototypes/reality_anchor/reports/event_count_probe_RA_LEX_2026_07_07_BIND_CUT_TAIL_v2_space_pruned_box_to_sticky_min2_box_to_sticky_min2.md
- prototypes/reality_anchor/reports/order_probe_RA_LEX_2026_07_07_BIND_CUT_TAIL_v2_space_pruned_no_cut_before_merge.md
- prototypes/reality_anchor/reports/fixed_anchor_probe_RA_LEX_2026_07_07_BIND_CUT_TAIL_v2_space_pruned_bs_fixed_scan.md

## Goal Recheck After Space Prune

- target: [4, 1]
  action: keep
  reason: Removing it still shortens the puzzle and releases a missing-`sticky_to_box` bypass.
  hard_facts:
    cost_delta: "17->6"
    graph_status: complete
    core_event_bypass: "missing sticky_to_box"
    refs:
      - prototypes/reality_anchor/reports/layout_analysis_RA_LEX_2026_07_07_BIND_CUT_TAIL_v2_space_pruned_no_top_goal.md
      - prototypes/reality_anchor/reports/event_probe_RA_LEX_2026_07_07_BIND_CUT_TAIL_v2_space_pruned_no_top_goal_core5.md

- target: [8, 2]
  action: keep
  reason: Removing it still shortens the puzzle from 17 to 14 and removes the sticky-tail consumption tail.
  hard_facts:
    cost_delta: "17->14"
    graph_status: complete
    core_event_bypass: none
    refs:
      - prototypes/reality_anchor/reports/layout_analysis_RA_LEX_2026_07_07_BIND_CUT_TAIL_v2_space_pruned_no_tail_goal.md
      - prototypes/reality_anchor/reports/event_probe_RA_LEX_2026_07_07_BIND_CUT_TAIL_v2_space_pruned_no_tail_goal_core5.md

## 5. Wall / Outline Prune

No outline trim applied:

- The right target at [8, 2] requires the right boundary column.
- The B/S row requires the lower boundary.
- Trimming would not remove an empty outer row or column without changing the rectangular structure around active objects or targets.

## Removed Elements

- kind: space
  cells: [6, 1], [7, 1], [8, 1]
- kind: space
  cells: [1, 4], [2, 4], [3, 4], [6, 4], [7, 4], [8, 4]

## Retained Elements

- target [4, 1]: required to force cutback / `sticky_to_box`.
- target [8, 2]: required to consume the sticky tail and preserve cost 17.
- crates [2, 2], [3, 2]: moved, converted, and consumed.
- B/S [4, 4], [5, 4]: required material-normalization boundary.
- start-side floor [2, 1]: retained as opening comfort; it preserves the 3-state initial region rather than forcing a single first step from the start.

## Final Recommendation

Replace the queued v1 layout with `RA_LEX_2026_07_07_BIND_CUT_TAIL_v2_space_pruned` only after fresh review artifacts are written for the changed layout. Old v1 evidence can support lineage, but old v1 critic/evidence verdicts must not be inherited as final review for v2.
