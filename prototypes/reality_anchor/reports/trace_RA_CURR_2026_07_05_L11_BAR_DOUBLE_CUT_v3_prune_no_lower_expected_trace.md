# Trace: RA_CURR_2026_07_05_L11_BAR_DOUBLE_CUT_v3_prune_no_lower_expected_trace

- Inputs: right up right down left down down left down right right up up up right down
- Steps: 16

## Step 0: start

- legal: true
- win: false
- events: none

```text
############
#......G##.#
#....@C.MM.#
#..##.....##
#..##....###
#.....BS...#
############
```

## Step 1: right

- legal: true
- win: false
- events: push_object:crate#1 box_to_sticky:n1 sticky_merge:n1

```text
############
#......G##.#
#.....@MMM.#
#..##.....##
#..##....###
#.....BS...#
############
```

## Step 2: up

- legal: true
- win: false
- events: walk

```text
############
#.....@G##.#
#......MMM.#
#..##.....##
#..##....###
#.....BS...#
############
```

## Step 3: right

- legal: true
- win: false
- events: walk

```text
############
#......+##.#
#......MMM.#
#..##.....##
#..##....###
#.....BS...#
############
```

## Step 4: down

- legal: true
- win: false
- events: push_object:sticky#1 move_sticky_rigid

```text
############
#......G##.#
#......@...#
#..##..MMM##
#..##....###
#.....BS...#
############
```

## Step 5: left

- legal: true
- win: false
- events: walk

```text
############
#......G##.#
#.....@....#
#..##..MMM##
#..##....###
#.....BS...#
############
```

## Step 6: down

- legal: true
- win: false
- events: walk

```text
############
#......G##.#
#..........#
#..##.@MMM##
#..##....###
#.....BS...#
############
```

## Step 7: down

- legal: true
- win: false
- events: walk

```text
############
#......G##.#
#..........#
#..##..MMM##
#..##.@..###
#.....BS...#
############
```

## Step 8: left

- legal: true
- win: false
- events: walk

```text
############
#......G##.#
#..........#
#..##..MMM##
#..##@...###
#.....BS...#
############
```

## Step 9: down

- legal: true
- win: false
- events: walk

```text
############
#......G##.#
#..........#
#..##..MMM##
#..##....###
#....@BS...#
############
```

## Step 10: right

- legal: true
- win: false
- events: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1

```text
############
#......G##.#
#..........#
#..##..CMM##
#..##....###
#.....@BS..#
############
```

## Step 11: right

- legal: true
- win: false
- events: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1

```text
############
#......G##.#
#..........#
#..##..CCM##
#..##....###
#......@BS.#
############
```

## Step 12: up

- legal: true
- win: false
- events: walk

```text
############
#......G##.#
#..........#
#..##..CCM##
#..##..@.###
#.......BS.#
############
```

## Step 13: up

- legal: true
- win: false
- events: push_object:crate#1

```text
############
#......G##.#
#......C...#
#..##..@CM##
#..##....###
#.......BS.#
############
```

## Step 14: up

- legal: true
- win: true
- events: push_object:crate#1

```text
############
#......*##.#
#......@...#
#..##...CM##
#..##....###
#.......BS.#
############
```

## Step 15: right

- legal: true
- win: true
- events: walk

```text
############
#......*##.#
#.......@..#
#..##...CM##
#..##....###
#.......BS.#
############
```

## Step 16: down

- legal: true
- win: true
- events: push_object:crate#2

```text
############
#......*##.#
#..........#
#..##...@M##
#..##...C###
#.......BS.#
############
```
