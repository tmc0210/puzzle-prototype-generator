# Event Count Probe: RA_LEX_2026_07_08_PULL_BRUSH_CM_TAIL_v1_bs_shift_min3

- Event pattern: anchor_boundary_shift:box_sticky
- Required minimum count: 3
- Budget: maxStates=500000, maxDepth=80

## Layout

```text
############
#PL#......##
####.GMMG.##
###BS@...###
############
```

## Bypass Probe

- Found bypass below count: true
- Status: found
- Explored states: 168
- Matched count: 2
- Depth: 20
- Inputs: up up right right right down right up left left left down down left right up up left down up
- Events: walk walk walk walk walk walk pull_object:sticky#1 move_sticky_rigid walk walk walk walk walk walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky
