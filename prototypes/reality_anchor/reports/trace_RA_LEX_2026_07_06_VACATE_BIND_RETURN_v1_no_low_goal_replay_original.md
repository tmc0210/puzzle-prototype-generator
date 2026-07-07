# Trace: RA_LEX_2026_07_06_VACATE_BIND_RETURN_v1_no_low_goal_replay_original

- Inputs: down left left down left right up up left right down right right up left left down down left up right down up left down right up
- Steps: 27

## Step 0: start

- legal: true
- win: false
- events: none

```text
#########
##MG.M@.#
#.M.M..M#
#BSLP#.##
#....#..#
#########
```

## Step 1: down

- legal: true
- win: false
- events: walk

```text
#########
##MG.M..#
#.M.M.@M#
#BSLP#.##
#....#..#
#########
```

## Step 2: left

- legal: true
- win: false
- events: walk

```text
#########
##MG.M..#
#.M.M@.M#
#BSLP#.##
#....#..#
#########
```

## Step 3: left

- legal: true
- win: false
- events: push_object:sticky#2 move_sticky_rigid sticky_merge:n1

```text
#########
##MG.M..#
#.MM@..M#
#BSLP#.##
#....#..#
#########
```

## Step 4: down

- legal: true
- win: false
- events: push_object:push_pull_anchor anchor_boundary_shift:push_pull

```text
#########
##MG.M..#
#.MM...M#
#BS.@#.##
#..LP#..#
#########
```

## Step 5: left

- legal: true
- win: false
- events: walk

```text
#########
##MG.M..#
#.MM...M#
#BS@.#.##
#..LP#..#
#########
```

## Step 6: right

- legal: true
- win: false
- events: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n2

```text
#########
##CG.M..#
#.CM...M#
#.BS@#.##
#..LP#..#
#########
```

## Step 7: up

- legal: true
- win: false
- events: walk

```text
#########
##CG.M..#
#.CM@..M#
#.BS.#.##
#..LP#..#
#########
```

## Step 8: up

- legal: true
- win: false
- events: walk

```text
#########
##CG@M..#
#.CM...M#
#.BS.#.##
#..LP#..#
#########
```

## Step 9: left

- legal: true
- win: false
- events: walk

```text
#########
##C+.M..#
#.CM...M#
#.BS.#.##
#..LP#..#
#########
```

## Step 10: right

- legal: true
- win: true
- events: pull_object:crate#1 box_to_sticky:n1 sticky_merge:n1

```text
#########
##.m@M..#
#.CM...M#
#.BS.#.##
#..LP#..#
#########
```

## Step 11: down

- legal: true
- win: true
- events: walk

```text
#########
##.m.M..#
#.CM@..M#
#.BS.#.##
#..LP#..#
#########
```

## Step 12: right

- legal: true
- win: true
- events: walk

```text
#########
##.m.M..#
#.CM.@.M#
#.BS.#.##
#..LP#..#
#########
```

## Step 13: right

- legal: true
- win: true
- events: walk

```text
#########
##.m.M..#
#.CM..@M#
#.BS.#.##
#..LP#..#
#########
```

## Step 14: up

- legal: true
- win: true
- events: walk

```text
#########
##.m.M@.#
#.CM...M#
#.BS.#.##
#..LP#..#
#########
```

## Step 15: left

- legal: true
- win: true
- events: push_object:sticky#2 move_sticky_rigid sticky_merge:n1

```text
#########
##.mM@..#
#.CM...M#
#.BS.#.##
#..LP#..#
#########
```

## Step 16: left

- legal: true
- win: true
- events: push_object:sticky#1 force_chain:n2 move_sticky_rigid sticky_to_box:n2

```text
#########
##Cm@...#
#CC....M#
#.BS.#.##
#..LP#..#
#########
```

## Step 17: down

- legal: true
- win: true
- events: walk

```text
#########
##Cm....#
#CC.@..M#
#.BS.#.##
#..LP#..#
#########
```

## Step 18: down

- legal: true
- win: true
- events: walk

```text
#########
##Cm....#
#CC....M#
#.BS@#.##
#..LP#..#
#########
```

## Step 19: left

- legal: true
- win: true
- events: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n2 sticky_merge:n1

```text
#########
##Mm....#
#CM....M#
#BS@.#.##
#..LP#..#
#########
```

## Step 20: up

- legal: true
- win: true
- events: pull_object:push_pull_anchor anchor_boundary_shift:push_pull

```text
#########
##Mm....#
#CM@...M#
#BSLP#.##
#....#..#
#########
```

## Step 21: right

- legal: true
- win: true
- events: pull_object:sticky#1 move_sticky_rigid

```text
#########
##.mM...#
#C.M@..M#
#BSLP#.##
#....#..#
#########
```

## Step 22: down

- legal: true
- win: true
- events: push_object:push_pull_anchor anchor_boundary_shift:push_pull

```text
#########
##.mM...#
#C.M...M#
#BS.@#.##
#..LP#..#
#########
```

## Step 23: up

- legal: true
- win: true
- events: walk

```text
#########
##.mM...#
#C.M@..M#
#BS..#.##
#..LP#..#
#########
```

## Step 24: left

- legal: true
- win: true
- events: push_object:sticky#1 move_sticky_rigid

```text
#########
##Mm....#
#CM@...M#
#BS..#.##
#..LP#..#
#########
```

## Step 25: down

- legal: true
- win: false
- events: pull_object:sticky#1 force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid

```text
#########
##.G....#
#CMM...M#
#.M@.#.##
#BSLP#..#
#########
```

## Step 26: right

- legal: true
- win: false
- events: pull_object:sticky#1 move_sticky_rigid

```text
#########
##.G....#
#C.MM..M#
#..M@#.##
#BSLP#..#
#########
```

## Step 27: up

- legal: true
- win: true
- events: push_object:sticky#1 move_sticky_rigid

```text
#########
##.mM...#
#C.M@..M#
#....#.##
#BSLP#..#
#########
```
