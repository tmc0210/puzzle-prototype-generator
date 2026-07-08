# 机制局部实验: ra_loop_pl_l_shape_lateral_handle_20260708_01

- 原型: reality_anchor
- 生成时间: 2026-07-08T09:50:22.949Z
- 标题: P/L L形活塞正交把手：朝向、侧拉与扫带
- 备注: 比较下凸/上凸、左脚/右脚 L 形在同一 P/L 横向 stroke 后，如何被同一墙位或可移动邻物消费。

## 结构族摘要

### pl_l_shape_lateral_handle
| case | variant | changed variable | contrast | return | final legal | final illegal | graph |
| --- | --- | --- | --- | --- | --- | --- | --- |
| dl_foot_side_wall_blocks_lateral_only | down_left_foot_side_target_wall | 下凸在左；同一墙位是侧拉目标格，不挡第一手 right | dr_foot_same_wall_blocks_first_stroke, dl_piston_shift_opens_lateral_handle | not applicable: replay stopped at illegal action; return search skipped | left, right | up:pull_world_front_blocked, down:force_blocked | complete / 1696 states |
| dr_foot_same_wall_blocks_first_stroke | down_right_foot_same_wall_first_block | 下凸在右；同一墙位变成第一手 right 的目标格 | dl_foot_side_wall_blocks_lateral_only | not applicable: replay stopped at illegal action; return search skipped | up, down, left | right:force_blocked | complete / 810 states |
| ul_foot_up_pull_right_target_wall | up_left_foot_top_target_wall | 上凸在左；同一墙位是侧拉目标格，不挡第一手 right | ur_foot_same_wall_blocks_first_stroke | not applicable: replay stopped at illegal action; return search skipped | left, right | up:force_blocked, down:pull_world_front_blocked | complete / 1279 states |
| ur_foot_same_wall_blocks_first_stroke | up_right_foot_same_wall_first_block | 上凸在右；同一墙位变成第一手 right 的目标格 | ul_foot_up_pull_right_target_wall | not applicable: replay stopped at illegal action; return search skipped | up, down, left | right:force_blocked | complete / 1207 states |
| dl_piston_shift_opens_lateral_handle | piston_shift_opens_lateral_handle | 初始下方把手格被墙封住；先 right 推出横向活塞，把把手移到开放列 | dl_foot_side_wall_blocks_lateral_only | yes depth=13 | left, right | up:pull_world_front_blocked, down:destination_blocked | complete / 1271 states |
| dl_lateral_sweeps_bs_anchor_to_goal | lateral_sweep_movable_anchor | 侧向目标格从墙换成可移动 B/S anchor | dl_foot_side_wall_blocks_lateral_only | unknown exhausted: state budget exceeded | left | up:pull_world_front_blocked, down:destination_blocked, right:pull_world_front_blocked | complete / 9038 states |

## dl_foot_side_wall_blocks_lateral_only

结构族: pl_l_shape_lateral_handle
变体: down_left_foot_side_target_wall
变化变量: 下凸在左；同一墙位是侧拉目标格，不挡第一手 right
对照: dr_foot_same_wall_blocks_first_stroke, dl_piston_shift_opens_lateral_handle
备注: 先 right 成功；同一墙格在 lateral down 时成为右臂目标墙，down pull force_blocked。
动作序列: right down down right down
反事实禁用: 无
预算: exploreDepth=14, returnDepth=24, maxStates=24000, maxTransitions=100000

layout:
```text
##########
#B########
#S#PL...G#
#........#
#..@MM...#
#...M.#..#
#........#
#........#
##########
```

初始状态:
```text
##########
#B########
#S#PL...G#
#........#
#..@MM...#
#...M.#..#
#........#
#........#
##########
```

动作回放:
- 1. right: legal; events=push_object:sticky#1,move_sticky_rigid; eventWin=no
```text
##########
#B########
#S#PL...G#
#........#
#...@MM..#
#....M#..#
#........#
#........#
##########
```
- 2. down: legal; events=walk; eventWin=no
```text
##########
#B########
#S#PL...G#
#........#
#....MM..#
#...@M#..#
#........#
#........#
##########
```
- 3. down: legal; events=walk; eventWin=no
```text
##########
#B########
#S#PL...G#
#........#
#....MM..#
#....M#..#
#...@....#
#........#
##########
```
- 4. right: legal; events=walk; eventWin=no
```text
##########
#B########
#S#PL...G#
#........#
#....MM..#
#....M#..#
#....@...#
#........#
##########
```
- 5. down: illegal (force_blocked); events=-; eventWin=no
```text
##########
#B########
#S#PL...G#
#........#
#....MM..#
#....M#..#
#....@...#
#........#
##########
```
- 后续动作未继续回放，因为动作序列中出现 illegal step。

最终状态:
```text
##########
#B########
#S#PL...G#
#........#
#....MM..#
#....M#..#
#....@...#
#........#
##########
```
变化格: (3,4) @->.; (4,4) M->.; (6,4) .->M; (4,5) M->.; (5,5) .->M; (5,6) .->@

最终状态动作表:
| action | legal | events | next / reason |
| --- | --- | --- | --- |
| up | no | - | pull_world_front_blocked |
| down | no | - | force_blocked |
| left | yes | walk | Ply:4,6\|C:\|M:5,4;6,4;5,5\|PL:P:3,2;L:4,2\|BS:B:1,1;S:1,2 |
| right | yes | walk | Ply:6,6\|C:\|M:5,4;6,4;5,5\|PL:P:3,2;L:4,2\|BS:B:1,1;S:1,2 |

回到初始: not applicable (replay stopped at illegal action; return search skipped)
局部可达图: status=complete, states=1696, transitions=3658, winStates=2, maxDepth=14
事件类型: anchor_boundary_shift:push_pull=164, force_chain:n2=20, move_sticky_rigid=200, pull_object:push_pull_anchor=75, pull_object:sticky#1=118, push_object:push_pull_anchor=79, push_object:sticky#1=72, walk=3314

## dr_foot_same_wall_blocks_first_stroke

结构族: pl_l_shape_lateral_handle
变体: down_right_foot_same_wall_first_block
变化变量: 下凸在右；同一墙位变成第一手 right 的目标格
对照: dl_foot_side_wall_blocks_lateral_only
备注: 镜像 L 形中，x6,y5 是下凸格 first stroke 目标，right 直接 force_blocked。
动作序列: right
反事实禁用: 无
预算: exploreDepth=14, returnDepth=24, maxStates=24000, maxTransitions=100000

layout:
```text
##########
#B########
#S#PL...G#
#........#
#..@MM...#
#....M#..#
#........#
#........#
##########
```

初始状态:
```text
##########
#B########
#S#PL...G#
#........#
#..@MM...#
#....M#..#
#........#
#........#
##########
```

动作回放:
- 1. right: illegal (force_blocked); events=-; eventWin=no
```text
##########
#B########
#S#PL...G#
#........#
#..@MM...#
#....M#..#
#........#
#........#
##########
```
- 后续动作未继续回放，因为动作序列中出现 illegal step。

最终状态:
```text
##########
#B########
#S#PL...G#
#........#
#..@MM...#
#....M#..#
#........#
#........#
##########
```
变化格: 无

最终状态动作表:
| action | legal | events | next / reason |
| --- | --- | --- | --- |
| up | yes | walk | Ply:3,3\|C:\|M:4,4;5,4;5,5\|PL:P:3,2;L:4,2\|BS:B:1,1;S:1,2 |
| down | yes | walk | Ply:3,5\|C:\|M:4,4;5,4;5,5\|PL:P:3,2;L:4,2\|BS:B:1,1;S:1,2 |
| left | yes | walk | Ply:2,4\|C:\|M:4,4;5,4;5,5\|PL:P:3,2;L:4,2\|BS:B:1,1;S:1,2 |
| right | no | - | force_blocked |

回到初始: not applicable (replay stopped at illegal action; return search skipped)
局部可达图: status=complete, states=810, transitions=1805, winStates=1, maxDepth=14
事件类型: anchor_boundary_shift:push_pull=63, force_chain:n2=7, move_sticky_rigid=101, pull_object:push_pull_anchor=44, pull_object:sticky#1=61, push_object:push_pull_anchor=16, push_object:sticky#1=36, walk=1648

## ul_foot_up_pull_right_target_wall

结构族: pl_l_shape_lateral_handle
变体: up_left_foot_top_target_wall
变化变量: 上凸在左；同一墙位是侧拉目标格，不挡第一手 right
对照: ur_foot_same_wall_blocks_first_stroke
备注: 先 right 后绕到上方把手；x6,y4 墙不挡 first stroke，但挡 up pull 的右臂目标格。
动作序列: right up up right up
反事实禁用: 无
预算: exploreDepth=14, returnDepth=24, maxStates=24000, maxTransitions=100000

layout:
```text
##########
#B########
#S#PL...G#
#........#
#...M.#..#
#..@MM...#
#........#
#........#
##########
```

初始状态:
```text
##########
#B########
#S#PL...G#
#........#
#...M.#..#
#..@MM...#
#........#
#........#
##########
```

动作回放:
- 1. right: legal; events=push_object:sticky#1,move_sticky_rigid; eventWin=no
```text
##########
#B########
#S#PL...G#
#........#
#....M#..#
#...@MM..#
#........#
#........#
##########
```
- 2. up: legal; events=walk; eventWin=no
```text
##########
#B########
#S#PL...G#
#........#
#...@M#..#
#....MM..#
#........#
#........#
##########
```
- 3. up: legal; events=walk; eventWin=no
```text
##########
#B########
#S#PL...G#
#...@....#
#....M#..#
#....MM..#
#........#
#........#
##########
```
- 4. right: legal; events=walk; eventWin=no
```text
##########
#B########
#S#PL...G#
#....@...#
#....M#..#
#....MM..#
#........#
#........#
##########
```
- 5. up: illegal (force_blocked); events=-; eventWin=no
```text
##########
#B########
#S#PL...G#
#....@...#
#....M#..#
#....MM..#
#........#
#........#
##########
```
- 后续动作未继续回放，因为动作序列中出现 illegal step。

最终状态:
```text
##########
#B########
#S#PL...G#
#....@...#
#....M#..#
#....MM..#
#........#
#........#
##########
```
变化格: (5,3) .->@; (4,4) M->.; (5,4) .->M; (3,5) @->.; (4,5) M->.; (6,5) .->M

最终状态动作表:
| action | legal | events | next / reason |
| --- | --- | --- | --- |
| up | no | - | force_blocked |
| down | no | - | pull_world_front_blocked |
| left | yes | walk | Ply:4,3\|C:\|M:5,4;5,5;6,5\|PL:P:3,2;L:4,2\|BS:B:1,1;S:1,2 |
| right | yes | walk | Ply:6,3\|C:\|M:5,4;5,5;6,5\|PL:P:3,2;L:4,2\|BS:B:1,1;S:1,2 |

回到初始: not applicable (replay stopped at illegal action; return search skipped)
局部可达图: status=complete, states=1279, transitions=2715, winStates=1, maxDepth=14
事件类型: anchor_boundary_shift:push_pull=133, force_chain:n2=16, move_sticky_rigid=173, pull_object:push_pull_anchor=60, pull_object:sticky#1=93, push_object:push_pull_anchor=62, push_object:sticky#1=75, walk=2425

## ur_foot_same_wall_blocks_first_stroke

结构族: pl_l_shape_lateral_handle
变体: up_right_foot_same_wall_first_block
变化变量: 上凸在右；同一墙位变成第一手 right 的目标格
对照: ul_foot_up_pull_right_target_wall
备注: 上凸镜像后，x6,y4 是 first stroke 中上凸格目标，right 直接 force_blocked。
动作序列: right
反事实禁用: 无
预算: exploreDepth=14, returnDepth=24, maxStates=24000, maxTransitions=100000

layout:
```text
##########
#B########
#S#PL...G#
#........#
#....M#..#
#..@MM...#
#........#
#........#
##########
```

初始状态:
```text
##########
#B########
#S#PL...G#
#........#
#....M#..#
#..@MM...#
#........#
#........#
##########
```

动作回放:
- 1. right: illegal (force_blocked); events=-; eventWin=no
```text
##########
#B########
#S#PL...G#
#........#
#....M#..#
#..@MM...#
#........#
#........#
##########
```
- 后续动作未继续回放，因为动作序列中出现 illegal step。

最终状态:
```text
##########
#B########
#S#PL...G#
#........#
#....M#..#
#..@MM...#
#........#
#........#
##########
```
变化格: 无

最终状态动作表:
| action | legal | events | next / reason |
| --- | --- | --- | --- |
| up | yes | walk | Ply:3,4\|C:\|M:5,4;4,5;5,5\|PL:P:3,2;L:4,2\|BS:B:1,1;S:1,2 |
| down | yes | walk | Ply:3,6\|C:\|M:5,4;4,5;5,5\|PL:P:3,2;L:4,2\|BS:B:1,1;S:1,2 |
| left | yes | walk | Ply:2,5\|C:\|M:5,4;4,5;5,5\|PL:P:3,2;L:4,2\|BS:B:1,1;S:1,2 |
| right | no | - | force_blocked |

回到初始: not applicable (replay stopped at illegal action; return search skipped)
局部可达图: status=complete, states=1207, transitions=2713, winStates=1, maxDepth=14
事件类型: anchor_boundary_shift:push_pull=96, force_chain:n2=6, move_sticky_rigid=167, pull_object:push_pull_anchor=54, pull_object:sticky#1=77, push_object:push_pull_anchor=40, push_object:sticky#1=86, walk=2456

## dl_piston_shift_opens_lateral_handle

结构族: pl_l_shape_lateral_handle
变体: piston_shift_opens_lateral_handle
变化变量: 初始下方把手格被墙封住；先 right 推出横向活塞，把把手移到开放列
对照: dl_foot_side_wall_blocks_lateral_only
备注: 不先横推时初始把手格不可用；right 后玩家绕到新下方把手并 down pull 侧拉。
动作序列: right up left down down down down right right up down
反事实禁用: 无
预算: exploreDepth=14, returnDepth=24, maxStates=24000, maxTransitions=100000

layout:
```text
##########
#B########
#S#PL...G#
#........#
#..@MM...#
#...M....#
#...#....#
#........#
##########
```

初始状态:
```text
##########
#B########
#S#PL...G#
#........#
#..@MM...#
#...M....#
#...#....#
#........#
##########
```

动作回放:
- 1. right: legal; events=push_object:sticky#1,move_sticky_rigid; eventWin=no
```text
##########
#B########
#S#PL...G#
#........#
#...@MM..#
#....M...#
#...#....#
#........#
##########
```
- 2. up: legal; events=walk; eventWin=no
```text
##########
#B########
#S#PL...G#
#...@....#
#....MM..#
#....M...#
#...#....#
#........#
##########
```
- 3. left: legal; events=walk; eventWin=no
```text
##########
#B########
#S#PL...G#
#..@.....#
#....MM..#
#....M...#
#...#....#
#........#
##########
```
- 4. down: legal; events=walk; eventWin=no
```text
##########
#B########
#S#PL...G#
#........#
#..@.MM..#
#....M...#
#...#....#
#........#
##########
```
- 5. down: legal; events=walk; eventWin=no
```text
##########
#B########
#S#PL...G#
#........#
#....MM..#
#..@.M...#
#...#....#
#........#
##########
```
- 6. down: legal; events=walk; eventWin=no
```text
##########
#B########
#S#PL...G#
#........#
#....MM..#
#....M...#
#..@#....#
#........#
##########
```
- 7. down: legal; events=walk; eventWin=no
```text
##########
#B########
#S#PL...G#
#........#
#....MM..#
#....M...#
#...#....#
#..@.....#
##########
```
- 8. right: legal; events=walk; eventWin=no
```text
##########
#B########
#S#PL...G#
#........#
#....MM..#
#....M...#
#...#....#
#...@....#
##########
```
- 9. right: legal; events=walk; eventWin=no
```text
##########
#B########
#S#PL...G#
#........#
#....MM..#
#....M...#
#...#....#
#....@...#
##########
```
- 10. up: legal; events=walk; eventWin=no
```text
##########
#B########
#S#PL...G#
#........#
#....MM..#
#....M...#
#...#@...#
#........#
##########
```
- 11. down: legal; events=pull_object:sticky#1,move_sticky_rigid; eventWin=no
```text
##########
#B########
#S#PL...G#
#........#
#........#
#....MM..#
#...#M...#
#....@...#
##########
```

最终状态:
```text
##########
#B########
#S#PL...G#
#........#
#........#
#....MM..#
#...#M...#
#....@...#
##########
```
变化格: (3,4) @->.; (4,4) M->.; (5,4) M->.; (4,5) M->.; (5,5) .->M; (6,5) .->M; (5,6) .->M; (5,7) .->@

最终状态动作表:
| action | legal | events | next / reason |
| --- | --- | --- | --- |
| up | no | - | pull_world_front_blocked |
| down | no | - | destination_blocked |
| left | yes | walk | Ply:4,7\|C:\|M:5,5;6,5;5,6\|PL:P:3,2;L:4,2\|BS:B:1,1;S:1,2 |
| right | yes | walk | Ply:6,7\|C:\|M:5,5;6,5;5,6\|PL:P:3,2;L:4,2\|BS:B:1,1;S:1,2 |

回到初始: yes, depth=13, path=left left up up up right right up left down left up down
局部可达图: status=complete, states=1271, transitions=2665, winStates=2, maxDepth=14
事件类型: anchor_boundary_shift:push_pull=113, force_chain:n2=17, move_sticky_rigid=222, pull_object:push_pull_anchor=57, pull_object:sticky#1=149, push_object:push_pull_anchor=50, push_object:sticky#1=62, walk=2347

## dl_lateral_sweeps_bs_anchor_to_goal

结构族: pl_l_shape_lateral_handle
变体: lateral_sweep_movable_anchor
变化变量: 侧向目标格从墙换成可移动 B/S anchor
对照: dl_foot_side_wall_blocks_lateral_only
备注: 同一侧向目标位放 B/S anchor 而非墙，down pull 用 L 形右臂扫带 B/S anchor 下移并覆盖目标。
动作序列: right down down right down
反事实禁用: 无
预算: exploreDepth=14, returnDepth=24, maxStates=24000, maxTransitions=100000

layout:
```text
##########
#........#
#..PL....#
#........#
#..@MM...#
#...M.S..#
#.....B..#
#.....G..#
##########
```

初始状态:
```text
##########
#........#
#..PL....#
#........#
#..@MM...#
#...M.S..#
#.....B..#
#.....G..#
##########
```

动作回放:
- 1. right: legal; events=push_object:sticky#1,move_sticky_rigid; eventWin=no
```text
##########
#........#
#..PL....#
#........#
#...@MM..#
#....MS..#
#.....B..#
#.....G..#
##########
```
- 2. down: legal; events=walk; eventWin=no
```text
##########
#........#
#..PL....#
#........#
#....MM..#
#...@MS..#
#.....B..#
#.....G..#
##########
```
- 3. down: legal; events=walk; eventWin=no
```text
##########
#........#
#..PL....#
#........#
#....MM..#
#....MS..#
#...@.B..#
#.....G..#
##########
```
- 4. right: legal; events=walk; eventWin=no
```text
##########
#........#
#..PL....#
#........#
#....MM..#
#....MS..#
#....@B..#
#.....G..#
##########
```
- 5. down: legal; events=pull_object:sticky#1,force_chain:n2,anchor_boundary_shift:box_sticky,move_sticky_rigid; eventWin=no
```text
##########
#........#
#..PL....#
#........#
#........#
#....MM..#
#....MS..#
#....@B..#
##########
```

最终状态:
```text
##########
#........#
#..PL....#
#........#
#........#
#....MM..#
#....MS..#
#....@B..#
##########
```
变化格: (3,4) @->.; (4,4) M->.; (5,4) M->.; (4,5) M->.; (5,5) .->M; (6,5) S->M; (5,6) .->M; (6,6) B->S; (5,7) .->@; (6,7) G->B

最终状态动作表:
| action | legal | events | next / reason |
| --- | --- | --- | --- |
| up | no | - | pull_world_front_blocked |
| down | no | - | destination_blocked |
| left | yes | pull_object:box_sticky_anchor,force_chain:n2,anchor_boundary_shift:box_sticky,move_sticky_rigid | Ply:4,7\|C:\|M:4,5;5,5;4,6\|PL:P:3,2;L:4,2\|BS:B:5,7;S:5,6 |
| right | no | - | pull_world_front_blocked |

回到初始: unknown (exhausted: state budget exceeded; 不可当作 no)
局部可达图: status=complete, states=9038, transitions=17999, winStates=92, maxDepth=14
事件类型: anchor_boundary_shift:box_sticky=839, anchor_boundary_shift:push_pull=765, box_to_sticky:n1=39, box_to_sticky:n2=8, force_chain:n2=362, force_chain:n3=54, force_chain:n4=4, move_sticky_rigid=1017, pull_object:box_sticky_anchor=466, pull_object:crate#1=29, pull_object:crate#2=14, pull_object:crate#3=30, pull_object:push_pull_anchor=317, pull_object:sticky#1=528, push_object:box_sticky_anchor=166, push_object:crate#1=106, push_object:crate#2=35, push_object:crate#3=25, push_object:push_pull_anchor=383, push_object:sticky#1=409, sticky_merge:n1=28, sticky_to_box:n1=97, sticky_to_box:n2=91, sticky_to_box:n3=2, walk=15491

