# Event Probe: RA_LEX_2026_07_07_STAGED_BRUSH_TOOTH_v0_no_left_goal_core_exact

- Budget: maxStates=300000, maxDepth=60
- Required groups: bs_shift, force_chain, sticky_to_box, sticky_pull, sticky_rigid, crate_pull

## Layout

```text
############
#PL##...####
#####.#G####
#####MMM...#
####BS@.#..#
####.....#.#
########...#
############
```

## Combined Probe

- Found bypass: true
- Status: found
- Explored states: 35
- Depth: 14
- Missing groups: crate_pull
- Inputs: down right right down right right up up up left left left up up
- Events: pull_object:sticky#1 force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 walk walk walk walk walk walk walk walk walk pull_object:sticky#1 move_sticky_rigid pull_object:sticky#1 move_sticky_rigid

## Individual Probes

### bs_shift

- Found bypass: false
- Status: complete
- Explored states: 67
- Reason: no winning bypass found

### force_chain

- Found bypass: false
- Status: complete
- Explored states: 67
- Reason: no winning bypass found

### sticky_to_box

- Found bypass: false
- Status: complete
- Explored states: 67
- Reason: no winning bypass found

### sticky_pull

- Found bypass: false
- Status: complete
- Explored states: 67
- Reason: no winning bypass found

### sticky_rigid

- Found bypass: false
- Status: complete
- Explored states: 67
- Reason: no winning bypass found

### crate_pull

- Found bypass: true
- Status: found
- Explored states: 35
- Depth: 14
- Missing groups: crate_pull
- Inputs: down right right down right right up up up left left left up up
- Events: pull_object:sticky#1 force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 walk walk walk walk walk walk walk walk walk pull_object:sticky#1 move_sticky_rigid pull_object:sticky#1 move_sticky_rigid
