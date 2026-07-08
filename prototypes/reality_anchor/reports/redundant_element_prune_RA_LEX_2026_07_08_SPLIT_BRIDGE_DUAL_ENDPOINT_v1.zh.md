# Redundant Element Prune: RA_LEX_2026_07_08_SPLIT_BRIDGE_DUAL_ENDPOINT_v1

candidate: RA_LEX_2026_07_08_SPLIT_BRIDGE_DUAL_ENDPOINT_v1
prototype: reality_anchor
status: pruned
sequence:
  - goal_prune
  - object_remove_prune
  - object_wallify_prune
  - space_prune
  - wall_outline_prune

## Final Layout

```text
########
####G###
###.MM@#
##G.M..#
###.MM##
####G###
###BS###
########
```

Hard facts:

- Shortest cost: 8.
- Inputs: `down left left up down down up left`.
- Graph: complete, 57 reachable states, 132 legal transitions, 3 winning states.
- Opening: initial SCC states=3, out=1, winOut=1, deadOut=0.
- Core event gate: complete/no winning bypass for `sticky_split`, `sticky_to_box`, `move_sticky_rigid`, `push_object:sticky#1`, `push_object:sticky#2`, `push_object:crate#2`.

Refs:

- `prototypes/reality_anchor/reports/layout_analysis_RA_LEX_2026_07_08_SPLIT_BRIDGE_DUAL_ENDPOINT_v1.md`
- `prototypes/reality_anchor/reports/event_probe_RA_LEX_2026_07_08_SPLIT_BRIDGE_DUAL_ENDPOINT_v1_core_exact.md`
- `prototypes/reality_anchor/reports/event_count_probe_RA_LEX_2026_07_08_SPLIT_BRIDGE_DUAL_ENDPOINT_v1_bridge_crate_push_min1_push_object_crate_2_min1.md`
- `prototypes/reality_anchor/reports/fixed_anchor_probe_RA_LEX_2026_07_08_SPLIT_BRIDGE_DUAL_ENDPOINT_v1_bs_fixed_scan.md`

## 1. Goal Prune

All three targets are retained.

- target: [4, 1]
  action: keep
  reason: Removing the upper endpoint pocket drops the solution from 8 to 6 and removes the top sticky endpoint consumption.
  hard_facts:
    cost_delta: "8->6"
    graph_status: complete
    refs:
      - `prototypes/reality_anchor/reports/layout_analysis_RA_LEX_2026_07_08_SPLIT_BRIDGE_DUAL_ENDPOINT_v1_no_top_goal.md`

- target: [2, 3]
  action: keep
  reason: Removing the center bridge pocket drops the solution from 8 to 6 and removes the bridge crate push.
  hard_facts:
    cost_delta: "8->6"
    graph_status: complete
    refs:
      - `prototypes/reality_anchor/reports/layout_analysis_RA_LEX_2026_07_08_SPLIT_BRIDGE_DUAL_ENDPOINT_v1_no_bridge_goal.md`

- target: [4, 5]
  action: keep
  reason: Removing the lower endpoint pocket drops the solution from 8 to 6 and removes the lower sticky endpoint consumption.
  hard_facts:
    cost_delta: "8->6"
    graph_status: complete
    refs:
      - `prototypes/reality_anchor/reports/layout_analysis_RA_LEX_2026_07_08_SPLIT_BRIDGE_DUAL_ENDPOINT_v1_no_lower_goal.md`

removed_targets: []

## 2. Object Remove Prune

No object removal was applied.

- The initial C-shaped sticky cluster is the only source of the upper endpoint, lower endpoint, and center bridge crate after the fixed B/S cut.
- The fixed B/S pair is the normalization boundary required for `sticky_to_box:n3` and `sticky_split:n1`.
- The player start has no redundant alternate role.

removed_objects: []

## 3. Object Wallify Prune

No object wallify was applied.

- Wallifying any sticky cell destroys one of the three consumed outputs or blocks the split.
- Wallifying either B/S cell would replace the semantic material boundary with a blocker and invalidate the mechanism claim.

wallified_objects: []

## 4. Space Prune

### Applied Space Prune

Pruned from the working layout before this final version:

- cell [3, 1]: upper left pocket beside the top goal.
- cell [3, 5]: lower left pocket beside the lower goal.

Result: remove.

Reason: these cells were not used by player route, object route, endpoint target consumption, B/S boundary semantics, or opening comfort. Removing them preserved cost 8 and the same core event chain, while improving visual tightness around the two endpoint pockets.

### Tested And Retained: [6, 3]

Variant:

```text
########
####G###
###.MM@#
##G.M.##
###.MM##
####G###
###BS###
########
```

Result: keep the floor at [6, 3].

Hard facts:

- Cost remains 8.
- Graph remains complete: 48 reachable states, 99 legal transitions.
- Initial SCC shrinks from 3 states to 1 state.
- First action becomes immediate `push_object:sticky#1`, `move_sticky_rigid`, `sticky_to_box:n3`, `sticky_split:n1`.

Reason: although solvability and core events survive, this wall turns the opening into a trivial first-push commitment and removes the small stance/read buffer before the fixed B/S cut. For this candidate, that buffer is part of the opening-comfort contract rather than decorative padding.

Ref:

- `prototypes/reality_anchor/reports/layout_analysis_RA_LEX_2026_07_08_SPLIT_BRIDGE_DUAL_ENDPOINT_v1_wall_y3x6.md`

### Tested And Retained: [5, 3]

Variant:

```text
########
####G###
###.MM@#
##G.M#.#
###.MM##
####G###
###BS###
########
```

Result: keep the floor at [5, 3].

Hard facts:

- Search complete with no solution.
- Reachable states: 5.
- Winning states: 0.

Reason: this cell is the stance / handoff space for consuming the center bridge crate after the split. Wallifying it breaks the puzzle.

Ref:

- `prototypes/reality_anchor/reports/layout_analysis_RA_LEX_2026_07_08_SPLIT_BRIDGE_DUAL_ENDPOINT_v1_wall_y3x5.md`

## 5. Wall / Outline Prune

No outline trim applied.

- The top and lower target pockets require the surrounding rows.
- The fixed B/S row requires the lower boundary.
- The right-side player stance buffer at [6, 3] is retained for opening comfort and avoids first-action scripting.

## Removed Elements

- kind: space
  cells: [3, 1], [3, 5]

## Retained Elements

- target [4, 1]: upper endpoint consumer.
- target [2, 3]: center bridge crate consumer.
- target [4, 5]: lower endpoint consumer.
- space [6, 3]: opening comfort / first-cut read buffer.
- space [5, 3]: center bridge crate handoff stance.
- fixed B/S [3, 6], [4, 6]: material boundary.

## Final Recommendation

Use `RA_LEX_2026_07_08_SPLIT_BRIDGE_DUAL_ENDPOINT_v1` as the review candidate. It is already the pruned version of the working layout: all targets are retained by final counterfactuals, obvious endpoint-pocket spaces have been removed, and the remaining tested floor cells either preserve opening comfort or are required for solvability.
