# Submission: RA_CURR_2026_07_05_L13_FIXED_ORTHOGONAL_PULL_CONVERT_v2

```yaml
slot: L13
role: fixed_orthogonal_dual_anchor_micro_application
status: proposal_ready_with_caveats
review_integrity: independent_review
archive_eligibility: human_pending
```

## ASCII

```text
###########
####BS#####
#P#......##
#L#.C.G..##
###..MG..##
###...@..##
###########
```

## 解法

```text
up up left right right
```

5 步。

## 关键快照

Step 4：P/L pull 将 C 向右拉过 B/S 边界，同时触发 `box_to_sticky + sticky_merge`。

```text
###########
####BS#####
#P#......##
#L#..M+..##
###..MG..##
###......##
```

Step 5：继续 P/L pull，竖向二连黏块覆盖两个目标。

```text
###########
####BS#####
#P#......##
#L#...m@.##
###...m..##
###......##
```

## Critic 摘要

有效 critic 结论为 `supports_with_noncore_caveats / required_action:none`。它认为本关适合作为固定正交双锚点微应用：第一次 P/L pull 同时运输并触发 B/S 转化/合并，第二次 pull 消费同一结构。主要 caveat 是 5 步很短，且与 L12 都用二连黏块盖双目标；待玩时要观察玩家是否真的读到“pull 触发 B/S 转化”。
