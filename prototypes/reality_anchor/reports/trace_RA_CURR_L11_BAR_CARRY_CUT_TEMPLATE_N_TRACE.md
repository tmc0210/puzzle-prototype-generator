# Trace: RA_CURR_L11_BAR_CARRY_CUT_TEMPLATE_N_TRACE

- Inputs: left left left up up left left up up right down left down down left down right up up up right down
- Steps: 22

## Step 0: start

- legal: true
- win: false
- events: none

```text
###########
#.........#
#....##...#
#...CCC#..#
#....GG#..#
#...G..#..#
#.....BS@.#
###########
```

## Step 1: left

- legal: true
- win: false
- events: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1

```text
###########
#.........#
#....##...#
#...CCM#..#
#....GG#..#
#...G..#..#
#....BS@..#
###########
```

## Step 2: left

- legal: true
- win: false
- events: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 sticky_merge:n1

```text
###########
#.........#
#....##...#
#...CMM#..#
#....GG#..#
#...G..#..#
#...BS@...#
###########
```

## Step 3: left

- legal: true
- win: false
- events: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 sticky_merge:n1

```text
###########
#.........#
#....##...#
#...MMM#..#
#....GG#..#
#...G..#..#
#..BS@....#
###########
```

## Step 4: up

- legal: true
- win: false
- events: walk

```text
###########
#.........#
#....##...#
#...MMM#..#
#....GG#..#
#...G@.#..#
#..BS.....#
###########
```

## Step 5: up

- legal: true
- win: false
- events: walk

```text
###########
#.........#
#....##...#
#...MMM#..#
#....+G#..#
#...G..#..#
#..BS.....#
###########
```

## Step 6: left

- legal: true
- win: false
- events: walk

```text
###########
#.........#
#....##...#
#...MMM#..#
#...@GG#..#
#...G..#..#
#..BS.....#
###########
```

## Step 7: left

- legal: true
- win: false
- events: walk

```text
###########
#.........#
#....##...#
#...MMM#..#
#..@.GG#..#
#...G..#..#
#..BS.....#
###########
```

## Step 8: up

- legal: true
- win: false
- events: walk

```text
###########
#.........#
#....##...#
#..@MMM#..#
#....GG#..#
#...G..#..#
#..BS.....#
###########
```

## Step 9: up

- legal: true
- win: false
- events: walk

```text
###########
#.........#
#..@.##...#
#...MMM#..#
#....GG#..#
#...G..#..#
#..BS.....#
###########
```

## Step 10: right

- legal: true
- win: false
- events: walk

```text
###########
#.........#
#...@##...#
#...MMM#..#
#....GG#..#
#...G..#..#
#..BS.....#
###########
```

## Step 11: down

- legal: true
- win: false
- events: push_object:sticky#1 move_sticky_rigid

```text
###########
#.........#
#....##...#
#...@..#..#
#...Mmm#..#
#...G..#..#
#..BS.....#
###########
```

## Step 12: left

- legal: true
- win: false
- events: walk

```text
###########
#.........#
#....##...#
#..@...#..#
#...Mmm#..#
#...G..#..#
#..BS.....#
###########
```

## Step 13: down

- legal: true
- win: false
- events: walk

```text
###########
#.........#
#....##...#
#......#..#
#..@Mmm#..#
#...G..#..#
#..BS.....#
###########
```

## Step 14: down

- legal: true
- win: false
- events: walk

```text
###########
#.........#
#....##...#
#......#..#
#...Mmm#..#
#..@G..#..#
#..BS.....#
###########
```

## Step 15: left

- legal: true
- win: false
- events: walk

```text
###########
#.........#
#....##...#
#......#..#
#...Mmm#..#
#.@.G..#..#
#..BS.....#
###########
```

## Step 16: down

- legal: true
- win: false
- events: walk

```text
###########
#.........#
#....##...#
#......#..#
#...Mmm#..#
#...G..#..#
#.@BS.....#
###########
```

## Step 17: right

- legal: true
- win: false
- events: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1

```text
###########
#.........#
#....##...#
#......#..#
#...Cmm#..#
#...G..#..#
#..@BS....#
###########
```

## Step 18: up

- legal: true
- win: false
- events: walk

```text
###########
#.........#
#....##...#
#......#..#
#...Cmm#..#
#..@G..#..#
#...BS....#
###########
```

## Step 19: up

- legal: true
- win: false
- events: walk

```text
###########
#.........#
#....##...#
#......#..#
#..@Cmm#..#
#...G..#..#
#...BS....#
###########
```

## Step 20: up

- legal: true
- win: false
- events: walk

```text
###########
#.........#
#....##...#
#..@...#..#
#...Cmm#..#
#...G..#..#
#...BS....#
###########
```

## Step 21: right

- legal: true
- win: false
- events: walk

```text
###########
#.........#
#....##...#
#...@..#..#
#...Cmm#..#
#...G..#..#
#...BS....#
###########
```

## Step 22: down

- legal: true
- win: true
- events: push_object:crate#1

```text
###########
#.........#
#....##...#
#......#..#
#...@mm#..#
#...*..#..#
#...BS....#
###########
```
