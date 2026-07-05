# Revised Design Claim: RA_CURR_2026_07_05_L08_FIXED_BS_JOIN_v2

archive_lineage_policy: active_curriculum_revision_from_human_playtest
source_candidate_version: RA_CURR_2026_07_05_L08_FIXED_BS_JOIN_v1
revision_authority: HP_RA_CURR_2026_07_05_L08_FIXED_BS_JOIN_v1_001

## Design Claim

player_insight:
  第八关固定 B/S joining 应用保留 v1 的核心：crate 被推入 sticky side 后变成 sticky，并与下方黏块拼接；玩家随后利用新形成的刚体覆盖目标。起点移到右侧中间后，开局不再一键触发正解转换。

causal_chain:
  1. 玩家从右侧中间回到 crate 上方入口。
  2. 向下推 crate 进入 sticky side，触发 box_to_sticky 与 sticky_merge。
  3. 走到左侧，将合并后的 sticky 刚体向右推两次覆盖目标。

why_not_execution:
  这是短应用 witness；新增走位不是核心机制，但降低“第一步直接正解”的脚本感，让玩家先看到空间和入口再提交转换。

falsification:
  若存在不触发 box_to_sticky、sticky_merge 或 move_sticky_rigid 的胜路，或 B/S 可移动，或开局第一步直接触发核心转换，则不满足本次修订 claim。

