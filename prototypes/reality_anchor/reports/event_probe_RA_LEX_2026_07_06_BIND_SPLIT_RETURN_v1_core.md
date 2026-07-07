# Event Probe: RA_LEX_2026_07_06_BIND_SPLIT_RETURN_v1_core

- Budget: maxStates=700000, maxDepth=140
- Required groups: box_to_sticky, sticky_merge, sticky_rigid_move, sticky_to_box, crate_push

## Layout

```text
##########
#........#
#B#C...G.#
#S#..G...#
##.M.G...#
##.M.....#
#..@.....#
##########
```

## Combined Probe

- Found bypass: true
- Status: found
- Explored states: 674728
- Depth: 34
- Missing groups: sticky_merge
- Inputs: up left up right up right right up up left left down down down left down right down right up up up left up right right right up right right down down left left
- Events: push_object:sticky#1 move_sticky_rigid walk walk push_object:sticky#1 move_sticky_rigid walk push_object:sticky#1 move_sticky_rigid push_object:sticky#1 move_sticky_rigid walk walk walk walk push_object:crate#1 box_to_sticky:n1 push_object:sticky#1 move_sticky_rigid push_object:sticky#1 move_sticky_rigid walk walk push_object:sticky#1 move_sticky_rigid walk walk push_object:sticky#1 move_sticky_rigid push_object:sticky#1 move_sticky_rigid push_object:sticky#1 move_sticky_rigid sticky_to_box:n1 walk walk push_object:crate#1 push_object:crate#1 push_object:crate#1 walk walk walk walk walk walk push_object:sticky#1 move_sticky_rigid

## Individual Probes

### box_to_sticky

- Found bypass: false
- Status: complete
- Explored states: 505716
- Reason: no winning bypass found

### sticky_merge

- Found bypass: true
- Status: found
- Explored states: 481506
- Depth: 34
- Missing groups: sticky_merge
- Inputs: up left up right up right right up up left left down down down left down right down right up up up left up right right right up right right down down left left
- Events: push_object:sticky#1 move_sticky_rigid walk walk push_object:sticky#1 move_sticky_rigid walk push_object:sticky#1 move_sticky_rigid push_object:sticky#1 move_sticky_rigid walk walk walk walk push_object:crate#1 box_to_sticky:n1 push_object:sticky#1 move_sticky_rigid push_object:sticky#1 move_sticky_rigid walk walk push_object:sticky#1 move_sticky_rigid walk walk push_object:sticky#1 move_sticky_rigid push_object:sticky#1 move_sticky_rigid push_object:sticky#1 move_sticky_rigid sticky_to_box:n1 walk walk push_object:crate#1 push_object:crate#1 push_object:crate#1 walk walk walk walk walk walk push_object:sticky#1 move_sticky_rigid

### sticky_rigid_move

- Found bypass: false
- Status: complete
- Explored states: 444441
- Reason: no winning bypass found

### sticky_to_box

- Found bypass: false
- Status: complete
- Explored states: 463260
- Reason: no winning bypass found

### crate_push

- Found bypass: false
- Status: complete
- Explored states: 577849
- Reason: no winning bypass found
