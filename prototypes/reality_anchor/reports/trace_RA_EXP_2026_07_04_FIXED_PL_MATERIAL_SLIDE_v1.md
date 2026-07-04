# Trace: RA_EXP_2026_07_04_FIXED_PL_MATERIAL_SLIDE_v1

- Inputs: down right down left up up left left left left down left
- Steps: 12

## Step 0: start

- legal: true
- win: false
- events: none

```text
#########
####LP###
#########
#M....@.#
#.GS..M.#
#..B#G..#
#########
```

## Step 1: down

- legal: true
- win: false
- events: push_object:sticky#2 move_sticky_rigid sticky_to_box:n1

```text
#########
####LP###
#########
#M......#
#.GS..@.#
#..B#GC.#
#########
```

## Step 2: right

- legal: true
- win: false
- events: walk

```text
#########
####LP###
#########
#M......#
#.GS...@#
#..B#GC.#
#########
```

## Step 3: down

- legal: true
- win: false
- events: walk

```text
#########
####LP###
#########
#M......#
#.GS....#
#..B#GC@#
#########
```

## Step 4: left

- legal: true
- win: false
- events: push_object:crate#1

```text
#########
####LP###
#########
#M......#
#.GS....#
#..B#*@.#
#########
```

## Step 5: up

- legal: true
- win: false
- events: walk

```text
#########
####LP###
#########
#M......#
#.GS..@.#
#..B#*..#
#########
```

## Step 6: up

- legal: true
- win: false
- events: walk

```text
#########
####LP###
#########
#M....@.#
#.GS....#
#..B#*..#
#########
```

## Step 7: left

- legal: true
- win: false
- events: walk

```text
#########
####LP###
#########
#M...@..#
#.GS....#
#..B#*..#
#########
```

## Step 8: left

- legal: true
- win: false
- events: walk

```text
#########
####LP###
#########
#M..@...#
#.GS....#
#..B#*..#
#########
```

## Step 9: left

- legal: true
- win: false
- events: walk

```text
#########
####LP###
#########
#M.@....#
#.GS....#
#..B#*..#
#########
```

## Step 10: left

- legal: true
- win: false
- events: walk

```text
#########
####LP###
#########
#M@.....#
#.GS....#
#..B#*..#
#########
```

## Step 11: down

- legal: true
- win: false
- events: walk

```text
#########
####LP###
#########
#M......#
#.+S....#
#..B#*..#
#########
```

## Step 12: left

- legal: true
- win: true
- events: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky

```text
#########
####LP###
#########
#M......#
#@S.....#
#.B.#*..#
#########
```
