# Event Probe: RA_LEX_2026_07_07_BIND_CUT_TAIL_v2_space_pruned_no_top_goal_core5

- Budget: maxStates=800000, maxDepth=80
- Required groups: force_chain, box_to_sticky, sticky_merge, sticky_to_box, sticky_rigid

## Layout

```text
##########
#@.#.#####
#.CC....G#
####....##
####BS####
##########
```

## Combined Probe

- Found bypass: true
- Status: found
- Explored states: 29
- Depth: 6
- Missing groups: sticky_to_box
- Inputs: down right right right right right
- Events: walk push_object:crate#1 force_chain:n2 push_object:crate#1 force_chain:n2 box_to_sticky:n1 push_object:crate#1 force_chain:n2 move_sticky_rigid box_to_sticky:n1 sticky_merge:n1 push_object:sticky#1 move_sticky_rigid push_object:sticky#1 move_sticky_rigid

## Individual Probes

### force_chain

- Found bypass: false
- Status: complete
- Explored states: 177
- Reason: no winning bypass found

### box_to_sticky

- Found bypass: false
- Status: complete
- Explored states: 177
- Reason: no winning bypass found

### sticky_merge

- Found bypass: false
- Status: complete
- Explored states: 177
- Reason: no winning bypass found

### sticky_to_box

- Found bypass: true
- Status: found
- Explored states: 29
- Depth: 6
- Missing groups: sticky_to_box
- Inputs: down right right right right right
- Events: walk push_object:crate#1 force_chain:n2 push_object:crate#1 force_chain:n2 box_to_sticky:n1 push_object:crate#1 force_chain:n2 move_sticky_rigid box_to_sticky:n1 sticky_merge:n1 push_object:sticky#1 move_sticky_rigid push_object:sticky#1 move_sticky_rigid

### sticky_rigid

- Found bypass: false
- Status: complete
- Explored states: 177
- Reason: no winning bypass found
