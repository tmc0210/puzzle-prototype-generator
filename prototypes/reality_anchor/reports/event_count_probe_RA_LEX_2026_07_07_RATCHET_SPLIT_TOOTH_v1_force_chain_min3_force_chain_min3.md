# Event Count Probe: RA_LEX_2026_07_07_RATCHET_SPLIT_TOOTH_v1_force_chain_min3

- Event pattern: force_chain
- Required minimum count: 3
- Budget: maxStates=300000, maxDepth=80

## Layout

```text
##########
###G##...#
##..MMLP@#
#...M....#
#...MM####
#.BS######
##########
```

## Bypass Probe

- Found bypass below count: true
- Status: found
- Explored states: 390
- Matched count: 2
- Depth: 21
- Inputs: up left down right down left left up left left right right down left up left right down down left up
- Events: walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid walk walk push_object:sticky#1 move_sticky_rigid sticky_to_box:n3 sticky_split:n1 pull_object:sticky#1 move_sticky_rigid walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull walk push_object:sticky#2 move_sticky_rigid walk walk walk walk push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid
