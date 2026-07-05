# 合格候选简报：RA_CURR_2026_07_05_L04_MOVABLE_PL_TIMING_v1

槽位：第四关 / 可移动 P/L 推动时机

## ASCII View

```text
#########
#..PL...#
#.G..@C.#
#########
```

## 解法步骤

```text
left left left up right right right down left left
```

事件摘要：

- step 1-2：拉动同一个 crate#1。
- step 5-7：推动 P/L，连续改变 push/pull 边界。
- step 9-10：推动 crate#1 到目标。

## 关键 Snapshot

起始：

```text
#########
#..PL...#
#.G..@C.#
#########
```

step 2 后，箱子已被拉到目标右侧通道：

```text
#########
#..PL...#
#.G@C...#
#########
```

step 5 前，玩家转到 P/L 左侧准备移动锚点：

```text
#########
#.@PL...#
#.G.C...#
#########
```

step 7 后，P/L 被推到右侧，箱子进入 push 可用区域：

```text
#########
#....@PL#
#.G.C...#
#########
```

终局：

```text
#########
#.....PL#
#.*@....#
#########
```

## 工具证据

- `layout_analysis_RA_CURR_2026_07_05_L04_MOVABLE_PL_TIMING_v1.md`：shortest 10，complete graph 124 states。
- `order_scan_RA_CURR_2026_07_05_L04_MOVABLE_PL_TIMING_v1.md`：complete；未发现先移动 P/L 再产生任意 crate event 的胜路。
- `event_probe_RA_CURR_2026_07_05_L04_MOVABLE_PL_TIMING_v1_instance_core.md`：complete/no bypass；所有胜路都包含 `pull_object:crate#1`、`push_object:crate#1`、`anchor_boundary_shift:push_pull`。
- `reachable_scan_RA_CURR_2026_07_05_L04_MOVABLE_PL_TIMING_v1.md`：complete；无材料事件外溢。

## Critic 结论摘要

- Evidence reviewer review_2：`supports_with_caveats`，`proposal_ready_with_caveats`，`required_action:none`。核心实例级证据缺口已补齐；不应声称唯一输入序列、完整全序或精确事件次数。
- Puzzle critic review_1：`supports_with_noncore_caveats`，`proposal_ready_with_caveats`，`required_action:none`。槽位功能成立；caveat 是 P/L 三连推偏重复，适合作为中期可移动 P/L timing witness，而不是高审美挑战。
