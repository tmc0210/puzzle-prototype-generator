# Fresh Design Claim: RA_CURR_2026_07_05_L02_FIXED_PL_PUSH_PULL_v1

slot: 第二关 / 固定推拉锚点引入教学
candidate_version: RA_CURR_2026_07_05_L02_FIXED_PL_PUSH_PULL_v1
archive_lineage_policy: fresh_required

## Brief

固定 P/L 锚点，可以用墙隔离。要求玩家使用 push 与 pull 分别处理两个箱子到达目标点；可以是两个 witness 的组合。

## Design Claim

player_insight:
  玩家看到同一关内上下两个小任务：P 上方区域仍按普通推箱子处理，L 下方区域需要站在目标上向右走、把左侧箱子拉到目标上。P/L 本身不移动，只负责把推/拉语义分区。

causal_chain:
  1. 在上方 push side，向右推动上方箱子覆盖上目标。
  2. 走到下方 pull side 的下目标上。
  3. 向右移动，拉动左侧箱子覆盖下目标。

why_not_execution:
  这是两个 witness 的组合，重点不是搜索难度，而是让玩家在同一个固定锚点下连续比较 push 和 pull 的操作差异。玩家站在下目标上不算通关，必须把箱子拉到目标上。

required_winning_path_events:
  - push_object
  - pull_object

forbidden_winning_path_events:
  - anchor_boundary_shift
  - box_to_sticky
  - sticky_to_box
  - sticky_merge
  - move_sticky_rigid

falsification:
  若存在缺少 push_object 或 pull_object 的胜路、P/L 可达移动、出现任何 B/S 或材料事件，或删除任一目标后不降低核心事件需求，则该设计不符合第二关槽位。

