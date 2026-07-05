# Event Probe: RA_CURR_L11_APP_SCRATCHA_core

- Budget: maxStates=300000, maxDepth=80
- Required groups: bs_shift, box_to_sticky, sticky_merge, sticky_to_box, sticky_rigid, crate_push

## Layout

```text
#########
#.....#.#
#..BS#G.#
##.C.MM.#
#C@#....#
#...G...#
#########
```

## Combined Probe

- Found bypass: true
- Status: found
- Explored states: 969
- Depth: 15
- Missing groups: crate_push
- Inputs: up right up left up right down right down down up right down right up
- Events: walk push_object:crate#1 box_to_sticky:n1 sticky_merge:n1 push_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 walk walk push_object:crate#1 push_object:crate#2 walk push_object:sticky#1 move_sticky_rigid walk walk push_object:sticky#1 move_sticky_rigid

## Individual Probes

### bs_shift

- Found bypass: true
- Status: found
- Explored states: 20525
- Depth: 29
- Missing groups: bs_shift
- Inputs: down right right up right right right up up left down down left left down left left up up right right right down right up down right down left
- Events: walk walk walk walk walk walk walk walk walk walk push_object:sticky#1 move_sticky_rigid push_object:sticky#1 move_sticky_rigid walk walk walk walk walk walk walk push_object:crate#1 box_to_sticky:n1 push_object:sticky#1 move_sticky_rigid push_object:sticky#1 move_sticky_rigid walk walk push_object:sticky#2 move_sticky_rigid walk walk walk push_object:sticky#1 move_sticky_rigid

### box_to_sticky

- Found bypass: true
- Status: found
- Explored states: 6704
- Depth: 23
- Missing groups: box_to_sticky
- Inputs: down right right up up up left left up right down left down right up right down down up right down right up
- Events: walk walk walk walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk walk push_object:crate#1 walk walk push_object:crate#1 push_object:crate#2 walk push_object:sticky#1 move_sticky_rigid walk walk push_object:sticky#1 move_sticky_rigid

### sticky_merge

- Found bypass: true
- Status: found
- Explored states: 2888
- Depth: 19
- Missing groups: sticky_merge
- Inputs: down right right up up right left up left left down right up right down down right right up
- Events: walk walk walk walk walk push_object:sticky#1 move_sticky_rigid walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk walk push_object:crate#1 box_to_sticky:n1 walk walk push_object:sticky#1 move_sticky_rigid push_object:sticky#1 move_sticky_rigid walk walk push_object:sticky#2 move_sticky_rigid

### sticky_to_box

- Found bypass: true
- Status: found
- Explored states: 2868
- Depth: 19
- Missing groups: sticky_to_box
- Inputs: down right right up up right left up left left down right up right down down right right up
- Events: walk walk walk walk walk push_object:sticky#1 move_sticky_rigid walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk walk push_object:crate#1 box_to_sticky:n1 walk walk push_object:sticky#1 move_sticky_rigid push_object:sticky#1 move_sticky_rigid walk walk push_object:sticky#2 move_sticky_rigid

### sticky_rigid

- Found bypass: false
- Status: exhausted
- Explored states: 300002
- Reason: state budget exceeded (300000)

### crate_push

- Found bypass: true
- Status: found
- Explored states: 914
- Depth: 15
- Missing groups: crate_push
- Inputs: up right up left up right down right down down up right down right up
- Events: walk push_object:crate#1 box_to_sticky:n1 sticky_merge:n1 push_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 walk walk push_object:crate#1 push_object:crate#2 walk push_object:sticky#1 move_sticky_rigid walk walk push_object:sticky#1 move_sticky_rigid
