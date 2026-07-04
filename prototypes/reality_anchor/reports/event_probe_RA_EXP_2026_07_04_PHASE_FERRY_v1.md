# Event Probe: RA_EXP_2026_07_04_PHASE_FERRY_v1

- Budget: maxStates=300000, maxDepth=100
- Required groups: push_pull_anchor_shift, box_sticky_anchor_shift, pull_event, material_normalization, sticky_merge, sticky_rigid_move

## Layout

```text
#########
#....#.G#
#@#.M..M#
#.G..M.M#
#G.SLP..#
##.B..C.#
#########
```

## Combined Probe

- Found bypass: true
- Status: found
- Explored states: 38604
- Depth: 31
- Missing groups: sticky_merge, sticky_rigid_move
- Inputs: down right right up up left left down down down right down right right right right up left left left up down right right right right up left left left left
- Events: walk walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n2 walk walk walk walk walk walk walk walk walk walk push_object:crate#3 walk push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n2 walk walk walk walk walk push_object:crate#4 force_chain:n2 box_to_sticky:n1 walk push_object:crate#3 push_object:crate#3 push_object:crate#3

## Individual Probes

### push_pull_anchor_shift

- Found bypass: false
- Status: exhausted
- Explored states: 300001
- Reason: state budget exceeded (300000)

### box_sticky_anchor_shift

- Found bypass: false
- Status: exhausted
- Explored states: 300001
- Reason: state budget exceeded (300000)

### pull_event

- Found bypass: false
- Status: exhausted
- Explored states: 300003
- Reason: state budget exceeded (300000)

### material_normalization

- Found bypass: false
- Status: exhausted
- Explored states: 300001
- Reason: state budget exceeded (300000)

### sticky_merge

- Found bypass: true
- Status: found
- Explored states: 37077
- Depth: 31
- Missing groups: sticky_merge
- Inputs: down right right up up left left down down down right down right right right right up left left left up down right right right right up left left left left
- Events: walk walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n2 walk walk walk walk walk walk walk walk walk walk push_object:crate#3 walk push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n2 walk walk walk walk walk push_object:crate#4 force_chain:n2 box_to_sticky:n1 walk push_object:crate#3 push_object:crate#3 push_object:crate#3

### sticky_rigid_move

- Found bypass: true
- Status: found
- Explored states: 37188
- Depth: 31
- Missing groups: sticky_rigid_move
- Inputs: down right right up up left left down down down right down right right right right up left left left up down right right right right up left left left left
- Events: walk walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n2 walk walk walk walk walk walk walk walk walk walk push_object:crate#3 walk push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n2 walk walk walk walk walk push_object:crate#4 force_chain:n2 box_to_sticky:n1 walk push_object:crate#3 push_object:crate#3 push_object:crate#3
