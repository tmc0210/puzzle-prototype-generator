# Trace: RA_CURR_2026_07_05_L11_BAR_DOUBLE_CUT_v2_prune_no_upper_expected_trace

- Inputs: right up right down left down down left down right right up up up right down
- Steps: 16

## Step 0: start

- legal: true
- win: false
- events: none

```text
############
#.......##.#
#....@C.MM.#
#..##....G##
#..##...G###
#.....BS...#
############
```

## Step 1: right

- legal: true
- win: false
- events: push_object:crate#1 box_to_sticky:n1 sticky_merge:n1

```text
############
#.......##.#
#.....@MMM.#
#..##....G##
#..##...G###
#.....BS...#
############
```

## Step 2: up

- legal: true
- win: false
- events: walk

```text
############
#.....@.##.#
#......MMM.#
#..##....G##
#..##...G###
#.....BS...#
############
```

## Step 3: right

- legal: true
- win: false
- events: walk

```text
############
#......@##.#
#......MMM.#
#..##....G##
#..##...G###
#.....BS...#
############
```

## Step 4: down

- legal: true
- win: false
- events: push_object:sticky#1 move_sticky_rigid

```text
############
#.......##.#
#......@...#
#..##..MMm##
#..##...G###
#.....BS...#
############
```

## Step 5: left

- legal: true
- win: false
- events: walk

```text
############
#.......##.#
#.....@....#
#..##..MMm##
#..##...G###
#.....BS...#
############
```

## Step 6: down

- legal: true
- win: false
- events: walk

```text
############
#.......##.#
#..........#
#..##.@MMm##
#..##...G###
#.....BS...#
############
```

## Step 7: down

- legal: true
- win: false
- events: walk

```text
############
#.......##.#
#..........#
#..##..MMm##
#..##.@.G###
#.....BS...#
############
```

## Step 8: left

- legal: true
- win: false
- events: walk

```text
############
#.......##.#
#..........#
#..##..MMm##
#..##@..G###
#.....BS...#
############
```

## Step 9: down

- legal: true
- win: false
- events: walk

```text
############
#.......##.#
#..........#
#..##..MMm##
#..##...G###
#....@BS...#
############
```

## Step 10: right

- legal: true
- win: false
- events: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1

```text
############
#.......##.#
#..........#
#..##..CMm##
#..##...G###
#.....@BS..#
############
```

## Step 11: right

- legal: true
- win: false
- events: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1

```text
############
#.......##.#
#..........#
#..##..CCm##
#..##...G###
#......@BS.#
############
```

## Step 12: up

- legal: true
- win: false
- events: walk

```text
############
#.......##.#
#..........#
#..##..CCm##
#..##..@G###
#.......BS.#
############
```

## Step 13: up

- legal: true
- win: false
- events: push_object:crate#1

```text
############
#.......##.#
#......C...#
#..##..@Cm##
#..##...G###
#.......BS.#
############
```

## Step 14: up

- legal: true
- win: false
- events: push_object:crate#1

```text
############
#......C##.#
#......@...#
#..##...Cm##
#..##...G###
#.......BS.#
############
```

## Step 15: right

- legal: true
- win: false
- events: walk

```text
############
#......C##.#
#.......@..#
#..##...Cm##
#..##...G###
#.......BS.#
############
```

## Step 16: down

- legal: true
- win: true
- events: push_object:crate#2

```text
############
#......C##.#
#..........#
#..##...@m##
#..##...*###
#.......BS.#
############
```
