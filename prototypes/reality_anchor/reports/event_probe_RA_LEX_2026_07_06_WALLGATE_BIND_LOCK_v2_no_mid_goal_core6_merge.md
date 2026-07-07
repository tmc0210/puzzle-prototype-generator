# Event Probe: RA_LEX_2026_07_06_WALLGATE_BIND_LOCK_v2_no_mid_goal_core6_merge

- Budget: maxStates=500000, maxDepth=120
- Required groups: push_pull_shift, box_sticky_shift, pull_event, box_to_sticky, sticky_rigid, sticky_merge

## Layout

```text
########
#PLB.C.#
#@MS..G#
#....#.#
#M....##
########
```

## Combined Probe

- Found bypass: true
- Status: found
- Explored states: 131
- Depth: 8
- Missing groups: push_pull_shift, sticky_rigid, sticky_merge
- Inputs: down right right right up right right down
- Events: walk walk walk walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky pull_object:crate#1 box_to_sticky:n1

## Individual Probes

### push_pull_shift

- Found bypass: true
- Status: found
- Explored states: 127
- Depth: 8
- Missing groups: push_pull_shift
- Inputs: down right right right up right right down
- Events: walk walk walk walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky pull_object:crate#1 box_to_sticky:n1

### box_sticky_shift

- Found bypass: false
- Status: complete
- Explored states: 499
- Reason: no winning bypass found

### pull_event

- Found bypass: false
- Status: complete
- Explored states: 483
- Reason: no winning bypass found

### box_to_sticky

- Found bypass: false
- Status: complete
- Explored states: 528
- Reason: no winning bypass found

### sticky_rigid

- Found bypass: true
- Status: found
- Explored states: 123
- Depth: 8
- Missing groups: sticky_rigid
- Inputs: down right right right up right right down
- Events: walk walk walk walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky pull_object:crate#1 box_to_sticky:n1

### sticky_merge

- Found bypass: true
- Status: found
- Explored states: 123
- Depth: 8
- Missing groups: sticky_merge
- Inputs: down right right right up right right down
- Events: walk walk walk walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky pull_object:crate#1 box_to_sticky:n1
