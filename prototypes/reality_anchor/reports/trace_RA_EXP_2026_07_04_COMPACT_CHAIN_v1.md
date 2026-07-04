# Trace: RA_EXP_2026_07_04_COMPACT_CHAIN_v1

- Inputs: down right right right up left left down left up down right right right right up down
- Steps: 17

## Step 0: start

- legal: true
- win: false
- events: none

```text
##########
#G.#MPL..#
#.@BSG.M.#
#..C.....#
##########
```

## Step 1: down

- legal: true
- win: false
- events: walk

```text
##########
#G.#MPL..#
#..BSG.M.#
#.@C.....#
##########
```

## Step 2: right

- legal: true
- win: false
- events: push_object:crate#1 box_to_sticky:n1

```text
##########
#G.#MPL..#
#..BSG.M.#
#..@M....#
##########
```

## Step 3: right

- legal: true
- win: false
- events: push_object:sticky#2 move_sticky_rigid

```text
##########
#G.#MPL..#
#..BSG.M.#
#...@M...#
##########
```

## Step 4: right

- legal: true
- win: false
- events: push_object:sticky#2 move_sticky_rigid

```text
##########
#G.#MPL..#
#..BSG.M.#
#....@M..#
##########
```

## Step 5: up

- legal: true
- win: false
- events: walk

```text
##########
#G.#MPL..#
#..BS+.M.#
#.....M..#
##########
```

## Step 6: left

- legal: true
- win: false
- events: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky

```text
##########
#G.#MPL..#
#.BS@G.M.#
#.....M..#
##########
```

## Step 7: left

- legal: true
- win: false
- events: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky

```text
##########
#G.#MPL..#
#BS@.G.M.#
#.....M..#
##########
```

## Step 8: down

- legal: true
- win: false
- events: walk

```text
##########
#G.#MPL..#
#BS..G.M.#
#..@..M..#
##########
```

## Step 9: left

- legal: true
- win: false
- events: walk

```text
##########
#G.#MPL..#
#BS..G.M.#
#.@...M..#
##########
```

## Step 10: up

- legal: true
- win: false
- events: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky

```text
##########
#BS#MPL..#
#.@..G.M.#
#.....M..#
##########
```

## Step 11: down

- legal: true
- win: false
- events: walk

```text
##########
#BS#MPL..#
#....G.M.#
#.@...M..#
##########
```

## Step 12: right

- legal: true
- win: false
- events: walk

```text
##########
#BS#MPL..#
#....G.M.#
#..@..M..#
##########
```

## Step 13: right

- legal: true
- win: false
- events: walk

```text
##########
#BS#MPL..#
#....G.M.#
#...@.M..#
##########
```

## Step 14: right

- legal: true
- win: false
- events: walk

```text
##########
#BS#MPL..#
#....G.M.#
#....@M..#
##########
```

## Step 15: right

- legal: true
- win: false
- events: push_object:sticky#2 move_sticky_rigid sticky_merge:n1

```text
##########
#BS#MPL..#
#....G.M.#
#.....@M.#
##########
```

## Step 16: up

- legal: true
- win: false
- events: walk

```text
##########
#BS#MPL..#
#....G@M.#
#......M.#
##########
```

## Step 17: down

- legal: true
- win: true
- events: pull_object:push_pull_anchor anchor_boundary_shift:push_pull

```text
##########
#BS#M....#
#....PLM.#
#.....@M.#
##########
```
