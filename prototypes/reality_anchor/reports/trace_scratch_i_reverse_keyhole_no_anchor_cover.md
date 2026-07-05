# Trace: scratch_i_reverse_keyhole_no_anchor_cover

- Inputs: left left left down down right down left left left up left down
- Steps: 13

## Step 0: start

- legal: true
- win: false
- events: none

```text
############
#.........@#
#....G.C...#
#....M.....#
#....SB....#
####G##....#
############
```

## Step 1: left

- legal: true
- win: false
- events: walk

```text
############
#........@.#
#....G.C...#
#....M.....#
#....SB....#
####G##....#
############
```

## Step 2: left

- legal: true
- win: false
- events: walk

```text
############
#.......@..#
#....G.C...#
#....M.....#
#....SB....#
####G##....#
############
```

## Step 3: left

- legal: true
- win: false
- events: walk

```text
############
#......@...#
#....G.C...#
#....M.....#
#....SB....#
####G##....#
############
```

## Step 4: down

- legal: true
- win: false
- events: push_object:crate#1

```text
############
#..........#
#....G.@...#
#....M.C...#
#....SB....#
####G##....#
############
```

## Step 5: down

- legal: true
- win: false
- events: push_object:crate#1

```text
############
#..........#
#....G.....#
#....M.@...#
#....SBC...#
####G##....#
############
```

## Step 6: right

- legal: true
- win: false
- events: walk

```text
############
#..........#
#....G.....#
#....M..@..#
#....SBC...#
####G##....#
############
```

## Step 7: down

- legal: true
- win: false
- events: walk

```text
############
#..........#
#....G.....#
#....M.....#
#....SBC@..#
####G##....#
############
```

## Step 8: left

- legal: true
- win: false
- events: push_object:crate#1 force_chain:n2 anchor_boundary_shift:box_sticky sticky_to_box:n1

```text
############
#..........#
#....G.....#
#....C.....#
#...SBC@...#
####G##....#
############
```

## Step 9: left

- legal: true
- win: false
- events: push_object:crate#2 force_chain:n2 anchor_boundary_shift:box_sticky

```text
############
#..........#
#....G.....#
#....C.....#
#..SBC@....#
####G##....#
############
```

## Step 10: left

- legal: true
- win: false
- events: push_object:crate#2 force_chain:n2 anchor_boundary_shift:box_sticky

```text
############
#..........#
#....G.....#
#....C.....#
#.SBC@.....#
####G##....#
############
```

## Step 11: up

- legal: true
- win: false
- events: push_object:crate#1

```text
############
#..........#
#....*.....#
#....@.....#
#.SBC......#
####G##....#
############
```

## Step 12: left

- legal: true
- win: false
- events: walk

```text
############
#..........#
#....*.....#
#...@......#
#.SBC......#
####G##....#
############
```

## Step 13: down

- legal: true
- win: true
- events: push_object:crate#2

```text
############
#..........#
#....*.....#
#..........#
#.SB@......#
####*##....#
############
```
