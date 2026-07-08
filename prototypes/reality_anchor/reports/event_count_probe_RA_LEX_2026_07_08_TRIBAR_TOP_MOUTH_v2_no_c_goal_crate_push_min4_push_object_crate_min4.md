# Event Count Probe: RA_LEX_2026_07_08_TRIBAR_TOP_MOUTH_v2_no_c_goal_crate_push_min4

- Event pattern: push_object:crate
- Required minimum count: 4
- Budget: maxStates=300000, maxDepth=80

## Layout

```text
###########
#@.#.G.####
#.CCC....##
####.....##
####BS#####
###########
```

## Bypass Probe

- Found bypass below count: true
- Status: found
- Explored states: 99
- Matched count: 0
- Depth: 14
- Inputs: down right right right down right right right right up left down left up
- Events: walk push_object:crate#1 force_chain:n3 box_to_sticky:n1 push_object:crate#1 force_chain:n3 move_sticky_rigid box_to_sticky:n1 sticky_merge:n1 push_object:crate#1 force_chain:n2 move_sticky_rigid box_to_sticky:n1 sticky_merge:n1 walk walk walk walk walk walk push_object:sticky#1 move_sticky_rigid sticky_to_box:n1 walk walk push_object:sticky#1 move_sticky_rigid
