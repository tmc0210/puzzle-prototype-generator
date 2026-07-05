# Event Probe: RA_CURR_2026_07_05_L12_FIXED_PARALLEL_DUAL_JOIN_v1_no_lower_goal_core

- Budget: maxStates=300000, maxDepth=80
- Required groups: pull_event, box_to_sticky, sticky_merge, sticky_rigid

## Layout

```text
###########
##..@..####
#P#.C..#B##
#L#...G.S##
##..M...###
###########
```

## Combined Probe

- Found bypass: true
- Status: found
- Explored states: 161
- Depth: 7
- Missing groups: pull_event, sticky_merge, sticky_rigid
- Inputs: left down right right up right down
- Events: walk walk push_object:crate#1 push_object:crate#1 walk walk push_object:crate#1 box_to_sticky:n1

## Individual Probes

### pull_event

- Found bypass: true
- Status: found
- Explored states: 160
- Depth: 7
- Missing groups: pull_event
- Inputs: left down right right up right down
- Events: walk walk push_object:crate#1 push_object:crate#1 walk walk push_object:crate#1 box_to_sticky:n1

### box_to_sticky

- Found bypass: true
- Status: found
- Explored states: 264
- Depth: 9
- Missing groups: box_to_sticky
- Inputs: left down right down up right down right right
- Events: walk walk push_object:crate#1 walk pull_object:sticky#1 move_sticky_rigid push_object:crate#1 walk pull_object:sticky#1 move_sticky_rigid pull_object:sticky#1 move_sticky_rigid

### sticky_merge

- Found bypass: true
- Status: found
- Explored states: 150
- Depth: 7
- Missing groups: sticky_merge
- Inputs: left down right right up right down
- Events: walk walk push_object:crate#1 push_object:crate#1 walk walk push_object:crate#1 box_to_sticky:n1

### sticky_rigid

- Found bypass: true
- Status: found
- Explored states: 161
- Depth: 7
- Missing groups: sticky_rigid
- Inputs: left down right right up right down
- Events: walk walk push_object:crate#1 push_object:crate#1 walk walk push_object:crate#1 box_to_sticky:n1
