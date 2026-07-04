# Trace: RA_EXP_2026_07_04_FIXED_PL_VERTICAL_PAIR_v1

- Inputs: right down down left right right right
- Steps: 7

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
#...M..G..#
#....M.G..#
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
#...C..G..#
#....M.G..#
#.........#
###########
```

## Step 2: down

- legal: true
- win: false
- events: walk

```text
###########
####PL#####
###########
###.BS....#
######@...#
#...C..G..#
#....M.G..#
#.........#
###########
```

## Step 3: down

- legal: true
- win: false
- events: walk

```text
###########
####PL#####
###########
###.BS....#
######....#
#...C.@G..#
#....M.G..#
#.........#
###########
```

## Step 4: left

- legal: true
- win: false
- events: walk

```text
###########
####PL#####
###########
###.BS....#
######....#
#...C@.G..#
#....M.G..#
#.........#
###########
```

## Step 5: right

- legal: true
- win: false
- events: pull_object:crate#1 box_to_sticky:n1 sticky_merge:n1

```text
###########
####PL#####
###########
###.BS....#
######....#
#....M@G..#
#....M.G..#
#.........#
###########
```

## Step 6: right

- legal: true
- win: false
- events: pull_object:sticky#1 move_sticky_rigid

```text
###########
####PL#####
###########
###.BS....#
######....#
#.....M+..#
#.....MG..#
#.........#
###########
```

## Step 7: right

- legal: true
- win: true
- events: pull_object:sticky#1 move_sticky_rigid

```text
###########
####PL#####
###########
###.BS....#
######....#
#......m@.#
#......m..#
#.........#
###########
```
