# Fixed Anchor Probe: RA_CURR_2026_07_05_L03_FIXED_PL_HANDOFF_v2

- Fixed kind: push_pull
- Profile: default
- Budget: maxStates=300000, maxDepth=80
- Required groups: movable_box_sticky_shift, fixed_push_pull_effect, material_normalization
- Forbidden reachable events: anchor_boundary_shift:push_pull

## Layout

```text
#########
#########
#@C..#P##
#....#L##
#.##G####
#....####
#########
```

## Combined Winning-Path Probe

- Found bypass: true
- Status: found
- Explored states: 43
- Depth: 6
- Missing groups: movable_box_sticky_shift, material_normalization
- Inputs: right right down right down down
- Events: push_object:crate#1 push_object:crate#1 walk walk pull_object:crate#1 pull_object:crate#1

## Individual Winning-Path Probes

### movable_box_sticky_shift

- Found bypass: true
- Status: found
- Explored states: 43
- Depth: 6
- Missing groups: movable_box_sticky_shift
- Inputs: right right down right down down
- Events: push_object:crate#1 push_object:crate#1 walk walk pull_object:crate#1 pull_object:crate#1

### fixed_push_pull_effect

- Found bypass: false
- Status: complete
- Explored states: 130
- Reason: no winning bypass found

### material_normalization

- Found bypass: true
- Status: found
- Explored states: 43
- Depth: 6
- Missing groups: material_normalization
- Inputs: right right down right down down
- Events: push_object:crate#1 push_object:crate#1 walk walk pull_object:crate#1 pull_object:crate#1

## Reachable Event Scan

- Status: complete
- Reachable states: 130
- Legal transitions: 294
- Forbidden hits: none
- Event counts:
  - pull_object:crate#1: 10
  - push_object:crate#1: 6
  - walk: 278
