# Trace: RA_EXP_2026_07_04_FIXED_BS_PULL_GATE_v1

- Inputs: right down right up left left left down down right left
- Steps: 11

## Step 0: start

- legal: true
- win: false
- events: none

```text
########
####BS##
########
#C.P@..#
#.GL#M.#
#.#.G..#
########
```

## Step 1: right

- legal: true
- win: false
- events: walk

```text
########
####BS##
########
#C.P.@.#
#.GL#M.#
#.#.G..#
########
```

## Step 2: down

- legal: true
- win: false
- events: push_object:sticky#1 move_sticky_rigid

```text
########
####BS##
########
#C.P...#
#.GL#@.#
#.#.GM.#
########
```

## Step 3: right

- legal: true
- win: false
- events: walk

```text
########
####BS##
########
#C.P...#
#.GL#.@#
#.#.GM.#
########
```

## Step 4: up

- legal: true
- win: false
- events: walk

```text
########
####BS##
########
#C.P..@#
#.GL#..#
#.#.GM.#
########
```

## Step 5: left

- legal: true
- win: false
- events: walk

```text
########
####BS##
########
#C.P.@.#
#.GL#..#
#.#.GM.#
########
```

## Step 6: left

- legal: true
- win: false
- events: walk

```text
########
####BS##
########
#C.P@..#
#.GL#..#
#.#.GM.#
########
```

## Step 7: left

- legal: true
- win: false
- events: push_object:push_pull_anchor anchor_boundary_shift:push_pull

```text
########
####BS##
########
#CP@...#
#.L.#..#
#.#.GM.#
########
```

## Step 8: down

- legal: true
- win: false
- events: walk

```text
########
####BS##
########
#CP....#
#.L@#..#
#.#.GM.#
########
```

## Step 9: down

- legal: true
- win: false
- events: walk

```text
########
####BS##
########
#CP....#
#.L.#..#
#.#@GM.#
########
```

## Step 10: right

- legal: true
- win: false
- events: walk

```text
########
####BS##
########
#CP....#
#.L.#..#
#.#.+M.#
########
```

## Step 11: left

- legal: true
- win: true
- events: pull_object:sticky#1 move_sticky_rigid sticky_to_box:n1

```text
########
####BS##
########
#CP....#
#.L.#..#
#.#@*..#
########
```
