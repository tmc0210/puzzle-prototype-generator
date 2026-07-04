# Fresh Design Claim: RA_CURR_2026_07_05_L04_MOVABLE_PL_TIMING_v1

slot: 第四关 / 可移动 P/L 推动时机
candidate_version: RA_CURR_2026_07_05_L04_MOVABLE_PL_TIMING_v1
archive_lineage_policy: fresh_required

## Brief

推拉锚点可推。整个关卡 push 与 pull 都需要实际用到，并且推动 P/L 是中间步骤，不是开局直接一推。玩家需要思考推拉锚点的推动时机。

## Design Claim

player_insight:
  玩家必须先在初始 pull side 把箱子向左拉到目标右侧附近；如果没有这一步，直接移动 P/L 只会改变边界而无法收束。箱子到位后，玩家再把 P/L 连续推到右端，让目标附近变回 push side，最后把箱子向左推上目标。

causal_chain:
  1. 初始边界下，玩家在 pull side 连续向左拉箱子两格。
  2. 玩家走到 P/L 左侧，将 P/L 向右推三格；这一步发生在箱子预处理之后。
  3. 边界右移后，玩家回到箱子右侧，用 push 把箱子向左推上目标。

why_not_execution:
  这不是开局一推锚点的 witness。锚点移动前必须先处理箱子位置；锚点移动后又反过来改变箱子处的施力语义，让同一只箱子从 pull 任务变成 push 任务。

required_winning_path_events:
  - pull_object
  - anchor_boundary_shift:push_pull
  - push_object

forbidden_winning_path_events:
  - box_to_sticky
  - sticky_to_box
  - sticky_merge
  - move_sticky_rigid

falsification:
  若存在缺少 pull、push 或 P/L 位移的胜路，或存在先移动 P/L 再处理箱子的胜路，则该设计不符合第四关槽位。若最短解第一步就是 P/L 位移，也不合格。

