# Fixed Anchor Probe: RA_LEX_2026_07_07_BIND_CUT_TAIL_v2_anchor_pockets_pruned_bs_fixed_scan

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
####BS####
##########
```

## Combined Winning-Path Probe

- Found bypass: true
- Status: found
- Explored states: 206
- Depth: 17
- Missing groups: movable_push_pull_shift, pull_event
- Inputs: down right right right down right right right up left down left left up right right right
- Events: walk push_object:crate#1 force_chain:n2 push_object:crate#1 force_chain:n2 box_to_sticky:n1 push_object:crate#1 force_chain:n2 move_sticky_rigid box_to_sticky:n1 sticky_merge:n1 walk walk walk walk walk push_object:sticky#1 move_sticky_rigid sticky_to_box:n1 walk walk walk push_object:crate#1 push_object:sticky#1 move_sticky_rigid push_object:sticky#1 move_sticky_rigid push_object:sticky#1 move_sticky_rigid

## Individual Winning-Path Probes

### movable_push_pull_shift

- Found bypass: true
- Status: found
- Explored states: 206
- Depth: 17
- Missing groups: movable_push_pull_shift
- Inputs: down right right right down right right right up left down left left up right right right
- Events: walk push_object:crate#1 force_chain:n2 push_object:crate#1 force_chain:n2 box_to_sticky:n1 push_object:crate#1 force_chain:n2 move_sticky_rigid box_to_sticky:n1 sticky_merge:n1 walk walk walk walk walk push_object:sticky#1 move_sticky_rigid sticky_to_box:n1 walk walk walk push_object:crate#1 push_object:sticky#1 move_sticky_rigid push_object:sticky#1 move_sticky_rigid push_object:sticky#1 move_sticky_rigid

### fixed_box_sticky_effect

- Found bypass: false
- Status: complete
- Explored states: 412
- Reason: no winning bypass found

### pull_event

- Found bypass: true
- Status: found
- Explored states: 206
- Depth: 17
- Missing groups: pull_event
- Inputs: down right right right down right right right up left down left left up right right right
- Events: walk push_object:crate#1 force_chain:n2 push_object:crate#1 force_chain:n2 box_to_sticky:n1 push_object:crate#1 force_chain:n2 move_sticky_rigid box_to_sticky:n1 sticky_merge:n1 walk walk walk walk walk push_object:sticky#1 move_sticky_rigid sticky_to_box:n1 walk walk walk push_object:crate#1 push_object:sticky#1 move_sticky_rigid push_object:sticky#1 move_sticky_rigid push_object:sticky#1 move_sticky_rigid

## Reachable Event Scan

- Status: complete
- Reachable states: 412
- Legal transitions: 1022
- Forbidden hits: none
- Event counts:
  - box_to_sticky:n1: 2
  - force_chain:n2: 6
  - move_sticky_rigid: 27
  - push_object:crate#1: 4
  - push_object:crate#2: 6
  - push_object:sticky#1: 26
  - sticky_merge:n1: 1
  - sticky_to_box:n1: 5
  - walk: 986
