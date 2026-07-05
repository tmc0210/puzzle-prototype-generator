# Directional Event Probe: RA_CURR_2026_07_05_L06_MULTI_AXIS_PL_v1_direction_core

- Budget: maxStates=300000, maxDepth=90
- Direction predicates:
  - anchor_pull_down: pull_object:push_pull_anchor and P cell delta dx=0, dy=+1
  - anchor_pull_right: pull_object:push_pull_anchor and P cell delta dx=+1, dy=0
  - anchor_push_right: push_object:push_pull_anchor and P cell delta dx=+1, dy=0
  - left_crate_push: push_object:crate#1
  - right_crate_pull: pull_object:crate#2
- Required groups: anchor_pull_down, anchor_pull_right, anchor_push_right, left_crate_push, right_crate_pull

## Layout

```text
##########
#PL@.#####
#..GG#...#
#.CG#.CG.#
#........#
##########
```

## Combined Probe

- Found bypass: false
- Status: complete
- Explored states: 16504
- Reason: no winning bypass found

## Individual Probes

### anchor_pull_down

- Found bypass: false
- Status: complete
- Explored states: 10025
- Reason: no winning bypass found

### anchor_pull_right

- Found bypass: false
- Status: complete
- Explored states: 9028
- Reason: no winning bypass found

### anchor_push_right

- Found bypass: false
- Status: complete
- Explored states: 9755
- Reason: no winning bypass found

### left_crate_push

- Found bypass: false
- Status: complete
- Explored states: 10061
- Reason: no winning bypass found

### right_crate_pull

- Found bypass: false
- Status: complete
- Explored states: 13180
- Reason: no winning bypass found
