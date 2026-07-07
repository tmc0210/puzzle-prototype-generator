# 机制局部实验: ra_probe_reverse_force_cell_02

- 原型: reality_anchor
- 生成时间: 2026-07-06T07:37:01.727Z
- 标题: 反向施力站位格与黏块形状缩放
- 备注: 第二轮 explorer：验证第一轮的“绕到右侧”解释是否应改写为更精确的“反向施力站位格 / 把手”。

## 结构族摘要

### rigid_sticky_reverse_force_spectrum
| case | variant | changed variable | contrast | return | final legal | final illegal | graph |
| --- | --- | --- | --- | --- | --- | --- | --- |
| vertical2_single_column_push_down | vertical2_single_column | 竖向 2 格条没有可达的下方反向施力站位格 | vertical2_loop_room_push_down | no complete | up | down:force_blocked, left:destination_blocked, right:destination_blocked | complete / 3 states |
| vertical2_loop_room_push_down | vertical2_loop_room | 增加侧向绕行空间，允许站到下方反向施力位 | vertical2_single_column_push_down | yes depth=11 | up, down, left, right | - | complete / 664 states |
| sticky3_narrow_mouth_push_right | bar3_narrow_mouth | 3 格条右推后没有右侧站位格 | sticky3_wide_mouth_push_right | no complete | down, left | up:destination_blocked, right:force_blocked | complete / 21 states |
| sticky3_wide_mouth_push_right | bar3_wide_mouth | 相对窄口增加 1 格右侧余量 | sticky3_narrow_mouth_push_right, sticky4_wide_for_3_not_4_push_right | yes depth=13 | down, left, right | up:destination_blocked | complete / 36 states |
| sticky4_wide_for_3_not_4_push_right | bar4_same_width_as_bar3_wide | 保持口宽不变，将 3 格条换成 4 格条 | sticky3_wide_mouth_push_right, sticky4_extra_wide_push_right | no complete | down, left | up:destination_blocked, right:force_blocked | complete / 24 states |
| sticky4_extra_wide_push_right | bar4_extra_wide | 相对 bar4_same_width_as_bar3_wide 再增加 1 格右侧余量 | sticky4_wide_for_3_not_4_push_right | yes depth=15 | down, left, right | up:destination_blocked | complete / 40 states |
| square2_narrow_push_right | square2_narrow | 2x2 右推后整面右侧无站位格 | square2_wide_push_right | no complete | down, left | up:destination_blocked, right:force_blocked | complete / 24 states |
| square2_wide_push_right | square2_wide | 给 2x2 右侧整面留出一列站位格 | square2_narrow_push_right | yes depth=13 | down, left, right | up:destination_blocked | complete / 44 states |
| lshape_handle_open | lshape_side_handle_open | 顶端无右侧站位格，但下方凸出格右侧把手开放 | lshape_handle_blocked_by_wall | yes depth=11 | down, left | up:destination_blocked, right:force_blocked | complete / 27 states |
| lshape_handle_blocked_by_wall | lshape_side_handle_blocked | 只用墙堵住下方凸出格右侧把手 | lshape_handle_open | no complete | down, left | up:destination_blocked, right:force_blocked | complete / 23 states |

## vertical2_single_column_push_down: 2 格竖条在单列通道中下推

结构族: rigid_sticky_reverse_force_spectrum
变体: vertical2_single_column
变化变量: 竖向 2 格条没有可达的下方反向施力站位格
对照: vertical2_loop_room_push_down

问题: 把横向实验旋转成竖向后，没有下方站位格时是否仍不可回返？
动作序列: down
反事实禁用: 无
预算: exploreDepth=14, returnDepth=24, maxStates=20000, maxTransitions=80000

layout:
```text
BS###G#
#######
##@####
##M####
##M####
##.####
#######
```

初始状态:
```text
BS###G#
#######
##@####
##M####
##M####
##.####
#######
```

动作回放:
- 1. down: legal; events=push_object:sticky#1,move_sticky_rigid; eventWin=no
```text
BS###G#
#######
##.####
##@####
##M####
##M####
#######
```

最终状态:
```text
BS###G#
#######
##.####
##@####
##M####
##M####
#######
```
变化格: (2,2) @->.; (2,3) M->@; (2,5) .->M

最终状态动作表:
| action | legal | events | next / reason |
| --- | --- | --- | --- |
| up | yes | walk | Ply:2,2\|C:\|M:2,4;2,5\|PL:none\|BS:B:0,0;S:1,0 |
| down | no | - | force_blocked |
| left | no | - | destination_blocked |
| right | no | - | destination_blocked |

回到初始: no (complete: search complete)
局部可达图: status=complete, states=3, transitions=3, winStates=0, maxDepth=2
事件类型: move_sticky_rigid=1, push_object:sticky#1=1, walk=2

## vertical2_loop_room_push_down: 2 格竖条在可绕行房间中下推

结构族: rigid_sticky_reverse_force_spectrum
变体: vertical2_loop_room
变化变量: 增加侧向绕行空间，允许站到下方反向施力位
对照: vertical2_single_column_push_down

问题: 同样下推 2 格竖条，增加侧向绕行后是否恢复从下方推回的路径？
动作序列: down
反事实禁用: 无
预算: exploreDepth=14, returnDepth=24, maxStates=20000, maxTransitions=80000

layout:
```text
BS#####G
########
#..@...#
#..M...#
#..M...#
#......#
#......#
########
```

初始状态:
```text
BS#####G
########
#..@...#
#..M...#
#..M...#
#......#
#......#
########
```

动作回放:
- 1. down: legal; events=push_object:sticky#1,move_sticky_rigid; eventWin=no
```text
BS#####G
########
#......#
#..@...#
#..M...#
#..M...#
#......#
########
```

最终状态:
```text
BS#####G
########
#......#
#..@...#
#..M...#
#..M...#
#......#
########
```
变化格: (3,2) @->.; (3,3) M->@; (3,5) .->M

最终状态动作表:
| action | legal | events | next / reason |
| --- | --- | --- | --- |
| up | yes | walk | Ply:3,2\|C:\|M:3,4;3,5\|PL:none\|BS:B:0,0;S:1,0 |
| down | yes | push_object:sticky#1,move_sticky_rigid | Ply:3,4\|C:\|M:3,5;3,6\|PL:none\|BS:B:0,0;S:1,0 |
| left | yes | walk | Ply:2,3\|C:\|M:3,4;3,5\|PL:none\|BS:B:0,0;S:1,0 |
| right | yes | walk | Ply:4,3\|C:\|M:3,4;3,5\|PL:none\|BS:B:0,0;S:1,0 |

回到初始: yes, depth=11, path=left down down down right up left up up up right
局部可达图: status=complete, states=664, transitions=2105, winStates=0, maxDepth=14
事件类型: move_sticky_rigid=88, push_object:sticky#1=88, walk=2017

## sticky3_narrow_mouth_push_right: 3 格横条在窄口中右推

结构族: rigid_sticky_reverse_force_spectrum
变体: bar3_narrow_mouth
变化变量: 3 格条右推后没有右侧站位格
对照: sticky3_wide_mouth_push_right

问题: 3 格横条右推后如果右侧站位格被墙吃掉，是否不可回返？
动作序列: right
反事实禁用: 无
预算: exploreDepth=14, returnDepth=24, maxStates=20000, maxTransitions=80000

layout:
```text
BS###G#
#######
#@MMM.#
#.....#
#######
```

初始状态:
```text
BS###G#
#######
#@MMM.#
#.....#
#######
```

动作回放:
- 1. right: legal; events=push_object:sticky#1,move_sticky_rigid; eventWin=no
```text
BS###G#
#######
#.@MMM#
#.....#
#######
```

最终状态:
```text
BS###G#
#######
#.@MMM#
#.....#
#######
```
变化格: (1,2) @->.; (2,2) M->@; (5,2) .->M

最终状态动作表:
| action | legal | events | next / reason |
| --- | --- | --- | --- |
| up | no | - | destination_blocked |
| down | yes | walk | Ply:2,3\|C:\|M:3,2;4,2;5,2\|PL:none\|BS:B:0,0;S:1,0 |
| left | yes | walk | Ply:1,2\|C:\|M:3,2;4,2;5,2\|PL:none\|BS:B:0,0;S:1,0 |
| right | no | - | force_blocked |

回到初始: no (complete: search complete)
局部可达图: status=complete, states=21, transitions=42, winStates=0, maxDepth=11
事件类型: move_sticky_rigid=2, push_object:sticky#1=2, walk=40

## sticky3_wide_mouth_push_right: 3 格横条在加宽一格的口中右推

结构族: rigid_sticky_reverse_force_spectrum
变体: bar3_wide_mouth
变化变量: 相对窄口增加 1 格右侧余量
对照: sticky3_narrow_mouth_push_right, sticky4_wide_for_3_not_4_push_right

问题: 只把墙口加宽一格，3 格横条是否恢复可回返？
动作序列: right
反事实禁用: 无
预算: exploreDepth=14, returnDepth=24, maxStates=20000, maxTransitions=80000

layout:
```text
BS####G#
########
#@MMM..#
#......#
########
```

初始状态:
```text
BS####G#
########
#@MMM..#
#......#
########
```

动作回放:
- 1. right: legal; events=push_object:sticky#1,move_sticky_rigid; eventWin=no
```text
BS####G#
########
#.@MMM.#
#......#
########
```

最终状态:
```text
BS####G#
########
#.@MMM.#
#......#
########
```
变化格: (1,2) @->.; (2,2) M->@; (5,2) .->M

最终状态动作表:
| action | legal | events | next / reason |
| --- | --- | --- | --- |
| up | no | - | destination_blocked |
| down | yes | walk | Ply:2,3\|C:\|M:3,2;4,2;5,2\|PL:none\|BS:B:0,0;S:1,0 |
| left | yes | walk | Ply:1,2\|C:\|M:3,2;4,2;5,2\|PL:none\|BS:B:0,0;S:1,0 |
| right | yes | push_object:sticky#1,move_sticky_rigid | Ply:3,2\|C:\|M:4,2;5,2;6,2\|PL:none\|BS:B:0,0;S:1,0 |

回到初始: yes, depth=13, path=down right right right right up left down left left left left up
局部可达图: status=complete, states=36, transitions=80, winStates=0, maxDepth=11
事件类型: move_sticky_rigid=4, push_object:sticky#1=4, walk=76

## sticky4_wide_for_3_not_4_push_right: 4 格横条放进刚好救 3 格条的口

结构族: rigid_sticky_reverse_force_spectrum
变体: bar4_same_width_as_bar3_wide
变化变量: 保持口宽不变，将 3 格条换成 4 格条
对照: sticky3_wide_mouth_push_right, sticky4_extra_wide_push_right

问题: 同一个加宽口能救 3 格条，但换成 4 格条是否再次不可回返？
动作序列: right
反事实禁用: 无
预算: exploreDepth=14, returnDepth=24, maxStates=20000, maxTransitions=80000

layout:
```text
BS####G#
########
#@MMMM.#
#......#
########
```

初始状态:
```text
BS####G#
########
#@MMMM.#
#......#
########
```

动作回放:
- 1. right: legal; events=push_object:sticky#1,move_sticky_rigid; eventWin=no
```text
BS####G#
########
#.@MMMM#
#......#
########
```

最终状态:
```text
BS####G#
########
#.@MMMM#
#......#
########
```
变化格: (1,2) @->.; (2,2) M->@; (6,2) .->M

最终状态动作表:
| action | legal | events | next / reason |
| --- | --- | --- | --- |
| up | no | - | destination_blocked |
| down | yes | walk | Ply:2,3\|C:\|M:3,2;4,2;5,2;6,2\|PL:none\|BS:B:0,0;S:1,0 |
| left | yes | walk | Ply:1,2\|C:\|M:3,2;4,2;5,2;6,2\|PL:none\|BS:B:0,0;S:1,0 |
| right | no | - | force_blocked |

回到初始: no (complete: search complete)
局部可达图: status=complete, states=24, transitions=48, winStates=0, maxDepth=13
事件类型: move_sticky_rigid=2, push_object:sticky#1=2, walk=46

## sticky4_extra_wide_push_right: 4 格横条在再加宽一格的口中右推

结构族: rigid_sticky_reverse_force_spectrum
变体: bar4_extra_wide
变化变量: 相对 bar4_same_width_as_bar3_wide 再增加 1 格右侧余量
对照: sticky4_wide_for_3_not_4_push_right

问题: 再加宽一格后，4 格横条是否也恢复可回返？
动作序列: right
反事实禁用: 无
预算: exploreDepth=14, returnDepth=24, maxStates=20000, maxTransitions=80000

layout:
```text
BS#####G#
#########
#@MMMM..#
#.......#
#########
```

初始状态:
```text
BS#####G#
#########
#@MMMM..#
#.......#
#########
```

动作回放:
- 1. right: legal; events=push_object:sticky#1,move_sticky_rigid; eventWin=no
```text
BS#####G#
#########
#.@MMMM.#
#.......#
#########
```

最终状态:
```text
BS#####G#
#########
#.@MMMM.#
#.......#
#########
```
变化格: (1,2) @->.; (2,2) M->@; (6,2) .->M

最终状态动作表:
| action | legal | events | next / reason |
| --- | --- | --- | --- |
| up | no | - | destination_blocked |
| down | yes | walk | Ply:2,3\|C:\|M:3,2;4,2;5,2;6,2\|PL:none\|BS:B:0,0;S:1,0 |
| left | yes | walk | Ply:1,2\|C:\|M:3,2;4,2;5,2;6,2\|PL:none\|BS:B:0,0;S:1,0 |
| right | yes | push_object:sticky#1,move_sticky_rigid | Ply:3,2\|C:\|M:4,2;5,2;6,2;7,2\|PL:none\|BS:B:0,0;S:1,0 |

回到初始: yes, depth=15, path=down right right right right right up left down left left left left left up
局部可达图: status=complete, states=40, transitions=88, winStates=0, maxDepth=13
事件类型: move_sticky_rigid=4, push_object:sticky#1=4, walk=84

## square2_narrow_push_right: 2x2 黏块在窄口中右推

结构族: rigid_sticky_reverse_force_spectrum
变体: square2_narrow
变化变量: 2x2 右推后整面右侧无站位格
对照: square2_wide_push_right

问题: 非条形的 2x2 黏块，如果右侧整面无站位格，是否不可回返？
动作序列: right
反事实禁用: 无
预算: exploreDepth=14, returnDepth=24, maxStates=20000, maxTransitions=80000

layout:
```text
BS##G#
######
#@MM.#
#.MM.#
#....#
######
```

初始状态:
```text
BS##G#
######
#@MM.#
#.MM.#
#....#
######
```

动作回放:
- 1. right: legal; events=push_object:sticky#1,move_sticky_rigid; eventWin=no
```text
BS##G#
######
#.@MM#
#..MM#
#....#
######
```

最终状态:
```text
BS##G#
######
#.@MM#
#..MM#
#....#
######
```
变化格: (1,2) @->.; (2,2) M->@; (4,2) .->M; (2,3) M->.; (4,3) .->M

最终状态动作表:
| action | legal | events | next / reason |
| --- | --- | --- | --- |
| up | no | - | destination_blocked |
| down | yes | walk | Ply:2,3\|C:\|M:3,2;4,2;3,3;4,3\|PL:none\|BS:B:0,0;S:1,0 |
| left | yes | walk | Ply:1,2\|C:\|M:3,2;4,2;3,3;4,3\|PL:none\|BS:B:0,0;S:1,0 |
| right | no | - | force_blocked |

回到初始: no (complete: search complete)
局部可达图: status=complete, states=24, transitions=54, winStates=0, maxDepth=10
事件类型: move_sticky_rigid=4, push_object:sticky#1=4, walk=50

## square2_wide_push_right: 2x2 黏块在加宽口中右推

结构族: rigid_sticky_reverse_force_spectrum
变体: square2_wide
变化变量: 给 2x2 右侧整面留出一列站位格
对照: square2_narrow_push_right

问题: 只给 2x2 黏块右侧留出一列站位格，是否恢复可回返？
动作序列: right
反事实禁用: 无
预算: exploreDepth=14, returnDepth=24, maxStates=20000, maxTransitions=80000

layout:
```text
BS###G#
#######
#@MM..#
#.MM..#
#.....#
#######
```

初始状态:
```text
BS###G#
#######
#@MM..#
#.MM..#
#.....#
#######
```

动作回放:
- 1. right: legal; events=push_object:sticky#1,move_sticky_rigid; eventWin=no
```text
BS###G#
#######
#.@MM.#
#..MM.#
#.....#
#######
```

最终状态:
```text
BS###G#
#######
#.@MM.#
#..MM.#
#.....#
#######
```
变化格: (1,2) @->.; (2,2) M->@; (4,2) .->M; (2,3) M->.; (4,3) .->M

最终状态动作表:
| action | legal | events | next / reason |
| --- | --- | --- | --- |
| up | no | - | destination_blocked |
| down | yes | walk | Ply:2,3\|C:\|M:3,2;4,2;3,3;4,3\|PL:none\|BS:B:0,0;S:1,0 |
| left | yes | walk | Ply:1,2\|C:\|M:3,2;4,2;3,3;4,3\|PL:none\|BS:B:0,0;S:1,0 |
| right | yes | push_object:sticky#1,move_sticky_rigid | Ply:3,2\|C:\|M:4,2;5,2;4,3;5,3\|PL:none\|BS:B:0,0;S:1,0 |

回到初始: yes, depth=13, path=down down right right right up left down left left left up up
局部可达图: status=complete, states=44, transitions=112, winStates=0, maxDepth=10
事件类型: move_sticky_rigid=8, push_object:sticky#1=8, walk=104

## lshape_handle_open: L 形黏块顶排无右侧站位格但侧向把手开放

结构族: rigid_sticky_reverse_force_spectrum
变体: lshape_side_handle_open
变化变量: 顶端无右侧站位格，但下方凸出格右侧把手开放
对照: lshape_handle_blocked_by_wall

问题: 如果顶排右侧被墙封住，但 L 形下方凸出格旁边仍可站人，是否仍能推回？
动作序列: right
反事实禁用: 无
预算: exploreDepth=14, returnDepth=24, maxStates=20000, maxTransitions=80000

layout:
```text
BS##G#
######
#@MM.#
#.M..#
#....#
######
```

初始状态:
```text
BS##G#
######
#@MM.#
#.M..#
#....#
######
```

动作回放:
- 1. right: legal; events=push_object:sticky#1,move_sticky_rigid; eventWin=no
```text
BS##G#
######
#.@MM#
#..M.#
#....#
######
```

最终状态:
```text
BS##G#
######
#.@MM#
#..M.#
#....#
######
```
变化格: (1,2) @->.; (2,2) M->@; (4,2) .->M; (2,3) M->.; (3,3) .->M

最终状态动作表:
| action | legal | events | next / reason |
| --- | --- | --- | --- |
| up | no | - | destination_blocked |
| down | yes | walk | Ply:2,3\|C:\|M:3,2;4,2;3,3\|PL:none\|BS:B:0,0;S:1,0 |
| left | yes | walk | Ply:1,2\|C:\|M:3,2;4,2;3,3\|PL:none\|BS:B:0,0;S:1,0 |
| right | no | - | force_blocked |

回到初始: yes, depth=11, path=down down right right up left down left left up up
局部可达图: status=complete, states=27, transitions=65, winStates=0, maxDepth=9
事件类型: move_sticky_rigid=5, push_object:sticky#1=5, walk=60

## lshape_handle_blocked_by_wall: L 形黏块的侧向把手被墙封住

结构族: rigid_sticky_reverse_force_spectrum
变体: lshape_side_handle_blocked
变化变量: 只用墙堵住下方凸出格右侧把手
对照: lshape_handle_open

问题: 只堵住 L 形下方凸出格右侧的站位格，是否会把可回返变成不可回返？
动作序列: right
反事实禁用: 无
预算: exploreDepth=14, returnDepth=24, maxStates=20000, maxTransitions=80000

layout:
```text
BS##G#
######
#@MM.#
#.M.##
#....#
######
```

初始状态:
```text
BS##G#
######
#@MM.#
#.M.##
#....#
######
```

动作回放:
- 1. right: legal; events=push_object:sticky#1,move_sticky_rigid; eventWin=no
```text
BS##G#
######
#.@MM#
#..M##
#....#
######
```

最终状态:
```text
BS##G#
######
#.@MM#
#..M##
#....#
######
```
变化格: (1,2) @->.; (2,2) M->@; (4,2) .->M; (2,3) M->.; (3,3) .->M

最终状态动作表:
| action | legal | events | next / reason |
| --- | --- | --- | --- |
| up | no | - | destination_blocked |
| down | yes | walk | Ply:2,3\|C:\|M:3,2;4,2;3,3\|PL:none\|BS:B:0,0;S:1,0 |
| left | yes | walk | Ply:1,2\|C:\|M:3,2;4,2;3,3\|PL:none\|BS:B:0,0;S:1,0 |
| right | no | - | force_blocked |

回到初始: no (complete: search complete)
局部可达图: status=complete, states=23, transitions=49, winStates=0, maxDepth=9
事件类型: move_sticky_rigid=3, push_object:sticky#1=3, walk=46

