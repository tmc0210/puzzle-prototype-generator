# Event Probe: RA_CURR_L12_SCRATCHE

- Budget: maxStates=300000, maxDepth=80
- Required groups: push_event, pull_event, box_to_sticky, sticky_merge, sticky_rigid

## Layout

```text
###########
##..@..####
#P#.C..#B##
#L#...G.S##
##..M.G.###
###########
```

## Combined Probe

- Found bypass: true
- Status: found
- Explored states: 1032
- Depth: 17
- Missing groups: push_event
- Inputs: right down down down right up left left down left up up right right down right right
- Events: walk walk walk walk pull_object:sticky#1 move_sticky_rigid walk walk walk pull_object:crate#1 box_to_sticky:n1 pull_object:sticky#2 move_sticky_rigid sticky_merge:n1 walk walk walk walk walk pull_object:sticky#1 move_sticky_rigid pull_object:sticky#1 move_sticky_rigid

## Individual Probes

### push_event

- Found bypass: true
- Status: found
- Explored states: 817
- Depth: 17
- Missing groups: push_event
- Inputs: right down down down right up left left down left up up right right down right right
- Events: walk walk walk walk pull_object:sticky#1 move_sticky_rigid walk walk walk pull_object:crate#1 box_to_sticky:n1 pull_object:sticky#2 move_sticky_rigid sticky_merge:n1 walk walk walk walk walk pull_object:sticky#1 move_sticky_rigid pull_object:sticky#1 move_sticky_rigid

### pull_event

- Found bypass: false
- Status: complete
- Explored states: 1069
- Reason: no winning bypass found

### box_to_sticky

- Found bypass: false
- Status: complete
- Explored states: 887
- Reason: no winning bypass found

### sticky_merge

- Found bypass: false
- Status: complete
- Explored states: 887
- Reason: no winning bypass found

### sticky_rigid

- Found bypass: false
- Status: complete
- Explored states: 1022
- Reason: no winning bypass found
