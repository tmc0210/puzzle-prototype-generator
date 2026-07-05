# Trace: RA_CURR_L11_APP_SCRATCHA

- Inputs: up right up left up right down right down down up right down right up
- Steps: 15

## Step 0: start

- legal: true
- win: false
- events: none

```text
#########
#.....#.#
#..BS#G.#
##.C.MM.#
#C@#....#
#...G...#
#########
```

## Step 1: up

- legal: true
- win: false
- events: walk

```text
#########
#.....#.#
#..BS#G.#
##@C.MM.#
#C.#....#
#...G...#
#########
```

## Step 2: right

- legal: true
- win: false
- events: push_object:crate#1 box_to_sticky:n1 sticky_merge:n1

```text
#########
#.....#.#
#..BS#G.#
##.@MMM.#
#C.#....#
#...G...#
#########
```

## Step 3: up

- legal: true
- win: false
- events: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky

```text
#########
#..BS.#.#
#..@.#G.#
##..MMM.#
#C.#....#
#...G...#
#########
```

## Step 4: left

- legal: true
- win: false
- events: walk

```text
#########
#..BS.#.#
#.@..#G.#
##..MMM.#
#C.#....#
#...G...#
#########
```

## Step 5: up

- legal: true
- win: false
- events: walk

```text
#########
#.@BS.#.#
#....#G.#
##..MMM.#
#C.#....#
#...G...#
#########
```

## Step 6: right

- legal: true
- win: false
- events: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1

```text
#########
#..@BS#.#
#....#G.#
##..CMM.#
#C.#....#
#...G...#
#########
```

## Step 7: down

- legal: true
- win: false
- events: walk

```text
#########
#...BS#.#
#..@.#G.#
##..CMM.#
#C.#....#
#...G...#
#########
```

## Step 8: right

- legal: true
- win: false
- events: walk

```text
#########
#...BS#.#
#...@#G.#
##..CMM.#
#C.#....#
#...G...#
#########
```

## Step 9: down

- legal: true
- win: false
- events: push_object:crate#1

```text
#########
#...BS#.#
#....#G.#
##..@MM.#
#C.#C...#
#...G...#
#########
```

## Step 10: down

- legal: true
- win: false
- events: push_object:crate#2

```text
#########
#...BS#.#
#....#G.#
##...MM.#
#C.#@...#
#...*...#
#########
```

## Step 11: up

- legal: true
- win: false
- events: walk

```text
#########
#...BS#.#
#....#G.#
##..@MM.#
#C.#....#
#...*...#
#########
```

## Step 12: right

- legal: true
- win: false
- events: push_object:sticky#1 move_sticky_rigid

```text
#########
#...BS#.#
#....#G.#
##...@MM#
#C.#....#
#...*...#
#########
```

## Step 13: down

- legal: true
- win: false
- events: walk

```text
#########
#...BS#.#
#....#G.#
##....MM#
#C.#.@..#
#...*...#
#########
```

## Step 14: right

- legal: true
- win: false
- events: walk

```text
#########
#...BS#.#
#....#G.#
##....MM#
#C.#..@.#
#...*...#
#########
```

## Step 15: up

- legal: true
- win: true
- events: push_object:sticky#1 move_sticky_rigid

```text
#########
#...BS#.#
#....#mM#
##....@.#
#C.#....#
#...*...#
#########
```
