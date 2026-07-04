# Trace: RA_EXP_2026_07_04_FIXED_PL_PULL_HANDLE_v4

- Inputs: right right right right down left down down
- Steps: 8

## Step 0: start

- legal: true
- win: false
- events: none

```text
###########
####PL#####
###########
###BS@....#
######....#
#...M.MGG.#
#.........#
###########
```

## Step 1: right

- legal: true
- win: false
- events: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1

```text
###########
####PL#####
###########
###.BS@...#
######....#
#...C.MGG.#
#.........#
###########
```

## Step 2: right

- legal: true
- win: false
- events: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky

```text
###########
####PL#####
###########
###..BS@..#
######....#
#...C.MGG.#
#.........#
###########
```

## Step 3: right

- legal: true
- win: false
- events: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1

```text
###########
####PL#####
###########
###...BS@.#
######....#
#...C.CGG.#
#.........#
###########
```

## Step 4: right

- legal: true
- win: false
- events: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky

```text
###########
####PL#####
###########
###....BS@#
######....#
#...C.CGG.#
#.........#
###########
```

## Step 5: down

- legal: true
- win: false
- events: walk

```text
###########
####PL#####
###########
###....BS.#
######...@#
#...C.CGG.#
#.........#
###########
```

## Step 6: left

- legal: true
- win: false
- events: walk

```text
###########
####PL#####
###########
###....BS.#
######..@.#
#...C.CGG.#
#.........#
###########
```

## Step 7: down

- legal: true
- win: false
- events: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky

```text
###########
####PL#####
###########
###.......#
######.BS.#
#...C.CG+.#
#.........#
###########
```

## Step 8: down

- legal: true
- win: true
- events: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky

```text
###########
####PL#####
###########
###.......#
######....#
#...C.CBS.#
#.......@.#
###########
```
