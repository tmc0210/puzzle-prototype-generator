# Trace: RA_CURR_L11_hit2

- Inputs: right up up right down right right down left
- Steps: 9

## Step 0: start

- legal: true
- win: false
- events: none

```text
#########
#.#.BS.M#
##C..M..#
#.@.GM.##
#########
```

## Step 1: right

- legal: true
- win: false
- events: walk

```text
#########
#.#.BS.M#
##C..M..#
#..@GM.##
#########
```

## Step 2: up

- legal: true
- win: false
- events: walk

```text
#########
#.#.BS.M#
##C@.M..#
#...GM.##
#########
```

## Step 3: up

- legal: true
- win: false
- events: walk

```text
#########
#.#@BS.M#
##C..M..#
#...GM.##
#########
```

## Step 4: right

- legal: true
- win: false
- events: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n2

```text
#########
#.#.@BSM#
##C..C..#
#...GC.##
#########
```

## Step 5: down

- legal: true
- win: false
- events: walk

```text
#########
#.#..BSM#
##C.@C..#
#...GC.##
#########
```

## Step 6: right

- legal: true
- win: false
- events: push_object:crate#2 box_to_sticky:n1

```text
#########
#.#..BSM#
##C..@M.#
#...GC.##
#########
```

## Step 7: right

- legal: true
- win: false
- events: push_object:sticky#1 move_sticky_rigid sticky_merge:n1

```text
#########
#.#..BSM#
##C...@M#
#...GC.##
#########
```

## Step 8: down

- legal: true
- win: false
- events: walk

```text
#########
#.#..BSM#
##C....M#
#...GC@##
#########
```

## Step 9: left

- legal: true
- win: true
- events: push_object:crate#2

```text
#########
#.#..BSM#
##C....M#
#...*@.##
#########
```
