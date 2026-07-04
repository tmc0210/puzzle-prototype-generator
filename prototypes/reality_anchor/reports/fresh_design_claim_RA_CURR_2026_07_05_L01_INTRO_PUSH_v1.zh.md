# Fresh Design Claim: RA_CURR_2026_07_05_L01_INTRO_PUSH_v1

slot: 第一关 / intro
candidate_version: RA_CURR_2026_07_05_L01_INTRO_PUSH_v1
archive_lineage_policy: fresh_required

## Brief

纯推箱子，无锚点关。低难度 intro witness，用来教走路、推箱子、目标覆盖。

## Design Claim

player_insight:
  玩家只需要理解三个最基础事实：主角可以走到空地、从箱子后方推动箱子、箱子覆盖目标即胜利。

causal_chain:
  1. 先向右走到箱子左侧。
  2. 再向右推动箱子。
  3. 箱子进入目标格，触发 all_targets_covered_by_objects 胜利。

why_not_execution:
  这是 witness 关，不追求复杂洞见；难度来自第一次把“移动”和“推动箱子”区分出来，而不是路线搜索。

required_winning_path_events:
  - push_object

forbidden_winning_path_events:
  - pull_object
  - anchor_boundary_shift
  - box_to_sticky
  - sticky_to_box
  - sticky_merge
  - move_sticky_rigid

falsification:
  若最短解不是两步、无需 push_object 即可胜利、出现任何锚点/材料事件，或布局解析出 P/L、B/S、M，则该设计不符合第一关槽位。

