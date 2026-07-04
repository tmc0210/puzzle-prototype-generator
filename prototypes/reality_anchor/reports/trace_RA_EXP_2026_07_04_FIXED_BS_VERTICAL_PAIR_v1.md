# Trace: RA_EXP_2026_07_04_FIXED_BS_VERTICAL_PAIR_v1

- Inputs: right right down down right right up right right right
- Steps: 10

## Step 0: start

- legal: true
- win: false
- events: none

```text
###########
####BS#####
###########
#@PLG.....#
#...C..G..#
#....M.G..#
#.........#
###########
```

## Step 1: right

- legal: true
- win: false
- events: push_object:push_pull_anchor anchor_boundary_shift:push_pull

```text
###########
####BS#####
###########
#.@PL.....#
#...C..G..#
#....M.G..#
#.........#
###########
```

## Step 2: right

- legal: true
- win: false
- events: push_object:push_pull_anchor anchor_boundary_shift:push_pull

```text
###########
####BS#####
###########
#..@PL....#
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
####BS#####
###########
#...PL....#
#..@C..G..#
#....M.G..#
#.........#
###########
```

## Step 4: down

- legal: true
- win: false
- events: walk

```text
###########
####BS#####
###########
#...PL....#
#...C..G..#
#..@.M.G..#
#.........#
###########
```

## Step 5: right

- legal: true
- win: false
- events: walk

```text
###########
####BS#####
###########
#...PL....#
#...C..G..#
#...@M.G..#
#.........#
###########
```

## Step 6: right

- legal: true
- win: false
- events: push_object:sticky#1 move_sticky_rigid

```text
###########
####BS#####
###########
#...PL....#
#...C..G..#
#....@MG..#
#.........#
###########
```

## Step 7: up

- legal: true
- win: false
- events: walk

```text
###########
####BS#####
###########
#...PL....#
#...C@.G..#
#.....MG..#
#.........#
###########
```

## Step 8: right

- legal: true
- win: false
- events: pull_object:crate#1 box_to_sticky:n1

```text
###########
####BS#####
###########
#...PL....#
#....M@G..#
#.....MG..#
#.........#
###########
```

## Step 9: right

- legal: true
- win: false
- events: pull_object:sticky#1 move_sticky_rigid sticky_merge:n1

```text
###########
####BS#####
###########
#...PL....#
#.....M+..#
#.....MG..#
#.........#
###########
```

## Step 10: right

- legal: true
- win: true
- events: pull_object:sticky#1 move_sticky_rigid

```text
###########
####BS#####
###########
#...PL....#
#......m@.#
#......m..#
#.........#
###########
```
