# Event Probe: RA_FRESH_2026_07_08_PULL_BRUSH_RETURN_v4_wall_trim_no_lower_goal_core6

- Budget: maxStates=300000, maxDepth=300
- Required groups: pull_event, bs_shift, force_chain, sticky_rigid, material_cut, pl_shift

## Layout

```text
#########
####P####
####L####
#...MM.G#
#@S.M...#
##B....##
####...##
#########
```

## Combined Probe

- Found bypass: true
- Status: found
- Explored states: 17
- Depth: 8
- Missing groups: material_cut, pl_shift
- Inputs: up right right down down right right right
- Events: walk walk walk walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid

## Individual Probes

### pull_event

- Found bypass: false
- Status: complete
- Explored states: 92030
- Reason: no winning bypass found

### bs_shift

- Found bypass: false
- Status: complete
- Explored states: 92030
- Reason: no winning bypass found

### force_chain

- Found bypass: false
- Status: complete
- Explored states: 92185
- Reason: no winning bypass found

### sticky_rigid

- Found bypass: false
- Status: complete
- Explored states: 92030
- Reason: no winning bypass found

### material_cut

- Found bypass: true
- Status: found
- Explored states: 17
- Depth: 8
- Missing groups: material_cut
- Inputs: up right right down down right right right
- Events: walk walk walk walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid

### pl_shift

- Found bypass: true
- Status: found
- Explored states: 17
- Depth: 8
- Missing groups: pl_shift
- Inputs: up right right down down right right right
- Events: walk walk walk walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid
