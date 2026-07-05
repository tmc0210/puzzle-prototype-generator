# Revised Design Claim: RA_CURR_2026_07_05_L05_LONG_EDGE_PL_v3

archive_lineage_policy: active_curriculum_revision_from_human_playtest
source_candidate_version: RA_CURR_2026_07_05_L05_LONG_EDGE_PL_v2
revision_authority: HP_RA_CURR_2026_07_05_L05_LONG_EDGE_PL_v2_001

## Design Claim

player_insight:
  第五关应让 P/L 长边同向 pull/push 成为中段推理，而不是开局按钮。v3 先用普通箱 pull 制造进入顶部区域的空间债务；玩家随后在中段右拉 P/L、再右推 P/L 改变边界，最后回到底部用普通箱 push 收束目标。

causal_chain:
  1. 右下起点不能直接碰 P/L；玩家先处理上方普通箱，拉开入口空间。
  2. 进入顶部 P/L 右侧后，右拉 P/L，完成同一长边第一段移动。
  3. 处理底部普通箱，将其拉到临时位置，为最终 push 留出路线。
  4. 返回顶部左侧右推 P/L，完成同一长边第二段移动并覆盖顶部目标。
  5. P/L 移动后仍需回到底部，把普通箱推入目标；P/L 不是最终动作。

why_not_execution:
  v3 优先修正 v2 的开局 P/L 按钮问题。路线较长且早段 crate pull 较多，这是需要 critic 攻击的风险；当前 claim 只说它把 P/L 时机移到中段，并保留长边同向 pull/push 与普通箱 push/pull 的必经关系。

falsification:
  若存在缺少 anchor_pull_right、anchor_push_right、crate_pull、crate_push，或少于两次 P/L shift 的胜路，则 v3 不满足第五关 claim。若 critic 判断 34 步路线主要是走位/重复拉箱 padding，也应继续重做。

