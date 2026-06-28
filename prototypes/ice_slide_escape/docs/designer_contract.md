# Ice Slide Escape Designer Contract

Status: designer-facing constraints for `ice_slide_escape`.

This document is for level designers and level-spec agents. It should be read
alongside `rules.md` and `solver_contract.md`.

## Package Boundary

`ice_slide_escape` is a prototype-local mechanism. Its special edge start/goal
contract and distance-based ice rules are not generic Sokoban rules.

Designer agents should reference:

```text
prototypes/ice_slide_escape/docs/rules.md
prototypes/ice_slide_escape/docs/solver_contract.md
prototypes/ice_slide_escape/docs/designer_contract.md
prototypes/ice_slide_escape/docs/meta_interfaces.md
```

Do not infer additional behavior from `pull_portal_fallback`.

## Level Shape

All levels for this prototype must be rectangular grids:

```yaml
rectangular_grid_required: true
all_rows_same_width: true
formal_width_and_height: to_be_specified_later
```

Scratch layouts may vary in size while testing the mechanism. Final accepted
levels must use the later specified fixed size.

An edge cell is any in-grid cell on the outer row or outer column. A wall on the
outer row or column is still an edge cell.

## Start And Goal Authoring

Each formal solve or review instance must explicitly declare:

```yaml
player_start: edge_cell
player_goal: edge_cell
```

This does not mean the level has exactly one fixed start or exit. A level may be
reviewed under multiple edge start/goal pairs. Each pair is a separate solve
instance.

The player start must be initially standable:

```yaml
start_may_be:
  - empty
  - target_overlay_without_wall_or_ice
start_must_not_be:
  - wall
  - ice
```

The player goal may initially be a wall. Such a goal is valid if ice can destroy
that wall and make the cell reachable.

Start and goal may be the same cell. This is solver-legal but usually
uninteresting; formal level specs may exclude it when defining quality gates.

## Meta Interface Pass

After a conventional single-level candidate is already working, designers may
run a meta-interface pass. This pass looks for edge cells that could later
connect this rectangle to other rectangles in a large map.

Interface labels:

```yaml
obvious_exit:
  use: visible or guided exit for the normal route

optional_exit:
  use: extra reachable exit with its own interesting solution

hidden_destructible_exit:
  use: edge wall or blocked edge route opened by ice destruction

return_only_entry:
  use: edge cell not reachable from the current ordinary start, reserved for a
    future route entering from another level
```

For each proposed interface, the designer should record:

```yaml
interface_claim:
  cell: [x, y]
  type: obvious_exit | optional_exit | hidden_destructible_exit | return_only_entry
  preserves_original_solution: true | false | unknown
  adds_distinct_solution: true | false | unknown
  creates_bypass: true | false | unknown
```

The pass may suggest small edge edits, such as opening an edge cell or leaving a
destructible edge wall. These edits are design candidates, not automatic
improvements. They need solver/analyzer evidence before being accepted.

Cross-level movement itself remains future scope. The current designer loop only
checks single-level consequences of these interfaces.

## Win Design

A winning state requires both:

```yaml
all_targets_have_ice: true
player_reaches_specific_edge_goal: true
```

Every target cell must be occupied by some ice block at win time. Extra ice on
non-target cells is allowed.

Targets are overlays. They do not stop, slow, redirect, or otherwise affect ice
movement.

## Designer Checklist

Before submitting a formal candidate, check:

```text
[ ] The grid is rectangular.
[ ] A concrete edge start cell is declared.
[ ] The start cell is initially standable.
[ ] A concrete edge goal cell is declared.
[ ] Each solve instance treats the goal as a specific cell, not "any edge".
[ ] Every target can be occupied by ice at win time.
[ ] Extra ice, if present, does not accidentally create a bypass.
[ ] If the goal starts as a wall, some required ice interaction can destroy it.
[ ] The candidate is solved for the declared start/goal pair.
[ ] If meta interfaces are proposed, each interface is labeled and reviewed.
[ ] Interface edits preserve the original solution or explicitly revise the
    level's role.
[ ] Added exits are checked for bypasses.
```

## Rule Motifs Designers May Intentionally Teach

The mechanism's core teachable motifs include:

```yaml
motifs:
  - stop_with_short_slide_distance_1_or_2
  - sacrifice_ice_with_distance_3
  - rebound_with_distance_4
  - pass_through_obstacle_group_with_distance_5
  - destroy_obstacle_group_with_distance_6_plus
  - restart_counting_after_group_interaction
  - use_ice_to_open_edge_goal_wall
  - coordinate_target_ice_with_player_edge_escape
  - retrofit_edge_interfaces_without_losing_original_solution
  - create_hidden_or_return_only_edge_interfaces
```

These are not yet a finalized curriculum. They are initial design vocabulary for
future knowledge and level-spec work.
