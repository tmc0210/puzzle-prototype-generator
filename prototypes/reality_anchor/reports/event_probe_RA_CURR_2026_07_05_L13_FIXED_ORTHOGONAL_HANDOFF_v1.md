# Event Probe: RA_CURR_2026_07_05_L13_FIXED_ORTHOGONAL_HANDOFF_v1

- Budget: maxStates=300000, maxDepth=80
- Required groups: push_pull_anchor_shift, box_sticky_anchor_shift, pull_event, material_normalization, sticky_merge, sticky_rigid_move

## Layout

```text
###########
####BS#####
#P#.C.G..##
#L#..MG..##
###.@....##
###########
```

## Combined Probe

- Found bypass: true
- Status: found
- Explored states: 56
- Depth: 5
- Missing groups: push_pull_anchor_shift, box_sticky_anchor_shift, pull_event
- Inputs: left up up right right
- Events: walk walk walk push_object:crate#1 box_to_sticky:n1 sticky_merge:n1 push_object:sticky#1 move_sticky_rigid

## Individual Probes

### push_pull_anchor_shift

- Found bypass: true
- Status: found
- Explored states: 55
- Depth: 5
- Missing groups: push_pull_anchor_shift
- Inputs: left up up right right
- Events: walk walk walk push_object:crate#1 box_to_sticky:n1 sticky_merge:n1 push_object:sticky#1 move_sticky_rigid

### box_sticky_anchor_shift

- Found bypass: true
- Status: found
- Explored states: 55
- Depth: 5
- Missing groups: box_sticky_anchor_shift
- Inputs: left up up right right
- Events: walk walk walk push_object:crate#1 box_to_sticky:n1 sticky_merge:n1 push_object:sticky#1 move_sticky_rigid

### pull_event

- Found bypass: true
- Status: found
- Explored states: 55
- Depth: 5
- Missing groups: pull_event
- Inputs: left up up right right
- Events: walk walk walk push_object:crate#1 box_to_sticky:n1 sticky_merge:n1 push_object:sticky#1 move_sticky_rigid

### material_normalization

- Found bypass: false
- Status: complete
- Explored states: 2142
- Reason: no winning bypass found

### sticky_merge

- Found bypass: false
- Status: complete
- Explored states: 3014
- Reason: no winning bypass found

### sticky_rigid_move

- Found bypass: false
- Status: complete
- Explored states: 1725
- Reason: no winning bypass found
