# Trace: scratch_l_reverse_keyhole_force_join

- Inputs: left left left left down right right up right down down right down left left left left left up left down
- Steps: 21

## Step 0: start

- legal: true
- win: false
- events: none

```text
############
#.........@#
#....G.C...#
#....M###..#
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
#....M###..#
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
#....M###..#
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
#....M###..#
#....SB....#
####G##....#
############
```

## Step 4: left

- legal: true
- win: false
- events: walk

```text
############
#.....@....#
#....G.C...#
#....M###..#
#....SB....#
####G##....#
############
```

## Step 5: down

- legal: true
- win: false
- events: walk

```text
############
#..........#
#....G@C...#
#....M###..#
#....SB....#
####G##....#
############
```

## Step 6: right

- legal: true
- win: false
- events: push_object:crate#1

```text
############
#..........#
#....G.@C..#
#....M###..#
#....SB....#
####G##....#
############
```

## Step 7: right

- legal: true
- win: false
- events: push_object:crate#1

```text
############
#..........#
#....G..@C.#
#....M###..#
#....SB....#
####G##....#
############
```

## Step 8: up

- legal: true
- win: false
- events: walk

```text
############
#.......@..#
#....G...C.#
#....M###..#
#....SB....#
####G##....#
############
```

## Step 9: right

- legal: true
- win: false
- events: walk

```text
############
#........@.#
#....G...C.#
#....M###..#
#....SB....#
####G##....#
############
```

## Step 10: down

- legal: true
- win: false
- events: push_object:crate#1

```text
############
#..........#
#....G...@.#
#....M###C.#
#....SB....#
####G##....#
############
```

## Step 11: down

- legal: true
- win: false
- events: push_object:crate#1

```text
############
#..........#
#....G.....#
#....M###@.#
#....SB..C.#
####G##....#
############
```

## Step 12: right

- legal: true
- win: false
- events: walk

```text
############
#..........#
#....G.....#
#....M###.@#
#....SB..C.#
####G##....#
############
```

## Step 13: down

- legal: true
- win: false
- events: walk

```text
############
#..........#
#....G.....#
#....M###..#
#....SB..C@#
####G##....#
############
```

## Step 14: left

- legal: true
- win: false
- events: push_object:crate#1

```text
############
#..........#
#....G.....#
#....M###..#
#....SB.C@.#
####G##....#
############
```

## Step 15: left

- legal: true
- win: false
- events: push_object:crate#1

```text
############
#..........#
#....G.....#
#....M###..#
#....SBC@..#
####G##....#
############
```

## Step 16: left

- legal: true
- win: false
- events: push_object:crate#1 force_chain:n2 anchor_boundary_shift:box_sticky sticky_to_box:n1

```text
############
#..........#
#....G.....#
#....C###..#
#...SBC@...#
####G##....#
############
```

## Step 17: left

- legal: true
- win: false
- events: push_object:crate#2 force_chain:n2 anchor_boundary_shift:box_sticky

```text
############
#..........#
#....G.....#
#....C###..#
#..SBC@....#
####G##....#
############
```

## Step 18: left

- legal: true
- win: false
- events: push_object:crate#2 force_chain:n2 anchor_boundary_shift:box_sticky

```text
############
#..........#
#....G.....#
#....C###..#
#.SBC@.....#
####G##....#
############
```

## Step 19: up

- legal: true
- win: false
- events: push_object:crate#1

```text
############
#..........#
#....*.....#
#....@###..#
#.SBC......#
####G##....#
############
```

## Step 20: left

- legal: true
- win: false
- events: walk

```text
############
#..........#
#....*.....#
#...@.###..#
#.SBC......#
####G##....#
############
```

## Step 21: down

- legal: true
- win: true
- events: push_object:crate#2

```text
############
#..........#
#....*.....#
#.....###..#
#.SB@......#
####*##....#
############
```
