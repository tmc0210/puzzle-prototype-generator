# Event Count Probe: RA_FRESH_2026_07_08_PULL_BRUSH_RETURN_v4_wall_trim_bs_shift_min4

- Event pattern: anchor_boundary_shift:box_sticky
- Required minimum count: 4
- Budget: maxStates=300000, maxDepth=300

## Layout

```text
#########
####P####
####L####
#...MM.G#
#@S.M...#
##B...G##
####...##
#########
```

## Bypass Probe

- Found bypass below count: true
- Status: found
- Explored states: 16319
- Matched count: 2
- Depth: 68
- Inputs: up right right down down right down right up down right up up left left up left left down left up right right right right down right up left left down down left up up right right down down up up left down left up right down up right down down right down left up up up right down left down left up left up right right right
- Events: walk walk walk walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:sticky#1 move_sticky_rigid sticky_to_box:n1 walk walk pull_object:sticky#1 force_chain:n2 move_sticky_rigid sticky_to_box:n2 pull_object:crate#3 walk walk walk walk pull_object:crate#1 box_to_sticky:n1 walk walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk walk walk walk walk pull_object:sticky#1 move_sticky_rigid walk walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:crate#1 walk walk push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid walk walk pull_object:crate#2 pull_object:crate#2 box_to_sticky:n1 walk walk pull_object:sticky#1 move_sticky_rigid walk walk push_object:sticky#1 force_chain:n2 move_sticky_rigid sticky_to_box:n1 pull_object:crate#1 box_to_sticky:n1 walk walk walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk push_object:sticky#1 move_sticky_rigid walk walk push_object:sticky#1 move_sticky_rigid push_object:sticky#1 move_sticky_rigid push_object:sticky#1 move_sticky_rigid sticky_merge:n1
