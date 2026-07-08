# Trace: RA_SCRATCH_BRIDGE_RELEASE_01_bypass_no_merge

- Inputs: up right down right right up left left down right right down left left down left left up
- Steps: 18

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

## Step 1: up

- legal: true
- win: false
- events: walk

```text
#########
#.+.M..##
#G.C...##
#.G.M..##
#.......#
###BS####
#########
```

## Step 2: right

- legal: true
- win: false
- events: walk

```text
#########
#.G@M..##
#G.C...##
#.G.M..##
#.......#
###BS####
#########
```

## Step 3: down

- legal: true
- win: false
- events: push_object:crate#1

```text
#########
#.G.M..##
#G.@...##
#.GCM..##
#.......#
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
#G..@..##
#.GCM..##
#.......#
###BS####
#########
```

## Step 5: right

- legal: true
- win: false
- events: walk

```text
#########
#.G.M..##
#G...@.##
#.GCM..##
#.......#
###BS####
#########
```

## Step 6: up

- legal: true
- win: false
- events: walk

```text
#########
#.G.M@.##
#G.....##
#.GCM..##
#.......#
###BS####
#########
```

## Step 7: left

- legal: true
- win: false
- events: push_object:sticky#1 move_sticky_rigid sticky_to_box:n1

```text
#########
#.GC@..##
#G.....##
#.GCM..##
#.......#
###BS####
#########
```

## Step 8: left

- legal: true
- win: false
- events: push_object:crate#1

```text
#########
#.*@...##
#G.....##
#.GCM..##
#.......#
###BS####
#########
```

## Step 9: down

- legal: true
- win: false
- events: walk

```text
#########
#.*....##
#G.@...##
#.GCM..##
#.......#
###BS####
#########
```

## Step 10: right

- legal: true
- win: false
- events: walk

```text
#########
#.*....##
#G..@..##
#.GCM..##
#.......#
###BS####
#########
```

## Step 11: right

- legal: true
- win: false
- events: walk

```text
#########
#.*....##
#G...@.##
#.GCM..##
#.......#
###BS####
#########
```

## Step 12: down

- legal: true
- win: false
- events: walk

```text
#########
#.*....##
#G.....##
#.GCM@.##
#.......#
###BS####
#########
```

## Step 13: left

- legal: true
- win: false
- events: push_object:sticky#1 force_chain:n2 move_sticky_rigid sticky_to_box:n1

```text
#########
#.*....##
#G.....##
#.*C@..##
#.......#
###BS####
#########
```

## Step 14: left

- legal: true
- win: false
- events: push_object:crate#3 force_chain:n2

```text
#########
#.*....##
#G.....##
#C*@...##
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
#G.....##
#C*....##
#..@....#
###BS####
#########
```

## Step 16: left

- legal: true
- win: false
- events: walk

```text
#########
#.*....##
#G.....##
#C*....##
#.@.....#
###BS####
#########
```

## Step 17: left

- legal: true
- win: false
- events: walk

```text
#########
#.*....##
#G.....##
#C*....##
#@......#
###BS####
#########
```

## Step 18: up

- legal: true
- win: true
- events: push_object:crate#2

```text
#########
#.*....##
#*.....##
#@*....##
#.......#
###BS####
#########
```
