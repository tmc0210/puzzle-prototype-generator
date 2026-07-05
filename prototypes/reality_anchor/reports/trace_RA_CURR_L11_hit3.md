# Trace: RA_CURR_L11_hit3

- Inputs: up right up left up right down right down right down right up
- Steps: 13

## Step 0: start

- legal: true
- win: false
- events: none

```text
#########
#....G#.#
#..BS#G.#
##.C.MM.#
#C@#....#
#########
```

## Step 1: up

- legal: true
- win: false
- events: walk

```text
#########
#....G#.#
#..BS#G.#
##@C.MM.#
#C.#....#
#########
```

## Step 2: right

- legal: true
- win: false
- events: push_object:crate#1 box_to_sticky:n1 sticky_merge:n1

```text
#########
#....G#.#
#..BS#G.#
##.@MMM.#
#C.#....#
#########
```

## Step 3: up

- legal: true
- win: false
- events: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky

```text
#########
#..BSG#.#
#..@.#G.#
##..MMM.#
#C.#....#
#########
```

## Step 4: left

- legal: true
- win: false
- events: walk

```text
#########
#..BSG#.#
#.@..#G.#
##..MMM.#
#C.#....#
#########
```

## Step 5: up

- legal: true
- win: false
- events: walk

```text
#########
#.@BSG#.#
#....#G.#
##..MMM.#
#C.#....#
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
#########
```

## Step 10: right

- legal: true
- win: false
- events: push_object:sticky#1 move_sticky_rigid

```text
#########
#...BS#.#
#....#G.#
##...@MM#
#C.#C...#
#########
```

## Step 11: down

- legal: true
- win: false
- events: walk

```text
#########
#...BS#.#
#....#G.#
##....MM#
#C.#C@..#
#########
```

## Step 12: right

- legal: true
- win: false
- events: walk

```text
#########
#...BS#.#
#....#G.#
##....MM#
#C.#C.@.#
#########
```

## Step 13: up

- legal: true
- win: true
- events: push_object:sticky#1 move_sticky_rigid

```text
#########
#...BS#.#
#....#mM#
##....@.#
#C.#C...#
#########
```
