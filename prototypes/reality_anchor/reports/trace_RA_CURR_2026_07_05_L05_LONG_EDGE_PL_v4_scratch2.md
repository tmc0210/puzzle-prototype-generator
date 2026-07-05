# Trace: RA_CURR_2026_07_05_L05_LONG_EDGE_PL_v4_scratch2

- Inputs: up up left right down down right down left left left left up up up right left down down down right right up right
- Steps: 24

## Step 0: start

- legal: true
- win: false
- events: none

```text
########
#PL.G###
#.#..###
#.#C@G##
#......#
########
```

## Step 1: up

- legal: true
- win: false
- events: walk

```text
########
#PL.G###
#.#.@###
#.#C.G##
#......#
########
```

## Step 2: up

- legal: true
- win: false
- events: walk

```text
########
#PL.+###
#.#..###
#.#C.G##
#......#
########
```

## Step 3: left

- legal: true
- win: false
- events: walk

```text
########
#PL@G###
#.#..###
#.#C.G##
#......#
########
```

## Step 4: right

- legal: true
- win: false
- events: pull_object:push_pull_anchor anchor_boundary_shift:push_pull

```text
########
#.PL+###
#.#..###
#.#C.G##
#......#
########
```

## Step 5: down

- legal: true
- win: false
- events: walk

```text
########
#.PLG###
#.#.@###
#.#C.G##
#......#
########
```

## Step 6: down

- legal: true
- win: false
- events: walk

```text
########
#.PLG###
#.#..###
#.#C@G##
#......#
########
```

## Step 7: right

- legal: true
- win: false
- events: pull_object:crate#1

```text
########
#.PLG###
#.#..###
#.#.C+##
#......#
########
```

## Step 8: down

- legal: true
- win: false
- events: walk

```text
########
#.PLG###
#.#..###
#.#.CG##
#....@.#
########
```

## Step 9: left

- legal: true
- win: false
- events: walk

```text
########
#.PLG###
#.#..###
#.#.CG##
#...@..#
########
```

## Step 10: left

- legal: true
- win: false
- events: walk

```text
########
#.PLG###
#.#..###
#.#.CG##
#..@...#
########
```

## Step 11: left

- legal: true
- win: false
- events: walk

```text
########
#.PLG###
#.#..###
#.#.CG##
#.@....#
########
```

## Step 12: left

- legal: true
- win: false
- events: walk

```text
########
#.PLG###
#.#..###
#.#.CG##
#@.....#
########
```

## Step 13: up

- legal: true
- win: false
- events: walk

```text
########
#.PLG###
#.#..###
#@#.CG##
#......#
########
```

## Step 14: up

- legal: true
- win: false
- events: walk

```text
########
#.PLG###
#@#..###
#.#.CG##
#......#
########
```

## Step 15: up

- legal: true
- win: false
- events: walk

```text
########
#@PLG###
#.#..###
#.#.CG##
#......#
########
```

## Step 16: right

- legal: true
- win: false
- events: push_object:push_pull_anchor anchor_boundary_shift:push_pull

```text
########
#.@PL###
#.#..###
#.#.CG##
#......#
########
```

## Step 17: left

- legal: true
- win: false
- events: walk

```text
########
#@.PL###
#.#..###
#.#.CG##
#......#
########
```

## Step 18: down

- legal: true
- win: false
- events: walk

```text
########
#..PL###
#@#..###
#.#.CG##
#......#
########
```

## Step 19: down

- legal: true
- win: false
- events: walk

```text
########
#..PL###
#.#..###
#@#.CG##
#......#
########
```

## Step 20: down

- legal: true
- win: false
- events: walk

```text
########
#..PL###
#.#..###
#.#.CG##
#@.....#
########
```

## Step 21: right

- legal: true
- win: false
- events: walk

```text
########
#..PL###
#.#..###
#.#.CG##
#.@....#
########
```

## Step 22: right

- legal: true
- win: false
- events: walk

```text
########
#..PL###
#.#..###
#.#.CG##
#..@...#
########
```

## Step 23: up

- legal: true
- win: false
- events: walk

```text
########
#..PL###
#.#..###
#.#@CG##
#......#
########
```

## Step 24: right

- legal: true
- win: true
- events: push_object:crate#1

```text
########
#..PL###
#.#..###
#.#.@*##
#......#
########
```
