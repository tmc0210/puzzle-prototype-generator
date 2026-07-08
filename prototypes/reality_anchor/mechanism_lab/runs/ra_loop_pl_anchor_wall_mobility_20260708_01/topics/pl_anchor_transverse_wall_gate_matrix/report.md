# 机制局部实验: ra_loop_pl_anchor_wall_mobility_20260708_01_pl_anchor_transverse_wall_gate_matrix

- 原型: reality_anchor
- 生成时间: 2026-07-08T05:01:02.331Z
- 标题: P/L anchor 横向/竖向把手墙门矩阵
- 备注: 比较 P/L anchor 本体在横放垂直位移和竖放水平位移时，墙格分别关闭玩家前格、 P 半格目标格、L 半格目标格与移动后回返门的层次。所有正例都应移动 P/L anchor 并出现 anchor_boundary_shift:push_pull；失败例在 notes 中标出门控层。


## 结构族摘要

### pl_anchor_transverse_wall_gate_matrix
| case | variant | changed variable | contrast | return | final legal | final illegal | graph |
| --- | --- | --- | --- | --- | --- | --- | --- |
| h_p_push_down_open_return | horizontal_p_side_push_down_open_return | 横放 PL；P 侧向下 push；P/L 两个目标格与移动后 L 侧回返前格都开放 | h_p_push_down_p_target_wall, h_p_push_down_l_target_wall, h_p_push_down_return_front_wall | yes depth=1 | up, left, right | down:pull_world_front_blocked | complete / 300 states |
| h_p_push_down_p_target_wall | horizontal_p_side_push_down_p_target_closed | 只把 push 后 P 半格目标格改成墙 | h_p_push_down_open_return | not applicable: replay stopped at illegal action; return search skipped | up, left, right | down:force_blocked | complete / 265 states |
| h_p_push_down_l_target_wall | horizontal_p_side_push_down_l_target_closed | 只把 push 后 L 半格目标格改成墙 | h_p_push_down_open_return | not applicable: replay stopped at illegal action; return search skipped | up, left, right | down:force_blocked | complete / 237 states |
| h_p_push_down_return_front_wall | horizontal_p_side_push_down_post_shift_return_closed | 首推目标格开放，但移动后 L 侧回返 pull 的玩家前格改成墙 | h_p_push_down_open_return | not applicable: replay stopped at illegal action; return search skipped | left, right | up:destination_blocked, down:pull_world_front_blocked | complete / 196 states |
| h_p_push_up_open | horizontal_p_side_push_up_open | 横放 PL；P 侧从下方向上 push，目标格开放 | h_p_push_down_open_return | yes depth=3 | up, down, left, right | - | complete / 301 states |
| h_l_pull_down_open | horizontal_l_side_pull_down_open | 横放 PL；L 侧从下方向下 pull，玩家前格与 P 半格目标格开放 | h_l_pull_down_front_wall, h_l_pull_down_p_target_wall | yes depth=3 | left, right | up:pull_world_front_blocked, down:destination_blocked | complete / 299 states |
| h_l_pull_down_front_wall | horizontal_l_side_pull_down_front_closed | 只把 L 侧 pull 的玩家前格改成墙 | h_l_pull_down_open | not applicable: replay stopped at illegal action; return search skipped | left, right | up:pull_world_front_blocked, down:destination_blocked | complete / 242 states |
| h_l_pull_down_p_target_wall | horizontal_l_side_pull_down_p_target_closed | 玩家前格开放，但非接触 P 半格目标格改成墙 | h_l_pull_down_open | not applicable: replay stopped at illegal action; return search skipped | right | up:pull_world_front_blocked, down:force_blocked, left:destination_blocked | complete / 195 states |
| v_p_push_right_open | vertical_p_side_push_right_open | 竖放 P/L；P 侧从左向右 push，两个目标格开放 | v_p_push_left_open | yes depth=3 | up, down, left, right | - | complete / 230 states |
| v_p_push_left_open | vertical_p_side_push_left_open | 竖放 P/L；P 侧从右向左 push，两个目标格开放 | v_p_push_right_open | yes depth=3 | up, down, left, right | - | complete / 230 states |

## h_p_push_down_open_return

结构族: pl_anchor_transverse_wall_gate_matrix
变体: horizontal_p_side_push_down_open_return
变化变量: 横放 PL；P 侧向下 push；P/L 两个目标格与移动后 L 侧回返前格都开放
对照: h_p_push_down_p_target_wall, h_p_push_down_l_target_wall, h_p_push_down_return_front_wall

问题: P 侧向下推横放 PL 后，能否经旧 L 格转到 L 侧并把 anchor 拉回
备注: 正例；step1/step3 都应移动 P/L anchor，事件含 anchor_boundary_shift:push_pull；回返门开放。
动作序列: down right up
反事实禁用: 无
预算: exploreDepth=14, returnDepth=24, maxStates=30000, maxTransitions=120000

layout:
```text
#######
#..G..#
#.....#
#.@...#
#.PL..#
#.....#
#######
```

初始状态:
```text
#######
#..G..#
#.....#
#.@...#
#.PL..#
#.....#
#######
```

动作回放:
- 1. down: legal; events=push_object:push_pull_anchor,anchor_boundary_shift:push_pull; eventWin=no
```text
#######
#..G..#
#.....#
#.....#
#.@...#
#.PL..#
#######
```
- 2. right: legal; events=walk; eventWin=no
```text
#######
#..G..#
#.....#
#.....#
#..@..#
#.PL..#
#######
```
- 3. up: legal; events=pull_object:push_pull_anchor,anchor_boundary_shift:push_pull; eventWin=no
```text
#######
#..G..#
#.....#
#..@..#
#.PL..#
#.....#
#######
```

最终状态:
```text
#######
#..G..#
#.....#
#..@..#
#.PL..#
#.....#
#######
```
变化格: (2,3) @->.; (3,3) .->@

最终状态动作表:
| action | legal | events | next / reason |
| --- | --- | --- | --- |
| up | yes | pull_object:push_pull_anchor,anchor_boundary_shift:push_pull | Ply:3,2\|C:\|M:\|PL:P:2,3;L:3,3\|BS:none |
| down | no | - | pull_world_front_blocked |
| left | yes | walk | Ply:2,3\|C:\|M:\|PL:P:2,4;L:3,4\|BS:none |
| right | yes | walk | Ply:4,3\|C:\|M:\|PL:P:2,4;L:3,4\|BS:none |

回到初始: yes, depth=1, path=left
局部可达图: status=complete, states=300, transitions=902, winStates=2, maxDepth=14
事件类型: anchor_boundary_shift:push_pull=46, pull_object:push_pull_anchor=20, push_object:push_pull_anchor=26, walk=856

## h_p_push_down_p_target_wall

结构族: pl_anchor_transverse_wall_gate_matrix
变体: horizontal_p_side_push_down_p_target_closed
变化变量: 只把 push 后 P 半格目标格改成墙
对照: h_p_push_down_open_return

问题: 接触的 P 半格目标格被墙挡时，P 侧 push 是否在 footprint 层失败
备注: 失败例；门控层=P 半格目标门；预期首步 force_blocked。
动作序列: down
反事实禁用: 无
预算: exploreDepth=14, returnDepth=24, maxStates=30000, maxTransitions=120000

layout:
```text
#######
#..G..#
#.....#
#.@...#
#.PL..#
#.#...#
#######
```

初始状态:
```text
#######
#..G..#
#.....#
#.@...#
#.PL..#
#.#...#
#######
```

动作回放:
- 1. down: illegal (force_blocked); events=-; eventWin=no
```text
#######
#..G..#
#.....#
#.@...#
#.PL..#
#.#...#
#######
```
- 后续动作未继续回放，因为动作序列中出现 illegal step。

最终状态:
```text
#######
#..G..#
#.....#
#.@...#
#.PL..#
#.#...#
#######
```
变化格: 无

最终状态动作表:
| action | legal | events | next / reason |
| --- | --- | --- | --- |
| up | yes | walk | Ply:2,2\|C:\|M:\|PL:P:2,4;L:3,4\|BS:none |
| down | no | - | force_blocked |
| left | yes | walk | Ply:1,3\|C:\|M:\|PL:P:2,4;L:3,4\|BS:none |
| right | yes | walk | Ply:3,3\|C:\|M:\|PL:P:2,4;L:3,4\|BS:none |

回到初始: not applicable (replay stopped at illegal action; return search skipped)
局部可达图: status=complete, states=265, transitions=764, winStates=2, maxDepth=14
事件类型: anchor_boundary_shift:push_pull=40, pull_object:push_pull_anchor=18, push_object:push_pull_anchor=22, walk=724

## h_p_push_down_l_target_wall

结构族: pl_anchor_transverse_wall_gate_matrix
变体: horizontal_p_side_push_down_l_target_closed
变化变量: 只把 push 后 L 半格目标格改成墙
对照: h_p_push_down_open_return

问题: 未接触的 L 半格目标格被墙挡时，P 侧 push 是否同样在 footprint 层失败
备注: 失败例；门控层=L 半格目标门；预期首步 force_blocked。
动作序列: down
反事实禁用: 无
预算: exploreDepth=14, returnDepth=24, maxStates=30000, maxTransitions=120000

layout:
```text
#######
#..G..#
#.....#
#.@...#
#.PL..#
#..#..#
#######
```

初始状态:
```text
#######
#..G..#
#.....#
#.@...#
#.PL..#
#..#..#
#######
```

动作回放:
- 1. down: illegal (force_blocked); events=-; eventWin=no
```text
#######
#..G..#
#.....#
#.@...#
#.PL..#
#..#..#
#######
```
- 后续动作未继续回放，因为动作序列中出现 illegal step。

最终状态:
```text
#######
#..G..#
#.....#
#.@...#
#.PL..#
#..#..#
#######
```
变化格: 无

最终状态动作表:
| action | legal | events | next / reason |
| --- | --- | --- | --- |
| up | yes | walk | Ply:2,2\|C:\|M:\|PL:P:2,4;L:3,4\|BS:none |
| down | no | - | force_blocked |
| left | yes | walk | Ply:1,3\|C:\|M:\|PL:P:2,4;L:3,4\|BS:none |
| right | yes | walk | Ply:3,3\|C:\|M:\|PL:P:2,4;L:3,4\|BS:none |

回到初始: not applicable (replay stopped at illegal action; return search skipped)
局部可达图: status=complete, states=237, transitions=669, winStates=2, maxDepth=14
事件类型: anchor_boundary_shift:push_pull=37, pull_object:push_pull_anchor=16, push_object:push_pull_anchor=21, walk=632

## h_p_push_down_return_front_wall

结构族: pl_anchor_transverse_wall_gate_matrix
变体: horizontal_p_side_push_down_post_shift_return_closed
变化变量: 首推目标格开放，但移动后 L 侧回返 pull 的玩家前格改成墙
对照: h_p_push_down_open_return

问题: 首步已经移动 anchor 后，旧 L 格上的回返 pull 是否会被前格墙消费
备注: 消费型失败例；step1 正常移动并发出 anchor_boundary_shift:push_pull，step3 门控层=移动后回返门/玩家前格门，预期 destination_blocked。
动作序列: down right up
反事实禁用: 无
预算: exploreDepth=14, returnDepth=24, maxStates=30000, maxTransitions=120000

layout:
```text
#######
#..G..#
#.....#
#.@#..#
#.PL..#
#.....#
#######
```

初始状态:
```text
#######
#..G..#
#.....#
#.@#..#
#.PL..#
#.....#
#######
```

动作回放:
- 1. down: legal; events=push_object:push_pull_anchor,anchor_boundary_shift:push_pull; eventWin=no
```text
#######
#..G..#
#.....#
#..#..#
#.@...#
#.PL..#
#######
```
- 2. right: legal; events=walk; eventWin=no
```text
#######
#..G..#
#.....#
#..#..#
#..@..#
#.PL..#
#######
```
- 3. up: illegal (destination_blocked); events=-; eventWin=no
```text
#######
#..G..#
#.....#
#..#..#
#..@..#
#.PL..#
#######
```
- 后续动作未继续回放，因为动作序列中出现 illegal step。

最终状态:
```text
#######
#..G..#
#.....#
#..#..#
#..@..#
#.PL..#
#######
```
变化格: (2,3) @->.; (2,4) P->.; (3,4) L->@; (2,5) .->P; (3,5) .->L

最终状态动作表:
| action | legal | events | next / reason |
| --- | --- | --- | --- |
| up | no | - | destination_blocked |
| down | no | - | pull_world_front_blocked |
| left | yes | walk | Ply:2,4\|C:\|M:\|PL:P:2,5;L:3,5\|BS:none |
| right | yes | walk | Ply:4,4\|C:\|M:\|PL:P:2,5;L:3,5\|BS:none |

回到初始: not applicable (replay stopped at illegal action; return search skipped)
局部可达图: status=complete, states=196, transitions=546, winStates=0, maxDepth=14
事件类型: anchor_boundary_shift:push_pull=20, pull_object:push_pull_anchor=9, push_object:push_pull_anchor=11, walk=526

## h_p_push_up_open

结构族: pl_anchor_transverse_wall_gate_matrix
变体: horizontal_p_side_push_up_open
变化变量: 横放 PL；P 侧从下方向上 push，目标格开放
对照: h_p_push_down_open_return

问题: P 侧 push 的上/下镜像在无墙门时是否都能移动 anchor
备注: 正例；补 P 侧向上 push，不只重复向下把手。
动作序列: up
反事实禁用: 无
预算: exploreDepth=14, returnDepth=24, maxStates=30000, maxTransitions=120000

layout:
```text
#######
#..G..#
#.....#
#.PL..#
#.@...#
#.....#
#######
```

初始状态:
```text
#######
#..G..#
#.....#
#.PL..#
#.@...#
#.....#
#######
```

动作回放:
- 1. up: legal; events=push_object:push_pull_anchor,anchor_boundary_shift:push_pull; eventWin=no
```text
#######
#..G..#
#.PL..#
#.@...#
#.....#
#.....#
#######
```

最终状态:
```text
#######
#..G..#
#.PL..#
#.@...#
#.....#
#.....#
#######
```
变化格: (2,2) .->P; (3,2) .->L; (2,3) P->@; (3,3) L->.; (2,4) @->.

最终状态动作表:
| action | legal | events | next / reason |
| --- | --- | --- | --- |
| up | yes | push_object:push_pull_anchor,anchor_boundary_shift:push_pull | Ply:2,2\|C:\|M:\|PL:P:2,1;L:3,1\|BS:none |
| down | yes | walk | Ply:2,4\|C:\|M:\|PL:P:2,2;L:3,2\|BS:none |
| left | yes | walk | Ply:1,3\|C:\|M:\|PL:P:2,2;L:3,2\|BS:none |
| right | yes | walk | Ply:3,3\|C:\|M:\|PL:P:2,2;L:3,2\|BS:none |

回到初始: yes, depth=3, path=right down left
局部可达图: status=complete, states=301, transitions=906, winStates=2, maxDepth=14
事件类型: anchor_boundary_shift:push_pull=46, pull_object:push_pull_anchor=20, push_object:push_pull_anchor=26, walk=860

## h_l_pull_down_open

结构族: pl_anchor_transverse_wall_gate_matrix
变体: horizontal_l_side_pull_down_open
变化变量: 横放 PL；L 侧从下方向下 pull，玩家前格与 P 半格目标格开放
对照: h_l_pull_down_front_wall, h_l_pull_down_p_target_wall

问题: L 侧向下 pull 是否能在前格和非接触 P 半格目标格开放时移动 anchor
备注: 正例；补 L 侧向下 pull，不只重复旧的向上 pull。
动作序列: down
反事实禁用: 无
预算: exploreDepth=14, returnDepth=24, maxStates=30000, maxTransitions=120000

layout:
```text
#######
#..G..#
#.....#
#.PL..#
#..@..#
#.....#
#######
```

初始状态:
```text
#######
#..G..#
#.....#
#.PL..#
#..@..#
#.....#
#######
```

动作回放:
- 1. down: legal; events=pull_object:push_pull_anchor,anchor_boundary_shift:push_pull; eventWin=no
```text
#######
#..G..#
#.....#
#.....#
#.PL..#
#..@..#
#######
```

最终状态:
```text
#######
#..G..#
#.....#
#.....#
#.PL..#
#..@..#
#######
```
变化格: (2,3) P->.; (3,3) L->.; (2,4) .->P; (3,4) @->L; (3,5) .->@

最终状态动作表:
| action | legal | events | next / reason |
| --- | --- | --- | --- |
| up | no | - | pull_world_front_blocked |
| down | no | - | destination_blocked |
| left | yes | walk | Ply:2,5\|C:\|M:\|PL:P:2,4;L:3,4\|BS:none |
| right | yes | walk | Ply:4,5\|C:\|M:\|PL:P:2,4;L:3,4\|BS:none |

回到初始: yes, depth=3, path=left up right
局部可达图: status=complete, states=299, transitions=894, winStates=2, maxDepth=14
事件类型: anchor_boundary_shift:push_pull=46, pull_object:push_pull_anchor=20, push_object:push_pull_anchor=26, walk=848

## h_l_pull_down_front_wall

结构族: pl_anchor_transverse_wall_gate_matrix
变体: horizontal_l_side_pull_down_front_closed
变化变量: 只把 L 侧 pull 的玩家前格改成墙
对照: h_l_pull_down_open

问题: pull 的玩家前格被墙挡时，是否先于 footprint 检查失败
备注: 失败例；门控层=玩家前格门；预期首步 destination_blocked。
动作序列: down
反事实禁用: 无
预算: exploreDepth=14, returnDepth=24, maxStates=30000, maxTransitions=120000

layout:
```text
#######
#..G..#
#.....#
#.PL..#
#..@..#
#..#..#
#######
```

初始状态:
```text
#######
#..G..#
#.....#
#.PL..#
#..@..#
#..#..#
#######
```

动作回放:
- 1. down: illegal (destination_blocked); events=-; eventWin=no
```text
#######
#..G..#
#.....#
#.PL..#
#..@..#
#..#..#
#######
```
- 后续动作未继续回放，因为动作序列中出现 illegal step。

最终状态:
```text
#######
#..G..#
#.....#
#.PL..#
#..@..#
#..#..#
#######
```
变化格: 无

最终状态动作表:
| action | legal | events | next / reason |
| --- | --- | --- | --- |
| up | no | - | pull_world_front_blocked |
| down | no | - | destination_blocked |
| left | yes | walk | Ply:2,4\|C:\|M:\|PL:P:2,3;L:3,3\|BS:none |
| right | yes | walk | Ply:4,4\|C:\|M:\|PL:P:2,3;L:3,3\|BS:none |

回到初始: not applicable (replay stopped at illegal action; return search skipped)
局部可达图: status=complete, states=242, transitions=690, winStates=2, maxDepth=14
事件类型: anchor_boundary_shift:push_pull=37, pull_object:push_pull_anchor=16, push_object:push_pull_anchor=21, walk=653

## h_l_pull_down_p_target_wall

结构族: pl_anchor_transverse_wall_gate_matrix
变体: horizontal_l_side_pull_down_p_target_closed
变化变量: 玩家前格开放，但非接触 P 半格目标格改成墙
对照: h_l_pull_down_open

问题: L 侧 pull 时，非接触 P 半格目标格是否形成独立 footprint 门
备注: 失败例；门控层=P 半格目标门；L 半格目标格是玩家旧格，不能在直接 pull 中独立塞墙；预期 force_blocked。
动作序列: down
反事实禁用: 无
预算: exploreDepth=14, returnDepth=24, maxStates=30000, maxTransitions=120000

layout:
```text
#######
#..G..#
#.....#
#.PL..#
#.#@..#
#.....#
#######
```

初始状态:
```text
#######
#..G..#
#.....#
#.PL..#
#.#@..#
#.....#
#######
```

动作回放:
- 1. down: illegal (force_blocked); events=-; eventWin=no
```text
#######
#..G..#
#.....#
#.PL..#
#.#@..#
#.....#
#######
```
- 后续动作未继续回放，因为动作序列中出现 illegal step。

最终状态:
```text
#######
#..G..#
#.....#
#.PL..#
#.#@..#
#.....#
#######
```
变化格: 无

最终状态动作表:
| action | legal | events | next / reason |
| --- | --- | --- | --- |
| up | no | - | pull_world_front_blocked |
| down | no | - | force_blocked |
| left | no | - | destination_blocked |
| right | yes | walk | Ply:4,4\|C:\|M:\|PL:P:2,3;L:3,3\|BS:none |

回到初始: not applicable (replay stopped at illegal action; return search skipped)
局部可达图: status=complete, states=195, transitions=497, winStates=2, maxDepth=14
事件类型: anchor_boundary_shift:push_pull=30, pull_object:push_pull_anchor=13, push_object:push_pull_anchor=17, walk=467

## v_p_push_right_open

结构族: pl_anchor_transverse_wall_gate_matrix
变体: vertical_p_side_push_right_open
变化变量: 竖放 P/L；P 侧从左向右 push，两个目标格开放
对照: v_p_push_left_open

问题: 竖放 P/L 的右向横向 push 是否与左向镜像一样移动 anchor
备注: 正例；竖放横向把手的右向开放变体。
动作序列: right
反事实禁用: 无
预算: exploreDepth=14, returnDepth=24, maxStates=30000, maxTransitions=120000

layout:
```text
#######
#..G..#
#.....#
#.@P..#
#..L..#
#.....#
#######
```

初始状态:
```text
#######
#..G..#
#.....#
#.@P..#
#..L..#
#.....#
#######
```

动作回放:
- 1. right: legal; events=push_object:push_pull_anchor,anchor_boundary_shift:push_pull; eventWin=no
```text
#######
#..G..#
#.....#
#..@P.#
#...L.#
#.....#
#######
```

最终状态:
```text
#######
#..G..#
#.....#
#..@P.#
#...L.#
#.....#
#######
```
变化格: (2,3) @->.; (3,3) P->@; (4,3) .->P; (3,4) L->.; (4,4) .->L

最终状态动作表:
| action | legal | events | next / reason |
| --- | --- | --- | --- |
| up | yes | walk | Ply:3,2\|C:\|M:\|PL:P:4,3;L:4,4\|BS:none |
| down | yes | walk | Ply:3,4\|C:\|M:\|PL:P:4,3;L:4,4\|BS:none |
| left | yes | walk | Ply:2,3\|C:\|M:\|PL:P:4,3;L:4,4\|BS:none |
| right | yes | push_object:push_pull_anchor,anchor_boundary_shift:push_pull | Ply:4,3\|C:\|M:\|PL:P:5,3;L:5,4\|BS:none |

回到初始: yes, depth=3, path=down left up
局部可达图: status=complete, states=230, transitions=703, winStates=0, maxDepth=13
事件类型: anchor_boundary_shift:push_pull=29, pull_object:push_pull_anchor=12, push_object:push_pull_anchor=17, walk=674

## v_p_push_left_open

结构族: pl_anchor_transverse_wall_gate_matrix
变体: vertical_p_side_push_left_open
变化变量: 竖放 P/L；P 侧从右向左 push，两个目标格开放
对照: v_p_push_right_open

问题: 竖放 P/L 的左/右横向 push 在无墙门时是否等价
备注: 正例；竖放横向把手的左向开放变体，检查旋转方向而非旧横放垂直把手。
动作序列: left
反事实禁用: 无
预算: exploreDepth=14, returnDepth=24, maxStates=30000, maxTransitions=120000

layout:
```text
#######
#..G..#
#.....#
#..P@.#
#..L..#
#.....#
#######
```

初始状态:
```text
#######
#..G..#
#.....#
#..P@.#
#..L..#
#.....#
#######
```

动作回放:
- 1. left: legal; events=push_object:push_pull_anchor,anchor_boundary_shift:push_pull; eventWin=no
```text
#######
#..G..#
#.....#
#.P@..#
#.L...#
#.....#
#######
```

最终状态:
```text
#######
#..G..#
#.....#
#.P@..#
#.L...#
#.....#
#######
```
变化格: (2,3) .->P; (3,3) P->@; (4,3) @->.; (2,4) .->L; (3,4) L->.

最终状态动作表:
| action | legal | events | next / reason |
| --- | --- | --- | --- |
| up | yes | walk | Ply:3,2\|C:\|M:\|PL:P:2,3;L:2,4\|BS:none |
| down | yes | walk | Ply:3,4\|C:\|M:\|PL:P:2,3;L:2,4\|BS:none |
| left | yes | push_object:push_pull_anchor,anchor_boundary_shift:push_pull | Ply:2,3\|C:\|M:\|PL:P:1,3;L:1,4\|BS:none |
| right | yes | walk | Ply:4,3\|C:\|M:\|PL:P:2,3;L:2,4\|BS:none |

回到初始: yes, depth=3, path=down right up
局部可达图: status=complete, states=230, transitions=703, winStates=0, maxDepth=13
事件类型: anchor_boundary_shift:push_pull=29, pull_object:push_pull_anchor=12, push_object:push_pull_anchor=17, walk=674

