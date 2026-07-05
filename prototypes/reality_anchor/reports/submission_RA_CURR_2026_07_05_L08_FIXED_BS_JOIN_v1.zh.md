# 合格候选简报：RA_CURR_2026_07_05_L08_FIXED_BS_JOIN_v1

槽位：第八关 / 固定 B/S 箱转黏拼接

## ASCII View

```text
########
#..@...#
#B.C#..#
#S.....#
###M.G.#
########
```

## 解法步骤

```text
down left down right right
```

事件摘要：

- step 1：箱子从 B 侧下推到 S 侧，触发 `box_to_sticky` 并与下方 M `sticky_merge`。
- step 4-5：推动新生成的上方黏块把手，带动合并黏块覆盖目标。

## 关键 Snapshot

起始：

```text
########
#..@...#
#B.C#..#
#S.....#
###M.G.#
########
```

step 1 后，箱子已转黏并拼接为可推把手：

```text
########
#......#
#B.@#..#
#S.M...#
###M.G.#
########
```

step 4 前，玩家站到新把手左侧：

```text
########
#......#
#B..#..#
#S@M...#
###M.G.#
########
```

step 4 后，拼接黏块开始整体右移：

```text
########
#......#
#B..#..#
#S.@M..#
###.MG.#
########
```

终局：

```text
########
#......#
#B..#..#
#S..@M.#
###..m.#
########
```

## 工具证据

- `layout_analysis_RA_CURR_2026_07_05_L08_FIXED_BS_JOIN_v1.md`：shortest 5，complete graph 186 states。
- `event_probe_RA_CURR_2026_07_05_L08_FIXED_BS_JOIN_v1_core.md`：complete/no bypass；所有胜路需要 `box_to_sticky`、`sticky_merge`、`move_sticky_rigid`。
- `reachable_scan_RA_CURR_2026_07_05_L08_FIXED_BS_JOIN_v1.md`：无 P/L shift、无 B/S shift、无 `sticky_to_box`、无 split。
- 单目标关，goal prune skipped。

## Critic 结论摘要

- Evidence reviewer：`supports_claim`，`proposal_ready`，`required_action:none`。
- Puzzle critic：`supports_with_noncore_caveats`，`proposal_ready_with_caveats`，`required_action:none`。
- 主要 caveat：5 步很短，且第一步就完成转化和拼接；作为“箱转黏后生成把手并用于拼接移动”的固定 B/S witness 可进入待玩，但不要包装成高密度谜题。
