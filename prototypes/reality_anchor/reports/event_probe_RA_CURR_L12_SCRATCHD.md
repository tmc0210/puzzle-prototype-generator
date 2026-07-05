# Event Probe: RA_CURR_L12_SCRATCHD

- Budget: maxStates=300000, maxDepth=80
- Required groups: push_event, pull_event, box_to_sticky, sticky_merge, sticky_rigid

## Layout

```text
###########
#...@..####
#P#.C..#B##
#L#...G.S##
#...M.G.###
###########
```

## Combined Probe

- Found bypass: true
- Status: found
- Explored states: 912
- Depth: 13
- Missing groups: pull_event
- Inputs: down up left left left down up right right down down right right
- Events: push_object:crate#1 box_to_sticky:n1 sticky_merge:n1 walk walk walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk walk walk push_object:sticky#1 move_sticky_rigid push_object:sticky#1 move_sticky_rigid

## Individual Probes

### push_event

- Found bypass: true
- Status: found
- Explored states: 1528
- Depth: 17
- Missing groups: push_event
- Inputs: right down down down right up left left down left up up right right down right right
- Events: walk walk walk walk pull_object:sticky#1 move_sticky_rigid walk walk walk pull_object:crate#1 box_to_sticky:n1 pull_object:sticky#2 move_sticky_rigid sticky_merge:n1 walk walk walk walk walk pull_object:sticky#1 move_sticky_rigid pull_object:sticky#1 move_sticky_rigid

### pull_event

- Found bypass: true
- Status: found
- Explored states: 841
- Depth: 13
- Missing groups: pull_event
- Inputs: down up left left left down up right right down down right right
- Events: push_object:crate#1 box_to_sticky:n1 sticky_merge:n1 walk walk walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk walk walk push_object:sticky#1 move_sticky_rigid push_object:sticky#1 move_sticky_rigid

### box_to_sticky

- Found bypass: false
- Status: complete
- Explored states: 3439
- Reason: no winning bypass found

### sticky_merge

- Found bypass: false
- Status: complete
- Explored states: 3439
- Reason: no winning bypass found

### sticky_rigid

- Found bypass: false
- Status: complete
- Explored states: 3838
- Reason: no winning bypass found
