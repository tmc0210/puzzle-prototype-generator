# Event Probe: RA_EXP_2026_07_04_PHASE_FERRY_v7

- Budget: maxStates=300000, maxDepth=160
- Required groups: push_pull_anchor_shift, box_sticky_anchor_shift, pull_event, material_normalization, sticky_merge, sticky_rigid_move

## Layout

```text
########
#..#..G#
##GMLP.#
#.BS.M.#
#...@.##
########
```

## Combined Probe

- Found bypass: true
- Status: found
- Explored states: 6239
- Depth: 44
- Missing groups: sticky_merge
- Inputs: right up left right right up left left right down down left left left up left down right right right right up up left down right right up up left down left right right down left left left up right right down right up
- Events: walk push_object:sticky#2 force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 walk walk push_object:sticky#1 move_sticky_rigid push_object:sticky#1 force_chain:n2 move_sticky_rigid sticky_to_box:n1 pull_object:crate#2 box_to_sticky:n1 walk walk walk walk walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk walk walk walk walk walk push_object:sticky#1 move_sticky_rigid pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 walk walk walk walk push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky walk pull_object:crate#2 box_to_sticky:n1 walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull walk push_object:sticky#1 move_sticky_rigid push_object:sticky#1 move_sticky_rigid walk walk push_object:sticky#1 move_sticky_rigid

## Individual Probes

### push_pull_anchor_shift

- Found bypass: false
- Status: exhausted
- Explored states: 11497
- Reason: depth budget exceeded (160)

### box_sticky_anchor_shift

- Found bypass: false
- Status: exhausted
- Explored states: 11625
- Reason: depth budget exceeded (160)

### pull_event

- Found bypass: false
- Status: exhausted
- Explored states: 11522
- Reason: depth budget exceeded (160)

### material_normalization

- Found bypass: false
- Status: exhausted
- Explored states: 11525
- Reason: depth budget exceeded (160)

### sticky_merge

- Found bypass: true
- Status: found
- Explored states: 6107
- Depth: 44
- Missing groups: sticky_merge
- Inputs: right up left right right up left left right down down left left left up left down right right right right up up left down right right up up left down left right right down left left left up right right down right up
- Events: walk push_object:sticky#2 force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 walk walk push_object:sticky#1 move_sticky_rigid push_object:sticky#1 force_chain:n2 move_sticky_rigid sticky_to_box:n1 pull_object:crate#2 box_to_sticky:n1 walk walk walk walk walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk walk walk walk walk walk push_object:sticky#1 move_sticky_rigid pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 walk walk walk walk push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky walk pull_object:crate#2 box_to_sticky:n1 walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull walk push_object:sticky#1 move_sticky_rigid push_object:sticky#1 move_sticky_rigid walk walk push_object:sticky#1 move_sticky_rigid

### sticky_rigid_move

- Found bypass: false
- Status: exhausted
- Explored states: 11497
- Reason: depth budget exceeded (160)
