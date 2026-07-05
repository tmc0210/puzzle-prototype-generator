# Trace: RA_CURR_L11_CARRY_CUT_TEMPLATE_I_bypass

- Inputs: up left up up up right right right down down right right down right up right up left left up left down left down right up up left left left down up right right down right right right down left
- Steps: 40

## Step 0: start

- legal: true
- win: false
- events: none

```text
###########
#.........#
#.........#
#..#......#
#.B#.G.C..#
#.S##MG...#
#.@########
###########
```

## Step 1: up

- legal: true
- win: false
- events: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1

```text
###########
#.........#
#.........#
#.B#......#
#.S#.G.M..#
#.@##MG...#
#..########
###########
```

## Step 2: left

- legal: true
- win: false
- events: walk

```text
###########
#.........#
#.........#
#.B#......#
#.S#.G.M..#
#@.##MG...#
#..########
###########
```

## Step 3: up

- legal: true
- win: false
- events: walk

```text
###########
#.........#
#.........#
#.B#......#
#@S#.G.M..#
#..##MG...#
#..########
###########
```

## Step 4: up

- legal: true
- win: false
- events: walk

```text
###########
#.........#
#.........#
#@B#......#
#.S#.G.M..#
#..##MG...#
#..########
###########
```

## Step 5: up

- legal: true
- win: false
- events: walk

```text
###########
#.........#
#@........#
#.B#......#
#.S#.G.M..#
#..##MG...#
#..########
###########
```

## Step 6: right

- legal: true
- win: false
- events: walk

```text
###########
#.........#
#.@.......#
#.B#......#
#.S#.G.M..#
#..##MG...#
#..########
###########
```

## Step 7: right

- legal: true
- win: false
- events: walk

```text
###########
#.........#
#..@......#
#.B#......#
#.S#.G.M..#
#..##MG...#
#..########
###########
```

## Step 8: right

- legal: true
- win: false
- events: walk

```text
###########
#.........#
#...@.....#
#.B#......#
#.S#.G.M..#
#..##MG...#
#..########
###########
```

## Step 9: down

- legal: true
- win: false
- events: walk

```text
###########
#.........#
#.........#
#.B#@.....#
#.S#.G.M..#
#..##MG...#
#..########
###########
```

## Step 10: down

- legal: true
- win: false
- events: walk

```text
###########
#.........#
#.........#
#.B#......#
#.S#@G.M..#
#..##MG...#
#..########
###########
```

## Step 11: right

- legal: true
- win: false
- events: walk

```text
###########
#.........#
#.........#
#.B#......#
#.S#.+.M..#
#..##MG...#
#..########
###########
```

## Step 12: right

- legal: true
- win: false
- events: walk

```text
###########
#.........#
#.........#
#.B#......#
#.S#.G@M..#
#..##MG...#
#..########
###########
```

## Step 13: down

- legal: true
- win: false
- events: walk

```text
###########
#.........#
#.........#
#.B#......#
#.S#.G.M..#
#..##M+...#
#..########
###########
```

## Step 14: right

- legal: true
- win: false
- events: walk

```text
###########
#.........#
#.........#
#.B#......#
#.S#.G.M..#
#..##MG@..#
#..########
###########
```

## Step 15: up

- legal: true
- win: false
- events: push_object:sticky#2 move_sticky_rigid sticky_to_box:n1

```text
###########
#.........#
#.........#
#.B#...C..#
#.S#.G.@..#
#..##MG...#
#..########
###########
```

## Step 16: right

- legal: true
- win: false
- events: walk

```text
###########
#.........#
#.........#
#.B#...C..#
#.S#.G..@.#
#..##MG...#
#..########
###########
```

## Step 17: up

- legal: true
- win: false
- events: walk

```text
###########
#.........#
#.........#
#.B#...C@.#
#.S#.G....#
#..##MG...#
#..########
###########
```

## Step 18: left

- legal: true
- win: false
- events: push_object:crate#1

```text
###########
#.........#
#.........#
#.B#..C@..#
#.S#.G....#
#..##MG...#
#..########
###########
```

## Step 19: left

- legal: true
- win: false
- events: push_object:crate#1

```text
###########
#.........#
#.........#
#.B#.C@...#
#.S#.G....#
#..##MG...#
#..########
###########
```

## Step 20: up

- legal: true
- win: false
- events: walk

```text
###########
#.........#
#.....@...#
#.B#.C....#
#.S#.G....#
#..##MG...#
#..########
###########
```

## Step 21: left

- legal: true
- win: false
- events: walk

```text
###########
#.........#
#....@....#
#.B#.C....#
#.S#.G....#
#..##MG...#
#..########
###########
```

## Step 22: down

- legal: true
- win: false
- events: push_object:crate#1 box_to_sticky:n1 sticky_merge:n1

```text
###########
#.........#
#.........#
#.B#.@....#
#.S#.m....#
#..##MG...#
#..########
###########
```

## Step 23: left

- legal: true
- win: false
- events: walk

```text
###########
#.........#
#.........#
#.B#@.....#
#.S#.m....#
#..##MG...#
#..########
###########
```

## Step 24: down

- legal: true
- win: false
- events: walk

```text
###########
#.........#
#.........#
#.B#......#
#.S#@m....#
#..##MG...#
#..########
###########
```

## Step 25: right

- legal: true
- win: false
- events: push_object:sticky#1 move_sticky_rigid

```text
###########
#.........#
#.........#
#.B#......#
#.S#.+M...#
#..##.m...#
#..########
###########
```

## Step 26: up

- legal: true
- win: false
- events: walk

```text
###########
#.........#
#.........#
#.B#.@....#
#.S#.GM...#
#..##.m...#
#..########
###########
```

## Step 27: up

- legal: true
- win: false
- events: walk

```text
###########
#.........#
#....@....#
#.B#......#
#.S#.GM...#
#..##.m...#
#..########
###########
```

## Step 28: left

- legal: true
- win: false
- events: walk

```text
###########
#.........#
#...@.....#
#.B#......#
#.S#.GM...#
#..##.m...#
#..########
###########
```

## Step 29: left

- legal: true
- win: false
- events: walk

```text
###########
#.........#
#..@......#
#.B#......#
#.S#.GM...#
#..##.m...#
#..########
###########
```

## Step 30: left

- legal: true
- win: false
- events: walk

```text
###########
#.........#
#.@.......#
#.B#......#
#.S#.GM...#
#..##.m...#
#..########
###########
```

## Step 31: down

- legal: true
- win: false
- events: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1

```text
###########
#.........#
#.........#
#.@#......#
#.B#.GC...#
#.S##.m...#
#..########
###########
```

## Step 32: up

- legal: true
- win: false
- events: walk

```text
###########
#.........#
#.@.......#
#..#......#
#.B#.GC...#
#.S##.m...#
#..########
###########
```

## Step 33: right

- legal: true
- win: false
- events: walk

```text
###########
#.........#
#..@......#
#..#......#
#.B#.GC...#
#.S##.m...#
#..########
###########
```

## Step 34: right

- legal: true
- win: false
- events: walk

```text
###########
#.........#
#...@.....#
#..#......#
#.B#.GC...#
#.S##.m...#
#..########
###########
```

## Step 35: down

- legal: true
- win: false
- events: walk

```text
###########
#.........#
#.........#
#..#@.....#
#.B#.GC...#
#.S##.m...#
#..########
###########
```

## Step 36: right

- legal: true
- win: false
- events: walk

```text
###########
#.........#
#.........#
#..#.@....#
#.B#.GC...#
#.S##.m...#
#..########
###########
```

## Step 37: right

- legal: true
- win: false
- events: walk

```text
###########
#.........#
#.........#
#..#..@...#
#.B#.GC...#
#.S##.m...#
#..########
###########
```

## Step 38: right

- legal: true
- win: false
- events: walk

```text
###########
#.........#
#.........#
#..#...@..#
#.B#.GC...#
#.S##.m...#
#..########
###########
```

## Step 39: down

- legal: true
- win: false
- events: walk

```text
###########
#.........#
#.........#
#..#......#
#.B#.GC@..#
#.S##.m...#
#..########
###########
```

## Step 40: left

- legal: true
- win: true
- events: push_object:crate#1

```text
###########
#.........#
#.........#
#..#......#
#.B#.*@...#
#.S##.m...#
#..########
###########
```
