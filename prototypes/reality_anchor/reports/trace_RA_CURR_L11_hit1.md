# Trace: RA_CURR_L11_hit1

- Inputs: down right right right up left up left left down
- Steps: 10

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

## Step 9: left

- legal: true
- win: false
- events: push_object:crate#1

```text
#########
#*@..#..#
##BS...M#
#.G...MM#
#########
```

## Step 10: down

- legal: true
- win: true
- events: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky

```text
#########
#*...#..#
##@....M#
#.BS..MM#
#########
```
