# P/L Direction Any Probe: RA_LEX_2026_07_06_RATCHET_HANDLE_v1_no_crate_goal_dir_any

- Budget: maxStates=500000, maxDepth=120
- Required groups: right_any, down_any

## Layout

```text
############
#.....######
#.@PL......#
#####.G..###
#######.C###
############
```

## Combined Probe

- Found bypass: true
- Status: found
- Explored states: 201
- Depth: 14
- Missing groups: right_any, down_any
- Inputs: up right right right down down right right right up left down left left
- Events: walk walk walk walk walk walk walk walk walk pull_object:crate#1 walk walk pull_object:crate#1 pull_object:crate#1

## Individual Probes

### right_any

- Found bypass: true
- Status: found
- Explored states: 201
- Depth: 14
- Missing groups: right_any
- Inputs: up right right right down down right right right up left down left left
- Events: walk walk walk walk walk walk walk walk walk pull_object:crate#1 walk walk pull_object:crate#1 pull_object:crate#1

### down_any

- Found bypass: true
- Status: found
- Explored states: 201
- Depth: 14
- Missing groups: down_any
- Inputs: up right right right down down right right right up left down left left
- Events: walk walk walk walk walk walk walk walk walk pull_object:crate#1 walk walk pull_object:crate#1 pull_object:crate#1
