# Ice Slide Escape Preflight

Status: confirmed for documentation handoff. Runtime code has not been implemented.

This document records the pre-implementation semantic decisions for the
`ice_slide_escape` prototype. It is the source of truth for why the local rules
exist; implementation-facing rule wording lives in `rules.md`, solver-specific
constraints live in `solver_contract.md`, and designer-facing constraints live
in `designer_contract.md`.

## Raw Brief

Original mechanism idea, preserved without adding hidden Sokoban defaults:

```text
玩家可以推冰，游戏里有墙，玩家和墙按常规来。冰会沿空地滑动直到撞到障碍或边界，滑动2格内撞到则停止，滑动3格撞到会摧毁这个冰块，4格会反弹1格，5格会穿过障碍，6格及以上会摧毁障碍。撞到边界则停。
```

Later confirmed corrections and additions:

```text
任意冰，无论格数，被推向边界会在撞到边界时直接消失。
通关条件是所有目标上有冰，同时玩家到地图边缘。
不同的地图边缘视为这一关的不同的解，且不能在求解器中混淆。
求解器需要显式输入玩家起点和一个具体的地图边缘格。
玩家起点也必定在地图边缘。
关卡都是长方形，最终正式关卡大小后续指定。
单关地图不固定唯一玩家起点或终点；显式起终点是单次求解实例约束。
未来可能存在多个长方形关卡通过边缘格相互连通的大地图，但当前不实现跨关移动。
```

## Extracted Terms

```yaml
mechanic_id: ice_slide_escape
world_assumptions:
  - rectangular grid
  - empty cells
  - walls
  - out-of-grid boundary
actors:
  - player
objects:
  - ice
  - wall
  - target overlay
actions:
  - four-direction player movement
  - player pushes adjacent ice
mechanisms:
  - automatic ice slide settlement
  - distance-based obstacle collision branch
  - contiguous obstacle pass-through
  - contiguous obstacle destruction
  - edge start and edge goal solver contract
  - future edge meta-interface design
win_condition:
  - all target cells occupied by ice
  - player on the explicitly requested edge goal cell
```

## Decision Table

```yaml
decisions:
  - id: input_model
    status: confirmed
    value: four_direction_inputs
    blocks: [actions, step]

  - id: player_move
    status: confirmed
    value: player_moves_one_cell_into_empty_or_target
    blocks: [step]

  - id: player_wall_collision
    status: confirmed
    value: wall_blocks_player
    blocks: [step]

  - id: player_push_ice
    status: confirmed
    value: successful_push_moves_player_into_ice_origin
    blocks: [step]

  - id: failed_push
    status: confirmed
    value: illegal_no_transition
    blocks: [step, solver_soundness]

  - id: ice_auto_settlement
    status: confirmed
    value: ice_resolves_completely_before_next_input
    blocks: [step, solver_soundness]

  - id: slide_distance_count
    status: confirmed
    value: count_empty_cells_entered_by_the_ice
    blocks: [step, branch_selection]

  - id: target_overlay
    status: confirmed
    value: target_cells_are_slidable_empty_cells_for_movement
    blocks: [parseLevel, step, isWin]

  - id: ice_vs_ice
    status: confirmed
    value: other_ice_is_obstacle_no_chain_push
    blocks: [step, state_key]

  - id: multi_ice_identity
    status: confirmed
    value: multiple_ice_instances_are_indistinguishable
    blocks: [state_key, canonicalization]

  - id: boundary_hit
    status: confirmed
    value: ice_disappears_when_pushed_into_or_sliding_into_boundary
    blocks: [step]

  - id: win_condition
    status: confirmed
    value: all_targets_have_ice_and_player_on_specific_edge_goal
    blocks: [isWin, solver]

  - id: solver_start
    status: confirmed
    value: explicit_specific_edge_start_required_and_initially_standable
    blocks: [solver, designer_specs]

  - id: solver_goal
    status: confirmed
    value: explicit_specific_edge_goal_required_and_may_initially_be_wall
    blocks: [solver, designer_specs]

  - id: multi_edge_start_goal_pairs
    status: confirmed
    value: level_allows_many_edge_start_goal_pairs_but_each_solve_uses_one_pair
    blocks: [solver, designer_specs, reports]

  - id: cross_level_big_map
    status: out_of_scope
    value: future_meta_layer_not_current_single_level_runtime
    blocks: []
    does_not_block: [runtime_rules, solver_contract, scratch_design]

  - id: level_shape
    status: confirmed
    value: rectangular_grid_required
    blocks: [parser, designer_specs]

  - id: formal_level_size
    status: open
    value: to_be_specified_later
    blocks: [formal_campaign_acceptance]
    does_not_block: [runtime_rules, solver_contract, scratch_design]
```

## ASCII Probe Decisions

Probe scaffolding legend:

```text
@ player
I ice
# wall or obstacle
. empty cell
```

The probes are one-dimensional for clarity only. Final levels are rectangular
grids.

### P01: Slide Distance Count

```text
before: #@I..#
action: right
chosen: A

A. Ice enters 2 empty cells, then hits the wall and stops before it.
after:  #.@.I#
```

Decision: distance counts empty cells entered by the ice, not the obstacle cell
or the attempted collision step.

### P02: Immediate Obstacle Push

```text
before: #@I#
action: right
chosen: A

A. Push fails; state is unchanged.
```

Decision: pushing ice into an immediate obstacle is an illegal action with no
state transition.

### P03: Three-Cell Obstacle Hit

```text
before: #@I...#
action: right
chosen: A

A. Ice enters 3 empty cells, hits the wall, disappears, and the wall remains.
after:  #.@...#
```

Decision: distance 3 destroys only the moving ice.

### P04: Four-Cell Rebound

```text
before: #@I....#
action: right
chosen: A

A. Ice reaches the cell before the obstacle, then rebounds 1 cell backward.
after:  #.@..I.#
```

Decision: distance 4 rebounds one cell from the pre-obstacle cell, with no
recursive collision check during the rebound.

### P05: Five-Cell Pass-Through

```text
before: #@I.....##...#
action: right
chosen: custom
```

Decision: at distance 5, the moving ice attempts to pass through the entire
contiguous obstacle group in front of it. The obstacles remain. If the ice exits
the group into an empty cell, it continues in the same direction as if pushed
again.

### P06: Six-Plus Destruction

```text
before: #@I......##...#
action: right
chosen: custom
```

Decision: at distance 6 or more, the moving ice destroys the entire contiguous
obstacle group in front of it. If the ice exits the destroyed group into an empty
cell, it continues in the same direction as if pushed again.

### P07: Ice Hits Ice

```text
before: #@I..I#
action: right
chosen: A

A. The front ice is an obstacle. The moving ice uses the distance branch.
```

Decision: ice does not chain-push other ice. Other ice belongs to the obstacle
set.

### P08: Restart Counting After Pass-Through

```text
before: #@I.....##...#
action: right
chosen: B

B. The first empty cell after the obstacle group counts as new distance 1.
```

Decision: after a distance-5 pass-through, the first empty cell after the
contiguous obstacle group is counted as cell 1 of a fresh slide segment.

### P09: Restart Counting After Destruction

```text
before: #@I......##...#
action: right
chosen: same_as_P08
```

Decision: after a distance-6-plus destruction, the first empty cell after the
destroyed obstacle group is counted as cell 1 of a fresh slide segment.

### P10: Immediate Boundary Push

```text
before:
#####
#@I
#####

action: right
chosen: A

A. Boundary rule applies immediately: the ice disappears and the player enters
   the ice origin cell.
```

Decision: boundary disappearance has priority over the zero-cell failed-push
case.

## Confirmed Mechanic Packet Draft

```yaml
mechanic_packet:
  id: ice_slide_escape
  world:
    topology: rectangular_grid
    boundary: outside_rectangle
    edge_cell: any_in_grid_cell_on_outer_row_or_column

  inputs:
    - up
    - down
    - left
    - right

  objects:
    player:
      multiplicity: one
      can_move_into: [empty, target]
      blocked_by: [wall, ice, boundary]
    ice:
      multiplicity: many
      identity_policy: indistinguishable
      can_slide_over: [empty, target]
      obstacle_types: [wall, ice]
    wall:
      multiplicity: many
      blocks_player: true
      blocks_ice: true
      destroyed_by: ice_distance_6_plus
    target:
      layer: overlay
      movement_effect: none

  step:
    successful_push:
      player_moves_to_ice_origin: true
      ice_auto_settles_before_next_input: true
    failed_push:
      illegal_no_transition: true
    boundary_hit:
      ice_disappears: true

  slide_branches:
    distance_1_or_2: stop_before_obstacle
    distance_3: destroy_moving_ice_only
    distance_4: rebound_one_cell_backward
    distance_5: pass_through_contiguous_obstacle_group_then_restart
    distance_6_plus: destroy_contiguous_obstacle_group_then_restart
    restart_counting: first_empty_after_group_is_new_distance_1

  win_condition:
    checked_after_full_settlement: true
    all_targets_occupied_by_ice: true
    extra_ice_allowed: true
    player_on_specific_edge_goal: true

  solver_goal_contract:
    explicit_edge_start_required: true
    edge_start_initially_standable: true
    explicit_edge_goal_required: true
    edge_goal_may_initially_be_wall: true
    level_does_not_fix_unique_start_or_goal: true
    batch_tools_may_enumerate_start_goal_pairs: true
    do_not_merge_different_start_or_goal_cells: true

  designer_constraints:
    rectangular_grid_required: true
    formal_size: open
    same_start_and_goal_allowed: true
    meta_interface_design_note: future_scope
```

## Remaining Open Item

```yaml
open:
  - id: formal_level_size
    question: "最终正式关卡使用哪个固定宽高？"
    blocks:
      - formal_level_acceptance
      - final_designer_spec
    does_not_block:
      - runtime_rule_implementation
      - solver_contract_implementation
      - scratch_layout_testing
```
