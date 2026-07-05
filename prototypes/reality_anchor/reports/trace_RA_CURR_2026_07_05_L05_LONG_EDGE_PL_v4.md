# Trace: RA_CURR_2026_07_05_L05_LONG_EDGE_PL_v4

- Inputs: right down left left up up up left right down down down left left left up up up right right down right down right
- Steps: 24

## Step 0: start

- legal: true
- win: false
- events: none

```text
#########
#PL..G###
#.#..####
#.##C@G##
#......##
#########
```

## Step 1: right

- legal: true
- win: false
- events: pull_object:crate#1

```text
#########
#PL..G###
#.#..####
#.##.C+##
#......##
#########
```

## Step 2: down

- legal: true
- win: false
- events: walk

```text
#########
#PL..G###
#.#..####
#.##.CG##
#.....@##
#########
```

## Step 3: left

- legal: true
- win: false
- events: walk

```text
#########
#PL..G###
#.#..####
#.##.CG##
#....@.##
#########
```

## Step 4: left

- legal: true
- win: false
- events: walk

```text
#########
#PL..G###
#.#..####
#.##.CG##
#...@..##
#########
```

## Step 5: up

- legal: true
- win: false
- events: walk

```text
#########
#PL..G###
#.#..####
#.##@CG##
#......##
#########
```

## Step 6: up

- legal: true
- win: false
- events: walk

```text
#########
#PL..G###
#.#.@####
#.##.CG##
#......##
#########
```

## Step 7: up

- legal: true
- win: false
- events: walk

```text
#########
#PL.@G###
#.#..####
#.##.CG##
#......##
#########
```

## Step 8: left

- legal: true
- win: false
- events: walk

```text
#########
#PL@.G###
#.#..####
#.##.CG##
#......##
#########
```

## Step 9: right

- legal: true
- win: false
- events: pull_object:push_pull_anchor anchor_boundary_shift:push_pull

```text
#########
#.PL@G###
#.#..####
#.##.CG##
#......##
#########
```

## Step 10: down

- legal: true
- win: false
- events: walk

```text
#########
#.PL.G###
#.#.@####
#.##.CG##
#......##
#########
```

## Step 11: down

- legal: true
- win: false
- events: walk

```text
#########
#.PL.G###
#.#..####
#.##@CG##
#......##
#########
```

## Step 12: down

- legal: true
- win: false
- events: walk

```text
#########
#.PL.G###
#.#..####
#.##.CG##
#...@..##
#########
```

## Step 13: left

- legal: true
- win: false
- events: walk

```text
#########
#.PL.G###
#.#..####
#.##.CG##
#..@...##
#########
```

## Step 14: left

- legal: true
- win: false
- events: walk

```text
#########
#.PL.G###
#.#..####
#.##.CG##
#.@....##
#########
```

## Step 15: left

- legal: true
- win: false
- events: walk

```text
#########
#.PL.G###
#.#..####
#.##.CG##
#@.....##
#########
```

## Step 16: up

- legal: true
- win: false
- events: walk

```text
#########
#.PL.G###
#.#..####
#@##.CG##
#......##
#########
```

## Step 17: up

- legal: true
- win: false
- events: walk

```text
#########
#.PL.G###
#@#..####
#.##.CG##
#......##
#########
```

## Step 18: up

- legal: true
- win: false
- events: walk

```text
#########
#@PL.G###
#.#..####
#.##.CG##
#......##
#########
```

## Step 19: right

- legal: true
- win: false
- events: push_object:push_pull_anchor anchor_boundary_shift:push_pull

```text
#########
#.@PLG###
#.#..####
#.##.CG##
#......##
#########
```

## Step 20: right

- legal: true
- win: false
- events: push_object:push_pull_anchor anchor_boundary_shift:push_pull

```text
#########
#..@PL###
#.#..####
#.##.CG##
#......##
#########
```

## Step 21: down

- legal: true
- win: false
- events: walk

```text
#########
#...PL###
#.#@.####
#.##.CG##
#......##
#########
```

## Step 22: right

- legal: true
- win: false
- events: walk

```text
#########
#...PL###
#.#.@####
#.##.CG##
#......##
#########
```

## Step 23: down

- legal: true
- win: false
- events: walk

```text
#########
#...PL###
#.#..####
#.##@CG##
#......##
#########
```

## Step 24: right

- legal: true
- win: true
- events: push_object:crate#1

```text
#########
#...PL###
#.#..####
#.##.@*##
#......##
#########
```
