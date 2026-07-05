# Event Probe: RA_CURR_L12_SCRATCHA

- Budget: maxStates=300000, maxDepth=80
- Required groups: pull_event, material_norm, sticky_rigid

## Layout

```text
###########
#P#....@###
#L##G#..###
####.##B###
####m##S###
####M######
###########
```

## Combined Probe

- Found bypass: true
- Status: found
- Explored states: 28
- Depth: 7
- Missing groups: material_norm
- Inputs: left left left down down up up
- Events: walk walk walk walk walk pull_object:sticky#1 move_sticky_rigid sticky_to_box:n1 pull_object:crate#1

## Individual Probes

### pull_event

- Found bypass: false
- Status: complete
- Explored states: 54
- Reason: no winning bypass found

### material_norm

- Found bypass: true
- Status: found
- Explored states: 20
- Depth: 7
- Missing groups: material_norm
- Inputs: left left left down down up up
- Events: walk walk walk walk walk pull_object:sticky#1 move_sticky_rigid sticky_to_box:n1 pull_object:crate#1

### sticky_rigid

- Found bypass: false
- Status: complete
- Explored states: 45
- Reason: no winning bypass found
