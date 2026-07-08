# Event Probe: RA_SCRATCH_BRIDGE_RELEASE_01_core4

- Budget: maxStates=300000, maxDepth=80
- Required groups: sticky_merge, sticky_cut, sticky_motion, force_chain

## Layout

```text
#########
#.G.M..##
#G@C...##
#.G.M..##
#.......#
###BS####
#########
```

## Combined Probe

- Found bypass: true
- Status: found
- Explored states: 28842
- Depth: 16
- Missing groups: force_chain
- Inputs: right down down right right up left left right up up left right down left left
- Events: push_object:crate#1 box_to_sticky:n1 sticky_merge:n1 walk walk walk walk walk push_object:sticky#1 move_sticky_rigid sticky_to_box:n3 push_object:crate#3 walk walk walk push_object:crate#1 walk walk push_object:crate#2 push_object:crate#2

## Individual Probes

### sticky_merge

- Found bypass: true
- Status: found
- Explored states: 27204
- Depth: 18
- Missing groups: sticky_merge
- Inputs: up right down right right up left left down right right down left left down left left up
- Events: walk walk push_object:crate#1 walk walk walk push_object:sticky#1 move_sticky_rigid sticky_to_box:n1 push_object:crate#1 walk walk walk walk push_object:sticky#1 force_chain:n2 move_sticky_rigid sticky_to_box:n1 push_object:crate#3 force_chain:n2 walk walk walk push_object:crate#2

### sticky_cut

- Found bypass: false
- Status: complete
- Explored states: 62618
- Reason: no winning bypass found

### sticky_motion

- Found bypass: false
- Status: complete
- Explored states: 50486
- Reason: no winning bypass found

### force_chain

- Found bypass: true
- Status: found
- Explored states: 23686
- Depth: 16
- Missing groups: force_chain
- Inputs: right down down right right up left left right up up left right down left left
- Events: push_object:crate#1 box_to_sticky:n1 sticky_merge:n1 walk walk walk walk walk push_object:sticky#1 move_sticky_rigid sticky_to_box:n3 push_object:crate#3 walk walk walk push_object:crate#1 walk walk push_object:crate#2 push_object:crate#2
