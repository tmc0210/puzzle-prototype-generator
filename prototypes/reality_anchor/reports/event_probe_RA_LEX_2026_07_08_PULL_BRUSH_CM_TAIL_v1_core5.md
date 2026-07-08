# Event Probe: RA_LEX_2026_07_08_PULL_BRUSH_CM_TAIL_v1_core5

- Budget: maxStates=500000, maxDepth=80
- Required groups: bs_pull, bs_shift, cut_to_crate, sticky_tail, crate_pull

## Layout

```text
############
#PL#......##
####.GMMG.##
###BS@...###
############
```

## Combined Probe

- Found bypass: true
- Status: found
- Explored states: 72
- Depth: 12
- Missing groups: crate_pull
- Inputs: right right right up right up left left left left down left
- Events: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 walk pull_object:sticky#1 move_sticky_rigid walk walk walk walk walk walk pull_object:crate#1

## Individual Probes

### bs_pull

- Found bypass: false
- Status: complete
- Explored states: 367
- Reason: no winning bypass found

### bs_shift

- Found bypass: false
- Status: complete
- Explored states: 367
- Reason: no winning bypass found

### cut_to_crate

- Found bypass: true
- Status: found
- Explored states: 168
- Depth: 20
- Missing groups: cut_to_crate
- Inputs: up up right right right down right up left left left down down left right up up left down up
- Events: walk walk walk walk walk walk pull_object:sticky#1 move_sticky_rigid walk walk walk walk walk walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky

### sticky_tail

- Found bypass: false
- Status: complete
- Explored states: 440
- Reason: no winning bypass found

### crate_pull

- Found bypass: true
- Status: found
- Explored states: 71
- Depth: 12
- Missing groups: crate_pull
- Inputs: right right right up right up left left left left down left
- Events: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 walk pull_object:sticky#1 move_sticky_rigid walk walk walk walk walk walk pull_object:crate#1
