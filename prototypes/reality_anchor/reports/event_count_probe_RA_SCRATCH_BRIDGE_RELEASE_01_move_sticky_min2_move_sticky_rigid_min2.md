# Event Count Probe: RA_SCRATCH_BRIDGE_RELEASE_01_move_sticky_min2

- Event pattern: move_sticky_rigid
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
- Explored states: 22746
- Matched count: 1
- Depth: 16
- Inputs: right down down right right up left left right up up left right down left left
- Events: push_object:crate#1 box_to_sticky:n1 sticky_merge:n1 walk walk walk walk walk push_object:sticky#1 move_sticky_rigid sticky_to_box:n3 push_object:crate#3 walk walk walk push_object:crate#1 walk walk push_object:crate#2 push_object:crate#2
