# Fixed Anchor Probe: RA_LEX_2026_07_08_PL_CHAIN_END_PULL_DUAL_POCKET_v1_pl_fixed_scan

- Fixed kind: push_pull
- Profile: default
- Budget: maxStates=300000, maxDepth=80
- Required groups: movable_box_sticky_shift, fixed_push_pull_effect, material_normalization
- Forbidden reachable events: anchor_boundary_shift:push_pull

## Layout

```text
##########
##PL.#####
###.G#####
#.@CC.G..#
###.....##
##########
```

## Combined Winning-Path Probe

- Found bypass: true
- Status: found
- Explored states: 41
- Depth: 16
- Missing groups: movable_box_sticky_shift, material_normalization
- Inputs: right down right right right up right down left left left left up up right up
- Events: push_object:crate#1 force_chain:n2 walk walk walk walk walk pull_object:crate#2 walk walk walk walk walk walk walk walk pull_object:crate#1

## Individual Winning-Path Probes

### movable_box_sticky_shift

- Found bypass: true
- Status: found
- Explored states: 30
- Depth: 16
- Missing groups: movable_box_sticky_shift
- Inputs: right down right right right up right down left left left left up up right up
- Events: push_object:crate#1 force_chain:n2 walk walk walk walk walk pull_object:crate#2 walk walk walk walk walk walk walk walk pull_object:crate#1

### fixed_push_pull_effect

- Found bypass: false
- Status: complete
- Explored states: 41
- Reason: no winning bypass found

### material_normalization

- Found bypass: true
- Status: found
- Explored states: 30
- Depth: 16
- Missing groups: material_normalization
- Inputs: right down right right right up right down left left left left up up right up
- Events: push_object:crate#1 force_chain:n2 walk walk walk walk walk pull_object:crate#2 walk walk walk walk walk walk walk walk pull_object:crate#1

## Reachable Event Scan

- Status: complete
- Reachable states: 30
- Legal transitions: 52
- Forbidden hits: none
- Event counts:
  - force_chain:n2: 1
  - pull_object:crate#1: 4
  - pull_object:crate#2: 2
  - push_object:crate#1: 3
  - walk: 43
