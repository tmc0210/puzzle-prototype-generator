# Trace: RA_LEX_2026_07_08_OVERSHOOT_CUT_DUAL_POCKET_v2

- Inputs: right right down right right right up left down left up down left up
- Steps: 14

## Step 0: start

- legal: true
- win: false
- events: none

```text
########
#..GG###
#@CC...#
###....#
###BS###
########
```

## Step 1: right

- legal: true
- win: false
- events: push_object:crate#1 force_chain:n2 box_to_sticky:n1

```text
########
#..GG###
#.@CM..#
###....#
###BS###
########
```

## Step 2: right

- legal: true
- win: false
- events: push_object:crate#1 force_chain:n2 move_sticky_rigid box_to_sticky:n1 sticky_merge:n1

```text
########
#..GG###
#..@MM.#
###....#
###BS###
########
```

## Step 3: down

- legal: true
- win: false
- events: walk

```text
########
#..GG###
#...MM.#
###@...#
###BS###
########
```

## Step 4: right

- legal: true
- win: false
- events: walk

```text
########
#..GG###
#...MM.#
###.@..#
###BS###
########
```

## Step 5: right

- legal: true
- win: false
- events: walk

```text
########
#..GG###
#...MM.#
###..@.#
###BS###
########
```

## Step 6: right

- legal: true
- win: false
- events: walk

```text
########
#..GG###
#...MM.#
###...@#
###BS###
########
```

## Step 7: up

- legal: true
- win: false
- events: walk

```text
########
#..GG###
#...MM@#
###....#
###BS###
########
```

## Step 8: left

- legal: true
- win: false
- events: push_object:sticky#1 move_sticky_rigid sticky_to_box:n1

```text
########
#..GG###
#..CM@.#
###....#
###BS###
########
```

## Step 9: down

- legal: true
- win: false
- events: walk

```text
########
#..GG###
#..CM..#
###..@.#
###BS###
########
```

## Step 10: left

- legal: true
- win: false
- events: walk

```text
########
#..GG###
#..CM..#
###.@..#
###BS###
########
```

## Step 11: up

- legal: true
- win: false
- events: push_object:sticky#1 move_sticky_rigid

```text
########
#..Gm###
#..C@..#
###....#
###BS###
########
```

## Step 12: down

- legal: true
- win: false
- events: walk

```text
########
#..Gm###
#..C...#
###.@..#
###BS###
########
```

## Step 13: left

- legal: true
- win: false
- events: walk

```text
########
#..Gm###
#..C...#
###@...#
###BS###
########
```

## Step 14: up

- legal: true
- win: true
- events: push_object:crate#1

```text
########
#..*m###
#..@...#
###....#
###BS###
########
```
