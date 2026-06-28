# Ice Slide Escape Rules

Status: executable rule specification for future runtime implementation.

This document describes only the `ice_slide_escape` prototype. Do not promote
these rules into global Sokoban conventions.

## Board And Layers

The board is a rectangular grid. Every row has the same width. The boundary is
the area outside this rectangle.

Cell content has at least these layers:

```yaml
terrain:
  - empty
  - wall
overlay:
  - target
actors:
  - player
movables:
  - ice
```

A target is an overlay. For movement and sliding, a target cell behaves like
empty floor. It only matters during win checking.

An edge cell is an in-grid cell on the outer row or outer column. The boundary
itself is outside the board and cannot be occupied.

## Player Movement

The input set is four-directional:

```text
up, down, left, right
```

For each input, the player attempts to move one cell in that direction.

Confirmed player rules:

```yaml
can_enter:
  - empty
  - target
blocked_by:
  - wall
  - ice_unless_push_succeeds
  - boundary
```

If the destination cell contains ice, the action attempts to push that ice in
the same direction. A successful push moves the player into the ice origin cell.
The pushed ice then resolves its full automatic slide before the next player
input is accepted.

If a player movement or push is illegal, it is an illegal action with no state
transition. It should not be treated as a step-consuming no-op.

## Ice Identity

Multiple ice blocks are allowed. Ice instances are equivalent:

```yaml
ice:
  multiplicity: many
  identity_policy: indistinguishable
  solver_canonicalization: sort_positions
```

Ice blocks do not chain-push each other. A non-moving ice block is an obstacle
for the moving ice.

## Slide Distance

Slide distance counts only empty-or-target cells entered by the moving ice in
the current slide segment.

The obstacle cell is not counted. The attempted collision step is not counted.

Example:

```text
before: #@I..#
action: right
after:  #.@.I#
```

The ice entered two empty cells before hitting the wall, so the branch is
distance 2.

## Boundary Rule

Boundary collision has its own rule:

```yaml
ice_hits_boundary: moving_ice_disappears
```

This applies for any distance, including zero cells of slide. If the player
pushes an ice block directly out of the board, the push succeeds, the player
enters the ice origin cell, and the ice disappears.

The player itself does not move outside the board.

## Obstacle Set

For ice collision, obstacles are:

```yaml
obstacles:
  - wall
  - ice
```

Targets are not obstacles.

## Obstacle Collision Branches

When the moving ice first hits an obstacle after entering `d` empty-or-target
cells in the current segment, resolve by `d`.

```yaml
d = 0:
  if obstacle: push_illegal_no_transition
  if boundary: ice_disappears_and_player_enters_ice_origin

d = 1 or 2:
  moving_ice_stops_before_obstacle

d = 3:
  moving_ice_disappears
  obstacle_remains

d = 4:
  moving_ice_rebounds_one_cell_backward_from_the_pre_obstacle_cell
  obstacle_remains

d = 5:
  moving_ice_passes_through_the_full_contiguous_obstacle_group
  obstacles_remain
  if_an_empty_cell_exists_after_group:
    ice_enters_that_cell
    that_cell_counts_as_distance_1_of_a_new_segment
    continue_sliding_in_same_direction
  else_if_group_reaches_boundary:
    moving_ice_disappears
    obstacles_remain

d >= 6:
  moving_ice_destroys_the_full_contiguous_obstacle_group
  destroyed_obstacles_are_removed_from_state
  if_an_empty_cell_exists_after_group:
    ice_enters_that_cell
    that_cell_counts_as_distance_1_of_a_new_segment
    continue_sliding_in_same_direction
  else_if_group_reaches_boundary:
    moving_ice_disappears
    destroyed_obstacles_remain_removed
```

For `d = 4`, the one-cell rebound is not a new slide segment and does not start
another collision branch.

For `d = 5` and `d >= 6`, "contiguous obstacle group" means the maximal run of
wall and ice cells in the movement direction starting at the first obstacle
hit.

## Restart Counting

After pass-through or destruction, the ice continues in the same direction if
there is an empty-or-target cell immediately after the contiguous obstacle
group.

The first cell after the obstacle group is counted as distance 1 of the new
segment.

Example for distance 5:

```text
before: #@I.....##...#
action: right
```

The ice slides 5 cells, hits `##`, passes through both obstacles, enters the
first cell after `##`, and that entered cell is already count 1 of the new
segment.

If the new segment later hits an obstacle with total new-segment distance 3, the
moving ice disappears by the distance-3 branch.

## Win Check

Win is checked after the player action and all ice automatic settlement are
complete.

A state wins only when both are true:

```yaml
all_targets_occupied_by_ice: true
player_on_requested_edge_goal_cell: true
```

Extra ice outside target cells is allowed.

The requested edge goal cell is part of the solver problem instance; see
`solver_contract.md`.

