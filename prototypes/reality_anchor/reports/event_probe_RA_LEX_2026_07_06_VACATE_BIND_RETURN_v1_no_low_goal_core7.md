# Event Probe: RA_LEX_2026_07_06_VACATE_BIND_RETURN_v1_no_low_goal_core7

- Budget: maxStates=1000000, maxDepth=160
- Required groups: push_pull_shift, box_sticky_shift, pull_event, box_to_sticky, sticky_to_box, sticky_rigid, sticky_merge

## Layout

```text
#########
##MG.M@.#
#.M.M..M#
#BSLP#.##
#....#..#
#########
```

## Combined Probe

- Found bypass: true
- Status: found
- Explored states: 13
- Depth: 2
- Missing groups: push_pull_shift, box_sticky_shift, pull_event, box_to_sticky, sticky_to_box
- Inputs: left left
- Events: push_object:sticky#3 move_sticky_rigid sticky_merge:n1 push_object:sticky#2 move_sticky_rigid sticky_merge:n1

## Individual Probes

### push_pull_shift

- Found bypass: true
- Status: found
- Explored states: 13
- Depth: 2
- Missing groups: push_pull_shift
- Inputs: left left
- Events: push_object:sticky#3 move_sticky_rigid sticky_merge:n1 push_object:sticky#2 move_sticky_rigid sticky_merge:n1

### box_sticky_shift

- Found bypass: true
- Status: found
- Explored states: 13
- Depth: 2
- Missing groups: box_sticky_shift
- Inputs: left left
- Events: push_object:sticky#3 move_sticky_rigid sticky_merge:n1 push_object:sticky#2 move_sticky_rigid sticky_merge:n1

### pull_event

- Found bypass: true
- Status: found
- Explored states: 13
- Depth: 2
- Missing groups: pull_event
- Inputs: left left
- Events: push_object:sticky#3 move_sticky_rigid sticky_merge:n1 push_object:sticky#2 move_sticky_rigid sticky_merge:n1

### box_to_sticky

- Found bypass: true
- Status: found
- Explored states: 13
- Depth: 2
- Missing groups: box_to_sticky
- Inputs: left left
- Events: push_object:sticky#3 move_sticky_rigid sticky_merge:n1 push_object:sticky#2 move_sticky_rigid sticky_merge:n1

### sticky_to_box

- Found bypass: true
- Status: found
- Explored states: 13
- Depth: 2
- Missing groups: sticky_to_box
- Inputs: left left
- Events: push_object:sticky#3 move_sticky_rigid sticky_merge:n1 push_object:sticky#2 move_sticky_rigid sticky_merge:n1

### sticky_rigid

- Found bypass: false
- Status: complete
- Explored states: 739
- Reason: no winning bypass found

### sticky_merge

- Found bypass: false
- Status: complete
- Explored states: 739
- Reason: no winning bypass found
