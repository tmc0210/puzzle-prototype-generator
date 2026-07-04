# Fresh Design Claim: RA_CURR_2026_07_05_L03_FIXED_PL_HANDOFF_v1

slot: 第三关 / 固定 P/L 应用
candidate_version: RA_CURR_2026_07_05_L03_FIXED_PL_HANDOFF_v1
archive_lineage_policy: fresh_required

## Brief

固定推拉锚点。玩家需要在 P/L 分界线附近做小腾挪，将同一个箱子移动到目标位置，并实际分别用到 push 和 pull。

## Design Claim

player_insight:
  同一个箱子不能直接推到目标；玩家需要先在 push side 把箱子推到目标正上方，再进入 pull side 站到目标上，从下方拉箱子覆盖目标。

causal_chain:
  1. 在 push side 向右推同一个箱子一格，准备出可被下拉的位置。
  2. 走到 pull side 的目标格。
  3. 向下移动，拉动身后的同一个箱子，让它覆盖目标。

why_not_execution:
  相比第二关的两个独立 witness，这里只有一个箱子和一个目标；玩家必须理解“先推到可拉位置，再用 pull 完成覆盖”的 handoff，而不是分别完成两个互不相关的小任务。

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
  若存在缺少 push 或 pull 的胜路、P/L 可达移动、或出现材料事件，则该设计不符合第三关槽位。若最短解可通过纯 push 从上方覆盖目标，也说明目标上方封锁失败。

