# Event Count Probe: RA_SCRATCH_BRIDGE_RELEASE_01_sticky_to_box_min2

- Event pattern: sticky_to_box
- Required minimum count: 2
- Budget: maxStates=300000, maxDepth=80

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

## Bypass Probe

- Found bypass below count: true
- Status: found
- Explored states: 21668
- Matched count: 1
- Depth: 16
- Inputs: down down right right up right up up left left down left right right down left
- Events: walk walk walk walk push_object:sticky#2 move_sticky_rigid sticky_merge:n1 walk walk walk push_object:sticky#1 force_chain:n2 move_sticky_rigid sticky_to_box:n2 push_object:crate#1 push_object:crate#3 push_object:crate#2 walk walk walk push_object:crate#3
