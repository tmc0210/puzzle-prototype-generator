# Directional Event Probe: RA_CURR_2026_07_05_L05_LONG_EDGE_PL_v2_no_gate_goal_direction_core

- Budget: maxStates=300000, maxDepth=1000
- Required groups: anchor_pull_right, anchor_push_right, crate_pull, crate_push

## Layout

```text
###########
#PL@G######
#.##.....##
#.#C.....##
#.CG#....##
#........##
###########
```

## Combined Probe

- Found bypass: true
- Status: found
- Explored states: 324
- Depth: 17
- Missing groups: crate_push
- Inputs: right down right down down down left left up down left left up up up up right
- Events: pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk walk walk walk walk walk pull_object:crate#1 walk walk walk walk walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull

## Individual Probes

### anchor_pull_right

- Found bypass: false
- Status: complete
- Explored states: 4331
- Reason: no winning bypass found

### anchor_push_right

- Found bypass: false
- Status: complete
- Explored states: 4331
- Reason: no winning bypass found

### crate_pull

- Found bypass: true
- Status: found
- Explored states: 330
- Depth: 17
- Missing groups: crate_pull
- Inputs: right down right down down down left left left left up right left up up up right
- Events: pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk walk walk walk walk walk walk walk push_object:crate#2 walk walk walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull

### crate_push

- Found bypass: true
- Status: found
- Explored states: 324
- Depth: 17
- Missing groups: crate_push
- Inputs: right down right down down down left left up down left left up up up up right
- Events: pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk walk walk walk walk walk pull_object:crate#1 walk walk walk walk walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull
