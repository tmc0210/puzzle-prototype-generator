# Ice Slide Escape Solver Contract

Status: required non-template solver behavior for `ice_slide_escape`.

This prototype cannot reuse a generic "any edge exit" goal check inside a
single solve. Player start and player goal are explicit inputs to each solve
request.

The level itself does not have one fixed start or one fixed exit. Tools may
enumerate many edge starts and many edge goals, but each `(player_start,
player_goal)` pair is a separate problem instance.

## Problem Instance Identity

A solve request is identified by:

```yaml
mechanic_id: ice_slide_escape
level_id: string
player_start: Point
player_goal: Point
initial_layout: rectangular_grid
```

`player_start` and `player_goal` are not interchangeable metadata. They define
the problem instance.

They are also not permanent symbols baked into the level map. A single map may
be analyzed with multiple starts and goals, especially when exploring future
meta-interface uses.

The solver, evaluator, report writer, and any cache key must not merge results
across different starts or goals:

```yaml
do_not_merge:
  - different_player_start_cells
  - different_player_goal_cells
  - same_goal_with_different_start
  - same_start_with_different_goal
```

## Player Start

The player start must be explicitly supplied.

```yaml
player_start:
  required: true
  must_be_edge_cell: true
  must_be_initially_standable: true
  cannot_initially_contain:
    - wall
    - ice
```

A standable start may be an empty cell or a target overlay cell, as long as no
wall or ice occupies it.

When solving, the explicit start overrides any authoring convenience marker if
such a marker exists in a draft layout.

## Player Goal

The player goal must be explicitly supplied.

```yaml
player_goal:
  required: true
  must_be_edge_cell: true
  may_initially_be_wall: true
  may_become_standable_after_ice_destroys_wall: true
```

Within one solve request, the goal is a specific in-grid edge cell, not a
direction, side, outside-board exit, or "any edge" predicate.

Different edge cells are different goals, even if they are on the same side of
the rectangle.

Batch analysis may enumerate all candidate edge goals, but it must report each
goal as its own solve instance.

## Batch Edge Enumeration

Current single-level tools may support a batch mode that enumerates edge
start/goal pairs.

Required behavior:

```yaml
batch_edge_analysis:
  may_enumerate:
    - all_standable_edge_starts
    - all_edge_goals
    - selected_designer_declared_interface_pairs
  must_emit:
    - separate_solve_instance_per_start_goal_pair
  must_not_emit:
    - one_combined_any_edge_solution
    - one_cache_entry_shared_across_different_starts_or_goals
```

This enumeration is how the current single-level workflow represents "any edge
may be an entrance or exit" without weakening the solver contract.

## Same Start And Goal

The same edge cell may be used as both start and goal.

If all target cells are already occupied by ice at the initial state, a zero-step
solution is legal for that problem instance. Designer-facing specifications may
exclude such cases for quality reasons, but the solver contract allows them.

## Win Predicate

The runtime win predicate for a solve request must use the explicit goal:

```yaml
is_win(state, request):
  all_targets_occupied_by_ice: true
  player_position_equals: request.player_goal
```

Win is evaluated only after a complete player action and all automatic ice
settlement. If the initial state already satisfies the predicate, zero actions
may be returned as the solution.

## State Key And Caches

Within a single solve request, the state key should include:

```yaml
state_key:
  - player_position
  - sorted_ice_positions
  - wall_positions_if_destructible_walls_changed
```

The request key or outer cache key must include:

```yaml
request_key:
  - mechanic_id
  - level_id_or_layout_hash
  - player_start
  - player_goal
```

Ice positions may be sorted because ice instances are indistinguishable. Player
start and goal must not be canonicalized away.

## Reports

Solver and analyzer reports should print the start and goal cells in a visible
header, for example:

```yaml
solve_instance:
  start: [0, 3]
  goal: [8, 1]
```

When comparing multiple edge goals on one map, each result should be reported as
a separate solve instance.

When comparing multiple edge starts, the same rule applies. A report that scans
many starts and many goals should show each `(start, goal)` pair explicitly or
group only after the individual instances remain recoverable.
