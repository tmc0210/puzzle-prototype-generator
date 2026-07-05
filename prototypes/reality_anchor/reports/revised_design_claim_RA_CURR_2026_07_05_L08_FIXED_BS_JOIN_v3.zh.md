# Revised Design Claim: RA_CURR_2026_07_05_L08_FIXED_BS_JOIN_v3

candidate_version: RA_CURR_2026_07_05_L08_FIXED_BS_JOIN_v3
prototype: reality_anchor
slot: 第八关 / 固定 B/S 黏块拼接应用

## Claim

player_insight:
  玩家需要把普通箱推过固定 B/S 分界，使它变成 sticky 并与下方 sticky 拼接；随后用拼接后的刚体覆盖目标。右侧中间起点避免开局第一步直推触发转换，删去最右空列则移除无用空间。

causal_chain:
  1. 从右侧中间走回 crate 上方入口。
  2. 下推 crate，触发 `box_to_sticky` 与 `sticky_merge`。
  3. 走到合并刚体左侧，右推两次，使下方 sticky 覆盖目标。

why_not_execution:
  该版本的动作量主要来自回到转换入口与转换后重新站位；核心仍是固定 B/S 的箱转黏拼接和刚体消费，不以空列或绕行作为价值。

falsification:
  如果存在缺少 `box_to_sticky`、`sticky_merge` 或 `move_sticky_rigid` 的胜路，或可达图中 B/S 被移动，则该 claim 失败。若玩家仍认为右侧空间没有机制意义，则需要继续压缩或重构。

## Evidence Summary

- `layout_analysis_RA_CURR_2026_07_05_L08_FIXED_BS_JOIN_v3.md`: 9 步最短解，完整图 116 states / 274 transitions。
- `fixed_anchor_probe_RA_CURR_2026_07_05_L08_FIXED_BS_JOIN_v3.md`: fixed B/S material effect、`box_to_sticky`、`sticky_merge`、`sticky_rigid_move` 均 complete/no bypass；reachable scan 无 B/S 位移。

## Scope Limits

- 不声明唯一输入序列、唯一终局或高难。
- combined fixed-anchor probe 中 `movable_push_pull_shift` 的 bypass 是预期结果，因为第八关无 P/L；只使用 individual fixed B/S material probes 作为 claim 证据。
- 该版本是 compact fixed B/S joining demonstration，不是高密度挑战。
