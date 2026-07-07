# 合格候选简报：RA_LEX_2026_07_06_RATCHET_HANDLE_v1

槽位：Reality Anchor 中后段 P/L 应用候选 / lexicon 组合验证

## ASCII View

```text
############
#.....######
#.@PL......#
#####.G.G###
#######.C###
############
```

## 解法步骤

```text
right right up right down right right down right up
```

事件摘要：

- step 1-2：连续推动 P/L 向右两格，消耗长轴横廊容量并对齐双格下推孔位。
- step 5：从上方站位下推 P/L，L 半格覆盖左目标并打开下层通路。
- step 9：玩家进入右目标时处在 pull side，拉动 P/L 右移，P 半格接手覆盖左目标。
- step 10：玩家从右目标向上移动，拉 `crate#1` 到右目标并获胜。

## 工具证据

- `layout_analysis_RA_LEX_2026_07_06_RATCHET_HANDLE_v1.md`：shortest cost 10，graph complete，754 states，36 winning states。
- `pl_direction_any_probe_RA_LEX_2026_07_06_RATCHET_HANDLE_v1_dir_any.md`：complete/no bypass；所有胜路至少一次 P/L 右移、至少一次 P/L 下移，事件允许 push 或 pull。
- `event_count_probe_RA_LEX_2026_07_06_RATCHET_HANDLE_v1_shift_count3_anchor_boundary_shift_push_pull_min3.md`：complete/no bypass；所有胜路至少三次 `anchor_boundary_shift:push_pull`。
- `event_count_probe_RA_LEX_2026_07_06_RATCHET_HANDLE_v1_crate_pull_count_pull_object_crate_1_min1.md`：complete/no bypass；所有胜路至少一次 `pull_object:crate#1`。
- 目标删除反事实：删左/P-L 目标会释放缺少下移的路线；删右/crate 目标会释放短 P/L-only 路线，两个目标分别约束不同半链。

## Review 结论摘要

- Evidence reviewer：`supports_with_caveats`，`proposal_ready_with_caveats`，`required_action: none`。
- Puzzle critic：`supports_with_noncore_caveats`，`proposal_ready_with_caveats`，`required_action: none`。
- 主要 caveat：开局两次右推和 step 9 右拉都有可能被玩家体验为显性/自动；本关可作为 difficulty >=3、aesthetic >=3 的 proposal candidate，但不应声称达到 RA_CAND_0011 级别的 4 分强逻辑。

## 本次使用的设计语料

- `mechanism_lab/lexicon.md` 的「P/L 长轴墙廊棘轮」：用于构造上层横廊，两次右推后才有足够长轴停位对齐下推孔。
- `mechanism_lab/lexicon.md` 的「P/L 横向把手的墙格门」：用于构造 P/L 两半格下方必须同时开放的下推门。
- `mechanism_lab/lexicon.md` 的「刚体黏块推进后的回返谱系」：仅借用“反向施力站位/回返读法”的抽象思路，用于 step 9 的 pull-side 右拉与终局 crate pull；最终布局不使用 B/S 或黏块。

未读取 `prototypes/reality_anchor/mechanism_lab/runs`。本轮额外补的衔接逻辑是：P/L 下推后先由 L 半格覆盖左目标，再在进入右目标时由 P 半格接手覆盖左目标，随后用下方箱子的 pull 收束右目标。
