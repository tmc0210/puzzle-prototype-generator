# Trace: RA_CURR_L11_TMP_START_VARIANT_1_BYPASS

- Inputs: down left down right down right right right right down left left up up left right up left down down right down left left up left up right down left left left down right right up up right right down right down left up up left left up up right down down
- Steps: 52

## Step 0: start

- legal: true
- win: false
- events: none

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

## Step 1: down

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

## Step 2: left

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

## Step 3: down

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

## Step 4: right

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

## Step 5: down

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

## Step 6: right

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
#...G.@..##
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
#...G..@.##
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
#...G...@##
#.....BS.##
###########
```

## Step 10: down

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

## Step 11: left

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

## Step 12: left

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

## Step 13: up

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

## Step 14: up

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

## Step 15: left

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

## Step 16: right

- legal: true
- win: false
- events: walk

```text
###########
###########
###..######
###.CM.####
###.C.+####
#...G....##
#...BS...##
###########
```

## Step 17: up

- legal: true
- win: false
- events: walk

```text
###########
###########
###..######
###.CM@####
###.C.G####
#...G....##
#...BS...##
###########
```

## Step 18: left

- legal: true
- win: false
- events: push_object:sticky#1 force_chain:n2 move_sticky_rigid sticky_to_box:n1

```text
###########
###########
###..######
###CC@.####
###.C.G####
#...G....##
#...BS...##
###########
```

## Step 19: down

- legal: true
- win: false
- events: walk

```text
###########
###########
###..######
###CC..####
###.C@G####
#...G....##
#...BS...##
###########
```

## Step 20: down

- legal: true
- win: false
- events: walk

```text
###########
###########
###..######
###CC..####
###.C.G####
#...G@...##
#...BS...##
###########
```

## Step 21: right

- legal: true
- win: false
- events: walk

```text
###########
###########
###..######
###CC..####
###.C.G####
#...G.@..##
#...BS...##
###########
```

## Step 22: down

- legal: true
- win: false
- events: walk

```text
###########
###########
###..######
###CC..####
###.C.G####
#...G....##
#...BS@..##
###########
```

## Step 23: left

- legal: true
- win: false
- events: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n2 sticky_merge:n1

```text
###########
###########
###..######
###CM..####
###.M.G####
#...G....##
#..BS@...##
###########
```

## Step 24: left

- legal: true
- win: false
- events: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 sticky_merge:n1

```text
###########
###########
###..######
###MM..####
###.M.G####
#...G....##
#.BS@....##
###########
```

## Step 25: up

- legal: true
- win: false
- events: walk

```text
###########
###########
###..######
###MM..####
###.M.G####
#...+....##
#.BS.....##
###########
```

## Step 26: left

- legal: true
- win: false
- events: walk

```text
###########
###########
###..######
###MM..####
###.M.G####
#..@G....##
#.BS.....##
###########
```

## Step 27: up

- legal: true
- win: false
- events: walk

```text
###########
###########
###..######
###MM..####
###@M.G####
#...G....##
#.BS.....##
###########
```

## Step 28: right

- legal: true
- win: false
- events: push_object:sticky#1 move_sticky_rigid

```text
###########
###########
###..######
###.MM.####
###.@MG####
#...G....##
#.BS.....##
###########
```

## Step 29: down

- legal: true
- win: false
- events: walk

```text
###########
###########
###..######
###.MM.####
###..MG####
#...+....##
#.BS.....##
###########
```

## Step 30: left

- legal: true
- win: false
- events: walk

```text
###########
###########
###..######
###.MM.####
###..MG####
#..@G....##
#.BS.....##
###########
```

## Step 31: left

- legal: true
- win: false
- events: walk

```text
###########
###########
###..######
###.MM.####
###..MG####
#.@.G....##
#.BS.....##
###########
```

## Step 32: left

- legal: true
- win: false
- events: walk

```text
###########
###########
###..######
###.MM.####
###..MG####
#@..G....##
#.BS.....##
###########
```

## Step 33: down

- legal: true
- win: false
- events: walk

```text
###########
###########
###..######
###.MM.####
###..MG####
#...G....##
#@BS.....##
###########
```

## Step 34: right

- legal: true
- win: false
- events: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky

```text
###########
###########
###..######
###.MM.####
###..MG####
#...G....##
#.@BS....##
###########
```

## Step 35: right

- legal: true
- win: false
- events: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1

```text
###########
###########
###..######
###.CM.####
###..MG####
#...G....##
#..@BS...##
###########
```

## Step 36: up

- legal: true
- win: false
- events: walk

```text
###########
###########
###..######
###.CM.####
###..MG####
#..@G....##
#...BS...##
###########
```

## Step 37: up

- legal: true
- win: false
- events: walk

```text
###########
###########
###..######
###.CM.####
###@.MG####
#...G....##
#...BS...##
###########
```

## Step 38: right

- legal: true
- win: false
- events: walk

```text
###########
###########
###..######
###.CM.####
###.@MG####
#...G....##
#...BS...##
###########
```

## Step 39: right

- legal: true
- win: false
- events: push_object:sticky#1 move_sticky_rigid

```text
###########
###########
###..######
###.C.M####
###..@m####
#...G....##
#...BS...##
###########
```

## Step 40: down

- legal: true
- win: false
- events: walk

```text
###########
###########
###..######
###.C.M####
###...m####
#...G@...##
#...BS...##
###########
```

## Step 41: right

- legal: true
- win: false
- events: walk

```text
###########
###########
###..######
###.C.M####
###...m####
#...G.@..##
#...BS...##
###########
```

## Step 42: down

- legal: true
- win: false
- events: walk

```text
###########
###########
###..######
###.C.M####
###...m####
#...G....##
#...BS@..##
###########
```

## Step 43: left

- legal: true
- win: false
- events: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1

```text
###########
###########
###..######
###.M.M####
###...m####
#...G....##
#..BS@...##
###########
```

## Step 44: up

- legal: true
- win: false
- events: walk

```text
###########
###########
###..######
###.M.M####
###...m####
#...G@...##
#..BS....##
###########
```

## Step 45: up

- legal: true
- win: false
- events: walk

```text
###########
###########
###..######
###.M.M####
###..@m####
#...G....##
#..BS....##
###########
```

## Step 46: left

- legal: true
- win: false
- events: walk

```text
###########
###########
###..######
###.M.M####
###.@.m####
#...G....##
#..BS....##
###########
```

## Step 47: left

- legal: true
- win: false
- events: walk

```text
###########
###########
###..######
###.M.M####
###@..m####
#...G....##
#..BS....##
###########
```

## Step 48: up

- legal: true
- win: false
- events: walk

```text
###########
###########
###..######
###@M.M####
###...m####
#...G....##
#..BS....##
###########
```

## Step 49: up

- legal: true
- win: false
- events: walk

```text
###########
###########
###@.######
###.M.M####
###...m####
#...G....##
#..BS....##
###########
```

## Step 50: right

- legal: true
- win: false
- events: walk

```text
###########
###########
###.@######
###.M.M####
###...m####
#...G....##
#..BS....##
###########
```

## Step 51: down

- legal: true
- win: false
- events: push_object:sticky#1 move_sticky_rigid

```text
###########
###########
###..######
###.@.M####
###.M.m####
#...G....##
#..BS....##
###########
```

## Step 52: down

- legal: true
- win: true
- events: push_object:sticky#1 move_sticky_rigid

```text
###########
###########
###..######
###...M####
###.@.m####
#...m....##
#..BS....##
###########
```
