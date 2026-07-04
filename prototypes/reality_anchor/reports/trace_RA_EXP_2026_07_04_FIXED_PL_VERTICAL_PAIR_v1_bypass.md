# Trace: RA_EXP_2026_07_04_FIXED_PL_VERTICAL_PAIR_v1_bypass

- Inputs: right right right down left down down left right right
- Steps: 10

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

## Step 2: right

- legal: true
- win: false
- events: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1

```text
###########
####PL#####
###########
###..BS@..#
######....#
#...C..G..#
#....C.G..#
#.........#
###########
```

## Step 3: right

- legal: true
- win: false
- events: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky

```text
###########
####PL#####
###########
###...BS@.#
######....#
#...C..G..#
#....C.G..#
#.........#
###########
```

## Step 4: down

- legal: true
- win: false
- events: walk

```text
###########
####PL#####
###########
###...BS..#
######..@.#
#...C..G..#
#....C.G..#
#.........#
###########
```

## Step 5: left

- legal: true
- win: false
- events: walk

```text
###########
####PL#####
###########
###...BS..#
######.@..#
#...C..G..#
#....C.G..#
#.........#
###########
```

## Step 6: down

- legal: true
- win: false
- events: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky

```text
###########
####PL#####
###########
###.......#
######BS..#
#...C..+..#
#....C.G..#
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
######....#
#...C.BS..#
#....C.+..#
#.........#
###########
```

## Step 8: left

- legal: true
- win: false
- events: walk

```text
###########
####PL#####
###########
###.......#
######....#
#...C.BS..#
#....C@G..#
#.........#
###########
```

## Step 9: right

- legal: true
- win: false
- events: pull_object:crate#2

```text
###########
####PL#####
###########
###.......#
######....#
#...C.BS..#
#.....C+..#
#.........#
###########
```

## Step 10: right

- legal: true
- win: true
- events: pull_object:crate#2 box_to_sticky:n1

```text
###########
####PL#####
###########
###.......#
######....#
#...C.BS..#
#......m@.#
#.........#
###########
```
