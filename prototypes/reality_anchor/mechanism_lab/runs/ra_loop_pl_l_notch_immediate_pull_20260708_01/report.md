# 机制局部实验: ra_loop_pl_l_notch_immediate_pull_20260708_01

- 原型: reality_anchor
- 生成时间: 2026-07-08T09:57:17.947Z
- 标题: P/L L形缺角活塞：一推即侧拉
- 备注: 玩家初始站在 L 形 2x2 缺角中，第一手横向 push 跨 P/L 边界后，第二手立即正交 pull。

## 结构族摘要

### pl_l_notch_immediate_pull
| case | variant | changed variable | contrast | return | final legal | final illegal | graph |
| --- | --- | --- | --- | --- | --- | --- | --- |
| bl_notch_push_right_pull_down | bottom_left_notch_down_pull | 玩家在左下缺角；right 后立即 down pull | bar_notch_absent_pull_degenerates_to_walk, bl_notch_down_front_wall_blocks_pull, bl_notch_down_target_wall_blocks_shape | yes depth=2 | left | up:pull_world_front_blocked, down:destination_blocked, right:pull_world_front_blocked | complete / 383 states |
| tl_notch_push_right_pull_up | top_left_notch_up_pull | 玩家在左上缺角；right 后立即 up pull | bl_notch_push_right_pull_down | yes depth=2 | left | up:pull_world_front_blocked, down:pull_world_front_blocked, right:pull_world_front_blocked | complete / 458 states |
| br_notch_push_left_pull_down | bottom_right_notch_down_pull | P/L 反向；玩家在右下缺角；left 后立即 down pull | bl_notch_push_right_pull_down | yes depth=2 | right | up:pull_world_front_blocked, down:destination_blocked, left:pull_world_front_blocked | complete / 359 states |
| tr_notch_push_left_pull_up | top_right_notch_up_pull | P/L 反向；玩家在右上缺角；left 后立即 up pull | tl_notch_push_right_pull_up | yes depth=2 | right | up:pull_world_front_blocked, down:pull_world_front_blocked, left:pull_world_front_blocked | complete / 381 states |
| bar_notch_absent_pull_degenerates_to_walk | no_notch_bar_degenerate | L 形换成横条；push 后正交动作没有身后对象 | bl_notch_push_right_pull_down | yes depth=2 | up, left, right | down:destination_blocked | complete / 527 states |
| bl_notch_down_front_wall_blocks_pull | front_wall_blocks_lateral_pull | down pull 的玩家前格加墙 | bl_notch_push_right_pull_down | not applicable: replay stopped at illegal action; return search skipped | left | up:pull_world_front_blocked, down:destination_blocked, right:pull_world_front_blocked | complete / 270 states |
| bl_notch_down_target_wall_blocks_shape | target_wall_blocks_l_shape | down pull 的 L 形外部目标格加墙 | bl_notch_down_front_wall_blocks_pull | not applicable: replay stopped at illegal action; return search skipped | left | up:pull_world_front_blocked, down:force_blocked, right:pull_world_front_blocked | complete / 310 states |
| bl_notch_down_sweeps_bs_anchor | target_object_swept | down pull 的 L 形外部目标格放 B/S anchor | bl_notch_down_target_wall_blocks_shape | yes depth=12 | left | up:pull_world_front_blocked, down:force_blocked, right:pull_world_front_blocked | complete / 1974 states |

## bl_notch_push_right_pull_down

结构族: pl_l_notch_immediate_pull
变体: bottom_left_notch_down_pull
变化变量: 玩家在左下缺角；right 后立即 down pull
对照: bar_notch_absent_pull_degenerates_to_walk, bl_notch_down_front_wall_blocks_pull, bl_notch_down_target_wall_blocks_shape
备注: 第一手 right 推出 L 形并跨到 L 侧；第二手 down 立刻拉动身后上方 L 形单元，整块下移。
动作序列: right down
反事实禁用: 无
预算: exploreDepth=10, returnDepth=20, maxStates=20000, maxTransitions=80000

layout:
```text
##########
#B########
#S#PL...G#
#........#
#..MM....#
#..@M....#
#........#
##########
```

初始状态:
```text
##########
#B########
#S#PL...G#
#........#
#..MM....#
#..@M....#
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
#...MM...#
#...@M...#
#........#
##########
```
- 2. down: legal; events=pull_object:sticky#1,move_sticky_rigid; eventWin=no
```text
##########
#B########
#S#PL...G#
#........#
#........#
#...MM...#
#...@M...#
##########
```

最终状态:
```text
##########
#B########
#S#PL...G#
#........#
#........#
#...MM...#
#...@M...#
##########
```
变化格: (3,4) M->.; (4,4) M->.; (3,5) @->.; (5,5) .->M; (4,6) .->@; (5,6) .->M

最终状态动作表:
| action | legal | events | next / reason |
| --- | --- | --- | --- |
| up | no | - | pull_world_front_blocked |
| down | no | - | destination_blocked |
| left | yes | pull_object:sticky#1,move_sticky_rigid | Ply:3,6\|C:\|M:3,5;4,5;4,6\|PL:P:3,2;L:4,2\|BS:B:1,1;S:1,2 |
| right | no | - | pull_world_front_blocked |

回到初始: yes, depth=2, path=left up
局部可达图: status=complete, states=383, transitions=839, winStates=0, maxDepth=10
事件类型: anchor_boundary_shift:push_pull=37, force_chain:n2=5, move_sticky_rigid=71, pull_object:push_pull_anchor=23, pull_object:sticky#1=57, push_object:push_pull_anchor=10, push_object:sticky#1=13, walk=736

## tl_notch_push_right_pull_up

结构族: pl_l_notch_immediate_pull
变体: top_left_notch_up_pull
变化变量: 玩家在左上缺角；right 后立即 up pull
对照: bl_notch_push_right_pull_down
备注: 左侧另一个缺角朝向；第一手 right 后，第二手 up 立刻正交拉动。
动作序列: right up
反事实禁用: 无
预算: exploreDepth=10, returnDepth=20, maxStates=20000, maxTransitions=80000

layout:
```text
##########
#B########
#S#PL...G#
#........#
#..@M....#
#..MM....#
#........#
##########
```

初始状态:
```text
##########
#B########
#S#PL...G#
#........#
#..@M....#
#..MM....#
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
#...@M...#
#...MM...#
#........#
##########
```
- 2. up: legal; events=pull_object:sticky#1,move_sticky_rigid; eventWin=no
```text
##########
#B########
#S#PL...G#
#...@M...#
#...MM...#
#........#
#........#
##########
```

最终状态:
```text
##########
#B########
#S#PL...G#
#...@M...#
#...MM...#
#........#
#........#
##########
```
变化格: (4,3) .->@; (5,3) .->M; (3,4) @->.; (5,4) .->M; (3,5) M->.; (4,5) M->.

最终状态动作表:
| action | legal | events | next / reason |
| --- | --- | --- | --- |
| up | no | - | pull_world_front_blocked |
| down | no | - | pull_world_front_blocked |
| left | yes | pull_object:sticky#1,move_sticky_rigid | Ply:3,3\|C:\|M:4,3;3,4;4,4\|PL:P:3,2;L:4,2\|BS:B:1,1;S:1,2 |
| right | no | - | pull_world_front_blocked |

回到初始: yes, depth=2, path=left down
局部可达图: status=complete, states=458, transitions=1014, winStates=0, maxDepth=10
事件类型: anchor_boundary_shift:push_pull=38, force_chain:n2=1, move_sticky_rigid=77, pull_object:push_pull_anchor=32, pull_object:sticky#1=58, push_object:push_pull_anchor=6, push_object:sticky#1=18, walk=900

## br_notch_push_left_pull_down

结构族: pl_l_notch_immediate_pull
变体: bottom_right_notch_down_pull
变化变量: P/L 反向；玩家在右下缺角；left 后立即 down pull
对照: bl_notch_push_right_pull_down
备注: 反向 P/L 镜像，验证右侧缺角也可一推即下拉。
动作序列: left down
反事实禁用: 无
预算: exploreDepth=10, returnDepth=20, maxStates=20000, maxTransitions=80000

layout:
```text
##########
#B########
#S#LP...G#
#........#
#..MM....#
#..M@....#
#........#
##########
```

初始状态:
```text
##########
#B########
#S#LP...G#
#........#
#..MM....#
#..M@....#
#........#
##########
```

动作回放:
- 1. left: legal; events=push_object:sticky#1,move_sticky_rigid; eventWin=no
```text
##########
#B########
#S#LP...G#
#........#
#.MM.....#
#.M@.....#
#........#
##########
```
- 2. down: legal; events=pull_object:sticky#1,move_sticky_rigid; eventWin=no
```text
##########
#B########
#S#LP...G#
#........#
#........#
#.MM.....#
#.M@.....#
##########
```

最终状态:
```text
##########
#B########
#S#LP...G#
#........#
#........#
#.MM.....#
#.M@.....#
##########
```
变化格: (3,4) M->.; (4,4) M->.; (2,5) .->M; (4,5) @->.; (2,6) .->M; (3,6) .->@

最终状态动作表:
| action | legal | events | next / reason |
| --- | --- | --- | --- |
| up | no | - | pull_world_front_blocked |
| down | no | - | destination_blocked |
| left | no | - | pull_world_front_blocked |
| right | yes | pull_object:sticky#1,move_sticky_rigid | Ply:4,6\|C:\|M:3,5;4,5;3,6\|PL:P:4,2;L:3,2\|BS:B:1,1;S:1,2 |

回到初始: yes, depth=2, path=right up
局部可达图: status=complete, states=359, transitions=831, winStates=0, maxDepth=10
事件类型: anchor_boundary_shift:box_sticky=13, anchor_boundary_shift:push_pull=23, force_chain:n2=5, move_sticky_rigid=59, pull_object:box_sticky_anchor=13, pull_object:push_pull_anchor=9, pull_object:sticky#1=46, push_object:push_pull_anchor=9, push_object:sticky#1=13, sticky_to_box:n1=2, sticky_to_box:n2=4, walk=741

## tr_notch_push_left_pull_up

结构族: pl_l_notch_immediate_pull
变体: top_right_notch_up_pull
变化变量: P/L 反向；玩家在右上缺角；left 后立即 up pull
对照: tl_notch_push_right_pull_up
备注: 反向 P/L 镜像，验证右侧上缺角可一推即上拉。
动作序列: left up
反事实禁用: 无
预算: exploreDepth=10, returnDepth=20, maxStates=20000, maxTransitions=80000

layout:
```text
##########
#B########
#S#LP...G#
#........#
#..M@....#
#..MM....#
#........#
##########
```

初始状态:
```text
##########
#B########
#S#LP...G#
#........#
#..M@....#
#..MM....#
#........#
##########
```

动作回放:
- 1. left: legal; events=push_object:sticky#1,move_sticky_rigid; eventWin=no
```text
##########
#B########
#S#LP...G#
#........#
#.M@.....#
#.MM.....#
#........#
##########
```
- 2. up: legal; events=pull_object:sticky#1,move_sticky_rigid; eventWin=no
```text
##########
#B########
#S#LP...G#
#.M@.....#
#.MM.....#
#........#
#........#
##########
```

最终状态:
```text
##########
#B########
#S#LP...G#
#.M@.....#
#.MM.....#
#........#
#........#
##########
```
变化格: (2,3) .->M; (3,3) .->@; (2,4) .->M; (4,4) @->.; (3,5) M->.; (4,5) M->.

最终状态动作表:
| action | legal | events | next / reason |
| --- | --- | --- | --- |
| up | no | - | pull_world_front_blocked |
| down | no | - | pull_world_front_blocked |
| left | no | - | pull_world_front_blocked |
| right | yes | pull_object:sticky#1,move_sticky_rigid | Ply:4,3\|C:\|M:3,3;3,4;4,4\|PL:P:4,2;L:3,2\|BS:B:1,1;S:1,2 |

回到初始: yes, depth=2, path=right down
局部可达图: status=complete, states=381, transitions=889, winStates=0, maxDepth=10
事件类型: anchor_boundary_shift:box_sticky=16, anchor_boundary_shift:push_pull=18, move_sticky_rigid=58, pull_object:box_sticky_anchor=16, pull_object:push_pull_anchor=12, pull_object:sticky#1=41, push_object:push_pull_anchor=6, push_object:sticky#1=17, sticky_to_box:n1=2, walk=797

## bar_notch_absent_pull_degenerates_to_walk

结构族: pl_l_notch_immediate_pull
变体: no_notch_bar_degenerate
变化变量: L 形换成横条；push 后正交动作没有身后对象
对照: bl_notch_push_right_pull_down
备注: 横条没有缺角把手；right 后 down 不触发 pull，只是 walk。
动作序列: right down
反事实禁用: 无
预算: exploreDepth=10, returnDepth=20, maxStates=20000, maxTransitions=80000

layout:
```text
##########
#B########
#S#PL...G#
#........#
#........#
#..@MM...#
#........#
##########
```

初始状态:
```text
##########
#B########
#S#PL...G#
#........#
#........#
#..@MM...#
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
#........#
#...@MM..#
#........#
##########
```
- 2. down: legal; events=walk; eventWin=no
```text
##########
#B########
#S#PL...G#
#........#
#........#
#....MM..#
#...@....#
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
#...@....#
##########
```
变化格: (3,5) @->.; (4,5) M->.; (6,5) .->M; (4,6) .->@

最终状态动作表:
| action | legal | events | next / reason |
| --- | --- | --- | --- |
| up | yes | walk | Ply:4,5\|C:\|M:5,5;6,5\|PL:P:3,2;L:4,2\|BS:B:1,1;S:1,2 |
| down | no | - | destination_blocked |
| left | yes | walk | Ply:3,6\|C:\|M:5,5;6,5\|PL:P:3,2;L:4,2\|BS:B:1,1;S:1,2 |
| right | yes | walk | Ply:5,6\|C:\|M:5,5;6,5\|PL:P:3,2;L:4,2\|BS:B:1,1;S:1,2 |

回到初始: yes, depth=2, path=up left
局部可达图: status=complete, states=527, transitions=1064, winStates=0, maxDepth=10
事件类型: anchor_boundary_shift:push_pull=58, force_chain:n2=4, move_sticky_rigid=55, pull_object:push_pull_anchor=36, pull_object:sticky#1=48, push_object:push_pull_anchor=20, push_object:sticky#1=5, walk=955

## bl_notch_down_front_wall_blocks_pull

结构族: pl_l_notch_immediate_pull
变体: front_wall_blocks_lateral_pull
变化变量: down pull 的玩家前格加墙
对照: bl_notch_push_right_pull_down
备注: 第一手 right 成功；第二手 down 因玩家前格为墙而 destination_blocked。
动作序列: right down
反事实禁用: 无
预算: exploreDepth=10, returnDepth=20, maxStates=20000, maxTransitions=80000

layout:
```text
##########
#B########
#S#PL...G#
#........#
#..MM....#
#..@M....#
#...#....#
##########
```

初始状态:
```text
##########
#B########
#S#PL...G#
#........#
#..MM....#
#..@M....#
#...#....#
##########
```

动作回放:
- 1. right: legal; events=push_object:sticky#1,move_sticky_rigid; eventWin=no
```text
##########
#B########
#S#PL...G#
#........#
#...MM...#
#...@M...#
#...#....#
##########
```
- 2. down: illegal (destination_blocked); events=-; eventWin=no
```text
##########
#B########
#S#PL...G#
#........#
#...MM...#
#...@M...#
#...#....#
##########
```
- 后续动作未继续回放，因为动作序列中出现 illegal step。

最终状态:
```text
##########
#B########
#S#PL...G#
#........#
#...MM...#
#...@M...#
#...#....#
##########
```
变化格: (3,4) M->.; (5,4) .->M; (3,5) @->.; (4,5) M->@; (5,5) .->M

最终状态动作表:
| action | legal | events | next / reason |
| --- | --- | --- | --- |
| up | no | - | pull_world_front_blocked |
| down | no | - | destination_blocked |
| left | yes | pull_object:sticky#1,move_sticky_rigid | Ply:3,5\|C:\|M:3,4;4,4;4,5\|PL:P:3,2;L:4,2\|BS:B:1,1;S:1,2 |
| right | no | - | pull_world_front_blocked |

回到初始: not applicable (replay stopped at illegal action; return search skipped)
局部可达图: status=complete, states=270, transitions=570, winStates=0, maxDepth=10
事件类型: anchor_boundary_shift:push_pull=28, force_chain:n2=5, move_sticky_rigid=48, pull_object:push_pull_anchor=17, pull_object:sticky#1=39, push_object:push_pull_anchor=7, push_object:sticky#1=8, walk=499

## bl_notch_down_target_wall_blocks_shape

结构族: pl_l_notch_immediate_pull
变体: target_wall_blocks_l_shape
变化变量: down pull 的 L 形外部目标格加墙
对照: bl_notch_down_front_wall_blocks_pull
备注: 玩家前格开放，但 L 形右臂外部目标格为墙，第二手 down force_blocked。
动作序列: right down
反事实禁用: 无
预算: exploreDepth=10, returnDepth=20, maxStates=20000, maxTransitions=80000

layout:
```text
##########
#B########
#S#PL...G#
#........#
#..MM....#
#..@M....#
#....#...#
##########
```

初始状态:
```text
##########
#B########
#S#PL...G#
#........#
#..MM....#
#..@M....#
#....#...#
##########
```

动作回放:
- 1. right: legal; events=push_object:sticky#1,move_sticky_rigid; eventWin=no
```text
##########
#B########
#S#PL...G#
#........#
#...MM...#
#...@M...#
#....#...#
##########
```
- 2. down: illegal (force_blocked); events=-; eventWin=no
```text
##########
#B########
#S#PL...G#
#........#
#...MM...#
#...@M...#
#....#...#
##########
```
- 后续动作未继续回放，因为动作序列中出现 illegal step。

最终状态:
```text
##########
#B########
#S#PL...G#
#........#
#...MM...#
#...@M...#
#....#...#
##########
```
变化格: (3,4) M->.; (5,4) .->M; (3,5) @->.; (4,5) M->@; (5,5) .->M

最终状态动作表:
| action | legal | events | next / reason |
| --- | --- | --- | --- |
| up | no | - | pull_world_front_blocked |
| down | no | - | force_blocked |
| left | yes | pull_object:sticky#1,move_sticky_rigid | Ply:3,5\|C:\|M:3,4;4,4;4,5\|PL:P:3,2;L:4,2\|BS:B:1,1;S:1,2 |
| right | no | - | pull_world_front_blocked |

回到初始: not applicable (replay stopped at illegal action; return search skipped)
局部可达图: status=complete, states=310, transitions=658, winStates=0, maxDepth=10
事件类型: anchor_boundary_shift:push_pull=35, force_chain:n2=5, move_sticky_rigid=48, pull_object:push_pull_anchor=21, pull_object:sticky#1=37, push_object:push_pull_anchor=10, push_object:sticky#1=10, walk=580

## bl_notch_down_sweeps_bs_anchor

结构族: pl_l_notch_immediate_pull
变体: target_object_swept
变化变量: down pull 的 L 形外部目标格放 B/S anchor
对照: bl_notch_down_target_wall_blocks_shape
备注: 把目标墙换成可移动 B/S anchor；第二手 down 扫带 B/S anchor 下移并覆盖目标。
动作序列: right down
反事实禁用: 无
预算: exploreDepth=10, returnDepth=20, maxStates=20000, maxTransitions=80000

layout:
```text
##########
#........#
#..PL....#
#........#
#..MM....#
#..@M....#
#....S...#
#....B...#
#....G...#
##########
```

初始状态:
```text
##########
#........#
#..PL....#
#........#
#..MM....#
#..@M....#
#....S...#
#....B...#
#....G...#
##########
```

动作回放:
- 1. right: legal; events=push_object:sticky#1,move_sticky_rigid; eventWin=no
```text
##########
#........#
#..PL....#
#........#
#...MM...#
#...@M...#
#....S...#
#....B...#
#....G...#
##########
```
- 2. down: legal; events=pull_object:sticky#1,force_chain:n2,anchor_boundary_shift:box_sticky,move_sticky_rigid; eventWin=no
```text
##########
#........#
#..PL....#
#........#
#........#
#...MM...#
#...@M...#
#....S...#
#....B...#
##########
```

最终状态:
```text
##########
#........#
#..PL....#
#........#
#........#
#...MM...#
#...@M...#
#....S...#
#....B...#
##########
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
局部可达图: status=complete, states=1974, transitions=3800, winStates=9, maxDepth=10
事件类型: anchor_boundary_shift:box_sticky=154, anchor_boundary_shift:push_pull=173, box_to_sticky:n1=2, force_chain:n2=67, force_chain:n3=4, move_sticky_rigid=282, pull_object:box_sticky_anchor=96, pull_object:crate#1=4, pull_object:crate#2=1, pull_object:crate#3=1, pull_object:push_pull_anchor=59, pull_object:sticky#1=136, push_object:box_sticky_anchor=26, push_object:crate#1=10, push_object:crate#2=1, push_object:push_pull_anchor=96, push_object:sticky#1=132, sticky_to_box:n1=24, sticky_to_box:n2=14, walk=3238

