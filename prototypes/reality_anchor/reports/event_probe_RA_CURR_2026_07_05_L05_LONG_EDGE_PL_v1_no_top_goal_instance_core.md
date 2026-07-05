# Event Probe: RA_CURR_2026_07_05_L05_LONG_EDGE_PL_v1_no_top_goal_instance_core

- Budget: maxStates=300000, maxDepth=80
- Required groups: anchor_pull, anchor_push, left_crate_push, right_crate_pull

## Layout

```text
##########
#PL@.#####
#........#
#.CG#.CG.#
##########
```

## Combined Probe

- Found bypass: true
- Status: found
- Explored states: 156
- Depth: 13
- Missing groups: anchor_pull, anchor_push
- Inputs: down left left down right up right right right right right down right
- Events: walk walk walk walk push_object:crate#1 walk walk walk walk walk walk walk pull_object:crate#2

## Individual Probes

### anchor_pull

- Found bypass: true
- Status: found
- Explored states: 132
- Depth: 13
- Missing groups: anchor_pull
- Inputs: down left left down right up right right right right right down right
- Events: walk walk walk walk push_object:crate#1 walk walk walk walk walk walk walk pull_object:crate#2

### anchor_push

- Found bypass: true
- Status: found
- Explored states: 136
- Depth: 13
- Missing groups: anchor_push
- Inputs: down left left down right up right right right right right down right
- Events: walk walk walk walk push_object:crate#1 walk walk walk walk walk walk walk pull_object:crate#2

### left_crate_push

- Found bypass: false
- Status: complete
- Explored states: 333
- Reason: no winning bypass found

### right_crate_pull

- Found bypass: false
- Status: complete
- Explored states: 361
- Reason: no winning bypass found
