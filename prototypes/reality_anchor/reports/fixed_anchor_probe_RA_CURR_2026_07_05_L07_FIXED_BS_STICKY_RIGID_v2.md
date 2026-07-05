# Fixed Anchor Probe: RA_CURR_2026_07_05_L07_FIXED_BS_STICKY_RIGID_v2

- Fixed kind: box_sticky
- Profile: default
- Budget: maxStates=300000, maxDepth=20
- Required groups: movable_push_pull_shift, fixed_box_sticky_effect, pull_event
- Forbidden reachable events: anchor_boundary_shift:box_sticky

## Layout

```text
#######
#B#####
#S#####
#@M...#
###MG.#
#######
```

## Combined Winning-Path Probe

- Found bypass: true
- Status: found
- Explored states: 4
- Depth: 2
- Missing groups: movable_push_pull_shift, fixed_box_sticky_effect, pull_event
- Inputs: right right
- Events: push_object:sticky#1 move_sticky_rigid sticky_merge:n1 push_object:sticky#1 move_sticky_rigid

## Individual Winning-Path Probes

### movable_push_pull_shift

- Found bypass: true
- Status: found
- Explored states: 4
- Depth: 2
- Missing groups: movable_push_pull_shift
- Inputs: right right
- Events: push_object:sticky#1 move_sticky_rigid sticky_merge:n1 push_object:sticky#1 move_sticky_rigid

### fixed_box_sticky_effect

- Found bypass: true
- Status: found
- Explored states: 4
- Depth: 2
- Missing groups: fixed_box_sticky_effect
- Inputs: right right
- Events: push_object:sticky#1 move_sticky_rigid sticky_merge:n1 push_object:sticky#1 move_sticky_rigid

### pull_event

- Found bypass: true
- Status: found
- Explored states: 4
- Depth: 2
- Missing groups: pull_event
- Inputs: right right
- Events: push_object:sticky#1 move_sticky_rigid sticky_merge:n1 push_object:sticky#1 move_sticky_rigid

## Reachable Event Scan

- Status: complete
- Reachable states: 13
- Legal transitions: 24
- Forbidden hits: none
- Event counts:
  - move_sticky_rigid: 4
  - push_object:sticky#1: 4
  - sticky_merge:n1: 1
  - walk: 20
