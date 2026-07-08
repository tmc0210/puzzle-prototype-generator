# Trace: RA_SCRATCH_BRIDGE_RELEASE_01

- Inputs: down down right right up right up up left left down left right right down left
- Steps: 16

## Step 0: start

- legal: true
- win: false
- events: none

```text
#########
#.G.M..##
#G@C...##
#.G.M..##
#.......#
###BS####
#########
```

## Step 1: down

- legal: true
- win: false
- events: walk

```text
#########
#.G.M..##
#G.C...##
#.+.M..##
#.......#
###BS####
#########
```

## Step 2: down

- legal: true
- win: false
- events: walk

```text
#########
#.G.M..##
#G.C...##
#.G.M..##
#.@.....#
###BS####
#########
```

## Step 3: right

- legal: true
- win: false
- events: walk

```text
#########
#.G.M..##
#G.C...##
#.G.M..##
#..@....#
###BS####
#########
```

## Step 4: right

- legal: true
- win: false
- events: walk

```text
#########
#.G.M..##
#G.C...##
#.G.M..##
#...@...#
###BS####
#########
```

## Step 5: up

- legal: true
- win: false
- events: push_object:sticky#2 move_sticky_rigid sticky_merge:n1

```text
#########
#.G.M..##
#G.CM..##
#.G.@..##
#.......#
###BS####
#########
```

## Step 6: right

- legal: true
- win: false
- events: walk

```text
#########
#.G.M..##
#G.CM..##
#.G..@.##
#.......#
###BS####
#########
```

## Step 7: up

- legal: true
- win: false
- events: walk

```text
#########
#.G.M..##
#G.CM@.##
#.G....##
#.......#
###BS####
#########
```

## Step 8: up

- legal: true
- win: false
- events: walk

```text
#########
#.G.M@.##
#G.CM..##
#.G....##
#.......#
###BS####
#########
```

## Step 9: left

- legal: true
- win: false
- events: push_object:sticky#1 force_chain:n2 move_sticky_rigid sticky_to_box:n2

```text
#########
#.GC@..##
#GCC...##
#.G....##
#.......#
###BS####
#########
```

## Step 10: left

- legal: true
- win: false
- events: push_object:crate#1

```text
#########
#.*@...##
#GCC...##
#.G....##
#.......#
###BS####
#########
```

## Step 11: down

- legal: true
- win: false
- events: push_object:crate#3

```text
#########
#.*....##
#GC@...##
#.GC...##
#.......#
###BS####
#########
```

## Step 12: left

- legal: true
- win: false
- events: push_object:crate#2

```text
#########
#.*....##
#*@....##
#.GC...##
#.......#
###BS####
#########
```

## Step 13: right

- legal: true
- win: false
- events: walk

```text
#########
#.*....##
#*.@...##
#.GC...##
#.......#
###BS####
#########
```

## Step 14: right

- legal: true
- win: false
- events: walk

```text
#########
#.*....##
#*..@..##
#.GC...##
#.......#
###BS####
#########
```

## Step 15: down

- legal: true
- win: false
- events: walk

```text
#########
#.*....##
#*.....##
#.GC@..##
#.......#
###BS####
#########
```

## Step 16: left

- legal: true
- win: true
- events: push_object:crate#3

```text
#########
#.*....##
#*.....##
#.*@...##
#.......#
###BS####
#########
```
