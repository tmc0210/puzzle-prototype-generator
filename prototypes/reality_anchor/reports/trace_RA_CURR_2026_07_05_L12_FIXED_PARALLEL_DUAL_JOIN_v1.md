# Trace: RA_CURR_2026_07_05_L12_FIXED_PARALLEL_DUAL_JOIN_v1

- Inputs: down right down right right
- Steps: 5

## Step 0: start

- legal: true
- win: false
- events: none

```text
###########
##..@..####
#P#.C..#B##
#L#...G.S##
##..M.G.###
###########
```

## Step 1: down

- legal: true
- win: false
- events: push_object:crate#1 box_to_sticky:n1 sticky_merge:n1

```text
###########
##.....####
#P#.@..#B##
#L#.M.G.S##
##..M.G.###
###########
```

## Step 2: right

- legal: true
- win: false
- events: walk

```text
###########
##.....####
#P#..@.#B##
#L#.M.G.S##
##..M.G.###
###########
```

## Step 3: down

- legal: true
- win: false
- events: walk

```text
###########
##.....####
#P#....#B##
#L#.M@G.S##
##..M.G.###
###########
```

## Step 4: right

- legal: true
- win: false
- events: pull_object:sticky#1 move_sticky_rigid

```text
###########
##.....####
#P#....#B##
#L#..M+.S##
##...MG.###
###########
```

## Step 5: right

- legal: true
- win: true
- events: pull_object:sticky#1 move_sticky_rigid

```text
###########
##.....####
#P#....#B##
#L#...m@S##
##....m.###
###########
```
