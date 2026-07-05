# Trace: RA_CURR_L12_SCRATCHA

- Inputs: left left left down down up up
- Steps: 7

## Step 0: start

- legal: true
- win: false
- events: none

```text
###########
#P#....@###
#L##G#..###
####.##B###
####m##S###
####M######
###########
```

## Step 1: left

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

## Step 2: left

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

## Step 3: left

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

## Step 4: down

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

## Step 5: down

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

## Step 6: up

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

## Step 7: up

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
