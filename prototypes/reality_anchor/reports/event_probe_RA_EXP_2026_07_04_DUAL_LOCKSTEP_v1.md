# Event Probe: RA_EXP_2026_07_04_DUAL_LOCKSTEP_v1

- Budget: maxStates=300000, maxDepth=80
- Required groups: push_pull_anchor_shift, box_sticky_anchor_shift, pull_event, material_normalization, sticky_merge, sticky_rigid_move

## Layout

```text
###########
###.PL.####
##@BSGG####
###..M...G#
###.M..M.##
###########
```

## Combined Probe

- Found bypass: true
- Status: found
- Explored states: 1595
- Depth: 21
- Missing groups: sticky_merge
- Inputs: right up right down left down right right left left down right up right right up left down right up down
- Events: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 walk push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 push_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk walk push_object:crate#1 force_chain:n2 walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 pull_object:crate#2 walk walk push_object:crate#1 force_chain:n2 anchor_boundary_shift:box_sticky walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull

## Individual Probes

### push_pull_anchor_shift

- Found bypass: false
- Status: complete
- Explored states: 2477
- Reason: no winning bypass found

### box_sticky_anchor_shift

- Found bypass: false
- Status: complete
- Explored states: 2453
- Reason: no winning bypass found

### pull_event

- Found bypass: false
- Status: complete
- Explored states: 3188
- Reason: no winning bypass found

### material_normalization

- Found bypass: false
- Status: complete
- Explored states: 2453
- Reason: no winning bypass found

### sticky_merge

- Found bypass: true
- Status: found
- Explored states: 1102
- Depth: 21
- Missing groups: sticky_merge
- Inputs: right up right down left down right right left left down right up right right up left down right up down
- Events: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 walk push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 push_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk walk push_object:crate#1 force_chain:n2 walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 pull_object:crate#2 walk walk push_object:crate#1 force_chain:n2 anchor_boundary_shift:box_sticky walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull

### sticky_rigid_move

- Found bypass: false
- Status: complete
- Explored states: 2569
- Reason: no winning bypass found
