# Trace: RA_CURR_L11_TIMED_BAR_SPLIT_hit760201_563_TRACE

- Inputs: right right up left up left left left right right right down down left up left left up right
- Steps: 19

## Step 0: start

- legal: true
- win: false
- events: none

```text
##########
#..G.BSGM#
#..#..MM.#
##..##@..#
##########
```

## Step 1: right

- legal: true
- win: false
- events: walk

```text
##########
#..G.BSGM#
#..#..MM.#
##..##.@.#
##########
```

## Step 2: right

- legal: true
- win: false
- events: walk

```text
##########
#..G.BSGM#
#..#..MM.#
##..##..@#
##########
```

## Step 3: up

- legal: true
- win: false
- events: walk

```text
##########
#..G.BSGM#
#..#..MM@#
##..##...#
##########
```

## Step 4: left

- legal: true
- win: false
- events: push_object:sticky#1 move_sticky_rigid sticky_to_box:n1

```text
##########
#..G.BSGM#
#..#.CM@.#
##..##...#
##########
```

## Step 5: up

- legal: true
- win: false
- events: walk

```text
##########
#..G.BS+M#
#..#.CM..#
##..##...#
##########
```

## Step 6: left

- legal: true
- win: false
- events: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 sticky_merge:n1

```text
##########
#..GBS@GM#
#..#.MM..#
##..##...#
##########
```

## Step 7: left

- legal: true
- win: false
- events: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky

```text
##########
#..BS@.GM#
#..#.MM..#
##..##...#
##########
```

## Step 8: left

- legal: true
- win: false
- events: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky

```text
##########
#.BS@..GM#
#..#.MM..#
##..##...#
##########
```

## Step 9: right

- legal: true
- win: false
- events: walk

```text
##########
#.BS.@.GM#
#..#.MM..#
##..##...#
##########
```

## Step 10: right

- legal: true
- win: false
- events: walk

```text
##########
#.BS..@GM#
#..#.MM..#
##..##...#
##########
```

## Step 11: right

- legal: true
- win: false
- events: walk

```text
##########
#.BS...+M#
#..#.MM..#
##..##...#
##########
```

## Step 12: down

- legal: true
- win: false
- events: walk

```text
##########
#.BS...GM#
#..#.MM@.#
##..##...#
##########
```

## Step 13: down

- legal: true
- win: false
- events: walk

```text
##########
#.BS...GM#
#..#.MM..#
##..##.@.#
##########
```

## Step 14: left

- legal: true
- win: false
- events: walk

```text
##########
#.BS...GM#
#..#.MM..#
##..##@..#
##########
```

## Step 15: up

- legal: true
- win: false
- events: push_object:sticky#1 move_sticky_rigid

```text
##########
#.BS.MMGM#
#..#..@..#
##..##...#
##########
```

## Step 16: left

- legal: true
- win: false
- events: walk

```text
##########
#.BS.MMGM#
#..#.@...#
##..##...#
##########
```

## Step 17: left

- legal: true
- win: false
- events: walk

```text
##########
#.BS.MMGM#
#..#@....#
##..##...#
##########
```

## Step 18: up

- legal: true
- win: false
- events: walk

```text
##########
#.BS@MMGM#
#..#.....#
##..##...#
##########
```

## Step 19: right

- legal: true
- win: true
- events: push_object:sticky#1 move_sticky_rigid sticky_merge:n1

```text
##########
#.BS.@MmM#
#..#.....#
##..##...#
##########
```
