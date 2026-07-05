# Revised Design Claim: RA_CURR_2026_07_05_L10_MOVABLE_BS_TIMED_JOIN_CUT_v3

candidate_version: RA_CURR_2026_07_05_L10_MOVABLE_BS_TIMED_JOIN_CUT_v3
prototype: reality_anchor
slot: 第十关 / 可动 B/S 时机应用

## Claim

player_insight:
  玩家必须先把普通箱推入 S 侧形成 sticky_merge，随后才推动 B/S；B/S 的两次移动分别用于进入上方通道和触发 sticky_to_box 切割。切出的箱子被下推清路，剩余 sticky pair 再作为刚体覆盖目标。v3 的价值在删除 v2 的无用空间，不改变核心语法。

causal_chain:
  1. 先把 crate 推到 S 侧，触发 `box_to_sticky` 与 `sticky_merge`。
  2. 第一次推动 B/S，把边界移到上方通道。
  3. 第二次推动 B/S，触发 `sticky_to_box`，把左侧 sticky 切成 crate。
  4. 下推切出的 crate，清出 sticky pair 的横向路线。
  5. 右推 sticky pair，再从下方上推，使其中一格覆盖目标。

why_not_execution:
  v3 相比 v2 删除左下冗余箱、左侧无用列和右上无用空地；最短解仍是 13 步，核心事件链不靠新增绕行或额外空间制造难度。

falsification:
  若存在胜路缺少任一核心事件组，或 B/S 可以在 `sticky_merge` 前移动并获胜，或 B/S shift 少于两次即可获胜，则该 claim 失败。若玩家仍把左侧或右上空间读成无用探索区，则还需继续压缩。

## Evidence Summary

- `layout_analysis_RA_CURR_2026_07_05_L10_MOVABLE_BS_TIMED_JOIN_CUT_v3.md`: 13 步最短解，完整图 178 states / 423 transitions。
- `direction_probe_RA_CURR_2026_07_05_L10_MOVABLE_BS_TIMED_JOIN_CUT_v3_core.md`: 核心事件组 combined 与 individual probes 均 complete/no bypass。
- `order_probe_RA_CURR_2026_07_05_L10_MOVABLE_BS_TIMED_JOIN_CUT_v3_order.md`: 无 B/S shift 早于 `sticky_merge` 的胜路。
- `event_count_probe_RA_CURR_2026_07_05_L10_MOVABLE_BS_TIMED_JOIN_CUT_v3_bs_shift_count_anchor_boundary_shift_box_sticky_min2.md`: 无少于两次 B/S shift 的胜路。
- `reachable_scan_RA_CURR_2026_07_05_L10_MOVABLE_BS_TIMED_JOIN_CUT_v3.md`: 完整可达扫描，无 P/L hits。

## Scope Limits

- 不声明唯一输入序列、唯一终局、严格唯一事件顺序或对象实例级身份。
- 不声明审美/难度评分或归档接受。
- v3 仍是强制线性机制句子；修订只回应人类点名的空间和对象冗余。
