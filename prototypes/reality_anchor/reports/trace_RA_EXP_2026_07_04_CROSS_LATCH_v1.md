# Trace: RA_EXP_2026_07_04_CROSS_LATCH_v1

- Inputs: right left down right up left down left right right up left left down left left down
- Steps: 17

## Step 0: start

- legal: true
- win: false
- events: none

```text
#########
#.MSB@P.#
#MGMC.L.#
#..G#..C#
#########
```

## Step 1: right

- legal: true
- win: false
- events: push_object:push_pull_anchor anchor_boundary_shift:push_pull

```text
#########
#.MSB.@P#
#MGMC..L#
#..G#..C#
#########
```

## Step 2: left

- legal: true
- win: false
- events: walk

```text
#########
#.MSB@.P#
#MGMC..L#
#..G#..C#
#########
```

## Step 3: down

- legal: true
- win: false
- events: walk

```text
#########
#.MSB..P#
#MGMC@.L#
#..G#..C#
#########
```

## Step 4: right

- legal: true
- win: false
- events: pull_object:crate#1

```text
#########
#.MSB..P#
#MGM.C@L#
#..G#..C#
#########
```

## Step 5: up

- legal: true
- win: false
- events: walk

```text
#########
#.MSB.@P#
#MGM.C.L#
#..G#..C#
#########
```

## Step 6: left

- legal: true
- win: false
- events: walk

```text
#########
#.MSB@.P#
#MGM.C.L#
#..G#..C#
#########
```

## Step 7: down

- legal: true
- win: false
- events: push_object:crate#1

```text
#########
#.MSB..P#
#MGM.@.L#
#..G#C.C#
#########
```

## Step 8: left

- legal: true
- win: false
- events: walk

```text
#########
#.MSB..P#
#MGM@..L#
#..G#C.C#
#########
```

## Step 9: right

- legal: true
- win: false
- events: pull_object:sticky#3 move_sticky_rigid sticky_to_box:n1

```text
#########
#.MSB..P#
#MG.C@.L#
#..G#C.C#
#########
```

## Step 10: right

- legal: true
- win: false
- events: pull_object:crate#1

```text
#########
#.MSB..P#
#MG..C@L#
#..G#C.C#
#########
```

## Step 11: up

- legal: true
- win: false
- events: walk

```text
#########
#.MSB.@P#
#MG..C.L#
#..G#C.C#
#########
```

## Step 12: left

- legal: true
- win: false
- events: walk

```text
#########
#.MSB@.P#
#MG..C.L#
#..G#C.C#
#########
```

## Step 13: left

- legal: true
- win: false
- events: push_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid sticky_merge:n1

```text
#########
#MSB@..P#
#MG..C.L#
#..G#C.C#
#########
```

## Step 14: down

- legal: true
- win: false
- events: walk

```text
#########
#MSB...P#
#MG.@C.L#
#..G#C.C#
#########
```

## Step 15: left

- legal: true
- win: false
- events: pull_object:crate#1

```text
#########
#MSB...P#
#MG@C..L#
#..G#C.C#
#########
```

## Step 16: left

- legal: true
- win: false
- events: pull_object:crate#1

```text
#########
#MSB...P#
#M+C...L#
#..G#C.C#
#########
```

## Step 17: down

- legal: true
- win: true
- events: pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky

```text
#########
#M.....P#
#MSB...L#
#.@*#C.C#
#########
```
