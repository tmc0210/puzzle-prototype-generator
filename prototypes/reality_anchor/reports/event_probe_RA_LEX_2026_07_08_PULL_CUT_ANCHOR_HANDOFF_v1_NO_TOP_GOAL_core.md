# Event Probe: RA_LEX_2026_07_08_PULL_CUT_ANCHOR_HANDOFF_v1_NO_TOP_GOAL_core

- Budget: maxStates=300000, maxDepth=80
- Required groups: push_pull_effect, box_sticky_anchor_shift, material_cut, sticky_rigid, force_chain

## Layout

```text
##########
#...#...##
#...MM@P##
#...G.#L##
###BS#####
##########
```

## Combined Probe

- Found bypass: true
- Status: found
- Explored states: 15
- Depth: 3
- Missing groups: push_pull_effect, box_sticky_anchor_shift, material_cut, force_chain
- Inputs: up left down
- Events: walk walk push_object:sticky#1 move_sticky_rigid

## Individual Probes

### push_pull_effect

- Found bypass: true
- Status: found
- Explored states: 15
- Depth: 3
- Missing groups: push_pull_effect
- Inputs: up left down
- Events: walk walk push_object:sticky#1 move_sticky_rigid

### box_sticky_anchor_shift

- Found bypass: true
- Status: found
- Explored states: 15
- Depth: 3
- Missing groups: box_sticky_anchor_shift
- Inputs: up left down
- Events: walk walk push_object:sticky#1 move_sticky_rigid

### material_cut

- Found bypass: true
- Status: found
- Explored states: 15
- Depth: 3
- Missing groups: material_cut
- Inputs: up left down
- Events: walk walk push_object:sticky#1 move_sticky_rigid

### sticky_rigid

- Found bypass: false
- Status: complete
- Explored states: 386
- Reason: no winning bypass found

### force_chain

- Found bypass: true
- Status: found
- Explored states: 15
- Depth: 3
- Missing groups: force_chain
- Inputs: up left down
- Events: walk walk push_object:sticky#1 move_sticky_rigid
