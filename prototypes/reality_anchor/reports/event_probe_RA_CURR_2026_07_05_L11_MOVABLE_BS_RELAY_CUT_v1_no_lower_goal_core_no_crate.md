# Event Probe: RA_CURR_2026_07_05_L11_MOVABLE_BS_RELAY_CUT_v1_no_lower_goal_core_no_crate

- Budget: maxStates=300000, maxDepth=40
- Required groups: bs_shift, box_to_sticky, sticky_merge, sticky_to_box, sticky_rigid

## Layout

```text
#########
#G.C.#..#
##@BS..M#
#...M..M#
#########
```

## Combined Probe

- Found bypass: true
- Status: found
- Explored states: 68
- Depth: 5
- Missing groups: box_to_sticky, sticky_merge, sticky_rigid
- Inputs: right right up left left
- Events: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 push_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk push_object:crate#1 push_object:crate#1

## Individual Probes

### bs_shift

- Found bypass: false
- Status: complete
- Explored states: 429
- Reason: no winning bypass found

### box_to_sticky

- Found bypass: true
- Status: found
- Explored states: 68
- Depth: 5
- Missing groups: box_to_sticky
- Inputs: right right up left left
- Events: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 push_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk push_object:crate#1 push_object:crate#1

### sticky_merge

- Found bypass: true
- Status: found
- Explored states: 63
- Depth: 5
- Missing groups: sticky_merge
- Inputs: right right up left left
- Events: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 push_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk push_object:crate#1 push_object:crate#1

### sticky_to_box

- Found bypass: true
- Status: found
- Explored states: 376
- Depth: 13
- Missing groups: sticky_to_box
- Inputs: down right right right left left left up right right up left left
- Events: walk walk push_object:sticky#1 move_sticky_rigid push_object:sticky#1 move_sticky_rigid sticky_merge:n1 walk walk walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky push_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk push_object:crate#1 push_object:crate#1

### sticky_rigid

- Found bypass: true
- Status: found
- Explored states: 63
- Depth: 5
- Missing groups: sticky_rigid
- Inputs: right right up left left
- Events: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 push_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk push_object:crate#1 push_object:crate#1
