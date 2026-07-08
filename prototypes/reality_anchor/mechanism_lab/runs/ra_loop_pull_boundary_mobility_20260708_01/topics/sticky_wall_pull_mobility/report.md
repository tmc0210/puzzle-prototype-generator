# 机制局部实验: ra_loop_pull_boundary_mobility_20260708_01_sticky_wall_pull_mobility

- 原型: reality_anchor
- 生成时间: 2026-07-08T03:54:41.929Z
- 标题: sticky wall pull mobility local probes
- 备注: Topic-local probes for sticky rigid footprint under pull_force. P/L only creates the pull region; B/S only supplies sticky material. Wall mouths, footprint target cells, and post-pull handle reachability are the consumers.


## 结构族摘要

### pull_single_cell_material_control
| case | variant | changed variable | contrast | return | final legal | final illegal | graph |
| --- | --- | --- | --- | --- | --- | --- | --- |
| single_crate_pull_clear | crate_clear | material=crate; no B/S material source | single_sticky_pull_clear | yes depth=9 | up, down, right | left:pull_world_front_blocked | complete / 114 states |
| single_sticky_pull_clear | sticky_clear | material=single sticky supplied by sealed B/S | single_crate_pull_clear | yes depth=9 | up, down, right | left:pull_world_front_blocked | complete / 114 states |

### sticky_pull_footprint_wall_mouth
| case | variant | changed variable | contrast | return | final legal | final illegal | graph |
| --- | --- | --- | --- | --- | --- | --- | --- |
| bar_side_pull_target_wall_blocked | vertical_bar_blocked | lower footprint target cell is wall | bar_side_pull_open_mouth | not applicable: replay stopped at illegal action; return search skipped | up | down:destination_blocked, left:pull_world_front_blocked, right:force_blocked | complete / 95 states |
| bar_side_pull_open_mouth | vertical_bar_open | lower footprint target cell opened | bar_side_pull_target_wall_blocked | yes depth=9 | up, down, right | left:pull_world_front_blocked | complete / 138 states |
| l_corner_pull_tooth_blocked | l_corner_tooth_blocked | L lower-right target tooth is wall | l_corner_pull_notch_open | not applicable: replay stopped at illegal action; return search skipped | up | down:pull_world_front_blocked, left:pull_world_front_blocked, right:force_blocked | complete / 7 states |
| l_corner_pull_notch_open | l_corner_notch_open | L lower-right target tooth opened | l_corner_pull_tooth_blocked | no complete | up, right | down:pull_world_front_blocked, left:pull_world_front_blocked | complete / 9 states |

### sticky_pull_post_mouth_handle
| case | variant | changed variable | contrast | return | final legal | final illegal | graph |
| --- | --- | --- | --- | --- | --- | --- | --- |
| bar_pull_after_handle_open | handle_loop_open | top side loop keeps reverse handle reachable after pull | bar_pull_after_handle_closed | yes depth=9 | up, down, right | left:pull_world_front_blocked | complete / 108 states |
| bar_pull_after_handle_closed | handle_loop_closed | top side loop closed by wall band | bar_pull_after_handle_open | no complete | down, right | up:destination_blocked, left:pull_world_front_blocked | complete / 12 states |

## single_crate_pull_clear: 单格 crate 在 pull 区域被向右拉动

结构族: pull_single_cell_material_control
变体: crate_clear
变化变量: material=crate; no B/S material source
对照: single_sticky_pull_clear

问题: 单格 crate 的 clear pull 是否只需要玩家前格为空和身后一格有对象？
备注: active_rule=pull_force; material_source=crate; consumer=none beyond clear target cell.
动作序列: right
反事实禁用: 无
预算: exploreDepth=14, returnDepth=24, maxStates=20000, maxTransitions=80000

layout:
```text
##########
#PL#    G#
#  #     #
#  # C@  #
#  #     #
##########
```

初始状态:
```text
##########
#PL#....G#
#..#.....#
#..#.C@..#
#..#.....#
##########
```

动作回放:
- 1. right: legal; events=pull_object:crate#1; eventWin=no
```text
##########
#PL#....G#
#..#.....#
#..#..C@.#
#..#.....#
##########
```

最终状态:
```text
##########
#PL#....G#
#..#.....#
#..#..C@.#
#..#.....#
##########
```
变化格: (5,3) C->.; (6,3) @->C; (7,3) .->@

最终状态动作表:
| action | legal | events | next / reason |
| --- | --- | --- | --- |
| up | yes | walk | Ply:7,2\|C:6,3\|M:\|PL:P:1,1;L:2,1\|BS:none |
| down | yes | walk | Ply:7,4\|C:6,3\|M:\|PL:P:1,1;L:2,1\|BS:none |
| left | no | - | pull_world_front_blocked |
| right | yes | pull_object:crate#1 | Ply:8,3\|C:7,3\|M:\|PL:P:1,1;L:2,1\|BS:none |

回到初始: yes, depth=9, path=up left left down left up right right down
局部可达图: status=complete, states=114, transitions=324, winStates=0, maxDepth=11
事件类型: pull_object:crate#1=14, walk=310

## single_sticky_pull_clear: 单格 sticky 在 pull 区域被向右拉动

结构族: pull_single_cell_material_control
变体: sticky_clear
变化变量: material=single sticky supplied by sealed B/S
对照: single_crate_pull_clear

问题: 单格 sticky 是否与单格 crate 在 clear pull 下同构，只多出 move_sticky_rigid 事件？
备注: active_rule=pull_force; material_source=B/S creates single M; consumer=none beyond clear target cell.
动作序列: right
反事实禁用: 无
预算: exploreDepth=14, returnDepth=24, maxStates=20000, maxTransitions=80000

layout:
```text
##########
#PL#    G#
#BS#     #
#  # M@  #
#  #     #
##########
```

初始状态:
```text
##########
#PL#....G#
#BS#.....#
#..#.M@..#
#..#.....#
##########
```

动作回放:
- 1. right: legal; events=pull_object:sticky#1,move_sticky_rigid; eventWin=no
```text
##########
#PL#....G#
#BS#.....#
#..#..M@.#
#..#.....#
##########
```

最终状态:
```text
##########
#PL#....G#
#BS#.....#
#..#..M@.#
#..#.....#
##########
```
变化格: (5,3) M->.; (6,3) @->M; (7,3) .->@

最终状态动作表:
| action | legal | events | next / reason |
| --- | --- | --- | --- |
| up | yes | walk | Ply:7,2\|C:\|M:6,3\|PL:P:1,1;L:2,1\|BS:B:1,2;S:2,2 |
| down | yes | walk | Ply:7,4\|C:\|M:6,3\|PL:P:1,1;L:2,1\|BS:B:1,2;S:2,2 |
| left | no | - | pull_world_front_blocked |
| right | yes | pull_object:sticky#1,move_sticky_rigid | Ply:8,3\|C:\|M:7,3\|PL:P:1,1;L:2,1\|BS:B:1,2;S:2,2 |

回到初始: yes, depth=9, path=up left left down left up right right down
局部可达图: status=complete, states=114, transitions=324, winStates=0, maxDepth=11
事件类型: move_sticky_rigid=14, pull_object:sticky#1=14, walk=310

## bar_side_pull_target_wall_blocked: 2 格竖条向右拉时被下侧目标墙拒绝

结构族: sticky_pull_footprint_wall_mouth
变体: vertical_bar_blocked
变化变量: lower footprint target cell is wall
对照: bar_side_pull_open_mouth

问题: 玩家前格为空时，2 格 sticky 的非接触格目标墙是否仍会让 pull 整步失败？
备注: active_rule=sticky rigid footprint under pull_force; material_source=B/S; consumer=wall at lower target cell.
动作序列: right
反事实禁用: 无
预算: exploreDepth=14, returnDepth=24, maxStates=20000, maxTransitions=80000

layout:
```text
##########
#PL#    G#
#BS#     #
#  # M@  #
#  # M#  #
#  #     #
##########
```

初始状态:
```text
##########
#PL#....G#
#BS#.....#
#..#.M@..#
#..#.M#..#
#..#.....#
##########
```

动作回放:
- 1. right: illegal (force_blocked); events=-; eventWin=no
```text
##########
#PL#....G#
#BS#.....#
#..#.M@..#
#..#.M#..#
#..#.....#
##########
```
- 后续动作未继续回放，因为动作序列中出现 illegal step。

最终状态:
```text
##########
#PL#....G#
#BS#.....#
#..#.M@..#
#..#.M#..#
#..#.....#
##########
```
变化格: 无

最终状态动作表:
| action | legal | events | next / reason |
| --- | --- | --- | --- |
| up | yes | walk | Ply:6,2\|C:\|M:5,3;5,4\|PL:P:1,1;L:2,1\|BS:B:1,2;S:2,2 |
| down | no | - | destination_blocked |
| left | no | - | pull_world_front_blocked |
| right | no | - | force_blocked |

回到初始: not applicable (replay stopped at illegal action; return search skipped)
局部可达图: status=complete, states=95, transitions=235, winStates=0, maxDepth=14
事件类型: move_sticky_rigid=11, pull_object:sticky#1=11, walk=224

## bar_side_pull_open_mouth: 2 格竖条向右拉时目标口打开

结构族: sticky_pull_footprint_wall_mouth
变体: vertical_bar_open
变化变量: lower footprint target cell opened
对照: bar_side_pull_target_wall_blocked

问题: 打开同一目标格后，2 格 sticky 是否可作为整体被 pull 通过？
备注: active_rule=sticky rigid footprint under pull_force; material_source=B/S; consumer=open two-cell mouth.
动作序列: right
反事实禁用: 无
预算: exploreDepth=14, returnDepth=24, maxStates=20000, maxTransitions=80000

layout:
```text
##########
#PL#    G#
#BS#     #
#  # M@  #
#  # M   #
#  #     #
##########
```

初始状态:
```text
##########
#PL#....G#
#BS#.....#
#..#.M@..#
#..#.M...#
#..#.....#
##########
```

动作回放:
- 1. right: legal; events=pull_object:sticky#1,move_sticky_rigid; eventWin=no
```text
##########
#PL#....G#
#BS#.....#
#..#..M@.#
#..#..M..#
#..#.....#
##########
```

最终状态:
```text
##########
#PL#....G#
#BS#.....#
#..#..M@.#
#..#..M..#
#..#.....#
##########
```
变化格: (5,3) M->.; (6,3) @->M; (7,3) .->@; (5,4) M->.; (6,4) .->M

最终状态动作表:
| action | legal | events | next / reason |
| --- | --- | --- | --- |
| up | yes | walk | Ply:7,2\|C:\|M:6,3;6,4\|PL:P:1,1;L:2,1\|BS:B:1,2;S:2,2 |
| down | yes | walk | Ply:7,4\|C:\|M:6,3;6,4\|PL:P:1,1;L:2,1\|BS:B:1,2;S:2,2 |
| left | no | - | pull_world_front_blocked |
| right | yes | pull_object:sticky#1,move_sticky_rigid | Ply:8,3\|C:\|M:7,3;7,4\|PL:P:1,1;L:2,1\|BS:B:1,2;S:2,2 |

回到初始: yes, depth=9, path=up left left down left up right right down
局部可达图: status=complete, states=138, transitions=396, winStates=0, maxDepth=12
事件类型: move_sticky_rigid=22, pull_object:sticky#1=22, walk=374

## l_corner_pull_tooth_blocked: L 形 sticky 向右拉时被凸齿目标墙拒绝

结构族: sticky_pull_footprint_wall_mouth
变体: l_corner_tooth_blocked
变化变量: L lower-right target tooth is wall
对照: l_corner_pull_notch_open

问题: L 形的远端脚目标格为墙时，接触格能进玩家旧位是否仍不足以合法 pull？
备注: active_rule=sticky rigid footprint under pull_force; material_source=B/S; consumer=convex wall tooth.
动作序列: right
反事实禁用: 无
预算: exploreDepth=14, returnDepth=24, maxStates=20000, maxTransitions=80000

layout:
```text
##########
#PL#    G#
#BS#     #
#  # M@  #
#  # MM# #
#  #     #
##########
```

初始状态:
```text
##########
#PL#....G#
#BS#.....#
#..#.M@..#
#..#.MM#.#
#..#.....#
##########
```

动作回放:
- 1. right: illegal (force_blocked); events=-; eventWin=no
```text
##########
#PL#....G#
#BS#.....#
#..#.M@..#
#..#.MM#.#
#..#.....#
##########
```
- 后续动作未继续回放，因为动作序列中出现 illegal step。

最终状态:
```text
##########
#PL#....G#
#BS#.....#
#..#.M@..#
#..#.MM#.#
#..#.....#
##########
```
变化格: 无

最终状态动作表:
| action | legal | events | next / reason |
| --- | --- | --- | --- |
| up | yes | pull_object:sticky#1,move_sticky_rigid | Ply:6,2\|C:\|M:5,2;5,3;6,3\|PL:P:1,1;L:2,1\|BS:B:1,2;S:2,2 |
| down | no | - | pull_world_front_blocked |
| left | no | - | pull_world_front_blocked |
| right | no | - | force_blocked |

回到初始: not applicable (replay stopped at illegal action; return search skipped)
局部可达图: status=complete, states=7, transitions=8, winStates=0, maxDepth=4
事件类型: move_sticky_rigid=8, pull_object:sticky#1=8

## l_corner_pull_notch_open: L 形 sticky 向右拉时凸齿打开

结构族: sticky_pull_footprint_wall_mouth
变体: l_corner_notch_open
变化变量: L lower-right target tooth opened
对照: l_corner_pull_tooth_blocked

问题: 只打开 L 形远端脚的目标格后，整块是否能通过同一 pull 动作？
备注: active_rule=sticky rigid footprint under pull_force; material_source=B/S; consumer=open convex notch.
动作序列: right
反事实禁用: 无
预算: exploreDepth=14, returnDepth=24, maxStates=20000, maxTransitions=80000

layout:
```text
##########
#PL#    G#
#BS#     #
#  # M@  #
#  # MM  #
#  #     #
##########
```

初始状态:
```text
##########
#PL#....G#
#BS#.....#
#..#.M@..#
#..#.MM..#
#..#.....#
##########
```

动作回放:
- 1. right: legal; events=pull_object:sticky#1,move_sticky_rigid; eventWin=no
```text
##########
#PL#....G#
#BS#.....#
#..#..M@.#
#..#..MM.#
#..#.....#
##########
```

最终状态:
```text
##########
#PL#....G#
#BS#.....#
#..#..M@.#
#..#..MM.#
#..#.....#
##########
```
变化格: (5,3) M->.; (6,3) @->M; (7,3) .->@; (5,4) M->.; (7,4) .->M

最终状态动作表:
| action | legal | events | next / reason |
| --- | --- | --- | --- |
| up | yes | pull_object:sticky#1,move_sticky_rigid | Ply:7,2\|C:\|M:6,2;6,3;7,3\|PL:P:1,1;L:2,1\|BS:B:1,2;S:2,2 |
| down | no | - | pull_world_front_blocked |
| left | no | - | pull_world_front_blocked |
| right | yes | pull_object:sticky#1,move_sticky_rigid | Ply:8,3\|C:\|M:7,3;7,4;8,4\|PL:P:1,1;L:2,1\|BS:B:1,2;S:2,2 |

回到初始: no (complete: search complete)
局部可达图: status=complete, states=9, transitions=12, winStates=0, maxDepth=4
事件类型: move_sticky_rigid=12, pull_object:sticky#1=12

## bar_pull_after_handle_open: 2 格竖条拉过口后可绕回反向把手

结构族: sticky_pull_post_mouth_handle
变体: handle_loop_open
变化变量: top side loop keeps reverse handle reachable after pull
对照: bar_pull_after_handle_closed

问题: 拉过口后，若上侧环路开放，玩家是否能回到左侧把手格并把竖条拉回？
备注: active_rule=sticky rigid footprint under pull_force; material_source=B/S; consumer=post-pull handle reachability.
动作序列: right
反事实禁用: 无
预算: exploreDepth=14, returnDepth=24, maxStates=20000, maxTransitions=80000

layout:
```text
##########
#PL#    G#
#BS#     #
#  # M@  #
#  # M   #
##########
```

初始状态:
```text
##########
#PL#....G#
#BS#.....#
#..#.M@..#
#..#.M...#
##########
```

动作回放:
- 1. right: legal; events=pull_object:sticky#1,move_sticky_rigid; eventWin=no
```text
##########
#PL#....G#
#BS#.....#
#..#..M@.#
#..#..M..#
##########
```

最终状态:
```text
##########
#PL#....G#
#BS#.....#
#..#..M@.#
#..#..M..#
##########
```
变化格: (5,3) M->.; (6,3) @->M; (7,3) .->@; (5,4) M->.; (6,4) .->M

最终状态动作表:
| action | legal | events | next / reason |
| --- | --- | --- | --- |
| up | yes | walk | Ply:7,2\|C:\|M:6,3;6,4\|PL:P:1,1;L:2,1\|BS:B:1,2;S:2,2 |
| down | yes | walk | Ply:7,4\|C:\|M:6,3;6,4\|PL:P:1,1;L:2,1\|BS:B:1,2;S:2,2 |
| left | no | - | pull_world_front_blocked |
| right | yes | pull_object:sticky#1,move_sticky_rigid | Ply:8,3\|C:\|M:7,3;7,4\|PL:P:1,1;L:2,1\|BS:B:1,2;S:2,2 |

回到初始: yes, depth=9, path=up left left down left up right right down
局部可达图: status=complete, states=108, transitions=294, winStates=0, maxDepth=11
事件类型: move_sticky_rigid=19, pull_object:sticky#1=19, walk=275

## bar_pull_after_handle_closed: 2 格竖条拉过口后反向把手不可达

结构族: sticky_pull_post_mouth_handle
变体: handle_loop_closed
变化变量: top side loop closed by wall band
对照: bar_pull_after_handle_open

问题: 同样能先拉过口，但若上侧环路关闭，最终状态是否失去回到初始的把手路径？
备注: active_rule=sticky rigid footprint under pull_force; material_source=B/S; consumer=post-pull handle wall band.
动作序列: right
反事实禁用: 无
预算: exploreDepth=14, returnDepth=24, maxStates=20000, maxTransitions=80000

layout:
```text
##########
#PL#    G#
#BS##### #
#  # M@  #
#  # M   #
##########
```

初始状态:
```text
##########
#PL#....G#
#BS#####.#
#..#.M@..#
#..#.M...#
##########
```

动作回放:
- 1. right: legal; events=pull_object:sticky#1,move_sticky_rigid; eventWin=no
```text
##########
#PL#....G#
#BS#####.#
#..#..M@.#
#..#..M..#
##########
```

最终状态:
```text
##########
#PL#....G#
#BS#####.#
#..#..M@.#
#..#..M..#
##########
```
变化格: (5,3) M->.; (6,3) @->M; (7,3) .->@; (5,4) M->.; (6,4) .->M

最终状态动作表:
| action | legal | events | next / reason |
| --- | --- | --- | --- |
| up | no | - | destination_blocked |
| down | yes | walk | Ply:7,4\|C:\|M:6,3;6,4\|PL:P:1,1;L:2,1\|BS:B:1,2;S:2,2 |
| left | no | - | pull_world_front_blocked |
| right | yes | pull_object:sticky#1,move_sticky_rigid | Ply:8,3\|C:\|M:7,3;7,4\|PL:P:1,1;L:2,1\|BS:B:1,2;S:2,2 |

回到初始: no (complete: search complete)
局部可达图: status=complete, states=12, transitions=22, winStates=0, maxDepth=8
事件类型: move_sticky_rigid=4, pull_object:sticky#1=4, walk=18

