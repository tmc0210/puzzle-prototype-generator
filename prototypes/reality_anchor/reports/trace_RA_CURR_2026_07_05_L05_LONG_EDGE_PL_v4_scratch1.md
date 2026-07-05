# Trace: RA_CURR_2026_07_05_L05_LONG_EDGE_PL_v4_scratch1

- Inputs: up up left right down down down left left left up up up right right
- Steps: 15

## Step 0: start

- legal: true
- win: false
- events: none

```text
########
#PL..G##
#.#..###
#.#C@.##
#......#
########
```

## Step 1: up

- legal: true
- win: false
- events: walk

```text
########
#PL..G##
#.#.@###
#.#C..##
#......#
########
```

## Step 2: up

- legal: true
- win: false
- events: walk

```text
########
#PL.@G##
#.#..###
#.#C..##
#......#
########
```

## Step 3: left

- legal: true
- win: false
- events: walk

```text
########
#PL@.G##
#.#..###
#.#C..##
#......#
########
```

## Step 4: right

- legal: true
- win: false
- events: pull_object:push_pull_anchor anchor_boundary_shift:push_pull

```text
########
#.PL@G##
#.#..###
#.#C..##
#......#
########
```

## Step 5: down

- legal: true
- win: false
- events: walk

```text
########
#.PL.G##
#.#.@###
#.#C..##
#......#
########
```

## Step 6: down

- legal: true
- win: false
- events: walk

```text
########
#.PL.G##
#.#..###
#.#C@.##
#......#
########
```

## Step 7: down

- legal: true
- win: false
- events: walk

```text
########
#.PL.G##
#.#..###
#.#C..##
#...@..#
########
```

## Step 8: left

- legal: true
- win: false
- events: walk

```text
########
#.PL.G##
#.#..###
#.#C..##
#..@...#
########
```

## Step 9: left

- legal: true
- win: false
- events: walk

```text
########
#.PL.G##
#.#..###
#.#C..##
#.@....#
########
```

## Step 10: left

- legal: true
- win: false
- events: walk

```text
########
#.PL.G##
#.#..###
#.#C..##
#@.....#
########
```

## Step 11: up

- legal: true
- win: false
- events: walk

```text
########
#.PL.G##
#.#..###
#@#C..##
#......#
########
```

## Step 12: up

- legal: true
- win: false
- events: walk

```text
########
#.PL.G##
#@#..###
#.#C..##
#......#
########
```

## Step 13: up

- legal: true
- win: false
- events: walk

```text
########
#@PL.G##
#.#..###
#.#C..##
#......#
########
```

## Step 14: right

- legal: true
- win: false
- events: push_object:push_pull_anchor anchor_boundary_shift:push_pull

```text
########
#.@PLG##
#.#..###
#.#C..##
#......#
########
```

## Step 15: right

- legal: true
- win: true
- events: push_object:push_pull_anchor anchor_boundary_shift:push_pull

```text
########
#..@PL##
#.#..###
#.#C..##
#......#
########
```
