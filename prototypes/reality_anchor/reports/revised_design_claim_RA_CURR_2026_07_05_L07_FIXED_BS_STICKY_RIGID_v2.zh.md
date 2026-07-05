# Revised Design Claim: RA_CURR_2026_07_05_L07_FIXED_BS_STICKY_RIGID_v2

archive_lineage_policy: active_curriculum_revision_from_human_playtest
source_candidate_version: RA_CURR_2026_07_05_L07_FIXED_BS_STICKY_RIGID_v1
revision_authority: HP_RA_CURR_2026_07_05_L07_FIXED_BS_STICKY_RIGID_v1_001

## Design Claim

player_insight:
  第七关是固定 B/S 下的黏块性质 intro。两个黏块开始时分离，玩家第一推将上方黏块推到下方黏块旁边，立即见证 `sticky_merge`；第二推把合并后的刚体一起推到目标。

causal_chain:
  1. 下方黏块右移，旧位置变墙，保证两块初始不相连。
  2. 玩家右推上方黏块，形成邻接并触发 sticky_merge。
  3. 合并后的二格刚体被再次右推，下方格覆盖目标。

why_not_execution:
  这是强制教学 witness，不追求搜索深度；它要把“黏块会拼接并作为刚体移动”放在两个输入内展示清楚。

falsification:
  若存在不触发 sticky_merge 或不触发 move_sticky_rigid 的胜路，或者出现 B/S 位移、P/L 位移、box_to_sticky/sticky_to_box 转化，则不满足第七关 intro claim。

