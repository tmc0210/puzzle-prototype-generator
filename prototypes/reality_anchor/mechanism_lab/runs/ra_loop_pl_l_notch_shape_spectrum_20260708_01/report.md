# 机制局部实验: ra_loop_pl_l_notch_shape_spectrum_20260708_01

- 原型: reality_anchor
- 生成时间: 2026-07-08T10:12:38.342Z
- 标题: P/L L形缺角活塞：非对称形状谱
- 备注: 排除左右上下镜像，只用一个规范方向比较缺角、横条退化、长横臂、长竖腿、目标墙和扫带 consumer。

## 结构族摘要

### pl_l_notch_shape_spectrum
| case | variant | changed variable | contrast | return | final legal | final illegal | graph |
| --- | --- | --- | --- | --- | --- | --- | --- |
| base_l_triomino_success | base_l_triomino | 规范左下缺角 3-cell L | bar_no_notch_walk, top_arm_right_success, vertical_leg_down_success | yes depth=2 | down, left | up:pull_world_front_blocked, right:pull_world_front_blocked | complete / 581 states |
| bar_no_notch_walk | no_notch_bar | 去掉缺角：换成横条 | base_l_triomino_success | yes depth=2 | up, down, left, right | - | complete / 773 states |
| top_arm_right_success | top_arm_right_success | 上横臂向前加长一格 | base_l_triomino_success, top_arm_right_target_wall | yes depth=2 | down, left | up:pull_world_front_blocked, right:pull_world_front_blocked | complete / 502 states |
| top_arm_right_target_wall | top_arm_right_target_wall | 长上横臂的外侧目标格加墙 | top_arm_right_success | not applicable: replay stopped at illegal action; return search skipped | left | up:pull_world_front_blocked, down:force_blocked, right:pull_world_front_blocked | complete / 298 states |
| top_arm_left_tail_success | top_arm_left_tail_success | 上横臂向后加长一格 | top_arm_right_success | yes depth=2 | down, left | up:pull_world_front_blocked, right:pull_world_front_blocked | complete / 498 states |
| vertical_leg_down_success | vertical_leg_down_success | 右竖腿向下加长一格 | base_l_triomino_success, vertical_leg_down_low_wall | yes depth=2 | left | up:pull_world_front_blocked, down:force_blocked, right:pull_world_front_blocked | complete / 443 states |
| vertical_leg_down_low_wall | vertical_leg_down_low_wall | 长竖腿最低目标格加墙 | vertical_leg_down_success | not applicable: replay stopped at illegal action; return search skipped | left | up:pull_world_front_blocked, down:force_blocked, right:pull_world_front_blocked | complete / 353 states |
| base_target_bs_anchor_swept | base_target_bs_anchor_swept | 规范 L 的外部目标格放 B/S anchor | base_l_triomino_success | yes depth=12 | left | up:pull_world_front_blocked, down:force_blocked, right:pull_world_front_blocked | complete / 2014 states |

## base_l_triomino_success

结构族: pl_l_notch_shape_spectrum
变体: base_l_triomino
变化变量: 规范左下缺角 3-cell L
对照: bar_no_notch_walk, top_arm_right_success, vertical_leg_down_success
备注: 玩家站在缺角中；right 后立即 down pull，整块下移。
动作序列: right down
反事实禁用: 无
预算: exploreDepth=10, returnDepth=20, maxStates=20000, maxTransitions=80000

layout:
```text
###########
#B#########
#S#PL....G#
#.........#
#..MM.....#
#..@M.....#
#.........#
#.........#
###########
```

初始状态:
```text
###########
#B#########
#S#PL....G#
#.........#
#..MM.....#
#..@M.....#
#.........#
#.........#
###########
```

动作回放:
- 1. right: legal; events=push_object:sticky#1,move_sticky_rigid; eventWin=no
```text
###########
#B#########
#S#PL....G#
#.........#
#...MM....#
#...@M....#
#.........#
#.........#
###########
```
- 2. down: legal; events=pull_object:sticky#1,move_sticky_rigid; eventWin=no
```text
###########
#B#########
#S#PL....G#
#.........#
#.........#
#...MM....#
#...@M....#
#.........#
###########
```

最终状态:
```text
###########
#B#########
#S#PL....G#
#.........#
#.........#
#...MM....#
#...@M....#
#.........#
###########
```
变化格: (3,4) M->.; (4,4) M->.; (3,5) @->.; (5,5) .->M; (4,6) .->@; (5,6) .->M

最终状态动作表:
| action | legal | events | next / reason |
| --- | --- | --- | --- |
| up | no | - | pull_world_front_blocked |
| down | yes | pull_object:sticky#1,move_sticky_rigid | Ply:4,7\|C:\|M:4,6;5,6;5,7\|PL:P:3,2;L:4,2\|BS:B:1,1;S:1,2 |
| left | yes | pull_object:sticky#1,move_sticky_rigid | Ply:3,6\|C:\|M:3,5;4,5;4,6\|PL:P:3,2;L:4,2\|BS:B:1,1;S:1,2 |
| right | no | - | pull_world_front_blocked |

回到初始: yes, depth=2, path=left up
局部可达图: status=complete, states=581, transitions=1306, winStates=0, maxDepth=10
事件类型: anchor_boundary_shift:push_pull=40, force_chain:n2=5, move_sticky_rigid=100, pull_object:push_pull_anchor=26, pull_object:sticky#1=80, push_object:push_pull_anchor=10, push_object:sticky#1=19, walk=1171

## bar_no_notch_walk

结构族: pl_l_notch_shape_spectrum
变体: no_notch_bar
变化变量: 去掉缺角：换成横条
对照: base_l_triomino_success
备注: 同样 right,down；第二手没有身后对象，只是 walk。
动作序列: right down
反事实禁用: 无
预算: exploreDepth=10, returnDepth=20, maxStates=20000, maxTransitions=80000

layout:
```text
###########
#B#########
#S#PL....G#
#.........#
#.........#
#..@MM....#
#.........#
#.........#
###########
```

初始状态:
```text
###########
#B#########
#S#PL....G#
#.........#
#.........#
#..@MM....#
#.........#
#.........#
###########
```

动作回放:
- 1. right: legal; events=push_object:sticky#1,move_sticky_rigid; eventWin=no
```text
###########
#B#########
#S#PL....G#
#.........#
#.........#
#...@MM...#
#.........#
#.........#
###########
```
- 2. down: legal; events=walk; eventWin=no
```text
###########
#B#########
#S#PL....G#
#.........#
#.........#
#....MM...#
#...@.....#
#.........#
###########
```

最终状态:
```text
###########
#B#########
#S#PL....G#
#.........#
#.........#
#....MM...#
#...@.....#
#.........#
###########
```
变化格: (3,5) @->.; (4,5) M->.; (6,5) .->M; (4,6) .->@

最终状态动作表:
| action | legal | events | next / reason |
| --- | --- | --- | --- |
| up | yes | walk | Ply:4,5\|C:\|M:5,5;6,5\|PL:P:3,2;L:4,2\|BS:B:1,1;S:1,2 |
| down | yes | walk | Ply:4,7\|C:\|M:5,5;6,5\|PL:P:3,2;L:4,2\|BS:B:1,1;S:1,2 |
| left | yes | walk | Ply:3,6\|C:\|M:5,5;6,5\|PL:P:3,2;L:4,2\|BS:B:1,1;S:1,2 |
| right | yes | walk | Ply:5,6\|C:\|M:5,5;6,5\|PL:P:3,2;L:4,2\|BS:B:1,1;S:1,2 |

回到初始: yes, depth=2, path=up left
局部可达图: status=complete, states=773, transitions=1607, winStates=0, maxDepth=10
事件类型: anchor_boundary_shift:push_pull=70, force_chain:n2=4, move_sticky_rigid=84, pull_object:push_pull_anchor=47, pull_object:sticky#1=76, push_object:push_pull_anchor=21, push_object:sticky#1=6, walk=1457

## top_arm_right_success

结构族: pl_l_notch_shape_spectrum
变体: top_arm_right_success
变化变量: 上横臂向前加长一格
对照: base_l_triomino_success, top_arm_right_target_wall
备注: 长上横臂仍可一推即侧拉，但新增右外侧目标格。
动作序列: right down
反事实禁用: 无
预算: exploreDepth=10, returnDepth=20, maxStates=20000, maxTransitions=80000

layout:
```text
###########
#B#########
#S#PL....G#
#.........#
#..MMM....#
#..@M.....#
#.........#
#.........#
###########
```

初始状态:
```text
###########
#B#########
#S#PL....G#
#.........#
#..MMM....#
#..@M.....#
#.........#
#.........#
###########
```

动作回放:
- 1. right: legal; events=push_object:sticky#1,move_sticky_rigid; eventWin=no
```text
###########
#B#########
#S#PL....G#
#.........#
#...MMM...#
#...@M....#
#.........#
#.........#
###########
```
- 2. down: legal; events=pull_object:sticky#1,move_sticky_rigid; eventWin=no
```text
###########
#B#########
#S#PL....G#
#.........#
#.........#
#...MMM...#
#...@M....#
#.........#
###########
```

最终状态:
```text
###########
#B#########
#S#PL....G#
#.........#
#.........#
#...MMM...#
#...@M....#
#.........#
###########
```
变化格: (3,4) M->.; (4,4) M->.; (5,4) M->.; (3,5) @->.; (5,5) .->M; (6,5) .->M; (4,6) .->@; (5,6) .->M

最终状态动作表:
| action | legal | events | next / reason |
| --- | --- | --- | --- |
| up | no | - | pull_world_front_blocked |
| down | yes | pull_object:sticky#1,move_sticky_rigid | Ply:4,7\|C:\|M:4,6;5,6;6,6;5,7\|PL:P:3,2;L:4,2\|BS:B:1,1;S:1,2 |
| left | yes | pull_object:sticky#1,move_sticky_rigid | Ply:3,6\|C:\|M:3,5;4,5;5,5;4,6\|PL:P:3,2;L:4,2\|BS:B:1,1;S:1,2 |
| right | no | - | pull_world_front_blocked |

回到初始: yes, depth=2, path=left up
局部可达图: status=complete, states=502, transitions=1125, winStates=0, maxDepth=10
事件类型: anchor_boundary_shift:push_pull=37, force_chain:n2=5, move_sticky_rigid=119, pull_object:push_pull_anchor=23, pull_object:sticky#1=99, push_object:push_pull_anchor=10, push_object:sticky#1=19, walk=974

## top_arm_right_target_wall

结构族: pl_l_notch_shape_spectrum
变体: top_arm_right_target_wall
变化变量: 长上横臂的外侧目标格加墙
对照: top_arm_right_success
备注: 第一手 right 成功；第二手 down 因新增外侧目标格撞墙而 force_blocked。
动作序列: right down
反事实禁用: 无
预算: exploreDepth=10, returnDepth=20, maxStates=20000, maxTransitions=80000

layout:
```text
###########
#B#########
#S#PL....G#
#.........#
#..MMM....#
#..@M.#...#
#.........#
#.........#
###########
```

初始状态:
```text
###########
#B#########
#S#PL....G#
#.........#
#..MMM....#
#..@M.#...#
#.........#
#.........#
###########
```

动作回放:
- 1. right: legal; events=push_object:sticky#1,move_sticky_rigid; eventWin=no
```text
###########
#B#########
#S#PL....G#
#.........#
#...MMM...#
#...@M#...#
#.........#
#.........#
###########
```
- 2. down: illegal (force_blocked); events=-; eventWin=no
```text
###########
#B#########
#S#PL....G#
#.........#
#...MMM...#
#...@M#...#
#.........#
#.........#
###########
```
- 后续动作未继续回放，因为动作序列中出现 illegal step。

最终状态:
```text
###########
#B#########
#S#PL....G#
#.........#
#...MMM...#
#...@M#...#
#.........#
#.........#
###########
```
变化格: (3,4) M->.; (6,4) .->M; (3,5) @->.; (4,5) M->@; (5,5) .->M

最终状态动作表:
| action | legal | events | next / reason |
| --- | --- | --- | --- |
| up | no | - | pull_world_front_blocked |
| down | no | - | force_blocked |
| left | yes | pull_object:sticky#1,move_sticky_rigid | Ply:3,5\|C:\|M:3,4;4,4;5,4;4,5\|PL:P:3,2;L:4,2\|BS:B:1,1;S:1,2 |
| right | no | - | pull_world_front_blocked |

回到初始: not applicable (replay stopped at illegal action; return search skipped)
局部可达图: status=complete, states=298, transitions=676, winStates=0, maxDepth=10
事件类型: anchor_boundary_shift:push_pull=21, force_chain:n2=3, move_sticky_rigid=49, pull_object:push_pull_anchor=14, pull_object:sticky#1=36, push_object:push_pull_anchor=5, push_object:sticky#1=12, walk=609

## top_arm_left_tail_success

结构族: pl_l_notch_shape_spectrum
变体: top_arm_left_tail_success
变化变量: 上横臂向后加长一格
对照: top_arm_right_success
备注: 向后尾巴不新增同一外侧墙门，但改变回撤占格；仍可一推即侧拉。
动作序列: right down
反事实禁用: 无
预算: exploreDepth=10, returnDepth=20, maxStates=20000, maxTransitions=80000

layout:
```text
###########
#B#########
#S#PL....G#
#.........#
#.MMM.....#
#..@M.....#
#.........#
#.........#
###########
```

初始状态:
```text
###########
#B#########
#S#PL....G#
#.........#
#.MMM.....#
#..@M.....#
#.........#
#.........#
###########
```

动作回放:
- 1. right: legal; events=push_object:sticky#1,move_sticky_rigid; eventWin=no
```text
###########
#B#########
#S#PL....G#
#.........#
#..MMM....#
#...@M....#
#.........#
#.........#
###########
```
- 2. down: legal; events=pull_object:sticky#1,move_sticky_rigid; eventWin=no
```text
###########
#B#########
#S#PL....G#
#.........#
#.........#
#..MMM....#
#...@M....#
#.........#
###########
```

最终状态:
```text
###########
#B#########
#S#PL....G#
#.........#
#.........#
#..MMM....#
#...@M....#
#.........#
###########
```
变化格: (2,4) M->.; (3,4) M->.; (4,4) M->.; (3,5) @->M; (5,5) .->M; (4,6) .->@; (5,6) .->M

最终状态动作表:
| action | legal | events | next / reason |
| --- | --- | --- | --- |
| up | no | - | pull_world_front_blocked |
| down | yes | pull_object:sticky#1,move_sticky_rigid | Ply:4,7\|C:\|M:3,6;4,6;5,6;5,7\|PL:P:3,2;L:4,2\|BS:B:1,1;S:1,2 |
| left | yes | pull_object:sticky#1,move_sticky_rigid | Ply:3,6\|C:\|M:2,5;3,5;4,5;4,6\|PL:P:3,2;L:4,2\|BS:B:1,1;S:1,2 |
| right | no | - | pull_world_front_blocked |

回到初始: yes, depth=2, path=left up
局部可达图: status=complete, states=498, transitions=1148, winStates=0, maxDepth=10
事件类型: anchor_boundary_shift:push_pull=21, move_sticky_rigid=97, pull_object:push_pull_anchor=19, pull_object:sticky#1=66, push_object:push_pull_anchor=2, push_object:sticky#1=31, walk=1030

## vertical_leg_down_success

结构族: pl_l_notch_shape_spectrum
变体: vertical_leg_down_success
变化变量: 右竖腿向下加长一格
对照: base_l_triomino_success, vertical_leg_down_low_wall
备注: 长竖腿仍可一推即侧拉，但最低目标格成为新增门。
动作序列: right down
反事实禁用: 无
预算: exploreDepth=10, returnDepth=20, maxStates=20000, maxTransitions=80000

layout:
```text
###########
#B#########
#S#PL....G#
#.........#
#..MM.....#
#..@M.....#
#...M.....#
#.........#
###########
```

初始状态:
```text
###########
#B#########
#S#PL....G#
#.........#
#..MM.....#
#..@M.....#
#...M.....#
#.........#
###########
```

动作回放:
- 1. right: legal; events=push_object:sticky#1,move_sticky_rigid; eventWin=no
```text
###########
#B#########
#S#PL....G#
#.........#
#...MM....#
#...@M....#
#....M....#
#.........#
###########
```
- 2. down: legal; events=pull_object:sticky#1,move_sticky_rigid; eventWin=no
```text
###########
#B#########
#S#PL....G#
#.........#
#.........#
#...MM....#
#...@M....#
#....M....#
###########
```

最终状态:
```text
###########
#B#########
#S#PL....G#
#.........#
#.........#
#...MM....#
#...@M....#
#....M....#
###########
```
变化格: (3,4) M->.; (4,4) M->.; (3,5) @->.; (5,5) .->M; (4,6) M->@; (5,6) .->M; (5,7) .->M

最终状态动作表:
| action | legal | events | next / reason |
| --- | --- | --- | --- |
| up | no | - | pull_world_front_blocked |
| down | no | - | force_blocked |
| left | yes | pull_object:sticky#1,move_sticky_rigid | Ply:3,6\|C:\|M:3,5;4,5;4,6;4,7\|PL:P:3,2;L:4,2\|BS:B:1,1;S:1,2 |
| right | no | - | pull_world_front_blocked |

回到初始: yes, depth=2, path=left up
局部可达图: status=complete, states=443, transitions=981, winStates=0, maxDepth=10
事件类型: anchor_boundary_shift:push_pull=39, force_chain:n2=6, move_sticky_rigid=87, pull_object:push_pull_anchor=24, pull_object:sticky#1=70, push_object:push_pull_anchor=10, push_object:sticky#1=16, walk=861

## vertical_leg_down_low_wall

结构族: pl_l_notch_shape_spectrum
变体: vertical_leg_down_low_wall
变化变量: 长竖腿最低目标格加墙
对照: vertical_leg_down_success
备注: 第一手 right 成功；第二手 down 因长竖腿最低目标格撞墙而 force_blocked。
动作序列: right down
反事实禁用: 无
预算: exploreDepth=10, returnDepth=20, maxStates=20000, maxTransitions=80000

layout:
```text
###########
#B#########
#S#PL....G#
#.........#
#..MM.....#
#..@M.....#
#...M.....#
#....#....#
###########
```

初始状态:
```text
###########
#B#########
#S#PL....G#
#.........#
#..MM.....#
#..@M.....#
#...M.....#
#....#....#
###########
```

动作回放:
- 1. right: legal; events=push_object:sticky#1,move_sticky_rigid; eventWin=no
```text
###########
#B#########
#S#PL....G#
#.........#
#...MM....#
#...@M....#
#....M....#
#....#....#
###########
```
- 2. down: illegal (force_blocked); events=-; eventWin=no
```text
###########
#B#########
#S#PL....G#
#.........#
#...MM....#
#...@M....#
#....M....#
#....#....#
###########
```
- 后续动作未继续回放，因为动作序列中出现 illegal step。

最终状态:
```text
###########
#B#########
#S#PL....G#
#.........#
#...MM....#
#...@M....#
#....M....#
#....#....#
###########
```
变化格: (3,4) M->.; (5,4) .->M; (3,5) @->.; (4,5) M->@; (5,5) .->M; (4,6) M->.; (5,6) .->M

最终状态动作表:
| action | legal | events | next / reason |
| --- | --- | --- | --- |
| up | no | - | pull_world_front_blocked |
| down | no | - | force_blocked |
| left | yes | pull_object:sticky#1,move_sticky_rigid | Ply:3,5\|C:\|M:3,4;4,4;4,5;4,6\|PL:P:3,2;L:4,2\|BS:B:1,1;S:1,2 |
| right | no | - | pull_world_front_blocked |

回到初始: not applicable (replay stopped at illegal action; return search skipped)
局部可达图: status=complete, states=353, transitions=754, winStates=0, maxDepth=10
事件类型: anchor_boundary_shift:push_pull=37, force_chain:n2=6, move_sticky_rigid=61, pull_object:push_pull_anchor=22, pull_object:sticky#1=48, push_object:push_pull_anchor=10, push_object:sticky#1=12, walk=662

## base_target_bs_anchor_swept

结构族: pl_l_notch_shape_spectrum
变体: base_target_bs_anchor_swept
变化变量: 规范 L 的外部目标格放 B/S anchor
对照: base_l_triomino_success
备注: 目标墙位置换成 B/S anchor；第二手 down 扫带 anchor 并覆盖目标。
动作序列: right down
反事实禁用: 无
预算: exploreDepth=10, returnDepth=20, maxStates=20000, maxTransitions=80000

layout:
```text
###########
#.........#
#..PL.....#
#.........#
#..MM.....#
#..@M.....#
#....S....#
#....B....#
#....G....#
###########
```

初始状态:
```text
###########
#.........#
#..PL.....#
#.........#
#..MM.....#
#..@M.....#
#....S....#
#....B....#
#....G....#
###########
```

动作回放:
- 1. right: legal; events=push_object:sticky#1,move_sticky_rigid; eventWin=no
```text
###########
#.........#
#..PL.....#
#.........#
#...MM....#
#...@M....#
#....S....#
#....B....#
#....G....#
###########
```
- 2. down: legal; events=pull_object:sticky#1,force_chain:n2,anchor_boundary_shift:box_sticky,move_sticky_rigid; eventWin=no
```text
###########
#.........#
#..PL.....#
#.........#
#.........#
#...MM....#
#...@M....#
#....S....#
#....B....#
###########
```

最终状态:
```text
###########
#.........#
#..PL.....#
#.........#
#.........#
#...MM....#
#...@M....#
#....S....#
#....B....#
###########
```
变化格: (3,4) M->.; (4,4) M->.; (3,5) @->.; (5,5) .->M; (4,6) .->@; (5,6) S->M; (5,7) B->S; (5,8) G->B

最终状态动作表:
| action | legal | events | next / reason |
| --- | --- | --- | --- |
| up | no | - | pull_world_front_blocked |
| down | no | - | force_blocked |
| left | yes | pull_object:sticky#1,move_sticky_rigid | Ply:3,6\|C:\|M:3,5;4,5;4,6\|PL:P:3,2;L:4,2\|BS:B:5,8;S:5,7 |
| right | no | - | pull_world_front_blocked |

回到初始: yes, depth=12, path=left up left up right right down down right up left left
局部可达图: status=complete, states=2014, transitions=3858, winStates=9, maxDepth=10
事件类型: anchor_boundary_shift:box_sticky=160, anchor_boundary_shift:push_pull=176, box_to_sticky:n1=2, force_chain:n2=68, force_chain:n3=4, move_sticky_rigid=286, pull_object:box_sticky_anchor=101, pull_object:crate#1=4, pull_object:crate#2=1, pull_object:crate#3=1, pull_object:push_pull_anchor=59, pull_object:sticky#1=140, push_object:box_sticky_anchor=26, push_object:crate#1=10, push_object:crate#2=1, push_object:push_pull_anchor=99, push_object:sticky#1=132, sticky_to_box:n1=24, sticky_to_box:n2=14, walk=3284

