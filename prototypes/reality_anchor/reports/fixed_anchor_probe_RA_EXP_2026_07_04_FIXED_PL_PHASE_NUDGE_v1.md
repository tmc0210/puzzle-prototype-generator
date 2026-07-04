# Fixed Anchor Probe: RA_EXP_2026_07_04_FIXED_PL_PHASE_NUDGE_v1

- Fixed kind: push_pull
- Budget: maxStates=300000, maxDepth=60
- Required groups: movable_box_sticky_shift, fixed_push_pull_effect, material_normalization
- Forbidden reachable events: anchor_boundary_shift:push_pull

## Layout

```text
########
####PL##
########
#.#M..M#
#GC...G#
#@BS...#
########
```

## Combined Winning-Path Probe

- Found bypass: false
- Status: complete
- Explored states: 770
- Reason: no winning bypass found

## Individual Winning-Path Probes

### movable_box_sticky_shift

- Found bypass: false
- Status: complete
- Explored states: 620
- Reason: no winning bypass found

### fixed_push_pull_effect

- Found bypass: false
- Status: complete
- Explored states: 770
- Reason: no winning bypass found

### material_normalization

- Found bypass: false
- Status: complete
- Explored states: 620
- Reason: no winning bypass found

## Reachable Event Scan

- Status: complete
- Reachable states: 620
- Legal transitions: 1438
- Forbidden hits: none
- Event counts:
  - anchor_boundary_shift:box_sticky: 54
  - box_to_sticky:n1: 24
  - force_chain:n2: 4
  - move_sticky_rigid: 57
  - pull_object:box_sticky_anchor: 17
  - pull_object:sticky#1: 33
  - pull_object:sticky#2: 2
  - push_object:box_sticky_anchor: 36
  - push_object:crate#1: 8
  - push_object:crate#2: 34
  - push_object:crate#3: 17
  - push_object:sticky#1: 21
  - sticky_merge:n1: 18
  - sticky_to_box:n1: 23
  - sticky_to_box:n2: 8
  - walk: 1270
