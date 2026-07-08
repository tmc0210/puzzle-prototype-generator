# Event Order Probe: RA_LEX_2026_07_07_RATCHET_SPLIT_BRIDGE_v1_no_endpoint_push_before_split

- Early pattern: move_sticky_rigid
- Must be preceded by: sticky_split
- Budget: maxStates=500000, maxDepth=80

## Layout

```text
##########
###G##...#
##G.MMLP@#
#...M....#
#...MM####
#.BS######
##########
```

## Order Violation Winning Probe

- Found violation win: true
- Status: found
- Explored states: 130
- Depth: 11
- Inputs: up left down right down left left left down left up
- Events: walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid sticky_to_box:n3 sticky_split:n1 walk walk push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid
