# Directional Event Probe: RA_CURR_2026_07_05_L05_LONG_EDGE_PL_v4_scratch2

- Budget: maxStates=300000, maxDepth=1000
- Required groups: anchor_pull_right, anchor_push_right, crate_pull, crate_push

## Layout

```text
########
#PL.G###
#.#..###
#.#C@G##
#......#
########
```

## Combined Probe

- Found bypass: true
- Status: found
- Explored states: 132
- Depth: 24
- Missing groups: crate_pull, crate_push
- Inputs: up up left right down down right down left left left left up up up right left down down down right right up right
- Events: walk walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk pull_object:crate#1 walk walk walk walk walk walk walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk walk walk walk walk push_object:crate#1

## Individual Probes

### anchor_pull_right

- Found bypass: false
- Status: complete
- Explored states: 463
- Reason: no winning bypass found

### anchor_push_right

- Found bypass: false
- Status: complete
- Explored states: 463
- Reason: no winning bypass found

### crate_pull

- Found bypass: true
- Status: found
- Explored states: 132
- Depth: 24
- Missing groups: crate_pull
- Inputs: up up left right down down right down left left left left up up up right left down down down right right up right
- Events: walk walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk pull_object:crate#1 walk walk walk walk walk walk walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk walk walk walk walk push_object:crate#1

### crate_push

- Found bypass: true
- Status: found
- Explored states: 132
- Depth: 24
- Missing groups: crate_push
- Inputs: up up left right down down right down left left left left up up up right left down down down right right up right
- Events: walk walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk pull_object:crate#1 walk walk walk walk walk walk walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk walk walk walk walk push_object:crate#1
