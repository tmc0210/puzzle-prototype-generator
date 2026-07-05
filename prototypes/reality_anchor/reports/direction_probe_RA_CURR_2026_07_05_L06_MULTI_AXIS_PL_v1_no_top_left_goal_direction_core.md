# Directional Event Probe: RA_CURR_2026_07_05_L06_MULTI_AXIS_PL_v1_no_top_left_goal_direction_core

- Budget: maxStates=300000, maxDepth=90
- Required groups: anchor_pull_down, anchor_pull_right, anchor_push_right, left_crate_push, right_crate_pull

## Layout

```text
##########
#PL@.#####
#...G#...#
#.CG#.CG.#
#........#
##########
```

## Combined Probe

- Found bypass: true
- Status: found
- Explored states: 1605
- Depth: 21
- Missing groups: anchor_push_right
- Inputs: right down left left left down down right up left up right right down down right right right right up right
- Events: pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk walk walk walk walk push_object:crate#1 walk walk push_object:crate#1 push_object:crate#1 pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk walk walk pull_object:crate#2

## Individual Probes

### anchor_pull_down

- Found bypass: false
- Status: complete
- Explored states: 10025
- Reason: no winning bypass found

### anchor_pull_right

- Found bypass: false
- Status: complete
- Explored states: 9028
- Reason: no winning bypass found

### anchor_push_right

- Found bypass: true
- Status: found
- Explored states: 974
- Depth: 21
- Missing groups: anchor_push_right
- Inputs: right down left left left down down right up left up right right down down right right right right up right
- Events: pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk walk walk walk walk push_object:crate#1 walk walk push_object:crate#1 push_object:crate#1 pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk walk walk pull_object:crate#2

### left_crate_push

- Found bypass: false
- Status: complete
- Explored states: 10061
- Reason: no winning bypass found

### right_crate_pull

- Found bypass: false
- Status: complete
- Explored states: 13180
- Reason: no winning bypass found
