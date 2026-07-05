# Trace: RA_CURR_2026_07_05_L11_MOVABLE_BS_PRELOAD_CARRY_SPLIT_v1

- Inputs: right down left down right down right right right right down left left up up left down left left up up up right down left down right right
- Steps: 28

## Step 0: start

- legal: true
- win: false
- events: none

```text
###########
###########
###@.######
###.CCC####
###...G####
#...G....##
#.....BS.##
###########
```

## Step 1: right

- legal: true
- win: false
- events: walk

```text
###########
###########
###.@######
###.CCC####
###...G####
#...G....##
#.....BS.##
###########
```

## Step 2: down

- legal: true
- win: false
- events: push_object:crate#1

```text
###########
###########
###..######
###.@CC####
###.C.G####
#...G....##
#.....BS.##
###########
```

## Step 3: left

- legal: true
- win: false
- events: walk

```text
###########
###########
###..######
###@.CC####
###.C.G####
#...G....##
#.....BS.##
###########
```

## Step 4: down

- legal: true
- win: false
- events: walk

```text
###########
###########
###..######
###..CC####
###@C.G####
#...G....##
#.....BS.##
###########
```

## Step 5: right

- legal: true
- win: false
- events: push_object:crate#3

```text
###########
###########
###..######
###..CC####
###.@CG####
#...G....##
#.....BS.##
###########
```

## Step 6: down

- legal: true
- win: false
- events: walk

```text
###########
###########
###..######
###..CC####
###..CG####
#...+....##
#.....BS.##
###########
```

## Step 7: right

- legal: true
- win: false
- events: walk

```text
###########
###########
###..######
###..CC####
###..CG####
#...G@...##
#.....BS.##
###########
```

## Step 8: right

- legal: true
- win: false
- events: walk

```text
###########
###########
###..######
###..CC####
###..CG####
#...G.@..##
#.....BS.##
###########
```

## Step 9: right

- legal: true
- win: false
- events: walk

```text
###########
###########
###..######
###..CC####
###..CG####
#...G..@.##
#.....BS.##
###########
```

## Step 10: right

- legal: true
- win: false
- events: walk

```text
###########
###########
###..######
###..CC####
###..CG####
#...G...@##
#.....BS.##
###########
```

## Step 11: down

- legal: true
- win: false
- events: walk

```text
###########
###########
###..######
###..CC####
###..CG####
#...G....##
#.....BS@##
###########
```

## Step 12: left

- legal: true
- win: false
- events: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1

```text
###########
###########
###..######
###..CM####
###..CG####
#...G....##
#....BS@.##
###########
```

## Step 13: left

- legal: true
- win: false
- events: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n2 sticky_merge:n1

```text
###########
###########
###..######
###..MM####
###..MG####
#...G....##
#...BS@..##
###########
```

## Step 14: up

- legal: true
- win: false
- events: walk

```text
###########
###########
###..######
###..MM####
###..MG####
#...G.@..##
#...BS...##
###########
```

## Step 15: up

- legal: true
- win: false
- events: walk

```text
###########
###########
###..######
###..MM####
###..M+####
#...G....##
#...BS...##
###########
```

## Step 16: left

- legal: true
- win: false
- events: push_object:sticky#1 move_sticky_rigid sticky_to_box:n2

```text
###########
###########
###..######
###.CM.####
###.C@G####
#...G....##
#...BS...##
###########
```

## Step 17: down

- legal: true
- win: false
- events: walk

```text
###########
###########
###..######
###.CM.####
###.C.G####
#...G@...##
#...BS...##
###########
```

## Step 18: left

- legal: true
- win: false
- events: walk

```text
###########
###########
###..######
###.CM.####
###.C.G####
#...+....##
#...BS...##
###########
```

## Step 19: left

- legal: true
- win: false
- events: walk

```text
###########
###########
###..######
###.CM.####
###.C.G####
#..@G....##
#...BS...##
###########
```

## Step 20: up

- legal: true
- win: false
- events: walk

```text
###########
###########
###..######
###.CM.####
###@C.G####
#...G....##
#...BS...##
###########
```

## Step 21: up

- legal: true
- win: false
- events: walk

```text
###########
###########
###..######
###@CM.####
###.C.G####
#...G....##
#...BS...##
###########
```

## Step 22: up

- legal: true
- win: false
- events: walk

```text
###########
###########
###@.######
###.CM.####
###.C.G####
#...G....##
#...BS...##
###########
```

## Step 23: right

- legal: true
- win: false
- events: walk

```text
###########
###########
###.@######
###.CM.####
###.C.G####
#...G....##
#...BS...##
###########
```

## Step 24: down

- legal: true
- win: false
- events: push_object:crate#1 force_chain:n2

```text
###########
###########
###..######
###.@M.####
###.C.G####
#...*....##
#...BS...##
###########
```

## Step 25: left

- legal: true
- win: false
- events: walk

```text
###########
###########
###..######
###@.M.####
###.C.G####
#...*....##
#...BS...##
###########
```

## Step 26: down

- legal: true
- win: false
- events: walk

```text
###########
###########
###..######
###..M.####
###@C.G####
#...*....##
#...BS...##
###########
```

## Step 27: right

- legal: true
- win: false
- events: push_object:crate#1 box_to_sticky:n1 sticky_merge:n1

```text
###########
###########
###..######
###..M.####
###.@MG####
#...*....##
#...BS...##
###########
```

## Step 28: right

- legal: true
- win: true
- events: push_object:sticky#1 move_sticky_rigid

```text
###########
###########
###..######
###...M####
###..@m####
#...*....##
#...BS...##
###########
```
