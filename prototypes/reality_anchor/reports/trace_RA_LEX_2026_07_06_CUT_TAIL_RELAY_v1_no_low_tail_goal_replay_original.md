# Trace: RA_LEX_2026_07_06_CUT_TAIL_RELAY_v1_no_low_tail_goal_replay_original

- Inputs: up left up right up right up up left down down down left down right right down right up left up up up right right
- Steps: 25

## Step 0: start

- legal: true
- win: false
- events: none

```text
#########
#.......#
#B#C...G#
#S#..G.##
##.M...##
##.M...##
#..@...##
#########
```

## Step 1: up

- legal: true
- win: false
- events: push_object:sticky#1 move_sticky_rigid

```text
#########
#.......#
#B#C...G#
#S#M.G.##
##.M...##
##.@...##
#......##
#########
```

## Step 2: left

- legal: true
- win: false
- events: walk

```text
#########
#.......#
#B#C...G#
#S#M.G.##
##.M...##
##@....##
#......##
#########
```

## Step 3: up

- legal: true
- win: false
- events: walk

```text
#########
#.......#
#B#C...G#
#S#M.G.##
##@M...##
##.....##
#......##
#########
```

## Step 4: right

- legal: true
- win: false
- events: push_object:sticky#1 move_sticky_rigid

```text
#########
#.......#
#B#C...G#
#S#.MG.##
##.@M..##
##.....##
#......##
#########
```

## Step 5: up

- legal: true
- win: false
- events: walk

```text
#########
#.......#
#B#C...G#
#S#@MG.##
##..M..##
##.....##
#......##
#########
```

## Step 6: right

- legal: true
- win: false
- events: push_object:sticky#1 move_sticky_rigid

```text
#########
#.......#
#B#C...G#
#S#.@m.##
##...M.##
##.....##
#......##
#########
```

## Step 7: up

- legal: true
- win: false
- events: walk

```text
#########
#.......#
#B#C@..G#
#S#..m.##
##...M.##
##.....##
#......##
#########
```

## Step 8: up

- legal: true
- win: false
- events: walk

```text
#########
#...@...#
#B#C...G#
#S#..m.##
##...M.##
##.....##
#......##
#########
```

## Step 9: left

- legal: true
- win: false
- events: walk

```text
#########
#..@....#
#B#C...G#
#S#..m.##
##...M.##
##.....##
#......##
#########
```

## Step 10: down

- legal: true
- win: false
- events: push_object:crate#1 box_to_sticky:n1

```text
#########
#.......#
#B#@...G#
#S#M.m.##
##...M.##
##.....##
#......##
#########
```

## Step 11: down

- legal: true
- win: false
- events: push_object:sticky#1 move_sticky_rigid

```text
#########
#.......#
#B#....G#
#S#@.m.##
##.M.M.##
##.....##
#......##
#########
```

## Step 12: down

- legal: true
- win: false
- events: push_object:sticky#1 move_sticky_rigid

```text
#########
#.......#
#B#....G#
#S#..m.##
##.@.M.##
##.M...##
#......##
#########
```

## Step 13: left

- legal: true
- win: false
- events: walk

```text
#########
#.......#
#B#....G#
#S#..m.##
##@..M.##
##.M...##
#......##
#########
```

## Step 14: down

- legal: true
- win: false
- events: walk

```text
#########
#.......#
#B#....G#
#S#..m.##
##...M.##
##@M...##
#......##
#########
```

## Step 15: right

- legal: true
- win: false
- events: push_object:sticky#1 move_sticky_rigid

```text
#########
#.......#
#B#....G#
#S#..m.##
##...M.##
##.@M..##
#......##
#########
```

## Step 16: right

- legal: true
- win: false
- events: push_object:sticky#1 move_sticky_rigid sticky_merge:n1

```text
#########
#.......#
#B#....G#
#S#..m.##
##...M.##
##..@M.##
#......##
#########
```

## Step 17: down

- legal: true
- win: false
- events: walk

```text
#########
#.......#
#B#....G#
#S#..m.##
##...M.##
##...M.##
#...@..##
#########
```

## Step 18: right

- legal: true
- win: false
- events: walk

```text
#########
#.......#
#B#....G#
#S#..m.##
##...M.##
##...M.##
#....@.##
#########
```

## Step 19: up

- legal: true
- win: false
- events: push_object:sticky#1 move_sticky_rigid sticky_to_box:n1

```text
#########
#.......#
#B#..C.G#
#S#..m.##
##...M.##
##...@.##
#......##
#########
```

## Step 20: left

- legal: true
- win: false
- events: walk

```text
#########
#.......#
#B#..C.G#
#S#..m.##
##...M.##
##..@..##
#......##
#########
```

## Step 21: up

- legal: true
- win: false
- events: walk

```text
#########
#.......#
#B#..C.G#
#S#..m.##
##..@M.##
##.....##
#......##
#########
```

## Step 22: up

- legal: true
- win: false
- events: walk

```text
#########
#.......#
#B#..C.G#
#S#.@m.##
##...M.##
##.....##
#......##
#########
```

## Step 23: up

- legal: true
- win: false
- events: walk

```text
#########
#.......#
#B#.@C.G#
#S#..m.##
##...M.##
##.....##
#......##
#########
```

## Step 24: right

- legal: true
- win: false
- events: push_object:crate#1

```text
#########
#.......#
#B#..@CG#
#S#..m.##
##...M.##
##.....##
#......##
#########
```

## Step 25: right

- legal: true
- win: true
- events: push_object:crate#1

```text
#########
#.......#
#B#...@*#
#S#..m.##
##...M.##
##.....##
#......##
#########
```
