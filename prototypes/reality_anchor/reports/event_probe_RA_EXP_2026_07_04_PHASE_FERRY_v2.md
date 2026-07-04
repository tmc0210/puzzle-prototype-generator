# Event Probe: RA_EXP_2026_07_04_PHASE_FERRY_v2

- Budget: maxStates=300000, maxDepth=100
- Required groups: push_pull_anchor_shift, box_sticky_anchor_shift, pull_event, material_normalization, sticky_merge, sticky_rigid_move

## Layout

```text
##########
#G#...BG.#
#MPLM.S..#
#..G.M#G.#
##.M...@.#
##########
```

## Combined Probe

- Found bypass: true
- Status: found
- Explored states: 87830
- Depth: 58
- Missing groups: sticky_merge
- Inputs: up up right down left down right up up up left left left down up right right right down down down left left left up left left left left up right down down right up up down right up left down down right right up up up right right right down down down left left left up left
- Events: walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n2 walk walk walk walk walk walk walk walk pull_object:sticky#2 move_sticky_rigid sticky_to_box:n1 walk walk walk walk walk walk walk walk walk walk walk walk walk walk push_object:crate#1 push_object:push_pull_anchor force_chain:n3 anchor_boundary_shift:push_pull walk walk push_object:sticky#1 move_sticky_rigid walk push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk pull_object:sticky#1 move_sticky_rigid pull_object:crate#2 walk walk walk walk walk walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk walk walk walk walk push_object:sticky#1 move_sticky_rigid

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
- Explored states: 300001
- Reason: state budget exceeded (300000)

### material_normalization

- Found bypass: false
- Status: exhausted
- Explored states: 300001
- Reason: state budget exceeded (300000)

### sticky_merge

- Found bypass: true
- Status: found
- Explored states: 87640
- Depth: 58
- Missing groups: sticky_merge
- Inputs: up up right down left down right up up up left left left down up right right right down down down left left left up left left left left up right down down right up up down right up left down down right right up up up right right right down down down left left left up left
- Events: walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n2 walk walk walk walk walk walk walk walk pull_object:sticky#2 move_sticky_rigid sticky_to_box:n1 walk walk walk walk walk walk walk walk walk walk walk walk walk walk push_object:crate#1 push_object:push_pull_anchor force_chain:n3 anchor_boundary_shift:push_pull walk walk push_object:sticky#1 move_sticky_rigid walk push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk pull_object:sticky#1 move_sticky_rigid pull_object:crate#2 walk walk walk walk walk walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk walk walk walk walk push_object:sticky#1 move_sticky_rigid

### sticky_rigid_move

- Found bypass: false
- Status: exhausted
- Explored states: 300001
- Reason: state budget exceeded (300000)
