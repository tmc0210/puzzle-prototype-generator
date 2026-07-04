# Trace: RA_EXP_2026_07_04_SOFT_HANDOFF_altC

- Inputs: down left up up right right right right down right down left left up
- Steps: 14

## Step 0: start

- legal: true
- win: false
- events: none

```text
#########
#.MGG..##
#.@SB...#
#..LPC..#
#########
```

## Step 1: down

- legal: true
- win: false
- events: pull_object:sticky#1 move_sticky_rigid

```text
#########
#..GG..##
#.MSB...#
#.@LPC..#
#########
```

## Step 2: left

- legal: true
- win: false
- events: pull_object:push_pull_anchor anchor_boundary_shift:push_pull

```text
#########
#..GG..##
#.MSB...#
#@LP.C..#
#########
```

## Step 3: up

- legal: true
- win: false
- events: walk

```text
#########
#..GG..##
#@MSB...#
#.LP.C..#
#########
```

## Step 4: up

- legal: true
- win: false
- events: walk

```text
#########
#@.GG..##
#.MSB...#
#.LP.C..#
#########
```

## Step 5: right

- legal: true
- win: false
- events: walk

```text
#########
#.@GG..##
#.MSB...#
#.LP.C..#
#########
```

## Step 6: right

- legal: true
- win: false
- events: walk

```text
#########
#..+G..##
#.MSB...#
#.LP.C..#
#########
```

## Step 7: right

- legal: true
- win: false
- events: walk

```text
#########
#..G+..##
#.MSB...#
#.LP.C..#
#########
```

## Step 8: right

- legal: true
- win: false
- events: walk

```text
#########
#..GG@.##
#.MSB...#
#.LP.C..#
#########
```

## Step 9: down

- legal: true
- win: false
- events: walk

```text
#########
#..GG..##
#.MSB@..#
#.LP.C..#
#########
```

## Step 10: right

- legal: true
- win: false
- events: walk

```text
#########
#..GG..##
#.MSB.@.#
#.LP.C..#
#########
```

## Step 11: down

- legal: true
- win: false
- events: walk

```text
#########
#..GG..##
#.MSB...#
#.LP.C@.#
#########
```

## Step 12: left

- legal: true
- win: false
- events: push_object:crate#1

```text
#########
#..GG..##
#.MSB...#
#.LPC@..#
#########
```

## Step 13: left

- legal: true
- win: false
- events: push_object:crate#1 force_chain:n2 anchor_boundary_shift:push_pull box_to_sticky:n1

```text
#########
#..GG..##
#.MSB...#
#LPM@...#
#########
```

## Step 14: up

- legal: true
- win: true
- events: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky

```text
#########
#..SB..##
#.M.@...#
#LPM....#
#########
```
