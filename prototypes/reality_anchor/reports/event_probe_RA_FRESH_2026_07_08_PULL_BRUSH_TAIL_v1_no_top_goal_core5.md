# Event Probe: RA_FRESH_2026_07_08_PULL_BRUSH_TAIL_v1_no_top_goal_core5

- Budget: maxStates=300000, maxDepth=300
- Required groups: pull_event, bs_shift, force_chain, sticky_rigid, material_cut

## Layout

```text
###########
#####P#####
#####L#####
##...MM..##
##@S.M...##
###B...G###
#####...###
###########
```

## Combined Probe

- Found bypass: true
- Status: found
- Explored states: 709
- Depth: 37
- Missing groups: force_chain
- Inputs: up right right down down right down right right up up right up left left left left left down left up right right down right up left left down left up right right down down right down
- Events: walk walk walk walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:sticky#1 move_sticky_rigid sticky_to_box:n1 walk walk walk walk pull_object:sticky#1 move_sticky_rigid walk walk walk walk walk walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:crate#1 box_to_sticky:n1 sticky_merge:n1 walk walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk walk walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:sticky#1 move_sticky_rigid sticky_to_box:n3

## Individual Probes

### pull_event

- Found bypass: false
- Status: complete
- Explored states: 16533
- Reason: no winning bypass found

### bs_shift

- Found bypass: false
- Status: complete
- Explored states: 16533
- Reason: no winning bypass found

### force_chain

- Found bypass: true
- Status: found
- Explored states: 709
- Depth: 37
- Missing groups: force_chain
- Inputs: up right right down down right down right right up up right up left left left left left down left up right right down right up left left down left up right right down down right down
- Events: walk walk walk walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:sticky#1 move_sticky_rigid sticky_to_box:n1 walk walk walk walk pull_object:sticky#1 move_sticky_rigid walk walk walk walk walk walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:crate#1 box_to_sticky:n1 sticky_merge:n1 walk walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk walk walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:sticky#1 move_sticky_rigid sticky_to_box:n3

### sticky_rigid

- Found bypass: false
- Status: complete
- Explored states: 16533
- Reason: no winning bypass found

### material_cut

- Found bypass: false
- Status: complete
- Explored states: 16533
- Reason: no winning bypass found
