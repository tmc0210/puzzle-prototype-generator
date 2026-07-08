# Event Probe: RA_LEX_2026_07_08_PULL_BRUSH_CM_TOOTH_v2_core5

- Budget: maxStates=500000, maxDepth=80
- Required groups: bs_pull, bs_shift, cut_to_crate, sticky_tail, crate_pull

## Layout

```text
############
#PL#......##
####..G#..##
####..MMG.##
###BS@...###
############
```

## Combined Probe

- Found bypass: true
- Status: found
- Explored states: 324
- Depth: 18
- Missing groups: crate_pull
- Inputs: right right right up right up up left left left down left down down left up right up
- Events: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 walk pull_object:sticky#1 move_sticky_rigid walk walk walk walk walk walk walk walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 walk walk pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid

## Individual Probes

### bs_pull

- Found bypass: false
- Status: complete
- Explored states: 2885
- Reason: no winning bypass found

### bs_shift

- Found bypass: false
- Status: complete
- Explored states: 2885
- Reason: no winning bypass found

### cut_to_crate

- Found bypass: false
- Status: complete
- Explored states: 2888
- Reason: no winning bypass found

### sticky_tail

- Found bypass: false
- Status: complete
- Explored states: 3061
- Reason: no winning bypass found

### crate_pull

- Found bypass: true
- Status: found
- Explored states: 316
- Depth: 18
- Missing groups: crate_pull
- Inputs: right right right up right up up left left left down left down down left up right up
- Events: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 walk pull_object:sticky#1 move_sticky_rigid walk walk walk walk walk walk walk walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 walk walk pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid
