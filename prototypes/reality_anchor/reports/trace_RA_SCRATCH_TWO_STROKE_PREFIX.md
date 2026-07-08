# Trace: RA_SCRATCH_TWO_STROKE_PREFIX

- Inputs: up right right
- Steps: 3

## Step 0: start

- legal: true
- win: false
- events: none

```text
##########
#.PLBS..##
#@.###..##
#...#MMG.#
#....G#..#
#........#
##########
```

## Step 1: up

- legal: true
- win: false
- events: walk

```text
##########
#@PLBS..##
#..###..##
#...#MMG.#
#....G#..#
#........#
##########
```

## Step 2: right

- legal: true
- win: false
- events: push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky sticky_to_box:n1

```text
##########
#.@PLBS.##
#..###..##
#...#CMG.#
#....G#..#
#........#
##########
```

## Step 3: right

- legal: true
- win: false
- events: push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky sticky_to_box:n1

```text
##########
#..@PLBS##
#..###..##
#...#CCG.#
#....G#..#
#........#
##########
```
