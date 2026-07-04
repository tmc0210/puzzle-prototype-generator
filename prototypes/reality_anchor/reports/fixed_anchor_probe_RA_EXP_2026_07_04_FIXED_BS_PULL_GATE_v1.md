# Fixed Anchor Probe: RA_EXP_2026_07_04_FIXED_BS_PULL_GATE_v1

- Fixed kind: box_sticky
- Budget: maxStates=300000, maxDepth=60
- Required groups: movable_push_pull_shift, fixed_box_sticky_effect, pull_event
- Forbidden reachable events: anchor_boundary_shift:box_sticky

## Layout

```text
########
####BS##
########
#C.P@..#
#.GL#M.#
#.#.G..#
########
```

## Combined Winning-Path Probe

- Found bypass: false
- Status: complete
- Explored states: 98
- Reason: no winning bypass found

## Individual Winning-Path Probes

### movable_push_pull_shift

- Found bypass: false
- Status: complete
- Explored states: 44
- Reason: no winning bypass found

### fixed_box_sticky_effect

- Found bypass: false
- Status: complete
- Explored states: 64
- Reason: no winning bypass found

### pull_event

- Found bypass: false
- Status: complete
- Explored states: 78
- Reason: no winning bypass found

## Reachable Event Scan

- Status: complete
- Reachable states: 44
- Legal transitions: 92
- Forbidden hits: none
- Event counts:
  - anchor_boundary_shift:push_pull: 2
  - box_to_sticky:n1: 1
  - move_sticky_rigid: 5
  - pull_object:crate#2: 1
  - pull_object:sticky#1: 3
  - push_object:push_pull_anchor: 2
  - push_object:sticky#1: 2
  - sticky_to_box:n1: 1
  - walk: 84
