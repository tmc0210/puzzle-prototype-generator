# 机制局部实验: ra_loop_pl_anchor_wall_mobility_20260708_01_pl_anchor_long_axis_pull_push_wall_ratchet

- 原型: reality_anchor
- 生成时间: 2026-07-08T05:00:31.107Z
- 标题: P/L anchor long-axis push/pull wall ratchet
- 备注: 比较水平 P/L anchor 在长轴墙廊中由 P 侧 push 与 L 侧 pull 驱动时，端点余量、玩家前格门、侧廊假把手和拉后回返门如何消费本体位移。

## 结构族摘要

### pl_anchor_long_axis_pull_push_wall_ratchet
| case | variant | changed variable | contrast | return | final legal | final illegal | graph |
| --- | --- | --- | --- | --- | --- | --- | --- |
| push_p_side_one_l_slack_baseline | p_side_push_one_l_slack | driver=P-side push; L 端前方 1 格余量 | pull_l_side_one_front_stop | no complete | left | up:destination_blocked, down:destination_blocked, right:force_blocked | complete / 3 states |
| pull_l_side_no_front_gate | l_side_pull_no_player_front_cell_gate | L 侧 pull 的玩家前格余量从 1 改为 0 | pull_l_side_one_front_stop | not applicable: replay stopped at illegal action; return search skipped | - | up:destination_blocked, down:destination_blocked, left:pull_world_front_blocked, right:destination_blocked | complete / 1 states |
| pull_l_side_one_front_stop | l_side_pull_one_player_front_cell | L 侧 pull；玩家前方 1 格余量 | pull_l_side_no_front_gate, pull_l_side_two_front_capacity | no complete | - | up:destination_blocked, down:destination_blocked, left:pull_world_front_blocked, right:destination_blocked | complete / 2 states |
| pull_l_side_two_front_capacity | l_side_pull_two_player_front_cells | L 侧 pull 的玩家前格余量从 1 改为 2 | pull_l_side_one_front_stop | no complete | - | up:destination_blocked, down:destination_blocked, left:pull_world_front_blocked, right:destination_blocked | complete / 3 states |
| pull_l_side_side_corridor_fake_handle | l_side_pull_side_corridor_open_but_no_reverse_force | 首拉后下方侧廊开放 | pull_l_side_one_front_stop | no complete | down | up:destination_blocked, left:pull_world_front_blocked, right:destination_blocked | complete / 30 states |
| pull_l_side_return_gate_open | l_side_pull_after_shift_return_gate_open | 拉后玩家脚下回返门开放 | pull_l_side_return_gate_wall | no complete | up, left | down:destination_blocked, right:destination_blocked | complete / 30 states |
| pull_l_side_return_gate_wall | l_side_pull_after_shift_return_gate_walled | 拉后玩家脚下回返门由地面改为墙 | pull_l_side_return_gate_open | not applicable: replay stopped at illegal action; return search skipped | - | up:destination_blocked, down:destination_blocked, left:pull_world_front_blocked, right:destination_blocked | complete / 26 states |

## push_p_side_one_l_slack_baseline

结构族: pl_anchor_long_axis_pull_push_wall_ratchet
变体: p_side_push_one_l_slack
变化变量: driver=P-side push; L 端前方 1 格余量
对照: pull_l_side_one_front_stop

问题: P 侧 push 的一格 L 端余量是否仍表现为一次性长轴停位基线？
动作序列: right
反事实禁用: 无
预算: exploreDepth=18, returnDepth=30, maxStates=50000, maxTransitions=120000

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

## pull_l_side_no_front_gate

结构族: pl_anchor_long_axis_pull_push_wall_ratchet
变体: l_side_pull_no_player_front_cell_gate
变化变量: L 侧 pull 的玩家前格余量从 1 改为 0
对照: pull_l_side_one_front_stop

问题: L 侧 pull 没有玩家前格时，首步是否作为 destination gate 被墙关闭？
备注: 门控反例；不支撑可动性，只证明前格墙消费 pull 输入。
动作序列: right
反事实禁用: 无
预算: exploreDepth=18, returnDepth=30, maxStates=50000, maxTransitions=120000

layout:
```text
########
#G.PL@##
########
```

初始状态:
```text
########
#G.PL@##
########
```

动作回放:
- 1. right: illegal (destination_blocked); events=-; eventWin=no
```text
########
#G.PL@##
########
```
- 后续动作未继续回放，因为动作序列中出现 illegal step。

最终状态:
```text
########
#G.PL@##
########
```
变化格: 无

最终状态动作表:
| action | legal | events | next / reason |
| --- | --- | --- | --- |
| up | no | - | destination_blocked |
| down | no | - | destination_blocked |
| left | no | - | pull_world_front_blocked |
| right | no | - | destination_blocked |

回到初始: not applicable (replay stopped at illegal action; return search skipped)
局部可达图: status=complete, states=1, transitions=0, winStates=0, maxDepth=0
事件类型: 无

## pull_l_side_one_front_stop

结构族: pl_anchor_long_axis_pull_push_wall_ratchet
变体: l_side_pull_one_player_front_cell
变化变量: L 侧 pull；玩家前方 1 格余量
对照: pull_l_side_no_front_gate, pull_l_side_two_front_capacity

问题: L 侧 pull 的一格玩家前格是否给 P/L anchor 一次长轴位移并停在端墙前？
动作序列: right
反事实禁用: 无
预算: exploreDepth=18, returnDepth=30, maxStates=50000, maxTransitions=120000

layout:
```text
########
#G.PL@.#
########
```

初始状态:
```text
########
#G.PL@.#
########
```

动作回放:
- 1. right: legal; events=pull_object:push_pull_anchor,anchor_boundary_shift:push_pull; eventWin=no
```text
########
#G..PL@#
########
```

最终状态:
```text
########
#G..PL@#
########
```
变化格: (3,1) P->.; (4,1) L->P; (5,1) @->L; (6,1) .->@

最终状态动作表:
| action | legal | events | next / reason |
| --- | --- | --- | --- |
| up | no | - | destination_blocked |
| down | no | - | destination_blocked |
| left | no | - | pull_world_front_blocked |
| right | no | - | destination_blocked |

回到初始: no (complete: search complete)
局部可达图: status=complete, states=2, transitions=1, winStates=0, maxDepth=1
事件类型: anchor_boundary_shift:push_pull=1, pull_object:push_pull_anchor=1

## pull_l_side_two_front_capacity

结构族: pl_anchor_long_axis_pull_push_wall_ratchet
变体: l_side_pull_two_player_front_cells
变化变量: L 侧 pull 的玩家前格余量从 1 改为 2
对照: pull_l_side_one_front_stop

问题: 玩家前方 2 格余量是否允许连续两次 L 侧 pull，形成 pull 版容量资源？
动作序列: right right
反事实禁用: 无
预算: exploreDepth=18, returnDepth=30, maxStates=50000, maxTransitions=120000

layout:
```text
#########
#G.PL@..#
#########
```

初始状态:
```text
#########
#G.PL@..#
#########
```

动作回放:
- 1. right: legal; events=pull_object:push_pull_anchor,anchor_boundary_shift:push_pull; eventWin=no
```text
#########
#G..PL@.#
#########
```
- 2. right: legal; events=pull_object:push_pull_anchor,anchor_boundary_shift:push_pull; eventWin=no
```text
#########
#G...PL@#
#########
```

最终状态:
```text
#########
#G...PL@#
#########
```
变化格: (3,1) P->.; (4,1) L->.; (5,1) @->P; (6,1) .->L; (7,1) .->@

最终状态动作表:
| action | legal | events | next / reason |
| --- | --- | --- | --- |
| up | no | - | destination_blocked |
| down | no | - | destination_blocked |
| left | no | - | pull_world_front_blocked |
| right | no | - | destination_blocked |

回到初始: no (complete: search complete)
局部可达图: status=complete, states=3, transitions=2, winStates=0, maxDepth=2
事件类型: anchor_boundary_shift:push_pull=2, pull_object:push_pull_anchor=2

## pull_l_side_side_corridor_fake_handle

结构族: pl_anchor_long_axis_pull_push_wall_ratchet
变体: l_side_pull_side_corridor_open_but_no_reverse_force
变化变量: 首拉后下方侧廊开放
对照: pull_l_side_one_front_stop

问题: 侧廊开放是否只增加玩家位置集合，而不提供长轴反向恢复 P/L anchor 的真实把手？
动作序列: right
反事实禁用: 无
预算: exploreDepth=18, returnDepth=30, maxStates=50000, maxTransitions=120000

layout:
```text
########
#G.PL@.#
#......#
########
```

初始状态:
```text
########
#G.PL@.#
#......#
########
```

动作回放:
- 1. right: legal; events=pull_object:push_pull_anchor,anchor_boundary_shift:push_pull; eventWin=no
```text
########
#G..PL@#
#......#
########
```

最终状态:
```text
########
#G..PL@#
#......#
########
```
变化格: (3,1) P->.; (4,1) L->P; (5,1) @->L; (6,1) .->@

最终状态动作表:
| action | legal | events | next / reason |
| --- | --- | --- | --- |
| up | no | - | destination_blocked |
| down | yes | walk | Ply:6,2\|C:\|M:\|PL:P:4,1;L:5,1\|BS:none |
| left | no | - | pull_world_front_blocked |
| right | no | - | destination_blocked |

回到初始: no (complete: search complete)
局部可达图: status=complete, states=30, transitions=70, winStates=0, maxDepth=11
事件类型: anchor_boundary_shift:push_pull=3, pull_object:push_pull_anchor=1, push_object:push_pull_anchor=2, walk=67

## pull_l_side_return_gate_open

结构族: pl_anchor_long_axis_pull_push_wall_ratchet
变体: l_side_pull_after_shift_return_gate_open
变化变量: 拉后玩家脚下回返门开放
对照: pull_l_side_return_gate_wall

问题: 首拉合法后，回返门开放是否让玩家离开端点并消费已移动的 anchor 位置？
动作序列: right down
反事实禁用: 无
预算: exploreDepth=18, returnDepth=30, maxStates=50000, maxTransitions=120000

layout:
```text
########
#G.PL@.#
#......#
########
```

初始状态:
```text
########
#G.PL@.#
#......#
########
```

动作回放:
- 1. right: legal; events=pull_object:push_pull_anchor,anchor_boundary_shift:push_pull; eventWin=no
```text
########
#G..PL@#
#......#
########
```
- 2. down: legal; events=walk; eventWin=no
```text
########
#G..PL.#
#.....@#
########
```

最终状态:
```text
########
#G..PL.#
#.....@#
########
```
变化格: (3,1) P->.; (4,1) L->P; (5,1) @->L; (6,2) .->@

最终状态动作表:
| action | legal | events | next / reason |
| --- | --- | --- | --- |
| up | yes | walk | Ply:6,1\|C:\|M:\|PL:P:4,1;L:5,1\|BS:none |
| down | no | - | destination_blocked |
| left | yes | walk | Ply:5,2\|C:\|M:\|PL:P:4,1;L:5,1\|BS:none |
| right | no | - | destination_blocked |

回到初始: no (complete: search complete)
局部可达图: status=complete, states=30, transitions=70, winStates=0, maxDepth=11
事件类型: anchor_boundary_shift:push_pull=3, pull_object:push_pull_anchor=1, push_object:push_pull_anchor=2, walk=67

## pull_l_side_return_gate_wall

结构族: pl_anchor_long_axis_pull_push_wall_ratchet
变体: l_side_pull_after_shift_return_gate_walled
变化变量: 拉后玩家脚下回返门由地面改为墙
对照: pull_l_side_return_gate_open

问题: 首拉合法但回返门被墙封住时，失败是否明确属于拉后回返门控反例？
备注: 门控反例；首步移动 P/L anchor，第二步被墙消费为 destination gate。
动作序列: right down
反事实禁用: 无
预算: exploreDepth=18, returnDepth=30, maxStates=50000, maxTransitions=120000

layout:
```text
########
#G.PL@.#
#.....##
########
```

初始状态:
```text
########
#G.PL@.#
#.....##
########
```

动作回放:
- 1. right: legal; events=pull_object:push_pull_anchor,anchor_boundary_shift:push_pull; eventWin=no
```text
########
#G..PL@#
#.....##
########
```
- 2. down: illegal (destination_blocked); events=-; eventWin=no
```text
########
#G..PL@#
#.....##
########
```
- 后续动作未继续回放，因为动作序列中出现 illegal step。

最终状态:
```text
########
#G..PL@#
#.....##
########
```
变化格: (3,1) P->.; (4,1) L->P; (5,1) @->L; (6,1) .->@

最终状态动作表:
| action | legal | events | next / reason |
| --- | --- | --- | --- |
| up | no | - | destination_blocked |
| down | no | - | destination_blocked |
| left | no | - | pull_world_front_blocked |
| right | no | - | destination_blocked |

回到初始: not applicable (replay stopped at illegal action; return search skipped)
局部可达图: status=complete, states=26, transitions=59, winStates=0, maxDepth=11
事件类型: anchor_boundary_shift:push_pull=3, pull_object:push_pull_anchor=1, push_object:push_pull_anchor=2, walk=56

