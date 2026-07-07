# P/L Direction Any Probe: RA_LEX_2026_07_06_RATCHET_HANDLE_v1_no_anchor_goal_dir_any

- Budget: maxStates=500000, maxDepth=120
- Required groups: right_any, down_any

## Layout

```text
############
#.....######
#.@PL......#
#####...G###
#######.C###
############
```

## Combined Probe

- Found bypass: true
- Status: found
- Explored states: 107
- Depth: 8
- Missing groups: down_any
- Inputs: right right right down right right right up
- Events: push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk walk pull_object:crate#1

## Individual Probes

### right_any

- Found bypass: true
- Status: found
- Explored states: 134
- Depth: 10
- Missing groups: right_any
- Inputs: up right right right down down right right right up
- Events: walk walk walk walk walk walk walk walk walk pull_object:crate#1

### down_any

- Found bypass: true
- Status: found
- Explored states: 107
- Depth: 8
- Missing groups: down_any
- Inputs: right right right down right right right up
- Events: push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk walk pull_object:crate#1
