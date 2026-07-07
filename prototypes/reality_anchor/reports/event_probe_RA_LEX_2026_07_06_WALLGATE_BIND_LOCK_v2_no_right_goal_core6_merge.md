# Event Probe: RA_LEX_2026_07_06_WALLGATE_BIND_LOCK_v2_no_right_goal_core6_merge

- Budget: maxStates=500000, maxDepth=120
- Required groups: push_pull_shift, box_sticky_shift, pull_event, box_to_sticky, sticky_rigid, sticky_merge

## Layout

```text
########
#PLB.C.#
#@MS...#
#.G..#.#
#M....##
########
```

## Combined Probe

- Found bypass: true
- Status: found
- Explored states: 13
- Depth: 3
- Missing groups: push_pull_shift, box_sticky_shift, box_to_sticky, sticky_merge
- Inputs: down right down
- Events: walk walk pull_object:sticky#2 move_sticky_rigid

## Individual Probes

### push_pull_shift

- Found bypass: true
- Status: found
- Explored states: 12
- Depth: 3
- Missing groups: push_pull_shift
- Inputs: down right down
- Events: walk walk pull_object:sticky#2 move_sticky_rigid

### box_sticky_shift

- Found bypass: true
- Status: found
- Explored states: 12
- Depth: 3
- Missing groups: box_sticky_shift
- Inputs: down right down
- Events: walk walk pull_object:sticky#2 move_sticky_rigid

### pull_event

- Found bypass: false
- Status: complete
- Explored states: 483
- Reason: no winning bypass found

### box_to_sticky

- Found bypass: true
- Status: found
- Explored states: 12
- Depth: 3
- Missing groups: box_to_sticky
- Inputs: down right down
- Events: walk walk pull_object:sticky#2 move_sticky_rigid

### sticky_rigid

- Found bypass: true
- Status: found
- Explored states: 88
- Depth: 7
- Missing groups: sticky_rigid
- Inputs: down right right down left up down
- Events: walk walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 walk walk pull_object:crate#2 box_to_sticky:n1

### sticky_merge

- Found bypass: true
- Status: found
- Explored states: 12
- Depth: 3
- Missing groups: sticky_merge
- Inputs: down right down
- Events: walk walk pull_object:sticky#2 move_sticky_rigid
