# Event Probe: RA_LEX_2026_07_07_RATCHET_BRUSH_DUAL_PULL_v1_core7

- Budget: maxStates=500000, maxDepth=200
- Required groups: pl_anchor_push, push_pull_shift, box_sticky_shift, force_chain, cut_sticky_to_box, crate_pull, tail_pull, tail_rigid_move

## Layout

```text
##########
#.PLBS.###
#@.###..##
#....MMG.#
#....G#..#
#........#
##########
```

## Combined Probe

- Found bypass: true
- Status: found
- Explored states: 3664
- Depth: 42
- Missing groups: pl_anchor_push, push_pull_shift, box_sticky_shift, force_chain
- Inputs: down right right right left down down right right right right up up left right right down left down left left up up right up right down right down down left left left up down left up up right right right up
- Events: walk walk walk walk pull_object:sticky#1 move_sticky_rigid sticky_to_box:n1 walk walk walk walk walk walk walk walk walk pull_object:sticky#1 move_sticky_rigid pull_object:sticky#1 move_sticky_rigid walk walk pull_object:sticky#1 move_sticky_rigid walk walk walk walk pull_object:crate#1 box_to_sticky:n1 walk walk walk walk walk walk walk walk walk walk pull_object:sticky#1 move_sticky_rigid walk walk walk walk walk walk pull_object:sticky#2 move_sticky_rigid

## Individual Probes

### pl_anchor_push

- Found bypass: true
- Status: found
- Explored states: 2525
- Depth: 42
- Missing groups: pl_anchor_push
- Inputs: down right right right left down down right right right right up up left right right down left down left left up up right up right down right down down left left left up down left up up right right right up
- Events: walk walk walk walk pull_object:sticky#1 move_sticky_rigid sticky_to_box:n1 walk walk walk walk walk walk walk walk walk pull_object:sticky#1 move_sticky_rigid pull_object:sticky#1 move_sticky_rigid walk walk pull_object:sticky#1 move_sticky_rigid walk walk walk walk pull_object:crate#1 box_to_sticky:n1 walk walk walk walk walk walk walk walk walk walk pull_object:sticky#1 move_sticky_rigid walk walk walk walk walk walk pull_object:sticky#2 move_sticky_rigid

### push_pull_shift

- Found bypass: true
- Status: found
- Explored states: 2525
- Depth: 42
- Missing groups: push_pull_shift
- Inputs: down right right right left down down right right right right up up left right right down left down left left up up right up right down right down down left left left up down left up up right right right up
- Events: walk walk walk walk pull_object:sticky#1 move_sticky_rigid sticky_to_box:n1 walk walk walk walk walk walk walk walk walk pull_object:sticky#1 move_sticky_rigid pull_object:sticky#1 move_sticky_rigid walk walk pull_object:sticky#1 move_sticky_rigid walk walk walk walk pull_object:crate#1 box_to_sticky:n1 walk walk walk walk walk walk walk walk walk walk pull_object:sticky#1 move_sticky_rigid walk walk walk walk walk walk pull_object:sticky#2 move_sticky_rigid

### box_sticky_shift

- Found bypass: true
- Status: found
- Explored states: 2525
- Depth: 42
- Missing groups: box_sticky_shift
- Inputs: down right right right left down down right right right right up up left right right down left down left left up up right up right down right down down left left left up down left up up right right right up
- Events: walk walk walk walk pull_object:sticky#1 move_sticky_rigid sticky_to_box:n1 walk walk walk walk walk walk walk walk walk pull_object:sticky#1 move_sticky_rigid pull_object:sticky#1 move_sticky_rigid walk walk pull_object:sticky#1 move_sticky_rigid walk walk walk walk pull_object:crate#1 box_to_sticky:n1 walk walk walk walk walk walk walk walk walk walk pull_object:sticky#1 move_sticky_rigid walk walk walk walk walk walk pull_object:sticky#2 move_sticky_rigid

### force_chain

- Found bypass: true
- Status: found
- Explored states: 2579
- Depth: 42
- Missing groups: force_chain
- Inputs: down right right right left down down right right right right up up left right right down left down left left up up right up right down right down down left left left up down left up up right right right up
- Events: walk walk walk walk pull_object:sticky#1 move_sticky_rigid sticky_to_box:n1 walk walk walk walk walk walk walk walk walk pull_object:sticky#1 move_sticky_rigid pull_object:sticky#1 move_sticky_rigid walk walk pull_object:sticky#1 move_sticky_rigid walk walk walk walk pull_object:crate#1 box_to_sticky:n1 walk walk walk walk walk walk walk walk walk walk pull_object:sticky#1 move_sticky_rigid walk walk walk walk walk walk pull_object:sticky#2 move_sticky_rigid

### cut_sticky_to_box

- Found bypass: false
- Status: complete
- Explored states: 2584
- Reason: no winning bypass found

### crate_pull

- Found bypass: false
- Status: complete
- Explored states: 3531
- Reason: no winning bypass found

### tail_pull

- Found bypass: false
- Status: complete
- Explored states: 2718
- Reason: no winning bypass found

### tail_rigid_move

- Found bypass: false
- Status: complete
- Explored states: 2718
- Reason: no winning bypass found
