# Directional Event Probe: RA_CURR_2026_07_05_L05_LONG_EDGE_PL_v4_scratch1

- Budget: maxStates=300000, maxDepth=1000
- Required groups: anchor_pull_right, anchor_push_right, crate_pull, crate_push

## Layout

```text
########
#PL..G##
#.#..###
#.#C@.##
#......#
########
```

## Combined Probe

- Found bypass: true
- Status: found
- Explored states: 97
- Depth: 15
- Missing groups: crate_pull, crate_push
- Inputs: up up left right down down down left left left up up up right right
- Events: walk walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk walk walk walk walk walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull

## Individual Probes

### anchor_pull_right

- Found bypass: false
- Status: complete
- Explored states: 696
- Reason: no winning bypass found

### anchor_push_right

- Found bypass: false
- Status: complete
- Explored states: 696
- Reason: no winning bypass found

### crate_pull

- Found bypass: true
- Status: found
- Explored states: 97
- Depth: 15
- Missing groups: crate_pull
- Inputs: up up left right down down down left left left up up up right right
- Events: walk walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk walk walk walk walk walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull

### crate_push

- Found bypass: true
- Status: found
- Explored states: 97
- Depth: 15
- Missing groups: crate_push
- Inputs: up up left right down down down left left left up up up right right
- Events: walk walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk walk walk walk walk walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull
