# Event Probe: RA_CURR_L12_SCRATCHC

- Budget: maxStates=300000, maxDepth=80
- Required groups: push_event, pull_event, box_to_sticky, sticky_merge, sticky_rigid

## Layout

```text
###########
#...@..####
#P#.C..#B##
#L#.....S##
#...M.G.###
###########
```

## Combined Probe

- Found bypass: true
- Status: found
- Explored states: 131
- Depth: 6
- Missing groups: push_event, box_to_sticky, sticky_merge
- Inputs: right down down down right right
- Events: walk walk walk walk pull_object:sticky#1 move_sticky_rigid pull_object:sticky#1 move_sticky_rigid

## Individual Probes

### push_event

- Found bypass: true
- Status: found
- Explored states: 127
- Depth: 6
- Missing groups: push_event
- Inputs: right down down down right right
- Events: walk walk walk walk pull_object:sticky#1 move_sticky_rigid pull_object:sticky#1 move_sticky_rigid

### pull_event

- Found bypass: true
- Status: found
- Explored states: 247
- Depth: 8
- Missing groups: pull_event
- Inputs: left down right right up right down down
- Events: walk walk push_object:crate#1 push_object:crate#1 walk walk push_object:crate#1 box_to_sticky:n1 push_object:sticky#2 move_sticky_rigid

### box_to_sticky

- Found bypass: true
- Status: found
- Explored states: 127
- Depth: 6
- Missing groups: box_to_sticky
- Inputs: right down down down right right
- Events: walk walk walk walk pull_object:sticky#1 move_sticky_rigid pull_object:sticky#1 move_sticky_rigid

### sticky_merge

- Found bypass: true
- Status: found
- Explored states: 127
- Depth: 6
- Missing groups: sticky_merge
- Inputs: right down down down right right
- Events: walk walk walk walk pull_object:sticky#1 move_sticky_rigid pull_object:sticky#1 move_sticky_rigid

### sticky_rigid

- Found bypass: false
- Status: complete
- Explored states: 3838
- Reason: no winning bypass found
