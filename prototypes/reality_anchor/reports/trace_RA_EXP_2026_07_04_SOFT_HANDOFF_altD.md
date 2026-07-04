# Trace: RA_EXP_2026_07_04_SOFT_HANDOFF_altD

- Inputs: down right right up left up right right right left down down right up right right up
- Steps: 17

## Step 0: start

- legal: true
- win: false
- events: none

```text
#########
##..C#G##
##......#
#@.C.BSG#
#.....PL#
#########
```

## Step 1: down

- legal: true
- win: false
- events: walk

```text
#########
##..C#G##
##......#
#..C.BSG#
#@....PL#
#########
```

## Step 2: right

- legal: true
- win: false
- events: walk

```text
#########
##..C#G##
##......#
#..C.BSG#
#.@...PL#
#########
```

## Step 3: right

- legal: true
- win: false
- events: walk

```text
#########
##..C#G##
##......#
#..C.BSG#
#..@..PL#
#########
```

## Step 4: up

- legal: true
- win: false
- events: push_object:crate#2

```text
#########
##..C#G##
##.C....#
#..@.BSG#
#.....PL#
#########
```

## Step 5: left

- legal: true
- win: false
- events: walk

```text
#########
##..C#G##
##.C....#
#.@..BSG#
#.....PL#
#########
```

## Step 6: up

- legal: true
- win: false
- events: walk

```text
#########
##..C#G##
##@C....#
#....BSG#
#.....PL#
#########
```

## Step 7: right

- legal: true
- win: false
- events: push_object:crate#2

```text
#########
##..C#G##
##.@C...#
#....BSG#
#.....PL#
#########
```

## Step 8: right

- legal: true
- win: false
- events: push_object:crate#2

```text
#########
##..C#G##
##..@C..#
#....BSG#
#.....PL#
#########
```

## Step 9: right

- legal: true
- win: false
- events: push_object:crate#2 box_to_sticky:n1

```text
#########
##..C#G##
##...@M.#
#....BSG#
#.....PL#
#########
```

## Step 10: left

- legal: true
- win: false
- events: walk

```text
#########
##..C#G##
##..@.M.#
#....BSG#
#.....PL#
#########
```

## Step 11: down

- legal: true
- win: false
- events: walk

```text
#########
##..C#G##
##....M.#
#...@BSG#
#.....PL#
#########
```

## Step 12: down

- legal: true
- win: false
- events: walk

```text
#########
##..C#G##
##....M.#
#....BSG#
#...@.PL#
#########
```

## Step 13: right

- legal: true
- win: false
- events: walk

```text
#########
##..C#G##
##....M.#
#....BSG#
#....@PL#
#########
```

## Step 14: up

- legal: true
- win: false
- events: push_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid

```text
#########
##..C#m##
##...BS.#
#....@.G#
#.....PL#
#########
```

## Step 15: right

- legal: true
- win: false
- events: walk

```text
#########
##..C#m##
##...BS.#
#.....@G#
#.....PL#
#########
```

## Step 16: right

- legal: true
- win: false
- events: walk

```text
#########
##..C#m##
##...BS.#
#......+#
#.....PL#
#########
```

## Step 17: up

- legal: true
- win: true
- events: pull_object:push_pull_anchor anchor_boundary_shift:push_pull

```text
#########
##..C#m##
##...BS@#
#.....PL#
#.......#
#########
```
