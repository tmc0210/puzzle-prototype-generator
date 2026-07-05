# Event Probe: RA_CURR_2026_07_05_L05_LONG_EDGE_PL_v1_no_right_goal_instance_core

- Budget: maxStates=300000, maxDepth=80
- Required groups: anchor_pull, anchor_push, left_crate_push, right_crate_pull

## Layout

```text
##########
#PL@G#####
#........#
#.CG#.C..#
##########
```

## Combined Probe

- Found bypass: true
- Status: found
- Explored states: 110
- Depth: 11
- Missing groups: right_crate_pull
- Inputs: right down left left left up right down left down right
- Events: pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk push_object:crate#1

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

- Found bypass: false
- Status: complete
- Explored states: 333
- Reason: no winning bypass found

### right_crate_pull

- Found bypass: true
- Status: found
- Explored states: 88
- Depth: 11
- Missing groups: right_crate_pull
- Inputs: right down left left left up right down left down right
- Events: pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk push_object:crate#1
