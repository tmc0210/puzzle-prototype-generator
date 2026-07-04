# Trace: RA_EXP_2026_07_04_CROSS_LATCH_v2

- Inputs: left down down right up up left left left down left left right down left down right right right
- Steps: 19

## Step 0: start

- legal: true
- win: false
- events: none

```text
#########
#..P.BS@#
#..LG#..#
#...#C..#
#C..GC.##
#########
```

## Step 1: left

- legal: true
- win: false
- events: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n2 sticky_merge:n1

```text
#########
#..PBS@.#
#..LG#..#
#...#M..#
#C..GM.##
#########
```

## Step 2: down

- legal: true
- win: false
- events: walk

```text
#########
#..PBS..#
#..LG#@.#
#...#M..#
#C..GM.##
#########
```

## Step 3: down

- legal: true
- win: false
- events: walk

```text
#########
#..PBS..#
#..LG#..#
#...#M@.#
#C..GM.##
#########
```

## Step 4: right

- legal: true
- win: false
- events: pull_object:sticky#1 move_sticky_rigid

```text
#########
#..PBS..#
#..LG#..#
#...#.M@#
#C..G.M##
#########
```

## Step 5: up

- legal: true
- win: false
- events: walk

```text
#########
#..PBS..#
#..LG#.@#
#...#.M.#
#C..G.M##
#########
```

## Step 6: up

- legal: true
- win: false
- events: walk

```text
#########
#..PBS.@#
#..LG#..#
#...#.M.#
#C..G.M##
#########
```

## Step 7: left

- legal: true
- win: false
- events: walk

```text
#########
#..PBS@.#
#..LG#..#
#...#.M.#
#C..G.M##
#########
```

## Step 8: left

- legal: true
- win: false
- events: push_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky

```text
#########
#.PBS@..#
#.L.G#..#
#...#.M.#
#C..G.M##
#########
```

## Step 9: left

- legal: true
- win: false
- events: push_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky

```text
#########
#PBS@...#
#L..G#..#
#...#.M.#
#C..G.M##
#########
```

## Step 10: down

- legal: true
- win: false
- events: walk

```text
#########
#PBS....#
#L..+#..#
#...#.M.#
#C..G.M##
#########
```

## Step 11: left

- legal: true
- win: false
- events: walk

```text
#########
#PBS....#
#L.@G#..#
#...#.M.#
#C..G.M##
#########
```

## Step 12: left

- legal: true
- win: false
- events: walk

```text
#########
#PBS....#
#L@.G#..#
#...#.M.#
#C..G.M##
#########
```

## Step 13: right

- legal: true
- win: false
- events: pull_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky

```text
#########
#.PBS...#
#.L@G#..#
#...#.M.#
#C..G.M##
#########
```

## Step 14: down

- legal: true
- win: false
- events: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky

```text
#########
#.P.....#
#.LBS#..#
#..@#.M.#
#C..G.M##
#########
```

## Step 15: left

- legal: true
- win: false
- events: walk

```text
#########
#.P.....#
#.LBS#..#
#.@.#.M.#
#C..G.M##
#########
```

## Step 16: down

- legal: true
- win: false
- events: pull_object:push_pull_anchor anchor_boundary_shift:push_pull

```text
#########
#.......#
#.PBS#..#
#.L.#.M.#
#C@.G.M##
#########
```

## Step 17: right

- legal: true
- win: false
- events: pull_object:crate#1

```text
#########
#.......#
#.PBS#..#
#.L.#.M.#
#.C@G.M##
#########
```

## Step 18: right

- legal: true
- win: false
- events: pull_object:crate#1

```text
#########
#.......#
#.PBS#..#
#.L.#.M.#
#..C+.M##
#########
```

## Step 19: right

- legal: true
- win: true
- events: pull_object:crate#1 box_to_sticky:n1

```text
#########
#.......#
#.PBS#..#
#.L.#.M.#
#...m@M##
#########
```
