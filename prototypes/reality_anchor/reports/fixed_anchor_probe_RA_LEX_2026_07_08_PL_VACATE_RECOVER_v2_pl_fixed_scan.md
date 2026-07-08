# Fixed Anchor Probe: RA_LEX_2026_07_08_PL_VACATE_RECOVER_v2_pl_fixed_scan

- Fixed kind: push_pull
- Profile: default
- Budget: maxStates=300000, maxDepth=80
- Required groups: movable_box_sticky_shift, fixed_push_pull_effect, material_normalization
- Forbidden reachable events: anchor_boundary_shift:push_pull

## Layout

```text
#########
##PL#..##
###..G.##
#.@CCG..#
#########
```

## Combined Winning-Path Probe

- Found bypass: true
- Status: found
- Explored states: 28
- Depth: 10
- Missing groups: movable_box_sticky_shift, material_normalization
- Inputs: right up right right up right down down left right
- Events: push_object:crate#1 force_chain:n2 walk walk walk pull_object:crate#2 walk walk walk walk pull_object:crate#2

## Individual Winning-Path Probes

### movable_box_sticky_shift

- Found bypass: true
- Status: found
- Explored states: 20
- Depth: 10
- Missing groups: movable_box_sticky_shift
- Inputs: right up right right up right down down left right
- Events: push_object:crate#1 force_chain:n2 walk walk walk pull_object:crate#2 walk walk walk walk pull_object:crate#2

### fixed_push_pull_effect

- Found bypass: false
- Status: complete
- Explored states: 32
- Reason: no winning bypass found

### material_normalization

- Found bypass: true
- Status: found
- Explored states: 20
- Depth: 10
- Missing groups: material_normalization
- Inputs: right up right right up right down down left right
- Events: push_object:crate#1 force_chain:n2 walk walk walk pull_object:crate#2 walk walk walk walk pull_object:crate#2

## Reachable Event Scan

- Status: complete
- Reachable states: 24
- Legal transitions: 40
- Forbidden hits: none
- Event counts:
  - force_chain:n2: 1
  - pull_object:crate#1: 1
  - pull_object:crate#2: 4
  - push_object:crate#1: 2
  - walk: 33
