# Fixed Anchor Probe: RA_CURR_2026_07_05_L13_FIXED_ORTHOGONAL_PULL_CONVERT_v2_fixedPL

- Fixed kind: push_pull
- Profile: default
- Budget: maxStates=300000, maxDepth=80
- Required groups: movable_box_sticky_shift, fixed_push_pull_effect, material_normalization
- Forbidden reachable events: anchor_boundary_shift:push_pull

## Layout

```text
###########
####BS#####
#P#......##
#L#.C.G..##
###..MG..##
###...@..##
###########
```

## Combined Winning-Path Probe

- Found bypass: true
- Status: found
- Explored states: 65
- Depth: 5
- Missing groups: movable_box_sticky_shift
- Inputs: up up left right right
- Events: walk walk walk pull_object:crate#1 box_to_sticky:n1 sticky_merge:n1 pull_object:sticky#1 move_sticky_rigid

## Individual Winning-Path Probes

### movable_box_sticky_shift

- Found bypass: true
- Status: found
- Explored states: 64
- Depth: 5
- Missing groups: movable_box_sticky_shift
- Inputs: up up left right right
- Events: walk walk walk pull_object:crate#1 box_to_sticky:n1 sticky_merge:n1 pull_object:sticky#1 move_sticky_rigid

### fixed_push_pull_effect

- Found bypass: false
- Status: complete
- Explored states: 1283
- Reason: no winning bypass found

### material_normalization

- Found bypass: false
- Status: complete
- Explored states: 1503
- Reason: no winning bypass found

## Reachable Event Scan

- Status: complete
- Reachable states: 1239
- Legal transitions: 3506
- Forbidden hits: none
- Event counts:
  - box_to_sticky:n1: 26
  - force_chain:n2: 1
  - move_sticky_rigid: 230
  - pull_object:crate#1: 48
  - pull_object:crate#2: 3
  - pull_object:sticky#1: 155
  - pull_object:sticky#2: 46
  - push_object:crate#1: 11
  - push_object:sticky#1: 24
  - push_object:sticky#2: 5
  - sticky_merge:n1: 33
  - sticky_to_box:n1: 22
  - sticky_to_box:n2: 4
  - walk: 3214
