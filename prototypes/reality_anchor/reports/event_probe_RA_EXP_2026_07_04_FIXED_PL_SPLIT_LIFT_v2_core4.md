# Event Probe: RA_EXP_2026_07_04_FIXED_PL_SPLIT_LIFT_v2_core4

- Budget: maxStates=400000, maxDepth=100
- Required groups: box_sticky_anchor_shift, pull_event, sticky_to_box, sticky_rigid_move

## Layout

```text
###########
#P#....@..#
#L#...#B#.#
####G##S#.#
####m##.#.#
####M####.#
###########
```

## Combined Probe

- Found bypass: true
- Status: found
- Explored states: 32
- Depth: 6
- Missing groups: box_sticky_anchor_shift, sticky_to_box
- Inputs: left left down left down up
- Events: walk walk walk walk walk pull_object:sticky#1 move_sticky_rigid

## Individual Probes

### box_sticky_anchor_shift

- Found bypass: true
- Status: found
- Explored states: 31
- Depth: 6
- Missing groups: box_sticky_anchor_shift
- Inputs: left left down left down up
- Events: walk walk walk walk walk pull_object:sticky#1 move_sticky_rigid

### pull_event

- Found bypass: false
- Status: complete
- Explored states: 61
- Reason: no winning bypass found

### sticky_to_box

- Found bypass: true
- Status: found
- Explored states: 17
- Depth: 6
- Missing groups: sticky_to_box
- Inputs: left left down left down up
- Events: walk walk walk walk walk pull_object:sticky#1 move_sticky_rigid

### sticky_rigid_move

- Found bypass: false
- Status: complete
- Explored states: 45
- Reason: no winning bypass found
