# Trace: RA_CURR_2026_07_05_L11_BAR_HANDLE_SPLIT_v2

- Inputs: left left down right up right down left down down left down right up up up right down
- Steps: 18

## Step 0: start

- legal: true
- win: false
- events: none

```text
############
#......@##.#
#.....C.MM.#
#..##....G##
#..##..G####
#.....BS...#
############
```

## Step 1: left

- legal: true
- win: false
- events: walk

```text
############
#.....@.##.#
#.....C.MM.#
#..##....G##
#..##..G####
#.....BS...#
############
```

## Step 2: left

- legal: true
- win: false
- events: walk

```text
############
#....@..##.#
#.....C.MM.#
#..##....G##
#..##..G####
#.....BS...#
############
```

## Step 3: down

- legal: true
- win: false
- events: walk

```text
############
#.......##.#
#....@C.MM.#
#..##....G##
#..##..G####
#.....BS...#
############
```

## Step 4: right

- legal: true
- win: false
- events: push_object:crate#1 box_to_sticky:n1 sticky_merge:n1

```text
############
#.......##.#
#.....@MMM.#
#..##....G##
#..##..G####
#.....BS...#
############
```

## Step 5: up

- legal: true
- win: false
- events: walk

```text
############
#.....@.##.#
#......MMM.#
#..##....G##
#..##..G####
#.....BS...#
############
```

## Step 6: right

- legal: true
- win: false
- events: walk

```text
############
#......@##.#
#......MMM.#
#..##....G##
#..##..G####
#.....BS...#
############
```

## Step 7: down

- legal: true
- win: false
- events: push_object:sticky#1 move_sticky_rigid

```text
############
#.......##.#
#......@...#
#..##..MMm##
#..##..G####
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
#.....@....#
#..##..MMm##
#..##..G####
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
#..##.@MMm##
#..##..G####
#.....BS...#
############
```

## Step 10: down

- legal: true
- win: false
- events: walk

```text
############
#.......##.#
#..........#
#..##..MMm##
#..##.@G####
#.....BS...#
############
```

## Step 11: left

- legal: true
- win: false
- events: walk

```text
############
#.......##.#
#..........#
#..##..MMm##
#..##@.G####
#.....BS...#
############
```

## Step 12: down

- legal: true
- win: false
- events: walk

```text
############
#.......##.#
#..........#
#..##..MMm##
#..##..G####
#....@BS...#
############
```

## Step 13: right

- legal: true
- win: false
- events: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1

```text
############
#.......##.#
#..........#
#..##..CMm##
#..##..G####
#.....@BS..#
############
```

## Step 14: up

- legal: true
- win: false
- events: walk

```text
############
#.......##.#
#..........#
#..##..CMm##
#..##.@G####
#......BS..#
############
```

## Step 15: up

- legal: true
- win: false
- events: walk

```text
############
#.......##.#
#..........#
#..##.@CMm##
#..##..G####
#......BS..#
############
```

## Step 16: up

- legal: true
- win: false
- events: walk

```text
############
#.......##.#
#.....@....#
#..##..CMm##
#..##..G####
#......BS..#
############
```

## Step 17: right

- legal: true
- win: false
- events: walk

```text
############
#.......##.#
#......@...#
#..##..CMm##
#..##..G####
#......BS..#
############
```

## Step 18: down

- legal: true
- win: true
- events: push_object:crate#1

```text
############
#.......##.#
#..........#
#..##..@Mm##
#..##..*####
#......BS..#
############
```
