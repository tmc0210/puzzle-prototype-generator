# Fresh Design Claim: RA_CURR_2026_07_05_L12_FIXED_PARALLEL_DUAL_JOIN_v1

candidate_version: RA_CURR_2026_07_05_L12_FIXED_PARALLEL_DUAL_JOIN_v1
prototype: reality_anchor
slot: 第十二关 / 平行双固定锚点应用

## Claim

player_insight:
  两个锚点都是竖向、互相平行、墙隔离的固定锚点，实际效果分别来自固定 P/L 的 pull 区和固定 B/S 的材料边界。玩家需要让箱子越过 B/S 分界变成黏块，并和下方黏块拼成竖向二连；随后在 P/L 的 pull 区把二连黏块横向拉到双目标上。

causal_chain:
  1. 下推箱子，使它从 B 侧进入 S 侧，触发 `box_to_sticky` 和 `sticky_merge`。
  2. 走到拼接后竖向黏块的右侧。
  3. 在固定 P/L 的 pull 区连续右拉竖向黏块，最终上下两个目标同时被同一个二连黏块覆盖。

why_not_execution:
  这不是单纯“多推几步”的箱子替代关。两个目标会阻止原始单黏块直接覆盖；删上目标会释放缺少 `box_to_sticky` / `sticky_merge` 的胜路，删下目标会释放缺少 `pull_object` / `sticky_merge` / `move_sticky_rigid` 的胜路。

falsification:
  如果存在不使用 `pull_object`、`box_to_sticky`、`sticky_merge` 或 `move_sticky_rigid` 的胜路，或任一锚点在可达图中出现 `anchor_boundary_shift`，则该 claim 失败。`push_object` 不作为全胜路必要主张，因为存在较长 pull-only 反事实胜路。

## Evidence Summary

- `layout_analysis_RA_CURR_2026_07_05_L12_FIXED_PARALLEL_DUAL_JOIN_v1.md`: 5 步最短解，完整图 887 states / 2256 transitions。
- `event_probe_RA_CURR_2026_07_05_L12_FIXED_PARALLEL_DUAL_JOIN_v1_core.md`: `pull_object`、`box_to_sticky`、`sticky_merge`、`move_sticky_rigid` 均 complete/no bypass。
- `fixed_anchor_probe_RA_CURR_2026_07_05_L12_FIXED_PARALLEL_DUAL_JOIN_v1_fixedPL.md`: reachable scan complete，`anchor_boundary_shift:push_pull` forbidden hits none；固定 P/L 的 pull effect complete/no bypass。
- `fixed_anchor_probe_RA_CURR_2026_07_05_L12_FIXED_PARALLEL_DUAL_JOIN_v1_fixedBS.md`: reachable scan complete，`anchor_boundary_shift:box_sticky` forbidden hits none；固定 B/S material effect、`box_to_sticky`、`sticky_merge`、`move_sticky_rigid` complete/no bypass。
- `event_probe_RA_CURR_2026_07_05_L12_FIXED_PARALLEL_DUAL_JOIN_v1_no_top_goal_core.md`: 删除上目标后释放缺 `box_to_sticky` / `sticky_merge` 的胜路。
- `event_probe_RA_CURR_2026_07_05_L12_FIXED_PARALLEL_DUAL_JOIN_v1_no_lower_goal_core.md`: 删除下目标后释放缺 `pull_object` / `sticky_merge` / `move_sticky_rigid` 的胜路。

## Scope Limits

- 不声明 `push_object` 或 push-side 操作全胜路必要。
- 不声明唯一解、唯一对象身份、唯一终局或归档接受。
- 这是第十二关待玩候选，不替代已归档 0003；与 0003 的差异是两个锚点都固定且使用箱转黏拼接后横向 pull，而非可动 B/S 的 split-lift。
