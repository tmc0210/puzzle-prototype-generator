# Event Probe: RA_LEX_2026_07_06_WALLGATE_BIND_RELEASE_v1_core6

- Budget: maxStates=800000, maxDepth=160
- Required groups: push_pull_shift, box_sticky_shift, pull_event, box_to_sticky, sticky_to_box, sticky_rigid

## Layout

```text
#########
#CG#...P#
#..C..GL#
#...@M..#
##.BS.M.#
#########
```

## Combined Probe

- Found bypass: true
- Status: found
- Explored states: 163215
- Depth: 43
- Missing groups: sticky_to_box
- Inputs: up right right down up up left down up right down down left left left left up left down right up right down right right right right down left up up up right down left down left left left left up right right
- Events: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:crate#2 box_to_sticky:n1 pull_object:sticky#1 move_sticky_rigid sticky_merge:n1 walk pull_object:sticky#2 move_sticky_rigid sticky_merge:n1 pull_object:sticky#1 move_sticky_rigid push_object:sticky#1 move_sticky_rigid push_object:sticky#1 force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid pull_object:sticky#1 move_sticky_rigid walk walk walk walk walk walk walk walk walk pull_object:crate#1 walk walk pull_object:crate#1 walk walk walk walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk walk walk walk push_object:crate#1 walk push_object:sticky#1 move_sticky_rigid

## Individual Probes

### push_pull_shift

- Found bypass: false
- Status: exhausted
- Explored states: 800001
- Reason: state budget exceeded (800000)

### box_sticky_shift

- Found bypass: false
- Status: exhausted
- Explored states: 800002
- Reason: state budget exceeded (800000)

### pull_event

- Found bypass: false
- Status: exhausted
- Explored states: 800002
- Reason: state budget exceeded (800000)

### box_to_sticky

- Found bypass: false
- Status: exhausted
- Explored states: 800001
- Reason: state budget exceeded (800000)

### sticky_to_box

- Found bypass: true
- Status: found
- Explored states: 150691
- Depth: 43
- Missing groups: sticky_to_box
- Inputs: up right right down up up left down up right down down left left left left up left down right up right down right right right right down left up up up right down left down left left left left up right right
- Events: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:crate#2 box_to_sticky:n1 pull_object:sticky#1 move_sticky_rigid sticky_merge:n1 walk pull_object:sticky#2 move_sticky_rigid sticky_merge:n1 pull_object:sticky#1 move_sticky_rigid push_object:sticky#1 move_sticky_rigid push_object:sticky#1 force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid pull_object:sticky#1 move_sticky_rigid walk walk walk walk walk walk walk walk walk pull_object:crate#1 walk walk pull_object:crate#1 walk walk walk walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk walk walk walk push_object:crate#1 walk push_object:sticky#1 move_sticky_rigid

### sticky_rigid

- Found bypass: false
- Status: exhausted
- Explored states: 800001
- Reason: state budget exceeded (800000)
