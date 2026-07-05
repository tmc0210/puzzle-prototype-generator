# Event Probe: RA_CURR_L11_APP_SCRATCHC_no_top_goal_core

- Budget: maxStates=300000, maxDepth=80
- Required groups: bs_shift, box_to_sticky, sticky_merge, sticky_to_box, sticky_rigid, push_event

## Layout

```text
#########
##....###
##.BS#..#
##.C.MM.#
#.@#...##
####G####
#########
```

## Combined Probe

- Found bypass: true
- Status: found
- Explored states: 110
- Depth: 10
- Missing groups: sticky_rigid
- Inputs: up right up left up right down right down down
- Events: walk push_object:crate#1 box_to_sticky:n1 sticky_merge:n1 push_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 walk walk push_object:crate#1 push_object:crate#1

## Individual Probes

### bs_shift

- Found bypass: false
- Status: complete
- Explored states: 284
- Reason: no winning bypass found

### box_to_sticky

- Found bypass: false
- Status: complete
- Explored states: 284
- Reason: no winning bypass found

### sticky_merge

- Found bypass: false
- Status: complete
- Explored states: 284
- Reason: no winning bypass found

### sticky_to_box

- Found bypass: false
- Status: complete
- Explored states: 298
- Reason: no winning bypass found

### sticky_rigid

- Found bypass: true
- Status: found
- Explored states: 107
- Depth: 10
- Missing groups: sticky_rigid
- Inputs: up right up left up right down right down down
- Events: walk push_object:crate#1 box_to_sticky:n1 sticky_merge:n1 push_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 walk walk push_object:crate#1 push_object:crate#1

### push_event

- Found bypass: false
- Status: complete
- Explored states: 284
- Reason: no winning bypass found
