# Event Probe: RA_LEX_2026_07_08_TRIBAR_CUT_TAIL_v1_no_top_goal_core4

- Budget: maxStates=300000, maxDepth=80
- Required groups: box_to_sticky, sticky_merge, sticky_cut, sticky_rigid_tail

## Layout

```text
###########
#@.#.######
#.CCC....G#
####.....##
####BS#####
###########
```

## Combined Probe

- Found bypass: true
- Status: found
- Explored states: 29
- Depth: 6
- Missing groups: sticky_cut
- Inputs: down right right right right right
- Events: walk push_object:crate#1 force_chain:n3 box_to_sticky:n1 push_object:crate#1 force_chain:n3 move_sticky_rigid box_to_sticky:n1 sticky_merge:n1 push_object:crate#1 force_chain:n2 move_sticky_rigid box_to_sticky:n1 sticky_merge:n1 push_object:sticky#1 move_sticky_rigid push_object:sticky#1 move_sticky_rigid

## Individual Probes

### box_to_sticky

- Found bypass: false
- Status: complete
- Explored states: 334
- Reason: no winning bypass found

### sticky_merge

- Found bypass: false
- Status: complete
- Explored states: 334
- Reason: no winning bypass found

### sticky_cut

- Found bypass: true
- Status: found
- Explored states: 29
- Depth: 6
- Missing groups: sticky_cut
- Inputs: down right right right right right
- Events: walk push_object:crate#1 force_chain:n3 box_to_sticky:n1 push_object:crate#1 force_chain:n3 move_sticky_rigid box_to_sticky:n1 sticky_merge:n1 push_object:crate#1 force_chain:n2 move_sticky_rigid box_to_sticky:n1 sticky_merge:n1 push_object:sticky#1 move_sticky_rigid push_object:sticky#1 move_sticky_rigid

### sticky_rigid_tail

- Found bypass: false
- Status: complete
- Explored states: 334
- Reason: no winning bypass found
