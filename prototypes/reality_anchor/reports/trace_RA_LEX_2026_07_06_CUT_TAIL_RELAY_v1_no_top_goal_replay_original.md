# Trace: RA_LEX_2026_07_06_CUT_TAIL_RELAY_v1_no_top_goal_replay_original

- Inputs: up left up right up right up up left down down down left down right right down right up left up up up right right
- Steps: 25

## Step 0: start

- legal: true
- win: false
- events: none

```text
#########
#.......#
#B#C....#
#S#..G.##
##.M.G.##
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
#B#C....#
#S#M.G.##
##.M.G.##
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
#B#C....#
#S#M.G.##
##.M.G.##
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
#B#C....#
#S#M.G.##
##@M.G.##
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
#B#C....#
#S#.MG.##
##.@MG.##
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
#B#C....#
#S#@MG.##
##..MG.##
##.....##
#......##
#########
```

## Step 6: right

- legal: true
- win: true
- events: push_object:sticky#1 move_sticky_rigid

```text
#########
#.......#
#B#C....#
#S#.@m.##
##...m.##
##.....##
#......##
#########
```

## Step 7: up

- legal: true
- win: true
- events: walk

```text
#########
#.......#
#B#C@...#
#S#..m.##
##...m.##
##.....##
#......##
#########
```

## Step 8: up

- legal: true
- win: true
- events: walk

```text
#########
#...@...#
#B#C....#
#S#..m.##
##...m.##
##.....##
#......##
#########
```

## Step 9: left

- legal: true
- win: true
- events: walk

```text
#########
#..@....#
#B#C....#
#S#..m.##
##...m.##
##.....##
#......##
#########
```

## Step 10: down

- legal: true
- win: true
- events: push_object:crate#1 box_to_sticky:n1

```text
#########
#.......#
#B#@....#
#S#M.m.##
##...m.##
##.....##
#......##
#########
```

## Step 11: down

- legal: true
- win: true
- events: push_object:sticky#1 move_sticky_rigid

```text
#########
#.......#
#B#.....#
#S#@.m.##
##.M.m.##
##.....##
#......##
#########
```

## Step 12: down

- legal: true
- win: true
- events: push_object:sticky#1 move_sticky_rigid

```text
#########
#.......#
#B#.....#
#S#..m.##
##.@.m.##
##.M...##
#......##
#########
```

## Step 13: left

- legal: true
- win: true
- events: walk

```text
#########
#.......#
#B#.....#
#S#..m.##
##@..m.##
##.M...##
#......##
#########
```

## Step 14: down

- legal: true
- win: true
- events: walk

```text
#########
#.......#
#B#.....#
#S#..m.##
##...m.##
##@M...##
#......##
#########
```

## Step 15: right

- legal: true
- win: true
- events: push_object:sticky#1 move_sticky_rigid

```text
#########
#.......#
#B#.....#
#S#..m.##
##...m.##
##.@M..##
#......##
#########
```

## Step 16: right

- legal: true
- win: true
- events: push_object:sticky#1 move_sticky_rigid sticky_merge:n1

```text
#########
#.......#
#B#.....#
#S#..m.##
##...m.##
##..@M.##
#......##
#########
```

## Step 17: down

- legal: true
- win: true
- events: walk

```text
#########
#.......#
#B#.....#
#S#..m.##
##...m.##
##...M.##
#...@..##
#########
```

## Step 18: right

- legal: true
- win: true
- events: walk

```text
#########
#.......#
#B#.....#
#S#..m.##
##...m.##
##...M.##
#....@.##
#########
```

## Step 19: up

- legal: true
- win: true
- events: push_object:sticky#1 move_sticky_rigid sticky_to_box:n1

```text
#########
#.......#
#B#..C..#
#S#..m.##
##...m.##
##...@.##
#......##
#########
```

## Step 20: left

- legal: true
- win: true
- events: walk

```text
#########
#.......#
#B#..C..#
#S#..m.##
##...m.##
##..@..##
#......##
#########
```

## Step 21: up

- legal: true
- win: true
- events: walk

```text
#########
#.......#
#B#..C..#
#S#..m.##
##..@m.##
##.....##
#......##
#########
```

## Step 22: up

- legal: true
- win: true
- events: walk

```text
#########
#.......#
#B#..C..#
#S#.@m.##
##...m.##
##.....##
#......##
#########
```

## Step 23: up

- legal: true
- win: true
- events: walk

```text
#########
#.......#
#B#.@C..#
#S#..m.##
##...m.##
##.....##
#......##
#########
```

## Step 24: right

- legal: true
- win: true
- events: push_object:crate#1

```text
#########
#.......#
#B#..@C.#
#S#..m.##
##...m.##
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
#B#...@C#
#S#..m.##
##...m.##
##.....##
#......##
#########
```
