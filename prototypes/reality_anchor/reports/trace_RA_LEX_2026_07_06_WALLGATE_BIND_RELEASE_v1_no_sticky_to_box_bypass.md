# Trace: RA_LEX_2026_07_06_WALLGATE_BIND_RELEASE_v1_no_sticky_to_box_bypass

- Inputs: up right right down up up left down up right down down left left left left up left down right up right down right right right right down left up up up right down left down left left left left up right right
- Steps: 43

## Step 0: start

- legal: true
- win: false
- events: none

```text
#########
#CG#...P#
#..C..GL#
#...@M..#
##.BS.M.#
#########
```

## Step 1: up

- legal: true
- win: false
- events: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky

```text
#########
#CG#...P#
#..C@.GL#
#..BSM..#
##....M.#
#########
```

## Step 2: right

- legal: true
- win: false
- events: pull_object:crate#2 box_to_sticky:n1

```text
#########
#CG#...P#
#...M@GL#
#..BSM..#
##....M.#
#########
```

## Step 3: right

- legal: true
- win: false
- events: pull_object:sticky#1 move_sticky_rigid sticky_merge:n1

```text
#########
#CG#...P#
#....M+L#
#..BSM..#
##....M.#
#########
```

## Step 4: down

- legal: true
- win: false
- events: walk

```text
#########
#CG#...P#
#....MGL#
#..BSM@.#
##....M.#
#########
```

## Step 5: up

- legal: true
- win: false
- events: pull_object:sticky#2 move_sticky_rigid sticky_merge:n1

```text
#########
#CG#...P#
#....M+L#
#..BSMM.#
##......#
#########
```

## Step 6: up

- legal: true
- win: false
- events: pull_object:sticky#1 move_sticky_rigid

```text
#########
#CG#.M@P#
#....MmL#
#..BS...#
##......#
#########
```

## Step 7: left

- legal: true
- win: false
- events: push_object:sticky#1 move_sticky_rigid

```text
#########
#CG#M@.P#
#...MMGL#
#..BS...#
##......#
#########
```

## Step 8: down

- legal: true
- win: false
- events: push_object:sticky#1 force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid

```text
#########
#CG#...P#
#...M@GL#
#...MM..#
##.BS...#
#########
```

## Step 9: up

- legal: true
- win: false
- events: pull_object:sticky#1 move_sticky_rigid

```text
#########
#CG#M@.P#
#...MMGL#
#.......#
##.BS...#
#########
```

## Step 10: right

- legal: true
- win: false
- events: walk

```text
#########
#CG#M.@P#
#...MMGL#
#.......#
##.BS...#
#########
```

## Step 11: down

- legal: true
- win: false
- events: walk

```text
#########
#CG#M..P#
#...MM+L#
#.......#
##.BS...#
#########
```

## Step 12: down

- legal: true
- win: false
- events: walk

```text
#########
#CG#M..P#
#...MMGL#
#.....@.#
##.BS...#
#########
```

## Step 13: left

- legal: true
- win: false
- events: walk

```text
#########
#CG#M..P#
#...MMGL#
#....@..#
##.BS...#
#########
```

## Step 14: left

- legal: true
- win: false
- events: walk

```text
#########
#CG#M..P#
#...MMGL#
#...@...#
##.BS...#
#########
```

## Step 15: left

- legal: true
- win: false
- events: walk

```text
#########
#CG#M..P#
#...MMGL#
#..@....#
##.BS...#
#########
```

## Step 16: left

- legal: true
- win: false
- events: walk

```text
#########
#CG#M..P#
#...MMGL#
#.@.....#
##.BS...#
#########
```

## Step 17: up

- legal: true
- win: false
- events: walk

```text
#########
#CG#M..P#
#.@.MMGL#
#.......#
##.BS...#
#########
```

## Step 18: left

- legal: true
- win: false
- events: walk

```text
#########
#CG#M..P#
#@..MMGL#
#.......#
##.BS...#
#########
```

## Step 19: down

- legal: true
- win: false
- events: pull_object:crate#1

```text
#########
#.G#M..P#
#C..MMGL#
#@......#
##.BS...#
#########
```

## Step 20: right

- legal: true
- win: false
- events: walk

```text
#########
#.G#M..P#
#C..MMGL#
#.@.....#
##.BS...#
#########
```

## Step 21: up

- legal: true
- win: false
- events: walk

```text
#########
#.G#M..P#
#C@.MMGL#
#.......#
##.BS...#
#########
```

## Step 22: right

- legal: true
- win: false
- events: pull_object:crate#1

```text
#########
#.G#M..P#
#.C@MMGL#
#.......#
##.BS...#
#########
```

## Step 23: down

- legal: true
- win: false
- events: walk

```text
#########
#.G#M..P#
#.C.MMGL#
#..@....#
##.BS...#
#########
```

## Step 24: right

- legal: true
- win: false
- events: walk

```text
#########
#.G#M..P#
#.C.MMGL#
#...@...#
##.BS...#
#########
```

## Step 25: right

- legal: true
- win: false
- events: walk

```text
#########
#.G#M..P#
#.C.MMGL#
#....@..#
##.BS...#
#########
```

## Step 26: right

- legal: true
- win: false
- events: walk

```text
#########
#.G#M..P#
#.C.MMGL#
#.....@.#
##.BS...#
#########
```

## Step 27: right

- legal: true
- win: false
- events: walk

```text
#########
#.G#M..P#
#.C.MMGL#
#......@#
##.BS...#
#########
```

## Step 28: down

- legal: true
- win: false
- events: pull_object:push_pull_anchor anchor_boundary_shift:push_pull

```text
#########
#.G#M...#
#.C.MMGP#
#......L#
##.BS..@#
#########
```

## Step 29: left

- legal: true
- win: false
- events: walk

```text
#########
#.G#M...#
#.C.MMGP#
#......L#
##.BS.@.#
#########
```

## Step 30: up

- legal: true
- win: false
- events: walk

```text
#########
#.G#M...#
#.C.MMGP#
#.....@L#
##.BS...#
#########
```

## Step 31: up

- legal: true
- win: false
- events: walk

```text
#########
#.G#M...#
#.C.MM+P#
#......L#
##.BS...#
#########
```

## Step 32: up

- legal: true
- win: false
- events: walk

```text
#########
#.G#M.@.#
#.C.MMGP#
#......L#
##.BS...#
#########
```

## Step 33: right

- legal: true
- win: false
- events: walk

```text
#########
#.G#M..@#
#.C.MMGP#
#......L#
##.BS...#
#########
```

## Step 34: down

- legal: true
- win: false
- events: push_object:push_pull_anchor anchor_boundary_shift:push_pull

```text
#########
#.G#M...#
#.C.MMG@#
#......P#
##.BS..L#
#########
```

## Step 35: left

- legal: true
- win: false
- events: walk

```text
#########
#.G#M...#
#.C.MM+.#
#......P#
##.BS..L#
#########
```

## Step 36: down

- legal: true
- win: false
- events: walk

```text
#########
#.G#M...#
#.C.MMG.#
#.....@P#
##.BS..L#
#########
```

## Step 37: left

- legal: true
- win: false
- events: walk

```text
#########
#.G#M...#
#.C.MMG.#
#....@.P#
##.BS..L#
#########
```

## Step 38: left

- legal: true
- win: false
- events: walk

```text
#########
#.G#M...#
#.C.MMG.#
#...@..P#
##.BS..L#
#########
```

## Step 39: left

- legal: true
- win: false
- events: walk

```text
#########
#.G#M...#
#.C.MMG.#
#..@...P#
##.BS..L#
#########
```

## Step 40: left

- legal: true
- win: false
- events: walk

```text
#########
#.G#M...#
#.C.MMG.#
#.@....P#
##.BS..L#
#########
```

## Step 41: up

- legal: true
- win: false
- events: push_object:crate#1

```text
#########
#.*#M...#
#.@.MMG.#
#......P#
##.BS..L#
#########
```

## Step 42: right

- legal: true
- win: false
- events: walk

```text
#########
#.*#M...#
#..@MMG.#
#......P#
##.BS..L#
#########
```

## Step 43: right

- legal: true
- win: true
- events: push_object:sticky#1 move_sticky_rigid

```text
#########
#.*#.M..#
#...@Mm.#
#......P#
##.BS..L#
#########
```
