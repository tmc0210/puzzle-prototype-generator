# Trace: RA_CURR_2026_07_05_L11_RELAY_CUT_bypass_no_crate

- Inputs: down right right right up left up left down right down left up up left
- Steps: 15

## Step 0: start

- legal: true
- win: false
- events: none

```text
#########
#G.C.#..#
##@BS..M#
#.G.M..M#
#########
```

## Step 1: down

- legal: true
- win: false
- events: walk

```text
#########
#G.C.#..#
##.BS..M#
#.+.M..M#
#########
```

## Step 2: right

- legal: true
- win: false
- events: walk

```text
#########
#G.C.#..#
##.BS..M#
#.G@M..M#
#########
```

## Step 3: right

- legal: true
- win: false
- events: push_object:sticky#1 move_sticky_rigid

```text
#########
#G.C.#..#
##.BS..M#
#.G.@M.M#
#########
```

## Step 4: right

- legal: true
- win: false
- events: push_object:sticky#1 move_sticky_rigid sticky_merge:n1

```text
#########
#G.C.#..#
##.BS..M#
#.G..@MM#
#########
```

## Step 5: up

- legal: true
- win: false
- events: walk

```text
#########
#G.C.#..#
##.BS@.M#
#.G...MM#
#########
```

## Step 6: left

- legal: true
- win: false
- events: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1

```text
#########
#G.M.#..#
##BS@..M#
#.G...MM#
#########
```

## Step 7: up

- legal: true
- win: false
- events: walk

```text
#########
#G.M@#..#
##BS...M#
#.G...MM#
#########
```

## Step 8: left

- legal: true
- win: false
- events: push_object:sticky#1 move_sticky_rigid sticky_to_box:n1

```text
#########
#GC@.#..#
##BS...M#
#.G...MM#
#########
```

## Step 9: down

- legal: true
- win: false
- events: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky

```text
#########
#GC..#..#
##.@...M#
#.BS..MM#
#########
```

## Step 10: right

- legal: true
- win: false
- events: walk

```text
#########
#GC..#..#
##..@..M#
#.BS..MM#
#########
```

## Step 11: down

- legal: true
- win: false
- events: walk

```text
#########
#GC..#..#
##.....M#
#.BS@.MM#
#########
```

## Step 12: left

- legal: true
- win: false
- events: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1

```text
#########
#GM..#..#
##.....M#
#BS@..MM#
#########
```

## Step 13: up

- legal: true
- win: false
- events: walk

```text
#########
#GM..#..#
##.@...M#
#BS...MM#
#########
```

## Step 14: up

- legal: true
- win: false
- events: walk

```text
#########
#GM@.#..#
##.....M#
#BS...MM#
#########
```

## Step 15: left

- legal: true
- win: true
- events: push_object:sticky#1 move_sticky_rigid sticky_to_box:n1

```text
#########
#*@..#..#
##.....M#
#BS...MM#
#########
```
