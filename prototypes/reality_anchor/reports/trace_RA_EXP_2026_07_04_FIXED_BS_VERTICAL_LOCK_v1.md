# Trace: RA_EXP_2026_07_04_FIXED_BS_VERTICAL_LOCK_v1

- Inputs: right right down right right
- Steps: 5

## Step 0: start

- legal: true
- win: false
- events: none

```text
#########
####BS###
#########
#@PLG...#
#...C.G.#
#....MG.#
#########
```

## Step 1: right

- legal: true
- win: false
- events: push_object:push_pull_anchor anchor_boundary_shift:push_pull

```text
#########
####BS###
#########
#.@PL...#
#...C.G.#
#....MG.#
#########
```

## Step 2: right

- legal: true
- win: false
- events: push_object:push_pull_anchor anchor_boundary_shift:push_pull

```text
#########
####BS###
#########
#..@PL..#
#...C.G.#
#....MG.#
#########
```

## Step 3: down

- legal: true
- win: false
- events: walk

```text
#########
####BS###
#########
#...PL..#
#..@C.G.#
#....MG.#
#########
```

## Step 4: right

- legal: true
- win: false
- events: push_object:crate#1 box_to_sticky:n1 sticky_merge:n1

```text
#########
####BS###
#########
#...PL..#
#...@MG.#
#....MG.#
#########
```

## Step 5: right

- legal: true
- win: true
- events: push_object:sticky#1 move_sticky_rigid

```text
#########
####BS###
#########
#...PL..#
#....@m.#
#.....m.#
#########
```
