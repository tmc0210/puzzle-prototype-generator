# Trace: scratch_m_reverse_keyhole_force_join_no_right_drop

- Inputs: down down down left left left left left up down left up up up right right right right down left left up left left down down down
- Steps: 27

## Step 0: start

- legal: true
- win: false
- events: none

```text
############
#.........@#
#....G.C.#.#
#....M###..#
#....SB....#
####G##....#
############
```

## Step 1: down

- legal: true
- win: false
- events: walk

```text
############
#..........#
#....G.C.#@#
#....M###..#
#....SB....#
####G##....#
############
```

## Step 2: down

- legal: true
- win: false
- events: walk

```text
############
#..........#
#....G.C.#.#
#....M###.@#
#....SB....#
####G##....#
############
```

## Step 3: down

- legal: true
- win: false
- events: walk

```text
############
#..........#
#....G.C.#.#
#....M###..#
#....SB...@#
####G##....#
############
```

## Step 4: left

- legal: true
- win: false
- events: walk

```text
############
#..........#
#....G.C.#.#
#....M###..#
#....SB..@.#
####G##....#
############
```

## Step 5: left

- legal: true
- win: false
- events: walk

```text
############
#..........#
#....G.C.#.#
#....M###..#
#....SB.@..#
####G##....#
############
```

## Step 6: left

- legal: true
- win: false
- events: walk

```text
############
#..........#
#....G.C.#.#
#....M###..#
#....SB@...#
####G##....#
############
```

## Step 7: left

- legal: true
- win: false
- events: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1

```text
############
#..........#
#....G.C.#.#
#....C###..#
#...SB@....#
####G##....#
############
```

## Step 8: left

- legal: true
- win: false
- events: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky

```text
############
#..........#
#....G.C.#.#
#....C###..#
#..SB@.....#
####G##....#
############
```

## Step 9: up

- legal: true
- win: false
- events: push_object:crate#2

```text
############
#..........#
#....*.C.#.#
#....@###..#
#..SB......#
####G##....#
############
```

## Step 10: down

- legal: true
- win: false
- events: walk

```text
############
#..........#
#....*.C.#.#
#.....###..#
#..SB@.....#
####G##....#
############
```

## Step 11: left

- legal: true
- win: false
- events: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky

```text
############
#..........#
#....*.C.#.#
#.....###..#
#.SB@......#
####G##....#
############
```

## Step 12: up

- legal: true
- win: false
- events: walk

```text
############
#..........#
#....*.C.#.#
#...@.###..#
#.SB.......#
####G##....#
############
```

## Step 13: up

- legal: true
- win: false
- events: walk

```text
############
#..........#
#...@*.C.#.#
#.....###..#
#.SB.......#
####G##....#
############
```

## Step 14: up

- legal: true
- win: false
- events: walk

```text
############
#...@......#
#....*.C.#.#
#.....###..#
#.SB.......#
####G##....#
############
```

## Step 15: right

- legal: true
- win: false
- events: walk

```text
############
#....@.....#
#....*.C.#.#
#.....###..#
#.SB.......#
####G##....#
############
```

## Step 16: right

- legal: true
- win: false
- events: walk

```text
############
#.....@....#
#....*.C.#.#
#.....###..#
#.SB.......#
####G##....#
############
```

## Step 17: right

- legal: true
- win: false
- events: walk

```text
############
#......@...#
#....*.C.#.#
#.....###..#
#.SB.......#
####G##....#
############
```

## Step 18: right

- legal: true
- win: false
- events: walk

```text
############
#.......@..#
#....*.C.#.#
#.....###..#
#.SB.......#
####G##....#
############
```

## Step 19: down

- legal: true
- win: false
- events: walk

```text
############
#..........#
#....*.C@#.#
#.....###..#
#.SB.......#
####G##....#
############
```

## Step 20: left

- legal: true
- win: false
- events: push_object:crate#2

```text
############
#..........#
#....*C@.#.#
#.....###..#
#.SB.......#
####G##....#
############
```

## Step 21: left

- legal: true
- win: false
- events: push_object:crate#2 force_chain:n2

```text
############
#..........#
#...C*@..#.#
#.....###..#
#.SB.......#
####G##....#
############
```

## Step 22: up

- legal: true
- win: false
- events: walk

```text
############
#.....@....#
#...C*...#.#
#.....###..#
#.SB.......#
####G##....#
############
```

## Step 23: left

- legal: true
- win: false
- events: walk

```text
############
#....@.....#
#...C*...#.#
#.....###..#
#.SB.......#
####G##....#
############
```

## Step 24: left

- legal: true
- win: false
- events: walk

```text
############
#...@......#
#...C*...#.#
#.....###..#
#.SB.......#
####G##....#
############
```

## Step 25: down

- legal: true
- win: false
- events: push_object:crate#1

```text
############
#..........#
#...@*...#.#
#...C.###..#
#.SB.......#
####G##....#
############
```

## Step 26: down

- legal: true
- win: false
- events: push_object:crate#2

```text
############
#..........#
#....*...#.#
#...@.###..#
#.SBC......#
####G##....#
############
```

## Step 27: down

- legal: true
- win: true
- events: push_object:crate#2

```text
############
#..........#
#....*...#.#
#.....###..#
#.SB@......#
####*##....#
############
```
