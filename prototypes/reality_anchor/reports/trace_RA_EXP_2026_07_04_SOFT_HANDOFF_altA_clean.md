# Trace: RA_EXP_2026_07_04_SOFT_HANDOFF_altA_clean

- Inputs: left left left left down up right right right right down left
- Steps: 12

## Step 0: start

- legal: true
- win: false
- events: none

```text
#########
#...G.@.#
#C.GLP.##
#BS#.#..#
#########
```

## Step 1: left

- legal: true
- win: false
- events: walk

```text
#########
#...G@..#
#C.GLP.##
#BS#.#..#
#########
```

## Step 2: left

- legal: true
- win: false
- events: walk

```text
#########
#...+...#
#C.GLP.##
#BS#.#..#
#########
```

## Step 3: left

- legal: true
- win: false
- events: walk

```text
#########
#..@G...#
#C.GLP.##
#BS#.#..#
#########
```

## Step 4: left

- legal: true
- win: false
- events: walk

```text
#########
#.@.G...#
#C.GLP.##
#BS#.#..#
#########
```

## Step 5: down

- legal: true
- win: false
- events: walk

```text
#########
#...G...#
#C@GLP.##
#BS#.#..#
#########
```

## Step 6: up

- legal: true
- win: false
- events: pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky

```text
#########
#C@.G...#
#BSGLP.##
#..#.#..#
#########
```

## Step 7: right

- legal: true
- win: false
- events: pull_object:crate#1 box_to_sticky:n1

```text
#########
#.M@G...#
#BSGLP.##
#..#.#..#
#########
```

## Step 8: right

- legal: true
- win: false
- events: pull_object:sticky#1 move_sticky_rigid

```text
#########
#..M+...#
#BSGLP.##
#..#.#..#
#########
```

## Step 9: right

- legal: true
- win: false
- events: pull_object:sticky#1 move_sticky_rigid

```text
#########
#...m@..#
#BSGLP.##
#..#.#..#
#########
```

## Step 10: right

- legal: true
- win: false
- events: walk

```text
#########
#...m.@.#
#BSGLP.##
#..#.#..#
#########
```

## Step 11: down

- legal: true
- win: false
- events: walk

```text
#########
#...m...#
#BSGLP@##
#..#.#..#
#########
```

## Step 12: left

- legal: true
- win: true
- events: push_object:push_pull_anchor anchor_boundary_shift:push_pull

```text
#########
#...m...#
#BSLP@.##
#..#.#..#
#########
```
