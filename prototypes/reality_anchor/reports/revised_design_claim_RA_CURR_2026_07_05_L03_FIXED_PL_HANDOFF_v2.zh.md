# Revised Design Claim: RA_CURR_2026_07_05_L03_FIXED_PL_HANDOFF_v2

archive_lineage_policy: active_curriculum_revision_from_human_playtest
source_candidate_version: RA_CURR_2026_07_05_L03_FIXED_PL_HANDOFF_v1
revision_authority: HP_RA_CURR_2026_07_05_L03_FIXED_PL_HANDOFF_v1_001

## Design Claim

player_insight:
  第三关把 v1 的单推单拉 handoff 放大成同一箱子的短距离练习：玩家需要先在 push side
  将箱子向右推两格，再切到 pull side 将同一个箱子向下拉两格。推与拉方向不同，
  目标是熟悉固定 P/L 分界上的位置切换，而不是制造挑战深度。

causal_chain:
  1. 箱子从 push side 起步，向右推两次到目标上方。
  2. 玩家绕到箱子下方的 pull side。
  3. 第一次下拉把箱子带到目标上方一格，玩家站上目标但不胜利。
  4. 第二次下拉把箱子覆盖目标。
  5. 目标左侧补墙，阻止“一次 pull 后绕回上方再 push”的旁路。
  6. 左下角再补一格墙，截短开局 `下，右，下` 引向的死路，避免第三关用无机制收益的误导惩罚玩家。

why_not_execution:
  这是早期应用练习；它比 v1 多了实际重复操作和空间切换，但仍保持短小、低噪声。
  设计不声明审美高分，只声明同一箱子在固定 P/L 分界上承担 push-to-pull handoff。
  后续微调只减少左下无收益探索，不改变核心 push/pull handoff。

falsification:
  若存在无需 push、无需 pull、少于两次 push、少于两次 pull、P/L 可移动、
  或出现 B/S / sticky 材料事件的胜路，则该版本不满足第三关应用 claim。
