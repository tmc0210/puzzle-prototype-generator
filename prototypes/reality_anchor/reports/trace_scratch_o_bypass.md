# Trace: scratch_o_bypass

- Inputs: left left down left left down down left left up down left right right right up up left left up left down down down
- Steps: 24

## Step 0: start

- legal: true
- win: false
- events: none

```text
############
#.........@#
#.G...C..#.#
#...M#.#####
#...SB.#####
###G##.....#
############
```

## Step 1: left

- legal: true
- win: false
- events: walk

```text
############
#........@.#
#.G...C..#.#
#...M#.#####
#...SB.#####
###G##.....#
############
```

## Step 2: left

- legal: true
- win: false
- events: walk

```text
############
#.......@..#
#.G...C..#.#
#...M#.#####
#...SB.#####
###G##.....#
############
```

## Step 3: down

- legal: true
- win: false
- events: walk

```text
############
#..........#
#.G...C.@#.#
#...M#.#####
#...SB.#####
###G##.....#
############
```

## Step 4: left

- legal: true
- win: false
- events: walk

```text
############
#..........#
#.G...C@.#.#
#...M#.#####
#...SB.#####
###G##.....#
############
```

## Step 5: left

- legal: true
- win: false
- events: push_object:crate#1

```text
############
#..........#
#.G..C@..#.#
#...M#.#####
#...SB.#####
###G##.....#
############
```

## Step 6: down

- legal: true
- win: false
- events: walk

```text
############
#..........#
#.G..C...#.#
#...M#@#####
#...SB.#####
###G##.....#
############
```

## Step 7: down

- legal: true
- win: false
- events: walk

```text
############
#..........#
#.G..C...#.#
#...M#.#####
#...SB@#####
###G##.....#
############
```

## Step 8: left

- legal: true
- win: false
- events: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1

```text
############
#..........#
#.G..C...#.#
#...C#.#####
#..SB@.#####
###G##.....#
############
```

## Step 9: left

- legal: true
- win: false
- events: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky

```text
############
#..........#
#.G..C...#.#
#...C#.#####
#.SB@..#####
###G##.....#
############
```

## Step 10: up

- legal: true
- win: false
- events: push_object:crate#2

```text
############
#..........#
#.G.CC...#.#
#...@#.#####
#.SB...#####
###G##.....#
############
```

## Step 11: down

- legal: true
- win: false
- events: walk

```text
############
#..........#
#.G.CC...#.#
#....#.#####
#.SB@..#####
###G##.....#
############
```

## Step 12: left

- legal: true
- win: false
- events: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky

```text
############
#..........#
#.G.CC...#.#
#....#.#####
#SB@...#####
###G##.....#
############
```

## Step 13: right

- legal: true
- win: false
- events: walk

```text
############
#..........#
#.G.CC...#.#
#....#.#####
#SB.@..#####
###G##.....#
############
```

## Step 14: right

- legal: true
- win: false
- events: walk

```text
############
#..........#
#.G.CC...#.#
#....#.#####
#SB..@.#####
###G##.....#
############
```

## Step 15: right

- legal: true
- win: false
- events: walk

```text
############
#..........#
#.G.CC...#.#
#....#.#####
#SB...@#####
###G##.....#
############
```

## Step 16: up

- legal: true
- win: false
- events: walk

```text
############
#..........#
#.G.CC...#.#
#....#@#####
#SB....#####
###G##.....#
############
```

## Step 17: up

- legal: true
- win: false
- events: walk

```text
############
#..........#
#.G.CC@..#.#
#....#.#####
#SB....#####
###G##.....#
############
```

## Step 18: left

- legal: true
- win: false
- events: push_object:crate#2 force_chain:n2

```text
############
#..........#
#.GCC@...#.#
#....#.#####
#SB....#####
###G##.....#
############
```

## Step 19: left

- legal: true
- win: false
- events: push_object:crate#2 force_chain:n2

```text
############
#..........#
#.*C@....#.#
#....#.#####
#SB....#####
###G##.....#
############
```

## Step 20: up

- legal: true
- win: false
- events: walk

```text
############
#...@......#
#.*C.....#.#
#....#.#####
#SB....#####
###G##.....#
############
```

## Step 21: left

- legal: true
- win: false
- events: walk

```text
############
#..@.......#
#.*C.....#.#
#....#.#####
#SB....#####
###G##.....#
############
```

## Step 22: down

- legal: true
- win: false
- events: push_object:crate#2

```text
############
#..........#
#.*@.....#.#
#..C.#.#####
#SB....#####
###G##.....#
############
```

## Step 23: down

- legal: true
- win: false
- events: push_object:crate#2

```text
############
#..........#
#.*......#.#
#..@.#.#####
#SBC...#####
###G##.....#
############
```

## Step 24: down

- legal: true
- win: true
- events: push_object:crate#2

```text
############
#..........#
#.*......#.#
#....#.#####
#SB@...#####
###*##.....#
############
```
