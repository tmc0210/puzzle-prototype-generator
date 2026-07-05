# Directional Event Probe: RA_SCRATCH_RESIDUE_MOVE_A_core

- Budget: maxStates=500000, maxDepth=120
- Required groups: bs_shift, box_to_sticky, sticky_merge, sticky_to_box, rigid, crate_push

## Layout

```text
############
#......G##.#
#....@C.MM.#
#..##.....##
#..##...GG##
#####.BS...#
############
```

## Combined Probe

- Found bypass: true
- Status: found
- Explored states: 194774
- Depth: 32
- Missing groups: bs_shift
- Inputs: up right down left down right right down right right up left left up down down left left up right left up up right down left down right right up right down
- Events: walk walk push_object:crate#1 walk walk push_object:crate#1 box_to_sticky:n1 push_object:sticky#1 move_sticky_rigid sticky_merge:n1 walk walk walk walk push_object:sticky#1 move_sticky_rigid push_object:sticky#1 move_sticky_rigid sticky_to_box:n2 push_object:sticky#1 move_sticky_rigid walk walk walk walk walk push_object:crate#2 box_to_sticky:n1 walk walk walk walk push_object:crate#1 walk walk push_object:crate#1 force_chain:n2 move_sticky_rigid box_to_sticky:n1 sticky_merge:n1 push_object:sticky#2 move_sticky_rigid walk walk push_object:sticky#2 move_sticky_rigid

## Individual Probes

### bs_shift

- Found bypass: true
- Status: found
- Explored states: 164264
- Depth: 32
- Missing groups: bs_shift
- Inputs: up right down left down right right down right right up left left up down down left left up right left up up right down left down right right up right down
- Events: walk walk push_object:crate#1 walk walk push_object:crate#1 box_to_sticky:n1 push_object:sticky#1 move_sticky_rigid sticky_merge:n1 walk walk walk walk push_object:sticky#1 move_sticky_rigid push_object:sticky#1 move_sticky_rigid sticky_to_box:n2 push_object:sticky#1 move_sticky_rigid walk walk walk walk walk push_object:crate#2 box_to_sticky:n1 walk walk walk walk push_object:crate#1 walk walk push_object:crate#1 force_chain:n2 move_sticky_rigid box_to_sticky:n1 sticky_merge:n1 push_object:sticky#2 move_sticky_rigid walk walk push_object:sticky#2 move_sticky_rigid

### box_to_sticky

- Found bypass: false
- Status: exhausted
- Explored states: 500001
- Reason: state budget exceeded (500000)

### sticky_merge

- Found bypass: false
- Status: exhausted
- Explored states: 500001
- Reason: state budget exceeded (500000)

### sticky_to_box

- Found bypass: false
- Status: exhausted
- Explored states: 500001
- Reason: state budget exceeded (500000)

### rigid

- Found bypass: false
- Status: exhausted
- Explored states: 500001
- Reason: state budget exceeded (500000)

### crate_push

- Found bypass: false
- Status: exhausted
- Explored states: 500001
- Reason: state budget exceeded (500000)
