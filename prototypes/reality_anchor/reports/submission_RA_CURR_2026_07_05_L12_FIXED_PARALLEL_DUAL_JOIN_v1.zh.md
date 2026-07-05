# Submission: RA_CURR_2026_07_05_L12_FIXED_PARALLEL_DUAL_JOIN_v1

```yaml
slot: L12
role: fixed_parallel_dual_anchor_transition
status: proposal_ready_with_caveats
review_integrity: independent_review
archive_eligibility: human_pending
```

## ASCII

```text
###########
##..@..####
#P#.C..#B##
#L#...G.S##
##..M.G.###
###########
```

## 解法

```text
down right down right right
```

5 步。

## 关键快照

Step 1：C 进入 S 侧，触发 `box_to_sticky + sticky_merge`，制造竖向二连黏块。

```text
###########
##.....####
#P#.@..#B##
#L#.M.G.S##
##..M.G.###
###########
```

Step 4：在 P/L pull 区右拉二连黏块，开始覆盖目标。

```text
###########
##.....####
#P#....#B##
#L#..M+.S##
##...MG.###
###########
```

Step 5：第二次 pull 后，二连黏块覆盖两个目标。

```text
###########
##.....####
#P#....#B##
#L#...m@S##
##....m.###
###########
```

## Critic 摘要

有效 critic 结论为 `supports_with_noncore_caveats / required_action:none`。它认为本关可作为固定平行双锚点过渡：B/S 先制造二连黏块，P/L 后消费同一结构，不是两个完全并排 witness。主要 caveat 是 5 步很短，适合过渡，不应包装成高密度双锚挑战。
