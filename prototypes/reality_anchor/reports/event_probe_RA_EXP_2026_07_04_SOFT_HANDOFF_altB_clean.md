# Event Probe: RA_EXP_2026_07_04_SOFT_HANDOFF_altB_clean

- Budget: maxStates=300000, maxDepth=50
- Required groups: push_pull_anchor_shift, box_sticky_anchor_shift, pull_event, material_normalization

## Layout

```text
#######
##.@..#
#P..C.#
#LGB..#
#M#SG.#
#######
```

## Combined Probe

- Found bypass: true
- Status: found
- Explored states: 216
- Depth: 12
- Missing groups: push_pull_anchor_shift, material_normalization
- Inputs: right right down down left right up left left up left down
- Events: walk walk walk walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk push_object:crate#1 push_object:crate#1 walk walk push_object:crate#1

## Individual Probes

### push_pull_anchor_shift

- Found bypass: true
- Status: found
- Explored states: 167
- Depth: 12
- Missing groups: push_pull_anchor_shift
- Inputs: right right down down left right up left left up left down
- Events: walk walk walk walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk push_object:crate#1 push_object:crate#1 walk walk push_object:crate#1

### box_sticky_anchor_shift

- Found bypass: false
- Status: complete
- Explored states: 317
- Reason: no winning bypass found

### pull_event

- Found bypass: false
- Status: complete
- Explored states: 317
- Reason: no winning bypass found

### material_normalization

- Found bypass: true
- Status: found
- Explored states: 188
- Depth: 12
- Missing groups: material_normalization
- Inputs: right right down down left right up left left up left down
- Events: walk walk walk walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk push_object:crate#1 push_object:crate#1 walk walk push_object:crate#1
