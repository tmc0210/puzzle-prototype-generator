# 机制局部实验: ra_probe_pl_wall_anchor_03

- 原型: reality_anchor
- 生成时间: 2026-07-06T08:50:37.816Z
- 标题: P/L 推拉锚点与墙结构局部实验
- 备注: Exploration brief: prototype=reality_anchor; scope=P/L push-pull anchor plus wall geometry only; exclusions=不读取黏块形状谱系、不使用 B/S 或 sticky；source_boundary=runtime、 mechanic 定义、mechanism-lab 本轮产物；run_intent=explore_then_curate.


## 结构族摘要

### pl_long_axis_wall_ratchet
| case | variant | changed variable | contrast | return | final legal | final illegal | graph |
| --- | --- | --- | --- | --- | --- | --- | --- |
| long_axis_no_front_cell | no_front_cell | L 端前方没有空格 | long_axis_one_front_cell | not applicable: replay stopped at illegal action; return search skipped | - | up:destination_blocked, down:destination_blocked, left:destination_blocked, right:force_blocked | complete / 1 states |
| long_axis_one_front_cell | one_front_cell | L 端前方从 0 格改为 1 格 | long_axis_no_front_cell, long_axis_two_front_cells | no complete | left | up:destination_blocked, down:destination_blocked, right:force_blocked | complete / 3 states |
| long_axis_two_front_cells | two_front_cells | L 端前方从 1 格改为 2 格 | long_axis_one_front_cell, long_axis_side_bypass_still_one_way | no complete | left, right | up:destination_blocked, down:destination_blocked | complete / 6 states |
| long_axis_side_bypass_still_one_way | side_bypass | 在同样两格前方余量下加入可绕行侧廊 | long_axis_two_front_cells | no complete | down, left, right | up:destination_blocked | complete / 33 states |

### pl_perpendicular_handle_wall_gates
| case | variant | changed variable | contrast | return | final legal | final illegal | graph |
| --- | --- | --- | --- | --- | --- | --- | --- |
| p_side_push_down_open_loop | p_side_push_open_return | P 侧接触格、P/L 下方目标格与回返绕行格均开放 | p_side_push_down_other_half_wall, p_side_push_down_l_front_wall_after_shift | yes depth=3 | up, down, left, right | - | complete / 345 states |
| p_side_push_down_other_half_wall | p_side_push_l_target_blocked | 只堵住 L 半格的下落目标格 | p_side_push_down_open_loop | not applicable: replay stopped at illegal action; return search skipped | up, left, right | down:force_blocked | complete / 242 states |
| p_side_push_down_l_front_wall_after_shift | p_side_push_l_front_wall | 推动合法，但推动后 L 侧上方前格被墙堵住 | p_side_push_down_open_loop | no complete | up, left, right | down:force_blocked | complete / 136 states |
| l_side_pull_up_open_loop | l_side_pull_open_return | L 侧玩家前格与 P/L 上移目标格均开放 | l_side_pull_up_front_wall, l_side_pull_up_p_target_wall | yes depth=3 | left, right | up:destination_blocked, down:pull_world_front_blocked | complete / 345 states |
| l_side_pull_up_front_wall | l_side_pull_front_wall | 只堵住玩家 pull 前进格 | l_side_pull_up_open_loop | not applicable: replay stopped at illegal action; return search skipped | left, right | up:destination_blocked, down:pull_world_front_blocked | complete / 286 states |
| l_side_pull_up_p_target_wall | l_side_pull_p_target_wall | 玩家前格开放，但 P 半格上移目标格被墙堵住 | l_side_pull_up_open_loop | not applicable: replay stopped at illegal action; return search skipped | right | up:force_blocked, down:pull_world_front_blocked, left:destination_blocked | complete / 286 states |

## long_axis_no_front_cell

结构族: pl_long_axis_wall_ratchet
变体: no_front_cell
变化变量: L 端前方没有空格
对照: long_axis_one_front_cell

问题: 沿 P->L 长轴推动时，L 端前方空格数量是否直接决定棘轮容量
动作序列: right
反事实禁用: 无
预算: exploreDepth=24, returnDepth=48, maxStates=50000, maxTransitions=200000

layout:
```text
#######
#G#@PL#
#######
```

初始状态:
```text
#######
#G#@PL#
#######
```

动作回放:
- 1. right: illegal (force_blocked); events=-; eventWin=no
```text
#######
#G#@PL#
#######
```
- 后续动作未继续回放，因为动作序列中出现 illegal step。

最终状态:
```text
#######
#G#@PL#
#######
```
变化格: 无

最终状态动作表:
| action | legal | events | next / reason |
| --- | --- | --- | --- |
| up | no | - | destination_blocked |
| down | no | - | destination_blocked |
| left | no | - | destination_blocked |
| right | no | - | force_blocked |

回到初始: not applicable (replay stopped at illegal action; return search skipped)
局部可达图: status=complete, states=1, transitions=0, winStates=0, maxDepth=0
事件类型: 无

## long_axis_one_front_cell

结构族: pl_long_axis_wall_ratchet
变体: one_front_cell
变化变量: L 端前方从 0 格改为 1 格
对照: long_axis_no_front_cell, long_axis_two_front_cells

问题: 一格余量是否允许一次长轴位移但在墙前停止
动作序列: right
反事实禁用: 无
预算: exploreDepth=24, returnDepth=48, maxStates=50000, maxTransitions=200000

layout:
```text
########
#G#@PL.#
########
```

初始状态:
```text
########
#G#@PL.#
########
```

动作回放:
- 1. right: legal; events=push_object:push_pull_anchor,anchor_boundary_shift:push_pull; eventWin=no
```text
########
#G#.@PL#
########
```

最终状态:
```text
########
#G#.@PL#
########
```
变化格: (3,1) @->.; (4,1) P->@; (5,1) L->P; (6,1) .->L

最终状态动作表:
| action | legal | events | next / reason |
| --- | --- | --- | --- |
| up | no | - | destination_blocked |
| down | no | - | destination_blocked |
| left | yes | walk | Ply:3,1\|C:\|M:\|PL:P:5,1;L:6,1\|BS:none |
| right | no | - | force_blocked |

回到初始: no (complete: search complete)
局部可达图: status=complete, states=3, transitions=3, winStates=0, maxDepth=2
事件类型: anchor_boundary_shift:push_pull=1, push_object:push_pull_anchor=1, walk=2

## long_axis_two_front_cells

结构族: pl_long_axis_wall_ratchet
变体: two_front_cells
变化变量: L 端前方从 1 格改为 2 格
对照: long_axis_one_front_cell, long_axis_side_bypass_still_one_way

问题: 第二个前方空格是否保留下一次继续沿长轴推进的动作
动作序列: right
反事实禁用: 无
预算: exploreDepth=24, returnDepth=48, maxStates=50000, maxTransitions=200000

layout:
```text
#########
#G#@PL..#
#########
```

初始状态:
```text
#########
#G#@PL..#
#########
```

动作回放:
- 1. right: legal; events=push_object:push_pull_anchor,anchor_boundary_shift:push_pull; eventWin=no
```text
#########
#G#.@PL.#
#########
```

最终状态:
```text
#########
#G#.@PL.#
#########
```
变化格: (3,1) @->.; (4,1) P->@; (5,1) L->P; (6,1) .->L

最终状态动作表:
| action | legal | events | next / reason |
| --- | --- | --- | --- |
| up | no | - | destination_blocked |
| down | no | - | destination_blocked |
| left | yes | walk | Ply:3,1\|C:\|M:\|PL:P:5,1;L:6,1\|BS:none |
| right | yes | push_object:push_pull_anchor,anchor_boundary_shift:push_pull | Ply:5,1\|C:\|M:\|PL:P:6,1;L:7,1\|BS:none |

回到初始: no (complete: search complete)
局部可达图: status=complete, states=6, transitions=8, winStates=0, maxDepth=4
事件类型: anchor_boundary_shift:push_pull=2, push_object:push_pull_anchor=2, walk=6

## long_axis_side_bypass_still_one_way

结构族: pl_long_axis_wall_ratchet
变体: side_bypass
变化变量: 在同样两格前方余量下加入可绕行侧廊
对照: long_axis_two_front_cells

问题: 玩家能绕到 L 侧是否足以恢复反向长轴位移
动作序列: right
反事实禁用: 无
预算: exploreDepth=24, returnDepth=48, maxStates=50000, maxTransitions=200000

layout:
```text
#########
#G#@PL..#
#.......#
#########
```

初始状态:
```text
#########
#G#@PL..#
#.......#
#########
```

动作回放:
- 1. right: legal; events=push_object:push_pull_anchor,anchor_boundary_shift:push_pull; eventWin=no
```text
#########
#G#.@PL.#
#.......#
#########
```

最终状态:
```text
#########
#G#.@PL.#
#.......#
#########
```
变化格: (3,1) @->.; (4,1) P->@; (5,1) L->P; (6,1) .->L

最终状态动作表:
| action | legal | events | next / reason |
| --- | --- | --- | --- |
| up | no | - | destination_blocked |
| down | yes | walk | Ply:4,2\|C:\|M:\|PL:P:5,1;L:6,1\|BS:none |
| left | yes | walk | Ply:3,1\|C:\|M:\|PL:P:5,1;L:6,1\|BS:none |
| right | yes | push_object:push_pull_anchor,anchor_boundary_shift:push_pull | Ply:5,1\|C:\|M:\|PL:P:6,1;L:7,1\|BS:none |

回到初始: no (complete: search complete)
局部可达图: status=complete, states=33, transitions=70, winStates=0, maxDepth=8
事件类型: anchor_boundary_shift:push_pull=3, pull_object:push_pull_anchor=1, push_object:push_pull_anchor=2, walk=67

## p_side_push_down_open_loop

结构族: pl_perpendicular_handle_wall_gates
变体: p_side_push_open_return
变化变量: P 侧接触格、P/L 下方目标格与回返绕行格均开放
对照: p_side_push_down_other_half_wall, p_side_push_down_l_front_wall_after_shift

问题: P 侧把手是否能把横向 P/L 垂直推入下方开放房间并回返
动作序列: down
反事实禁用: 无
预算: exploreDepth=24, returnDepth=48, maxStates=50000, maxTransitions=200000

layout:
```text
#######
#.....#
#.@...#
#.PLG.#
#.....#
#.....#
#######
```

初始状态:
```text
#######
#.....#
#.@...#
#.PLG.#
#.....#
#.....#
#######
```

动作回放:
- 1. down: legal; events=push_object:push_pull_anchor,anchor_boundary_shift:push_pull; eventWin=no
```text
#######
#.....#
#.....#
#.@.G.#
#.PL..#
#.....#
#######
```

最终状态:
```text
#######
#.....#
#.....#
#.@.G.#
#.PL..#
#.....#
#######
```
变化格: (2,2) @->.; (2,3) P->@; (3,3) L->.; (2,4) .->P; (3,4) .->L

最终状态动作表:
| action | legal | events | next / reason |
| --- | --- | --- | --- |
| up | yes | walk | Ply:2,2\|C:\|M:\|PL:P:2,4;L:3,4\|BS:none |
| down | yes | push_object:push_pull_anchor,anchor_boundary_shift:push_pull | Ply:2,4\|C:\|M:\|PL:P:2,5;L:3,5\|BS:none |
| left | yes | walk | Ply:1,3\|C:\|M:\|PL:P:2,4;L:3,4\|BS:none |
| right | yes | walk | Ply:3,3\|C:\|M:\|PL:P:2,4;L:3,4\|BS:none |

回到初始: yes, depth=3, path=right up left
局部可达图: status=complete, states=345, transitions=1052, winStates=46, maxDepth=14
事件类型: anchor_boundary_shift:push_pull=51, pull_object:push_pull_anchor=23, push_object:push_pull_anchor=28, walk=1001

## p_side_push_down_other_half_wall

结构族: pl_perpendicular_handle_wall_gates
变体: p_side_push_l_target_blocked
变化变量: 只堵住 L 半格的下落目标格
对照: p_side_push_down_open_loop

问题: P 侧推入时，非接触的 L 半格被墙挡住是否会阻断整条 P/L 锚
动作序列: down
反事实禁用: 无
预算: exploreDepth=24, returnDepth=48, maxStates=50000, maxTransitions=200000

layout:
```text
#######
#.....#
#.@...#
#.PLG.#
#..#..#
#.....#
#######
```

初始状态:
```text
#######
#.....#
#.@...#
#.PLG.#
#..#..#
#.....#
#######
```

动作回放:
- 1. down: illegal (force_blocked); events=-; eventWin=no
```text
#######
#.....#
#.@...#
#.PLG.#
#..#..#
#.....#
#######
```
- 后续动作未继续回放，因为动作序列中出现 illegal step。

最终状态:
```text
#######
#.....#
#.@...#
#.PLG.#
#..#..#
#.....#
#######
```
变化格: 无

最终状态动作表:
| action | legal | events | next / reason |
| --- | --- | --- | --- |
| up | yes | walk | Ply:2,1\|C:\|M:\|PL:P:2,3;L:3,3\|BS:none |
| down | no | - | force_blocked |
| left | yes | walk | Ply:1,2\|C:\|M:\|PL:P:2,3;L:3,3\|BS:none |
| right | yes | walk | Ply:3,2\|C:\|M:\|PL:P:2,3;L:3,3\|BS:none |

回到初始: not applicable (replay stopped at illegal action; return search skipped)
局部可达图: status=complete, states=242, transitions=686, winStates=44, maxDepth=16
事件类型: anchor_boundary_shift:push_pull=31, pull_object:push_pull_anchor=14, push_object:push_pull_anchor=17, walk=655

## p_side_push_down_l_front_wall_after_shift

结构族: pl_perpendicular_handle_wall_gates
变体: p_side_push_l_front_wall
变化变量: 推动合法，但推动后 L 侧上方前格被墙堵住
对照: p_side_push_down_open_loop

问题: 推动后的 L 侧前格墙是否切断用 pull 把锚拉回上方的回返路径
动作序列: down
反事实禁用: 无
预算: exploreDepth=24, returnDepth=48, maxStates=50000, maxTransitions=200000

layout:
```text
#######
#.....#
#.@#..#
#.PLG.#
#.....#
#######
```

初始状态:
```text
#######
#.....#
#.@#..#
#.PLG.#
#.....#
#######
```

动作回放:
- 1. down: legal; events=push_object:push_pull_anchor,anchor_boundary_shift:push_pull; eventWin=no
```text
#######
#.....#
#..#..#
#.@.G.#
#.PL..#
#######
```

最终状态:
```text
#######
#.....#
#..#..#
#.@.G.#
#.PL..#
#######
```
变化格: (2,2) @->.; (2,3) P->@; (3,3) L->.; (2,4) .->P; (3,4) .->L

最终状态动作表:
| action | legal | events | next / reason |
| --- | --- | --- | --- |
| up | yes | walk | Ply:2,2\|C:\|M:\|PL:P:2,4;L:3,4\|BS:none |
| down | no | - | force_blocked |
| left | yes | walk | Ply:1,3\|C:\|M:\|PL:P:2,4;L:3,4\|BS:none |
| right | yes | walk | Ply:3,3\|C:\|M:\|PL:P:2,4;L:3,4\|BS:none |

回到初始: no (complete: search complete)
局部可达图: status=complete, states=136, transitions=358, winStates=34, maxDepth=14
事件类型: anchor_boundary_shift:push_pull=16, pull_object:push_pull_anchor=7, push_object:push_pull_anchor=9, walk=342

## l_side_pull_up_open_loop

结构族: pl_perpendicular_handle_wall_gates
变体: l_side_pull_open_return
变化变量: L 侧玩家前格与 P/L 上移目标格均开放
对照: l_side_pull_up_front_wall, l_side_pull_up_p_target_wall

问题: L 侧把手是否能通过拉动把横向 P/L 上移并回返
动作序列: up
反事实禁用: 无
预算: exploreDepth=24, returnDepth=48, maxStates=50000, maxTransitions=200000

layout:
```text
#######
#.....#
#..@..#
#.PLG.#
#.....#
#.....#
#######
```

初始状态:
```text
#######
#.....#
#..@..#
#.PLG.#
#.....#
#.....#
#######
```

动作回放:
- 1. up: legal; events=pull_object:push_pull_anchor,anchor_boundary_shift:push_pull; eventWin=no
```text
#######
#..@..#
#.PL..#
#...G.#
#.....#
#.....#
#######
```

最终状态:
```text
#######
#..@..#
#.PL..#
#...G.#
#.....#
#.....#
#######
```
变化格: (3,1) .->@; (2,2) .->P; (3,2) @->L; (2,3) P->.; (3,3) L->.

最终状态动作表:
| action | legal | events | next / reason |
| --- | --- | --- | --- |
| up | no | - | destination_blocked |
| down | no | - | pull_world_front_blocked |
| left | yes | walk | Ply:2,1\|C:\|M:\|PL:P:2,2;L:3,2\|BS:none |
| right | yes | walk | Ply:4,1\|C:\|M:\|PL:P:2,2;L:3,2\|BS:none |

回到初始: yes, depth=3, path=left down right
局部可达图: status=complete, states=345, transitions=1052, winStates=46, maxDepth=15
事件类型: anchor_boundary_shift:push_pull=51, pull_object:push_pull_anchor=23, push_object:push_pull_anchor=28, walk=1001

## l_side_pull_up_front_wall

结构族: pl_perpendicular_handle_wall_gates
变体: l_side_pull_front_wall
变化变量: 只堵住玩家 pull 前进格
对照: l_side_pull_up_open_loop

问题: L 侧拉动时，玩家前进格被墙挡住是否比锚本体空间更早阻断动作
动作序列: up
反事实禁用: 无
预算: exploreDepth=24, returnDepth=48, maxStates=50000, maxTransitions=200000

layout:
```text
#######
#..#..#
#..@..#
#.PLG.#
#.....#
#.....#
#######
```

初始状态:
```text
#######
#..#..#
#..@..#
#.PLG.#
#.....#
#.....#
#######
```

动作回放:
- 1. up: illegal (destination_blocked); events=-; eventWin=no
```text
#######
#..#..#
#..@..#
#.PLG.#
#.....#
#.....#
#######
```
- 后续动作未继续回放，因为动作序列中出现 illegal step。

最终状态:
```text
#######
#..#..#
#..@..#
#.PLG.#
#.....#
#.....#
#######
```
变化格: 无

最终状态动作表:
| action | legal | events | next / reason |
| --- | --- | --- | --- |
| up | no | - | destination_blocked |
| down | no | - | pull_world_front_blocked |
| left | yes | walk | Ply:2,2\|C:\|M:\|PL:P:2,3;L:3,3\|BS:none |
| right | yes | walk | Ply:4,2\|C:\|M:\|PL:P:2,3;L:3,3\|BS:none |

回到初始: not applicable (replay stopped at illegal action; return search skipped)
局部可达图: status=complete, states=286, transitions=835, winStates=44, maxDepth=15
事件类型: anchor_boundary_shift:push_pull=42, pull_object:push_pull_anchor=19, push_object:push_pull_anchor=23, walk=793

## l_side_pull_up_p_target_wall

结构族: pl_perpendicular_handle_wall_gates
变体: l_side_pull_p_target_wall
变化变量: 玩家前格开放，但 P 半格上移目标格被墙堵住
对照: l_side_pull_up_open_loop

问题: L 侧拉动时，非接触的 P 半格目标墙是否阻断整条 P/L 锚
动作序列: up
反事实禁用: 无
预算: exploreDepth=24, returnDepth=48, maxStates=50000, maxTransitions=200000

layout:
```text
#######
#.....#
#.#@..#
#.PLG.#
#.....#
#.....#
#######
```

初始状态:
```text
#######
#.....#
#.#@..#
#.PLG.#
#.....#
#.....#
#######
```

动作回放:
- 1. up: illegal (force_blocked); events=-; eventWin=no
```text
#######
#.....#
#.#@..#
#.PLG.#
#.....#
#.....#
#######
```
- 后续动作未继续回放，因为动作序列中出现 illegal step。

最终状态:
```text
#######
#.....#
#.#@..#
#.PLG.#
#.....#
#.....#
#######
```
变化格: 无

最终状态动作表:
| action | legal | events | next / reason |
| --- | --- | --- | --- |
| up | no | - | force_blocked |
| down | no | - | pull_world_front_blocked |
| left | no | - | destination_blocked |
| right | yes | walk | Ply:4,2\|C:\|M:\|PL:P:2,3;L:3,3\|BS:none |

回到初始: not applicable (replay stopped at illegal action; return search skipped)
局部可达图: status=complete, states=286, transitions=808, winStates=44, maxDepth=19
事件类型: anchor_boundary_shift:push_pull=39, pull_object:push_pull_anchor=18, push_object:push_pull_anchor=21, walk=769

