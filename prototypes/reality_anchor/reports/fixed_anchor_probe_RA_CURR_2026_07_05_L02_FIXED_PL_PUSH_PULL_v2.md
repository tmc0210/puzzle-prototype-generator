# Fixed Anchor Probe: RA_CURR_2026_07_05_L02_FIXED_PL_PUSH_PULL_v2

- Fixed kind: push_pull
- Profile: default
- Budget: maxStates=300000, maxDepth=80
- Required groups: movable_box_sticky_shift, fixed_push_pull_effect, material_normalization
- Forbidden reachable events: anchor_boundary_shift:push_pull

## Layout

```text
########
#@CG####
#...#P##
###.#L##
#C.G.###
########
```

## Combined Winning-Path Probe

- Found bypass: true
- Status: found
- Explored states: 33
- Depth: 8
- Missing groups: movable_box_sticky_shift, material_normalization
- Inputs: right down right down down left right right
- Events: push_object:crate#1 walk walk walk walk walk pull_object:crate#2 pull_object:crate#2

## Individual Winning-Path Probes

### movable_box_sticky_shift

- Found bypass: true
- Status: found
- Explored states: 33
- Depth: 8
- Missing groups: movable_box_sticky_shift
- Inputs: right down right down down left right right
- Events: push_object:crate#1 walk walk walk walk walk pull_object:crate#2 pull_object:crate#2

### fixed_push_pull_effect

- Found bypass: false
- Status: complete
- Explored states: 51
- Reason: no winning bypass found

### material_normalization

- Found bypass: true
- Status: found
- Explored states: 33
- Depth: 8
- Missing groups: material_normalization
- Inputs: right down right down down left right right
- Events: push_object:crate#1 walk walk walk walk walk pull_object:crate#2 pull_object:crate#2

## Reachable Event Scan

- Status: complete
- Reachable states: 51
- Legal transitions: 99
- Forbidden hits: none
- Event counts:
  - pull_object:crate#2: 6
  - push_object:crate#1: 4
  - walk: 89
