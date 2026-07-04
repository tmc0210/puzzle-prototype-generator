# Trace: RA_EXP_2026_07_04_FIXED_PL_PULL_HANDLE_v1

- Inputs: right right down right
- Steps: 4

## Step 0: start

- legal: true
- win: false
- events: none

```text
##########
####PL####
##########
###BS@...#
#...M.MG.#
#........#
##########
```

## Step 1: right

- legal: true
- win: false
- events: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1

```text
##########
####PL####
##########
###.BS@..#
#...C.MG.#
#........#
##########
```

## Step 2: right

- legal: true
- win: false
- events: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky

```text
##########
####PL####
##########
###..BS@.#
#...C.MG.#
#........#
##########
```

## Step 3: down

- legal: true
- win: false
- events: walk

```text
##########
####PL####
##########
###..BS..#
#...C.M+.#
#........#
##########
```

## Step 4: right

- legal: true
- win: true
- events: pull_object:sticky#1 move_sticky_rigid

```text
##########
####PL####
##########
###..BS..#
#...C..m@#
#........#
##########
```
