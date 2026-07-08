# Trace: RA_LEX_2026_07_08_OVERSHOOT_CUT_TAIL_v1

- Inputs: right right down right right right up left down left left up right
- Steps: 13

## Step 0: start

- legal: true
- win: false
- events: none

```text
########
#..G####
#@CC.G.#
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
#..G####
#.@CMG.#
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
#..G####
#..@Mm.#
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
#..G####
#...Mm.#
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
#..G####
#...Mm.#
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
#..G####
#...Mm.#
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
#..G####
#...Mm.#
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
#..G####
#...Mm@#
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
#..G####
#..CM+.#
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
#..G####
#..CMG.#
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
#..G####
#..CMG.#
###.@..#
###BS###
########
```

## Step 11: left

- legal: true
- win: false
- events: walk

```text
########
#..G####
#..CMG.#
###@...#
###BS###
########
```

## Step 12: up

- legal: true
- win: false
- events: push_object:crate#1

```text
########
#..*####
#..@MG.#
###....#
###BS###
########
```

## Step 13: right

- legal: true
- win: true
- events: push_object:sticky#1 move_sticky_rigid

```text
########
#..*####
#...@m.#
###....#
###BS###
########
```
