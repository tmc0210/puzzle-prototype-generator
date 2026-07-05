# Revised Design Claim: RA_CURR_2026_07_05_L05_LONG_EDGE_PL_v4

archive_lineage_policy: active_curriculum_revision_from_v3_critic
source_candidate_version: RA_CURR_2026_07_05_L05_LONG_EDGE_PL_v3
revision_authority: puzzle_critic_RA_CURR_2026_07_05_L05_LONG_EDGE_PL_v3_review_3

## Design Claim

player_insight:
  第五关应让玩家把普通箱子的开局处理、P/L 长边同向拉推、以及普通箱子的收尾处理读成同一条链。v4 用一次普通箱 pull 打开上层入口并预置同一只箱子；中段通过 P/L 右拉和右推移动边界；最后回到普通箱左侧 push 入目标。

causal_chain:
  1. 起点不能直接处理 P/L；玩家先向右拉普通箱，打开上层入口，并把箱子留在目标左侧。
  2. 玩家进入上层走廊，从 L 侧向右拉 P/L，完成长边同向第一段。
  3. 玩家绕到 P 侧，连续向右推 P/L 两次，使边界移动到足以支持底部收尾的位置。
  4. 玩家回到底部，从左侧推动开局那只普通箱入目标。最终动作回收开局预置，而不是附加任务。

why_not_execution:
  v4 明确修正 v2 的“第一步就是 P/L”问题，也修正 v3 的“早段多次拉箱像路线税”问题。它是强引导教学关，不追求开放搜索；风险是第二次连续 P/L 右推更像距离强化，而不是新洞见。

falsification:
  若存在缺少 anchor_pull_right、anchor_push_right、crate_pull、crate_push 的胜路，或少于三次 P/L boundary shift 的胜路，则 v4 不满足第五关 claim。若 playtest 玩家无法复述“拉箱开路并预置 -> 移动 P/L 边界 -> 回来推同箱完成”，也应继续微调。
