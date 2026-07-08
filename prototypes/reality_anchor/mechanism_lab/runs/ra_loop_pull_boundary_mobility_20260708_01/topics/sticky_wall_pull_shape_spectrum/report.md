# 机制局部实验: ra_loop_pull_boundary_mobility_20260708_01_sticky_wall_pull_shape_spectrum

- 原型: reality_anchor
- 生成时间: 2026-07-08T04:26:49.795Z
- 标题: sticky wall pull shape spectrum补实验
- 备注: 补齐 pull 侧黏块组 + 墙的形状谱。P/L 只提供 pull side；B/S 只提供合法 sticky material。关键观察点是 pull_force 对 sticky rigid footprint 的目标格 检查，以及 pull 后反向把手通路被墙 / crate / sticky 占用时的差异。


## 结构族摘要

### sticky_pull_shape_spectrum
| case | variant | changed variable | contrast | return | final legal | final illegal | graph |
| --- | --- | --- | --- | --- | --- | --- | --- |
| bar3_side_pull_mid_wall_blocked | vertical_bar3_mid_wall | 3格竖条中段目标格为墙 | bar3_side_pull_open_mouth | not applicable: replay stopped at illegal action; return search skipped | up | down:destination_blocked, left:pull_world_front_blocked, right:force_blocked | complete / 64 states |
| bar3_side_pull_open_mouth | vertical_bar3_open | 3格竖条三个目标格均开放 | bar3_side_pull_mid_wall_blocked | yes depth=9 | up, down, right | left:pull_world_front_blocked | complete / 263 states |
| square2_side_pull_lower_wall_blocked | square2_lower_wall | 2x2右下目标格为墙 | square2_side_pull_open_mouth | not applicable: replay stopped at illegal action; return search skipped | up | down:destination_blocked, left:pull_world_front_blocked, right:force_blocked | complete / 96 states |
| square2_side_pull_open_mouth | square2_open | 2x2右侧两个目标格均开放 | square2_side_pull_lower_wall_blocked | yes depth=11 | up, down, right | left:pull_world_front_blocked | complete / 156 states |

### sticky_pull_l_rotation_spectrum
| case | variant | changed variable | contrast | return | final legal | final illegal | graph |
| --- | --- | --- | --- | --- | --- | --- | --- |
| l_upper_hook_pull_tooth_blocked | upper_hook_tooth_blocked | L形上钩远端目标格为墙 | l_upper_hook_pull_notch_open | not applicable: replay stopped at illegal action; return search skipped | down | up:pull_world_front_blocked, left:pull_world_front_blocked, right:force_blocked | complete / 5 states |
| l_upper_hook_pull_notch_open | upper_hook_notch_open | L形上钩远端目标格打开 | l_upper_hook_pull_tooth_blocked | no complete | down, right | up:pull_world_front_blocked, left:pull_world_front_blocked | complete / 8 states |

### sticky_pull_axis_vs_side
| case | variant | changed variable | contrast | return | final legal | final illegal | graph |
| --- | --- | --- | --- | --- | --- | --- | --- |
| hbar3_axis_pull_clear | horizontal_bar3_axis_clear | 3格横条沿轴被pull；无额外侧向目标格 | bar3_side_pull_mid_wall_blocked, hbar3_axis_pull_front_wall_blocked | no complete | up, down, right | left:pull_world_front_blocked | complete / 126 states |
| hbar3_axis_pull_front_wall_blocked | horizontal_bar3_front_wall | 玩家前格为墙 | hbar3_axis_pull_clear | not applicable: replay stopped at illegal action; return search skipped | up, down | left:pull_world_front_blocked, right:destination_blocked | complete / 77 states |

### sticky_pull_handle_occupancy
| case | variant | changed variable | contrast | return | final legal | final illegal | graph |
| --- | --- | --- | --- | --- | --- | --- | --- |
| bar2_post_pull_handle_open_control | handle_open_control | 反向把手通路开放 | bar2_post_pull_handle_crate_blocker, bar2_post_pull_handle_sticky_blocker | yes depth=9 | up, down, right | left:pull_world_front_blocked | complete / 108 states |
| bar2_post_pull_handle_crate_blocker | handle_crate_blocker | 反向把手通路被box-side crate占用 | bar2_post_pull_handle_open_control, bar2_post_pull_handle_sticky_blocker | yes depth=15 | up, down, right | left:pull_world_front_blocked | complete / 234 states |
| bar2_post_pull_handle_sticky_blocker | handle_sticky_blocker | 反向把手通路被单格sticky占用 | bar2_post_pull_handle_open_control, bar2_post_pull_handle_crate_blocker | no complete | up, down, right | left:pull_world_front_blocked | complete / 54 states |

## bar3_side_pull_mid_wall_blocked: 3格竖条侧拉时中段目标墙拒绝

结构族: sticky_pull_shape_spectrum
变体: vertical_bar3_mid_wall
变化变量: 3格竖条中段目标格为墙
对照: bar3_side_pull_open_mouth

问题: 3格竖条向右 pull 时，非接触中段目标墙是否让整步 force_blocked？
备注: active_rule=sticky rigid footprint under pull_force; consumer=middle target wall.
动作序列: right
反事实禁用: 无
预算: exploreDepth=14, returnDepth=24, maxStates=30000, maxTransitions=120000

layout:
```text
###########
#PL#.....G#
#BS#......#
#..#.M@...#
#..#.M#...#
#..#.M....#
#..#......#
###########
```

初始状态:
```text
###########
#PL#.....G#
#BS#......#
#..#.M@...#
#..#.M#...#
#..#.M....#
#..#......#
###########
```

动作回放:
- 1. right: illegal (force_blocked); events=-; eventWin=no
```text
###########
#PL#.....G#
#BS#......#
#..#.M@...#
#..#.M#...#
#..#.M....#
#..#......#
###########
```
- 后续动作未继续回放，因为动作序列中出现 illegal step。

最终状态:
```text
###########
#PL#.....G#
#BS#......#
#..#.M@...#
#..#.M#...#
#..#.M....#
#..#......#
###########
```
变化格: 无

最终状态动作表:
| action | legal | events | next / reason |
| --- | --- | --- | --- |
| up | yes | walk | Ply:6,2\|C:\|M:5,3;5,4;5,5\|PL:P:1,1;L:2,1\|BS:B:1,2;S:2,2 |
| down | no | - | destination_blocked |
| left | no | - | pull_world_front_blocked |
| right | no | - | force_blocked |

回到初始: not applicable (replay stopped at illegal action; return search skipped)
局部可达图: status=complete, states=64, transitions=184, winStates=0, maxDepth=12
事件类型: move_sticky_rigid=2, pull_object:sticky#1=2, walk=182

## bar3_side_pull_open_mouth: 3格竖条侧拉时三格目标口打开

结构族: sticky_pull_shape_spectrum
变体: vertical_bar3_open
变化变量: 3格竖条三个目标格均开放
对照: bar3_side_pull_mid_wall_blocked

问题: 打开中段目标格后，3格竖条是否可整体 pull 通过？
备注: 同形正例；口宽从2个有效目标格扩到3个。
动作序列: right
反事实禁用: 无
预算: exploreDepth=14, returnDepth=24, maxStates=30000, maxTransitions=120000

layout:
```text
###########
#PL#.....G#
#BS#......#
#..#.M@...#
#..#.M....#
#..#.M....#
#..#......#
###########
```

初始状态:
```text
###########
#PL#.....G#
#BS#......#
#..#.M@...#
#..#.M....#
#..#.M....#
#..#......#
###########
```

动作回放:
- 1. right: legal; events=pull_object:sticky#1,move_sticky_rigid; eventWin=no
```text
###########
#PL#.....G#
#BS#......#
#..#..M@..#
#..#..M...#
#..#..M...#
#..#......#
###########
```

最终状态:
```text
###########
#PL#.....G#
#BS#......#
#..#..M@..#
#..#..M...#
#..#..M...#
#..#......#
###########
```
变化格: (5,3) M->.; (6,3) @->M; (7,3) .->@; (5,4) M->.; (6,4) .->M; (5,5) M->.; (6,5) .->M

最终状态动作表:
| action | legal | events | next / reason |
| --- | --- | --- | --- |
| up | yes | walk | Ply:7,2\|C:\|M:6,3;6,4;6,5\|PL:P:1,1;L:2,1\|BS:B:1,2;S:2,2 |
| down | yes | walk | Ply:7,4\|C:\|M:6,3;6,4;6,5\|PL:P:1,1;L:2,1\|BS:B:1,2;S:2,2 |
| left | no | - | pull_world_front_blocked |
| right | yes | pull_object:sticky#1,move_sticky_rigid | Ply:8,3\|C:\|M:7,3;7,4;7,5\|PL:P:1,1;L:2,1\|BS:B:1,2;S:2,2 |

回到初始: yes, depth=9, path=up left left down left up right right down
局部可达图: status=complete, states=263, transitions=792, winStates=0, maxDepth=14
事件类型: move_sticky_rigid=44, pull_object:sticky#1=44, walk=748

## square2_side_pull_lower_wall_blocked: 2x2 侧拉时右下目标墙拒绝

结构族: sticky_pull_shape_spectrum
变体: square2_lower_wall
变化变量: 2x2右下目标格为墙
对照: square2_side_pull_open_mouth

问题: 2x2 sticky 向右 pull 时，右下目标墙是否独立关闭动作？
备注: 玩家前格开放，失败应来自 footprint 的右下目标格。
动作序列: right
反事实禁用: 无
预算: exploreDepth=14, returnDepth=24, maxStates=30000, maxTransitions=120000

layout:
```text
###########
#PL#.....G#
#BS#......#
#..#.MM@..#
#..#.MM#..#
#..#......#
###########
```

初始状态:
```text
###########
#PL#.....G#
#BS#......#
#..#.MM@..#
#..#.MM#..#
#..#......#
###########
```

动作回放:
- 1. right: illegal (force_blocked); events=-; eventWin=no
```text
###########
#PL#.....G#
#BS#......#
#..#.MM@..#
#..#.MM#..#
#..#......#
###########
```
- 后续动作未继续回放，因为动作序列中出现 illegal step。

最终状态:
```text
###########
#PL#.....G#
#BS#......#
#..#.MM@..#
#..#.MM#..#
#..#......#
###########
```
变化格: 无

最终状态动作表:
| action | legal | events | next / reason |
| --- | --- | --- | --- |
| up | yes | walk | Ply:7,2\|C:\|M:5,3;6,3;5,4;6,4\|PL:P:1,1;L:2,1\|BS:B:1,2;S:2,2 |
| down | no | - | destination_blocked |
| left | no | - | pull_world_front_blocked |
| right | no | - | force_blocked |

回到初始: not applicable (replay stopped at illegal action; return search skipped)
局部可达图: status=complete, states=96, transitions=239, winStates=0, maxDepth=14
事件类型: move_sticky_rigid=12, pull_object:sticky#1=12, walk=227

## square2_side_pull_open_mouth: 2x2 侧拉时右侧目标口打开

结构族: sticky_pull_shape_spectrum
变体: square2_open
变化变量: 2x2右侧两个目标格均开放
对照: square2_side_pull_lower_wall_blocked

问题: 打开右下目标格后，2x2 是否可整体 pull 通过？
备注: 2x2 pull 侧 footprint 目标口正例。
动作序列: right
反事实禁用: 无
预算: exploreDepth=14, returnDepth=24, maxStates=30000, maxTransitions=120000

layout:
```text
###########
#PL#.....G#
#BS#......#
#..#.MM@..#
#..#.MM...#
#..#......#
###########
```

初始状态:
```text
###########
#PL#.....G#
#BS#......#
#..#.MM@..#
#..#.MM...#
#..#......#
###########
```

动作回放:
- 1. right: legal; events=pull_object:sticky#1,move_sticky_rigid; eventWin=no
```text
###########
#PL#.....G#
#BS#......#
#..#..MM@.#
#..#..MM..#
#..#......#
###########
```

最终状态:
```text
###########
#PL#.....G#
#BS#......#
#..#..MM@.#
#..#..MM..#
#..#......#
###########
```
变化格: (5,3) M->.; (7,3) @->M; (8,3) .->@; (5,4) M->.; (7,4) .->M

最终状态动作表:
| action | legal | events | next / reason |
| --- | --- | --- | --- |
| up | yes | walk | Ply:8,2\|C:\|M:6,3;7,3;6,4;7,4\|PL:P:1,1;L:2,1\|BS:B:1,2;S:2,2 |
| down | yes | walk | Ply:8,4\|C:\|M:6,3;7,3;6,4;7,4\|PL:P:1,1;L:2,1\|BS:B:1,2;S:2,2 |
| left | no | - | pull_world_front_blocked |
| right | yes | pull_object:sticky#1,move_sticky_rigid | Ply:9,3\|C:\|M:7,3;8,3;7,4;8,4\|PL:P:1,1;L:2,1\|BS:B:1,2;S:2,2 |

回到初始: yes, depth=11, path=up left left left down left up right right right down
局部可达图: status=complete, states=156, transitions=444, winStates=0, maxDepth=13
事件类型: move_sticky_rigid=28, pull_object:sticky#1=28, walk=416

## l_upper_hook_pull_tooth_blocked: 上钩 L 形侧拉时远端目标墙拒绝

结构族: sticky_pull_l_rotation_spectrum
变体: upper_hook_tooth_blocked
变化变量: L形上钩远端目标格为墙
对照: l_upper_hook_pull_notch_open

问题: 换一个 L 形方向后，远端脚目标格是否仍是独立旋钮？
备注: 与既有下凸 L 形互为旋转补充。
动作序列: right
反事实禁用: 无
预算: exploreDepth=14, returnDepth=24, maxStates=30000, maxTransitions=120000

layout:
```text
###########
#PL#.....G#
#BS#......#
#..#.MM#..#
#..#.M@...#
#..#......#
###########
```

初始状态:
```text
###########
#PL#.....G#
#BS#......#
#..#.MM#..#
#..#.M@...#
#..#......#
###########
```

动作回放:
- 1. right: illegal (force_blocked); events=-; eventWin=no
```text
###########
#PL#.....G#
#BS#......#
#..#.MM#..#
#..#.M@...#
#..#......#
###########
```
- 后续动作未继续回放，因为动作序列中出现 illegal step。

最终状态:
```text
###########
#PL#.....G#
#BS#......#
#..#.MM#..#
#..#.M@...#
#..#......#
###########
```
变化格: 无

最终状态动作表:
| action | legal | events | next / reason |
| --- | --- | --- | --- |
| up | no | - | pull_world_front_blocked |
| down | yes | pull_object:sticky#1,move_sticky_rigid | Ply:6,5\|C:\|M:5,4;6,4;5,5\|PL:P:1,1;L:2,1\|BS:B:1,2;S:2,2 |
| left | no | - | pull_world_front_blocked |
| right | no | - | force_blocked |

回到初始: not applicable (replay stopped at illegal action; return search skipped)
局部可达图: status=complete, states=5, transitions=4, winStates=0, maxDepth=4
事件类型: move_sticky_rigid=4, pull_object:sticky#1=4

## l_upper_hook_pull_notch_open: 上钩 L 形侧拉时凸齿打开

结构族: sticky_pull_l_rotation_spectrum
变体: upper_hook_notch_open
变化变量: L形上钩远端目标格打开
对照: l_upper_hook_pull_tooth_blocked

问题: 只打开远端目标格后，上钩 L 形是否可整体 pull？
备注: L 形方向补充正例。
动作序列: right
反事实禁用: 无
预算: exploreDepth=14, returnDepth=24, maxStates=30000, maxTransitions=120000

layout:
```text
###########
#PL#.....G#
#BS#......#
#..#.MM...#
#..#.M@...#
#..#......#
###########
```

初始状态:
```text
###########
#PL#.....G#
#BS#......#
#..#.MM...#
#..#.M@...#
#..#......#
###########
```

动作回放:
- 1. right: legal; events=pull_object:sticky#1,move_sticky_rigid; eventWin=no
```text
###########
#PL#.....G#
#BS#......#
#..#..MM..#
#..#..M@..#
#..#......#
###########
```

最终状态:
```text
###########
#PL#.....G#
#BS#......#
#..#..MM..#
#..#..M@..#
#..#......#
###########
```
变化格: (5,3) M->.; (7,3) .->M; (5,4) M->.; (6,4) @->M; (7,4) .->@

最终状态动作表:
| action | legal | events | next / reason |
| --- | --- | --- | --- |
| up | no | - | pull_world_front_blocked |
| down | yes | pull_object:sticky#1,move_sticky_rigid | Ply:7,5\|C:\|M:6,4;7,4;6,5\|PL:P:1,1;L:2,1\|BS:B:1,2;S:2,2 |
| left | no | - | pull_world_front_blocked |
| right | yes | pull_object:sticky#1,move_sticky_rigid | Ply:8,4\|C:\|M:7,3;8,3;7,4\|PL:P:1,1;L:2,1\|BS:B:1,2;S:2,2 |

回到初始: no (complete: search complete)
局部可达图: status=complete, states=8, transitions=10, winStates=0, maxDepth=4
事件类型: move_sticky_rigid=10, pull_object:sticky#1=10

## hbar3_axis_pull_clear: 3格横条沿轴抽取时可整体平移

结构族: sticky_pull_axis_vs_side
变体: horizontal_bar3_axis_clear
变化变量: 3格横条沿轴被pull；无额外侧向目标格
对照: bar3_side_pull_mid_wall_blocked, hbar3_axis_pull_front_wall_blocked

问题: 沿轴拉3格横条时，是否只需要玩家前格与前端目标格开放？
备注: 对照侧拉：沿轴没有额外侧向目标格谱。
动作序列: right
反事实禁用: 无
预算: exploreDepth=14, returnDepth=24, maxStates=30000, maxTransitions=120000

layout:
```text
###########
#PL#.....G#
#BS#......#
#..#MMM@..#
#..#......#
###########
```

初始状态:
```text
###########
#PL#.....G#
#BS#......#
#..#MMM@..#
#..#......#
###########
```

动作回放:
- 1. right: legal; events=pull_object:sticky#1,move_sticky_rigid; eventWin=no
```text
###########
#PL#.....G#
#BS#......#
#..#.MMM@.#
#..#......#
###########
```

最终状态:
```text
###########
#PL#.....G#
#BS#......#
#..#.MMM@.#
#..#......#
###########
```
变化格: (4,3) M->.; (7,3) @->M; (8,3) .->@

最终状态动作表:
| action | legal | events | next / reason |
| --- | --- | --- | --- |
| up | yes | walk | Ply:8,2\|C:\|M:5,3;6,3;7,3\|PL:P:1,1;L:2,1\|BS:B:1,2;S:2,2 |
| down | yes | walk | Ply:8,4\|C:\|M:5,3;6,3;7,3\|PL:P:1,1;L:2,1\|BS:B:1,2;S:2,2 |
| left | no | - | pull_world_front_blocked |
| right | yes | pull_object:sticky#1,move_sticky_rigid | Ply:9,3\|C:\|M:6,3;7,3;8,3\|PL:P:1,1;L:2,1\|BS:B:1,2;S:2,2 |

回到初始: no (complete: search complete)
局部可达图: status=complete, states=126, transitions=340, winStates=0, maxDepth=12
事件类型: move_sticky_rigid=24, pull_object:sticky#1=24, walk=316

## hbar3_axis_pull_front_wall_blocked: 3格横条沿轴抽取时被玩家前格墙拒绝

结构族: sticky_pull_axis_vs_side
变体: horizontal_bar3_front_wall
变化变量: 玩家前格为墙
对照: hbar3_axis_pull_clear

问题: 沿轴拉时，如果玩家前格是墙，是否先 destination_blocked？
备注: 这是沿轴版本的前格门反例，不是 footprint 目标墙。
动作序列: right
反事实禁用: 无
预算: exploreDepth=14, returnDepth=24, maxStates=30000, maxTransitions=120000

layout:
```text
###########
#PL#.....G#
#BS#......#
#..#MMM@#.#
#..#......#
###########
```

初始状态:
```text
###########
#PL#.....G#
#BS#......#
#..#MMM@#.#
#..#......#
###########
```

动作回放:
- 1. right: illegal (destination_blocked); events=-; eventWin=no
```text
###########
#PL#.....G#
#BS#......#
#..#MMM@#.#
#..#......#
###########
```
- 后续动作未继续回放，因为动作序列中出现 illegal step。

最终状态:
```text
###########
#PL#.....G#
#BS#......#
#..#MMM@#.#
#..#......#
###########
```
变化格: 无

最终状态动作表:
| action | legal | events | next / reason |
| --- | --- | --- | --- |
| up | yes | walk | Ply:7,2\|C:\|M:4,3;5,3;6,3\|PL:P:1,1;L:2,1\|BS:B:1,2;S:2,2 |
| down | yes | walk | Ply:7,4\|C:\|M:4,3;5,3;6,3\|PL:P:1,1;L:2,1\|BS:B:1,2;S:2,2 |
| left | no | - | pull_world_front_blocked |
| right | no | - | destination_blocked |

回到初始: not applicable (replay stopped at illegal action; return search skipped)
局部可达图: status=complete, states=77, transitions=168, winStates=0, maxDepth=14
事件类型: move_sticky_rigid=9, pull_object:sticky#1=9, walk=159

## bar2_post_pull_handle_open_control: 2格竖条拉过口后把手通路开放

结构族: sticky_pull_handle_occupancy
变体: handle_open_control
变化变量: 反向把手通路开放
对照: bar2_post_pull_handle_crate_blocker, bar2_post_pull_handle_sticky_blocker

问题: 开放上侧通路时，是否能绕回反向把手？
备注: post-mouth handle occupancy control.
动作序列: right
反事实禁用: 无
预算: exploreDepth=14, returnDepth=24, maxStates=30000, maxTransitions=120000

layout:
```text
##########
#PL#....G#
#BS#.....#
#..#.M@..#
#..#.M...#
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

## bar2_post_pull_handle_crate_blocker: 2格竖条拉过口后把手通路被 crate 占用

结构族: sticky_pull_handle_occupancy
变体: handle_crate_blocker
变化变量: 反向把手通路被box-side crate占用
对照: bar2_post_pull_handle_open_control, bar2_post_pull_handle_sticky_blocker

问题: 把上侧通路墙替换成 crate，会保持封门、可推走，还是形成新资源？
备注: 测试把手格被普通箱占用后的资源移交；B/S 竖向放置以保证 C 位于 box side，不被归一成 sticky。
动作序列: right
反事实禁用: 无
预算: exploreDepth=14, returnDepth=24, maxStates=30000, maxTransitions=120000

layout:
```text
##########
#PL#....G#
#B.#..C..#
#S.#.M@..#
#..#.M...#
##########
```

初始状态:
```text
##########
#PL#....G#
#B.#..C..#
#S.#.M@..#
#..#.M...#
##########
```

动作回放:
- 1. right: legal; events=pull_object:sticky#1,move_sticky_rigid; eventWin=no
```text
##########
#PL#....G#
#B.#..C..#
#S.#..M@.#
#..#..M..#
##########
```

最终状态:
```text
##########
#PL#....G#
#B.#..C..#
#S.#..M@.#
#..#..M..#
##########
```
变化格: (5,3) M->.; (6,3) @->M; (7,3) .->@; (5,4) M->.; (6,4) .->M

最终状态动作表:
| action | legal | events | next / reason |
| --- | --- | --- | --- |
| up | yes | walk | Ply:7,2\|C:6,2\|M:6,3;6,4\|PL:P:1,1;L:2,1\|BS:B:1,2;S:1,3 |
| down | yes | walk | Ply:7,4\|C:6,2\|M:6,3;6,4\|PL:P:1,1;L:2,1\|BS:B:1,2;S:1,3 |
| left | no | - | pull_world_front_blocked |
| right | yes | pull_object:sticky#1,move_sticky_rigid | Ply:8,3\|C:6,2\|M:7,3;7,4\|PL:P:1,1;L:2,1\|BS:B:1,2;S:1,3 |

回到初始: yes, depth=15, path=up up left left down down left up up right right right down down left
局部可达图: status=complete, states=234, transitions=466, winStates=0, maxDepth=14
事件类型: box_to_sticky:n1=9, move_sticky_rigid=34, pull_object:crate#1=20, pull_object:crate#2=1, pull_object:sticky#1=33, pull_object:sticky#2=1, sticky_merge:n1=8, sticky_to_box:n1=5, walk=411

## bar2_post_pull_handle_sticky_blocker: 2格竖条拉过口后把手通路被 sticky 占用

结构族: sticky_pull_handle_occupancy
变体: handle_sticky_blocker
变化变量: 反向把手通路被单格sticky占用
对照: bar2_post_pull_handle_open_control, bar2_post_pull_handle_crate_blocker

问题: 把上侧通路放成 sticky blocker 后，是封门、合并，还是可搬资源？
备注: 测试把手格被 sticky 尾债占用后的资源移交。
动作序列: right
反事实禁用: 无
预算: exploreDepth=14, returnDepth=24, maxStates=30000, maxTransitions=120000

layout:
```text
##########
#PL#....G#
#BS#..M..#
#..#.M@..#
#..#.M...#
##########
```

初始状态:
```text
##########
#PL#....G#
#BS#..M..#
#..#.M@..#
#..#.M...#
##########
```

动作回放:
- 1. right: legal; events=pull_object:sticky#1,move_sticky_rigid,sticky_merge:n1; eventWin=no
```text
##########
#PL#....G#
#BS#..M..#
#..#..M@.#
#..#..M..#
##########
```

最终状态:
```text
##########
#PL#....G#
#BS#..M..#
#..#..M@.#
#..#..M..#
##########
```
变化格: (5,3) M->.; (6,3) @->M; (7,3) .->@; (5,4) M->.; (6,4) .->M

最终状态动作表:
| action | legal | events | next / reason |
| --- | --- | --- | --- |
| up | yes | walk | Ply:7,2\|C:\|M:6,2;6,3;6,4\|PL:P:1,1;L:2,1\|BS:B:1,2;S:2,2 |
| down | yes | walk | Ply:7,4\|C:\|M:6,2;6,3;6,4\|PL:P:1,1;L:2,1\|BS:B:1,2;S:2,2 |
| left | no | - | pull_world_front_blocked |
| right | yes | pull_object:sticky#1,move_sticky_rigid | Ply:8,3\|C:\|M:7,2;7,3;7,4\|PL:P:1,1;L:2,1\|BS:B:1,2;S:2,2 |

回到初始: no (complete: search complete)
局部可达图: status=complete, states=54, transitions=128, winStates=0, maxDepth=14
事件类型: move_sticky_rigid=16, pull_object:sticky#1=15, pull_object:sticky#2=1, sticky_merge:n1=2, walk=112

