# Trace: RA_LEX_2026_07_06_VACATE_BIND_RETURN_v1_no_top_goal_replay_original

- Inputs: down left left down left right up up left right down right right up left left down down left up right down up left down right up
- Steps: 27

## Step 0: start

- legal: true
- win: false
- events: none

```text
#########
##M..M@.#
#.M.M..M#
#BSLP#.##
#.G..#..#
#########
```

## Step 1: down

- legal: true
- win: false
- events: walk

```text
#########
##M..M..#
#.M.M.@M#
#BSLP#.##
#.G..#..#
#########
```

## Step 2: left

- legal: true
- win: false
- events: walk

```text
#########
##M..M..#
#.M.M@.M#
#BSLP#.##
#.G..#..#
#########
```

## Step 3: left

- legal: true
- win: false
- events: push_object:sticky#2 move_sticky_rigid sticky_merge:n1

```text
#########
##M..M..#
#.MM@..M#
#BSLP#.##
#.G..#..#
#########
```

## Step 4: down

- legal: true
- win: false
- events: push_object:push_pull_anchor anchor_boundary_shift:push_pull

```text
#########
##M..M..#
#.MM...M#
#BS.@#.##
#.GLP#..#
#########
```

## Step 5: left

- legal: true
- win: false
- events: walk

```text
#########
##M..M..#
#.MM...M#
#BS@.#.##
#.GLP#..#
#########
```

## Step 6: right

- legal: true
- win: false
- events: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n2

```text
#########
##C..M..#
#.CM...M#
#.BS@#.##
#.GLP#..#
#########
```

## Step 7: up

- legal: true
- win: false
- events: walk

```text
#########
##C..M..#
#.CM@..M#
#.BS.#.##
#.GLP#..#
#########
```

## Step 8: up

- legal: true
- win: false
- events: walk

```text
#########
##C.@M..#
#.CM...M#
#.BS.#.##
#.GLP#..#
#########
```

## Step 9: left

- legal: true
- win: false
- events: walk

```text
#########
##C@.M..#
#.CM...M#
#.BS.#.##
#.GLP#..#
#########
```

## Step 10: right

- legal: true
- win: false
- events: pull_object:crate#1 box_to_sticky:n1 sticky_merge:n1

```text
#########
##.M@M..#
#.CM...M#
#.BS.#.##
#.GLP#..#
#########
```

## Step 11: down

- legal: true
- win: false
- events: walk

```text
#########
##.M.M..#
#.CM@..M#
#.BS.#.##
#.GLP#..#
#########
```

## Step 12: right

- legal: true
- win: false
- events: walk

```text
#########
##.M.M..#
#.CM.@.M#
#.BS.#.##
#.GLP#..#
#########
```

## Step 13: right

- legal: true
- win: false
- events: walk

```text
#########
##.M.M..#
#.CM..@M#
#.BS.#.##
#.GLP#..#
#########
```

## Step 14: up

- legal: true
- win: false
- events: walk

```text
#########
##.M.M@.#
#.CM...M#
#.BS.#.##
#.GLP#..#
#########
```

## Step 15: left

- legal: true
- win: false
- events: push_object:sticky#2 move_sticky_rigid sticky_merge:n1

```text
#########
##.MM@..#
#.CM...M#
#.BS.#.##
#.GLP#..#
#########
```

## Step 16: left

- legal: true
- win: false
- events: push_object:sticky#1 force_chain:n2 move_sticky_rigid sticky_to_box:n2

```text
#########
##CM@...#
#CC....M#
#.BS.#.##
#.GLP#..#
#########
```

## Step 17: down

- legal: true
- win: false
- events: walk

```text
#########
##CM....#
#CC.@..M#
#.BS.#.##
#.GLP#..#
#########
```

## Step 18: down

- legal: true
- win: false
- events: walk

```text
#########
##CM....#
#CC....M#
#.BS@#.##
#.GLP#..#
#########
```

## Step 19: left

- legal: true
- win: false
- events: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n2 sticky_merge:n1

```text
#########
##MM....#
#CM....M#
#BS@.#.##
#.GLP#..#
#########
```

## Step 20: up

- legal: true
- win: false
- events: pull_object:push_pull_anchor anchor_boundary_shift:push_pull

```text
#########
##MM....#
#CM@...M#
#BSLP#.##
#.G..#..#
#########
```

## Step 21: right

- legal: true
- win: false
- events: pull_object:sticky#1 move_sticky_rigid

```text
#########
##.MM...#
#C.M@..M#
#BSLP#.##
#.G..#..#
#########
```

## Step 22: down

- legal: true
- win: false
- events: push_object:push_pull_anchor anchor_boundary_shift:push_pull

```text
#########
##.MM...#
#C.M...M#
#BS.@#.##
#.GLP#..#
#########
```

## Step 23: up

- legal: true
- win: false
- events: walk

```text
#########
##.MM...#
#C.M@..M#
#BS..#.##
#.GLP#..#
#########
```

## Step 24: left

- legal: true
- win: false
- events: push_object:sticky#1 move_sticky_rigid

```text
#########
##MM....#
#CM@...M#
#BS..#.##
#.GLP#..#
#########
```

## Step 25: down

- legal: true
- win: true
- events: pull_object:sticky#1 force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid

```text
#########
##......#
#CMM...M#
#.M@.#.##
#BSLP#..#
#########
```

## Step 26: right

- legal: true
- win: true
- events: pull_object:sticky#1 move_sticky_rigid

```text
#########
##......#
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
##.MM...#
#C.M@..M#
#....#.##
#BSLP#..#
#########
```
