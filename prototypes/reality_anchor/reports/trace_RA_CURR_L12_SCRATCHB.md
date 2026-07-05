# Trace: RA_CURR_L12_SCRATCHB

- Inputs: right right right
- Steps: 3

## Step 0: start

- legal: true
- win: false
- events: none

```text
#########
###PL####
###BS####
#..C@...#
#...M.G.#
#########
```

## Step 1: right

- legal: true
- win: false
- events: pull_object:crate#1 box_to_sticky:n1 sticky_merge:n1

```text
#########
###PL####
###BS####
#...M@..#
#...M.G.#
#########
```

## Step 2: right

- legal: true
- win: false
- events: pull_object:sticky#1 move_sticky_rigid

```text
#########
###PL####
###BS####
#....M@.#
#....MG.#
#########
```

## Step 3: right

- legal: true
- win: true
- events: pull_object:sticky#1 move_sticky_rigid

```text
#########
###PL####
###BS####
#.....M@#
#.....m.#
#########
```
