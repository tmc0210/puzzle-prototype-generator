# Event Probe: RA_CURR_2026_07_05_L05_LONG_EDGE_PL_v2_instance_core

- Budget: maxStates=300000, maxDepth=80
- Required groups: anchor_pull, anchor_push, gate_crate_pull, lower_crate_push

## Layout

```text
###########
#PL@G######
#.##.....##
#..CG....##
#.CG.....##
#........##
###########
```

## Combined Probe

- Found bypass: true
- Status: found
- Explored states: 3212
- Depth: 18
- Missing groups: lower_crate_push
- Inputs: right down down down left down left up left up up up right left down down right right
- Events: pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk walk pull_object:crate#1 walk push_object:crate#1 walk walk walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk push_object:crate#1 push_object:crate#1

## Individual Probes

### anchor_pull

- Found bypass: false
- Status: complete
- Explored states: 10351
- Reason: no winning bypass found

### anchor_push

- Found bypass: false
- Status: complete
- Explored states: 10351
- Reason: no winning bypass found

### gate_crate_pull

- Found bypass: true
- Status: found
- Explored states: 3536
- Depth: 20
- Missing groups: gate_crate_pull
- Inputs: right down down down down left left left up up up up right left down down down right up right
- Events: pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk walk walk walk walk walk walk walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk walk push_object:crate#2 walk push_object:crate#1

### lower_crate_push

- Found bypass: true
- Status: found
- Explored states: 2606
- Depth: 18
- Missing groups: lower_crate_push
- Inputs: right down down down left down left up left up up up right left down down right right
- Events: pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk walk pull_object:crate#1 walk push_object:crate#1 walk walk walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk push_object:crate#1 push_object:crate#1
