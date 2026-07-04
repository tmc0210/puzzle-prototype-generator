# Event Probe: RA_EXP_2026_07_04_PHASE_FERRY_v3

- Budget: maxStates=300000, maxDepth=100
- Required groups: push_pull_anchor_shift, box_sticky_anchor_shift, pull_event, material_normalization, sticky_merge, sticky_rigid_move

## Layout

```text
##########
#..GS.MMM#
#...BLP.C#
#G@....#.#
#..#CGC..#
##########
```

## Combined Probe

- Found bypass: true
- Status: found
- Explored states: 8480
- Depth: 46
- Missing groups: sticky_rigid_move
- Inputs: up right left left down right right right up left down left down left up up up right right right right down right down left down left up up left left right right right up left down left down right up right down left left left
- Events: walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk walk walk pull_object:crate#2 pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk pull_object:crate#2 pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 sticky_merge:n1 walk walk walk walk walk walk walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk push_object:push_pull_anchor force_chain:n3 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk push_object:crate#1 walk walk push_object:crate#1 walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky

## Individual Probes

### push_pull_anchor_shift

- Found bypass: false
- Status: exhausted
- Explored states: 40238
- Reason: depth budget exceeded (100)

### box_sticky_anchor_shift

- Found bypass: false
- Status: exhausted
- Explored states: 40226
- Reason: depth budget exceeded (100)

### pull_event

- Found bypass: false
- Status: exhausted
- Explored states: 40226
- Reason: depth budget exceeded (100)

### material_normalization

- Found bypass: false
- Status: exhausted
- Explored states: 40226
- Reason: depth budget exceeded (100)

### sticky_merge

- Found bypass: false
- Status: exhausted
- Explored states: 40226
- Reason: depth budget exceeded (100)

### sticky_rigid_move

- Found bypass: true
- Status: found
- Explored states: 8469
- Depth: 46
- Missing groups: sticky_rigid_move
- Inputs: up right left left down right right right up left down left down left up up up right right right right down right down left down left up up left left right right right up left down left down right up right down left left left
- Events: walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk walk walk pull_object:crate#2 pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk pull_object:crate#2 pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 sticky_merge:n1 walk walk walk walk walk walk walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk push_object:push_pull_anchor force_chain:n3 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk push_object:crate#1 walk walk push_object:crate#1 walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky
