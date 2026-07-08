# Trace: RA_LEX_2026_07_08_TRIBAR_TOP_MOUTH_v2

- Inputs: down right right right down right right right right up left down left up down left left up
- Steps: 18

## Step 0: start

- legal: true
- win: false
- events: none

```text
###########
#@.#GG.####
#.CCC....##
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
#..#GG.####
#@CCC....##
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
#..#GG.####
#.@CCM...##
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
#..#GG.####
#..@CMM..##
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
#..#GG.####
#...@MMM.##
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
#..#GG.####
#....MMM.##
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
#..#GG.####
#....MMM.##
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
#..#GG.####
#....MMM.##
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
#..#GG.####
#....MMM.##
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
#..#GG.####
#....MMM.##
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
#..#GG.####
#....MMM@##
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
#..#GG.####
#...CMM@.##
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
#..#GG.####
#...CMM..##
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
#..#GG.####
#...CMM..##
####..@..##
####BS#####
###########
```

## Step 14: up

- legal: true
- win: false
- events: push_object:sticky#1 move_sticky_rigid

```text
###########
#..#GmM####
#...C.@..##
####.....##
####BS#####
###########
```

## Step 15: down

- legal: true
- win: false
- events: walk

```text
###########
#..#GmM####
#...C....##
####..@..##
####BS#####
###########
```

## Step 16: left

- legal: true
- win: false
- events: walk

```text
###########
#..#GmM####
#...C....##
####.@...##
####BS#####
###########
```

## Step 17: left

- legal: true
- win: false
- events: walk

```text
###########
#..#GmM####
#...C....##
####@....##
####BS#####
###########
```

## Step 18: up

- legal: true
- win: true
- events: push_object:crate#1

```text
###########
#..#*mM####
#...@....##
####.....##
####BS#####
###########
```
