# Event Probe: RA_LEX_2026_07_06_CUT_TAIL_RELAY_v1_no_top_goal_core

- Budget: maxStates=500000, maxDepth=140
- Required groups: box_to_sticky, sticky_rigid_move, sticky_to_box, crate_push

## Layout

```text
#########
#.......#
#B#C....#
#S#..G.##
##.M.G.##
##.M...##
#..@...##
#########
```

## Combined Probe

- Found bypass: true
- Status: found
- Explored states: 89
- Depth: 5
- Missing groups: box_to_sticky, sticky_to_box, crate_push
- Inputs: up left up right right
- Events: push_object:sticky#1 move_sticky_rigid walk walk push_object:sticky#1 move_sticky_rigid push_object:sticky#1 move_sticky_rigid

## Individual Probes

### box_to_sticky

- Found bypass: true
- Status: found
- Explored states: 89
- Depth: 5
- Missing groups: box_to_sticky
- Inputs: up left up right right
- Events: push_object:sticky#1 move_sticky_rigid walk walk push_object:sticky#1 move_sticky_rigid push_object:sticky#1 move_sticky_rigid

### sticky_rigid_move

- Found bypass: false
- Status: complete
- Explored states: 141793
- Reason: no winning bypass found

### sticky_to_box

- Found bypass: true
- Status: found
- Explored states: 89
- Depth: 5
- Missing groups: sticky_to_box
- Inputs: up left up right right
- Events: push_object:sticky#1 move_sticky_rigid walk walk push_object:sticky#1 move_sticky_rigid push_object:sticky#1 move_sticky_rigid

### crate_push

- Found bypass: true
- Status: found
- Explored states: 89
- Depth: 5
- Missing groups: crate_push
- Inputs: up left up right right
- Events: push_object:sticky#1 move_sticky_rigid walk walk push_object:sticky#1 move_sticky_rigid push_object:sticky#1 move_sticky_rigid
