# Event Probe: RA_EXP_2026_07_04_FIXED_PL_SPLIT_LIFT_v1_core4

- Budget: maxStates=400000, maxDepth=100
- Required groups: box_sticky_anchor_shift, pull_event, sticky_to_box, sticky_rigid_move

## Layout

```text
###########
##.....@..#
#P#....B..#
#L#.G..S..#
####m#....#
####M#....#
###########
```

## Combined Probe

- Found bypass: true
- Status: found
- Explored states: 195
- Depth: 5
- Missing groups: pull_event, sticky_to_box, sticky_rigid_move
- Inputs: right down left left left
- Events: walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky push_object:box_sticky_anchor anchor_boundary_shift:box_sticky push_object:box_sticky_anchor anchor_boundary_shift:box_sticky

## Individual Probes

### box_sticky_anchor_shift

- Found bypass: true
- Status: found
- Explored states: 195
- Depth: 6
- Missing groups: box_sticky_anchor_shift
- Inputs: left down left down left up
- Events: walk walk walk walk walk pull_object:sticky#1 move_sticky_rigid

### pull_event

- Found bypass: true
- Status: found
- Explored states: 193
- Depth: 5
- Missing groups: pull_event
- Inputs: right down left left left
- Events: walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky push_object:box_sticky_anchor anchor_boundary_shift:box_sticky push_object:box_sticky_anchor anchor_boundary_shift:box_sticky

### sticky_to_box

- Found bypass: true
- Status: found
- Explored states: 172
- Depth: 5
- Missing groups: sticky_to_box
- Inputs: right down left left left
- Events: walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky push_object:box_sticky_anchor anchor_boundary_shift:box_sticky push_object:box_sticky_anchor anchor_boundary_shift:box_sticky

### sticky_rigid_move

- Found bypass: true
- Status: found
- Explored states: 153
- Depth: 5
- Missing groups: sticky_rigid_move
- Inputs: right down left left left
- Events: walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky push_object:box_sticky_anchor anchor_boundary_shift:box_sticky push_object:box_sticky_anchor anchor_boundary_shift:box_sticky
