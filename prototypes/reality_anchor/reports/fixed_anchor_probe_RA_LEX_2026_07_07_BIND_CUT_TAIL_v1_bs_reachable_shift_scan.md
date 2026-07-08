# Fixed Anchor Probe: RA_LEX_2026_07_07_BIND_CUT_TAIL_v1_bs_reachable_shift_scan

- Fixed kind: box_sticky
- Profile: default
- Budget: maxStates=800000, maxDepth=80
- Required groups: movable_push_pull_shift, fixed_box_sticky_effect, pull_event
- Forbidden reachable events: anchor_boundary_shift:box_sticky

## Layout

```text
##########
#@.#G#...#
#.CC....G#
####....##
#...BS...#
##########
```

## Combined Winning-Path Probe

- Found bypass: true
- Status: found
- Explored states: 585
- Depth: 17
- Missing groups: movable_push_pull_shift, pull_event
- Inputs: down right right right down right right right up left down left left up right right right
- Events: walk push_object:crate#1 force_chain:n2 push_object:crate#1 force_chain:n2 box_to_sticky:n1 push_object:crate#1 force_chain:n2 move_sticky_rigid box_to_sticky:n1 sticky_merge:n1 walk walk walk walk walk push_object:sticky#1 move_sticky_rigid sticky_to_box:n1 walk walk walk push_object:crate#1 push_object:sticky#1 move_sticky_rigid push_object:sticky#1 move_sticky_rigid push_object:sticky#1 move_sticky_rigid

## Individual Winning-Path Probes

### movable_push_pull_shift

- Found bypass: true
- Status: found
- Explored states: 585
- Depth: 17
- Missing groups: movable_push_pull_shift
- Inputs: down right right right down right right right up left down left left up right right right
- Events: walk push_object:crate#1 force_chain:n2 push_object:crate#1 force_chain:n2 box_to_sticky:n1 push_object:crate#1 force_chain:n2 move_sticky_rigid box_to_sticky:n1 sticky_merge:n1 walk walk walk walk walk push_object:sticky#1 move_sticky_rigid sticky_to_box:n1 walk walk walk push_object:crate#1 push_object:sticky#1 move_sticky_rigid push_object:sticky#1 move_sticky_rigid push_object:sticky#1 move_sticky_rigid

### fixed_box_sticky_effect

- Found bypass: false
- Status: complete
- Explored states: 2732
- Reason: no winning bypass found

### pull_event

- Found bypass: true
- Status: found
- Explored states: 585
- Depth: 17
- Missing groups: pull_event
- Inputs: down right right right down right right right up left down left left up right right right
- Events: walk push_object:crate#1 force_chain:n2 push_object:crate#1 force_chain:n2 box_to_sticky:n1 push_object:crate#1 force_chain:n2 move_sticky_rigid box_to_sticky:n1 sticky_merge:n1 walk walk walk walk walk push_object:sticky#1 move_sticky_rigid sticky_to_box:n1 walk walk walk push_object:crate#1 push_object:sticky#1 move_sticky_rigid push_object:sticky#1 move_sticky_rigid push_object:sticky#1 move_sticky_rigid

## Reachable Event Scan

- Status: complete
- Reachable states: 2732
- Legal transitions: 7235
- Forbidden hits: anchor_boundary_shift:box_sticky
- Event counts:
  - anchor_boundary_shift:box_sticky: 99
  - box_to_sticky:n1: 27
  - box_to_sticky:n2: 2
  - force_chain:n2: 14
  - move_sticky_rigid: 204
  - push_object:box_sticky_anchor: 94
  - push_object:crate#1: 7
  - push_object:crate#2: 7
  - push_object:sticky#1: 117
  - push_object:sticky#2: 86
  - sticky_merge:n1: 11
  - sticky_to_box:n1: 12
  - walk: 6924
