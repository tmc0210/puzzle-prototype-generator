# Event Probe: RA_CURR_2026_07_05_L05_LONG_EDGE_PL_v1_no_left_goal_instance_core

- Budget: maxStates=300000, maxDepth=80
- Required groups: anchor_pull, anchor_push, left_crate_push, right_crate_pull

## Layout

```text
##########
#PL@G#####
#........#
#.C.#.CG.#
##########
```

## Combined Probe

- Found bypass: true
- Status: found
- Explored states: 234
- Depth: 15
- Missing groups: left_crate_push
- Inputs: right down left left left up right down right right right right right down right
- Events: pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk walk walk walk walk pull_object:crate#2

## Individual Probes

### anchor_pull

- Found bypass: false
- Status: complete
- Explored states: 305
- Reason: no winning bypass found

### anchor_push

- Found bypass: false
- Status: complete
- Explored states: 396
- Reason: no winning bypass found

### left_crate_push

- Found bypass: true
- Status: found
- Explored states: 177
- Depth: 15
- Missing groups: left_crate_push
- Inputs: right down left left left up right down right right right right right down right
- Events: pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk walk walk walk walk pull_object:crate#2

### right_crate_pull

- Found bypass: false
- Status: complete
- Explored states: 361
- Reason: no winning bypass found
