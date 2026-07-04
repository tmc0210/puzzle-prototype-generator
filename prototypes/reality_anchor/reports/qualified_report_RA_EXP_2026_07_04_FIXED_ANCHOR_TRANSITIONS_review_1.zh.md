# Qualified Report: Fixed Anchor Transition Batch / review_1

## Qualified Candidates

1. `RA_EXP_2026_07_04_FIXED_BS_STICKY_HANDLE_v1`
2. `RA_EXP_2026_07_04_FIXED_PL_VERTICAL_PAIR_v2`

## Rejected / Held Families

- `RA_EXP_2026_07_04_FIXED_BS_PULL_GATE_v1`
- `RA_EXP_2026_07_04_FIXED_PL_MATERIAL_SLIDE_v1`
- `RA_EXP_2026_07_04_FIXED_PL_PHASE_NUDGE_v1`
- `RA_EXP_2026_07_04_FIXED_PL_STICKY_PULL_v1`
- `RA_EXP_2026_07_04_FIXED_PL_PULL_HANDLE_v1` through `v4`
- `RA_EXP_2026_07_04_FIXED_PL_VERTICAL_PAIR_v1`
- `RA_EXP_2026_07_04_FIXED_BS_VERTICAL_PAIR_v1`
- `RA_EXP_2026_07_04_FIXED_BS_VERTICAL_LOCK_v1` / `v2`

这些版本分别因未功能性使用固定锚点、存在单黏块/锚点盖目标旁路、不可解、或存在不消费箱/黏差异的长胜解而未提交。

## Candidate A: RA_EXP_2026_07_04_FIXED_BS_STICKY_HANDLE_v1

```text
#########
####BS###
#########
#@PLG...#
#...C.MG#
#########
```

Solution: `right right down right right`

Key snapshots:

```text
Step 0
#########
####BS###
#########
#@PLG...#
#...C.MG#
#########
```

```text
Step 2 after right right
#########
####BS###
#########
#..@PL..#
#...C.MG#
#########
```

```text
Step 4 after down right
#########
####BS###
#########
#...PL..#
#...@MMG#
#########
```

```text
Step 5 win
#########
####BS###
#########
#...PL..#
#....@Mm#
#########
```

Critic summary:

- `verdict: supports_with_noncore_caveats`
- `review_loop_state: proposal_ready_with_caveats`
- `required_action: none`
- 强项：箱子跨固定 B/S 边界后立刻变黏、合并，并作为黏刚体移动；材质差异被实际消费。
- Caveat：P/L 开局连续推两格，洞见密度低；固定 B/S 通过全局边界产生效果，局部接触感偏抽象。

## Candidate B: RA_EXP_2026_07_04_FIXED_PL_VERTICAL_PAIR_v2

```text
###########
####PL#####
###########
###BS@....#
######.####
#...C..G..#
#....M.G..#
#.........#
###########
```

Solution: `right down down left right right right`

Key snapshots:

```text
Step 0 raw layout
###########
####PL#####
###########
###BS@....#
######.####
#...C..G..#
#....M.G..#
#.........#
###########
```

```text
Step 1 after right
###########
####PL#####
###########
###.BS@...#
######.####
#...C..G..#
#....M.G..#
#.........#
###########
```

```text
Step 5 after down down left right
###########
####PL#####
###########
###.BS....#
######.####
#....M@G..#
#....M.G..#
#.........#
###########
```

```text
Step 7 win
###########
####PL#####
###########
###.BS....#
######.####
#......m@.#
#......m..#
#.........#
###########
```

Critic summary:

- `verdict: supports_with_noncore_caveats`
- `review_loop_state: proposal_ready_with_caveats`
- `required_action: none`
- 强项：固定 P/L 的拉侧先改变活动 B/S 边界，之后同一边界被箱/黏转换再次消费；竖向双目标清楚要求合并后的竖向黏刚体。
- Caveat：第一步拉 B/S 是强制教学式提交；箱变黏与合并点局部脚本化，但适合作为降低难度的过渡关。
