# Event Probe: RA_CURR_L11_APP_SCRATCHB_core

- Budget: maxStates=300000, maxDepth=80
- Required groups: bs_shift, box_to_sticky, sticky_merge, sticky_to_box, sticky_rigid, push_event

## Layout

```text
#########
#.....#.#
#..BS#G.#
##.C.MM.#
#.@#....#
#...G...#
#########
```

## Combined Probe

- Found bypass: true
- Status: found
- Explored states: 3237
- Depth: 19
- Missing groups: sticky_merge, sticky_to_box
- Inputs: down right right up up right left up left left down right up right down down right right up
- Events: walk walk walk walk walk push_object:sticky#1 move_sticky_rigid walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk walk push_object:crate#1 box_to_sticky:n1 walk walk push_object:sticky#1 move_sticky_rigid push_object:sticky#1 move_sticky_rigid walk walk push_object:sticky#2 move_sticky_rigid

## Individual Probes

### bs_shift

- Found bypass: true
- Status: found
- Explored states: 22164
- Depth: 29
- Missing groups: bs_shift
- Inputs: down right right up right right right up up left down down left left down left left up up right right right down right up down right down left
- Events: walk walk walk walk walk walk walk walk walk walk push_object:sticky#1 move_sticky_rigid push_object:sticky#1 move_sticky_rigid walk walk walk walk walk walk walk push_object:crate#1 box_to_sticky:n1 push_object:sticky#1 move_sticky_rigid push_object:sticky#1 move_sticky_rigid walk walk push_object:sticky#2 move_sticky_rigid walk walk walk push_object:sticky#1 move_sticky_rigid

### box_to_sticky

- Found bypass: true
- Status: found
- Explored states: 7248
- Depth: 23
- Missing groups: box_to_sticky
- Inputs: down right right up up up left left up right down left down right up right down down up right down right up
- Events: walk walk walk walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk walk push_object:crate#1 walk walk push_object:crate#1 push_object:crate#1 walk push_object:sticky#1 move_sticky_rigid walk walk push_object:sticky#1 move_sticky_rigid

### sticky_merge

- Found bypass: true
- Status: found
- Explored states: 3112
- Depth: 19
- Missing groups: sticky_merge
- Inputs: down right right up up right left up left left down right up right down down right right up
- Events: walk walk walk walk walk push_object:sticky#1 move_sticky_rigid walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk walk push_object:crate#1 box_to_sticky:n1 walk walk push_object:sticky#1 move_sticky_rigid push_object:sticky#1 move_sticky_rigid walk walk push_object:sticky#2 move_sticky_rigid

### sticky_to_box

- Found bypass: true
- Status: found
- Explored states: 3094
- Depth: 19
- Missing groups: sticky_to_box
- Inputs: down right right up up right left up left left down right up right down down right right up
- Events: walk walk walk walk walk push_object:sticky#1 move_sticky_rigid walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk walk push_object:crate#1 box_to_sticky:n1 walk walk push_object:sticky#1 move_sticky_rigid push_object:sticky#1 move_sticky_rigid walk walk push_object:sticky#2 move_sticky_rigid

### sticky_rigid

- Found bypass: false
- Status: exhausted
- Explored states: 300001
- Reason: state budget exceeded (300000)

### push_event

- Found bypass: false
- Status: exhausted
- Explored states: 300001
- Reason: state budget exceeded (300000)
