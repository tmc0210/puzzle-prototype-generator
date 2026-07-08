# Trace: RA_LEX_2026_07_08_TRIBAR_CUT_TAIL_v1

- Inputs: down right right right down right right right right up left down left left left up right right right
- Steps: 19

## Step 0: start

- legal: true
- win: false
- events: none

```text
###########
#@.#G######
#.CCC....G#
####.....##
####BS#####
###########
```

## Step 1: down

- legal: true
- win: false
- events: walk

```text
###########
#..#G######
#@CCC....G#
####.....##
####BS#####
###########
```

## Step 2: right

- legal: true
- win: false
- events: push_object:crate#1 force_chain:n3 box_to_sticky:n1

```text
###########
#..#G######
#.@CCM...G#
####.....##
####BS#####
###########
```

## Step 3: right

- legal: true
- win: false
- events: push_object:crate#1 force_chain:n3 move_sticky_rigid box_to_sticky:n1 sticky_merge:n1

```text
###########
#..#G######
#..@CMM..G#
####.....##
####BS#####
###########
```

## Step 4: right

- legal: true
- win: false
- events: push_object:crate#1 force_chain:n2 move_sticky_rigid box_to_sticky:n1 sticky_merge:n1

```text
###########
#..#G######
#...@MMM.G#
####.....##
####BS#####
###########
```

## Step 5: down

- legal: true
- win: false
- events: walk

```text
###########
#..#G######
#....MMM.G#
####@....##
####BS#####
###########
```

## Step 6: right

- legal: true
- win: false
- events: walk

```text
###########
#..#G######
#....MMM.G#
####.@...##
####BS#####
###########
```

## Step 7: right

- legal: true
- win: false
- events: walk

```text
###########
#..#G######
#....MMM.G#
####..@..##
####BS#####
###########
```

## Step 8: right

- legal: true
- win: false
- events: walk

```text
###########
#..#G######
#....MMM.G#
####...@.##
####BS#####
###########
```

## Step 9: right

- legal: true
- win: false
- events: walk

```text
###########
#..#G######
#....MMM.G#
####....@##
####BS#####
###########
```

## Step 10: up

- legal: true
- win: false
- events: walk

```text
###########
#..#G######
#....MMM@G#
####.....##
####BS#####
###########
```

## Step 11: left

- legal: true
- win: false
- events: push_object:sticky#1 move_sticky_rigid sticky_to_box:n1

```text
###########
#..#G######
#...CMM@.G#
####.....##
####BS#####
###########
```

## Step 12: down

- legal: true
- win: false
- events: walk

```text
###########
#..#G######
#...CMM..G#
####...@.##
####BS#####
###########
```

## Step 13: left

- legal: true
- win: false
- events: walk

```text
###########
#..#G######
#...CMM..G#
####..@..##
####BS#####
###########
```

## Step 14: left

- legal: true
- win: false
- events: walk

```text
###########
#..#G######
#...CMM..G#
####.@...##
####BS#####
###########
```

## Step 15: left

- legal: true
- win: false
- events: walk

```text
###########
#..#G######
#...CMM..G#
####@....##
####BS#####
###########
```

## Step 16: up

- legal: true
- win: false
- events: push_object:crate#1

```text
###########
#..#*######
#...@MM..G#
####.....##
####BS#####
###########
```

## Step 17: right

- legal: true
- win: false
- events: push_object:sticky#1 move_sticky_rigid

```text
###########
#..#*######
#....@MM.G#
####.....##
####BS#####
###########
```

## Step 18: right

- legal: true
- win: false
- events: push_object:sticky#1 move_sticky_rigid

```text
###########
#..#*######
#.....@MMG#
####.....##
####BS#####
###########
```

## Step 19: right

- legal: true
- win: true
- events: push_object:sticky#1 move_sticky_rigid

```text
###########
#..#*######
#......@Mm#
####.....##
####BS#####
###########
```
