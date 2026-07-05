# Directional Event Probe: RA_CURR_2026_07_05_L06_MULTI_AXIS_PL_v1_no_left_goal_direction_core

- Budget: maxStates=300000, maxDepth=90
- Required groups: anchor_pull_down, anchor_pull_right, anchor_push_right, left_crate_push, right_crate_pull

## Layout

```text
##########
#PL@.#####
#..GG#...#
#.C.#.CG.#
#........#
##########
```

## Combined Probe

- Found bypass: true
- Status: found
- Explored states: 1527
- Depth: 21
- Missing groups: right_crate_pull
- Inputs: right down left left down up right down left left up right down right down right right right right up right
- Events: pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk push_object:crate#1 walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk walk walk walk walk walk pull_object:crate#1

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
- Explored states: 1164
- Depth: 23
- Missing groups: anchor_push_right
- Inputs: right down left left left down down right up left up right right down left down right right right right right up right
- Events: pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk walk walk walk walk push_object:crate#1 walk walk push_object:crate#1 push_object:crate#1 pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk walk walk walk walk walk pull_object:crate#2

### left_crate_push

- Found bypass: true
- Status: found
- Explored states: 1703
- Depth: 26
- Missing groups: left_crate_push
- Inputs: right down left down down right right right right right up left up right down down left left left left left left up left up right
- Events: pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull pull_object:crate#2 pull_object:crate#2 pull_object:crate#2 pull_object:crate#2 pull_object:crate#2 walk walk pull_object:crate#2 walk walk walk walk walk walk walk walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull

### right_crate_pull

- Found bypass: true
- Status: found
- Explored states: 1109
- Depth: 21
- Missing groups: right_crate_pull
- Inputs: right down left left down up right down left left up right down right down right right right right up right
- Events: pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk push_object:crate#1 walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk walk walk walk walk walk pull_object:crate#1
