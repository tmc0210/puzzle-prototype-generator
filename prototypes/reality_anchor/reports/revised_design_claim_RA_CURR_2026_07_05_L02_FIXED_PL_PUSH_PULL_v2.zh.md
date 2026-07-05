# Revised Design Claim: RA_CURR_2026_07_05_L02_FIXED_PL_PUSH_PULL_v2

archive_lineage_policy: active_curriculum_revision_from_human_playtest
source_candidate_version: RA_CURR_2026_07_05_L02_FIXED_PL_PUSH_PULL_v1
revision_authority: HP_RA_CURR_2026_07_05_L02_FIXED_PL_PUSH_PULL_v1_001

## Design Claim

player_insight:
  第二关仍是固定 P/L 的推拉教学，但下方不再让玩家先从左侧尝试无反馈的推箱。
  玩家先完成上方单推 witness，再在下方被结构引导到箱子右侧，连续两次向右拉同一个箱子，
  从而明确学习 pull-side 的基本操作。

causal_chain:
  1. 上方 crate 位于 push side，向右推一次覆盖上目标。
  2. 下方 crate 左移到目标两格外；它上方与右上方封墙，减少从左侧推的误导。
  3. 玩家经中部通道到达下方 crate 右侧。
  4. 第一次右向 pull 把 crate 拉到中间格，玩家站到目标上但还未胜利。
  5. 第二次右向 pull 把 crate 拉到目标，完成下方 witness。

why_not_execution:
  这不是挑战型谜题；价值是把“pull 是把身后物体带过来”以连续两次的形式强制展示，
  修正 v1 下方可先误读为推箱的教学摩擦。

falsification:
  若存在无需 push 的胜路、无需 pull 的胜路、少于两次 pull 的胜路、P/L 可移动、
  或出现 B/S / sticky 材料事件，则该版本不满足第二关教学 claim。
