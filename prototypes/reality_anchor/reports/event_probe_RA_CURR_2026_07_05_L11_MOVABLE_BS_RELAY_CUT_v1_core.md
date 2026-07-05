# Event Probe: RA_CURR_2026_07_05_L11_MOVABLE_BS_RELAY_CUT_v1_core

- Budget: maxStates=300000, maxDepth=40
- Required groups: bs_shift, box_to_sticky, sticky_merge, sticky_to_box, sticky_rigid, crate_push

## Layout

```text
#########
#G.C.#..#
##@BS..M#
#.G.M..M#
#########
```

## Combined Probe

- Found bypass: true
- Status: found
- Explored states: 578
- Depth: 15
- Missing groups: crate_push
- Inputs: down right right right up left up left down right down left up up left
- Events: walk walk push_object:sticky#1 move_sticky_rigid push_object:sticky#1 move_sticky_rigid sticky_merge:n1 walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 walk push_object:sticky#1 move_sticky_rigid sticky_to_box:n1 push_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 walk walk push_object:sticky#1 move_sticky_rigid sticky_to_box:n1

## Individual Probes

### bs_shift

- Found bypass: false
- Status: complete
- Explored states: 429
- Reason: no winning bypass found

### box_to_sticky

- Found bypass: false
- Status: complete
- Explored states: 564
- Reason: no winning bypass found

### sticky_merge

- Found bypass: false
- Status: complete
- Explored states: 429
- Reason: no winning bypass found

### sticky_to_box

- Found bypass: false
- Status: complete
- Explored states: 508
- Reason: no winning bypass found

### sticky_rigid

- Found bypass: false
- Status: complete
- Explored states: 528
- Reason: no winning bypass found

### crate_push

- Found bypass: true
- Status: found
- Explored states: 356
- Depth: 15
- Missing groups: crate_push
- Inputs: down right right right up left up left down right down left up up left
- Events: walk walk push_object:sticky#1 move_sticky_rigid push_object:sticky#1 move_sticky_rigid sticky_merge:n1 walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 walk push_object:sticky#1 move_sticky_rigid sticky_to_box:n1 push_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 walk walk push_object:sticky#1 move_sticky_rigid sticky_to_box:n1
