# Fresh / Revised Design Claim: RA_CURR_2026_07_05_L11_BAR_DOUBLE_CUT_v1

## Slot

- 原型：Reality Anchor
- 槽位：第十一关
- 约束：无 P/L；B/S 可推动；需要比第十关更复杂的拼接+切割应用；玩家需要考虑推动 B/S 的时机。
- lineage：fresh_required 下的结构修订。上一版 `BAR_HANDLE_SPLIT_v2` 证据层通过但 critic 打回，原因是 B/S 像一次性按钮、走位偏多。本版只保留“横条把手被切回普通箱并后续消费”的机制核，改变目标位置、起点和切割责任。

## Player Insight

玩家要先把普通箱变成三连黏条并整体下压；之后 B/S 不能只当一次开关，而要连续移动两格，把三连的左两格切成普通箱。切出的两个普通箱承担不同职责：一个被推上去腾出站位/避免阻塞，另一个被下推到下目标。

## Causal Chain

1. 开局 C 右推进入 S 侧，触发 `box_to_sticky` 与 `sticky_merge`，形成横向三连黏条。
2. 三连作为刚体下压，右端/中端承担上目标侧压力。
3. B/S 在黏条下压后连续右推两次，分别触发两次 `sticky_to_box`，把左两格切成普通箱。
4. 切出的普通箱不能只是留在原地：至少一个需要被上推/移开，另一个再下推覆盖下目标。

## Why Not Execution

若玩家只完成拼接和下压，缺少下目标；若 B/S 只移动一次，第二格仍是黏块，不能作为普通箱下推到下目标。若过早移动 B/S，则三连结构无法完成有效下压。目标位置把“切割后普通箱再处理”变成必要状态消费，而不是单纯事件触发。

## Required Events

- `box_to_sticky`
- `sticky_merge`
- `move_sticky_rigid`
- 至少两次 `anchor_boundary_shift:box_sticky`
- 至少两次 `sticky_to_box`
- 普通箱推动，且切割后仍有普通箱推动

## Falsification

- 存在少于两次 B/S shift 的胜路。
- 存在少于两次 sticky_to_box 的胜路。
- 存在 sticky_to_box 后无普通箱推动的胜路。
- 存在 B/S shift 早于 sticky_merge 或 sticky rigid move 的胜路。
- 删除任一剩余目标后不降成本且不释放缺核心事件短路。
