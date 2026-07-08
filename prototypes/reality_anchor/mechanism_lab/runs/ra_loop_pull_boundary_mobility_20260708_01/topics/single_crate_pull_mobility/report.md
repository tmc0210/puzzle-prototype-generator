# 机制局部实验: ra_loop_pull_boundary_mobility_20260708_01_single_crate_pull_mobility

- 原型: reality_anchor
- 生成时间: 2026-07-08T03:54:30.215Z
- 标题: 单箱 pull 可动性
- 备注: 单个 crate 在 pull 世界中的局部探针。P/L 锚只用于让玩家处在 pull 侧； 其中一个探针把 pull 后的站位放到 push 侧，用来检查 push 回推能否撤销 pull。


## 结构族摘要

### single_crate_pull_mobility
| case | variant | changed variable | contrast | return | final legal | final illegal | graph |
| --- | --- | --- | --- | --- | --- | --- | --- |
| pull_open_crosses_to_push_undo | 合法 pull；最终站位在 push 侧 | P/L 边界位于初始玩家格和前格之间 | pull_open_stays_pull_side | yes depth=1 | down, left, right | up:force_blocked | complete / 1164 states |
| pull_open_stays_pull_side | 合法 pull；最终站位仍在 pull 侧 | P/L 边界远离局部 pull 结构 | pull_open_crosses_to_push_undo, pull_single_cell_pocket_no_return | yes depth=11 | up, down, right | left:pull_world_front_blocked | complete / 1131 states |
| pull_front_wall_block | 非法 pull；前格是墙 | 玩家前格为墙 | pull_open_stays_pull_side | not applicable: replay stopped at illegal action; return search skipped | up, down | left:pull_world_front_blocked, right:destination_blocked | complete / 326 states |
| pull_front_anchor_blocks_target_vacate | 非法 pull；前格是物体 | 玩家前格被 P/L 锚占据 | pull_front_wall_block, pull_open_stays_pull_side | not applicable: replay stopped at illegal action; return search skipped | up, down | left:pull_world_front_blocked, right:pull_world_front_blocked | complete / 866 states |
| pull_no_rear_crate_walk | 合法 walk；身后无 crate | 玩家身后一格没有 crate | pull_open_stays_pull_side | yes depth=1 | up, down, left, right | - | complete / 298 states |
| pull_single_cell_pocket_no_return | 合法 pull；单格墙口袋 | 墙消费 pull 后站位的全部出口 | pull_open_stays_pull_side | no complete | - | up:destination_blocked, down:destination_blocked, left:pull_world_front_blocked, right:destination_blocked | complete / 2 states |

## pull_open_crosses_to_push_undo: 前格在 push 侧时，合法 pull 可被立即 push 回推撤销

结构族: single_crate_pull_mobility
变体: 合法 pull；最终站位在 push 侧
变化变量: P/L 边界位于初始玩家格和前格之间
对照: pull_open_stays_pull_side

问题: 玩家从 L 侧出发，身后有 crate 且前格为空时，向右 pull 是否把 crate 拉入玩家腾出的格子；若最终站位落在 P 侧，是否能立刻向左 push 回初始态？

备注: active_rule=pull_force + player front cell requirement；边界只是制造 pull 后 push 回推站位的 setup device。

动作序列: right
反事实禁用: 无
预算: exploreDepth=16, returnDepth=24, maxStates=20000, maxTransitions=80000

layout:
```text
#########
#...LP.G#
#..C@...#
#.......#
#########
```

初始状态:
```text
#########
#...LP.G#
#..C@...#
#.......#
#########
```

动作回放:
- 1. right: legal; events=pull_object:crate#1; eventWin=no
```text
#########
#...LP.G#
#...C@..#
#.......#
#########
```

最终状态:
```text
#########
#...LP.G#
#...C@..#
#.......#
#########
```
变化格: (3,2) C->.; (4,2) @->C; (5,2) .->@

最终状态动作表:
| action | legal | events | next / reason |
| --- | --- | --- | --- |
| up | no | - | force_blocked |
| down | yes | walk | Ply:5,3\|C:4,2\|M:\|PL:P:5,1;L:4,1\|BS:none |
| left | yes | push_object:crate#1 | Ply:4,2\|C:3,2\|M:\|PL:P:5,1;L:4,1\|BS:none |
| right | yes | walk | Ply:6,2\|C:4,2\|M:\|PL:P:5,1;L:4,1\|BS:none |

回到初始: yes, depth=1, path=left
局部可达图: status=complete, states=1164, transitions=2806, winStates=2, maxDepth=16
事件类型: anchor_boundary_shift:push_pull=109, force_chain:n2=7, pull_object:crate#1=25, pull_object:push_pull_anchor=46, push_object:crate#1=88, push_object:push_pull_anchor=61, walk=2586

## pull_open_stays_pull_side: 合法 pull，但不能立即反向 push

结构族: single_crate_pull_mobility
变体: 合法 pull；最终站位仍在 pull 侧
变化变量: P/L 边界远离局部 pull 结构
对照: pull_open_crosses_to_push_undo, pull_single_cell_pocket_no_return

问题: 在相同 crate / player / 前格为空结构下，如果 pull 后玩家仍处在 pull 世界， 最终动作表和回返路径有什么变化？

备注: active_rule=pull_force + player front cell requirement；开放地面是不消费 回返的 control，用来对照后续墙口袋 probe。

动作序列: right
反事实禁用: 无
预算: exploreDepth=16, returnDepth=24, maxStates=20000, maxTransitions=80000

layout:
```text
#########
#PL....G#
#..C@...#
#.......#
#########
```

初始状态:
```text
#########
#PL....G#
#..C@...#
#.......#
#########
```

动作回放:
- 1. right: legal; events=pull_object:crate#1; eventWin=no
```text
#########
#PL....G#
#...C@..#
#.......#
#########
```

最终状态:
```text
#########
#PL....G#
#...C@..#
#.......#
#########
```
变化格: (3,2) C->.; (4,2) @->C; (5,2) .->@

最终状态动作表:
| action | legal | events | next / reason |
| --- | --- | --- | --- |
| up | yes | walk | Ply:5,1\|C:4,2\|M:\|PL:P:1,1;L:2,1\|BS:none |
| down | yes | walk | Ply:5,3\|C:4,2\|M:\|PL:P:1,1;L:2,1\|BS:none |
| left | no | - | pull_world_front_blocked |
| right | yes | pull_object:crate#1 | Ply:6,2\|C:5,2\|M:\|PL:P:1,1;L:2,1\|BS:none |

回到初始: yes, depth=11, path=up left left down left left down right right up right
局部可达图: status=complete, states=1131, transitions=2428, winStates=11, maxDepth=16
事件类型: anchor_boundary_shift:push_pull=135, force_chain:n2=11, pull_object:crate#1=48, pull_object:push_pull_anchor=61, push_object:crate#1=72, push_object:push_pull_anchor=70, walk=2177

## pull_front_wall_block: 前格墙在 crate 移动前阻断 pull

结构族: single_crate_pull_mobility
变体: 非法 pull；前格是墙
变化变量: 玩家前格为墙
对照: pull_open_stays_pull_side

问题: 玩家移动目标格是墙时，即使身后一格有 crate，pull 是否仍被前格门阻断？

备注: active_rule=pull_force + player front cell requirement；墙是 consumer。

动作序列: right
反事实禁用: 无
预算: exploreDepth=16, returnDepth=24, maxStates=20000, maxTransitions=80000

layout:
```text
#########
#PL....G#
#..C@#..#
#.......#
#########
```

初始状态:
```text
#########
#PL....G#
#..C@#..#
#.......#
#########
```

动作回放:
- 1. right: illegal (destination_blocked); events=-; eventWin=no
```text
#########
#PL....G#
#..C@#..#
#.......#
#########
```
- 后续动作未继续回放，因为动作序列中出现 illegal step。

最终状态:
```text
#########
#PL....G#
#..C@#..#
#.......#
#########
```
变化格: 无

最终状态动作表:
| action | legal | events | next / reason |
| --- | --- | --- | --- |
| up | yes | walk | Ply:4,1\|C:3,2\|M:\|PL:P:1,1;L:2,1\|BS:none |
| down | yes | walk | Ply:4,3\|C:3,2\|M:\|PL:P:1,1;L:2,1\|BS:none |
| left | no | - | pull_world_front_blocked |
| right | no | - | destination_blocked |

回到初始: not applicable (replay stopped at illegal action; return search skipped)
局部可达图: status=complete, states=326, transitions=657, winStates=7, maxDepth=16
事件类型: anchor_boundary_shift:push_pull=33, force_chain:n2=3, pull_object:crate#1=7, pull_object:push_pull_anchor=12, push_object:crate#1=28, push_object:push_pull_anchor=19, walk=591

## pull_front_anchor_blocks_target_vacate: 前格物体阻断 pull，并阻止玩家腾出 crate 目标格

结构族: single_crate_pull_mobility
变体: 非法 pull；前格是物体
变化变量: 玩家前格被 P/L 锚占据
对照: pull_front_wall_block, pull_open_stays_pull_side

问题: 玩家前格被物体占据时，即使 crate 正在身后一格，pull 是否仍被阻断？

备注: active_rule=pull_force + player front cell requirement。对单个 crate， crate 目标格是玩家腾出的当前格；因此可观察的目标格阻塞表现为前格物体 阻止玩家先腾出该格。

动作序列: right
反事实禁用: 无
预算: exploreDepth=16, returnDepth=24, maxStates=20000, maxTransitions=80000

layout:
```text
#########
#......G#
#..C@LP.#
#.......#
#########
```

初始状态:
```text
#########
#......G#
#..C@LP.#
#.......#
#########
```

动作回放:
- 1. right: illegal (pull_world_front_blocked); events=-; eventWin=no
```text
#########
#......G#
#..C@LP.#
#.......#
#########
```
- 后续动作未继续回放，因为动作序列中出现 illegal step。

最终状态:
```text
#########
#......G#
#..C@LP.#
#.......#
#########
```
变化格: 无

最终状态动作表:
| action | legal | events | next / reason |
| --- | --- | --- | --- |
| up | yes | walk | Ply:4,1\|C:3,2\|M:\|PL:P:6,2;L:5,2\|BS:none |
| down | yes | walk | Ply:4,3\|C:3,2\|M:\|PL:P:6,2;L:5,2\|BS:none |
| left | no | - | pull_world_front_blocked |
| right | no | - | pull_world_front_blocked |

回到初始: not applicable (replay stopped at illegal action; return search skipped)
局部可达图: status=complete, states=866, transitions=1912, winStates=0, maxDepth=16
事件类型: anchor_boundary_shift:push_pull=97, force_chain:n2=5, pull_object:crate#1=32, pull_object:push_pull_anchor=37, push_object:crate#1=50, push_object:push_pull_anchor=60, walk=1733

## pull_no_rear_crate_walk: 身后为空时，同一输入变成 walk 而不是 pull

结构族: single_crate_pull_mobility
变体: 合法 walk；身后无 crate
变化变量: 玩家身后一格没有 crate
对照: pull_open_stays_pull_side

问题: 在 pull 世界且前格为空时，如果玩家身后没有物体，同一输入是否只产生 walk？

备注: 玩家身后一格没有 target object，因此 active_rule=pull_force 不触发。

动作序列: right
反事实禁用: 无
预算: exploreDepth=16, returnDepth=24, maxStates=20000, maxTransitions=80000

layout:
```text
#########
#PL....G#
#...@...#
#.......#
#########
```

初始状态:
```text
#########
#PL....G#
#...@...#
#.......#
#########
```

动作回放:
- 1. right: legal; events=walk; eventWin=no
```text
#########
#PL....G#
#....@..#
#.......#
#########
```

最终状态:
```text
#########
#PL....G#
#....@..#
#.......#
#########
```
变化格: (4,2) @->.; (5,2) .->@

最终状态动作表:
| action | legal | events | next / reason |
| --- | --- | --- | --- |
| up | yes | walk | Ply:5,1\|C:\|M:\|PL:P:1,1;L:2,1\|BS:none |
| down | yes | walk | Ply:5,3\|C:\|M:\|PL:P:1,1;L:2,1\|BS:none |
| left | yes | walk | Ply:4,2\|C:\|M:\|PL:P:1,1;L:2,1\|BS:none |
| right | yes | walk | Ply:6,2\|C:\|M:\|PL:P:1,1;L:2,1\|BS:none |

回到初始: yes, depth=1, path=left
局部可达图: status=complete, states=298, transitions=799, winStates=2, maxDepth=16
事件类型: anchor_boundary_shift:push_pull=46, pull_object:push_pull_anchor=22, push_object:push_pull_anchor=24, walk=753

## pull_single_cell_pocket_no_return: 拉入单格口袋会消费回返可动性

结构族: single_crate_pull_mobility
变体: 合法 pull；单格墙口袋
变化变量: 墙消费 pull 后站位的全部出口
对照: pull_open_stays_pull_side

问题: 如果 pull 合法，但玩家被放到 crate 另一侧唯一的自由格，局部图能否完成证明 无法回到初始态？

备注: active_rule=pull_force + player front cell requirement；周围墙形成 consumer pocket。

动作序列: right
反事实禁用: 无
预算: exploreDepth=16, returnDepth=24, maxStates=20000, maxTransitions=80000

layout:
```text
########
#PL###G#
###C@.##
########
```

初始状态:
```text
########
#PL###G#
###C@.##
########
```

动作回放:
- 1. right: legal; events=pull_object:crate#1; eventWin=no
```text
########
#PL###G#
###.C@##
########
```

最终状态:
```text
########
#PL###G#
###.C@##
########
```
变化格: (3,2) C->.; (4,2) @->C; (5,2) .->@

最终状态动作表:
| action | legal | events | next / reason |
| --- | --- | --- | --- |
| up | no | - | destination_blocked |
| down | no | - | destination_blocked |
| left | no | - | pull_world_front_blocked |
| right | no | - | destination_blocked |

回到初始: no (complete: search complete)
局部可达图: status=complete, states=2, transitions=1, winStates=0, maxDepth=1
事件类型: pull_object:crate#1=1

