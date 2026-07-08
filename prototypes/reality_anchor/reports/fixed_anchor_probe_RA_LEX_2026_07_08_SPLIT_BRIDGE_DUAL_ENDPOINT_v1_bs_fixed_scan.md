# Fixed Anchor Probe: RA_LEX_2026_07_08_SPLIT_BRIDGE_DUAL_ENDPOINT_v1_bs_fixed_scan

- Fixed kind: box_sticky
- Profile: default
- Budget: maxStates=300000, maxDepth=80
- Required groups: movable_push_pull_shift, fixed_box_sticky_effect, pull_event
- Forbidden reachable events: anchor_boundary_shift:box_sticky

## Layout

```text
########
####G###
###.MM@#
##G.M..#
###.MM##
####G###
###BS###
########
```

## Combined Winning-Path Probe

- Found bypass: true
- Status: found
- Explored states: 51
- Depth: 8
- Missing groups: movable_push_pull_shift, pull_event
- Inputs: down left left up down down up left
- Events: walk walk push_object:sticky#1 move_sticky_rigid sticky_to_box:n3 sticky_split:n1 push_object:sticky#1 move_sticky_rigid walk push_object:sticky#2 move_sticky_rigid walk push_object:crate#2

## Individual Winning-Path Probes

### movable_push_pull_shift

- Found bypass: true
- Status: found
- Explored states: 51
- Depth: 8
- Missing groups: movable_push_pull_shift
- Inputs: down left left up down down up left
- Events: walk walk push_object:sticky#1 move_sticky_rigid sticky_to_box:n3 sticky_split:n1 push_object:sticky#1 move_sticky_rigid walk push_object:sticky#2 move_sticky_rigid walk push_object:crate#2

### fixed_box_sticky_effect

- Found bypass: false
- Status: complete
- Explored states: 63
- Reason: no winning bypass found

### pull_event

- Found bypass: true
- Status: found
- Explored states: 51
- Depth: 8
- Missing groups: pull_event
- Inputs: down left left up down down up left
- Events: walk walk push_object:sticky#1 move_sticky_rigid sticky_to_box:n3 sticky_split:n1 push_object:sticky#1 move_sticky_rigid walk push_object:sticky#2 move_sticky_rigid walk push_object:crate#2

## Reachable Event Scan

- Status: complete
- Reachable states: 63
- Legal transitions: 154
- Forbidden hits: none
- Event counts:
  - move_sticky_rigid: 10
  - push_object:crate#2: 4
  - push_object:sticky#1: 6
  - push_object:sticky#2: 4
  - sticky_split:n1: 2
  - sticky_to_box:n3: 2
  - walk: 140
