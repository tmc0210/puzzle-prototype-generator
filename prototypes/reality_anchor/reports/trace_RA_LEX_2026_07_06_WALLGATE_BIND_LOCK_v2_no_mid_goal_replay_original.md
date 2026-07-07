# Trace: RA_LEX_2026_07_06_WALLGATE_BIND_LOCK_v2_no_mid_goal_replay_original

- Inputs: right down left up down right right down left up up right left down down right right up up right right down
- Steps: 22

## Step 0: start

- legal: true
- win: false
- events: none

```text
########
#PLB.C.#
#@MS..G#
#....#.#
#M....##
########
```

## Step 1: right

- legal: true
- win: false
- events: push_object:sticky#2 force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid

```text
########
#PL.BC.#
#.@MS.G#
#....#.#
#M....##
########
```

## Step 2: down

- legal: true
- win: false
- events: pull_object:push_pull_anchor anchor_boundary_shift:push_pull

```text
########
#...BC.#
#PLMS.G#
#.@..#.#
#M....##
########
```

## Step 3: left

- legal: true
- win: false
- events: walk

```text
########
#...BC.#
#PLMS.G#
#@...#.#
#M....##
########
```

## Step 4: up

- legal: true
- win: false
- events: push_object:push_pull_anchor anchor_boundary_shift:push_pull

```text
########
#PL.BC.#
#@.MS.G#
#....#.#
#M....##
########
```

## Step 5: down

- legal: true
- win: false
- events: walk

```text
########
#PL.BC.#
#..MS.G#
#@...#.#
#M....##
########
```

## Step 6: right

- legal: true
- win: false
- events: walk

```text
########
#PL.BC.#
#..MS.G#
#.@..#.#
#M....##
########
```

## Step 7: right

- legal: true
- win: false
- events: walk

```text
########
#PL.BC.#
#..MS.G#
#..@.#.#
#M....##
########
```

## Step 8: down

- legal: true
- win: false
- events: pull_object:sticky#2 move_sticky_rigid

```text
########
#PL.BC.#
#...S.G#
#..M.#.#
#M.@..##
########
```

## Step 9: left

- legal: true
- win: false
- events: walk

```text
########
#PL.BC.#
#...S.G#
#..M.#.#
#M@...##
########
```

## Step 10: up

- legal: true
- win: false
- events: walk

```text
########
#PL.BC.#
#...S.G#
#.@M.#.#
#M....##
########
```

## Step 11: up

- legal: true
- win: false
- events: walk

```text
########
#PL.BC.#
#.@.S.G#
#..M.#.#
#M....##
########
```

## Step 12: right

- legal: true
- win: false
- events: walk

```text
########
#PL.BC.#
#..@S.G#
#..M.#.#
#M....##
########
```

## Step 13: left

- legal: true
- win: false
- events: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky

```text
########
#PLB.C.#
#.@S..G#
#..M.#.#
#M....##
########
```

## Step 14: down

- legal: true
- win: false
- events: pull_object:push_pull_anchor anchor_boundary_shift:push_pull

```text
########
#..B.C.#
#PLS..G#
#.@M.#.#
#M....##
########
```

## Step 15: down

- legal: true
- win: false
- events: pull_object:push_pull_anchor anchor_boundary_shift:push_pull

```text
########
#..B.C.#
#..S..G#
#PLM.#.#
#M@...##
########
```

## Step 16: right

- legal: true
- win: false
- events: pull_object:sticky#1 move_sticky_rigid

```text
########
#..B.C.#
#..S..G#
#PLM.#.#
#.M@..##
########
```

## Step 17: right

- legal: true
- win: false
- events: pull_object:sticky#1 move_sticky_rigid sticky_merge:n1

```text
########
#..B.C.#
#..S..G#
#PLM.#.#
#..M@.##
########
```

## Step 18: up

- legal: true
- win: false
- events: walk

```text
########
#..B.C.#
#..S..G#
#PLM@#.#
#..M..##
########
```

## Step 19: up

- legal: true
- win: false
- events: walk

```text
########
#..B.C.#
#..S@.G#
#PLM.#.#
#..M..##
########
```

## Step 20: right

- legal: true
- win: false
- events: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky

```text
########
#...BC.#
#...S@G#
#PLM.#.#
#..M..##
########
```

## Step 21: right

- legal: true
- win: false
- events: pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky

```text
########
#....BC#
#....S+#
#PLM.#.#
#..M..##
########
```

## Step 22: down

- legal: true
- win: true
- events: pull_object:crate#1 box_to_sticky:n1

```text
########
#....B.#
#....Sm#
#PLM.#@#
#..M..##
########
```
