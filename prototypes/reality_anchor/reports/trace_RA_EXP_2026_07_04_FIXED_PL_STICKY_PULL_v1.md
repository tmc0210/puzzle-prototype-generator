# Trace: RA_EXP_2026_07_04_FIXED_PL_STICKY_PULL_v1

- Inputs: right down right right
- Steps: 4

## Step 0: start

- legal: true
- win: false
- events: none

```text
#########
####PL###
#########
#@BSG..##
#..M.MG.#
#.......#
#########
```

## Step 1: right

- legal: true
- win: false
- events: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1

```text
#########
####PL###
#########
#.@BS..##
#..C.MG.#
#.......#
#########
```

## Step 2: down

- legal: true
- win: false
- events: walk

```text
#########
####PL###
#########
#..BS..##
#.@C.MG.#
#.......#
#########
```

## Step 3: right

- legal: true
- win: false
- events: push_object:crate#1 box_to_sticky:n1 sticky_merge:n1

```text
#########
####PL###
#########
#..BS..##
#..@MMG.#
#.......#
#########
```

## Step 4: right

- legal: true
- win: true
- events: push_object:sticky#1 move_sticky_rigid

```text
#########
####PL###
#########
#..BS..##
#...@Mm.#
#.......#
#########
```
