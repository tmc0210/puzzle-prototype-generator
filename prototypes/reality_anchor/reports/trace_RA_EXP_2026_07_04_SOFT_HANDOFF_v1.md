# Trace: RA_EXP_2026_07_04_SOFT_HANDOFF_v1

- Inputs: down left left left left up down right right right up down right
- Steps: 13

## Step 0: start

- legal: true
- win: false
- events: none

```text
#######
#..C#.#
#G.PL##
#MSB.@#
#...G.#
#######
```

## Step 1: down

- legal: true
- win: false
- events: walk

```text
#######
#..C#.#
#G.PL##
#MSB..#
#...G@#
#######
```

## Step 2: left

- legal: true
- win: false
- events: walk

```text
#######
#..C#.#
#G.PL##
#MSB..#
#...+.#
#######
```

## Step 3: left

- legal: true
- win: false
- events: walk

```text
#######
#..C#.#
#G.PL##
#MSB..#
#..@G.#
#######
```

## Step 4: left

- legal: true
- win: false
- events: walk

```text
#######
#..C#.#
#G.PL##
#MSB..#
#.@.G.#
#######
```

## Step 5: left

- legal: true
- win: false
- events: walk

```text
#######
#..C#.#
#G.PL##
#MSB..#
#@..G.#
#######
```

## Step 6: up

- legal: true
- win: false
- events: push_object:sticky#1 move_sticky_rigid

```text
#######
#..C#.#
#m.PL##
#@SB..#
#...G.#
#######
```

## Step 7: down

- legal: true
- win: false
- events: walk

```text
#######
#..C#.#
#m.PL##
#.SB..#
#@..G.#
#######
```

## Step 8: right

- legal: true
- win: false
- events: walk

```text
#######
#..C#.#
#m.PL##
#.SB..#
#.@.G.#
#######
```

## Step 9: right

- legal: true
- win: false
- events: walk

```text
#######
#..C#.#
#m.PL##
#.SB..#
#..@G.#
#######
```

## Step 10: right

- legal: true
- win: false
- events: walk

```text
#######
#..C#.#
#m.PL##
#.SB..#
#...+.#
#######
```

## Step 11: up

- legal: true
- win: false
- events: walk

```text
#######
#..C#.#
#m.PL##
#.SB@.#
#...G.#
#######
```

## Step 12: down

- legal: true
- win: false
- events: pull_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky

```text
#######
#..C#.#
#m...##
#..PL.#
#.SB+.#
#######
```

## Step 13: right

- legal: true
- win: true
- events: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1

```text
#######
#..M#.#
#m...##
#..PL.#
#..SB@#
#######
```
