# 机制局部实验: ra_loop_sticky_handle_return_20260707_01

- 原型: reality_anchor
- 生成时间: 2026-07-07T07:52:46.910Z
- 标题: sticky 前沿通过后的形状把手回位门
- 备注: 同一类 sticky footprint 已有完整右侧前沿口宽；比较竖向二连、3 格 L 形和 2x2 推进后玩家能否到达反向施力格，以及空间过自由时是否绕过承诺。B/S 只作为预置 M 的 material_source。

## 结构族摘要

### sticky_mouth_side_handle_return_gate
| case | variant | changed variable | contrast | return | final legal | final illegal | graph |
| --- | --- | --- | --- | --- | --- | --- | --- |
| side_door_open_return_found | side_door_open | 开放推进后一格外侧的侧廊回位格 x5,y4 | side_door_closed_no_return | yes depth=9 | up, down, left, right | - | complete / 27 states |
| side_door_closed_no_return | side_door_closed | 关闭推进后一格外侧的侧廊回位格 x5,y4 | side_door_open_return_found | no complete | up, down, left, right | - | complete / 22 states |
| stance_cells_walled_side_door_insufficient | side_corridor_open_but_stance_walled | 保留侧廊但把推进后的两个反向施力站位格 x5,y2/x5,y3 都改成墙 | side_door_open_return_found, side_door_closed_no_return | no complete | up, down, left | right:force_blocked | complete / 14 states |
| explicit_handle_consumption_probe | explicit_reverse_push_consumes_handle | 在 open 侧廊中显式走到右侧把手格并左推一次 | stance_cells_walled_side_door_insufficient | yes depth=4 | up, down, right | left:force_blocked | complete / 27 states |
| wide_side_loop_shortcut | overwide_side_loop_shortcut | 把右侧与上方空间整体放宽，侧廊不再只消费一个反向施力格 | side_door_open_return_found | yes depth=9 | up, down, left, right | - | complete / 338 states |
| lshape_corner_handle_open_return | lshape_corner_handle_open | 3 格 L 形右推后开放凸角右侧把手格 x6,y3 与下侧进入通道 | lshape_corner_handle_blocked_no_return | yes depth=11 | up, down, left | right:force_blocked | complete / 17 states |
| lshape_corner_handle_blocked_no_return | lshape_corner_handle_blocked | 只把 L 形凸角右侧把手格 x6,y3 改成墙，前沿目标仍开放 | lshape_corner_handle_open_return | no complete | up, down, left | right:force_blocked | complete / 13 states |
| lshape_corner_explicit_handle_consumption | lshape_corner_explicit_reverse_push | 在 L 形 open 布局中显式走到凸角右侧把手格并左推一次 | lshape_corner_handle_blocked_no_return | yes depth=5 | down, right | up:destination_blocked, left:force_blocked | complete / 17 states |
| lshape_overwide_corner_shortcut | lshape_overwide_corner_shortcut | 把 L 形上方和右侧空间放宽，凸角把手不再是唯一回位入口 | lshape_corner_handle_open_return | yes depth=11 | up, down, left, right | - | complete / 381 states |
| lshape_missing_top_left_open_return | lshape_missing_top_left_open | 3 格 L 缺左上角，右推后开放右侧下格把手 | lshape_missing_top_left_blocked_no_return | yes depth=11 | down, left | up:destination_blocked, right:force_blocked | complete / 17 states |
| lshape_missing_top_left_blocked_no_return | lshape_missing_top_left_blocked | 3 格 L 缺左上角，只堵右侧下格把手 | lshape_missing_top_left_open_return | no complete | down, left | up:destination_blocked, right:force_blocked | complete / 13 states |
| lshape_missing_bottom_right_open_return | lshape_missing_bottom_right_open | 3 格 L 缺右下角，右推后开放右侧下格把手 | lshape_missing_bottom_right_blocked_no_return | yes depth=9 | up, down, left | right:force_blocked | complete / 16 states |
| lshape_missing_bottom_right_blocked_no_return | lshape_missing_bottom_right_blocked | 3 格 L 缺右下角，只堵右侧下格把手 | lshape_missing_bottom_right_open_return | no complete | up, down, left | right:force_blocked | complete / 11 states |
| lshape_missing_bottom_left_open_return | lshape_missing_bottom_left_open | 3 格 L 缺左下角，玩家从上格推入，开放右侧下格把手 | lshape_missing_bottom_left_blocked_no_return | yes depth=13 | down, left | up:destination_blocked, right:force_blocked | complete / 33 states |
| lshape_missing_bottom_left_blocked_no_return | lshape_missing_bottom_left_blocked | 3 格 L 缺左下角，只堵右侧下格把手 | lshape_missing_bottom_left_open_return | no complete | down, left | up:destination_blocked, right:force_blocked | complete / 27 states |
| square2_side_face_open_return | square2_side_face_open | 2x2 前沿可过后开放右侧下格施力位 x6,y3 与下侧进入通道 | square2_side_face_blocked_no_return | yes depth=11 | up, down, left | right:force_blocked | complete / 18 states |
| square2_side_face_blocked_no_return | square2_side_face_blocked | 只把 2x2 右侧施力位 x6,y3 改成墙，前沿目标两格仍开放 | square2_side_face_open_return | no complete | up, down, left | right:force_blocked | complete / 14 states |
| square2_explicit_face_consumption | square2_explicit_reverse_push | 在 2x2 open 布局中显式走到右侧下格施力位并左推一次 | square2_side_face_blocked_no_return | yes depth=5 | up, down, right | left:force_blocked | complete / 18 states |

## side_door_open_return_found

结构族: sticky_mouth_side_handle_return_gate
变体: side_door_open
变化变量: 开放推进后一格外侧的侧廊回位格 x5,y4
对照: side_door_closed_no_return

问题: 前沿已经能右推通过时，侧廊多开一格是否足以让玩家到达反向施力格并回返？
动作序列: right
反事实禁用: 无
预算: exploreDepth=16, returnDepth=30, maxStates=40000, maxTransitions=120000

layout:
```text
###########
#G#########
###M..#####
##@M..#####
##....#####
#BS########
###########
```

初始状态:
```text
###########
#G#########
###M..#####
##@M..#####
##....#####
#BS########
###########
```

动作回放:
- 1. right: legal; events=push_object:sticky#1,move_sticky_rigid; eventWin=no
```text
###########
#G#########
###.M.#####
##.@M.#####
##....#####
#BS########
###########
```

最终状态:
```text
###########
#G#########
###.M.#####
##.@M.#####
##....#####
#BS########
###########
```
变化格: (3,2) M->.; (4,2) .->M; (2,3) @->.; (3,3) M->@; (4,3) .->M

最终状态动作表:
| action | legal | events | next / reason |
| --- | --- | --- | --- |
| up | yes | walk | Ply:3,2\|C:\|M:4,2;4,3\|PL:none\|BS:B:1,5;S:2,5 |
| down | yes | walk | Ply:3,4\|C:\|M:4,2;4,3\|PL:none\|BS:B:1,5;S:2,5 |
| left | yes | walk | Ply:2,3\|C:\|M:4,2;4,3\|PL:none\|BS:B:1,5;S:2,5 |
| right | yes | push_object:sticky#1,move_sticky_rigid | Ply:4,3\|C:\|M:5,2;5,3\|PL:none\|BS:B:1,5;S:2,5 |

回到初始: yes, depth=9, path=down right right up left down left left up
局部可达图: status=complete, states=27, transitions=65, winStates=0, maxDepth=6
事件类型: move_sticky_rigid=5, push_object:sticky#1=5, walk=60

## side_door_closed_no_return

结构族: sticky_mouth_side_handle_return_gate
变体: side_door_closed
变化变量: 关闭推进后一格外侧的侧廊回位格 x5,y4
对照: side_door_open_return_found

问题: frontier 仍能右推通过，但玩家侧廊少一格时是否无法回到反向施力格？
动作序列: right
反事实禁用: 无
预算: exploreDepth=16, returnDepth=30, maxStates=40000, maxTransitions=120000

layout:
```text
###########
#G#########
###M..#####
##@M..#####
##...######
#BS########
###########
```

初始状态:
```text
###########
#G#########
###M..#####
##@M..#####
##...######
#BS########
###########
```

动作回放:
- 1. right: legal; events=push_object:sticky#1,move_sticky_rigid; eventWin=no
```text
###########
#G#########
###.M.#####
##.@M.#####
##...######
#BS########
###########
```

最终状态:
```text
###########
#G#########
###.M.#####
##.@M.#####
##...######
#BS########
###########
```
变化格: (3,2) M->.; (4,2) .->M; (2,3) @->.; (3,3) M->@; (4,3) .->M

最终状态动作表:
| action | legal | events | next / reason |
| --- | --- | --- | --- |
| up | yes | walk | Ply:3,2\|C:\|M:4,2;4,3\|PL:none\|BS:B:1,5;S:2,5 |
| down | yes | walk | Ply:3,4\|C:\|M:4,2;4,3\|PL:none\|BS:B:1,5;S:2,5 |
| left | yes | walk | Ply:2,3\|C:\|M:4,2;4,3\|PL:none\|BS:B:1,5;S:2,5 |
| right | yes | push_object:sticky#1,move_sticky_rigid | Ply:4,3\|C:\|M:5,2;5,3\|PL:none\|BS:B:1,5;S:2,5 |

回到初始: no (complete: search complete)
局部可达图: status=complete, states=22, transitions=51, winStates=0, maxDepth=6
事件类型: move_sticky_rigid=3, push_object:sticky#1=3, walk=48

## stance_cells_walled_side_door_insufficient

结构族: sticky_mouth_side_handle_return_gate
变体: side_corridor_open_but_stance_walled
变化变量: 保留侧廊但把推进后的两个反向施力站位格 x5,y2/x5,y3 都改成墙
对照: side_door_open_return_found, side_door_closed_no_return

问题: 只让玩家走到附近是否足够，还是必须存在贴着 sticky 右面的实际施力格？
动作序列: right
反事实禁用: 无
预算: exploreDepth=16, returnDepth=30, maxStates=40000, maxTransitions=120000

layout:
```text
###########
#G#########
###M.######
##@M.######
##....#####
#BS########
###########
```

初始状态:
```text
###########
#G#########
###M.######
##@M.######
##....#####
#BS########
###########
```

动作回放:
- 1. right: legal; events=push_object:sticky#1,move_sticky_rigid; eventWin=no
```text
###########
#G#########
###.M######
##.@M######
##....#####
#BS########
###########
```

最终状态:
```text
###########
#G#########
###.M######
##.@M######
##....#####
#BS########
###########
```
变化格: (3,2) M->.; (4,2) .->M; (2,3) @->.; (3,3) M->@; (4,3) .->M

最终状态动作表:
| action | legal | events | next / reason |
| --- | --- | --- | --- |
| up | yes | walk | Ply:3,2\|C:\|M:4,2;4,3\|PL:none\|BS:B:1,5;S:2,5 |
| down | yes | walk | Ply:3,4\|C:\|M:4,2;4,3\|PL:none\|BS:B:1,5;S:2,5 |
| left | yes | walk | Ply:2,3\|C:\|M:4,2;4,3\|PL:none\|BS:B:1,5;S:2,5 |
| right | no | - | force_blocked |

回到初始: no (complete: search complete)
局部可达图: status=complete, states=14, transitions=27, winStates=0, maxDepth=5
事件类型: move_sticky_rigid=1, push_object:sticky#1=1, walk=26

## explicit_handle_consumption_probe

结构族: sticky_mouth_side_handle_return_gate
变体: explicit_reverse_push_consumes_handle
变化变量: 在 open 侧廊中显式走到右侧把手格并左推一次
对照: stance_cells_walled_side_door_insufficient

问题: 开放侧廊输出的把手格能否被一个最小后续动作序列消费，而不只是 return search 偶然 found？
动作序列: right down right right up left
反事实禁用: 无
预算: exploreDepth=16, returnDepth=30, maxStates=40000, maxTransitions=120000

layout:
```text
###########
#G#########
###M..#####
##@M..#####
##....#####
#BS########
###########
```

初始状态:
```text
###########
#G#########
###M..#####
##@M..#####
##....#####
#BS########
###########
```

动作回放:
- 1. right: legal; events=push_object:sticky#1,move_sticky_rigid; eventWin=no
```text
###########
#G#########
###.M.#####
##.@M.#####
##....#####
#BS########
###########
```
- 2. down: legal; events=walk; eventWin=no
```text
###########
#G#########
###.M.#####
##..M.#####
##.@..#####
#BS########
###########
```
- 3. right: legal; events=walk; eventWin=no
```text
###########
#G#########
###.M.#####
##..M.#####
##..@.#####
#BS########
###########
```
- 4. right: legal; events=walk; eventWin=no
```text
###########
#G#########
###.M.#####
##..M.#####
##...@#####
#BS########
###########
```
- 5. up: legal; events=walk; eventWin=no
```text
###########
#G#########
###.M.#####
##..M@#####
##....#####
#BS########
###########
```
- 6. left: legal; events=push_object:sticky#1,move_sticky_rigid; eventWin=no
```text
###########
#G#########
###M..#####
##.M@.#####
##....#####
#BS########
###########
```

最终状态:
```text
###########
#G#########
###M..#####
##.M@.#####
##....#####
#BS########
###########
```
变化格: (2,3) @->.; (4,3) .->@

最终状态动作表:
| action | legal | events | next / reason |
| --- | --- | --- | --- |
| up | yes | walk | Ply:4,2\|C:\|M:3,2;3,3\|PL:none\|BS:B:1,5;S:2,5 |
| down | yes | walk | Ply:4,4\|C:\|M:3,2;3,3\|PL:none\|BS:B:1,5;S:2,5 |
| left | no | - | force_blocked |
| right | yes | walk | Ply:5,3\|C:\|M:3,2;3,3\|PL:none\|BS:B:1,5;S:2,5 |

回到初始: yes, depth=4, path=down left left up
局部可达图: status=complete, states=27, transitions=65, winStates=0, maxDepth=6
事件类型: move_sticky_rigid=5, push_object:sticky#1=5, walk=60

## wide_side_loop_shortcut

结构族: sticky_mouth_side_handle_return_gate
变体: overwide_side_loop_shortcut
变化变量: 把右侧与上方空间整体放宽，侧廊不再只消费一个反向施力格
对照: side_door_open_return_found

问题: 当侧廊和上方空间过自由时，是否出现绕过单格回位门的 shortcut，从而削弱本结构的约束价值？
动作序列: right
反事实禁用: 无
预算: exploreDepth=16, returnDepth=30, maxStates=40000, maxTransitions=120000

layout:
```text
############
#G        ##
###M....####
##@M....####
##.....#####
#BS#########
############
```

初始状态:
```text
############
#G........##
###M....####
##@M....####
##.....#####
#BS#########
############
```

动作回放:
- 1. right: legal; events=push_object:sticky#1,move_sticky_rigid; eventWin=no
```text
############
#G........##
###.M...####
##.@M...####
##.....#####
#BS#########
############
```

最终状态:
```text
############
#G........##
###.M...####
##.@M...####
##.....#####
#BS#########
############
```
变化格: (3,2) M->.; (4,2) .->M; (2,3) @->.; (3,3) M->@; (4,3) .->M

最终状态动作表:
| action | legal | events | next / reason |
| --- | --- | --- | --- |
| up | yes | walk | Ply:3,2\|C:\|M:4,2;4,3\|PL:none\|BS:B:1,5;S:2,5 |
| down | yes | walk | Ply:3,4\|C:\|M:4,2;4,3\|PL:none\|BS:B:1,5;S:2,5 |
| left | yes | walk | Ply:2,3\|C:\|M:4,2;4,3\|PL:none\|BS:B:1,5;S:2,5 |
| right | yes | push_object:sticky#1,move_sticky_rigid | Ply:4,3\|C:\|M:5,2;5,3\|PL:none\|BS:B:1,5;S:2,5 |

回到初始: yes, depth=9, path=down right right up left down left left up
局部可达图: status=complete, states=338, transitions=945, winStates=0, maxDepth=16
事件类型: move_sticky_rigid=44, push_object:sticky#1=44, walk=901

## lshape_corner_handle_open_return

结构族: sticky_mouth_side_handle_return_gate
变体: lshape_corner_handle_open
变化变量: 3 格 L 形右推后开放凸角右侧把手格 x6,y3 与下侧进入通道
对照: lshape_corner_handle_blocked_no_return

问题: 同样前沿可过时，3 格 L 形凸角是否能作为侧向把手让玩家反推回位？
动作序列: right
反事实禁用: 无
预算: exploreDepth=16, returnDepth=30, maxStates=40000, maxTransitions=120000

layout:
```text
############
#G##########
###M.#######
##@MM..#####
##.....#####
#BS#########
############
```

初始状态:
```text
############
#G##########
###M.#######
##@MM..#####
##.....#####
#BS#########
############
```

动作回放:
- 1. right: legal; events=push_object:sticky#1,move_sticky_rigid; eventWin=no
```text
############
#G##########
###.M#######
##.@MM.#####
##.....#####
#BS#########
############
```

最终状态:
```text
############
#G##########
###.M#######
##.@MM.#####
##.....#####
#BS#########
############
```
变化格: (3,2) M->.; (4,2) .->M; (2,3) @->.; (3,3) M->@; (5,3) .->M

最终状态动作表:
| action | legal | events | next / reason |
| --- | --- | --- | --- |
| up | yes | walk | Ply:3,2\|C:\|M:4,2;4,3;5,3\|PL:none\|BS:B:1,5;S:2,5 |
| down | yes | walk | Ply:3,4\|C:\|M:4,2;4,3;5,3\|PL:none\|BS:B:1,5;S:2,5 |
| left | yes | walk | Ply:2,3\|C:\|M:4,2;4,3;5,3\|PL:none\|BS:B:1,5;S:2,5 |
| right | no | - | force_blocked |

回到初始: yes, depth=11, path=down right right right up left down left left left up
局部可达图: status=complete, states=17, transitions=36, winStates=0, maxDepth=6
事件类型: move_sticky_rigid=2, push_object:sticky#1=2, walk=34

## lshape_corner_handle_blocked_no_return

结构族: sticky_mouth_side_handle_return_gate
变体: lshape_corner_handle_blocked
变化变量: 只把 L 形凸角右侧把手格 x6,y3 改成墙，前沿目标仍开放
对照: lshape_corner_handle_open_return

问题: 堵住凸角右侧把手而不改变首步前沿时，是否切断反向 push 接口？
动作序列: right
反事实禁用: 无
预算: exploreDepth=16, returnDepth=30, maxStates=40000, maxTransitions=120000

layout:
```text
############
#G##########
###M.#######
##@MM.######
##....######
#BS#########
############
```

初始状态:
```text
############
#G##########
###M.#######
##@MM.######
##....######
#BS#########
############
```

动作回放:
- 1. right: legal; events=push_object:sticky#1,move_sticky_rigid; eventWin=no
```text
############
#G##########
###.M#######
##.@MM######
##....######
#BS#########
############
```

最终状态:
```text
############
#G##########
###.M#######
##.@MM######
##....######
#BS#########
############
```
变化格: (3,2) M->.; (4,2) .->M; (2,3) @->.; (3,3) M->@; (5,3) .->M

最终状态动作表:
| action | legal | events | next / reason |
| --- | --- | --- | --- |
| up | yes | walk | Ply:3,2\|C:\|M:4,2;4,3;5,3\|PL:none\|BS:B:1,5;S:2,5 |
| down | yes | walk | Ply:3,4\|C:\|M:4,2;4,3;5,3\|PL:none\|BS:B:1,5;S:2,5 |
| left | yes | walk | Ply:2,3\|C:\|M:4,2;4,3;5,3\|PL:none\|BS:B:1,5;S:2,5 |
| right | no | - | force_blocked |

回到初始: no (complete: search complete)
局部可达图: status=complete, states=13, transitions=25, winStates=0, maxDepth=5
事件类型: move_sticky_rigid=1, push_object:sticky#1=1, walk=24

## lshape_corner_explicit_handle_consumption

结构族: sticky_mouth_side_handle_return_gate
变体: lshape_corner_explicit_reverse_push
变化变量: 在 L 形 open 布局中显式走到凸角右侧把手格并左推一次
对照: lshape_corner_handle_blocked_no_return

问题: L 形凸角输出的把手格能否被最小后续动作序列消费成一次反向 push？
动作序列: right down right right right up left
反事实禁用: 无
预算: exploreDepth=16, returnDepth=30, maxStates=40000, maxTransitions=120000

layout:
```text
############
#G##########
###M.#######
##@MM..#####
##.....#####
#BS#########
############
```

初始状态:
```text
############
#G##########
###M.#######
##@MM..#####
##.....#####
#BS#########
############
```

动作回放:
- 1. right: legal; events=push_object:sticky#1,move_sticky_rigid; eventWin=no
```text
############
#G##########
###.M#######
##.@MM.#####
##.....#####
#BS#########
############
```
- 2. down: legal; events=walk; eventWin=no
```text
############
#G##########
###.M#######
##..MM.#####
##.@...#####
#BS#########
############
```
- 3. right: legal; events=walk; eventWin=no
```text
############
#G##########
###.M#######
##..MM.#####
##..@..#####
#BS#########
############
```
- 4. right: legal; events=walk; eventWin=no
```text
############
#G##########
###.M#######
##..MM.#####
##...@.#####
#BS#########
############
```
- 5. right: legal; events=walk; eventWin=no
```text
############
#G##########
###.M#######
##..MM.#####
##....@#####
#BS#########
############
```
- 6. up: legal; events=walk; eventWin=no
```text
############
#G##########
###.M#######
##..MM@#####
##.....#####
#BS#########
############
```
- 7. left: legal; events=push_object:sticky#1,move_sticky_rigid; eventWin=no
```text
############
#G##########
###M.#######
##.MM@.#####
##.....#####
#BS#########
############
```

最终状态:
```text
############
#G##########
###M.#######
##.MM@.#####
##.....#####
#BS#########
############
```
变化格: (2,3) @->.; (5,3) .->@

最终状态动作表:
| action | legal | events | next / reason |
| --- | --- | --- | --- |
| up | no | - | destination_blocked |
| down | yes | walk | Ply:5,4\|C:\|M:3,2;3,3;4,3\|PL:none\|BS:B:1,5;S:2,5 |
| left | no | - | force_blocked |
| right | yes | walk | Ply:6,3\|C:\|M:3,2;3,3;4,3\|PL:none\|BS:B:1,5;S:2,5 |

回到初始: yes, depth=5, path=down left left left up
局部可达图: status=complete, states=17, transitions=36, winStates=0, maxDepth=6
事件类型: move_sticky_rigid=2, push_object:sticky#1=2, walk=34

## lshape_overwide_corner_shortcut

结构族: sticky_mouth_side_handle_return_gate
变体: lshape_overwide_corner_shortcut
变化变量: 把 L 形上方和右侧空间放宽，凸角把手不再是唯一回位入口
对照: lshape_corner_handle_open_return

问题: 当 L 形周边空间过自由时，是否绕过凸角单格把手门？
动作序列: right
反事实禁用: 无
预算: exploreDepth=16, returnDepth=30, maxStates=40000, maxTransitions=120000

layout:
```text
#############
#G         ##
###M.....####
##@MM....####
##......#####
#BS##########
#############
```

初始状态:
```text
#############
#G.........##
###M.....####
##@MM....####
##......#####
#BS##########
#############
```

动作回放:
- 1. right: legal; events=push_object:sticky#1,move_sticky_rigid; eventWin=no
```text
#############
#G.........##
###.M....####
##.@MM...####
##......#####
#BS##########
#############
```

最终状态:
```text
#############
#G.........##
###.M....####
##.@MM...####
##......#####
#BS##########
#############
```
变化格: (3,2) M->.; (4,2) .->M; (2,3) @->.; (3,3) M->@; (5,3) .->M

最终状态动作表:
| action | legal | events | next / reason |
| --- | --- | --- | --- |
| up | yes | walk | Ply:3,2\|C:\|M:4,2;4,3;5,3\|PL:none\|BS:B:1,5;S:2,5 |
| down | yes | walk | Ply:3,4\|C:\|M:4,2;4,3;5,3\|PL:none\|BS:B:1,5;S:2,5 |
| left | yes | walk | Ply:2,3\|C:\|M:4,2;4,3;5,3\|PL:none\|BS:B:1,5;S:2,5 |
| right | yes | push_object:sticky#1,move_sticky_rigid | Ply:4,3\|C:\|M:5,2;5,3;6,3\|PL:none\|BS:B:1,5;S:2,5 |

回到初始: yes, depth=11, path=down right right right up left down left left left up
局部可达图: status=complete, states=381, transitions=1081, winStates=0, maxDepth=16
事件类型: move_sticky_rigid=58, push_object:sticky#1=58, walk=1023

## lshape_missing_top_left_open_return

结构族: sticky_mouth_side_handle_return_gate
变体: lshape_missing_top_left_open
变化变量: 3 格 L 缺左上角，右推后开放右侧下格把手
对照: lshape_missing_top_left_blocked_no_return

问题: 缺左上角的 L 形在同样前沿可过时，右侧下格把手是否足以回返？
动作序列: right
反事实禁用: 无
预算: exploreDepth=16, returnDepth=30, maxStates=40000, maxTransitions=120000

layout:
```text
############
#G##########
####M.######
##@MM..#####
##.....#####
#BS#########
############
```

初始状态:
```text
############
#G##########
####M.######
##@MM..#####
##.....#####
#BS#########
############
```

动作回放:
- 1. right: legal; events=push_object:sticky#1,move_sticky_rigid; eventWin=no
```text
############
#G##########
####.M######
##.@MM.#####
##.....#####
#BS#########
############
```

最终状态:
```text
############
#G##########
####.M######
##.@MM.#####
##.....#####
#BS#########
############
```
变化格: (4,2) M->.; (5,2) .->M; (2,3) @->.; (3,3) M->@; (5,3) .->M

最终状态动作表:
| action | legal | events | next / reason |
| --- | --- | --- | --- |
| up | no | - | destination_blocked |
| down | yes | walk | Ply:3,4\|C:\|M:5,2;4,3;5,3\|PL:none\|BS:B:1,5;S:2,5 |
| left | yes | walk | Ply:2,3\|C:\|M:5,2;4,3;5,3\|PL:none\|BS:B:1,5;S:2,5 |
| right | no | - | force_blocked |

回到初始: yes, depth=11, path=down right right right up left down left left left up
局部可达图: status=complete, states=17, transitions=36, winStates=0, maxDepth=6
事件类型: move_sticky_rigid=2, push_object:sticky#1=2, walk=34

## lshape_missing_top_left_blocked_no_return

结构族: sticky_mouth_side_handle_return_gate
变体: lshape_missing_top_left_blocked
变化变量: 3 格 L 缺左上角，只堵右侧下格把手
对照: lshape_missing_top_left_open_return

问题: 缺左上角的 L 形只堵下格把手后，是否切断回返？
动作序列: right
反事实禁用: 无
预算: exploreDepth=16, returnDepth=30, maxStates=40000, maxTransitions=120000

layout:
```text
############
#G##########
####M.######
##@MM.######
##....######
#BS#########
############
```

初始状态:
```text
############
#G##########
####M.######
##@MM.######
##....######
#BS#########
############
```

动作回放:
- 1. right: legal; events=push_object:sticky#1,move_sticky_rigid; eventWin=no
```text
############
#G##########
####.M######
##.@MM######
##....######
#BS#########
############
```

最终状态:
```text
############
#G##########
####.M######
##.@MM######
##....######
#BS#########
############
```
变化格: (4,2) M->.; (5,2) .->M; (2,3) @->.; (3,3) M->@; (5,3) .->M

最终状态动作表:
| action | legal | events | next / reason |
| --- | --- | --- | --- |
| up | no | - | destination_blocked |
| down | yes | walk | Ply:3,4\|C:\|M:5,2;4,3;5,3\|PL:none\|BS:B:1,5;S:2,5 |
| left | yes | walk | Ply:2,3\|C:\|M:5,2;4,3;5,3\|PL:none\|BS:B:1,5;S:2,5 |
| right | no | - | force_blocked |

回到初始: no (complete: search complete)
局部可达图: status=complete, states=13, transitions=25, winStates=0, maxDepth=6
事件类型: move_sticky_rigid=1, push_object:sticky#1=1, walk=24

## lshape_missing_bottom_right_open_return

结构族: sticky_mouth_side_handle_return_gate
变体: lshape_missing_bottom_right_open
变化变量: 3 格 L 缺右下角，右推后开放右侧下格把手
对照: lshape_missing_bottom_right_blocked_no_return

问题: 缺右下角的 L 形右推后，靠近内角的右侧下格把手是否足以回返？
动作序列: right
反事实禁用: 无
预算: exploreDepth=16, returnDepth=30, maxStates=40000, maxTransitions=120000

layout:
```text
############
#G##########
###MM.######
##@M..######
##....######
#BS#########
############
```

初始状态:
```text
############
#G##########
###MM.######
##@M..######
##....######
#BS#########
############
```

动作回放:
- 1. right: legal; events=push_object:sticky#1,move_sticky_rigid; eventWin=no
```text
############
#G##########
###.MM######
##.@M.######
##....######
#BS#########
############
```

最终状态:
```text
############
#G##########
###.MM######
##.@M.######
##....######
#BS#########
############
```
变化格: (3,2) M->.; (5,2) .->M; (2,3) @->.; (3,3) M->@; (4,3) .->M

最终状态动作表:
| action | legal | events | next / reason |
| --- | --- | --- | --- |
| up | yes | walk | Ply:3,2\|C:\|M:4,2;5,2;4,3\|PL:none\|BS:B:1,5;S:2,5 |
| down | yes | walk | Ply:3,4\|C:\|M:4,2;5,2;4,3\|PL:none\|BS:B:1,5;S:2,5 |
| left | yes | walk | Ply:2,3\|C:\|M:4,2;5,2;4,3\|PL:none\|BS:B:1,5;S:2,5 |
| right | no | - | force_blocked |

回到初始: yes, depth=9, path=down right right up left down left left up
局部可达图: status=complete, states=16, transitions=34, winStates=0, maxDepth=6
事件类型: move_sticky_rigid=2, push_object:sticky#1=2, walk=32

## lshape_missing_bottom_right_blocked_no_return

结构族: sticky_mouth_side_handle_return_gate
变体: lshape_missing_bottom_right_blocked
变化变量: 3 格 L 缺右下角，只堵右侧下格把手
对照: lshape_missing_bottom_right_open_return

问题: 缺右下角的 L 形堵住唯一可达右侧下格把手后，是否切断回返？
动作序列: right
反事实禁用: 无
预算: exploreDepth=16, returnDepth=30, maxStates=40000, maxTransitions=120000

layout:
```text
############
#G##########
###MM.######
##@M.#######
##...#######
#BS#########
############
```

初始状态:
```text
############
#G##########
###MM.######
##@M.#######
##...#######
#BS#########
############
```

动作回放:
- 1. right: legal; events=push_object:sticky#1,move_sticky_rigid; eventWin=no
```text
############
#G##########
###.MM######
##.@M#######
##...#######
#BS#########
############
```

最终状态:
```text
############
#G##########
###.MM######
##.@M#######
##...#######
#BS#########
############
```
变化格: (3,2) M->.; (5,2) .->M; (2,3) @->.; (3,3) M->@; (4,3) .->M

最终状态动作表:
| action | legal | events | next / reason |
| --- | --- | --- | --- |
| up | yes | walk | Ply:3,2\|C:\|M:4,2;5,2;4,3\|PL:none\|BS:B:1,5;S:2,5 |
| down | yes | walk | Ply:3,4\|C:\|M:4,2;5,2;4,3\|PL:none\|BS:B:1,5;S:2,5 |
| left | yes | walk | Ply:2,3\|C:\|M:4,2;5,2;4,3\|PL:none\|BS:B:1,5;S:2,5 |
| right | no | - | force_blocked |

回到初始: no (complete: search complete)
局部可达图: status=complete, states=11, transitions=21, winStates=0, maxDepth=4
事件类型: move_sticky_rigid=1, push_object:sticky#1=1, walk=20

## lshape_missing_bottom_left_open_return

结构族: sticky_mouth_side_handle_return_gate
变体: lshape_missing_bottom_left_open
变化变量: 3 格 L 缺左下角，玩家从上格推入，开放右侧下格把手
对照: lshape_missing_bottom_left_blocked_no_return

问题: 缺左下角的 L 形需要从上格驱动时，推进后的右侧下格把手是否仍可回返？
动作序列: right
反事实禁用: 无
预算: exploreDepth=16, returnDepth=30, maxStates=40000, maxTransitions=120000

layout:
```text
#############
#G###########
##@MM.#######
##..M..######
##.....######
#BS##########
#############
```

初始状态:
```text
#############
#G###########
##@MM.#######
##..M..######
##.....######
#BS##########
#############
```

动作回放:
- 1. right: legal; events=push_object:sticky#1,move_sticky_rigid; eventWin=no
```text
#############
#G###########
##.@MM#######
##...M.######
##.....######
#BS##########
#############
```

最终状态:
```text
#############
#G###########
##.@MM#######
##...M.######
##.....######
#BS##########
#############
```
变化格: (2,2) @->.; (3,2) M->@; (5,2) .->M; (4,3) M->.; (5,3) .->M

最终状态动作表:
| action | legal | events | next / reason |
| --- | --- | --- | --- |
| up | no | - | destination_blocked |
| down | yes | walk | Ply:3,3\|C:\|M:4,2;5,2;5,3\|PL:none\|BS:B:1,5;S:2,5 |
| left | yes | walk | Ply:2,2\|C:\|M:4,2;5,2;5,3\|PL:none\|BS:B:1,5;S:2,5 |
| right | no | - | force_blocked |

回到初始: yes, depth=13, path=down down right right right up left down left left up left up
局部可达图: status=complete, states=33, transitions=82, winStates=0, maxDepth=11
事件类型: move_sticky_rigid=6, push_object:sticky#1=6, walk=76

## lshape_missing_bottom_left_blocked_no_return

结构族: sticky_mouth_side_handle_return_gate
变体: lshape_missing_bottom_left_blocked
变化变量: 3 格 L 缺左下角，只堵右侧下格把手
对照: lshape_missing_bottom_left_open_return

问题: 缺左下角的 L 形堵住右侧下格把手后，是否切断回返？
动作序列: right
反事实禁用: 无
预算: exploreDepth=16, returnDepth=30, maxStates=40000, maxTransitions=120000

layout:
```text
#############
#G###########
##@MM.#######
##..M.#######
##....#######
#BS##########
#############
```

初始状态:
```text
#############
#G###########
##@MM.#######
##..M.#######
##....#######
#BS##########
#############
```

动作回放:
- 1. right: legal; events=push_object:sticky#1,move_sticky_rigid; eventWin=no
```text
#############
#G###########
##.@MM#######
##...M#######
##....#######
#BS##########
#############
```

最终状态:
```text
#############
#G###########
##.@MM#######
##...M#######
##....#######
#BS##########
#############
```
变化格: (2,2) @->.; (3,2) M->@; (5,2) .->M; (4,3) M->.; (5,3) .->M

最终状态动作表:
| action | legal | events | next / reason |
| --- | --- | --- | --- |
| up | no | - | destination_blocked |
| down | yes | walk | Ply:3,3\|C:\|M:4,2;5,2;5,3\|PL:none\|BS:B:1,5;S:2,5 |
| left | yes | walk | Ply:2,2\|C:\|M:4,2;5,2;5,3\|PL:none\|BS:B:1,5;S:2,5 |
| right | no | - | force_blocked |

回到初始: no (complete: search complete)
局部可达图: status=complete, states=27, transitions=65, winStates=0, maxDepth=11
事件类型: move_sticky_rigid=5, push_object:sticky#1=5, walk=60

## square2_side_face_open_return

结构族: sticky_mouth_side_handle_return_gate
变体: square2_side_face_open
变化变量: 2x2 前沿可过后开放右侧下格施力位 x6,y3 与下侧进入通道
对照: square2_side_face_blocked_no_return

问题: 2x2 sticky 在前沿两格都开放后，单个右侧施力位是否足以把整块反推回位？
动作序列: right
反事实禁用: 无
预算: exploreDepth=16, returnDepth=30, maxStates=40000, maxTransitions=120000

layout:
```text
############
#G##########
###MM.######
##@MM..#####
##.....#####
#BS#########
############
```

初始状态:
```text
############
#G##########
###MM.######
##@MM..#####
##.....#####
#BS#########
############
```

动作回放:
- 1. right: legal; events=push_object:sticky#1,move_sticky_rigid; eventWin=no
```text
############
#G##########
###.MM######
##.@MM.#####
##.....#####
#BS#########
############
```

最终状态:
```text
############
#G##########
###.MM######
##.@MM.#####
##.....#####
#BS#########
############
```
变化格: (3,2) M->.; (5,2) .->M; (2,3) @->.; (3,3) M->@; (5,3) .->M

最终状态动作表:
| action | legal | events | next / reason |
| --- | --- | --- | --- |
| up | yes | walk | Ply:3,2\|C:\|M:4,2;5,2;4,3;5,3\|PL:none\|BS:B:1,5;S:2,5 |
| down | yes | walk | Ply:3,4\|C:\|M:4,2;5,2;4,3;5,3\|PL:none\|BS:B:1,5;S:2,5 |
| left | yes | walk | Ply:2,3\|C:\|M:4,2;5,2;4,3;5,3\|PL:none\|BS:B:1,5;S:2,5 |
| right | no | - | force_blocked |

回到初始: yes, depth=11, path=down right right right up left down left left left up
局部可达图: status=complete, states=18, transitions=38, winStates=0, maxDepth=6
事件类型: move_sticky_rigid=2, push_object:sticky#1=2, walk=36

## square2_side_face_blocked_no_return

结构族: sticky_mouth_side_handle_return_gate
变体: square2_side_face_blocked
变化变量: 只把 2x2 右侧施力位 x6,y3 改成墙，前沿目标两格仍开放
对照: square2_side_face_open_return

问题: 堵住 2x2 右侧施力位而不改变首步前沿时，是否切断回位接口？
动作序列: right
反事实禁用: 无
预算: exploreDepth=16, returnDepth=30, maxStates=40000, maxTransitions=120000

layout:
```text
############
#G##########
###MM.######
##@MM.######
##....######
#BS#########
############
```

初始状态:
```text
############
#G##########
###MM.######
##@MM.######
##....######
#BS#########
############
```

动作回放:
- 1. right: legal; events=push_object:sticky#1,move_sticky_rigid; eventWin=no
```text
############
#G##########
###.MM######
##.@MM######
##....######
#BS#########
############
```

最终状态:
```text
############
#G##########
###.MM######
##.@MM######
##....######
#BS#########
############
```
变化格: (3,2) M->.; (5,2) .->M; (2,3) @->.; (3,3) M->@; (5,3) .->M

最终状态动作表:
| action | legal | events | next / reason |
| --- | --- | --- | --- |
| up | yes | walk | Ply:3,2\|C:\|M:4,2;5,2;4,3;5,3\|PL:none\|BS:B:1,5;S:2,5 |
| down | yes | walk | Ply:3,4\|C:\|M:4,2;5,2;4,3;5,3\|PL:none\|BS:B:1,5;S:2,5 |
| left | yes | walk | Ply:2,3\|C:\|M:4,2;5,2;4,3;5,3\|PL:none\|BS:B:1,5;S:2,5 |
| right | no | - | force_blocked |

回到初始: no (complete: search complete)
局部可达图: status=complete, states=14, transitions=27, winStates=0, maxDepth=6
事件类型: move_sticky_rigid=1, push_object:sticky#1=1, walk=26

## square2_explicit_face_consumption

结构族: sticky_mouth_side_handle_return_gate
变体: square2_explicit_reverse_push
变化变量: 在 2x2 open 布局中显式走到右侧下格施力位并左推一次
对照: square2_side_face_blocked_no_return

问题: 2x2 的右侧施力位能否被最小后续动作序列消费成一次整块反推？
动作序列: right down right right right up left
反事实禁用: 无
预算: exploreDepth=16, returnDepth=30, maxStates=40000, maxTransitions=120000

layout:
```text
############
#G##########
###MM.######
##@MM..#####
##.....#####
#BS#########
############
```

初始状态:
```text
############
#G##########
###MM.######
##@MM..#####
##.....#####
#BS#########
############
```

动作回放:
- 1. right: legal; events=push_object:sticky#1,move_sticky_rigid; eventWin=no
```text
############
#G##########
###.MM######
##.@MM.#####
##.....#####
#BS#########
############
```
- 2. down: legal; events=walk; eventWin=no
```text
############
#G##########
###.MM######
##..MM.#####
##.@...#####
#BS#########
############
```
- 3. right: legal; events=walk; eventWin=no
```text
############
#G##########
###.MM######
##..MM.#####
##..@..#####
#BS#########
############
```
- 4. right: legal; events=walk; eventWin=no
```text
############
#G##########
###.MM######
##..MM.#####
##...@.#####
#BS#########
############
```
- 5. right: legal; events=walk; eventWin=no
```text
############
#G##########
###.MM######
##..MM.#####
##....@#####
#BS#########
############
```
- 6. up: legal; events=walk; eventWin=no
```text
############
#G##########
###.MM######
##..MM@#####
##.....#####
#BS#########
############
```
- 7. left: legal; events=push_object:sticky#1,move_sticky_rigid; eventWin=no
```text
############
#G##########
###MM.######
##.MM@.#####
##.....#####
#BS#########
############
```

最终状态:
```text
############
#G##########
###MM.######
##.MM@.#####
##.....#####
#BS#########
############
```
变化格: (2,3) @->.; (5,3) .->@

最终状态动作表:
| action | legal | events | next / reason |
| --- | --- | --- | --- |
| up | yes | walk | Ply:5,2\|C:\|M:3,2;4,2;3,3;4,3\|PL:none\|BS:B:1,5;S:2,5 |
| down | yes | walk | Ply:5,4\|C:\|M:3,2;4,2;3,3;4,3\|PL:none\|BS:B:1,5;S:2,5 |
| left | no | - | force_blocked |
| right | yes | walk | Ply:6,3\|C:\|M:3,2;4,2;3,3;4,3\|PL:none\|BS:B:1,5;S:2,5 |

回到初始: yes, depth=5, path=down left left left up
局部可达图: status=complete, states=18, transitions=38, winStates=0, maxDepth=6
事件类型: move_sticky_rigid=2, push_object:sticky#1=2, walk=36

