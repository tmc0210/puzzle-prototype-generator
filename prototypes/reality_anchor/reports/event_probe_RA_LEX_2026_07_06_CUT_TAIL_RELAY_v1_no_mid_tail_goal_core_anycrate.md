# Event Probe: RA_LEX_2026_07_06_CUT_TAIL_RELAY_v1_no_mid_tail_goal_core_anycrate

- Budget: maxStates=500000, maxDepth=140
- Required groups: box_to_sticky, sticky_rigid_move, sticky_to_box, crate_push

## Layout

```text
#########
#.......#
#B#C...G#
#S#....##
##.M.G.##
##.M...##
#..@...##
#########
```

## Combined Probe

- Found bypass: true
- Status: found
- Explored states: 3545
- Depth: 15
- Missing groups: box_to_sticky
- Inputs: up left up right right down right up left up up right down up right
- Events: push_object:sticky#1 move_sticky_rigid walk walk push_object:sticky#1 move_sticky_rigid push_object:sticky#1 move_sticky_rigid walk walk push_object:sticky#1 move_sticky_rigid sticky_to_box:n1 walk walk walk push_object:crate#2 push_object:sticky#1 move_sticky_rigid walk push_object:crate#2

## Individual Probes

### box_to_sticky

- Found bypass: true
- Status: found
- Explored states: 3416
- Depth: 15
- Missing groups: box_to_sticky
- Inputs: up left up right right down right up left up up right down up right
- Events: push_object:sticky#1 move_sticky_rigid walk walk push_object:sticky#1 move_sticky_rigid push_object:sticky#1 move_sticky_rigid walk walk push_object:sticky#1 move_sticky_rigid sticky_to_box:n1 walk walk walk push_object:crate#2 push_object:sticky#1 move_sticky_rigid walk push_object:crate#2

### sticky_rigid_move

- Found bypass: false
- Status: complete
- Explored states: 141793
- Reason: no winning bypass found

### sticky_to_box

- Found bypass: false
- Status: complete
- Explored states: 149027
- Reason: no winning bypass found

### crate_push

- Found bypass: false
- Status: complete
- Explored states: 143493
- Reason: no winning bypass found
