# Trace: RA_CURR_2026_07_05_L05_LONG_EDGE_PL_v4_scratch3_manual

- Inputs: right down left left up up up left right down down down left left left up up up right right down right down right
- Steps: 24

## Step 0: start

- legal: true
- win: false
- events: none

```text
#########
#PL..G###
#.#.#####
#.##C@G.#
#......##
#########
```

## Step 1: right

- legal: true
- win: false
- events: pull_object:crate#1

```text
#########
#PL..G###
#.#.#####
#.##.C+.#
#......##
#########
```

## Step 2: down

- legal: true
- win: false
- events: walk

```text
#########
#PL..G###
#.#.#####
#.##.CG.#
#.....@##
#########
```

## Step 3: left

- legal: true
- win: false
- events: walk

```text
#########
#PL..G###
#.#.#####
#.##.CG.#
#....@.##
#########
```

## Step 4: left

- legal: true
- win: false
- events: walk

```text
#########
#PL..G###
#.#.#####
#.##.CG.#
#...@..##
#########
```

## Step 5: up

- legal: true
- win: false
- events: walk

```text
#########
#PL..G###
#.#.#####
#.##@CG.#
#......##
#########
```

## Step 6: up

- legal: false
- win: false
- events: none

```text
#########
#PL..G###
#.#.#####
#.##@CG.#
#......##
#########
```
