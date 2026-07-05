# Trace: RA_EXP_2026_07_04_FIXED_PL_SPLIT_LIFT_v6_check

- Inputs: down left up left left down down up up
- Steps: 9

## Step 0: start

- legal: true
- win: false
- events: none

```text
###########
#P#....@###
#L##G#.B###
####.##S###
####m##.###
####M######
###########
```

## Step 1: down

- legal: true
- win: false
- events: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky

```text
###########
#P#.....###
#L##G#.@###
####.##B###
####m##S###
####M######
###########
```

## Step 2: left

- legal: true
- win: false
- events: walk

```text
###########
#P#.....###
#L##G#@.###
####.##B###
####m##S###
####M######
###########
```

## Step 3: up

- legal: true
- win: false
- events: walk

```text
###########
#P#...@.###
#L##G#..###
####.##B###
####m##S###
####M######
###########
```

## Step 4: left

- legal: true
- win: false
- events: walk

```text
###########
#P#..@..###
#L##G#..###
####.##B###
####m##S###
####M######
###########
```

## Step 5: left

- legal: true
- win: false
- events: walk

```text
###########
#P#.@...###
#L##G#..###
####.##B###
####m##S###
####M######
###########
```

## Step 6: down

- legal: true
- win: false
- events: walk

```text
###########
#P#.....###
#L##+#..###
####.##B###
####m##S###
####M######
###########
```

## Step 7: down

- legal: true
- win: false
- events: walk

```text
###########
#P#.....###
#L##G#..###
####@##B###
####m##S###
####M######
###########
```

## Step 8: up

- legal: true
- win: false
- events: pull_object:sticky#1 move_sticky_rigid sticky_to_box:n1

```text
###########
#P#.....###
#L##+#..###
####C##B###
####m##S###
####.######
###########
```

## Step 9: up

- legal: true
- win: true
- events: pull_object:crate#1

```text
###########
#P#.@...###
#L##*#..###
####.##B###
####m##S###
####.######
###########
```
